---
title: Lebesgue 测度：从长度到可测性的严格建立 (Measure Theory)
description: 系统梳理外测度、可测集、零测集、Borel 集与 Cantor 集，作为 Lebesgue 积分的前置基础
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";

# Lebesgue 测度：从长度到可测性的严格建立

> 核心目标不是“给任何集合赋长度”，而是先找出一类足够大、又能保持良好运算性质的集合族，再在其上建立与长度、面积、体积兼容的测度。

Lebesgue 测度论回答的是两个基础问题：

1. 哪些集合可以被稳定地赋予“大小”？
2. 这个“大小”怎样与极限、可数并、积分运算兼容？

对区间而言，长度是显然的；但对稠密可数集、Cantor 集、投影与极限构造出来的复杂集合，朴素长度概念已经不够。外测度与 Carathéodory 可测性正是解决这一问题的标准框架。

---

## 一、从区间长度到外测度

### 1. 区间长度

在 $\mathbb{R}$ 上先规定区间长度：

- 开区间、闭区间、半开区间的长度都记为端点差；
- 例如 $l((a,b)) = l([a,b]) = b-a$。

这是我们希望推广到一般集合的原型。

### 2. Lebesgue 外测度的定义

对任意集合 $E \subset \mathbb{R}$，定义其**外测度**为

$$

m^*(E) = \inf \left\{ \sum_{k=1}^{\infty} l(I_k) \;\middle|\; E \subset \bigcup_{k=1}^{\infty} I_k,\ I_k \text{ 为开区间} \right\}.


$$

含义很直接：允许用可数多个开区间覆盖 $E$，所有覆盖方案里总长度的下确界就是 $E$ 的外测度。

<KnowledgeCard type="info" title="为什么先定义外测度">
外测度对任意集合都能定义，不要求集合本身“规则”。代价是它暂时只有次可加性，不一定对任意集合都满足我们期望的可加性。
</KnowledgeCard>

### 3. 外测度的基本性质

设 $E,F \subset \mathbb{R}$，则：

1. **非负性**：$m^*(E) \ge 0$；
2. **空集为零**：$m^*(\varnothing)=0$；
3. **单调性**：若 $E \subset F$，则 $m^*(E) \le m^*(F)$；
4. **可数次可加性**：

$$

m^*\!\left(\bigcup_{n=1}^{\infty} E_n\right) \le \sum_{n=1}^{\infty} m^*(E_n).


$$

其中第 4 条是外测度最关键的结构性质。

### 4. 区间的外测度等于长度

这是理论必须满足的相容性结论：

<KnowledgeCard type="success" title="定理：区间长度与外测度一致">
任一区间 $I$ 的外测度满足 $m^*(I)=l(I)$。
</KnowledgeCard>

证明思路分两步：

- 上界容易，因为区间可以用自身覆盖；
- 下界依赖实数轴上开覆盖到有限子覆盖的压缩，以及区间长度的有限可加性。

这保证外测度确实是“长度”的自然延伸。

---

## 二、Carathéodory 可测性与 Lebesgue 可测集

外测度对所有集合都定义，但它还不足以保证“切开后大小可加”。因此我们要筛选出一类好集合。

### 1. Carathéodory 可测性

称集合 $E \subset \mathbb{R}$ 是 **Lebesgue 可测** 的，如果对任意集合 $A \subset \mathbb{R}$ 都有

$$

m^*(A) = m^*(A \cap E) + m^*(A \setminus E).


$$

这就是 Carathéodory 判别准则。

直观上说：$E$ 不会制造“测度损失”。任何集合 $A$ 被 $E$ 切成两块后，外测度恰好守恒。

<KnowledgeCard type="warning" title="定义的真正含义">
可测性的重点不是“E 自己有没有大小”，而是 “E 作为切割边界时，是否与外测度兼容”。这也是为什么可测性是一个关于所有测试集 $A$ 的全局条件。
</KnowledgeCard>

### 2. Lebesgue 可测集族的结构

所有 Lebesgue 可测集构成一个 $\sigma$-代数，即：

1. $\varnothing$ 可测；
2. 若 $E$ 可测，则 $E^c$ 可测；
3. 若 $E_n$ 可测，则 $\bigcup_{n=1}^{\infty} E_n$ 可测。

因此它也对可数交封闭。这个结构保证“极限构造”不会轻易走出可测世界。

### 3. Lebesgue 测度

对可测集 $E$，定义

$$

