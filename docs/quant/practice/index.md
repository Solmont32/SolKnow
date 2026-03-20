# 量化实战案例

本节通过完整的实战案例，展示从策略想法到实盘部署的全过程。

## 案例一：双均线策略（入门）

### 策略逻辑
买入：短期均线上穿长期均线（金叉）
卖出：短期均线下穿长期均线（死叉）

### 完整实现
```python
import pandas as pd
import numpy as np
import akshare as ak
import matplotlib.pyplot as plt

# 1. 数据获取
df = ak.stock_zh_a_hist(symbol="000001", period="daily",
                       start_date="20200101", adjust="qfq")
df['date'] = pd.to_datetime(df['日期'])
df.set_index('date', inplace=True)

# 2. 计算均线
df['ma_short'] = df['收盘'].rolling(window=10).mean()
df['ma_long'] = df['收盘'].rolling(window=30).mean()

# 3. 生成信号
df['signal'] = 0
df.loc[df['ma_short'] > df['ma_long'], 'signal'] = 1  # 多头
df.loc[df['ma_short'] <= df['ma_long'], 'signal'] = -1  # 空头或空仓

# 4. 计算收益
df['returns'] = df['收盘'].pct_change()
df['strategy_returns'] = df['signal'].shift(1) * df['returns']

# 5. 回测结果
cumulative = (1 + df['strategy_returns'].dropna()).cumprod()
benchmark = (1 + df['returns'].dropna()).cumprod()

# 6. 可视化
plt.figure(figsize=(12, 6))
plt.plot(cumulative.index, cumulative, label='Strategy')
plt.plot(benchmark.index, benchmark, label='Buy & Hold')
plt.legend()
plt.title('Dual Moving Average Strategy')
plt.show()

# 7. 绩效指标
total_return = cumulative.iloc[-1] - 1
sharpe = df['strategy_returns'].mean() / df['strategy_returns'].std() * np.sqrt(252)
max_dd = (cumulative / cumulative.cummax() - 1).min()

print(f"总收益: {total_return:.2%}")
print(f"夏普比率: {sharpe:.2f}")
print(f"最大回撤: {max_dd:.2%}")
```

### 优化方向
1. **参数优化**: 使用网格搜索寻找最优均线周期
2. **加入过滤器**: 如ADX确认趋势强度
3. **风险管理**: 加入止损和仓位管理
4. **多品种**: 扩展到多个相关品种

## 案例二：配对交易（统计套利）

### 策略逻辑
寻找历史价格走势相关的股票对，当价差偏离均值时做空高估/做多低估。

```python
from statsmodels.tsa.stattools import coint, adfuller

# 1. 协整检验
def find_cointegrated_pairs(prices_df):
    n = prices_df.shape[1]
    score_matrix = np.zeros((n, n))
    pvalue_matrix = np.ones((n, n))
    pairs = []

    for i in range(n):
        for j in range(i+1, n):
            s1, s2 = prices_df.iloc[:, i], prices_df.iloc[:, j]
            score, pvalue, _ = coint(s1, s2)
            score_matrix[i, j] = score
            pvalue_matrix[i, j] = pvalue
            if pvalue < 0.05:
                pairs.append((prices_df.columns[i], prices_df.columns[j], pvalue))

    return pairs, pvalue_matrix

# 2. 价差计算与交易
def calculate_zscore(spread):
    return (spread - spread.mean()) / spread.std()

# 交易逻辑
spread = stock_a - hedge_ratio * stock_b
zscore = calculate_zscore(spread)

# 开仓信号
if zscore > 2:
    # 做空价差
    sell stock_a, buy stock_b
elif zscore < -2:
    # 做多价差
    buy stock_a, sell stock_b

# 平仓信号
if abs(zscore) < 0.5:
    close positions
```

## 案例三：多因子选股模型

### 因子构建
```python
# 价值因子：低PE、低PB
df['value_score'] = -rank(df['pe_ratio']) - rank(df['pb_ratio'])

# 质量因子：高ROE、低负债
df['quality_score'] = rank(df['roe']) - rank(df['debt_ratio'])

# 动量因子：过去12月收益（剔除最近1月）
df['momentum_score'] = rank(df['return_12m'] - df['return_1m'])

# 综合因子
df['composite_score'] = (
    0.4 * df['value_score'] +
    0.3 * df['quality_score'] +
    0.3 * df['momentum_score']
)

# 选股：每月初选出前30只股票
selected = df.nlargest(30, 'composite_score')
```

### 组合构建
```python
def construct_portfolio(selected_stocks, method='equal_weight'):
    if method == 'equal_weight':
        weights = np.ones(len(selected_stocks)) / len(selected_stocks)
    elif method == 'risk_parity':
        # 基于波动率倒数加权
        vols = selected_stocks['volatility_20d']
        weights = (1 / vols) / (1 / vols).sum()
    elif method == 'mean_variance':
        # 马科维茨优化
        weights = optimize_portfolio(selected_stocks['returns'])

    return dict(zip(selected_stocks.index, weights))
```

