---
title: 第十三章 函数序列与函数项级数 (Function Sequences & Series)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 第十三章 函数序列与函数项级数 (Function Sequences & Series)

在数学分析中，函数序列与函数项级数是连接“逐点极限”与“整体结构”的桥梁。核心问题是：极限能否与连续、积分、求导交换？这一问题的关键标准就是**一致收敛**。

## 1. 一致收敛性定义与 Cauchy 准则

### 1.1 基本定义

设 $\{f_n(x)\}$ 是定义在 $D$ 上的函数序列。

- **点收敛**：若对于每个 $x \in D$，极限 $\lim_{n \to \infty} f_n(x) = f(x)$ 存在，称 $\{f_n(x)\}$ 在 $D$ 上点收敛于 $f(x)$。
- **一致收敛**：若对于任意 $\epsilon > 0$，存在 $N > 0$，使得当 $n > N$ 时，对于所有 $x \in D$ 均有

$$|f_n(x) - f(x)| < \epsilon$$

记作 $f_n \rightrightarrows f$（$x \in D$）。

### 1.2 一致收敛的 Cauchy 准则

<KnowledgeCard type="info" title="Cauchy 一致收敛准则">
函数序列 $\{f_n(x)\}$ 在 $D$ 上一致收敛的充分必要条件是：对于任意 $\epsilon > 0$，存在 $N > 0$，使得当 $n,m>N$ 时，对所有 $x \in D$ 都有

$$|f_n(x)-f_m(x)|<\epsilon.$$

</KnowledgeCard>

### 1.3 与点收敛的区别

- 点收敛是“逐点最终接近”。
- 一致收敛是“全区间同时接近”。

典型反例：$f_n(x)=x^n$ 在 $[0,1]$ 上点收敛到

$$
f(x)=\begin{cases}
0,&0\le x<1,\\
1,&x=1,
\end{cases}
$$

极限函数不连续，因此不可能一致收敛。

---

## 2. Dini 定理 (Dini's Theorem)

<KnowledgeCard type="success" title="Dini 定理">
设 $K$ 是紧集，$\{f_n\}\subset C(K)$。若：
1. $f_n$ 在 $K$ 上点收敛于连续函数 $f$；
2. 对每个 $x\in K$，$f_n(x)$ 关于 $n$ 单调；

则 $f_n$ 在 $K$ 上一致收敛于 $f$。
</KnowledgeCard>

---

## 3. 一致收敛性判别法

### 3.1 Weierstrass M-判别法

<KnowledgeCard type="info" title="M-判别法 (Weierstrass M-test)">
若存在收敛正项级数 $\sum_{n=1}^{\infty}M_n$，使得对任意 $x\in D$ 都有

$$|u_n(x)|\le M_n,$$

则函数项级数 $\sum_{n=1}^{\infty}u_n(x)$ 在 $D$ 上绝对且一致收敛。
</KnowledgeCard>

### 3.2 Dirichlet 与 Abel 判别法

<KnowledgeCard type="tip" title="Dirichlet 与 Abel 判别法要点">
1. **Dirichlet**：若 $\sum a_n(x)$ 的部分和在 $D$ 上一致有界，且 $b_n(x)$ 单调并一致趋于 0，则 $\sum a_n(x)b_n(x)$ 一致收敛。
2. **Abel**：若 $\sum a_n(x)$ 在 $D$ 上一致收敛，且 $b_n(x)$ 单调且一致有界，则 $\sum a_n(x)b_n(x)$ 一致收敛。
</KnowledgeCard>

---

## 4. 一致收敛项下的分析性质

### 4.1 连续性定理

若 $f_n\in C(D)$ 且 $f_n\rightrightarrows f$，则 $f\in C(D)$。

### 4.2 积分号下取极限定理

若 $f_n\in R[a,b]$ 且 $f_n\rightrightarrows f$，则

$$\lim_{n\to\infty}\int_a^b f_n(x)\,dx=\int_a^b f(x)\,dx.$$

### 4.3 逐项求导定理

若 $f_n$ 在 $[a,b]$ 可微，$f_n'$ 一致收敛，且某点 $x_0$ 处 $f_n(x_0)$ 收敛，则 $f_n$ 一致收敛到某函数 $f$，且 $f'=\lim f_n'$。

