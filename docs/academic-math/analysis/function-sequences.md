---
title: 函数序列与函数项级数 (Function Sequences & Series)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 函数序列与函数项级数

在数学分析中，研究函数序列与函数项级数的收敛性不仅是极限理论的自然延伸，更是构造复杂函数（如 Fourier 级数、特殊函数）的基石。其中，**一致收敛性 (Uniform Convergence)** 是确保极限函数继承原序列分析性质（连续、可积、可微）的关键。

## 1. 一致收敛性定义

### 函数序列
设 $\{f_n(x)\}$ 是定义在 $D$ 上的函数序列。若对于任意 $\epsilon > 0$，存在 $N > 0$，使得当 $n > N$ 时，对于所有的 $x \in D$ 均有：
$$|f_n(x) - f(x)| < \epsilon$$
则称 $\{f_n(x)\}$ 在 $D$ 上**一致收敛**于 $f(x)$，记作 $f_n \rightrightarrows f$。

### 函数项级数
若函数项级数 $\sum_{n=1}^\infty u_n(x)$ 的部分和序列 $S_n(x) = \sum_{k=1}^n u_k(x)$ 在 $D$ 上一致收敛于 $S(x)$，则称该级数在 $D$ 上一致收敛。

---

## 2. 一致收敛性判别法

判别一致收敛性主要依靠以下三大工具：

<KnowledgeCard type="info" title="Weierstrass M-判别法 (强级数判别法)">
若存在收敛的正项常数项级数 $\sum_{n=1}^\infty M_n$，使得对于一切 $x \in D$ 和 $n \in \mathbb{N}$，都有：
$$|u_n(x)| \le M_n$$
则级数 $\sum_{n=1}^\infty u_n(x)$ 在 $D$ 上绝对且一致收敛。
</KnowledgeCard>

<KnowledgeCard type="tip" title="Abel 与 Dirichlet 判别法">
考察级数 $\sum_{n=1}^\infty a_n(x) b_n(x)$：
1. **Dirichlet 判别法**：若 $\sum a_n(x)$ 的部分和序列在 $D$ 上一致有界，且 $\{b_n(x)\}$ 对每个 $x$ 单调且在 $D$ 上一致趋于 0，则原级数一致收敛。
2. **Abel 判别法**：若 $\sum a_n(x)$ 在 $D$ 上一致收敛，且 $\{b_n(x)\}$ 对每个 $x$ 单调且在 $D$ 上一致有界，则原级数一致收敛。
</KnowledgeCard>

---

## 3. 一致收敛项的分析性质

一致收敛性允许我们交换极限过程与积分、求导符号。

1. **连续性**：若 $f_n(x)$ 在 $D$ 上连续且 $f_n \rightrightarrows f$，则极限函数 $f(x)$ 在 $D$ 上连续。
2. **可积性**：若 $f_n(x)$ 在 $[a, b]$ 上连续且 $f_n \rightrightarrows f$，则：
   $$\int_a^b \lim_{n \to \infty} f_n(x) dx = \lim_{n \to \infty} \int_a^b f_n(x) dx$$
3. **可微性**：若 $f_n(x)$ 在 $[a, b]$ 上可微，$f_n'(x)$ 一致收敛，且存在一点 $x_0$ 使得 $\{f_n(x_0)\}$ 收敛，则 $f_n(x)$ 在 $[a, b]$ 上一致收敛且：
   $$\left( \lim_{n \to \infty} f_n(x) \right)' = \lim_{n \to \infty} f_n'(x)$$

---

## 4. 逼近论基础：Weierstrass 逼近定理

Weierstrass 逼近定理表明闭区间上的每一个连续函数都可以由多项式一致逼近。

### Bernstein 多项式
对于定义在 $[0, 1]$ 上的函数 $f(x)$，其 **$n$ 次 Bernstein 多项式** 定义为：
$$B_n(f; x) = \sum_{k=0}^n f\left(\frac{k}{n}\right) \binom{n}{k} x^k (1-x)^{n-k}$$
若 $f \in C[0, 1]$，则 $B_n(f; x) \rightrightarrows f(x)$。

---

## 5. 深度例题

### 例题 1：求和与求导的交换
证明级数 $f(x) = \sum_{n=1}^\infty \frac{\sin nx}{n^3}$ 在 $\mathbb{R}$ 上连续可微。

**解析：**
1. **原级数一致收敛**：由于 $|\frac{\sin nx}{n^3}| \le \frac{1}{n^3}$，且 $\sum \frac{1}{n^3}$ 收敛，由 M-判别法知原级数在 $\mathbb{R}$ 上一致收敛。
2. **逐项求导级数**：考察 $\sum u_n'(x) = \sum \frac{\cos nx}{n^2}$。
3. **导级数一致收敛**：同样由 $|\frac{\cos nx}{n^2}| \le \frac{1}{n^2}$ 及 M-判别法，导级数在 $\mathbb{R}$ 上一致收敛。
4. **结论**：由可微性性质，$f(x)$ 可微且其导数 $f'(x) = \sum_{n=1}^\infty \frac{\cos nx}{n^2}$。由于导级数一致收敛且各项连续，故 $f'(x)$ 也是连续的。

### 例题 2：Dirichlet 判别法的应用
证明级数 $\sum_{n=1}^\infty \frac{\sin nx}{n}$ 在 $[\delta, 2\pi - \delta]$ ($\delta > 0$) 上一致收敛，但在 $(0, 2\pi)$ 上非一致收敛。

**解析：**
1. **一致收敛性**：令 $a_n(x) = \sin nx$，$b_n = 1/n$。
   - 部分和 $S_n(x) = \sum_{k=1}^n \sin kx = \frac{\sin \frac{nx}{2} \sin \frac{(n+1)x}{2}}{\sin \frac{x}{2}}$。
   - 在 $[\delta, 2\pi - \delta]$ 上，$|\sin \frac{x}{2}| \ge \sin \frac{\delta}{2} > 0$，故 $|S_n(x)| \le \frac{1}{\sin(\delta/2)}$，即一致有界。
   - $b_n = 1/n$ 单调趋于 0。由 Dirichlet 判别法，级数一致收敛。
2. **非一致收敛性**：若在 $(0, 2\pi)$ 上一致收敛，则由 Cauchy 准则，对 $x \to 0$ 时会产生矛盾（部分和在接近 0 时剧烈震荡）。

---

## 6. 练习题

1. **一致收敛判定**：讨论级数 $\sum_{n=1}^\infty x^n(1-x)$ 在 $[0, 1]$ 上的收敛性与一致收敛性。
2. **逐项积分应用**：计算 $\lim_{n \to \infty} \int_0^1 \frac{nx^n}{1+x^n} dx$。（提示：考虑函数项级数的一致收敛性或直接分析极限过程）。
3. **性质证明**：证明若 $f_n(x)$ 在 $[a, b]$ 上一致收敛于 $f(x)$，且 $f_n$ 都是 Riemann 可积的，则 $f$ 也是 Riemann 可积的，且 $\int_a^b f_n(x) dx \to \int_a^b f(x) dx$。
4. **Dirichlet 挑战**：证明 $\sum_{n=1}^\infty \frac{(-1)^n}{n+x^2}$ 在 $\mathbb{R}$ 上一致收敛。
