---
title: 连通性 (Connectedness)
description: 拓扑空间是否“连在一起”，介值定理的拓扑基础。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 连通性 (Connectedness)

连通性描述了一个拓扑空间是否由“单一整体”构成。它是实分析中**介值定理 (IVT)** 在抽象空间中的本质推广。

---

## 1. 连通性基础

### 定义 1.1 (分离)
如果存在两个不相交的非空开集 $U, V$ 满足 $U \cup V = X$，则称 $\{U, V\}$ 是 $X$ 的一个**分离**。

### 定义 1.2 (连通空间)
如果 $X$ 不存在分离，则称 $X$ 是**连通的**。
> **等价刻画**：$X$ 是连通的 $\iff$ $X$ 中唯一既开又闭 (clopen) 的子集是 $\emptyset$ 和 $X$ 本身。

---

## 2. 路径连通性 (Path-Connectedness)

这是一个更符合几何直观的强连通概念。

### 定义 2.1 (路径)
$X$ 中连接 $x, y$ 的一条路径是指连续映射 $f: [0, 1] \to X$ 满足 $f(0)=x, f(1)=y$。

### 定义 2.2 (路径连通)
如果 $X$ 中任意两点间都存在路径，则称 $X$ 是**路径连通的**。

<KnowledgeCard type="warning" title="路径连通 vs 连通">
**路径连通 $\implies$ 连通**。
但反之不真。最著名的反例是 **拓扑学家的正弦曲线 (Topologist's Sine Curve)**。
</KnowledgeCard>

---

## 3. 连通分支与局部连通性

### 连通分支 (Connected Components)
每一个拓扑空间都可以分解为极大连通子集的并。这些子集称为**连通分支**。连通分支总是闭的。

### 局部连通 (Locally Connected)
如果在每个点 $x$ 处都存在由连通开集构成的邻域基，则称 $X$ 为**局部连通的**。
> 区分：路径连通与局部路径连通。

---

## ✍️ 深度练习与例题

### 例题 1：证明 $\mathbb{R}$ 的连通子集必是区间
证明：若 $A \subset \mathbb{R}$ 连通，则对任意 $x, y \in A$ 且 $x < z < y$，必有 $z \in A$。

<details>
<summary>Check Solution</summary>

**证明：**
1. 反证法：假设存在 $x, y \in A$ 且 $z \notin A$ 满足 $x < z < y$。
2. 构造 $U = (-\infty, z) \cap A$ 和 $V = (z, +\infty) \cap A$。
3. $U, V$ 是 $A$ 中的开集（子空间拓扑）。
4. 因为 $z \notin A$，所以 $U \cup V = A$。
5. 且 $U \cap V = \emptyset$。
6. 由于 $x \in U$ 且 $y \in V$，故 $U, V$ 均非空。
7. 因此 $\{U, V\}$ 构成了 $A$ 的一个分离，这与 $A$ 连通矛盾。
8. 故 $A$ 必须满足区间性质。 $\square$
</details>

---

### 例题 2：证明连通空间的连续像是连通的

<details>
<summary>Check Solution</summary>

**证明：**
1. 设 $f: X \to Y$ 连续且 $X$ 连通。
2. 假设 $f(X)$ 不连通，则存在 $f(X)$ 的分离 $\{U, V\}$。
3. 根据子空间拓扑，$U = f(X) \cap G_U$，$V = f(X) \cap G_V$，其中 $G_U, G_V$ 是 $Y$ 中的开集。
4. 令 $U' = f^{-1}(G_U)$，$V' = f^{-1}(G_V)$。由于 $f$ 连续，$U', V'$ 是 $X$ 中的开集。
5. 因为 $U, V$ 分离 $f(X)$，易证 $U', V'$ 分离 $X$。
6. 这与 $X$ 连通矛盾。
7. 故 $f(X)$ 必连通。 $\square$
</details>

---

### 练习 1：拓扑学家的正弦曲线
考虑集合 $S = \{ (x, \sin(1/x)) \mid 0 < x \leq 1 \} \cup \{ (0, y) \mid -1 \leq y \leq 1 \}$。
1. 证明 $S$ 是连通的。
2. 证明 $S$ 不是路径连通的。

<details>
<summary>Check Solution</summary>

**解析：**
1. 令 $S_0 = \{ (x, \sin(1/x)) \mid x > 0 \}$。$S_0$ 是原点外曲线部分的像，由连通集 $(0, 1]$ 连续映射得到，故 $S_0$ 连通。
2. $S$ 恰好是 $S_0$ 的闭包 $\overline{S_0}$。连通集的闭包必连通，故 $S$ 连通。
3. 但在原点处，曲线由于无限震荡，无法通过有限长度的连续路径与 $y$ 轴上的点相连。故不满足路径连通。
</details>

---

### 练习 2：证明若 $X$ 是局部路径连通的，则其连通分支与路径连通分支一致

<details>
<summary>Check Solution</summary>

**解析提示：**
1. 路径连通分支总是落在连通分支内。
2. 利用局部路径连通性，可以证明每个路径连通分支都是开集。
3. 开集的补集（其余路径分支之并）也是开集，故路径分支是既开又闭的。
4. 在连通分支内，唯一的非空既开又闭集是分支本身。
5. 故连通分支必然也是路径连通的。 $\square$
</details>
