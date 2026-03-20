# 固定收益证券

固定收益证券提供预先确定的现金流，是投资组合中重要的风险分散工具和收益来源。

## 债券基础

### 债券要素

```
债券基本要素
─────────────────────────────────────────
1. 面值 (Face Value)
   - 债券到期时偿还的本金金额
   - 通常为100或1000元

2. 票面利率 (Coupon Rate)
   - 年利息支付率
   - 可以是固定或浮动

3. 到期日 (Maturity Date)
   - 本金偿还日期
   - 分类：短期(<1年)、中期(1-10年)、长期(>10年)

4. 付息频率
   - 年付、半年付、季付
   - 影响实际收益率

5.  embedded options
   - 赎回条款 (Callable)
   - 回售条款 (Puttable)
   - 转换条款 (Convertible)
─────────────────────────────────────────
```

### 债券定价

```python
import numpy as np
from scipy.optimize import newton

class BondPricing:
    """
    债券定价方法
    """

    @staticmethod
    def present_value(cash_flows, discount_rates):
        """
        债券现值计算

        P = Σ(CF_t / (1+r_t)^t)
        """
        pv = sum(cf / (1 + r) ** t
                 for t, (cf, r) in enumerate(zip(cash_flows, discount_rates), 1))
        return pv

    @staticmethod
    def price_from_ytm(face_value, coupon_rate, ytm, periods, frequency=1):
        """
        给定到期收益率计算债券价格

        P = Σ(C/(1+y)^t) + F/(1+y)^n
        """
        coupon_payment = face_value * coupon_rate / frequency
        y = ytm / frequency
        n = periods

        # 票息现值
        pv_coupons = coupon_payment * (1 - (1 + y) ** (-n)) / y

        # 面值现值
        pv_face = face_value / (1 + y) ** n

        return pv_coupons + pv_face

    @staticmethod
    def yield_to_maturity(price, face_value, coupon_rate, periods, frequency=1, guess=0.05):
        """
        计算到期收益率 (YTM)

        使债券现金流现值等于市场价格
        """
        coupon = face_value * coupon_rate / frequency

        def price_diff(y):
            calculated_price = sum(
                coupon / (1 + y/frequency) ** t
                for t in range(1, periods + 1)
            ) + face_value / (1 + y/frequency) ** periods
            return calculated_price - price

        try:
            ytm = newton(price_diff, guess)
            return ytm * frequency
        except:
            return None

    @staticmethod
    def current_yield(annual_coupon, market_price):
        """
        当前收益率

        年票息 / 市场价格
        """
        return annual_coupon / market_price

    @staticmethod
    def yield_to_call(price, face_value, coupon_rate, periods_to_call, call_price, frequency=1):
        """
        计算赎回收益率 (YTC)

        可赎回债券可能被提前赎回
        """
        coupon = face_value * coupon_rate / frequency

        def price_diff(y):
            calculated_price = sum(
                coupon / (1 + y/frequency) ** t
                for t in range(1, periods_to_call + 1)
            ) + call_price / (1 + y/frequency) ** periods_to_call
            return calculated_price - price

        try:
            ytc = newton(price_diff, 0.05)
            return ytc * frequency
        except:
            return None
```

## 利率风险度量

### 久期与凸性

```python
class DurationAndConvexity:
    """
    久期与凸性计算
    """

    @staticmethod
    def macaulay_duration(cash_flows, ytm, frequency=1):
        """
        麦考利久期

        现金流时间的加权平均
        D_mac = Σ(t × PV(CF_t)) / P
        """
        y = ytm / frequency
        times = np.arange(1, len(cash_flows) + 1) / frequency

        pv_cash_flows = [cf / (1 + y) ** (t * frequency)
                        for t, cf in enumerate(cash_flows, 1)]

        total_pv = sum(pv_cash_flows)
        weighted_times = sum(t * pv for t, pv in zip(times, pv_cash_flows))

        return weighted_times / total_pv

    @staticmethod
    def modified_duration(macaulay_duration, ytm, frequency=1):
        """
        修正久期

        D_mod = D_mac / (1 + y/f)

        价格变动近似：ΔP/P ≈ -D_mod × Δy
        """
        return macaulay_duration / (1 + ytm / frequency)

    @staticmethod
    def effective_duration(price, ytm_up, ytm_down, delta_y=0.0001):
        """
        有效久期

        适用于含权债券
        D_eff = (P_- - P_+) / (2 × P_0 × Δy)
        """
        price_up = BondPricing.price_from_ytm(100, 0.05, ytm_up, 10)
        price_down = BondPricing.price_from_ytm(100, 0.05, ytm_down, 10)

        return (price_down - price_up) / (2 * price * delta_y)

    @staticmethod
    def convexity(cash_flows, ytm, frequency=1):
        """
        凸性

        C = Σ[t(t+1) × PV(CF_t)] / [P × (1+y)²]

        加入凸性后的价格变动：
        ΔP/P ≈ -D × Δy + 0.5 × C × (Δy)²
        """
        y = ytm / frequency
        times = np.arange(1, len(cash_flows) + 1)

        pv_cash_flows = [cf / (1 + y) ** t for t, cf in zip(times, cash_flows)]
        total_pv = sum(pv_cash_flows)

        convexity_numerator = sum(
            t * (t + 1) * pv for t, pv in zip(times, pv_cash_flows)
        )

        return convexity_numerator / (total_pv * (1 + y) ** 2)

    @staticmethod
    def dollar_duration(market_value, modified_duration):
        """
        美元久期

        收益率变动1%时债券价值的美元变化
        """
        return market_value * modified_duration * 0.01

    @staticmethod
    def dollar_convexity(market_value, convexity):
        """
        美元凸性
        """
        return market_value * convexity * 0.0001
```

