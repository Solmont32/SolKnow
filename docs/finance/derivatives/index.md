# 金融衍生品

金融衍生品是从基础资产（股票、债券、商品、利率等）衍生出来的金融合约，用于风险管理、投机或套利。

## 衍生品概述

### 衍生品类型

```
衍生品分类
─────────────────────────────────────────
├── 远期 (Forwards)
│   ├── 场外合约
│   ├── 定制化条款
│   ├── 无保证金要求
│   └── 信用风险较高
│
├── 期货 (Futures)
│   ├── 交易所标准化
│   ├── 每日结算 (Mark-to-Market)
│   ├── 保证金制度
│   └── 流动性好
│
├── 期权 (Options)
│   ├── 看涨期权 (Call)
│   │   └── 买入标的资产的权利
│   ├── 看跌期权 (Put)
│   │   └── 卖出标的资产的权利
│   ├── 美式期权 (随时行权)
│   └── 欧式期权 (到期行权)
│
└── 互换 (Swaps)
    ├── 利率互换 (IRS)
    ├── 货币互换
    └── 信用违约互换 (CDS)
─────────────────────────────────────────
```

### 衍生品市场参与者

```python
class DerivativesMarketParticipants:
    """
    衍生品市场参与者
    """

    @staticmethod
    def hedgers():
        """
        套期保值者

        使用衍生品降低现有风险敞口
        """
        return {
            '描述': '已有现货头寸，用衍生品对冲风险',
            '案例': {
                '农民': '卖出农产品期货锁定售价',
                '航空公司': '买入原油期货对冲油价上涨',
                '出口企业': '外汇远期锁定汇率',
                '基金经理': '买入看跌期权保护组合'
            },
            '目标': '减少不确定性，稳定现金流'
        }

    @staticmethod
    def speculators():
        """
        投机者

        承担风险以获取潜在收益
        """
        return {
            '描述': '无现货头寸，用衍生品博取收益',
            '杠杆效应': '小额资金控制大额标的',
            '案例': {
                '趋势交易': '期货追涨杀跌',
                '波动率交易': '期权做多/做空波动率',
                '事件驱动': '财报前买入跨式期权'
            },
            '风险': '杠杆放大亏损，可能损失全部本金'
        }

    @staticmethod
    def arbitrageurs():
        """
        套利者

        利用市场定价错误获取无风险收益
        """
        return {
            '描述': '同时持有相反头寸锁定利润',
            '类型': {
                '空间套利': '同一资产在不同市场价格差异',
                '时间套利': '期货与现货基差套利',
                '转换套利': '期权平价关系套利'
            },
            '作用': '促进价格发现，提高市场效率'
        }
```

## 期货合约

### 期货定价

```python
import numpy as np

class FuturesPricing:
    """
    期货定价理论
    """

    @staticmethod
    def cost_of_carry(spot, r, q, T, storage_cost=0, convenience_yield=0):
        """
        持有成本模型

        F = S × e^((r + u - y) × T)

        r: 无风险利率
        q: 股息率
        u: 存储成本率
        y: 便利收益率
        """
        cost = r + storage_cost - convenience_yield
        return spot * np.exp((cost - q) * T)

    @staticmethod
    def index_futures(spot_index, r, q, T):
        """
        股指期货定价

        F = S × e^((r - q) × T)
        """
        return spot_index * np.exp((r - q) * T)

    @staticmethod
    def currency_futures(spot_rate, domestic_rate, foreign_rate, T):
        """
        外汇期货定价 (利率平价)

        F = S × e^((r_d - r_f) × T)
        """
        return spot_rate * np.exp((domestic_rate - foreign_rate) * T)

    @staticmethod
    def commodity_futures(spot, r, storage_cost, convenience_yield, T):
        """
        商品期货定价

        包含便利收益率
        """
        return spot * np.exp((r + storage_cost - convenience_yield) * T)

    @staticmethod
    def basis(spot, futures):
        """
        基差 = 现货价格 - 期货价格
        """
        return spot - futures

    @staticmethod
    def convergence(spot_prices, futures_prices, approach_maturity=True):
        """
        收敛性

        随着到期日临近，基差趋于零
        """
        if approach_maturity:
            return {
                'initial_basis': spot_prices[0] - futures_prices[0],
                'final_basis': spot_prices[-1] - futures_prices[-1],
                'convergence': abs(spot_prices[-1] - futures_prices[-1]) < 0.01
            }
```

