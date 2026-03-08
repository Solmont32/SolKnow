---
title: "$L^p$ 空间：范数、完备性与收敛方式辨析 (Lp Spaces)"
description: "系统梳理 $L^p$ 空间的定义、范数、完备性、Hölder/Minkowski 不等式与几种典型收敛方式"
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# $L^p$ 空间：范数、完备性与收敛方式辨析

> Lebesgue 积分解决的是“什么函数可以积分”，而 $L^p$ 空间进一步回答“这些函数以什么尺度衡量大小、距离与极限”。

在实变函数论里，$L^p$ 空间是连接积分、估计、收敛定理与函数方程的中心对象。它把“函数的大小”编码为积分量
$$
\int |f|^p \, d\mu,
$$
从而把函数集合组织成带范数的线性空间。现代分析中大量问题都可以表述为：

1. 某个函数是否属于某个 $L^p$ 空间？
2. 某个函数列是否在 $L^p$ 意义下收敛？
3. 某种估计是否可由 Hölder、Minkowski 等不等式推出？

---

## 一、定义：从可积函数到等价类

设 $(X,\mathcal{M},\mu)$ 为测度空间，$E \in \mathcal{M}$。

### 1. $L^p(E)$ 的定义

当 $1 \le p < \infty$ 时，定义
$$
L^p(E)
=
\left\{
f \text{ 为 } E \text{ 上可测函数} \;\middle|\;
\int_E |f|^p \, d\mu < \infty
\right\}\bigg/\sim,
$$
其中 $f \sim g$ 表示 $f=g$ 几乎处处成立。

对应的范数定义为
$$
\|f\|_{L^p(E)}
=
\left( \int_E |f|^p \, d\mu \right)^{1/p}.
$$

当 $p=\infty$ 时，定义
$$
L^\infty(E)
=
\left\{
f \text{ 为 } E \text{ 上可测函数} \;\middle|\;
|f(x)| \le M \text{ a.e. for some } M<\infty
\right\}\bigg/\sim,
$$
其范数是**本性上确界**
$$
\|f\|_{L^\infty(E)}
=
\operatorname*{ess\,sup}_{x\in E} |f(x)|.
$$

<KnowledgeCard type="info" title="为什么要按“几乎处处相等”取等价类">
在 Lebesgue 理论里，零测集上的改动通常不影响积分值与估计结果。因此 $L^p$ 空间真正关心的不是逐点函数值，而是“除去零测集后”的整体行为。
</KnowledgeCard>

### 2. 最基本的例子

1. 若 $A \subset E$ 可测，则示性函数 $\chi_A \in L^p(E)$ 当且仅当 $\mu(A)<\infty$，且
$$
\|\chi_A\|_p = \mu(A)^{1/p}.
$$
2. 常数函数 $1$ 属于 $L^p(E)$ 当且仅当 $\mu(E)<\infty$。
3. 若 $f \in L^p(E)$ 且 $|g|\le |f|$ a.e.，则 $g \in L^p(E)$。

### 3. $p<1$ 时为什么不纳入标准 $L^p$ 范数理论

当 $0<p<1$ 时，积分量 $\left(\int |f|^p\right)^{1/p}$ 仍可定义，但它不满足三角不等式，只给出**拟范数**而非真正范数。因此标准教材讨论 Banach 空间结构时通常从 $p=1$ 开始。

<KnowledgeCard type="warning" title="记忆要点">
$1 \le p \le \infty$ 时，$L^p$ 才是分析里常说的“范数空间”；其中 $L^2$ 还带有内积结构，是 Hilbert 空间。
</KnowledgeCard>

---

## 二、典型判别：哪些函数属于 $L^p$

### 1. 原点奇性与无穷远衰减

在 $(0,1)$ 上，幂函数 $f(x)=x^{-\alpha}$ 的 $L^p$ 可积性由积分
$$
\int_0^1 x^{-\alpha p}\,dx
$$
决定，因此
$$
x^{-\alpha}\in L^p(0,1)
\iff
\alpha p < 1.
$$

在 $(1,\infty)$ 上，幂函数 $g(x)=x^{-\beta}$ 的 $L^p$ 可积性由
$$
\int_1^\infty x^{-\beta p}\,dx
$$
决定，因此
$$
x^{-\beta}\in L^p(1,\infty)
\iff
\beta p > 1.
$$

这说明 $L^p$ 判别的本质是：局部奇性是否足够弱、无穷远衰减是否足够快。

### 2. 有限测度空间中的嵌入关系

