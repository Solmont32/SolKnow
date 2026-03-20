# 动量策略

动量策略是基于"趋势延续"假设的经典量化策略，认为过去表现好的资产未来短期内仍会表现好。

## 理论基础

### 动量效应的来源

**行为金融学解释**:
- **反应不足**：投资者对信息反应缓慢，导致价格逐步调整
- **锚定效应**：投资者过于依赖历史价格，调整不充分
- **羊群效应**：投资者跟随市场趋势，强化动量

**风险补偿解释**:
- 高动量股票可能承担更高的系统性风险
- 崩盘风险（Momentum Crashes）

### 动量类型

| 类型 | 时间尺度 | 适用市场 |
|------|----------|----------|
| **短期动量** | 1天-1周 | 高波动市场（加密货币） |
| **中期动量** | 1-12个月 | 股票市场（12个月最经典） |
| **长期动量** | 1年以上 | 宏观资产配置 |
| **日内动量** | 分钟-小时 | 高频交易 |

## 经典动量策略

### 截面动量（Cross-Sectional）

在多个资产间比较，买入过去表现好的，卖出表现差的。

```python
import pandas as pd
import numpy as np

class CrossSectionalMomentum:
    """
    截面动量策略
    基于Jegadeesh & Titman (1993) 经典研究
    """

    def __init__(self, lookback=252, hold_period=63, top_n=10):
        """
        lookback: 回看期（形成期）
        hold_period: 持有期
        top_n: 选取股票数量
        """
        self.lookback = lookback      # 默认12个月
        self.hold_period = hold_period # 默认3个月
        self.top_n = top_n

    def calculate_momentum(self, prices):
        """
        计算动量指标

        传统方法: 过去12个月收益率（剔除最近1个月）
        剔除最近1个月是为了避免短期反转效应
        """
        # 过去12个月总收益
        long_term = prices.pct_change(self.lookback)

        # 最近1个月收益
        short_term = prices.pct_change(21)

        # 12-1个月动量
        momentum = long_term - short_term

        return momentum.iloc[-1]  # 取最新值

    def generate_signals(self, prices):
        """
        生成交易信号
        """
        momentum = self.calculate_momentum(prices)

        # 排序
        momentum_rank = momentum.rank(ascending=False)

        signals = pd.Series(0, index=prices.columns)

        # 做多前top_n
        long_candidates = momentum_rank[momentum_rank <= self.top_n].index
        signals[long_candidates] = 1

        # 做空后top_n
        short_candidates = momentum_rank[momentum_rank > len(momentum_rank) - self.top_n].index
        signals[short_candidates] = -1

        return signals

    def backtest(self, prices, rebalance_freq='M'):
        """
        回测策略
        """
        returns = pd.DataFrame(index=prices.index, columns=['strategy'])

        # 按再平衡频率分组
        if rebalance_freq == 'M':
            groups = prices.groupby([prices.index.year, prices.index.month])
        elif rebalance_freq == 'Q':
            groups = prices.groupby([prices.index.year, prices.index.quarter])

        for name, group in groups:
            if len(group) < self.lookback:
                continue

            # 在该期初计算动量
            period_prices = prices.loc[:group.index[0]]
            signals = self.generate_signals(period_prices)

            # 计算该期收益
            period_returns = group.pct_change().mean(axis=1)  # 简化示例

            # 实际应该根据signals构建组合权重
            # 这里简化处理

        return returns
```

### 时间序列动量（Time-Series）

判断单一资产的趋势方向，顺势交易。

