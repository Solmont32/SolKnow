---
title: 定积分：无穷小累加的黎曼和 (Definite Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 定积分：无穷小累加的黎曼和

不定积分解决的是“已知导数求原函数”的代数问题，而定积分解决的则是“计算曲边梯形面积”等涉及无穷累加的几何与物理问题。这两者本互不相干，直到牛顿和莱布尼茨用一条伟大的公式将它们桥接在一起。

## 一、 定积分的核心理论

### 1. 黎曼积分 (Riemann Integral) 的定义
设函数 $f(x)$ 在区间 $[a, b]$ 上有界。在 $[a, b]$ 中任意插入 $n-1$ 个分点，将其分成 $n$ 个小区间，长度为 $\Delta x_i$。在每个小区间内任取一点 $\xi_i$，作乘积 $f(\xi_i)\Delta x_i$，并求和：
$$S = \sum_{i=1}^n f(\xi_i) \Delta x_i$$
记 $\lambda = \max\{\Delta x_i\}$。如果不论对 $[a, b]$ 怎样划分，也不论在小区间上点 $\xi_i$ 怎样选取，只要当 $\lambda \to 0$ 时，和 $S$ 的极限总存在且为 $I$，则称 $f(x)$ 在 $[a, b]$ 上可积，极限 $I$ 称为定积分，记作：
$$\int_a^b f(x) dx = \lim_{\lambda \to 0} \sum_{i=1}^n f(\xi_i) \Delta x_i$$

**几何意义**：定积分表示曲线 $y=f(x)$、$x$ 轴及直线 $x=a, x=b$ 围成的**代数和面积**（$x$ 轴上方为正，下方为负）。

### 2. 微积分基本定理 (Fundamental Theorem of Calculus)
这是微积分学中最重要的一座桥梁。
**第一基本定理（变上限积分）**：
若 $f(x)$ 在 $[a, b]$ 上连续，则变上限积分函数 $\Phi(x) = \int_a^x f(t) dt$ 在 $[a, b]$ 上可导，且：
$$\Phi'(x) = \frac{d}{dx} \int_a^x f(t) dt = f(x)$$

**第二基本定理（牛顿-莱布尼茨公式 Newton-Leibniz Formula）**：
若 $F(x)$ 是连续函数 $f(x)$ 在 $[a, b]$ 上的一个原函数，则：
$$\int_a^b f(x) dx = F(b) - F(a) = \left[ F(x) \right]_a^b$$

### 3. 定积分的计算技巧
- **换元法**：在定积分中换元时，**必须同时换积分上下限**。换元后无需再回代原来的变量。
- **分部积分法**：$\int_a^b u dv = \left[ uv \right]_a^b - \int_a^b v du$。
- **对称性法则**：
  若 $f(x)$ 为奇函数，则 $\int_{-a}^a f(x) dx = 0$。
  若 $f(x)$ 为偶函数，则 $\int_{-a}^a f(x) dx = 2 \int_0^a f(x) dx$。

### 4. 广义积分 (Improper Integrals)
当积分区间无限，或被积函数在区间内存在瑕点（趋于无穷）时，定积分推广为广义积分。
- **无穷区间**：$\int_a^{+\infty} f(x) dx = \lim_{b \to +\infty} \int_a^b f(x) dx$。
- **无界函数**（设 $a$ 为瑕点）：$\int_a^b f(x) dx = \lim_{\epsilon \to 0^+} \int_{a+\epsilon}^b f(x) dx$。
若极限存在则称积分**收敛**，否则称**发散**。

---

## 二、 定积分高阶实战解析

### 练习 1：利用定积分定义求数列极限
求极限：$\lim_{n \to \infty} (\frac{1}{n+1} + \frac{1}{n+2} + \dots + \frac{1}{n+n})$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
这是一种非常经典的降维打击。当数列通项呈现 $\frac{1}{n} \sum f(\frac{i}{n})$ 的形式时，可以直接转化为定积分。

1. **提取公因子 $\frac{1}{n}$**：
   原式 = $\lim_{n \to \infty} \frac{1}{n} (\frac{n}{n+1} + \frac{n}{n+2} + \dots + \frac{n}{n+n})$
2. **化为黎曼和的标准形式**：
   分子分母同除以 $n$：
   原式 = $\lim_{n \to \infty} \frac{1}{n} \sum_{i=1}^n \frac{1}{1 + \frac{i}{n}}$
3. **识别积分元素**：
   对比黎曼和 $\lim \sum f(\xi_i) \Delta x_i$：
   - 步长 $\Delta x = \frac{1}{n}$。
   - 积分区间为 $[0, 1]$。
   - 被积函数 $f(x) = \frac{1}{1+x}$。
4. **计算定积分**：
   原式 = $\int_0^1 \frac{1}{1+x} dx$
   $= \left[ \ln(1+x) \right]_0^1 = \ln 2 - \ln 1 = \ln 2$。

#### 答案
$\ln 2$
</details>

### 练习 2：绝对值与分段积分
计算定积分：$\int_0^3 |x^2 - 4| dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
遇到绝对值，必须先寻找使绝对值内部为 0 的点（零点），然后将积分区间拆分，从而去掉绝对值符号。

1. **寻找零点**：
   $x^2 - 4 = 0 \implies x = \pm 2$。
   在积分区间 $[0, 3]$ 内，零点为 $x = 2$。
2. **拆分区间与去绝对值**：
   - 在 $[0, 2]$ 上，$x^2 - 4 \le 0$，故 $|x^2 - 4| = 4 - x^2$。
   - 在 $[2, 3]$ 上，$x^2 - 4 \ge 0$，故 $|x^2 - 4| = x^2 - 4$。
3. **拆分积分**：
   $I = \int_0^2 (4 - x^2) dx + \int_2^3 (x^2 - 4) dx$
4. **分别计算**：
   - 第一部分：$\left[ 4x - \frac{1}{3}x^3 \right]_0^2 = (8 - \frac{8}{3}) - 0 = \frac{16}{3}$。
   - 第二部分：$\left[ \frac{1}{3}x^3 - 4x \right]_2^3 = (9 - 12) - (\frac{8}{3} - 8) = -3 - (-\frac{16}{3}) = -3 + \frac{16}{3} = \frac{7}{3}$。
5. **求和**：
   $I = \frac{16}{3} + \frac{7}{3} = \frac{23}{3}$。

#### 答案
$23/3$
</details>

### 练习 3：利用奇偶性与对称性化简
计算定积分：$\int_{-1}^1 \frac{x^3 + x \cos x + \sin^5 x}{\sqrt{1+x^2}} dx + \int_{-1}^1 \sqrt{1-x^2} dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
如果在考场上硬算第一项，必将陷入死胡同。必须对积分区间 $[-a, a]$ 保持极高的敏感度。

1. **分析第一项的奇偶性**：
   令 $f(x) = \frac{x^3 + x \cos x + \sin^5 x}{\sqrt{1+x^2}}$。
   计算 $f(-x)$：
   $f(-x) = \frac{(-x)^3 + (-x)\cos(-x) + (\sin(-x))^5}{\sqrt{1+(-x)^2}} = \frac{-x^3 - x\cos x - \sin^5 x}{\sqrt{1+x^2}} = -f(x)$。
   因为 $f(x)$ 是奇函数，且区间对称，故第一项积分**必定为 0**。
2. **计算第二项**：
   $I = \int_{-1}^1 \sqrt{1-x^2} dx$。
   **几何意义法（极推）**：$y = \sqrt{1-x^2}$ 表示上半圆 $x^2 + y^2 = 1, (y \ge 0)$。积分区间 $[-1, 1]$ 刚好覆盖整个上半圆。
   半圆面积 = $\frac{1}{2} \pi r^2 = \frac{1}{2} \pi (1)^2 = \frac{\pi}{2}$。
3. **合并结果**：
   $0 + \frac{\pi}{2} = \frac{\pi}{2}$。

#### 答案
$\pi/2$
</details>

### 练习 4：华里士公式 (Wallis' Formula)
求定积分：$\int_0^{\frac{\pi}{2}} \sin^6 x dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
对于形如 $\int_0^{\frac{\pi}{2}} \sin^n x dx$ 或 $\int_0^{\frac{\pi}{2}} \cos^n x dx$ 的积分，直接使用华里士公式（点火公式）是最高效的。

**华里士公式**：
$$I_n = \begin{cases} \frac{n-1}{n} \cdot \frac{n-3}{n-2} \dots \frac{1}{2} \cdot \frac{\pi}{2} & \text{当 } n \text{ 为偶数} \\ \frac{n-1}{n} \cdot \frac{n-3}{n-2} \dots \frac{2}{3} \cdot 1 & \text{当 } n \text{ 为奇数} \end{cases}$$

1. **判断奇偶**：本题中 $n = 6$，为偶数。
2. **应用公式**：
   $I_6 = \frac{5}{6} \cdot \frac{3}{4} \cdot \frac{1}{2} \cdot \frac{\pi}{2}$
3. **化简计算**：
   $I_6 = \frac{15}{48} \cdot \frac{\pi}{4} = \frac{5}{16} \cdot \frac{\pi}{4} = \frac{5\pi}{64}$。

#### 答案
$5\pi/64$
</details>

### 练习 5：广义积分的计算与敛散性
计算反常积分：$\int_1^{+\infty} \frac{1}{x(1+x)} dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
这是无穷区间的反常积分。

1. **转化为极限形式**：
   $I = \lim_{b \to +\infty} \int_1^b \frac{1}{x(1+x)} dx$。
2. **被积函数裂项**：
   $\frac{1}{x(1+x)} = \frac{1}{x} - \frac{1}{1+x}$。
3. **计算不定积分部分**：
   $\int (\frac{1}{x} - \frac{1}{1+x}) dx = \ln|x| - \ln|1+x| = \ln \frac{x}{1+x}$。
4. **代入上下限求定积分**：
   $\int_1^b \frac{1}{x(1+x)} dx = \left[ \ln \frac{x}{1+x} \right]_1^b = \ln \frac{b}{1+b} - \ln \frac{1}{2} = \ln \frac{b}{1+b} + \ln 2$。
5. **求无穷极限**：
   $I = \lim_{b \to +\infty} (\ln \frac{b}{1+b} + \ln 2)$。
   因为 $\lim_{b \to +\infty} \frac{b}{1+b} = 1$，且 $\ln 1 = 0$。
   所以 $I = 0 + \ln 2 = \ln 2$。
6. **结论**：该反常积分收敛，值为 $\ln 2$。

#### 答案
收敛，值为 $\ln 2$。
</details>
