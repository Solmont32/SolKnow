---
title: 第十三章 函数序列与函数项级数 (Function Sequences & Series)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 第十三章 函数序列与函数项级数 (Function Sequences & Series)

在数学分析中，研究函数序列与函数项级数的收敛性不仅是极限理论的自然延伸，更是构造复杂函数（如 Fourier 级数、特殊函数）的基石。其中，**一致收敛性 (Uniform Convergence)** 是确保极限函数继承原序列分析性质（连续、可积、可微）的关键。

## 1. 一致收敛性定义与 Cauchy 准则

### 1.1 基本定义
设 $\{f_n(x)\}$ 是定义在 $D$ 上的函数序列。

*   **点收敛**：若对于每个 $x \in D$，极限 $\lim_{n \to \infty} f_n(x) = f(x)$ 均存在，称 $\{f_n(x)\}$ 在 $D$ 上点收敛于 $f(x)$。
*   **一致收敛**：若对于任意 $\epsilon > 0$，存在 $N > 0$，使得当 $n > N$ 时，对于**所有** $x \in D$ 均有：
    $$|f_n(x) - f(x)| < \epsilon$$
    记作 $f_n \rightrightarrows f$ ($x \in D$)。

### 1.2 一致收敛的 Cauchy 准则
<KnowledgeCard type="info" title="Cauchy 一致收敛准则">
函数序列 $\{f_n(x)\}$ 在 $D$ 上一致收敛的充分必要条件是：对于任意 $\epsilon > 0$，存在 $N > 0$，使得当 $n, m > N$ 时，对于所有 $x \in D$ 均有：
$$|f_n(x) - f_m(x)| < \epsilon$$
</KnowledgeCard>

---

## 2. Dini 定理 (Dini's Theorem)

在一般情况下，点收敛并不蕴含一致收敛。然而，若增加**单调性**与**定义域的紧性**，则有以下重要结论：

<KnowledgeCard type="success" title="Dini 定理">
设 $K$ 是 $\mathbb{R}$ 中的紧集（闭区间 $[a, b]$），$\{f_n(x)\}$ 是 $K$ 上的连续函数序列。若：
1. $\{f_n(x)\}$ 在 $K$ 上点收敛于连续函数 $f(x)$；
2. 对于每个 $x \in K$，序列 $\{f_n(x)\}$ 是单调的（即 $f_n(x) \le f_{n+1}(x)$ 或 $f_n(x) \ge f_{n+1}(x)$）；

则 $\{f_n(x)\}$ 在 $K$ 上**一致收敛**于 $f(x)$。
</KnowledgeCard>

---

## 3. 一致收敛性判别法

### 3.1 Weierstrass M-判别法
这是判别函数项级数一致收敛最常用的方法。

<KnowledgeCard type="info" title="M-判别法 (Weierstrass M-test)">
若存在收敛的正项常数项级数 $\sum_{n=1}^\infty M_n$，使得对于一切 $x \in D$ 和 $n \in \mathbb{N}$，都有：
$$|u_n(x)| \le M_n$$
则级数 $\sum_{n=1}^\infty u_n(x)$ 在 $D$ 上绝对且一致收敛。
</KnowledgeCard>

### 3.2 Dirichlet 与 Abel 判别法
用于判别形式为 $\sum a_n(x) b_n(x)$ 的级数。

<KnowledgeCard type="tip" title="Abel 与 Dirichlet 判别法">
1. **Dirichlet 判别法**：若 $\sum_{n=1}^\infty a_n(x)$ 的部分和序列在 $D$ 上一致有界，且 $\{b_n(x)\}$ 对每个 $x$ 单调，并在 $D$ 上一致趋于 0，则原级数一致收敛。
2. **Abel 判别法**：若 $\sum_{n=1}^\infty a_n(x)$ 在 $D$ 上一致收敛，且 $\{b_n(x)\}$ 对每个 $x$ 单调且在 $D$ 上一致有界，则原级数一致收敛。
</KnowledgeCard>

---

## 4. 一致收敛项下的分析性质证明

这是本章的核心：**极限过程的交换性**。

### 4.1 连续性定理
**定理**：若 $f_n \in C(D)$ 且 $f_n \rightrightarrows f$，则 $f \in C(D)$。

**证明（$3\epsilon$ 技巧）**：
固定 $x_0 \in D$，需证 $\lim_{x \to x_0} f(x) = f(x_0)$。
对于任意 $\epsilon > 0$：
1. 由 $f_n \rightrightarrows f$，存在 $N$ 使得对所有 $x$，$|f_N(x) - f(x)| < \frac{\epsilon}{3}$。
2. 由 $f_N$ 在 $x_0$ 连续，存在 $\delta > 0$，当 $|x - x_0| < \delta$ 时，$|f_N(x) - f_N(x_0)| < \frac{\epsilon}{3}$。
则当 $|x - x_0| < \delta$ 时：
$$|f(x) - f(x_0)| \le |f(x) - f_N(x)| + |f_N(x) - f_N(x_0)| + |f_N(x_0) - f(x_0)| < \frac{\epsilon}{3} + \frac{\epsilon}{3} + \frac{\epsilon}{3} = \epsilon$$
故 $f$ 在 $x_0$ 连续。

