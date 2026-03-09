---
title: $L^p$ 空间：范数、完备性与核心不等式 (Lp Spaces)
description: 系统梳理 $L^p$ 空间结构，覆盖范数、完备性、Hölder/Minkowski 不等式与收敛方式辨析
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# $L^p$ 空间：范数、完备性与核心不等式

> 从黎曼积分到 Lebesgue 积分之后，函数不再只按“点值”比较，而是按“整体大小”比较。$L^p$ 空间正是这种整体尺度的标准语言。

---

## 一、定义与基本对象

设 $(X,\mathcal{M},\mu)$ 为测度空间，$1 \le p < \infty$。

可测函数 $f$ 若满足

$$

\int_X |f|^p \, d\mu < \infty,


$$

则称 $f \in L^p(X)$。对应范数定义为

$$

\|f\|_p = \left(\int_X |f|^p\,d\mu\right)^{1/p}.


$$

对 $p=\infty$，定义

$$

\|f\|_\infty = \operatorname*{ess\,sup}_{x\in X}|f(x)|.


$$

满足 $\|f\|_\infty<\infty$ 的函数构成 $L^\infty(X)$。

<KnowledgeCard type="info" title="等价类视角">
$L^p$ 中函数按“几乎处处相等”识别为同一个元素：若 $f=g$ a.e.，则在 $L^p$ 中视为同一对象。
</KnowledgeCard>

---

## 二、$L^p$ 范数与度量结构

在 $1\le p\le\infty$ 下，$\|\cdot\|_p$ 都满足范数公理：

1. 非负性与确定性：$\|f\|_p\ge0$，且 $\|f\|_p=0 \iff f=0$ a.e.；
2. 齐次性：$\|\lambda f\|_p=|\lambda|\|f\|_p$；
3. 三角不等式：$\|f+g\|_p\le \|f\|_p+\|g\|_p$（$p<\infty$ 由 Minkowski 给出）。

由此得到度量

$$

d_p(f,g)=\|f-g\|_p.


$$

---

## 三、Hölder 与 Minkowski 不等式

### 1. Hölder 不等式

若 $1<p,q<\infty$ 且 $\frac1p+\frac1q=1$，则

$$

\int_X |fg|\,d\mu \le \|f\|_p\|g\|_q.


$$

这是“乘积可积性”的核心工具，也是 Minkowski、对偶空间和偏微分方程估计的起点。

### 2. Minkowski 不等式

对 $1\le p<\infty$，

$$

\|f+g\|_p \le \|f\|_p+\|g\|_p.


$$

这相当于把欧氏空间的三角不等式推广到函数空间。

<KnowledgeCard type="success" title="两条不等式的分工">
Hölder 负责“乘积估计”，Minkowski 负责“和估计”。实变函数中的大量先验估计都由这两条不等式拼接得到。
</KnowledgeCard>

---

## 四、完备性：$L^p$ 是 Banach 空间

核心结论：

- $1\le p\le\infty$ 时，$L^p(X)$ 完备；
- 即每个 $L^p$-Cauchy 列都收敛到某个 $L^p$ 元。

特别地，$p=2$ 时可定义内积

$$

\langle f,g\rangle=\int_X f\overline g\,d\mu,


$$

所以 $L^2$ 是 Hilbert 空间。

---

## 五、收敛方式辨析（考试高频）

常见概念：

1. $L^p$ 收敛：$\|f_n-f\|_p\to0$；
2. 几乎处处收敛：$f_n(x)\to f(x)$ a.e.；
3. 测度收敛：$\mu(\{|f_n-f|>\varepsilon\})\to0$（任意 $\varepsilon>0$）；
4. 一致收敛：$\sup_X|f_n-f|\to0$。

典型关系（有限测度空间中）：

- $L^p$ 收敛 $\Rightarrow$ 测度收敛；
- 几乎处处收敛不必推出 $L^p$ 收敛；
- 测度收敛加一致可积/支配条件常可推出 $L^1$ 收敛（Vitali 思想）。

---

## 六、教材级例题（5 题）

### 例 1：判定幂函数何时属于 $L^p(0,1)$

讨论 $f(x)=x^{-\alpha}$ 属于 $L^p(0,1)$ 的充要条件。

<details>

<summary>Check Solution</summary>

$$

\|f\|_p^p = \int_0^1 x^{-\alpha p}\,dx.


$$

积分收敛当且仅当 $-\alpha p>-1$，即

$$

\alpha < \frac1p.


$$

所以 $x^{-\alpha}\in L^p(0,1)\iff \alpha<1/p$。

</details>

### 例 2：应用 Hölder 估计乘积

设 $f\in L^4(0,1),\, g\in L^{4/3}(0,1)$，证明 $fg\in L^1(0,1)$ 且给出估计。

<details>

<summary>Check Solution</summary>

取共轭指数 $p=4,\ q=4/3$，应用 Hölder：

$$

\int_0^1 |fg|
\le \|f\|_4\|g\|_{4/3}<\infty.


$$

故 $fg\in L^1(0,1)$，且

$$

\|fg\|_1\le \|f\|_4\|g\|_{4/3}.


$$

</details>

### 例 3：用 Minkowski 证明 $L^p$ 三角不等式

证明 $f,g\in $L^p(X)$（$1\le p<\infty$）时，$f+g\in L^p$ 且

$$

\|f+g\|_p\le \|f\|_p+\|g\|_p.


$$

<details>

<summary>Check Solution</summary>

这是 Minkowski 不等式本身。证明通常从