## 案例四：实盘部署架构

### 系统架构
```
┌─────────────────────────────────────────────────────────────┐
│                       实盘交易系统                           │
├─────────────┬─────────────┬─────────────┬─────────────────┤
│   数据层     │   策略层     │   风控层     │     执行层       │
├─────────────┼─────────────┼─────────────┼─────────────────┤
│ AKShare/    │ 策略引擎     │ 仓位限制     │  vn.py/CTP      │
│ Tushare     │ 信号生成     │ 止损检查     │  算法交易       │
│ 本地缓存    │ 组合管理     │ 熔断机制     │  订单管理       │
└─────────────┴─────────────┴─────────────┴─────────────────┘
                      │
              ┌───────┴───────┐
              │   监控与日志    │
              │  Prometheus   │
              │  Grafana      │
              └───────────────┘
```

### 核心代码框架
```python
class LiveTradingSystem:
    def __init__(self):
        self.data_feed = DataFeed()
        self.strategy = MyStrategy()
        self.risk_manager = RiskManager()
        self.executor = OrderExecutor()
        self.logger = logging.getLogger(__name__)

    def run(self):
        while True:
            try:
                # 1. 获取最新数据
                market_data = self.data_feed.get_latest()

                # 2. 生成交易信号
                signals = self.strategy.on_data(market_data)

                # 3. 风险检查
                if self.risk_manager.check(signals, self.portfolio):
                    # 4. 执行交易
                    for signal in signals:
                        self.executor.submit_order(signal)
                        self.logger.info(f"Order executed: {signal}")
                else:
                    self.logger.warning("Risk check failed, orders blocked")

                # 5. 状态更新
                self.update_portfolio()

                time.sleep(1)  # 控制频率

            except Exception as e:
                self.logger.error(f"Error: {e}")
                self.emergency_stop()

    def emergency_stop(self):
        """紧急停止：平掉所有仓位"""
        self.executor.close_all_positions()
        self.send_alert("Emergency stop triggered!")
```

## 常见陷阱与解决方案

### 1. 过拟合
**现象**: 回测收益极高，实盘表现极差

**解决方案**:
```python
def walk_forward_optimization(data, train_size=252, test_size=63):
    """前向优化，避免未来数据泄露"""
    results = []
    for i in range(0, len(data) - train_size - test_size, test_size):
        train = data[i:i+train_size]
        test = data[i+train_size:i+train_size+test_size]

        # 在训练集上优化参数
        best_params = optimize_on_data(train)

        # 在测试集上验证
        test_performance = backtest(test, best_params)
        results.append(test_performance)

    return results  # 真实的样本外表现
```

### 2. 滑点与流动性
**现象**: 回测假设完美成交，实盘无法成交或价格不利

**解决方案**:
```python
def realistic_execution(price, volume, market_depth):
    """模拟真实成交价格"""
    # 考虑市场冲击
    impact = 0.1 * (volume / market_depth) ** 0.5

    # 加入随机滑点
    slippage = np.random.normal(0, 0.001)

    executed_price = price * (1 + impact + slippage)
    return executed_price
```

### 3. 数据问题
**现象**: 幸存者偏差、前复权价格跳空、停牌处理

**解决方案**:
- 使用包含退市股票的完整数据
- 正确处理除权除息（前复权vs后复权）
- 过滤停牌日数据
- 检查数据质量（价格范围、成交量）

## 性能优化技巧

### 向量化计算
```python
# 慢：循环
def slow_calc(prices):
    signals = []
    for i in range(len(prices)):
        if prices[i] > prices[i-20:i].mean():
            signals.append(1)
    return signals

# 快：向量化
def fast_calc(prices):
    ma20 = prices.rolling(20).mean()
    signals = (prices > ma20).astype(int)
    return signals
```

### Numba加速
```python
from numba import jit

@jit(nopython=True)
def fast_indicator(data):
    """使用Numba JIT编译加速循环计算"""
    n = len(data)
    result = np.zeros(n)
    for i in range(20, n):
        result[i] = np.mean(data[i-20:i])
    return result
```

## 推荐学习资源

### 书籍
- 《主动投资组合管理》(Grinold & Kahn)
- 《量化交易策略》(Ernest Chan)
- 《算法交易：制胜策略》(Ernest Chan)
- 《金融机器学习》(López de Prado)

### 论文与博客
- Quantitative Finance 期刊
- SSRN 量化金融板块
- Quantocracy 聚合博客
- 各大券商量化研究报告

### 社区
- 聚宽社区
- 米筐社区
- QuantConnect Forum
- Reddit r/algotrading

---

> 💡 **提示**: 成功的量化交易 = 扎实的数学统计基础 + 严谨的回测验证 + 严格的风险控制 + 持续的策略迭代
