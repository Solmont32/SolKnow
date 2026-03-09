---
title: 群论 (Groups)
sidebar_position: 1
---

import { Code2, ShieldCheck, Zap, Layers, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

# <Code2 className="inline-block mr-2 mb-1" /> 群论 (Group Theory)

群论研究“带运算的集合”所蕴含的代数结构与对称性，是现代代数的基石。

## 1. 群的定义与基本性质

### 1.1 群的定义
设 $G$ 是非空集合，$\cdot$ 是其上的二元运算。若满足以下条件，则称 $(G, \cdot)$ 为 **群 (Group)**：
1. **封闭性**: $\forall a, b \in G, a \cdot b \in G$。
2. **结合律**: $\forall a, b, c \in G, (a \cdot b) \cdot c = a \cdot (b \cdot c)$。
3. **单位元**: $\exists e \in G, \forall a \in G, e \cdot a = a \cdot e = a$。
4. **逆元**: $\forall a \in G, \exists a^{-1} \in G, a \cdot a^{-1} = a^{-1} \cdot a = e$。

### 1.2 阿贝尔群 (Abelian Group)
若群 $G$ 满足交换律，即 $\forall a, b \in G, ab = ba$，则称 $G$ 为 **阿贝尔群**。

## 2. 子群与正规子群

### 2.1 子群 (Subgroups) <ShieldCheck className="inline-block ml-1" />
设 $H \subseteq G$，若 $H$ 在 $G$ 的运算下也构成群，则称 $H$ 为 $G$ 的 **子群**，记作 $H \le G$。
- **子群判别法**: $H \neq \varnothing$ 且 $\forall a, b \in H, ab^{-1} \in H$。

### 2.2 正规子群 (Normal Subgroups)
若对所有 $g \in G$，都有 $gHg^{-1} = H$（或等价于 $gH = Hg$），则称 $H$ 为 $G$ 的 **正规子群**，记作 $H \trianglelefteq G$。
正规子群是构造商结构的核心。

## 3. 同态、同构与同构定理 <Layers className="inline-block ml-1" />

### 3.1 同态核与像
映射 $\varphi: G \to K$ 称为 **群同态**，若 $\varphi(ab) = \varphi(a)\varphi(b)$。
- **核 (Kernel)**: $\ker \varphi = \{g \in G \mid \varphi(g) = e_K\} \trianglelefteq G$。
- **像 (Image)**: $\operatorname{Im} \varphi = \varphi(G) \le K$。

### 3.2 群同构定理 (Systematic Isomorphism Theorems)

#### 第一同构定理 (First Isomorphism Theorem)
设 $\varphi: G \to K$ 是群同态，则：
$$G / \ker \varphi \cong \operatorname{Im} \varphi$$
**意义**: 同态像本质上是定义域对核的商群。

#### 第二同构定理 (Second Isomorphism Theorem)
设 $H \le G, N \trianglelefteq G$，则 $H \cap N \trianglelefteq H$ 且：
$$H / (H \cap N) \cong (HN) / N$$
**意义**: 它揭示了子群与正规子群交、并运算下的商群关系。

#### 第三同构定理 (Third Isomorphism Theorem)
设 $N \trianglelefteq G, M \trianglelefteq G$ 且 $N \subseteq M$，则 $(M/N) \trianglelefteq (G/N)$ 且：
$$(G/N) / (M/N) \cong G / M$$
**意义**: 它类似于分数的约分规律，展示了商群套商群的递归性质。

## 4. 经典例题

:::info 例题 1 (拉格朗日定理应用)
设 $G$ 是有限群，证明：对任意 $g \in G$，有 $g^{|G|} = e$。
:::
<details>
<summary>查看解析</summary>

由 $g$ 生成的循环子群 $\langle g \rangle$ 的阶 $d$ 等于 $g$ 的阶。根据 **拉格朗日定理 (Lagrange's Theorem)**，子群的阶必整除群的阶，即 $d \mid |G|$。
令 $|G| = kd$，则 $g^{|G|} = g^{kd} = (g^d)^k = e^k = e$。
</details>

:::info 例题 2 (正规子群判定)
证明：若 $H$ 是 $G$ 的唯一 $n$ 阶子群，则 $H \trianglelefteq G$。
:::
<details>
<summary>查看解析</summary>

考虑内自同构映射 $\sigma_g(h) = ghg^{-1}$。因为 $\sigma_g$ 是同构映射，所以 $gHg^{-1}$ 也是 $G$ 的子群，且阶数保持不变，即 $|gHg^{-1}| = |H| = n$。
由于 $H$ 是 $G$ 中唯一的 $n$ 阶子群，必有 $gHg^{-1} = H$ 对一切 $g \in G$ 成立。
由定义知 $H \trianglelefteq G$。
</details>

## 5. 强化练习

:::info 练习 1 (同态性质)
证明：同态映射 $\varphi$ 的核 $\ker \varphi$ 必定是正规子群。
:::
<details>
<summary>查看解析</summary>

1. **子群**: 易证 $\ker \varphi$ 是子群。
2. **正规性**: $\forall n \in \ker \varphi, g \in G$，计算 $\varphi(gng^{-1}) = \varphi(g)\varphi(n)\varphi(g^{-1}) = \varphi(g)e_K\varphi(g)^{-1} = e_K$。
故 $gng^{-1} \in \ker \varphi$，满足正规子群定义。
</details>

:::info 练习 2 (循环群同构)
证明：任何无限循环群都同构于整数加法群 $(\mathbb{Z}, +)$。
:::
<details>
<summary>查看解析</summary>

设 $G = \langle a \rangle$ 为无限循环群。定义映射 $f: \mathbb{Z} \to G, n \mapsto a^n$。
1. **同态**: $f(m+n) = a^{m+n} = a^m a^n = f(m)f(n)$。
2. **满射**: 显然。
3. **单射**: 若 $f(n) = e$，即 $a^n = e$，由于 $G$ 是无限群，其阶为无限，故只能 $n=0$。核为 $\{0\}$，故单射。
得证 $G \cong \mathbb{Z}$。
</details>

---

_本章节由 SolKnow 高级计算代数系统生成，遵循现代抽象代数教学体系。_
