---
title: ""
description: 对标教材的实数完备性与函数基础方法�?
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 第一�?实数集与函数

本章聚焦数学分析的语言基础：实数完备性、确界思想、函数复合与反函数。目标不是“会用结论”，而是建立后续极限与连续理论所需的严格表达习惯�?

## 一、核心定义与定理

### 1. 上下确界与完备�?

设非空集�?$A\subset\mathbb{R}$�?

- 若存�?$M\in\mathbb{R}$ 使得对任�?$x\in A$ 都有 $x\le M$，称 $A$ 有上界�?
- �?$\beta$ �?$A$ 的上界且任意上界 $M$ 都满�?$\beta\le M$，称 $\beta=\sup A$�?

<KnowledgeCard type="warning" title="确界存在定理">
任一非空有上界实数集必有上确界；任一非空有下界实数集必有下确界�?
</KnowledgeCard>

该定理本质上等价于实数完备性，后续单调有界定理、闭区间套、Bolzano-Weierstrass 都以此为基础�?

### 2. 阿基米德性质与稠密�?

- **阿基米德性质**：对任意 $x\in\mathbb{R}$，存�?$n\in\mathbb{N}$ �?$n>x$�?
- **有理数稠密�?*：任�?$a<b$，存�?$q\in\mathbb{Q}$ �?$a<q<b$�?

这两个性质保证了“离散量可逼近连续量”，�?$\epsilon$-语言可操作的关键�?

### 3. 函数复合与反函数判定

�?$u=g(x)$�?y=f(u)$�?

- 复合 $f\circ g$ 有定义的必要条件�?g(D_g)\subseteq D_f$�?
- 反函�?$f^{-1}$ 存在的充分条件：$f$ 在区间上严格单调且值域可确定�?

---

## 二、教材化例题�? 题）

### 例题 1：确界计�?

�?$A=\{\frac{n-1}{n}:n\in\mathbb{N}_+\}$，求 $\sup A$ �?$\inf A$�?

<details>

<summary>点击查看解析与答�?/summary>

$\frac{n-1}{n}=1-\frac1n<1$，故 1 是上界�?

对任�?$\epsilon>0$，取 $n>1/\epsilon$，则

$$1-\frac1n>1-\epsilon,$$

所�?1 是最小上界，�?$\sup A=1$�?

�?$n=1$ 时取到最小�?0，且所有项非负，故 $\inf A=0$�?

</details>

### 例题 2：集合运算与确界

�?$A,B$ 非空有界，证�?$\sup(A+B)=\sup A+\sup B$，其�?$A+B=\{a+b:a\in A,b\in B\}$�?

<details>

<summary>点击查看解析与答�?/summary>

先证上界：任�?$a+b\in A+B$，有 $a\le\sup A,b\le\sup B$，故

$$a+b\le\sup A+\sup B.$$

再证最小性：任意 $\epsilon>0$，取

$$a_\epsilon>\sup A-\epsilon/2,\quad b_\epsilon>\sup B-\epsilon/2,$$

�?

$$a_\epsilon+b_\epsilon>\sup A+\sup B-\epsilon.$$

�?$\sup(A+B)=\sup A+\sup B$�?

</details>

### 例题 3：复合函数定义域

求函�?

$$h(x)=\sqrt{\ln(1-x^2)}$$

的定义域�?

<details>

<summary>点击查看解析与答�?/summary>

条件 1�?\ln(1-x^2)$ 有意义，需 $1-x^2>0$，即 $|x|<1$�?

条件 2：根号内非负，需 $\ln(1-x^2)\ge0$，即 $1-x^2\ge1$，得 $x^2\le0$�?

两条件合并得 $x=0$�?

定义域为 $\{0\}$�?

</details>

### 例题 4：反函数存在�?

证明 $f(x)=x+e^x$ �?$\mathbb{R}$ 上可逆�?

<details>

<summary>点击查看解析与答�?/summary>

$$f'(x)=1+e^x>0,$$

�?$f$ 严格递增，从而单射�?

�?

$$\lim_{x\to-\infty}(x+e^x)=-\infty,\qquad \lim_{x\to+\infty}(x+e^x)=+\infty,$$

值域�?$\mathbb{R}$，故满射�?

因此 $f:\mathbb{R}\to\mathbb{R}$ 双射，反函数存在�?

</details>

---

## 三、章内练习（折叠答案�?

### 练习 1：上确界

求集�?$E=(0,2)\cap\mathbb{Q}$ 的上确界与下确界�?

<details>

<summary>点击查看过程与答�?/summary>

�?$E\subset(0,2)$，任意元都小�?2；对任意 $\epsilon>0$，区�?$(2-\epsilon,2)$ 内存在有理数，所以可逼近 2�?

同理可逼近 0 且不取到 0�?

答案�?\sup E=2,\inf E=0$�?

</details>

### 练习 2：绝对值不等式

证明�?\big|\sup A-\sup B\big|\le\sup\{|a-b|:a\in A,b\in B\}$（假设两边存在）�?

<details>

<summary>点击查看过程与答�?/summary>

�?$M=\sup\{|a-b|\}$。对任意 $a\in A,b\in B$，有 $a\le b+M$，取上确界得

$$\sup A\le\sup B+M.$$

交换 $A,B$ �?$\sup B\le\sup A+M$，合并即

$$|\sup A-\sup B|\le M.$$

</details>

### 练习 3：复合函数定义域

�?

$$g(x)=\ln\!\left(\sqrt{\frac{x-1}{x+2}}\right)$$

的定义域�?

<details>

<summary>点击查看过程与答�?/summary>

根号内需严格大于 0（因为外层有对数）：

$$\frac{x-1}{x+2}>0.$$

解不等式�?$x\in(-\infty,-2)\cup(1,+\infty)$�?

</details>

### 练习 4：反函数导数

�?$f(x)=x^3+x$，记其反函数�?$f^{-1}$，求 $(f^{-1})'(0)$�?

<details>

<summary>点击查看过程与答�?/summary>

先求 $f(x_0)=0$，得 $x_0=0$�?

由反函数求导公式

$$(f^{-1})'(0)=\frac1{f'(0)}=\frac1{3\cdot0^2+1}=1.$$

</details>

---

<SupportingExercises
topic="第一章：实数集与函数"
exercises={[
{ index: 37, title: ""
{ index: 38, title: ""
{ index: 39, title: ""
]}
/>

## 四、练习库入口

- [前四章基础专题练习（新）](/docs/exercises/math/analysis-foundations)
- [数学分析综合练习库](/docs/exercises/math/analysis)

---

_编者注：第一章最重要的能力是“把直觉翻译成定义”，尤其是对“上界”和“最小上界”的区分。_
