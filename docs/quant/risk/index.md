# 风险管理

风险管理是量化交易的核心，决定策略能否在长期存活。本节介绍风险度量、控制方法与极端情况应对。

## 风险类型

### 市场风险
- **价格风险**: 资产价格不利变动
- **波动率风险**: 波动率变化影响期权等
- **相关性风险**: 资产间相关性突变
- **流动性风险**: 无法以合理价格成交

### 模型风险
- **过拟合**: 策略在历史数据上表现虚假优异
- **Regime变化**: 市场结构改变导致策略失效
- **前视偏差**: 使用未来信息
- **执行偏差**: 回测假设与实际执行差异

### 操作风险
- **技术故障**: 系统宕机、网络中断
- **人为错误**: 参数配置错误、误操作
- **外部事件**: 交易所故障、黑天鹅

## 风险度量

### 基础指标
```python
import numpy as np
import pandas as pd

def calculate_risk_metrics(returns, confidence=0.95):
    """计算风险指标"""
    metrics = {}

    # 波动率
    metrics['volatility'] = returns.std() * np.sqrt(252)

    # 下行波动率
    downside_returns = returns[returns < 0]
    metrics['downside_vol'] = downside_returns.std() * np.sqrt(252)

    # 最大回撤
    cum_returns = (1 + returns).cumprod()
    peak = cum_returns.expanding().max()
    drawdown = (cum_returns - peak) / peak
    metrics['max_drawdown'] = drawdown.min()
    metrics['max_dd_duration'] = max_drawdown_duration(drawdown)

    # VaR (历史模拟法)
    metrics['var_95'] = np.percentile(returns, (1 - confidence) * 100)

    # CVaR (Expected Shortfall)
    metrics['cvar_95'] = returns[returns <= metrics['var_95']].mean()

    return metrics
```

### 风险价值 (VaR)

**参数法（方差-协方差）**:
$$\text{VaR}_\alpha = \mu - z_\alpha \cdot \sigma$$

**历史模拟法**:
```python
def historical_var(returns, confidence=0.95):
    """基于历史数据的VaR"""
    return np.percentile(returns, (1 - confidence) * 100)

# 蒙特卡洛模拟
def monte_carlo_var(returns, simulations=10000, days=1):
    """蒙特卡洛模拟VaR"""
    mu = returns.mean()
    sigma = returns.std()

    simulated = np.random.normal(mu, sigma, (simulations, days))
    portfolio_returns = simulated.sum(axis=1)
    return np.percentile(portfolio_returns, 5)
```

## 仓位管理

### 凯利公式
$$f^* = \frac{bp - q}{b} = \frac{p(b+1) - 1}{b}$$

其中：
- $f^*$: 最优仓位比例
- $p$: 胜率
- $b$: 盈亏比（平均盈利/平均亏损）

```python
def kelly_criterion(win_rate, win_loss_ratio):
    """
    计算凯利最优仓位
    实务中通常使用 "半凯利" 或 "四分之一凯利" 以降低波动
    """
    kelly = (win_rate * (win_loss_ratio + 1) - 1) / win_loss_ratio
    return max(0, min(kelly, 1))  # 限制在[0,1]

def half_kelly(win_rate, win_loss_ratio):
    return kelly_criterion(win_rate, win_loss_ratio) / 2
```

### 固定比例 vs 固定金额
```python
class PositionSizer:
    @staticmethod
    def fixed_fraction(capital, risk_per_trade, stop_loss_pct):
        """固定比例：每笔交易承担固定百分比风险"""
        risk_amount = capital * risk_per_trade
        position_size = risk_amount / stop_loss_pct
        return position_size

    @staticmethod
    def fixed_ratio(capital, delta=1000):
        """固定比率：每增加delta收益，增加1单位仓位"""
        units = int((capital / delta) ** 0.5)
        return units
```

## 止损策略

### 止损类型
| 类型 | 触发条件 | 优点 | 缺点 |
|------|----------|------|------|
| 固定止损 | 价格跌破固定比例 | 简单 | 噪音触发 |
| 波动止损 | 基于ATR的动态止损 | 适应波动 | 参数敏感 |
| 时间止损 | 持仓超过固定时间 | 控制时间成本 | 可能错过趋势 |
| 移动止损 | 跟踪最高价/最低价 | 让利润奔跑 | 回撤锁定 |

