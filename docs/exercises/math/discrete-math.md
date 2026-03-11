---
title: 离散数学练习库 (Discrete Math Exercises)
---

# 离散数学练习库 (Discrete Math Exercises)

本练习库对标经典离散数学教材，涵盖命题演算、集合论、代数系统与格论的深度练习。

## 1. 命题逻辑与形式证明

:::info 习题 1.1 (主范式计算)
求命题公式 $A = (p \to q) \land r$ 的主析取范式 (PDNF)。
:::

<details>
<summary>查看答案</summary>

首先展开 $p \to q$ 为 $\neg p \lor q$。
$A = (\neg p \lor q) \land r = (\neg p \land r) \lor (q \land r)$。
引入缺失变量：
$(\neg p \land (q \lor \neg q) \land r) \lor ((p \lor \neg p) \land q \land r)$
$= (\neg p \land q \land r) \lor (\neg p \land \neg q \land r) \lor (p \land q \land r) \lor (\neg p \land q \land r)$
$= m_3 \lor m_1 \lor m_7$。
故 PDNF 为 $m_1 \lor m_3 \lor m_7$。

</details>

:::info 习题 1.2 (自然推理证明)
使用自然推理证明 $(p \to r) \lor (q \to s) \equiv (p \land q) \to (r \lor s)$。
:::

<details>
<summary>查看答案</summary>

1. 假设 $p \land q$。
2. 假设 $p \to r$。由 $p \land q$ 得 $p$，进而由 MP 规则得 $r$。则 $r \lor s$ 成立。
3. 假设 $q \to s$。由 $p \land q$ 得 $q$，进而由 MP 规则得 $s$。则 $r \lor s$ 成立。
4. 由于前提中 $(p \to r) \lor (q \to s)$ 至少一个成立，故 $r \lor s$ 恒成立。
5. 结论：$(p \land q) \to (r \lor s)$。
</details>

## 2. 集合、关系与闭包

:::info 习题 2.1 (关系组合)
设 $R$ 和 $S$ 是 $A$ 上的等价关系。问 $R \cup S$ 是否一定是等价关系？
:::

<details>
<summary>查看答案</summary>

**不一定。**
反例：设 $A = \{1, 2, 3\}$，$R = \{(1, 1), (2, 2), (3, 3), (1, 2), (2, 1)\}$，$S = \{(1, 1), (2, 2), (3, 3), (2, 3), (3, 2)\}$。
$R \cup S$ 包含 $(1, 2)$ 和 $(2, 3)$，但不包含 $(1, 3)$。
故 $R \cup S$ 不满足传递性，不是等价关系。

</details>

## 3. 代数系统基础

:::info 习题 3.1 (群的阶数性质)
证明：若群 $G$ 中每个元素 $x$ 都满足 $x^2 = e$，则 $G$ 必是 Abel 群。
:::

<details>
<summary>查看答案</summary>

对任意 $a, b \in G$：

1. 因为 $(ab)^2 = e$，所以 $abab = e$。
2. 等式左右同时左乘 $a$，得 $aabab = ae \implies bab = a$ (利用 $a^2=e$)。
3. 再同时右乘 $b$，得 $babb = ab \implies ba = ab$ (利用 $b^2=e$)。
故 $G$ 是 Abel 群。
</details>

:::info 习题 3.2 (子半群判定)
设 $\langle \mathbb{Z}, + \rangle$ 是整数加法群。集合 $S = \{2k | k \in \mathbb{N}\}$ 是其子群吗？
:::

<details>
<summary>查看答案</summary>

**不是子群，但它是子半群。**

1. **封闭性**：$2k_1 + 2k_2 = 2(k_1+k_2)$，仍在 $S$ 中，满足结合律，是半群。
2. **单位元**：$0 \in S$ (当 $k=0$ 时)。
3. **逆元**：对正偶数 $2k$，其逆元 $-2k$ 不在 $S$ 中（因为 $\mathbb{N}$ 通常不含负数，除非定义包含 $\mathbb{Z}$）。
若 $S$ 定义在 $\mathbb{N}$ 上，则无逆元，不是子群。
</details>

## 4. 格论与布尔代数

:::info 习题 4.1 (格的分配律判定)
画出五角格 $N_5$ 的哈斯图，并说明它为什么不是分配格。
:::

<details>
<summary>查看答案</summary>

哈斯图结构：$0 < c < a < 1$ 且 $0 < b < 1$，其中 $b$ 与 $a, c$ 不可比。
选取元素 $a, b, c$：

- $a \land (b \lor c) = a \land 1 = a$
- $(a \land b) \lor (a \land c) = 0 \lor c = c$
因为 $a \neq c$，分配律不成立。
</details>

:::info 习题 4.2 (布尔代数化简)
代数化简布尔表达式 $f = \overline{(A + B)} + \bar A B$。
:::

<details>
<summary>查看答案</summary>

1. 利用德摩根律展开第一项：$\overline{A+B} = \bar A \bar B$。
2. $f = \bar A \bar B + \bar A B$。
3. 提取公因子 $\bar A$：$f = \bar A (\bar B + B)$。
4. 利用互补律 $\bar B + B = 1$：$f = \bar A \cdot 1 = \bar A$。
故最简式为 $\bar A$。
</details>

---

_本练习库由 SolKnow 系统深度扩容，旨在强化抽象思维能力。_
