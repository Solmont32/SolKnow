# 向量化回测

向量化回测是利用矩阵运算快速验证策略思想的方法，适合初期筛选和参数优化。

## 向量化 vs 事件驱动

| 特性 | 向量化回测 | 事件驱动回测 |
|------|-----------|-------------|
| **速度** | 快（矩阵运算） | 慢（逐个事件） |
| **精度** | 低（简化假设） | 高（贴近实盘） |
| **实现难度** | 简单 | 复杂 |
| **适用场景** | 策略筛选、参数优化 | 精细验证、实盘模拟 |
| **功能支持** | 基础功能 | 完整功能（滑点、延迟） |

## 核心原理

```python
import numpy as np
import pandas as pd

# 向量化回测的核心思想
# 1. 使用矩阵运算一次性计算所有时间点的信号
# 2. 避免显式循环，利用 NumPy/Pandas 的 C 优化

# 示例：计算收益率（向量化）
prices = pd.Series([100, 101, 99, 102, 105])

# 非向量化（慢）
returns_loop = []
for i in range(1, len(prices)):
    ret = (prices.iloc[i] - prices.iloc[i-1]) / prices.iloc[i-1]
    returns_loop.append(ret)

# 向量化（快）
returns_vectorized = prices.pct_change().dropna()

# 速度对比
print(f"向量化速度通常快 10-100 倍")
```

## 基础向量化回测框架

### 双均线策略（向量化实现）

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

class VectorizedBacktest:
    """
    向量化回测基类
    """

    def __init__(self, prices, initial_capital=100000):
        self.prices = prices
        self.initial_capital = initial_capital
        self.positions = None
        self.returns = None

    def generate_signals(self):
        """生成交易信号 - 子类实现"""
        raise NotImplementedError

    def calculate_returns(self):
        """计算策略收益"""
        # 价格收益率
        price_returns = self.prices.pct_change().fillna(0)

        # 策略收益 = 仓位 × 价格收益
        # 注意：信号通常基于当天收盘价生成，仓位从第二天开始
        self.strategy_returns = self.positions.shift(1) * price_returns

        # 累计收益
        self.cumulative_returns = (1 + self.strategy_returns).cumprod()

        return self.strategy_returns

    def run(self):
        """运行回测"""
        self.generate_signals()
        self.calculate_returns()
        return self.get_metrics()

    def get_metrics(self):
        """计算绩效指标"""
        returns = self.strategy_returns.dropna()

        metrics = {
            'total_return': self.cumulative_returns.iloc[-1] - 1,
            'annual_return': (self.cumulative_returns.iloc[-1] ** (252 / len(returns))) - 1,
            'sharpe_ratio': returns.mean() / returns.std() * np.sqrt(252),
            'max_drawdown': self._calculate_max_drawdown(),
            'volatility': returns.std() * np.sqrt(252),
            'win_rate': (returns > 0).mean()
        }

        return metrics

    def _calculate_max_drawdown(self):
        """计算最大回撤"""
        cummax = self.cumulative_returns.cummax()
        drawdown = (self.cumulative_returns - cummax) / cummax
        return drawdown.min()


