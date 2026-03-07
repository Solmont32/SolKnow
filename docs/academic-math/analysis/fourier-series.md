---
title: Fourier 级数 (Fourier Series)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# Fourier 级数 (Fourier Series)

Fourier 级数是分析学中极其重要的工具，它将周期函数分解为简单的三角函数（正弦和余弦）的无穷级数。它不仅在纯数学中占有核心地位，也是信号处理、量子力学和偏微分方程求解的基础。

## 1. 周期函数的 Fourier 展开

设 $f(x)$ 是以 $2L$ 为周期的函数，其 Fourier 级数定义为：
$$f(x) \sim \frac{a_0}{2} + \sum_{n=1}^\infty \left( a_n \cos\frac{n\pi x}{L} + b_n \sin\frac{n\pi x}{L} \right)$$

其中 Fourier 系数由正交性原理导出：
$$a_n = \frac{1}{L} \int_{-L}^L f(x) \cos\frac{n\pi x}{L} dx, \quad n=0,1,2,\dots$$
$$b_n = \frac{1}{L} \int_{-L}^L f(x) \sin\frac{n\pi x}{L} dx, \quad n=1,2,\dots$$

---

## 2. Dirichlet 收敛定理 (Dirichlet Conditions)

Fourier 级数是否收敛于原函数是一个复杂的问题。Dirichlet 给出了最常用的充分条件。

<KnowledgeCard type="warning" title="Dirichlet 收敛定理">
若 $f(x)$ 以 $2L$ 为周期，且在 $[-L, L]$ 上满足以下 **Dirichlet 条件**：
1. $f(x)$ 在一个周期内连续或只有有限个第一类间断点。
2. $f(x)$ 在一个周期内只有有限个极值点。

则 $f(x)$ 的 Fourier 级数在 $x$ 处收敛于：
- $f(x)$，若 $x$ 是连续点；
- $\frac{f(x^+) + f(x^-)}{2}$，若 $x$ 是间断点。
</KnowledgeCard>

---

## 3. Bessel 不等式与 Parseval 等式

从希尔伯特空间（Hilbert Space）的角度看，Fourier 级数本质上是函数在正交基上的投影。

### 3.1 Bessel 不等式
设 $f(x) \in L^2[-L, L]$（平方可积），对于其 Fourier 系数 $a_n, b_n$，有：
$$\frac{a_0^2}{2} + \sum_{n=1}^\infty (a_n^2 + b_n^2) \le \frac{1}{L} \int_{-L}^L f^2(x) dx$$
该不等式意味着 Fourier 系数的能量（平方和）总是有限的，且不超过原函数的总能量。

### 3.2 Parseval 等式 (能量守恒)
若 $f(x)$ 在 $[-L, L]$ 上平方可积，则上述不等式取等号：
$$\frac{a_0^2}{2} + \sum_{n=1}^\infty (a_n^2 + b_n^2) = \frac{1}{L} \int_{-L}^L f^2(x) dx$$
**物理意义**：时域内信号的总能量等于频域内各分量能量的总和。

---

## 4. 深度例题

### 例题 1：周期矩形波的展开与 Parseval 等式应用
设 $f(x) = \begin{cases} 1, & 0 < x < \pi \\ -1, & -\pi < x < 0 \end{cases}$，且 $f(x+2\pi) = f(x)$。
1. 求 $f(x)$ 的 Fourier 级数。
2. 利用 Parseval 等式计算 $\sum_{n=1}^\infty \frac{1}{(2n-1)^2}$。

**解析**：
1. **对称性分析**：$f(x)$ 是奇函数，故 $a_n = 0$。
   $b_n = \frac{2}{\pi} \int_0^\pi 1 \cdot \sin nx dx = \frac{2}{\pi} \left[ -\frac{\cos nx}{n} \right]_0^\pi = \frac{2}{n\pi} (1 - (-1)^n)$。
   - 当 $n$ 为偶数时，$b_n = 0$；
   - 当 $n = 2k-1$ 为奇数时，$b_n = \frac{4}{(2k-1)\pi}$。
   故 $f(x) \sim \frac{4}{\pi} \sum_{k=1}^\infty \frac{\sin(2k-1)x}{2k-1}$。

2. **应用 Parseval**：
   $\sum_{k=1}^\infty b_{2k-1}^2 = \frac{1}{\pi} \int_{-\pi}^\pi f^2(x) dx$
   $\sum_{k=1}^\infty \left( \frac{4}{(2k-1)\pi} \right)^2 = \frac{1}{\pi} \int_{-\pi}^\pi 1^2 dx = 2$
   $\frac{16}{\pi^2} \sum_{k=1}^\infty \frac{1}{(2k-1)^2} = 2 \implies \sum_{k=1}^\infty \frac{1}{(2k-1)^2} = \frac{\pi^2}{8}$。

### 例题 2：Gibbs 现象观察
考虑例题 1 中的级数部分和 $S_N(x)$。在间断点 $x=0$ 附近，随着 $N \to \infty$，$S_N(x)$ 会出现大约 9% 的过冲。这就是著名的 **Gibbs 现象**。它表明在不连续点附近，Fourier 级数不具备一致收敛性。

---

## 5. 配套练习

1.  **基础**：将 $f(x) = x, x \in (-\pi, \pi)$ 展开为 Fourier 级数。
2.  **进阶**：利用 $f(x) = x^2, x \in [-\pi, \pi]$ 的展开式，证明著名的 **Basel 问题**：$\sum_{n=1}^\infty \frac{1}{n^2} = \frac{\pi^2}{6}$。
3.  **深度**：证明 **Riemann-Lebesgue 引理**：若 $f(x)$ 在 $[a, b]$ 上 Riemann 可积，则：
    $$\lim_{\lambda \to \infty} \int_a^b f(x) \sin \lambda x dx = 0$$
    (提示：先对阶梯函数证明，再利用逼近性质)。
4.  **挑战**：设 $f(x) = |\sin x|$，将其展开为 Fourier 级数，并讨论其收敛性。

<KnowledgeCard type="success" title="学习提示">
掌握 Fourier 级数的关键在于理解“正交投影”。Parseval 等式不仅是求数项级数和的利器，更是理解 L2 空间完备性的核心。
</KnowledgeCard>
