---
title: 连续型随机变量 (Continuous Random Variables)
---

# 连续型随机变量 (Continuous Random Variables)

如果对于随机变量 $X$ 的 **累积分布函数 (Cumulative Distribution Function, CDF)** $F(x) = P(X \le x)$，存在非负可积函数 $f(x)$，使得对于任意实数 $x$，有：
$$F(x) = \int_{-\infty}^x f(t) \, dt$$
则称 $X$ 为 **连续型随机变量**，称 $f(x)$ 为 $X$ 的 **概率密度函数 (Probability Density Function, PDF)**。

## 1. 核心性质

1. $f(x) \ge 0$ 对几乎所有的 $x$ 成立。
2. $\int_{-\infty}^\infty f(x) \, dx = 1$。
3. 对任意实数 $a < b$，$P(a < X \le b) = F(b) - F(a) = \int_a^b f(x) \, dx$。

## 2. 常见连续分布

1.  **均匀分布 (Uniform Distribution)**: $X \sim U(a, b)$，$f(x) = \frac{1}{b-a}$ ($a < x < b$)。
2.  **指数分布 (Exponential Distribution)**: $X \sim Exp(\lambda)$，$f(x) = \lambda e^{-\lambda x}$ ($x \ge 0$)。
3.  **正态分布 (Normal Distribution)**: $X \sim N(\mu, \sigma^2)$，$f(x) = \frac{1}{\sqrt{2\pi}\sigma} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)$。

## 3. 数字特征 (Numerical Characteristics)

### 数学期望 (Expectation)

$$E(X) = \int_{-\infty}^\infty x f(x) \, dx$$

### 方差 (Variance)

$$Var(X) = \int_{-\infty}^\infty (x - E(X))^2 f(x) \, dx = E(X^2) - [E(X)]^2$$

## 4. 经典例题

:::info 例题 1
设随机变量 $X \sim N(\mu, \sigma^2)$，证明 $E(X) = \mu$。
:::

<details>
<summary>查看解析</summary>

$$E(X) = \frac{1}{\sqrt{2\pi}\sigma} \int_{-\infty}^\infty x \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right) \, dx$$
令 $t = \frac{x-\mu}{\sigma}$，则 $x = \sigma t + \mu$，$dx = \sigma dt$：
$$E(X) = \frac{1}{\sqrt{2\pi}} \int_{-\infty}^\infty (\sigma t + \mu) e^{-t^2/2} \, dt$$
$$E(X) = \frac{\sigma}{\sqrt{2\pi}} \int_{-\infty}^\infty t e^{-t^2/2} \, dt + \frac{\mu}{\sqrt{2\pi}} \int_{-\infty}^\infty e^{-t^2/2} \, dt$$
由于被积函数 $t e^{-t^2/2}$ 是奇函数，其积分为 $0$；第二个积分为标准的正态分布积分，结果为 $\sqrt{2\pi}$：
$$E(X) = 0 + \frac{\mu}{\sqrt{2\pi}} \cdot \sqrt{2\pi} = \mu$$

</details>

:::info 例题 2
若 $X \sim Exp(\lambda)$，求其中位数。
:::

<details>
<summary>查看解析</summary>

设中位数为 $m$，满足 $F(m) = 0.5$。
指数分布的 CDF 为 $F(x) = 1 - e^{-\lambda x}$ ($x \ge 0$)。
$$1 - e^{-\lambda m} = 0.5 \implies e^{-\lambda m} = 0.5 \implies -\lambda m = \ln(0.5)$$
$$m = \frac{\ln 2}{\lambda}$$

</details>

---

_本章节由 SolKnow 系统根据标准教材重写。_
