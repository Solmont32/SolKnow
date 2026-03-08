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

## 四、格与布尔代数专题

### 练习 11：幂集格中的并与交

设 $X=\{1,2,3\}$，令 $A=\{1,2\}, B=\{2,3\}$。在 $(\mathcal{P}(X),\subseteq)$ 中求 $A\vee B$ 与 $A\wedge B$。

<details>

<summary>点击查看解析与答案</summary>

在幂集格中，$\vee=\cup,\ \wedge=\cap$，故
$A\vee B=A\cup B=\{1,2,3\}$，
$A\wedge B=A\cap B=\{2\}$。

</details>

### 练习 12：整除格计算

在“12 的正因子按整除排序”的格中，求 $4\vee 6$ 与 $4\wedge 6$。

<details>

<summary>点击查看解析与答案</summary>

整除格满足 $\vee=\operatorname{lcm},\ \wedge=\gcd$，故
$4\vee 6=\operatorname{lcm}(4,6)=12$，
$4\wedge 6=\gcd(4,6)=2$。

</details>

### 练习 13：链是否是布尔代数

考虑三元链 $0<a<1$（有界格）。判断它是否为布尔代数。

<details>

<summary>点击查看解析与答案</summary>

元素 $a$ 需要补元 $a'$ 使 $a\wedge a'=0,\ a\vee a'=1$。  
链中只有 $0,1,a$，逐一代入均不满足，故 $a$ 无补元。  
因此该格不是布尔代数。

</details>

### 练习 14：分配律验证

在幂集格中验证恒等式
$A\cap(B\cup C)=(A\cap B)\cup(A\cap C)$。

<details>

<summary>点击查看解析与答案</summary>

取任意 $x$：
$x\in A\cap(B\cup C)$
$\Leftrightarrow x\in A$ 且 $(x\in B$ 或 $x\in C)$
$\Leftrightarrow (x\in A\cap B)$ 或 $(x\in A\cap C)$
$\Leftrightarrow x\in (A\cap B)\cup(A\cap C)$。
故等式成立。

</details>

### 练习 15：格同态反例

定义 $f:\mathcal{P}(\{1,2\})\to\{0,1\}$，$f(\varnothing)=0$，其余集合都映为 1。判断 $f$ 是否保持 $\wedge=\cap$。

<details>

<summary>点击查看解析与答案</summary>

取 $A=\{1\},B=\{2\}$，则
$f(A)=f(B)=1$，所以 $\min(f(A),f(B))=1$；
但 $A\cap B=\varnothing$，$f(A\cap B)=0$。
两者不等，故不保持交运算，不是格同态。

</details>

## 五、模与域扩张专题

### 练习 16：$\mathbb{Z}$-模视角

说明为什么任意有限生成阿贝尔群都可看作有限生成 $\mathbb{Z}$-模。

<details>

<summary>点击查看解析与答案</summary>

阿贝尔群天然带有整数倍作用 $k\cdot a$，因此是 $\mathbb{Z}$-模。若群有有限生成元集合，在模意义下同样是有限生成，故命题成立。

</details>

### 练习 17：商模计算

在 $\mathbb{Z}^2$ 中取子模 $N=\langle(4,0),(0,6)\rangle$。求 $\mathbb{Z}^2/N$ 的同构类型。

<details>

<summary>点击查看解析与答案</summary>

$N=4\mathbb{Z}\times 6\mathbb{Z}$，故

$$

\mathbb{Z}^2/N\cong \mathbb{Z}_4\times \mathbb{Z}_6.


$$

若按不变因子形式，还可写成 $\mathbb{Z}_2\times\mathbb{Z}_{12}$。

</details>

### 练习 18：最小多项式

求 $\alpha=\sqrt{5}$ 在 $\mathbb{Q}$ 上的最小多项式，并给出 $[\mathbb{Q}(\alpha):\mathbb{Q}]$。

