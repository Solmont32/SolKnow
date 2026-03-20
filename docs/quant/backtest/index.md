# 回测系统

回测是验证交易策略有效性的核心环节，本节介绍回测原理、框架搭建与常见陷阱。

## 回测的重要性

```
策略想法 → 历史数据回测 → 评估有效性 → 模拟交易 → 实盘
                ↑                              ↓
            参数优化 ←────── 表现衰减监控 ←────┘
```

回测回答的关键问题：
- 策略在过去表现如何？
- 收益来自运气还是能力？
- 风险暴露是什么？
- 最坏情况会怎样？

## 回测类型

### 向量化回测（Vectorized）
```python
# 优点：速度快，适合初步筛选
# 缺点：无法模拟真实执行细节

signals = (df['ma_short'] > df['ma_long']).astype(int)
positions = signals.shift(1)  # 避免前视偏差
returns = df['close'].pct_change()
strategy_returns = positions * returns
```

### 事件驱动回测（Event-Driven）
```python
# 优点：接近实盘，支持复杂逻辑
# 缺点：速度较慢

class Strategy:
    def on_bar(self, bar):
        if self.should_buy(bar):
            self.broker.buy(bar.symbol, quantity)
        elif self.should_sell(bar):
            self.broker.sell(bar.symbol, quantity)

    def on_order_fill(self, order):
        self.position.update(order)
```

| 维度 | 向量化 | 事件驱动 |
|------|--------|----------|
| 速度 | 快 | 慢 |
| 精度 | 低 | 高 |
| 复杂度 | 简单 | 复杂 |
| 适用阶段 | 初期筛选 | 精细验证 |

## 核心组件

### 1. 数据处理器
```python
class DataHandler:
    def get_latest_bars(self, symbol, n=1):
        """获取最新n条K线"""
        ...

    def get_historical_data(self, symbol, start, end):
        """获取历史数据"""
        ...
```

### 2. 策略逻辑
```python
class Strategy:
    def generate_signals(self, data):
        """生成交易信号"""
        signals = []
        for symbol in self.symbols:
            if self.condition_buy(data[symbol]):
                signals.append(Signal(symbol, 'BUY'))
            elif self.condition_sell(data[symbol]):
                signals.append(Signal(symbol, 'SELL'))
        return signals
```

### 3. 投资组合
```python
class Portfolio:
    def update_positions(self, fills):
        """更新持仓"""
        ...

    def update_value(self, current_prices):
        """更新组合市值"""
        self.current_value = sum(
            pos * price for pos, price in zip(self.positions, current_prices)
        )
```

### 4. 执行模块
```python
class ExecutionHandler:
    def execute_order(self, order):
        """执行订单，考虑滑点和手续费"""
        fill_price = self.apply_slippage(order.price)
        fill_cost = self.calculate_commission(fill_price, order.quantity)
        return Fill(order, fill_price, fill_cost)
```

## 交易成本建模

### 滑点（Slippage）
$$\text{实际成交价} = \text{信号价} \times (1 + \text{滑点率} \times \text{方向})$$

```python
def apply_slippage(price, direction, volume, liquidity):
    """
    基于流动性的动态滑点
    direction: 1为买入，-1为卖出
    """
    base_slippage = 0.0001  # 1个基点
    volume_impact = volume / liquidity * 0.001
    return price * (1 + direction * (base_slippage + volume_impact))
```

### 手续费
| 市场 | 典型费率 | 说明 |
|------|----------|------|
| A股 | 0.03% (万3) | 双向，最低5元 |
| 期货 | 交易所标准 | 按合约收取 |
| 美股 | $0-0.005/股 | 很多平台免佣 |

## 回测指标

### 收益指标
```python
def calculate_metrics(returns, benchmark=None):
    total_return = (1 + returns).prod() - 1
    annual_return = (1 + total_return) ** (252 / len(returns)) - 1
    volatility = returns.std() * np.sqrt(252)
    sharpe = annual_return / volatility

    # 最大回撤
    cumulative = (1 + returns).cumprod()
    peak = cumulative.expanding().max()
    drawdown = (cumulative - peak) / peak
    max_drawdown = drawdown.min()

    # Calmar比率
    calmar = annual_return / abs(max_drawdown)

    return {
        'total_return': total_return,
        'annual_return': annual_return,
        'volatility': volatility,
        'sharpe_ratio': sharpe,
        'max_drawdown': max_drawdown,
        'calmar_ratio': calmar
    }
```

### 风险指标
- **VaR (Value at Risk)**: 在95%置信度下的最大损失
- **CVaR**: 超过VaR的平均损失
- **Beta**: 相对于市场的敏感度
- **Alpha**: 超额收益能力

## 回测陷阱

### 1. 过拟合（Overfitting）
**症状**: 回测收益极高，实盘表现极差

**预防**:
```python
# 样本外测试
in_sample = data[:'2020-12-31']
out_of_sample = data['2021-01-01':]

# 参数稳健性检验
def parameter_sensitivity(strategy, param_ranges):
    results = []
    for params in grid_search(param_ranges):
        performance = backtest(strategy, params)
        results.append(performance)

    # 检查参数高原区域
    if variance(results) > threshold:
        print("警告：参数敏感，可能过拟合")
```

### 2. 前视偏差（Look-ahead Bias）
**错误示例**:
```python
# 错误：使用当日收盘价决定当日交易
signal = close > ma20  # 使用了同周期数据

# 正确：使用昨日及之前数据
signal = close.shift(1) > ma20.shift(1)
```

### 3. 幸存者偏差
**问题**: 只使用现存股票数据，忽略已退市
**解决**: 使用包含退市股票的完整数据集

### 4. 数据窥探偏差
**问题**: 反复测试同一数据集，偶然发现"有效"策略
**解决**: 降低显著性阈值 (Bonferroni校正)

## 回测框架推荐

| 框架 | 语言 | 特点 | 适用 |
|------|------|------|------|
| Backtrader | Python | 灵活、文档好 | 研究到实盘 |
| Zipline | Python | Quantopian遗产 | 美股研究 |
| vectorbt | Python | 向量化、超快 | 大规模回测 |
| QuantConnect | C#/Python | 云端 | 多资产实盘 |
| vn.py | Python/C++ | 国产、全功能 | 国内实盘 |

## 延伸阅读

- [策略开发](/docs/quant/strategy/) — 策略设计原则
- [风险管理](/docs/quant/risk/) — 控制回撤
- [实盘部署](/docs/quant/practice/deployment) — 从回测到实盘
