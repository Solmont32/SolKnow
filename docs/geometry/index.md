---
title: 计算几何基础 (Geometry Basics)
description: 系统化向量运算、拓扑性质判定与几何对象抽象。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Trophy, Waypoints, Compass, Target, Circle, MoveRight, Sigma, Activity } from 'lucide-react';

# 计算几何基础 (Geometry Basics)

计算几何（Computational Geometry）是算法竞赛中逻辑最为严密、容错率最低的版块之一。其核心在于通过**向量算子**将欧几里得几何直观转化为代数运算，并利用**鲁棒性策略**屏蔽浮点数截断带来的逻辑崩塌。

---

## 1. 精度控制与数值鲁棒性 (Numerical Robustness)

<KnowledgeCard type="warning" title="浮点数陷阱">
由于 `double` 遵循 IEEE 754 标准，其有效位数约为 15-17 位。在涉及减法（尤其是两个相近数相减）和叉积运算时，误差会迅速积累。
</KnowledgeCard>

### 1.1 符号函数与比较算子
通过引入 $\epsilon$ ($10^{-9} \sim 10^{-10}$)，我们将连续实数集 $\mathbb{R}$ 映射到离散拓扑集合 $\{-1, 0, 1\}$。

```cpp
typedef double DB;
const DB eps = 1e-9;
const DB PI = acos(-1.0);

// 符号函数：处理浮点数精度误差
inline int sign(DB x) {
    if (fabs(x) < eps) return 0;
    return x < 0 ? -1 : 1;
}

// 比较函数：a < b 返回 -1, a == b 返回 0, a > b 返回 1
inline int dcmp(DB x, DB y) {
    return sign(x - y);
}
```

### 1.2 精度自适应建议
对于坐标范围在 $10^9$ 且涉及多次乘法的题目，`double` 可能不足以支撑，建议使用 `long double` 或在可能的情况下使用**全整数运算**（去掉除法和开根号）。

---

## 2. 几何原语代数建模 (Algebraic Modeling)

### 2.1 向量空间与基本算子
在 $\mathbb{R}^2$ 空间中，点与向量共用相同的代数结构。

```cpp
struct Point {
    DB x, y;
    Point operator+ (const Point& b) const { return {x + b.x, y + b.y}; }
    Point operator- (const Point& b) const { return {x - b.x, y - b.y}; }
    Point operator* (const DB& b) const { return {x * b, y * b}; }
    Point operator/ (const DB& b) const { return {x / b, y / b}; }
    bool operator== (const Point& b) const { return dcmp(x, b.x) == 0 && dcmp(y, b.y) == 0; }
};
typedef Point Vector;
```

<KnowledgeCard type="theorem" title="核心算子性质">

1.  **点积 (Dot Product)**: $\vec{a} \cdot \vec{b} = |\vec{a}||\vec{b}|\cos\theta$。
    -   判定夹角：$>0$ 为锐角，$=0$ 垂直，$<0$ 为钝角。
2.  **叉积 (Cross Product)**: $\vec{a} \times \vec{b} = |\vec{a}||\vec{b}|\sin\theta$（二维中为标量）。
    -   **几何意义**：以 $\vec{a}, \vec{b}$ 为邻边的平行四边形的**有向面积**。
    -   **右手定则**：$\vec{a} \times \vec{b} > 0$ 表示 $\vec{b}$ 在 $\vec{a}$ 的逆时针方向。

</KnowledgeCard>

---

## 3. 拓扑关系判定判定证明 (Topological Predicates)

### 3.1 跨立实验 (Straddle Test) 的代数证明

<KnowledgeCard type="algorithm" title="线段相交判定">

线段 $L_1(A, B)$ 与 $L_2(C, D)$ 相交（非规范相交含端点）的充要条件是：
1.  **快速排斥实验**：两个线段的包围盒（Bounding Box）相交。
2.  **跨立实验**：
    -   $( \vec{AB} \times \vec{AC} ) \cdot ( \vec{AB} \times \vec{AD} ) \le 0$
    -   $( \vec{CD} \times \vec{CA} ) \cdot ( \vec{CD} \times \vec{CB} ) \le 0$

