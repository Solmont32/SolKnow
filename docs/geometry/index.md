---
title: 计算几何基础 (Geometry Basics)
description: 系统化精度控制模型、代数一致性验证与几何鲁棒性分析。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Trophy, Waypoints, Compass, Target, Circle, MoveRight, Sigma, Activity, ShieldAlert, Cpu, Scale } from 'lucide-react';

# 计算几何基础 (Geometry Basics)

计算几何（Computational Geometry）是算法竞赛中逻辑最为严密、容错率最低的版块之一。其核心在于通过**向量算子**将欧几里得几何直观转化为代数运算，并利用**鲁棒性策略**屏蔽浮点数截断带来的逻辑崩塌。

---

## 1. 精度控制模型 (Numerical Precision Model)

在计算机中，实数 $\mathbb{R}$ 被离散化为浮点数集。由于有限位数的限制，几何判定的**不一致性**是导致程序崩溃的主因。

### 1.1 静态 $\epsilon$ 模型 (Static Epsilon)

通过引入一个小量 $\epsilon$ ($10^{-9} \sim 10^{-11}$ )，我们将连续判定转化为区间判定。

```cpp
typedef double DB;
const DB eps = 1e-9;

// 符号函数：处理浮点数精度误差
inline int sign(DB x) {
    if (fabs(x) < eps) return 0;
    return x < 0 ? -1 : 1;
}

// 比较函数：a < b -> -1, a == b -> 0, a > b -> 1
inline int dcmp(DB x, DB y) {
    return sign(x - y);
}
```

<KnowledgeCard type="warning" title="精度陷阱：传递性失效">
在浮点运算中，$(a = b) \land (b = c) \centernot\implies (a = c)$。
例如，若 $a-b = 0.6\epsilon$ 且 $b-c = 0.6\epsilon$，则 $a=b, b=c$，但 $a-c = 1.2\epsilon > \epsilon$，导致 $a \neq c$。这会破坏凸包构建、排序等依赖传递性的算法。
</KnowledgeCard>

### 1.2 代数一致性 (Algebraic Consistency)

几何算法的鲁棒性不仅取决于精度，更取决于**逻辑一致性**。
- **全序关系保护**：在对点集进行极角排序或坐标排序时，必须保证严格弱序（Strict Weak Ordering）。
- **判定语义统一**：例如，在 `sign(x) == 0` 的判定中，所有涉及该变量的逻辑（如 `if (x > 0)` 和 `if (x < 0)`）必须互斥。

---

## 2. 数值稳定性分析 (Numerical Stability)

数值不稳定性通常源于**大数相减导致的有效位丢失**（Catastrophic Cancellation）。

### 2.1 算子稳定性评估

| 算子类型 | 代数形式 | 稳定性评价 | 优化建议 |
| :--- | :--- | :--- | :--- |
| **点积** | $x_1x_2 + y_1y_2$ | 高 | 适合判定角度、长度投影 |
| **叉积** | $x_1y_2 - x_2y_1$ | 中 | 坐标极大时易溢出，优先使用整数内核 |
| **斜率** | $\Delta y / \Delta x$ | **极低** | **禁止使用**。应通过叉积正负号判定共线或旋转方向 |
| **欧氏距离** | $\sqrt{\Delta x^2 + \Delta y^2}$ | 中 | 若仅需比较大小，比较距离平方 $d^2$ |

### 2.2 误差传播定理 (Error Propagation)

<KnowledgeCard type="theorem" title="浮点计算的相对误差界">

设实数 $x, y$ 的机器表示为 $fl(x) = x(1+\delta)$，其中 $|\delta| < \epsilon_{mach}$。
对于二元运算 $\circ \in \{+, -, \times, \div\}$，有：
$$fl(x \circ y) = (x \circ y)(1 + \epsilon_{calc})$$
**推论**：在几何算法中，尽量使用**低阶多项式**（如叉积是二阶）而非超越函数（如 `atan2`, `acos`），因为后者的误差项 $\epsilon_{calc}$ 包含更高阶的泰勒展开剩余项。

</KnowledgeCard>

---

## 3. 几何原语代数建模 (Algebraic Modeling)

### 3.1 核心算子性质证明

<KnowledgeCard type="theorem" title="叉积的面积与方向性">

**定理**：对于向量 $\vec{a}=(x_1, y_1), \vec{b}=(x_2, y_2)$，其叉积定义为 $\vec{a} \times \vec{b} = x_1y_2 - x_2y_1$。该值等于以 $\vec{a}, \vec{b}$ 为邻边的平行四边形的**有向面积**。

**证明**：
利用极坐标表示：$\vec{a} = (r_a\cos\alpha, r_a\sin\alpha), \vec{b} = (r_b\cos\beta, r_b\sin\beta)$。
$\vec{a} \times \vec{b} = r_a\cos\alpha \cdot r_b\sin\beta - r_a\sin\alpha \cdot r_b\cos\beta$
$= r_ar_b(\sin\beta\cos\alpha - \cos\beta\sin\alpha) = r_ar_b\sin(\beta-\alpha)$。