---

## 5. 教材化例题

### 例题 1：点收敛但非一致收敛

设 $f_n(x)=x^n$，定义域 $[0,1]$。判定其收敛类型。

**解答**：在 $[0,1)$ 上趋于 0，在 $x=1$ 处恒为 1。点极限不连续，故非一致收敛。

### 例题 2：Dini 定理应用

设 $f_n(x)=\frac{nx}{1+n^2x^2}$，讨论其在 $[0,1]$ 上收敛性。

**解答**：点极限为 0，但 $f_n(1/n)=1/2$，故不一致收敛；且其关于 $n$ 非单调，Dini 条件不满足。

### 例题 3：M-判别法

证明 $\sum_{n=1}^{\infty}\frac{\sin(nx)}{n^2}$ 在 $\mathbb{R}$ 上一致收敛。

**解答**：$|\sin(nx)/n^2|\le 1/n^2$，而 $\sum 1/n^2$ 收敛，故由 M-判别法一致收敛。

### 例题 4：一致收敛与连续性

讨论 $\sum_{n=1}^{\infty}\frac{x^2}{(1+x^2)^n}$ 在 $\mathbb{R}$ 上的收敛。

**解答**：$x\ne0$ 时和函数为 1，$x=0$ 时和为 0，极限函数在 0 不连续，故在包含 0 的区间上不一致收敛。

### 例题 5：积分交换

设 $f_n(x)=\frac{x}{1+n^2x^2}$，$x\in[0,1]$。求 $\lim_{n\to\infty}\int_0^1 f_n(x)\,dx$。

**解答**：$0\le f_n(x)\le \frac{1}{2n}$，故 $f_n\rightrightarrows0$，于是

$$\int_0^1 f_n(x)\,dx\to0.$$

---

## 6. 章内练习（折叠答案）

### 练习 1：一致收敛判定

证明 $\sum_{n=1}^{\infty}\frac{\sin nx}{n^2}$ 在 $\mathbb{R}$ 上一致收敛。

<details>

<summary>点击查看解析与答案</summary>

由 $|\sin nx|/n^2\le1/n^2$，且 $\sum 1/n^2$ 收敛，M-判别法得一致收敛。

</details>

### 练习 2：Dini 定理

设 $f_n\in C[a,b]$ 且 $f_n(x)\searrow0$，证明 $f_n\rightrightarrows0$。

<details>

<summary>点击查看解析与答案</summary>

满足紧集上连续、点收敛到连续函数、点点单调三条件，故由 Dini 定理得一致收敛。

</details>

### 练习 3：积分极限

设 $f_n(x)=\frac{x^n}{1+x^n}$，$x\in[0,1]$，判断 $\lim_{n\to\infty}\int_0^1f_n(x)\,dx$。

<details>

<summary>点击查看解析与答案</summary>

对 $x\in[0,1)$，$f_n(x)\to0$；端点 $x=1$ 为单点。可算得积分极限为 0。

</details>

### 练习 4：反例构造

构造连续函数列，在 $[0,1]$ 点收敛到 0 但不一致收敛。

<details>

<summary>点击查看解析与答案</summary>

取 $f_n(x)=x^n$，有 $\sup_{[0,1]}|f_n-0|=1$，故非一致收敛。

</details>

### 练习 5：逐项求导辨析

设 $f_n(x)=\sin(nx)/n^2$，讨论 $\sum f_n'(x)$ 在 $[0,2\pi]$ 是否一致收敛。

<details>

<summary>点击查看解析与答案</summary>

$f_n'(x)=\cos(nx)/n$。在 $x=0$ 处退化为调和级数，故导数级数不一致收敛。

</details>

---

<SupportingExercises
topic="函数列与函数项级数"
fileId="analysis-series-fourier"
exercises={[
{ index: 13.1, title: "一致收敛的判别 (M-判别法)", slug: "练习-131一致收敛的判别-m-判别法" },
{ index: 13.2, title: "Dini 定理与紧致性", slug: "练习-132dini-定理与紧致性" }
]}
/>

---

_编者注：一致收敛是分析学中处理函数极限的核心工具。掌握了它，你就掌握了交换运算次序的通行证。_
