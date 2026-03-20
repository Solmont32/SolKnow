# 权益投资

权益投资是投资者通过持有公司股票分享企业所有权和成长收益的投资方式。

## 股票市场基础

### 股票类型

```
股票分类
─────────────────────────────────────────
├── 普通股 (Common Stock)
│   ├── 投票权（通常一股一票）
│   ├── 分红权（不固定）
│   ├── 剩余索取权
│   └── 有限责任
│
├── 优先股 (Preferred Stock)
│   ├── 固定股息
│   ├── 优先分红权
│   ├── 优先清算权
│   ├── 通常无投票权
│   └── 可累积/不可累积
│
└── 其他权益工具
    ├── 存托凭证 (ADR/GDR)
    ├── 认股权证 (Warrants)
    └── 员工期权
─────────────────────────────────────────
```

### 股票估值基础

```python
import numpy as np

class EquityValuation:
    """
    股票估值方法
    """

    @staticmethod
    def dividend_discount_model(d1, r, g):
        """
        股利贴现模型 (Gordon Growth Model)

        P = D1 / (r - g)
        """
        if g >= r:
            raise ValueError("增长率必须小于要求回报率")
        return d1 / (r - g)

    @staticmethod
    def multi_stage_ddm(dividends, high_growth_period, high_growth_rate,
                       terminal_growth_rate, required_return):
        """
        多阶段股利贴现模型
        """
        # 高增长阶段
        pv_high_growth = 0
        for t in range(1, high_growth_period + 1):
            d = dividends * (1 + high_growth_rate) ** t
            pv_high_growth += d / (1 + required_return) ** t

        # 终值
        d_terminal = dividends * (1 + high_growth_rate) ** high_growth_period * (1 + terminal_growth_rate)
        terminal_value = d_terminal / (required_return - terminal_growth_rate)
        pv_terminal = terminal_value / (1 + required_return) ** high_growth_period

        return pv_high_growth + pv_terminal

    @staticmethod
    def free_cash_flow_to_equity(fcfe, required_return, growth_rate):
        """
        FCFE 估值模型

        股权自由现金流贴现
        """
        return fcfe * (1 + growth_rate) / (required_return - growth_rate)

    @staticmethod
    def free_cash_flow_to_firm(fcff, wacc, growth_rate):
        """
        FCFF 估值模型

        企业自由现金流贴现
        """
        firm_value = fcff * (1 + growth_rate) / (wacc - growth_rate)
        return firm_value

    @staticmethod
    def pe_ratio_valuation(eps, pe_ratio):
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

    @staticmethod
    def ev_ebitda_valuation(ebitda, ev_ebitda_multiple, net_debt=0):
        """
        EV/EBITDA 估值法
        """
        enterprise_value = ebitda * ev_ebitda_multiple
        equity_value = enterprise_value - net_debt
        return equity_value

    @staticmethod
    def residual_income_model(book_value, residual_incomes, required_return):
        """
        剩余收益估值模型

        价值 = 账面价值 + 未来剩余收益现值
        """
        pv_residual = sum(ri / (1 + required_return) ** (t + 1)
                         for t, ri in enumerate(residual_incomes))
        return book_value + pv_residual
```

## 股票分析框架

### 基本面分析

```python
class FundamentalAnalysis:
    """
    基本面分析框架
    """

    @staticmethod
    def dupont_analysis(net_income, revenue, total_assets, equity):
        """
        杜邦分析法

        ROE = 净利润率 × 总资产周转率 × 权益乘数
        """
        profit_margin = net_income / revenue
        asset_turnover = revenue / total_assets
        equity_multiplier = total_assets / equity

        roe = profit_margin * asset_turnover * equity_multiplier

        return {
            'roe': roe,
            'profit_margin': profit_margin,
            'asset_turnover': asset_turnover,
            'equity_multiplier': equity_multiplier,
            'interpretation': {
                'high_margin_low_turnover': '差异化战略',
                'low_margin_high_turnover': '成本领先战略'
            }
        }

    @staticmethod
    def financial_health_ratios():
        """
        财务健康度指标体系
        """
        return {
            '盈利能力': {
                '毛利率': '反映产品竞争力',
                '营业利润率': '反映经营效率',
                '净利率': '反映最终盈利能力',
                'ROE': '股东回报水平',
                'ROA': '资产使用效率'
            },
            '成长能力': {
                '营收增长率': '市场份额扩张',
                '净利润增长率': '盈利增长',
                'ROE增长率': '回报提升'
            },
            '营运效率': {
                '存货周转率': '库存管理效率',
                '应收账款周转率': '回款速度',
                '总资产周转率': '资产使用效率'
            },
            '偿债能力': {
                '流动比率': '短期偿债能力',
                '速动比率': '即时偿债能力',
                '资产负债率': '杠杆水平',
                '利息保障倍数': '偿债安全边际'
            }
        }

    @staticmethod
    def competitive_analysis():
        """
        竞争力分析框架
        """
        return {
            '波特五力模型': {
                '现有竞争者': '行业竞争激烈程度',
                '潜在进入者': '进入壁垒高低',
                '替代品威胁': '替代产品风险',
                '供应商议价能力': '上游控制力',
                '客户议价能力': '下游控制力'
            },
            'SWOT分析': {
                '优势(Strengths)': '内部积极因素',
                '劣势(Weaknesses)': '内部消极因素',
                '机会(Opportunities)': '外部积极因素',
                '威胁(Threats)': '外部消极因素'
            }
        }
```