### 4.2 积分号下取极限定理
**定理**：若 $f_n \in R[a, b]$ 且 $f_n \rightrightarrows f$，则 $f \in R[a, b]$，且：
$$\lim_{n \to \infty} \int_a^b f_n(x) dx = \int_a^b f(x) dx$$

**证明**：
由于 $f_n \rightrightarrows f$ 且 $f_n$ 可积，容易证明 $f$ 亦可积。考察差值：
$$\left| \int_a^b f_n(x) dx - \int_a^b f(x) dx \right| \le \int_a^b |f_n(x) - f(x)| dx$$
由 $f_n \rightrightarrows f$，对于 $\epsilon > 0$，存在 $N$ 使得当 $n > N$ 时，对所有 $x \in [a, b]$， $|f_n(x) - f(x)| < \frac{\epsilon}{b-a}$。
此时：
$$\int_a^b |f_n(x) - f(x)| dx < \int_a^b \frac{\epsilon}{b-a} dx = \epsilon$$
证毕。

### 4.3 逐项求导定理
**定理**：设 $\{f_n\}$ 在 $[a, b]$ 上可微，若：
1. $\{f_n'(x)\}$ 在 $[a, b]$ 上一致收敛于 $g(x)$；
2. 存在某点 $x_0 \in [a, b]$ 使得 $\{f_n(x_0)\}$ 收敛；
则 $\{f_n\}$ 在 $[a, b]$ 上一致收敛于某函数 $f(x)$，且 $f'(x) = g(x)$。

**证明要点**：利用 Newton-Leibniz 公式 $f_n(x) = f_n(x_0) + \int_{x_0}^x f_n'(t) dt$，结合积分号下取极限结论即可。

---

## 5. 深度例题

### 例题 1：Dini 定理的应用
设 $f_n(x) = \frac{nx}{1+n^2x^2}$。讨论其在 $[0, 1]$ 上的收敛性。
1. **点极限**：$f(x) = \lim_{n \to \infty} f_n(x) = 0$。
2. **一致收敛性**：计算 $f_n(1/n) = 1/2$。由于 $\sup |f_n(x) - 0| \ge 1/2 \not\to 0$，故非一致收敛。
3. **为什么 Dini 定理不适用？** 虽然 $f_n, f$ 连续且定义域紧，但 $f_n(x)$ 并不单调（对于固定的 $x$，当 $n$ 增大时 $f_n(x)$ 先增后减）。

### 例题 2：一致收敛与连续性
讨论级数 $\sum_{n=1}^\infty \frac{x^2}{(1+x^2)^n}$ 在 $\mathbb{R}$ 上的收敛性。
- **和函数**：这是几何级数，当 $x \neq 0$ 时，$S(x) = x^2 \cdot \frac{1/(1+x^2)}{1-1/(1+x^2)} = 1$。当 $x = 0$ 时，$S(0) = 0$。
- **结论**：极限函数 $S(x)$ 在 $x=0$ 处不连续，而各项均连续，故由连续性定理之逆否命题知，该级数在包含原点的任何区间上均非一致收敛。

---

## 6. 练习题

1. **基本判定**：证明 $\sum_{n=1}^\infty \frac{\sin nx}{n^2}$ 在 $\mathbb{R}$ 上一致收敛。
2. **Dini 挑战**：设 $f_n \in C[a, b]$ 且 $f_n(x) \searrow 0$（点点单调减少且趋于 0），证明 $f_n \rightrightarrows 0$。
3. **性质综合**：设 $f(x) = \sum_{n=1}^\infty \frac{1}{n^2 + x^2}$。证明 $f$ 在 $\mathbb{R}$ 上可积且 $\int_0^\infty f(x) dx = \sum_{n=1}^\infty \frac{\pi}{2n}$。 (注意：此题需讨论反常积分下的交换)。
4. **Counter-example**：构造一个在 $[0, 1]$ 上点收敛于 0，且 $\int_0^1 f_n(x) dx \to 0$，但非一致收敛的连续函数序列。

---

<div className="bilibili-embed-inner">
  <iframe 
    src="//player.bilibili.com/player.html?aid=710813214&bvid=BV1BQ4y1P7vE&cid=210323924&page=1" 
    scrolling="no" 
    border="0" 
    frameborder="no" 
    framespacing="0" 
    allowfullscreen="true"
    loading="lazy">
  </iframe>
</div>
