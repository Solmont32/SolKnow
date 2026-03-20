# 趋势跟踪策略

趋势跟踪是量化交易中最经典的策略类型之一，核心思想是"让利润奔跑，让亏损止步"。

## 理论基础

### 趋势的来源

**市场微观结构**
- 信息逐步扩散：新信息不会瞬间被所有投资者消化
- 投资者异质性：不同投资者有不同的信息集和分析能力
- 行为偏差：追涨杀跌、锚定效应、羊群效应

**数学描述**

价格可以分解为趋势和噪声：
$$P_t = T_t + \varepsilon_t$$

其中 $T_t$ 是趋势成分，$\varepsilon_t$ 是随机噪声。

### 趋势强度的度量

```python
import numpy as np
import pandas as pd

class TrendStrength:
    """趋势强度计算工具"""

    @staticmethod
    def adx(high, low, close, period=14):
        """
        平均趋向指数 (Average Directional Index)
        衡量趋势强度，不区分方向

        ADX > 25: 强趋势
        ADX < 20: 弱趋势/震荡
        """
        # True Range
        tr1 = high - low
        tr2 = abs(high - close.shift(1))
        tr3 = abs(low - close.shift(1))
        tr = pd.concat([tr1, tr2, tr3], axis=1).max(axis=1)

        # Directional Movement
        plus_dm = high.diff()
        minus_dm = -low.diff()

        plus_dm[plus_dm < 0] = 0
        minus_dm[minus_dm < 0] = 0

        plus_dm[plus_dm <= minus_dm] = 0
        minus_dm[minus_dm <= plus_dm] = 0

        # Smooth
        atr = tr.ewm(span=period, adjust=False).mean()
        plus_di = 100 * plus_dm.ewm(span=period, adjust=False).mean() / atr
        minus_di = 100 * minus_dm.ewm(span=period, adjust=False).mean() / atr

        # DX and ADX
        dx = 100 * abs(plus_di - minus_di) / (plus_di + minus_di)
        adx = dx.ewm(span=period, adjust=False).mean()

        return pd.DataFrame({
            'adx': adx,
            'plus_di': plus_di,
            'minus_di': minus_di
        })

    @staticmethod
    def linear_trend_slope(prices, period=20):
        """
        线性回归斜率
        正斜率表示上升趋势，负斜率表示下降趋势
        """
        def slope(x):
            if len(x) < 2:
                return 0
            x_norm = np.arange(len(x))
            return np.polyfit(x_norm, x, 1)[0]

        return prices.rolling(period).apply(slope, raw=True)

    @staticmethod
    def r_squared(prices, period=20):
        """
        决定系数 R²
        衡量趋势的可解释性，越高表示趋势越明显
        """
        def r2(x):
            if len(x) < 2:
                return 0
            x_norm = np.arange(len(x))
            slope, intercept = np.polyfit(x_norm, x, 1)
            y_pred = slope * x_norm + intercept
            ss_res = np.sum((x - y_pred) ** 2)
            ss_tot = np.sum((x - np.mean(x)) ** 2)
            return 1 - ss_res / ss_tot if ss_tot != 0 else 0

        return prices.rolling(period).apply(r2, raw=True)
```

## 经典趋势跟踪策略

### 1. 唐奇安通道突破

```python
class DonchianChannelBreakout:
    """
    唐奇安通道突破策略

    规则：
    - 价格突破过去 N 日最高价 → 做多
    - 价格跌破过去 N 日最低价 → 做空/平仓
    """

    def __init__(self, entry_period=20, exit_period=10):
        self.entry_period = entry_period
        self.exit_period = exit_period

    def generate_signals(self, prices, highs=None, lows=None):
        """
        生成交易信号

        prices: 收盘价
        highs: 最高价（可选，默认使用收盘价）
        lows: 最低价（可选，默认使用收盘价）
        """
        if highs is None:
            highs = prices
        if lows is None:
            lows = prices

        # 唐奇安通道
        upper_channel = highs.rolling(self.entry_period).max()
        lower_channel = lows.rolling(self.entry_period).min()

        # 出场通道（更短的周期）
        exit_upper = highs.rolling(self.exit_period).max()
        exit_lower = lows.rolling(self.exit_period).min()

        signals = pd.Series(0, index=prices.index)
        position = 0

        for i in range(1, len(prices)):
            if position == 0:
                # 突破上轨，做多
                if prices.iloc[i] > upper_channel.iloc[i-1]:
                    position = 1
                # 突破下轨，做空
                elif prices.iloc[i] < lower_channel.iloc[i-1]:
                    position = -1
            elif position == 1:
                # 跌破出场下轨，平仓
                if prices.iloc[i] < exit_lower.iloc[i-1]:
                    position = 0
            elif position == -1:
                # 涨破出场上轨，平仓
                if prices.iloc[i] > exit_upper.iloc[i-1]:
                    position = 0

            signals.iloc[i] = position

        return signals

    def calculate_position_size(self, prices, volatility, risk_per_trade=0.02):
        """
        基于波动率的仓位管理（海龟交易法）

        N = 20日平均真实波幅（ATR）
        每单位 N 风险承担账户的 1%
        """
        # ATR计算
        high = prices.rolling(2).max()
        low = prices.rolling(2).min()
        tr = high - low
        atr = tr.rolling(20).mean()

        # 单位规模 = 账户的 1% / N
        unit_size = risk_per_trade / atr

        return unit_size
```

