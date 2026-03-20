# 金融数学

金融数学提供量化分析金融问题的数学工具，涵盖时间价值、风险度量、衍生品定价等核心内容。

## 时间价值计算

### 基本公式

```python
import numpy as np
from scipy import stats

class TimeValueMath:
    """
    货币时间价值数学
    """

    @staticmethod
    def pv_single_sum(fv, r, n):
        """
        单笔资金现值

        PV = FV / (1 + r)^n
        """
        return fv / (1 + r) ** n

    @staticmethod
    def fv_single_sum(pv, r, n):
        """
        单笔资金终值

        FV = PV × (1 + r)^n
        """
        return pv * (1 + r) ** n

    @staticmethod
    def pv_annuity(pmt, r, n, due=False):
        """
        年金现值

        普通年金: PV = PMT × [1 - (1+r)^-n] / r
        即付年金: PV = PMT × [1 - (1+r)^-n] / r × (1+r)
        """
        if r == 0:
            return pmt * n

        pv = pmt * (1 - (1 + r) ** (-n)) / r
        if due:
            pv *= (1 + r)
        return pv

    @staticmethod
    def fv_annuity(pmt, r, n, due=False):
        """
        年金终值

        普通年金: FV = PMT × [(1+r)^n - 1] / r
        即付年金: FV = PMT × [(1+r)^n - 1] / r × (1+r)
        """
        if r == 0:
            return pmt * n

        fv = pmt * ((1 + r) ** n - 1) / r
        if due:
            fv *= (1 + r)
        return fv

    @staticmethod
    def pv_perpetuity(pmt, r):
        """
        永续年金现值

        PV = PMT / r
        """
        return pmt / r

    @staticmethod
    def pv_growing_perpetuity(pmt, r, g):
        """
        增长永续年金现值 (Gordon Growth Model)

        PV = PMT / (r - g)
        """
        if g >= r:
            raise ValueError("增长率必须小于折现率")
        return pmt / (r - g)

    @staticmethod
    def pv_growing_annuity(pmt, r, g, n):
        """
        增长年金现值

        PV = PMT × [1 - ((1+g)/(1+r))^n] / (r - g)
        """
        if r == g:
            return pmt * n / (1 + r)
        return pmt * (1 - ((1 + g) / (1 + r)) ** n) / (r - g)

    @staticmethod
    def solve_for_rate(pv, fv, n):
        """
        求解利率

        r = (FV/PV)^(1/n) - 1
        """
        return (fv / pv) ** (1 / n) - 1

    @staticmethod
    def solve_for_periods(pv, fv, r):
        """
        求解期数

        n = ln(FV/PV) / ln(1+r)
        """
        return np.log(fv / pv) / np.log(1 + r)

    @staticmethod
    def effective_annual_rate(nominal_rate, m):
        """
        有效年利率

        EAR = (1 + r/m)^m - 1
        """
        return (1 + nominal_rate / m) ** m - 1

    @staticmethod
    def continuous_compounding(pv, r, t):
        """
        连续复利

        FV = PV × e^(r×t)
        """
        return pv * np.exp(r * t)
```

### 收益率计算

