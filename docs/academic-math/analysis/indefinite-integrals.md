---
title: 不定积分：寻找反导数的艺术 (Indefinite Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 不定积分：寻找反导数的艺术

如果说微分是把一个复杂的整体拆解为无穷小的碎片，那么积分就是将这些碎片重新拼装。不定积分作为求导的逆运算，是整个积分学的基石。与求导的机械化法则不同，求不定积分是一项充满创造性和试错的“艺术”。

## 一、 核心理论与基本方法

### 1. 原函数与不定积分的定义
**原函数**：如果在区间 $I$ 上，对于任意 $x$ 都有 $F'(x) = f(x)$ 或 $dF(x) = f(x)dx$，则称 $F(x)$ 为 $f(x)$ 在该区间上的一个原函数。
**不定积分**：函数 $f(x)$ 的所有原函数的全体称为 $f(x)$ 的不定积分，记作：
$$\int f(x) dx = F(x) + C$$
其中 $\int$ 是积分号，$f(x)$ 是被积函数，$C$ 是任意常数。

**核心性质**：
- $(\int f(x) dx)' = f(x)$
- $\int F'(x) dx = F(x) + C$
- 线性性质：$\int [a f(x) + b g(x)] dx = a \int f(x) dx + b \int g(x) dx$

### 2. 第一类换元法（凑微分法）
这是最常用的积分技巧，核心思想是将积分变量与被积函数的一部分结合，凑成一个新变量的微分。
**公式**：若 $\int f(u) du = F(u) + C$，则：
$$\int f(\phi(x)) \phi'(x) dx = \int f(\phi(x)) d(\phi(x)) = F(\phi(x)) + C$$
**常见凑微分类型**：
- $x dx = \frac{1}{2} d(x^2)$
- $\frac{1}{x} dx = d(\ln|x|)$
- $\cos x dx = d(\sin x)$
- $e^x dx = d(e^x)$

### 3. 第二类换元法
当凑微分法失效，特别是遇到复杂的根式时，我们主动引入一个新变量 $x = \psi(t)$，将复杂的积分化为简单的积分。
**常见代换**：
- 遇到 $\sqrt{a^2 - x^2}$，令 $x = a \sin t$。
- 遇到 $\sqrt{x^2 + a^2}$，令 $x = a \tan t$。
- 遇到 $\sqrt{x^2 - a^2}$，令 $x = a \sec t$。

### 4. 分部积分法 (Integration by Parts)
源于乘积的求导法则 $(uv)' = u'v + uv'$。
**公式**：
$$\int u dv = uv - \int v du$$
**核心难点**：如何选择 $u$ 和 $dv$？
**LIATE 法则（反对幂三指）**：
按以下顺序优先选择 $u$（求导容易变简单的函数）：
1. **L**ogarithmic (对数函数，如 $\ln x$)
2. **I**nverse trigonometric (反三角函数，如 $\arctan x$)
3. **A**lgebraic (代数/多项式函数，如 $x^2$)
4. **T**rigonometric (三角函数，如 $\sin x$)
5. **E**xponential (指数函数，如 $e^x$)
排在前面的设为 $u$，剩下的设为 $dv$。

<KnowledgeCard type="warning" title="原函数存在定理">
并非所有函数都有原函数。**连续函数一定有原函数**。但即便有原函数，也未必能用“初等函数”表示出来（如 $\int e^{-x^2} dx, \int \frac{\sin x}{x} dx$ 等著名的“积不出”函数）。
</KnowledgeCard>

---

## 二、 积分计算高阶实战解析

### 练习 1：代数变形与凑微分的结合
求不定积分：$\int \frac{dx}{x(1+x^2)}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
**方法一：分项法（裂项）**
1. 观察被积函数，分子是 1，我们可以巧妙地构造出与分母相关的项：
   $$1 = (1+x^2) - x^2$$
2. 将被积函数拆分：
   $$\frac{1}{x(1+x^2)} = \frac{1+x^2 - x^2}{x(1+x^2)} = \frac{1+x^2}{x(1+x^2)} - \frac{x^2}{x(1+x^2)} = \frac{1}{x} - \frac{x}{1+x^2}$$
3. 分别积分：
   $\int \frac{1}{x} dx = \ln|x| + C_1$
   对于第二项，凑微分：$\int \frac{x}{1+x^2} dx = \frac{1}{2} \int \frac{d(1+x^2)}{1+x^2} = \frac{1}{2} \ln(1+x^2) + C_2$
4. 合并结果：
   $$\ln|x| - \frac{1}{2} \ln(1+x^2) + C = \ln \frac{|x|}{\sqrt{1+x^2}} + C$$

**方法二：提次幂（更具普适性）**
1. 提取分母的 $x^3$：
   $\int \frac{dx}{x^3(x^{-2} + 1)}$
2. 凑微分，令 $t = x^{-2}$，则 $dt = -2x^{-3}dx \implies x^{-3}dx = -\frac{1}{2}dt$。
3. 积分变为：
   $-\frac{1}{2} \int \frac{dt}{t+1} = -\frac{1}{2}\ln|t+1| + C = -\frac{1}{2}\ln(x^{-2}+1) + C$
4. 化简后与方法一结果完全一致。

#### 答案
$\ln \frac{|x|}{\sqrt{1+x^2}} + C$
</details>

### 练习 2：第二类换元法（三角代换）
求不定积分：$\int \frac{\sqrt{4-x^2}}{x^2} dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
遇到 $\sqrt{a^2-x^2}$ 形式，标准做法是三角代换。
1. **设代换**：令 $x = 2 \sin t, (-\frac{\pi}{2} < t < \frac{\pi}{2})$。
2. **计算微分与根式**：
   $dx = 2 \cos t dt$
   $\sqrt{4-x^2} = \sqrt{4 - 4\sin^2 t} = 2 \cos t$
3. **代入原积分**：
   $$\int \frac{2 \cos t}{4 \sin^2 t} \cdot 2 \cos t dt = \int \frac{\cos^2 t}{\sin^2 t} dt = \int \cot^2 t dt$$
4. **利用三角恒等式**：$\cot^2 t = \csc^2 t - 1$。
   $$\int (\csc^2 t - 1) dt = -\cot t - t + C$$
5. **回代 $x$**：
   已知 $\sin t = \frac{x}{2}$，则 $t = \arcsin \frac{x}{2}$。
   画出直角三角形，对边为 $x$，斜边为 2，邻边为 $\sqrt{4-x^2}$。
   所以 $\cot t = \frac{\text{邻边}}{\text{对边}} = \frac{\sqrt{4-x^2}}{x}$。
6. **最终结果**：
   $$-\frac{\sqrt{4-x^2}}{x} - \arcsin \frac{x}{2} + C$$

#### 答案
$-\frac{\sqrt{4-x^2}}{x} - \arcsin \frac{x}{2} + C$
</details>

### 练习 3：分部积分法的经典循环
求不定积分：$I = \int e^{2x} \sin x dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
这是经典的“循环型”分部积分。指数函数和三角函数无论怎么求导都不会消失，但两次分部积分后会出现自身。

1. **第一次分部积分**：
   选择 $u = \sin x, dv = e^{2x}dx$（根据反对幂三指，选三角函数为 u 更优，虽此题选指数也可）。
   $du = \cos x dx, v = \frac{1}{2}e^{2x}$。
   $$I = \frac{1}{2}e^{2x}\sin x - \frac{1}{2}\int e^{2x}\cos x dx$$
2. **第二次分部积分**：对 $\int e^{2x}\cos x dx$ 进行同样的操作。
   选择 $u = \cos x, dv = e^{2x}dx$。
   $du = -\sin x dx, v = \frac{1}{2}e^{2x}$。
   $$\int e^{2x}\cos x dx = \frac{1}{2}e^{2x}\cos x - \int \frac{1}{2}e^{2x}(-\sin x)dx = \frac{1}{2}e^{2x}\cos x + \frac{1}{2}I$$
3. **建立方程**：将第二步结果代入第一步的式子：
   $$I = \frac{1}{2}e^{2x}\sin x - \frac{1}{2} \left[ \frac{1}{2}e^{2x}\cos x + \frac{1}{2}I \right]$$
4. **解出 I**：
   $$I = \frac{1}{2}e^{2x}\sin x - \frac{1}{4}e^{2x}\cos x - \frac{1}{4}I$$
   移项得：
   $$\frac{5}{4}I = \frac{1}{4}e^{2x}(2\sin x - \cos x)$$
   $$I = \frac{1}{5}e^{2x}(2\sin x - \cos x) + C$$

#### 答案
$\frac{1}{5}e^{2x}(2\sin x - \cos x) + C$
</details>

### 练习 4：隐藏的“反对幂三指”
求不定积分：$\int \arctan x dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
被积函数只有一个孤立的反三角函数，很多初学者会不知所措。这里的关键是**把 $1$ 当作代数函数**。

1. **设定 u 和 dv**：根据 LIATE 法则，反三角函数优先设为 $u$。
   设 $u = \arctan x, dv = 1 \cdot dx$。
   则 $du = \frac{1}{1+x^2} dx, v = x$。
2. **应用分部积分公式**：
   $$\int \arctan x dx = x \arctan x - \int \frac{x}{1+x^2} dx$$
3. **计算剩余的积分**（第一类换元法）：
   $$\int \frac{x}{1+x^2} dx = \frac{1}{2} \int \frac{d(1+x^2)}{1+x^2} = \frac{1}{2} \ln(1+x^2)$$
4. **合并结果**：
   $$x \arctan x - \frac{1}{2} \ln(1+x^2) + C$$

#### 答案
$x \arctan x - \frac{1}{2} \ln(1+x^2) + C$
</details>

### 练习 5：有理函数的积分（部分分式分解）
求不定积分：$\int \frac{x+5}{x^2 - x - 2} dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
对于真分式（分子次数低于分母），标准解法是将分母因式分解，然后化为部分分式之和。

1. **分母因式分解**：
   $x^2 - x - 2 = (x-2)(x+1)$。
2. **设部分分式**：
   设 $\frac{x+5}{(x-2)(x+1)} = \frac{A}{x-2} + \frac{B}{x+1}$。
3. **求待定系数 A, B**：
   通分并令分子相等：$A(x+1) + B(x-2) = x+5$。
   - 令 $x = 2$：$3A = 7 \implies A = \frac{7}{3}$。
   - 令 $x = -1$：$-3B = 4 \implies B = -\frac{4}{3}$。
4. **代入积分**：
   $$\int \left( \frac{7/3}{x-2} - \frac{4/3}{x+1} \right) dx$$
5. **计算结果**：
   $$= \frac{7}{3}\ln|x-2| - \frac{4}{3}\ln|x+1| + C$$

#### 答案
$\frac{7}{3}\ln|x-2| - \frac{4}{3}\ln|x+1| + C$
</details>

---

## 三、 深度例题：技巧的综合与对称性

### 深度例题 1：倒代换与对称构造
求不定积分：$I = \int \frac{x^2+1}{x^4+1} dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
这是一个非常经典的高阶积分，直接分解分母（利用 $x^4+1 = (x^2+1)^2 - 2x^2 = (x^2-\sqrt{2}x+1)(x^2+\sqrt{2}x+1)$）后进行部分分式分解非常繁琐。更好的方法是利用**代数构造**。

1. **分子分母同时除以 $x^2$**：
   $$I = \int \frac{1 + \frac{1}{x^2}}{x^2 + \frac{1}{x^2}} dx$$
2. **观察分子与分母的关系**：
   注意到 $(x - \frac{1}{x})' = 1 + \frac{1}{x^2}$。
   而分母可以凑成：$x^2 + \frac{1}{x^2} = (x - \frac{1}{x})^2 + 2$。
3. **凑微分与换元**：
   令 $u = x - \frac{1}{x}$，则 $du = (1 + \frac{1}{x^2}) dx$。
   $$I = \int \frac{du}{u^2 + 2}$$
4. **应用基本积分公式**：
   $$I = \frac{1}{\sqrt{2}} \arctan \frac{u}{\sqrt{2}} + C$$
5. **回代 x**：
   $$I = \frac{1}{\sqrt{2}} \arctan \frac{x - 1/x}{\sqrt{2}} + C = \frac{1}{\sqrt{2}} \arctan \frac{x^2-1}{\sqrt{2}x} + C$$

#### 答案
$\frac{1}{\sqrt{2}} \arctan \frac{x^2-1}{\sqrt{2}x} + C$
</details>

### 深度例题 2：分部积分与方程法结合（无理函数）
求不定积分：$I = \int \sqrt{a^2 - x^2} dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
除了常见的三角代换（$x = a \sin t$），本题也可以通过分部积分直接求解，这种方法在推导递推公式时非常有用。

1. **设定分部积分项**：
   设 $u = \sqrt{a^2 - x^2}, dv = dx$。
   则 $du = \frac{-x}{\sqrt{a^2 - x^2}} dx, v = x$。
2. **应用分部积分公式**：
   $$I = x\sqrt{a^2 - x^2} - \int x \cdot \frac{-x}{\sqrt{a^2 - x^2}} dx = x\sqrt{a^2 - x^2} + \int \frac{x^2}{\sqrt{a^2 - x^2}} dx$$
3. **分子加减 $a^2$ 构造原积分**：
   $$\int \frac{x^2}{\sqrt{a^2 - x^2}} dx = \int \frac{a^2 - (a^2 - x^2)}{\sqrt{a^2 - x^2}} dx = a^2 \int \frac{dx}{\sqrt{a^2 - x^2}} - \int \sqrt{a^2 - x^2} dx$$
   注意到最后一项正是原积分 $I$。
4. **建立关于 I 的方程**：
   $$I = x\sqrt{a^2 - x^2} + a^2 \arcsin \frac{x}{a} - I$$
5. **解出 I**：
   $$2I = x\sqrt{a^2 - x^2} + a^2 \arcsin \frac{x}{a}$$
   $$I = \frac{1}{2} x\sqrt{a^2 - x^2} + \frac{a^2}{2} \arcsin \frac{x}{a} + C$$

#### 答案
$\frac{x}{2}\sqrt{a^2 - x^2} + \frac{a^2}{2} \arcsin \frac{x}{a} + C$
</details>

---

<SupportingExercises 
  topic="不定积分" 
  exercises={[
    { index: 22, title: "不定积分换元法综合", slug: "练习-22不定积分换元法" }
  ]} 
/>

---
*编者注：不定积分是寻找反导数的艺术。掌握了不定积分，你就掌握了微积分基本定理的计算核心。*
