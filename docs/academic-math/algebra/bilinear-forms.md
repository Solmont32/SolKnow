---
title: 双线性型 (Bilinear Forms)
---

import { Shield, Layers, Divide, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import KnowledgeCard from "@site/src/components/KnowledgeCard";

# <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>双线性型 (Bilinear Forms)</motion.div>

双线性型是线性代数中研究两个向量之间标量关系的代数结构，是二次型的推广，也是算子理论的重要基础。

## 1. 定义与基本性质

设 $V$ 是域 $\mathbb{F}$ 上的向量空间。映射 $B: V \times V \to \mathbb{F}$ 称为 **双线性型**，如果它对两个分量都是线性的：

1. $B(u+v, w) = B(u, w) + B(v, w)$
2. $B(cu, v) = cB(u, v)$
3. $B(u, v+w) = B(u, v) + B(u, w)$
4. $B(u, cv) = cB(u, v)$

### 矩阵表示

设 $\mathcal{B} = \{e_1, \dots, e_n\}$ 是 $V$ 的一组基，则 $B$ 由其 **度量矩阵 (Gram Matrix)** $A = (a_{ij})$ 唯一确定，其中 $a_{ij} = B(e_i, e_j)$。
对任意 $x, y \in V$，若其坐标分别为 $\mathbf{x}, \mathbf{y}$，则：

$$
B(x, y) = \mathbf{x}^T A \mathbf{y}.
$$

### 基变更与合同

若从基 $\mathcal{B}$ 变为 $\mathcal{B}'$，过渡矩阵为 $P$，则度量矩阵 $A$ 变为 $A' = P^T A P$。
这说明双线性型的矩阵在基变更下是 **合同 (Congruent)** 的。

## 2. 特殊类型的双线性型

### 对称与反对称

- **对称 (Symmetric)**：$B(u, v) = B(v, u)$，对应 $A^T = A$。
- **反对称 (Skew-symmetric)**：$B(u, v) = -B(v, u)$，对应 $A^T = -A$。在特征不为 2 的域上，这等价于交错性 $B(v, v) = 0$。

### 非退化性 (Non-degeneracy)

定义左自由基 (Left Kernel) 为 $\operatorname{rad}_L(B) = \{u \in V \mid B(u, v) = 0, \forall v \in V\}$。
若 $\operatorname{rad}_L(B) = \{0\}$ 且 $\operatorname{rad}_R(B) = \{0\}$，则称 $B$ 为 **非退化** 的。
这等价于 $\det(A) \neq 0$。

## 3. 正交性与投影

定义 $u, v$ 关于 $B$ **正交** 为 $B(u, v) = 0$。
对子空间 $W \subset V$，其正交补定义为：

$$
W^\perp = \{v \in V \mid B(w, v) = 0, \forall w \in W\}.
$$

<KnowledgeCard type="info" title="关键定理">
若 $B$ 是非退化的对称双线性型，且 $W$ 是 $V$ 的非退化子空间（即 $B|_W$ 非退化），则有直和分解：
$$ V = W \oplus W^\perp. $$
</KnowledgeCard>

## 4. 典型标准形

### 对称双线性型（代数闭域）

在代数闭域（如 $\mathbb{C}$）上，任意对称双线性型都可化为 $I_r$ 的形式，其中 $r$ 是秩。

### 反对称双线性型

任意交错双线性型（反对称且 $B(v,v)=0$）都存在一组基，使矩阵为：

$$
\operatorname{diag}\left( \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}, \dots, \begin{pmatrix} 0 & 1 \\ -1 & 0 \end{pmatrix}, 0, \dots, 0 \right).
$$

这说明反对称双线性型的秩必为偶数。

---

## 5. 深度例题

### 例 1：双线性型的极化恒等式

设 $B$ 是对称双线性型，$Q(v) = B(v, v)$ 是关联的二次型。证明：
$$ B(u, v) = \frac{1}{2} (Q(u+v) - Q(u) - Q(v)). $$

<details>
<summary>点击查看证明</summary>

$$
\begin{aligned}
Q(u+v) &= B(u+v, u+v) \\
&= B(u, u) + B(u, v) + B(v, u) + B(v, v) \\
&= Q(u) + 2B(u, v) + Q(v) \quad (\text{由对称性})
\end{aligned}
$$

移项即得：$2B(u, v) = Q(u+v) - Q(u) - Q(v)$。

</details>

### 例 2：反对称矩阵的行列式

证明：奇数阶实反对称矩阵的行列式必为 0。

<details>
<summary>点击查看证明</summary>

设 $A^T = -A$，且 $n$ 为奇数。
$$ \det(A) = \det(A^T) = \det(-A) = (-1)^n \det(A). $$
由于 $n$ 是奇数，$(-1)^n = -1$，故 $\det(A) = -\det(A) \Rightarrow 2\det(A) = 0 \Rightarrow \det(A) = 0$。

</details>

---

## 6. 配套练习

### 练习 1：度量矩阵计算

在 $\mathbb{R}^2$ 中，定义 $B(x, y) = x_1y_1 + 2x_1y_2 + 3x_2y_1 + 4x_2y_2$。

1. 求 $B$ 在标准基下的矩阵 $A$。
2. $B$ 是否是对称的？是否是非退化的？

<details>
<summary>点击查看过程与答案</summary>

1. 标准基 $e_1=(1,0), e_2=(0,1)$。
   - $a_{11} = B(e_1, e_1) = 1$
   - $a_{12} = B(e_1, e_2) = 2$
   - $a_{21} = B(e_2, e_1) = 3$
   - $a_{22} = B(e_2, e_2) = 4$
     故 $A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$。
2. $A^T \neq A$，故 $B$ 不是对称的。
$\det(A) = 4 - 6 = -2 \neq 0$，故 $B$ 是非退化的。
</details>

### 练习 2：正交补的维数

设 $V$ 是 $n$ 维空间，$B$ 是非退化双线性型。证明：对任意子空间 $W$，有 $\dim W + \dim W^\perp = n$。

<details>
<summary>点击查看证明</summary>

考虑映射 $f: V \to W^*$（$W$ 的对偶空间），定义为 $f(v)(w) = B(w, v)$。

- $f$ 是线性映射。
- $\ker(f) = \{v \in V \mid B(w, v) = 0, \forall w \in W\} = W^\perp$。
- 根据秩-零化度定理：$\dim V = \dim \ker(f) + \dim \operatorname{Im}(f)$。
- 由于 $B$ 非退化，映射 $g: V \to V^*$ ($v \mapsto B(\cdot, v)$) 是同构。而 $f$ 是 $g$ 在 $W$ 上的限制复合上限制映射 $V^* \to W^*$。可以证明 $f$ 是满射（Exercise）。
- 因此 $\dim \operatorname{Im}(f) = \dim W^* = \dim W$。
- 结论：$n = \dim W^\perp + \dim W$。
</details>

### 练习 3：交错型的构造

设 $V$ 的基为 $e_1, e_2, e_3$。构造一个非零交错双线性型 $B$。

<details>
<summary>点击查看过程与答案</summary>

交错要求 $B(v, v) = 0$，即度量矩阵 $A$ 必须是反对称的且对角元为 0。
取 $A = \begin{pmatrix} 0 & 1 & 0 \\ -1 & 0 & 0 \\ 0 & 0 & 0 \end{pmatrix}$。
则 $B(x, y) = x_1y_2 - x_2y_1$ 即为一个满足条件的非零交错双线性型。
注意其秩为 2（偶数）。

</details>
