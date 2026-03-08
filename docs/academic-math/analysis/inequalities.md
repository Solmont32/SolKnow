---
title: 分析学不等式 (Analytic Inequalities)
description: 系统化梳理分析学中核心不等式理论：从代数基础到 L^p 空间，包含 Young, Hölder, Minkowski, Jensen 的严密证明。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 分析学不等式全书

不等式是分析学的灵魂。本专题旨在为学习者构建一套完整的估计工具箱。

---

## 一、 凸性与 Jensen 不等式 (The Foundation)

一切经典不等式的源头往往是函数的**凸性**。

### 1. Jensen 不等式

若 $\phi$ 是区间 $I$ 上的凸函数，则对于任何 $x_1, \dots, x_n \in I$ 及权重 $\lambda_i \ge 0, \sum \lambda_i = 1$：
$$\phi\left( \sum_{i=1}^n \lambda_i x_i \right) \le \sum_{i=1}^n \lambda_i \phi(x_i)$$

<details>
<summary>点击查看证明思路：数学归纳法</summary>
$n=2$ 时即凸函数定义。假设 $n=k$ 成立，对于 $n=k+1$，将前 $k$ 项通过权重归一化看作一个整体，利用 $n=2$ 的结论及归纳假设即可证得。
</details>

---

## 二、 经典三剑客：Young, Hölder, Minkowski

### 1. Young 不等式
设 $p, q > 1, \frac{1}{p} + \frac{1}{q} = 1$，则对于 $a, b \ge 0$：
$$ab \le \frac{a^p}{p} + \frac{b^q}{q}$$
**证明**：对 $\ln$ 函数使用 Jensen 不等式（$\ln$ 是凹函数，或 $-\ln$ 是凸函数）：
$\ln(\frac{1}{p}a^p + \frac{1}{q}b^q) \ge \frac{1}{p}\ln a^p + \frac{1}{q}\ln b^q = \ln a + \ln b = \ln(ab)$。

### 2. Hölder 不等式
$$\sum |a_i b_i| \le \left( \sum |a_i|^p \right)^{1/p} \left( \sum |b_i|^q \right)^{1/q}$$
**证明**：先标准化，设 $\sum |a_i|^p = 1, \sum |b_i|^q = 1$。对每一项 $|a_i b_i|$ 应用 Young 不等式：
$|a_i b_i| \le \frac{|a_i|^p}{p} + \frac{|b_i|^q}{q}$。
求和得：$\sum |a_i b_i| \le \frac{1}{p} + \frac{1}{q} = 1$。

### 3. Minkowski 不等式 (三角不等式的 $L^p$ 版)
$$\left( \sum |a_i+b_i|^p \right)^{1/p} \le \left( \sum |a_i|^p \right)^{1/p} + \left( \sum |b_i|^p \right)^{1/p}$$
**证明**：利用 $|a+b|^p = |a+b||a+b|^{p-1} \le |a||a+b|^{p-1} + |b||a+b|^{p-1}$，然后对右侧两项分别应用 Hölder 不等式。

---

## 三、 Chebyshev 积分不等式

若 $f, g$ 在 $[a, b]$ 上同向单调，则：
$$(b-a) \int_a^b f(g) dx \ge \left( \int_a^b f dx \right) \left( \int_a^b g dx \right)$$

<details>
<summary>点击查看证明</summary>
考虑双重积分：
$\int_a^b \int_a^b [f(x)-f(y)][g(x)-g(y)] dx dy$。
由于同向单调，被积函数始终 $\ge 0$，故积分 $\ge 0$。
展开得：$\int_a^b \int_a^b [f(x)g(x) + f(y)g(y) - f(x)g(y) - f(y)g(x)] dx dy \ge 0$。
利用对称性，前两项相等，后两项也相等：
$2(b-a)\int f g dx - 2(\int f dx)(\int g dx) \ge 0$。
</details>

---

## 四、 深度例题解析

### 例题 1：利用 Hölder 证明 AM-GM
<details>
<summary>点击查看解析</summary>
设 $x_i > 0$，取 $p=n, a_i = x_i^{1/n}, b_i = 1$。
则 $\sum x_i^{1/n} \le (\sum x_i)^{1/n} (n)^{1-1/n}$。
但这并不是最直接的方法。最直接的是对 $-\ln x$ 使用 Jensen。
</details>

---

## 五、 配套练习

1. **[基础]** 证明：对于 $a, b, c > 0$，$\frac{a}{b+c} + \frac{b}{a+c} + \frac{c}{a+b} \ge \frac{3}{2}$ (Nesbitt 不等式)。
2. **[理论]** 利用 Young 不等式证明 $ab \le \epsilon a^p + C_\epsilon b^q$ 形式。
3. **[进阶]** 证明：若 $f$ 为凸函数且 $f(0)=0$，则 $f(a)+f(b) \le f(a+b)$ 对于 $a, b > 0$ 是否成立？
4. **[挑战]** 证明积分形式的 Minkowski 不等式。

<details>
<summary>点击查看简要提示</summary>
1. 提示：令 $S = a+b+c$，利用 $\sum \frac{a}{S-a} + 3 = \sum \frac{S}{S-a}$，再利用 Cauchy-Schwarz。
2. 提示：在 Young 不等式中代入适当比例的 $a, b$。
3. 答案：成立。由凸性 $f(a) = f(\frac{a}{a+b}(a+b) + \frac{b}{a+b} \cdot 0) \le \frac{a}{a+b}f(a+b)$。同理 $f(b) \le \frac{b}{a+b}f(a+b)$。相加即得。
</details>
