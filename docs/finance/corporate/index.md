# 公司金融

公司金融研究企业如何做出投资决策、融资决策和股利决策，以最大化股东价值。

## 财务报表分析

### 三大财务报表

```
财务报表体系
─────────────────────────────────────────

1. 资产负债表 (Balance Sheet)
   资产 = 负债 + 所有者权益

   - 反映某一时点的财务状况
   - 资产：流动资产、固定资产、无形资产
   - 负债：流动负债、长期负债
   - 权益：股本、资本公积、留存收益

2. 利润表 (Income Statement)
   收入 - 费用 = 利润

   - 反映一段期间的经营成果
   - 营业收入
   - 营业成本
   - 营业利润
   - 净利润

3. 现金流量表 (Cash Flow Statement)

   - 反映一段期间的现金变动
   - 经营活动现金流
   - 投资活动现金流
   - 筹资活动现金流

─────────────────────────────────────────
```

### 财务比率分析

```python
import numpy as np
import pandas as pd

class FinancialRatioAnalysis:
    """
    财务比率分析框架
    """

    @staticmethod
    def profitability_ratios(net_income, revenue, total_assets, equity):
        """
        盈利能力比率
        """
        return {
            'gross_margin': (revenue - cogs) / revenue if 'cogs' in dir() else None,
            'operating_margin': operating_income / revenue if 'operating_income' in dir() else None,
            'net_profit_margin': net_income / revenue,
            'roa': net_income / total_assets,  # 资产收益率
            'roe': net_income / equity,        # 净资产收益率
        }

    @staticmethod
    def liquidity_ratios(current_assets, current_liabilities, inventory, receivables):
        """
        流动性比率
        """
        return {
            'current_ratio': current_assets / current_liabilities,
            'quick_ratio': (current_assets - inventory) / current_liabilities,
            'cash_ratio': (current_assets - inventory - receivables) / current_liabilities,
        }

    @staticmethod
    def solvency_ratios(total_debt, total_assets, ebit, interest_expense):
        """
        偿债能力比率
        """
        return {
            'debt_to_assets': total_debt / total_assets,
            'debt_to_equity': total_debt / (total_assets - total_debt),
            'interest_coverage': ebit / interest_expense if interest_expense != 0 else float('inf'),
        }

    @staticmethod
    def efficiency_ratios(revenue, cogs, average_inventory, average_receivables, average_payables):
        """
        营运效率比率
        """
        return {
            'inventory_turnover': cogs / average_inventory,
            'days_inventory': 365 / (cogs / average_inventory),
            'receivables_turnover': revenue / average_receivables,
            'days_receivables': 365 / (revenue / average_receivables),
            'payables_turnover': cogs / average_payables,
            'days_payables': 365 / (cogs / average_payables),
            'cash_conversion_cycle': (
                365 / (cogs / average_inventory) +
                365 / (revenue / average_receivables) -
                365 / (cogs / average_payables)
            ),
        }

    @staticmethod
    def market_value_ratios(stock_price, eps, book_value_per_share, dividends_per_share):
        """
        市场价值比率
        """
        return {
            'pe_ratio': stock_price / eps,
            'pb_ratio': stock_price / book_value_per_share,
            'dividend_yield': dividends_per_share / stock_price,
            'payout_ratio': dividends_per_share / eps,
        }
```

## 资本预算

### 投资决策方法