**证明简述**：
叉积的符号代表了点相对于向量的左右位置。若 $C, D$ 在直线 $AB$ 的两侧，则 $\vec{AB} \times \vec{AC}$ 与 $\vec{AB} \times \vec{AD}$ 符号相反（或至少一个为 0），乘积必 $\le 0$。

</KnowledgeCard>

```cpp
// 判定点 p 是否在线段 ab 上
bool onSegment(Point p, Point a, Point b) {
    return sign(cross(a - p, b - p)) == 0 && sign(dot(a - p, b - p)) <= 0;
}

// 线段相交判定 (包含端点相交)
bool segmentIntersection(Point a, Point b, Point c, Point d) {
    // 快速排斥 (可选优化)
    if (max(a.x, b.x) < min(c.x, d.x) || max(c.x, d.x) < min(a.x, b.x) ||
        max(a.y, b.y) < min(c.y, d.y) || max(c.y, d.y) < min(a.y, b.y)) return false;
    
    DB c1 = cross(b - a, c - a), c2 = cross(b - a, d - a);
    DB c3 = cross(d - c, a - c), c4 = cross(d - c, b - c);
    return sign(c1) * sign(c2) <= 0 && sign(c3) * sign(c4) <= 0;
}
```

---

## 4. 空间复杂度分析 (Complexity Analysis)

<KnowledgeCard type="complexity">
- **Point/Vector**: $O(1)$ 空间，存储两个 `double`。
- **Point Set**: $O(N)$ 空间。
- **Polygon**: $O(V)$ 空间，其中 $V$ 为顶点数。
- **时间效率**: 大多数基本算子 (Dot, Cross, Distance) 均为 $O(1)$。线段相交判定为 $O(1)$。
</KnowledgeCard>

---

## 5. 经典推导与练习库

<details>
<summary>例题 1：点到线段的距离 (Case Analysis)</summary>

**逻辑分叉**：
1.  若 $\vec{AB} \cdot \vec{AP} < 0$，垂足落在 $A$ 点外侧，最短距离为 $|AP|$。
2.  若 $\vec{BA} \cdot \vec{BP} < 0$，垂足落在 $B$ 点外侧，最短距离为 $|BP|$。
3.  否则，最短距离为点到直线的垂直距离 $\frac{|\vec{AB} \times \vec{AP}|}{|\vec{AB}|}$。

```cpp
DB distToSegment(Point p, Point a, Point b) {
    if (a == b) return length(p - a);
    Vector v1 = b - a, v2 = p - a, v3 = p - b;
    if (sign(dot(v1, v2)) < 0) return length(v2);
    if (sign(dot(v1, v3)) > 0) return length(v3);
    return fabs(cross(v1, v2)) / length(v1);
}
```
</details>

<details>
<summary>例题 2：判定点是否在任意简单多边形内 (Winding Number)</summary>

**定理 (射线法)**：从点 $P$ 向任意方向引射线，计算该射线与多边形边界的交点个数。若为奇数，则点在内部。
**注意**：需特殊处理射线经过顶点或与边重合的情况。

```cpp
bool isPointInPolygon(Point p, const vector<Point>& poly) {
    bool in = false;
    int n = poly.size();
    for (int i = 0; i < n; i++) {
        Point a = poly[i], b = poly[(i + 1) % n];
        if (onSegment(p, a, b)) return true; // 在边界上
        if (((sign(a.y - p.y) > 0) != (sign(b.y - p.y) > 0)) &&
            (dcmp(p.x, (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) < 0)) {
            in = !in;
        }
    }
    return in;
}
```
</details>

<KnowledgeCard type="tip" title="习题推荐">
1.  [POJ 2318] TOYS - 判定点在哪个隔板区域（叉积应用）。
2.  [POJ 1269] Intersecting Lines - 直线关系判定与交点计算。
</KnowledgeCard>

---

## 🎯 模块导航

- <Waypoints className="inline-block w-4 h-4 mr-1 text-blue-500" /> [凸包算法 (Convex Hull)](convex-hull) - 构建最小凸闭包。
- <Target className="inline-block w-4 h-4 mr-1 text-amber-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 线性约束求解。
- <MoveRight className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [扫描线技巧 (Scanning Line)](scanning-line) - 降维打击几何覆盖。
