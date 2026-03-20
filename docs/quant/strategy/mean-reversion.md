# 均值回归策略

均值回归策略是基于"价格围绕价值波动"假设的经典策略，认为价格偏离均值后会回归。

## 理论基础

### 均值回归的数学原理

**Ornstein-Uhlenbeck过程**:
$$dX_t = \theta(\mu - X_t)dt + \sigma dW_t$$

其中：
- $\theta$: 回归速度
- $\mu$: 长期均值
- $\sigma$: 波动率

**半衰期计算**:
$$T_{1/2} = \frac{\ln(2)}{\theta}$$

```python
import numpy as np
import pandas as pd
from scipy import stats

class MeanReversionMath:
    """均值回归数学工具"""

    @staticmethod
    def calculate_half_life(prices):
        """
        计算均值回归半衰期

        方法：对价格变化做回归
        Δy(t) = α + βy(t-1) + ε
        半衰期 = -ln(2)/β
        """
        prices = np.log(prices)
        delta = prices.diff().dropna()
        lag = prices.shift(1).dropna()

        # 回归
        slope, intercept, r_value, p_value, std_err = stats.linregress(
            lag.values, delta.values
        )

        half_life = -np.log(2) / slope if slope < 0 else np.inf

        return {
            'half_life': half_life,
            'slope': slope,
            'p_value': p_value,
            'r_squared': r_value**2
        }

    @staticmethod
    def hurst_exponent(prices, max_lag=100):
        """
        Hurst指数判断趋势性/均值回归

        H < 0.5: 均值回归
        H = 0.5: 随机游走
        H > 0.5: 趋势延续
        """
        lags = range(2, max_lag)
        tau = [np.std(np.subtract(prices[lag:], prices[:-lag])) for lag in lags]

        # 对数回归
        poly = np.polyfit(np.log(lags), np.log(tau), 1)
        hurst = poly[0]

        return hurst
```

## 配对交易

### 统计套利基础

```python
class StatisticalArbitrage:
    """
    统计套利策略
    基于协整关系的配对交易
    """

    def __init__(self, entry_z=2.0, exit_z=0.0, stop_z=4.0):
        self.entry_z = entry_z    # 入场阈值
        self.exit_z = exit_z      # 出场阈值
        self.stop_z = stop_z      # 止损阈值

    def find_cointegrated_pairs(self, prices_df, pvalue_threshold=0.05):
        """
        寻找协整配对
        """
        from statsmodels.tsa.stattools import coint

        n = prices_df.shape[1]
        pairs = []

        for i in range(n):
            for j in range(i+1, n):
                stock1 = prices_df.iloc[:, i]
                stock2 = prices_df.iloc[:, j]

                score, pvalue, _ = coint(stock1, stock2)

                if pvalue < pvalue_threshold:
                    # 计算相关性
                    correlation = stock1.corr(stock2)

                    pairs.append({
                        'stock1': prices_df.columns[i],
                        'stock2': prices_df.columns[j],
                        'pvalue': pvalue,
                        'score': score,
                        'correlation': correlation
                    })

        return pd.DataFrame(pairs).sort_values('pvalue')

    def calculate_hedge_ratio(self, prices1, prices2, method='ols'):
        """
        计算对冲比率
        """
        if method == 'ols':
            # OLS回归
            import statsmodels.api as sm
            X = sm.add_constant(prices2)
            model = sm.OLS(prices1, X).fit()
            hedge_ratio = model.params[1]
            intercept = model.params[0]

        elif method == 'tls':
            # 总体最小二乘（考虑双向误差）
            # 使用PCA第一主成分
            from sklearn.decomposition import PCA
            data = np.column_stack([prices1, prices2])
            pca = PCA(n_components=1)
            pca.fit(data)
            hedge_ratio = -pca.components_[0][1] / pca.components_[0][0]
            intercept = 0

        return hedge_ratio, intercept

    def generate_signals(self, spread, lookback=20):
        """
        生成交易信号
        """
        # 计算Z-score
        mean = spread.rolling(lookback).mean()
        std = spread.rolling(lookback).std()
        zscore = (spread - mean) / std

        signals = pd.DataFrame(index=spread.index)
        signals['zscore'] = zscore
        signals['position'] = 0

        # 做多价差
        signals.loc[zscore < -self.entry_z, 'position'] = 1

        # 做空价差
        signals.loc[zscore > self.entry_z, 'position'] = -1

        # 平仓
        signals.loc[abs(zscore) < abs(self.exit_z), 'position'] = 0

        # 止损
        signals.loc[abs(zscore) > self.stop_z, 'position'] = 0

        # 保持仓位直到触发退出条件
        signals['position'] = signals['position'].replace(to_replace=0, method='ffill')

        return signals
```