```python
class ReturnCalculations:
    """
    收益率计算方法
    """

    @staticmethod
    def holding_period_return(p0, p1, d=0):
        """
        持有期收益率

        HPR = (P1 - P0 + D) / P0
        """
        return (p1 - p0 + d) / p0

    @staticmethod
    def arithmetic_mean(returns):
        """
        算术平均收益率
        """
        return np.mean(returns)

    @staticmethod
    def geometric_mean(returns):
        """
        几何平均收益率

        更准确的长期收益率度量
        Rg = [(1+R1)(1+R2)...(1+Rn)]^(1/n) - 1
        """
        product = np.prod([1 + r for r in returns])
        return product ** (1 / len(returns)) - 1

    @staticmethod
    def time_weighted_return(cash_flows, values):
        """
        时间加权收益率

        消除现金流进出对收益率的影响
        """
        sub_period_returns = []
        for i in range(len(cash_flows) - 1):
            r = (values[i+1] - values[i] - cash_flows[i]) / values[i]
            sub_period_returns.append(1 + r)

        return np.prod(sub_period_returns) ** (1 / len(sub_period_returns)) - 1

    @staticmethod
    def money_weighted_return(cash_flows, times):
        """
        货币加权收益率 (IRR)
        """
        from scipy.optimize import newton

        def npv(rate):
            return sum(cf / (1 + rate) ** t for cf, t in zip(cash_flows, times))

        try:
            return newton(npv, 0.1)
        except:
            return None

    @staticmethod
    def annualized_return(total_return, years):
        """
        年化收益率

        (1 + R_total)^(1/n) - 1
        """
        return (1 + total_return) ** (1 / years) - 1

    @staticmethod
    def real_return(nominal_return, inflation):
        """
        实际收益率 (费雪方程精确版)

        (1 + Rn) = (1 + Rr) × (1 + i)
        Rr = (1 + Rn) / (1 + i) - 1
        """
        return (1 + nominal_return) / (1 + inflation) - 1
```

## 风险度量

### 基础统计量

```python
class RiskMetrics:
    """
    风险度量指标
    """

    @staticmethod
    def variance(returns, sample=True):
        """
        方差
        """
        ddof = 1 if sample else 0
        return np.var(returns, ddof=ddof)

    @staticmethod
    def standard_deviation(returns, sample=True):
        """
        标准差 (波动率)
        """
        ddof = 1 if sample else 0
        return np.std(returns, ddof=ddof)

    @staticmethod
    def annualized_volatility(returns, periods_per_year=252):
        """
        年化波动率
        """
        return np.std(returns, ddof=1) * np.sqrt(periods_per_year)

    @staticmethod
    def covariance(returns1, returns2):
        """
        协方差
        """
        return np.cov(returns1, returns2)[0][1]

    @staticmethod
    def correlation(returns1, returns2):
        """
        相关系数
        """
        return np.corrcoef(returns1, returns2)[0][1]

    @staticmethod
    def semi_variance(returns, target=0):
        """
        半方差 (只考虑低于目标的收益)
        """
        downside_returns = [r for r in returns if r < target]
        if len(downside_returns) == 0:
            return 0
        return np.var(downside_returns, ddof=1)

    @staticmethod
    def downside_deviation(returns, target=0):
        """
        下行标准差
        """
        return np.sqrt(RiskMetrics.semi_variance(returns, target))

    @staticmethod
    def tracking_error(portfolio_returns, benchmark_returns):
        """
        跟踪误差
        """
        return np.std(portfolio_returns - benchmark_returns, ddof=1)

    @staticmethod
    def beta(stock_returns, market_returns):
        """
        贝塔系数

        β = Cov(Ri, Rm) / Var(Rm)
        """
        covariance = np.cov(stock_returns, market_returns)[0][1]
        market_variance = np.var(market_returns)
        return covariance / market_variance if market_variance != 0 else 0

    @staticmethod
    def alpha(stock_returns, market_returns, risk_free_rate=0.02):
        """
        阿尔法 (Jensen's Alpha)

        α = Rp - [Rf + β(Rm - Rf)]
        """
        beta = RiskMetrics.beta(stock_returns, market_returns)
        expected_return = risk_free_rate + beta * (np.mean(market_returns) - risk_free_rate)
        return np.mean(stock_returns) - expected_return
```

### 风险调整收益指标