```python
class CapitalBudgeting:
    """
    资本预算决策方法
    """

    @staticmethod
    def npv(cash_flows, discount_rate):
        """
        净现值 (NPV)

        NPV = Σ(CFt / (1+r)^t)

        NPV > 0: 接受项目
        NPV < 0: 拒绝项目
        """
        npv_value = sum([
            cf / (1 + discount_rate) ** t
            for t, cf in enumerate(cash_flows)
        ])
        return npv_value

    @staticmethod
    def irr(cash_flows, initial_guess=0.1):
        """
        内部收益率 (IRR)

        使 NPV = 0 的折现率
        """
        from scipy.optimize import newton

        def npv_func(rate):
            return sum([
                cf / (1 + rate) ** t
                for t, cf in enumerate(cash_flows)
            ])

        try:
            irr = newton(npv_func, initial_guess)
            return irr
        except:
            return None

    @staticmethod
    def payback_period(cash_flows):
        """
        投资回收期

        收回初始投资所需的年数
        """
        cumulative = 0
        for t, cf in enumerate(cash_flows):
            cumulative += cf
            if cumulative >= 0:
                # 插值计算精确回收期
                if t > 0:
                    prev_cumulative = cumulative - cf
                    fraction = abs(prev_cumulative) / cf
                    return t - 1 + fraction
                return t
        return float('inf')  # 无法回收

    @staticmethod
    def profitability_index(cash_flows, discount_rate, initial_investment):
        """
        盈利指数 (PI)

        PI = 未来现金流现值 / 初始投资

        PI > 1: 接受项目
        """
        pv_future = sum([
            cf / (1 + discount_rate) ** t
            for t, cf in enumerate(cash_flows[1:], 1)
        ])
        return pv_future / abs(initial_investment)

    @staticmethod
    def equivalent_annual_annuity(npv, discount_rate, project_life):
        """
        等额年金法 (EAA)

        用于比较不同期限的项目
        """
        annuity_factor = (1 - (1 + discount_rate) ** (-project_life)) / discount_rate
        return npv / annuity_factor
```

### 现金流估算

```python
class CashFlowEstimation:
    """
    项目现金流估算
    """

    @staticmethod
    def operating_cash_flow(revenue, costs, depreciation, tax_rate):
        """
        经营现金流 (OCF)

        三种等价计算方法：
        1. OCF = EBIT + 折旧 - 税
        2. OCF = 净利润 + 折旧
        3. OCF = (收入 - 付现成本) × (1 - 税率) + 折旧 × 税率
        """
        ebit = revenue - costs - depreciation
        taxes = ebit * tax_rate
        net_income = ebit - taxes

        # 方法1
        ocf1 = ebit + depreciation - taxes

        # 方法2
        ocf2 = net_income + depreciation

        # 方法3
        ocf3 = (revenue - (costs - depreciation)) * (1 - tax_rate) + depreciation * tax_rate

        return {
            'ebit': ebit,
            'taxes': taxes,
            'net_income': net_income,
            'ocf': ocf1,
            'ocf_alternatives': [ocf1, ocf2, ocf3]
        }

    @staticmethod
    def free_cash_flow(revenue, costs, depreciation, capex, nwc_change, tax_rate):
        """
        自由现金流 (FCF)

        FCF = OCF - 资本支出 - 营运资本变动
        """
        ocf_result = CashFlowEstimation.operating_cash_flow(
            revenue, costs, depreciation, tax_rate
        )

        fcf = ocf_result['ocf'] - capex - nwc_change

        return {
            'ocf': ocf_result['ocf'],
            'capex': capex,
            'nwc_change': nwc_change,
            'fcf': fcf
        }

    @staticmethod
    def project_cash_flows(initial_investment, annual_revenues, annual_costs,
                          depreciation_schedule, capex_schedule, nwc_changes,
                          salvage_value, tax_rate, project_life):
        """
        完整项目现金流
        """
        cash_flows = [-initial_investment]

        for t in range(1, project_life + 1):
            fcf = CashFlowEstimation.free_cash_flow(
                annual_revenues[t-1],
                annual_costs[t-1],
                depreciation_schedule[t-1],
                capex_schedule[t-1],
                nwc_changes[t-1],
                tax_rate
            )
            cash_flows.append(fcf['fcf'])

        # 期末回收
        terminal_flow = salvage_value * (1 - tax_rate)  # 假设有资本利得税
        cash_flows[-1] += terminal_flow

        return cash_flows
```

## 资本结构

### 资本成本

```python
class CostOfCapital:
    """
    资本成本计算
    """

    @staticmethod
    def cost_of_equity_capm(risk_free_rate, beta, market_return):
        """
        CAPM计算权益资本成本

        Re = Rf + β × (Rm - Rf)
        """
        return risk_free_rate + beta * (market_return - risk_free_rate)

    @staticmethod
    def cost_of_equity_ddm(dividend, stock_price, growth_rate):
        """
        股利增长模型计算权益成本

        Re = D1/P0 + g
        """
        return (dividend / stock_price) + growth_rate

    @staticmethod
    def cost_of_debt(yield_to_maturity, tax_rate):
        """
        税后债务成本

        Rd = YTM × (1 - T)
        """
        return yield_to_maturity * (1 - tax_rate)

    @staticmethod
    def wacc(equity_value, debt_value, cost_of_equity, cost_of_debt, tax_rate):
        """
        加权平均资本成本 (WACC)

        WACC = E/V × Re + D/V × Rd × (1 - T)
        """
        total_value = equity_value + debt_value
        equity_weight = equity_value / total_value
        debt_weight = debt_value / total_value

        wacc = (equity_weight * cost_of_equity +
                debt_weight * cost_of_debt * (1 - tax_rate))

        return {
            'wacc': wacc,
            'equity_weight': equity_weight,
            'debt_weight': debt_weight,
            'cost_of_equity': cost_of_equity,
            'after_tax_cost_of_debt': cost_of_debt * (1 - tax_rate)
        }
```

