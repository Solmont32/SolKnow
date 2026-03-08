---
title: 二次型 (Quadratic Forms)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 二次型 (Quadratic Forms)

二次型是高等代数中连接矩阵理论、线性变换与几何分类的核心章节。

## 1. 定义与矩阵表示
$n$ 元二次型写作
$$
Q(\mathbf{x})=\sum_{i,j=1}^n a_{ij}x_ix_j,
$$
可写成矩阵形式
$$
Q(\mathbf{x})=\mathbf{x}^TA\mathbf{x},
$$
其中可取 $A$ 为对称矩阵（把交叉项均分到 $a_{ij},a_{ji}$）。

## 2. 合同变换与标准形
若可逆矩阵 $C$ 使
$$
C^TAC=B,
$$
则称 $A,B$ 合同，对应变量替换 $\mathbf{x}=C\mathbf{y}$。

目标是把二次型化为标准形：
$$
Q=\lambda_1y_1^2+\cdots+\lambda_ry_r^2,
$$
进一步在实数域可归约为规范形
$$
Q= y_1^2+\cdots+y_p^2 - y_{p+1}^2-\cdots-y_{p+q}^2.
$$

## 3. 惯性定理（Sylvester）
实对称矩阵在合同变换下，正平方项个数 $p$ 与负平方项个数 $q$ 不变。这两个数称为惯性指数。

<KnowledgeCard type="info" title="重要结论">
二次型正定当且仅当规范形中全为正平方项，即 $q=0$。
</KnowledgeCard>

## 4. 正定判别（顺序主子式法）
设 $A$ 为实对称矩阵，记其顺序主子式
$$
\Delta_k=\det(A_k),\ k=1,2,\dots,n.
$$
则：
- 正定 $\Longleftrightarrow \Delta_k>0\ (\forall k)$；
- 负定 $\Longleftrightarrow (-1)^k\Delta_k>0\ (\forall k)$。

## 5. 例题
### 例 1：配方法化标准形
化二次型
$$
Q=x_1^2+4x_1x_2+5x_2^2
$$
为标准形并判定正定性。

<details>
<summary>点击查看解答</summary>

配方：
$$
Q=(x_1+2x_2)^2+x_2^2.
$$
令 $y_1=x_1+2x_2, y_2=x_2$，则
$$
Q=y_1^2+y_2^2,
$$
为正定二次型。
</details>

### 例 2：用主子式判别
判断
$$
A=\begin{pmatrix}
2&-1&0\\
-1&2&-1\\
0&-1&2
\end{pmatrix}
$$
对应二次型的正定性。

<details>
<summary>点击查看解答</summary>

顺序主子式：
$$
\Delta_1=2>0,\quad \Delta_2=\begin{vmatrix}2&-1\\-1&2\end{vmatrix}=3>0,
$$
$$
\Delta_3=\det(A)=4>0.
$$
全为正，故该二次型正定。
</details>

## 6. 配套练习
1. 将 $Q=2x_1^2+2x_1x_2+5x_2^2$ 化为标准形并判断定性。
2. 用顺序主子式判别
$$
A=\begin{pmatrix}
1&2\\
2&1
\end{pmatrix}
$$
对应二次型的定性。
3. 设二次型规范形为 $y_1^2+y_2^2-y_3^2$，写出秩与惯性指数。

前往练习库：[/docs/exercises/math/algebra](/docs/exercises/math/algebra)
