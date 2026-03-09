---
title: 同伦初步 (Basic Homotopy)
description: 拓扑空间的连续形变，代数拓扑的起点。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Repeat, Waypoints, Circle, MoveRight } from 'lucide-react';

# 同伦初步 (Basic Homotopy)

拓扑学经常被描述为“橡皮泥几何”。同伦 (Homotopy) 正是刻画这种“连续形变”的严密数学工具。如果一个空间或一个映射可以被平滑地变成另一个，我们就说它们在拓扑上是“等价”的。

---

## 1. 映射同伦与同伦等价

### 定义 1.1 (映射同伦)
设 $f, g: X \to Y$ 是连续映射。若存在连续映射 $H: X \times [0, 1] \to Y$ 使得：
- $H(x, 0) = f(x)$
- $H(x, 1) = g(x)$
则称 $f$ 与 $g$ **同伦**，记作 $f \simeq g$。

### 定义 1.2 (同伦等价)
若存在 $f: X \to Y$ 和 $g: Y \to X$ 使得 $g \circ f \simeq \text{id}_X$ 且 $f \circ g \simeq \text{id}_Y$，则称 $X$ 与 $Y$ **同伦等价**。
> **直观**：同伦等价允许伸缩和形变。例如，**亏格为 1 的实心圆环**与**圆周 $S^1$** 是同伦等价的。

---

## 2. 基本群 (The Fundamental Group)

基本群是研究空间中“孔洞”结构的核心代数工具。

### <Waypoints className="solknow-purple" size={20} inline /> 路径同伦
设 $\gamma_0, \gamma_1: [0, 1] \to X$ 是两条具有相同端点的路径。若存在形变过程保持端点不动，则称它们**路径同伦**。

### 群结构定义
对于带基点的空间 $(X, x_0)$，其**基本群** $\pi_1(X, x_0)$ 定义为所有以 $x_0$ 为起止点的回路的路径同伦类集合。
- **乘法（复合）**：$[\gamma] \cdot [\eta] = [\gamma * \eta]$（先走第一条路，再走第二条）。
- **单位元**：常值回路 $c_{x_0}$。
- **逆元**：反向路径 $\bar{\gamma}(s) = \gamma(1-s)$。

### <Circle className="solknow-blue" size={20} inline /> 经典结论
1. **$S^1$ 的基本群**：$\pi_1(S^1) \cong \mathbb{Z}$。
   > 这意味着回路绕圆周的“圈数”是唯一的同伦不变量。
2. **单连通空间**：若 $X$ 道路连通且 $\pi_1(X, x_0) = \{e\}$，则称 $X$ 是单连通的。
   > 例子：$\mathbb{R}^n$、$n \ge 2$ 的球面 $S^n$ 都是单连通的。

---

## 3. 函子性与应用

### 诱导同态 (Induced Homomorphism)
每一个连续映射 $f: (X, x_0) \to (Y, y_0)$ 都会诱导一个群同态：
$$f_*: \pi_1(X, x_0) \to \pi_1(Y, y_0), \quad [\gamma] \mapsto [f \circ \gamma]$$
> **性质**：若 $f$ 是同胚（或同伦等价），则 $f_*$ 是群同构。

### <MoveRight className="solknow-amber" size={20} inline /> 应用：Brouwer 不动点定理
**定理**：任何连续映射 $f: D^2 \to D^2$（闭圆盘到自身）必有不动点。
> **证明思想 (反证法)**：若没有不动点，则可以构造一个从 $D^2$ 到其边界 $S^1$ 的收缩映射 $r$。这会导致诱导同态 $r_*: \pi_1(D^2) \to \pi_1(S^1)$。但 $\pi_1(D^2)=0$ 而 $\pi_1(S^1)=\mathbb{Z}$，非零同态不存在，矛盾！

---

## ✍️ 深度练习与例题

### 例题 1：证明 $\pi_1(X \times Y, (x_0, y_0)) \cong \pi_1(X, x_0) \times \pi_1(Y, y_0)$

<details>
<summary>Check Solution</summary>

**证明：**
1. 定义映射 $\Phi: [\gamma] \mapsto ([p_X \circ \gamma], [p_Y \circ \gamma])$，其中 $p_X, p_Y$ 是投影映射。
2. 由于投影映射是连续的，$\Phi$ 是良定义的群同态。
3. **满射性**：给定 $[\alpha] \in \pi_1(X)$ 和 $[\beta] \in \pi_1(Y)$，定义 $\gamma(t) = (\alpha(t), \beta(t))$ 即可。
4. **单射性**：若 $p_X \circ \gamma$ 和 $p_Y \circ \gamma$ 分别在 $X$ 和 $Y$ 中可收缩，则利用分量同伦即可构造 $\gamma$ 在积空间中的同伦。
5. 结论：积空间的基本群等于基本群的直积。 $\square$
</details>

### 例题 2：证明“穿孔平面” $\mathbb{R}^2 \setminus \{0\}$ 同伦等价于圆周 $S^1$

<details>
<summary>Check Solution</summary>

**证明：**
1. 定义包含映射 $i: S^1 \hookrightarrow \mathbb{R}^2 \setminus \{0\}$。
2. 定义径向投影 $r: \mathbb{R}^2 \setminus \{0\} \to S^1, \quad r(x) = x/\|x\|$。
3. 显然 $r \circ i = \text{id}_{S^1}$。
4. 考虑 $i \circ r(x) = x/\|x\|$。构造同伦 $H(x, t) = (1-t)x + t \frac{x}{\|x\|}$。
5. 由于 $x \neq 0$，线段 $(1-t)x + t \frac{x}{\|x\|}$ 永远不会经过原点，故 $H$ 在 $\mathbb{R}^2 \setminus \{0\}$ 中连续。
6. $H$ 实现了 $\text{id}$ 到 $i \circ r$ 的形变，故二者同伦等价。 $\square$
</details>

### 练习 1：基本群的独立性
证明：对于道路连通空间 $X$，不同基点 $x_0, x_1$ 对应的基本群 $\pi_1(X, x_0)$ 与 $\pi_1(X, x_1)$ 是同构的。

<details>
<summary>Check Solution</summary>

**解析：**
1. 取连接 $x_0$ 与 $x_1$ 的路径 $\alpha$。
2. 定义映射 $\beta([\gamma]) = [\alpha^{-1} * \gamma * \alpha]$。
3. 可以验证这是一个群同构。
*注：虽然同构，但这个同构依赖于路径 $\alpha$ 的选择。*
</details>

### 练习 2：判定连通性
若一个空间 $X$ 是单连通的，它一定是道路连通的吗？

<details>
<summary>Check Solution</summary>

**答案**：根据定义，**是的**。
基本群通常只在道路连通的空间中讨论，或者指代包含基点的那个道路连通分支。如果一个空间不连通，我们通常说它的各个道路连通分支是单连通的。
</details>
