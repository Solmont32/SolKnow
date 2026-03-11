---
title: 第三章 函数极限：连续与突变的边界 (Limits of Functions)
description: 深入探讨函数极限的 ε-δ 定义、性质、判别准则及高阶计算技巧，对标华东师大第五版教材。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import EpsilonDeltaVisualizer from '@site/src/components/EpsilonDeltaVisualizer';
import { Code2, Target, Zap, Sigma, Layers, HelpCircle } from 'lucide-react';

# <Code2 className="inline-block mr-2 mb-1" /> 第三章 函数极限：连续与突变的边界

如果说数列极限研究的是离散点集的终极趋势，那么函数极限则将我们的视野拉宽到了整个实数连续统。它是研究函数连续性、导数以及积分的先决条件。本章将以严密的逻辑和极具挑战性的实战，带你彻底征服函数极限。

---

## <Target className="inline-block mr-2 mb-1" /> 一、 函数极限的严格理论框架

在分析学中，精确性优于直觉。我们需要将“趋近”这个动态过程转化为静态的不等式语言。

### 1. $\epsilon-\delta$ 定义（自变量趋于有限点）

设函数 $f(x)$ 在点 $x_0$ 的某个去心邻域 $\mathring{U}(x_0, \delta_0)$ 内有定义。如果存在常数 $A$，满足：
对于**任意**给定的实数 $\epsilon > 0$，都**总存在**一个实数 $\delta > 0$（满足 $0 < \delta < \delta_0$），使得当满足不等式：

$$0 < |x - x_0| < \delta$$

时，对应的函数值都满足不等式：

$$|f(x) - A| < \epsilon$$

则称常数 $A$ 为函数 $f(x)$ 当 $x \to x_0$ 时的极限，记作 $\lim_{x \to x_0} f(x) = A$ 或 $f(x) \to A \ (x \to x_0)$。

<EpsilonDeltaVisualizer />

### 2. 左极限与右极限 (One-sided Limits)

在某些情况下，函数从左侧趋近与从右侧趋近的结果不同（如跳跃间断点）。

- **右极限**：$\lim_{x \to x_0^+} f(x) = A \iff \forall \epsilon > 0, \exists \delta > 0, \text{ s.t. } x \in (x_0, x_0 + \delta) \implies |f(x) - A| < \epsilon$。
- **左极限**：$\lim_{x \to x_0^-} f(x) = A \iff \forall \epsilon > 0, \exists \delta > 0, \text{ s.t. } x \in (x_0 - \delta, x_0) \implies |f(x) - A| < \epsilon$。

**定理 (充要条件)**：$\lim_{x \to x_0} f(x) = A$ 的充要条件是 $f(x_0^+) = f(x_0^-) = A$。

### 3. 自变量趋于无穷时的极限

- **$x \to \infty$**：
  $\lim_{x \to \infty} f(x) = A \iff \forall \epsilon > 0, \exists X > 0, \text{ s.t. } |x| > X \implies |f(x) - A| < \epsilon$。
- **$x \to +\infty$**：
  $\lim_{x \to +\infty} f(x) = A \iff \forall \epsilon > 0, \exists X > 0, \text{ s.t. } x > X \implies |f(x) - A| < \epsilon$。

---

## <Layers className="inline-block mr-2 mb-1" /> 二、 函数极限的性质 (Basic Properties)

理解极限的内在性质，是进行复杂证明和计算的基石。

### 1. 唯一性 (Uniqueness)

若 $\lim_{x \to x_0} f(x)$ 存在，则该极限是唯一的。

### 2. 局部有界性 (Local Boundedness)

若 $\lim_{x \to x_0} f(x) = A$，则存在 $x_0$ 的某个去心邻域 $\mathring{U}(x_0, \delta)$，使得 $f(x)$ 在该邻域内有界。

### 3. 局部保号性 (Local Sign-Preserving Property)

若 $\lim_{x \to x_0} f(x) = A > 0$（或 $< 0$），则对于任何满足 $0 < r < A$ 的正数 $r$，存在 $\mathring{U}(x_0, \delta)$，使得对于该邻域内的一切 $x$，恒有 $f(x) > r > 0$（或 $f(x) < -r < 0$）。

- **推论**：若在 $x_0$ 的去心邻域内 $f(x) \ge 0$ 且极限存在，则 $\lim_{x \to x_0} f(x) \ge 0$。

### 4. 有理运算法则

设 $\lim f(x) = A, \lim g(x) = B$，则：

- $\lim [f(x) \pm g(x)] = A \pm B$
- $\lim [f(x) \cdot g(x)] = A \cdot B$
- $\lim \frac{f(x)}{g(x)} = \frac{A}{B}$ （前提 $B \neq 0$）

