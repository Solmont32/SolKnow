---
title: 多项式插值：Lagrange 与 Newton 公式
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";

import SupportingExercises from '@site/src/components/SupportingExercises';

# 多项式插值：Lagrange 与 Newton 公式

插值问题的核心在于：给定 $n+1$ 个互异节点 $x_0, x_1, \dots, x_n$ 及其对应的函数值 $y_0, y_1, \dots, y_n$，寻找一个次数不超过 $n$ 的多项式 $P_n(x)$，使得：
$$P_n(x_i) = y_i, \quad i = 0, 1, \dots, n.$$

---

## 1. Lagrange 插值多项式

Lagrange 插值的思想是将 $P_n(x)$ 表示为基函数的线性组合。

### 1.1 基函数定义
定义 **Lagrange 插值基函数** $l_i(x)$ 为一个 $n$ 次多项式，满足：
$$l_i(x_j) = \delta_{ij} = \begin{cases} 1, & i=j \\ 0, & i \neq j \end{cases}$$
构造可得：
$$l_i(x) = \prod_{j=0, j \neq i}^n \frac{x - x_j}{x_i - x_j}$$

### 1.2 插值多项式
$$L_n(x) = \sum_{i=0}^n y_i l_i(x)$$

### 1.3 误差估计 (余项定理)
**定理**：若 $f(x)$ 在包含节点 $[a, b]$ 的区间内有 $n+1$ 阶连续导数，则对于任意 $x \in [a, b]$，存在 $\xi \in (a, b)$ 使得：
$$R_n(x) = f(x) - L_n(x) = \frac{f^{(n+1)}(\xi)}{(n+1)!} \omega_{n+1}(x)$$
其中 $\omega_{n+1}(x) = \prod_{i=0}^n (x - x_i)$。

---

## 2. Newton 插值多项式

Lagrange 插值的缺点在于：增加新节点时，所有基函数均需重新计算。Newton 插值通过**差商 (Divided Differences)** 解决了这一问题。

### 2.1 差商定义
- **零阶差商**：$f[x_i] = f(x_i)$
- **一阶差商**：$f[x_i, x_j] = \frac{f[x_j] - f[x_i]}{x_j - x_i}$
- **k 阶差商**：$f[x_0, x_1, \dots, x_k] = \frac{f[x_1, \dots, x_k] - f[x_0, \dots, x_{k-1}]}{x_k - x_0}$

### 2.2 Newton 插值公式
$$N_n(x) = f[x_0] + f[x_0, x_1](x - x_0) + \dots + f[x_0, \dots, x_n] \prod_{i=0}^{n-1} (x - x_i)$$

<KnowledgeCard type="info" title="承袭性">
Newton 插值具有很好的**承袭性**。若增加一个节点 $x_{n+1}$，只需在原有的 $N_n(x)$ 基础上增加一项即可：
$$N_{n+1}(x) = N_n(x) + f[x_0, \dots, x_{n+1}] \omega_{n+1}(x)$$
</KnowledgeCard>

---

## 3. Runge 现象与高次插值的陷阱

在等距节点下增加插值阶数，并不一定能提高逼近精度。

<KnowledgeCard type="warning" title="Runge 现象">
对于函数 $f(x) = \frac{1}{1 + 25x^2}$ 在 $[-1, 1]$ 上进行等距插值，当 $n \to \infty$ 时，在区间边缘处插值多项式会出现剧烈的震荡。这启示我们：**高次多项式插值并不总是可靠的**，实际应用中常采用分段低次插值（如三次样条插值）。
</KnowledgeCard>

---

## ✍️ 典型例题

<details>
<summary>例 1：已知三个节点 (0, 1), (1, 2), (2, 5)，构造 Lagrange 插值多项式并求 L(0.5)。</summary>

**解析：**
1. 构造基函数：
   - $l_0(x) = \frac{(x-1)(x-2)}{(0-1)(0-2)} = \frac{1}{2}(x^2 - 3x + 2)$
   - $l_1(x) = \frac{(x-0)(x-2)}{(1-0)(1-2)} = - (x^2 - 2x)$
   - $l_2(x) = \frac{(x-0)(x-1)}{(2-0)(2-1)} = \frac{1}{2}(x^2 - x)$
2. 组合多项式：
   $L_2(x) = 1 \cdot l_0(x) + 2 \cdot l_1(x) + 5 \cdot l_2(x) = x^2 + 1$
3. 计算：
   $L_2(0.5) = 0.5^2 + 1 = 1.25$

</details>

<details>
<summary>例 2：利用差商表构造 Newton 插值多项式。</summary>

假设节点为 $x_0=0, x_1=1, x_2=2$，函数值为 $f(0)=1, f(1)=2, f(2)=5$。
1. 零阶差商：$f[0]=1, f[1]=2, f[2]=5$
2. 一阶差商：$f[0, 1] = \frac{2-1}{1-0}=1, f[1, 2] = \frac{5-2}{2-1}=3$
3. 二阶差商：$f[0, 1, 2] = \frac{3-1}{2-0}=1$
Newton 公式：
$N_2(x) = 1 + 1(x-0) + 1(x-0)(x-1) = 1 + x + x^2 - x = x^2 + 1$

</details>

---

## 🚀 专项训练

前往 **[数值分析专题练习库](/docs/exercises/math/numerical-analysis)** 挑战更高难度的误差估计与 Hermite 插值题目。