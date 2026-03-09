---
title: 分离公理 (Separation Axioms)
description: 拓扑空间中点与集合之间“分离”程度的量化，从 T0 到 T4。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 分离公理 (Separation Axioms)

在拓扑学中，我们关心不同点或集合之间是否能通过开集来“区分”。分离公理按照“区分”能力的强弱进行分级。

---

## 1. 基础分离公理 ($T_0, T_1, T_2$)

### $T_0$ (Kolmogorov 空间)
对于任意两个相异的点 $x, y \in X$，存在一个开集包含其中一个点而不包含另一个。

### $T_1$ (Fréchet 空间)
对于任意两个相异的点 $x, y \in X$，各存在一个包含 $x$ 但不含 $y$ 的开集，$y$ 同理。
> **等价性质**：$T_1 \iff$ 所有的单点集 $\{x\}$ 都是闭集。

### $T_2$ (Hausdorff 空间) - **核心重点**
对于任意两个相异的点 $x, y \in X$，存在不相交的开集 $U, V$ 满足 $x \in U$ 且 $y \in V$。

<KnowledgeCard type="success" title="Hausdorff 的重要性">
在 Hausdorff 空间中：
1. 极限是唯一的。
2. 每一个紧集都是闭集。
3. 它是绝大多数数学物理模型的基准要求。
</KnowledgeCard>

---

## 2. 进阶分离公理 ($T_3, T_4$)

### $T_3$ (正则空间 Regular Space)
如果一个空间是 $T_1$ 的，且对于任意闭集 $F$ 和不属于 $F$ 的点 $x$，存在不相交的开集 $U, V$ 满足 $x \in U$ 且 $F \subset V$。

### $T_4$ (正规空间 Normal Space)
如果一个空间是 $T_1$ 的，且对于任意两个互不相交的闭集 $A, B$，存在不相交的开集 $U, V$ 满足 $A \subset U$ 且 $B \subset V$。

<KnowledgeCard type="warning" title="重要层级关系">
$$T_4 \implies T_3 \implies T_2 \implies T_1 \implies T_0$$
并不是所有的拓扑空间都是 $T_4$ 的。度量空间总是 $T_4$ 的。
</KnowledgeCard>

---

## 3. Urysohn 引理与 Tietze 扩张定理

$T_4$ 空间最强大的工具：

### Urysohn 引理
在 $T_4$ 空间中，对于任意两个不相交闭集 $A, B$，存在连续函数 $f: X \to [0, 1]$，使得 $f|_A = 0$ 且 $f|_B = 1$。
> 这意味着在 $T_4$ 空间中，闭集可以通过连续函数被“平滑地分离”。

---

## ✍️ 深度练习

### 练习 1：证明 Hausdorff 空间中，序列的极限唯一
假设 $x_n \to p$ 且 $x_n \to q$，证明 $p=q$。

<details>
<summary>Check Solution</summary>

**证明：**
1. 假设 $p \neq q$。
2. 由 $T_2$ 公理，存在不相交开集 $U, V$，使得 $p \in U, q \in V$。
3. 由 $x_n \to p$，存在 $N_1$ 使得 $n > N_1 \implies x_n \in U$。
4. 由 $x_n \to q$，存在 $N_2$ 使得 $n > N_2 \implies x_n \in V$。
5. 取 $n > \max(N_1, N_2)$，则 $x_n \in U \cap V$。
6. 但 $U \cap V = \emptyset$，产生矛盾。
7. 故必有 $p=q$。 $\square$
</details>

---

### 练习 2：证明所有的度量空间都是 Hausdorff 的

<details>
<summary>Check Solution</summary>

**证明：**
1. 取相异两点 $x, y \in X$。
2. 记 $d = d(x, y)$。由于 $x \neq y$，由正定性 $d > 0$。
3. 取 $r = d/3$。
4. 构造开集 $U = B(x, r)$，$V = B(y, r)$。
5. 显然 $x \in U, y \in V$。
6. 若 $z \in U \cap V$，则 $d(x, z) < d/3$ 且 $d(z, y) < d/3$。
7. 由三角不等式 $d(x, y) \leq d(x, z) + d(z, y) < 2d/3$。
8. 得到 $d < 2d/3$，即 $1 < 2/3$，矛盾。
9. 故 $U \cap V = \emptyset$，度量空间满足 $T_2$ 公理。 $\square$
</details>
