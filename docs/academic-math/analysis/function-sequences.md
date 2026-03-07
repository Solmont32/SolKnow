---
title: 函数序列与逼近 (Function Sequences & Approximation)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 函数序列与逼近

在数学分析中，研究函数序列的收敛性不仅是极限理论的自然延伸，更是构造复杂函数的基石。Weierstrass 逼近定理展示了连续函数如何由简单的多项式“搭建”而成。

## 1. Weierstrass 逼近定理

Weierstrass 逼近定理是函数逼近论的奠基性结论，它表明闭区间上的每一个连续函数都可以由多项式一致逼近。

<KnowledgeCard type="info" title="Weierstrass 第一逼近定理">
设 $f(x)$ 是闭区间 $[a, b]$ 上的连续函数，则对于任意 $\epsilon > 0$，存在一个多项式 $P(x)$，使得对于所有的 $x \in [a, b]$，均有：
$$|f(x) - P(x)| < \epsilon$$
换言之，多项式集合在 $C[a, b]$（连续函数空间）中依一致收敛范数是稠密的。
</KnowledgeCard>

---

## 2. Bernstein 多项式

为了构造性地证明 Weierstrass 定理，俄国数学家 Sergei Bernstein 引入了一类特殊的多项式。

### 定义
对于定义在 $[0, 1]$ 上的函数 $f(x)$，其 **$n$ 次 Bernstein 多项式** 定义为：
$$B_n(f; x) = \sum_{k=0}^n f\left(\frac{k}{n}\right) \binom{n}{k} x^k (1-x)^{n-k}$$

### 收敛性分析
Bernstein 多项式的核心价值在于其收敛的直观性。若 $f \in C[0, 1]$，则 $B_n(f; x)$ 在 $[0, 1]$ 上一致收敛于 $f(x)$。

<KnowledgeCard type="tip" title="概率论视角的证明思路">
考虑独立同分布的 Bernoulli 试验，成功的概率为 $x$。令 $X_n$ 为 $n$ 次试验中成功的次数，则 $X_n \sim B(n, x)$。
根据期望的定义：
$$E[f(X_n/n)] = \sum_{k=0}^n f(k/n) P(X_n = k) = B_n(f; x)$$
由大数定律（Law of Large Numbers），当 $n \to \infty$ 时，$X_n/n$ 依概率收敛于 $x$。对于连续函数 $f$，通过一致连续性的 $\epsilon-\delta$ 论证，即可证明一致收敛。
</KnowledgeCard>

---

## 3. 深度例题

### 例题 1：逼近性质的传递
设 $f(x) \in C[0, 1]$，且满足对于所有的 $n = 0, 1, 2, \dots$：
$$\int_0^1 f(x) x^n dx = 0$$
证明：$f(x) \equiv 0$。

**解析：**
1. 由 Weierstrass 逼近定理，对于任意 $\epsilon > 0$，存在多项式 $P(x)$ 使得 $|f(x) - P(x)| < \epsilon$。
2. 根据已知条件，$\int_0^1 f(x) P(x) dx = 0$。
3. 考察 $\int_0^1 f^2(x) dx$：
   $$\int_0^1 f^2(x) dx = \int_0^1 f(x) (f(x) - P(x)) dx + \int_0^1 f(x) P(x) dx$$
   $$\left| \int_0^1 f^2(x) dx \right| \le \int_0^1 |f(x)| \cdot |f(x) - P(x)| dx \le \epsilon \int_0^1 |f(x)| dx$$
4. 由于 $\epsilon$ 是任意的，推得 $\int_0^1 f^2(x) dx = 0$。
5. 由 $f$ 的连续性，必有 $f(x) \equiv 0$。

### 例题 2：Bernstein 多项式的导数
证明 Bernstein 多项式 $B_n(f; x)$ 的导数满足：
$$\frac{d}{dx} B_n(f; x) = n \sum_{k=0}^{n-1} \left[ f\left(\frac{k+1}{n}\right) - f\left(\frac{k}{n}\right) \right] \binom{n-1}{k} x^k (1-x)^{n-1-k}$$

**提示：** 利用恒等式 $k \binom{n}{k} = n \binom{n-1}{k-1}$ 进行项合并。

---

## 4. 练习题

1. **基础巩固**：计算 $f(x) = x^2$ 在 $[0, 1]$ 上的 Bernstein 多项式 $B_n(x^2; x)$，并验证其收敛性。
2. **应用探索**：利用 Weierstrass 定理证明：若 $f(x)$ 在 $[a, b]$ 上连续且不恒为零，则存在多项式 $P(x)$ 使得 $f(x) P(x)$ 在 $[a, b]$ 上的积分大于 0。
3. **深度挑战**：证明若 $f(x)$ 在 $[0, 1]$ 上 $k$ 阶连续可导，则其 Bernstein 多项式的 $k$ 阶导数 $B_n^{(k)}(f; x)$ 在 $[0, 1]$ 上一致收敛于 $f^{(k)}(x)$。
