---
title: 数值积分：Newton-Cotes 公式与复化求积
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";

# 数值积分：Newton-Cotes 公式与复化求积

对于许多复杂的函数 $f(x)$，其原函数无法用初等函数表示，或者 $f(x)$ 仅以离散点形式给出。此时，必须利用数值方法来近似计算定积分 $I = \int_a^b f(x) dx$。

---

## 1. Newton-Cotes 公式

Newton-Cotes 公式的基本思想是：在 $[a, b]$ 上取 $n+1$ 个等距节点 $x_i = a + ih, h = \frac{b-a}{n}$，用 $n$ 次 Lagrange 插值多项式 $L_n(x)$ 代替 $f(x)$：
$$I \approx \int_a^b L_n(x) dx = \sum_{i=0}^n y_i \int_a^b l_i(x) dx$$

### 1.1 Cotes 系数
定义 Cotes 系数 $C_i^{(n)} = \frac{1}{b-a} \int_a^b l_i(x) dx$，则求积公式可写为：
$$I \approx (b-a) \sum_{i=0}^n C_i^{(n)} f(x_i)$$

### 1.2 常用低阶公式
- **梯形公式 (n=1)**：
  $$\int_a^b f(x) dx \approx \frac{b-a}{2} [f(a) + f(b)]$$
  代数精度：1
- **Simpson 公式 (n=2)**：
  $$\int_a^b f(x) dx \approx \frac{b-a}{6} \left[ f(a) + 4f\left(\frac{a+b}{2}\right) + f(b) \right]$$
  代数精度：**3**（即使是 2 次插值，对于 3 次多项式也精确）

---

## 2. 复化求积法 (Composite Rules)

高阶 Newton-Cotes 公式在 $n \ge 8$ 时会出现系数为负值的情况，导致数值不稳定。实际应用中，常将 $[a, b]$ 分成 $m$ 个小区间，在每个小区间上使用低阶公式。

### 2.1 复化梯形公式
将区间 $m$ 等分，步长 $h = \frac{b-a}{m}$：
$$T_m = \frac{h}{2} \left[ f(a) + 2\sum_{i=1}^{m-1} f(x_i) + f(b) \right]$$
误差：$R = -\frac{b-a}{12} h^2 f''(\xi)$

### 2.2 复化 Simpson 公式
要求区间数为偶数（即有 $m=2k$ 个子区间）：
$$S_m = \frac{h}{3} \left[ f(a) + 4\sum_{i=1,3,\dots,m-1} f(x_i) + 2\sum_{i=2,4,\dots,m-2} f(x_i) + f(b) \right]$$
误差：$R = -\frac{b-a}{180} h^4 f^{(4)}(\xi)$

---

## 3. 代数精度 (Algebraic Precision)

**定义**：如果一个求积公式对于所有次数不超过 $k$ 的多项式都精确，但对于 $k+1$ 次多项式不精确，则称其具有 $k$ 次代数精度。

<KnowledgeCard type="info" title="性质">
$n$ 阶 Newton-Cotes 公式在 $n$ 为偶数时具有 $n+1$ 次代数精度；在 $n$ 为奇数时具有 $n$ 次代数精度。
</KnowledgeCard>

---

## 4. Richardson 外推法 (Richardson Extrapolation)

Richardson 外推是一种通过已知低阶公式的组合来构造高阶公式的通用技术。

假设 $A(h)$ 是对某个量 $L$ 的近似（步长为 $h$），且具有误差展开式：
$$L - A(h) = c_1 h^2 + c_2 h^4 + c_3 h^6 + \dots$$
则利用步长 $h$ 和 $h/2$ 的结果，可以消去 $h^2$ 项：
$$A_1(h) = \frac{4 A(h/2) - A(h)}{3} = A(h/2) + \frac{A(h/2) - A(h)}{3}$$
此时 $A_1(h)$ 的误差项为 $O(h^4)$。

---

## 5. Romberg 算法

Romberg 算法是将 Richardson 外推应用于复化梯形公式的产物。

### 5.1 递推关系
设 $T_0^{(k)}$ 为步长 $h_k = \frac{b-a}{2^k}$ 的复化梯形值。Romberg 序列定义为：
$$T_m^{(k)} = \frac{4^m T_{m-1}^{(k+1)} - T_{m-1}^{(k)}}{4^m - 1}$$
其中：
- $m=1$ 对应复化 Simpson 序列；
- $m=2$ 对应复化 Cotes 序列；
- $m=3$ 对应 Romberg 序列。

### 5.2 Romberg 表 (T-Table)
计算过程通常排列成下表：
$$
\begin{matrix}
T_0^{(0)} & & & \\
T_0^{(1)} & T_1^{(0)} & & \\
T_0^{(2)} & T_1^{(1)} & T_2^{(0)} & \\
T_0^{(3)} & T_1^{(2)} & T_2^{(1)} & T_3^{(0)}
\end{matrix}
$$
每一列的收敛速度都比前一列快。

### 5.3 算法特点
1. **自动控制精度**：通过比较 $T_m^{(k)}$ 与 $T_{m-1}^{(k)}$ 的差值来决定是否停止迭代。
2. **计算量小**：利用了二分步长时函数值的承袭性（计算 $T_0^{(k+1)}$ 只需计算新增加的中点值）。

---

## ✍️ 典型例题

<details>
<summary>例 1：利用 Romberg 算法计算 $\int_0^1 \frac{\sin x}{x} dx$（精度要求 $10^{-5}$）。</summary>

**解析提示：**
1. 定义 $f(0)=1$ 以消除奇点。
2. 计算 $T_0^{(0)} = \frac{1-0}{2}[f(0) + f(1)] = 0.5[1 + 0.84147] = 0.92074$。
3. 计算 $T_0^{(1)}$：在 0.5 处采样，结合 $T_0^{(0)}$ 计算复化梯形值。
4. 利用外推公式计算 $T_1^{(0)}, T_2^{(0)} \dots$ 直至相邻项差值满足要求。
(详细数值计算略，Romberg 算法通常在 3-4 次外推后即可达到极高精度)。

</details>

<details>
<summary>例 2：证明复化梯形公式的误差具有 $h^2, h^4 \dots$ 的偶次方展开项。</summary>

这是由 **Euler-Maclaurin 求和公式** 保证的：
$$\int_a^b f(x)dx - T_h = \sum_{k=1}^\infty \frac{B_{2k}}{(2k)!} h^{2k} [f^{(2k-1)}(b) - f^{(2k-1)}(a)]$$
其中 $B_{2k}$ 是 Bernoulli 数。这一展开式是 Romberg 算法能够成功进行 Richardson 外推的理论基础。

</details>

---

## 🚀 专项训练

前往 **[数值分析专题练习库](/docs/exercises/math/numerical-analysis)** 深入研究 Gauss 求积公式与 Romberg 收敛阶分析。