### 利率期限结构

```python
class TermStructure:
    """
    利率期限结构分析
    """

    @staticmethod
    def bootstrapping_spot_rates(bond_data):
        """
        拔靴法计算即期利率

        从平价债券收益率推导零息债券收益率
        """
        spot_rates = []

        for i, bond in enumerate(bond_data):
            maturity = bond['maturity']
            coupon = bond['coupon']
            price = bond['price']

            if i == 0:
                # 第一期：直接计算
                spot = (100 / price) ** (1 / maturity) - 1
            else:
                # 后续期间：使用已知即期利率
                pv_coupons = sum(
                    coupon / (1 + spot_rates[j]) ** bond_data[j]['maturity']
                    for j in range(i)
                )
                remaining = price - pv_coupons
                spot = ((100 + coupon) / remaining) ** (1 / maturity) - 1

            spot_rates.append(spot)

        return spot_rates

    @staticmethod
    def forward_rate(spot_t1, spot_t2, t1, t2):
        """
        计算远期利率

        (1 + f)^(t2-t1) = (1 + s2)^t2 / (1 + s1)^t1
        """
        return ((1 + spot_t2) ** t2 / (1 + spot_t1) ** t1) ** (1 / (t2 - t1)) - 1

    @staticmethod
    def par_yield_curve(spot_rates, maturities):
        """
        从即期利率推导平价收益率曲线
        """
        par_yields = []

        for t, spot in zip(maturities, spot_rates):
            # 平价债券：价格 = 面值
            # 100 = Σ(c/(1+s)^i) + 100/(1+s)^t
            # 解出 c
            discount_factors = [(1 + spot_rates[i]) ** (-(i+1)) for i in range(t)]
            annuity_factor = sum(discount_factors)

            par_yield = (1 - discount_factors[-1]) / annuity_factor
            par_yields.append(par_yield)

        return par_yields

    @staticmethod
    def nelson_siegel(params, maturity):
        """
        Nelson-Siegel 期限结构模型

        R(t) = β0 + β1 × (1 - e^(-t/τ))/(t/τ) + β2 × [(1 - e^(-t/τ))/(t/τ) - e^(-t/τ)]
        """
        beta0, beta1, beta2, tau = params
        t = maturity

        if t == 0:
            return beta0 + beta1

        term1 = (1 - np.exp(-t / tau)) / (t / tau)
        term2 = term1 - np.exp(-t / tau)

        return beta0 + beta1 * term1 + beta2 * term2
```

## 信用分析

### 信用评级与利差

```python
class CreditAnalysis:
    """
    信用分析工具
    """

    @staticmethod
    def credit_spread(yield_corporate, yield_treasury):
        """
        信用利差

        公司债收益率与国债收益率之差
        """
        return yield_corporate - yield_treasury

    @staticmethod
    def default_probability(credit_spread, recovery_rate=0.4):
        """
        从信用利差推导违约概率（简化模型）

        P(default) ≈ Spread / (1 - Recovery Rate)
        """
        return credit_spread / (1 - recovery_rate)

    @staticmethod
    def expected_loss(probability_default, loss_given_default, exposure_at_default):
        """
        预期损失 (EL)

        EL = PD × LGD × EAD
        """
        return probability_default * loss_given_default * exposure_at_default

    @staticmethod
    def z_score_model(current_assets, current_liabilities, total_assets,
                     retained_earnings, ebit, sales, market_equity):
        """
        Altman Z-Score 模型

        Z = 1.2X1 + 1.4X2 + 3.3X3 + 0.6X4 + 1.0X5
        """
        x1 = (current_assets - current_liabilities) / total_assets  # 营运资金/总资产
        x2 = retained_earnings / total_assets  # 留存收益/总资产
        x3 = ebit / total_assets  # EBIT/总资产
        x4 = market_equity / total_assets  # 市值/总资产
        x5 = sales / total_assets  # 销售额/总资产

        z_score = 1.2 * x1 + 1.4 * x2 + 3.3 * x3 + 0.6 * x4 + 1.0 * x5

        interpretation = {
            'Z > 2.99': '安全区（低违约风险）',
            '1.81 < Z < 2.99': '灰色地带',
            'Z < 1.81': '困境区（高违约风险）'
        }

        return z_score, interpretation
```

