---
title: 模与域扩张 (Modules and Field Extensions)
---

# 模与域扩张 (Modules and Field Extensions)

本章连接“群论-环论-线性代数”：模是“环上的线性空间”，域扩张是“把数域做大以容纳新根”。

## 1. 模的定义与基本例子

设 $R$ 是幺环，$M$ 是交换群 $(M,+)$。若给定标量乘法 $R\times M\to M,\ (r,m)\mapsto rm$，满足
1. $r(m+n)=rm+rn$；
2. $(r+s)m=rm+sm$；
3. $(rs)m=r(sm)$；
4. $1_Rm=m$；
则称 $M$ 为左 $R$-模。

典型例子：
- 向量空间是域 $F$ 上的 $F$-模；
- 阿贝尔群是 $\mathbb{Z}$-模；
- $R^n$ 是自由 $R$-模（标准基 $e_1,\dots,e_n$）。

### 例题 1：阿贝尔群与 $\mathbb{Z}$-模
证明任意阿贝尔群 $A$ 都可视为 $\mathbb{Z}$-模。

解：定义 $k\cdot a$ 为 $a$ 的 $k$ 次加法（负数用逆元定义）。利用群交换性与整数加法乘法规则，可逐条验证模公理成立。

## 2. 子模、生成与商模

若 $N\subseteq M$ 且对加法与 $R$-作用封闭，则 $N$ 是子模，记 $N\le_R M$。

给定子集 $S\subseteq M$，由有限线性组合
$$
\sum_{i=1}^t r_i s_i\quad (r_i\in R,\ s_i\in S)
$$
生成的最小子模记为 $\langle S\rangle_R$。

若 $N\le_R M$，则商群 $M/N$ 上可定义
$$
r\cdot(m+N)=rm+N,
$$
从而得到商模。

### 例题 2：子模与商模
在 $\mathbb{Z}$-模 $\mathbb{Z}^2$ 中取 $N=\langle(2,0),(0,3)\rangle$，描述 $\mathbb{Z}^2/N$。

解：$N=2\mathbb{Z}\times 3\mathbb{Z}$，故
$$
\mathbb{Z}^2/N\cong \mathbb{Z}_2\times\mathbb{Z}_3\cong \mathbb{Z}_6.
$$

## 3. 自由模与有限生成模

若 $M\cong R^n$，称 $M$ 是秩为 $n$ 的自由模。  
在 PID（如 $\mathbb{Z}$）上，有限生成模有标准分解
$$
M\cong R^r\oplus R/(d_1)\oplus\cdots\oplus R/(d_t),\quad d_1\mid d_2\mid\cdots\mid d_t.
$$
这就是有限生成模结构定理（也是有限生成阿贝尔群分类的统一来源）。

### 例题 3：有限生成阿贝尔群分解
把群 $G=\mathbb{Z}_{12}\oplus\mathbb{Z}_{18}$ 分解为不变因子形式。

解：按素因子拆分并合并：
$$
\mathbb{Z}_{12}\oplus\mathbb{Z}_{18}
\cong (\mathbb{Z}_4\oplus\mathbb{Z}_2)\oplus(\mathbb{Z}_9\oplus\mathbb{Z}_2)
\cong \mathbb{Z}_2\oplus\mathbb{Z}_{36}.
$$
故不变因子可取 $2,36$（满足 $2\mid36$）。

## 4. 域扩张与最小多项式

若 $F\subseteq K$ 且两者都是域，称 $K/F$ 为域扩张。  
若 $K$ 作为 $F$-向量空间维数有限，记
$$
[K:F]=\dim_F K.
$$

元素 $\alpha\in K$ 若满足某个非零 $f(x)\in F[x]$，称为代数元素；满足次数最低且首一的多项式称最小多项式 $m_{\alpha,F}(x)$。

结论：若 $\deg m_{\alpha,F}=n$，则
$$
[F(\alpha):F]=n,\quad \{1,\alpha,\dots,\alpha^{n-1}\}\ \text{是基}.
$$

### 例题 4：二次扩张次数
求 $[\mathbb{Q}(\sqrt{2}):\mathbb{Q}]$。

解：$\sqrt{2}$ 的最小多项式是 $x^2-2$（在 $\mathbb{Q}$ 上不可约），故扩张次数为 2。

## 5. 有限域扩张与构造

有限域规模一定是 $p^n$（$p$ 为素数）。  
构造方式：取 $\mathbb{F}_p[x]$ 上 $n$ 次不可约多项式 $f(x)$，则
$$
\mathbb{F}_{p^n}\cong \mathbb{F}_p[x]/(f(x)).
$$

### 例题 5：8 元域构造
用商环构造 $\mathbb{F}_8$。

解：在 $\mathbb{F}_2[x]$ 中，$x^3+x+1$ 不可约，因此
$$
\mathbb{F}_8\cong \mathbb{F}_2[x]/(x^3+x+1).
$$
元素可写成 $a+bx+cx^2$（$a,b,c\in\mathbb{F}_2$），共 8 个。

## 6. 配套练习（点击展开答案）

### 练习 1
证明任意向量空间 $V$ 都是其底域 $F$ 上的 $F$-模。

<details>

<summary>点击查看解析与答案</summary>

向量空间公理本身就是模公理在“标量环是域”时的特例，因此 $V$ 自动是 $F$-模。

</details>

### 练习 2
在 $\mathbb{Z}$-模 $\mathbb{Z}$ 中，证明 $n\mathbb{Z}$ 是子模并求商模 $\mathbb{Z}/n\mathbb{Z}$ 的元素个数。

<details>

<summary>点击查看解析与答案</summary>

$n\mathbb{Z}$ 对加法与整数倍封闭，故为子模。商模就是模 $n$ 的剩余类，共 $n$ 个元素。

</details>

### 练习 3
求 $[\mathbb{Q}(\sqrt{3}):\mathbb{Q}]$ 与一组基。

<details>

<summary>点击查看解析与答案</summary>

$\sqrt{3}$ 的最小多项式是 $x^2-3$，次数为 2，故扩张次数是 2，可取基 $\{1,\sqrt{3}\}$。

</details>

### 练习 4
设 $\alpha=\sqrt[3]{2}$。说明 $[\mathbb{Q}(\alpha):\mathbb{Q}]=3$。

<details>

<summary>点击查看解析与答案</summary>

$\alpha$ 满足 $x^3-2=0$。由有理根定理，$x^3-2$ 在 $\mathbb{Q}$ 上无一次因子，故不可约。最小多项式次数 3，扩张次数即 3。

</details>

