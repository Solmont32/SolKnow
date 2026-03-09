---
title: 特征函数 (Characteristic Functions)
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";

# 特征函数 (Characteristic Functions)

特征函数是处理随机变量分布的强大工具，它本质上是随机变量分布的 **傅里叶变换**。特征函数与分布函数一一对应，且在处理独立随机变量之和时具有极佳的代数性质。

## 1. 定义 (Definition)

对于随机变量 $X$，其 **特征函数** $\phi_X(t)$ 定义为复随机变量 $e^{itX}$ 的数学期望：
$$\phi_X(t) = E(e^{itX}) = \int_{-\infty}^\infty e^{itx} \, dF(x), \quad t \in \mathbb{R}$$

- 若 $X$ 为离散型，$\phi_X(t) = \sum_{j} e^{itx_j} p_j$。
- 若 $X$ 为连续型，$\phi_X(t) = \int_{-\infty}^\infty e^{itx} f(x) \, dx$。

## 2. 核心性质

1. **存在性**：对任意随机变量，$|e^{itx}| = 1$，故特征函数总是存在且一致连续。
2. **规范性**：$\phi(0) = 1$，$|\phi(t)| \le 1$。
3. **共轭性**：$\phi(-t) = \overline{\phi(t)}$。
4. **线性变换**：若 $Y = aX + b$，则 $\phi_Y(t) = e^{itb} \phi_X(at)$。
5. **独立和性质**：若 $X_1, X_2, \dots, X_n$ 相互独立，则其和 $S_n = \sum X_i$ 的特征函数为：
   $$\phi_{S_n}(t) = \prod_{i=1}^n \phi_{X_i}(t)$$
   *注：这使得卷积运算转化为了简单的乘法运算。*

<KnowledgeCard type="warning" title="矩与特征函数的关系">
若 $X$ 的 $k$ 阶矩 $E(X^k)$ 存在，则 $\phi(t)$ 在 $t=0$ 处可导至 $k$ 阶，且：
$$E(X^k) = \frac{\phi^{(k)}(0)}{i^k}$$
这为计算高阶矩提供了一种解析方法。
</KnowledgeCard>

## 3. 常见分布的特征函数

| 分布 | 参数 | 特征函数 $\phi(t)$ |
| :--- | :--- | :--- |
| **退化分布** | $c$ | $e^{itc}$ |
| **二项分布** | $n, p$ | $(pe^{it} + q)^n$ |
| **泊松分布** | $\lambda$ | $\exp(\lambda(e^{it}-1))$ |
| **正态分布** | $\mu, \sigma^2$ | $\exp(it\mu - \frac{1}{2}\sigma^2 t^2)$ |
| **指数分布** | $\lambda$ | $(1 - \frac{it}{\lambda})^{-1}$ |

## 4. 逆转公式与唯一性定理

- **唯一性定理**：随机变量的分布函数与其特征函数一一对应。
- **逆转公式 (Inversion Formula)**：若 $\phi(t)$ 绝对可积，则其密度函数为：
  $$f(x) = \frac{1}{2\pi} \int_{-\infty}^\infty e^{-itx} \phi(t) \, dt$$

## 5. 经典练习

:::info 练习 1：利用特征函数证明正态分布的再生性
设 $X_1 \sim N(\mu_1, \sigma_1^2)$ 与 $X_2 \sim N(\mu_2, \sigma_2^2)$ 相互独立。证明 $X_1 + X_2 \sim N(\mu_1 + \mu_2, \sigma_1^2 + \sigma_2^2)$。
:::

<details>
<summary>查看解析</summary>

1. $X_1$ 的特征函数为 $\phi_1(t) = \exp(it\mu_1 - \frac{1}{2}\sigma_1^2 t^2)$。
2. $X_2$ 的特征函数为 $\phi_2(t) = \exp(it\mu_2 - \frac{1}{2}\sigma_2^2 t^2)$。
3. 由于独立，$Y = X_1 + X_2$ 的特征函数为：
   $$\phi_Y(t) = \phi_1(t) \cdot \phi_2(t) = \exp[it(\mu_1+\mu_2) - \frac{1}{2}(\sigma_1^2+\sigma_2^2)t^2]$$
4. 根据唯一性定理，此特征函数形式恰好对应 $N(\mu_1 + \mu_2, \sigma_1^2 + \sigma_2^2)$。
</details>

---

_特征函数是现代概率论通向极限定理证明的必经之路。_
