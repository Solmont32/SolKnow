---
title: 抽样分布 (Sampling Distributions)
---

# 抽样分布 (Sampling Distributions)

数理统计的基础是抽样。抽样分布是指统计量的分布。

## 1. 常用统计量

设 $X_1, X_2, \dots, X_n$ 为来自总体 $X$ 的简单随机样本。
- **样本均值**: $\bar{X} = \frac{1}{n} \sum X_i$。
- **样本方差**: $S^2 = \frac{1}{n-1} \sum (X_i - \bar{X})^2$。

## 2. 三大抽样分布

1.  **$\chi^2$ 分布**: $X_1, \dots, X_n \sim N(0, 1)$，则 $\sum X_i^2 \sim \chi^2(n)$。
2.  **$t$ 分布**: $Z \sim N(0, 1)$，$Y \sim \chi^2(n)$，$Z$ 与 $Y$ 独立，则 $\frac{Z}{\sqrt{Y/n}} \sim t(n)$。
3.  **$F$ 分布**: $U \sim \chi^2(n_1)$，$V \sim \chi^2(n_2)$，$U$ 与 $V$ 独立，则 $\frac{U/n_1}{V/n_2} \sim F(n_1, n_2)$。

## 3. 正态总体的样本分布

若 $X \sim N(\mu, \sigma^2)$：
1. $\bar{X} \sim N(\mu, \sigma^2/n)$。
2. $\frac{(n-1)S^2}{\sigma^2} \sim \chi^2(n-1)$。
3. $\bar{X}$ 与 $S^2$ 相互独立。

---

_本章节由 SolKnow 系统根据标准教材重写。_
