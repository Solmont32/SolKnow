# 时间序列分析

时间序列分析是量化交易的核心数学工具，用于建模和预测金融数据的时间动态。

## 基本概念

### 时间序列的组成

金融时间序列通常可以分解为：

$$Y_t = T_t + S_t + C_t + \varepsilon_t$$

- **$T_t$**: 趋势成分（长期方向）
- **$S_t$**: 季节成分（周期性波动）
- **$C_t$**: 循环成分（经济周期）
- **$\varepsilon_t$**: 随机误差

```python
import numpy as np
import pandas as pd
from statsmodels.tsa.seasonal import seasonal_decompose

# 时间序列分解
def decompose_time_series(prices, period=252):
    """
    分解时间序列
    period: 周期长度（日线数据252代表一年交易日）
    """
    result = seasonal_decompose(
        prices,
        model='additive',  # 或 'multiplicative'
        period=period
    )

    return {
        'observed': result.observed,
        'trend': result.trend,
        'seasonal': result.seasonal,
        'residual': result.resid
    }
```

## 平稳性

### 平稳性的定义

**严平稳**: 联合分布不随时间变化
**宽平稳**: 均值和方差恒定，自协方差仅与时间间隔有关

### 单位根检验

**ADF检验（Augmented Dickey-Fuller）**:
```python
from statsmodels.tsa.stattools import adfuller

def check_stationarity(series):
    """
    ADF检验判断序列是否平稳
    """
    result = adfuller(series.dropna())

    print(f'ADF Statistic: {result[0]:.6f}')
    print(f'p-value: {result[1]:.6f}')
    print('Critical Values:')
    for key, value in result[4].items():
        print(f'\t{key}: {value:.3f}')

    if result[1] <= 0.05:
        print("序列平稳（拒绝单位根假设）")
        return True
    else:
        print("序列非平稳（存在单位根）")
        return False

# 对价格序列进行检验
# 通常价格非平稳，收益率平稳
returns = prices.pct_change().dropna()
is_stationary = check_stationarity(returns)
```

### 差分操作

将非平稳序列转化为平稳序列：

```python
def make_stationary(prices, max_diff=2):
    """
    通过差分使序列平稳
    """
    series = prices.copy()
    diff_count = 0

    while diff_count < max_diff:
        if check_stationarity(series):
            break
        series = series.diff().dropna()
        diff_count += 1

    return series, diff_count

# 一阶差分（收益率）
returns = prices.diff().dropna()

# 对数收益率（更常用）
log_returns = np.log(prices / prices.shift(1)).dropna()
```

## ARIMA模型

### 模型结构

**ARIMA(p, d, q)**: 自回归积分滑动平均模型

- **AR(p)**: 自回归项，用过去p期的值作线性回归
- **I(d)**: 差分次数
- **MA(q)**: 移动平均项，用过去q期的误差作修正

```python
from statsmodels.tsa.arima.model import ARIMA
from itertools import product

def optimize_arima(series, max_p=5, max_d=2, max_q=5):
    """
    使用AIC准则优化ARIMA参数
    """
    best_aic = float('inf')
    best_params = None
    best_model = None

    for p, d, q in product(range(max_p+1), range(max_d+1), range(max_q+1)):
        if p == 0 and q == 0:
            continue

        try:
            model = ARIMA(series, order=(p, d, q))
            fitted = model.fit()

            if fitted.aic < best_aic:
                best_aic = fitted.aic
                best_params = (p, d, q)
                best_model = fitted

        except Exception as e:
            continue

    return best_model, best_params, best_aic

# 拟合ARIMA模型
model = ARIMA(returns, order=(2, 0, 2))
results = model.fit()

# 预测
forecast = results.forecast(steps=5)
print(results.summary())
```

### 残差分析

```python
def analyze_residuals(model_results):
    """
    分析模型残差
    """
    residuals = model_results.resid

    # 白噪声检验
    from statsmodels.stats.diagnostic import acorr_ljungbox
    lb_test = acorr_ljungbox(residuals, lags=10, return_df=True)

    # 正态性检验
    from scipy import stats
    jb_stat, jb_pvalue = stats.jarque_bera(residuals)

    return {
        'ljung_box_pvalue': lb_test['lb_pvalue'].iloc[-1],
        'jarque_bera_pvalue': jb_pvalue,
        'residual_std': residuals.std(),
        'is_white_noise': lb_test['lb_pvalue'].iloc[-1] > 0.05
    }
```

## GARCH模型

金融收益率的波动率聚类特性：

```python
from arch import arch_model

def fit_garch(returns, vol='Garch', p=1, q=1):
    """
    拟合GARCH模型用于波动率预测
    """
    model = arch_model(
        returns,
        vol=vol,      # 'Garch', 'EGARCH', 'GJR-GARCH'
        p=p,
        q=q,
        dist='normal'  # 或 't', 'skewt'
    )

    results = model.fit(disp='off')

    # 预测波动率
    forecasts = results.forecast(horizon=5)

    return {
        'model': results,
        'conditional_volatility': results.conditional_volatility,
        'forecast_variance': forecasts.variance.iloc[-1],
        'params': results.params
    }

# GARCH策略应用：波动率择时
def volatility_timing_strategy(returns, garch_results, threshold=0.02):
    """
    基于GARCH预测的交易策略
    当预测波动率高于阈值时降低仓位
    """
    forecast_vol = np.sqrt(garch_results['forecast_variance'])

    position = 1.0 if forecast_vol < threshold else 0.5

    return position
```

