# 交易机制与订单类型

理解交易机制和订单类型是执行量化策略的基础，不同的订单类型适用于不同的策略场景。

## 订单类型详解

### 市价单 (Market Order)

**特点**:
- 以当前市场最优价格立即成交
- 成交确定性高，但价格不确定
- 适用于需要快速执行的场景

```python
class MarketOrder:
    """市价单执行策略"""

    def __init__(self, symbol, side, quantity):
        self.symbol = symbol
        self.side = side  # 'buy' or 'sell'
        self.quantity = quantity

    def execute(self, exchange):
        """执行市价单"""
        try:
            if self.side == 'buy':
                order = exchange.create_market_buy_order(
                    self.symbol, self.quantity
                )
            else:
                order = exchange.create_market_sell_order(
                    self.symbol, self.quantity
                )
            return order
        except Exception as e:
            print(f"市价单执行失败: {e}")
            return None

    def estimate_slippage(self, order_book, quantity):
        """估计市价单滑点"""
        if self.side == 'buy':
            asks = order_book['asks']
            remaining = quantity
            total_cost = 0

            for price, qty in asks:
                if remaining <= 0:
                    break
                fill_qty = min(remaining, qty)
                total_cost += fill_qty * price
                remaining -= fill_qty

            avg_price = total_cost / quantity
            best_ask = asks[0][0]
            slippage = (avg_price - best_ask) / best_ask

        else:  # sell
            bids = order_book['bids']
            remaining = quantity
            total_revenue = 0

            for price, qty in bids:
                if remaining <= 0:
                    break
                fill_qty = min(remaining, qty)
                total_revenue += fill_qty * price
                remaining -= fill_qty

            avg_price = total_revenue / quantity
            best_bid = bids[0][0]
            slippage = (best_bid - avg_price) / best_bid

        return slippage
```

### 限价单 (Limit Order)

**特点**:
- 指定价格成交，价格可控
- 不保证成交，可能部分成交
- 适用于对价格敏感的策略

```python
class LimitOrder:
    """限价单管理"""

    def __init__(self, symbol, side, quantity, limit_price):
        self.symbol = symbol
        self.side = side
        self.quantity = quantity
        self.limit_price = limit_price
        self.order_id = None
        self.filled = 0
        self.remaining = quantity

    def place(self, exchange):
        """下限价单"""
        order = exchange.create_limit_order(
            self.symbol,
            self.side,
            self.quantity,
            self.limit_price
        )
        self.order_id = order['id']
        return order

    def cancel(self, exchange):
        """撤单"""
        if self.order_id:
            exchange.cancel_order(self.order_id, self.symbol)

    def update_price(self, exchange, new_price):
        """改单：撤单重下"""
        self.cancel(exchange)
        self.limit_price = new_price
        return self.place(exchange)
```

### 止损单 (Stop Order)

**止损市价单 (Stop Market)**:
- 价格触及止损价时转为市价单
- 保证成交但不保证价格

**止损限价单 (Stop Limit)**:
- 价格触及止损价时转为限价单
- 价格可控但不保证成交

```python
class StopLossOrder:
    """止损单管理"""

    def __init__(self, symbol, side, quantity, stop_price,
                 limit_price=None):
        self.symbol = symbol
        self.side = side
        self.quantity = quantity
        self.stop_price = stop_price
        self.limit_price = limit_price  # None表示止损市价单
        self.triggered = False

    def check_trigger(self, current_price):
        """检查是否触发止损"""
        if self.side == 'sell':
            # 多头止损：价格跌破止损价
            if current_price <= self.stop_price:
                self.triggered = True
        else:
            # 空头止损：价格涨破止损价
            if current_price >= self.stop_price:
                self.triggered = True

        return self.triggered

    def execute(self, exchange):
        """执行止损"""
        if not self.triggered:
            return None

        if self.limit_price:
            # 止损限价单
            return exchange.create_limit_order(
                self.symbol, self.side,
                self.quantity, self.limit_price
            )
        else:
            # 止损市价单
            if self.side == 'sell':
                return exchange.create_market_sell_order(
                    self.symbol, self.quantity
                )
            else:
                return exchange.create_market_buy_order(
                    self.symbol, self.quantity
                )
```

