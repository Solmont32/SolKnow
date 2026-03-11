---
title: 参数估计 (Parameter Estimation)
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";

# 参数估计 (Parameter Estimation)

参数估计是根据样本信息推断总体分布中未知参数的过程。

## 1. 点估计 (Point Estimation)

点估计是用样本统计量的某个确定值作为未知参数的估计值。

### 矩估计法 (Method of Moments, MOM)

令样本矩等于总体矩，解出参数。

- $\bar{X} = E(X)$
- $\frac{1}{n} \sum X_i^2 = E(X^2)$

### 极大似然估计 (Maximum Likelihood Estimation, MLE)

寻找使样本观测值出现概率最大的参数值。
似然函数：$L(\theta) = \prod_{i=1}^n f(X_i; \theta)$。
求解方法：取对数求导 $\frac{\partial \ln L(\theta)}{\partial \theta} = 0$。

<KnowledgeCard type="tip" title="MLE 的不变性">
若 $\hat{\theta}$ 是 $\theta$ 的极大似然估计，则 $g(\hat{\theta})$ 是 $g(\theta)$ 的极大似然估计。
</KnowledgeCard>

## 2. 估计量的评价标准

1.  **无偏性 (Unbiasedness)**：$E(\hat{\theta}) = \theta$。
2.  **有效性 (Efficiency)**：在所有无偏估计中，方差最小者为最有效。
3.  **相容性 (Consistency)**：当 $n \to \infty$ 时，$\hat{\theta} \xrightarrow{P} \theta$。

## 3. 区间估计 (Interval Estimation)

区间估计给出参数的一个范围 $[\hat{\theta}_1, \hat{\theta}_2]$，使得该范围包含真实参数的概率（置信水平）为 $1-\alpha$。

### 正态总体均值的置信区间 ($\mu$)

- **$\sigma^2$ 已知**：
  $$\left[\bar{X} - z_{\alpha/2} \frac{\sigma}{\sqrt{n}}, \bar{X} + z_{\alpha/2} \frac{\sigma}{\sqrt{n}}\right]$$
- **$\sigma^2$ 未知**：
  $$\left[\bar{X} - t_{\alpha/2}(n-1) \frac{S}{\sqrt{n}}, \bar{X} + t_{\alpha/2}(n-1) \frac{S}{\sqrt{n}}\right]$$

---

## 4. 经典练习

:::info 练习 1：MLE 求解
设 $X_1, \dots, X_n$ 来自指数分布 $f(x; \lambda) = \lambda e^{-\lambda x} \quad (x > 0)$。求 $\lambda$ 的极大似然估计。
:::

<details>
<summary>查看解析</summary>

1. 似然函数：$L(\lambda) = \prod_{i=1}^n \lambda e^{-\lambda X_i} = \lambda^n e^{-\lambda \sum X_i}$。
2. 取对数：$\ln L(\lambda) = n \ln \lambda - \lambda \sum X_i$。
3. 求导并令其为 0：
   $$\frac{d \ln L}{d \lambda} = \frac{n}{\lambda} - \sum X_i = 0$$
4. 解得：$\hat{\lambda} = \frac{n}{\sum X_i} = \frac{1}{\bar{X}}$。
</details>

---

_本章节介绍了如何利用样本点推断总体参数。_