### 保证金与结算

```python
class FuturesMargin:
    """
    期货保证金制度
    """

    @staticmethod
    def initial_margin(contract_value, margin_rate=0.1):
        """
        初始保证金
        """
        return contract_value * margin_rate

    @staticmethod
    def maintenance_margin(initial_margin, maintenance_ratio=0.75):
        """
        维持保证金
        """
        return initial_margin * maintenance_ratio

    @staticmethod
    def margin_call(position_value, initial_margin, maintenance_margin):
        """
        追加保证金通知
        """
        equity = position_value

        if equity < maintenance_margin:
            return {
                'margin_call': True,
                'amount': initial_margin - equity,
                'action': '追加保证金或平仓'
            }
        else:
            return {'margin_call': False}

    @staticmethod
    def daily_settlement(daily_prices, position, contract_size=1):
        """
        每日结算 (Mark-to-Market)
        """
        daily_pnl = []

        for i in range(1, len(daily_prices)):
            price_change = daily_prices[i] - daily_prices[i-1]
            pnl = price_change * position * contract_size
            daily_pnl.append(pnl)

        return daily_pnl
```

## 期权基础

### 期权定价模型

```python
class OptionPricingModels:
    """
    期权定价模型
    """

    @staticmethod
    def black_scholes(S, K, T, r, sigma, option_type='call'):
        """
        Black-Scholes期权定价模型

        假设：
        - 标的资产价格服从几何布朗运动
        - 无风险利率恒定
        - 无股息（可扩展）
        - 无套利机会
        - 可以连续对冲
        """
        from scipy import stats

        d1 = (np.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * np.sqrt(T))
        d2 = d1 - sigma * np.sqrt(T)

        if option_type == 'call':
            price = S * stats.norm.cdf(d1) - K * np.exp(-r * T) * stats.norm.cdf(d2)
        else:
            price = K * np.exp(-r * T) * stats.norm.cdf(-d2) - S * stats.norm.cdf(-d1)

        return price

    @staticmethod
    def binomial_option_pricing(S, K, T, r, sigma, n=100, option_type='call', american=False):
        """
        二叉树期权定价模型
        """
        dt = T / n
        u = np.exp(sigma * np.sqrt(dt))
        d = 1 / u
        p = (np.exp(r * dt) - d) / (u - d)

        # 股票价格树
        stock_tree = np.zeros((n + 1, n + 1))
        stock_tree[0, 0] = S

        for i in range(1, n + 1):
            stock_tree[i, 0] = stock_tree[i-1, 0] * u
            for j in range(1, i + 1):
                stock_tree[i, j] = stock_tree[i-1, j-1] * d

        # 期权价值树
        option_tree = np.zeros((n + 1, n + 1))

        # 到期 payoff
        for j in range(n + 1):
            if option_type == 'call':
                option_tree[n, j] = max(stock_tree[n, j] - K, 0)
            else:
                option_tree[n, j] = max(K - stock_tree[n, j], 0)

        # 倒推
        for i in range(n-1, -1, -1):
            for j in range(i + 1):
                hold_value = np.exp(-r * dt) * (p * option_tree[i+1, j] +
                                                  (1-p) * option_tree[i+1, j+1])

                if american:
                    if option_type == 'call':
                        exercise_value = max(stock_tree[i, j] - K, 0)
                    else:
                        exercise_value = max(K - stock_tree[i, j], 0)
                    option_tree[i, j] = max(hold_value, exercise_value)
                else:
                    option_tree[i, j] = hold_value

        return option_tree[0, 0]

    @staticmethod
    def monte_carlo_option(S, K, T, r, sigma, n_simulations=10000, option_type='call'):
        """
        蒙特卡洛期权定价
        """
        np.random.seed(42)
        z = np.random.standard_normal(n_simulations)

        # 模拟到期股价
        ST = S * np.exp((r - 0.5 * sigma**2) * T + sigma * np.sqrt(T) * z)

        # 计算 payoff
        if option_type == 'call':
            payoffs = np.maximum(ST - K, 0)
        else:
            payoffs = np.maximum(K - ST, 0)

        # 折现
        option_price = np.exp(-r * T) * np.mean(payoffs)

        return option_price

    @staticmethod
    def implied_volatility(market_price, S, K, T, r, option_type='call'):
        """
        计算隐含波动率
        """
        from scipy.optimize import brentq

        def price_diff(sigma):
            return OptionPricingModels.black_scholes(S, K, T, r, sigma, option_type) - market_price

        try:
            iv = brentq(price_diff, 0.001, 5.0)
            return iv
        except:
            return None
```

