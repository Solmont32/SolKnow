---
title: 行列式 (Determinant)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 行列式 (Determinant)

行列式把一个 $n$ 阶方阵映射为一个标量，刻画线性变换对有向体积的伸缩比例；$|A|=0$ 当且仅当变换把空间压扁（矩阵不可逆）。

## 1. 定义与基本计算
设
$$
A=(a_{ij})_{n\times n},\quad
|A|=\sum_{\sigma\in S_n}\operatorname{sgn}(\sigma)\prod_{i=1}^n a_{i,\sigma(i)}.
$$

低阶行列式：
- 二阶：$\begin{vmatrix}a&b\\c&d\end{vmatrix}=ad-bc$。
- 三阶可用按行展开或 Sarrus 法（仅适用于三阶）。

<KnowledgeCard type="info" title="几何意义">
二维中 $|A|$ 是面积缩放倍数；三维中 $|A|$ 是体积缩放倍数。符号正负表示定向是否翻转。
</KnowledgeCard>

## 2. 基本性质（教材常用）
1. $|A^T|=|A|$。
2. 交换两行（列），行列式变号。
3. 某一行（列）乘 $k$，行列式乘 $k$。
4. 把一行（列）的 $k$ 倍加到另一行（列），行列式不变。
5. 若两行（列）成比例，则行列式为 0。
6. 上三角（下三角）矩阵行列式等于对角线元素之积。
7. $|AB|=|A||B|$，从而 $|A^{-1}|=1/|A|$（若可逆）。

## 3. 代数余子式与 Laplace 展开
记 $M_{ij}$ 为删去第 $i$ 行第 $j$ 列后的余子式，$A_{ij}=(-1)^{i+j}M_{ij}$ 为代数余子式，则
$$
|A|=\sum_{j=1}^n a_{ij}A_{ij}=\sum_{i=1}^n a_{ij}A_{ij}.
$$
按“零多的行/列”展开可大幅降低计算量。

## 4. 伴随矩阵与逆矩阵
设 $A^*$ 为伴随矩阵（代数余子式矩阵的转置），则
$$
AA^*=A^*A=|A|I_n.
$$
若 $|A|\neq 0$，
$$
A^{-1}=\frac{1}{|A|}A^*.
$$

## 5. 克拉默法则与适用边界
对于 $A\mathbf{x}=\mathbf{b}$ 且 $|A|\neq 0$，唯一解满足
$$
x_i=\frac{|A_i|}{|A|},
$$
其中 $A_i$ 把第 $i$ 列替换成常数列 $\mathbf{b}$。

<KnowledgeCard type="tip" title="方法选择">
克拉默法则适合理论推导与小规模手算；规模较大时优先高斯消元（复杂度更可控）。
</KnowledgeCard>

## 6. 例题
### 例 1：参数判定
求参数 $a$ 使矩阵
$$
A=\begin{pmatrix}
1&1&1\\
1&a&1\\
1&1&a
\end{pmatrix}
$$
可逆。

<details>
<summary>点击查看解答</summary>

沿第一行展开：
$$
|A|=(a-1)^2.
$$
故 $A$ 可逆当且仅当 $a\neq 1$。
</details>

### 例 2：利用行变换求值
计算
$$
D=\begin{vmatrix}
1&2&3\\
2&5&8\\
1&1&1
\end{vmatrix}.
$$

<details>
<summary>点击查看解答</summary>

作行变换 $R_2\leftarrow R_2-2R_1,\ R_3\leftarrow R_3-R_1$：
$$
D=\begin{vmatrix}
1&2&3\\
0&1&2\\
0&-1&-2
\end{vmatrix}=0.
$$
结论：$D=0$。
</details>

## 7. 配套练习
1. 设 $A$ 为 3 阶矩阵且 $|A|=-2$，求 $|3A^T|$。
2. 设 $|A|=2, |B|=-3$，求 $|AB^{-1}|$。
3. 用按行展开计算
$\begin{vmatrix}
2&0&1\\
-1&3&2\\
0&4&1
\end{vmatrix}$。

前往练习库：[/docs/exercises/math/algebra](/docs/exercises/math/algebra)