```python
class RiskAdjustedReturns:
    """
    风险调整收益指标
    """

    @staticmethod
    def sharpe_ratio(returns, risk_free_rate=0.02, periods_per_year=252):
        """
        夏普比率

        Sharpe = (Rp - Rf) / σp
        """
        excess_return = np.mean(returns) - risk_free_rate / periods_per_year
        volatility = np.std(returns, ddof=1)
        if volatility == 0:
            return 0
        return (excess_return / volatility) * np.sqrt(periods_per_year)

    @staticmethod
    def treynor_ratio(returns, market_returns, risk_free_rate=0.02):
        """
        特雷诺比率

        Treynor = (Rp - Rf) / βp
        """
        excess_return = np.mean(returns) - risk_free_rate / 252
        beta = RiskMetrics.beta(returns, market_returns)
        if beta == 0:
            return 0
        return (excess_return / beta) * 252

    @staticmethod
    def sortino_ratio(returns, risk_free_rate=0.02, target_return=0, periods_per_year=252):
        """
        索提诺比率 (只惩罚下行波动)

        Sortino = (Rp - Rf) / σd
        """
        excess_return = np.mean(returns) - risk_free_rate / periods_per_year
        downside_std = RiskMetrics.downside_deviation(returns, target_return)
        if downside_std == 0:
            return 0
        return (excess_return / downside_std) * np.sqrt(periods_per_year)

    @staticmethod
    def information_ratio(portfolio_returns, benchmark_returns):
        """
        信息比率

        IR = (Rp - Rb) / σ(Rp-Rb)
        """
        active_return = np.mean(portfolio_returns - benchmark_returns)
        tracking_error = RiskMetrics.tracking_error(portfolio_returns, benchmark_returns)
        if tracking_error == 0:
            return 0
        return active_return / tracking_error * np.sqrt(252)

    @staticmethod
    def calmar_ratio(returns, max_drawdown, periods_per_year=252):
        """
        卡尔马比率

        Calmar = 年化收益 / |最大回撤|
        """
        annual_return = np.mean(returns) * periods_per_year
        if max_drawdown == 0:
            return 0
        return annual_return / abs(max_drawdown)

    @staticmethod
    def omega_ratio(returns, threshold=0):
        """
        Omega比率

        Ω = E[max(R - L, 0)] / E[max(L - R, 0)]
        """
        upside = np.mean([max(r - threshold, 0) for r in returns])
        downside = np.mean([max(threshold - r, 0) for r in returns])
        if downside == 0:
            return float('inf')
        return upside / downside

    @staticmethod
    def maximum_drawdown(returns):
        """
        最大回撤
        """
        cumulative = (1 + returns).cumprod()
        cummax = cumulative.cummax()
        drawdown = (cumulative - cummax) / cummax
        return drawdown.min()

    @staticmethod
    def value_atRisk(returns, confidence=0.05, method='historical'):
        """
        风险价值 (VaR)

        在置信水平(1-α)下，最大可能损失
        """
        if method == 'historical':
            return np.percentile(returns, confidence * 100)
        elif method == 'parametric':
            mean = np.mean(returns)
            std = np.std(returns)
            return mean + stats.norm.ppf(confidence) * std
        elif method == 'cornish-fisher':
            # 考虑偏度和峰度的调整
            mean = np.mean(returns)
            std = np.std(returns)
            skew = stats.skew(returns)
            kurt = stats.kurtosis(returns)
            z = stats.norm.ppf(confidence)
            z_cf = (z + (z**2 - 1) * skew / 6 +
                    (z**3 - 3*z) * (kurt - 3) / 24 -
                    (2*z**3 - 5*z) * skew**2 / 36)
            return mean + z_cf * std

    @staticmethod
    def expected_shortfall(returns, confidence=0.05):
        """
        预期损失 (CVaR/ES)

        超过VaR阈值后的平均损失
        """
        var = RiskAdjustedReturns.value_atRisk(returns, confidence)
        return np.mean([r for r in returns if r <= var])
```

## 衍生品定价数学

### 期权定价基础

