# 金融基础理论

金融基础理论是理解现代金融体系的基石，涵盖货币、信用、利率等核心概念。

## 货币与信用

### 货币的职能

```
货币的四大职能
─────────────────────────────────────────
1. 交易媒介 (Medium of Exchange)
   - 降低交易成本
   - 消除物物交换的双重巧合需求

2. 价值尺度 (Unit of Account)
   - 统一计价单位
   - 便于比较不同商品价值

3. 价值储藏 (Store of Value)
   - 跨期转移购买力
   - 需要保持相对稳定的价值

4. 延期支付标准 (Standard of Deferred Payment)
   - 债务计价的单位
   - 信用交易的基础
─────────────────────────────────────────
```

### 货币层次

```python
"""
货币供应量层次
"""

# M0 = 流通中现金
M0 = "银行体系外的纸币硬币"

# M1 = M0 + 活期存款 (狭义货币)
M1 = M0 + "活期存款 + 支票账户"
# M1 反映经济中的现实购买力

# M2 = M1 + 准货币 (广义货币)
M2 = M1 + "定期存款 + 储蓄存款 + 货币市场基金"
# M2 反映现实和潜在的购买力

# M3 = M2 + 其他流动性资产
M3 = M2 + "大额存单 + 机构货币市场基金 + 短期回购协议"

"""
货币层次的意义：
- M1 增速快 → 消费和投资活跃
- M2 增速快 → 潜在通胀压力
- M2 - M1 扩大 → 储蓄倾向增强
"""
```

### 信用与信用工具

**信用的形式**
- **商业信用**：企业间赊销赊购
- **银行信用**：银行提供的贷款
- **国家信用**：政府债券
- **消费信用**：分期付款、信用卡

## 利率理论

### 利率的决定

```python
import numpy as np
import matplotlib.pyplot as plt

class InterestRateTheory:
    """
    利率决定理论
    """

    @staticmethod
    def fisher_equation(nominal_rate, inflation_rate):
        """
        费雪方程式: 实际利率 = 名义利率 - 通胀率

        精确公式: (1 + r_nominal) = (1 + r_real) * (1 + inflation)
        """
        r_real_exact = (1 + nominal_rate) / (1 + inflation_rate) - 1
        r_real_approx = nominal_rate - inflation_rate

        return {
            'real_rate_exact': r_real_exact,
            'real_rate_approx': r_real_approx,
            'fisher_effect': nominal_rate - r_real_exact  # 通胀溢价
        }

    @staticmethod
    def liquidity_preference_theory(money_supply, money_demand_params):
        """
        凯恩斯流动性偏好理论

        利率由货币供给和货币需求决定
        货币需求三大动机:
        1. 交易动机
        2. 预防动机
        3. 投机动机
        """
        # 货币需求函数: L = kY - hr
        # k: 交易需求系数
        # h: 投机需求利率弹性
        # Y: 收入水平

        k = money_demand_params.get('k', 0.2)
        h = money_demand_params.get('h', 1000)
        Y = money_demand_params.get('Y', 10000)

        # 均衡: M_s = L = kY - hr
        # r = (kY - M_s) / h
        equilibrium_rate = (k * Y - money_supply) / h

        return max(0, equilibrium_rate)  # 利率下限为0

    @staticmethod
    def loanable_funds_theory(savings, investment, money_hoarding):
        """
        可贷资金理论

        利率由可贷资金的供给和需求决定
        """
        # 供给 = 储蓄 - 窖藏
        supply = savings - money_hoarding

        # 需求 = 投资
        demand = investment

        # 均衡利率使供需相等
        # 这里简化表示，实际需要通过市场出清计算
        interest_rate = np.log(demand / supply) if supply > 0 else float('inf')

        return {
            'supply': supply,
            'demand': demand,
            'equilibrium_rate': max(0, interest_rate)
        }
```

### 利率期限结构

