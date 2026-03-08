---
title: Riemann-Stieltjes 积分 (The Riemann-Stieltjes Integral)
description: 深入探讨 Riemann 积分的广义形式：引入测度函数 alpha(x)，统一离散与连续求和，包含 Darboux 和理论与严密证明。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# Riemann-Stieltjes 积分

Riemann 积分虽然强大，但在处理离散与连续混合分布、或者函数在某些点处具有“阶跃”性质时显得捉襟见肘。Riemann-Stieltjes (R-S) 积分通过引入“控制函数” $\alpha(x)$，将积分从单纯的面积累加升华为一种更广义的测度累加。

---

## 一、 R-S 积分的严密定义

### 1. Riemann 和定义 (The Riemann Sum Approach)

设 $f(x)$ 和 $\alpha(x)$ 是定义在 $[a, b]$ 上的有界函数。对于 $[a, b]$ 的任一划分 $P: a = x_0 < x_1 < \dots < x_n = b$，在每个小区间 $[x_{i-1}, x_i]$ 上任取一点 $\xi_i$，作和式：

$$S(P, f, \alpha) = \sum_{i=1}^n f(\xi_i) [\alpha(x_i) - \alpha(x_{i-1})]$$

若当划分的模 $\lambda(P) \to 0$ 时，该和式的极限存在且与划分 $P$ 及 $\xi_i$ 的选取无关，则称 $f$ 关于 $\alpha$ 在 $[a, b]$ 上是 **Riemann-Stieltjes 可积**的，记作 $f \in \mathcal{R}(\alpha)$。

### 2. Darboux 和定义 (The Darboux Sum Approach)

为了严谨判定可积性，我们引入上、下 Darboux-Stieltjes 和。设 $\alpha(x)$ 在 $[a, b]$ 上**单调增加**。令：
$M_i = \sup_{x \in [x_{i-1}, x_i]} f(x)$, $m_i = \inf_{x \in [x_{i-1}, x_i]} f(x)$，$\Delta \alpha_i = \alpha(x_i) - \alpha(x_{i-1})$。

- **上和**：$U(P, f, \alpha) = \sum M_i \Delta \alpha_i$
- **下和**：$L(P, f, \alpha) = \sum m_i \Delta \alpha_i$

**上、下积分**定义为：
$\overline{\int_a^b} f d\alpha = \inf_{P} U(P, f, \alpha)$, $\underline{\int_a^b} f d\alpha = \sup_{P} L(P, f, \alpha)$。

若二者相等，则称 $f \in \mathcal{R}(\alpha)$。

---

## 二、 核心性质与判别准则

### 1. 可积性的 Cauchy 准则

<KnowledgeCard type="info" title="定理：可积的充要条件">
设 $\alpha$ 单调增加。$f \in \mathcal{R}(\alpha)$ 当且仅当对任意 $\epsilon > 0$，存在划分 $P$ 使得：
$$U(P, f, \alpha) - L(P, f, \alpha) = \sum_{i=1}^n (M_i - m_i) \Delta \alpha_i < \epsilon$$
</KnowledgeCard>

### 2. 存在性定理

- **定理 1 (连续性)**：若 $f \in \mathcal{C}[a, b]$ 且 $\alpha$ 单调增加，则 $f \in \mathcal{R}(\alpha)$。
  - *证明简述*：利用 $f$ 在闭区间上的一致连续性，对任意 $\epsilon$，取 $\delta$ 使得 $\Delta x_i < \delta$ 时振幅 $\omega_i < \epsilon / (\alpha(b)-\alpha(a))$，则 $\sum \omega_i \Delta \alpha_i < \epsilon$。
- **定理 2 (单调性)**：若 $f$ 单调且 $\alpha \in \mathcal{C}[a, b]$ 且单调，则 $f \in \mathcal{R}(\alpha)$。
- **定理 3 (不可积判定)**：若 $f$ 与 $\alpha$ 在同一点 $c$ 处具有同侧不连续性，则 $f \notin \mathcal{R}(\alpha)$。

---

## 三、 计算与转换公式

### 1. 转换为 Riemann 积分 (Smooth Transformation)

若 $\alpha(x)$ 在 $[a, b]$ 上可积且其导数 $\alpha'(x)$ 是 Riemann 可积的，则：
$$\int_a^b f(x) d\alpha(x) = \int_a^b f(x) \alpha'(x) dx$$

### 2. 分部积分公式 (Integration by Parts)

<details>
<summary>点击查看分部积分公式的推导</summary>

**定理**：若 $f \in \mathcal{R}(\alpha)$，则 $\alpha \in \mathcal{R}(f)$，且：
$$\int_a^b f d\alpha + \int_a^b \alpha df = f(b)\alpha(b) - f(a)\alpha(a)$$

