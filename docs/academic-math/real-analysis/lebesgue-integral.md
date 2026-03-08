---
title: Lebesgue 积分：测度论视野下的现代积分理论 (Lebesgue Integral)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# Lebesgue 积分：测度论视野下的现代积分理论

> “黎曼积分是将函数定义域切碎，而勒贝格积分是将函数的值域切碎。” —— 亨利·勒贝格 (Henri Lebesgue)

黎曼积分（Riemann Integral）虽然在微积分初期取得了辉煌成就，但其局限性也日益明显：它无法处理像 Dirichlet 函数（有理数点为 1，无理数点为 0）这样处处不连续的函数，且在函数项级数的极限号与积分号交换问题上限制极其苛刻。勒贝格积分通过引入**测度论**，彻底革新了积分的概念。

---

## 一、 为什么要建立 Lebesgue 积分？

### 1. Riemann 积分的局限性

Riemann 积分要求函数必须是“几乎处处连续”的。对于复杂的点集（如 Cantor 集或有理数集），Riemann 积分往往束手无策。

- **反例**：Dirichlet 函数 $D(x) = \chi_{\mathbb{Q}}(x)$。
  在任何区间内，$D(x)$ 的上和总为 1，下和总为 0，因此 Riemann 不可积。但直觉上，有理数集是“稀疏”的，其积分应该为 0。

### 2. 极限理论的缺失

在 Riemann 积分框架下，若 $f_n \to f$ 且 $f_n$ 可积，推导 $\lim \int f_n = \int f$ 需要极其强的条件（如一致收敛）。但在许多物理和工程问题中，我们只能得到逐点收敛。

---

## 二、 Lebesgue 积分的定义步骤

勒贝格积分的建立遵循“由易到难”的阶梯式路径：**简单函数 $\to$ 非负可测函数 $\to$ 一般可测函数**。

### 1. 简单函数的积分

设 $E$ 是可测集，称函数 $\phi(x)$ 为**简单函数**，若其值域仅包含有限个实数值 $\{a_1, a_2, \dots, a_n\}$。它可以写成：

$$\phi(x) = \sum_{i=1}^n a_i \chi_{E_i}(x)$$

其中 $E_i = \{x \in E \mid \phi(x) = a_i\}$。
**定义**：$\phi(x)$ 在 $E$ 上的 Lebesgue 积分为：

$$\int_E \phi(x) dx = \sum_{i=1}^n a_i m(E_i)$$

_注：这里 $m(E_i)$ 为 Lebesgue 测度。若某个 $a_i = 0$ 且 $m(E_i) = \infty$，约定 $0 \cdot \infty = 0$。_

### 2. 非负可测函数的积分

对于一般的非负可测函数 $f(x) \ge 0$，利用简单函数序列逼近的思想：
**定义**：

$$\int_E f(x) dx = \sup \left\{ \int_E \phi(x) dx \mid 0 \le \phi \le f, \phi \text{ 为简单函数} \right\}$$

如果此上确界有限，称 $f$ 在 $E$ 上 **Lebesgue 可积**。

### 3. 一般可测函数的积分

对于任意可测函数 $f(x)$，定义其正部 $f^+(x) = \max\{f(x), 0\}$ 和负部 $f^-(x) = \max\{-f(x), 0\}$。
显然 $f = f^+ - f^-$ 且 $|f| = f^+ + f^-$。
**定义**：若 $\int_E f^+ dx$ 和 $\int_E f^- dx$ 中至少有一个有限，则定义：

$$\int_E f dx = \int_E f^+ dx - \int_E f^- dx$$

若两者皆有限，则称 $f$ 在 $E$ 上可积（或绝对可积）。

---

## 三、 三大核心收敛定理（深度解析）

这是勒贝格积分理论最耀眼的皇冠，也是解决极限与积分交换问题的终极武器。

