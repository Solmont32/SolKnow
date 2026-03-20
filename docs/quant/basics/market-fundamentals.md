# 金融市场基础

深入理解金融市场结构是量化交易的基础。本节系统介绍各类金融市场的运作机制。

## 市场类型

### 股票市场

**A股市场特点**:
- T+1交易制度：当日买入的股票需次日才能卖出
- 涨跌停限制：主板±10%，创业板/科创板±20%
- 交易时间：9:30-11:30, 13:00-15:00
- 最小交易单位：100股（1手）

**美股市场特点**:
- T+0交易：当日可多次买卖
- 无涨跌幅限制
- 做市商制度（Market Maker）
- 盘前盘后交易（Pre-market/After-hours）

```python
# 市场数据对比
market_comparison = {
    'A股': {
        'settlement': 'T+1',
        'price_limit': 0.10,
        'trading_hours': '4小时',
        'currency': 'CNY'
    },
    '港股': {
        'settlement': 'T+2',
        'price_limit': None,
        'trading_hours': '5.5小时',
        'currency': 'HKD'
    },
    '美股': {
        'settlement': 'T+2',
        'price_limit': None,
        'trading_hours': '6.5小时+盘前盘后',
        'currency': 'USD'
    }
}
```

### 期货市场

**商品期货**:
- 金属：黄金、白银、铜、铝
- 能源：原油、天然气
- 农产品：大豆、玉米、小麦

**金融期货**:
- 股指期货：沪深300、中证500、上证50
- 国债期货：2年期、5年期、10年期

**期货核心概念**:
```
保证金制度：
- 初始保证金：开仓时需缴纳的保证金（通常5-15%）
- 维持保证金：持仓期间需保持的最低保证金
- 追加保证金：当保证金不足时需补足

杠杆计算：
杠杆倍数 = 合约价值 / 保证金
```

### 期权市场

**期权基本要素**:
- **标的资产**：股票、指数、期货等
- **行权价**：约定的买卖价格
- **到期日**：期权有效的最后日期
- **权利金**：购买期权的价格

**期权类型**:
| 类型 | 权利 | 适用场景 |
|------|------|----------|
| 看涨期权(Call) | 以行权价买入 | 预期上涨 |
| 看跌期权(Put) | 以行权价卖出 | 预期下跌 |

**期权策略矩阵**:
```
          预期上涨      预期下跌      预期震荡
看涨期权   买入Call      卖出Call      卖出Call
看跌期权   卖出Put       买入Put       卖出Put
组合策略   牛市价差      熊市价差      跨式/宽跨式
```

## 市场参与者

### 机构参与者

**公募基金**:
- 受监管严格，持仓披露透明
- 追求相对收益（跑赢基准）
- 策略以基本面投资为主

**私募基金/对冲基金**:
- 策略灵活多样
- 追求绝对收益
- 量化私募是主要对手方

**做市商**:
- 提供流动性，赚取买卖价差
- 高频交易为主
- 需要交易所授权

### 市场微观结构

**订单簿深度**:
```
卖5: 10.05    500手
卖4: 10.04    300手
卖3: 10.03    800手
卖2: 10.02    200手
卖1: 10.01    600手  ← 最优卖价(Ask)
─────────────
买1: 10.00    400手  ← 最优买价(Bid)
买2:  9.99    700手
买3:  9.98    350手
买4:  9.97    500手
买5:  9.96    250手

价差(Spread) = 10.01 - 10.00 = 0.01 (0.1%)
```

**流动性指标**:
```python
def calculate_liquidity_metrics(order_book):
    """计算流动性指标"""
    bids = order_book['bids']
    asks = order_book['asks']

    # 买卖价差
    spread = asks[0][0] - bids[0][0]
    spread_pct = spread / ((asks[0][0] + bids[0][0]) / 2)

    # 市场深度（±1%）
    mid_price = (asks[0][0] + bids[0][0]) / 2
    depth_range = 0.01

    bid_depth = sum(qty for price, qty in bids
                    if price >= mid_price * (1 - depth_range))
    ask_depth = sum(qty for price, qty in asks
                    if price <= mid_price * (1 + depth_range))

    # 订单簿不平衡
    total_bid = sum(qty for _, qty in bids[:5])
    total_ask = sum(qty for _, qty in asks[:5])
    imbalance = (total_bid - total_ask) / (total_bid + total_ask)

    return {
        'spread': spread,
        'spread_pct': spread_pct,
        'bid_depth': bid_depth,
        'ask_depth': ask_depth,
        'imbalance': imbalance
    }
```

