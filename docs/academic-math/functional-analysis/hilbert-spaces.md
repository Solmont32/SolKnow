---
title: Hilbert 空间：内积、正交性与算子基础 (Hilbert Spaces)
description: 深入探讨 Hilbert 空间的几何结构，包括 Riesz 表示定理、正交分解与有界线性算子的初步性质。
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";

# Hilbert 空间：内积、正交性与算子基础

> 如果说 Banach 空间是现代分析的骨架，那么 Hilbert 空间就是它的灵魂。通过引入内积，我们不仅有了长度，还有了角度（正交性），这使得无限维空间在几何上与我们直观的欧氏空间极为相似。

---

## 一、内积空间与 Hilbert 空间

### 1. 定义
设 $H$ 为复线性空间。$H$ 上的 **内积** $\langle \cdot, \cdot \rangle: H \times H \to \mathbb{C}$ 满足正定性、共轭对称性与第一变元线性性。
定义范数 $\|x\| = \sqrt{\langle x, x \rangle}$。若 $H$ 关于此范数完备，则称其为 **Hilbert 空间**。

### 2. 重要不等式与恒等式
- **Cauchy-Schwarz 不等式**：$|\langle x, y \rangle| \le \|x\| \|y\|$。
- **平行四边形公式**：$\|x+y\|^2 + \|x-y\|^2 = 2(\|x\|^2 + \|y\|^2)$。该公式是判定一个 Banach 空间是否为 Hilbert 空间的关键。

---

## 二、正交性与投影定理

### 1. 正交分解
若 $\langle x, y \rangle = 0$，称 $x$ 与 $y$ **正交**，记作 $x \perp y$。

### 2. 投影定理
设 $M$ 是 Hilbert 空间 $H$ 的闭子空间。则对任意 $x \in H$，存在唯一的 $y \in M$ 使得：
$$ \|x - y\| = \operatorname{dist}(x, M). $$
此时 $x-y \in M^\perp$，得到直和分解：$H = M \oplus M^\perp$。

---

## 三、Riesz 表示定理：对偶性的完美化身

### 1. 定理陈述
设 $H$ 是 Hilbert 空间。对于任意有界线性泛函 $f \in X^*$，存在唯一的 $y \in H$ 使得：
$$ f(x) = \langle x, y \rangle, \quad \forall x \in H. $$
且满足 $\|f\| = \|y\|$。
这表明 Hilbert 空间与其对偶空间 $H^*$ 是 **共轭等距同构** 的。这也说明 Hilbert 空间始终是自反的。

---

## 四、算子基础：伴随与特殊算子

### 1. 伴随算子 (Adjoint Operator)
设 $T \in \mathcal{B}(H)$。存在唯一的 $T^* \in \mathcal{B}(H)$ 使得：
$$ \langle Tx, y \rangle = \langle x, T^*y \rangle, \quad \forall x, y \in H. $$

### 2. 特殊算子类
- **自伴算子 (Self-adjoint)**：$T = T^*$。
- **正规算子 (Normal)**：$TT^* = T^*T$。
- **酉算子 (Unitary)**：$TT^* = T^*T = I$。
- **投影算子 (Projection)**：$P^2 = P$ 且 $P = P^*$（正交投影）。

---

## 五、精选例题

### 例 1：正交基的构造
证明在可分 Hilbert 空间中，任何规范正交系都可以扩充为规范正交基。

<details>
<summary>点击查看解析</summary>

1. 利用 Zorn 引理证明极大规范正交系的存在性。
2. 证明极大规范正交系 $\{e_\alpha\}$ 的张成空间在 $H$ 中稠密。
3. 否则，存在 $x \neq 0$ 且 $x \perp e_\alpha, \forall \alpha$, 这与极大性矛盾。

</details>

---

## 六、分层练习

### 练习 1（算子范数计算）
设 $H = L^2(0,1)$，定义 $Tx(t) = \int_0^t x(s) \, ds$。求 $T^*$.

<details>
<summary>点击查看过程</summary>

1. $\langle Tx, y \rangle = \int_0^1 (\int_0^t x(s) ds) \overline{y(t)} dt$.
2. 交换积分次序：$\int_0^1 x(s) (\int_s^1 \overline{y(t)} dt) ds$.
3. 故 $T^*y(s) = \int_s^1 y(t) dt$.

</details>

### 练习 2（投影算子判定）
证明：线性算子 $P$ 是正交投影算子当且仅当 $P^2 = P$ 且 $\|P\| = 1$ (当 $P \neq 0$)。

<details>
<summary>点击查看提示</summary>

1. 必要性：正交投影显然满足 $P^2=P, P=P^*$, 且由勾股定理 $\|Px\| \le \|x\|$.
2. 充分性：需证 $P = P^*$。利用内积性质证明 $\operatorname{ker} P \perp \operatorname{ran} P$.

</details>

---

## 七、章节衔接

- 前置章节：[Banach 空间与三大定理](./banach-spaces)
- **核心进阶**：[算子谱理论与自伴算子谱分解](./spectral-theory)
- 配套练习：[泛函分析练习（B 组）](/docs/exercises/math/functional-analysis#fa-b1)