### 卡尔曼滤波配对

```python
from pykalman import KalmanFilter

class KalmanPairsTrading:
    """
    使用卡尔曼滤波的动态配对交易
    相比静态OLS，能适应市场变化
    """

    def __init__(self):
        self.hedge_ratios = []
        self.intercepts = []

    def fit(self, prices1, prices2):
        """
        拟合卡尔曼滤波模型
        """
        # 观测矩阵: [prices2, 1]
        observations = np.column_stack([prices2, np.ones(len(prices2))])

        # 初始化卡尔曼滤波
        kf = KalmanFilter(
            n_dim_obs=1,
            n_dim_state=2,  # [hedge_ratio, intercept]
            initial_state_mean=[1, 0],
            initial_state_covariance=np.ones((2, 2)),
            observation_matrices=observations[:, np.newaxis, :],
            observation_covariance=1.0,
            transition_covariance=0.001 * np.eye(2)  # 状态转移噪声
        )

        # 滤波
        state_means, state_covs = kf.filter(prices1)

        self.hedge_ratios = state_means[:, 0]
        self.intercepts = state_means[:, 1]

        # 计算动态残差
        self.spread = prices1 - (self.hedge_ratios * prices2 + self.intercepts)

        return self

    def generate_signals(self, entry_threshold=2.0):
        """
        基于动态spread生成信号
        """
        # 计算滚动Z-score
        rolling_mean = pd.Series(self.spread).rolling(20).mean()
        rolling_std = pd.Series(self.spread).rolling(20).std()
        zscore = (self.spread - rolling_mean) / rolling_std

        signals = pd.Series(0, index=range(len(zscore)))

        # 入场
        signals[zscore < -entry_threshold] = 1   # 做多spread
        signals[zscore > entry_threshold] = -1   # 做空spread

        # 出场（回归均值）
        signals[abs(zscore) < 0.5] = 0

        return signals.fillna(0)
```

## Bollinger Bands策略