若 $\mu(E)<\infty$ 且 $1\le p<q<\infty$，则
$$
L^q(E)\subset L^p(E),
\qquad
\|f\|_p \le \mu(E)^{\frac{1}{p}-\frac{1}{q}} \|f\|_q.
$$

当 $q=\infty$ 时，上式变为
$$
\|f\|_p \le \mu(E)^{1/p}\|f\|_\infty.
$$

证明来自 Hölder 不等式：把 $|f|^p$ 与常数函数 $1$ 配对即可。

<KnowledgeCard type="success" title="有限测度空间里的直观图像">
在有限区间或有限测度区域上，指数越大的 $L^q$ 要求通常越强，因此 $L^q$ 中的函数自动属于较“宽松”的 $L^p$。
</KnowledgeCard>

### 3. 无限测度空间里嵌入可能失败

上面的包含关系不能机械搬到无限测度空间。例如在 $(1,\infty)$ 上，取
$$
f(x)=x^{-1/p}.
$$
则
$$
|f(x)|^p = x^{-1},
$$
故 $f\notin L^p(1,\infty)$；但若 $q>p$，则
$$
|f(x)|^q = x^{-q/p},
$$
因 $q/p>1$，可知 $f\in L^q(1,\infty)$。

所以在无限测度空间上，$L^q \subset L^p$ 不再普遍成立。

---

## 三、两大核心不等式：Hölder 与 Minkowski

### 1. Hölder 不等式

设 $1<p,q<\infty$ 且
$$
\frac{1}{p}+\frac{1}{q}=1.
$$
若 $f\in L^p(E)$、$g\in L^q(E)$，则
$$
\int_E |fg|\,d\mu
\le
\|f\|_p \|g\|_q.
$$

它说明 $L^p$ 与 $L^q$ 之间具有天然的对偶配对关系。

#### 证明思路

先用 Young 不等式
$$
ab\le \frac{a^p}{p}+\frac{b^q}{q},
\qquad a,b\ge 0,
$$
再对归一化函数
$$
u=\frac{|f|}{\|f\|_p},\qquad v=\frac{|g|}{\|g\|_q}
$$
应用它，得到
$$
uv \le \frac{u^p}{p}+\frac{v^q}{q}.
$$
两边积分即有
$$
\int_E \frac{|fg|}{\|f\|_p\|g\|_q}\,d\mu \le \frac{1}{p}+\frac{1}{q}=1.
$$
整理即得 Hölder 不等式。

### 2. Minkowski 不等式

设 $1\le p < \infty$，若 $f,g\in L^p(E)$，则
$$
\|f+g\|_p \le \|f\|_p+\|g\|_p.
$$

这就是 $L^p$ 范数的三角不等式。

#### 证明思路

当 $p=1$ 时结论显然。若 $p>1$，记共轭指数 $q=\frac{p}{p-1}$，则
$$
\|f+g\|_p^p
=
\int_E |f+g|\,|f+g|^{p-1}\,d\mu.
$$
由三角不等式和 Hölder 不等式，
$$
\|f+g\|_p^p
\le
\int_E |f|\,|f+g|^{p-1}\,d\mu

+\int_E |g|\,|f+g|^{p-1}\,d\mu
$$
$$
\le
\|f\|_p \, \||f+g|^{p-1}\|_q
+
\|g\|_p \, \||f+g|^{p-1}\|_q.
$$
而
$$
\||f+g|^{p-1}\|_q
=
\left(\int_E |f+g|^{(p-1)q}\,d\mu\right)^{1/q}
=
\|f+g\|_p^{p-1},
$$
故
$$
\|f+g\|_p^p
\le
(\|f\|_p+\|g\|_p)\|f+g\|_p^{p-1}.
$$
若 $\|f+g\|_p\neq 0$，两边约去即得结论。

---

## 四、完备性：为什么 $L^p$ 是 Banach 空间

### 1. 完备性的结论

<KnowledgeCard type="success" title="定理：$L^p$ 的完备性">
对任意测度空间与任意 $1\le p\le\infty$，空间 $L^p(E)$ 都是 Banach 空间；特别地，$L^2(E)$ 还是 Hilbert 空间，其内积为
$$
\langle f,g\rangle=\int_E f\overline{g}\,d\mu.
$$
</KnowledgeCard>

完备性的含义是：只要函数列在 $L^p$ 范数下是 Cauchy 的，它就不会“跑出”这个空间，必定收敛到某个仍属于 $L^p$ 的极限。

### 2. $1\le p<\infty$ 的证明主线