## 债券组合管理

### 免疫策略

```python
class BondPortfolioManagement:
    """
    债券组合管理策略
    """

    @staticmethod
    def cash_flow_matching(liabilities, available_bonds):
        """
        现金流匹配策略

        选择债券使现金流恰好覆盖负债
        """
        # 线性规划问题：最小化成本，约束为现金流覆盖
        # 简化示例
        selected_bonds = []
        remaining_liabilities = liabilities.copy()

        for bond in sorted(available_bonds, key=lambda x: x['cost']):
            # 检查债券现金流是否能覆盖剩余负债
            if all(bond['cash_flows'][t] >= remaining_liabilities[t]
                   for t in range(len(remaining_liabilities))):
                selected_bonds.append(bond)
                remaining_liabilities = [max(0, remaining_liabilities[t] - bond['cash_flows'][t])
                                        for t in range(len(remaining_liabilities))]

        return selected_bonds

    @staticmethod
    def duration_matching(portfolio_duration, target_duration, bonds):
        """
        久期匹配策略

        调整组合久期以匹配目标久期（如负债久期）
        """
        current_duration = portfolio_duration
        adjustments = []

        if current_duration < target_duration:
            # 需要增加久期，买入长期债券
            long_bonds = [b for b in bonds if b['duration'] > current_duration]
            adjustments.append(f"买入长期债券: {long_bonds[0] if long_bonds else '无合适标的'}")
        elif current_duration > target_duration:
            # 需要减少久期，买入短期债券
            short_bonds = [b for b in bonds if b['duration'] < current_duration]
            adjustments.append(f"买入短期债券: {short_bonds[0] if short_bonds else '无合适标的'}")

        return adjustments

    @staticmethod
    def contingent_immunization(safety_net_return, current_portfolio_value,
                               liability_value, immunized_return):
        """
        或有免疫策略

        积极管理+免疫保底
        """
        # 计算触发免疫的阈值
        trigger_value = liability_value / ((1 + immunized_return) ** years_to_liability)

        cushion = current_portfolio_value - trigger_value
        cushion_ratio = cushion / current_portfolio_value

        return {
            'trigger_value': trigger_value,
            'current_cushion': cushion,
            'cushion_ratio': cushion_ratio,
            'strategy': '积极管理' if cushion_ratio > 0.05 else '切换到免疫策略'
        }
```

## 抵押贷款支持证券 (MBS)

```python
class MBSAnalysis:
    """
    抵押贷款支持证券分析
    """

    @staticmethod
    def prepayment_model(cpr):
        """
        提前偿付率模型

        CPR: 年条件提前偿付率
        SMM: 月提前偿付率 = 1 - (1 - CPR)^(1/12)
        """
        smm = 1 - (1 - cpr) ** (1/12)
        return smm

    @staticmethod
    def psa_benchmark(month, cpr_max=0.06):
        """
        PSA 提前偿付基准

        第1个月 CPR = 0.2%
        每月增加 0.2%，直到第30个月达到 6%
        之后保持 6%
        """
        if month <= 30:
            cpr = month * 0.002
        else:
            cpr = cpr_max

        return cpr

    @staticmethod
    def weighted_average_life(cash_flows, principal_payments):
        """
        加权平均期限 (WAL)

        本金偿还时间的加权平均
        """
        total_principal = sum(principal_payments)

        wal = sum(t * pp / total_principal
                 for t, pp in enumerate(principal_payments, 1))

        return wal

    @staticmethod
    def oas_analysis(spread, z_spread, option_cost):
        """
        期权调整利差 (OAS)

        OAS = Z-Spread - Option Cost
        """
        return z_spread - option_cost
```

## 延伸阅读

- [金融数学](../math/) - 固定收益计算工具
- [投资学](../investment/) - 资产组合理论
- [衍生品](../derivatives/) - 利率衍生品
