---
title: Banach 空间：对偶与三大基本定理 (Banach Spaces)
description: 严密推导泛函分析三大核心支柱：Hahn-Banach 定理、一致有界性原理（共鸣定理）与开映射/闭图像定理。
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";

# Banach 空间：对偶与三大基本定理

> Banach 空间是泛函分析的核心舞台。本章我们将建立该空间最根本的三个理论支柱，它们不仅刻画了无限维空间的拓扑特性，也是现代偏微分方程理论的基础。

---

## 一、基本概念与对偶空间

### 1. Banach 空间
赋范线性空间 $(X, \|\cdot\|)$ 若关于其诱导度量 $d(x,y)=\|x-y\|$ 完备，则称之为 **Banach 空间**。

### 2. 对偶空间 (Dual Space)
设 $X$ 是赋范线性空间，$X$ 上的所有有界线性泛函 $f: X \to \mathbb{K}$（其中 $\mathbb{K} = \mathbb{R}$ 或 $\mathbb{C}$）组成的集合称为 $X$ 的 **对偶空间**，记作 $X^*$。其范数定义为：

$$

\|f\|_{X^*} = \sup_{x\neq 0} \frac{|f(x)|}{\|x\|}.


$$

<KnowledgeCard type="success" title="对偶空间的完备性">
无论 $X$ 是否完备，$X^*$ 在上述范数下始终是 Banach 空间。
</KnowledgeCard>

---

## 二、Hahn-Banach 定理：泛函的延拓与存在性

Hahn-Banach 定理解决了线性泛函在保持范数不变的情况下，如何从子空间延拓到全空间的问题。

### 1. 定理陈述（解析形式）
设 $X$ 为线性空间，$p$ 为 $X$ 上的半范数。若 $f$ 是 $X$ 的子空间 $M$ 上的线性泛函，且满足：
$$ |f(x)| \le p(x), \quad \forall x \in M $$
则存在 $X$ 上的线性泛函 $F$ 使得：
1. $F|_M = f$；
2. $|F(x)| \le p(x), \quad \forall x \in X$。

### 2. 核心推论
1. **保范延拓**：若 $f \in M^*$，则存在 $F \in X^*$ 使得 $F|_M=f$ 且 $\|F\|_{X^*} = \|f\|_{M^*}$。
2. **点点分离**：对于 $x_0 \in X, x_0 \neq 0$，存在 $f \in X^*$ 使得 $\|f\|=1$ 且 $f(x_0) = \|x_0\|$。这保证了 $X^*$ 足够大，能够区分 $X$ 中的点。

---

## 三、一致有界性原理（共鸣定理）

该定理将算子族的“点点有界性”提升到了“一致有界性”。

### 1. 定理陈述
设 $X$ 是 Banach 空间，$Y$ 是赋范线性空间。设 $\mathcal{F} \subset \mathcal{B}(X, Y)$ 是一族有界线性算子。如果对任意 $x \in X$，算子族在点 $x$ 处是有界的，即：
$$ \sup_{T \in \mathcal{F}} \|Tx\|_Y < \infty, \quad \forall x \in X $$
则这族算子是一致有界的：
$$ \sup_{T \in \mathcal{F}} \|T\|_{\mathcal{B}(X,Y)} < \infty. $$

<KnowledgeCard type="warning" title="完备性至关重要">
该定理依赖于 Baire 纲定理，因此定义域 $X$ 必须是 Banach 空间。如果 $X$ 不完备，结论可能失效。
</KnowledgeCard>

---

## 四、开映射定理与闭图像定理

这两个定理深刻揭示了线性算子的连续性与其拓扑映射性质之间的内在联系。

### 1. 开映射定理 (Open Mapping Theorem)
设 $X, Y$ 都是 Banach 空间，$T: X \to Y$ 是有界线性算子且是满射。则 $T$ 是开映射（即把 $X$ 中的开集映为 $Y$ 中的开集）。

**逆算子定理**：若 $T$ 是从 $X$ 到 $Y$ 的有界线性算子且是双射，则 $T^{-1}$ 也是有界的。

