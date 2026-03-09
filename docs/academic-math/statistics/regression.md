---
title: 回归分析与方差分析 (Regression & ANOVA)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 回归分析与方差分析 (Regression & ANOVA)

本章节探讨变量之间的统计依赖关系以及多组均值差异的检验。

## 1. 一元线性回归 (Simple Linear Regression)

### 1.1 模型描述
假设随机变量 $Y$ 与自变量 $x$ 满足线性关系：
$$Y_i = \beta_0 + \beta_1 x_i + \epsilon_i, \quad i=1, \dots, n$$
其中 $\epsilon_i \sim N(0, \sigma^2)$ 且相互独立。$\beta_0, \beta_1$ 是待估参数。

### 1.2 最小二乘估计 (Least Squares Estimation, LSE)
寻找 $\hat{\beta}_0, \hat{\beta}_1$ 最小化残差平方和 $Q(\beta_0, \beta_1)$：
$$Q = \sum_{i=1}^n (y_i - \beta_0 - \beta_1 x_i)^2$$
通过对参数求偏导并令其为 0，解得：
$$\hat{\beta}_1 = \frac{\sum (x_i - \bar{x})(y_i - \bar{y})}{\sum (x_i - \bar{x})^2} = \frac{S_{xy}}{S_{xx}}$$
$$\hat{\beta}_0 = \bar{y} - \hat{\beta}_1 \bar{x}$$

### 1.3 统计性质
- **无偏性**: $E[\hat{\beta}_0] = \beta_0, E[\hat{\beta}_1] = \beta_1$。
- **高斯-马尔可夫定理**: 在所有线性无偏估计量中，LSE 具有最小方差（即 BLUE）。
- **$\sigma^2$ 的估计**: $\hat{\sigma}^2 = \frac{SSE}{n-2}$，其中 $SSE = \sum (y_i - \hat{y}_i)^2$。

---

## 2. 方差分析 (Analysis of Variance, ANOVA)

用于检验多个总体均值是否相等。

### 2.1 单因素方差分析
假设有 $k$ 个水平，每个水平下有 $n_j$ 个观测值。
- **SST (总平方和)**: $\sum_{i,j} (y_{ij} - \bar{y}_{\cdot\cdot})^2$ (反映总波动)。
- **SSA (因素平方和)**: $\sum_{j} n_j (\bar{y}_{j\cdot} - \bar{y}_{\cdot\cdot})^2$ (反映组间差异)。
- **SSE (误差平方和)**: $\sum_{i,j} (y_{ij} - \bar{y}_{j\cdot})^2$ (反映组内随机误差)。

**平方和分解**: $SST = SSA + SSE$。

### 2.2 F 检验
若原假设 $H_0: \mu_1 = \mu_2 = \dots = \mu_k$ 成立，则：
$$F = \frac{SSA / (k-1)}{SSE / (n-k)} \sim F(k-1, n-k)$$
若 $F > F_{\alpha}$，则拒绝 $H_0$，认为各组均值有显著差异。

---

## 3. 深度练习库

<details>
<summary>练习 1: 证明回归直线过样本中心点</summary>

**题目**: 证明线性回归方程 $\hat{y} = \hat{\beta}_0 + \hat{\beta}_1 x$ 必定经过点 $(\bar{x}, \bar{y})$。

**证明**:
根据最小二乘法求得的 $\hat{\beta}_0 = \bar{y} - \hat{\beta}_1 \bar{x}$。
代入回归方程，当 $x = \bar{x}$ 时：
$$\hat{y} = (\bar{y} - \hat{\beta}_1 \bar{x}) + \hat{\beta}_1 \bar{x} = \bar{y}$$
因此，回归直线必过 $(\bar{x}, \bar{y})$。
</details>

<details>
<summary>练习 2: 方差分析中的自由度计算</summary>

**题目**: 某实验研究 4 种肥料对产量（$k=4$）的影响，每种肥料各试种 5 次（$n_j=5, n=20$）。请写出方差分析表中各个平方和的自由度。

**解答**:
1. **组间 (SSA)** 的自由度: $df_A = k - 1 = 4 - 1 = 3$。
2. **组内 (SSE)** 的自由度: $df_E = n - k = 20 - 4 = 16$。
3. **总 (SST)** 的自由度: $df_T = n - 1 = 20 - 1 = 19$。
验证: $3 + 16 = 19$ (成立)。
</details>

<details>
<summary>练习 3: 判定系数 $R^2$ 的含义</summary>

**题目**: 已知某回归模型的 $R^2 = 0.81$。解释其统计学含义。

**解答**:
$R^2$ (Coefficient of Determination) 定义为 $R^2 = \frac{SSR}{SST}$。
$R^2 = 0.81$ 表示因变量 $Y$ 的总波动中有 **81%** 可以由自变量 $x$ 的线性回归模型来解释，仅有 19% 是由随机误差引起的。这通常表示模型拟合度较好。
</details>