<KnowledgeCard title="定理 1：单调收敛定理 (Monotone Convergence Theorem, MCT)" icon="TrendingUp">
设 $\{f_n\}$ 是 $E$ 上的非负可测函数序列，且单调不减，即 $0 \le f_1 \le f_2 \le \dots \le f_n \le \dots$。
若 $\lim_{n \to \infty} f_n(x) = f(x)$ 几乎处处成立，则：

$$\lim_{n \to \infty} \int_E f_n dx = \int_E f dx$$

</KnowledgeCard>

**证明要点**：
由于 $f_n \le f$，显然 $\lim \int f_n \le \int f$。
反向不等式证明较为微妙：对于任何满足 $0 \le \phi \le f$ 的简单函数 $\phi$ 和常数 $c \in (0, 1)$，定义集合 $E_n = \{x \in E \mid f_n(x) \ge c\phi(x)\}$。由于 $f_n$ 单调增，$E_n$ 也是单调增的集列且 $\cup E_n = E$。
利用测度的连续性，可证 $\lim \int f_n \ge \int_{E_n} f_n \ge c \int_{E_n} \phi$。令 $n \to \infty$，得到 $\lim \int f_n \ge c \int_E \phi$。
最后令 $c \to 1$ 且对所有 $\phi$ 取上确界，即证。

<KnowledgeCard title="定理 2：法图引理 (Fatou's Lemma)" icon="Zap">
设 $\{f_n\}$ 是 $E$ 上的非负可测函数序列，则：

$$\int_E \liminf_{n \to \infty} f_n dx \le \liminf_{n \to \infty} \int_E f_n dx$$

</KnowledgeCard>

**直观理解**：
积分的下极限不会超过下极限的积分。它是单调收敛定理的直接推论（考虑 $g_n = \inf_{k \ge n} f_k$ 构成的单调增序列）。

<KnowledgeCard title="定理 3：勒贝格受控收敛定理 (Dominated Convergence Theorem, DCT)" icon="ShieldCheck">
设 $\{f_n\}$ 是可测函数序列，满足：
1. $\lim_{n \to \infty} f_n(x) = f(x)$ 几乎处处成立。
2. 存在一个**可积函数** $G(x)$（称为控制函数），使得对于所有 $n$，满足 $|f_n(x)| \le G(x)$ 几乎处处成立。
则 $f$ 可积，且：

$$\lim_{n \to \infty} \int_E f_n dx = \int_E f dx$$

</KnowledgeCard>

**证明路径**：
由于 $G \pm f_n \ge 0$，直接对这两个非负序列应用法图引理即可。
这是实际应用中最频繁使用的定理，因为它只需找到一个“盖住”所有项的可积函数。

---

## 四、 深度实战与例题解析

### 练习 1：Dirichlet 函数的 Lebesgue 积分

计算 $\int_0^1 D(x) dx$，其中 $D(x) = \chi_{\mathbb{Q}}(x)$。

<details>

<summary>点击查看解析</summary>

#### 解析

1. **识别简单函数**：$D(x)$ 是典型的简单函数，只取值 1（在 $\mathbb{Q} \cap [0, 1]$ 上）和值 0（在 $\mathbb{Q}^c \cap [0, 1]$ 上）。
2. **计算测度**：
   - 有理数集 $\mathbb{Q}$ 是可数集，其 Lebesgue 测度 $m(\mathbb{Q} \cap [0, 1]) = 0$。
   - 无理数集在 $[0, 1]$ 上的测度为 $1 - 0 = 1$。
3. **应用定义**：

$$\int_0^1 D(x) dx = 1 \cdot m(\mathbb{Q} \cap [0, 1]) + 0 \cdot m(\mathbb{Q}^c \cap [0, 1]) = 1 \cdot 0 + 0 \cdot 1 = 0$$

#### 结论

在 Lebesgue 意义下，Dirichlet 函数积分为 0。这符合“几乎处处为 0 的函数积分为 0”的直觉。

