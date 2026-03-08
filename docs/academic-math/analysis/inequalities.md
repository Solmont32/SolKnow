---
title: 分析学不等式全书 (The Compendium of Analysis Inequalities)
description: 系统化梳理分析学中核心不等式理论：从代数基础到 L^p 空间，涵盖 Young, Hölder, Minkowski, Jensen, 重排序等核心内容。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 分析学不等式全书 (The Compendium of Analysis Inequalities)

不等式是分析学的灵魂。从极限的 $\epsilon-\delta$ 定义到算子的有界性估计，分析学的本质往往在于“放大”与“缩小”的艺术。本专题系统化整合了分析学中最为核心的不等式理论，旨在为零基础学习者构建一套完整的估计工具箱。

---

## 1. 基础代数不等式 (Fundamental Algebraic Inequalities)

### 1.1 Bernoulli 不等式

对于任意 $x > -1$：

1. 若 $\alpha \ge 1$ 或 $\alpha \le 0$，则 $(1+x)^\alpha \ge 1 + \alpha x$；
2. 若 $0 \le \alpha \le 1$，则 $(1+x)^\alpha \le 1 + \alpha x$。

等号成立当且仅当 $x=0$ 或 $\alpha = 0, 1$。

### 1.2 平均值不等式 (AM-GM-HM)

对于正实数 $a_1, a_2, \dots, a_n$：

$$

\frac{n}{\sum \frac{1}{a_i}} \le \sqrt[n]{\prod a_i} \le \frac{\sum a_i}{n} \le \sqrt{\frac{\sum a_i^2}{n}}


$$

即：**调和平均 $\le$ 几何平均 $\le$ 算术平均 $\le$ 平方平均**。

---

## 2. 凸函数与 Jensen 不等式 (Convexity and Jensen's)

### 2.1 凸性定义

若函数 $f: I \to \mathbb{R}$ 对任意 $x, y \in I$ 及 $\lambda \in [0, 1]$ 满足：

$$

f(\lambda x + (1-\lambda)y) \le \lambda f(x) + (1-\lambda)f(y)


$$

则称 $f$ 为 $I$ 上的**凸函数**（Convex Function）。

### 2.2 Jensen 不等式 (积分形式)

若 $\phi$ 是凸函数，$f$ 是 $[a, b]$ 上的可积函数，则：

$$

\phi\left( \frac{1}{b-a} \int_a^b f(x) dx \right) \le \frac{1}{b-a} \int_a^b \phi(f(x)) dx


$$

这是导出后续所有经典不等式的“母定理”。

---

## 3. 经典分析不等式 (Classical Analysis Inequalities)

### 3.1 Young 不等式

设 $a, b \ge 0$，$p, q > 1$ 且满足共轭关系 $\frac{1}{p} + \frac{1}{q} = 1$，则：

$$

ab \le \frac{a^p}{p} + \frac{b^q}{q}


$$

### 3.2 Hölder 不等式

设 $f, g$ 为可积函数，$p, q$ 为共轭指数，则：

$$

\int_a^b |f(x)g(x)| dx \le \left( \int_a^b |f(x)|^p dx \right)^{1/p} \left( \int_a^b |g(x)|^q dx \right)^{1/q}


$$

**特例**：当 $p=q=2$ 时，即为 **Cauchy-Schwarz 不等式**。

### 3.3 Minkowski 不等式 (三角不等式的 $L^p$ 推广)

对于 $p \ge 1$：

$$

\left( \int |f+g|^p \right)^{1/p} \le \left( \int |f|^p \right)^{1/p} + \left( \int |g|^p \right)^{1/p}


$$

这保证了 $L^p$ 空间的范数满足三角不等式。

---

## 4. 进阶不等式专题 (Advanced Topics)

### 4.1 重排序不等式 (Rearrangement Inequality)

设 $a_1 \le a_2 \le \dots \le a_n$ 且 $b_1 \le b_2 \le \dots \le b_n$，则对于 $\{b_i\}$ 的任意排列 $\{\sigma(i)\}$：

