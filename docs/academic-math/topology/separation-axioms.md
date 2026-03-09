---
title: 分离公理 (Separation Axioms)
description: 拓扑空间中点与集合之间“分离”程度的量化，从 T0 到 T4。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { ShieldCheck, Layers, Zap } from 'lucide-react';

# 分离公理 (Separation Axioms)

在拓扑学中，我们关心不同点或集合之间是否能通过开集来“区分”。分离公理按照“区分”能力的强弱进行分级，这决定了空间中“点”与“点”、“点”与“闭集”、“闭集”与“闭集”之间的解离程度。

---

## 1. 基础分离公理：点与点的分离

这些公理描述了空间中最基本的“点”的拓扑可区分性。

### $T_0$ (Kolmogorov 空间)
对于任意两个相异的点 $x, y \in X$，存在一个开集包含其中一个点而不包含另一个。
> **本质**：点在拓扑上不是“完全等价”的。

### $T_1$ (Fréchet 空间)
对于任意两个相异的点 $x, y \in X$，存在包含 $x$ 但不含 $y$ 的开集 $U$，且存在包含 $y$ 但不含 $x$ 的开集 $V$。
> **关键性质**：$X$ 是 $T_1$ 的 $\iff$ 所有的单点集 $\{x\}$ 都是闭集。这保证了我们可以谈论“除掉一个点后的开集”。

### $T_2$ (Hausdorff 空间)
对于任意两个相异的点 $x, y \in X$，存在**不相交**的开集 $U, V$ 满足 $x \in U$ 且 $y \in V$。
> **地位**：这是现代分析最基本的要求。在 $T_2$ 空间中，序列的极限是唯一的。

---

## 2. 进阶分离公理：点与闭集、闭集与闭集

在涉及闭集分离时，通常区分“正则性/正规性”与“$T_i$ 性质”。

### 正则 (Regular) 与 $T_3$
- **正则空间**：对于任意闭集 $F$ 和 $x \notin F$，存在不相交开集分离 $x$ 与 $F$。
- **$T_3$ 空间** = $T_1$ + 正则。
> 在 $T_3$ 空间中，闭邻域系构成每个点的邻域基。

### 完全正则 (Completely Regular) 与 $T_{3\frac{1}{2}}$
- **完全正则**：对于任意闭集 $F$ 和 $x \notin F$，存在连续函数 $f: X \to [0, 1]$ 满足 $f(x) = 0, f(F) = 1$。
- **$T_{3\frac{1}{2}}$ (Tychonoff 空间)** = $T_1$ + 完全正则。
> **重要性**：它是能够嵌入到 $[0, 1]^I$ 积空间中的必要充分条件。

### 正规 (Normal) 与 $T_4$
- **正规空间**：对于任意两个不相交闭集 $A, B$，存在不相交开集 $U, V$ 分离它们。
- **$T_4$ 空间** = $T_1$ + 正规。

---

## 3. 分离公理的支柱：Urysohn 与 Tietze

这是正规空间 ($T_4$) 如此强大的原因：它允许我们构造足够多的连续函数。

### <Zap className="solknow-amber" size={20} inline /> Urysohn 引理 (Urysohn's Lemma)
设 $X$ 是正规空间，$A, B$ 是其两个不相交闭集。则存在连续函数 $f: X \to [0, 1]$ 使得 $f|_A = 0$ 且 $f|_B = 1$。
> **推论**：所有的 $T_4$ 空间都是 $T_{3\frac{1}{2}}$ 的。

### <Zap className="solknow-amber" size={20} inline /> Tietze 扩张定理
设 $X$ 是正规空间，$A$ 是其闭子集。若 $f: A \to \mathbb{R}$ 是连续映射，则存在 $f$ 在 $X$ 上的连续扩张 $F: X \to \mathbb{R}$，使得 $F|_A = f$。

---

