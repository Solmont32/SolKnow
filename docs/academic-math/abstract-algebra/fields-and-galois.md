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

## 5. 经典例题

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

:::info 例题 2 (Galois 群)
求 $\mathbb{Q}(\sqrt{2}, \sqrt{3})$ 在 $\mathbb{Q}$ 上的 Galois 群。
:::
<details>
<summary>查看解析</summary>

该扩张是双二次扩张，基为 $\{1, \sqrt{2}, \sqrt{3}, \sqrt{6}\}$。
自同构由其对生成元的取值决定：
- $\sigma_1: \sqrt{2} \to \sqrt{2}, \sqrt{3} \to \sqrt{3}$ (恒等)
- $\sigma_2: \sqrt{2} \to -\sqrt{2}, \sqrt{3} \to \sqrt{3}$
- $\sigma_3: \sqrt{2} \to \sqrt{2}, \sqrt{3} \to -\sqrt{3}$
- $\sigma_4: \sqrt{2} \to -\sqrt{2}, \sqrt{3} \to -\sqrt{3}$
这四个元素每个平方都是恒等元，且 $\sigma_2 \sigma_3 = \sigma_4$。
故 $\operatorname{Gal}(K/\mathbb{Q}) \cong V_4$ (克莱因四元群)。
</details>

## 6. 强化练习

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

:::info 练习 2 (不可解性初步)
简述为什么五次方程没有通用的根式解。
:::
<details>
<summary>查看解析</summary>

根据 Galois 理论，一个代数方程有根式解的充要条件是其 **Galois 群是可解群**。
一般五次方程的 Galois 群是 $S_5$（对称群）。
由于 $S_5$ 的正规子群序列中包含单群 $A_5$，且 $A_5$ 不是阿贝尔群，故 $S_5$ 不是可解群。
因此，一般五次方程不存在根式通解。
</details>

---

_本章节由 SolKnow 高级计算代数系统生成。_
