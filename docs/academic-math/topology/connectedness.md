---
title: 连通性 (Connectedness)
description: 拓扑空间是否“连在一起”，介值定理的拓扑基础。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 连通性 (Connectedness)

连通性直观上描述了一个空间是否由“一块”构成。在分析学中，它是**介值定理 (Intermediate Value Theorem)** 的根源。

---

## 1. 连通性的核心定义

### 定义 1.1 (分离 Separation)
拓扑空间 $X$ 的一个**分离**是指两个不相交的非空开集 $U, V$，满足 $U \cup V = X$。

### 定义 1.2 (连通性)
如果 $X$ 不存在分离，则称 $X$ 是**连通的 (Connected)**。
> **等价判定**：$X$ 是连通的 $\iff$ $X$ 中既开又闭 (clopen) 的集合只有 $\emptyset$ 和 $X$。

---

## 2. 连续映射与连通性

### 定理 2.1
如果 $f: X \to Y$ 是连续映射且 $X$ 是连通的，则其像 $f(X)$ 也是连通的。

<KnowledgeCard type="success" title="介值定理的本质">
实数集 $\mathbb{R}$ 中的连通子集只有区间。
因为连续函数保持连通性，所以它必然将区间映射为区间。
这就是为什么连续函数可以取到中间任何一个值的原因。
</KnowledgeCard>

---

## 3. 路径连通性 (Path-Connectedness)

这是一个比连通性更强的、更符合几何直觉的概念。

### 定义 3.1
如果 $X$ 中任意两点 $x, y$ 都可以由一条**连续曲线**（即连续映射 $\gamma: [0, 1] \to X$ 满足 $\gamma(0)=x, \gamma(1)=y$）连接，则称 $X$ 是**路径连通的**。

<KnowledgeCard type="warning" title="关系">
路径连通 $\implies$ 连通。
但反之不一定成立（经典反例：Topologist's Sine Curve，拓扑学家的正弦曲线）。
</KnowledgeCard>

---

## ✍️ 深度练习

### 练习 1：证明实数轴 $\mathbb{R}$ 除去一个点后不再连通
证明 $\mathbb{R} \setminus \{0\}$ 是不连通的。

<details>
<summary>Check Solution</summary>

**证明：**
1. 令 $X = \mathbb{R} \setminus \{0\}$。
2. 构造两个集合 $U = (-\infty, 0)$ 和 $V = (0, +\infty)$。
3. $U, V$ 都是 $\mathbb{R}$ 中的开集，因此也是 $X$ 在子空间拓扑下的开集。
4. 显然 $U \cap V = \emptyset$ 且 $U \cup V = X$。
5. 且 $U, V$ 均为非空集合。
6. 结论：$U, V$ 构成了 $X$ 的一个分离，故 $X$ 不连通。 $\square$
</details>

---

### 练习 2：证明连通集的闭包仍是连通的
设 $E$ 是 $X$ 中的连通子集，证明 $\overline{E}$ 也是连通的。

<details>
<summary>Check Solution</summary>

**证明：**
1. 假设 $\overline{E}$ 不连通，则存在 $\overline{E}$ 的分离 $U, V$。
2. 因为 $E \subset \overline{E}$，且 $E$ 连通，则 $E$ 必然全落在 $U$ 中或全落在 $V$ 中（不能两边都占，否则 $U \cap E$ 和 $V \cap E$ 将构成 $E$ 的分离）。
3. 假设 $E \subset U$。
4. 因为 $U \cap V = \emptyset$ 且 $V$ 是开集，由闭包性质，$V \cap \overline{E} \neq \emptyset$ 意味着 $V \cap E \neq \emptyset$。
5. 但 $E \subset U \implies V \cap E = \emptyset$，产生矛盾。
6. 故 $\overline{E}$ 必然连通。 $\square$
</details>
