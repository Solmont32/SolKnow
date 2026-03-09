---
title: 分离公理 (Separation Axioms)
description: 拓扑空间中点与集合之间“分离”程度的量化，从 T0 到 T4。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 分离公理 (Separation Axioms)

在拓扑学中，我们关心不同点或集合之间是否能通过开集来“区分”。分离公理按照“区分”能力的强弱进行分级，这决定了空间中“点”与“点”、“点”与“闭集”、“闭集”与“闭集”之间的解离程度。

---

## 1. 基础分离公理 ($T_0, T_1, T_2$)

这些公理主要描述“点”的性质。

### $T_0$ (Kolmogorov 空间)
对于任意两个相异的点 $x, y \in X$，存在一个开集包含其中一个点而不包含另一个。
> 直观理解：空间中的点至少在拓扑上是“可区分的”。

### $T_1$ (Fréchet 空间)
对于任意两个相异的点 $x, y \in X$，存在包含 $x$ 但不含 $y$ 的开集 $U$，且存在包含 $y$ 但不含 $x$ 的开集 $V$。
> **等价性质**：$X$ 是 $T_1$ 的 $\iff$ 所有的单点集 $\{x\}$ 都是闭集。

### $T_2$ (Hausdorff 空间) - **核心重点**
对于任意两个相异的点 $x, y \in X$，存在不相交的开集 $U, V$ 满足 $x \in U$ 且 $y \in V$。
> **重要性**：在 Hausdorff 空间中，序列的极限是唯一的。绝大多数分析学讨论都在 $T_2$ 空间中进行。

---

## 2. 进阶分离公理 ($T_3, T_{3\frac{1}{2}}, T_4$)

这些公理涉及到“闭集”的分离。

### $T_3$ (正则空间 Regular Space)
如果一个空间是 $T_1$ 的，且对于任意闭集 $F$ 和不属于 $F$ 的点 $x$，存在不相交的开集 $U, V$ 满足 $x \in U$ 且 $F \subset V$。

### $T_{3\frac{1}{2}}$ (完全正则空间 Tychonoff Space)
如果一个空间是 $T_1$ 的，且对于任意闭集 $F$ 和不属于 $F$ 的点 $x$，存在连续函数 $f: X \to [0, 1]$ 满足 $f(x) = 0$ 且 $f|_F = 1$。
> **重要性**：完全正则空间是能够嵌入到立方体 $[0, 1]^I$ 中的空间。

### $T_4$ (正规空间 Normal Space)
如果一个空间是 $T_1$ 的，且对于任意两个互不相交的闭集 $A, B$，存在不相交的开集 $U, V$ 满足 $A \subset U$ 且 $B \subset V$。
> **注意**：度量空间总是 $T_4$ 的。紧致的 Hausdorff 空间也是 $T_4$ 的。

---

## 3. 分离公理的支柱：Urysohn 与 Tietze

在 $T_4$ 空间中，我们拥有最强大的连续函数构造工具。

### Urysohn 引理 (Urysohn's Lemma)
设 $X$ 是 $T_4$ 空间，$A, B$ 是其两个不相交闭集。则存在连续函数 $f: X \to [0, 1]$ 使得 $f|_A = 0$ 且 $f|_B = 1$。
> 这证明了在正规空间中，闭集不仅可以被开集分离，还可以被连续函数“平滑地”分离。

### Tietze 扩张定理 (Tietze Extension Theorem)
设 $X$ 是 $T_4$ 空间，$A$ 是其闭子集。若 $f: A \to [a, b]$（或 $\mathbb{R}$）是连续映射，则存在 $f$ 在 $X$ 上的连续扩张 $F: X \to [a, b]$（或 $\mathbb{R}$），使得 $F|_A = f$。

<KnowledgeCard type="success" title="分离公理层级关系">
$$T_4 \implies T_{3\frac{1}{2}} \implies T_3 \implies T_2 \implies T_1 \implies T_0$$
每一个箭头都代表了拓扑结构的进一步丰富。
</KnowledgeCard>

