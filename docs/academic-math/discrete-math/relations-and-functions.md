---
title: 关系与函数 (Relations and Functions)
description: 等价关系、偏序关系与映射结构
---

# 关系与函数 (Relations and Functions)

关系与函数是离散数学的核心，描述了集合中元素之间的结构。

## 1. 二元关系 (Binary Relations)

设 $A$ 为非空集合，$R \subseteq A \times A$ 称为 $A$ 上的二元关系。

### 1.1 关系的性质

1. **自反性 (Reflexive)**: $\forall a \in A, (a, a) \in R$。
2. **反自反性 (Irreflexive)**: $\forall a \in A, (a, a) \notin R$。
3. **对称性 (Symmetric)**: $(a, b) \in R \implies (b, a) \in R$。
4. **反对称性 (Antisymmetric)**: $(a, b) \in R \land (b, a) \in R \implies a = b$。
5. **传递性 (Transitive)**: $(a, b) \in R \land (b, c) \in R \implies (a, c) \in R$。

## 2. 等价关系 (Equivalence Relations)

若关系 $R$ 同时满足 **自反性**、**对称性** 和 **传递性**，则称 $R$ 为 $A$ 上的等价关系。

### 2.1 等价类与划分

对于等价关系 $R$，$a$ 的 **等价类** 定义为：
$$[a]_R = \{x \in A \mid (a, x) \in R\}$$
所有等价类的集合构成 $A$ 的一个 **划分**。

## 3. 偏序关系 (Partial Ordering)

若关系 $R$ 同时满足 **自反性**、**反对称性** 和 **传递性**，则称 $R$ 为 $A$ 上的偏序关系，记作 $\preceq$。

### 3.1 偏序集 (Poset)

定义了偏序关系的集合 $(A, \preceq)$ 称为偏序集。

- **全序 (Total Order)**: 若集合中任意两个元素都可比。

## 4. 经典例题

:::info 例题 1 (等价关系)
在整数集 $\mathbb{Z}$ 上定义关系 $R$：$(a, b) \in R \iff a \equiv b \pmod m$。证明 $R$ 是等价关系。
:::

<details>
<summary>查看解析</summary>

1. **自反性**: $a - a = 0$ 能被 $m$ 整除，故 $(a, a) \in R$。
2. **对称性**: 若 $a - b$ 能被 $m$ 整除，则 $b - a = -(a - b)$ 也能被 $m$ 整除，故 $(a, b) \in R \implies (b, a) \in R$。
3. **传递性**: 若 $a - b = k_1 m$，$b - c = k_2 m$，则 $a - c = (a - b) + (b - c) = (k_1 + k_2) m$。故 $(a, c) \in R$。
得证。
</details>

:::info 例题 2 (偏序关系与 Hasse 图)
设 $A = \{1, 2, 3, 6, 12\}$，偏序关系为整除关系 $|$。
:::

<details>
<summary>查看解析</summary>

自反、反对称、传递显而易见。
Hasse 图描述如下：
12 位于最顶端，
6 在其下方，
2 和 3 分别在 6 的下方，
1 在最底端。

</details>

---

_本章节由 SolKnow 系统根据经典离散数学教材重写。_