设 $\{f_n\}$ 是 $L^p(E)$ 中的 Cauchy 列。可递推选取子列 $\{f_{n_k}\}$ 满足
$$
\|f_{n_{k+1}}-f_{n_k}\|_p \le 2^{-k}.
$$
记
$$
g_k = f_{n_{k+1}}-f_{n_k},
\qquad
G_m = \sum_{k=1}^m |g_k|.
$$
由 Minkowski 不等式，
$$
\|G_m\|_p \le \sum_{k=1}^m \|g_k\|_p \le \sum_{k=1}^\infty 2^{-k} < \infty.
$$
因此 $\{G_m\}$ 在 $L^p$ 中有界，且单调增加。由单调收敛思想可得到
$$
G=\sum_{k=1}^\infty |g_k| \in L^p(E),
$$
于是级数 $\sum g_k$ 在几乎处处意义下绝对收敛。令
$$
f = f_{n_1} + \sum_{k=1}^\infty g_k.
$$
则
$$
|f-f_{n_m}| \le \sum_{k=m}^\infty |g_k|
$$
几乎处处成立，并有
$$
\|f-f_{n_m}\|_p \le \sum_{k=m}^\infty 2^{-k}\to 0.
$$
所以子列 $f_{n_m}\to f$ 于 $L^p$。再利用原序列是 Cauchy 的，即可推出整个 $f_n\to f$ 于 $L^p$。

### 3. 为什么这件事很重要

完备性是现代分析的工作平台：

1. 极限过程不会离开函数空间；
2. 最优化、偏微分方程、傅里叶分析中的“取极限”才有意义；
3. 很多存在性定理最终都归结为在完备空间里构造 Cauchy 列。

---

## 五、收敛方式辨析：a.e.、测度收敛与 $L^p$ 收敛

### 1. 三种常见收敛

设 $f_n,f$ 为 $E$ 上可测函数。

1. **几乎处处收敛**：若存在零测集 $N$，使得对所有 $x\in E\setminus N$ 都有 $f_n(x)\to f(x)$，记作
$$
f_n \to f \quad \text{a.e.}
$$
2. **依测度收敛**：若对任意 $\varepsilon>0$，
$$
\mu\{x\in E: |f_n(x)-f(x)|>\varepsilon\}\to 0,
$$
则称 $f_n\to f$ in measure。
3. **在 $L^p$ 中收敛**：若
$$
\|f_n-f\|_p \to 0,
$$
则称 $f_n \to f$ in $L^p$。

### 2. 重要蕴含关系

#### (1) $L^p$ 收敛推出依测度收敛

由 Chebyshev 不等式，
$$
\mu\{|f_n-f|>\varepsilon\}
\le
\frac{1}{\varepsilon^p}\int_E |f_n-f|^p\,d\mu
=
\frac{\|f_n-f\|_p^p}{\varepsilon^p}.
$$
只要 $\|f_n-f\|_p\to 0$，右端就趋于 0。

#### (2) a.e. 收敛加统一控制可推出 $L^p$ 收敛

若 $f_n\to f$ a.e.，且存在 $g\in L^p(E)$ 满足
$$
|f_n|\le g \quad \text{a.e. for all } n,
$$
则由受控收敛定理，
$$
\|f_n-f\|_p^p = \int_E |f_n-f|^p\,d\mu \to 0.
$$

#### (3) 在有限测度空间上，$L^q$ 收敛可推出 $L^p$ 收敛

若 $\mu(E)<\infty$ 且 $q>p$，则由嵌入估计
$$
\|f_n-f\|_p
\le
\mu(E)^{\frac{1}{p}-\frac{1}{q}}
\|f_n-f\|_q.
$$
因此 $L^q$ 收敛比 $L^p$ 收敛更强。

### 3. 反向蕴含一般都不成立

<KnowledgeCard type="warning" title="不要把几种收敛混为一谈">
a.e. 收敛不必推出 $L^p$ 收敛；依测度收敛也不必推出 a.e. 收敛；依测度收敛同样不必推出 $L^p$ 收敛。分析题里常见陷阱，恰恰就在于忽略了额外条件。
</KnowledgeCard>

下面的例题会专门展示这些差异。

---

## 六、教材级例题

### 例 1：判别幂函数属于哪些 $L^p$ 空间

判别函数 $f(x)=x^{-\alpha}$ 在 $(0,1)$ 上何时属于 $L^p$；判别 $g(x)=x^{-\beta}$ 在 $(1,\infty)$ 上何时属于 $L^p$。

<details>
<summary>点击查看解析</summary>

