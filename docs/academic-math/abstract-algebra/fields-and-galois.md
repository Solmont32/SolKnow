---
title: 域论与 Galois 理论 (Fields and Galois Theory)
sidebar_position: 4
---

import { Microscope, Zap, Share2, Binary } from 'lucide-react';

# <Microscope className="inline-block mr-2 mb-1" /> 域论与 Galois 理论

域论研究数的扩张，而 Galois 理论则通过群论的对称性解决了“代数方程根式求解”的千年难题。

## 1. 域扩张基础

### 1.1 定义与扩张次数
若 $F \subseteq K$ 且两者均为域，则称 $K$ 为 $F$ 的 **扩张域 (Extension Field)**。
- **扩张次数**: $K$ 作为 $F$-向量空间的维数，记为 $[K:F]$。
- **代数元素**: 若 $\alpha \in K$ 是某个非零多项式 $f(x) \in F[x]$ 的根，则称 $\alpha$ 为 **代数元**。其满足的最低次首一多项式称为 **最小多项式** $m_{\alpha, F}(x)$。

### 1.2 单代数扩张
由单个元素 $\alpha$ 生成的扩张 $F(\alpha)$。若 $\alpha$ 是代数元且最小多项式次数为 $n$，则 $[F(\alpha):F] = n$，且 $\{1, \alpha, \dots, \alpha^{n-1}\}$ 是其一组基。

## 2. 分裂域与正规扩张 <Binary className="inline-block ml-1" />

### 2.1 分裂域 (Splitting Field)
设 $f(x) \in F[x]$。若在扩张域 $K$ 中，$f(x)$ 可分解为一次因式的乘积，且 $K$ 由 $F$ 与 $f(x)$ 的所有根生成，则称 $K$ 为 $f(x)$ 在 $F$ 上的 **分裂域**。

### 2.2 正规扩张 (Normal Extension)
若代数扩张 $K/F$ 使得 $K$ 中任何不可约多项式只要有一个根在 $K$ 中，则其所有根都在 $K$ 中，称 $K/F$ 为正规扩张。

## 3. 可分扩张与 Galois 扩张 <Zap className="inline-block ml-1" />

### 3.1 可分扩张 (Separable Extension)
若 $K/F$ 中每个元素的最小多项式都没有重根，则称其为可分扩张。在特征为 0 的域（如 $\mathbb{Q}, \mathbb{R}$）上，所有扩张都是可分的。

### 3.2 Galois 扩张
若有限扩张 $K/F$ 既是正规的又是可分的，则称其为 **Galois 扩张**。

## 4. Galois 理论基本定理 <Share2 className="inline-block ml-1" />

设 $K/F$ 是 Galois 扩张，$G = \operatorname{Gal}(K/F)$ 是其 Galois 群（即所有保持 $F$ 不变的 $K$ 的自同构构成的群）。

**基本定理内容**:
在 $K/F$ 的 **中间域** $E$ ($F \subseteq E \subseteq K$) 与 $G$ 的 **子群** $H$ 之间存在一一对应关系：
1. $E \longleftrightarrow \operatorname{Gal}(K/E)$。
2. $H \longleftrightarrow K^H$（$H$ 保持不变的元素集合）。
3. 扩张次数关系: $[K:E] = |H|$，$[E:F] = [G:H]$。
4. **正规性**: $E/F$ 是正规扩张 $\iff \operatorname{Gal}(K/E) \trianglelefteq G$。

## 5. 有限域构造 (Finite Fields) <Binary className="inline-block ml-1" />

### 5.1 有限域的结构
任何有限域 $\mathbb{F}$ 的元素个数必为 $p^n$（其中 $p$ 为素数，$n \in \mathbb{Z}^+$）。
- **特征**: 有限域的特征必为素数 $p$。
- **构造**: $\mathbb{F}_{p^n}$ 可以构造为 $x^{p^n} - x$ 在 $\mathbb{F}_p$ 上的分裂域。
- **同构意义**: 对给定的 $p^n$，有限域在同构意义下是唯一的。

### 5.2 商环构造法
若 $f(x) \in \mathbb{F}_p[x]$ 是 $n$ 次不可约多项式，则商环：
$$\mathbb{F}_{p^n} \cong \mathbb{F}_p[x] / (f(x))$$
其元素可表示为 $a_{n-1}x^{n-1} + \dots + a_1x + a_0 \pmod{f(x)}$，共 $p^n$ 个。

## 6. 经典例题