## 协整与配对交易

### 协整检验

```python
from statsmodels.tsa.stattools import coint, adfuller

def find_cointegrated_pairs(prices_df):
    """
    寻找协整配对
    """
    n = prices_df.shape[1]
    score_matrix = np.zeros((n, n))
    pvalue_matrix = np.ones((n, n))
    pairs = []

    for i in range(n):
        for j in range(i+1, n):
            s1 = prices_df.iloc[:, i]
            s2 = prices_df.iloc[:, j]

            score, pvalue, _ = coint(s1, s2)
            score_matrix[i, j] = score
            pvalue_matrix[i, j] = pvalue

            if pvalue < 0.05:
                pairs.append((
                    prices_df.columns[i],
                    prices_df.columns[j],
                    pvalue
                ))

    return pairs, pvalue_matrix

# 配对交易策略
class PairsTradingStrategy:
    def __init__(self, asset_a, asset_b, lookback=60):
        self.asset_a = asset_a
        self.asset_b = asset_b
        self.lookback = lookback
        self.hedge_ratio = None
        self.spread_mean = None
        self.spread_std = None

    def calculate_hedge_ratio(self, prices_a, prices_b):
        """计算对冲比率（OLS回归）"""
        import statsmodels.api as sm

        X = sm.add_constant(prices_b)
        model = sm.OLS(prices_a, X).fit()

        self.hedge_ratio = model.params[1]
        return self.hedge_ratio

    def calculate_spread(self, price_a, price_b):
        """计算价差"""
        if self.hedge_ratio is None:
            raise ValueError("先计算对冲比率")

        spread = price_a - self.hedge_ratio * price_b
        return spread

    def generate_signals(self, prices_a, prices_b, entry_z=2, exit_z=0):
        """
        生成交易信号
        entry_z: 入场Z分数阈值
        exit_z: 出场Z分数阈值
        """
        # 计算历史价差统计
        spread = self.calculate_spread(prices_a, prices_b)
        self.spread_mean = spread.mean()
        self.spread_std = spread.std()

        # 标准化价差
        z_score = (spread - self.spread_mean) / self.spread_std

        signals = pd.Series(index=prices_a.index, data=0)

        # 做多价差（买入A，卖出B）
        signals[z_score < -entry_z] = 1

        # 做空价差（卖出A，买入B）
        signals[z_score > entry_z] = -1

        # 平仓
        signals[abs(z_score) < abs(exit_z)] = 0

        return signals, z_score
```

## 状态空间模型

### 卡尔曼滤波

```python
from pykalman import KalmanFilter

def kalman_filter_pairs(prices_a, prices_b):
    """
    使用卡尔曼滤波动态估计对冲比率
    相比静态OLS，能自适应市场变化
    """
    # 观测矩阵: [ prices_b, 1 ]
    observations = np.column_stack([prices_b, np.ones(len(prices_b))])

    kf = KalmanFilter(
        n_dim_obs=1,
        n_dim_state=2,  # [hedge_ratio, intercept]
        initial_state_mean=[1, 0],
        initial_state_covariance=np.ones((2, 2)),
        observation_matrices=observations[:, np.newaxis, :],
        observation_covariance=1.0,
        transition_covariance=0.001 * np.eye(2)
    )

    # 过滤
    state_means, state_covs = kf.filter(prices_a)

    # 动态对冲比率
    hedge_ratios = state_means[:, 0]
    intercepts = state_means[:, 1]

    # 计算残差（ spread ）
    spreads = prices_a - (hedge_ratios * prices_b + intercepts)

    return hedge_ratios, spreads
```

## 高频时间序列

### 实现波动率

```python
def realized_volatility(tick_returns, sampling='5min'):
    """
    计算实现波动率
    """
    # 重采样
    sampled = tick_returns.resample(sampling).sum()

    # 实现波动率 = 平方收益率之和
    rv = np.sqrt((sampled ** 2).sum())

    # 年化
    periods_per_year = 252 * (pd.Timedelta('1D') / pd.Timedelta(sampling))
    rv_annualized = rv * np.sqrt(periods_per_year)

    return rv_annualized
```

### 交易强度模型

```python
def trade_intensity(trades_df, window='1min'):
    """
    计算交易强度指标
    """
    # 按时间窗口聚合
    volume = trades_df['size'].resample(window).sum()
    num_trades = trades_df['size'].resample(window).count()
    avg_trade_size = volume / num_trades

    return pd.DataFrame({
        'volume': volume,
        'num_trades': num_trades,
        'avg_trade_size': avg_trade_size
    })
```

## 模型诊断

```python
def time_series_diagnostics(residuals):
    """
    时间序列模型诊断
    """
    from statsmodels.stats.diagnostic import (
        acorr_ljungbox, het_arch, acorr_lm
    )

    diagnostics = {}

    # 1. 自相关检验
    lb_test = acorr_ljungbox(residuals, lags=10)
    diagnostics['ljung_box'] = lb_test

    # 2. ARCH效应检验（异方差）
    arch_test = het_arch(residuals)
    diagnostics['arch_lm'] = arch_test

    # 3. 正态性
    from scipy import stats
    jb_stat, jb_pval = stats.jarque_bera(residuals)
    diagnostics['jarque_bera'] = (jb_stat, jb_pval)

    return diagnostics
```

## 延伸阅读

- [随机过程](stochastic-processes) — 布朗运动、伊藤引理
- [统计套利](statistical-arbitrage) — 配对交易、均值回归
- [投资组合优化](optimization) — 马科维茨模型
