---
title: 竞赛专题：不等式与函数方程
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 竞赛专题：不等式与函数方程

初中竞赛中的不等式与函数方程，常考查“结构代换 + 单调性 + 构造验证”三件事。

## 一、核心知识点讲解

### 1. 基础不等式与等号条件

- 平方非负：$(x-y)^2\ge 0$，常用于推出 $x^2+y^2\ge 2xy$。
- AM-GM（两数）：对正数 $a,b$，有 $\dfrac{a+b}{2}\ge\sqrt{ab}$。
- 倒数型比较：若 $0<a\le b$，则 $\dfrac1a\ge\dfrac1b$。
- 等号条件必须同步检查，避免“只证不等，不证最值可取”。

### 2. 分式与根式不等式处理

- 通分前先判断分母正负，必要时先限定定义域。
- 根式比较优先平方，但平方前先确认两边非负。
- 含参数题先做“区间分段”再统一比较。

### 3. 初中函数方程常见模型

- 线性型：$f(x+y)=f(x)+f(y)$（在竞赛常附加单调、有界、整数域等条件）。
- 倍增型：$f(2x)$ 与 $f(x)$ 的关系可先取特殊值。
- 对称型：$f(x)+f(a-x)$ 常配合换元得到常数关系。
- 迭代型：$f(f(x))$ 通常先求不动点，再讨论单调与值域。

<KnowledgeCard type="tip" title="竞赛习惯">
函数方程题先做三步：取特殊值（如 0、1、-x）-> 做对称替换 -> 验证候选解。
</KnowledgeCard>

---

## 二、经典例题实战

### 例题 1：基础不等式求最值

已知 $x>0$，求 $x+\dfrac{4}{x}$ 的最小值。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程

1. 由 AM-GM：

$$x+\frac{4}{x}\ge 2\sqrt{x\cdot\frac{4}{x}}=4.$$

2. 当且仅当 $x=\dfrac{4}{x}$，即 $x=2$ 时取等号。

#### 答案

最小值为 $4$，在 $x=2$ 时取得。

</details>

### 例题 2：分式不等式

解不等式：

$$\frac{x-1}{x+2}\ge \frac12,\quad x\ne -2.$$

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程

1. 移项：

$$\frac{x-1}{x+2}-\frac12=\frac{2x-2-(x+2)}{2(x+2)}=\frac{x-4}{2(x+2)}\ge0.$$

2. 等价于

$$\frac{x-4}{x+2}\ge0.$$

3. 临界点为 $x=-2,4$，作符号表得解集

$$(-\infty,-2)\cup[4,+\infty).$$

#### 答案

$x\in(-\infty,-2)\cup[4,+\infty)$。

</details>

### 例题 3：函数方程（整数域）

设 $f:\mathbb Z\to\mathbb Z$ 满足

$$f(x+y)=f(x)+f(y),\quad f(1)=3.$$

求 $f(n)$（$n\in\mathbb Z$）。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程

1. 先取 $y=0$：

$$f(x)=f(x)+f(0)\Rightarrow f(0)=0.$$

2. 对正整数 $n$，反复相加得

$$f(n)=nf(1)=3n.$$

3. 由 $0=f(0)=f(n+(-n))=f(n)+f(-n)$，得

$$f(-n)=-f(n)=-3n.$$

#### 答案

$$f(n)=3n\quad (n\in\mathbb Z).$$

</details>

### 例题 4：对称替换法

设函数 $f$ 满足

$$f(x)+f(2-x)=x^2-2x+5.$$

求 $f(1)$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程

1. 取 $x=1$，有

$$f(1)+f(1)=1-2+5=4.$$

2. 所以

$$f(1)=2.$$

#### 答案

$2$。

</details>

---

## 三、配套练习（点击展开答案）

### 练习 1

若 $a,b>0$ 且 $a+b=6$，求 $ab$ 的最大值。

<details>

<summary>点击查看过程与答案</summary>

#### 过程

由 $(a-b)^2\ge0$ 得

$$a^2+b^2\ge2ab\Rightarrow (a+b)^2\ge4ab.$$

故

$$ab\le\frac{(a+b)^2}{4}=\frac{36}{4}=9.$$

当 $a=b=3$ 取等。

#### 答案

最大值是 $9$。

</details>

### 练习 2

解不等式：

$$\frac{2x+1}{x-3}<1,\quad x\ne3.$$

<details>

<summary>点击查看过程与答案</summary>

#### 过程

移项得

$$\frac{2x+1-(x-3)}{x-3}=\frac{x+4}{x-3}<0.$$

临界点为 $x=-4,3$，分区间判断可得

$$-4<x<3.$$

#### 答案

$x\in(-4,3)$。

</details>

### 练习 3

设 $f:\mathbb Z\to\mathbb Z$，满足 $f(x+y)=f(x)+f(y)$ 且 $f(2)=10$，求 $f(7)$。

<details>

<summary>点击查看过程与答案</summary>

#### 过程

由可加性，

$$f(2)=2f(1)=10\Rightarrow f(1)=5.$$

于是

$$f(7)=7f(1)=35.$$

#### 答案

$35$。

</details>

### 练习 4

已知函数满足 $f(x)+f(6-x)=x^2-6x+20$，求 $f(3)$。

<details>

<summary>点击查看过程与答案</summary>

#### 过程

令 $x=3$，得

$$2f(3)=9-18+20=11.$$

故

$$f(3)=\frac{11}{2}.$$

#### 答案

$\dfrac{11}{2}$。

</details>