:::info 例题 1 (扩张次数计算)
求 $f(x) = x^3-2$ 在 $\mathbb{Q}$ 上的分裂域 $K$ 及其扩张次数 $[K:\mathbb{Q}]$。
:::
<details>
<summary>查看解析</summary>

1. **求根**: $x^3-2$ 的根为 $\sqrt[3]{2}, \sqrt[3]{2}\omega, \sqrt[3]{2}\omega^2$，其中 $\omega = e^{i2\pi/3}$。
2. **构造分裂域**: $K = \mathbb{Q}(\sqrt[3]{2}, \omega)$。
3. **计算次数**:
   - $[\mathbb{Q}(\sqrt[3]{2}):\mathbb{Q}] = 3$（最小多项式为 $x^3-2$）。
   - 由于 $\omega$ 满足 $x^2+x+1=0$，且在实域 $\mathbb{Q}(\sqrt[3]{2})$ 上无根，故 $[K:\mathbb{Q}(\sqrt[3]{2})] = 2$。
   - 由乘法公式 $[K:\mathbb{Q}] = 3 \times 2 = 6$。
</details>

:::info 例题 2 (有限域构造)
构造 4 元域 $\mathbb{F}_4$。
:::
<details>
<summary>查看解析</summary>

1. **选择不可约多项式**: 在 $\mathbb{F}_2[x]$ 中，寻找 2 次不可约多项式。
   - $x^2, x^2+1=(x+1)^2, x^2+x = x(x+1)$ 均可约。
   - $x^2+x+1$ 在 $x=0,1$ 时均不为 0，故在 $\mathbb{F}_2$ 上不可约。
2. **商环构造**: $\mathbb{F}_4 = \mathbb{F}_2[x] / (x^2+x+1)$。
3. **元素集合**: $\{0, 1, \alpha, \alpha+1\}$，其中 $\alpha$ 是 $x$ 的等价类，满足 $\alpha^2 = \alpha+1$。
</details>

## 7. 强化练习

:::info 练习 1 (最小多项式)
求 $\sqrt{2} + \sqrt{3}$ 在 $\mathbb{Q}$ 上的最小多项式。
:::
<details>
<summary>查看解析</summary>

令 $x = \sqrt{2} + \sqrt{3} \implies x^2 = 2 + 3 + 2\sqrt{6} = 5 + 2\sqrt{6}$。
$\implies x^2 - 5 = 2\sqrt{6} \implies (x^2 - 5)^2 = 24$。
$\implies x^4 - 10x^2 + 25 = 24 \implies x^4 - 10x^2 + 1 = 0$。
可以验证该多项式在 $\mathbb{Q}$ 上不可约，故 $m(x) = x^4 - 10x^2 + 1$。
</details>

:::info 练习 2 (有限域逆元)
在 $\mathbb{F}_8 \cong \mathbb{F}_2[x]/(x^3+x+1)$ 中，求 $\alpha^2$ 的乘法逆元。
:::
<details>
<summary>查看解析</summary>

我们需要找 $g(\alpha)$ 使得 $\alpha^2 \cdot g(\alpha) \equiv 1 \pmod{\alpha^3+\alpha+1}$。
使用扩展欧几里得算法或观察法：
已知 $\alpha^3 = \alpha+1$。
则 $\alpha^2 \cdot \alpha = \alpha^3 = \alpha+1$。
$\alpha^2 \cdot (\alpha+1) = \alpha^3 + \alpha^2 = \alpha^2+\alpha+1$。
$\alpha^2 \cdot (\alpha^2+1) = \alpha^4 + \alpha^2 = \alpha(\alpha+1) + \alpha^2 = \alpha^2+\alpha+\alpha^2 = \alpha$。
注意到 $\alpha(\alpha^2+1) = \alpha^3+\alpha = (\alpha+1)+\alpha = 1$。
所以 $\alpha^{-1} = \alpha^2+1$。
那么 $(\alpha^2)^{-1} = (\alpha^{-1})^2 = (\alpha^2+1)^2 = \alpha^4+1 = \alpha(\alpha+1)+1 = \alpha^2+\alpha+1$。
验证: $\alpha^2(\alpha^2+\alpha+1) = \alpha^4+\alpha^3+\alpha^2 = (\alpha^2+\alpha)+(\alpha+1)+\alpha^2 = \alpha+1+1 = 1 \pmod{2}$。
故逆元为 $\alpha^2+\alpha+1$。
</details>

---

_本章节由 SolKnow 高级计算代数系统生成。_
