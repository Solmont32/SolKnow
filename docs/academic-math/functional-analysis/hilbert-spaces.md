---
title: Hilbert 空间：内积、正交性与算子理论 (Hilbert Spaces)
description: 深入探讨 Hilbert 空间的几何结构，包括 Riesz 表示定理、正交分解与有界线性算子的谱理论初步。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# Hilbert 空间：内积、正交性与算子理论

> 如果说 Banach 空间是现代分析的骨架，那么 Hilbert 空间就是它的灵魂。通过引入内积，我们不仅有了长度，还有了角度（正交性），这使得无限维空间在几何上与我们直观的欧氏空间极为相似。

---

## 一、内积空间与 Hilbert 空间

### 1. 定义
设 $H$ 为复线性空间。$H$ 上的 **内积** $\langle \cdot, \cdot \rangle: H \times H \to \mathbb{C}$ 满足：
1. **正定性**：$\langle x, x \rangle \ge 0$，且 $\langle x, x \rangle = 0 \iff x = 0$。
2. **共轭对称性**：$\langle x, y \rangle = \overline{\langle y, x \rangle}$。
3. **第一变元线性性**：$\langle \alpha x + \beta y, z \rangle = \alpha \langle x, z \rangle + \beta \langle y, z \rangle$。

定义范数 $\|x\| = \sqrt{\langle x, x \rangle}$。若 $H$ 关于此范数完备，则称其为 **Hilbert 空间**。

### 2. Cauchy-Schwarz 不等式
$$ |\langle x, y \rangle| \le \|x\| \|y\| $$
等号成立当且仅当 $x, y$ 线性相关。

---

## 二、正交性与投影定理

### 1. 正交分解
若 $\langle x, y \rangle = 0$，称 $x$ 与 $y$ **正交**，记作 $x \perp y$。

**勾股定理**：若 $x \perp y$，则 $\|x+y\|^2 = \|x\|^2 + \|y\|^2$。

### 2. 投影定理
设 $M$ 是 Hilbert 空间 $H$ 的闭子空间。则对任意 $x \in H$，存在唯一的 $y \in M$ 使得：
$$ \|x - y\| = \operatorname{dist}(x, M). $$
此时 $x-y \perp M$，称 $y$ 为 $x$ 在 $M$ 上的 **正交投影**。
由此得到直和分解：$H = M \oplus M^\perp$。

---

## 三、Riesz 表示定理

这是 Hilbert 空间理论中最迷人的结论之一：它将抽象的线性泛函与具体的空间元素一一对应。

### 1. 定理陈述
设 $H$ 是 Hilbert 空间。对于任意有界线性泛函 $f \in H^*$，存在唯一的 $y \in H$ 使得：
$$ f(x) = \langle x, y \rangle, \quad \forall x \in H. $$
且满足 $\|f\|_{H^*} = \|y\|_H$。

<KnowledgeCard type="info" title="物理意义">
在量子力学中，这对应于 Bra-Ket 符号的对偶性：每一个 Ket（态向量）都有一个对应的 Bra（泛函）。
</KnowledgeCard>

---

## 四、算子理论初步

### 1. 伴随算子 (Adjoint Operator)
设 $T \in \mathcal{B}(H_1, H_2)$ 是有界线性算子。存在唯一的 $T^* \in \mathcal{B}(H_2, H_1)$ 使得：
$$ \langle Tx, y \rangle_{H_2} = \langle x, T^*y \rangle_{H_1}. $$

### 2. 特殊算子类型
- **自伴算子**：$T = T^*$。
- **正规算子**：$TT^* = T^*T$。
- **酉算子**：$TT^* = T^*T = I$。

---

## 五、精选例题

### 例 1：平行四边形公式
证明赋范线性空间 $X$ 是内积空间当且仅当范数满足：
$$ \|x+y\|^2 + \|x-y\|^2 = 2(\|x\|^2 + \|y\|^2) $$

<details>
<summary>点击查看解析</summary>

1. **必要性**：直接展开内积 $\langle x+y, x+y \rangle$ 等即可。
2. **充分性**（Jordan-von Neumann 定理）：利用极化恒等式定义内积，并验证其满足内积公理（这步推导较为繁琐，需验证齐次性）。

</details>

### 例 2：Riesz 表示定理的应用
在 $L^2(0,1)$ 中，求使 $f(x) = \int_0^1 x^2 g(x) \, dx$ 成立的代表元 $y$。

<details>
<summary>点击查看解析</summary>

由内积定义 $\langle g, y \rangle = \int_0^1 g(x) \overline{y(x)} \, dx$。
对比可知 $\overline{y(x)} = x^2$，故 $y(x) = x^2$。
注意：这里的 $f$ 显然是有界线性泛函，因为 $|\int_0^1 x^2 g(x) dx| \le (\int x^4)^{1/2} \|g\|_2$。

</details>

---

## 六、分层练习

### 练习 1（基础）
证明 $H$ 中的勾股定理：若 $\{x_i\}_{i=1}^n$ 两两正交，则 $\|\sum x_i\|^2 = \sum \|x_i\|^2$。

<details>
<summary>点击查看过程与答案</summary>

$$ \|\sum x_i\|^2 = \langle \sum x_i, \sum x_j \rangle = \sum_i \sum_j \langle x_i, x_j \rangle $$
由于 $i \neq j$ 时 $\langle x_i, x_j \rangle = 0$，故上式简化为 $\sum_i \langle x_i, x_i \rangle = \sum \|x_i\|^2$。

</details>

### 练习 2（提高）
设 $H = L^2(-1, 1)$。求 $f(x) = x$ 在由常数函数 $\{1\}$ 张成的子空间 $M$ 上的正交投影。

<details>
<summary>点击查看过程与答案</summary>

1. $M$ 的规范正交基为 $e_1 = \frac{1}{\sqrt{2}}$。
2. 投影 $y = \langle f, e_1 \rangle e_1$。
3. $\langle f, e_1 \rangle = \int_{-1}^1 x \cdot \frac{1}{\sqrt{2}} \, dx = 0$。
4. 故投影为 0。这在几何上很直观，因为奇函数 $x$ 与偶函数常数 $1$ 在对称区间上正交。

</details>

### 练习 3（挑战：Bessel 不等式）
设 $\{e_k\}$ 是 $H$ 中的规范正交系。证明对任意 $x \in H$：
$$ \sum_{k=1}^\infty |\langle x, e_k \rangle|^2 \le \|x\|^2. $$

<details>
<summary>点击查看过程与答案</summary>

考虑有限和 $s_n = \sum_{k=1}^n \langle x, e_k \rangle e_k$。
1. 计算 $\|x - s_n\|^2 = \|x\|^2 - \sum_{k=1}^n |\langle x, e_k \rangle|^2 \ge 0$。
2. 从而 $\sum_{k=1}^n |\langle x, e_k \rangle|^2 \le \|x\|^2$。
3. 令 $n \to \infty$ 即得结论。

</details>

---

## 七、章节衔接

- 前置章节：[Banach 空间与三大定理](./banach-spaces)
- 后续章节：[算子谱理论初步](./spectral-theory)
- 配套练习：[泛函分析练习（B 组：Hilbert 空间）](/docs/exercises/math/functional-analysis#fa-b1)