### 2. 闭图像定理 (Closed Graph Theorem)
设 $X, Y$ 都是 Banach 空间，$T: X \to Y$ 是线性算子。若 $T$ 的图像 $G(T) = \{(x, Tx) : x \in X\}$ 是 $X \times Y$ 中的闭集，则 $T$ 是有界的。

> **注**：在实际判定中，只需验证：若 $x_n \to x$ 且 $Tx_n \to y$，则必有 $y = Tx$。

---

## 五、精选例题

### 例 1：利用 Hahn-Banach 证明有界性
证明：$\|x\| = \sup \{ |f(x)| : f \in X^*, \|f\| \le 1 \}$。

<details>
<summary>点击查看解析</summary>

1. 由定义，$|f(x)| \le \|f\| \|x\| \le \|x\|$，故 $\sup \le \|x\|$。
2. 由 Hahn-Banach 推论，对于给定的 $x \neq 0$，存在 $f_0 \in X^*$ 满足 $\|f_0\|=1$ 且 $f_0(x) = \|x\|$。
3. 因此，该上确界可以达到 $\|x\|$。

</details>

### 例 2：一致有界性原理的应用
设 $\{x_n\}$ 是 Banach 空间 $X$ 中的序列。若对每个 $f \in X^*$，序列 $\{f(x_n)\}$ 都有界，证明 $\{\|x_n\|\}$ 有界。

<details>
<summary>点击查看解析</summary>

将 $x_n$ 视为 $X^{**}$ 中的元素 $\hat{x}_n$，其中 $\hat{x}_n(f) = f(x_n)$。
1. $X^*$ 是 Banach 空间。
2. 对每个 $f \in X^*$，$\sup_n |\hat{x}_n(f)| = \sup_n |f(x_n)| < \infty$。
3. 由一致有界性原理，$\sup_n \|\hat{x}_n\|_{X^{**}} < \infty$。
4. 由于 $\|\hat{x}_n\|_{X^{**}} = \|x_n\|_X$（自然嵌入是保范的），故结论成立。

</details>

---

## 六、分层练习

### 练习 1（基础）
证明 $c_0$（趋于 0 的序列空间）的对偶空间同构于 $\ell^1$。

<details>
<summary>点击查看过程与答案</summary>

设 $f \in c_0^*$。令 $e_n$ 为第 $n$ 个坐标为 1 的基。令 $y_n = f(e_n)$。
1. 对于 $x = (x_n) \in c_0$，$x = \sum x_n e_n$（在范数意义下）。
2. $f(x) = \sum x_n y_n$。
3. 构造性证明 $\|f\| = \sum |y_n| = \|y\|_1$。
4. 验证 $\ell^1$ 到 $c_0^*$ 的映射是等距同构。

</details>

### 练习 2（提高）
设 $X$ 为 Banach 空间，$f_n \in X^*$。若对所有 $x \in X$，$f_n(x) \to f(x)$，证明 $f \in X^*$。

<details>
<summary>点击查看过程与答案</summary>

1. 线性性：$f$ 的线性性由 $f_n$ 的线性性及极限性质直接得出。
2. 有界性：对每个固定 $x$，$\{f_n(x)\}$ 收敛，故有界。由一致有界性原理，存在 $M$ 使得 $\|f_n\| \le M$。
3. 则 $|f(x)| = \lim |f_n(x)| \le M \|x\|$。故 $f$ 有界，即 $f \in X^*$。

</details>

### 练习 3（挑战）
举例说明：如果 $X$ 不是 Banach 空间，一致有界性原理可能失效。

<details>
<summary>点击查看过程与答案</summary>

考虑 $X = c_{00}$（有限个非零项序列），范数为 $\|\cdot\|_\infty$（不完备）。
定义 $f_n(x) = n x_n$。
1. 对每个 $x \in c_{00}$，$x$ 只有有限项非零，故当 $n$ 足够大时 $x_n = 0$，即 $\{f_n(x)\}$ 最终变为 0，点点有界。
2. 但 $\|f_n\| = n \to \infty$，不一致有界。

</details>

---

## 七、章节衔接

- 前置章节：[$L^p$ 空间](../real-analysis/lp-spaces)
- 下一章节：[Hilbert 空间与内积理论](./hilbert-spaces)
- 配套练习：[泛函分析练习（A 组：Banach 空间）](/docs/exercises/math/functional-analysis#fa-a1)