---
title: Riemann-Stieltjes 积分与 Stieltjes 矩量问题
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# Riemann-Stieltjes 积分与 Stieltjes 矩量问题

Riemann 积分虽然强大，但在处理离散与连续混合分布、或者函数在某些点处具有“阶跃”性质时显得捉襟见肘。Riemann-Stieltjes (R-S) 积分通过引入“控制函数” $\alpha(x)$，将积分从单纯的面积累加升华为一种更广义的测度累加。

## 一、 Riemann-Stieltjes 积分理论

### 1. 定义
设 $f(x)$ 和 $\alpha(x)$ 是定义在 $[a, b]$ 上的有界函数。对于 $[a, b]$ 的任一划分 $P: a = x_0 < x_1 < \dots < x_n = b$，在每个小区间 $[x_{i-1}, x_i]$ 上任取一点 $\xi_i$，作和式：
$$S(P, f, \alpha) = \sum_{i=1}^n f(\xi_i) [\alpha(x_i) - \alpha(x_{i-1})]$$
若当划分的模 $\lambda(P) \to 0$ 时，该和式的极限存在且与划分 $P$ 及 $\xi_i$ 的选取无关，则称 $f$ 关于 $\alpha$ 在 $[a, b]$ 上是 **Riemann-Stieltjes 可积**的，记作：
$$\int_a^b f(x) d\alpha(x)$$

### 2. R-S 积分的物理与数学直观
- **物理意义**：若 $f(x)$ 为单位长度的力，$\alpha(x)$ 为位移，则积分表示功。若 $\alpha(x)$ 在某些点有跳跃，则表示在该点有力做了瞬时功。
- **概率意义**：若 $\alpha(x)$ 是随机变量的累积分布函数 (CDF)，则 $\int f d\alpha$ 即为 $f(X)$ 的期望 $E[f(X)]$。这完美统一了离散型（$\alpha$ 为阶梯函数）和连续型（$\alpha$ 可导）随机变量的期望表达。

### 3. 重要性质
- **分部积分公式**：若 $\int_a^b f d\alpha$ 存在，则 $\int_a^b \alpha df$ 也存在，且：
  $$\int_a^b f d\alpha + \int_a^b \alpha df = f(b)\alpha(b) - f(a)\alpha(a)$$
- **与 Riemann 积分的关系**：若 $\alpha(x)$ 在 $[a, b]$ 上具有连续导数 $\alpha'(x)$，则：
  $$\int_a^b f(x) d\alpha(x) = \int_a^b f(x) \alpha'(x) dx$$

---

## 二、 Stieltjes 矩量问题 (Stieltjes Moment Problem)

矩量问题是 R-S 积分在分析学中的深度应用。它探讨的是：能否通过已知的一系列“矩”来唯一确定一个测度（或分布函数）？

### 1. 问题描述
给定一个实序列 $\{\mu_n\}_{n=0}^\infty$，是否存在定义在 $[0, \infty)$ 上的非减函数 $\alpha(x)$，使得对所有 $n \ge 0$ 均有：
$$\int_0^\infty x^n d\alpha(x) = \mu_n$$

### 2. 存在性判别（Stieltjes 条件）
序列 $\{\mu_n\}$ 能产生非减函数 $\alpha$ 的充分必要条件是以下两个 Hankel 矩阵均为半正定：
1. $H_n = (\mu_{i+j})_{0 \le i,j \le n} \succeq 0$
2. $H'_n = (\mu_{i+j+1})_{0 \le i,j \le n} \succeq 0$

---

## 三、 深度例题解析

### 例题 1：阶梯函数的 R-S 积分
设 $f(x) = x^2$，$\alpha(x) = \lfloor x \rfloor$（向下取整函数）。计算 $\int_0^3 f(x) d\alpha(x)$。

<details>
<summary>点击查看解析</summary>

#### 解析
$\alpha(x)$ 在 $x=1, 2, 3$ 处有跳跃。对于 R-S 积分，当 $\alpha$ 是阶梯函数时，积分转化为在跳跃点处的函数值加权和。
注意：在 $x=3$ 处，$\alpha(3)-\alpha(3^-) = 3-2 = 1$。
$$\int_0^3 x^2 d\lfloor x \rfloor = f(1)[\alpha(1)-\alpha(1^-)] + f(2)[\alpha(2)-\alpha(2^-)] + f(3)[\alpha(3)-\alpha(3^-)]$$
$$= 1^2 \cdot 1 + 2^2 \cdot 1 + 3^2 \cdot 1 = 1 + 4 + 9 = 14$$

#### 答案
14
</details>

### 例题 2：分部积分法的妙用
证明：若 $f$ 在 $[a, b]$ 上连续，$\alpha$ 为有界变差函数，则 $\int_a^b f d\alpha$ 必存在。利用此结论计算 $\int_0^\pi x d(\sin x)$。

<details>
<summary>点击查看解析</summary>

#### 解析
1. **直接计算**：由于 $\sin x$ 在 $[0, \pi]$ 上可导，且 $(\sin x)' = \cos x$ 连续。
   $$\int_0^\pi x d(\sin x) = \int_0^\pi x \cos x dx$$
2. **应用 Riemann 分部积分**：
   $$= [x \sin x]_0^\pi - \int_0^\pi \sin x dx$$
   $$= ( \pi \sin \pi - 0 \sin 0 ) - [-\cos x]_0^\pi$$
   $$= 0 - (- \cos \pi + \cos 0) = - (1 + 1) = -2$$

#### 答案
-2
</details>

---

## 四、 配套练习

1. **(基础)** 计算 $\int_{-1}^2 x^3 d(|x|)$。
2. **(进阶)** 设 $\alpha(x) = \begin{cases} 0, & x=0 \\ 1, & x \in (0, 1] \end{cases}$。讨论 $\int_0^1 \alpha d\alpha$ 是否存在？若存在，求其值。
3. **(挑战)** 给定矩量序列 $\mu_n = n!$。试构造一个满足 $\int_0^\infty x^n d\alpha(x) = n!$ 的函数 $\alpha(x)$，并验证其是否满足 Stieltjes 条件。

<details>
<summary>点击查看简要提示</summary>

1. 拆分为 $[-1, 0]$ 和 $[0, 2]$，注意 $|x|$ 的导数在 $x=0$ 左右符号不同。
2. 考察定义中的和式。根据 R-S 积分存在的必要条件，若 $f$ 和 $\alpha$ 在同一点处均不连续（且为同侧不连续），则积分通常不存在。在本题中，$x=0$ 是共同的不连续点。
3. 提示：考虑 $\alpha(x) = 1 - e^{-x}$，对应的密度函数为 $e^{-x}$。利用 Gamma 函数性质 $\Gamma(n+1) = \int_0^\infty x^n e^{-x} dx = n!$。
</details>
