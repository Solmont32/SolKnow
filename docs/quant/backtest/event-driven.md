# 事件驱动回测框架

事件驱动回测是模拟真实交易环境的回测方式，能更准确地反映策略在实际交易中的表现。

## 事件驱动 vs 向量化回测

| 维度 | 向量化回测 | 事件驱动回测 |
|------|-----------|-------------|
| **速度** | 快（矩阵运算） | 慢（逐个事件处理） |
| **精度** | 低（简化假设） | 高（贴近实盘） |
| **复杂度** | 简单 | 复杂 |
| **适用阶段** | 初期筛选 | 精细验证 |
| **功能支持** | 有限 | 完整（滑点、延迟、部分成交） |

## 系统架构

```
事件驱动回测架构
─────────────────────────────────────────────────────────

Data Handler ──▶ Strategy ──▶ Portfolio ──▶ Execution
     │                              │
     ▼                              ▼
Market Data                   Broker/Simulator
（Bar/Tick数据）              （订单簿模拟）

事件流（Event Queue）
─────────────────────────────────────────────────────────
1. Market Event: 新数据到达
2. Signal Event: 策略生成信号
3. Order Event: 生成订单
4. Fill Event: 订单成交
```

## 核心组件

### 事件基类

```python
from enum import Enum
from dataclasses import dataclass
from datetime import datetime

class EventType(Enum):
    MARKET = "MARKET"
    SIGNAL = "SIGNAL"
    ORDER = "ORDER"
    FILL = "FILL"

@dataclass
class Event:
    """事件基类"""
    type: EventType
    timestamp: datetime

@dataclass
class MarketEvent(Event):
    """市场数据事件"""
    symbol: str
    bar: dict  # OHLCV数据

@dataclass
class SignalEvent(Event):
    """交易信号事件"""
    symbol: str
    signal_type: str  # 'LONG', 'SHORT', 'EXIT'
    strength: float   # 信号强度

@dataclass
class OrderEvent(Event):
    """订单事件"""
    symbol: str
    order_type: str   # 'MKT', 'LMT', 'STP'
    quantity: float
    direction: str    # 'BUY', 'SELL'
    price: float = None

@dataclass
class FillEvent(Event):
    """成交事件"""
    symbol: str
    quantity: float
    direction: str
    fill_price: float
    commission: float
    exchange: str
```

### 数据处理模块

```python
class DataHandler:
    """
    数据处理基类
    负责提供市场数据
    """

    def __init__(self, events_queue, symbol_list):
        self.events = events_queue
        self.symbol_list = symbol_list
        self.continue_backtest = True

    def get_latest_bars(self, symbol, n=1):
        """
        获取最新n条K线
        在实盘环境中这是历史数据
        """
        raise NotImplementedError

    def update_bars(self):
        """
        更新K线（模拟新数据到达）
        """
        raise NotImplementedError

class HistoricCSVDataHandler(DataHandler):
    """
    历史CSV数据处理
    """

    def __init__(self, events_queue, csv_dir, symbol_list):
        super().__init__(events_queue, symbol_list)
        self.csv_dir = csv_dir
        self.symbol_data = {}
        self.latest_symbol_data = {}
        self.bar_index = 0

        self._load_csv_files()

    def _load_csv_files(self):
        """加载CSV文件"""
        for symbol in self.symbol_list:
            # 加载CSV
            df = pd.read_csv(
                f"{self.csv_dir}/{symbol}.csv",
                parse_dates=['timestamp'],
                index_col='timestamp'
            )

            # 转换为迭代器
            self.symbol_data[symbol] = df.iterrows()
            self.latest_symbol_data[symbol] = []

    def get_latest_bars(self, symbol, n=1):
        """获取最新n条K线"""
        try:
            bars = self.latest_symbol_data[symbol]
        except KeyError:
            print(f"Symbol {symbol} not found")
            return []

        return bars[-n:]

    def update_bars(self):
        """更新K线（模拟时间推进）"""
        for symbol in self.symbol_list:
            try:
                index, bar = next(self.symbol_data[symbol])
            except StopIteration:
                self.continue_backtest = False
                return

            # 格式化bar数据
            bar_data = {
                'timestamp': index,
                'open': bar['open'],
                'high': bar['high'],
                'low': bar['low'],
                'close': bar['close'],
                'volume': bar['volume']
            }

            self.latest_symbol_data[symbol].append(bar_data)

        # 生成市场事件
        self.events.put(MarketEvent(
            type=EventType.MARKET,
            timestamp=datetime.now(),
            symbol=symbol,
            bar=bar_data
        ))
```

