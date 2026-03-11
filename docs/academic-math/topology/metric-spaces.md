---
title: 度量空间 (Metric Spaces)
description: 分析学的“直观基础”，从欧氏距离到抽象度量的推广。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 度量空间 (Metric Spaces)

度量空间是点集拓扑学的直观起点。在数学分析中，我们已经习惯了 $|x-y|$ 作为距离。通过抽象化“距离”概念，我们可以统一研究 $\mathbb{R}^n$、函数空间以及离散集合。

---

## 1. 核心定义

### 定义 1.1 (度量)

设 $X$ 是一个非空集合。若存在函数 $d: X \times X \to \mathbb{R}$，满足以下四条公理，则称 $d$ 是 $X$ 上的一个**度量 (Metric)**：

1. **非负性**：$d(x, y) \geq 0$；
2. **正定性**：$d(x, y) = 0 \iff x = y$；
3. **对称性**：$d(x, y) = d(y, x)$；
4. **三角不等式**：$d(x, z) \leq d(x, y) + d(y, z)$。

二元组 $(X, d)$ 称为**度量空间**。

---

## 2. 经典度量空间

<KnowledgeCard type="info" title="欧氏空间 $\mathbb{R}^n$">
对于 $\mathbf{x} = (x_1, \dots, x_n), \mathbf{y} = (y_1, \dots, y_n) \in \mathbb{R}^n$，欧氏度量定义为：
$$d(\mathbf{x}, \mathbf{y}) = \sqrt{\sum_{i=1}^n (x_i - y_i)^2}$$
这是我们最熟悉的几何空间。
</KnowledgeCard>

<KnowledgeCard type="warning" title="离散度量 (Discrete Metric)">
对于任意非空集合 $X$，定义：
$$d(x, y) = \begin{cases} 0 & x = y \\ 1 & x \neq y \end{cases}$$
在离散度量下，每一个单点集 $\{x\}$ 都是开集，因此任何子集都是开集。这提供了许多拓扑反例。
</KnowledgeCard>

<KnowledgeCard type="success" title="函数空间 $C[a, b]$">
对于区间 $[a, b]$ 上的所有连续函数 $f, g$，定义一致度量 (Uniform Metric)：
$$d(f, g) = \max_{x \in [a, b]} |f(x) - g(x)|$$
这是泛函分析的基础。
</KnowledgeCard>

---

## 3. 开集与闭集

在度量空间中，我们通过“距离”来刻画“附近”。

### 定义 3.1 (邻域/开球)

点 $x \in X$ 的 $r$-邻域定义为：
$$B(x, r) = \{ y \in X \mid d(x, y) < r \}$$

### 定义 3.2 (开集与闭集)

- **开集**：若集合 $U \subset X$ 的每一点都是其内点（即 $\forall x \in U, \exists \epsilon > 0, B(x, \epsilon) \subset U$），则称 $U$ 是开集。
- **闭集**：若 $U$ 的补集 $X \setminus U$ 是开集，则称 $U$ 是闭集。

---

## 4. 完备性 (Completeness)

完备性描述了一个空间“没有缝隙”，它是微积分得以建立的根本原因。

### 定义 4.1 (Cauchy 序列)

序列 $\{x_n\}$ 称为 **Cauchy 序列**，如果 $\forall \epsilon > 0, \exists N, \forall m, n > N, d(x_m, x_n) < \epsilon$。

### 定义 4.2 (完备空间)

如果度量空间 $X$ 中的每一个 Cauchy 序列都收敛于 $X$ 中的点，则称 $X$ 是**完备度量空间**。

---

## ✍️ 深度练习

### 练习 1：证明离散度量空间中，所有序列的 Cauchy 性质

在离散度量空间中，什么样的序列是 Cauchy 序列？什么样的序列是收敛的？

<details>
<summary>Check Solution</summary>

**解析：**

1. **Cauchy 序列判定**：
   取 $\epsilon = 1/2$。若 $\{x_n\}$ 是 Cauchy 序列，则 $\exists N, \forall m, n > N, d(x_m, x_n) < 1/2$。
   由于在离散度量中，$d$ 只能取 $0$ 或 $1$，因此 $d(x_m, x_n) < 1/2$ 意味着 $d(x_m, x_n) = 0$，即 $x_m = x_n$。
   结论：离散空间中的 Cauchy 序列必须是**最终常值序列**（Eventually Constant）。

2. **收敛性**：
   同理，由于 $d(x_n, p) < 1/2 \implies x_n = p$，收敛序列也必须是最终常值序列。

3. **结论**：离散度量空间总是完备的，因为它所有的 Cauchy 序列都是常值序列，自然收敛。
</details>

---

### 练习 2：有理数集 $\mathbb{Q}$ 的非完备性

证明 $\mathbb{Q}$（使用标准度量 $d(x, y) = |x-y|$）不是完备的。

<details>
<summary>Check Solution</summary>

**证明：**

1. 构造一个有理数序列 $\{q_n\}$，使其收敛于一个无理数（如 $\sqrt{2}$）。
2. 例如，利用二分法或 Newton 迭代法构造 $q_{n+1} = \frac{1}{2}(q_n + \frac{2}{q_n})$，初值 $q_1=1$。
3. 在 $\mathbb{R}$ 中，此序列收敛于 $\sqrt{2}$，因此它是 $\mathbb{R}$ 中的 Cauchy 序列。
4. 由于度量相同，它也是 $\mathbb{Q}$ 中的 Cauchy 序列。
5. 然而，极限 $\sqrt{2} \notin \mathbb{Q}$。
6. 因此，$\mathbb{Q}$ 中存在一个不收敛于 $\mathbb{Q}$ 中点的 Cauchy 序列，$\mathbb{Q}$ 不完备。 $\square$
</details>
