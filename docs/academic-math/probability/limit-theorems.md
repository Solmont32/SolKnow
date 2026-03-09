---
title: 极限定理 (Limit Theorems)
---

# 极限定理 (Limit Theorems)

极限定理是概率论的核心内容，揭示了大量随机现象背后的确定性规律。

## 1. 大数定律 (Law of Large Numbers)

大数定律说明当试验次数足够多时，样本均值会收敛于期望值。

### 切比雪夫不等式 (Chebyshev's Inequality)
对于随机变量 $X$，若其期望 $E(X)$ 和方差 $Var(X) = \sigma^2$ 存在，则对任意 $\epsilon > 0$：
$$P(|X - E(X)| \ge \epsilon) \le \frac{\sigma^2}{\epsilon^2}$$

### 切比雪夫大数定律 (Chebyshev LLN)
设 $X_1, X_2, \dots$ 是独立且同分布的随机变量序列，期望 $E(X_i) = \mu$ 且方差 $Var(X_i) = \sigma^2$ 有限。则对任意 $\epsilon > 0$：
$$\lim_{n \to \infty} P\left(\left|\frac{1}{n} \sum_{i=1}^n X_i - \mu\right| < \epsilon\right) = 1$$
即样本均值 **依概率收敛** 于 $\mu$。

### 辛钦大数定律 (Khinchin LLN)
若 $X_1, X_2, \dots$ 独立同分布且期望 $E(X_i) = \mu$ 存在（不要求方差有限），结论依然成立。

## 2. 中心极限定理 (Central Limit Theorem, CLT)

中心极限定理描述了大量独立随机变量之和在经过标准化后服从正态分布。

### 林德伯格-勒维定理 (Lindeberg-Levy CLT)
设 $X_1, X_2, \dots$ 是独立同分布的随机变量序列，$E(X_i) = \mu$，$Var(X_i) = \sigma^2 > 0$。则对于任意实数 $x$：
$$\lim_{n \to \infty} P\left(\frac{\sum_{i=1}^n X_i - n\mu}{\sqrt{n}\sigma} \le x\right) = \Phi(x)$$
其中 $\Phi(x)$ 是标准正态分布的分布函数。

### 棣莫弗-拉普拉斯定理 (De Moivre-Laplace CLT)
当 $n \to \infty$ 时，二项分布 $B(n, p)$ 趋于正态分布 $N(np, np(1-p))$。

## 3. 经典例题

:::info 例题 1
一家保险公司有 10000 名客户，每人每年支付 500 元保费。根据统计，每人每年出险的概率为 0.001，一旦出险，保险公司需支付 100,000 元。求公司亏本的概率（利用 CLT）。
:::

<details>
<summary>查看解析</summary>

设 $X_i$ 为第 $i$ 位客户的赔付额。$X_i$ 取 $100,000$ 的概率为 $0.001$，取 $0$ 的概率为 $0.999$。
$E(X_i) = 100,000 \times 0.001 = 100$ 元。
$Var(X_i) = E(X_i^2) - [E(X_i)]^2 = (10^5)^2 \times 0.001 - 100^2 \approx 10^7$。
总赔付 $S_{10000} = \sum X_i$。总收入为 $10000 \times 500 = 5 \times 10^6$。
亏本即 $S_{10000} > 5 \times 10^6$。
由 CLT，$S_{10000} \sim N(n\mu, n\sigma^2)$：
$n\mu = 10000 \times 100 = 10^6$。
$\sqrt{n\sigma^2} = \sqrt{10000 \times 10^7} = \sqrt{10^{11}} = 10^5 \sqrt{10} \approx 3.16 \times 10^5$。
$P(S_{10000} > 5 \times 10^6) = P\left(\frac{S_{10000} - 10^6}{3.16 \times 10^5} > \frac{4 \times 10^6}{3.16 \times 10^5}\right) \approx P(Z > 12.6)$。
由于 $12.6$ 远大于 $3$，该概率几乎为 0。
</details>

---

_本章节由 SolKnow 系统根据标准教材重写。_