```python
class TimeSeriesMomentum:
    """
    时间序列动量策略
    也称为趋势跟踪策略
    """

    def __init__(self, lookback=252, vol_lookback=63, target_vol=0.15):
        self.lookback = lookback
        self.vol_lookback = vol_lookback
        self.target_vol = target_vol

    def calculate_signal(self, prices):
        """
        计算动量信号

        核心: 过去收益率的正负和大小
        """
        returns = prices.pct_change()

        # 计算过去lookback天的总收益
        total_return = (prices.iloc[-1] / prices.iloc[-self.lookback] - 1)

        # 计算波动率（用于仓位调整）
        volatility = returns.iloc[-self.vol_lookback:].std() * np.sqrt(252)

        # 计算风险调整后的动量信号
        # 公式: 总收益 / 年化波动率
        momentum_score = total_return / volatility

        return momentum_score, volatility

    def calculate_position(self, prices):
        """
        计算目标仓位

        使用波动率目标法调整仓位
        """
        momentum_score, volatility = self.calculate_signal(prices)

        # 信号强度决定方向
        direction = np.sign(momentum_score)

        # 波动率调整仓位
        # 目标波动率 / 实际波动率 = 杠杆倍数
        vol_scalar = self.target_vol / volatility

        # 限制最大杠杆
        vol_scalar = np.clip(vol_scalar, 0, 2)

        position = direction * vol_scalar

        return position

# 双均线动量策略
class DualMovingAverage:
    """
    双均线交叉动量策略
    最简单的时间序列动量实现
    """

    def __init__(self, short_window=50, long_window=200):
        self.short_window = short_window
        self.long_window = long_window

    def generate_signals(self, prices):
        """
        生成买卖信号

        金叉: 短均线上穿长均线 → 买入
        死叉: 短均线下穿长均线 → 卖出
        """
        short_ma = prices.rolling(self.short_window).mean()
        long_ma = prices.rolling(self.long_window).mean()

        signals = pd.Series(0, index=prices.index)

        # 金叉
        signals[short_ma > long_ma] = 1

        # 死叉
        signals[short_ma <= long_ma] = -1

        # 只保留变化点（减少交易次数）
        position_changes = signals.diff().fillna(0)

        return signals, short_ma, long_ma
```

## 动量策略改进

### 1. 动量质量筛选

不是所有动量都一样，需要筛选"高质量"动量。

```python
class QualityMomentum:
    """
    质量动量策略
    结合动量和风险调整指标
    """

    def calculate_momentum_quality(self, prices):
        """
        计算动量质量分数
        """
        returns = prices.pct_change()

        # 1. 传统动量（收益率）
        momentum = prices.pct_change(252).iloc[-1]

        # 2. 夏普动量（风险调整后）
        sharpe = returns.mean() / returns.std() * np.sqrt(252)

        # 3. 趋势一致性（避免震荡）
        monthly_returns = prices.pct_change(21)
        consistency = (monthly_returns > 0).sum() / len(monthly_returns)

        # 4. 最大回撤（风险控制）
        cummax = prices.cummax()
        drawdown = (prices - cummax) / cummax
        max_dd = drawdown.min()

        # 综合评分（可调整权重）
        quality_score = (
            0.4 * momentum +
            0.3 * sharpe +
            0.2 * consistency +
            0.1 * (1 + max_dd)  # 回撤越小越好
        )

        return quality_score
```

### 2. 残差动量（Residual Momentum）

剔除市场因素后的个股特主动量。

```python
import statsmodels.api as sm

class ResidualMomentum:
    """
    残差动量策略

    步骤:
    1. 用个股收益对市场收益回归
    2. 取残差（无法被市场解释的部分）
    3. 计算残差的动量
    """

    def __init__(self, lookback=252):
        self.lookback = lookback

    def calculate_residual_momentum(self, stock_returns, market_returns):
        """
        计算残差动量
        """
        # 回归: 股票收益 = alpha + beta * 市场收益 + 残差
        X = sm.add_constant(market_returns)
        model = sm.OLS(stock_returns, X).fit()

        # 取残差
        residuals = model.resid

        # 残差的累积和作为残差动量
        residual_momentum = residuals.sum()

        return {
            'residual_momentum': residual_momentum,
            'alpha': model.params[0],
            'beta': model.params[1],
            'r_squared': model.rsquared
        }
```

### 3. 动量与波动率结合

