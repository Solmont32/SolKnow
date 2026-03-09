---
title: 实变函数专题练习 (Real Analysis Exercises)
description: 围绕可测性、收敛定理与 Lp 估计的分层训练题库
---

# 实变函数专题练习

本页服务于实变函数学习路径三站内容：

1. Lebesgue 测度
2. Lebesgue 积分与收敛定理
3. $L^p$ 空间与估计

所有题目均采用“答案折叠”形式，先独立作答再展开对照。

---

## A. 可测性与零测集

### A1（基础）可数集零测 {#ra-a1}

证明：任意可数集 $E\subset \mathbb{R}$ 都是零测集。

<details>

<summary>点击查看过程与答案</summary>

设 $E=\{x_n\}_{n\ge 1}$。给定 $\varepsilon>0$，取

$$

I_n=\left(x_n-\frac{\varepsilon}{2^{n+2}},x_n+\frac{\varepsilon}{2^{n+2}}\right).


$$

则 $E\subset \bigcup_{n=1}^{\infty}I_n$，且

$$

\sum_{n=1}^{\infty}|I_n|
=\sum_{n=1}^{\infty}\frac{\varepsilon}{2^{n+1}}
<\varepsilon.


$$

故 $m(E)=0$。

</details>

### A2（基础）零测集的子集 {#ra-a2}

证明：若 $N$ 为零测集，任意 $A\subset N$ 都 Lebesgue 可测且 $m(A)=0$。

<details>

<summary>点击查看过程与答案</summary>

由单调性 $m^*(A)\le m^*(N)=0$，故 $m^*(A)=0$。外测度为零的集合满足 Carathéodory 条件，因此可测且测度为零。

</details>

### A3（提高）Cantor 集测度 {#ra-a3}

证明 Cantor 集 $C$ 满足 $m(C)=0$，并解释为何“不可数”与“零测”不矛盾。

<details>

<summary>点击查看过程与答案</summary>

第 $n$ 步保留长度为 $(2/3)^n$，且 $C$ 包含于每一步保留集合，故

$$

m(C)\le (2/3)^n,\quad \forall n.


$$

令 $n\to\infty$ 得 $m(C)=0$。  
不可数描述“基数大小”，测度描述“几何长度”，二者是不同尺度。

</details>

---

## B. 收敛定理与积分交换

### B1（基础）MCT 直接应用 {#ra-b1}

设 $f_n(x)=x^n\chi_{[0,1]}(x)$。求

$$

\lim_{n\to\infty}\int_0^1\sum_{k=0}^n x^k\,dx.


$$

<details>

<summary>点击查看过程与答案</summary>

记 $g_n(x)=\sum_{k=0}^n x^k$，则 $g_n\uparrow g=\frac{1}{1-x}$（在 $[0,1)$ 上）。  
由于 $\int_0^1\frac{1}{1-x}\,dx$ 发散，按单调收敛定理：

$$

\lim_{n\to\infty}\int_0^1 g_n\,dx
=\int_0^1 g\,dx
=+\infty.


$$

</details>

### B2（基础）Fatou 引理判断 {#ra-b2}

设 $f_n\ge 0$ 可测，且 $\int f_n\le 2$。证明

$$

\int \liminf_{n\to\infty} f_n \le 2.


$$

<details>

<summary>点击查看过程与答案</summary>

由 Fatou 引理：

$$

\int \liminf f_n \le \liminf \int f_n \le 2.


$$

证毕。

</details>

### B3（提高）DCT 交换极限与积分 {#ra-b3}

计算

$$

\lim_{n\to\infty}\int_0^1\frac{x}{1+n^2x^2}\,dx.


$$

<details>

<summary>点击查看过程与答案</summary>

逐点极限为 $0$。并且

$$

0\le \frac{x}{1+n^2x^2}\le x,\quad x\in[0,1],


$$

而 $x\in L^1[0,1]$。由 DCT，

$$

\lim_{n\to\infty}\int_0^1\frac{x}{1+n^2x^2}\,dx
=\int_0^1 0\,dx=0.


$$

</details>

### B4（挑战）a.e. 收敛但非 $L^1$ 收敛 {#ra-b4}

在 $(0,1)$ 上构造 $f_n\to 0$ a.e.，但 $\|f_n\|_1\nrightarrow 0$ 的例子。

<details>

<summary>点击查看过程与答案</summary>

取

$$

f_n(x)=n\chi_{(0,1/n)}(x).


$$

对任意固定 $x>0$，当 $n>1/x$ 时 $f_n(x) = 0$，故 a.e. 收敛到 0。  
但

$$

\|f_n\|_1=\int_0^1 n\chi_{(0,1/n)}\,dx=1.


$$

故不在 $L^1$ 中收敛到 0。

</details>

### B5（提高）Egorov 定理的应用 {#ra-b5}

证明：若 $m(E) < \infty$，$f_n \to f$ a.e. 且 $f$ 几乎处处有限，则 $f_n \xrightarrow{m} f$（依测度收敛）。

<details>

<summary>点击查看过程与答案</summary>

