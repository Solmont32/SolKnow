---
title: 计算几何基础 (Geometry Basics)
description: 系统化向量运算、拓扑性质判定与几何对象抽象。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Trophy, Waypoints, Compass, Target, Circle, MoveRight } from 'lucide-react';

# 计算几何基础 (Geometry Basics)

计算几何（Computational Geometry）是算法竞赛中逻辑最为严密的版块之一。其核心在于通过**向量算子**将欧几里得几何直观转化为代数运算，并利用**精度控制策略**屏蔽浮点数截断带来的逻辑崩塌。

---

## 1. 精度控制与数值鲁棒性 (Precision Control)

由于 `double` 遵循 IEEE 754 标准，其有效位数约为 15-17 位。在涉及减法（尤其是两个相近数相减）和叉积运算时，误差会迅速积累。

### 符号函数与比较算子
通过引入 $\epsilon$ ($10^{-9} \sim 10^{-10}$)，我们将实数集 $\mathbb{R}$ 映射到离散集合 $\{-1, 0, 1\}$。

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

---

## 2. 几何原语建模 (Geometric Primitives)

在工业级实现中，建议将几何对象封装为结构体，并重载基础算子。

### 2.1 向量算子空间 ($\mathbb{R}^2$)
```cpp
struct Point {
    DB x, y;
    Point operator+ (const Point& b) const { return {x + b.x, y + b.y}; }
    Point operator- (const Point& b) const { return {x - b.x, y - b.y}; }
    Point operator* (const DB& b) const { return {x * b, y * b}; }
    Point operator/ (const DB& b) const { return {x / b, y / b}; }
    bool operator== (const Point& b) const { return dcmp(x, b.x) == 0 && dcmp(y, b.y) == 0; }
    bool operator< (const Point& b) const { // 坐标字典序排序
        return dcmp(x, b.x) ? x < b.x : y < b.y;
    }
};
typedef Point Vector;

// 基础算子：点积与叉积
inline DB dot(Vector a, Vector b) { return a.x * b.x + a.y * b.y; }
inline DB cross(Vector a, Vector b) { return a.x * b.y - a.y * b.x; }
inline DB length(Vector a) { return sqrt(dot(a, a)); }

// 夹角推导：a·b = |a||b|cosθ
inline DB angle(Vector a, Vector b) { 
    return acos(dot(a, b) / length(a) / length(b)); 
}
```

### 2.2 直线与线段 (Line & Segment)
直线采用**点向式**表示：$L(t) = P + t\vec{v}$，其中 $t \in \mathbb{R}$。
```cpp
struct Line {
    Point p; Vector v;
    DB ang;
    Line() {}
    Line(Point p, Vector v) : p(p), v(v) { ang = atan2(v.y, v.x); }
    Point point(DB t) { return p + v * t; }
    // 极角排序专用
    bool operator< (const Line& L) const { return ang < L.ang; }
};
```

---

## 3. 拓扑关系判定 (Topological Predicates)

### 3.1 点与直线的度量性质
1. **点到直线的投影 (Projection)**:
   $$P_{proj} = A + \frac{\vec{AP} \cdot \vec{v}}{|\vec{v}|^2}\vec{v}$$
2. **点到直线的距离**: 
   $$d = \frac{|\vec{v} \times \vec{AP}|}{|\vec{v}|}$$
3. **点在直线上的判定**: `sign(cross(p - L.p, L.v)) == 0`。

### 3.2 线段相交：跨立实验 (Straddle Test)
线段 $AB$ 与 $CD$ 相交的充要条件是：
- $C, D$ 位于直线 $AB$ 的两侧（或至少一点在直线上）。
- $A, B$ 位于直线 $CD$ 的两侧（或至少一点在直线上）。

```cpp
// 判定点 p 是否在线段 ab 上（含端点）
bool onSegment(Point p, Point a, Point b) {
    return sign(cross(a - p, b - p)) == 0 && sign(dot(a - p, b - p)) <= 0;
}

// 线段相交判定
bool segmentIntersection(Point a, Point b, Point c, Point d) {
    DB c1 = cross(b - a, c - a), c2 = cross(b - a, d - a);
    DB c3 = cross(d - c, a - c), c4 = cross(d - c, b - c);
    // 严格跨立
    if (sign(c1) * sign(c2) < 0 && sign(c3) * sign(c4) < 0) return true;
    // 边界情况：端点在线段上
    return onSegment(c, a, b) || onSegment(d, a, b) || 
           onSegment(a, c, d) || onSegment(b, c, d);
}
```

---

## 4. 经典例题与推导

<details>
<summary>例题 1：求解两直线交点 (Rigorous Derivation)</summary>

**推导过程**：
设 $L_1 = P_1 + t\vec{v}_1$，$L_2 = P_2 + w\vec{v}_2$。
联立方程：$P_1 + t\vec{v}_1 = P_2 + w\vec{v}_2$。
左右同时叉乘 $\vec{v}_2$：
$$(P_1 - P_2) \times \vec{v}_2 + t(\vec{v}_1 \times \vec{v}_2) = w(\vec{v}_2 \times \vec{v}_2) = 0$$
从而得到 $t$ 的解析解：
$$t = \frac{(P_2 - P_1) \times \vec{v}_2}{\vec{v}_1 \times \vec{v}_2}$$

```cpp
Point getLineIntersection(Line a, Line b) {
    Vector u = a.p - b.p;
    DB t = cross(b.v, u) / cross(a.v, b.v);
    return a.p + a.v * t;
}
```
</details>

<details>
<summary>例题 2：任意多边形面积计算 (Shoelace Formula)</summary>

**定理**：由顶点 $(x_1, y_1), \dots, (x_n, y_n)$ 构成的简单多边形，其有向面积 $A$ 为：
$$A = \frac{1}{2} \sum_{i=1}^n \vec{OP_i} \times \vec{OP_{i+1}} = \frac{1}{2} \sum_{i=1}^n (x_i y_{i+1} - x_{i+1} y_i)$$

```cpp
DB polygonArea(vector<Point>& p) {
    DB area = 0;
    int n = p.size();
    for (int i = 0; i < n; i++) {
        area += cross(p[i], p[(i + 1) % n]);
    }
    return area / 2.0;
}
```
</details>

---

## 🎯 关联板块

- <Waypoints className="inline-block w-4 h-4 mr-1 text-blue-500" /> [凸包算法 (Convex Hull)](convex-hull) - 构建最小凸闭包。
- <Target className="inline-block w-4 h-4 mr-1 text-amber-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 线性约束求解。
- <MoveRight className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [扫描线技巧 (Scanning Line)](scanning-line) - 降维打击几何覆盖。
