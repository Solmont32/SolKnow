---
title: 群论 (Groups)
---

# 群论 (Groups)

群论研究“带运算的集合”所蕴含的结构与对称性，是抽象代数的核心起点。

## 1. 群的定义与基本性质

### 1.1 群的定义
设 $G$ 是非空集合，$\cdot$ 是二元运算。若满足以下四个条件，则称 $(G, \cdot)$ 为 **群 (Group)**：
1. **封闭性**: $\forall a, b \in G, a \cdot b \in G$。
2. **结合律**: $\forall a, b, c \in G, (a \cdot b) \cdot c = a \cdot (b \cdot c)$。
3. **单位元**: $\exists e \in G, \forall a \in G, e \cdot a = a \cdot e = a$。
4. **逆元**: $\forall a \in G, \exists a^{-1} \in G, a \cdot a^{-1} = a^{-1} \cdot a = e$。

### 1.2 阿贝尔群 (Abelian Group)
若群 $G$ 额外满足交换律，即 $\forall a, b \in G, ab = ba$，则称 $G$ 为 **阿贝尔群**（或交换群）。

## 2. 子群与正规子群 (Subgroups & Normal Subgroups)

### 2.1 子群 (Subgroups)
设 $H \subseteq G$，若 $H$ 在 $G$ 的运算下也构成群，则称 $H$ 为 $G$ 的 **子群**，记作 $H \le G$。
**子群判别法**: $H \neq \varnothing$ 且 $\forall a, b \in H, ab^{-1} \in H$。

### 2.2 正规子群 (Normal Subgroups)
若对所有 $g \in G$，都有 $gHg^{-1} = H$（即左陪集等于右陪集 $gH = Hg$），则称 $H$ 为 $G$ 的 **正规子群**，记作 $H \trianglelefteq G$。
正规子群是构造 **商群 (Quotient Group)** $G/H$ 的必要条件。

## 3. 同态与同构 (Homomorphisms & Isomorphisms)

### 3.1 群同态
映射 $\varphi: G \to K$ 若满足 $\varphi(ab) = \varphi(a)\varphi(b)$，则称为 **群同态**。
- **核 (Kernel)**: $\ker \varphi = \{g \in G \mid \varphi(g) = e_K\} \trianglelefteq G$。
- **像 (Image)**: $\operatorname{Im} \varphi = \varphi(G) \le K$。

### 3.2 同构第一定理
$$G / \ker \varphi \cong \operatorname{Im} \varphi$$

## 4. 经典例题

:::info 例题 1 (子群判定)
设 $G$ 是群，$H, K$ 是 $G$ 的两个子群。证明 $H \cap K$ 也是 $G$ 的子群。
:::
<details>
<summary>查看解析</summary>

1. **非空**: 因为 $H, K$ 是子群，所以 $e \in H$ 且 $e \in K$，故 $e \in H \cap K$。
2. **运算封闭**: 取 $a, b \in H \cap K$，则 $a, b \in H$ 且 $a, b \in K$。因为 $H, K$ 是子群，所以 $ab^{-1} \in H$ 且 $ab^{-1} \in K$，故 $ab^{-1} \in H \cap K$。
由子群判别法，$H \cap K \le G$。
</details>

:::info 例题 2 (正规子群)
证明：指标为 2 的子群必为正规子群。
:::
<details>
<summary>查看解析</summary>

设 $[G:H] = 2$，则 $G$ 可划分为 $H$ 和其补集 $G \setminus H$。
对于左陪集：若 $g \in H$，则 $gH = H$；若 $g \notin H$，则 $gH = G \setminus H$。
对于右陪集：若 $g \in H$，则 $Hg = H$；若 $g \notin H$，则 $Hg = G \setminus H$。
综上，$gH = Hg$ 对所有 $g \in G$ 均成立，故 $H \trianglelefteq G$。
</details>

---

_本章节由 SolKnow 系统根据抽象代数标准教材重写。_
