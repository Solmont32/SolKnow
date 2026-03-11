---
title: 计算几何基础 (Geometry Basics)
description: 系统化向量运算、拓扑性质判定与几何对象抽象。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Trophy, Waypoints, Compass, Target, Circle, MoveRight } from 'lucide-react';

# 计算几何基础 (Geometry Basics)

计算几何（Computational Geometry）是算法竞赛中逻辑最为严密的版块之一。其核心在于通过**向量算子**将欧几里得几何直观转化为代数运算，并利用**精度控制**屏蔽浮点数截断带来的逻辑崩塌。

---

## 1. 精度控制与数值鲁棒性

由于 `double` 遵循 IEEE 754 标准，其有效位数约为 15-17 位。在涉及减法（尤其是两个相近数相减）和叉积运算时，误差会迅速积累。

### 符号函数 (Sign Function)
```cpp
typedef double DB;
const DB eps = 1e-9;
const DB PI = acos(-1.0);

int sign(DB x) {
    if (fabs(x) < eps) return 0;
    return x < 0 ? -1 : 1;
}

int dcmp(DB x, DB y) {
    return sign(x - y);
}
```

---

## 2. 几何对象抽象 (Geometric Abstraction)

在工业级实现中，建议将几何对象封装为结构体，并重载基础算子。

### 2.1 点与向量 (Point & Vector)
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

DB dot(Vector a, Vector b) { return a.x * b.x + a.y * b.y; }
DB cross(Vector a, Vector b) { return a.x * b.y - a.y * b.x; }
DB length(Vector a) { return sqrt(dot(a, a)); }
DB angle(Vector a, Vector b) { return acos(dot(a, b) / length(a) / length(b)); }
```

### 2.2 直线与线段 (Line & Segment)
直线通常使用“点+方向向量”表示：$P = P_0 + t\vec{v}$。
```cpp
struct Line {
    Point p; Vector v;
    DB ang;
    Line() {}
    Line(Point p, Vector v) : p(p), v(v) { ang = atan2(v.y, v.x); }
    // 获取直线上 parameter 为 t 的点
    Point point(DB t) { return p + v * t; }
};
```

### 2.3 圆 (Circle)
```cpp
struct Circle {
    Point c; DB r;
    Circle(Point c, DB r) : c(c), r(r) {}
    Point point(DB a) { // 根据圆心角获取圆上点
        return {c.x + cos(a) * r, c.y + sin(a) * r};
    }
};
```

---

## 3. 核心拓扑性质判定 (Topological Predicates)

### 3.1 点与直线的关系
1. **点在直线上**: `sign(cross(p - L.p, L.v)) == 0`。
2. **点到直线的距离**: 
   $$d = \frac{|\vec{v} \times \vec{AP}|}{|\vec{v}|}$$
3. **点在直线上的投影**:
   $$P' = A + \frac{\vec{AP} \cdot \vec{v}}{|\vec{v}|^2}\vec{v}$$

### 3.2 线段相交判定
**规范相交**: 两条线段恰好有一个不在端点处的交点。
**非规范相交**: 交点可能在端点，或两线段部分重合。

```cpp
// 判定点 c 是否在线段 ab 上
bool onSegment(Point p, Point a, Point b) {
    return sign(cross(a - p, b - p)) == 0 && sign(dot(a - p, b - p)) <= 0;
}

// 判定线段 ab 与 cd 是否相交
bool segmentIntersection(Point a, Point b, Point c, Point d) {
    DB c1 = cross(b - a, c - a), c2 = cross(b - a, d - a);
    DB c3 = cross(d - c, a - c), c4 = cross(d - c, b - c);
    // 跨立实验
    if (sign(c1) * sign(c2) < 0 && sign(c3) * sign(c4) < 0) return true;
    // 端点重合或在线段上
    if (onSegment(c, a, b) || onSegment(d, a, b) || 
        onSegment(a, c, d) || onSegment(b, c, d)) return true;
    return false;
}
```

---

## 4. 经典练习与推导

<details>
<summary>例题 1：直线交点求解 (Line-Line Intersection)</summary>

**题目描述**：给定两条直线 $L_1: P_1 + t\vec{v}_1$ 和 $L_2: P_2 + w\vec{v}_2$，求其交点。

**解答思路**：
设交点为 $P_1 + t\vec{v}_1$，则该点应满足在 $L_2$ 上，即：
$$(P_1 + t\vec{v}_1 - P_2) \times \vec{v}_2 = 0$$
利用叉积分配律推导：
$$(P_1 - P_2) \times \vec{v}_2 + t(\vec{v}_1 \times \vec{v}_2) = 0$$
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
<summary>例题 2：点关于直线的对称点</summary>

**题目描述**：给定点 $P$ 和直线 $L$，求 $P$ 关于 $L$ 的对称点 $P''$。

**解答思路**：
1. 求出 $P$ 在直线 $L$ 上的投影点 $P'$。
2. 对称点 $P'' = P' + (P' - P) = 2P' - P$。

```cpp
Point getSymmetricPoint(Point p, Line l) {
    Vector ap = p - l.p;
    Point p_proj = l.p + l.v * (dot(ap, l.v) / dot(l.v, l.v));
    return p_proj * 2 - p;
}
```
</details>

<details>
<summary>练习 1：判断多边形是否为凸多边形</summary>

**提示**：遍历所有顶点，检查相邻两条边的叉积符号是否一致（不含共线点）。

```cpp
bool isConvex(vector<Point>& poly) {
    int n = poly.size();
    int sgn = 0;
    for (int i = 0; i < n; i++) {
        int cur = sign(cross(poly[(i+1)%n] - poly[i], poly[(i+2)%n] - poly[(i+1)%n]));
        if (cur == 0) continue;
        if (sgn == 0) sgn = cur;
        else if (sgn != cur) return false;
    }
    return true;
}
```
</details>

---

## 🎯 关联练习与实战

<div className="solknow-card border border-green-200 p-4 rounded-lg bg-green-50/10">
  <div className="flex items-center gap-2 mb-2 text-green-600 font-bold">
    <Trophy size={18} />
    <span>算法竞赛习题库：计算几何专题</span>
  </div>
  <p className="text-sm text-gray-600">包含向量原语、凸包构造、旋转卡壳与半平面交的工业级 C++ 实现练习。</p>
  <a href="/docs/exercises/cs/algorithm-geometry" className="button button--outline button--success button--sm">进入练习库 →</a>
</div>

## 5. 模块索引

- <Waypoints className="inline-block w-4 h-4 mr-1 text-blue-500" /> [凸包算法 (Convex Hull)](convex-hull) - $O(N \log N)$ 的边界构建。
- <Compass className="inline-block w-4 h-4 mr-1 text-purple-500" /> [旋转卡壳 (Rotating Calipers)](rotating-calipers) - 对踵点搜索与直径求解。
- <Target className="inline-block w-4 h-4 mr-1 text-amber-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 线性约束下的可行域求解。
- <MoveRight className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [扫描线技巧 (Scanning Line)](scanning-line) - 离散化与区间覆盖面积。
