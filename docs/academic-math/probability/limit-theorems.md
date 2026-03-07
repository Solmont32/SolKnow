---
title: 大数定律与中心极限定理 (Limit Theorems)
---

# 大数定律与中心极限定理 (Limit Theorems)

## 大数定律 (Law of Large Numbers)
阐明在大量重复试验中，随机变量序列的算术平均值趋向于它们的期望值。
- **切比雪夫大数定律**。
- **伯努利大数定律**：在 $n$ 次独立重复试验中，事件发生的频率依概率收敛于其概率 $p$。

## 中心极限定理 (Central Limit Theorem)
阐明大量独立随机变量之和的分布近似于正态分布。
- **独立同分布 (i.i.d.) 中心极限定理 (Lindeberg-Levy)**：
  若 $X_1, X_2, \dots$ 独立同分布，期望为 $\mu$，方差为 $\sigma^2$，则当 $n$ 很大时：
  $$\frac{\sum_{i=1}^n X_i - n\mu}{\sqrt{n}\sigma} \sim N(0, 1)$$
- **隶莫弗-拉普拉斯定理 (De Moivre-Laplace)**：二项分布的极限是正态分布。
迫使统计学在样本量大时可以使用正态分布进行推断。
