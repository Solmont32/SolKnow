---
title: 函数极限：连续与突变的边界 (Limits of Functions)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import EpsilonDeltaVisualizer from '@site/src/components/EpsilonDeltaVisualizer';

# 函数极限：连续与突变的边界

如果说数列极限研究的是离散点集的终极趋势，那么函数极限则将我们的视野拉宽到了整个实数连续统。它是研究函数连续性、导数以及积分的先决条件。本章将以严密的逻辑和极具挑战性的实战，带你彻底征服函数极限。

## 一、 函数极限的严格定义论

在高中阶段，我们习惯用“当 $x$ 无限接近 $x_0$ 时，$f(x)$ 无限接近 $A$”来描述极限。但在高等数学中，这种描述过于模糊。我们需要 $\epsilon-\delta$ 语言来将其量化。

### 1. $\epsilon-\delta$ 定义（自变量趋于有限点）
设函数 $f(x)$ 在点 $x_0$ 的某个去心邻域 $\mathring{U}(x_0, \delta_0)$ 内有定义。如果存在常数 $A$，满足：
对于**任意**给定的实数 $\epsilon > 0$，都**总存在**一个实数 $\delta > 0$（通常 $\delta \le \delta_0$），使得当满足不等式：
$$0 < |x - x_0| < \delta$$
时，对应的函数值都满足不等式：
$$|f(x) - A| < \epsilon$$
则称常数 $A$ 为函数 $f(x)$ 当 $x \to x_0$ 时的极限，记作 $\lim_{x \to x_0} f(x) = A$。

<EpsilonDeltaVisualizer />

**哲学剖析**：
- **“去心”**（$0 < |x - x_0|$）：极限考量的是函数在 $x_0$ **周围**的行为，与 $f(x_0)$ 在该点本身是否有定义、定义为何值**毫无关系**。这正是极限能够处理 $\frac{0}{0}$ 型未定式的根本原因。
- **$\delta$ 依赖于 $\epsilon$**：你要将函数值限制在宽为 $2\epsilon$ 的带状区域内，就必须在 $x$ 轴上找到一个足够窄的宽为 $2\delta$ 的控制区间。上面的可视化实验直观地展示了这种“你缩我也缩”的动态平衡。

### 2. $\epsilon-M$ 定义（自变量趋于无穷大）
若 $\forall \epsilon > 0, \exists M > 0$，使得当 $|x| > M$ 时，恒有 $|f(x) - A| < \epsilon$，则称 $\lim_{x \to \infty} f(x) = A$。

### 3. 单侧极限 (One-sided Limits)
- **左极限**：$x \to x_0^-$，即 $x_0 - \delta < x < x_0$。记作 $f(x_0^-)$。
- **右极限**：$x \to x_0^+$，即 $x_0 < x < x_0 + \delta$。记作 $f(x_0^+)$。
**核心充要条件**：$\lim_{x \to x_0} f(x) = A \iff f(x_0^-) = f(x_0^+) = A$。
此定理常用于分段函数在分界点处的极限判定。

---

## 二、 极限计算的高阶武器库

### 1. 等价无穷小代换 (Equivalent Infinitesimals)
当 $x \to 0$ 时，若 $\lim \frac{\alpha(x)}{\beta(x)} = 1$，则称 $\alpha \sim \beta$。
**常用等价无穷小家族**（本质是泰勒展开的一阶截断）：
- $\sin x \sim x, \quad \arcsin x \sim x$
- $\tan x \sim x, \quad \arctan x \sim x$
- $1 - \cos x \sim \frac{1}{2}x^2$
- $e^x - 1 \sim x, \quad \ln(1+x) \sim x$
- $(1+x)^a - 1 \sim ax$

<KnowledgeCard type="warning" title="代换陷阱">
等价无穷小代换通常只能在**乘除法**的因子中进行。在**加减法**中直接代换极易导致精度丢失（如 $\lim_{x\to0} \frac{\tan x - \sin x}{x^3}$，若都代换为 $x$，分子变 $0$ 得到错误答案；实际需用到三阶泰勒）。
</KnowledgeCard>

### 2. 洛必达法则 (L'Hôpital's Rule)
处理 $\frac{0}{0}$ 或 $\frac{\infty}{\infty}$ 类型的终极法则：
$$\lim \frac{f(x)}{g(x)} = \lim \frac{f'(x)}{g'(x)}$$
**使用前提（极度严格）**：
1. 必须是 $\frac{0}{0}$ 或 $\frac{\infty}{\infty}$ 型。
2. $f'(x), g'(x)$ 在邻域内存在且 $g'(x) \neq 0$。
3. **最容易被忽略的**：导数的极限 $\lim \frac{f'(x)}{g'(x)}$ 必须存在（或为 $\infty$）。若该极限震荡，则洛必达法则失效，但原极限可能存在。

