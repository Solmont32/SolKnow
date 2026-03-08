---
title: 实变函数练习：$L^p$ 空间专题
---

# 实变函数练习：$L^p$ 空间专题

本页与实变函数章节联动，按“基础 -> 提高 -> 挑战”组织，所有答案均折叠展示。

---

## A. 基础题

### 练习 A1：可积性阈值

在 $(0,1)$ 上讨论 $f_\alpha(x)=x^{-\alpha}$ 属于 $L^1$ 与 $L^2$ 的条件。

<details>

<summary>点击查看过程与答案</summary>

- $L^1$：$\int_0^1 x^{-\alpha}dx<\infty \iff \alpha<1$；
- $L^2$：$\int_0^1 x^{-2\alpha}dx<\infty \iff \alpha<1/2$。

答案：$f_\alpha\in L^1(0,1)\iff \alpha<1$，$f_\alpha\in L^2(0,1)\iff \alpha<1/2$。

</details>

### 练习 A2：序列在 $L^p$ 中的收敛

设 $f_n=\mathbf{1}_{(0,1/n)}$，判定其在 $L^1(0,1)$ 与 $L^2(0,1)$ 中是否收敛到 0。

<details>

<summary>点击查看过程与答案</summary>

$$

\|f_n\|_1=\int_0^{1/n}1\,dx=\frac1n\to0,\qquad
\|f_n\|_2^2=\int_0^{1/n}1\,dx=\frac1n\to0.


$$

因此在 $L^1$ 与 $L^2$ 中都收敛到 0。

</details>

### 练习 A3：Hölder 快速应用

设 $f\in L^3(0,1)$，$g\in L^{3/2}(0,1)$，证明 $fg\in L^1(0,1)$ 并给出上界。

<details>

<summary>点击查看过程与答案</summary>

由 Hölder（共轭指数 $3$ 与 $3/2$）：

$$

\|fg\|_1\le \|f\|_3\|g\|_{3/2}<\infty.


$$

故 $fg\in L^1(0,1)$。

</details>

---

## B. 提高题

### 练习 B1：有限测度空间中的嵌入

设 $\mu(X)<\infty$，证明 $L^q(X)\subset L^p(X)$（$q>p\ge1$）。

<details>

<summary>点击查看过程与答案</summary>

由 Hölder：

$$

\|f\|_p^p=\int |f|^p\cdot 1
\le \left(\int |f|^q\right)^{p/q}\left(\int 1^{q/(q-p)}\right)^{(q-p)/q}.


$$

化简得

$$

\|f\|_p \le \mu(X)^{1/p-1/q}\|f\|_q.


$$

故嵌入成立。

</details>

### 练习 B2：a.e. 收敛但不 $L^1$ 收敛

在 $(0,1)$ 上定义 $g_n(x)=n\mathbf{1}_{(0,1/n)}(x)$，讨论 $g_n\to0$ 的收敛类型。

<details>

<summary>点击查看过程与答案</summary>

对每个 $x>0$，最终 $x\notin(0,1/n)$，所以 $g_n(x)\to0$ a.e.  
但

$$

\|g_n\|_1=\int_0^{1/n}n\,dx=1,


$$

故不收敛到 0 于 $L^1$。

</details>

### 练习 B3：Minkowski 估计

设 $f,g\in L^p(X)$（$1\le p<\infty$），证明

$$

\|f+g\|_p\le \|f\|_p+\|g\|_p.


$$

<details>

<summary>点击查看过程与答案</summary>

这是 Minkowski 不等式。标准证明把 $|f+g|^p$ 写成 $|f+g||f+g|^{p-1}$，再对两项分别用 Hölder 估计并整理得到结论。

</details>

---

## C. 挑战题

### 练习 C1：测度收敛到 $L^1$ 收敛

设 $f_n\to f$ in measure，且存在 $h\in L^1$ 满足 $|f_n|\le h$ a.e.，证明 $\|f_n-f\|_1\to0$。

<details>

<summary>点击查看过程与答案</summary>

由测度收敛可抽取子列 a.e. 收敛；结合统一支配 $|f_n|\le h$，对该子列应用 DCT 得 $L^1$ 收敛。再用反证法排除原序列不收敛可能，得 $\|f_n-f\|_1\to0$。

</details>

### 练习 C2：$L^2$ 弱收敛与强收敛判据

设 $f_n\rightharpoonup f$ 于 $L^2(X)$，且 $\|f_n\|_2\to\|f\|_2$，证明 $f_n\to f$ 于 $L^2$。

<details>

<summary>点击查看过程与答案</summary>

利用

$$

\|f_n-f\|_2^2
=\|f_n\|_2^2+\|f\|_2^2-2\operatorname{Re}\langle f_n,f\rangle.


$$

弱收敛给出 $\langle f_n,f\rangle\to\langle f,f\rangle=\|f\|_2^2$，再配合范数收敛即可得 $\|f_n-f\|_2^2\to0$。

</details>

---

## 对应章节

- [返回：$L^p$ 空间主章节](../../academic-math/real-analysis/lp-spaces)
- [返回：实变函数专题首页](../../academic-math/real-analysis)
