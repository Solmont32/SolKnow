---
title: 数学分析前四章专题练习
---

# 数学分析前四章专题练习（实数、数列、函数极限、连续）

本页对标《数学分析》前四章，按“基础-提高-挑战”配置多题训练。每题均支持点击展开过程与答案。

---

## 练习 1：[基础] 上下确界

设 $A=\{1-\frac1n:n\in\mathbb{N}_+\}$，求 $\sup A,\inf A$。

<details>

<summary>点击查看解析与答案</summary>

由 $1-\frac1n<1$ 且可任意逼近 1，得 $\sup A=1$；当 $n=1$ 时取到 0，故 $\inf A=0$。

</details>

---

## 练习 2：[基础] 阿基米德性质应用

证明：对任意 $x>0$，存在 $n\in\mathbb{N}$ 使 $\frac1n<x$。

<details>

<summary>点击查看解析与答案</summary>

由阿基米德性质，存在 $n>1/x$，两边取倒数得 $1/n<x$。

</details>

---

## 练习 3：[基础] 数列极限定义法

证明 $\lim_{n\to\infty}\frac{2n-3}{n+4}=2$。

<details>

<summary>点击查看解析与答案</summary>

$$\left|\frac{2n-3}{n+4}-2\right|=\frac{11}{n+4}<\frac{11}{n}.$$

给定 $\epsilon>0$，取 $N>11/\epsilon$，则当 $n>N$ 时误差小于 $\epsilon$。

</details>

---

## 练习 4：[基础] 函数极限

求

$$\lim_{x\to0}\frac{\sqrt{1+2x}-1}{x}. $$

<details>

<summary>点击查看解析与答案</summary>

有理化：

$$\frac{\sqrt{1+2x}-1}{x}=\frac{2}{\sqrt{1+2x}+1}\to1.$$

</details>

---

## 练习 5：[提高] Stolz 定理

求

$$\lim_{n\to\infty}\frac{1+3+\cdots+(2n-1)}{n^2}. $$

<details>

<summary>点击查看解析与答案</summary>

令 $X_n=\sum_{k=1}^n(2k-1),Y_n=n^2$，则

$$\lim\frac{X_n}{Y_n}=\lim\frac{2n-1}{n^2-(n-1)^2}=\lim\frac{2n-1}{2n-1}=1.$$

</details>

---

## 练习 6：[提高] 连续性判定

讨论函数

$$
f(x)=\begin{cases}
\frac{\sin x}{x},&x\ne0,\\
1,&x=0
\end{cases}
$$

在 $x=0$ 处是否连续。

<details>

<summary>点击查看解析与答案</summary>

因 $\lim_{x\to0}\frac{\sin x}{x}=1=f(0)$，故在 0 处连续。

</details>

---

## 练习 7：[提高] 复合函数定义域

求函数

$$g(x)=\ln\big(1-\sqrt{x-1}\big)$$

的定义域。

<details>

<summary>点击查看解析与答案</summary>

需满足 $x-1\ge0$ 且 $1-\sqrt{x-1}>0$。
后者等价于 $\sqrt{x-1}<1\Rightarrow x<2$。
故定义域 $[1,2)$。

</details>

---

## 练习 8：[挑战] 夹逼与路径思想

证明：

$$\lim_{x\to0}x\sin\frac1x=0. $$

<details>

<summary>点击查看解析与答案</summary>

由 $|\sin(1/x)|\le1$，得

$$-|x|\le x\sin\frac1x\le |x|.$$

两端在 $x\to0$ 时趋于 0，故中间极限为 0。

</details>

---

## 练习 9：[挑战] 一致连续性辨析

判断 $f(x)=x^2$ 在 $(0,+\infty)$ 上是否一致连续，并说明理由。

<details>

<summary>点击查看解析与答案</summary>

取 $x_n=n,y_n=n+\frac1n$，则

$$|x_n-y_n|=\frac1n\to0,$$

但

$$|f(x_n)-f(y_n)|=\left|n^2-\left(n+\frac1n\right)^2\right|=\left| -2-\frac1{n^2}\right|\to2\ne0.$$

