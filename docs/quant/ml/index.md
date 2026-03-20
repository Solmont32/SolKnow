# 机器学习在量化交易中的应用

机器学习为量化交易带来了从数据中发现非线性模式的能力，本节介绍ML在量化中的核心应用。

## 机器学习 vs 传统量化

| 维度 | 传统量化 | 机器学习 |
|------|----------|----------|
| 因子构建 | 人工设计 | 自动学习 |
| 关系建模 | 线性为主 | 非线性捕捉 |
| 可解释性 | 强 | 相对弱（但有改进方法） |
| 数据需求 | 较少 | 大量 |
| 过拟合风险 | 较低 | 较高 |

## 核心应用场景

### 1. 价格预测
- **分类问题**：预测上涨/下跌
- **回归问题**：预测收益率或价格
- **时间序列**：ARIMA, Prophet, 深度学习

### 2. 因子挖掘
- 从原始数据自动提取有效特征
- 使用自编码器降维
- 遗传编程发现非线性因子

### 3. 组合优化
- 强化学习动态调仓
- 图神经网络捕捉资产关联
- 注意力机制动态加权

### 4. 风险管理
- 异常检测识别市场 regime 变化
- 聚类分析发现风险集中
- 预测尾部风险事件

## 监督学习方法

### 分类模型
```python
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier

# 典型流程
features = ['returns_lag1', 'volatility_20d', 'rsi', 'macd']
X = data[features]
y = (data['future_returns'] > 0).astype(int)  # 上涨=1, 下跌=0

model = LGBMClassifier()
model.fit(X_train, y_train)
predictions = model.predict_proba(X_test)[:, 1]
```

### 回归模型
- **线性/岭/Lasso**：基线模型
- **随机森林**：处理非线性关系
- **XGBoost/LightGBM/CatBoost**：梯度提升，竞赛常用
- **支持向量机**：小样本场景

## 无监督学习

### 聚类分析
```python
from sklearn.cluster import KMeans
from sklearn.mixture import GaussianMixture

# 市场状态识别
kmeans = KMeans(n_clusters=4)
regimes = kmeans.fit_predict(market_features)

# 动态策略切换
def select_strategy(regime):
    strategies = {
        0: trend_following,    # 趋势市
        1: mean_reversion,     # 震荡市
        2: breakout,           # 突破市
        3: risk_off            # 风险规避
    }
    return strategies[regime]
```

### 降维
- **PCA**：主成分分析，去噪与可视化
- **t-SNE/UMAP**：高维数据可视化
- **自编码器**：非线性特征学习

## 深度学习

### 序列模型

**LSTM/GRU**
```python
import torch
import torch.nn as nn

class LSTMPredictor(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers):
        super().__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, 1)

    def forward(self, x):
        lstm_out, _ = self.lstm(x)
        return self.fc(lstm_out[:, -1, :])
```

**Transformer**
- 自注意力机制捕捉长程依赖
- 适用于多资产、多因子场景
- 计算复杂度高，适合日频以上

### 图神经网络
```python
# 使用PyTorch Geometric
from torch_geometric.nn import GATConv

class AssetGraphNet(nn.Module):
    """基于图神经网络的资产关系建模"""
    def __init__(self, in_channels, out_channels):
        super().__init__()
        self.conv1 = GATConv(in_channels, 64)
        self.conv2 = GATConv(64, out_channels)

    def forward(self, x, edge_index):
        x = self.conv1(x, edge_index)
        x = torch.relu(x)
        x = self.conv2(x, edge_index)
        return x
```

## 强化学习

### 交易作为马尔可夫决策过程
- **状态**: 市场特征、持仓、资金
- **动作**: 买入/卖出/持仓比例
- **奖励**: 收益、风险调整收益
- **策略**: 状态到动作的映射

### 常用算法
- **DQN**: 离散动作空间
- **PPO**: 连续动作，稳定性好
- **A3C**: 异步训练，样本效率高
- **SAC**: 最大熵，探索充分

```python
# Stable-Baselines3示例
from stable_baselines3 import PPO
from gymnasium import Env

class TradingEnv(Env):
    def __init__(self):
        # 定义状态空间和动作空间
        self.observation_space = ...
        self.action_space = ...

    def step(self, action):
        # 执行交易，返回next_state, reward, done
        ...

    def reset(self):
        # 重置环境
        ...

model = PPO("MlpPolicy", env)
model.learn(total_timesteps=100000)
```

## 特征工程

### 常用特征类型

| 类型 | 示例 | 说明 |
|------|------|------|
| 价格特征 | 收益率、波动率、动量 | 基础技术指标 |
| 量价特征 | OBV、MFI、Chaikin | 成交量确认 |
| 统计特征 | 偏度、峰度、分位数 | 分布特性 |
| 宏观特征 | 利率、汇率、VIX | 市场环境 |
| 文本特征 | 新闻情感、社交媒体 | NLP提取 |
| 另类数据 | 卫星、供应链、信用卡 | 独特alpha |

### 特征选择
```python
from sklearn.feature_selection import SelectKBest, mutual_info_classif

# 基于互信息的特征选择
selector = SelectKBest(mutual_info_classif, k=50)
X_selected = selector.fit_transform(X, y)

# 查看选中特征
selected_features = X.columns[selector.get_support()]
```

## 模型评估与风险控制

### 时间序列交叉验证
```python
from sklearn.model_selection import TimeSeriesSplit

tscv = TimeSeriesSplit(n_splits=5)
for train_idx, test_idx in tscv.split(X):
    X_train, X_test = X.iloc[train_idx], X.iloc[test_idx]
    # 训练与评估
```

### 避免过拟合
- **早停（Early Stopping）**: 验证集损失上升则停止
- **正则化**: L1/L2, Dropout
- **集成**: Bagging, Boosting, Stacking
- **特征约束**: 限制特征数量，优先经济意义明确的

## 延伸阅读

- [深度学习](/docs/ai/deep-learning/) — 神经网络基础
- [强化学习](/docs/ai/rl/) — 决策与优化
- [特征工程实战](/docs/quant/ml/feature-engineering) — 因子挖掘技巧
- [模型解释性](/docs/quant/ml/interpretability) — SHAP、LIME方法
