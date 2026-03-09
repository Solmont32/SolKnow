---
title: 数理统计练习题 (Statistics Exercises)
---

# 数理统计练习题 (Statistics Exercises)

本练习库包含抽样分布、参数估计的相关练习，均配套折叠答案。

## 1. 抽样分布

:::info 习题 1.1
设 $X_1, \dots, X_n$ 是来自 $N(\mu, \sigma^2)$ 的简单随机样本。证明：$\bar{X}$ 与 $S^2$ 相互独立。
:::

<details>
<summary>查看答案</summary>

此证明属于数理统计中的经典定理（Fisher 定理）。
**证明思路**:
利用正交变换 $Y = AX$，其中 $A$ 是正交矩阵。
第一行取为 $(1/\sqrt{n}, \dots, 1/\sqrt{n})$。
则 $Y_1 = \sqrt{n}\bar{X}$，且 $\sum X_i^2 = \sum Y_i^2$。
由于 $X \sim N(\mu I, \sigma^2 I)$ 且 $A$ 正交，$Y \sim N(A\mu, \sigma^2 I)$。
于是 $Y_1, \dots, Y_n$ 相互独立。
注意到 $(n-1)S^2 = \sum_{i=1}^n X_i^2 - n\bar{X}^2 = \sum_{i=1}^n Y_i^2 - Y_1^2 = \sum_{i=2}^n Y_i^2$。
由于 $Y_1$ 与 $Y_2, \dots, Y_n$ 独立，故 $\bar{X}$ 与 $S^2$ 独立。
</details>

## 2. 参数估计

:::info 习题 2.1
设 $X \sim P(\lambda)$，求 $\lambda$ 的最大似然估计。
:::

<details>
<summary>查看答案</summary>

似然函数为：
$$L(\lambda) = \prod_{i=1}^n \frac{\lambda^{x_i} e^{-\lambda}}{x_i!}$$
取对数：
$$\ell(\lambda) = \ln L(\lambda) = \sum_{i=1}^n x_i \ln \lambda - n\lambda - \sum_{i=1}^n \ln(x_i!)$$
对 $\lambda$ 求导：
$$\frac{d\ell}{d\lambda} = \frac{\sum x_i}{\lambda} - n = 0$$
解得 $\hat{\lambda} = \bar{X}$。
</details>

---

_本练习库由 SolKnow 系统自动生成。_