### 期权希腊字母

```python
class OptionGreeks:
    """
    期权希腊字母 (风险度量)
    """

    @staticmethod
    def calculate_greeks(S, K, T, r, sigma, option_type='call'):
        """
        计算期权希腊字母
        """
        from scipy import stats

        d1 = (np.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * np.sqrt(T))
        d2 = d1 - sigma * np.sqrt(T)

        # Delta: 价格对标的资产价格的敏感度
        if option_type == 'call':
            delta = stats.norm.cdf(d1)
            theta = (-S * stats.norm.pdf(d1) * sigma / (2 * np.sqrt(T)) -
                     r * K * np.exp(-r * T) * stats.norm.cdf(d2)) / 365
        else:
            delta = stats.norm.cdf(d1) - 1
            theta = (-S * stats.norm.pdf(d1) * sigma / (2 * np.sqrt(T)) +
                     r * K * np.exp(-r * T) * stats.norm.cdf(-d2)) / 365

        # Gamma: Delta对标的资产价格的敏感度 (二阶导)
        gamma = stats.norm.pdf(d1) / (S * sigma * np.sqrt(T))

        # Vega: 价格对波动率的敏感度
        vega = S * stats.norm.pdf(d1) * np.sqrt(T) / 100

        # Theta: 价格对时间的敏感度 (时间衰减)
        # 已在上面计算

        # Rho: 价格对利率的敏感度
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
    def greek_interpretation():
        """
        希腊字母解释
        """
        return {
            'Delta (Δ)': {
                '含义': '标的资产价格变动1单位，期权价格变动多少',
                '范围': '看涨: 0~1，看跌: -1~0',
                '应用': '对冲比率'
            },
            'Gamma (Γ)': {
                '含义': 'Delta的变化速度',
                '特点': '平值期权Gamma最大',
                '应用': '调整对冲频率'
            },
            'Theta (Θ)': {
                '含义': '时间流逝对期权价格的影响（通常负值）',
                '特点': '临近到期衰减加速',
                '应用': '卖方赚取时间价值'
            },
            'Vega (V)': {
                '含义': '波动率变动1%，期权价格变动多少',
                '特点': '长期期权Vega更大',
                '应用': '波动率交易'
            },
            'Rho (ρ)': {
                '含义': '利率变动对期权价格的影响',
                '特点': '长期期权Rho更大',
                '应用': '利率风险管理'
            }
        }
```

## 期权策略

### 基本策略