### 资本结构理论

```python
class CapitalStructureTheory:
    """
    资本结构理论
    """

    @staticmethod
    def mm_proposition_1_no_tax(vu, vl, debt):
        """
        MM定理1 (无税)

        企业价值与资本结构无关
        V_L = V_U
        """
        return {
            'proposition': 'V_L = V_U',
            'implication': '资本结构不影响企业价值',
            'vl': vu,
            'vu': vu
        }

    @staticmethod
    def mm_proposition_1_with_tax(vu, debt, tax_rate):
        """
        MM定理1 (有税)

        V_L = V_U + T × D

        债务增加企业价值（税盾效应）
        """
        vl = vu + tax_rate * debt
        return {
            'proposition': 'V_L = V_U + T×D',
            'implication': '债务增加企业价值',
            'tax_shield': tax_rate * debt,
            'vl': vl,
            'vu': vu
        }

    @staticmethod
    def trade_off_theory(vu, debt, tax_rate, bankruptcy_cost):
        """
        权衡理论

        最优资本结构在税盾收益和破产成本之间权衡
        """
        tax_shield = tax_rate * debt
        vl = vu + tax_shield - bankruptcy_cost

        return {
            'vl': vl,
            'tax_shield_benefit': tax_shield,
            'bankruptcy_cost': bankruptcy_cost,
            'optimal_debt': '使税盾边际收益 = 破产成本边际增加'
        }

    @staticmethod
    def pecking_order_theory():
        """
        优序融资理论

        融资顺序：内部资金 > 债务 > 权益
        """
        return {
            'hierarchy': [
                '1. 内部融资（留存收益）',
                '2. 债务融资',
                '3. 权益融资（最后选择）'
            ],
            'rationale': '信息不对称导致权益融资传递负面信号',
            'implications': [
                '不存在目标资本结构',
                '盈利公司负债较少',
                '公司偏好财务松弛'
            ]
        }
```

## 企业估值

### 估值方法

```python
class FirmValuation:
    """
    企业估值方法
    """

    @staticmethod
    def dcf_valuation(free_cash_flows, wacc, terminal_growth_rate):
        """
        DCF估值法

        企业价值 = 预测期FCF现值 + 终值现值
        """
        # 预测期现值
        pv_fcf = sum([
            fcf / (1 + wacc) ** t
            for t, fcf in enumerate(free_cash_flows, 1)
        ])

        # 终值 (Gordon Growth)
        terminal_fcf = free_cash_flows[-1] * (1 + terminal_growth_rate)
        terminal_value = terminal_fcf / (wacc - terminal_growth_rate)
        pv_terminal = terminal_value / (1 + wacc) ** len(free_cash_flows)

        enterprise_value = pv_fcf + pv_terminal

        return {
            'enterprise_value': enterprise_value,
            'pv_fcf': pv_fcf,
            'pv_terminal': pv_terminal,
            'terminal_value': terminal_value
        }

    @staticmethod
    def comparable_company_analysis(target_metrics, comparables_multiples):
        """
        可比公司法

        使用可比公司的估值乘数
        """
        # 计算可比公司平均乘数
        avg_pe = np.mean([comp['pe'] for comp in comparables_multiples])
        avg_pb = np.mean([comp['pb'] for comp in comparables_multiples])
        avg_ev_ebitda = np.mean([comp['ev_ebitda'] for comp in comparables_multiples])

        # 估值
        value_pe = target_metrics['earnings'] * avg_pe
        value_pb = target_metrics['book_value'] * avg_pb
        value_ev_ebitda = target_metrics['ebitda'] * avg_ev_ebitda

        return {
            'value_pe': value_pe,
            'value_pb': value_pb,
            'value_ev_ebitda': value_ev_ebitda,
            'average_value': np.mean([value_pe, value_pb, value_ev_ebitda])
        }

    @staticmethod
    def precedent_transactions(target_metrics, transaction_multiples):
        """
        先例交易法

        使用并购交易的估值乘数（通常包含控制权溢价）
        """
        avg_multiple = np.mean([trans['multiple'] for trans in transaction_multiples])
        implied_value = target_metrics * avg_multiple

        return {
            'implied_value': implied_value,
            'control_premium': '先例交易通常包含20-40%控制权溢价'
        }

    @staticmethod
    def lbo_valuation(initial_ebitda, growth_rate, exit_multiple,
                     entry_ev_ebitda, debt_capacity, investment_horizon=5):
        """
        LBO估值法（杠杆收购视角）

        从私募股权投资者角度估值
        """
        # 预测EBITDA
        final_ebitda = initial_ebitda * ((1 + growth_rate) ** investment_horizon)

        # 退出价值
        exit_value = final_ebitda * exit_multiple

        # 债务偿还
        initial_debt = debt_capacity * initial_ebitda * entry_ev_ebitda

        # 股权价值
        equity_value = exit_value - initial_debt * 0.5  # 假设偿还一半债务

        # IRR计算
        initial_equity = initial_ebitda * entry_ev_ebitda - initial_debt
        irr = (equity_value / initial_equity) ** (1 / investment_horizon) - 1

        return {
            'entry_equity': initial_equity,
            'exit_equity': equity_value,
            'irr': irr,
            'money_multiple': equity_value / initial_equity
        }
```