### 3. 泰勒公式 (Taylor's Formula)
这是降维打击。当洛必达法则需要求导多次，或者等价无穷小在加减法中失效时，将函数在 $x_0$ 处展开到能消除零因子的阶数。

---

## 三、 高阶极限实战解析

### 练习 1：$\epsilon-\delta$ 证明二次函数极限（严密逻辑）
用 $\epsilon-\delta$ 语言证明：$\lim_{x \to 2} (x^2 - 4x + 5) = 1$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. **写出目标误差**：需要 $|f(x) - A| < \epsilon$，即 $|(x^2 - 4x + 5) - 1| < \epsilon$。
2. **化简表达式**：
   $|x^2 - 4x + 4| = |(x-2)^2| < \epsilon$。
3. **寻找 $\delta$**：
   我们需要找到 $\delta$，使得当 $0 < |x-2| < \delta$ 时，$|x-2|^2 < \epsilon$。
   显然，只需令 $|x-2| < \sqrt{\epsilon}$ 即可。
4. **规范证明**：
   对于任意给定的 $\epsilon > 0$，取 $\delta = \sqrt{\epsilon}$。
   当 $0 < |x - 2| < \delta$ 时，必有 $|x - 2|^2 < \delta^2 = \epsilon$。
   即 $|(x^2 - 4x + 5) - 1| < \epsilon$ 恒成立。
   故极限为 1。

#### 答案
证明如上，核心在于选取 $\delta = \sqrt{\epsilon}$。
</details>

### 练习 2：等价无穷小代换（加减法防坑）
求极限：$\lim_{x \to 0} \frac{x - \sin x}{x^3}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
**错误做法**：将 $\sin x$ 用 $x$ 代换，分子变为 $x-x=0$，极限为 $0$。（错误！加减法精度丢失）

**正确解法 1：洛必达法则**
1. 属 $\frac{0}{0}$ 型，应用洛必达：
   $\lim \frac{1 - \cos x}{3x^2}$
2. 此时可以用等价无穷小 $1-\cos x \sim \frac{1}{2}x^2$：
   $\lim \frac{\frac{1}{2}x^2}{3x^2} = \frac{1}{6}$。

**正确解法 2：泰勒展开**
1. 将 $\sin x$ 展开到三阶：$\sin x = x - \frac{x^3}{3!} + o(x^3)$。
2. 代入原式：
   $\lim_{x \to 0} \frac{x - (x - \frac{1}{6}x^3 + o(x^3))}{x^3}$
3. 化简：
   $\lim_{x \to 0} \frac{\frac{1}{6}x^3 + o(x^3)}{x^3} = \frac{1}{6}$。

#### 答案
$1/6$
</details>

### 练习 3：$1^\infty$ 型极限的处理
求极限：$\lim_{x \to 0} (\cos x)^{\frac{1}{x^2}}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
这是一个典型的 $1^\infty$ 未定式。处理这类问题的标准步骤是利用恒等式 $u^v = e^{v \ln u}$ 将其转化为指数上的 $0 \times \infty$ 型。

1. **指数化**：
   原式 = $\lim_{x \to 0} e^{\frac{1}{x^2} \ln(\cos x)} = e^{\lim_{x \to 0} \frac{\ln(\cos x)}{x^2}}$
2. **计算指数部分的极限**：设 $L = \lim_{x \to 0} \frac{\ln(\cos x)}{x^2}$。
3. **等价替换**：
   当 $x \to 0$ 时，$\cos x \to 1$。令 $t = \cos x - 1 \to 0$。
   利用 $\ln(1+t) \sim t$，所以 $\ln(\cos x) = \ln(1 + (\cos x - 1)) \sim \cos x - 1$。
4. **进一步等价**：
   我们知道 $1 - \cos x \sim \frac{1}{2}x^2$，所以 $\cos x - 1 \sim -\frac{1}{2}x^2$。
5. **代入求 L**：
   $L = \lim_{x \to 0} \frac{-\frac{1}{2}x^2}{x^2} = -\frac{1}{2}$。
6. **得出原极限**：
   原式 = $e^L = e^{-1/2} = \frac{1}{\sqrt{e}}$。

#### 答案
$e^{-1/2}$ (或 $\frac{1}{\sqrt{e}}$)
</details>

### 练习 4：洛必达法则失效的陷阱
求极限：$\lim_{x \to \infty} \frac{x + \sin x}{x - \cos x}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
**陷阱示范**：
这是 $\frac{\infty}{\infty}$ 型。若直接使用洛必达法则：
$\lim \frac{1 + \cos x}{1 + \sin x}$
此时，当 $x \to \infty$ 时，$\cos x$ 和 $\sin x$ 都在 $[-1, 1]$ 之间震荡，导数之比的极限**不存在**。
难道原极限就不存在吗？不是的。洛必达法则失效不代表极限不存在。

