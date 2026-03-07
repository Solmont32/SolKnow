# 离散型随机变量 (Discrete Random Variables)

## 定义
随机变量 $X$ 的取值是有限或可列个。

## 分布律 (Probability Mass Function, PMF)
$P(X = x_i) = p_i$，满足 $\sum p_i = 1$。

## 常见分布
- **$0-1$ 分布**：$X \sim B(1, p)$。
- **二项分布**：$P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$。
- **泊松分布**：$P(X=k) = \frac{\lambda^k e^{-\lambda}}{k!}$。

## 期望与方差
- **期望**：$E[X] = \sum x_i p_i$。
- **方差**：$Var(X) = E[X^2] - (E[X])^2$。