### 策略模块

```python
class Strategy:
    """
    策略基类
    """

    def __init__(self, data, events):
        self.data = data
        self.events = events
        self.symbol_list = data.symbol_list

    def calculate_signals(self, event):
        """
        计算交易信号
        由子类实现具体逻辑
        """
        raise NotImplementedError

class MovingAverageCrossStrategy(Strategy):
    """
    双均线交叉策略（事件驱动实现）
    """

    def __init__(self, data, events, short_window=50, long_window=200):
        super().__init__(data, events)
        self.short_window = short_window
        self.long_window = long_window
        self.bought = {s: 'OUT' for s in self.symbol_list}

    def calculate_signals(self, event):
        """
        生成信号
        """
        if event.type != EventType.MARKET:
            return

        symbol = event.symbol

        # 获取历史数据
        bars = self.data.get_latest_bars(symbol, n=self.long_window)

        if len(bars) < self.long_window:
            return

        # 计算均线
        closes = [b['close'] for b in bars]
        short_sma = np.mean(closes[-self.short_window:])
        long_sma = np.mean(closes)

        # 信号逻辑
        if short_sma > long_sma and self.bought[symbol] == 'OUT':
            # 金叉，买入
            signal = SignalEvent(
                type=EventType.SIGNAL,
                timestamp=datetime.now(),
                symbol=symbol,
                signal_type='LONG',
                strength=1.0
            )
            self.events.put(signal)
            self.bought[symbol] = 'LONG'

        elif short_sma < long_sma and self.bought[symbol] == 'LONG':
            # 死叉，卖出
            signal = SignalEvent(
                type=EventType.SIGNAL,
                timestamp=datetime.now(),
                symbol=symbol,
                signal_type='EXIT',
                strength=1.0
            )
            self.events.put(signal)
            self.bought[symbol] = 'OUT'
```

### 投资组合模块

