---
title: 泛函分析专题练习库 (Functional Analysis Exercises)
description: 涵盖 Banach 空间三大定理、Hilbert 空间几何及线性算子理论的深度练习，附带详细折叠解答。
---

# 泛函分析专题练习库

> 本练习库对标研究生水平的泛函分析课程，旨在通过严密的习题训练深化对无限维空间结构的理解。

---

## A 组：Banach 空间与三大定理 {#fa-a1}

### 练习 A1
证明：若 $X$ 是有限维赋范线性空间，则 $X$ 必完备（即 $X$ 是 Banach 空间）。

<details>
<summary>查看答案</summary>

**证明**：
1. 设 $\dim X = n$，$\{e_1, \dots, e_n\}$ 是 $X$ 的一组基。
2. 定义映射 $\phi: \mathbb{K}^n \to X$，$\phi(\alpha_1, \dots, \alpha_n) = \sum \alpha_i e_i$。
3. 由于有限维空间上所有范数等价，$\phi$ 是同胚映射。
4. $\mathbb{K}^n$（$\mathbb{R}^n$ 或 $\mathbb{C}^n$）关于欧氏范数是完备的。
5. 完备性在同胚映射下保持（对于一致同胚），故 $X$ 完备。

</details>

### 练习 A2
利用 Hahn-Banach 定理证明：对于赋范线性空间 $X$ 中的任意 $x \neq 0$，存在 $f \in X^*$ 使得 $\|f\|=1$ 且 $f(x) = \|x\|$.

<details>
<summary>查看答案</summary>

**证明**：
1. 令 $M = \operatorname{span}\{x\}$ 为 $X$ 的子空间。
2. 在 $M$ 上定义线性泛函 $g(\alpha x) = \alpha \|x\|$.
3. 显然 $g$ 有界且 $\|g\| = \sup_{\alpha \neq 0} \frac{|\alpha \|x\||}{\|\alpha x\|} = 1$.
4. 由 Hahn-Banach 保范延拓定理，存在 $f \in X^*$ 满足 $f|_M = g$ 且 $\|f\| = \|g\| = 1$.
5. 此时 $f(x) = g(x) = \|x\|$.

</details>

---

## B 组：Hilbert 空间与正交性 {#fa-b1}

### 练习 B1
在 Hilbert 空间 $H$ 中，证明 $M \subset (M^\perp)^\perp$。若 $M$ 是闭子空间，证明 $M = (M^\perp)^\perp$。

<details>
<summary>查看答案</summary>

**证明**：
1. 若 $x \in M$，则对任意 $y \in M^\perp$，有 $x \perp y$。这正好满足 $(M^\perp)^\perp$ 的定义，故 $M \subset (M^\perp)^\perp$。
2. 若 $M$ 是闭子空间，由投影定理 $H = M \oplus M^\perp$。
3. 对任意 $z \in (M^\perp)^\perp$，分解 $z = x + y$，其中 $x \in M, y \in M^\perp$。
4. 由于 $z \in (M^\perp)^\perp$ 且 $y \in M^\perp$，有 $\langle z, y \rangle = 0$。
5. 同时 $\langle z, y \rangle = \langle x+y, y \rangle = \langle x, y \rangle + \langle y, y \rangle = 0 + \|y\|^2$。
6. 从而 $\|y\|^2 = 0 \Rightarrow y = 0$。
7. 因此 $z = x \in M$，即 $(M^\perp)^\perp \subset M$。结论成立。

</details>

### 练习 B2
证明：Hilbert 空间 $H$ 是可分的，当且仅当它拥有一个至多可列的规范正交基。

<details>
<summary>查看答案</summary>

**提示**：
1. **必要性**：利用 Gram-Schmidt 正交化过程处理 $H$ 中的可列稠密集。
2. **充分性**：考虑基的有限线性组合且系数为有理数（或复有理数）构成的集合，证明其在 $H$ 中稠密。

</details>

---

## C 组：线性算子与谱理论初步 {#fa-c1}

### 练习 C1
设 $T \in \mathcal{B}(H)$。证明：若 $T$ 是自伴算子，则其谱 $\sigma(T) \subset \mathbb{R}$。

<details>
<summary>查看答案</summary>

**证明**：
1. 设 $\lambda = \alpha + i\beta$ ($\beta \neq 0$)。
2. 计算 $\|(T - \lambda I)x\|^2 = \|(T-\alpha I)x - i\beta x\|^2 = \|(T-\alpha I)x\|^2 + \beta^2 \|x\|^2 \ge \beta^2 \|x\|^2$。
3. 这说明 $T - \lambda I$ 是下有界的且是单射。
4. 进一步证明其值域是全空间（利用自伴性及值域的闭性），故 $\lambda \in \rho(T)$（正则集）。
5. 从而谱必须落在实轴上。

</details>

---

## 导航与反馈

- [返回泛函分析首页](/docs/academic-math/functional-analysis)
- [查看 Banach 空间理论](/docs/academic-math/functional-analysis/banach-spaces)
- [查看 Hilbert 空间理论](/docs/academic-math/functional-analysis/hilbert-spaces)