<KnowledgeCard type="success" title="分离公理层级图">
$$T_4 \implies T_{3\frac{1}{2}} \implies T_3 \implies T_2 \implies T_1 \implies T_0$$
注意：反向推导通常不成立。例如，$T_2$ 不一定 $T_3$，$T_3$ 不一定 $T_4$。
</KnowledgeCard>

---

## ✍️ 深度练习与例题

### 例题 1：紧致 Hausdorff 空间必为正规空间 ($T_4$)
这是一个极其重要的结论，它连接了紧致性与分离性。

<details>
<summary>Check Solution</summary>

**证明策略：**
1. **先证正则性**：固定 $x \notin F$ ($F$ 闭 $\implies F$ 紧)。对于每个 $y \in F$，由 $T_2$ 性质，存在不交开集 $U_y \ni x, V_y \ni y$。 $\{V_y\}_{y \in F}$ 覆盖紧集 $F$，取有限子覆盖 $V_{y_1}, \dots, V_{y_n}$。令 $V = \bigcup V_{y_i}, U = \bigcap U_{y_i}$。则 $U \cap V = \emptyset$ 且 $x \in U, F \subset V$。
2. **再证正规性**：同理，取不交闭集 $A, B$。由于 $X$ 紧，则 $A, B$ 均紧。利用上述已证的正则性，对 $A$ 中的每个点进行覆盖并取有限子覆盖即可。
3. **结论**：紧致 $T_2 \implies T_3 \implies T_4$。 $\square$
</details>

### 例题 2：度量空间总是正规的
证明任何度量空间 $(X, d)$ 都是正规空间。

<details>
<summary>Check Solution</summary>

**证明：**
1. 设 $A, B \subset X$ 是不相交闭集。
2. 定义函数 $d(x, A) = \inf_{a \in A} d(x, a)$。由于 $A$ 是闭集，$d(x, A) = 0 \iff x \in A$。
3. 构造 $U = \{x \in X \mid d(x, A) < d(x, B)\}$，$V = \{x \in X \mid d(x, B) < d(x, A)\}$。
4. 由于 $d(x, A)$ 是关于 $x$ 的连续函数，$U$ 和 $V$ 作为连续不等式的解集是开集。
5. 显然 $A \subset U, B \subset V$ 且 $U \cap V = \emptyset$。
6. 因此度量空间是正规的。 $\square$
</details>

### 练习 1：关于 $T_1$ 的等价判定
证明 $X$ 是 $T_1$ 的当且仅当对于任意 $x \in X$，单点集 $\{x\}$ 等于包含它的所有开集的交集。

<details>
<summary>Check Solution</summary>

**解析：**
1. **必要性**：若 $X$ 是 $T_1$ 的，则对任意 $y \neq x$，存在开集 $U_y \ni x$ 且 $y \notin U_y$。因此 $\bigcap_{U \ni x} U$ 中不含任何 $y \neq x$，即该交集为 $\{x\}$。
2. **充分性**：若 $\bigcap_{U \ni x} U = \{x\}$，则对任意 $y \neq x$，必然存在某个开集 $V \ni x$ 使得 $y \notin V$。由于 $x, y$ 的对称性（可以对 $y$ 做同样操作），满足 $T_1$ 定义。
</details>

### 练习 2：Urysohn 引理的逆命题
如果一个 $T_1$ 空间满足 Urysohn 引理（即不交闭集可由连续函数分离），证明它是正规空间。

<details>
<summary>Check Solution</summary>

**解析：**
1. 设 $A, B$ 是不交闭集。根据前提，存在连续函数 $f: X \to [0, 1]$ 使得 $f|_A = 0, f|_B = 1$。
2. 取开集 $U = f^{-1}([0, 1/3))$ 和 $V = f^{-1}((2/3, 1])$。
3. 显然 $A \subset U, B \subset V$ 且 $U \cap V = \emptyset$。
4. 因此空间是正规的。
</details>