```python
class OptionStrategies:
    """
    常用期权策略
    """

    @staticmethod
    def covered_call(stock_price, call_strike, call_premium):
        """
        备兑看涨期权

        持有股票 + 卖出看涨期权
        """
        # 最大收益
        max_profit = (call_strike - stock_price) + call_premium

        # 盈亏平衡点
        breakeven = stock_price - call_premium

        return {
            'strategy': 'Covered Call',
            'max_profit': max_profit,
            'max_loss': stock_price - call_premium,  # 股票跌到零
            'breakeven': breakeven,
            'outlook': '中性偏乐观',
            'use_case': '增强收益、降低持股成本'
        }

    @staticmethod
    def protective_put(stock_price, put_strike, put_premium):
        """
        保护性看跌期权

        持有股票 + 买入看跌期权
        """
        max_loss = (stock_price - put_strike) + put_premium
        breakeven = stock_price + put_premium

        return {
            'strategy': 'Protective Put',
            'max_profit': '无限',
            'max_loss': max_loss,
            'breakeven': breakeven,
            'outlook': '看多但担心下跌',
            'use_case': '保险策略'
        }

    @staticmethod
    def bull_call_spread(lower_strike, upper_strike, lower_premium, upper_premium):
        """
        牛市看涨价差

        买入低行权价看涨 + 卖出高行权价看涨
        """
        net_premium = lower_premium - upper_premium
        max_profit = (upper_strike - lower_strike) - net_premium
        max_loss = net_premium
        breakeven = lower_strike + net_premium

        return {
            'strategy': 'Bull Call Spread',
            'max_profit': max_profit,
            'max_loss': max_loss,
            'breakeven': breakeven,
            'outlook': '温和看涨'
        }

    @staticmethod
    def straddle(atm_strike, call_premium, put_premium):
        """
        跨式期权

        同时买入同价看涨和看跌
        """
        total_premium = call_premium + put_premium

        upper_breakeven = atm_strike + total_premium
        lower_breakeven = atm_strike - total_premium

        return {
            'strategy': 'Long Straddle',
            'max_profit': '无限',
            'max_loss': total_premium,
            'lower_breakeven': lower_breakeven,
            'upper_breakeven': upper_breakeven,
            'outlook': '预期大幅波动但方向不确定'
        }

    @staticmethod
    def iron_condor(lower_put, higher_put, lower_call, higher_call,
                    premiums):
        """
        铁鹰式期权

        卖出跨式 + 买入宽跨式
        """
        # 简化计算
        net_credit = sum(premiums['sold']) - sum(premiums['bought'])
        max_profit = net_credit
        max_loss = (higher_put - lower_put) - net_credit

        return {
            'strategy': 'Iron Condor',
            'max_profit': max_profit,
            'max_loss': max_loss,
            'outlook': '预期区间震荡',
            'use_case': '波动率做空'
        }
```

## 互换合约

```python
class SwapContracts:
    """
    互换合约
    """

    @staticmethod
    def interest_rate_swap(fixed_rate, floating_rates, notional, periods):
        """
        利率互换估值

        固定利率 vs 浮动利率交换
        """
        # 固定端现值
        fixed_leg = sum(
            fixed_rate * notional / (1 + r) ** t
            for t, r in enumerate(floating_rates[:periods], 1)
        ) + notional / (1 + floating_rates[periods-1]) ** periods

        # 浮动端现值（假设下一期利率已知）
        floating_leg = notional  # 在付息日等于面值

        swap_value = floating_leg - fixed_leg

        return swap_value

    @staticmethod
    def currency_swap(domestic_payments, foreign_payments, spot_rate,
                     domestic_curve, foreign_curve):
        """
        货币互换估值
        """
        # 本币端现值
        pv_domestic = sum(
            dp / (1 + domestic_curve[i]) ** (i+1)
            for i, dp in enumerate(domestic_payments)
        )

        # 外币端现值 (转换为本币)
        pv_foreign = sum(
            fp / (1 + foreign_curve[i]) ** (i+1)
            for i, fp in enumerate(foreign_payments)
        ) * spot_rate

        return pv_domestic - pv_foreign

    @staticmethod
    def cds_premium(default_probability, recovery_rate, risk_free_rate, maturity):
        """
        信用违约互换 (CDS) 溢价估算

        简化模型
        """
        expected_loss = default_probability * (1 - recovery_rate)
        cds_spread = expected_loss / (1 - expected_loss) * (1 + risk_free_rate) ** maturity

        return cds_spread
```

## 延伸阅读

- [金融数学](../math/) - 衍生品定价数学工具
- [固定收益](../fixed-income/) - 利率衍生品基础
- [权益投资](../equity/) - 股票期权标的资产
- [量化交易](../../quant/) - 衍生品量化策略