```python
class VolatilityAdjustedMomentum:
    """
    波动率调整动量

    思想: 高波动时期的动量可能更不可持续
    """

    def calculate_vol_adjusted_momentum(self, prices):
        """
        计算波动率调整后的动量
        """
        returns = prices.pct_change().dropna()

        # 计算各资产的IDIVOL（特质波动率）
        idivols = {}
        for col in returns.columns:
            # 这里简化处理，实际应对市场回归取残差标准差
            idivol = returns[col].std() * np.sqrt(252)
            idivols[col] = idivol

        # 传统动量
        momentum = prices.pct_change(252).iloc[-1]

        # 波动率调整: 高波动资产降低权重
        vol_adjusted_momentum = pd.Series(index=momentum.index)
        for asset in momentum.index:
            vol = idivols[asset]
            vol_adj = 1 / (1 + vol)  # 波动率越低，调整系数越大
            vol_adjusted_momentum[asset] = momentum[asset] * vol_adj

        return vol_adjusted_momentum
```

## 风险管理

### 动量策略的特殊风险

```python
class MomentumRiskManager:
    """
    动量策略风险管理
    """

    def __init__(self):
        self.momentum_crash_threshold = -0.15  # 15%回撤预警

    def detect_momentum_crash(self, momentum_portfolio_returns):
        """
        检测动量崩溃

        动量崩溃通常发生在:
        1. 市场剧烈反转时
        2. 长期趋势突然改变
        3. 高波动时期
        """
        # 计算近期回撤
        cumulative = (1 + momentum_portfolio_returns).cumprod()
        peak = cumulative.expanding().max()
        drawdown = (cumulative - peak) / peak

        # 检测是否处于动量崩溃
        current_dd = drawdown.iloc[-1]

        if current_dd < self.momentum_crash_threshold:
            # 动量崩溃，考虑平仓或反转
            return {
                'status': 'CRASH',
                'drawdown': current_dd,
                'action': 'REDUCE_POSITION'
            }

        # 检测动量强度衰减
        recent_momentum = momentum_portfolio_returns.iloc[-63:].mean()
        if recent_momentum < 0:
            return {
                'status': 'WEAKENING',
                'action': 'MONITOR_CLOSELY'
            }

        return {'status': 'NORMAL'}

    def dynamic_position_sizing(self, signal_strength, volatility, correlation):
        """
        动态仓位管理
        """
        # 基础仓位
        base_position = 1.0

        # 根据信号强度调整
        signal_scalar = min(abs(signal_strength), 2.0)

        # 根据波动率调整（波动率越高，仓位越小）
        vol_scalar = 0.15 / volatility  # 目标年化波动率15%
        vol_scalar = min(vol_scalar, 2.0)

        # 根据组合相关性调整（相关性高时降低仓位）
        corr_scalar = 1 / (1 + correlation)

        final_position = base_position * signal_scalar * vol_scalar * corr_scalar

        return np.clip(final_position, 0, 2.0)  # 0-200%仓位
```

## 回测要点

```python
def backtest_momentum(prices, lookback=252, hold_period=63):
    """
    动量策略回测

    注意事项:
    1. 避免前视偏差（lookahead bias）
    2. 考虑交易成本
    3. 处理幸存者偏差
    """
    returns = pd.DataFrame()

    # 按月再平衡
    for date in prices.resample('M').last().index:
        if date < prices.index[0] + pd.Timedelta(days=lookback):
            continue

        # 使用再平衡日之前的已知数据计算动量
        historical = prices.loc[:date]
        momentum = historical.pct_change(lookback).iloc[-1]

        # 排序选择
        top_stocks = momentum.nlargest(10).index

        # 持有期收益（注意：这里简化处理，实际要考虑持有期内的日度收益）
        future_returns = prices.loc[date:date + pd.Timedelta(days=hold_period)].pct_change()

        # 组合收益
        port_return = future_returns[top_stocks].mean(axis=1)

        returns = pd.concat([returns, port_return])

    return returns
```

## 延伸阅读

- [均值回归策略](mean-reversion) — 与动量相反的逆向策略
- [因子投资](factor-investing) — 系统性因子分析
- [风险管理](/docs/quant/risk/) — 回撤控制与仓位管理
