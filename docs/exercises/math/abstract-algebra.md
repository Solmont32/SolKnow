---
title: 抽象代数练习
---

# 抽象代数练习

本页按“基础-提高-挑战”组织，所有答案采用折叠展示。

## 一、基础题

### 练习 1：子群快速判定
设 $H=\{\bar{0},\bar{3},\bar{6}\}\subseteq (\mathbb{Z}_9,+)$，判断 $H$ 是否为子群。

<details>
<summary>点击查看解析与答案</summary>

取任意 $a,b\in H$，检查 $a-b\in H$：
$\bar{3}-\bar{6}=\bar{6}\in H$，其余同理。故 $H\le \mathbb{Z}_9$。
</details>

### 练习 2：元素阶
在 $(\mathbb{Z}_{20},+)$ 中求 $\bar{8}$ 的阶。

<details>
<summary>点击查看解析与答案</summary>

解方程 $20\mid 8m$，最小正解 $m=5$，故阶为 5。
</details>

### 练习 3：群同态核
设 $\varphi:(\mathbb{Z},+)\to(\mathbb{Z}_4,+)$，$\varphi(k)=\bar{k}$。求核与像。

<details>
<summary>点击查看解析与答案</summary>

$\ker\varphi=4\mathbb{Z}$，$\operatorname{Im}\varphi=\mathbb{Z}_4$。
</details>

### 练习 4：零因子判定
在 $\mathbb{Z}_{10}$ 中找出两个非零零因子。

<details>
<summary>点击查看解析与答案</summary>

例如 $\bar{2}\cdot\bar{5}=\bar{0}$，两者均为非零零因子。
</details>

## 二、提高题

### 练习 5：正规子群
证明任意群同态 $\varphi:G\to K$ 的核是正规子群。

<details>
<summary>点击查看解析与答案</summary>

若 $x\in\ker\varphi$，则对任意 $g\in G$：
$\varphi(gxg^{-1})=\varphi(g)\varphi(x)\varphi(g)^{-1}=e$，故 $gxg^{-1}\in\ker\varphi$，因此正规。
</details>

### 练习 6：商群同构类型
求群 $(\mathbb{Z},+)/6\mathbb{Z}$ 的同构类型。

<details>
<summary>点击查看解析与答案</summary>

由第一同构定理或直接构造，
$\mathbb{Z}/6\mathbb{Z}\cong \mathbb{Z}_6$。
</details>

### 练习 7：理想判定
证明集合 $I=\{f(x)\in\mathbb{Q}[x]:f(1)=0\}$ 是 $\mathbb{Q}[x]$ 的理想。

<details>
<summary>点击查看解析与答案</summary>

加法封闭：$f(1)=g(1)=0\Rightarrow (f+g)(1)=0$；
吸收性：任意 $h(x)$，$(hf)(1)=h(1)f(1)=0$。
故 $I$ 是理想，且 $I=(x-1)$。
</details>

### 练习 8：单位元个数
求 $\mathbb{Z}_{15}$ 的单位元个数并列出它们。

<details>
<summary>点击查看解析与答案</summary>

与 15 互素的剩余类：$1,2,4,7,8,11,13,14$，共 8 个。
</details>

## 三、挑战题

### 练习 9：有限域构造
设 $F=\mathbb{F}_3[x]/(x^2+1)$。判断它是否为域，并写出元素个数。

<details>
<summary>点击查看解析与答案</summary>

检验 $x^2+1$ 在 $\mathbb{F}_3$ 中是否有根：
$0^2+1=1$，$1^2+1=2$，$2^2+1=5\equiv2$，均非 0，故不可约。
因此商环是域，元素形如 $a+bx$（$a,b\in\mathbb{F}_3$），共 $3^2=9$ 个。
</details>

### 练习 10：循环群分类应用
证明任意 12 阶循环群恰有一个 3 阶子群和一个 4 阶子群。

<details>
<summary>点击查看解析与答案</summary>

循环群 $C_{12}=\langle g\rangle$ 的子群与 12 的正因子一一对应。每个因子 $d\mid12$ 对应唯一 $d$ 阶子群 $\langle g^{12/d}\rangle$。
故 3 阶、4 阶子群各唯一。
</details>