### 冰山订单 (Iceberg Order)

**特点**:
- 大单拆分成多个小单显示
- 隐藏真实交易量
- 减少市场冲击

```python
class IcebergOrder:
    """冰山订单执行"""

    def __init__(self, symbol, side, total_quantity,
                 display_size, limit_price):
        self.symbol = symbol
        self.side = side
        self.total_quantity = total_quantity
        self.display_size = display_size
        self.limit_price = limit_price
        self.remaining = total_quantity
        self.orders = []

    def execute(self, exchange):
        """分段执行冰山订单"""
        while self.remaining > 0:
            # 下显示部分
            current_display = min(self.display_size, self.remaining)

            order = exchange.create_limit_order(
                self.symbol, self.side,
                current_display, self.limit_price
            )

            self.orders.append(order)

            # 等待成交或超时
            filled = self.wait_for_fill(order['id'], timeout=30)

            if filled > 0:
                self.remaining -= filled
                print(f"冰山订单部分成交: {filled}, 剩余: {self.remaining}")
            else:
                # 未成交，取消重下
                exchange.cancel_order(order['id'], self.symbol)

    def wait_for_fill(self, order_id, timeout):
        """等待订单成交"""
        # 实现等待逻辑
        pass
```

## 高级订单类型

### 条件订单

```python
class ConditionalOrder:
    """条件订单：满足特定条件时触发"""

    def __init__(self, condition, action):
        self.condition = condition
        self.action = action
        self.active = True

    def evaluate(self, market_data):
        """评估条件是否满足"""
        if not self.active:
            return False

        # 解析条件
        if self.condition['type'] == 'price_above':
            return market_data['price'] > self.condition['value']
        elif self.condition['type'] == 'price_below':
            return market_data['price'] < self.condition['value']
        elif self.condition['type'] == 'volume_spike':
            return market_data['volume'] > self.condition['value']

    def trigger(self, exchange):
        """触发订单"""
        if self.action['type'] == 'market':
            return exchange.create_market_order(
                self.action['symbol'],
                self.action['side'],
                self.action['quantity']
            )
```

### TWAP (时间加权平均价格)

```python
import time
from datetime import datetime, timedelta

class TWAPExecutor:
    """TWAP订单执行算法"""

    def __init__(self, symbol, side, total_quantity,
                 start_time, end_time, num_slices):
        self.symbol = symbol
        self.side = side
        self.total_quantity = total_quantity
        self.start_time = start_time
        self.end_time = end_time
        self.num_slices = num_slices

        self.slice_quantity = total_quantity / num_slices
        self.interval = (end_time - start_time) / num_slices

    def execute(self, exchange):
        """执行TWAP"""
        results = []

        for i in range(self.num_slices):
            # 等待到执行时间点
            target_time = self.start_time + i * self.interval
            self.wait_until(target_time)

            # 执行当前切片
            try:
                if self.side == 'buy':
                    order = exchange.create_market_buy_order(
                        self.symbol, self.slice_quantity
                    )
                else:
                    order = exchange.create_market_sell_order(
                        self.symbol, self.slice_quantity
                    )

                results.append(order)

            except Exception as e:
                print(f"TWAP切片{i}执行失败: {e}")

        # 计算VWAP
        total_value = sum(o['filled'] * o['average']
                         for o in results if 'filled' in o)
        total_filled = sum(o['filled'] for o in results
                          if 'filled' in o)

        vwap = total_value / total_filled if total_filled > 0 else 0

        return {
            'algorithm': 'TWAP',
            'slices': self.num_slices,
            'total_filled': total_filled,
            'vwap': vwap,
            'results': results
        }

    def wait_until(self, target_time):
        """等待到指定时间"""
        while datetime.now() < target_time:
            time.sleep(0.1)
```

### VWAP (成交量加权平均价格)