class MovingAverageCrossover(VectorizedBacktest):
    """
    双均线交叉策略（向量化实现）
    """

    def __init__(self, prices, short_window=50, long_window=200, **kwargs):
        super().__init__(prices, **kwargs)
        self.short_window = short_window
        self.long_window = long_window

    def generate_signals(self):
        """生成交易信号"""
        # 计算均线（向量化）
        short_ma = self.prices.rolling(self.short_window).mean()
        long_ma = self.prices.rolling(self.long_window).mean()

        # 生成信号：1（多头），0（空仓），-1（空头）
        # 金叉：短均线上穿长均线
        # 死叉：短均线下穿长均线
        self.positions = pd.Series(0, index=self.prices.index)
        self.positions[short_ma > long_ma] = 1
        self.positions[short_ma <= long_ma] = -1

        return self.positions

    def plot(self):
        """可视化结果"""
        fig, axes = plt.subplots(3, 1, figsize=(12, 10))

        # 价格和均线
        ax1 = axes[0]
        ax1.plot(self.prices, label='Price', alpha=0.7)
        ax1.plot(self.prices.rolling(self.short_window).mean(), label=f'SMA{self.short_window}')
        ax1.plot(self.prices.rolling(self.long_window).mean(), label=f'SMA{self.long_window}')
        ax1.legend()
        ax1.set_title('Price and Moving Averages')

        # 仓位
        ax2 = axes[1]
        ax2.plot(self.positions, label='Position', drawstyle='steps-post')
        ax2.set_ylim(-1.5, 1.5)
        ax2.legend()
        ax2.set_title('Position')

        # 累计收益
        ax3 = axes[2]
        ax3.plot(self.cumulative_returns, label='Strategy')
        ax3.plot((1 + self.prices.pct_change().fillna(0)).cumprod(), label='Buy & Hold')
        ax3.legend()
        ax3.set_title('Cumulative Returns')

        plt.tight_layout()
        return fig


# 使用示例
# prices = pd.read_csv('stock_data.csv', index_col='date', parse_dates=True)['close']
# strategy = MovingAverageCrossover(prices, short_window=50, long_window=200)
# metrics = strategy.run()
# print(metrics)
```

## 多因子向量化回测

```python
class MultiFactorBacktest:
    """
    多因子策略向量化回测
    适用于股票横截面策略
    """

    def __init__(self, price_df, factor_df, initial_capital=100000):
        """
        price_df: DataFrame [dates x stocks] 价格数据
        factor_df: DataFrame [dates x stocks] 因子数据
        """
        self.prices = price_df
        self.factors = factor_df
        self.returns = price_df.pct_change().fillna(0)
        self.initial_capital = initial_capital

    def generate_weights(self, n_quantiles=5, long_short=True):
        """
        生成投资组合权重

        基于因子值分组，做多高分组，做空低分组
        """
        # 因子分位数分组
        def quantile_group(row):
            try:
                return pd.qcut(row, n_quantiles, labels=False, duplicates='drop')
            except:
                return pd.Series(np.nan, index=row.index)

        groups = self.factors.apply(quantile_group, axis=1)

        # 生成权重
        weights = pd.DataFrame(0, index=self.prices.index, columns=self.prices.columns)

        for date in weights.index:
            if date in groups.index:
                group_vals = groups.loc[date]

                # 做多最高分位
                long_mask = group_vals == (n_quantiles - 1)
                weights.loc[date, long_mask] = 1 / long_mask.sum() if long_mask.sum() > 0 else 0

                if long_short:
                    # 做空最低分位
                    short_mask = group_vals == 0
                    weights.loc[date, short_mask] = -1 / short_mask.sum() if short_mask.sum() > 0 else 0

        # 权重延迟一天（避免前视偏差）
        self.weights = weights.shift(1).fillna(0)
        return self.weights

    def calculate_portfolio_returns(self):
        """计算组合收益"""
        # 组合收益 = Σ(权重 × 个股收益)
        portfolio_returns = (self.weights * self.returns).sum(axis=1)
        return portfolio_returns

    def run(self, rebalance_freq='M'):
        """
        运行回测

        rebalance_freq: 再平衡频率 'D'=日, 'W'=周, 'M'=月
        """
        if rebalance_freq != 'D':
            # 按频率重新采样权重
            self.weights = self._resample_weights(rebalance_freq)

        self.portfolio_returns = self.calculate_portfolio_returns()
        self.cumulative_returns = (1 + self.portfolio_returns).cumprod()

        return self.get_metrics()

    def _resample_weights(self, freq):
        """按频率调整权重"""
        # 只在再平衡日更新权重，其他时间保持前向填充
        resampled = self.weights.resample(freq).first()
        return resampled.reindex(self.weights.index, method='ffill').fillna(0)

    def get_metrics(self):
        """计算绩效指标"""
        returns = self.portfolio_returns.dropna()

        return {
            'total_return': self.cumulative_returns.iloc[-1] - 1,
            'annual_return': (self.cumulative_returns.iloc[-1] ** (252 / len(returns))) - 1,
            'sharpe_ratio': returns.mean() / returns.std() * np.sqrt(252),
            'max_drawdown': self._calculate_max_drawdown(),
            'information_ratio': self._calculate_ir()
        }

    def _calculate_max_drawdown(self):
        """计算最大回撤"""
        cummax = self.cumulative_returns.cummax()
        drawdown = (self.cumulative_returns - cummax) / cummax
        return drawdown.min()

    def _calculate_ir(self):
        """计算信息比率"""
        # 信息比率 = 超额收益 / 跟踪误差
        # 简化：用日收益率均值除以标准差
        returns = self.portfolio_returns.dropna()
        return returns.mean() / returns.std() * np.sqrt(252)

    def factor_attribution(self):
        """因子归因分析"""
        # 计算每个分位数的平均收益
        returns_by_quantile = {}

        for q in range(5):
            mask = self.factors.apply(
                lambda x: pd.qcut(x, 5, labels=False, duplicates='drop') == q,
                axis=1
            )
            masked_returns = self.returns[mask.shift(1).fillna(False)]
            returns_by_quantile[f'Q{q+1}'] = masked_returns.mean(axis=1).mean()

        return returns_by_quantile