### 技术分析

```python
class TechnicalAnalysis:
    """
    技术分析工具
    """

    @staticmethod
    def moving_average(prices, window):
        """简单移动平均线"""
        return prices.rolling(window=window).mean()

    @staticmethod
    def exponential_moving_average(prices, span):
        """指数移动平均线"""
        return prices.ewm(span=span, adjust=False).mean()

    @staticmethod
    def rsi(prices, period=14):
        """
        相对强弱指标 (RSI)

        RSI = 100 - 100/(1 + RS)
        RS = 平均上涨幅度 / 平均下跌幅度
        """
        delta = prices.diff()

        gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()

        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))

        return rsi

    @staticmethod
    def macd(prices, fast=12, slow=26, signal=9):
        """
        MACD 指标

        MACD = EMA(12) - EMA(26)
        Signal = EMA(MACD, 9)
        Histogram = MACD - Signal
        """
        ema_fast = prices.ewm(span=fast, adjust=False).mean()
        ema_slow = prices.ewm(span=slow, adjust=False).mean()

        macd_line = ema_fast - ema_slow
        signal_line = macd_line.ewm(span=signal, adjust=False).mean()
        histogram = macd_line - signal_line

        return macd_line, signal_line, histogram

    @staticmethod
    def bollinger_bands(prices, window=20, num_std=2):
        """
        布林带

        中轨 = MA(20)
        上轨 = 中轨 + 2×σ
        下轨 = 中轨 - 2×σ
        """
        middle = prices.rolling(window=window).mean()
        std = prices.rolling(window=window).std()

        upper = middle + num_std * std
        lower = middle - num_std * std

        return upper, middle, lower

    @staticmethod
    def support_resistance(prices, window=10):
        """
        支撑阻力位识别
        """
        highs = prices.rolling(window=window, center=True).max()
        lows = prices.rolling(window=window, center=True).min()

        resistance = highs == prices
        support = lows == prices

        return support, resistance
```

## 股票投资策略

### 价值投资

```python
class ValueInvesting:
    """
    价值投资策略
    """

    @staticmethod
    def graham_criteria():
        """
        格雷厄姆价值投资标准
        """
        return {
            '安全边际': {
                '价格低于内在价值': '足够折扣才买入',
                '低估标准': '市值低于净营运资本的2/3'
            },
            '财务标准': {
                '流动比率': '> 2.0',
                '长期负债': '< 净营运资本',
                '盈利稳定性': '过去10年持续盈利',
                '股息记录': '连续20年分红',
                '盈利增长': '10年至少增长33%'
            },
            '质量因素': {
                '适度规模': '大型企业',
                '低PB': '< 1.5',
                '低PE': '< 15',
                '合理PEG': '< 1.0'
            }
        }

    @staticmethod
    def magic_formula(ebit, enterprise_value, roc, earnings_yield):
        """
        乔尔·格林布拉特的神奇公式

        排名 = ROC排名 + 收益率排名
        """
        # 资本回报率排名
        roc_rank = roc.rank(ascending=False)

        # 收益率排名
        ey_rank = earnings_yield.rank(ascending=False)

        # 综合排名
        combined_rank = roc_rank + ey_rank

        return combined_rank

    @staticmethod
    def quality_value_score(profitability, stability, growth, valuation):
        """
        质量价值综合评分
        """
        quality_score = (profitability + stability + growth) / 3
        value_score = 1 / valuation  # 估值越低得分越高

        # 质量价值平衡
        return quality_score * 0.6 + value_score * 0.4
```

### 成长投资

```python
class GrowthInvesting:
    """
    成长投资策略
    """

    @staticmethod
    def peg_ratio(pe_ratio, earnings_growth_rate):
        """
        PEG 比率

        PEG = PE / 盈利增长率

        PEG < 1: 可能被低估
        PEG > 1: 可能被高估
        """
        return pe_ratio / earnings_growth_rate

    @staticmethod
    def sustainable_growth_rate(roe, retention_ratio):
        """
        可持续增长率

        g = ROE × 留存收益率
        """
        return roe * retention_ratio

    @staticmethod
    def growth_at_reasonable_price(pe_ratio, growth_rate, max_pe=30):
        """
        GARP 策略 (合理价格增长)

        寻找增长与估值平衡的股票
        """
        peg = GrowthInvesting.peg_ratio(pe_ratio, growth_rate)

        if peg < 1.0 and pe_ratio < max_pe:
            return {'score': 1/peg, 'recommendation': '买入'}
        elif peg < 1.5:
            return {'score': 0.5/peg, 'recommendation': '观察'}
        else:
            return {'score': 0, 'recommendation': '回避'}

    @staticmethod
    def can_slim_criteria():
        """
        William O'Neil 的 CAN SLIM 法则
        """
        return {
            'C': 'Current Quarterly EPS 当前季度每股收益加速增长',
            'A': 'Annual Earnings Growth 年度盈利持续增长',
            'N': 'New Products/Management/Highs 新产品/新管理/新高',
            'S': 'Supply and Demand 供需关系（关注成交量）',
            'L': 'Leader or Laggard 行业龙头',
            'I': 'Institutional Sponsorship 机构认同',
            'M': 'Market Direction 判断大势'
        }
```

