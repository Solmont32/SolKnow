# 回归分析 (Regression)

## 一元线性回归
描述自变量 $x$ 与因变量 $y$ 之间的线性关系：
$y = \beta_0 + \beta_1 x + \epsilon$

## 最小二乘法 (Least Squares)
通过最小化残差平方和 $\sum (y_i - \hat{y}_i)^2$ 来估计参数 $\beta_0, \beta_1$。

## 模型评估
- **判定系数 $R^2$**：反映回归方程对观测值的拟合程度，接近 1 表示拟合良好。
- **显著性检验**：检验 $\beta_1$ 是否显著不为零。

## 多元线性回归
涉及多个自变量。
$y = \beta_0 + \beta_1 x_1 + \dots + \beta_k x_k + \epsilon$