```python
class OptionPricingMath:
    """
    期权定价数学
    """

    @staticmethod
    def black_scholes(S, K, T, r, sigma, option_type='call'):
        """
        Black-Scholes期权定价模型

        C = S×N(d1) - K×e^(-rT)×N(d2)
        P = K×e^(-rT)×N(-d2) - S×N(-d1)

        d1 = [ln(S/K) + (r + σ²/2)T] / (σ√T)
        d2 = d1 - σ√T
        """
        d1 = (np.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * np.sqrt(T))
        d2 = d1 - sigma * np.sqrt(T)

        if option_type == 'call':
            price = S * stats.norm.cdf(d1) - K * np.exp(-r * T) * stats.norm.cdf(d2)
        else:
            price = K * np.exp(-r * T) * stats.norm.cdf(-d2) - S * stats.norm.cdf(-d1)

        return price

    @staticmethod
    def black_scholes_greeks(S, K, T, r, sigma, option_type='call'):
        """
        计算期权希腊字母
        """
        d1 = (np.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * np.sqrt(T))
        d2 = d1 - sigma * np.sqrt(T)

        # Delta
        if option_type == 'call':
            delta = stats.norm.cdf(d1)
            theta = (-S * stats.norm.pdf(d1) * sigma / (2 * np.sqrt(T)) -
                     r * K * np.exp(-r * T) * stats.norm.cdf(d2)) / 365
        else:
            delta = stats.norm.cdf(d1) - 1
            theta = (-S * stats.norm.pdf(d1) * sigma / (2 * np.sqrt(T)) +
                     r * K * np.exp(-r * T) * stats.norm.cdf(-d2)) / 365

        # Gamma (看涨和看跌相同)
        gamma = stats.norm.pdf(d1) / (S * sigma * np.sqrt(T))

        # Vega (看涨和看跌相同)
        vega = S * stats.norm.pdf(d1) * np.sqrt(T) / 100

        # Rho
        if option_type == 'call':
            rho = K * T * np.exp(-r * T) * stats.norm.cdf(d2) / 100
        else:
            rho = -K * T * np.exp(-r * T) * stats.norm.cdf(-d2) / 100

        return {
            'delta': delta,
            'gamma': gamma,
            'theta': theta,
            'vega': vega,
            'rho': rho
        }

    @staticmethod
    def binomial_tree(S, K, T, r, sigma, n=100, option_type='call', american=False):
        """
        二叉树期权定价模型
        """
        dt = T / n
        u = np.exp(sigma * np.sqrt(dt))
        d = 1 / u
        p = (np.exp(r * dt) - d) / (u - d)

        # 构建价格树
        stock_prices = np.zeros((n + 1, n + 1))
        stock_prices[0, 0] = S

        for i in range(1, n + 1):
            stock_prices[i, 0] = stock_prices[i-1, 0] * u
            for j in range(1, i + 1):
                stock_prices[i, j] = stock_prices[i-1, j-1] * d

        # 计算期权价值
        option_values = np.zeros((n + 1, n + 1))

        # 到期日 payoff
        for j in range(n + 1):
            if option_type == 'call':
                option_values[n, j] = max(stock_prices[n, j] - K, 0)
            else:
                option_values[n, j] = max(K - stock_prices[n, j], 0)

        # 倒推计算
        for i in range(n-1, -1, -1):
            for j in range(i + 1):
                hold_value = np.exp(-r * dt) * (p * option_values[i+1, j] +
                                                  (1-p) * option_values[i+1, j+1])

                if american:
                    # 美式期权检查提前执行
                    if option_type == 'call':
                        exercise_value = max(stock_prices[i, j] - K, 0)
                    else:
                        exercise_value = max(K - stock_prices[i, j], 0)
                    option_values[i, j] = max(hold_value, exercise_value)
                else:
                    option_values[i, j] = hold_value

        return option_values[0, 0]

    @staticmethod
    def monte_carlo_option(S, K, T, r, sigma, n_simulations=10000, option_type='call'):
        """
        蒙特卡洛期权定价
        """
        np.random.seed(42)
        z = np.random.standard_normal(n_simulations)
        ST = S * np.exp((r - 0.5 * sigma**2) * T + sigma * np.sqrt(T) * z)

        if option_type == 'call':
            payoffs = np.maximum(ST - K, 0)
        else:
            payoffs = np.maximum(K - ST, 0)

        price = np.exp(-r * T) * np.mean(payoffs)
        return price

    @staticmethod
    def implied_volatility(market_price, S, K, T, r, option_type='call'):
        """
        计算隐含波动率
        """
        from scipy.optimize import brentq

        def objective(sigma):
            return OptionPricingMath.black_scholes(S, K, T, r, sigma, option_type) - market_price

        try:
            iv = brentq(objective, 0.001, 5.0)
            return iv
        except:
            return None
```