### 指数投资与 Smart Beta

```python
class IndexInvesting:
    """
    指数投资策略
    """

    @staticmethod
    def market_cap_weights(market_caps):
        """
        市值加权
        """
        total_cap = sum(market_caps)
        return [cap / total_cap for cap in market_caps]

    @staticmethod
    def equal_weights(n_stocks):
        """
        等权配置
        """
        return [1 / n_stocks] * n_stocks

    @staticmethod
    def fundamental_weights(fundamentals):
        """
        基本面加权
        """
        total = sum(fundamentals)
        return [f / total for f in fundamentals]

    @staticmethod
    def risk_parity_weights(vols, correlations):
        """
        风险平价加权

        使各资产对组合风险贡献相等
        """
        # 简化计算：逆波动率加权
        inv_vols = [1 / v for v in vols]
        total = sum(inv_vols)
        return [iv / total for iv in inv_vols]

    @staticmethod
    def smart_beta_factors():
        """
        Smart Beta 因子策略
        """
        return {
            '价值因子': {
                '指标': ['低PE', '低PB', '高股息率'],
                '逻辑': '均值回归，价值股长期跑赢'
            },
            '质量因子': {
                '指标': ['高ROE', '低负债', '盈利稳定'],
                '逻辑': '优质公司持续创造价值'
            },
            '动量因子': {
                '指标': ['过去6-12个月涨幅'],
                '逻辑': '趋势延续'
            },
            '低波动因子': {
                '指标': ['低Beta', '低波动率'],
                '逻辑': '低波动异象'
            },
            '规模因子': {
                '指标': ['小市值'],
                '逻辑': '规模溢价'
            }
        }
```

## 投资组合管理

### 组合构建

```python
class EquityPortfolioManagement:
    """
    股票组合管理
    """

    @staticmethod
    def core_satellite_allocation(core_percentage, satellite_percentage):
        """
        核心-卫星策略

        核心部分：被动指数
        卫星部分：主动选股
        """
        return {
            'core': {
                'percentage': core_percentage,
                'strategy': '低成本指数跟踪',
                'purpose': '获取市场平均收益'
            },
            'satellite': {
                'percentage': satellite_percentage,
                'strategy': '主动选股/行业轮动',
                'purpose': '追求超额收益'
            }
        }

    @staticmethod
    def sector_rotation_indicators():
        """
        行业轮动指标
        """
        return {
            '经济周期': {
                '复苏期': '金融、可选消费',
                '扩张期': '科技、工业',
                '放缓期': '必需消费、医疗',
                '衰退期': '公用事业、能源'
            },
            '相对强弱': '买入相对基准强势的行业',
            '资金流向': '跟踪行业ETF资金流动',
            '估值差异': '买入估值相对低估的行业'
        }

    @staticmethod
    def rebalancing_strategy(current_weights, target_weights, threshold=0.05):
        """
        再平衡策略

        当偏离超过阈值时调整
        """
        deviations = [abs(c - t) for c, t in zip(current_weights, target_weights)]

        if max(deviations) > threshold:
            return {
                'action': 'rebalance',
                'current': current_weights,
                'target': target_weights,
                'trades': [t - c for c, t in zip(current_weights, target_weights)]
            }
        else:
            return {'action': 'hold'}

    @staticmethod
    def tax_loss_harvesting(current_positions, market_prices, purchase_prices):
        """
        税损收割策略

        卖出亏损股票实现税收抵扣
        """
        tax_loss_candidates = []

        for stock, current_price in market_prices.items():
            purchase_price = purchase_prices[stock]
            if current_price < purchase_price:
                loss = (purchase_price - current_price) * current_positions[stock]
                tax_loss_candidates.append({
                    'stock': stock,
                    'loss': loss,
                    'replacement': f"{stock}_sector_ETF"  # 避免洗售规则
                })

        return sorted(tax_loss_candidates, key=lambda x: x['loss'], reverse=True)
```

## 延伸阅读

- [固定收益](../fixed-income/) - 债券投资分析
- [投资学](../investment/) - 投资组合理论
- [行为金融学](../behavioral/) - 投资者心理分析