m(E) = m^*(E).


$$

这时 $m$ 就是 **Lebesgue 测度**。它在可测集上具有真正的可数可加性：若 $E_n$ 两两不交且都可测，则

$$

m\!\left(\bigcup_{n=1}^{\infty} E_n\right) = \sum_{n=1}^{\infty} m(E_n).


$$

---

## 三、Lebesgue 测度的基本性质

### 1. 测度的连续性 (Continuity of Measure)

测度作为集合函数，在单调序列下具有良好的极限性质。

**定理 (单调上升序列的连续性):**
设 $\{E_n\}$ 是一列可测集，且 $E_1 \subset E_2 \subset \dots$，则
$$ m\left(\bigcup*{n=1}^\infty E_n\right) = \lim*{n \to \infty} m(E_n). $$

**定理 (单调下降序列的连续性):**
设 $\{E_n\}$ 是一列可测集，且 $E_1 \supset E_2 \supset \dots$。若存在某个 $k$ 使得 $m(E_k) < \infty$，则
$$ m\left(\bigcap*{n=1}^\infty E_n\right) = \lim*{n \to \infty} m(E_n). $$

<KnowledgeCard type="warning" title="下降连续性的限制条件">
注意下降序列必须要求其中一项测度有限。反例：在 $\mathbb{R}$ 上令 $E_n = [n, \infty)$，则 $m(E_n) = \infty$，但 $\bigcap E_n = \varnothing$，测度为 0。
</KnowledgeCard>

### 2. 平移不变性 (Translation Invariance)

若 $E$ 是可测集，$x \in \mathbb{R}$，则 $E + x = \{e + x \mid e \in E\}$ 亦可测，且 $m(E+x) = m(E)$。

---

## 四、零测集与“几乎处处”

### 1. 零测集定义

若对任意 $\varepsilon > 0$，都存在开区间列 $\{I_k\}$ 使得

$$

E \subset \bigcup_{k=1}^{\infty} I_k,
\qquad
\sum_{k=1}^{\infty} l(I_k) < \varepsilon,


$$

则称 $E$ 为 **零测集**，即 $m(E)=0$。

### 2. 零测集的基本结论

1. 单点集是零测集；
2. 任意可数集是零测集；
3. 零测集的任意子集都可测且仍为零测集；
4. 可数个零测集的并仍是零测集。

由此得到分析中极其重要的语言：

- 若命题在去掉一个零测集后成立，就称其**几乎处处**成立，记作 a.e.；
- 在 Lebesgue 积分里，“差一个零测集”通常不影响积分值。

<KnowledgeCard type="tip" title="典型例子">
$\mathbb{Q}\cap[0,1]$ 虽然在 $[0,1]$ 中稠密，但因为它是可数集，所以测度为 0。这说明“稠密”与“大小大”完全不是一回事。
</KnowledgeCard>

---

## 四、Borel 集与 Lebesgue 可测集的关系

### 1. Borel 集

从所有开集出发，对补集和可数并反复封闭，得到的最小 $\sigma$-代数称为 **Borel $\sigma$-代数**，其元素称为 **Borel 集**。

因此：

- 开集是 Borel 集；
- 闭集是 Borel 集；
- $G_\delta$ 集、$F_\sigma$ 集都是 Borel 集；
- 一切区间都是 Borel 集。

### 2. Borel 集一定 Lebesgue 可测

因为开区间可测，且可测集构成 $\sigma$-代数，所以所有 Borel 集都 Lebesgue 可测。

### 3. Lebesgue 可测集严格多于 Borel 集

Lebesgue 可测集不仅包含全部 Borel 集，还允许我们对 Borel 集加上或删去零测集的子集。标准结论是：

<KnowledgeCard type="info" title="结构定理">
每个 Lebesgue 可测集都可以写成 “Borel 集与零测集之差异”的形式。换言之，Lebesgue 测度是对 Borel 测度做完备化得到的。
</KnowledgeCard>

这解释了为什么 Lebesgue 理论比仅处理 Borel 集更适合积分与极限定理。

---

## 五、Cantor 集：零测、不可数、处处无内点的经典样本

Cantor 集是测度论和拓扑学共同的经典例子。

### 1. 构造

从 $[0,1]$ 出发：

1. 删去中间开三分之一 $(1/3, 2/3)$；
2. 对剩余每个闭区间再删去中间开三分之一；
3. 无限重复。

得到的极限集合记为 $C$。

### 2. 基本性质

