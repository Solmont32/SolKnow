---
title: 集合论：集合代数与基数 (Set Theory)
description: 从集合运算到关系、函数与可数性
---

# 集合论：集合代数与基数

集合论是离散数学的基石。

## 1. 集合的基本概念

### 1.1 集合表示
- **列举法**: $A = \{a, b, c\}$。
- **描述法**: $B = \{x \in \mathbb{R} \mid x^2 - 1 = 0\}$。

### 1.2 集合包含与相等
- **包含**: $A \subseteq B \iff \forall x (x \in A \to x \in B)$。
- **相等**: $A = B \iff (A \subseteq B \land B \subseteq A)$。

### 1.3 幂集 (Power Set)
对于集合 $A$，其所有子集构成的集合称为 **幂集** $\mathcal{P}(A)$。
若 $|A| = n$，则 $|\mathcal{P}(A)| = 2^n$。

## 2. 集合运算与性质

### 2.1 基本运算
- **并集**: $A \cup B = \{x \mid x \in A \lor x \in B\}$。
- **交集**: $A \cap B = \{x \mid x \in A \land x \in B\}$。
- **差集**: $A \setminus B = \{x \mid x \in A \land x \notin B\}$。
- **补集**: $A^c = \{x \in U \mid x \notin A\}$。

### 2.2 集合恒等式
1. **结合律**: $(A \cup B) \cup C = A \cup (B \cup C)$。
2. **分配律**: $A \cup (B \cap C) = (A \cup B) \cap (A \cup C)$。
3. **德·摩根律**: $(A \cup B)^c = A^c \cap B^c$。

## 3. 经典例题

:::info 例题 1 (幂集)
设 $A = \{1, \{2, 3\}, \varnothing\}$，求 $\mathcal{P}(A)$。
:::
<details>
<summary>查看解析</summary>

$A$ 共有 3 个元素。$\mathcal{P}(A)$ 包含 $2^3 = 8$ 个元素：
$\mathcal{P}(A) = \{ \varnothing, \{1\}, \{\{2, 3\}\}, \{\varnothing\}, \{1, \{2, 3\}\}, \{1, \varnothing\}, \{\{2, 3\}, \varnothing\}, A \}$。
</details>

:::info 例题 2 (集合包含关系证明)
证明：$A \cap (B \setminus C) = (A \cap B) \setminus C$。
:::
<details>
<summary>查看解析</summary>

$$A \cap (B \setminus C) = \{x \mid x \in A \land (x \in B \land x \notin C)\}$$
$$= \{x \mid (x \in A \land x \in B) \land x \notin C\}$$
$$= (A \cap B) \setminus C$$
</details>

---

_本章节由 SolKnow 系统根据经典离散数学教材重写。_
