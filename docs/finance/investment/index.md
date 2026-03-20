# 投资学

投资学研究如何在不确定环境下进行资产配置，以实现风险与收益的最优平衡。

## 现代投资组合理论

### 马科维茨均值-方差模型

```python
import numpy as np
import pandas as pd
from scipy.optimize import minimize

class MarkowitzPortfolio:
    """
    马科维茨投资组合优化
    """

    def __init__(self, expected_returns, cov_matrix, risk_free_rate=0.02):
        """
        expected_returns: 预期收益率向量
        cov_matrix: 收益率协方差矩阵
        risk_free_rate: 无风险利率
        """
        self.expected_returns = expected_returns
        self.cov_matrix = cov_matrix
        self.risk_free_rate = risk_free_rate
        self.n_assets = len(expected_returns)

    def portfolio_performance(self, weights):
        """
        计算组合绩效
        """
        portfolio_return = np.dot(weights, self.expected_returns)
        portfolio_volatility = np.sqrt(np.dot(weights.T, np.dot(self.cov_matrix, weights)))
        sharpe_ratio = (portfolio_return - self.risk_free_rate) / portfolio_volatility

        return {
            'return': portfolio_return,
            'volatility': portfolio_volatility,
            'sharpe_ratio': sharpe_ratio
        }

    def minimum_variance_portfolio(self):
        """
        最小方差组合
        """
        constraints = {'type': 'eq', 'fun': lambda x: np.sum(x) - 1}
        bounds = tuple((0, 1) for _ in range(self.n_assets))
        init_guess = np.array([1/self.n_assets] * self.n_assets)

        result = minimize(
            lambda x: np.dot(x.T, np.dot(self.cov_matrix, x)),
            init_guess,
            method='SLSQP',
            bounds=bounds,
            constraints=constraints
        )

        return result.x

    def tangency_portfolio(self):
        """
        切线组合（夏普比率最大化）
        """
        def negative_sharpe(weights):
            return -self.portfolio_performance(weights)['sharpe_ratio']

        constraints = {'type': 'eq', 'fun': lambda x: np.sum(x) - 1}
        bounds = tuple((0, 1) for _ in range(self.n_assets))
        init_guess = np.array([1/self.n_assets] * self.n_assets)

        result = minimize(
            negative_sharpe,
            init_guess,
            method='SLSQP',
            bounds=bounds,
            constraints=constraints
        )

        return result.x

    def efficient_frontier(self, n_points=100):
        """
        生成有效前沿
        """
        min_vol_portfolio = self.minimum_variance_portfolio()
        min_vol_return = self.portfolio_performance(min_vol_portfolio)['return']

        max_return = np.max(self.expected_returns)
        min_return = min_vol_return

        target_returns = np.linspace(min_return, max_return, n_points)
        efficient_portfolios = []

        for target in target_returns:
            # 约束：组合收益等于目标，权重和为1
            constraints = [
                {'type': 'eq', 'fun': lambda x: np.sum(x) - 1},
                {'type': 'eq', 'fun': lambda x: np.dot(x, self.expected_returns) - target}
            ]
            bounds = tuple((0, 1) for _ in range(self.n_assets))
            init_guess = np.array([1/self.n_assets] * self.n_assets)

            result = minimize(
                lambda x: np.dot(x.T, np.dot(self.cov_matrix, x)),
                init_guess,
                method='SLSQP',
                bounds=bounds,
                constraints=constraints
            )

            if result.success:
                vol = np.sqrt(np.dot(result.x.T, np.dot(self.cov_matrix, result.x)))
                efficient_portfolios.append({
                    'return': target,
                    'volatility': vol,
                    'weights': result.x
                })

        return efficient_portfolios
```

### 资本资产定价模型 (CAPM)

