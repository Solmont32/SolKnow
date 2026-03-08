---
title: 特征值、特征向量与 Jordan 标准形
---

# 特征值、特征向量与 Jordan 标准形

本章按“特征值计算-对角化判定-Jordan 分解”组织，目标是把线性变换的结构看清楚。

## 1. 特征值与特征向量

设 $A\in M_n(\mathbb{F})$。若存在非零向量 $v$ 与标量 $\lambda$ 使

$$

Av=\lambda v,


$$

则称 $\lambda$ 为 $A$ 的特征值，$v$ 为对应特征向量。

等价条件：

$$

\det(\lambda I-A)=0.


$$

该多项式称为特征多项式。

### 例题 1：快速求上三角矩阵特征值

设

$$

A=\begin{pmatrix}
2&1&0\\
0&2&3\\
0&0&-1
\end{pmatrix}.


$$

求特征值及代数重数。

解：上三角矩阵的特征值就是对角元，故特征值为 $2,2,-1$。  
其中 $\lambda=2$ 的代数重数为 2，$\lambda=-1$ 的代数重数为 1。

## 2. 几何重数与可对角化判定

对特征值 $\lambda$，其特征子空间为

$$

E_\lambda=\ker(A-\lambda I),


$$

维数称为几何重数。

- 几何重数 $\le$ 代数重数。
- 矩阵可对角化，当且仅当所有特征子空间维数之和为 $n$。
- 等价说法：存在 $n$ 个线性无关特征向量。

### 例题 2：判定是否可对角化

设

$$

A=\begin{pmatrix}
1&1\\
0&1
\end{pmatrix}.


$$

判断是否可对角化。

解：特征多项式

$$

p_A(\lambda)=(\lambda-1)^2.


$$

仅有特征值 1，代数重数 2。  
求特征向量：

$$

(A-I)x=0\Rightarrow
\begin{pmatrix}
0&1\\
0&0
\end{pmatrix}
\begin{pmatrix}x_1\\x_2\end{pmatrix}=0
\Rightarrow x_2=0.


$$

故特征子空间维数为 1，小于 2，因此不可对角化。

## 3. 最小多项式与结构信息

最小多项式 $m_A(x)$ 是满足 $m_A(A)=0$ 的首一多项式中次数最低者，且 $m_A(x)\mid p_A(x)$。

- 若 $m_A(x)$ 无重因式，则 $A$ 可对角化（在分裂域上）。
- Jordan 块大小由最小多项式中对应因子的指数控制。

### 例题 3：由最小多项式判断可对角化

设矩阵 $A$ 满足

$$

m_A(x)=(x-1)(x+2),\quad p_A(x)=(x-1)^2(x+2).


$$

判断 $A$ 是否可对角化。

解：$m_A(x)$ 没有重因式，因此 $A$ 可对角化。  
这说明即使特征多项式有重根，只要最小多项式无重因式，仍可对角化。

## 4. Jordan 标准形

在代数闭域（如 $\mathbb{C}$）上，任意矩阵都与一个 Jordan 标准形相似：

$$

J=\operatorname{diag}(J_{k_1}(\lambda_1),\dots,J_{k_s}(\lambda_t)).


$$

其中 Jordan 块

$$

J_k(\lambda)=
\begin{pmatrix}
\lambda&1&0&\cdots&0\\
0&\lambda&1&\cdots&0\\
\vdots& &\ddots&\ddots&\vdots\\
0&\cdots&0&\lambda&1\\
0&\cdots&\cdots&0&\lambda
\end{pmatrix}.


$$

### 例题 4：由核维数确定 Jordan 块个数

已知 $A$ 的唯一特征值为 $\lambda=3$，且

$$

\dim\ker(A-3I)=2,\quad \dim\ker((A-3I)^2)=3,\quad n=3.


$$

求 Jordan 形。

解：$\dim\ker(A-3I)=2$ 表示 Jordan 块个数为 2。  
总维数 3，只能是大小 $2+1$ 两块。  
因此

$$

J=\operatorname{diag}(J_2(3),J_1(3)).


$$

## 5. $A^k$ 与 $e^{At}$ 的结构化计算

若 $A=PJP^{-1}$，则

$$

A^k=PJ^kP^{-1},\quad e^{At}=Pe^{Jt}P^{-1}.


$$

对 Jordan 块有

$$

J_k(\lambda)=\lambda I+N,\quad N^k=0,


$$

可用二项式展开：

$$

J_k(\lambda)^m=\sum_{r=0}^{k-1}\binom{m}{r}\lambda^{m-r}N^r.


$$

### 例题 5：计算 Jordan 块幂

设

$$

J=\begin{pmatrix}
2&1\\
0&2
\end{pmatrix}=2I+N,\quad N^2=0.


$$

求 $J^m$。

解：

$$

J^m=(2I+N)^m=2^mI+m2^{m-1}N
=\begin{pmatrix}
2^m&m2^{m-1}\\
0&2^m
\end{pmatrix}.


$$

## 6. 配套练习（折叠答案）

### 练习 1：特征值与特征向量

求矩阵

$$

A=\begin{pmatrix}
4&0\\
1&3
\end{pmatrix}


$$

的特征值，并给出每个特征值的一组特征向量。

<details>

<summary>点击查看过程与答案</summary>

$$

p_A(\lambda)=\det(\lambda I-A)=(\lambda-4)(\lambda-3).


$$

故特征值为 4 与 3。

- $\lambda=4$：$(A-4I)x=0$，得 $x_1=x_2$，可取特征向量 $(1,1)^T$。
- $\lambda=3$：$(A-3I)x=0$，得 $x_1=0$，可取特征向量 $(0,1)^T$。

</details>

### 练习 2：可对角化判定

设

$$

A=\begin{pmatrix}
5&1&0\\
0&5&0\\
0&0&2
\end{pmatrix}.


$$

判断 $A$ 是否可对角化。

<details>

<summary>点击查看过程与答案</summary>

特征值为 $5,5,2$。对 $\lambda=5$，

$$

A-5I=\begin{pmatrix}
0&1&0\\
0&0&0\\
0&0&-3
\end{pmatrix},


$$

解得特征空间维数为 1（$x_2=0,x_3=0$，$x_1$ 自由）。  
故几何重数小于代数重数 2，矩阵不可对角化。

</details>

### 练习 3：最小多项式

已知

$$

A=\begin{pmatrix}
1&1&0\\
0&1&1\\
0&0&1
\end{pmatrix}.


$$

求 $A$ 的最小多项式。

<details>

<summary>点击查看过程与答案</summary>

$A=I+N$，其中

$$

N=\begin{pmatrix}
0&1&0\\
0&0&1\\
0&0&0
\end{pmatrix},\quad N^3=0,\ N^2\neq0.


$$

因此

$$

(A-I)^3=0,\ (A-I)^2\neq0.


$$

最小多项式为

$$

m_A(x)=(x-1)^3.


$$

</details>

### 练习 4：Jordan 形结构判断

设 4 阶矩阵 $A$ 的唯一特征值为 0，且

$$

\dim\ker A=2,\quad \dim\ker A^2=4.


$$

写出可能的 Jordan 形。

<details>

<summary>点击查看过程与答案</summary>

$\dim\ker A=2$ 说明 Jordan 块个数为 2。  
$\dim\ker A^2=4$ 说明每个块大小都不超过 2，且总维数为 4。  
因此只能是两块 2 阶块：

$$

J=\operatorname{diag}(J_2(0),J_2(0)).


$$

</details>
