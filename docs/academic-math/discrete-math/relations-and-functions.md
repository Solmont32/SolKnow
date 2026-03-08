---
title: 关系与函数 (Relations and Functions)
description: 等价关系、偏序关系与映射结构
---

# 关系与函数 (Relations and Functions)

关系与函数是离散数学连接“集合语言”和“结构问题”的核心桥梁。

## 1. 二元关系

设 $A$ 为非空集合，$R\subseteq A\times A$ 称为 $A$ 上的二元关系。

### 1.1 常见性质
- 自反：$\forall a\in A,(a,a)\in R$
- 反自反：$\forall a\in A,(a,a)\notin R$
- 对称：$(a,b)\in R\Rightarrow(b,a)\in R$
- 反对称：$(a,b),(b,a)\in R\Rightarrow a=b$
- 传递：$(a,b),(b,c)\in R\Rightarrow(a,c)\in R$

### 例题 1（整除关系）
在正整数集上定义 $aRb\iff a\mid b$。判断性质。

**解：**
1. 自反：$a\mid a$，成立。
2. 反对称：若 $a\mid b$ 且 $b\mid a$，则 $a=b$，成立。
3. 传递：$a\mid b,b\mid c\Rightarrow a\mid c$，成立。
故“整除”是偏序关系。

## 2. 等价关系与划分

若关系同时满足自反、对称、传递，则为等价关系。

### 2.1 等价类
对 $a\in A$，定义
$$
[a]=\{x\in A\mid xRa\}.
$$
等价类要么相同，要么不交；所有等价类构成 $A$ 的一个划分。

### 例题 2（模同余）
在 $\mathbb{Z}$ 上定义 $a\sim b\iff a\equiv b\pmod 4$，求 $[1]$。

**解：**
$$
[1]=\{x\in\mathbb{Z}\mid x=4k+1,k\in\mathbb{Z}\}
=\{\ldots,-7,-3,1,5,9,\ldots\}.
$$

## 3. 偏序关系与 Hasse 图

偏序：自反 + 反对称 + 传递。常见于“包含关系”“整除关系”。

### 3.1 极大元与最大元
- 最大元：$m\in P$，对任意 $x\in P$，$x\preceq m$。
- 极大元：不存在 $y\neq m$ 使 $m\preceq y$。

最大元必是极大元，反之不一定。

### 例题 3（子集偏序）
在 $(\mathcal{P}(\{1,2\}),\subseteq)$ 中找极大元与最大元。

**解：**
元素为 $\varnothing,\{1\},\{2\},\{1,2\}$。
- 最大元：$\{1,2\}$
- 极大元：仅 $\{1,2\}$

## 4. 函数与映射性质

设 $f:A\to B$。
- 单射：$f(x_1)=f(x_2)\Rightarrow x_1=x_2$
- 满射：$\forall y\in B,\exists x\in A,f(x)=y$
- 双射：既单又满

### 4.1 逆像与像
- 像：$f(S)=\{f(x)\mid x\in S\}$
- 逆像：$f^{-1}(T)=\{x\in A\mid f(x)\in T\}$（不要求 $f$ 可逆）

### 例题 4（单满射判定）
$f:\mathbb{R}\to\mathbb{R},f(x)=x^2$。

**解：**
1. 非单射：$f(1)=f(-1)$。
2. 非满射：负数没有原像。
故既非单射也非满射。

## 5. 本章练习

### 练习 1
在整数集上定义 $aRb\iff a-b$ 为偶数。证明 $R$ 为等价关系。

<details>
<summary>点击查看解析与答案</summary>

- 自反：$a-a=0$ 为偶数。
- 对称：若 $a-b$ 偶，则 $b-a=-(a-b)$ 也偶。
- 传递：若 $a-b,b-c$ 偶，则 $a-c=(a-b)+(b-c)$ 偶。
故为等价关系。

</details>

### 练习 2
设 $A=\{1,2,3\}$，$B=\{a,b\}$，从 $A$ 到 $B$ 的函数共有多少个？其中满射有多少个？

<details>
<summary>点击查看解析与答案</summary>

总函数数为 $2^3=8$。
非满射函数只有两类：全映到 $a$ 或全映到 $b$，共 2 个。
故满射数 $8-2=6$。

</details>

### 练习 3
在偏序集 $(\{1,2,3,6\},\mid)$ 中找最大元。

<details>
<summary>点击查看解析与答案</summary>

按整除关系：$1\mid2\mid6$，且 $3\mid6$。
所有元素都整除 6，所以最大元是 6。

</details>

## 6. 学习闭环
- 前置基础：[集合论：集合代数与基数](set-theory)
- 配套题单：[离散数学练习库](/docs/exercises/math/discrete-math)