### 2. ATR通道突破

```python
class ATRChannelBreakout:
    """
    ATR通道突破策略

    基于波动率动态调整通道宽度
    """

    def __init__(self, ma_period=20, atr_period=20, multiplier=2):
        self.ma_period = ma_period
        self.atr_period = atr_period
        self.multiplier = multiplier

    def calculate_atr(self, high, low, close):
        """计算真实波幅"""
        tr1 = high - low
        tr2 = abs(high - close.shift(1))
        tr3 = abs(low - close.shift(1))
        tr = pd.concat([tr1, tr2, tr3], axis=1).max(axis=1)
        return tr.rolling(self.atr_period).mean()

    def generate_signals(self, prices, highs=None, lows=None, closes=None):
        """生成信号"""
        if closes is None:
            closes = prices
        if highs is None:
            highs = prices
        if lows is None:
            lows = prices

        # 中轨 = 移动平均线
        middle = closes.rolling(self.ma_period).mean()

        # ATR通道
        atr = self.calculate_atr(highs, lows, closes)
        upper = middle + self.multiplier * atr
        lower = middle - self.multiplier * atr

        signals = pd.Series(0, index=prices.index)

        # 突破上轨做多，跌破下轨做空
        signals[closes > upper] = 1
        signals[closes < lower] = -1

        # 回到中轨平仓
        signals[(closes <= middle) & (closes >= middle)] = 0

        return signals.fillna(0)
```

### 3. 多重时间框架趋势

```python
class MultiTimeframeTrend:
    """
    多重时间框架趋势跟踪

    思想：大时间框架定方向，小时间框架找入场点
    """

    def __init__(self, long_period=50, short_period=20):
        self.long_period = long_period
        self.short_period = short_period

    def generate_signals(self, prices):
        """生成信号"""
        # 长期趋势（大时间框架）
        long_ma = prices.rolling(self.long_period).mean()

        # 短期趋势（小时间框架）
        short_ma = prices.rolling(self.short_period).mean()

        signals = pd.Series(0, index=prices.index)

        for i in range(1, len(prices)):
            # 长期上升趋势
            if prices.iloc[i] > long_ma.iloc[i]:
                # 短期金叉，做多
                if short_ma.iloc[i] > short_ma.iloc[i-1] and \
                   short_ma.iloc[i-1] <= prices.iloc[i-1] and \
                   short_ma.iloc[i] > prices.iloc[i]:
                    signals.iloc[i] = 1

            # 长期下降趋势
            elif prices.iloc[i] < long_ma.iloc[i]:
                # 短期死叉，做空
                if short_ma.iloc[i] < short_ma.iloc[i-1] and \
                   short_ma.iloc[i-1] >= prices.iloc[i-1] and \
                   short_ma.iloc[i] < prices.iloc[i]:
                    signals.iloc[i] = -1

        return signals
```

## 趋势过滤器

```python
class TrendFilters:
    """
    趋势过滤器：只在强趋势时交易
    """

    @staticmethod
    def volatility_filter(prices, lookback=20, threshold=0.02):
        """
        波动率过滤器

        波动率过高时暂停交易（可能即将反转）
        """
        returns = prices.pct_change()
        volatility = returns.rolling(lookback).std()

        # 波动率低于阈值才交易
        return volatility < threshold

    @staticmethod
    def volume_filter(prices, volumes, lookback=20):
        """
        成交量过滤器

        趋势需要成交量确认
        """
        volume_ma = volumes.rolling(lookback).mean()
        return volumes > volume_ma

    @staticmethod
    def regime_filter(prices, fast=50, slow=200):
        """
        市场状态过滤器

        只在明确趋势市场交易，避开震荡市
        """
        fast_ma = prices.rolling(fast).mean()
        slow_ma = prices.rolling(slow).mean()

        # 趋势明确：两条均线同向
        trend_up = (prices > fast_ma) & (fast_ma > slow_ma)
        trend_down = (prices < fast_ma) & (fast_ma < slow_ma)

        return trend_up | trend_down

    @staticmethod
    def correlation_filter(returns, benchmark_returns, lookback=60, min_corr=0.3):
        """
        相关性过滤器

        与基准相关性过低可能表示趋势异常
        """
        rolling_corr = returns.rolling(lookback).corr(benchmark_returns)
        return rolling_corr > min_corr
```

## 趋势跟踪的风险管理

