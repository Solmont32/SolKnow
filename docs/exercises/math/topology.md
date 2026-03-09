---
title: 点集拓扑学专题练习
description: 从度量空间到分离公理的深度挑战，包含详细折叠解析。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 点集拓扑学专题练习

> 本练习库对标 Munkres《Topology》前四章内容，涵盖度量空间、紧致性、连通性与分离公理。

---

## 🟢 基础篇：度量与拓扑空间

### 1. 离散拓扑的性质
设 $X$ 是一个至少含有两个点的集合，且赋予离散拓扑。
(1) 证明 $X$ 中每一个子集既是开集也是闭集。
(2) $X$ 是否连通？

<details>
<summary>Check Solution</summary>

**解析：**
1. **(1) 证明**：在离散拓扑中，每一个单点集 $\{x\}$ 都是开集。由于任意个开集的并集仍是开集，故任何子集 $A = \cup_{x \in A} \{x\}$ 都是开集。
   对于任意子集 $A$，其补集 $A^c$ 也是 $X$ 的子集，由上述推理，$A^c$ 也是开集。
   由于 $A^c$ 是开集，故其补集 $(A^c)^c = A$ 是闭集。 $\square$
2. **(2) 连通性**：不连通。取 $a \in X$，则 $\{a\}$ 是非空开集，且 $X \setminus \{a\}$ 也是非空开集。这两个集合构成了 $X$ 的一个分离。
</details>

---

## 🟡 进阶篇：连续映射与分离公理

### 2. Hausdorff 空间的性质
证明：拓扑空间 $X$ 是 Hausdorff 的，当且仅当对角线集 $\Delta = \{ (x, x) \mid x \in X \}$ 是积空间 $X \times X$ 中的闭集。

<details>
<summary>Check Solution</summary>

**证明：**
我们证明 $X \times X \setminus \Delta$ 是开集。
1. **($\implies$)**：设 $x \neq y$。由 $X$ 是 Hausdorff 的，存在不相交开集 $U, V$ 满足 $x \in U, y \in V$。
   考虑积空间中的开集 $W = U \times V$。显然 $(x, y) \in W$。
   若 $(z, w) \in W$，则 $z \in U, w \in V$。由于 $U \cap V = \emptyset$，故 $z \neq w$，即 $(z, w) \notin \Delta$。
   因此 $W \subset X \times X \setminus \Delta$。这说明对角线补集中的每一点都有邻域落在补集中，故补集是开集，对角线是闭集。
2. **($\impliedby$)**：反之亦然。如果对角线补集是开集，则对任意 $(x, y) \notin \Delta$（即 $x \neq y$），存在基开集 $U \times V$ 包含 $(x, y)$ 且不与 $\Delta$ 相交。
   不相交意味着对任意 $z \in U, w \in V$ 都有 $z \neq w$，故 $U \cap V = \emptyset$。 $\square$
</details>

---

### 3. 正规空间 ($T_4$) 中的闭集分离
在 $T_4$ 空间 $X$ 中，已知 $A, B$ 是两个不相交闭集。证明：存在开集 $U, V$ 满足 $A \subset U$，$B \subset V$，且 $\overline{U} \cap \overline{V} = \emptyset$。

<details>
<summary>Check Solution</summary>

**证明提示：**
1. 利用 $T_4$ 性质，存在不相交开集 $G_1, G_2$ 使得 $A \subset G_1, B \subset G_2$。
2. 由于 $G_1 \cap G_2 = \emptyset$，则 $G_1 \subset X \setminus G_2$，故 $\overline{G_1} \subset X \setminus G_2$（因为 $X \setminus G_2$ 是闭集且包含 $G_1$）。
3. 从而 $\overline{G_1} \cap B = \emptyset$。
4. 现在考虑闭集 $\overline{G_1}$ 与 $B$。由 $T_4$ 性质，存在不相交开集 $U_1, V_1$ 使得 $\overline{G_1} \subset U_1, B \subset V_1$。
5. 此时 $A \subset G_1 \subset \overline{G_1} \subset U_1$。
6. 重复此过程或利用 Urysohn 引理构造 $f: X \to [0, 1]$ 使得 $f|_A = 0, f|_B = 1$。
7. 令 $U = f^{-1}([0, 1/3)), V = f^{-1}((2/3, 1])$。
8. 则 $\overline{U} \subset f^{-1}([0, 1/3]), \overline{V} \subset f^{-1}([2/3, 1])$。
9. 显然 $\overline{U} \cap \overline{V} = \emptyset$。 $\square$
</details>