<details>

<summary>点击查看解析与答案</summary>

$\alpha$ 满足 $x^2-5=0$，且 $x^2-5$ 在 $\mathbb{Q}$ 上不可约，故最小多项式是 $x^2-5$，扩张次数为 2。

</details>

### 练习 19：复合扩张次数

求 $[\mathbb{Q}(\sqrt{2},\sqrt{3}):\mathbb{Q}]$。

<details>

<summary>点击查看解析与答案</summary>

先有 $[\mathbb{Q}(\sqrt{2}):\mathbb{Q}]=2$。且 $\sqrt{3}\notin \mathbb{Q}(\sqrt{2})$，因此

$$

[\mathbb{Q}(\sqrt{2},\sqrt{3}):\mathbb{Q}(\sqrt{2})]=2.


$$

由塔式定理得总次数 $2\times 2=4$。

</details>

### 练习 20：有限域构造判定

判断 $\mathbb{F}_2[x]/(x^3+x^2+1)$ 是否为域。

<details>

<summary>点击查看解析与答案</summary>

检查 $x^3+x^2+1$ 在 $\mathbb{F}_2$ 上是否有根：
代入 $0$ 得 1，代入 $1$ 得 1，均非 0，故三次多项式无一次因子，因而不可约。
所以商环是域，元素个数为 $2^3=8$。

</details>

## 六、群作用与 Sylow 专题

### 练习 21：轨道-稳定子计算

设群 $G$ 作用在集合 $X$ 上，且 $|G|=120$、某点 $x$ 的稳定子阶为 10。求 $x$ 的轨道大小。

<details>

<summary>点击查看解析与答案</summary>

由轨道-稳定子定理：

$$

|\operatorname{Orb}(x)|=[G:G_x]=120/10=12.


$$

</details>

### 练习 22：21 阶群的 Sylow 3-子群个数

设 $|G|=21$，求 Sylow 3-子群个数 $n_3$ 的可能值。

<details>

<summary>点击查看解析与答案</summary>

$n_3\mid 7$ 且 $n_3\equiv 1\pmod 3$。7 的因子为 $1,7$，两者都满足模 3 同余条件，因此

$$

n_3\in\{1,7\}.


$$

</details>

### 练习 23：15 阶群中的正规 Sylow 子群

设 $|G|=15=3\cdot 5$。证明 $G$ 至少有一个非平凡正规 Sylow 子群。

<details>

<summary>点击查看解析与答案</summary>

对 $p=5$，$n_5\mid 3$ 且 $n_5\equiv 1\pmod 5$，只能 $n_5=1$，所以 Sylow 5-子群正规。

</details>

### 练习 24：共轭类大小

在 $S_4$ 中求 3-轮换 $(123)$ 的共轭类大小。

<details>

<summary>点击查看解析与答案</summary>

共轭保持循环类型。$S_4$ 中 3-轮换数量为

$$

\binom{4}{3}\cdot 2=8,


$$

所以 $(123)$ 的共轭类大小为 8。

</details>

### 练习 25：唯一 Sylow 子群与正规性

证明：若有限群 $G$ 的 Sylow $p$-子群唯一，则它正规。

<details>

<summary>点击查看解析与答案</summary>

设唯一 Sylow $p$-子群为 $P$。任取 $g\in G$，则 $gPg^{-1}$ 仍是 Sylow $p$-子群。由唯一性得 $gPg^{-1}=P$，故 $P\trianglelefteq G$。

</details>

### 练习 26：56 阶群的 Sylow 7-子群

设 $|G|=56$。证明 Sylow 7-子群正规。

<details>

<summary>点击查看解析与答案</summary>

$n_7\mid 8$ 且 $n_7\equiv 1\pmod 7$。8 的因子 $1,2,4,8$ 中只有 1 与 1 同余（模 7），故 $n_7=1$，Sylow 7-子群正规。

</details>