```

## 参数优化

```python
from itertools import product
import warnings
warnings.filterwarnings('ignore')

class ParameterOptimizer:
    """
    策略参数优化器
    使用向量化回测快速评估参数组合
    """

    def __init__(self, strategy_class, prices):
        self.strategy_class = strategy_class
        self.prices = prices
        self.results = []

    def grid_search(self, param_grid):
        """
        网格搜索最优参数

        param_grid: dict {'param_name': [values]}
        例如: {'short_window': [10, 20, 50], 'long_window': [100, 200]}
        """
        # 生成参数组合
        param_names = list(param_grid.keys())
        param_values = list(param_grid.values())

        best_sharpe = -np.inf
        best_params = None

        for values in product(*param_values):
            params = dict(zip(param_names, values))

            # 跳过无效参数（如短周期 > 长周期）
            if 'short_window' in params and 'long_window' in params:
                if params['short_window'] >= params['long_window']:
                    continue

            try:
                # 运行回测
                strategy = self.strategy_class(self.prices, **params)
                metrics = strategy.run()

                result = {
                    **params,
                    **metrics
                }
                self.results.append(result)

                # 更新最优参数
                if metrics['sharpe_ratio'] > best_sharpe:
                    best_sharpe = metrics['sharpe_ratio']
                    best_params = params

            except Exception as e:
                continue

        self.results_df = pd.DataFrame(self.results)
        return best_params, best_sharpe

    def walk_forward_optimization(self, param_grid, train_size=252, test_size=63):
        """
        滚动窗口参数优化（避免过拟合）

        train_size: 训练期长度（天）
        test_size: 测试期长度（天）
        """
        n_samples = len(self.prices)
        n_periods = (n_samples - train_size) // test_size

        walk_forward_results = []

        for i in range(n_periods):
            train_start = i * test_size
            train_end = train_start + train_size
            test_end = train_end + test_size

            # 训练数据
            train_prices = self.prices.iloc[train_start:train_end]
            test_prices = self.prices.iloc[train_end:test_end]

            # 训练期优化参数
            optimizer = ParameterOptimizer(self.strategy_class, train_prices)
            best_params, _ = optimizer.grid_search(param_grid)

            # 测试期验证
            test_strategy = self.strategy_class(test_prices, **best_params)
            test_metrics = test_strategy.run()

            walk_forward_results.append({
                'period': i,
                'train_start': train_prices.index[0],
                'train_end': train_prices.index[-1],
                'test_start': test_prices.index[0],
                'test_end': test_prices.index[-1],
                'best_params': best_params,
                **test_metrics
            })

        return pd.DataFrame(walk_forward_results)

    def plot_heatmap(self, param1, param2, metric='sharpe_ratio'):
        """绘制参数热力图"""
        pivot = self.results_df.pivot(index=param1, columns=param2, values=metric)

        plt.figure(figsize=(10, 8))
        sns.heatmap(pivot, annot=True, fmt='.2f', cmap='RdYlGn', center=0)
        plt.title(f'Parameter Optimization Heatmap ({metric})')
        plt.tight_layout()
        return plt
