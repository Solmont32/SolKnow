---
title: 群论 (Groups)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 群论 (Groups)

群论研究“带运算的集合”所蕴含的结构与对称性，是抽象代数的核心起点。

## 1. 群的定义与基本性质

设 $G$ 是非空集合，$\cdot$ 是二元运算。若满足：
1. 封闭性：$a,b\in G\Rightarrow a\cdot b\in G$；
2. 结合律：$(a\cdot b)\cdot c=a\cdot (b\cdot c)$；
3. 单位元存在：$\exists e\in G,\ \forall a\in G,\ e\cdot a=a\cdot e=a$；
4. 逆元存在：$\forall a\in G,\ \exists a^{-1}\in G,\ a\cdot a^{-1}=a^{-1}\cdot a=e$；
则称 $(G,\cdot)$ 为群。

<KnowledgeCard type="info" title="阿贝尔群">
若还满足交换律 $a\cdot b=b\cdot a$，则称为交换群（阿贝尔群）。
</KnowledgeCard>

常见例子：
- $(\mathbb{Z},+)$ 是交换群，单位元是 $0$。
- $(\mathbb{R}^\times,\cdot)$ 是交换群，单位元是 $1$。
- $S_n$（$n$ 阶置换群）通常不是交换群。

## 2. 子群与子群判别法

设 $H\subseteq G$。若 $(H,\cdot)$ 本身是群，则 $H$ 为 $G$ 的子群，记作 $H\le G$。

有限步判别（子群测试）：
只需验证 $H\neq \varnothing$ 且
$$
\forall a,b\in H,\ ab^{-1}\in H.
$$

### 例题 1：判定子群
证明 $n\mathbb{Z}=\{nk:k\in\mathbb{Z}\}$ 是 $(\mathbb{Z},+)$ 的子群。

解：取 $a=nk_1,\ b=nk_2\in n\mathbb{Z}$，则 $a-b=n(k_1-k_2)\in n\mathbb{Z}$，满足子群测试，故为子群。

## 3. 循环群与拉格朗日定理

若存在 $g\in G$ 使得 $G=\langle g\rangle=\{g^k:k\in\mathbb{Z}\}$，则 $G$ 为循环群。

拉格朗日定理：若 $G$ 是有限群，$H\le G$，则
$$
|H|\mid |G|,\qquad [G:H]=\frac{|G|}{|H|}.
$$

推论：任意元素 $a\in G$ 的阶 $o(a)$ 整除 $|G|$。

### 例题 2：元素阶计算
在 $(\mathbb{Z}_{18},+)$ 中，求元素 $\bar{6}$ 的阶。

解：最小正整数 $m$ 满足 $m\bar{6}=\bar{0}$，即 $18\mid 6m$，故最小 $m=3$，所以 $o(\bar{6})=3$。

## 4. 陪集、正规子群与商群

左陪集：$aH=\{ah:h\in H\}$，右陪集：$Ha=\{ha:h\in H\}$。
若对所有 $a\in G$ 均有 $aH=Ha$，则 $H$ 是正规子群，记作 $H\trianglelefteq G$。

当 $H\trianglelefteq G$ 时，可定义商群 $G/H$，其元素是陪集，运算为
$$
(aH)(bH)=(ab)H.
$$

### 例题 3：正规子群判定
证明 $(\mathbb{Z},+)$ 的任意子群 $n\mathbb{Z}$ 都正规。

解：$(\mathbb{Z},+)$ 是交换群，对任意 $a\in\mathbb{Z}$，$a+n\mathbb{Z}=n\mathbb{Z}+a$，故 $n\mathbb{Z}\trianglelefteq \mathbb{Z}$。

## 5. 群同态与同构

映射 $\varphi:G\to K$ 若满足 $\varphi(ab)=\varphi(a)\varphi(b)$，称为群同态。

核心对象：
- 核：$\ker\varphi=\{g\in G:\varphi(g)=e_K\}$（正规子群）；
- 像：$\operatorname{Im}\varphi=\varphi(G)\le K$。

第一同构定理：
$$
G/\ker\varphi\cong \operatorname{Im}\varphi.
$$

### 例题 4：应用第一同构定理
定义 $\varphi:(\mathbb{Z},+)\to (\mathbb{Z}_n,+)$，$\varphi(k)=\bar{k}$。求商群同构类型。

解：$\ker\varphi=n\mathbb{Z}$，像为全体 $\mathbb{Z}_n$，故
$$
\mathbb{Z}/n\mathbb{Z}\cong \mathbb{Z}_n.
$$

## 6. 配套练习（点击展开答案）

### 练习 1
在 $S_3$ 中写出由换位 $(12)$ 生成的子群，并求其阶。

<details>
<summary>点击查看解析与答案</summary>

$(12)^2=e$，故 $\langle(12)\rangle=\{e,(12)\}$，阶为 $2$。
</details>

### 练习 2
证明有限群中，阶为最小素数 $p$ 的子群必为循环群。

<details>
<summary>点击查看解析与答案</summary>

取 $a\neq e$，则 $o(a)\mid p$ 且 $o(a)\neq 1$，故 $o(a)=p$。于是 $\langle a\rangle$ 有 $p$ 个元素，等于整个子群，故循环。
</details>

### 练习 3
设 $\varphi:G\to K$ 为群同态，证明 $\ker\varphi\trianglelefteq G$。

<details>
<summary>点击查看解析与答案</summary>

先证 $\ker\varphi\le G$：若 $a,b\in\ker\varphi$，则 $\varphi(ab^{-1})=\varphi(a)\varphi(b)^{-1}=e$，故 $ab^{-1}\in\ker\varphi$。  
再证正规性：任取 $g\in G,\ x\in\ker\varphi$，有
$\varphi(gxg^{-1})=\varphi(g)\varphi(x)\varphi(g)^{-1}=e$，故 $gxg^{-1}\in\ker\varphi$。
</details>