```python
def atr_stop_loss(entry_price, atr, multiplier=2):
    """基于ATR的止损"""
    return entry_price - multiplier * atr

def trailing_stop(current_price, highest_price, trailing_pct=0.05):
    """移动止损"""
    stop_level = highest_price * (1 - trailing_pct)
    return stop_level if current_price < stop_level else None
```

## 组合风险管理

### 分散化
```python
def portfolio_optimization(returns, target_return=None):
    """均值-方差优化"""
    n = returns.shape[1]
    mean_returns = returns.mean()
    cov_matrix = returns.cov()

    from scipy.optimize import minimize

    def portfolio_vol(weights):
        return np.sqrt(weights.T @ cov_matrix @ weights)

    constraints = [
        {'type': 'eq', 'fun': lambda x: np.sum(x) - 1},  # 权重和为1
        {'type': 'ineq', 'fun': lambda x: target_return - x @ mean_returns}  # 收益约束
    ]

    result = minimize(portfolio_vol, np.ones(n)/n,
                     method='SLSQP', constraints=constraints,
                     bounds=[(0, 1) for _ in range(n)])
    return result.x
```

### 风险平价
```python
def risk_parity(returns):
    """
    风险平价：各资产对组合风险贡献相等
    """
    cov = returns.cov()
    n = len(cov)

    def risk_contribution(weights):
        port_vol = np.sqrt(weights @ cov @ weights)
        marginal_risk = (cov @ weights) / port_vol
        return weights * marginal_risk

    def objective(weights):
        rc = risk_contribution(weights)
        target = np.ones(n) / n * np.sum(rc)  # 平均风险贡献
        return np.sum((rc - target) ** 2)

    result = minimize(objective, np.ones(n)/n,
                     method='SLSQP', bounds=[(0.01, 1) for _ in range(n)],
                     constraints={'type': 'eq', 'fun': lambda x: np.sum(x) - 1})
    return result.x
```

## 极端风险应对

### 尾部风险管理
```python
def tail_risk_hedge(portfolio_value, options_data, protection_level=0.9):
    """
    使用看跌期权对冲尾部风险
    """
    # 计算需要的保护金额
    protected_amount = portfolio_value * protection_level

    # 选择价外看跌期权
    put_options = options_data[
        (options_data['type'] == 'put') &
        (options_data['strike'] < current_price * 0.95)
    ]

    # 选择性价比最高的
    best_put = put_options.loc[put_options['premium'].idxmin()]
    return best_put
```

### 熔断与暂停
```python
class CircuitBreaker:
    def __init__(self, daily_loss_limit=0.05, consecutive_losses=3):
        self.daily_loss_limit = daily_loss_limit
        self.consecutive_losses = consecutive_losses
        self.loss_streak = 0
        self.trading_paused = False

    def check(self, daily_return):
        if daily_return < -self.daily_loss_limit:
            self.loss_streak += 1
            if self.loss_streak >= self.consecutive_losses:
                self.trading_paused = True
                self.send_alert("交易暂停：连续亏损触发")
        else:
            self.loss_streak = max(0, self.loss_streak - 1)

        return not self.trading_paused
```

## 风险监控仪表板

```python
class RiskMonitor:
    def __init__(self):
        self.metrics_history = []

    def update(self, portfolio):
        metrics = {
            'timestamp': datetime.now(),
            'exposure': portfolio.total_exposure(),
            'leverage': portfolio.leverage(),
            'var_95': portfolio.value_at_risk(),
            'concentration': portfolio.concentration_risk(),
            'beta': portfolio.market_beta()
        }
        self.metrics_history.append(metrics)

        # 检查阈值
        if metrics['var_95'] > self.var_limit:
            self.trigger_risk_alert("VaR超限")
```

## 延伸阅读

- [统计方法](/docs/academic-math/statistics/) — 假设检验、极值理论
- [优化理论](/docs/quant/math/optimization) — 组合优化算法
- [行为金融学](/docs/quant/basics/behavioral) — 理解市场非理性