$$

|f+g|^p = |f+g||f+g|^{p-1} \le (|f| + |g|)|f+g|^{p-1}


$$

出发，展开为 $|f||f+g|^{p-1} + |g||f+g|^{p-1}$，再对两项分别使用 Hölder 不等式（其中共轭指数为 $p$ 和 $q = \frac{p}{p-1}$），即可得到结论。

</details>

### 例 4：a.e. 收敛但不 $L^1$ 收敛

在 $(0,1)$ 上令 $f_n(x)=n\mathbf{1}_{(0,1/n)}(x)$。判断 $f_n\to0$ 的收敛类型。

<details>

<summary>Check Solution</summary>

对任意 $x \in (0, 1)$，当 $n > 1/x$ 时 $f_n(x) = 0$，故 $f_n(x) \to 0$ a.e.  
但 $\|f_n\|_1 = \int_0^{1/n} n \, dx = 1$，不趋于 0，故不收敛于 $L^1$。
这也说明了几乎处处收敛不能保证 $L^p$ 收敛，除非有额外的控制条件（如 DCT）。

</details>

### 例 5：$L^p$ 收敛推出测度收敛

设 $\mu(X)<\infty$ 且 $\|f_n-f\|_p\to0$，证明 $f_n\to f$ in measure。

<details>

<summary>Check Solution</summary>

由 Markov 不等式（或称 Chebyshev 不等式）：

$$

\mu\{|f_n-f|>\varepsilon\}
\le \frac{1}{\varepsilon^p}\int_X|f_n-f|^p\,d\mu
=\frac{\|f_n-f\|_p^p}{\varepsilon^p}.


$$

因为 $\|f_n-f\|_p \to 0$，故对任意 $\varepsilon > 0$，上述测度趋于 0。

</details>

---

## 七、分层练习

### 练习 1（基础）

证明：若 $\mu(X)<\infty$ 且 $q>p\ge1$，则 $L^q(X)\subset L^p(X)$，并给出范数估计。

<details>

<summary>Check Solution</summary>

由 Hölder 不等式，取函数 $|f|^p$ 和 $1$，指数 $r = q/p$ 及其共轭指数 $r' = \frac{q}{q-p}$：
$$ \int_X |f|^p \cdot 1 d\mu \le \left(\int_X (|f|^p)^{q/p} d\mu\right)^{p/q} \left(\int_X 1^{q/(q-p)} d\mu\right)^{(q-p)/q}. $$
即 $\|f\|_p^p \le \|f\|_q^p \cdot \mu(X)^{(q-p)/q}$。
两边开 $p$ 次方得：$\|f\|_p \le \|f\|_q \cdot \mu(X)^{\frac{1}{p} - \frac{1}{q}}$。
由于 $\mu(X) < \infty$，范数有界，故 $L^q \subset L^p$。

</details>

### 练习 2（提高）

证明 $L^\infty(X)$ 是 Banach 空间。

<details>

<summary>Check Solution</summary>

设 $\{f_n\}$ 是 $L^\infty$ 中的 Cauchy 序列。
对于每个 $k, m, n \in \mathbb{N}$，定义 $A_{k,m,n} = \{x : |f_n(x) - f_m(x)| > \|f_n - f_m\|_\infty\}$ 和 $B_n = \{x : |f_n(x)| > \|f_n\|_\infty\}$。
这些集合都是零测集。令 $N = (\bigcup_{n,m} A_{n,m}) \cup (\bigcup_n B_n)$，则 $m(N) = 0$。
在 $X \setminus N$ 上，$\{f_n(x)\}$ 是一致 Cauchy 序列，因此一致收敛于某个 $f(x)$。
易证 $f \in L^\infty$ 且 $\|f_n - f\|_\infty \to 0$。

</details>

### 练习 3 (深度：$L^2$ 的完备性证明)

利用 Riesz-Fischer 定理的思路，简述为什么 $L^p$ 空间是完备的。

<details>

<summary>Check Solution</summary>

核心在于：从 $L^p$ 的 Cauchy 序列中抽取一个快速收敛子列 $\{f_{n_k}\}$，使得 $\|f_{n_{k+1}} - f_{n_k}\|_p < 2^{-k}$。
定义级数 $g(x) = |f_{n_1}(x)| + \sum_{k=1}^\infty |f_{n_{k+1}}(x) - f_{n_k}(x)|$。
利用 Minkowski 不等式证明 $g \in L^p$，从而 $g(x) < \infty$ a.e.。
这意味着级数 $f_{n_1}(x) + \sum (f_{n_{k+1}}(x) - f_{n_k}(x))$ 绝对收敛 a.e.，其部分和即子列 $f_{n_k}$ 收敛于某个 $f$。
最后利用受控收敛定理证明 $\|f_n - f\|_p \to 0$。

</details>

---

## 八、章节衔接

- 前置章节：[Lebesgue 测度](./measure-theory) 与 [Lebesgue 积分](./lebesgue-integral)
- 配套练习：[实变函数专题练习（C 组）](/docs/exercises/math/real-analysis#ra-c1)

掌握本章后，可以继续进入 Sobolev 空间、Fourier 分析与偏微分方程弱解理论。

---

## 九、配套练习跳转

- [进入实变函数专题练习总页](/docs/exercises/math/real-analysis)
- [C 组：$L^p$ 空间与估计（建议对应本章）](/docs/exercises/math/real-analysis#ra-c1)
- [返回实变函数学习路径首页](/docs/academic-math/real-analysis)