Cantor 集满足：

1. $C$ 是闭集，因此是 Borel 集，从而 Lebesgue 可测；
2. $C$ 不含任何区间，因此内点为空；
3. $C$ 不可数；
4. $m(C)=0$。

### 3. 为什么测度为零

第 $n$ 步后剩余 $2^n$ 个区间，每个长度为 $3^{-n}$，总长度为

$$

\left(\frac{2}{3}\right)^n.


$$

由于 $C$ 包含在第 $n$ 步剩余集合中，故

$$

m(C) \le \left(\frac{2}{3}\right)^n \quad \forall n.


$$

令 $n \to \infty$ 得 $m(C)=0$。

<KnowledgeCard type="success" title="Cantor 集传递的信息">
“不可数”并不意味着“测度为正”。集合可以拥有极多点，却仍然总长度为 0。测度刻画的是几何大小，不是点的个数。
</KnowledgeCard>

---

## 六、教材级例题

### 例 1：证明可数集都是零测集

设 $E=\{x_1,x_2,\dots\}$ 为可数集。

<details>

<summary>点击查看证明</summary>

给定任意 $\varepsilon>0$。对每个 $n$，取开区间

$$

I_n = \left(x_n-\frac{\varepsilon}{2^{n+2}},\,x_n+\frac{\varepsilon}{2^{n+2}}\right).


$$

则 $E\subset \bigcup_{n=1}^\infty I_n$，且

$$

\sum_{n=1}^\infty l(I_n)
= \sum_{n=1}^\infty \frac{\varepsilon}{2^{n+1}}
< \varepsilon.


$$

故 $E$ 是零测集。$\square$

</details>

### 例 2：证明开集都是 Lebesgue 可测

这是所有 Borel 集可测的起点。

<details>

<summary>点击查看思路</summary>

设 $G$ 为开集。对任意 $A\subset \mathbb{R}$，由外测度的次可加性总有

$$

m^*(A) \le m^*(A\cap G)+m^*(A\setminus G).


$$

难点是反向不等式。利用开集可由可数个互不相交开区间并成，再结合区间上长度与外测度的一致性，可逐段逼近并得到

$$

m^*(A) \ge m^*(A\cap G)+m^*(A\setminus G).


$$

因此 $G$ 满足 Carathéodory 条件，所以可测。$\square$

</details>

### 例 3：证明若 $m^*(E)=0$，则 $E$ 可测

<details>

<summary>点击查看证明</summary>

对任意 $A\subset\mathbb{R}$，有

$$

A = (A\cap E)\cup(A\setminus E).


$$

由次可加性，

$$

m^*(A)\le m^*(A\cap E)+m^*(A\setminus E).


$$

另一方面因 $A\cap E \subset E$ 且 $m^*(E)=0$，得到 $m^*(A\cap E)=0$，再由单调性

$$

m^*(A\setminus E)\le m^*(A).


$$

于是

$$

m^*(A)\ge m^*(A\cap E)+m^*(A\setminus E).


$$

两边合并即得 Carathéodory 条件，因此 $E$ 可测。$\square$

</details>

### 例 4：计算 Cantor 集的测度

<details>

<summary>点击查看解析</summary>

第 $n$ 步删去后剩余长度为 $(2/3)^n$。Cantor 集包含在每一步剩余集合中，因此

$$

m(C)\le \left(\frac{2}{3}\right)^n,\qquad \forall n\in\mathbb{N}.


$$

令 $n\to\infty$，右端趋于 0，故 $m(C)=0$。

另一方面，Cantor 集中元素可由三进制只含 $0,2$ 的展开描述，从而与二进制序列一一对应，所以它不可数。

</details>

---

## 七、折叠练习

### 练习 1

证明有限集是零测集，并说明这与“单点集零测”之间的逻辑关系。

<details>

<summary>点击查看答案</summary>

有限集可写成有限个单点集之并。单点集是零测集，而有限并保持零测，因此有限集零测。逻辑上这是“单点集零测 + 有限可加性/次可加性”的直接推论。

</details>

### 练习 2

设 $E_n=[a_n,b_n]$，证明若 $m(E_n)\to 0$ 且 $E=\bigcap_{n=1}^\infty E_n$，则不一定有 $E=\varnothing$；请给出例子。

<details>

<summary>点击查看答案</summary>

可取 $E_n=[0,1/n]$。则 $m(E_n)=1/n\to 0$，但

$$

