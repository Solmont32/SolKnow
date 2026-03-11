---
title: 抽象代数练习库 (Abstract Algebra Exercises)
---

# 抽象代数练习库 (Abstract Algebra Exercises)

本练习库涵盖群、环、域的基础内容，旨在通过实战深化对抽象结构的理解。

## 1. 群论基础与同构定理

:::info 习题 1.1 (商群运算)
设 $G$ 是群，$H \trianglelefteq G$。证明商群 $G/H$ 中的单位元是 $H$。
:::

<details>
<summary>查看解析</summary>

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
<summary>查看解析</summary>

($\Rightarrow$) 若 $\varphi$ 为单射。已知 $\varphi(e_G) = e_K$。若存在 $g \in \ker \varphi$，则 $\varphi(g) = e_K = \varphi(e_G)$。由单射性 $g = e_G$。故 $\ker \varphi = \{e_G\}$。
($\Leftarrow$) 若 $\ker \varphi = \{e_G\}$。设 $\varphi(g_1) = \varphi(g_2)$，则 $\varphi(g_1 g_2^{-1}) = \varphi(g_1) \varphi(g_2)^{-1} = e_K$。
故 $g_1 g_2^{-1} \in \ker \varphi = \{e_G\}$，即 $g_1 g_2^{-1} = e_G \implies g_1 = g_2$。
得证。

</details>

:::info 习题 1.3 (第二同构定理应用)
在整数加法群 $(\mathbb{Z}, +)$ 中，取 $H = 4\mathbb{Z}, N = 6\mathbb{Z}$。验证第二同构定理。
:::

<details>
<summary>查看解析</summary>

根据第二同构定理: $H / (H \cap N) \cong (H+N) / N$。

1. $H+N = 4\mathbb{Z} + 6\mathbb{Z} = \gcd(4,6)\mathbb{Z} = 2\mathbb{Z}$。
2. $H \cap N = \operatorname{lcm}(4,6)\mathbb{Z} = 12\mathbb{Z}$。
3. 左边: $H / (H \cap N) = 4\mathbb{Z} / 12\mathbb{Z} \cong \mathbb{Z} / 3\mathbb{Z} \cong \mathbb{Z}_3$。
4. 右边: $(H+N) / N = 2\mathbb{Z} / 6\mathbb{Z} \cong \mathbb{Z} / 3\mathbb{Z} \cong \mathbb{Z}_3$。
两边同构，定理成立。
</details>

## 2. 理想理论与环结构

:::info 习题 2.1 (理想判定)
设 $R$ 是交换环。证明对任意 $a \in R$，集合 $(a) = \{ra \mid r \in R\}$ 是 $R$ 的理想。
:::

<details>
<summary>查看解析</summary>

1. **加法子群**: $0 = 0 \cdot a \in (a)$。若 $r_1 a, r_2 a \in (a)$，则 $r_1 a - r_2 a = (r_1 - r_2) a \in (a)$。
2. **吸收律**: 任取 $s \in R$ 且 $ra \in (a)$，则 $s(ra) = (sr) a \in (a)$。
由理想定义，$(a)$ 是 $R$ 的理想（称为由 $a$ 生成的主理想）。
</details>

:::info 习题 2.2 (极大理想与素理想)
证明：在交换幺环 $R$ 中，极大理想必为素理想。
:::

<details>
<summary>查看解析</summary>

设 $M$ 是 $R$ 的极大理想。
由性质可知，商环 $R/M$ 是一个域。
又因为任何域都是整环，故 $R/M$ 是整环。
由素理想判别性质，$R/M$ 是整环 $\iff M$ 是素理想。
故得证。

</details>

:::info 习题 2.3 (中国剩余定理应用)
求 $\mathbb{Z} / 6\mathbb{Z}$ 的理想结构并利用中国剩余定理分解。
:::

<details>
<summary>查看解析</summary>

$6 = 2 \times 3$。由于 $\gcd(2,3)=1$，理想 $2\mathbb{Z}$ 与 $3\mathbb{Z}$ 互素。
根据中国剩余定理:
$\mathbb{Z}/6\mathbb{Z} \cong \mathbb{Z}/2\mathbb{Z} \times \mathbb{Z}/3\mathbb{Z} \cong \mathbb{Z}_2 \times \mathbb{Z}_3$。
这说明模 6 剩余类环可以分解为模 2 与模 3 剩余类环的直积。