```python
class VWAPExecutor:
    """VWAP订单执行算法"""

    def __init__(self, symbol, side, total_quantity,
                 start_time, end_time):
        self.symbol = symbol
        self.side = side
        self.total_quantity = total_quantity
        self.start_time = start_time
        self.end_time = end_time

        # 获取历史成交量分布
        self.volume_profile = self.get_historical_volume_profile()

    def get_historical_volume_profile(self):
        """获取历史成交量分布（按时间切片）"""
        # 通常使用过去20天的平均成交量分布
        # 返回每个时间段的成交量占比
        return {
            '09:30': 0.08, '10:00': 0.12, '10:30': 0.10,
            '11:00': 0.08, '13:00': 0.09, '13:30': 0.11,
            '14:00': 0.12, '14:30': 0.15, '15:00': 0.15
        }

    def calculate_target_quantities(self):
        """根据成交量分布计算目标交易量"""
        targets = {}
        for time_slot, volume_pct in self.volume_profile.items():
            targets[time_slot] = self.total_quantity * volume_pct
        return targets

    def execute(self, exchange):
        """执行VWAP"""
        target_quantities = self.calculate_target_quantities()
        results = []

        for time_slot, target_qty in target_quantities.items():
            # 在目标时间段内执行
            # 允许一定偏差，根据实际成交量调整

            actual_volume = self.get_current_volume(time_slot)
            adjustment = actual_volume / self.expected_volume(time_slot)

            adjusted_qty = target_qty * adjustment

            # 执行订单
            order = self.execute_slice(exchange, adjusted_qty)
            results.append(order)

        return results
```

## 订单生命周期管理

```python
from enum import Enum

class OrderStatus(Enum):
    PENDING = "待提交"
    SUBMITTED = "已提交"
    PARTIAL_FILL = "部分成交"
    FILLED = "完全成交"
    CANCELLED = "已撤销"
    REJECTED = "已拒绝"
    EXPIRED = "已过期"

class OrderManager:
    """订单生命周期管理"""

    def __init__(self, exchange):
        self.exchange = exchange
        self.active_orders = {}
        self.order_history = []

    def submit_order(self, order):
        """提交订单"""
        try:
            result = self.exchange.create_order(
                order.symbol,
                order.type,
                order.side,
                order.quantity,
                order.price if hasattr(order, 'price') else None
            )

            order.id = result['id']
            order.status = OrderStatus.SUBMITTED
            self.active_orders[order.id] = order

            return order.id

        except Exception as e:
            order.status = OrderStatus.REJECTED
            print(f"订单提交失败: {e}")
            return None

    def update_order_status(self, order_id):
        """更新订单状态"""
        if order_id not in self.active_orders:
            return

        order = self.active_orders[order_id]

        try:
            status = self.exchange.fetch_order(order_id, order.symbol)

            if status['status'] == 'closed':
                if status['filled'] == status['amount']:
                    order.status = OrderStatus.FILLED
                else:
                    order.status = OrderStatus.CANCELLED

                # 移至历史记录
                self.order_history.append(order)
                del self.active_orders[order_id]

            elif status['filled'] > 0 and status['filled'] < status['amount']:
                order.status = OrderStatus.PARTIAL_FILL
                order.filled = status['filled']
                order.remaining = status['remaining']

        except Exception as e:
            print(f"获取订单状态失败: {e}")

    def cancel_all_orders(self, symbol=None):
        """撤销所有订单"""
        for order_id in list(self.active_orders.keys()):
            order = self.active_orders[order_id]

            if symbol and order.symbol != symbol:
                continue

            try:
                self.exchange.cancel_order(order_id, order.symbol)
                order.status = OrderStatus.CANCELLED
                self.order_history.append(order)
                del self.active_orders[order_id]

            except Exception as e:
                print(f"撤单失败 {order_id}: {e}")
```

## 最佳实践

1. **大单拆分**: 大单拆成小单执行，减少市场冲击
2. **多订单类型组合**: 根据市场情况灵活使用不同订单类型
3. **实时监控**: 持续跟踪订单执行状态
4. **异常处理**: 网络中断、交易所故障时的应对机制

## 延伸阅读

- [金融市场基础](market-fundamentals)
- [量化策略开发](/docs/quant/strategy/)
- [高频交易](/docs/quant/blockchain/high-frequency)