**正确解法：提最高次幂**
1. 分子分母同时除以增长最快的主导项 $x$：
   $$\lim_{x \to \infty} \frac{1 + \frac{\sin x}{x}}{1 - \frac{\cos x}{x}}$$
2. 分析局部极限：
   由于 $|\sin x| \le 1$ 是有界的，而 $\frac{1}{x} \to 0$ 是无穷小。根据“有界量乘无穷小仍为无穷小”定理：
   $\lim_{x \to \infty} \frac{\sin x}{x} = 0$，同理 $\lim_{x \to \infty} \frac{\cos x}{x} = 0$。
3. 代入计算：
   $$\frac{1 + 0}{1 - 0} = 1$$

#### 答案
$1$。本题揭示了洛必达法则第三条件的不可违背性。
</details>

### 练习 5：分段函数与单侧极限判定连续性
已知函数：
$f(x) = \begin{cases} \frac{e^{ax} - 1}{x}, & x < 0 \\ b, & x = 0 \\ \frac{\sqrt{1+x} - 1}{x}, & x > 0 \end{cases}$
求 $a, b$ 的值，使得 $f(x)$ 在 $x=0$ 处连续。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
连续的充要条件是：左极限 = 右极限 = 函数值。

1. **计算函数值**：
   $f(0) = b$。
2. **计算左极限** ($x \to 0^-$)：
   $\lim_{x \to 0^-} \frac{e^{ax} - 1}{x}$。利用等价无穷小 $e^{ax} - 1 \sim ax$，得极限为 $\frac{ax}{x} = a$。
3. **计算右极限** ($x \to 0^+$)：
   $\lim_{x \to 0^+} \frac{\sqrt{1+x} - 1}{x}$。
   方法一：有理化。分子分母同乘 $\sqrt{1+x}+1$，得 $\frac{1+x-1}{x(\sqrt{1+x}+1)} = \frac{1}{\sqrt{1+x}+1} = \frac{1}{2}$。
   方法二：等价无穷小 $(1+x)^{1/2} - 1 \sim \frac{1}{2}x$，得极限为 $\frac{1}{2}$。
4. **建立方程组**：
   $a = \frac{1}{2} = b$。

#### 答案
$a = 1/2, b = 1/2$
</details>

### 练习 6：利用极限的保号性证明不等式 (Sign-Preserving Property)
设 $\lim_{x \to x_0} f(x) = A > 0$，证明：存在 $x_0$ 的某个去心邻域 $\mathring{U}(x_0, \delta)$，使得在该邻域内 $f(x) > 0$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
这是极限保号性的基本证明，充分体现了 $\epsilon-\delta$ 语言的威力。

1. **选取合适的 $\epsilon$**：
   既然 $A > 0$，我们可以取 $\epsilon = \frac{A}{2}$。由于 $A > 0$，显然 $\epsilon > 0$。
2. **运用定义**：
   根据极限定义，对于这个特定的 $\epsilon = A/2$，必存在 $\delta > 0$，使得当 $0 < |x - x_0| < \delta$ 时，有：
   $|f(x) - A| < \frac{A}{2}$
3. **去绝对值符号**：
   $-\frac{A}{2} < f(x) - A < \frac{A}{2}$
4. **得出结论**：
   不等式左侧变为：$f(x) > A - \frac{A}{2} = \frac{A}{2} > 0$。
   证毕。

#### 答案
证明核心在于取 $\epsilon = A/2$ 并应用 $\epsilon-\delta$ 定义。
</details>

---

## 四、 练习库同步 (Analysis Exercise Sync)

本章知识点对应练习库中的以下强化题目：

1. [**练习 11：等价无穷小综合代换**](../exercises/math/analysis.md#练习-11函数极限等价代换) - 掌握在复杂加减运算中合理使用等价无穷小。
2. **洛必达法则进阶**：求 $\lim_{x \to 0^+} (\frac{1}{x} - \frac{1}{\sin x})$。
3. **泰勒展开应用**：利用三阶泰勒公式计算 $\lim_{x \to 0} \frac{x - \sin x}{x^3}$ 的精确值。
4. **单侧极限判断**：讨论 $f(x) = \frac{e^{1/x} - 1}{e^{1/x} + 1}$ 在 $x=0$ 处的极限是否存在。

---
*编者注：以上为《函数极限》深度理论与实战篇。由于篇幅限制，更多极限运算技巧（如拉格朗日中值定理在极限中的高级应用）将在后续导数章节中进一步展开。*