</details>

### 练习 2：利用 DCT 交换极限与积分

计算极限：$\lim_{n \to \infty} \int_0^1 \frac{n \sqrt{x}}{1 + n^2 x^2} dx$。

<details>

<summary>点击查看解析</summary>

#### 解析

1. **逐点极限**：
   当 $x > 0$ 时，$\frac{n \sqrt{x}}{1 + n^2 x^2} \sim \frac{1}{n x^{1.5}} \to 0$。
   当 $x = 0$ 时，值为 0。
   故逐点极限 $f(x) \equiv 0$。
2. **寻找控制函数 $G(x)$**：
   利用基本不等式 $1 + n^2 x^2 \ge 2nx$：

$$\left| \frac{n \sqrt{x}}{1 + n^2 x^2} \right| \le \frac{n \sqrt{x}}{2nx} = \frac{1}{2 \sqrt{x}}$$

在 $(0, 1]$ 上，$\int_0^1 \frac{1}{2 \sqrt{x}} dx = [\sqrt{x}]_0^1 = 1 < \infty$，即 $G(x) = \frac{1}{2\sqrt{x}}$ 是可积的控制函数。3. **应用 DCT**：
由于存在控制函数，极限号可进入积分：

$$\lim \int = \int \lim = \int_0^1 0 dx = 0$$

</details>

### 练习 3：单调收敛定理的妙用

设 $f(x) \ge 0$ 可积，证明：$\int_E f dx = \sum_{n=1}^\infty \int_{E_n} f dx$，其中 $E = \cup_{n=1}^\infty E_n$ 且 $E_n$ 两两不交。

<details>

<summary>点击查看解析</summary>

#### 证明

1. 定义部分和函数 $g_k(x) = \sum_{n=1}^k f(x) \chi_{E_n}(x)$。
2. 由于 $f \ge 0$，$g_k$ 是单调不减的非负可测函数序列。
3. 逐点极限 $\lim_{k \to \infty} g_k(x) = f(x) \chi_E(x)$。
4. 根据 **MCT**：

$$\int_E f dx = \int \lim g_k dx = \lim \int g_k dx$$

$$= \lim_{k \to \infty} \sum_{n=1}^k \int_{E_n} f dx = \sum_{n=1}^\infty \int_{E_n} f dx$$

这证明了 Lebesgue 积分具有**项项可加性**。

</details>

---

## 五、 Lebesgue 积分与 Riemann 积分的关系

1. **若 Riemann 可积，则 Lebesgue 必可积**，且积分值相等。
2. **Riemann 不可积，Lebesgue 可能可积**（如 Dirichlet 函数）。
3. **广义 Riemann 积分与 Lebesgue 积分不完全等价**：
   - 如果广义积分是绝对收敛的，则两者一致。
   - 如果是条件收敛（如 $\int_0^\infty \frac{\sin x}{x} dx$），则它在 Lebesgue 意义下**不可积**，因为 Lebesgue 要求绝对可积 $\int |f| < \infty$。

---

## 六、 总结与进阶建议

Lebesgue 积分不仅是纯数学的基石，在概率论（期望即积分）、调和分析、量子力学等领域有着不可替代的作用。掌握它的关键在于：

- **跳出“切分 $x$ 轴”的思维定势**。
- **熟练运用三大收敛定理**，这是考试和科研中最强大的工具。
- **关注“几乎处处” (a.e.) 概念**，理解测度零集如何影响积分。

---

_参考资料：_

- _《实变函数论》周民强_
- _《Real and Complex Analysis》Walter Rudin_

---

## 七、配套练习跳转

- [进入实变函数专题练习总页](/docs/exercises/math/real-analysis)
- [B 组：收敛定理与积分交换（建议对应本章）](/docs/exercises/math/real-analysis#ra-b1)
- [返回实变函数学习路径首页](/docs/academic-math/real-analysis)
