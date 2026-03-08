---
title: 矩阵与线性变换 (Matrix and Linear Transformations)
---

# 矩阵与线性变换

本章按“运算-结构-应用”组织：先掌握计算规则，再理解秩与相似对角化，最后连接线性方程组与特征值问题。

## 1. 基本概念与运算

设 $A\in M_{m\times n}(\mathbb{F})$，$B\in M_{n\times p}(\mathbb{F})$。

- 矩阵加法与数乘按分量定义。
- 乘法满足结合律与分配律，一般不满足交换律。
- 转置满足 $(AB)^T=B^TA^T$。

### 例题 1：矩阵乘法与转置
设
$$
A=\begin{pmatrix}1&2\\0&1\end{pmatrix},\quad
B=\begin{pmatrix}2&-1\\3&0\end{pmatrix}.
$$
求 $AB$ 与 $(AB)^T$。

解：
$$
AB=\begin{pmatrix}1\cdot2+2\cdot3 & 1\cdot(-1)+2\cdot0\\0\cdot2+1\cdot3 & 0\cdot(-1)+1\cdot0\end{pmatrix}
=\begin{pmatrix}8&-1\\3&0\end{pmatrix},
$$
故
$$
(AB)^T=\begin{pmatrix}8&3\\-1&0\end{pmatrix}.
$$

## 2. 初等变换、秩与可逆性

对矩阵做初等行变换不改变行秩；行最简形中非零行数即秩。

- $\operatorname{rank}(A)=n$（方阵）当且仅当 $A$ 可逆。
- $AX=b$ 有唯一解当且仅当 $A$ 可逆。

### 例题 2：求秩与可逆性
$$
A=\begin{pmatrix}
1&2&1\\
2&4&2\\
1&1&0
\end{pmatrix}.
$$

解：行变换
$$
R_2\leftarrow R_2-2R_1,\quad R_3\leftarrow R_3-R_1
$$
得
$$
\begin{pmatrix}
1&2&1\\
0&0&0\\
0&-1&-1
\end{pmatrix}
\sim
\begin{pmatrix}
1&2&1\\
0&1&1\\
0&0&0
\end{pmatrix}.
$$
故 $\operatorname{rank}(A)=2<3$，所以 $A$ 不可逆。

## 3. 特征值、特征向量与相似对角化

若存在非零向量 $v$ 使 $Av=\lambda v$，则 $\lambda$ 是特征值。

- 特征多项式：$p_A(\lambda)=\det(\lambda I-A)$。
- 若 $n$ 阶矩阵有 $n$ 个线性无关特征向量，则可相似对角化。

### 例题 3：对角化判定
$$
A=\begin{pmatrix}2&1\\0&3\end{pmatrix}.
$$

解：
$$
p_A(\lambda)=(\lambda-2)(\lambda-3).
$$
有两个不同特征值 $2,3$，故必可对角化。

对应特征向量可取：
- $\lambda=2$ 时，$v_1=(1,0)^T$；
- $\lambda=3$ 时，$v_2=(1,1)^T$。

令 $P=(v_1,v_2)$，则 $P^{-1}AP=\operatorname{diag}(2,3)$。

## 4. 配套练习（折叠答案）

### 练习 1
求矩阵
$$
A=\begin{pmatrix}1&0&2\\2&1&5\\-1&1&-1\end{pmatrix}
$$
的秩。

<details>
<summary>点击查看过程与答案</summary>

行变换：
$$
R_2\leftarrow R_2-2R_1=(0,1,1),\quad
R_3\leftarrow R_3+R_1=(0,1,1).
$$
再 $R_3\leftarrow R_3-R_2$ 得零行。
故非零行有 2 行，$\operatorname{rank}(A)=2$。
</details>

### 练习 2
判断矩阵
$$
B=\begin{pmatrix}4&0\\0&4\end{pmatrix}
$$
是否可对角化，并说明理由。

<details>
<summary>点击查看过程与答案</summary>

$B=4I$ 本身就是对角矩阵，当然可对角化。其特征值只有 4，但特征子空间维数为 2（任意非零向量都是特征向量）。
</details>

### 练习 3
若 $A$ 可逆，证明 $A^{-1}$ 的特征值为 $A$ 的特征值的倒数。

<details>
<summary>点击查看过程与答案</summary>

若 $Av=\lambda v$（$v\neq0$，且 $\lambda\neq0$），两侧左乘 $A^{-1}$：
$$
v=\lambda A^{-1}v\Rightarrow A^{-1}v=\frac1\lambda v.
$$
故 $1/\lambda$ 是 $A^{-1}$ 的特征值。
</details>