$$

\sum a_i b_{n-i+1} \le \sum a_i b_{\sigma(i)} \le \sum a_i b_i


$$

即：**同序和最大，反序和最小**。

### 4.2 Chebyshev 不等式 (分析版)

若 $f, g$ 在 $[a, b]$ 上同向单调，则：

$$

(b-a) \int_a^b f(x)g(x) dx \ge \left( \int_a^b f(x) dx \right) \left( \int_a^b g(x) dx \right)


$$

---

## 5. 深度例题 (Detailed Examples)

:::info 例题 1：利用 Hölder 不等式证明算术-几何平均
试用 Hölder 不等式推导 $n$ 元 AM-GM 不等式。

<details>

<summary>点击查看解析</summary>

**证明**：
考虑对数函数的凸性。设 $x_i > 0$，我们欲证 $\ln(\frac{1}{n}\sum x_i) \ge \frac{1}{n} \sum \ln x_i$。
由于 $f(x) = -\ln x$ 是凸函数（$f''(x) = 1/x^2 > 0$），由 Jensen 不等式：

$$

f\left( \frac{1}{n} \sum x_i \right) \le \frac{1}{n} \sum f(x_i)


$$

即：

$$

-\ln\left( \frac{1}{n} \sum x_i \right) \le -\frac{1}{n} \sum \ln x_i = -\ln \left( \prod x_i^{1/n} \right)


$$

取指数得：$\frac{1}{n} \sum x_i \ge \sqrt[n]{\prod x_i}$。证毕。

</details>

:::

:::info 例题 2：Hardy 不等式的特殊估计
设 $f \ge 0$ 且 $f \in L^p(0, \infty)$ ($p > 1$)，定义 $F(x) = \frac{1}{x} \int_0^x f(t) dt$。证明：
$\|F\|_p \le \frac{p}{p-1} \|f\|_p$。

<details>

<summary>点击查看解析</summary>

**证明要点**：
通过分部积分与 Hölder 不等式结合。
首先考虑 $\int_0^\infty F^p(x) dx$。
利用 $x F'(x) = f(x) - F(x)$，进行分部积分：

$$

\int F^p = [x F^p]_0^\infty - \int x \cdot p F^{p-1} F' dx = - \int p F^{p-1} (f - F) dx


$$

整理得：

$$

(1 - p) \int F^p = -p \int F^{p-1} f \implies \int F^p = \frac{p}{p-1} \int F^{p-1} f


$$

对右侧应用 Hölder 不等式（指数 $p, \frac{p}{p-1}$）：

$$

\int F^p \le \frac{p}{p-1} \left( \int f^p \right)^{1/p} \left( \int F^p \right)^{(p-1)/p}


$$

两边除以 $\left( \int F^p \right)^{(p-1)/p}$ 即得 $\|F\|_p \le \frac{p}{p-1} \|f\|_p$。

</details>

:::

---

## ✍️ 实战练习 (Exercises)

<SupportingExercises
topic="不等式专题"
exercises={[
{ index: 1, title: "基础不等式：$(a+b)(b+c)(c+a) \\ge 8abc$" },
{ index: 2, title: "Jensen 不等式加权 AM-GM 推导" },
{ index: 3, title: "Integral Minkowski 不等式证明" }
]}
/>

1. **[基础]** 证明：对于 $a, b, c > 0$，$(a+b)(b+c)(c+a) \ge 8abc$。
2. **[进阶]** 利用 Jensen 不等式证明：若 $\sum p_i = 1$，$p_i > 0$，则 $\prod x_i^{p_i} \le \sum p_i x_i$。
3. **[挑战]** 证明 Integral Minkowski Inequality：

$$ \left[ \int \left( \int f(x, y) dy \right)^p dx \right]^{1/p} \le \int \left( \int f(x, y)^p dx \right)^{1/p} dy $$

---

> **结语**：不等式不是死记硬背的公式，而是对函数形态（凸性、单调性）的深刻理解。掌握了 Hölder 与 Jensen，你就掌握了半个分析学。
