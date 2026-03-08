---
title: 第十九章 含参量积分 (Parametric Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 第十九章 含参量积分

在数学分析中，当我们考虑的积分不仅依赖于积分变量，还依赖于一个或多个参数时，就引入了**含参量积分**。它是研究特殊函数（如 Gamma、Beta 函数）、解决微分方程以及进行复杂积分计算的有力工具。

## 一、 含参量常义积分 (Proper Parametric Integrals)

设函数 $f(x, y)$ 定义在矩形区域 $R = [a, b] \times [c, d]$ 上。称

$$I(y) = \int_a^b f(x, y) dx, \quad y \in [c, d]$$

为由 $f(x, y)$ 确定的含参量常义积分。

### 1. 分析性质

若 $f(x, y)$ 在 $R$ 上连续，则有：

- **连续性**：$I(y)$ 在 $[c, d]$ 上连续。
- **可积性**：$I(y)$ 在 $[c, d]$ 上可积，且积分顺序可以交换：

$$\int_c^d I(y) dy = \int_c^d \left( \int_a^b f(x, y) dx \right) dy = \int_a^b \left( \int_c^d f(x, y) dy \right) dx$$

- **可微性 (Leibniz 公式)**：若 $\frac{\partial f}{\partial y}$ 在 $R$ 上连续，则 $I(y)$ 在 $(c, d)$ 内可导，且：

$$I'(y) = \frac{d}{dy} \int_a^b f(x, y) dx = \int_a^b \frac{\partial f(x, y)}{\partial y} dx$$

### 2. 积分边界含参量的情形

若边界 $a(y)$ 和 $b(y)$ 也是 $y$ 的函数且可导，则 Leibniz 公式推广为：

$$\frac{d}{dy} \int_{a(y)}^{b(y)} f(x, y) dx = f(b(y), y) b'(y) - f(a(y), y) a'(y) + \int_{a(y)}^{b(y)} \frac{\partial f(x, y)}{\partial y} dx$$

---

## 二、 含参量反常积分的一致收敛性 (Uniform Convergence)

设 $f(x, y)$ 定义在 $a \le x < +\infty, c \le y \le d$ 上。若对每个固定的 $y$，反常积分 $\int_a^{+\infty} f(x, y) dx$ 都收敛，则定义了含参量反常积分：

$$I(y) = \int_a^{+\infty} f(x, y) dx$$

### 1. 定义与 Cauchy 准则

**定义**：称 $I(y)$ 在 $[c, d]$ 上**一致收敛**，如果对于任意 $\epsilon > 0$，存在一个只与 $\epsilon$ 有关而与 $y$ 无关的 $A_0 > a$，使得当 $A > A_0$ 时，对所有 $y \in [c, d]$ 均有：

$$\left| \int_A^{+\infty} f(x, y) dx \right| < \epsilon$$

**Cauchy 准则**：$I(y)$ 在 $[c, d]$ 上一致收敛的充要条件是：对于任意 $\epsilon > 0$，存在 $A_0 > a$，使得对于任意 $A_1, A_2 > A_0$ 及所有 $y \in [c, d]$，均有：

$$\left| \int_{A_1}^{A_2} f(x, y) dx \right| < \epsilon$$

### 2. 判定判定法

- **Weierstrass 判别法 (M-判别法)**：
  若存在函数 $M(x)$ 满足：
  1. $|f(x, y)| \le M(x)$ 对于所有 $x \in [a, +\infty)$ 和 $y \in [c, d]$ 成立；
  2. 反常积分 $\int_a^{+\infty} M(x) dx$ 收敛。
     则 $\int_a^{+\infty} f(x, y) dx$ 在 $[c, d]$ 上绝对一致收敛。

- **Dirichlet 判别法**：
  若满足以下条件：
  1. $\int_a^A f(x, y) dx$ 对 $A \ge a$ 和 $y \in [c, d]$ 一致有界；
  2. $g(x, y)$ 当 $x$ 固定时关于 $y$ 一致，且对每个 $y$，$g(x, y)$ 关于 $x$ 单调；
  3. 当 $x \to +\infty$ 时，$g(x, y)$ 对 $y \in [c, d]$ 一致趋于 0。
     则 $\int_a^{+\infty} f(x, y) g(x, y) dx$ 一致收敛。

- **Abel 判别法**：
  若满足以下条件：
  1. $\int_a^{+\infty} f(x, y) dx$ 在 $[c, d]$ 上一致收敛；
  2. $g(x, y)$ 关于 $x$ 单调，且对 $x \in [a, +\infty), y \in [c, d]$ 一致有界。
     则 $\int_a^{+\infty} f(x, y) g(x, y) dx$ 一致收敛。

---

## 三、 Beta 函数与 Gamma 函数 (Beta and Gamma Functions)

### 1. Gamma 函数 (The Gamma Function)

**严格定义**：对于 $s > 0$，$\Gamma(s) = \int_0^{+\infty} x^{s-1} e^{-x} dx$。该积分在 $(0, +\infty)$ 的任何闭子区间上一致收敛。

**进阶性质**：

- **递推性质**：$\Gamma(s+1) = s\Gamma(s)$，且 $\Gamma(n+1) = n!$。
- **余元公式 (Reflection Formula)**：$\Gamma(s)\Gamma(1-s) = \frac{\pi}{\sin(\pi s)} \quad (0 < s < 1)$。
- **倍元公式 (Duplication Formula)**：$\Gamma(2s) = \frac{2^{2s-1}}{\sqrt{\pi}} \Gamma(s)\Gamma(s+\frac{1}{2})$。
- **Stirling 公式 (渐近展开)**：当 $x \to +\infty$ 时，$\Gamma(x+1) \sim \sqrt{2\pi x} (\frac{x}{e})^x$。

### 2. Beta 函数 (The Beta Function)

**严格定义**：对于 $p > 0, q > 0$，$B(p, q) = \int_0^1 x^{p-1} (1-x)^{q-1} dx$。

**不同表达形式**：

- **三角形式**：$B(p, q) = 2 \int_0^{\pi/2} \sin^{2p-1} \theta \cos^{2q-1} \theta d\theta$。
- **无穷限形式**：$B(p, q) = \int_0^{+\infty} \frac{y^{p-1}}{(1+y)^{p+q}} dy$。

### 3. 两者的纽带

$$B(p, q) = \frac{\Gamma(p)\Gamma(q)}{\Gamma(p+q)}$$

利用此公式，可将大量三角积分和分式反常积分转化为 Gamma 函数计算。

---

## 四、 进阶例题详析

### 例题 1：Dirichlet 积分的构造证明

计算 $I = \int_0^{+\infty} \frac{\sin x}{x} dx$。
（解析略，见前文，保持经典地位）

### 例题 2：概率积分的参数扩展

计算 $I(a) = \int_0^{+\infty} e^{-x^2} \cos(2ax) dx = \frac{\sqrt{\pi}}{2} e^{-a^2}$。
（解析略，见前文）

### 例题 3：对数三角积分与 Beta 函数

计算 $I = \int_0^{\pi/2} \ln(\sin x) dx$。

<details>

<summary>点击查看详细解析</summary>

#### 解析过程

利用含参量积分求导法。考虑 $J(\alpha) = \int_0^{\pi/2} \sin^\alpha x dx$。

1. **转化为 Beta 函数**：
   $J(\alpha) = \frac{1}{2} B(\frac{\alpha+1}{2}, \frac{1}{2}) = \frac{\Gamma(\frac{\alpha+1}{2})\Gamma(\frac{1}{2})}{2\Gamma(\frac{\alpha}{2}+1)}$。
2. **两端取对数并对 $\alpha$ 求导**：
   $\ln J(\alpha) = \ln \Gamma(\frac{\alpha+1}{2}) + \ln \Gamma(\frac{1}{2}) - \ln 2 - \ln \Gamma(\frac{\alpha}{2}+1)$。
   $\frac{J'(\alpha)}{J(\alpha)} = \frac{1}{2} \psi(\frac{\alpha+1}{2}) - \frac{1}{2} \psi(\frac{\alpha}{2}+1)$，其中 $\psi(x) = \frac{\Gamma'(x)}{\Gamma(x)}$ 为 Digamma 函数。
3. **令 $\alpha \to 0$**：
   $J(0) = \pi/2$。
   $J'(0) = \int_0^{\pi/2} \ln(\sin x) dx$。
   $\frac{J'(0)}{\pi/2} = \frac{1}{2} [\psi(1/2) - \psi(1)]$。
4. **利用 Digamma 特殊值**：
   $\psi(1) = -C$（欧拉常数），$\psi(1/2) = -C - 2\ln 2$。
   $\frac{J'(0)}{\pi/2} = \frac{1}{2} [-C - 2\ln 2 + C] = -\ln 2$。
5. **结果**：
   $I = J'(0) = -\frac{\pi}{2} \ln 2$。

#### 答案

$-\frac{\pi}{2} \ln 2$

</details>

### 例题 4：Frullani 积分公式的应用

计算 $I = \int_0^{+\infty} \frac{e^{-ax} - e^{-bx}}{x} dx \quad (a, b > 0)$。

<details>

<summary>点击查看详细解析</summary>

#### 解析过程

这是一个典型的 Frullani 积分。一般形式为 $\int_0^\infty \frac{f(ax) - f(bx)}{x} dx = (f(0) - f(\infty)) \ln(b/a)$。

1. **构造含参量积分**：
   设 $f(x) = e^{-x}$，则 $f(0) = 1$，$f(+\infty) = 0$。
2. **应用公式**：
   $I = (1 - 0) \ln \frac{b}{a} = \ln \frac{b}{a}$。
3. **严格证明简述**：
   $I = \int_0^\infty \int_a^b e^{-yx} dy dx = \int_a^b \int_0^\infty e^{-yx} dx dy = \int_a^b \frac{1}{y} dy = \ln(b/a)$。

#### 答案

$\ln(b/a)$

</details>

### 例题 5：结合 Gamma 函数的复杂反常积分

计算 $I = \int_0^{+\infty} \frac{x^{a-1}}{1+x^n} dx \quad (n > a > 0)$。

<details>

<summary>点击查看详细解析</summary>

#### 解析过程

1. **变量替换**：
   令 $t = \frac{1}{1+x^n}$，则 $x = (\frac{1-t}{t})^{1/n}$，$dx = \frac{1}{n} (\frac{1-t}{t})^{\frac{1}{n}-1} (-\frac{1}{t^2}) dt$。
   当 $x=0 \to t=1$，$x=\infty \to t=0$。
2. **代入积分**：
   $I = \int_1^0 t [ (\frac{1-t}{t})^{1/n} ]^{a-1} \cdot \frac{1}{n} (\frac{1-t}{t})^{\frac{1}{n}-1} (-\frac{1}{t^2}) dt$
   $I = \frac{1}{n} \int_0^1 t^{-1} (\frac{1-t}{t})^{\frac{a}{n}-1} dt = \frac{1}{n} \int_0^1 t^{-\frac{a}{n}} (1-t)^{\frac{a}{n}-1} dt$
3. **识别 Beta 函数**：
   $I = \frac{1}{n} B(1-\frac{a}{n}, \frac{a}{n})$。
4. **利用余元公式**：
   $I = \frac{1}{n} \Gamma(1-\frac{a}{n})\Gamma(\frac{a}{n}) = \frac{1}{n} \frac{\pi}{\sin(\frac{a\pi}{n})}$。

#### 答案

$\frac{\pi}{n \sin(a\pi/n)}$

</details>

---

## 五、 章内专题练习 (In-Chapter Exercises)

:::tip 练习说明
含参量积分的关键在于积分号下求导与一致收敛性的判定。
:::

### 练习 1：积分号下求导法
求 $I(\alpha) = \int_0^\pi \ln(1 - 2\alpha \cos x + \alpha^2) dx \quad (|\alpha| < 1)$。

<details>
<summary>点击查看解析</summary>

**解析**：
1. **求导**：
   $I'(\alpha) = \int_0^\pi \frac{-2\cos x + 2\alpha}{1 - 2\alpha \cos x + \alpha^2} dx$。
2. **利用恒等式或换元**：
   由复变函数知识或三角换元：
   $\int_0^\pi \frac{\alpha - \cos x}{1 - 2\alpha \cos x + \alpha^2} dx = 0 \quad (|\alpha| < 1)$。
   故 $I'(\alpha) = 2 \int_0^\pi \frac{\alpha - \cos x}{1 - 2\alpha \cos x + \alpha^2} dx = 0$。
3. **积分还原**：
   $I(\alpha) = C$。令 $\alpha = 0$，得 $I(0) = \int_0^\pi \ln(1) dx = 0$。
**结论**：$I(\alpha) = 0$。

</details>

### 练习 2：Weierstrass 判别法的应用
证明 $I(y) = \int_0^\infty \frac{\cos(xy)}{1+x^2} dx$ 在 $\mathbb{R}$ 上一致收敛。

<details>
<summary>点击查看解析</summary>

**解析**：
1. 观察被积函数：$|f(x, y)| = \left| \frac{\cos(xy)}{1+x^2} \right| \le \frac{1}{1+x^2}$。
2. 设置控制函数：令 $M(x) = \frac{1}{1+x^2}$。
3. 验证收敛性：反常积分 $\int_0^\infty \frac{1}{1+x^2} dx = \pi/2$ 收敛。
**结论**：由 Weierstrass 判别法（M-判别法），原积分在全实数域上**一致收敛**。

</details>


### 练习 3：利用 Beta 函数计算三角积分
求 $\int_0^{\pi/2} \sin^6 x \cos^4 x dx$。

<details>
<summary>点击查看解析</summary>

**解析**：
1. **转化为 Beta 函数**：
   $\int_0^{\pi/2} \sin^{2p-1} x \cos^{2q-1} x dx = \frac{1}{2} B(p, q)$。
   此处 $2p-1=6 \implies p=7/2$，$2q-1=4 \implies q=5/2$。
2. **计算 $B(7/2, 5/2)$**：
   $B(7/2, 5/2) = \frac{\Gamma(7/2)\Gamma(5/2)}{\Gamma(6)} = \frac{\frac{15\sqrt{\pi}}{8} \cdot \frac{3\sqrt{\pi}}{4}}{120}$
   $= \frac{45\pi/32}{120} = \frac{3\pi}{256}$。
3. **结果**：
   原式 $= \frac{1}{2} \cdot \frac{3\pi}{256} = \frac{3\pi}{512}$。

</details>

### 练习 4：一致收敛性的反例判定
讨论 $I(y) = \int_0^\infty y e^{-xy} dx$ 在 $y \in (0, 1]$ 上的收敛性。

<details>
<summary>点击查看解析</summary>

**解析**：
1. **逐点收敛性**：
   对 $y > 0$，$I(y) = \int_0^\infty y e^{-xy} dx = [-e^{-xy}]_0^\infty = 1$。
2. **一致收敛性判定**：
   计算余项 $R(A, y) = \int_A^\infty y e^{-xy} dx = e^{-Ay}$。
   要一致收敛，需对任意 $\epsilon > 0$，存在 $A_0$ 使得当 $A > A_0$ 时，对于所有 $y \in (0, 1]$ 有 $e^{-Ay} < \epsilon$。
   然而，对于固定的 $A$，当 $y \to 0^+$ 时，$e^{-Ay} \to 1$。
   故不存在统一的 $A_0$。
**结论**：在 $(0, 1]$ 上**非一致收敛**。

</details>

---

<SupportingExercises
topic="含参量积分"
exercises={[
{ index: 52, title: "含参量广义积分 - 微分法计算", slug: "练习-52含参量广义积分" },
{ index: 53, title: "Dirichlet 积分推导", slug: "练习-53dirichlet积分" },
{ index: 54, title: "积分号下积分法 (Frullani 推广)", slug: "练习-54积分号下积分" },
{ index: 63, title: "Beta 函数与余元公式应用", slug: "练习-63beta函数余元公式" },
{ index: 64, title: "Weierstrass 一致收敛判定", slug: "练习-64一致收敛判定" }
]}
/>

---

_编者注：含参量积分是通往高等分析（如复变函数、泛函分析）的桥梁。掌握它，意味着你掌握了通过“构造参数”来降维打击复杂问题的核心数学思想。_
