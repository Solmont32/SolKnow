---
title: 连续映射与同胚 (Continuity & Homeomorphisms)
description: 拓扑空间之间的“保结构”映射，连续性的拓扑本质。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 连续映射与同胚 (Continuity & Homeomorphisms)

在分析学中，连续性是通过 $\epsilon-\delta$（距离）定义的。在点集拓扑学中，我们发现其本质与距离无关，而仅与**开集的原像**有关。

---

## 1. 连续映射 (Continuous Maps)

### 定义 1.1 (拓扑连续性)

设 $f: X \to Y$ 是两个拓扑空间之间的映射。称 $f$ 在 $X$ 上是**连续的**，如果对于 $Y$ 中的每一个开集 $V$，其原像 $f^{-1}(V)$ 都是 $X$ 中的开集。

<KnowledgeCard type="warning" title="常见误区">
连续性要求**开集的原像**是开集。注意：**开集的像**不一定是开集（例如 $f(x)=x^2$ 将 $(-1, 1)$ 映射为 $[0, 1)$）。
</KnowledgeCard>

---

## 2. 等价判定定理

### 定理 2.1 (闭集原像判定)

$f: X \to Y$ 连续 $\iff$ 对于 $Y$ 中的每一个闭集 $F$，$f^{-1}(F)$ 都是 $X$ 中的闭集。

### 定理 2.2 (局部连续性)

$f: X \to Y$ 连续 $\iff$ 对于每个 $x \in X$ 及 $f(x)$ 的任意邻域 $V$，存在 $x$ 的邻域 $U$ 使得 $f(U) \subset V$。

> 这就是分析学中 $\epsilon-\delta$ 定义的抽象形式。

---

## 3. 同胚 (Homeomorphisms)

同胚是拓扑空间之间的“同构”。如果两个空间同胚，它们在拓扑上是不可区分的。

### 定义 3.1 (同胚)

映射 $f: X \to Y$ 称为**同胚 (Homeomorphism)**，如果：

1. $f$ 是双射（一双一）；
2. $f$ 连续；
3. 其逆映射 $f^{-1}$ 也连续。

<KnowledgeCard type="info" title="拓扑性质 (Topological Property)">
由同胚保持的性质称为拓扑性质。例如：紧致性、连通性、分离公理（$T_2$ 等）。距离和长度**不是**拓扑性质。
</KnowledgeCard>

---

## 4. 拓扑空间的积与子空间 (简述)

- **子空间拓扑**：若 $A \subset X$，则 $A$ 的开集是形如 $U \cap A$ 的集合（其中 $U$ 是 $X$ 的开集）。
- **积拓扑 (Product Topology)**：$X \times Y$ 的基由 $U \times V$ 构成（$U, V$ 分别为各自空间的开集）。

---

## ✍️ 深度练习

### 练习 1：验证连续性 - 常值函数

证明：任何常值函数 $f: X \to Y$（即 $f(x) = c, \forall x \in X$）总是连续的。

<details>
<summary>Check Solution</summary>

**证明：**

1. 取 $Y$ 中的任意开集 $V$。
2. 考虑原像 $f^{-1}(V)$：
   - 若 $c \in V$，则所有的 $x$ 都映射到 $V$，故 $f^{-1}(V) = X$。
   - 若 $c \notin V$，则没有任何点映射到 $V$，故 $f^{-1}(V) = \emptyset$。
3. 由于 $X$ 和 $\emptyset$ 在任何拓扑 $\mathcal{T}$ 中都是开集，故常值函数总是连续的。 $\square$
</details>

---

### 练习 2：证明区间 $(-1, 1)$ 与全实数 $\mathbb{R}$ 同胚

这说明了在拓扑学中，“有界”与“无界”是可以等价的。

<details>
<summary>Check Solution</summary>

**解析：**

1. 构造映射 $f: (-1, 1) \to \mathbb{R}$ 为 $f(x) = \tan(\frac{\pi}{2}x)$。
2. **双射性**：正切函数在 $(-\pi/2, \pi/2)$ 上是严格单调增的且域为 $\mathbb{R}$。
3. **连续性**：在定义域内显然连续。
4. **逆映射连续性**：逆映射 $f^{-1}(y) = \frac{2}{\pi}\arctan(y)$ 在 $\mathbb{R}$ 上也显然连续。
5. **结论**：$(-1, 1) \cong \mathbb{R}$。这证明了长度和有界性不是拓扑性质。
</details>
