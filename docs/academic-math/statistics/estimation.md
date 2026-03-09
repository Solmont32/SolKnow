---
title: 参数估计 (Estimation)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 参数估计 (Estimation)

参数估计是数理统计的重要分支，旨在通过样本数据 $X_1, X_2, \dots, X_n$ 推断总体分布中未知的参数 $\theta$。

## 1. 点估计 (Point Estimation)

### 1.1 基本准则
评价估计量 $\hat{\theta}$ 优劣的三大标准：
- **无偏性 (Unbiasedness)**: $E[\hat{\theta}] = \theta$。
- **有效性 (Efficiency)**: 在所有无偏估计量中，方差越小越有效。由 **Cramér-Rao 下界** 给出最小方差。
- **相合性 (Consistency)**: 当 $n \to \infty$ 时，$\hat{\theta} \xrightarrow{P} \theta$。

### 1.2 矩估计 (Method of Moments)
利用样本矩估计总体矩。令总体 $k$ 阶矩 $\mu_k = E[X^k]$ 等于样本 $k$ 阶矩 $A_k = \frac{1}{n}\sum X_i^k$，联立方程求解。

### 1.3 极大似然估计 (Maximum Likelihood Estimation, MLE)
这是现代统计学中最核心的估计方法。

**定义**：设总体概率密度函数 (或分布律) 为 $f(x; \theta)$，观测值为 $x_1, \dots, x_n$。**似然函数 (Likelihood Function)** 定义为：
$$L(\theta) = L(x_1, \dots, x_n; \theta) = \prod_{i=1}^n f(x_i; \theta)$$
极大似然估计量 $\hat{\theta}_{MLE}$ 是使 $L(\theta)$ 达到最大值的 $\theta$：
$$\hat{\theta}_{MLE} = \arg\max_{\theta \in \Theta} L(\theta)$$

**计算步骤**：
1. 写出对数似然函数 $\ell(\theta) = \ln L(\theta) = \sum_{i=1}^n \ln f(x_i; \theta)$。
2. 求导并令导数为零（似然方程）：$\frac{d}{d\theta} \ell(\theta) = 0$。
3. 验证二阶导数或边界情况以确认最大值。

---

## 2. 区间估计 (Interval Estimation)

区间估计不仅给出参数的估计值，还给出了估计的精度。

### 2.1 定义
对于给定的显著性水平 $\alpha \in (0, 1)$，若存在统计量 $\hat{\theta}_L$ 和 $\hat{\theta}_U$，使得：
$$P(\hat{\theta}_L < \theta < \hat{\theta}_U) = 1 - \alpha$$
则称区间 $[\hat{\theta}_L, \hat{\theta}_U]$ 为参数 $\theta$ 的置信水平为 $1-\alpha$ 的**置信区间 (Confidence Interval, CI)**。

### 2.2 枢轴量法 (Pivotal Quantity Method)
寻找一个含有参数 $\theta$ 和样本 $X_1, \dots, X_n$ 的函数 $G(X_1, \dots, X_n; \theta)$，使得：
1. $G$ 的分布已知且与未知参数 $\theta$ 无关。
2. 对于给定的 $\alpha$，可以找到 $a, b$ 使得 $P(a < G < b) = 1 - \alpha$。
3. 从 $a < G < b$ 中解出 $\theta$ 的范围。

**经典案例：正态总体均值 $\mu$ 的区间估计**
- 若 $\sigma^2$ 已知：使用 $Z = \frac{\bar{X} - \mu}{\sigma/\sqrt{n}} \sim N(0, 1)$。
- 若 $\sigma^2$ 未知：使用 $t = \frac{\bar{X} - \mu}{S/\sqrt{n}} \sim t(n-1)$，其中 $S$ 为样本标准差。

---

## 3. 深度练习库

<details>
<summary>练习 1: 指数分布的 MLE 推导</summary>

**题目**: 设总体 $X \sim \text{Exp}(\lambda)$，其概率密度函数为 $f(x; \lambda) = \lambda e^{-\lambda x} (x > 0)$。求 $\lambda$ 的极大似然估计。

**解答**:
1. 写出似然函数:
   $$L(\lambda) = \prod_{i=1}^n \lambda e^{-\lambda x_i} = \lambda^n e^{-\lambda \sum x_i}$$
2. 取对数:
   $$\ell(\lambda) = n \ln \lambda - \lambda \sum_{i=1}^n x_i$$
3. 求导并令其为 0:
   $$\frac{d\ell}{d\lambda} = \frac{n}{\lambda} - \sum_{i=1}^n x_i = 0$$
   解得: $\hat{\lambda} = \frac{n}{\sum x_i} = \frac{1}{\bar{X}}$。
   
**结论**: 指数分布参数的 MLE 是样本均值的倒数。
</details>

<details>
<summary>练习 2: 均匀分布的特殊情况</summary>

**题目**: 设 $X \sim U(0, \theta)$，求 $\theta$ 的 MLE。注意似然方程在此处失效。

**解答**:
似然函数为:
$$L(\theta) = \prod_{i=1}^n \frac{1}{\theta} I_{\{0 \le x_i \le \theta\}} = \frac{1}{\theta^n} I_{\{\max(x_i) \le \theta\}}$$
其中 $I$ 是指示函数。为了使 $L(\theta)$ 最大，$\theta$ 应该尽可能小。但根据指示函数，$\theta$ 必须不小于观测值中的最大值 $x_{(n)}$。
因此，$\hat{\theta} = X_{(n)} = \max(X_1, \dots, X_n)$。

**注意**: 这里似然函数在 $X_{(n)}$ 处不连续，不能用求导法。
</details>

<details>
<summary>练习 3: 置信区间的长度分析</summary>

**题目**: 在正态总体 $N(\mu, \sigma^2)$（$\sigma^2$ 已知）中，若要使均值 $\mu$ 的置信水平为 $0.95$ 的置信区间长度减半，样本量 $n$ 需要如何变化？

**解答**:
置信区间长度 $L = 2 \cdot z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}}$。
要使 $L$ 变为 $L/2$，即 $L' = \frac{1}{2} L = 2 \cdot z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n'}}$。
由于 $z_{\alpha/2}$ 和 $\sigma$ 不变，必然要求 $\frac{1}{\sqrt{n'}} = \frac{1}{2} \frac{1}{\sqrt{n}}$。
解得 $\sqrt{n'} = 2\sqrt{n} \Rightarrow n' = 4n$。

**结论**: 样本量需要扩大为原来的 4 倍。
</details>
