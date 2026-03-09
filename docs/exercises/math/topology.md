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

## 🔴 挑战篇：紧致性与连通性

### 3. Heine-Borel 的反例
在无穷维希尔伯特空间 $\ell^2$（所有平方和收敛的序列空间）中，考虑单位球 $B = \{ x \in \ell^2 \mid \|x\| \leq 1 \}$。
证明：$B$ 是有界闭集，但它不是紧致的。

<details>
<summary>Check Solution</summary>

**解析：**
1. **有界闭性**：显然 $\|x\| \leq 1$ 是有界的，且范数定义的球总是闭集。
2. **非紧性证明**：利用序列紧致性。
   构造序列 $e_n = (0, 0, \dots, 1, 0, \dots)$（第 $n$ 位为 1）。
   显然 $e_n \in B$，因为 $\|e_n\| = 1$。
   计算距离：对于 $m \neq n$，$d(e_n, e_m) = \sqrt{1^2 + (-1)^2} = \sqrt{2}$。
   由于该序列中任意两点之间的距离恒为 $\sqrt{2}$，它不可能存在收敛子列（Cauchy 准则不满足）。
   结论：单位球 $B$ 在无限维空间中不满足序列紧致性，故不紧致。
</details>

---

### 4. 连续映射的固定点 (Brouwer 固定点定理简述)
证明：任何连续映射 $f: [0, 1] \to [0, 1]$ 必有固定点，即存在 $x \in [0, 1]$ 使得 $f(x) = x$。

<details>
<summary>Check Solution</summary>

**证明：**
1. 令 $g(x) = f(x) - x$。
2. 由于 $f$ 和 $x$ 均在 $[0, 1]$ 上连续，故 $g$ 也是连续函数。
3. 计算端点值：
   - $g(0) = f(0) - 0 = f(0) \geq 0$（因为 $f$ 的域是 $[0, 1]$）。
   - $g(1) = f(1) - 1 \leq 0$（因为 $f$ 的域是 $[0, 1]$）。
4. 如果 $g(0)=0$ 或 $g(1)=0$，则 $0$ 或 $1$ 就是固定点。
5. 如果 $g(0) > 0$ 且 $g(1) < 0$，根据**连通性**（介值定理），存在 $c \in (0, 1)$ 使得 $g(c) = 0$。
6. 即 $f(c) - c = 0 \implies f(c) = c$。 $\square$
</details>