\bigcap_{n=1}^\infty [0,1/n]=\{0\}\neq \varnothing.


$$

这说明“测度趋于零”不代表集合最终为空，只说明几何大小趋于零。

</details>

### 练习 3

证明任意零测集的任意子集都是 Lebesgue 可测。

<details>

<summary>点击查看答案</summary>

若 $N$ 是零测集，$A\subset N$，则由单调性 $m^*(A)\le m^*(N)=0$，故 $m^*(A)=0$。再由“外测度为零的集合必可测”，得 $A$ Lebesgue 可测。

</details>

### 练习 4

说明为什么每个闭集都是 Borel 集，并由此说明每个闭区间都 Lebesgue 可测。

<details>

<summary>Check Solution</summary>

闭集是开集的补集，而 Borel $\sigma$-代数对补集封闭，所以闭集是 Borel 集。又因为所有 Borel 集都 Lebesgue 可测，因此闭区间必 Lebesgue 可测。

</details>

### 练习 5 (深度：测度连续性的证明)

试利用测度的可数可加性，证明单调上升序列的连续性。

<details>

<summary>Check Solution</summary>

令 $A_1 = E_1, A_2 = E_2 \setminus E_1, \dots, A_n = E_n \setminus E_{n-1}, \dots$。
则 $\{A_n\}$ 是两两不交的可测集，且 $\bigcup_{i=1}^n A_i = E_n$，$\bigcup_{i=1}^\infty A_i = \bigcup_{i=1}^\infty E_i$。
由可数可加性：
$$ m\left(\bigcup*{i=1}^\infty E_i\right) = m\left(\bigcup*{i=1}^\infty A*i\right) = \sum*{i=1}^\infty m(A*i) = \lim*{n \to \infty} \sum*{i=1}^n m(A_i). $$
因为 $m(E_n) = \sum*{i=1}^n m(A_i)$，故结论成立。$\square$

</details>

### 练习 6 (深度：Borel 集与 Lebesgue 测度)

证明对任一 Lebesgue 可测集 $E$，总存在 $F_\sigma$ 集 $F$ 和 $G_\delta$ 集 $G$，使得 $F \subset E \subset G$ 且 $m(G \setminus F) = 0$。

<details>

<summary>Check Solution</summary>

由 Lebesgue 测度的定义（外测度逼近），对 $\forall n \in \mathbb{N}$，存在开集 $G_n \supset E$ 使得 $m(G_n \setminus E) < 1/n$。
取 $G = \bigcap_{n=1}^\infty G_n$，则 $G$ 是 $G_\delta$ 集，且 $G \supset E$，$m(G \setminus E) = 0$。
同理，考虑 $E^c$，存在 $G_\delta$ 集 $G'$ 使得 $G' \supset E^c$ 且 $m(G' \setminus E^c) = 0$。
令 $F = (G')^c$，则 $F$ 是 $F_\sigma$ 集，$F \subset E$ 且 $m(E \setminus F) = 0$。
结合得 $m(G \setminus F) = m(G \setminus E) + m(E \setminus F) = 0$。$\square$

</details>

---

## 九、与 Lebesgue 积分的衔接

测度论是积分论的底座：

1. **可测集** 决定积分区域是否可处理；
2. **零测集** 解释“几乎处处”与“改动零测集不影响积分”；
3. **Borel/Lebesgue 可测函数** 决定函数能否进入积分框架；
4. **可数可加性** 是单调收敛、Fatou 引理、受控收敛定理成立的底层原因。

下一步自然就是在可测集上定义简单函数积分，再推广到一般可测函数：

- [进入 Lebesgue 积分章节](./lebesgue-integral)

---

## 九、总结

Lebesgue 测度论的主线可以压缩为：

1. 先用覆盖定义外测度；
2. 再用 Carathéodory 条件筛出可测集；
3. 在可测集上获得真正可数可加的测度；
4. 用零测集与几乎处处语言处理复杂极限；
5. 以 Cantor 集为代表理解“点很多”与“测度很大”是两回事。

掌握本章后，阅读 Lebesgue 积分、$L^p$ 空间和概率论中的随机变量积分都会顺畅很多。

---

## 十、配套练习跳转

- [进入实变函数专题练习总页](/docs/exercises/math/real-analysis)
- [A 组：可测性与零测集（建议对应本章）](/docs/exercises/math/real-analysis#ra-a1)
- [返回实变函数学习路径首页](/docs/academic-math/real-analysis)