```python
class TermStructure:
    """
    利率期限结构理论
    """

    @staticmethod
    def yield_curve_shapes():
        """
        收益率曲线形状
        """
        return {
            'normal': {
                'description': '向上倾斜',
                'shape': '长期利率 > 短期利率',
                'implication': '经济正常扩张期'
            },
            'inverted': {
                'description': '向下倾斜',
                'shape': '长期利率 < 短期利率',
                'implication': '可能预示经济衰退'
            },
            'flat': {
                'description': '水平',
                'shape': '长短期利率接近',
                'implication': '经济过渡期'
            },
            'humped': {
                'description': '驼峰型',
                'shape': '中期利率最高',
                'implication': '预期未来利率不确定'
            }
        }

    @staticmethod
    def expectations_theory(spot_rates, forward_rates):
        """
        预期理论

        长期利率是预期短期利率的平均值
        """
        # (1 + r_n)^n = (1 + r_1) * (1 + f_1,2) * ... * (1 + f_n-1,n)
        # 其中 f 是远期利率

        n = len(spot_rates)
        implied_forward = []

        for i in range(1, n):
            # 从即期利率推导远期利率
            forward = ((1 + spot_rates[i])**(i+1) / (1 + spot_rates[i-1])**i) - 1
            implied_forward.append(forward)

        return implied_forward

    @staticmethod
    def liquidity_premium_theory(spot_rates, liquidity_premia):
        """
        流动性溢价理论

        长期利率 = 预期短期利率均值 + 流动性溢价
        """
        adjusted_rates = []

        for i, (spot, premium) in enumerate(zip(spot_rates, liquidity_premia)):
            # 减去流动性溢价得到纯预期成分
            pure_expectation = spot - premium
            adjusted_rates.append(pure_expectation)

        return adjusted_rates

    @staticmethod
    def market_segmentation_theory():
        """
        市场分割理论

        不同期限的债券市场相互独立
        由各自的供需决定利率
        """
        explanation = """
        市场分割理论要点:

        1. 投资者有固定的期限偏好
           - 银行偏好短期债券（负债短期）
           - 保险公司偏好长期债券（负债长期）

        2. 各期限市场独立运作
           - 短期利率由货币市场供需决定
           - 长期利率由资本市场供需决定

        3. 政策含义
           - 央行可通过操作特定期限影响收益率曲线
           - 期限选择操作 (Operation Twist)
        """
        return explanation
```

## 资产定价基础

### 货币时间价值

```python
class TimeValueOfMoney:
    """
    货币时间价值计算
    """

    @staticmethod
    def present_value(future_value, rate, periods):
        """
        现值计算

        PV = FV / (1 + r)^n
        """
        return future_value / ((1 + rate) ** periods)

    @staticmethod
    def future_value(present_value, rate, periods):
        """
        终值计算

        FV = PV * (1 + r)^n
        """
        return present_value * ((1 + rate) ** periods)

    @staticmethod
    def annuity_present_value(payment, rate, periods):
        """
        普通年金现值

        PV = PMT * [1 - (1 + r)^-n] / r
        """
        if rate == 0:
            return payment * periods
        return payment * (1 - (1 + rate) ** (-periods)) / rate

    @staticmethod
    def annuity_future_value(payment, rate, periods):
        """
        普通年金终值

        FV = PMT * [(1 + r)^n - 1] / r
        """
        if rate == 0:
            return payment * periods
        return payment * ((1 + rate) ** periods - 1) / rate

    @staticmethod
    def perpetuity_present_value(payment, rate):
        """
        永续年金现值

        PV = PMT / r
        """
        return payment / rate

    @staticmethod
    def growing_perpetuity(payment, rate, growth_rate):
        """
        增长永续年金现值（戈登增长模型基础）

        PV = PMT / (r - g)
        """
        if growth_rate >= rate:
            raise ValueError("增长率必须小于折现率")
        return payment / (rate - growth_rate)

    @staticmethod
    def irr_calculation(cash_flows, initial_guess=0.1):
        """
        内部收益率 (IRR) 计算

        NPV = 0 时的折现率
        """
        from scipy.optimize import newton

        def npv(rate):
            return sum(cf / (1 + rate) ** i for i, cf in enumerate(cash_flows))

        try:
            irr = newton(npv, initial_guess)
            return irr
        except:
            return None

    @staticmethod
    def effective_annual_rate(nominal_rate, compounding_frequency):
        """
        有效年利率

        EAR = (1 + r/n)^n - 1
        """
        return (1 + nominal_rate / compounding_frequency) ** compounding_frequency - 1
```