**证明**：
考虑划分 $P: a=x_0 < x_1 < \dots < x_n=b$ 和介点 $\xi_i \in [x_{i-1}, x_i]$。
$S(P, f, \alpha) = \sum_{i=1}^n f(\xi_i)[\alpha(x_i) - \alpha(x_{i-1})]$。
利用恒等式 $\sum a_i(b_i - b_{i-1}) = a_n b_n - a_0 b_0 - \sum b_{i-1}(a_i - a_{i-1})$ 进行变换：
$S(P, f, \alpha) = f(b)\alpha(b) - f(a)\alpha(a) - \sum_{i=1}^n \alpha(x_{i-1})[f(\xi_i) - f(\xi_{i-1})]$ （此处需细化介点与端点的对应）。
当 $\lambda(P) \to 0$ 时，右侧求和项趋于 $\int \alpha df$。证毕。

</details>

---

## 四、 阶梯函数与测度论视角

### 1. 阶梯函数积分公式

若 $\alpha(x)$ 是阶梯函数，在点 $c_k \in (a, b)$ 处有跳跃 $s_k = \alpha(c_k^+) - \alpha(c_k^-)$，且 $f$ 在 $c_k$ 处连续，则：
$$\int_a^b f d\alpha = \sum_k f(c_k) s_k$$

### 2. 概率论中的期望统一

若 $\alpha(x)$ 为随机变量 $X$ 的分布函数 $F(x)$，则 $X$ 的期望定义为：
$$E[X] = \int_{-\infty}^{+\infty} x dF(x)$$
这完美地将离散型（$F$ 为阶梯函数）和连续型（$F$ 可导）随机变量的期望公式合二为一。

---

## 五、 深度例题解析

### 例题 1：多点跳跃的阶梯函数
计算 $\int_0^3 x^2 d\lfloor x \rfloor$。
<details>
<summary>点击查看解析</summary>
$\alpha(x) = \lfloor x \rfloor$ 在 $x=1, 2, 3$ 处具有跳跃。注意 $\lfloor x \rfloor$ 是右连续的。
在 $x=1, 2$ 时，$\Delta \alpha = 1$。
在端点 $x=3$ 处，积分上限包含 $x=3$。
$\int_0^3 x^2 d\lfloor x \rfloor = 1^2 \cdot (\alpha(1)-\alpha(1^-)) + 2^2 \cdot (\alpha(2)-\alpha(2^-)) + 3^2 \cdot (\alpha(3)-\alpha(3^-))$
$= 1^2 \cdot 1 + 2^2 \cdot 1 + 3^2 \cdot 1 = 14$。
</details>

### 例题 2：复合测度计算
计算 $\int_0^2 x d(x^2 + \lfloor x \rfloor)$。
<details>
<summary>点击查看解析</summary>
利用线性性质：$\int x d(x^2) + \int x d\lfloor x \rfloor$。
1. $\int_0^2 x \cdot (2x) dx = \int_0^2 2x^2 dx = [\frac{2}{3}x^3]_0^2 = \frac{16}{3}$。
2. $\int_0^2 x d\lfloor x \rfloor = 1 \cdot (\lfloor 1 \rfloor - \lfloor 1^- \rfloor) + 2 \cdot (\lfloor 2 \rfloor - \lfloor 2^- \rfloor) = 1 \cdot 1 + 2 \cdot 1 = 3$。
结果为 $\frac{16}{3} + 3 = \frac{25}{3}$。
</details>

---

## 六、 配套练习

1. **[基础]** 计算 $\int_0^4 \sqrt{x} d(\lfloor x \rfloor)$。
2. **[进阶]** 设 $\alpha(x) = \sin x$，计算 $\int_0^{\pi/2} x d\alpha(x)$ 并使用分部积分法验证。
3. **[理论]** 证明：若 $f \in \mathcal{R}(\alpha)$ 且 $\alpha$ 满足 Lipschitz 条件（即 $|\alpha(x)-\alpha(y)| \le K|x-y|$），则 $\int_a^b f d\alpha$ 等价于某个 Riemann 积分。
4. **[挑战]** 计算 $\int_0^1 x d\alpha(x)$，其中 $\alpha(x)$ 是 Cantor 函数。

<details>
<summary>点击查看简要提示</summary>
1. 答案：$\sqrt{1}+\sqrt{2}+\sqrt{3}+\sqrt{4} = 3+\sqrt{2}+\sqrt{3}$。
2. 转换为 $\int_0^{\pi/2} x \cos x dx = [x \sin x]_0^{\pi/2} - \int \sin x dx = \pi/2 - 1$。
3. 提示：Lipschitz 条件蕴含 $\alpha$ 几乎处处可导且 $\alpha' \in L^\infty$。
4. 提示：Cantor 函数在 $(0, 1)$ 上导数几乎处处为 0，但它是连续的且 $\alpha(0)=0, \alpha(1)=1$。利用分部积分：$\int x d\alpha = [x \alpha]_0^1 - \int_0^1 \alpha(x) dx$。由于 Cantor 函数关于 $(1/2, 1/2)$ 中心对称，$\int_0^1 \alpha(x) dx = 1/2$。故结果为 $1 - 1/2 = 1/2$。
</details>

