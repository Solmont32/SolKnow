---
title: 定积分：Riemann 积分、性质与微积分基本定理 (Definite Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 定积分：Riemann 积分、性质与微积分基本定理

定积分是微积分学的核心，它通过无穷小量的累加解决了面积、功、质量等连续量的求和问题。本章将从严格的 Riemann 定义出发，引入达布大和理论，探讨定积分的深刻性质及其与微分学的内在联系。

---

## 一、 定积分的严格理论：Riemann 积分与 Darboux 和

### 1. Riemann 积分的严格定义

设函数 $f(x)$ 在区间 $[a, b]$ 上有界。对 $[a, b]$ 进行一个**划分** $P: a = x_0 < x_1 < \dots < x_n = b$。记 $\Delta x_i = x_i - x_{i-1}$，$\lambda(P) = \max_{1 \le i \le n} \Delta x_i$（称为划分的模）。在每个小区间 $[x_{i-1}, x_i]$ 上任取一点 $\xi_i$，构造 **Riemann 和**：

$$S(f, P, \{\xi_i\}) = \sum_{i=1}^n f(\xi_i) \Delta x_i$$

**定义 ($\epsilon-\delta$ 语言)**：
称 $f$ 在 $[a, b]$ 上 **Riemann 可积**，若存在常数 $I$，使得对于任意 $\epsilon > 0$，总存在 $\delta > 0$，使得对于 $[a, b]$ 的任一划分 $P$ 及任一介点集 $\{\xi_i\}$，只要 $\lambda(P) < \delta$，就有：

$$| \sum_{i=1}^n f(\xi_i) \Delta x_i - I | < \epsilon$$

此时称 $I$ 为 $f$ 在 $[a, b]$ 上的定积分，记作 $I = \int_a^b f(x) dx$。

> **必要条件**：若 $f$ 在 $[a, b]$ 上可积，则 $f$ 在 $[a, b]$ 上必**有界**。
> _证明简述_：若 $f$ 无界，则在包含无界点的小区间内，可通过选取不同的 $\xi_i$ 使 Riemann 和趋于无穷，从而极限不存在。

### 2. 达布和 (Darboux Sums) 与可积准则

引入上、下达布和来摆脱介点 $\xi_i$ 的任意性。设 $M_i = \sup_{x \in [x_{i-1}, x_i]} f(x)$，$m_i = \inf_{x \in [x_{i-1}, x_i]} f(x)$：

- **上达布和**：$\overline{S}(P) = \sum_{i=1}^n M_i \Delta x_i$ （所有 Riemann 和的上确界）
- **下达布和**：$\underline{S}(P) = \sum_{i=1}^n m_i \Delta x_i$ （所有 Riemann 和的下确界）

**达布和的性质**：

1. **添加分点**：若 $P' \supset P$（$P'$ 是 $P$ 的加细），则 $\underline{S}(P) \le \underline{S}(P')$ 且 $\overline{S}(P') \le \overline{S}(P)$。
2. **基本不等式**：对任意划分 $P_1, P_2$，恒有 $\underline{S}(P_1) \le \overline{S}(P_2)$。
3. **上、下积分**：定义上积分 $\overline{I} = \inf_P \overline{S}(P)$，下积分 $\underline{I} = \sup_P \underline{S}(P)$。恒有 $\underline{I} \le \overline{I}$。

**可积充要条件 (Riemann 准则)**：
$f$ 在 $[a, b]$ 上可积 $\iff \underline{I} = \overline{I}$ $\iff \forall \epsilon > 0, \exists P$ 使得 $\overline{S}(P) - \underline{S}(P) < \epsilon$。

---

## 二、 定积分的核心性质 (8+ 典型性质)

### 1. 线性与区间可加性

- **线性**：$\int_a^b [\alpha f(x) + \beta g(x)] dx = \alpha \int_a^b f(x) dx + \beta \int_a^b g(x) dx$。
- **区间可加性**：$\int_a^b f(x) dx = \int_a^c f(x) dx + \int_c^b f(x) dx$。

### 2. 比较性质与绝对值不等式

- **保序性**：若 $f(x) \le g(x)$，则 $\int_a^b f(x) dx \le \int_a^b g(x) dx$。
- **绝对值不等式**：$|\int_a^b f(x) dx| \le \int_a^b |f(x)| dx$。

### 3. 积分中值定理 (MVT)

- **第一中值定理**：若 $f$ 连续，$g$ 不变号且可积，则 $\exists \xi \in [a, b]$ 满足 $\int_a^b f(x)g(x)dx = f(\xi)\int_a^b g(x)dx$。
- **第二中值定理 (Bonnet 形式)**：若 $f$ 单调，$g$ 可积，则 $\exists \xi \in [a, b]$ 使得 $\int_a^b f(x)g(x)dx = f(a)\int_a^\xi g(x)dx + f(b)\int_\xi^b g(x)dx$。

### 4. 变上限积分的连续性与可导性

设 $f \in R[a, b]$，定义 $\Phi(x) = \int_a^x f(t) dt$。

- **性质**：$\Phi(x)$ 在 $[a, b]$ 上**一致连续**。
- **性质**：若 $f$ 在 $x_0$ 处连续，则 $\Phi(x)$ 在 $x_0$ 处可导且 $\Phi'(x_0) = f(x_0)$。

### 5. 积分形式的 Schwarz 不等式

若 $f, g$ 在 $[a, b]$ 上可积，则：

$$\left( \int_a^b f(x)g(x) dx \right)^2 \le \left( \int_a^b f^2(x) dx \right) \left( \int_a^b g^2(x) dx \right)$$

### 6. 变量代换公式

若 $\phi: [\alpha, \beta] \to [a, b]$ 是 $C^1$ 的且 $\phi(\alpha)=a, \phi(\beta)=b$，则：

$$\int_a^b f(x) dx = \int_\alpha^\beta f(\phi(t)) \phi'(t) dt$$

### 7. 分部积分公式

若 $u(x), v(x)$ 在 $[a, b]$ 上有连续导数，则：

$$\int_a^b u dv = [uv]_a^b - \int_a^b v du$$

### 8. 强保序性

若 $f, g \in R[a, b]$，$f(x) \le g(x)$ 且在某点 $x_0$ 处连续且 $f(x_0) < g(x_0)$，则 $\int_a^b f(x) dx < \int_a^b g(x) dx$。

---

## 三、 微积分基本定理 (FTC) 与多维透视

### 1. 牛顿-莱布尼茨公式

若 $f \in C[a, b]$，且 $F$ 是 $f$ 的任一原函数，则：

$$\int_a^b f(x) dx = F(b) - F(a)$$

这是连接“微分”（局部变化率）与“积分”（整体累积量）的桥梁。

### 2. 多维透视：广义 Stokes 公式

在更高维的视角下，FTC 只是**广义 Stokes 公式**的 1 维特例：

$$\int_\Omega d\omega = \int_{\partial \Omega} \omega$$

- **1 维 (FTC)**：$\Omega = [a, b]$，边界 $\partial \Omega = \{a, b\}$，微分形式 $\omega = F$。
- **2 维 (Green 公式)**：将区域积分与其边界（曲线）积分联系起来。
- **3 维 (Gauss/Stokes)**：将体积分与面积分、面积分与线积分联系起来。
  这种“边界上的信息决定内部整体”的哲学是整个现代分析的基础。

---

## 四、 深度例题解析 (补充至 8+ 典型)

### 例题 1：变限积分求导与极限

计算 $\lim_{x \to 0} \frac{1}{x^4} \int_0^x \sin(t^3) dt$。

<details>

<summary>解析</summary>

利用 L'Hôpital 法则结合 FTC：
$\lim_{x \to 0} \frac{\frac{d}{dx} \int_0^x \sin(t^3) dt}{4x^3} = \lim_{x \to 0} \frac{\sin(x^3)}{4x^3}$。
利用等价无穷小 $\sin u \sim u$ ($u \to 0$)：
$\lim_{x \to 0} \frac{x^3}{4x^3} = \frac{1}{4}$。

</details>

### 例题 2：定积分定义求数列极限

求 $\lim_{n \to \infty} \sum_{k=1}^n \frac{n}{n^2 + k^2}$。

<details>

<summary>解析</summary>

化为黎曼和形式：$\sum_{k=1}^n \frac{1}{n} \cdot \frac{1}{1 + (k/n)^2}$。
识别为 $f(x) = \frac{1}{1+x^2}$ 在 $[0, 1]$ 上的定积分：
$I = \int_0^1 \frac{1}{1+x^2} dx = [\arctan x]_0^1 = \frac{\pi}{4}$。

</details>

### 例题 3：利用对称性（区间转换）

计算 $I = \int_0^{\pi/2} \frac{\sin x}{\sin x + \cos x} dx$。

<details>

<summary>解析</summary>

令 $u = \pi/2 - x$，则 $dx = -du$，且 $\sin x = \cos u, \cos x = \sin u$。
$I = \int_{\pi/2}^0 \frac{\cos u}{\cos u + \sin u} (-du) = \int_0^{\pi/2} \frac{\cos x}{\sin x + \cos x} dx$。
$2I = \int_0^{\pi/2} \frac{\sin x + \cos x}{\sin x + \cos x} dx = \int_0^{\pi/2} 1 dx = \frac{\pi}{2}$。
故 $I = \pi/4$。

</details>

### 例题 4：定积分不等式证明

证明：对于 $f \in C[0, 1]$，若 $f(x) > 0$，则 $\int_0^1 f(x) dx \cdot \int_0^1 \frac{1}{f(x)} dx \ge 1$。

<details>

<summary>解析</summary>

应用 **积分形式的 Schwarz 不等式**：
令 $g(x) = \sqrt{f(x)}$，$h(x) = \frac{1}{\sqrt{f(x)}}$。
则 $(\int_0^1 g(x)h(x) dx)^2 \le \int_0^1 g^2(x) dx \cdot \int_0^1 h^2(x) dx$。
左边：$(\int_0^1 1 dx)^2 = 1^2 = 1$。
右边：$\int_0^1 f(x) dx \cdot \int_0^1 \frac{1}{f(x)} dx$。
故结论成立。

</details>

### 例题 5：周期函数的积分

设 $f(x)$ 是以 $T$ 为周期的连续函数，证明 $\int_a^{a+T} f(x) dx = \int_0^{T} f(x) dx$。

<details>

<summary>解析</summary>

$\int_a^{a+T} f(x) dx = \int_a^0 f(x) dx + \int_0^T f(x) dx + \int_T^{a+T} f(x) dx$。
对第三项令 $x = u + T$，则 $dx = du$。
$\int_T^{a+T} f(x) dx = \int_0^a f(u+T) du$。
由于周期性 $f(u+T) = f(u)$，故该项为 $\int_0^a f(u) du = -\int_a^0 f(x) dx$。
首尾两项抵消，得证。

</details>

### 例题 6：Wallis 公式与点火公式的深度应用

计算 $I = \int_0^\pi x \sin^6 x dx$。

<details>

<summary>解析</summary>

1. **利用对称性消去 x**：
   利用性质 $\int_0^a f(x) dx = \int_0^a f(a-x) dx$，
   $I = \int_0^\pi (\pi-x) \sin^6(\pi-x) dx = \pi \int_0^\pi \sin^6 x dx - I$。
   $2I = \pi \int_0^\pi \sin^6 x dx = 2\pi \int_0^{\pi/2} \sin^6 x dx$。
   $I = \pi \int_0^{\pi/2} \sin^6 x dx$。
2. **套用 Wallis 公式 (点火公式)**：
   $I = \pi \cdot \frac{5}{6} \cdot \frac{3}{4} \cdot \frac{1}{2} \cdot \frac{\pi}{2} = \frac{5\pi^2}{32}$。

</details>

### 例题 7：Euler 积分 $\int_0^{\pi/2} \ln(\sin x) dx$

计算 $I = \int_0^{\pi/2} \ln(\sin x) dx$。

<details>

<summary>解析</summary>

1. **对称性**：$I = \int_0^{\pi/2} \ln(\cos x) dx$。
2. **合并**：$2I = \int_0^{\pi/2} \ln(\sin x \cos x) dx = \int_0^{\pi/2} \ln(\frac{\sin 2x}{2}) dx$。
   $2I = \int_0^{\pi/2} \ln(\sin 2x) dx - \int_0^{\pi/2} \ln 2 dx = \int_0^{\pi/2} \ln(\sin 2x) dx - \frac{\pi}{2} \ln 2$。
3. **换元**：令 $2x = u$，则 $\int_0^{\pi/2} \ln(\sin 2x) dx = \frac{1}{2} \int_0^{\pi} \ln(\sin u) du = \int_0^{\pi/2} \ln(\sin u) du = I$。
4. **解方程**：$2I = I - \frac{\pi}{2} \ln 2 \implies I = -\frac{\pi}{2} \ln 2$。

</details>

### 例题 8：区间平移与对称性的妙用

计算 $I = \int_0^{\pi} \frac{x \sin x}{1 + \cos^2 x} dx$。

<details>

<summary>解析</summary>

1. **消去 x**：令 $x = \pi - t$，则 $I = \int_0^\pi \frac{(\pi-t)\sin t}{1+\cos^2 t} dt = \pi \int_0^\pi \frac{\sin t}{1+\cos^2 t} dt - I$。
   $2I = \pi \int_0^\pi \frac{\sin t}{1+\cos^2 t} dt$。
2. **凑微分积分**：令 $u = \cos t, du = -\sin t dt$。
   $2I = \pi \int_1^{-1} \frac{-du}{1+u^2} = \pi \int_{-1}^1 \frac{du}{1+u^2} = \pi [\arctan u]_{-1}^1 = \pi (\frac{\pi}{4} - (-\frac{\pi}{4})) = \frac{\pi^2}{2}$。
   $I = \pi^2/4$。

</details>

### 例题 9：分段函数的定积分

计算 $\int_0^2 f(x) dx$，其中 $f(x) = \min\{x, x^2\}$。

<details>

<summary>解析</summary>

1. **比较大小**：
   在 $[0, 1]$ 上，$x^2 \le x$，故 $f(x) = x^2$。
   在 $[1, 2]$ 上，$x \le x^2$，故 $f(x) = x$。
2. **分段积分**：
   $I = \int_0^1 x^2 dx + \int_1^2 x dx = [\frac{1}{3}x^3]_0^1 + [\frac{1}{2}x^2]_1^2 = \frac{1}{3} + (2 - \frac{1}{2}) = \frac{1}{3} + \frac{3}{2} = \frac{11}{6}$。

</details>

### 例题 10：利用导数定义的积分构造

计算 $I = \int_0^{\pi/2} \frac{\sin^n x}{\sin^n x + \cos^n x} dx$。

<details>

<summary>解析</summary>

利用余元公式 $x \to \pi/2-x$：
$I = \int_0^{\pi/2} \frac{\cos^n x}{\cos^n x + \sin^n x} dx$。
$2I = \int_0^{\pi/2} \frac{\sin^n x + \cos^n x}{\sin^n x + \cos^n x} dx = \pi/2 \implies I = \pi/4$。
注意：结果与 $n$ 无关。

</details>

### 例题 11：黎曼引理 (Riemann-Lebesgue Lemma) 的初步应用

证明 $\lim_{n \to \infty} \int_a^b f(x) \sin(nx) dx = 0$ ($f$ 在 $[a, b]$ 上可积)。

<details>

<summary>解析（概要）</summary>

1. **阶梯函数逼近**：先对常数函数证明，再推广到阶梯函数。
2. **逼近定理**：利用连续函数或可积函数可用阶梯函数一致逼近的性质。
   这是傅里叶级数收敛性的理论基础。

</details>

### 例题 12：含参变量积分的简单应用（Lebesgue 控制收敛预览）

计算 $\lim_{n \to \infty} \int_0^1 \frac{nx^{n-1}}{1+x} dx$。

<details>

<summary>解析</summary>

1. **分部积分**：
   $\int_0^1 \frac{1}{1+x} d(x^n) = [\frac{x^n}{1+x}]_0^1 + \int_0^1 \frac{x^n}{(1+x)^2} dx = \frac{1}{2} + \int_0^1 \frac{x^n}{(1+x)^2} dx$。
2. **夹逼准则**：
   $0 < \int_0^1 \frac{x^n}{(1+x)^2} dx < \int_0^1 x^n dx = \frac{1}{n+1} \to 0$。
3. **结论**：极限为 $1/2$。

</details>

---

<SupportingExercises
topic="定积分"
fileId="analysis-integral-calculus"
exercises={[
{ index: 9.1, title: "利用对称性简化定积分", slug: "练习-91利用对称性简化定积分" },
{ index: 9.2, title: "Wallis 公式与极限", slug: "练习-92wallis-公式与极限" },
{ index: 9.3, title: "第一中值定理应用", slug: "练习-93第一中值定理的推广应用" }
]}
/>

---

_编者注：定积分是寻找黎曼和极限的过程。掌握了微积分基本定理，你就掌握了连接导数与积分的桥梁。_