---

## 🔴 挑战篇：紧致性与连通性

### 4. Heine-Borel 的反例
在无穷维希尔伯特空间 $\ell^2$ 中，证明单位球 $B = \{ x \in \ell^2 \mid \|x\| \leq 1 \}$ 不是紧致的。

<details>
<summary>Check Solution</summary>

**解析：**
1. **序列紧致性证明**：构造序列 $e_n = (0, 0, \dots, 1, 0, \dots)$。
2. 对于 $m \neq n$，$d(e_n, e_m) = \sqrt{2}$。
3. 该序列不可能存在 Cauchy 子列，故不收敛。
4. 结论：在无限维巴拿赫空间中，单位球总不紧致（Riesz 定理）。
</details>

---

### 5. 积拓扑 vs 箱拓扑 (Box Topology)
考虑积空间 $\mathbb{R}^\omega$（可数个 $\mathbb{R}$ 的积）。
比较映射 $f: \mathbb{R} \to \mathbb{R}^\omega$ 定义为 $f(t) = (t, t, t, \dots)$。
(1) 在积拓扑下 $f$ 是否连续？
(2) 在箱拓扑下 $f$ 是否连续？

<details>
<summary>Check Solution</summary>

**解析：**
1. **(1) 积拓扑**：连续。根据积拓扑性质，映射到积空间的映射连续当且仅当每一个分量映射 $f_n(t) = t$ 连续。显然 $f_n(t)=t$ 连续。
2. **(2) 箱拓扑**：不连续。考虑箱拓扑中的开集 $U = (-1, 1) \times (-1/2, 1/2) \times (-1/3, 1/3) \times \dots$。
   $f^{-1}(U)$ 包含 $t$ 当且仅当 $|t| < 1/n$ 对所有 $n$ 成立。
   这意味着 $t$ 只能为 0。
   故 $f^{-1}(U) = \{0\}$，这不是 $\mathbb{R}$ 中的开集。
   因此 $f$ 在箱拓扑下不连续。
</details>

---

### 6. 拓扑学家的正弦曲线的非路径连通性
证明 $S = \overline{\{ (x, \sin(1/x)) \mid x > 0 \}}$ 不是路径连通的。

<details>
<summary>Check Solution</summary>

**证明核心：**
假设存在路径 $f: [0, 1] \to S$ 连接原点 $(0, 0)$ 和某点 $(x_0, \sin(1/x_0))$。
由于 $f$ 连续，其第一分量 $f_1(t)$ 必须从 0 连续变化到 $x_0$。
然而，在 $f_1(t)$ 趋于 0 的过程中，第二分量 $f_2(t) = \sin(1/f_1(t))$ 必须在 $-1$ 和 $1$ 之间无限次震荡。
这会导致 $f_2(t)$ 在 $t=0$ 附近无法保持连续性（极限不存在）。 $\square$
</details>

---

## 🟣 拓展篇：同论初步

### 7. 同伦等价的判定
证明圆环 (Annulus) $A = \{ z \in \mathbb{C} \mid 1 \leq |z| \leq 2 \}$ 同伦等价于单位圆周 $S^1 = \{ z \in \mathbb{C} \mid |z| = 1 \}$。

<details>
<summary>Check Solution</summary>

**证明：**
1. 定义包含映射 $i: S^1 \hookrightarrow A$。
2. 定义收缩映射 $r: A \to S^1$ 满足 $r(z) = z/|z|$。
3. 显然 $r \circ i = \text{id}_{S^1}$。
4. 考虑 $i \circ r: A \to A$，即 $f(z) = z/|z|$。
5. 构造同伦 $H(z, t) = (1-t)z + t(z/|z|)$。
6. 对于 $z \in A$，$1 \leq |z| \leq 2$，其模长在形变过程中始终处于 $[1, 2]$ 之间。
7. 故 $H$ 连续且 $H(z, 0) = z, H(z, 1) = z/|z|$。
8. 结论：$A$ 同伦等价于 $S^1$。 $\square$
</details>