---

## ✍️ 深度练习与例题

### 例题 1：证明 Hausdorff 空间的子空间也是 Hausdorff 的
设 $X$ 是 $T_2$ 空间，$A \subset X$ 是其子集，赋予子空间拓扑。证明 $A$ 是 $T_2$ 空间。

<details>
<summary>Check Solution</summary>

**证明：**
1. 取 $a_1, a_2 \in A$ 且 $a_1 \neq a_2$。
2. 由于 $a_1, a_2 \in X$ 且 $X$ 是 $T_2$ 的，存在 $X$ 中的开集 $U, V$ 使得 $a_1 \in U, a_2 \in V$ 且 $U \cap V = \emptyset$。
3. 令 $U_A = U \cap A$，$V_A = V \cap A$。根据子空间拓扑的定义，$U_A$ 和 $V_A$ 都是 $A$ 中的开集。
4. 显然 $a_1 \in U_A, a_2 \in V_A$ 且 $U_A \cap V_A = (U \cap A) \cap (V \cap A) = (U \cap V) \cap A = \emptyset \cap A = \emptyset$。
5. 结论：$A$ 满足 $T_2$ 公理。 $\square$
</details>

---

### 例题 2：证明所有的 $T_1$ 空间中单点集都是闭集

<details>
<summary>Check Solution</summary>

**证明：**
1. 设 $X$ 是 $T_1$ 空间，取 $x \in X$。我们要证明 $X \setminus \{x\}$ 是开集。
2. 对于任意 $y \in X \setminus \{x\}$，有 $y \neq x$。
3. 根据 $T_1$ 公理，存在包含 $y$ 但不包含 $x$ 的开集 $U_y$。
4. 显然 $U_y \subset X \setminus \{x\}$。
5. 则 $X \setminus \{x\} = \bigcup_{y \neq x} U_y$。
6. 由于开集的并集仍是开集，故 $X \setminus \{x\}$ 是开集，即 $\{x\}$ 是闭集。 $\square$
</details>

---

### 练习 1：正规性不是遗传的
虽然 Hausdorff 性质可以遗传给子空间，但正规性 ($T_4$) 并不一定能遗传。请查阅并思考 **Sorgenfrey 平面** 或 **Tychonoff 板 (Tychonoff Plank)** 的例子。

<details>
<summary>Check Solution</summary>

**解析：**
1. **Sorgenfrey 直线** $\mathbb{R}_l$ 是 $T_4$ 的。
2. 但其积空间 $\mathbb{R}_l \times \mathbb{R}_l$（Sorgenfrey 平面）不是 $T_4$ 的。
3. 这说明 $T_4$ 性质在子空间（甚至积空间）下不一定保持。这与 $T_2, T_3$ 有显著区别。
</details>

---

### 练习 2：证明紧致 Hausdorff 空间必是正规空间 ($T_4$)

<details>
<summary>Check Solution</summary>

**证明：**
1. 设 $X$ 是紧致 Hausdorff 空间。
2. 第一步：证明 $X$ 是正则的 ($T_3$)。取闭集 $F$ 和 $x \notin F$。由于 $X$ 紧且 $F$ 闭，则 $F$ 也是紧的。对每个 $y \in F$，由 $T_2$ 存在不交开集 $U_y \ni x, V_y \ni y$。 $\{V_y\}_{y \in F}$ 覆盖 $F$，由紧性取有限子覆盖 $V_{y_1}, \dots, V_{y_n}$。令 $V = \cup V_{y_i}, U = \cap U_{y_i}$，则 $x \in U, F \subset V$ 且 $U \cap V = \emptyset$。
3. 第二步：同理，取不交闭集 $A, B$。由 $T_3$，对每个 $a \in A$，存在不交开集 $U_a \ni a, V_a \supset B$。利用 $A$ 的紧性取有限并即可得到分离 $A$ 与 $B$ 的开集。
4. 结论：紧致 $T_2 \implies T_4$。 $\square$
</details>