```python
class BollingerBandsStrategy:
    """
    布林带均值回归策略
    """

    def __init__(self, window=20, num_std=2):
        self.window = window
        self.num_std = num_std

    def calculate_bands(self, prices):
        """
        计算布林带
        """
        sma = prices.rolling(self.window).mean()
        std = prices.rolling(self.window).std()

        upper_band = sma + (std * self.num_std)
        lower_band = sma - (std * self.num_std)

        # %B指标（价格在布林带中的位置）
        percent_b = (prices - lower_band) / (upper_band - lower_band)

        # 带宽（波动率指标）
        bandwidth = (upper_band - lower_band) / sma

        return {
            'middle': sma,
            'upper': upper_band,
            'lower': lower_band,
            'percent_b': percent_b,
            'bandwidth': bandwidth
        }

    def generate_signals(self, prices):
        """
        生成交易信号
        """
        bands = self.calculate_bands(prices)

        signals = pd.DataFrame(index=prices.index)
        signals['price'] = prices
        signals['position'] = 0

        # 价格触及下轨 → 买入
        signals.loc[prices < bands['lower'], 'position'] = 1

        # 价格触及上轨 → 卖出
        signals.loc[prices > bands['upper'], 'position'] = -1

        # 回到中轨 → 平仓
        middle_cross = (prices.shift(1) < bands['middle']) & (prices >= bands['middle'])
        signals.loc[middle_cross, 'position'] = 0

        # 填充仓位
        signals['position'] = signals['position'].replace(to_replace=0, method='ffill')

        return signals

    def squeeze_strategy(self, prices):
        """
        布林带挤压策略

        逻辑：带宽极度收窄后往往伴随大波动
        等待挤压后突破方向
        """
        bands = self.calculate_bands(prices)

        # 计算带宽历史百分位
        bandwidth = bands['bandwidth']
        bandwidth_percentile = bandwidth.rolling(252).apply(
            lambda x: stats.percentileofscore(x, x.iloc[-1])
        )

        signals = pd.Series(0, index=prices.index)

        # 带宽低于10%分位 → 挤压状态
        squeeze = bandwidth_percentile < 10

        # 挤压后向上突破
        breakout_up = squeeze.shift(1) & (prices > bands['upper'])
        signals[breakout_up] = 1

        # 挤压后向下突破
        breakout_down = squeeze.shift(1) & (prices < bands['lower'])
        signals[breakout_down] = -1

        return signals
```

## RSI策略

```python
class RSIStrategy:
    """
    RSI（相对强弱指数）均值回归策略
    """

    def __init__(self, period=14, overbought=70, oversold=30):
        self.period = period
        self.overbought = overbought
        self.oversold = oversold

    def calculate_rsi(self, prices):
        """
        计算RSI
        """
        delta = prices.diff()

        gain = (delta.where(delta > 0, 0)).rolling(window=self.period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=self.period).mean()

        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))

        return rsi

    def generate_signals(self, prices):
        """
        生成交易信号
        """
        rsi = self.calculate_rsi(prices)

        signals = pd.DataFrame(index=prices.index)
        signals['rsi'] = rsi
        signals['position'] = 0

        # RSI超卖（<30）→ 买入
        signals.loc[rsi < self.oversold, 'position'] = 1

        # RSI超买（>70）→ 卖出
        signals.loc[rsi > self.overbought, 'position'] = -1

        # RSI回到50 → 平仓
        signals.loc[(rsi.shift(1) < 50) & (rsi >= 50), 'position'] = 0]
        signals.loc[(rsi.shift(1) > 50) & (rsi <= 50), 'position'] = 0]

        return signals

    def rsi_divergence(self, prices):
        """
        RSI背离策略

        底背离：价格新低，RSI未新低 → 看涨
        顶背离：价格新高，RSI未新高 → 看跌
        """
        rsi = self.calculate_rsi(prices)

        # 寻找局部极值点
        price_lows = self.find_local_minima(prices)
        rsi_lows = self.find_local_minima(rsi)

        signals = pd.Series(0, index=prices.index)

        # 检测底背离
        for i in range(1, len(price_lows)):
            if (prices.iloc[price_lows[i]] < prices.iloc[price_lows[i-1]] and  # 价格新低
                rsi.iloc[rsi_lows[i]] > rsi.iloc[rsi_lows[i-1]]):              # RSI未新低
                signals.iloc[price_lows[i]] = 1  # 买入信号

        return signals

    def find_local_minima(self, series, window=5):
        """寻找局部最小值"""
        minima = []
        for i in range(window, len(series) - window):
            if series.iloc[i] == series.iloc[i-window:i+window].min():
                minima.append(i)
        return minima
```

## 跨品种套利