```python
class TrendRiskManager:
    """
    趋势跟踪策略的专门风险管理
    """

    def __init__(self, initial_capital=100000):
        self.initial_capital = initial_capital
        self.current_capital = initial_capital

    def calculate_position_size(self, atr, risk_per_trade=0.01):
        """
        基于ATR的仓位管理（海龟交易法）

        每笔交易风险 = 账户资金的 1%
        仓位 = 风险金额 / (N × 每点价值)
        """
        risk_amount = self.current_capital * risk_per_trade

        # 假设每点价值为1
        position_size = risk_amount / atr

        return position_size

    def trailing_stop(self, prices, entry_price, current_position, atr, multiplier=3):
        """
        移动止损（跟踪止损）

        随着利润增加，不断提高止损位
        """
        if current_position == 1:  # 多头
            # 最高价 - N倍ATR
            highest_high = prices.expanding().max()
            stop_loss = highest_high - multiplier * atr
            stop_loss = stop_loss.clip(lower=entry_price)  # 不亏损

        elif current_position == -1:  # 空头
            # 最低价 + N倍ATR
            lowest_low = prices.expanding().min()
            stop_loss = lowest_low + multiplier * atr
            stop_loss = stop_loss.clip(upper=entry_price)

        else:
            stop_loss = pd.Series(np.nan, index=prices.index)

        return stop_loss

    def time_stop(self, entry_date, holding_days, max_holding=60):
        """
        时间止损

        趋势跟踪盈利需要时间，但太久不盈利应离场
        """
        return holding_days >= max_holding

    def correlation_risk_check(self, positions, returns_matrix):
        """
        组合相关性检查

        趋势跟踪策略在市场动荡时相关性上升
        """
        # 计算持仓之间的相关性
        position_returns = returns_matrix[positions.columns]
        corr_matrix = position_returns.corr()

        # 平均相关性
        avg_corr = corr_matrix.mean().mean()

        # 相关性过高时降低仓位
        if avg_corr > 0.7:
            return 0.5  # 减仓50%
        return 1.0
```

## 趋势跟踪组合

```python
class TrendFollowingPortfolio:
    """
    多品种趋势跟踪组合

    海龟交易法的核心思想：多品种、多时间框架
    """

    def __init__(self, symbols, risk_per_trade=0.01, max_positions=10):
        self.symbols = symbols
        self.risk_per_trade = risk_per_trade
        self.max_positions = max_positions

    def calculate_instrument_weights(self, volatility_dict):
        """
        基于波动率的品种权重

        目标：使每个品种对组合的风险贡献相等
        """
        # 波动率倒数加权
        inverse_vol = {s: 1/v for s, v in volatility_dict.items()}
        total = sum(inverse_vol.values())

        weights = {s: v/total for s, v in inverse_vol.items()}
        return weights

    def select_instruments(self, trend_strengths):
        """
        品种选择

        选择趋势最强的品种交易
        """
        # 按趋势强度排序
        sorted_strengths = sorted(
            trend_strengths.items(),
            key=lambda x: abs(x[1]),
            reverse=True
        )

        # 选择前 N 个
        selected = [s for s, _ in sorted_strengths[:self.max_positions]]
        return selected

    def heat_management(self, current_heat, new_signal_heat=0.01):
        """
        热力管理（总风险敞口控制）

        海龟交易法：最大热力 4-6 个单位
        """
        max_heat = 0.04  # 总风险不超过4%

        if current_heat + new_signal_heat > max_heat:
            return False  # 不新开仓
        return True
```

## 策略评估

```python
def evaluate_trend_strategy(returns, benchmark_returns=None):
    """
    评估趋势跟踪策略的特殊指标
    """
    metrics = {}

    # 基础指标
    metrics['total_return'] = (1 + returns).prod() - 1
    metrics['annual_return'] = returns.mean() * 252
    metrics['volatility'] = returns.std() * np.sqrt(252)
    metrics['sharpe_ratio'] = metrics['annual_return'] / metrics['volatility']

    # 回撤
    cum_returns = (1 + returns).cumprod()
    cummax = cum_returns.cummax()
    drawdown = (cum_returns - cummax) / cummax
    metrics['max_drawdown'] = drawdown.min()

    # 趋势跟踪特有指标
    # 1. 盈亏比
    positive_returns = returns[returns > 0]
    negative_returns = returns[returns < 0]
    metrics['profit_factor'] = abs(positive_returns.sum() / negative_returns.sum())

    # 2. 胜率
    metrics['win_rate'] = (returns > 0).mean()

    # 3. 平均盈利/亏损
    metrics['avg_win'] = positive_returns.mean()
    metrics['avg_loss'] = negative_returns.mean()

    # 4. 盈亏比
    metrics['payoff_ratio'] = abs(metrics['avg_win'] / metrics['avg_loss'])

    # 5. 盈亏不对称性（趋势跟踪应该有大的盈利）
    metrics['skewness'] = returns.skew()

    # 6. 与基准的相关性
    if benchmark_returns is not None:
        metrics['benchmark_corr'] = returns.corr(benchmark_returns)
        # 趋势跟踪策略在市场危机时通常表现好（负相关）
        metrics['crisis_alpha'] = returns[benchmark_returns < -0.05].mean()

    return metrics
```

## 延伸阅读

- [动量策略](momentum) — 与趋势跟踪的异同
- [均值回归](mean-reversion) — 相反的交易哲学
- [风险管理](/docs/quant/risk/) — 回撤控制与仓位管理
