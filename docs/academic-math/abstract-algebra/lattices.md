---
title: 格 (Lattices)
---

# 格 (Lattices)

格论把“偏序关系”与“代数运算”统一起来，是抽象代数连接离散数学与数理逻辑的重要桥梁。

## 1. 偏序、上确界与下确界

设 $(P,\le)$ 是偏序集。对任意 $a,b\in P$：
- 若存在最小的上界，记作 $a\vee b$（并、join）；
- 若存在最大的下界，记作 $a\wedge b$（交、meet）。

若任意两元素都存在 $a\vee b$ 与 $a\wedge b$，则称 $(P,\le)$ 为格。

等价代数描述：一个集合 $L$ 配两种二元运算 $\vee,\wedge$，满足交换律、结合律、吸收律，也定义了格结构。

## 2. 基本恒等式与单调性

在任意格中，恒有：
1. 幂等律：$a\vee a=a,\ a\wedge a=a$；
2. 交换律：$a\vee b=b\vee a,\ a\wedge b=b\wedge a$；
3. 结合律：$a\vee(b\vee c)=(a\vee b)\vee c$，$\wedge$ 同理；
4. 吸收律：$a\vee(a\wedge b)=a,\ a\wedge(a\vee b)=a$。

由此可推出单调性：若 $a\le b$，则
$$
a\vee c\le b\vee c,\qquad a\wedge c\le b\wedge c.
$$

### 例题 1：幂集格
设集合 $X$ 的幂集为 $\mathcal{P}(X)$，偏序为包含关系 $\subseteq$。证明它是格。

解：任取 $A,B\subseteq X$，最小上界是 $A\cup B$，最大下界是 $A\cap B$，故
$$
A\vee B=A\cup B,\qquad A\wedge B=A\cap B.
$$
因此 $(\mathcal{P}(X),\subseteq)$ 是格。

## 3. 有界格、补元与布尔代数

若格中存在最小元 $0$ 与最大元 $1$，则称为有界格。

在有界格中，若元素 $a$ 存在补元 $a'$ 满足
$$
a\wedge a'=0,\qquad a\vee a'=1,
$$
称 $a$ 可补。

若一个有界格既分配又每个元素都有补元，则称其为布尔代数。

常见布尔代数例子：$(\mathcal{P}(X),\cup,\cap,\complement,\varnothing,X)$。

### 例题 2：链上的补元
在三元链 $0<a<1$ 中，判断 $a$ 是否有补元。

解：链上有 $a\wedge 0=0$，但 $a\vee 0=a\neq 1$；又有 $a\vee 1=1$，但 $a\wedge 1=a\neq 0$。故 $a$ 无补元，因此该有界格不是布尔代数。

## 4. 分配格与模格

分配格定义：
$$
a\wedge(b\vee c)=(a\wedge b)\vee(a\wedge c),\qquad
a\vee(b\wedge c)=(a\vee b)\wedge(a\vee c).
$$

模格定义（较弱）：
若 $a\le c$，则
$$
a\vee(b\wedge c)=(a\vee b)\wedge c.
$$

结论：分配格一定是模格，但反之不成立。

### 例题 3：整除格
取正整数 12 的所有正因子，按整除关系排序，判断是否成格。

解：集合 $D=\{1,2,3,4,6,12\}$。任意两元素的最小公倍数与最大公约数仍在 $D$ 中，且分别给出并与交：
$$
a\vee b=\operatorname{lcm}(a,b),\qquad a\wedge b=\gcd(a,b).
$$
故 $(D,\mid)$ 成格（且为有界格，$0$ 位点对应 1，$1$ 位点对应 12）。

## 5. 格同态与子结构

映射 $f:L\to M$ 若满足
$$
f(a\vee b)=f(a)\vee f(b),\qquad f(a\wedge b)=f(a)\wedge f(b),
$$
称为格同态。

若 $S\subseteq L$ 对 $\vee,\wedge$ 封闭，则 $S$ 为子格。

### 例题 4：幂集到二元布尔代数的同态
定义 $f:\mathcal{P}(X)\to\{0,1\}$，令
$$
f(A)=\begin{cases}
0,&A=\varnothing,\\
1,&A\neq\varnothing.
\end{cases}
$$
判断是否为格同态（取 $\vee=\cup,\ \wedge=\cap$；右侧取 $\vee=\max,\ \wedge=\min$）。

解：对并运算有 $f(A\cup B)=\max\{f(A),f(B)\}$ 成立；但交运算不总成立，例如 $A=\{1\},B=\{2\}$ 时 $A\cap B=\varnothing$，$f(A\cap B)=0$，而 $\min\{f(A),f(B)\}=1$。故不是格同态。

## 6. 配套练习（点击展开答案）

### 练习 1
证明任意链（全序集）都是格。

<details>

<summary>点击查看解析与答案</summary>

对任意 $a,b$，全序保证 $a\le b$ 或 $b\le a$。较大者即最小上界，较小者即最大下界，因此并与交总存在，故为格。

</details>

### 练习 2
在幂集格 $\mathcal{P}(X)$ 中证明分配律。

<details>

<summary>点击查看解析与答案</summary>

由集合恒等式
$A\cap(B\cup C)=(A\cap B)\cup(A\cap C)$
及其对偶式
$A\cup(B\cap C)=(A\cup B)\cap(A\cup C)$
直接成立，故幂集格是分配格。

</details>

### 练习 3
在整除格 $(D,\mid)$（$D$ 为 30 的正因子集）中求 $6\vee10$ 与 $6\wedge10$。

<details>

<summary>点击查看解析与答案</summary>

$6\vee10=\operatorname{lcm}(6,10)=30$，$6\wedge10=\gcd(6,10)=2$。

</details>