故不一致连续。

</details>

---

## 练习 10：[挑战] 零点存在性

证明方程 $x^5+x-1=0$ 在 $(0,1)$ 内至少有一根。

<details>

<summary>点击查看解析与答案</summary>

设 $h(x)=x^5+x-1$，多项式在 $[0,1]$ 上连续。

$h(0)=-1<0,\ h(1)=1>0$，由介值定理存在 $\xi\in(0,1)$ 使 $h(\xi)=0$。

</details>

---

---
## 练习 11：[挑战] 戴德金分割的判定

设 $A = \{q \in \mathbb{Q} \mid q \le 0 \text{ 或 } q^2 < 2\}, B = \{q \in \mathbb{Q} \mid q > 0 \text{ 且 } q^2 > 2\}$。证明 $(A, B)$ 是 $\mathbb{Q}$ 的一个分割，但其间没有有理数。

<details>

<summary>点击查看解析与答案</summary>

**解析**：
1. **非空性**：$0 \in A, 2 \in B$，均非空。
2. **并集与不相交**：显然 $A \cup B = \mathbb{Q}$ 且 $A \cap B = \emptyset$（因为不存在有理数 $q$ 使 $q^2 = 2$）。
3. **有序性**：若 $a \in A, b \in B$，则 $a < b$ 显然。
4. **无边界有理数**：若存在 $\xi \in \mathbb{Q}$ 是边界，则 $\xi^2 = 2$，这与 $\sqrt{2}$ 是无理数矛盾。
**结论**：这证明了有理数集 $\mathbb{Q}$ 不具有连续性（完备性）。

</details>

---

## 练习 12：[提高] 聚点定理的应用

证明：任何有界序列 $\{a_n\}$ 必存在收敛子列。

<details>

<summary>点击查看解析与答案</summary>

**解析**：
这是 Bolzano-Weierstrass 定理。
1. 数列有界，故其值域 $S = \{a_n\}$ 有界。
2. 若 $S$ 为有限集，则必有某个值重复出现无穷多次，取其对应的子序列即收敛。
3. 若 $S$ 为无限集，由聚点定理，$S$ 至少有一个聚点 $\xi$。
4. 在 $\xi$ 的邻域 $(\xi-1/k, \xi+1/k)$ 内取项 $a_{n_k}$，可构造出收敛于 $\xi$ 的子列。

</details>

---

## 练习 13：[挑战] 有限覆盖定理的应用

证明：闭区间上的连续函数必一致连续。

<details>

<summary>点击查看解析与答案</summary>

**解析**：
1. 设 $f$ 在 $[a, b]$ 上连续。对任意 $\epsilon > 0$ 和 $x \in [a, b]$，存在 $\delta_x$ 使得当 $|y-x| < \delta_x$ 时 $|f(y)-f(x)| < \epsilon/2$。
2. 考虑开覆盖 $H = \{ (x-\delta_x/2, x+\delta_x/2) \mid x \in [a, b] \}$。
3. 由有限覆盖定理，存在有限个点 $x_1, \dots, x_k$ 使得 $[a, b] \subset \bigcup_{i=1}^k (x_i-\delta_i/2, x_i+\delta_i/2)$。
4. 取 $\delta = \min\{\delta_i/2\}$。若 $|x-y| < \delta$，则 $x$ 属于某个 $(x_i-\delta_i/2, x_i+\delta_i/2)$。
5. 通过三角不等式 $|f(x)-f(y)| \le |f(x)-f(x_i)| + |f(x_i)-f(y)| < \epsilon/2 + \epsilon/2 = \epsilon$。
**结论**：一致连续。

</details>

---

## 延伸入口

- [第一章 实数集与函数](/docs/academic-math/analysis/real-numbers-and-functions)
- [第二章 数列极限](/docs/academic-math/analysis/limits)
- [第三章 函数极限](/docs/academic-math/analysis/function-limits)
- [第四章 函数连续性](/docs/academic-math/analysis/continuity)
- [数学分析综合练习库](/docs/exercises/math/analysis)
