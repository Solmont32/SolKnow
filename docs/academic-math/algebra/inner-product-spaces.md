---
title: 内积空间 (Inner Product Spaces)
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";

# 内积空间 (Inner Product Spaces)

内积空间是在线性空间的基础上引入“度量”结构（长度、角度）的数学对象，是泛函分析与量子力学的基础。

## 1. 内积的定义与基本性质

设 $V$ 是实数域 $\mathbb{R}$ 或复数域 $\mathbb{C}$ 上的线性空间。若对任意 $u, v \in V$，都有一个标量 $\langle u, v \rangle$ 满足：

1. **正定性**：$\langle v, v \rangle \ge 0$，且 $\langle v, v \rangle = 0 \iff v = 0$。
2. **共轭对称性**：$\langle u, v \rangle = \overline{\langle v, u \rangle}$。
3. **第一变元线性性**：$\langle au + bv, w \rangle = a\langle u, w \rangle + b\langle v, w \rangle$。

满足上述条件的空间称为**内积空间**。实内积空间常称为 **Euclidean 空间**，复内积空间常称为 **Unitary 空间**。

### 范数与 Cauchy-Schwarz 不等式

由内积诱导的范数（长度）定义为 $\|v\| = \sqrt{\langle v, v \rangle}$。

<KnowledgeCard type="warning" title="重要不等式">
**Cauchy-Schwarz 不等式**：
$$
|\langle u, v \rangle| \le \|u\| \cdot \|v\|
$$
等号成立当且仅当 $u, v$ 线性相关。
</KnowledgeCard>

## 2. 正交性与 Gram-Schmidt 正交化

- **正交**：若 $\langle u, v \rangle = 0$，则称 $u, v$ 正交，记作 $u \perp v$。
- **正交基**：基中向量两两正交。
- **标准正交基 (Orthonormal Basis)**：两两正交且长度均为 1 的基。

### Gram-Schmidt 过程

设 $\{v_1, \dots, v_n\}$ 是 $V$ 的一组基，构造正交基 $\{u_1, \dots, u_n\}$：

1. $u_1 = v_1$
2. $u_2 = v_2 - \frac{\langle v_2, u_1 \rangle}{\|u_1\|^2}u_1$
3. $u_k = v_k - \sum_{j=1}^{k-1} \frac{\langle v_k, u_j \rangle}{\|u_j\|^2}u_j$

最后单位化：$e_i = \frac{u_i}{\|u_i\|}$。

### 例题 1：多项式空间的正交化

在 $P_2(\mathbb{R})$ 上定义内积 $\langle p, q \rangle = \int_{-1}^1 p(x)q(x)dx$。将基 $\{1, x, x^2\}$ 正交化。

<details>
<summary>点击查看解答</summary>

1. $u_1 = 1$。
2. $u_2 = x - \frac{\int_{-1}^1 x \cdot 1 dx}{\int_{-1}^1 1^2 dx} \cdot 1 = x - 0 = x$。
3. $u_3 = x^2 - \frac{\int_{-1}^1 x^2 \cdot 1 dx}{\int_{-1}^1 1^2 dx} \cdot 1 - \frac{\int_{-1}^1 x^2 \cdot x dx}{\int_{-1}^1 x^2 dx} \cdot x$
   - $\int_{-1}^1 x^2 dx = \frac{2}{3}$，$\int_{-1}^1 1 dx = 2$，故第一项系数为 $\frac{1}{3}$。
   - $\int_{-1}^1 x^3 dx = 0$，故第二项系数为 0。
   - $u_3 = x^2 - \frac{1}{3}$。

得到著名的 **Legendre 多项式** 前三项（未单位化）。

</details>

## 3. 正交变换与 Unitary 变换

- **正交变换**（实）：保持内积不变的线性变换 $T$，其矩阵满足 $A^TA = I$。
- **Unitary 变换**（复）：保持内积不变，其矩阵满足 $A^*A = I$。

性质：

- 保持向量长度不变。
- 特征值的模均为 1。
- 不同特征值的特征向量必正交。

## 4. 特征值理论：谱定理 (Spectral Theorem)

内积空间中最精妙的结论是关于对称/厄米矩阵的对角化。

- **对称矩阵**（实）：$A = A^T$。
- **Hermitian 矩阵**（复）：$A = A^*$。