```python
class Portfolio:
    """
    投资组合管理
    跟踪持仓、计算盈亏、生成订单
    """

    def __init__(self, data, events, initial_capital=100000.0):
        self.data = data
        self.events = events
        self.initial_capital = initial_capital
        self.current_cash = initial_capital
        self.positions = {}
        self.trades = []

        # 绩效跟踪
        self.equity_curve = []

    def update_signal(self, event):
        """
        处理信号事件，生成订单
        """
        if event.type != EventType.SIGNAL:
            return

        # 根据信号生成订单
        order = self._generate_order(event)

        if order:
            self.events.put(order)

    def _generate_order(self, signal_event):
        """
        信号转订单
        """
        symbol = signal_event.symbol
        direction = signal_event.signal_type

        # 获取当前价格
        bars = self.data.get_latest_bars(symbol, n=1)
        if not bars:
            return None

        price = bars[0]['close']

        # 计算仓位大小（简化为固定金额）
        position_size = 100  # 假设买入100股

        if direction == 'LONG':
            order = OrderEvent(
                type=EventType.ORDER,
                timestamp=datetime.now(),
                symbol=symbol,
                order_type='MKT',
                quantity=position_size,
                direction='BUY'
            )
        elif direction == 'SHORT':
            order = OrderEvent(
                type=EventType.ORDER,
                timestamp=datetime.now(),
                symbol=symbol,
                order_type='MKT',
                quantity=position_size,
                direction='SELL'
            )
        elif direction == 'EXIT':
            # 平仓：卖出全部持仓
            current_position = self.positions.get(symbol, 0)
            if current_position > 0:
                order = OrderEvent(
                    type=EventType.ORDER,
                    timestamp=datetime.now(),
                    symbol=symbol,
                    order_type='MKT',
                    quantity=current_position,
                    direction='SELL'
                )
            else:
                return None
        else:
            return None

        return order

    def update_fill(self, event):
        """
        处理成交事件
        """
        if event.type != EventType.FILL:
            return

        # 更新持仓
        symbol = event.symbol
        quantity = event.quantity
        direction = event.direction
        fill_price = event.fill_price
        commission = event.commission

        if direction == 'BUY':
            self.positions[symbol] = self.positions.get(symbol, 0) + quantity
            cost = quantity * fill_price + commission
            self.current_cash -= cost
        else:
            self.positions[symbol] = self.positions.get(symbol, 0) - quantity
            revenue = quantity * fill_price - commission
            self.current_cash += revenue

        # 记录交易
        self.trades.append({
            'timestamp': event.timestamp,
            'symbol': symbol,
            'direction': direction,
            'quantity': quantity,
            'price': fill_price,
            'commission': commission
        })

        # 更新权益曲线
        self._update_equity_curve()

    def _update_equity_curve(self):
        """更新权益曲线"""
        # 计算持仓市值
        portfolio_value = self.current_cash

        for symbol, quantity in self.positions.items():
            if quantity != 0:
                bars = self.data.get_latest_bars(symbol, n=1)
                if bars:
                    price = bars[0]['close']
                    portfolio_value += quantity * price

        self.equity_curve.append({
            'timestamp': datetime.now(),
            'equity': portfolio_value
        })
```

### 执行模块

```python
class ExecutionHandler:
    """
    执行处理基类
    """

    def execute_order(self, event):
        raise NotImplementedError

class SimulatedExecutionHandler(ExecutionHandler):
    """
    模拟执行（回测用）
    """

    def __init__(self, events, price_slippage=0.0001, commission_rate=0.001):
        self.events = events
        self.price_slippage = price_slippage  # 滑点
        self.commission_rate = commission_rate  # 手续费率

    def execute_order(self, event):
        """
        模拟订单执行
        """
        if event.type != EventType.ORDER:
            return

        symbol = event.symbol
        quantity = event.quantity
        direction = event.direction
        order_type = event.order_type

        # 获取当前价格（模拟延迟1个bar）
        # 实际应使用下一个bar的开盘价

        # 添加滑点
        if direction == 'BUY':
            fill_price = event.price * (1 + self.price_slippage)
        else:
            fill_price = event.price * (1 - self.price_slippage)

        # 计算手续费
        commission = fill_price * quantity * self.commission_rate

        # 生成成交事件
        fill_event = FillEvent(
            type=EventType.FILL,
            timestamp=datetime.now(),
            symbol=symbol,
            quantity=quantity,
            direction=direction,
            fill_price=fill_price,
            commission=commission,
            exchange='SIMULATED'
        )

        self.events.put(fill_event)

class BacktestExecutionHandler(ExecutionHandler):
    """
    更真实的回测执行模拟
    """

    def __init__(self, events, data):
        self.events = events
        self.data = data

    def execute_order(self, event):
        """
        基于订单簿模拟执行
        """
        symbol = event.symbol

        # 获取当前bar的数据
        bars = self.data.get_latest_bars(symbol, n=1)[0]

        if event.order_type == 'MKT':
            # 市价单：假设以下一个bar的开盘价成交
            fill_price = bars['open']

        elif event.order_type == 'LMT':
            # 限价单：检查是否触及
            limit_price = event.price

            # 买入限价单：限价 >= 最低价才能成交
            if event.direction == 'BUY':
                if limit_price >= bars['low']:
                    fill_price = min(limit_price, bars['open'])
                else:
                    return  # 未成交
            else:
                if limit_price <= bars['high']:
                    fill_price = max(limit_price, bars['open'])
                else:
                    return

        # 模拟部分成交（大订单）
        fill_quantity = self._simulate_liquidity(
            event.quantity, bars['volume']
        )

        # ... 生成成交事件

    def _simulate_liquidity(self, order_size, bar_volume):
        """
        模拟流动性限制

        大订单不能完全成交
        """
        # 假设订单量不能超过成交量的10%
        max_fill = bar_volume * 0.1
        return min(order_size, max_fill)
```

