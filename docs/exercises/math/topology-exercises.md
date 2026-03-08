---
title: 点集拓扑练习 (Topology Exercises)
---

# 点集拓扑与度量空间深度练习

## 1. 度量空间基本定义 {#metric-spaces}

### 练习 1.1 (离散度量)

设 $X$ 为任意集合，定义 $d(p, q) = 1$ (若 $p \neq q$) 且 $d(p, q) = 0$ (若 $p = q$)。

1. 验证该定义满足度量空间三公理。
2. 证明在该空间中，任何子集 $E \subset X$ 既是开集又是闭集。

### 练习 1.2 ($L^1$ 度量)

在 $\mathbb{R}^n$ 中定义 $d_1(\mathbf{x}, \mathbf{y}) = \sum_{i=1}^n |x_i - y_i|$。证明这定义了一个度量空间。

---

## 2. 开闭集与紧致性判定 {#compactness}

### 练习 2.1 (康托尔集的紧致性)

证明康托尔集 (Cantor Set) $C$ 是 $\mathbb{R}$ 中的紧集。
_(提示：证明 $C$ 是有界闭集)_

### 练习 2.2 (Heine-Borel 的反例)

在欧氏空间 $\mathbb{R}$ 中，给出一个有界但非紧致的集合，并说明理由。
_(提示：利用 Heine-Borel 定理或开覆盖定义)_

### 练习 2.3 (有限子覆盖的应用)

设 $K_1 \supset K_2 \supset K_3 \supset \dots$ 是一系列非空紧集的嵌套序列。证明 $\cap_{n=1}^\infty K_n$ 非空。
