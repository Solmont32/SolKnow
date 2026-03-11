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

---

## 4. 三次样条插值 (Cubic Spline Interpolation)

为解决高次插值的 Runge 现象，样条插值采用**分段低次多项式**，并在节点处保证函数值及各阶导数的连续性。

### 4.1 定义

设在 $[a, b]$ 上给定节点 $a = x_0 < x_1 < \dots < x_n = b$，函数 $S(x)$ 称为 $f(x)$ 关于该划分的**三次样条插值函数**，如果：

1. 在每个子区间 $[x_{i-1}, x_i]$ 上，$S(x)$ 是一个不高于 3 次的多项式；
2. $S(x_i) = f(x_i)$ （插值条件）；
3. $S(x)$ 在整个区间 $[a, b]$ 上二阶连续可微，即 $S(x) \in C^2[a, b]$。

### 4.2 三弯矩方程 (Three-Moment Equation)

设 $M_i = S''(x_i)$ 为第 $i$ 个节点处的二阶导数。由连续性条件可推导得关于 $M_i$ 的三对角方程组：
$$\mu_i M_{i-1} + 2M_i + \lambda_i M_{i+1} = d_i, \quad i = 1, 2, \dots, n-1$$
其中系数由步长 $h_i = x_i - x_{i-1}$ 及差商决定。求解该方程组（通常使用 **Thomas 算法**）即可确定整个样条函数。

### 4.3 边界条件

为了封闭方程组，需要额外的边界条件：

- **自然边界条件 (Natural Spline)**：$S''(a) = S''(b) = 0$。
- **固支边界条件 (Clamped Spline)**：已知 $S'(a) = f'(a), S'(b) = f'(b)$。
- **周期边界条件**：$S^{(k)}(a) = S^{(k)}(b), k=0, 1, 2$。

### 4.4 收敛性与误差估计

**定理**：若 $f \in C^4[a, b]$，且 $h = \max h_i$，则三次样条插值满足：
$$\|f - S\|_\infty \le C h^4 \|f^{(4)}\|_\infty$$
这意味着样条插值具有 **$O(h^4)$** 的收敛阶，远优于分段线性插值的 $O(h^2)$，且不会发生剧烈震荡。

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
<summary>例 2：计算三次样条插值的维度。</summary>

对于 $n+1$ 个节点，有 $n$ 个子区间。每个子区间对应一个 3 次多项式，共有 $4n$ 个待定参数。
约束条件：

- 插值条件：每个区间两端点，$2n$ 个。
- 一阶导数连续：$n-1$ 个内部节点，$n-1$ 个。
- 二阶导数连续：$n-1$ 个内部节点，$n-1$ 个。
  总约束数：$2n + (n-1) + (n-1) = 4n - 2$。
  自由度：$4n - (4n-2) = 2$。因此需要 2 个边界条件来唯一确定。

</details>

---

## 🚀 专项训练

前往 **[数值分析专题练习库](/docs/exercises/math/numerical-analysis)** 挑战更高难度的误差估计、Hermite 插值与样条弯矩方程计算题目。
