# 仓位管理

仓位管理是量化交易成功的关键，它决定了风险暴露程度和资金增长曲线。

## 核心原则

```
仓位管理的目标：
1. 保护本金（生存第一）
2. 优化收益风险比
3. 控制回撤在可接受范围
4. 充分利用资金效率
```

## 基础仓位模型

### 固定金额法

```python
import numpy as np
import pandas as pd

class FixedDollarSizing:
    """
    固定金额仓位管理

    每笔交易投入固定金额
    """

    def __init__(self, capital_per_trade=10000):
        self.capital_per_trade = capital_per_trade

    def calculate_position(self, price, **kwargs):
        """
        计算仓位规模

        price: 当前价格
        """
        shares = int(self.capital_per_trade / price)
        return shares

    def calculate_dollar_exposure(self, price, shares):
        """计算美元敞口"""
        return price * shares
```

### 固定比例法

```python
class FixedFractionalSizing:
    """
    固定比例仓位管理

    每笔交易使用账户固定百分比的资金
    """

    def __init__(self, account_value, risk_percent=0.02):
        self.account_value = account_value
        self.risk_percent = risk_percent

    def calculate_position(self, entry_price, stop_loss_price, **kwargs):
        """
        计算仓位规模

        entry_price: 入场价格
        stop_loss_price: 止损价格
        """
        # 每笔交易承担的风险金额
        risk_amount = self.account_value * self.risk_percent

        # 每单位风险
        risk_per_unit = abs(entry_price - stop_loss_price)

        if risk_per_unit == 0:
            return 0

        # 仓位 = 风险金额 / 每单位风险
        position_size = risk_amount / risk_per_unit

        return position_size

    def update_account_value(self, new_value):
        """更新账户价值"""
        self.account_value = new_value
```

### 固定风险法

```python
class FixedRiskSizing:
    """
    固定风险仓位管理

    每笔交易固定金额的风险暴露
    """

    def __init__(self, account_value, fixed_risk_amount=1000):
        self.account_value = account_value
        self.fixed_risk_amount = fixed_risk_amount

    def calculate_position(self, entry_price, stop_loss_price):
        """计算仓位"""
        risk_per_share = abs(entry_price - stop_loss_price)

        if risk_per_share == 0:
            return 0

        shares = int(self.fixed_risk_amount / risk_per_share)

        # 确保不超过账户总价值的限制
        max_shares = int(self.account_value * 0.5 / entry_price)

        return min(shares, max_shares)
```

## 高级仓位模型

### 凯利公式

```python
class KellyCriterion:
    """
    凯利公式仓位管理

    f* = (p * b - q) / b

    其中：
    p = 胜率
    q = 败率 = 1 - p
    b = 盈亏比（平均盈利/平均亏损）
    """

    def __init__(self, win_rate, win_loss_ratio, half_kelly=True):
        """
        win_rate: 历史胜率
        win_loss_ratio: 平均盈利/平均亏损
        half_kelly: 是否使用半凯利（更保守）
        """
        self.win_rate = win_rate
        self.win_loss_ratio = win_loss_ratio
        self.half_kelly = half_kelly

    def calculate_kelly_fraction(self):
        """计算凯利比例"""
        lose_rate = 1 - self.win_rate

        kelly = (self.win_rate * self.win_loss_ratio - lose_rate) / self.win_loss_ratio

        # 确保结果合理
        kelly = max(0, min(kelly, 1))

        if self.half_kelly:
            kelly = kelly / 2

        return kelly

    def calculate_position(self, account_value, entry_price, atr=None):
        """
        计算仓位

        结合凯利公式和ATR调整
        """
        kelly_fraction = self.calculate_kelly_fraction()

        # 基于波动率调整（可选）
        if atr is not None:
            vol_adjustment = 0.02 / atr  # 目标日波动2%
            kelly_fraction = min(kelly_fraction, vol_adjustment)

        position_value = account_value * kelly_fraction
        shares = int(position_value / entry_price)

        return shares

    @staticmethod
    def estimate_from_history(returns):
        """
        从历史收益估计凯利参数
        """
        positive = returns[returns > 0]
        negative = returns[returns < 0]

        win_rate = len(positive) / len(returns)
        win_loss_ratio = abs(positive.mean() / negative.mean())

        return KellyCriterion(win_rate, win_loss_ratio)
```

### 最优 f 方法

