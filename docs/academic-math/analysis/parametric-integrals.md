---
title: 含参量积分与含参量反常积分 (Parametric Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 含参量积分与含参量反常积分

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
若边界 $a(y)$ 和 $b(y)$ 也是 $y$ 的函数，则 Leibniz 公式推广为：
$$\frac{d}{dy} \int_{a(y)}^{b(y)} f(x, y) dx = f(b(y), y) b'(y) - f(a(y), y) a'(y) + \int_{a(y)}^{b(y)} \frac{\partial f(x, y)}{\partial y} dx$$

---

## 二、 含参量反常积分 (Improper Parametric Integrals)

设 $f(x, y)$ 定义在 $a \le x < +\infty, c \le y \le d$ 上。若对每个固定的 $y$，反常积分 $\int_a^{+\infty} f(x, y) dx$ 都收敛，则定义了含参量反常积分：
$$I(y) = \int_a^{+\infty} f(x, y) dx$$

### 1. 一致收敛性 (Uniform Convergence)
这是处理含参量反常积分性质的核心概念。
**定义**：称 $I(y)$ 在 $[c, d]$ 上**一致收敛**，如果对于任意 $\epsilon > 0$，存在一个只与 $\epsilon$ 有关而与 $y$ 无关的 $A_0 > a$，使得当 $A > A_0$ 时，对所有 $y \in [c, d]$ 均有：
$$\left| \int_A^{+\infty} f(x, y) dx \right| < \epsilon$$

### 2. 判别法
- **Weierstrass 判别法 (M-判别法)**：若存在 $M(x)$ 使得 $|f(x, y)| \le M(x)$ 且 $\int_a^{+\infty} M(x) dx$ 收敛，则 $I(y)$ 一致收敛。
- **Dirichlet 判别法**：若 $\int_a^A f(x, y) dx$ 对 $A$ 和 $y$ 一致有界，且 $g(x, y)$ 关于 $x$ 单调且当 $x \to +\infty$ 时对 $y$ 一致趋于 0，则 $\int_a^{+\infty} f(x, y) g(x, y) dx$ 一续收敛。
- **Abel 判别法**：若 $\int_a^{+\infty} f(x, y) dx$ 一致收敛，且 $g(x, y)$ 关于 $x$ 单调且对 $x, y$ 一致有界，则 $\int_a^{+\infty} f(x, y) g(x, y) dx$ 一致收敛。

### 3. 分析性质 (一致收敛条件下)
在一一致收敛的条件下，含参量反常积分同样具有**连续性**、**可积性**（积分号交换）和**可微性**（Leibniz 公式）。

---

## 三、 核心计算技巧

1. **利用 Leibniz 公式求导**：这是解决含参量积分最常用的方法。通过对参数求导，将被积函数化简，求出导函数后再积分回去（需确定常数 $C$）。
2. **积分号下积分**：利用 $\int_c^d dy \int_a^b f(x, y) dx = \int_a^b dx \int_c^d f(x, y) dy$ 交换积分顺序。
3. **利用特殊函数**：
   - **Gamma 函数**：$\Gamma(s) = \int_0^{+\infty} x^{s-1} e^{-x} dx$
   - **Beta 函数**：$B(p, q) = \int_0^1 x^{p-1} (1-x)^{q-1} dx$

---

## 四、 深度例题解析

### 例题 1：Dirichlet 积分的计算
计算积分：$I = \int_0^{+\infty} \frac{\sin x}{x} dx$。

<details>
<summary>点击查看详细解析</summary>

#### 解析过程
这是一个经典的应用含参量积分解决问题的例子。我们引入参量 $y \ge 0$，构造辅助函数：
$$I(y) = \int_0^{+\infty} e^{-yx} \frac{\sin x}{x} dx$$
我们需要求的是 $I(0)$。

1. **求导**：
   利用 Leibniz 公式（需验证一致收敛性）：
   $$I'(y) = \frac{d}{dy} \int_0^{+\infty} e^{-yx} \frac{\sin x}{x} dx = \int_0^{+\infty} \frac{\partial}{\partial y} (e^{-yx} \frac{\sin x}{x}) dx = - \int_0^{+\infty} e^{-yx} \sin x dx$$
2. **计算 $I'(y)$**：
   通过两次分部积分可得：
   $$\int e^{-yx} \sin x dx = -\frac{e^{-yx}(y \sin x + \cos x)}{y^2 + 1}$$
   代入上下限：
   $$I'(y) = -\left[ \frac{1}{y^2+1} \right] = -\frac{1}{y^2+1}$$
3. **求 $I(y)$**：
   $$I(y) = \int -\frac{1}{y^2+1} dy = -\arctan y + C$$
4. **确定常数 $C$**：
   由于 $\left| \int_0^{+\infty} e^{-yx} \frac{\sin x}{x} dx \right| \le \int_0^{+\infty} e^{-yx} dx = \frac{1}{y}$，当 $y \to +\infty$ 时，$I(y) \to 0$。
   $$0 = -\frac{\pi}{2} + C \implies C = \frac{\pi}{2}$$
   故 $I(y) = \frac{\pi}{2} - \arctan y$。
5. **求结果**：
   令 $y=0$（根据连续性，$I(y)$ 在 $y=0$ 处右连续）：
   $$I(0) = \frac{\pi}{2} - \arctan 0 = \frac{\pi}{2}$$

#### 答案
$\pi/2$
</details>

### 例题 2：概率积分与含参量求导
计算积分：$I(a) = \int_0^{+\infty} e^{-x^2} \cos(2ax) dx$。

<details>
<summary>点击查看详细解析</summary>

#### 解析过程
1. **求导**：
   $$I'(a) = \int_0^{+\infty} -2x e^{-x^2} \sin(2ax) dx$$
2. **利用分部积分**：
   令 $u = \sin(2ax), dv = -2x e^{-x^2} dx \implies du = 2a \cos(2ax) dx, v = e^{-x^2}$。
   $$I'(a) = [\sin(2ax) e^{-x^2}]_0^{+\infty} - \int_0^{+\infty} 2a \cos(2ax) e^{-x^2} dx$$
   $$I'(a) = 0 - 2a I(a)$$
3. **解微分方程**：
   $$\frac{dI}{I} = -2a da \implies \ln I = -a^2 + C_1 \implies I(a) = C e^{-a^2}$$
4. **确定常数 $C$**：
   令 $a=0$，$I(0) = \int_0^{+\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$（高斯积分）。
   $$C = \frac{\sqrt{\pi}}{2}$$
   故 $I(a) = \frac{\sqrt{\pi}}{2} e^{-a^2}$。

#### 答案
$\frac{\sqrt{\pi}}{2} e^{-a^2}$
</details>

---

## 五、 综合练习题

### 练习 1：利用积分号下积分
计算积分：$\int_0^1 \frac{x^b - x^a}{\ln x} dx \quad (b > a > 0)$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
注意到 $\frac{x^b - x^a}{\ln x} = \int_a^b x^y dy$。
原式 $= \int_0^1 \left( \int_a^b x^y dy \right) dx = \int_a^b \left( \int_0^1 x^y dx \right) dy$
$= \int_a^b \left[ \frac{x^{y+1}}{y+1} \right]_0^1 dy = \int_a^b \frac{1}{y+1} dy$
$= \ln(b+1) - \ln(a+1) = \ln \frac{b+1}{a+1}$。

#### 答案
$\ln \frac{b+1}{a+1}$
</details>

### 练习 2：Froullani 积分
计算积分：$\int_0^{+\infty} \frac{\arctan ax - \arctan bx}{x} dx \quad (a, b > 0)$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
这是一个典型的 Froullani 积分形式 $\int_0^{+\infty} \frac{f(ax) - f(bx)}{x} dx$。
若 $f(+\infty)$ 和 $f(0)$ 均存在，则结果为 $(f(+\infty) - f(0)) \ln \frac{a}{b}$。
对于 $f(x) = \arctan x$：
$f(+\infty) = \frac{\pi}{2}, f(0) = 0$。
故 $I = (\frac{\pi}{2} - 0) \ln \frac{a}{b} = \frac{\pi}{2} \ln \frac{a}{b}$。

#### 答案
$\frac{\pi}{2} \ln \frac{a}{b}$
</details>

### 练习 3：积分号下求导进阶
计算：$\int_0^{\pi} \ln(1 - 2a \cos x + a^2) dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
设 $I(a) = \int_0^{\pi} \ln(1 - 2a \cos x + a^2) dx$。
1. **求导**：
   $I'(a) = \int_0^{\pi} \frac{2a - 2\cos x}{1 - 2a \cos x + a^2} dx$。
2. **利用半角代换或特殊技巧计算该积分**：
   当 $|a| < 1$ 时，$I'(a) = 0 \implies I(a) = I(0) = \int_0^{\pi} \ln 1 dx = 0$。
   当 $|a| > 1$ 时，$I'(a) = \frac{2\pi}{a} \implies I(a) = 2\pi \ln |a| + C$。
   利用对称性或极限情况可得 $C=0$。
3. **结论**：
   $I(a) = \begin{cases} 0, & |a| \le 1 \\ 2\pi \ln |a|, & |a| > 1 \end{cases}$。

#### 答案
$|a| \le 1$ 时为 $0$；$|a| > 1$ 时为 $2\pi \ln |a|$
</details>
