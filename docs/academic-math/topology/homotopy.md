---
title: 同伦初步 (Basic Homotopy)
description: 拓扑空间的连续形变，代数拓扑的起点。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 同伦初步 (Basic Homotopy)

拓扑学经常被非正式地描述为“橡皮泥几何”。同伦 (Homotopy) 正是刻画这种“连续形变”的严密数学工具。如果一个空间或一个映射可以被平滑地变成另一个，我们就说它们是同伦的。

---

## 1. 映射的同伦

### 定义 1.1 (同伦)
设 $f, g: X \to Y$ 是两个连续映射。如果存在连续映射 $H: X \times [0, 1] \to Y$，满足：
- $H(x, 0) = f(x)$
- $H(x, 1) = g(x)$
则称 $f$ 与 $g$ **同伦**，记作 $f \simeq g$。映射 $H$ 称为 $f$ 到 $g$ 的一个**同伦**。

> **直观理解**：$t \in [0, 1]$ 参数代表了时间。随着时间流逝，映射 $f$ 平滑地变成了 $g$。

---

## 2. 路径同伦与基本群

在研究空间的孔洞结构时，我们特别关注起点和终点固定的路径。

### 定义 2.1 (路径同伦)
设 $\gamma_0, \gamma_1: [0, 1] \to X$ 是两条具有相同起点 $x_0$ 和相同终点 $x_1$ 的路径。如果存在同伦 $H$ 满足：
- $H(s, 0) = \gamma_0(s), H(s, 1) = \gamma_1(s)$
- $H(0, t) = x_0, H(1, t) = x_1$ （端点在形变过程中不动）
则称这两条路径是**路径同伦**的。

### 基本群 (Fundamental Group) $\pi_1(X, x_0)$
$X$ 在基点 $x_0$ 处的**基本群**是由所有以 $x_0$ 为起止点的闭路径（回路）的路径同伦类构成的群。
- **圆周 $S^1$**：$\pi_1(S^1) \cong \mathbb{Z}$（绕圈次数）。
- **凸集或星形集**：基本群是平凡的（零群），称为**单连通**。

---

## 3. 同伦等价与收缩

### 定义 3.1 (同伦等价)
如果存在连续映射 $f: X \to Y$ 和 $g: Y \to X$，使得 $g \circ f \simeq \text{id}_X$ 且 $f \circ g \simeq \text{id}_Y$，则称 $X$ 与 $Y$ 是**同伦等价**的。
> **区别**：同胚要求映射是双射且逆连续；同伦等价允许“降维”或“压缩”。例如，圆环与圆周是同伦等价的，但不同胚。

### 可收缩空间 (Contractible Space)
如果一个空间同伦等价于一个点，则称其为**可收缩的**。
> 例子：欧氏空间 $\mathbb{R}^n$ 是可收缩的。

---

## ✍️ 深度练习与例题

### 例题 1：证明凸集 $A \subset \mathbb{R}^n$ 是可收缩的
证明：凸集 $A$ 同伦等价于其内的一点 $x_0$。

<details>
<summary>Check Solution</summary>

**证明：**
1. 定义包含映射 $i: \{x_0\} \hookrightarrow A$ 和常值映射 $r: A \to \{x_0\}$。
2. 显然 $r \circ i = \text{id}_{\{x_0\}}$。
3. 考虑 $i \circ r: A \to A$，其作用为 $f(x) = x_0$。
4. 构造同伦 $H: A \times [0, 1] \to A$：
   $H(x, t) = (1-t)x + tx_0$
5. 由于 $A$ 是凸集，对于任意 $x \in A$，$H(x, t)$ 始终落在 $A$ 中。
6. $H$ 连续，且 $H(x, 0) = x$ ($\text{id}_A$)，$H(x, 1) = x_0$ ($i \circ r$)。
7. 因此 $\text{id}_A \simeq i \circ r$，$A$ 是可收缩的。 $\square$
</details>

---

### 例题 2：证明同伦关系是一个等价关系

<details>
<summary>Check Solution</summary>

**证明提示：**
1. **自反性**：取 $H(x, t) = f(x)$。
2. **对称性**：若 $H(x, t)$ 是 $f$ 到 $g$ 的同伦，则 $G(x, t) = H(x, 1-t)$ 是 $g$ 到 $f$ 的同伦。
3. **传递性**：若 $f \simeq g$ (同伦 $H$) 且 $g \simeq h$ (同伦 $K$)，构造：
   $L(x, t) = \begin{cases} H(x, 2t) & 0 \leq t \leq 1/2 \\ K(x, 2t-1) & 1/2 \leq t \leq 1 \end{cases}$
   在 $t=1/2$ 处，$H(x, 1) = g(x) = K(x, 0)$，由粘贴引理 (Pasting Lemma) 知 $L$ 连续。 $\square$
</details>

---

### 练习 1：直观判断
下列哪些对空间是同伦等价的？
1. 实数轴 $\mathbb{R}$ 与 一个点 $\{0\}$。
2. 莫比乌斯带 与 圆周 $S^1$。
3. 字母 "P" 与 字母 "Q"。

<details>
<summary>Check Solution</summary>

**答案：**
1. **是**。$\mathbb{R}$ 是可收缩的。
2. **是**。莫比乌斯带可以收缩到它的中心圆周。
3. **不是**。"P" 同伦等价于 $S^1$（一个圈）；"Q" 同伦等价于 $S^1$ 加上一段小尾巴，虽然它们同伦等价。但如果考虑字母的拓扑结构，它们都同伦等价于 $S^1$。
   *修正*：从基本群角度看，P 和 Q 都只包含一个回路，所以它们都同伦等价于 $S^1$。
</details>