### 回测引擎

```python
import queue

class Backtest:
    """
    回测主引擎
    """

    def __init__(self, data_dir, symbol_list, initial_capital,
                 heartbeat=0.0, start_date=None, end_date=None):

        self.events = queue.Queue()
        self.data = HistoricCSVDataHandler(
            self.events, data_dir, symbol_list
        )
        self.strategy = MovingAverageCrossStrategy(
            self.data, self.events
        )
        self.portfolio = Portfolio(
            self.data, self.events, initial_capital
        )
        self.execution = SimulatedExecutionHandler(self.events)

    def run(self):
        """
        运行回测
        """
        print("开始回测...")

        while self.data.continue_backtest:
            # 更新数据（推进一个时间步）
            self.data.update_bars()

            # 处理事件队列
            while True:
                try:
                    event = self.events.get(False)
                except queue.Empty:
                    break

                # 根据事件类型分发
                if event.type == EventType.MARKET:
                    self.strategy.calculate_signals(event)
                    self.portfolio._update_equity_curve()

                elif event.type == EventType.SIGNAL:
                    self.portfolio.update_signal(event)

                elif event.type == EventType.ORDER:
                    self.execution.execute_order(event)

                elif event.type == EventType.FILL:
                    self.portfolio.update_fill(event)

        print("回测完成")
        return self._generate_results()

    def _generate_results(self):
        """
        生成回测结果
        """
        equity_df = pd.DataFrame(self.portfolio.equity_curve)
        equity_df.set_index('timestamp', inplace=True)

        # 计算收益曲线
        equity_df['returns'] = equity_df['equity'].pct_change()

        # 计算指标
        total_return = (equity_df['equity'].iloc[-1] /
                       equity_df['equity'].iloc[0] - 1)

        sharpe_ratio = (equity_df['returns'].mean() /
                       equity_df['returns'].std() * np.sqrt(252))

        drawdown = (equity_df['equity'] /
                   equity_df['equity'].cummax() - 1)
        max_drawdown = drawdown.min()

        return {
            'equity_curve': equity_df,
            'total_return': total_return,
            'sharpe_ratio': sharpe_ratio,
            'max_drawdown': max_drawdown,
            'trades': self.portfolio.trades
        }
```

## 高级功能

### 滑点模型

```python
class SlippageModel:
    """
    滑点模型
    """

    @staticmethod
    def fixed_slippage(price, direction, slippage_pct=0.001):
        """固定百分比滑点"""
        if direction == 'BUY':
            return price * (1 + slippage_pct)
        else:
            return price * (1 - slippage_pct)

    @staticmethod
    def volume_based_slippage(price, volume, total_volume,
                             direction, max_impact=0.01):
        """
        基于成交量的滑点

        订单量越大，滑点越大
        """
        participation = volume / total_volume
        impact = participation * max_impact

        if direction == 'BUY':
            return price * (1 + impact)
        else:
            return price * (1 - impact)
```

## 延伸阅读

- [向量化回测](vectorized) — 快速回测方法
- [回测陷阱](common-pitfalls) — 避免常见错误
- [交易成本建模](transaction-costs) — 滑点与手续费