由定义，
$$
f\in L^p(0,1)
\iff
\int_0^1 x^{-\alpha p}\,dx < \infty.
$$
而
$$
\int_0^1 x^{-r}\,dx < \infty \iff r<1,
$$
故
$$
x^{-\alpha}\in L^p(0,1) \iff \alpha p<1.
$$

同理，
$$
g\in L^p(1,\infty)
\iff
\int_1^\infty x^{-\beta p}\,dx < \infty
\iff
\beta p>1.
$$

这给出了原点奇性与无穷远衰减的标准临界指数。
</details>

### 例 2：由 Hölder 推出有限区间上的 $L^p \subset L^1$

设 $\mu(E)<\infty$ 且 $1<p<\infty$。证明若 $f\in L^p(E)$，则 $f\in L^1(E)$，并且
$$
\|f\|_1 \le \mu(E)^{1-\frac{1}{p}}\|f\|_p.
$$

<details>
<summary>点击查看证明</summary>

记共轭指数为 $q=\frac{p}{p-1}$。对 $|f|$ 与常数函数 $1$ 应用 Hölder 不等式：
$$
\int_E |f|\,d\mu
\le
\left(\int_E |f|^p\,d\mu\right)^{1/p}
\left(\int_E 1^q\,d\mu\right)^{1/q}.
$$
而
$$
\left(\int_E 1^q\,d\mu\right)^{1/q}
=
\mu(E)^{1/q}
=
\mu(E)^{1-\frac{1}{p}}.
$$
因此
$$
\|f\|_1 \le \mu(E)^{1-\frac{1}{p}}\|f\|_p.
$$
证毕。
</details>

### 例 3：几乎处处收敛但不在 $L^p$ 中收敛

在 $(0,1)$ 上取
$$
f_n(x)=n^{1/p}\chi_{(0,\,1/n)}(x).
$$
证明 $f_n\to 0$ 几乎处处，也依测度收敛到 0，但不在 $L^p$ 中收敛到 0。

<details>
<summary>点击查看解析</summary>

对任意固定 $x>0$，当 $n>1/x$ 时，$x\notin (0,1/n)$，故 $f_n(x)=0$。因此
$$
f_n(x)\to 0 \quad \text{a.e.}
$$

再看依测度收敛。对任意 $\varepsilon>0$，当 $n$ 充分大时 $n^{1/p}>\varepsilon$，于是
$$
\mu\{|f_n|>\varepsilon\} = \mu(0,1/n)=\frac{1}{n}\to 0.
$$

但其 $L^p$ 范数为
$$
\|f_n\|_p^p
=
\int_0^1 n \chi_{(0,1/n)}(x)\,dx
=
1.
$$
所以
$$
\|f_n-0\|_p = 1,
$$
并不趋于 0。

这说明“尖峰越来越高、支集越来越窄”的函数列可以点态消失，却保留固定的 $L^p$ 质量。
</details>

### 例 4：$x^n$ 的收敛方式

在 $[0,1]$ 上令 $f_n(x)=x^n$。讨论它对 0 的几种收敛方式。

<details>
<summary>点击查看解析</summary>

对每个 $x\in[0,1)$，有 $x^n\to 0$；在 $x=1$ 处恒为 1。由于 $\{1\}$ 是零测集，所以
$$
f_n\to 0 \quad \text{a.e. on } [0,1].
$$

对任意 $1\le p<\infty$，
$$
\|f_n\|_p^p = \int_0^1 x^{np}\,dx = \frac{1}{np+1}\to 0,
$$
故
$$
f_n\to 0 \quad \text{in } L^p.
$$

于是它也依测度收敛到 0。但它并不一致收敛到 0，因为
$$
\sup_{x\in[0,1]} |x^n| = 1.
$$

这说明 $L^p$ 收敛比一致收敛弱得多。
</details>

### 例 5：依测度收敛但不几乎处处收敛的经典样本

在 $[0,1]$ 上考虑“打字机序列”：
$$
\chi_{[0,1]},
\chi_{[0,1/2)},
\chi_{[1/2,1)},
\chi_{[0,1/4)},
\chi_{[1/4,1/2)},
\chi_{[1/2,3/4)},
\chi_{[3/4,1)},\dots
$$
也就是说，第 $m$ 轮把 $[0,1)$ 分成 $2^m$ 个长度为 $2^{-m}$ 的小区间，并依次取其示性函数。

<details>
<summary>点击查看说明</summary>

任意一项都是某个长度趋于 0 的区间的示性函数，因此对每个固定 $\varepsilon\in(0,1)$，
$$
\mu\{|f_n|>\varepsilon\}
=
\mu(\text{对应区间})
\to 0.
$$
故 $f_n\to 0$ in measure。