```

## 交易成本建模

```python
class CostAdjustedBacktest(VectorizedBacktest):
    """
    考虑交易成本的向量化回测
    """

    def __init__(self, prices, commission=0.001, slippage=0.001, **kwargs):
        super().__init__(prices, **kwargs)
        self.commission = commission  # 手续费率
        self.slippage = slippage      # 滑点率

    def calculate_returns(self):
        """计算考虑成本的收益"""
        # 基础价格收益
        price_returns = self.prices.pct_change().fillna(0)

        # 仓位变化（交易发生）
        position_changes = self.positions.diff().abs().fillna(0)

        # 交易成本 = 仓位变化 × (手续费 + 滑点)
        transaction_costs = position_changes * (self.commission + self.slippage)

        # 策略收益 = 仓位收益 - 交易成本
        gross_returns = self.positions.shift(1) * price_returns
        self.strategy_returns = gross_returns - transaction_costs

        self.cumulative_returns = (1 + self.strategy_returns).cumprod()

        return self.strategy_returns

    def analyze_turnover(self):
        """分析换手率"""
        # 双边换手率
        turnover = self.positions.diff().abs().fillna(0).sum() / len(self.positions)

        # 估算年度换手率
        annual_turnover = turnover * 252

        return {
            'daily_turnover': turnover,
            'annual_turnover': annual_turnover,
            'total_trades': (self.positions.diff() != 0).sum()
        }
```

## 向量化回测陷阱

```python
class LookaheadBiasChecker:
    """
    检测向量化回测中的前视偏差
    """

    @staticmethod
    def check_zscore_calculation(prices, lookback=20):
        """
        错误的 Z-Score 计算（有前视偏差）
        """
        # 错误：使用全样本均值和标准差
        mean = prices.mean()  # 使用未来信息！
        std = prices.std()
        zscore_wrong = (prices - mean) / std

        # 正确：使用滚动窗口
        rolling_mean = prices.rolling(lookback).mean()
        rolling_std = prices.rolling(lookback).std()
        zscore_correct = (prices - rolling_mean.shift(1)) / rolling_std.shift(1)

        return zscore_correct

    @staticmethod
    def check_signal_delay(signals, prices):
        """
        检查信号是否正确延迟
        """
        # 信号应基于 t 时刻之前的信息
        # 仓位应在 t+1 时刻生效

        # 检测方法：计算信号与未来收益的相关系数
        future_returns = prices.pct_change().shift(-1)

        corr = signals.corr(future_returns)

        if corr > 0.1:
            print("警告：信号与未来收益相关性过高，可能存在前视偏差")
        else:
            print("信号延迟正确")

        return corr


def survival_bias_warning():
    """
    幸存者偏差警告
    """
    print("""
    幸存者偏差注意事项：

    1. 股票退市处理
       - 向量化回测常使用当前存活股票列表
       - 忽略了已退市股票（通常是表现差的）
       - 导致回测结果过于乐观

    2. 解决方案
       - 使用历史成分股数据（点-in-time 数据）
       - 包含已退市股票的价格数据
       - 使用总收益率指数而非价格

    3. 数据提供商
       - QuantQuote
       - CRSP
       - 专业数据供应商提供 survivor-bias-free 数据
    """)
```

## 延伸阅读

- [事件驱动回测](event-driven) — 精细回测方法
- [回测陷阱](common-pitfalls) — 避免常见错误
- [交易成本建模](transaction-costs) — 滑点与手续费详解