</details>

## 3. 域扩张与 Galois 理论初步

:::info 习题 3.1 (扩张次数)
求 $[\mathbb{Q}(\sqrt{2}, \sqrt[3]{2}) : \mathbb{Q}]$。
:::

<details>
<summary>查看解析</summary>

1. $[\mathbb{Q}(\sqrt{2}):\mathbb{Q}] = 2$。
2. $[\mathbb{Q}(\sqrt[3]{2}):\mathbb{Q}] = 3$。
3. 由于 $\gcd(2, 3) = 1$，根据扩张次数引理，$[\mathbb{Q}(\sqrt{2}, \sqrt[3]{2}) : \mathbb{Q}] = 2 \times 3 = 6$。
（注：其最小多项式通常为 $x^6-10x^4+4x^3+25x^2-20x-23=0$ 类似的形态，但通过次数直接计算更简便）。
</details>

:::info 习题 3.2 (Galois 群判定)
设 $K$ 是 $f(x) = x^2-5$ 在 $\mathbb{Q}$ 上的分裂域。求 $\operatorname{Gal}(K/\mathbb{Q})$。
:::

<details>
<summary>查看解析</summary>

1. 根为 $\pm\sqrt{5}$。分裂域 $K = \mathbb{Q}(\sqrt{5})$。
2. $[K:\mathbb{Q}] = 2$。
3. Galois 群的阶等于扩张次数，故 $|\operatorname{Gal}(K/\mathbb{Q})| = 2$。
4. 唯一的非单位元自同构为 $\sigma(\sqrt{5}) = -\sqrt{5}$。
故 $\operatorname{Gal}(K/\mathbb{Q}) \cong \mathbb{Z}_2$。
</details>

---

## 4. 群作用与 Sylow 定理 (Advanced)

:::info 习题 4.1 (Burnside 引理)
用三种颜色对一个正五边形的顶点进行着色（考虑旋转对称，不考虑翻转），求共有多少种不同的着色方案？
:::

<details>
<summary>查看解析</summary>

1. 正五边形的旋转群 $G$ 有 5 个元素：$e$ (旋转 $0^\circ$)，以及旋转 $72^\circ, 144^\circ, 216^\circ, 288^\circ$。
2. 每个旋转 $\rho^k$ ($k=1,2,3,4$) 都是一个 5-循环，其置换的不动点个数 $\chi(\rho^k) = 3^1 = 3$ (所有顶点必须同色)。
3. 单位元 $e$ 的不动点个数 $\chi(e) = 3^5 = 243$ (任意着色)。
4. 根据 Burnside 引理，方案数 $N = \frac{1}{|G|} \sum_{g \in G} \chi(g)$：
$N = \frac{1}{5} (243 + 4 \times 3) = \frac{255}{5} = 51$。
共有 51 种着色方案。
</details>

:::info 习题 4.2 (Sylow 定理应用)
证明不存在阶为 30 的简单群。
:::

<details>
<summary>查看解析</summary>

$30 = 2 \times 3 \times 5$。设 $n_p$ 为 Sylow $p$-子群的个数。

1. $n_5 \equiv 1 \pmod 5$ 且 $n_5 | 6 \implies n_5 = 1$ 或 $n_5 = 6$。
2. $n_3 \equiv 1 \pmod 3$ 且 $n_3 | 10 \implies n_3 = 1$ 或 $n_3 = 10$。
3. 若 $n_5=1$ 或 $n_3=1$，则存在正规子群，$G$ 不是简单群。
4. 若 $n_5=6$ 且 $n_3=10$：
   - 6 个 5 阶子群提供 $6 \times (5-1) = 24$ 个 5 阶元素。
   - 10 个 3 阶子群提供 $10 \times (3-1) = 20$ 个 3 阶元素。
   - $24 + 20 = 44 > 30$，矛盾。
   因此 $n_5$ 或 $n_3$ 必为 1，即存在正规子群。
   得证。
   </details>

---

_本练习库持续更新，致力于覆盖抽象代数核心理论。_
