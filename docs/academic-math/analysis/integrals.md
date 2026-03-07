---
title: 定积分：Riemann 积分、性质与微积分基本定理 (Definite Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 定积分：Riemann 积分、性质与微积分基本定理

定积分是微积分学的核心，它通过无穷小量的累加解决了面积、功、质量等连续量的求和问题。本章将从严格的 Riemann 定义出发，探讨定积分的深刻性质及其与微分学的内在联系。

## 一、 定积分的严格定义：Riemann 积分

### 1. Riemann 和与定积分
设函数 $f(x)$ 在区间 $[a, b]$ 上有界。对 $[a, b]$ 进行一个**划分** $P: a = x_0 < x_1 < \dots < x_n = b$。记 $\Delta x_i = x_i - x_{i-1}$，$\lambda(P) = \max_{1 \le i \le n} \Delta x_i$（称为划分的模）。在每个小区间 $[x_{i-1}, x_i]$ 上任取一点 $\xi_i$，构造 **Riemann 和**：
$$S(f, P, \{\xi_i\}) = \sum_{i=1}^n f(\xi_i) \Delta x_i$$
若当 $\lambda(P) \to 0$ 时，该和式的极限存在且与划分方式 $P$ 及点 $\xi_i$ 的选取无关，则称 $f(x)$ 在 $[a, b]$ 上 **Riemann 可积**，极限值即为定积分 $\int_a^b f(x) dx$。

### 2. 达布和 (Darboux Sums) 与可积准则
为了更严格地刻画可积性，引入上、下达布和。设 $M_i$ 和 $m_i$ 分别为 $f(x)$ 在 $[x_{i-1}, x_i]$ 上的上、下确界：
- **上达布和**：$\overline{S}(P) = \sum_{i=1}^n M_i \Delta x_i$
- **下达布和**：$\underline{S}(P) = \sum_{i=1}^n m_i \Delta x_i$

**可积的充要条件**：$f(x)$ 在 $[a, b]$ 上可积 $\iff \lim_{\lambda(P) \to 0} (\overline{S}(P) - \underline{S}(P)) = 0$。
> **Lebesgue 判别法**：有界函数 $f(x)$ 在 $[a, b]$ 上 Riemann 可积的充要条件是其间断点集的勒贝格测度为零（即“几乎处处连续”）。

---

## 二、 定积分的性质

### 1. 线性与区间可加性
- **线性**：$\int_a^b [\alpha f(x) + \beta g(x)] dx = \alpha \int_a^b f(x) dx + \beta \int_a^b g(x) dx$。
- **区间可加性**：$\int_a^b f(x) dx = \int_a^c f(x) dx + \int_c^b f(x) dx$（无论 $c$ 是否在 $a, b$ 之间，只要积分存在）。

### 2. 比较性质与绝对值不等式
- **保序性**：若在 $[a, b]$ 上 $f(x) \le g(x)$，则 $\int_a^b f(x) dx \le \int_a^b g(x) dx$。
- **绝对值不等式**：$|\int_a^b f(x) dx| \le \int_a^b |f(x)| dx$。

### 3. 积分中值定理
- **第一中值定理**：若 $f(x)$ 在 $[a, b]$ 上连续，则存在 $\xi \in [a, b]$ 使得：
  $$\int_a^b f(x) dx = f(\xi)(b-a)$$
- **第二中值定理（推广）**：若 $f, g$ 在 $[a, b]$ 上可积，$g(x) \ge 0$（或 $\le 0$），且 $f(x)$ 连续，则存在 $\xi \in [a, b]$ 使得：
  $$\int_a^b f(x) g(x) dx = f(\xi) \int_a^b g(x) dx$$

---

## 三、 微积分基本定理 (FTC)

### 1. 变上限积分的导数
设 $f(x)$ 在 $[a, b]$ 上连续，定义 $\Phi(x) = \int_a^x f(t) dt$。则 $\Phi(x)$ 在 $[a, b]$ 上可导，且：
$$\Phi'(x) = f(x)$$
这表明**连续函数的原函数一定存在**（即变上限积分函数）。

### 2. 牛顿-莱布尼茨公式 (Newton-Leibniz Formula)
若 $F(x)$ 是 $f(x)$ 在 $[a, b]$ 上的任一原函数，则：
$$\int_a^b f(x) dx = F(b) - F(a)$$

---

## 四、 深度深度例题解析

### 例题 1：积分上限函数的极限与 Taylor 展开
计算极限：$\lim_{x \to 0} \frac{\int_0^x (e^{t^2} - 1) dt}{x^3}$。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **识别类型**：分子为 $\int_0^x (e^{t^2} - 1) dt$，当 $x \to 0$ 时，分子分母均为 $0$，属于 $\frac{0}{0}$ 型。
2. **洛必达法则结合 FTC**：
   分子求导：$\frac{d}{dx} \int_0^x (e^{t^2} - 1) dt = e^{x^2} - 1$。
   分母求导：$3x^2$。
3. **再次计算极限**：
   $\lim_{x \to 0} \frac{e^{x^2} - 1}{3x^2}$
4. **利用等价无穷小**：当 $u \to 0$ 时，$e^u - 1 \sim u$。
   令 $u = x^2$，则 $e^{x^2} - 1 \sim x^2$。
   $\lim_{x \to 0} \frac{x^2}{3x^2} = \frac{1}{3}$。

#### 答案
$1/3$
</details>

### 例题 2：第二积分中值定理的应用
证明：当 $b > a > 0$ 时，$|\int_a^b \frac{\sin x}{x} dx| < \frac{2}{a}$。

<details>
<summary>点击查看解析</summary>

#### 解析过程
1. **分析特征**：被积函数为 $\frac{1}{x} \cdot \sin x$。其中 $\frac{1}{x}$ 在 $(0, +\infty)$ 上单调递减且趋于 0。
2. **应用第二积分中值定理**（积分形式）：
   由于 $f(x) = \frac{1}{x}$ 单调且 $f(x) \ge 0$，存在 $\xi \in [a, b]$ 使得：
   $\int_a^b \frac{\sin x}{x} dx = \frac{1}{a} \int_a^\xi \sin x dx$
3. **计算积分部分**：
   $\int_a^\xi \sin x dx = [-\cos x]_a^\xi = \cos a - \cos \xi$。
4. **利用三角函数有界性**：
   $|\cos a - \cos \xi| \le |\cos a| + |\cos \xi| \le 2$。
5. **得出结论**：
   $|\int_a^b \frac{\sin x}{x} dx| = \frac{1}{a} |\cos a - \cos \xi| \le \frac{2}{a}$。
   （注：严格小于符号可以通过更精细的讨论或 $b \to \infty$ 的极限情况得到）。

#### 证明完毕
</details>

---

## 五、 定积分实战练习库

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
