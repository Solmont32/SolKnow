---
title: 格论 (Lattice Theory)
description: 偏序关系、格的定义与性质、分配格与有补格
---

# 格论 (Lattice Theory)

格论是研究**具有特定偏序性质**的集合的数学理论。它是布尔代数的结构底座，也是编译原理中数据流分析（Dataflow Analysis）的核心理论。

## 1. 偏序关系回顾

格建立在**偏序集 (Poset)** 之上。

- **偏序集 $\langle P, \le \rangle$**：满足自反性、反对称性、传递性的集合。
- **上界与下界**：对 $A \subseteq P$，若存在 $u \in P$ 使 $\forall a \in A, a \le u$，则 $u$ 为上界。
- **上确界 (LUB/sup)**：最小上界，记作 $A$ 的上确界。
- **下确界 (GLB/inf)**：最大下界，记作 $A$ 的下确界。

## 2. 格的定义

### 2.1 偏序定义

若偏序集 $\langle L, \le \rangle$ 中**任意两个元素** $\{a, b\}$ 都有最小上界和最大下界，则称 $L$ 为**格**。

- $a \lor b$ (Join)：$a, b$ 的最小上界。
- $a \land b$ (Meet)：$a, b$ 的最大下界。

### 2.2 代数定义

格也可以看作代数系统 $\langle L, \lor, \land \rangle$，满足以下公理：

1. **交换律**：$a \lor b = b \lor a, a \land b = b \land a$
2. **结合律**：$(a \lor b) \lor c = a \lor (b \lor c)$
3. **吸收律**：$a \lor (a \land b) = a, a \land (a \lor b) = a$
4. **幂等律**：$a \lor a = a, a \land a = a$

## 3. 特殊格

### 3.1 分配格 (Distributive Lattice)

满足分配律的格：

- $a \lor (b \land c) = (a \lor b) \land (a \lor c)$
- $a \land (b \lor c) = (a \land b) \lor (a \land c)$

### 3.2 有界格 (Bounded Lattice)

存在全集单位元 $1$ (最大元) 和零元 $0$ (最小元) 的格。

### 3.3 有补格 (Complemented Lattice)

在有界格中，若对任意 $a \in L$，都存在 $b \in L$ 使 $a \lor b = 1$ 且 $a \land b = 0$，则称 $b$ 为 $a$ 的**补元**。

## 4. 核心定理

1. **格的保序性**：$a \le b \iff a \land b = a \iff a \lor b = b$。
2. **分配格判定**：一个格是分配格，当且仅当它不包含与 $M_3$ (钻石格) 或 $N_5$ (五角格) 同构的子格。

## 5. 经典练习

:::info 练习 1
设 $D_{30}$ 为 $30$ 的所有正因数集合，关系为整除关系。判断 $\langle D_{30}, | \rangle$ 是否为格，并求 $6 \lor 10$ 和 $6 \land 10$。
:::

<details>
<summary>查看解析</summary>

1. **是否为格**：整除关系下，任何两个数 $a, b$ 的最小上界是最小公倍数 $lcm(a, b)$，最大下界是最大公约数 $gcd(a, b)$。因为 $D_{30}$ 对 $lcm$ 和 $gcd$ 运算封闭，故它是格。
2. **运算结果**：
   - $6 \lor 10 = lcm(6, 10) = 30$
   - $6 \land 10 = gcd(6, 10) = 2$
</details>

   :::info 练习 2证明格中的吸收律：$a \lor (a \land b) = a$。
:::

<details>
<summary>查看解析</summary>

根据偏序定义：

1. $a \land b$ 是 $a$ 和 $b$ 的下确界，故 $a \land b \le a$。
2. 显然 $a \le a$。
3. 因此，$a$ 是集合 $\{a, a \land b\}$ 的一个上界。
4. 设 $u$ 是 $\{a, a \land b\}$ 的任意上界，则 $u \ge a$。
5. 所以 $a$ 是 $\{a, a \land b\}$ 的最小上界，即 $a \lor (a \land b) = a$。
</details>

---

_本章节由 SolKnow 系统根据格论研究构建。_