<KnowledgeCard type="warning" title="常见陷阱：复合函数极限">
若 $\lim_{x \to x_0} g(x) = u_0$ 且 $\lim_{u \to u_0} f(u) = A$，**不能直接推导**出 $\lim_{x \to x_0} f(g(x)) = A$。
**必须满足以下条件之一**：
1. $f(u)$ 在 $u_0$ 处连续（即 $f(u_0) = A$）。
2. 在 $x_0$ 的某个去心邻域内，$g(x) \neq u_0$。
*典型反例：$g(x) = x \sin(1/x)$，$f(u) = 0 (u \neq 0)$ 且 $f(0) = 1$。当 $x \to 0$ 时，$g(x) \to 0$，但 $g(x)$ 无限次取到 $0$，导致 $f(g(x))$ 在 $0$ 和 $1$ 之间跳动。*
</KnowledgeCard>

---

## <Sigma className="inline-block mr-2 mb-1" /> 三、 极限存在的深度判别准则

### 1. 海涅定理 (Heine's Theorem) - 归结原则

**定理内容**：$\lim_{x \to x_0} f(x) = A$ 的充要条件是：对于任何以 $x_0$ 为极限的数列 $\{x_n\} \subset \mathring{D}(f)$ ($x_n \neq x_0$)，都有 $\lim_{n \to \infty} f(x_n) = A$。

- **意义**：它在**离散（数列）**与**连续（函数）**之间架起了一座桥梁。
- **应用场景**：证明极限不存在的最佳武器。只要能找到两个趋于 $x_0$ 的数列 $\{x_n\}$ 和 $\{y_n\}$，使得 $\{f(x_n)\}$ 和 $\{f(y_n)\}$ 趋于不同的极限，或者其中一个不收敛，则原函数极限不存在。

### 2. 柯西收敛准则 (Cauchy Criterion)

**定理内容**：$\lim_{x \to x_0} f(x)$ 存在的充要条件是：$\forall \epsilon > 0, \exists \delta > 0$，使得当 $x_1, x_2 \in \mathring{U}(x_0, \delta)$ 时，恒有：
$$|f(x_1) - f(x_2)| < \epsilon$$

- **优势**：无需预先知道极限值 $A$，只需考察函数值的内部“聚集”程度。这在理论证明（如证明极限存在性）中至关重要。

---

## <Zap className="inline-block mr-2 mb-1" /> 四、 极限计算的高阶武器库

### 1. 无穷小的阶与等价替换

当 $x \to x_0$ 时，若 $f(x) \to 0$，称其为无穷小量。

- **高阶无穷小**：$f(x) = o(g(x))$，即 $\lim \frac{f(x)}{g(x)} = 0$。
- **同阶无穷小**：$\lim \frac{f(x)}{g(x)} = C \neq 0$。若 $C=1$，则称**等价无穷小**，记作 $f(x) \sim g(x)$。

<KnowledgeCard type="info" title="常用等价替换 ($x \to 0$)">
- $\sin x \sim x, \tan x \sim x, \arcsin x \sim x, \arctan x \sim x$
- $\ln(1+x) \sim x, e^x - 1 \sim x, a^x - 1 \sim x \ln a$
- $1 - \cos x \sim \frac{1}{2}x^2$
- $(1+x)^\alpha - 1 \sim \alpha x$
- $x - \sin x \sim \frac{1}{6}x^3, \tan x - x \sim \frac{1}{3}x^3$
</KnowledgeCard>

### 2. 泰勒公式 (Taylor's Formula)

对于复杂的未定式（如 $\frac{0}{0}, \frac{\infty}{\infty}$），泰勒展开是最彻底的解决方案。
**法则**：将分子分母同时展开到能抵消出非零常数项的最细阶数。

---

## <HelpCircle className="inline-block mr-2 mb-1" /> 五、 深度例题精讲 (Textbook Examples)

### 练习 1：$\epsilon-\delta$ 语言的严密证明

证明 $\lim_{x \to 3} \frac{1}{x} = \frac{1}{3}$。

<details>
<summary>点击查看解析</summary>

**分析**：我们需要控制 $|\frac{1}{x} - \frac{1}{3}| = \frac{|x-3|}{3|x|} < \epsilon$。
为了控制分母中的 $|x|$，我们限制 $x$ 在 $3$ 的一个小邻域内。取 $\delta_1 = 1$，则当 $|x-3| < 1$ 时，$2 < x < 4$，从而 $|x| > 2$。
此时，$\frac{|x-3|}{3|x|} < \frac{|x-3|}{3 \cdot 2} = \frac{|x-3|}{6}$。
我们要使 $\frac{|x-3|}{6} < \epsilon$，只需 $|x-3| < 6\epsilon$。

**证明**：
对于任意 $\epsilon > 0$，取 $\delta = \min(1, 6\epsilon)$。
当 $0 < |x - 3| < \delta$ 时，有：

1. $|x-3| < 1 \implies x > 2 \implies \frac{1}{|x|} < \frac{1}{2}$。
2. $|x-3| < 6\epsilon$。
则 $|\frac{1}{x} - \frac{1}{3}| = \frac{|x-3|}{3|x|} < \frac{6\epsilon}{3 \cdot 2} = \epsilon$。
证毕。
</details>

### 练习 2：海涅定理处理震荡极限

证明 $\lim_{x \to 0} \sin \frac{1}{x}$ 不存在。

<details>
<summary>点击查看解析</summary>