但对任意一点 $x\in[0,1)$，在每一轮里总有一个区间包含它，因此 $f_n(x)=1$ 会无限多次发生；同样也会无限多次取 0。故逐点极限不存在，更不可能几乎处处收敛到 0。

这说明依测度收敛比几乎处处收敛弱。
</details>

---

## 七、折叠练习

### 练习 1

设 $A,B\subset E$ 可测，证明
$$
\|\chi_A-\chi_B\|_1 = \mu(A\triangle B),
$$
其中 $A\triangle B$ 是对称差。

<details>
<summary>点击查看答案</summary>

因为 $\chi_A-\chi_B$ 只可能取值 $1,-1,0$，且
$$
|\chi_A-\chi_B| = \chi_{A\triangle B}.
$$
所以
$$
\|\chi_A-\chi_B\|_1
=
\int_E |\chi_A-\chi_B|\,d\mu
=
\int_E \chi_{A\triangle B}\,d\mu
=
\mu(A\triangle B).
$$
</details>

### 练习 2

设 $\mu(E)<\infty$ 且 $1\le p<\infty$，证明 $L^\infty(E)\subset L^p(E)$，并写出范数估计。

<details>
<summary>点击查看答案</summary>

若 $f\in L^\infty(E)$，则 $|f|\le \|f\|_\infty$ a.e.，故
$$
\int_E |f|^p\,d\mu
\le
\|f\|_\infty^p \mu(E)<\infty.
$$
因此 $f\in L^p(E)$，且
$$
\|f\|_p \le \mu(E)^{1/p}\|f\|_\infty.
$$
</details>

### 练习 3

在 $(0,1)$ 上，讨论函数
$$
f_\alpha(x)=\frac{1}{x^\alpha (\log \frac{e}{x})^2}
$$
属于哪些 $L^p(0,1)$。

<details>
<summary>点击查看答案</summary>

核心仍看
$$
\int_0^1 \frac{dx}{x^{\alpha p}(\log \frac{e}{x})^{2p}}.
$$
若 $\alpha p<1$，则显然可积；若 $\alpha p>1$，则不可积；临界情形 $\alpha p=1$ 时，积分化为
$$
\int_0^1 \frac{dx}{x(\log \frac{e}{x})^{2p}},
$$
代换 $t=\log \frac{e}{x}$ 可得
$$
\int_1^\infty t^{-2p}\,dt,
$$
因 $2p>1$ 对所有 $p\ge 1$ 都成立，故临界时仍可积。

所以结论是
$$
f_\alpha \in L^p(0,1) \iff \alpha p \le 1.
$$
</details>

### 练习 4

构造一个在 $(0,1)$ 上依测度收敛到 0、但不在 $L^1$ 中收敛到 0 的函数列。

<details>
<summary>点击查看答案</summary>

可取
$$
f_n(x)=n\chi_{(0,1/n)}(x).
$$
对任意 $\varepsilon>0$，有
$$
\mu\{|f_n|>\varepsilon\}=\frac{1}{n}\to 0,
$$
所以 $f_n\to 0$ in measure。

但
$$
\|f_n\|_1 = \int_0^1 n\chi_{(0,1/n)}\,dx = 1,
$$
故不在 $L^1$ 中收敛到 0。
</details>

---

## 八、与前后章节的衔接

$L^p$ 空间把前面章节中的若干核心概念统一了起来：

1. **测度论** 给出可测集、零测集与 a.e. 语言；
2. **Lebesgue 积分** 允许定义 $\int |f|^p$，从而引出范数；
3. **收敛定理** 为 $L^p$ 收敛提供判据；
4. **不等式理论** 则把空间结构转化为可计算的估计工具。

继续学习时，建议把本章与以下内容联读：

- [返回 Lebesgue 积分章节](./lebesgue-integral)
- [回顾 Lebesgue 测度章节](./measure-theory)
- [延伸阅读：分析学不等式专题](/docs/academic-math/analysis/inequalities)

---

## 九、总结

$L^p$ 空间的主线可以概括为：

1. 用 $\int |f|^p$ 衡量函数的整体大小；
2. 用 Hölder 与 Minkowski 建立范数与估计体系；
3. 用完备性保证极限过程停留在空间内部；
4. 用 a.e.、依测度、$L^p$ 三种收敛语言刻画不同层次的极限行为。

掌握本章后，阅读泛函分析、调和分析、偏微分方程和概率论中的条件期望、随机变量矩估计时，会顺畅得多。
