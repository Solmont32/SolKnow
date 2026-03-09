---
title: 非线性方程数值解：迭代与收敛
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";

# 非线性方程数值解：迭代与收敛

寻找方程 $f(x) = 0$ 的根是数值分析的基本问题。由于解析解往往难以获得，我们通常构造迭代序列 $\{x_k\}$，使其收敛于实根 $x^*$。

---

## 1. 二分法 (Bisection Method)

基于连续函数的**介值定理**。若 $f(a) \cdot f(b) < 0$，则在 $(a, b)$ 内至少存在一个根。

- **算法**：每次取中点 $c = (a+b)/2$，根据 $f(c)$ 的符号缩小区间。
- **评价**：收敛速度慢（线性收敛），但非常**稳健**，常用于为更高级的算法提供初始值。
- **误差估计**：第 $n$ 步后的区间长度为 $(b-a)/2^n$。

---

## 2. 不动点迭代 (Fixed-Point Iteration)

将 $f(x) = 0$ 改写为等价形式 $x = \phi(x)$。从 $x_0$ 出发，令 $x_{k+1} = \phi(x_k)$。

### 2.1 压缩映射原理
**定理**：若 $\phi(x)$ 在 $[a, b]$ 上满足：
1. $\phi(x) \in [a, b]$ 对于所有 $x \in [a, b]$；
2. $|\phi'(x)| \le L < 1$ （压缩常数）；
则迭代格式 $x_{k+1} = \phi(x_k)$ 对任意初始值 $x_0 \in [a, b]$ 均收敛。

### 2.2 收敛阶 (Order of Convergence)
若 $\phi'(x^*) = \phi''(x^*) = \dots = \phi^{(p-1)}(x^*) = 0$ 且 $\phi^{(p)}(x^*) \neq 0$，则该迭代法具有 **$p$ 阶收敛**。

---

## 3. Newton 迭代法 (Newton's Method)

Newton 法是利用 $f(x)$ 的一阶泰勒展开构造的迭代格式：
$$x_{k+1} = x_k - \frac{f(x_k)}{f'(x_k)}$$

### 3.1 几何意义
$x_{k+1}$ 是曲线 $y = f(x)$ 在点 $(x_k, f(x_k))$ 处切线与 $x$ 轴交点的横坐标。

### 3.2 局部平方收敛性
**定理**：若 $x^*$ 是 $f(x)=0$ 的**单根**（即 $f'(x^*) \neq 0$），且 $f''(x)$ 连续，则 Newton 法在 $x^*$ 附近是**平方收敛**的（$p=2$）。

<KnowledgeCard type="warning" title="重根陷阱">
若 $x^*$ 是 $m$ 重根（$m > 1$），Newton 法将退化为线性收敛。此时可采用改进格式：
$$x_{k+1} = x_k - m \frac{f(x_k)}{f'(x_k)}$$
以恢复平方收敛。
</KnowledgeCard>

---

## 4. 弦截法 (Secant Method)

Newton 法需要计算导数，这在某些情况下较为困难。弦截法利用前两步的斜率代替导数：
$$x_{k+1} = x_k - \frac{f(x_k)(x_k - x_{k-1})}{f(x_k) - f(x_{k-1})}$$
收敛阶为 $\frac{1+\sqrt{5}}{2} \approx 1.618$（超线性收敛）。

---

## ✍️ 典型例题

<details>
<summary>例 1：分析迭代格式 $x_{k+1} = \sqrt{x_k + 2}$ 求解 $x^2 - x - 2 = 0$ 正根的收敛性。</summary>

**解析：**
1. 该方程的正根为 $x^* = 2$。
2. 迭代函数 $\phi(x) = \sqrt{x+2}$。
3. 计算导数：$\phi'(x) = \frac{1}{2\sqrt{x+2}}$。
4. 在 $x^* = 2$ 处，$\phi'(2) = \frac{1}{2\sqrt{4}} = 1/4$。
5. 因为 $|\phi'(2)| < 1$，由压缩映射原理知，该迭代格式局部收敛，且为线性收敛。

</details>

<details>
<summary>例 2：利用 Newton 法求 $\sqrt{C}$ 的迭代格式。</summary>

设 $f(x) = x^2 - C = 0$。
$f'(x) = 2x$。
代入 Newton 公式：
$$x_{k+1} = x_k - \frac{x_k^2 - C}{2x_k} = \frac{1}{2} \left( x_k + \frac{C}{x_k} \right)$$
这就是著名的**巴比伦算法**，具有平方收敛特性。

</details>

---

## 🚀 专项训练

前往 **[数值分析专题练习库](/docs/exercises/math/numerical-analysis)** 挑战 Aitken 加速法与重根判别题目。