```python
class CAPM:
    """
    资本资产定价模型
    """

    def __init__(self, risk_free_rate=0.02, market_return=0.08):
        self.risk_free_rate = risk_free_rate
        self.market_return = market_return
        self.market_premium = market_return - risk_free_rate

    def expected_return(self, beta):
        """
        CAPM公式: E(Ri) = Rf + βi * (E(Rm) - Rf)
        """
        return self.risk_free_rate + beta * self.market_premium

    def calculate_beta(self, stock_returns, market_returns):
        """
        计算贝塔系数

        β = Cov(Ri, Rm) / Var(Rm)
        """
        covariance = np.cov(stock_returns, market_returns)[0][1]
        market_variance = np.var(market_returns)

        if market_variance == 0:
            return 0

        return covariance / market_variance

    def security_characteristic_line(self, stock_returns, market_returns):
        """
        证券市场线 (SCL)

        Ri - Rf = α + β(Rm - Rf) + ε
        """
        excess_stock = stock_returns - self.risk_free_rate
        excess_market = market_returns - self.risk_free_rate

        # 线性回归
        beta = self.calculate_beta(stock_returns, market_returns)
        alpha = np.mean(excess_stock) - beta * np.mean(excess_market)

        return {
            'alpha': alpha,
            'beta': beta,
            'expected_return': self.expected_return(beta)
        }

    def security_market_line(self, betas):
        """
        证券市场线 (SML)
        """
        returns = [self.expected_return(beta) for beta in betas]
        return returns
```

## 权益投资

### 股票估值模型

```python
class StockValuation:
    """
    股票估值方法
    """

    @staticmethod
    def ddm_constant_growth(dividend, required_return, growth_rate):
        """
        股利贴现模型 (Gordon Growth Model)

        P = D1 / (r - g)
        """
        if growth_rate >= required_return:
            raise ValueError("增长率必须小于要求回报率")

        return dividend / (required_return - growth_rate)

    @staticmethod
    def ddm_multi_stage(dividends, required_return, terminal_growth, high_growth_period=5):
        """
        多阶段股利贴现模型
        """
        # 高增长阶段现值
        pv_high_growth = 0
        for t, d in enumerate(dividends[:high_growth_period], 1):
            pv_high_growth += d / (1 + required_return) ** t

        # 终值 (Gordon Growth)
        terminal_dividend = dividends[high_growth_period - 1] * (1 + terminal_growth)
        terminal_value = terminal_dividend / (required_return - terminal_growth)
        pv_terminal = terminal_value / (1 + required_return) ** high_growth_period

        return pv_high_growth + pv_terminal

    @staticmethod
    def free_cash_flow_to_equity(fcfe, required_return, growth_rate):
        """
        股权自由现金流贴现模型
        """
        return fcfe * (1 + growth_rate) / (required_return - growth_rate)

    @staticmethod
    def pe_ratio Valuation(eps, pe_ratio):
        """
        市盈率估值法
        """
        return eps * pe_ratio

    @staticmethod
    def pb_ratio_valuation(book_value_per_share, pb_ratio):
        """
        市净率估值法
        """
        return book_value_per_share * pb_ratio
```

### 股票分析方法

```python
class EquityAnalysis:
    """
    股票分析框架
    """

    @staticmethod
    def dupont_analysis(net_profit_margin, asset_turnover, equity_multiplier):
        """
        杜邦分析法

        ROE = 净利润率 × 总资产周转率 × 权益乘数
        """
        roe = net_profit_margin * asset_turnover * equity_multiplier

        return {
            'roe': roe,
            'components': {
                'profitability': net_profit_margin,
                'efficiency': asset_turnover,
                'leverage': equity_multiplier
            },
            'interpretation': {
                'high_margin_low_turnover': '差异化战略',
                'low_margin_high_turnover': '成本领先战略'
            }
        }

    @staticmethod
    def fundamental_analysis_framework():
        """
        基本面分析框架
        """
        return {
            'macro_analysis': {
                'economic_cycle': '经济周期所处阶段',
                'monetary_policy': '货币政策方向',
                'fiscal_policy': '财政政策',
                'industry_trends': '行业趋势'
            },
            'industry_analysis': {
                'porter_five_forces': '波特五力模型',
                'industry_lifecycle': '行业生命周期',
                'competitive_advantage': '竞争优势分析'
            },
            'company_analysis': {
                'business_model': '商业模式',
                'financial_health': '财务健康度',
                'management_quality': '管理层质量',
                'valuation': '估值水平'
            }
        }
```

## 固定收益

### 债券定价与收益率

