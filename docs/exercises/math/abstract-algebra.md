---
title: 抽象代数练习库 (Abstract Algebra Exercises)
---

# 抽象代数练习库 (Abstract Algebra Exercises)

本练习库涵盖群、环、域的基础内容。

## 1. 群论基础

:::info 习题 1.1 (商群运算)
设 $G$ 是群，$H \trianglelefteq G$。证明商群 $G/H$ 中的单位元是 $H$。
:::
<details>
<summary>查看答案</summary>

商群 $G/H$ 的元素是左陪集 $aH$。
对于任意 $aH \in G/H$：
$(eH)(aH) = (ea)H = aH$
$(aH)(eH) = (ae)H = aH$
其中 $e$ 是 $G$ 的单位元。由于 $e \in H$，故 $eH = H$。
因此 $H$ 是 $G/H$ 的单位元。
</details>

:::info 习题 1.2 (同态核)
证明：若群同态 $\varphi: G \to K$ 是单射，当且仅当 $\ker \varphi = \{e_G\}$。
:::
<details>
<summary>查看答案</summary>

($\Rightarrow$) 若 $\varphi$ 为单射。已知 $\varphi(e_G) = e_K$。若存在 $g \in \ker \varphi$，则 $\varphi(g) = e_K = \varphi(e_G)$。由单射性 $g = e_G$。故 $\ker \varphi = \{e_G\}$。
($\Leftarrow$) 若 $\ker \varphi = \{e_G\}$。设 $\varphi(g_1) = \varphi(g_2)$，则 $\varphi(g_1 g_2^{-1}) = \varphi(g_1) \varphi(g_2)^{-1} = e_K$。
故 $g_1 g_2^{-1} \in \ker \varphi = \{e_G\}$，即 $g_1 g_2^{-1} = e_G \implies g_1 = g_2$。
得证。
</details>

## 2. 环与域

:::info 习题 2.1 (理想判定)
设 $R$ 是交换环。证明对任意 $a \in R$，集合 $Ra = \{ra \mid r \in R\}$ 是 $R$ 的理想。
:::
<details>
<summary>查看答案</summary>

1. **加法子群**: $0 = 0 \cdot a \in Ra$。若 $r_1 a, r_2 a \in Ra$，则 $r_1 a - r_2 a = (r_1 - r_2) a \in Ra$。
2. **吸收律**: 任取 $s \in R$ 且 $ra \in Ra$，则 $s(ra) = (sr) a \in Ra$。
由理想定义，$Ra$ 是 $R$ 的理想（称为由 $a$ 生成的主理想）。
</details>

:::info 习题 2.2 (域的判定)
证明：有限整环必为域。
:::
<details>
<summary>查看答案</summary>

设 $R$ 是有限整环。对任意非零元 $a \in R$，定义映射 $f_a: R \to R$ 为 $f_a(x) = ax$。
由于 $R$ 是整环，$ax = ay \implies a(x-y) = 0 \implies x = y$（消去律），故 $f_a$ 是单射。
因为 $R$ 是有限集，单射必为满射。
故存在 $x \in R$ 使得 $ax = 1$，即 $a$ 可逆。
因此 $R$ 是域。
</details>

---

_本练习库由 SolKnow 系统自动生成。_
