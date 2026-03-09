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

单调收敛定理是 Lebesgue 积分理论的基石，它允许在非常宽泛的条件下交换极限与积分号。

**定理 (MCT):**
设 $E$ 是可测集，$\{f_n\}$ 是 $E$ 上的非负可测函数序列，满足：
1. $0 \le f_1(x) \le f_2(x) \le \dots$ (a.e. $x \in E$);
2. $\lim_{n \to \infty} f_n(x) = f(x)$ (a.e. $x \in E$).
则 $f$ 是可测的，且：
$$ \lim_{n \to \infty} \int_E f_n dx = \int_E f dx. $$

<details>
<summary>点击查看 MCT 证明</summary>

**证明思路:**
由于 $f_n \le f_{n+1} \le f$，积分具有单调性，故 $\int f_n \le \int f_{n+1} \le \int f$。
令 $L = \lim_{n \to \infty} \int f_n$，显然 $L \le \int f$。我们需要证明反向不等式 $\int f \le L$。

设 $\phi$ 是满足 $0 \le \phi \le f$ 的简单函数，取 $\alpha \in (0, 1)$。
定义集合 $E_n = \{x \in E \mid f_n(x) \ge \alpha \phi(x)\}$。
因为 $f_n \uparrow f$，对固定的 $x$，当 $n$ 足够大时 $f_n(x) \ge \alpha \phi(x)$，故 $E_n \uparrow E$。
利用测度连续性：
$$ \int_E f_n dx \ge \int_{E_n} f_n dx \ge \alpha \int_{E_n} \phi dx. $$
令 $n \to \infty$，由测度连续性知 $\int_{E_n} \phi \to \int_E \phi$。
得到 $L \ge \alpha \int_E \phi$。
令 $\alpha \to 1$，得 $L \ge \int_E \phi$。
由于对所有满足 $0 \le \phi \le f$ 的简单函数均成立，根据 Lebesgue 积分定义，取上确界得：
$$ L \ge \int_E f dx. $$
结合两端，定理得证。$\square$
</details>

### 3.2 Fatou 引理

设 $f_n \ge 0$ 是可测函数序列，则
$$ \int_E \liminf_{n \to \infty} f_n dx \le \liminf_{n \to \infty} \int_E f_n dx. $$

<KnowledgeCard type="tip" title="Fatou 引理的直观理解">
由于积分具有平滑作用，取下极限后再积分，其值不会超过先积分再取下极限。它是 MCT 的直接推论。
</KnowledgeCard>

### 3.3 受控收敛定理 (DCT)

若可测函数序列 $\{f_n\}$ 满足 $f_n \to f$ (a.e.)，且存在可积函数 $G$ 使得 $|f_n| \le G$ (a.e.)，则
$$ \lim_{n \to \infty} \int_E f_n dx = \int_E f dx. $$

---

## 4. 经典例题

:::info 例题 1 (Dirichlet 函数)
计算 $D(x) = \chi_{\mathbb{Q}}(x)$ 在 $[0, 1]$ 上的积分。
:::
<details>
<summary>Check Solution</summary>

$D(x)$ 是简单函数。
$\int_0^1 D(x) dx = 1 \cdot m(\mathbb{Q} \cap [0, 1]) + 0 \cdot m(\mathbb{Q}^c \cap [0, 1])$
由于 $m(\mathbb{Q}) = 0$，故积分值为 $0$。
</details>

:::info 例题 2 (极限与积分交换)
计算 $\lim_{n \to \infty} \int_0^\infty \frac{n \sin(x/n)}{x(1+x^2)} dx$。
:::
<details>
<summary>Check Solution</summary>

1. **逐点极限**: $\lim_{n \to \infty} \frac{n \sin(x/n)}{x} = 1$。故被积函数趋向于 $\frac{1}{1+x^2}$。
2. **控制函数**: 利用 $|\sin \theta| \le |\theta|$，有 $|\frac{n \sin(x/n)}{x(1+x^2)}| \le \frac{x/n \cdot n}{x(1+x^2)} = \frac{1}{1+x^2}$。
3. **应用 DCT**: $\int_0^\infty \frac{1}{1+x^2} dx = [\arctan x]_0^\infty = \pi/2$。
</details>

:::info 例题 3 (MCT 的应用)
设 $f \ge 0$ 可积，证明 $m(\{x \in E \mid f(x) = \infty\}) = 0$。
:::
<details>
<summary>Check Solution</summary>

令 $E_\infty = \{x \in E \mid f(x) = \infty\}$。
若 $m(E_\infty) > 0$，则对 $\forall n \in \mathbb{N}$，有 $f(x) \ge n \chi_{E_\infty}(x)$。
积分得 $\int_E f dx \ge n \cdot m(E_\infty)$。
令 $n \to \infty$，则 $\int_E f dx = \infty$，与 $f$ 可积矛盾。
故 $m(E_\infty) = 0$。$\square$
</details>

---

## 5. 深度练习

### 练习 1
证明 Lebesgue 积分的绝对连续性：若 $f$ 在 $E$ 上可积，则对 $\forall \varepsilon > 0$，存在 $\delta > 0$，使得对任意满足 $m(A) < \delta$ 的可测子集 $A \subset E$，有 $\int_A |f| dx < \varepsilon$。

<details>
<summary>Check Solution</summary>

利用截断函数 $f_n = |f| \chi_{\{|f| \le n\}}$。
由 MCT 或 DCT 知 $\int_E f_n \to \int_E |f|$，即 $\int_E (|f| - f_n) \to 0$。
取 $N$ 足够大使得 $\int_E (|f| - f_N) < \varepsilon / 2$。
令 $\delta = \frac{\varepsilon}{2N}$。当 $m(A) < \delta$ 时：
$$ \int_A |f| dx = \int_A (|f| - f_N) dx + \int_A f_N dx \le \int_E (|f| - f_N) dx + N \cdot m(A) < \frac{\varepsilon}{2} + N \cdot \frac{\varepsilon}{2N} = \varepsilon. $$
结论得证。
</details>

### 练习 2
设 $\{f_n\}$ 是非负可测函数序列且 $f_n \downarrow f$ a.e.。若 $\int f_1 < \infty$，证明 $\int f_n \to \int f$。并举反例说明 $\int f_1 < \infty$ 条件是必要的。

<details>
<summary>Check Solution</summary>

**证明:** 考虑 $g_n = f_1 - f_n$。则 $g_n \ge 0$ 且 $g_n \uparrow (f_1 - f)$。
由 MCT：$\int (f_1 - f_n) \to \int (f_1 - f)$。
由于 $\int f_1 < \infty$，利用线性性：$\int f_1 - \int f_n \to \int f_1 - \int f$。
消去 $\int f_1$ 得 $\int f_n \to \int f$。

**反例:** 在 $\mathbb{R}$ 上令 $f_n = \chi_{[n, \infty)}$。
则 $f_n \downarrow 0$，但 $\int f_n = \infty \not\to 0$。
这里 $\int f_1 = \infty$，故结论不成立。
</details>

---

_本章节由 SolKnow 系统根据实变函数标准教材重写。_
