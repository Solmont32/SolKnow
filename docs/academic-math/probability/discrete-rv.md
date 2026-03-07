---
title: 离散型随机变量 (Discrete Random Variables)
---

# 离散型随机变量 (Discrete Random Variables)

## 定义
如果随机变量 $X$ 的所有可能取值是有限个或可列无限个，则称 $X$ 为离散型随机变量。

## 分布律
$P(X = x_i) = p_i, \quad i = 1, 2, \dots$
满足：
1. $p_i \ge 0$
2. $\sum p_i = 1$

## 常见分布
- **0-1 分布 (Bernoulli)**：$X \sim B(1, p)$
- **二项分布 (Binomial)**：$X \sim B(n, p)$，表示 $n$ 次独立重复试验中成功的次数。
- **泊松分布 (Poisson)**：$X \sim P(\lambda)$，常用于描述稀有事件发生的次数。
  $$P(X=k) = \frac{\lambda^k e^{-\lambda}}{k!}$$

## 数字特征
- **期望 (Expectation)**：$E(X) = \sum x_i p_i$
- **方差 (Variance)**：$Var(X) = E(X^2) - [E(X)]^2$
