---
title: 集合论：集合代数与基数 (Set Theory)
description: 从集合运算到关系、函数与可数性
---

# 集合论：集合代数与基数

集合论是离散数学的语言层。后续的关系、函数、图和计数都建立在集合结构上。

## 1. 集合的基本概念

### 1.1 表示方式
- 列举法：$A=\{1,2,3\}$
- 描述法：$B=\{x\in\mathbb{Z}\mid x\text{ 是偶数}\}$

### 1.2 基本关系
- 包含：$A\subseteq B$
- 真包含：$A\subset B$
- 相等：$A=B\iff(A\subseteq B\land B\subseteq A)$

### 1.3 常见集合
- 空集：$\varnothing$
- 全集：$U$
- 幂集：$\mathcal{P}(A)=\{X\mid X\subseteq A\}$

## 2. 集合运算与代数律

对任意 $A,B,C\subseteq U$：
- 并集：$A\cup B$
- 交集：$A\cap B$
- 差集：$A\setminus B$
- 补集：$A^c=U\setminus A$

### 2.1 重要恒等式
1. 交换律：$A\cup B=B\cup A$，$A\cap B=B\cap A$
2. 结合律：$(A\cup B)\cup C=A\cup(B\cup C)$
3. 分配律：$A\cap(B\cup C)=(A\cap B)\cup(A\cap C)$
4. De Morgan：$(A\cup B)^c=A^c\cap B^c$，$(A\cap B)^c=A^c\cup B^c$

### 例题 1（集合恒等式证明）
证明：$A\setminus(B\cup C)=(A\setminus B)\cap(A\setminus C)$。

**解：**
按元素法：
$$
x\in A\setminus(B\cup C)
\iff x\in A\land x\notin B\cup C
\iff x\in A\land x\notin B\land x\notin C
$$
$$
\iff x\in A\setminus B\land x\in A\setminus C
\iff x\in (A\setminus B)\cap(A\setminus C).
$$
故命题成立。

## 3. 笛卡尔积与关系的集合表达

定义：$A\times B=\{(a,b)\mid a\in A,b\in B\}$。

- 二元关系本质上是 $A\times A$ 的子集。
- 函数本质上是满足“单值性”的特殊关系。

### 例题 2（关系判定）
设 $A=\{1,2,3\}$，关系
$$
R=\{(1,1),(2,2),(3,3),(1,2),(2,1)\}.
$$
判断其自反性、对称性、传递性。

**解：**
1. 自反：$(1,1),(2,2),(3,3)$ 都在 $R$，成立。
2. 对称：$(1,2)\in R$ 且 $(2,1)\in R$，其余对称条件平凡成立。
3. 传递：由 $(1,2),(2,1)\in R$ 应有 $(1,1)$，已在；由 $(2,1),(1,2)$ 应有 $(2,2)$，已在。
故 $R$ 为等价关系。

## 4. 基数与可数性

### 4.1 有限集
若 $|A|=n$，则幂集大小满足：
$$
|\mathcal{P}(A)|=2^n.
$$

### 例题 3（幂集计数）
设 $|A|=5$，求满足“至少含 2 个元素”的子集个数。

**解：**
总子集数 $2^5=32$。去掉 $0$ 元子集和 $1$ 元子集：
$$
32-\binom50-\binom51=32-1-5=26.
$$

### 4.2 可数与不可数
- 可数集：可与自然数集 $\mathbb{N}$ 建立双射（如 $\mathbb{Z},\mathbb{Q}$）。
- 不可数集：不能与 $\mathbb{N}$ 建立双射（如 $\mathbb{R}$）。

> 结论：$\mathbb{Q}$ 可数而 $\mathbb{R}$ 不可数，是离散与连续在基数层面的分界。

## 5. 本章练习

### 练习 1
设 $U=\{1,2,3,4,5,6\}$，$A=\{1,2,3,4\}$，$B=\{3,4,5\}$，求 $(A\cap B)^c$。

<details>
<summary>点击查看解析与答案</summary>

$A\cap B=\{3,4\}$，故
$$
(A\cap B)^c=U\setminus\{3,4\}=\{1,2,5,6\}.
$$

</details>

### 练习 2
证明：$A\cup(B\cap C)=(A\cup B)\cap(A\cup C)$。

<details>
<summary>点击查看解析与答案</summary>

使用元素法双向证明：
$$
x\in A\cup(B\cap C)
\iff x\in A\lor(x\in B\land x\in C)
\iff (x\in A\lor x\in B)\land(x\in A\lor x\in C)
$$
$$
\iff x\in (A\cup B)\cap(A\cup C).
$$

</details>

### 练习 3
设 $|A|=7$，问有多少个 3 元子集？

<details>
<summary>点击查看解析与答案</summary>

$$
\binom73=35.
$$

</details>

## 6. 学习闭环
- 理论延伸：[关系与函数](relations-and-functions)
- 配套题单：[离散数学练习库](/docs/exercises/math/discrete-math)
