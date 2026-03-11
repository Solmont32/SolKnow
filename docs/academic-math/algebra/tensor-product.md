---
title: 张量积 (Tensor Product)
---

import { motion } from 'framer-motion';
import KnowledgeCard from "@site/src/components/KnowledgeCard";

# <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>张量积 (Tensor Product)</motion.div>

张量积是线性代数中一种构造新空间的方法。它将两个向量空间 $V$ 和 $W$ 结合成一个更大的空间 $V \otimes W$，并将双线性映射问题转化为线性映射问题。它是多线性代数、微分几何以及量子力学中“复合系统”的数学语言。

## 1. 通用性 definition

设 $V, W$ 是域 $\mathbb{F}$ 上的向量空间。张量积 $V \otimes W$ 是一个向量空间，配备了一个双线性映射 $\phi: V \times W \to V \otimes W$（记为 $\phi(v, w) = v \otimes w$），满足以下 **通用性质 (Universal Property)**：

对任何向量空间 $Z$ 和任何双线性映射 $B: V \times W \to Z$，都存在唯一的线性映射 $L: V \otimes W \to Z$ 使得：
$$ B(v, w) = L(v \otimes w) $$

这说明 $V \otimes W$ 是能承载所有来自 $V \times W$ 的双线性信息的“最小”线性空间。

## 2. 基与维数

若 $\{e_1, \dots, e_m\}$ 是 $V$ 的一组基，$\{f_1, \dots, f_n\}$ 是 $W$ 的一组基，则：
$$ \{e_i \otimes f_j \mid 1 \le i \le m, 1 \le j \le n\} $$
构成 $V \otimes W$ 的一组基。

- **维数关系**: $\dim(V \otimes W) = \dim V \cdot \dim W$。

## 3. Kronecker 积 (矩阵表示)

对线性映射 $A: V \to V'$ 和 $B: W \to W'$，其张量积映射 $A \otimes B: V \otimes W \to V' \otimes W'$ 的矩阵表示即为 **Kronecker 积**。
设 $A$ 是 $m \times n$ 矩阵，$B$ 是 $p \times q$ 矩阵，则 $A \otimes B$ 是 $mp \times nq$ 的分块矩阵：

$$
A \otimes B = \begin{pmatrix}
a_{11}B & \dots & a_{1n}B \\
\vdots & \ddots & \vdots \\
a_{m1}B & \dots & a_{mn}B
\end{pmatrix}
$$

## 4. 关键性质

1. **分配律**: $(v_1+v_2) \otimes w = v_1 \otimes w + v_2 \otimes w$。
2. **标量结合**: $(cv) \otimes w = v \otimes (cw) = c(v \otimes w)$。
3. **混合乘积性质**: $(A \otimes B)(C \otimes D) = (AC) \otimes (BD)$。
4. **行列式**: $\det(A \otimes B) = (\det A)^n (\det B)^m$（其中 $A, B$ 分别为 $m, n$ 阶方阵）。

## 5. 深度例题

### 例 1：张量积下的特征值

设 $Ax = \lambda x, By = \mu y$。求 $A \otimes B$ 在向量 $x \otimes y$ 上的作用。

<details>
<summary>点击查看解答</summary>

$$
\begin{aligned}
(A \otimes B)(x \otimes y) &= (Ax) \otimes (By) \\
&= (\lambda x) \otimes (\mu y) \\
&= \lambda\mu (x \otimes y)
\end{aligned}
$$

因此，$A \otimes B$ 的特征值是 $A$ 和 $B$ 的特征值的两两乘积。

</details>

## 6. 配套练习

### 练习 1：计算 Kronecker 积

计算 $A = \begin{pmatrix} 1 & 2 \\ 0 & 3 \end{pmatrix}$ 与 $B = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}$ 的张量积 $A \otimes B$。

<details>
<summary>点击查看过程与答案</summary>

$$
A \otimes B = \begin{pmatrix}
1B & 2B \\
0B & 3B
\end{pmatrix} = \begin{pmatrix}
0 & 1 & 0 & 2 \\
1 & 0 & 2 & 0 \\
0 & 0 & 0 & 3 \\
0 & 0 & 3 & 0
\end{pmatrix}.
$$

</details>

### 练习 2：纯张量的判定

并非 $V \otimes W$ 中的所有向量都能写成 $v \otimes w$ 的形式。能写成此形式的称为 **纯张量 (Pure Tensor)** 或可分态。
在 $\mathbb{R}^2 \otimes \mathbb{R}^2$ 中，判断 $z = e_1 \otimes e_1 + e_2 \otimes e_2$ 是否为纯张量。

<details>
<summary>点击查看证明</summary>
设 $z = (a e_1 + b e_2) \otimes (c e_1 + d e_2) = ac(e_1 \otimes e_1) + ad(e_1 \otimes e_2) + bc(e_2 \otimes e_1) + bd(e_2 \otimes e_2)$。
与 $e_1 \otimes e_1 + e_2 \otimes e_2$比较系数：
- $ac = 1$
- $ad = 0 \implies a=0$ 或 $d=0$。
  - 若 $a=0$，则 $ac=0 \neq 1$，矛盾。
  - 若 $d=0$，则 $bd=0 \neq 1$，矛盾。
因此 $z$ 不是纯张量。在量子力学中，这被称为 **贝尔态 (Bell State)** 或纠缠态。
</details>
