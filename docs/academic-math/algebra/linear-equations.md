---
title: 线性方程组 (Linear Equations)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 线性方程组 (Linear Equations)

线性方程组的核心是理解解空间结构：何时有解、解有几个自由度、如何高效计算。

## 1. 基本模型
一般写作
$$
A\mathbf{x}=\mathbf{b},\quad A\in\mathbb{F}^{m\times n},\ \mathbf{x}\in\mathbb{F}^n.
$$
对应增广矩阵 $[A\mid \mathbf{b}]$。

## 2. Rouché-Capelli 判别定理
记 $r(A)$ 为系数矩阵秩，$r(A,\mathbf{b})$ 为增广矩阵秩，则：
1. 无解：$r(A)<r(A,\mathbf{b})$。
2. 有解：$r(A)=r(A,\mathbf{b})$。
3. 在有解前提下：
   - 唯一解：$r(A)=n$；
   - 无穷多解：$r(A)=r(A,\mathbf{b})<n$，自由变量个数为 $n-r(A)$。

## 3. 齐次线性方程组
对
$$
A\mathbf{x}=\mathbf{0}
$$
总有零解。若 $r(A)<n$，则存在非零解，解空间维数为
$$
\dim\mathcal{N}(A)=n-r(A)
$$
（秩-零空间维数定理）。

<KnowledgeCard type="info" title="结构理解">
非齐次方程组的解集 = 任一特解 + 对应齐次方程组的通解。
</KnowledgeCard>

## 4. 高斯消元与阶梯形
初等行变换不改变方程组解集。实际计算步骤：
1. 通过消元得到行阶梯形矩阵。
2. 回代求主变量。
3. 把非主变量视为参数，写出通解。

时间复杂度通常为 $O(n^3)$（方阵情形）。

## 5. 例题
### 例 1：判定有解性与解的个数
讨论参数 $k$ 下方程组
$$
\begin{cases}
x+y+z=1\\
x+2y+3z=2\\
2x+3y+(k+2)z=3
\end{cases}
$$
的解的情况。

<details>
<summary>点击查看解答</summary>

增广矩阵经消元：
- $R_2\leftarrow R_2-R_1$ 得 $(0,1,2|1)$；
- $R_3\leftarrow R_3-2R_1$ 得 $(0,1,k|1)$；
- $R_3\leftarrow R_3-R_2$ 得 $(0,0,k-2|0)$。

因此：
- $k\neq 2$ 时，三主元，唯一解；
- $k=2$ 时，秩为 2，小于未知数个数 3，有无穷多解。
</details>

### 例 2：写出通解
求解齐次系统
$$
\begin{cases}
x+2y-z=0\\
2x+4y-2z=0
\end{cases}
$$

<details>
<summary>点击查看解答</summary>

第二行是第一行 2 倍，秩为 1。设 $y=s, z=t$，则
$$x=-2s+t.$$
通解
$$
\mathbf{x}=s\begin{pmatrix}-2\\1\\0\end{pmatrix}+t\begin{pmatrix}1\\0\\1\end{pmatrix},\quad s,t\in\mathbb{F}.
$$
</details>

## 6. 常见误区
1. 只看 $r(A)$ 不看 $r(A,\mathbf{b})$ 就判断有解性。
2. 将“未知数个数”误写为“方程个数”来判唯一解。
3. 通解遗漏参数取值范围，或基向量线性相关。

## 7. 配套练习
1. 判定并求解：
$$
\begin{cases}
x+y+z=2\\
2x+3y+4z=7\\
3x+4y+5z=9
\end{cases}
$$
2. 对参数 $a$ 讨论：
$$
\begin{cases}
x+y=1\\
ax+y=a
\end{cases}
$$
3. 求齐次系统 $A\mathbf{x}=0$ 的基础解系：
$$
A=\begin{pmatrix}
1&1&0&2\\
2&2&1&5
\end{pmatrix}.
$$

前往练习库：[/docs/exercises/math/algebra](/docs/exercises/math/algebra)
