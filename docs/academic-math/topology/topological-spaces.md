---
title: 拓扑空间基础 (Topological Spaces)
description: 抽象拓扑的定义，从度量空间的具体化到开集公理的普适化。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 拓扑空间基础 (Topological Spaces)

拓扑空间是研究“连续性”最一般的框架。在这里，我们不再依赖“距离”，而是直接将“开集”作为基本概念。

---

## 1. 拓扑空间的公理定义

### 定义 1.1 (拓扑)

设 $X$ 是一个非空集合。$X$ 的一个子集族 $\mathcal{T}$ 称为 $X$ 上的一个**拓扑 (Topology)**，如果它满足以下三个公理：

1. **空集与全集**：$\emptyset \in \mathcal{T}$ 且 $X \in \mathcal{T}$；
2. **任意并**：$\mathcal{T}$ 中任意多个成员的并集仍属于 $\mathcal{T}$；
3. **有限交**：$\mathcal{T}$ 中有限个成员的交集仍属于 $\mathcal{T}$。

二元组 $(X, \mathcal{T})$ 称为**拓扑空间**。$\mathcal{T}$ 中的元素称为该空间的**开集**。

---

## 2. 邻域、内部与闭包

### 定义 2.1 (邻域)

若存在开集 $U \in \mathcal{T}$ 使得 $x \in U \subset V$，则称 $V$ 为点 $x$ 的一个**邻域**。

### 定义 2.2 (核心点集概念)

设 $A \subset X$：

- **内点 (Interior Point)**：若存在 $x$ 的邻域 $V \subset A$，则 $x$ 是 $A$ 的内点。
- **极限点 (Limit Point)**：若 $x$ 的任意邻域都包含 $A \setminus \{x\}$ 中的点，则 $x$ 是 $A$ 的极限点。
- **闭包 (Closure)**：$A$ 及其所有极限点的并集称为 $A$ 的闭包，记作 $\overline{A}$。

<KnowledgeCard type="success" title="等价定义">
$A$ 是闭集 $\iff A = \overline{A} \iff A^c \in \mathcal{T}$。
</KnowledgeCard>

---

## 3. 拓扑的基 (Basis)

在实际应用中，直接列出所有开集非常困难。我们通常通过一个较小的子族来生成整个拓扑。

### 定义 3.1 (基)

设 $(X, \mathcal{T})$ 为拓扑空间。子族 $\mathcal{B} \subset \mathcal{T}$ 称为 $\mathcal{T}$ 的一个**基 (Basis)**，如果每一个开集 $U \in \mathcal{T}$ 都可以表示为 $\mathcal{B}$ 中某些元素的并。

<KnowledgeCard type="info" title="度量空间的基">
对于度量空间 $(X, d)$，所有开球 $\mathcal{B} = \{ B(x, \epsilon) \mid x \in X, \epsilon > 0 \}$ 构成了其自然拓扑的基。
</KnowledgeCard>

---

## 4. 常见的拓扑构造

- **离散拓扑 (Discrete Topology)**：$\mathcal{T} = \mathcal{P}(X)$（幂集）。每一个点都是开的。
- **平凡拓扑 (Trivial Topology)**：$\mathcal{T} = \{ \emptyset, X \}$。
- **有限补拓扑 (Cofinite Topology)**：$\mathcal{T} = \{ U \subset X \mid X \setminus U \text{ 是有限集} \} \cup \{ \emptyset \}$。

---

## ✍️ 深度练习

### 练习 1：验证有限补拓扑

证明：若 $X$ 是无限集，则上述定义的“有限补族”确实构成 $X$ 上的一个拓扑。

<details>
<summary>Check Solution</summary>

**证明：**

1. **空集与全集**：$\emptyset$ 在族中；$X$ 的补集是空集（有限），故 $X$ 在族中。
2. **任意并**：设 $\{U_\alpha\}$ 是族中元素。若其中一个 $U_{\alpha_0} = \emptyset$，不影响并集。
   考虑 $X \setminus (\cup U_\alpha) = \cap (X \setminus U_\alpha)$。
   由于每一个 $X \setminus U_\alpha$ 都是有限的，它们的交集必然有限。
   故 $\cup U_\alpha$ 是开集。
3. **有限交**：$X \setminus (\cap_{i=1}^n U_i) = \cup_{i=1}^n (X \setminus U_i)$。
有限个有限集的并集仍是有限集。
故 $\cap_{i=1}^n U_i$ 是开集。 $\square$
</details>

---

### 练习 2：证明：$x \in \overline{A} \iff x$ 的每个邻域都与 $A$ 相交

这是一个非常实用的闭包判定定理。

<details>
<summary>Check Solution</summary>

**证明：**

1. **($\implies$)**：若 $x \in A$，结论显然成立。若 $x$ 是 $A$ 的极限点，由定义，其每个邻域包含 $A \setminus \{x\}$ 中的点，自然与 $A$ 相交。
2. **($\impliedby$)**：假设 $x \notin \overline{A}$。
因为 $\overline{A}$ 是闭集，其补集 $U = X \setminus \overline{A}$ 是开集。
显然 $x \in U$。但 $U \cap A = \emptyset$（因为 $A \subset \overline{A}$）。
这与“$x$ 的每个邻域都与 $A$ 相交”矛盾。
故必有 $x \in \overline{A}$。 $\square$
</details>
