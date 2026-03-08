---
title: 竞赛代数：经典不等式与函数方程
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 竞赛代数：经典不等式与函数方程

高中竞赛代数不只考运算，更考“方法选型”：什么时候用均值链，什么时候用凸性，什么时候把函数方程转为代数结构。

## 一、核心知识点讲解

### 1. 常用不等式工具箱

- 均值链：$H_n \le G_n \le A_n \le Q_n$。
- 柯西与 Titu（Engel 形式）：

$$

\sum_{i=1}^n\frac{x_i^2}{y_i}\ge\frac{(x_1+\cdots+x_n)^2}{y_1+\cdots+y_n}\quad(y_i>0).


$$

- Hölder：

$$

\left(\sum a_i^p\right)^{1/p}\left(\sum b_i^q\right)^{1/q}\ge\sum a_ib_i\quad\left(\frac1p+\frac1q=1\right).


$$

- 排序与重排：同序乘积和最大，逆序最小。

### 2. 凸性方法与 Jensen

若 $f$ 在区间上凸，则

$$

f\!\left(\frac{x_1+\cdots+x_n}{n}\right)\le\frac{f(x_1)+\cdots+f(x_n)}{n}.


$$

竞赛中常见选函数：$\ln x,\ x\ln x,\ \frac1x,\ \frac{x}{1-x}$（配合定义域）。

### 3. 函数方程的三步法

- 第一步：代入特值（$0,1,-x$）确定 $f(0),f(1),f(-x)$。
- 第二步：判定结构（奇偶性、单射/满射、加性/乘性）。
- 第三步：在附加条件（单调、连续、有界）下完成线性化。

<KnowledgeCard type="tip" title="解题策略">
对称不等式先尝试“归一化 + 局部估计求和”；函数方程先锁定 $f(0)$ 与 $f(1)$，再决定是否引入单调/连续条件。
</KnowledgeCard>

---

## 二、经典例题实战

### 例题 1：Titu 不等式基础模板

已知 $a,b,c>0$，证明

$$

\frac{a^2}{b+c}+\frac{b^2}{c+a}+\frac{c^2}{a+b}\ge\frac{a+b+c}{2}.


$$

<details>

<summary>点击查看解析与答案</summary>

由 Titu 不等式

$$

\sum_{cyc}\frac{a^2}{b+c}\ge\frac{(a+b+c)^2}{(b+c)+(c+a)+(a+b)}=\frac{(a+b+c)^2}{2(a+b+c)}=\frac{a+b+c}{2}.


$$

证毕。

</details>

### 例题 2：Jensen 与凸函数

设 $x,y,z>0$ 且 $x+y+z=3$，证明

$$

\frac1{1+x}+\frac1{1+y}+\frac1{1+z}\ge\frac32.


$$

<details>

<summary>点击查看解析与答案</summary>

取 $f(t)=\frac1{1+t}$，有

$$

f''(t)=\frac{2}{(1+t)^3}>0,


$$

故 $f$ 在 $(0,+\infty)$ 上凸。Jensen 给出

$$

\frac{f(x)+f(y)+f(z)}3\ge f\!\left(\frac{x+y+z}3\right)=f(1)=\frac12.


$$

故左式 $\ge\frac32$。

</details>

### 例题 3：齐次化不等式

设 $a,b,c>0,\ abc=1$，证明

$$

\sum_{cyc}\frac1{a^3(b+c)}\ge\frac32.


$$

<details>

<summary>点击查看解析与答案</summary>

由 $abc=1$，有 $\frac1{a^3(b+c)}=\frac{(bc)^2}{b+c}$，于是

$$

\sum_{cyc}\frac1{a^3(b+c)}=\sum_{cyc}\frac{(bc)^2}{b+c}
\ge\frac{(ab+bc+ca)^2}{2(a+b+c)}.


$$

再由 $(ab+bc+ca)^2\ge3abc(a+b+c)=3(a+b+c)$，得到

$$

\frac{(ab+bc+ca)^2}{2(a+b+c)}\ge\frac32.


$$

证毕。

</details>

### 例题 4：加法型函数方程

求所有满足

$$

f(x+y)=f(x)+f(y),\quad \forall x,y\in\mathbb R


$$

且在 $\mathbb R$ 上单调的函数。

<details>

<summary>点击查看解析与答案</summary>

由加法性得 $f(0)=0,f(-x)=-f(x)$，并可推出 $f(q)=qf(1)$（$q\in\mathbb Q$）。
单调性可将有理逼近推广到实数，故

$$

f(x)=cx,\quad c=f(1).


$$

</details>

### 例题 5：函数方程中的构造替换

求满足

$$

f(x+y)+f(x-y)=2f(x)+2f(y),\quad \forall x,y\in\mathbb R


$$

且 $f(1)=1$ 的函数。

<details>

<summary>点击查看解析与答案</summary>

令 $x=y=0$ 得 $f(0)=0$。令 $y=x$ 得 $f(2x)=4f(x)$。再令 $x\mapsto\frac{x+y}{2},y\mapsto\frac{x-y}{2}$ 可化出二次型平行四边形恒等式，说明 $f$ 为二次函数，设 $f(x)=kx^2$。代入原式恒成立，且 $f(1)=1$ 得 $k=1$。

答案：$f(x)=x^2$。

</details>

---

## 三、配套练习（章节内）

### 练习 1（基础）

设 $a,b>0$，证明

$$

\frac{a}{b}+\frac{b}{a}\ge2.


$$

<details>

<summary>点击查看过程与答案</summary>

由 AM-GM：$\frac{a}{b}+\frac{b}{a}\ge2\sqrt{\frac{a}{b}\cdot\frac{b}{a}}=2$。

</details>

### 练习 2（提高）

设 $a,b,c>0$，证明

$$

\frac{a+b+c}{3}\ge\sqrt[3]{abc}.


$$

<details>

<summary>点击查看过程与答案</summary>

三元 AM-GM 直接成立，等号当且仅当 $a=b=c$。

</details>

### 练习 3（提高）

求所有满足

$$

f(x+y)=f(x)+f(y)+2xy,


$$

且 $f(0)=0$ 的函数。

<details>

<summary>点击查看过程与答案</summary>

令 $g(x)=f(x)-x^2$，则

$$

g(x+y)=g(x)+g(y).


$$

若附加单调/连续，则 $g(x)=cx$，故

$$

f(x)=x^2+cx.


$$

</details>

### 练习 4（挑战）

设 $x,y,z\in(0,1),\ x+y+z=1$，证明

$$

\frac{x}{1-x}+\frac{y}{1-y}+\frac{z}{1-z}\ge\frac32.


$$

<details>

<summary>点击查看过程与答案</summary>

取 $f(t)=\frac{t}{1-t}$，$f''(t)=\frac{2}{(1-t)^3}>0$，Jensen 得

$$

\frac{f(x)+f(y)+f(z)}{3}\ge f\!\left(\frac13\right)=\frac12.


$$

故左式 $\ge\frac32$。

</details>