由于 $|\vec{a}| = r_a, |\vec{b}| = r_b$，且 $\beta-\alpha$ 为 $\vec{a}$ 到 $\vec{b}$ 的夹角 $\theta$，故 $\vec{a} \times \vec{b} = |\vec{a}||\vec{b}|\sin\theta$。
由几何定义，平行四边形面积 $S = |\vec{a}|h = |\vec{a}|(|\vec{b}||\sin\theta|)$。
叉积的正负反映了 $\theta$ 的象限：
- $\vec{a} \times \vec{b} > 0 \iff \vec{b}$ 在 $\vec{a}$ 的左侧（逆时针）。
- $\vec{a} \times \vec{b} < 0 \iff \vec{b}$ 在 $\vec{a}$ 的右侧（顺时针）。
- $\vec{a} \times \vec{b} = 0 \iff \vec{a}, \vec{b}$ 共线。

</KnowledgeCard>

---

## 4. 拓扑关系判定证明 (Topological Predicates)

### 4.1 点在线段上的代数充分性

```cpp
// 判定点 p 是否在线段 ab 上 (含端点)
bool onSegment(Point p, Point a, Point b) {
    // 1. 叉积为 0 保证共线 (代数一致性)
    // 2. 点积 <= 0 保证 p 在 a, b 投影之间 (拓扑单调性)
    return sign(cross(a - p, b - p)) == 0 && sign(dot(a - p, b - p)) <= 0;
}
```

### 4.2 线段相交的严格判定 (Straddle Test)

<KnowledgeCard type="algorithm" title="线段规范相交判定">
两线段 $AB, CD$ 规范相交（交点不为端点）当且仅当：
$A, B$ 分别位于直线 $CD$ 两侧，**且** $C, D$ 分别位于直线 $AB$ 两侧。
代数判定式：
$(\vec{CD} \times \vec{CA}) \cdot (\vec{CD} \times \vec{CB}) < 0$ 且 $(\vec{AB} \times \vec{AC}) \cdot (\vec{AB} \times \vec{AD}) < 0$。
</KnowledgeCard>

---

## 5. 经典推导与练习库 (Exercises)

<details>
<summary>例题 1：点到直线的投影与对称点 (Projection)</summary>

**推导**：
设直线由点 $A$ 和向量 $\vec{v}$ 定义。点 $P$ 在直线上的投影 $P'$ 满足 $\vec{AP'}$ 是 $\vec{AP}$ 在 $\vec{v}$ 方向上的射影：
$$\vec{AP'} = \frac{\vec{AP} \cdot \vec{v}}{|\vec{v}|^2} \vec{v}$$

```cpp
Point getProjection(Point p, Point a, Point b) {
    Vector v = b - a;
    return a + v * (dot(v, p - a) / dot(v, v));
}

Point getSymmetry(Point p, Point a, Point b) {
    Point proj = getProjection(p, a, b);
    return proj * 2 - p;
}
```

</details>

<details>
<summary>练习 1：两条直线的交点计算（代数推导版）</summary>

**题目描述**：给定四点 $A, B, C, D$，求直线 $AB$ 与直线 $CD$ 的交点。
**推导**：设交点 $P = A + t\vec{AB}$。由于 $P$ 在直线 $CD$ 上，故 $\vec{CP} \times \vec{CD} = 0$。
$$(A - C + t\vec{AB}) \times \vec{CD} = 0 \implies (A-C) \times \vec{CD} + t(\vec{AB} \times \vec{CD}) = 0$$
解得 $t = \frac{(C-A) \times \vec{CD}}{\vec{AB} \times \vec{CD}}$。

<details>
<summary>Check Solution</summary>

```cpp
Point getLineIntersection(Point a, Point b, Point c, Point d) {
    Vector v = b - a, w = d - c, u = a - c;
    DB t = cross(w, u) / cross(v, w); // 注意 cross(v, w) == 0 时平行
    return a + v * t;
}
```
*稳定性分析：若 `cross(v, w)` 接近 0，则 $t$ 会发生极大的精度溢出。*

</details>
</details>

<details>
<summary>练习 2：多边形重心 (Centroid of Polygon)</summary>

**题目描述**：计算 $n$ 个顶点多边形的重心坐标。
**思路**：将多边形三角化。对于以原点和边 $P_iP_{i+1}$ 构成的三角形，其重心为 $(P_i+P_{i+1}+O)/3$，面积为有向面积 $S_i$。全多边形重心为 $\sum (\text{Centroid}_i \cdot S_i) / \sum S_i$。

<details>
<summary>Check Solution</summary>

```cpp
Point getCentroid(const vector<Point>& p) {
    Point res = {0, 0};
    DB totalArea = 0;
    int n = p.size();
    for (int i = 0; i < n; i++) {
        DB area = cross(p[i], p[(i + 1) % n]);
        totalArea += area;
        res = res + (p[i] + p[(i + 1) % n]) * area;
    }
    return res / (3.0 * totalArea);
}
```

</details>
</details>

---

## 🎯 模块导航

- <Waypoints className="inline-block w-4 h-4 mr-1 text-blue-500" /> [凸包算法 (Convex Hull)](convex-hull) - 构建最小凸闭包与拓扑证明。
- <Target className="inline-block w-4 h-4 mr-1 text-amber-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 线性约束与鲁棒性优化。
- <MoveRight className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [扫描线技巧 (Scanning Line)](scanning-line) - 降维打击与复杂度边界。
