# 加密市场微观结构

加密市场与传统金融市场有着截然不同的结构，理解这些差异是制定有效量化策略的基础。

## 交易所类型

### CEX（中心化交易所）
| 交易所 | 特点 | 适用场景 |
|--------|------|----------|
| **Binance** | 流动性最强，品种最全 | 主力交易 |
| **OKX** | 衍生品深度好 | 合约交易 |
| **Bybit** | 用户体验佳 | 零售用户 |
| **Coinbase** | 合规性强 | 机构入场 |

**特点**:
- 订单簿模式（Order Book）
- 高性能撮合引擎
- 需要KYC认证
- 存在对手方风险

### DEX（去中心化交易所）
| 类型 | 代表 | 机制 |
|------|------|------|
| **AMM** | Uniswap、Curve | 自动做市商 |
| **订单簿** | dYdX、GMX | 链上撮合 |
| **聚合器** | 1inch、Matcha | 多源最优价格 |

## 永续合约机制

### 资金费率（Funding Rate）
```
资金费率 = 标记价格 - 指数价格

正资金费：多头支付给空头（市场看涨过热）
负资金费：空头支付给多头（市场看跌过度）
```

**资金费率套利策略**:
```python
def funding_rate_arbitrage(exchanges):
    """
    资金费率套利：在资金费率为负的交易所做多，
    在资金费率为正的交易所做空
    """
    opportunities = []
    for ex in exchanges:
        funding = ex.get_funding_rate('BTC-USD')
        opportunities.append({
            'exchange': ex.name,
            'funding_rate': funding,
            'action': 'long' if funding < 0 else 'short'
        })

    # 选择资金费率差异最大的两边
    long_ex = min(opportunities, key=lambda x: x['funding_rate'])
    short_ex = max(opportunities, key=lambda x: x['funding_rate'])

    return {
        'long': long_ex,
        'short': short_ex,
        'spread': short_ex['funding_rate'] - long_ex['funding_rate']
    }
```

### 标记价格 vs 指数价格
- **指数价格**: 多个现货交易所的加权平均
- **标记价格**: 用于计算未实现盈亏和强平价格

## AMM（自动做市商）

### Uniswap V2 恒定乘积公式
$$x \times y = k$$

其中 $x$ 和 $y$ 是流动性池中两种资产的数量，$k$ 是常数。

**价格计算**:
$$P = \frac{y}{x}$$

**滑点计算**:
```python
def calculate_slippage(dx, x, y):
    """
    计算交易滑点
    dx: 输入数量
    x, y: 池子当前余额
    """
    k = x * y
    dy = y - k / (x + dx)  # 实际获得
    spot_price = y / x      # 当前价格
    effective_price = dx / dy

    slippage = (effective_price - spot_price) / spot_price
    return slippage
```

### 无常损失（Impermanent Loss）
```
LP提供流动性后，如果资产价格相对变化，
相比单纯持有，LP会遭受损失。

无常损失 ≈ 0.5 × (价格变化率)²
```

## 市场数据指标

### 链上指标（On-chain Metrics）
| 指标 | 说明 | 用途 |
|------|------|------|
| **交易所流入/流出** | 资产进出交易所 | 判断买卖压力 |
| **活跃地址数** | 参与交易的地址数量 | 衡量网络活跃度 |
| **巨鲸动向** | 大额持有者行为 | 预判市场方向 |
| **MVRV比率** | 市值/已实现市值 | 评估高估/低估 |
| **NUPL** | 净未实现利润/亏损 | 市场情绪指标 |

### 市场微观结构指标
```python
# 订单簿深度分析
def analyze_order_book_depth(order_book):
    """
    分析订单簿深度
    """
    bids = order_book['bids']  # 买单
    asks = order_book['asks']  # 卖单

    # 买卖价差
    spread = asks[0][0] - bids[0][0]
    spread_pct = spread / ((asks[0][0] + bids[0][0]) / 2)

    # 深度（±2%范围内）
    mid_price = (asks[0][0] + bids[0][0]) / 2
    depth_range = 0.02

    bid_depth = sum(qty for price, qty in bids
                    if price >= mid_price * (1 - depth_range))
    ask_depth = sum(qty for price, qty in asks
                    if price <= mid_price * (1 + depth_range))

    return {
        'spread': spread,
        'spread_pct': spread_pct,
        'bid_depth': bid_depth,
        'ask_depth': ask_depth,
        'depth_imbalance': (bid_depth - ask_depth) / (bid_depth + ask_depth)
    }
```

## 流动性分析

### 流动性池监控
```python
class LiquidityMonitor:
    def __init__(self, pool_address):
        self.pool = pool_address

    def get_pool_metrics(self):
        """获取流动性池指标"""
        reserves = self.get_reserves()
        tvl = self.calculate_tvl(reserves)

        # 价格波动对LP的影响
        price_volatility = self.get_24h_volatility()
        il_risk = self.estimate_impermanent_loss(price_volatility)

        return {
            'tvl': tvl,
            'volume_24h': self.get_24h_volume(),
            'fees_24h': self.get_24h_fees(),
            'apr': (self.get_24h_fees() * 365) / tvl,
            'il_risk': il_risk
        }
```

## 交易执行考量

### Gas优化
```python
def optimize_gas_timing():
    """
    基于历史数据选择最佳交易时间
    """
    # 以太坊Gas价格通常以下时间较低（UTC）：
    # - 周末
    # - 凌晨2-6点（UTC）
    # - 重大事件后的冷静期

    gas_history = fetch_gas_prices(days=30)

    # 按小时统计平均Gas
    hourly_avg = gas_history.groupby('hour').mean()
    best_hours = hourly_avg.nsmallest(3).index

    return best_hours
```

### MEV保护
- **MEV（最大可提取价值）**: 矿工/验证者通过交易排序获取的额外收益
- **三明治攻击**: 攻击者在用户交易前后插入自己的交易获利
- **防护措施**:
  - 使用Flashbots等私有内存池
  - 设置合理的滑点容忍度
  - 拆分大额订单

## 延伸阅读

- [现货策略](spot-strategies) — 趋势与均值回归
- [期货策略](perpetual-strategies) — 基差与资金费套利
- [DeFi策略](defi-strategies) — 流动性挖矿与收益聚合