<KnowledgeCard type="info" title="谱定理">
实对称矩阵（或 Hermitian 矩阵）的特征值全为实数，且必存在标准正交基使其对角化。
</KnowledgeCard>

### 例题 2：正交对角化

设 $A = \begin{pmatrix} 1 & 2 \\ 2 & 1 \end{pmatrix}$，求正交矩阵 $P$ 使 $P^TAP$ 为对角阵。

<details>
<summary>点击查看解答</summary>

1. **求特征值**：$\det(\lambda I - A) = (\lambda-1)^2 - 4 = \lambda^2 - 2\lambda - 3 = (\lambda-3)(\lambda+1)$。
   - $\lambda_1 = 3, \lambda_2 = -1$。
2. **求特征向量**：
   - $\lambda_1 = 3$：$(A-3I)x=0 \Rightarrow \begin{pmatrix} -2 & 2 \\ 2 & -2 \end{pmatrix}x=0 \Rightarrow x_1 = \begin{pmatrix} 1 \\ 1 \end{pmatrix}$。单位化 $e_1 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ 1 \end{pmatrix}$。
   - $\lambda_2 = -1$：$(A+I)x=0 \Rightarrow \begin{pmatrix} 2 & 2 \\ 2 & 2 \end{pmatrix}x=0 \Rightarrow x_2 = \begin{pmatrix} 1 \\ -1 \end{pmatrix}$。单位化 $e_2 = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 \\ -1 \end{pmatrix}$。
3. **结论**：$P = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$，则 $P^TAP = \begin{pmatrix} 3 & 0 \\ 0 & -1 \end{pmatrix}$。
</details>

## 5. 配套练习

### 练习 1：Cauchy-Schwarz 的应用

证明：对任意正实数 $a, b, c$，满足 $(a+b+c)(\frac{1}{a} + \frac{1}{b} + \frac{1}{c}) \ge 9$。

<details>
<summary>点击查看解答</summary>

在 $\mathbb{R}^3$ 中取向量 $u = (\sqrt{a}, \sqrt{b}, \sqrt{c})$ 和 $v = (\frac{1}{\sqrt{a}}, \frac{1}{\sqrt{b}}, \frac{1}{\sqrt{c}})$。
由 Cauchy-Schwarz 不等式：

$$
\langle u, v \rangle^2 \le \|u\|^2 \|v\|^2
$$

其中 $\langle u, v \rangle = \sqrt{a}\cdot\frac{1}{\sqrt{a}} + \dots = 1+1+1=3$。
$\|u\|^2 = a+b+c$，$\|v\|^2 = \frac{1}{a} + \frac{1}{b} + \frac{1}{c}$。
故 $3^2 \le (a+b+c)(\frac{1}{a} + \frac{1}{b} + \frac{1}{c})$，即得证。

</details>

### 练习 2：正交矩阵判定

判断矩阵 $A = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$ 是否为正交矩阵。

<details>
<summary>点击查看解答</summary>

计算 $A^TA$：

$$
\begin{pmatrix} \cos\theta & \sin\theta \\ -\sin\theta & \cos\theta \end{pmatrix} \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix} = \begin{pmatrix} \cos^2\theta+\sin^2\theta & 0 \\ 0 & \sin^2\theta+\cos^2\theta \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}
$$

故 $A$ 是正交矩阵。它在几何上表示平面上的旋转。

</details>

### 练习 3：Hermitian 矩阵性质

设 $A$ 是 Hermitian 矩阵（$A = A^*$）。证明其特征值必为实数。

<details>
<summary>点击查看解答</summary>

设 $Ax = \lambda x, x \neq 0$。
则 $\langle Ax, x \rangle = \langle \lambda x, x \rangle = \lambda \langle x, x \rangle = \lambda \|x\|^2$。
又因为 $\langle Ax, x \rangle = \langle x, A^*x \rangle = \langle x, Ax \rangle = \langle x, \lambda x \rangle = \bar{\lambda} \langle x, x \rangle = \bar{\lambda} \|x\|^2$。
由于 $\|x\|^2 \neq 0$，故 $\lambda = \bar{\lambda}$，说明 $\lambda$ 是实数。

</details>

前往练习库：[/docs/exercises/math/algebra](/docs/exercises/math/algebra)