```python
class InterCommoditySpread:
    """
    跨品种套利策略

    例子：
    - 大豆 vs 豆粕（压榨套利）
    - 原油 vs 汽油（裂解价差）
    - 黄金 vs 白银（金银比）
    """

    def __init__(self, commodity1, commodity2, ratio='spread'):
        self.commodity1 = commodity1
        self.commodity2 = commodity2
        self.ratio = ratio

    def calculate_spread(self, prices1, prices2):
        """
        计算价差/价比
        """
        if self.ratio == 'spread':
            # 价差
            spread = prices1 - prices2
        elif self.ratio == 'ratio':
            # 价比
            spread = prices1 / prices2
        elif self.ratio == 'log':
            # 对数价差
            spread = np.log(prices1) - np.log(prices2)

        return spread

    def seasonal_analysis(self, spread, lookback_years=5):
        """
        季节性分析

        很多商品价差有季节性规律
        """
        # 按月份统计
        monthly_stats = spread.groupby(spread.index.month).agg({
            'mean': 'mean',
            'std': 'std',
            'min': 'min',
            'max': 'max'
        })

        return monthly_stats

    def generate_seasonal_signals(self, spread):
        """
        基于季节性生成信号
        """
        current_month = spread.index[-1].month
        current_value = spread.iloc[-1]

        # 获取该月历史统计
        historical = spread[spread.index.month == current_month]
        hist_mean = historical.mean()
        hist_std = historical.std()

        zscore = (current_value - hist_mean) / hist_std

        if zscore < -2:
            return 1  # 买入价差
        elif zscore > 2:
            return -1  # 卖出价差
        else:
            return 0
```

## 风险管理

```python
class MeanReversionRiskManager:
    """
    均值回归策略风险管理
    """

    def __init__(self):
        self.max_holding_period = 20  # 最大持有天数
        self.stop_loss_pct = 0.05     # 5%止损

    def detect_trend_change(self, prices, lookback=50):
        """
        检测趋势是否改变

        均值回归在趋势改变时会持续亏损
        """
        # 计算移动平均线
        sma_short = prices.rolling(20).mean()
        sma_long = prices.rolling(50).mean()

        # 趋势向上：短均线上穿长均线
        trend_up = sma_short.iloc[-1] > sma_long.iloc[-1]

        # 趋势强度
        adx = self.calculate_adx(prices)
        strong_trend = adx.iloc[-1] > 25

        return {
            'trend_direction': 'up' if trend_up else 'down',
            'strong_trend': strong_trend,
            'should_avoid': strong_trend  # 强趋势时避免均值回归
        }

    def calculate_adx(self, prices, period=14):
        """计算ADX（平均趋向指数）"""
        high = prices.rolling(2).max()
        low = prices.rolling(2).min()
        close = prices

        plus_dm = high.diff()
        minus_dm = low.diff()

        tr = pd.concat([
            high - low,
            abs(high - close.shift(1)),
            abs(low - close.shift(1))
        ], axis=1).max(axis=1)

        atr = tr.rolling(period).mean()

        plus_di = 100 * (plus_dm.rolling(period).mean() / atr)
        minus_di = 100 * (minus_dm.rolling(period).mean() / atr)

        dx = 100 * abs(plus_di - minus_di) / (plus_di + minus_di)
        adx = dx.rolling(period).mean()

        return adx

    def position_sizing(self, signal_strength, volatility, correlation):
        """
        仓位管理

        均值回归策略特点：
        - 胜率较高但盈亏比低
        - 需要控制单次亏损
        """
        # 信号越强，仓位越大（但限制最大仓位）
        signal_weight = min(abs(signal_strength) / 3, 1.0)

        # 波动率调整（波动率越高，仓位越小）
        vol_weight = 0.2 / volatility
        vol_weight = min(vol_weight, 1.5)

        # 考虑分散化
        corr_adjust = 1 / (1 + correlation)

        position = signal_weight * vol_weight * corr_adjust

        return np.clip(position, 0, 1.0)
```

## 延伸阅读

- [动量策略](momentum) — 趋势延续策略
- [配对交易](pairs-trading) — 统计套利详解
- [时间序列分析](/docs/quant/math/time-series) — 协整检验、平稳性