**证明**：
考虑数列 $x_n = \frac{1}{2n\pi + \pi/2}$ 和 $y_n = \frac{1}{n\pi}$ ($n=1,2,\dots$)。
当 $n \to \infty$ 时，$x_n \to 0$ 且 $y_n \to 0$。
计算对应的函数值序列：

- $f(x_n) = \sin(2n\pi + \pi/2) = 1 \to 1$。
- $f(y_n) = \sin(n\pi) = 0 \to 0$。
由于趋于同一点 $0$ 的两个不同数列产生的函数极限值不相等，由海涅定理知 $\lim_{x \to 0} \sin \frac{1}{x}$ 不存在。
</details>

### 练习 3：$1^\infty$ 型未定式的通用公式

求 $\lim_{x \to 0} (\cos x)^{1/x^2}$。

<details>
<summary>点击查看解析</summary>

**方法一：利用 $e$ 指数恒等式**
原式 $= \lim_{x \to 0} e^{\frac{1}{x^2} \ln(\cos x)}$。
考察指数部分：$\lim_{x \to 0} \frac{\ln(\cos x)}{x^2}$。
利用等价无穷小 $\ln(1+u) \sim u$ 和 $1-\cos x \sim \frac{1}{2}x^2$：
$\ln(\cos x) = \ln(1 + (\cos x - 1)) \sim \cos x - 1 \sim -\frac{1}{2}x^2$。
故指数部分 $\to \lim_{x \to 0} \frac{-\frac{1}{2}x^2}{x^2} = -\frac{1}{2}$。
结果为 $e^{-1/2} = \frac{1}{\sqrt{e}}$。

**方法二：通用简化公式**
若 $\lim f(x) = 1$ 且 $\lim g(x) = \infty$，则 $\lim f(x)^{g(x)} = e^{\lim (f(x)-1)g(x)}$。
本题中：$\lim_{x \to 0} (\cos x - 1) \cdot \frac{1}{x^2} = \lim_{x \to 0} \frac{-\frac{1}{2}x^2}{x^2} = -\frac{1}{2}$。
故极限为 $e^{-1/2}$。

</details>

### 练习 4：高阶 Taylor 展开的精确控制

求 $\lim_{x \to 0} \frac{\sqrt{1+x^2} - \cos x}{x^2 \ln(1+x^2)}$。

<details>
<summary>点击查看解析</summary>

**分析**：分母 $x^2 \ln(1+x^2) \sim x^2 \cdot x^2 = x^4$。因此分子需要展开到 $x^4$ 项。
$\sqrt{1+x^2} = 1 + \frac{1}{2}x^2 - \frac{1}{8}x^4 + o(x^4)$
$\cos x = 1 - \frac{1}{2}x^2 + \frac{1}{24}x^4 + o(x^4)$
分子 $= (1 + \frac{1}{2}x^2 - \frac{1}{8}x^4) - (1 - \frac{1}{2}x^2 + \frac{1}{24}x^4) + o(x^4)$
$= x^2 - (\frac{3}{24} + \frac{1}{24})x^4 + o(x^4) = x^2 - \frac{1}{6}x^4 + o(x^4)$
**纠正**：由于主项是 $x^2$，分子分母约去 $x^2$。
原式 $= \lim_{x \to 0} \frac{x^2 - \frac{1}{6}x^4}{x^4} = \lim_{x \to 0} \frac{1 - \frac{1}{6}x^2}{x^2} = \infty$。
_注意：本题中分子主项是 $x^2$，而分母是 $x^4$，故极限为无穷大。_
若分母改为 $x^2$, 则极限为 $1$。

</details>

---

## <Sigma className="inline-block mr-2 mb-1" /> 六、 计算机科学链接：渐近复杂度 (CS Link)

在算法分析中，我们经常使用 **大 O 符号 (Big-O)** 来描述算法的复杂度。这本质上是函数极限的应用：

- **$f(n) = O(g(n))$**：意味着当 $n \to \infty$ 时，$\frac{f(n)}{g(n)}$ 有界。这对应于极限的**局部有界性**。
- **$f(n) = o(g(n))$**：意味着 $\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$。即 $f$ 是 $g$ 的**高阶无穷小**。
- **$f(n) = \Theta(g(n))$**：意味着 $\lim_{n \to \infty} \frac{f(n)}{g(n)} = C \in (0, \infty)$。即 $f$ 与 $g$ 是**同阶无穷大**。

**工业感悟**：在高性能计算中，理解 $\log n \ll n \ll n \log n \ll n^2$ 的极限级数，是优化系统的理论基础。

---

## 七、 练习库同步 (Analysis Exercise Sync)

1. [**练习 4：函数极限基础计算**](../../exercises/math/analysis-foundations.md#练习-4基础-函数极限)
2. [**练习 8：夹逼与路径思想**](../../exercises/math/analysis-foundations.md#练习-8挑战-夹逼与路径思想)

---

_编者注：本章奠定了微积分的逻辑基石。掌握 $\epsilon-\delta$ 语言不仅是为了应付考试，更是为了培养一种能够处理复杂逻辑嵌套的严密思维模式。_
