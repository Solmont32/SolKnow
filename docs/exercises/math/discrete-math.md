---
title: 离散数学练习库 (Discrete Math Exercises)
---

# 离散数学练习库 (Discrete Math Exercises)

本练习库涵盖命题逻辑、一阶逻辑、集合运算与关系性质。

## 1. 命题逻辑与一阶逻辑

:::info 习题 1.1 (主范式)
求命题公式 $A = (p \to q) \land r$ 的主析取范式 (PDNF)。
:::
<details>
<summary>查看答案</summary>

首先展开 $p \to q$ 为 $\neg p \lor q$。
$A = (\neg p \lor q) \land r = (\neg p \land r) \lor (q \land r)$。
引入缺失变量：
$(\neg p \land (q \lor \neg q) \land r) \lor ((p \lor \neg p) \land q \land r)$
$= (\neg p \land q \land r) \lor (\neg p \land \neg q \land r) \lor (p \land q \land r) \lor (\neg p \land q \land r)$
$= m_3 \lor m_1 \lor m_7 \lor m_3$
$= m_1 \lor m_3 \lor m_7$。
故 PDNF 为 $m_1 \lor m_3 \lor m_7$。
</details>

:::info 习题 1.2 (谓词逻辑证明)
前提：$\forall x (P(x) \lor Q(x))$，$\exists x \neg P(x)$，$\forall x (\neg Q(x) \lor S(x))$。证明：$\exists x S(x)$。
:::
<details>
<summary>查看答案</summary>

1. $\exists x \neg P(x)$ (前提)
2. $\neg P(a)$ (由 1, EI 规则)
3. $\forall x (P(x) \lor Q(x))$ (前提)
4. $P(a) \lor Q(a)$ (由 3, UI 规则)
5. $Q(a)$ (由 2, 4, 析取三段论)
6. $\forall x (\neg Q(x) \lor S(x))$ (前提)
7. $\neg Q(a) \lor S(a)$ (由 6, UI 规则)
8. $S(a)$ (由 5, 7, 析取三段论)
9. $\exists x S(x)$ (由 8, EG 规则)
得证。
</details>

## 2. 集合与关系

:::info 习题 2.1 (集合性质证明)
证明对任意集合 $A, B$：$A \subseteq B \iff A \cap B = A \iff A \cup B = B$。
:::
<details>
<summary>查看答案</summary>

1. 证明 $A \subseteq B \iff A \cap B = A$：
   ($\Rightarrow$) 若 $A \subseteq B$，则 $x \in A \implies x \in B$，故 $x \in A \cap B \iff x \in A$。
   ($\Leftarrow$) 若 $A \cap B = A$，则对任意 $x \in A$ 有 $x \in A \cap B$，故 $x \in B$，即 $A \subseteq B$。
2. 证明 $A \subseteq B \iff A \cup B = B$：
   ($\Rightarrow$) 若 $A \subseteq B$，则 $x \in A \cup B \iff (x \in A \lor x \in B) \implies x \in B$（因为 $x \in A \implies x \in B$），故 $A \cup B \subseteq B$。又显而易见 $B \subseteq A \cup B$，故 $A \cup B = B$。
   ($\Leftarrow$) 类似可证。
</details>

:::info 习题 2.2 (关系闭包)
设 $A = \{1, 2, 3\}$，$R = \{(1, 2), (2, 3)\}$。求 $R$ 的传递闭包 $t(R)$。
:::
<details>
<summary>查看答案</summary>

传递闭包 $t(R)$ 包含所有满足传递性的元组：
$R^1 = \{(1, 2), (2, 3)\}$
$R^2 = \{(1, 3)\}$
$R^3 = \varnothing$
$t(R) = R \cup R^2 \cup R^3 = \{(1, 2), (2, 3), (1, 3)\}$。
</details>

---

_本练习库由 SolKnow 系统自动生成。_