## 市场指数与基准

### 主要指数

**A股指数**:
- 上证指数：上海证券交易所综合指数
- 深证成指：深圳证券交易所成份指数
- 沪深300：沪深两市市值最大的300只股票
- 中证500：剔除沪深300后的500只中盘股

**全球指数**:
- S&P 500：美股大盘基准
- Nasdaq 100：科技股代表
- MSCI World：全球股票市场

### 基准选择

```python
def select_benchmark(strategy_type, market):
    """根据策略类型选择合适基准"""
    benchmarks = {
        'A股': {
            '大盘股策略': '000300.SH',  # 沪深300
            '小盘股策略': '000905.SH',  # 中证500
            '全市场策略': '000001.SH',  # 上证指数
        },
        '美股': {
            '大盘股策略': 'SPY',        # S&P 500
            '科技股策略': 'QQQ',        # Nasdaq 100
            '全市场策略': 'VTI',        # 全美股票
        }
    }
    return benchmarks.get(market, {}).get(strategy_type)
```

## 交易成本分析

### 显性成本

**佣金**:
- A股：万2.5 - 万3（买卖双向）
- 美股：$0 - $0.005/股（很多平台免佣）

**印花税**:
- A股：卖出时收取千分之0.5
- 美股：无

### 隐性成本

**滑点**:
```python
def estimate_slippage(order_size, avg_daily_volume, volatility):
    """
    估计滑点成本

    Args:
        order_size: 订单金额
        avg_daily_volume: 日均成交额
        volatility: 年化波动率

    Returns:
        预估滑点百分比
    """
    # 市场冲击模型（简单线性近似）
    participation_rate = order_size / avg_daily_volume

    # 临时性冲击（可恢复）
    temporary_impact = 0.1 * participation_rate ** 0.5

    # 永久性冲击（不可恢复）
    permanent_impact = 0.05 * participation_rate

    # 波动性调整
    vol_adjustment = volatility / 0.2  # 以20%为基准

    total_slippage = (temporary_impact + permanent_impact) * vol_adjustment

    return total_slippage
```

**买卖价差成本**:
```python
def calculate_spread_cost(turnover, avg_spread_pct):
    """
    计算全年价差成本

    假设：
    - 每次交易都付出完整价差的一半
    - 换手率 = 年交易量 / 总资产
    """
    cost_per_trade = avg_spread_pct / 2
    annual_cost = turnover * cost_per_trade
    return annual_cost
```

## 市场有效性

### 有效市场假说

**弱式有效**:
- 历史价格信息已完全反映
- 技术分析无效
- 但基本面分析可能有效

**半强式有效**:
- 所有公开信息已反映
- 基本面分析无效
- 只有内幕信息可能获利

**强式有效**:
- 所有信息（包括内幕）已反映
- 无法持续获得超额收益

### 市场异象

量化策略通常利用市场异象获取收益：

| 异象 | 描述 | 可能解释 |
|------|------|----------|
| **动量效应** | 过去涨的股票未来继续涨 | 行为金融学、信息不对称 |
| **价值效应** | 低估值股票长期跑赢 | 风险补偿、过度反应 |
| **规模效应** | 小盘股收益更高 | 流动性补偿、机构限制 |
| **低波动异象** | 低波动股票收益更高 | 杠杆约束、彩票偏好 |

## 延伸阅读

- [交易机制与订单类型](trading-mechanism)
- [市场微观结构](market-microstructure)
- [量化数学：时间序列分析](/docs/quant/math/time-series)
