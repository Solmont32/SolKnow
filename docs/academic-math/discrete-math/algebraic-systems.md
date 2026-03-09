---
title: 代数系统基础 (Algebraic Systems)
description: 二元运算、代数系统性质、子系统与同态同构
---

# 代数系统基础

代数系统是离散数学中研究“集合+运算”结构的抽象分支。它为计算机科学中的数据结构（如栈、队列的性质）和信息安全（如 RSA 加密的群论基础）提供了统一的数学语言。

## 1. 二二元运算及其性质

### 1.1 定义
设 $S$ 为集合，函数 $f: S \times S \to S$ 称为 $S$ 上的**二元运算**。
- **封闭性**：二元运算的结果必须仍在 $S$ 中（定义中已包含）。

### 1.2 核心性质
设 $*$ 是 $S$ 上的运算：
1. **交换律**：$x * y = y * x$
2. **结合律**：$(x * y) * z = x * (y * z)$
3. **幂等律**：$x * x = x$
4. **分配律**：若有两运算 $*$ 和 $\circ$，满足 $x * (y \circ z) = (x * y) \circ (x * z)$。

### 1.3 特殊元素
- **单位元 (Identity)**：存在 $e \in S$，使 $\forall x \in S, x * e = e * x = x$。
- **零元 (Zero)**：存在 $\theta \in S$，使 $\forall x \in S, x * \theta = \theta * x = \theta$。
- **逆元 (Inverse)**：若存在单位元 $e$，对 $x \in S$，若存在 $y \in S$ 使 $x * y = y * x = e$，则 $y$ 称为 $x$ 的逆元，记作 $x^{-1}$。

## 2. 典型的代数结构

### 2.1 半群与独异点
- **半群 (Semigroup)**：满足**结合律**的代数系统 $\langle S, * \rangle$。
- **独异点 (Monoid)**：含**单位元**的半群。

### 2.2 群 (Group)
若 $\langle G, * \rangle$ 满足：
1. 结合律；
2. 存在单位元；
3. 每个元素都有逆元。
则称 $\langle G, * \rangle$ 为**群**。若还满足交换律，称为 **Abel 群**。

:::info 例题
证明：群中的单位元是唯一的。
:::
<details>
<summary>查看证明</summary>

假设存在两个单位元 $e_1, e_2$。
根据 $e_1$ 是单位元，$e_1 * e_2 = e_2$。
根据 $e_2$ 是单位元，$e_1 * e_2 = e_1$。
所以 $e_1 = e_2$。单位元唯一。
</details>

## 3. 子系统、同态与同构

### 3.1 子代数
若 $V = \langle S, f_1, f_2, \dots \rangle$ 是代数系统，$B \subseteq S$ 且对所有运算封闭，则 $\langle B, f_1, f_2, \dots \rangle$ 是 $V$ 的**子代数**。

### 3.2 同态 (Homomorphism)
设 $\langle A, * \rangle$ 和 $\langle B, \circ \rangle$ 是两个代数系统。若映射 $h: A \to B$ 满足：
$$h(x * y) = h(x) \circ h(y)$$
则称 $h$ 为**同态映射**。
- 若 $h$ 是双射，则称为**同构 (Isomorphism)**，记作 $A \cong B$。

## 4. 经典练习

:::info 练习 1
设 $S = \{a, b, c\}$，定义运算 $*$ 如下表：
| * | a | b | c |
|---|---|---|---|
| a | a | b | c |
| b | b | b | c |
| c | c | c | c |
判断该系统是否满足结合律，并找出单位元和零元。
:::
<details>
<summary>查看解析</summary>

1. **单位元**：观察第一行和第一列，$a * x = x * a = x$。故单位元为 $a$。
2. **零元**：观察最后一行和最后一列，$c * x = x * c = c$。故零元为 $c$。
3. **结合律**：通过遍历可证满足结合律（该运算实际上是 $S$ 在全序 $a < b < c$ 下的求最大值运算 $max$）。
</details>

:::info 练习 2
证明：在任何独异点中，若元素 $x$ 有逆元，则其逆元是唯一的。
:::
<details>
<summary>查看解析</summary>

设 $y, z$ 都是 $x$ 的逆元，则 $x * y = y * x = e$ 且 $x * z = z * x = e$。
$y = y * e = y * (x * z) = (y * x) * z = e * z = z$。
故逆元唯一。
</details>

---

_本章节由 SolKnow 系统根据代数系统理论构建。_
