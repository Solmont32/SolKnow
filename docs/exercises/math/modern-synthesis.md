---
title: 现代数学精要练习 (Modern Synthesis Exercises)
description: 系统化极限收敛、流形拓扑与解析性验证的配套练习。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import CodeCollapse from '@site/src/components/CodeCollapse';

# 现代数学精要：综合练习库

本库包含与《现代数学精要》专题配套的深度练习，涵盖分析、代数与拓扑的交叉应用。

---

## 📈 1. 极限与完备性 (Analysis Foundations)

### 练习 1：紧致空间上的连续函数性质证明 {#compact-continuous}
**题目**：证明定义在紧致拓扑空间 $K$ 上的实值连续函数 $f$ 必能取到最大值与最小值。

<details>
<summary>查看证明 (Check Solution)</summary>

1. **构造开覆盖**：设 $f(K) \subseteq \mathbb{R}$。考虑 $\mathbb{R}$ 的开覆盖 $\{(-n, n) : n \in \mathbb{N}\}$。
2. **利用连续性**：$V_n = f^{-1}((-n, n))$ 是 $K$ 中的开集。
3. **利用紧致性**：$\bigcup V_n = K$ 是 $K$ 的开覆盖。由紧致性，存在有限子覆盖 $V_{n_1}, \dots, V_{n_k}$。
4. **有界性结论**：故 $f(K) \subseteq (-N, N)$，即 $f$ 有界。
5. **极值存在性**：令 $M = \sup f(K)$。若 $M$ 取不到，则 $g(x) = \frac{1}{M - f(x)}$ 在 $K$ 上连续且无界，矛盾。
6. **结论**：$f$ 必能取到确界。

</details>

---

## 🌀 2. 复分析应用 (Complex Analysis)

### 练习 2：留数定理在实积分计算中的应用 {#residue-application}
**题目**：计算实积分 $I = \int_0^\infty \frac{dx}{x^2 + 1}$。

<details>
<summary>查看解析 (Check Solution)</summary>

1. **构造复函数**：考虑 $f(z) = \frac{1}{z^2 + 1}$。
2. **确定奇点**：$z = \pm i$。在上半平面内只有 $z = i$ 为孤立奇点。
3. **计算留数**：
   $$\text{Res}(f, i) = \lim_{z \to i} (z-i) \frac{1}{(z-i)(z+i)} = \frac{1}{2i}$$
4. **应用留数定理**：
   $$\int_{-\infty}^\infty \frac{dx}{x^2 + 1} = 2\pi i \cdot \frac{1}{2i} = \pi$$
5. **结论**：由于被积函数为偶函数，$I = \frac{1}{2} \pi$。

</details>

---

## 🌐 3. 拓扑与同伦 (Topology & Homotopy)

### 练习 3：同论等价性与基本群计算 {#homotopy-pi1}
**题目**：证明圆环 $S^1 \times [0, 1]$ 与圆周 $S^1$ 同伦等价，并给出其基本群。

<details>
<summary>查看证明 (Check Solution)</summary>

1. **构造构造收缩**：令 $H(x, t, s) = (x, t \cdot s)$，其中 $x \in S^1, t \in [0, 1], s \in [0, 1]$。
2. **同伦性质**：当 $s=1$ 时为恒等映射，当 $s=0$ 时映射到 $S^1 \times \{0\}$。
3. **结论**：$S^1 \times [0, 1]$ 形变收缩到 $S^1$。
4. **基本群**：由于同伦等价的空间基本群同构，$\pi_1(S^1 \times [0, 1]) \cong \pi_1(S^1) \cong \mathbb{Z}$。

</details>

---

_本练习库由 SolKnow 学术委员会动态更新，旨在通过严密习题强化现代数学直觉。_