```python
class FixedIncome:
    """
    固定收益证券分析
    """

    @staticmethod
    def bond_price(face_value, coupon_rate, ytm, periods, frequency=1):
        """
        债券定价

        P = Σ(C/(1+y)^t) + F/(1+y)^n
        """
        coupon_payment = face_value * coupon_rate / frequency

        # 票息现值
        pv_coupons = sum([
            coupon_payment / (1 + ytm/frequency) ** t
            for t in range(1, periods + 1)
        ])

        # 面值现值
        pv_face = face_value / (1 + ytm/frequency) ** periods

        return pv_coupons + pv_face

    @staticmethod
    def yield_to_maturity(price, face_value, coupon_rate, periods, frequency=1, guess=0.05):
        """
        计算到期收益率 (YTM)
        """
        from scipy.optimize import newton

        coupon = face_value * coupon_rate / frequency

        def price_diff(ytm):
            calculated_price = sum([
                coupon / (1 + ytm/frequency) ** t
                for t in range(1, periods + 1)
            ]) + face_value / (1 + ytm/frequency) ** periods
            return calculated_price - price

        try:
            ytm = newton(price_diff, guess)
            return ytm * frequency  # 年化
        except:
            return None

    @staticmethod
    def duration_and_convexity(face_value, coupon_rate, ytm, periods, frequency=1):
        """
        久期和凸性
        """
        coupon = face_value * coupon_rate / frequency
        y = ytm / frequency

        # 麦考利久期
        macaulay_duration = 0
        bond_price = 0

        for t in range(1, periods + 1):
            cf = coupon if t < periods else coupon + face_value
            pv = cf / (1 + y) ** t
            bond_price += pv
            macaulay_duration += t * pv

        macaulay_duration /= bond_price

        # 修正久期
        modified_duration = macaulay_duration / (1 + y)

        # 凸性 (简化计算)
        convexity = sum([
            (t * (t + 1) * coupon / (1 + y) ** (t + 2))
            for t in range(1, periods + 1)
        ]) / bond_price

        # 加上最后一期的面值部分
        convexity += (periods * (periods + 1) * face_value / (1 + y) ** (periods + 2)) / bond_price

        return {
            'macaulay_duration': macaulay_duration / frequency,  # 年化
            'modified_duration': modified_duration / frequency,
            'convexity': convexity / (frequency ** 2),
            'price_change_approx': lambda dy: -modified_duration * dy + 0.5 * convexity * (dy ** 2)
        }
```

## 衍生工具

### 期权基础

```python
class OptionBasics:
    """
    期权基础概念
    """

    @staticmethod
    def option_payoff(stock_prices, strike, premium, option_type='call', position='long'):
        """
        期权到期 payoff
        """
        if option_type == 'call':
            intrinsic = np.maximum(stock_prices - strike, 0)
        else:
            intrinsic = np.maximum(strike - stock_prices, 0)

        if position == 'long':
            payoff = intrinsic - premium
        else:
            payoff = premium - intrinsic

        return payoff

    @staticmethod
    def put_call_parity(call_price, put_price, stock_price, strike, risk_free_rate, time):
        """
        期权平价公式

        C + K*e^(-rT) = P + S
        """
        left_side = call_price + strike * np.exp(-risk_free_rate * time)
        right_side = put_price + stock_price

        return {
            'parity_holds': np.isclose(left_side, right_side, rtol=0.01),
            'difference': left_side - right_side,
            'arbitrage_opportunity': abs(left_side - right_side) > 0.01
        }

    @staticmethod
    def option_strategies():
        """
        常见期权策略
        """
        return {
            'covered_call': {
                'construction': '持有股票 + 卖出看涨期权',
                'outlook': '中性偏乐观',
                'max_profit': '权利金 + (行权价 - 买入价)',
                'max_loss': '股票买入价 - 权利金'
            },
            'protective_put': {
                'construction': '持有股票 + 买入看跌期权',
                'outlook': '看多远期风险',
                'max_profit': '无限',
                'max_loss': '股票买入价 - 行权价 + 权利金'
            },
            'bull_spread': {
                'construction': '买入低行权价看涨 + 卖出高行权价看涨',
                'outlook': '温和看涨',
                'max_profit': '行权价差 - 净权利金',
                'max_loss': '净权利金'
            },
            'straddle': {
                'construction': '同时买入同价看涨和看跌',
                'outlook': '预期大幅波动',
                'max_profit': '无限',
                'max_loss': '两权利金之和'
            }
        }
```

## 延伸阅读

- [金融基础理论](../basics/) - 利率、货币时间价值
- [公司金融](../corporate/) - 资本预算与估值
- [量化交易](../quant/) - 量化策略实现