### 风险与收益

```python
class RiskAndReturn:
    """
    风险与收益度量
    """

    @staticmethod
    def holding_period_return(beginning_price, ending_price, dividend=0):
        """
        持有期收益率

        HPR = (P1 - P0 + D) / P0
        """
        return (ending_price - beginning_price + dividend) / beginning_price

    @staticmethod
    def arithmetic_mean_returns(returns):
        """
        算术平均收益率
        """
        return np.mean(returns)

    @staticmethod
    def geometric_mean_returns(returns):
        """
        几何平均收益率

        更准确的长期收益率度量
        """
        product = np.prod([1 + r for r in returns])
        return product ** (1 / len(returns)) - 1

    @staticmethod
    def variance_and_std(returns, sample=True):
        """
        方差和标准差
        """
        ddof = 1 if sample else 0
        variance = np.var(returns, ddof=ddof)
        std_dev = np.std(returns, ddof=ddof)

        return {
            'variance': variance,
            'std_dev': std_dev,
            'annualized_volatility': std_dev * np.sqrt(252)  # 假设日收益率
        }

    @staticmethod
    def coefficient_of_variation(std_dev, mean_return):
        """
        变异系数

        单位收益承担的风险
        """
        return std_dev / mean_return if mean_return != 0 else float('inf')

    @staticmethod
    def sharpe_ratio(returns, risk_free_rate=0.02):
        """
        夏普比率

        (Rp - Rf) / σp
        """
        excess_return = np.mean(returns) - risk_free_rate / 252  # 假设日收益率
        volatility = np.std(returns, ddof=1)

        if volatility == 0:
            return 0

        return (excess_return / volatility) * np.sqrt(252)

    @staticmethod
    def sortino_ratio(returns, risk_free_rate=0.02, target_return=0):
        """
        索提诺比率

        只考虑下行风险
        """
        excess_return = np.mean(returns) - risk_free_rate / 252

        # 下行偏差
        downside_returns = [r for r in returns if r < target_return]
        if len(downside_returns) == 0:
            return float('inf')

        downside_deviation = np.std(downside_returns, ddof=1)

        return (excess_return / downside_deviation) * np.sqrt(252)
```

## 金融市场效率

### 有效市场假说

```python
class EfficientMarketHypothesis:
    """
    有效市场假说 (EMH)
    """

    @staticmethod
    def forms_of_efficiency():
        """
        有效市场的三种形式
        """
        return {
            'weak_form': {
                'description': '弱式有效',
                'information_set': '历史价格和交易量信息',
                'implication': '技术分析无效',
                'test': '序列相关检验、游程检验',
                'evidence': '大多数市场满足弱式有效'
            },
            'semi_strong_form': {
                'description': '半强式有效',
                'information_set': '所有公开信息（财务报告、新闻等）',
                'implication': '基本面分析无效',
                'test': '事件研究法',
                'evidence': '市场迅速反应公开信息'
            },
            'strong_form': {
                'description': '强式有效',
                'information_set': '所有信息（包括内幕信息）',
                'implication': '任何分析都无法获得超额收益',
                'test': '内幕交易者收益分析',
                'evidence': '强式有效不成立（内幕交易可获利）'
            }
        }

    @staticmethod
    def market_anomalies():
        """
        市场异象（对EMH的挑战）
        """
        return {
            'calendar_effects': {
                'january_effect': '一月效应，小盘股在一月表现优异',
                'weekend_effect': '周末效应，周一收益率较低',
                'turn_of_month': '月末效应'
            },
            'size_effect': {
                'description': '规模效应',
                'finding': '小市值股票收益高于大市值股票',
                'explanation': '流动性补偿、被忽视公司效应'
            },
            'value_effect': {
                'description': '价值效应',
                'finding': '低市净率、低市盈率股票收益更高',
                'explanation': '价值股风险更高或行为偏差'
            },
            'momentum_effect': {
                'description': '动量效应',
                'finding': '过去表现好的股票未来仍表现好',
                'explanation': '反应不足、行为偏差'
            }
        }
```

## 延伸阅读

- [投资学基础](../investment/) - 现代投资组合理论
- [金融数学](../math/) - 金融计算与建模
- [量化交易](../quant/) - 量化策略实现