```python
class OptimalF:
    """
    Ralph Vince 的最优 f 方法

    基于历史交易序列优化仓位比例
    """

    def __init__(self, trade_returns):
        """
        trade_returns: 历史交易收益率序列
        """
        self.trade_returns = trade_returns

    def calculate_twr(self, f):
        """
        计算总财富回报 (Terminal Wealth Relative)
        """
        twr = 1
        for ret in self.trade_returns:
            # HPR = 1 + f * 收益率
            hpr = 1 + f * ret
            if hpr <= 0:
                return 0  # 破产
            twr *= hpr
        return twr

    def find_optimal_f(self, step=0.01):
        """
        搜索最优 f
        """
        best_f = 0
        best_twr = 0

        for f in np.arange(0, 1, step):
            twr = self.calculate_twr(f)
            if twr > best_twr:
                best_twr = twr
                best_f = f

        return best_f, best_twr

    def calculate_position(self, account_value, f, current_risk):
        """
        基于最优 f 计算仓位

        current_risk: 当前交易的风险（如ATR）
        """
        # 最大损失 = f * 账户
        max_loss = f * account_value

        # 仓位 = 最大损失 / 当前交易风险
        position_size = max_loss / current_risk

        return position_size
```

### 波动率目标法

```python
class VolatilityTargeting:
    """
    波动率目标仓位管理

    目标：保持组合波动率在目标水平
    """

    def __init__(self, target_volatility=0.15, lookback=60):
        """
        target_volatility: 目标年化波动率（默认15%）
        lookback: 波动率计算回望期
        """
        self.target_volatility = target_volatility
        self.lookback = lookback

    def calculate_position_scalar(self, returns):
        """
        计算仓位乘数

        波动率越高，仓位越低
        """
        # 计算历史波动率（年化）
        current_vol = returns.iloc[-self.lookback:].std() * np.sqrt(252)

        if current_vol == 0:
            return 1.0

        # 仓位乘数 = 目标波动率 / 当前波动率
        scalar = self.target_volatility / current_vol

        # 限制最大杠杆
        return min(scalar, 3.0)

    def calculate_position(self, account_value, price, returns, signal_strength=1.0):
        """
        计算仓位
        """
        # 基础仓位（等权重）
        base_position = account_value * signal_strength / price

        # 波动率调整
        vol_scalar = self.calculate_position_scalar(returns)

        # 最终仓位
        final_position = base_position * vol_scalar

        return final_position

    def inverse_volatility_weights(self, returns_df):
        """
        逆波动率权重（多资产组合）

        波动率越低的资产，权重越高
        """
        # 计算各资产的波动率
        vols = returns_df.iloc[-self.lookback:].std() * np.sqrt(252)

        # 逆波动率
        inv_vols = 1 / vols

        # 归一化
        weights = inv_vols / inv_vols.sum()

        return weights
```

## 动态仓位调整

```python
class DynamicPositionSizing:
    """
    动态仓位调整

    根据市场状态调整仓位
    """

    def __init__(self, base_position=0.1):
        self.base_position = base_position

    def market_regime_adjustment(self, current_drawdown):
        """
        根据回撤调整仓位

        回撤越大，仓位越低
        """
        if current_drawdown > -0.15:  # 回撤小于15%
            return 1.0
        elif current_drawdown > -0.20:  # 回撤15-20%
            return 0.7
        elif current_drawdown > -0.25:  # 回撤20-25%
            return 0.5
        else:  # 回撤超过25%
            return 0.3

    def correlation_adjustment(self, correlations):
        """
        根据相关性调整仓位

        相关性上升时降低仓位
        """
        avg_correlation = np.mean(correlations)

        # 相关性越高，仓位越低
        adjustment = 1 - avg_correlation

        return max(adjustment, 0.3)

    def performance_adjustment(self, recent_performance, lookback=20):
        """
        根据近期表现调整仓位

        连续亏损时降低仓位
        """
        if len(recent_performance) < lookback:
            return 1.0

        # 计算近期胜率
        win_rate = (recent_performance > 0).mean()

        # 胜率低于阈值时降低仓位
        if win_rate < 0.4:
            return 0.7
        elif win_rate < 0.3:
            return 0.5

        return 1.0

    def calculate_final_position(self, base_size, drawdown, correlations, recent_perf):
        """计算最终仓位"""
        adj1 = self.market_regime_adjustment(drawdown)
        adj2 = self.correlation_adjustment(correlations)
        adj3 = self.performance_adjustment(recent_perf)

        final_size = base_size * adj1 * adj2 * adj3

        return final_size
```