## 股利政策

### 股利政策理论

```python
class DividendPolicy:
    """
    股利政策
    """

    @staticmethod
    def dividend_irrelevance_theory(firm_value_with_dividend, firm_value_without_dividend):
        """
        股利无关论 (MM理论)

        在无税、无交易成本、信息对称的完美市场中，
        股利政策不影响企业价值
        """
        return {
            'theory': 'Dividend Irrelevance',
            'assertion': '股利政策不影响企业价值',
            'conditions': [
                '无税',
                '无交易成本',
                '信息对称',
                '投资政策固定'
            ],
            'conclusion': np.isclose(firm_value_with_dividend, firm_value_without_dividend)
        }

    @staticmethod
    def bird_in_hand_theory():
        """
        "一鸟在手"理论

        投资者偏好现金股利而非资本利得
        """
        return {
            'theory': 'Bird in Hand',
            'assertion': '股利比资本利得更确定',
            'implication': '高股利支付率提高股价',
            'criticism': 'MM认为股利和资本利得风险相同'
        }

    @staticmethod
    def tax_preference_theory(dividend_tax, capital_gains_tax):
        """
        税差理论

        如果资本利得税率低于股利税率，
        投资者偏好低股利政策
        """
        return {
            'theory': 'Tax Preference',
            'dividend_tax': dividend_tax,
            'capital_gains_tax': capital_gains_tax,
            'preference': '低股利' if capital_gains_tax < dividend_tax else '高股利',
            'effective_tax_advantage': 1 - (1 - capital_gains_tax) / (1 - dividend_tax)
        }

    @staticmethod
    def signaling_theory(dividend_change, market_reaction):
        """
        信号理论

        股利变化传递管理层对未来前景的预期
        """
        return {
            'increase_dividend': {
                'signal': '管理层对未来现金流有信心',
                'typical_reaction': '股价上涨'
            },
            'decrease_dividend': {
                'signal': '财务困难或投资机会',
                'typical_reaction': '股价下跌'
            },
            'initiate_dividend': '从成长期进入成熟期'
        }

    @staticmethod
    def clientele_effect():
        """
        客户效应

        不同投资者群体偏好不同股利政策
        """
        return {
            'high_dividend_prefer': [
                '退休人员（需要稳定收入）',
                '免税机构（养老金、捐赠基金）',
                '低税率个人投资者'
            ],
            'low_dividend_prefer': [
                '高税率个人投资者',
                '追求资本增值的投资者',
                '年轻投资者'
            ],
            'implication': '公司应坚持稳定的股利政策以吸引特定客户群'
        }
```

## 延伸阅读

- [财务报表分析](../basics/) - 会计基础
- [投资学](../investment/) - 资产定价与组合理论
- [金融数学](../math/) - 金融计算工具