## 固定收益数学

### 利率模型

```python
class FixedIncomeMath:
    """
    固定收益数学
    """

    @staticmethod
    def bond_price_ytm(coupon, face_value, ytm, periods, frequency=1):
        """
        债券定价（给定YTM）

        P = Σ(C/(1+y)^t) + F/(1+y)^n
        """
        c = coupon / frequency
        y = ytm / frequency
        n = periods

        price = sum([c / (1 + y) ** t for t in range(1, n + 1)])
        price += face_value / (1 + y) ** n

        return price

    @staticmethod
    def macaulay_duration(cash_flows, discount_rate):
        """
        麦考利久期

        D = Σ(t × PVt) / Σ(PVt)
        """
        pv_weights = []
        time_weights = []

        for t, cf in enumerate(cash_flows, 1):
            pv = cf / (1 + discount_rate) ** t
            pv_weights.append(pv)
            time_weights.append(t * pv)

        return sum(time_weights) / sum(pv_weights)

    @staticmethod
    def modified_duration(cash_flows, discount_rate):
        """
        修正久期

        MD = D / (1 + y)
        """
        mac_duration = FixedIncomeMath.macaulay_duration(cash_flows, discount_rate)
        return mac_duration / (1 + discount_rate)

    @staticmethod
    def convexity(cash_flows, discount_rate):
        """
        凸性

        C = Σ[t(t+1) × PVt] / [P × (1+y)²]
        """
        pv_list = []
        convexity_weights = []

        for t, cf in enumerate(cash_flows, 1):
            pv = cf / (1 + discount_rate) ** t
            pv_list.append(pv)
            convexity_weights.append(t * (t + 1) * pv)

        price = sum(pv_list)
        return sum(convexity_weights) / (price * (1 + discount_rate) ** 2)

    @staticmethod
    def price_change_estimate(duration, convexity, yield_change):
        """
        债券价格变动估计

        ΔP/P ≈ -D × Δy + 0.5 × C × (Δy)²
        """
        return -duration * yield_change + 0.5 * convexity * (yield_change ** 2)

    @staticmethod
    def spot_rate_from_par(par_yields):
        """
        从平价收益率推导即期利率（拔靴法）
        """
        spot_rates = []

        for n, par_yield in enumerate(par_yields, 1):
            if n == 1:
                spot_rates.append(par_yield)
            else:
                # 解方程: 100 = Σ(c/(1+s)^t) + 100/(1+s)^n
                c = par_yield * 100
                pv_coupons = sum([c / (1 + spot_rates[t-1]) ** t for t in range(1, n)])

                # 剩余现值由最后一期支付
                remaining_pv = 100 - pv_coupons
                spot_n = (100 / remaining_pv) ** (1 / n) - 1
                spot_rates.append(spot_n)

        return spot_rates

    @staticmethod
    def forward_rate(spot_t1, spot_t2, t1, t2):
        """
        远期利率

        f(t1,t2) = [(1+s2)^t2 / (1+s1)^t1]^(1/(t2-t1)) - 1
        """
        return ((1 + spot_t2) ** t2 / (1 + spot_t1) ** t1) ** (1 / (t2 - t1)) - 1
```

## 延伸阅读

- [金融基础理论](../basics/) - 货币时间价值概念
- [投资学](../investment/) - 资产定价应用
- [公司金融](../corporate/) - 估值与资本预算
- [量化数学](../../quant/math/) - 量化分析工具
