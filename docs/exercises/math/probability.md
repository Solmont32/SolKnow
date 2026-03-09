---
title: 概率论练习题 (Probability Exercises)
---

# 概率论练习题 (Probability Exercises)

本练习库包含随机变量分布、数字特征及极限定理的相关练习，均配套折叠答案。

## 1. 离散型随机变量

:::info 习题 1.1
设 $X$ 服从参数为 $p$ 的几何分布 $P(X=k) = (1-p)^{k-1}p$。证明其具有无记忆性：即 $P(X > n+m | X > n) = P(X > m)$。
:::

<details>
<summary>查看答案</summary>

首先计算 $P(X > k)$：
$$P(X > k) = \sum_{i=k+1}^\infty (1-p)^{i-1}p = p(1-p)^k \sum_{j=0}^\infty (1-p)^j = p(1-p)^k \frac{1}{1-(1-p)} = (1-p)^k$$
于是：
$$P(X > n+m | X > n) = \frac{P(X > n+m, X > n)}{P(X > n)} = \frac{P(X > n+m)}{P(X > n)} = \frac{(1-p)^{n+m}}{(1-p)^n} = (1-p)^m$$
而 $P(X > m) = (1-p)^m$。得证。
</details>

## 2. 连续型随机变量与数字特征

:::info 习题 2.1
设 $X \sim U(0, a)$，求 $E(X^n)$。
:::

<details>
<summary>查看答案</summary>

$$E(X^n) = \int_0^a x^n \frac{1}{a} \, dx = \frac{1}{a} \left[ \frac{1}{n+1} x^{n+1} \right]_0^a = \frac{a^n}{n+1}$$
</details>

## 3. 极限定理

:::info 习题 3.1
某工厂生产的零件合格率为 0.9。现有 100 个零件，求其中合格零件数在 85 到 95 之间的概率。
:::

<details>
<summary>查看答案</summary>

设 $X$ 为合格零件数，$X \sim B(100, 0.9)$。
$E(X) = 100 \times 0.9 = 90$。
$Var(X) = 100 \times 0.9 \times 0.1 = 9$。
利用 CLT，$X \approx N(90, 9)$：
$P(85 \le X \le 95) = P\left(\frac{85-90}{3} \le \frac{X-90}{3} \le \frac{95-90}{3}\right)$
$= P(-1.67 \le Z \le 1.67) = \Phi(1.67) - \Phi(-1.67) = 2\Phi(1.67) - 1$
查表可知 $\Phi(1.67) \approx 0.9525$。
$P \approx 2 \times 0.9525 - 1 = 0.905$。
</details>

---

_本练习库由 SolKnow 系统自动生成。_