## 组合层面仓位管理

```python
class PortfolioHeatManagement:
    """
    组合热力管理

    控制总风险敞口
    """

    def __init__(self, max_heat=0.06, max_positions=10):
        """
        max_heat: 最大热力（总风险百分比）
        max_positions: 最大持仓数量
        """
        self.max_heat = max_heat
        self.max_positions = max_positions

    def calculate_heat(self, positions, stop_losses):
        """
        计算当前热力

        热力 = Σ(仓位 × 每单位风险)
        """
        total_heat = 0
        for pos, stop in zip(positions, stop_losses):
            risk_per_unit = abs(pos['entry'] - stop)
            heat = pos['size'] * risk_per_unit / pos['account_value']
            total_heat += heat

        return total_heat

    def can_add_position(self, current_heat, new_position_heat):
        """检查是否可以添加新仓位"""
        return current_heat + new_position_heat <= self.max_heat

    def scale_positions(self, positions, target_heat):
        """
        按比例调整仓位以达到目标热力
        """
        current_heat = self.calculate_heat(positions, [p['stop'] for p in positions])

        if current_heat == 0:
            return positions

        scale_factor = target_heat / current_heat

        for pos in positions:
            pos['size'] *= scale_factor

        return positions
```

## 金字塔加仓

```python
class Pyramiding:
    """
    金字塔加仓策略

    盈利时逐步加仓
    """

    def __init__(self, max_units=4, atr_multiplier=0.5):
        self.max_units = max_units
        self.atr_multiplier = atr_multiplier

    def calculate_add_on_points(self, entry_price, atr, direction=1):
        """
        计算加仓点

        每上涨 N 个 ATR 加仓一次
        """
        add_on_points = []
        for i in range(1, self.max_units):
            if direction == 1:  # 多头
                point = entry_price + i * self.atr_multiplier * atr
            else:  # 空头
                point = entry_price - i * self.atr_multiplier * atr
            add_on_points.append(point)

        return add_on_points

    def calculate_unit_size(self, base_size, unit_number):
        """
        计算每单位规模

        金字塔：越往后规模越小
        """
        # 递减加仓
        return base_size * (1 - unit_number * 0.1)

    def should_add(self, current_price, last_add_price, atr, direction=1):
        """判断是否应该加仓"""
        if direction == 1:
            return current_price >= last_add_price + self.atr_multiplier * atr
        else:
            return current_price <= last_add_price - self.atr_multiplier * atr
```

## 实际应用示例

```python
def position_sizing_example():
    """仓位管理综合示例"""

    account_value = 100000
    entry_price = 100
    stop_loss = 95
    atr = 2.5
    historical_returns = pd.Series(np.random.randn(100) * 0.02)

    # 1. 固定比例法
    fixed_frac = FixedFractionalSizing(account_value, risk_percent=0.02)
    pos1 = fixed_frac.calculate_position(entry_price, stop_loss)
    print(f"固定比例仓位: {pos1:.2f} 股")

    # 2. 凯利公式
    kelly = KellyCriterion(win_rate=0.55, win_loss_ratio=2.0, half_kelly=True)
    pos2 = kelly.calculate_position(account_value, entry_price, atr)
    print(f"凯利仓位: {pos2:.2f} 股")

    # 3. 波动率目标
    vol_target = VolatilityTargeting(target_volatility=0.15)
    pos3 = vol_target.calculate_position(account_value, entry_price, historical_returns)
    print(f"波动率目标仓位: {pos3:.2f} 股")

    # 4. 动态调整
    dynamic = DynamicPositionSizing(base_position=0.1)
    final_pos = dynamic.calculate_final_position(
        base_size=pos1,
        drawdown=-0.10,
        correlations=[0.3, 0.4, 0.2],
        recent_perf=historical_returns
    )
    print(f"动态调整后仓位: {final_pos:.2f} 股")
```

## 注意事项

```
仓位管理黄金法则：

1. 永远不要用账户的100%去冒险
2. 单笔交易风险不超过2%
3. 总风险敞口（热力）不超过6%
4. 使用半凯利或更保守的仓位
5. 在市场不确定性高时降低仓位
6. 连续亏损时主动减仓
7. 不同策略使用不同的仓位管理规则
```

## 延伸阅读

- [止损策略](stop-loss) — 单笔交易的风险控制
- [组合风险管理](portfolio-risk) — 整体风险敞口控制
- [回撤控制](drawdown-control) — 最大回撤管理
