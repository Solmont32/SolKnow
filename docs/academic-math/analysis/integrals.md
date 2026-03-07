---
title: 定积分：Riemann 积分、性质与微积分基本定理 (Definite Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

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
> *证明简述*：若 $f$ 无界，则在包含无界点的小区间内，可通过选取不同的 $\xi_i$ 使 Riemann 和趋于无穷，从而极限不存在。

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
设 $f(x)$ 是以 $T$ 为周期的连续函数，证明 $\int_a^{a+T} f(x) dx = \int_0^T f(x) dx$。

<details>
<summary>解析</summary>
$\int_a^{a+T} f(x) dx = \int_a^0 f(x) dx + \int_0^T f(x) dx + \int_T^{a+T} f(x) dx$。
对第三项令 $x = u + T$，则 $dx = du$。
$\int_T^{a+T} f(x) dx = \int_0^a f(u+T) du$。
由于周期性 $f(u+T) = f(u)$，故该项为 $\int_0^a f(u) du = -\int_a^0 f(x) dx$。
首尾两项抵消，得证。
</details>

---

## 五、 练习库同步 (Analysis Exercise Sync)

### 练习 1：Wallis 公式应用
计算 $\int_0^{\pi} \sin^6 x dx$。
<details><summary>提示</summary>利用对称性等于 $2 \int_0^{\pi/2} \sin^6 x dx$，再应用点火公式：$2 \cdot \frac{5}{6} \cdot \frac{3}{4} \cdot \frac{1}{2} \cdot \frac{\pi}{2} = \frac{5\pi}{16}$。</details>

### 练习 2：导数关系辨析
设 $f(x)$ 连续，证明 $F(x) = \int_a^x f(t)(x-t) dt$ 的二阶导数 $F''(x) = f(x)$。
<details><summary>提示</summary>$F(x) = x \int_a^x f(t) dt - \int_a^x tf(t) dt$。求一阶导得 $\int_a^x f(t) dt + xf(x) - xf(x) = \int_a^x f(t) dt$。再求导即得 $f(x)$。</details>

### 练习 3：Dirichlet 函数的可积性
证明 Dirichlet 函数 $D(x) = \begin{cases} 1, & x \in \mathbb{Q} \\ 0, & x \notin \mathbb{Q} \end{cases}$ 在 $[0, 1]$ 上不可积。
<details><summary>提示</summary>对任一划分 $P$，$M_i = 1$，$m_i = 0$。故 $\overline{S}(P) = 1, \underline{S}(P) = 0$。上积分与下积分不相等。</details>

### 练习 4：绝对值函数积分
计算 $\int_{-2}^3 |x(x-1)| dx$。
<details><summary>提示</summary>分段积分：$[-2, 0]$ 上为 $x^2-x$，$[0, 1]$ 上为 $x-x^2$，$[1, 3]$ 上为 $x^2-x$。计算各段并求和。</details>

### 练习 5：积分中值定理的应用
证明 $\lim_{n \to \infty} \int_0^1 \frac{x^n}{1+x} dx = 0$。
<details><summary>提示</summary>$0 < \int_0^1 \frac{x^n}{1+x} dx < \int_0^1 x^n dx = \frac{1}{n+1}$。利用夹逼定理。</details>
