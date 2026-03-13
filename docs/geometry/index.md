---
title: 计算几何基础 (Geometry Basics)
description: 系统化精度控制模型、拓扑性质证明与几何鲁棒性分析。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Trophy, Waypoints, Compass, Target, Circle, MoveRight, Sigma, Activity, ShieldAlert, Cpu } from 'lucide-react';

# 计算几何基础 (Geometry Basics)

计算几何（Computational Geometry）是算法竞赛中逻辑最为严密、容错率最低的版块之一。其核心在于通过**向量算子**将欧几里得几何直观转化为代数运算，并利用**鲁棒性策略**屏蔽浮点数截断带来的逻辑崩塌。

---

## 1. 精度控制模型 (Numerical Precision Model)

在计算机中，实数 $\mathbb{R}$ 被离散化为浮点数集。由于有限位数的限制，几何判定的**不一致性**是导致程序崩溃的主因。

### 1.1 静态 $\epsilon$ 模型 (Static Epsilon)

通过引入一个小量 $\epsilon$ ($10^{-9} \sim 10^{-11}$)，我们将连续判定转化为区间判定。

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

### 1.2 整数内核 (Integer Kernel)

**最佳实践**：若输入坐标均为整数且不涉及除法/开方，应优先使用 `long long`。
- **点积/叉积**：坐标范围 $10^9$ 时，乘积达到 $10^{18}$，需使用 `__int128`。
- **判定优于计算**：比较距离大小时，比较 $d^2$ 而非 $d$。

---

## 2. 几何鲁棒性分析 (Geometric Robustness)

鲁棒性（Robustness）指算法在面对**退化情况 (Degeneracy)** 时的稳定性。

### 2.1 退化情况分类
1.  **重合 (Coincidence)**：两点重合，导致向量模长为 0。
2.  **共线 (Collinearity)**：三点共线，叉积为 0。
3.  **垂直/平行 (Orthogonality/Parallelism)**：点积或叉积为 0。

### 2.2 鲁棒性增强策略
- **微扰法 (Simulation of Simplicity)**：给坐标添加极小的随机扰动，消除退化。
- **符号判定逻辑**：严格区分 `sign(x) == 0` 与 `sign(x) > 0`，在凸包等算法中明确处理边界共线点。

---

## 3. 几何原语代数建模 (Algebraic Modeling)

### 3.1 核心算子性质证明

<KnowledgeCard type="theorem" title="叉积的面积与方向性">

**定理**：对于向量 $\vec{a}=(x_1, y_1), \vec{b}=(x_2, y_2)$，其叉积 $x_1y_2 - x_2y_1$ 等于以其为邻边的平行四边形的有向面积。

**证明**：
利用极坐标表示：$\vec{a} = (r_1\cos\alpha, r_1\sin\alpha), \vec{b} = (r_2\cos\beta, r_2\sin\beta)$。
$\vec{a} \times \vec{b} = r_1\cos\alpha \cdot r_2\sin\beta - r_1\sin\alpha \cdot r_2\cos\beta$
$= r_1r_2(\sin\beta\cos\alpha - \cos\beta\sin\alpha) = r_1r_2\sin(\beta-\alpha)$。
该值正负直接反映了 $\vec{b}$ 相对于 $\vec{a}$ 的旋转方向（逆时针为正）。

</KnowledgeCard>

---

## 4. 拓扑关系判定判定证明 (Topological Predicates)

### 4.1 跨立实验 (Straddle Test) 的代数判定

```cpp
// 判定点 p 是否在线段 ab 上 (含端点)
bool onSegment(Point p, Point a, Point b) {
    // 叉积为 0 保证共线，点积 <= 0 保证在 ab 之间
    return sign(cross(a - p, b - p)) == 0 && sign(dot(a - p, b - p)) <= 0;
}
```

<KnowledgeCard type="algorithm" title="线段规范相交判定">
两线段 $AB, CD$ 规范相交（交点不为端点）当且仅当：
$A, B$ 位于直线 $CD$ 两侧 **且** $C, D$ 位于直线 $AB$ 两侧。
即：$\text{sign}(\vec{CA} \times \vec{CD}) \cdot \text{sign}(\vec{CB} \times \vec{CD}) < 0$
且 $\text{sign}(\vec{AC} \times \vec{AB}) \cdot \text{sign}(\vec{AD} \times \vec{AB}) < 0$。
</KnowledgeCard>

---

## 5. 经典推导与练习库 (Exercises)

<details>
<summary>例题 1：点到直线的投影与对称点 (Projection)</summary>

**推导**：
设直线由点 $A$ 和向量 $\vec{v}$ 定义。点 $P$ 在直线上的投影 $P'$ 满足 $\vec{AP'} = \text{proj}_{\vec{v}}(\vec{AP}) = \frac{\vec{AP} \cdot \vec{v}}{|\vec{v}|^2} \vec{v}$。

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
<summary>练习 1：两条直线的交点计算</summary>

**题目描述**：给定四点 $A, B, C, D$，求直线 $AB$ 与直线 $CD$ 的交点。
**思路**：利用面积比例。交点 $P = C + \vec{CD} \cdot \frac{\text{area}(ABC)}{\text{area}(ABC) + \text{area}(ABD)}$。

<details>
<summary>Check Solution</summary>

```cpp
Point getLineIntersection(Point a, Point b, Point c, Point d) {
    Vector v = b - a, w = d - c, u = a - c;
    DB t = cross(w, u) / cross(v, w);
    return a + v * t;
}
```
*注意：调用前需确保 `cross(v, w) != 0`（不平行）。*

</details>
</details>

<details>
<summary>练习 2：多边形面积性质 (Pick's Theorem)</summary>

**题目描述**：对于顶点均为格点的简单多边形，其面积 $A$、内部格点数 $I$、边界格点数 $B$ 满足：$A = I + \frac{B}{2} - 1$。
请编写程序计算边界格点数 $B$。

<details>
<summary>Check Solution</summary>

对于线段 $(x_1, y_1)$ 到 $(x_2, y_2)$，边界上的格点数为 $\gcd(|x_1-x_2|, |y_1-y_2|) + 1$。
累计各边格点数并减去重复计算的顶点即可。

```cpp
long long gcd(long long a, long long b) { return b == 0 ? a : gcd(b, a % b); }

long long getBoundaryPoints(const vector<Point>& poly) {
    long long res = 0;
    int n = poly.size();
    for (int i = 0; i < n; i++) {
        Point a = poly[i], b = poly[(i + 1) % n];
        res += gcd(abs((long long)a.x - b.x), abs((long long)a.y - b.y));
    }
    return res;
}
```

</details>
</details>

---

## 🎯 模块导航

- <Waypoints className="inline-block w-4 h-4 mr-1 text-blue-500" /> [凸包算法 (Convex Hull)](convex-hull) - 构建最小凸闭包与拓扑证明。
- <Target className="inline-block w-4 h-4 mr-1 text-amber-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 线性约束与鲁棒性优化。
- <MoveRight className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [扫描线技巧 (Scanning Line)](scanning-line) - 降维打击与复杂度边界。