对任意 $\varepsilon > 0$ 和 $\delta > 0$，由 Egorov 定理，存在 $A \subset E$ 使得 $m(E \setminus A) < \delta$ 且 $f_n \to f$ 在 $A$ 上一致收敛。  
存在 $N$ 使得当 $n > N$ 时，对所有 $x \in A$ 有 $|f_n(x) - f(x)| < \varepsilon$。  
因此 $\{x \in E \mid |f_n(x) - f(x)| \ge \varepsilon\} \subset E \setminus A$。  
故 $m(\{x \in E \mid |f_n(x) - f(x)| \ge \varepsilon\}) \le m(E \setminus A) < \delta$。  
证毕。

</details>

### B6（提高）Lusin 定理与逼近 {#ra-b6}

设 $f$ 在 $[a, b]$ 上可测，证明存在连续函数序列 $\{g_n\}$ 使得 $g_n \to f$ a.e.。

<details>

<summary>点击查看过程与答案</summary>

由 Lusin 定理，对每个 $n$，存在闭集 $F_n$ 使得 $m([a,b] \setminus F_n) < 1/2^n$ 且 $f|_{F_n}$ 连续。  
由 Tietze 扩张定理，存在连续函数 $g_n$ 使得 $g_n|_{F_n} = f|_{F_n}$。  
令 $A = \bigcup_{k=1}^\infty \bigcap_{n=k}^\infty F_n$，由 Borel-Cantelli 引理（或直接构造）知 $m([a,b] \setminus A) = 0$。  
对任意 $x \in A$，当 $n$ 足够大时 $x \in F_n$，故 $g_n(x) = f(x)$。  
结论成立。

</details>

### B7（进阶）MCT 与下降序列 {#ra-b7}

证明：若 $f_n \downarrow f$ a.e. 且 $\int f_1 < \infty$，则 $\int f_n \to \int f$。并说明 $\int f_1 < \infty$ 为何必要。

<details>

<summary>点击查看过程与答案</summary>

令 $g_n = f_1 - f_n$。则 $g_n \ge 0$ 且 $g_n \uparrow (f_1 - f)$。  
由 MCT：$\int (f_1 - f_n) \to \int (f_1 - f)$。  
由积分线性性（因 $\int f_1 < \infty$）：$\int f_1 - \int f_n \to \int f_1 - \int f$。  
从而 $\int f_n \to \int f$。  
反例：$f_n = \chi_{[n, \infty)}$ 在 $\mathbb{R}$ 上，$f_n \downarrow 0$ 但 $\int f_n = \infty \not\to 0$。

</details>

---

## C. $L^p$ 空间与估计

### C1（基础）幂函数可积性 {#ra-c1}

判别 $f(x)=x^{-\alpha}$ 在 $(0,1)$ 上属于 $L^p$ 的条件。

<details>

<summary>点击查看过程与答案</summary>

$$

f\in L^p(0,1)\iff \int_0^1 x^{-\alpha p}\,dx<\infty
\iff \alpha p<1.


$$

</details>

### C2（提高）有限测度空间嵌入 {#ra-c2}

设 $\mu(E)<\infty$，证明 $L^\infty(E)\subset L^p(E)$ 且

$$

\|f\|_p\le \mu(E)^{1/p}\|f\|_\infty.


$$

<details>

<summary>点击查看过程与答案</summary>

由 $|f|\le \|f\|_\infty$ a.e.，得

$$

\int_E |f|^p\,d\mu \le \|f\|_\infty^p\mu(E)<\infty.


$$

开 $p$ 次方即得结论。

</details>

### C3（提高）Hölder 不等式应用 {#ra-c3}

设 $f\in L^2(0,1)$，证明 $f\in L^1(0,1)$ 并给出估计。

<details>

<summary>点击查看过程与答案</summary>

取共轭指数 $2,2$，对 $|f|$ 与 $1$ 应用 Hölder：

$$

\|f\|_1=\int_0^1 |f|\cdot 1
\le \|f\|_2\|1\|_2
=\|f\|_2.


$$

故 $L^2(0,1)\subset L^1(0,1)$。

</details>

### C4（挑战）收敛方式辨析 {#ra-c4}

设 $f_n(x)=x^n$ on $[0,1]$。判断其对 0 的 a.e. 收敛、依测度收敛、$L^p$ 收敛（$1\le p<\infty$）。

<details>

<summary>点击查看过程与答案</summary>

1. a.e. 收敛：在 $[0,1)$ 上趋于 0，$x=1$ 处为 1；故 a.e. 收敛到 0。
2. $L^p$ 收敛：

$$

\|f_n\|_p^p=\int_0^1 x^{np}\,dx=\frac{1}{np+1}\to 0.


$$

故在 $L^p$ 中收敛到 0。  
3. 依测度收敛由 $L^p$ 收敛推出，也成立。

</details>

---

## 使用建议

1. A 组先做完再进入 B 组，建立“可测性 -> 积分 -> 收敛”的主线。
2. B4 与 C4 要重点比较收敛方式差异。
3. 做完后返回三站正文复盘定义与定理证明细节。
