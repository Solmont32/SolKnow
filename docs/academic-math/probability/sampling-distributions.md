---
title: 抽样分布 (Sampling Distributions)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 抽样分布 (Sampling Distributions)

数理统计研究如何通过样本推断总体的特征。抽样分布是数理统计的理论基础。

## 1. 总体与样本

- **总体 (Population)**：研究对象的全体，通常用随机变量 $X$ 表示。
- **样本 (Sample)**：从总体中随机抽取的个体序列 $X_1, X_2, \dots, X_n$。
- **独立同分布 (i.i.d.)**：在简单随机抽样下，$X_i$ 独立且与 $X$ 同分布。

## 2. 统计量 (Statistics)

统计量是不含任何未知参数的样本函数。常用的统计量包括：

- **样本均值**：$\bar{X} = \frac{1}{n} \sum_{i=1}^n X_i$
- **样本方差**：$S^2 = \frac{1}{n-1} \sum_{i=1}^n (X_i - \bar{X})^2$
- **样本 $k$ 阶原点矩**：$A_k = \frac{1}{n} \sum_{i=1}^n X_i^k$

<KnowledgeCard type="warning" title="分母为 n-1">
样本方差 $S^2$ 的分母为 $n-1$ 是为了保证其为总体方差 $\sigma^2$ 的 **无偏估计**。
</KnowledgeCard>

## 3. 三大抽样分布

### $\chi^2$ 分布 (卡方分布)
设 $X_1, \dots, X_n$ 独立且均服从标准正态分布 $N(0, 1)$，则：
$$\chi^2 = \sum_{i=1}^n X_i^2 \sim \chi^2(n)$$
其中 $n$ 称为 **自由度**。
- $E(\chi^2) = n, \quad Var(\chi^2) = 2n$。

### $t$ 分布 (学生分布)
设 $X \sim N(0, 1)$，$Y \sim \chi^2(n)$，且 $X, Y$ 独立，则：
$$T = \frac{X}{\sqrt{Y/n}} \sim t(n)$$
- 当 $n \to \infty$ 时，$t(n) \to N(0, 1)$。

### $F$ 分布
设 $U \sim \chi^2(n_1)$，$V \sim \chi^2(n_2)$，且 $U, V$ 独立，则：
$$F = \frac{U/n_1}{V/n_2} \sim F(n_1, n_2)$$

## 4. 正态总体下的常用定理

设 $X_1, \dots, X_n \sim N(\mu, \sigma^2)$，则：

1. $\bar{X} \sim N(\mu, \sigma^2/n)$
2. $\frac{(n-1)S^2}{\sigma^2} \sim \chi^2(n-1)$
3. $\bar{X}$ 与 $S^2$ 相互独立
4. $\frac{\bar{X} - \mu}{S / \sqrt{n}} \sim t(n-1)$

---

## 5. 经典练习

:::info 练习 1
设 $X_1, \dots, X_9$ 为来自 $N(0, 1)$ 的样本，令 $Y = \frac{X_1 + \dots + X_6}{\sqrt{X_7^2 + X_8^2 + X_9^2}}$。求使得 $cY \sim t(n)$ 的常数 $c$ 及自由度 $n$。
:::

<details>
<summary>查看解析</summary>

首先，分子 $Z = X_1 + \dots + X_6 \sim N(0, 6)$。
标准化分子：$Z' = \frac{Z}{\sqrt{6}} \sim N(0, 1)$。
分母平方和 $W = X_7^2 + X_8^2 + X_9^2 \sim \chi^2(3)$。
根据 $t$ 分布定义：
$$T = \frac{Z'}{\sqrt{W/3}} = \frac{Z/\sqrt{6}}{\sqrt{W/3}} = \frac{Z}{\sqrt{2W}} = \frac{1}{\sqrt{2}} Y \sim t(3)$$
故 $c = \frac{1}{\sqrt{2}}$，$n = 3$。
</details>

---

_本章节为参数估计与假设检验提供理论分布支持。_
