---
title: Cayley-Hamilton 定理与有理标准形
---

# Cayley-Hamilton 定理与有理标准形

本章聚焦“矩阵多项式消去-循环子空间分解-有理标准形”，用于在一般域上刻画线性算子的代数结构。

## 1. Cayley-Hamilton 定理

设 $A\in M_n(\mathbb{F})$，其特征多项式为
$$
p_A(\lambda)=\det(\lambda I-A).
$$
Cayley-Hamilton 定理指出：
$$
p_A(A)=0.
$$
这给出矩阵的一个显式湮灭多项式，可用于降幂与求逆。

### 例题 1：用 CH 定理降幂
设
$$
A=\begin{pmatrix}1&1\\1&0\end{pmatrix}.
$$
求 $A^5$。

解：
$$
p_A(\lambda)=\lambda^2-\lambda-1,
$$
故
$$
A^2=A+I.
$$
递推得
$$
A^3=2A+I,\ A^4=3A+2I,\ A^5=5A+3I.
$$
所以
$$
A^5=\begin{pmatrix}8&5\\5&3\end{pmatrix}.
$$

## 2. 最小多项式与不变因子

最小多项式 $m_A(x)$ 是满足 $m_A(A)=0$ 的最低次首一多项式，且
$$
m_A(x)\mid p_A(x).
$$
若将 $\mathbb{F}^n$ 视为 $\mathbb{F}[x]$-模，可得到不变因子分解：
$$
d_1(x)\mid d_2(x)\mid\cdots\mid d_t(x),\quad d_t(x)=m_A(x),
$$
并有
$$
\prod_{i=1}^t d_i(x)=p_A(x).
$$

### 例题 2：由不变因子恢复特征多项式
设不变因子为
$$
d_1(x)=x-1,\quad d_2(x)=(x-1)(x+2)^2.
$$
求 $m_A(x)$ 与 $p_A(x)$。

解：最大不变因子即最小多项式：
$$
m_A(x)=d_2(x)=(x-1)(x+2)^2.
$$
特征多项式为不变因子乘积：
$$
p_A(x)=d_1(x)d_2(x)=(x-1)^2(x+2)^2.
$$

## 3. 有理标准形（Frobenius 标准形）

在任意域上，矩阵都相似于若干 companion 块的直和：
$$
R=\operatorname{diag}(C(d_1),\dots,C(d_t)),\quad d_1\mid\cdots\mid d_t.
$$
这就是有理标准形，且由不变因子唯一决定（块次序忽略）。

给定首一多项式
$$
d(x)=x^k+a_{k-1}x^{k-1}+\cdots+a_0,
$$
其 companion 矩阵为
$$
C(d)=\begin{pmatrix}
0&1&0&\cdots&0\\
0&0&1&\cdots&0\\
\vdots& &\ddots&\ddots&\vdots\\
0&\cdots&0&0&1\\
-a_0&-a_1&\cdots&-a_{k-2}&-a_{k-1}
\end{pmatrix}.
$$

### 例题 3：写出有理标准形
设 $A$ 的不变因子为
$$
d_1(x)=x^2+1,\quad d_2(x)=x^2-2x+2.
$$
写出 $A$ 的有理标准形。

解：
$$
R=\operatorname{diag}(C(d_1),C(d_2)).
$$
其中
$$
C(d_1)=\begin{pmatrix}0&1\\-1&0\end{pmatrix},\quad
C(d_2)=\begin{pmatrix}0&1\\-2&2\end{pmatrix}.
$$
故
$$
R=\begin{pmatrix}
0&1&0&0\\
-1&0&0&0\\
0&0&0&1\\
0&0&-2&2
\end{pmatrix}.
$$

## 4. CH 定理应用：矩阵求逆

若 $A$ 可逆，CH 定理可将 $A^{-1}$ 写成 $A$ 的低次多项式。

### 例题 4：用 CH 定理求逆
设
$$
A=\begin{pmatrix}2&1\\1&1\end{pmatrix}.
$$
求 $A^{-1}$。

解：
$$
p_A(\lambda)=\lambda^2-3\lambda+1.
$$
由 CH 定理：
$$
A^2-3A+I=0.
$$
两边右乘 $A^{-1}$：
$$
A-3I+A^{-1}=0\Rightarrow A^{-1}=3I-A.
$$
即
$$
A^{-1}=\begin{pmatrix}1&-1\\-1&2\end{pmatrix}.
$$

## 5. 配套练习（折叠答案）

### 练习 1：CH 定理降幂
设 $A$ 满足 $A^2-4A+3I=0$，求 $A^4$ 关于 $A,I$ 的表达式。

<details>

<summary>点击查看过程与答案</summary>

由 $A^2=4A-3I$，得
$$
A^3=A(4A-3I)=4A^2-3A=4(4A-3I)-3A=13A-12I,
$$
$$
A^4=A(13A-12I)=13A^2-12A=13(4A-3I)-12A=40A-39I.
$$
故
$$
A^4=40A-39I.
$$

</details>

### 练习 2：最小多项式判定
设
$$
A=\begin{pmatrix}
1&1&0\\
0&1&0\\
0&0&2
\end{pmatrix}.
$$
求 $m_A(x)$。

<details>

<summary>点击查看过程与答案</summary>

对特征值 1 有 2 阶 Jordan 块，因此因子含 $(x-1)^2$；特征值 2 为 1 阶块，含 $(x-2)$。
故
$$
m_A(x)=(x-1)^2(x-2).
$$

</details>

### 练习 3：有理标准形块数
若 $A$ 的不变因子为
$$
d_1(x)=x+1,\ d_2(x)=(x+1)(x^2+1),
$$
问有理标准形有几个 companion 块？最小多项式是什么？

<details>

<summary>点击查看过程与答案</summary>

不变因子个数即 companion 块个数，为 2 块。
最大不变因子给出最小多项式：
$$
m_A(x)=d_2(x)=(x+1)(x^2+1).
$$

</details>

### 练习 4：CH 定理求逆
已知
$$
A^2-5A+6I=0,
$$
且 $A$ 可逆，求 $A^{-1}$。

<details>

<summary>点击查看过程与答案</summary>

方程右乘 $A^{-1}$：
$$
A-5I+6A^{-1}=0.
$$
故
$$
A^{-1}=\frac{1}{6}(5I-A).
$$

</details>

