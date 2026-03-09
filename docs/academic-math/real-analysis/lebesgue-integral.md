---
title: Lebesgue 积分：测度论视野下的现代积分理论 (Lebesgue Integral)
---

# Lebesgue 积分：测度论视野下的现代积分理论

> “黎曼积分是将函数定义域切碎，而勒贝格积分是将函数的值域切碎。” —— 亨利·勒贝格 (Henri Lebesgue)

## 1. 可测函数 (Measurable Functions)

在建立积分之前，必须确定哪些函数是可以被积分的。

### 1.1 定义
设 $f$ 是定义在可测集 $E$ 上的实值函数。若对于任意实数 $a$，集合
$$\{x \in E \mid f(x) > a\}$$
都是可测集，则称 $f$ 为 $E$ 上的 **Lebesgue 可测函数**。

### 1.2 性质
1. 若 $f, g$ 可测，则 $f \pm g, fg, |f|, \max(f, g), \min(f, g)$ 均可测。
2. 若可测函数序列 $\{f_n\}$ 处处收敛于 $f$，则 $f$ 亦可测。
3. **Egorov 定理**: 刻画了几乎处处收敛与一致收敛之间的关系。

## 2. Lebesgue 积分的构造

### 2.1 简单函数积分
若 $\phi(x) = \sum_{i=1}^n a_i \chi_{E_i}(x)$，则 $\int_E \phi dx = \sum a_i m(E_i)$。

### 2.2 非负可测函数积分
$$\int_E f dx = \sup \{ \int_E \phi dx \mid 0 \le \phi \le f, \phi \text{ 为简单函数} \}$$

### 2.3 一般可测函数积分
设 $f = f^+ - f^-$。若 $\int f^+ dx < \infty$ 且 $\int f^- dx < \infty$，则称 $f$ **可积**。
$$\int_E f dx = \int_E f^+ dx - \int_E f^- dx$$

## 3. 三大收敛定理 (Convergence Theorems)

### 3.1 单调收敛定理 (MCT)
设 $0 \le f_1 \le f_2 \le \dots$ 且 $f_n \to f$ a.e.，则 $\lim_{n \to \infty} \int f_n = \int f$。

### 3.2 Fatou 引理
设 $f_n \ge 0$，则 $\int \liminf f_n \le \liminf \int f_n$。

### 3.3 受控收敛定理 (DCT)
若 $|f_n| \le G$ 且 $G$ 可积，且 $f_n \to f$ a.e.，则 $\lim_{n \to \infty} \int f_n = \int f$。

## 4. 经典例题

:::info 例题 1 (Dirichlet 函数)
计算 $D(x) = \chi_{\mathbb{Q}}(x)$ 在 $[0, 1]$ 上的积分。
:::
<details>
<summary>查看解析</summary>

$D(x)$ 是简单函数。
$\int_0^1 D(x) dx = 1 \cdot m(\mathbb{Q} \cap [0, 1]) + 0 \cdot m(\mathbb{Q}^c \cap [0, 1])$
由于 $m(\mathbb{Q}) = 0$，故积分值为 $0$。
</details>

:::info 例题 2 (极限与积分交换)
计算 $\lim_{n \to \infty} \int_0^\infty \frac{n \sin(x/n)}{x(1+x^2)} dx$。
:::
<details>
<summary>查看解析</summary>

1. **逐点极限**: $\lim_{n \to \infty} \frac{n \sin(x/n)}{x} = 1$。故被积函数趋向于 $\frac{1}{1+x^2}$。
2. **控制函数**: 利用 $|\sin \theta| \le |\theta|$，有 $|\frac{n \sin(x/n)}{x(1+x^2)}| \le \frac{1}{1+x^2}$。
3. **应用 DCT**: $\int_0^\infty \frac{1}{1+x^2} dx = [\arctan x]_0^\infty = \pi/2$。
</details>

---

_本章节由 SolKnow 系统根据实变函数标准教材重写。_
