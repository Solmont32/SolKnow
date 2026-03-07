---
title: 竞赛代数：经典不等式与函数方程
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 竞赛代数：经典不等式与函数方程

高中竞赛代数不仅考察代数变形，更考察对连续性、凸性及函数构造的深刻理解。

## 一、 核心知识点讲解

### 1. 核心不等式链
-   **均值不等式 (AM-GM-HM)**：$H_n \le G_n \le A_n \le Q_n$。
-   **柯西不等式 (Cauchy-Schwarz)**：$(\sum a_i^2)(\sum b_i^2) \ge (\sum a_i b_i)^2$。
-   **排序不等式**：同向乘积和 $\ge$ 乱向乘积和 $\ge$ 反向乘积和。
-   **赫尔德不等式 (Hölder's Inequality)**：柯西不等式的一般化推广。

### 2. 凸性与 Jensen 不等式
若 $f(x)$ 为区间内的凸函数，则对于 $\forall x_i$：
$$f(\frac{\sum x_i}{n}) \le \frac{\sum f(x_i)}{n}$$

### 3. 函数方程基础
-   常见的处理手段：**赋值法**（取 $x=0, y=0$ 等）、**单射/满射判定**、**柯西函数方程** $f(x+y)=f(x)+f(y)$ 的解。

<KnowledgeCard type="tip" title="解题秘籍">
在处理三元对称不等式时，**“局部不等式求和”** 或 **“切线法”** 往往能产生奇效。
</KnowledgeCard>

---

## 二、 经典例题实战

### 例题 1：柯西不等式的分式形式（安氏不等式）
已知 $a, b, c > 0$。证明：$\frac{a^2}{b+c} + \frac{b^2}{a+c} + \frac{c^2}{a+b} \ge \frac{a+b+c}{2}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1.  **构造柯西结构**：利用柯西不等式的分式形式（Titu's Lemma）：
    $$\frac{x_1^2}{y_1} + \frac{x_2^2}{y_2} + \dots + \frac{x_n^2}{y_n} \ge \frac{(x_1+x_2+\dots+x_n)^2}{y_1+y_2+\dots+y_n}$$
2.  **代入项**：令分子为 $a, b, c$，分母为 $b+c, a+c, a+b$。
3.  **应用公式**：
    $$\text{左式} \ge \frac{(a+b+c)^2}{(b+c) + (a+c) + (a+b)}$$
4.  **化简分母**：分母 $= 2(a+b+c)$。
5.  **最终计算**：$\text{左式} \ge \frac{(a+b+c)^2}{2(a+b+c)} = \frac{a+b+c}{2}$。
6.  **结论**：证毕。等号成立条件为 $a=b=c$。

#### 答案
证毕。
</details>

### 例题 2：函数方程的初等赋值
求所有函数 $f: \mathbb{R} \to \mathbb{R}$，使得对任意 $x, y \in \mathbb{R}$，均有 $f(x+y) = f(x) + f(y)$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1.  **取 $x=y=0$**：$f(0+0) = f(0) + f(0) \implies f(0) = 0$。
2.  **取 $y=x$**：$f(2x) = 2f(x)$。通过归纳法可证对于正整数 $n$，$f(nx) = nf(x)$。
3.  **扩展到有理数**：设 $x = \frac{p}{q} \cdot 1$，可得 $f(\frac{p}{q}) = \frac{p}{q} f(1)$。
4.  **连续性假设**：若假设 $f$ 是连续的（或单调的、或在某区间有界），则可以从有理数推广到实数。
5.  **结论形式**：$f(x) = cx$，其中 $c = f(1)$。

#### 答案
$f(x) = cx$
</details>
