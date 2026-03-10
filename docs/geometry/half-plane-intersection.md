---
title: 半平面交 (Half-plane Intersection)
description: 线性约束下的凸多边形可行域求解，$O(N \log N)$ 算法。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Target, Layers, LayoutGrid } from 'lucide-react';

# 半平面交 (Half-plane Intersection)

**半平面交（Half-plane Intersection）** 是求解一组线性约束（即半平面）的交集的问题。其结果通常是一个凸多边形（可能为空或无界）。

---

## 1. 算法背景

一个有向直线 $L$ 将平面分为两部分。我们通常约定直线的**左侧**为有效区域（半平面）。
给定 $N$ 条有向直线，求解它们的公共交集。

### 核心性质
1. 半平面的交集一定是**凸集**。
2. 结果可能是一个有界的凸多边形，也可能是无界的，甚至是空集。

---

## 2. 算法实现：S&I 算法 (Sutherland-Hodgman Variant)

目前主流的 $O(N \log N)$ 算法是基于**双端队列**维护有向直线的扫描算法。

### 算法步骤
1. **预处理**: 对直线按极角排序。若极角相同，仅保留最靠左的一条。
2. **初始化**: 维护一个双端队列，存放可能构成交集的直线。
3. **扫描**:
   - 依次遍历排序后的直线 $L_i$。
   - 当队列尾部两直线的交点在 $L_i$ 右侧时，弹出队尾（因为 $L_i$ 更严苛）。
   - 当队列头部两直线的交点在 $L_i$ 右侧时，弹出队头。
4. **收尾**: 重复上述剔除逻辑（处理循环情况）。

```cpp
struct Line {
    Point p; Vector v; double ang;
    Line() {}
    Line(Point p, Vector v): p(p), v(v) { ang = atan2(v.y, v.x); }
    bool operator< (const Line& L) const { return ang < L.ang; }
};

Point getIntersect(Line a, Line b) {
    Vector u = a.p - b.p;
    double t = cross(b.v, u) / cross(a.v, b.v);
    return a.p + a.v * t;
}

bool onRight(Line L, Point p) {
    return sign(cross(L.v, p - L.p)) <= 0;
}

vector<Point> halfPlaneIntersection(vector<Line>& L) {
    sort(L.begin(), L.end());
    int n = L.size(), head = 0, tail = 0;
    vector<Line> q(n + 10);
    vector<Line> resL;
    for (int i = 0; i < n; i++) {
        if (i > 0 && sign(L[i].ang - L[i-1].ang) == 0) continue;
        while (head < tail && onRight(L[i], getIntersect(q[tail-1], q[tail]))) tail--;
        while (head < tail && onRight(L[i], getIntersect(q[head], q[head+1]))) head++;
        q[++tail] = L[i];
    }
    while (head < tail && onRight(q[head], getIntersect(q[tail-1], q[tail]))) tail--;
    
    if (tail - head <= 1) return {};
    vector<Point> poly;
    for (int i = head; i < tail; i++) poly.push_back(getIntersect(q[i], q[i+1]));
    poly.push_back(getIntersect(q[tail], q[head]));
    return poly;
}
```

---

## 3. 应用场景

1. **多边形核 (Polygon Kernel)**：判定是否存在一个区域，该区域内所有点都能看到多边形的所有边。
2. **线性规划**：求解约束 $Ax \le B$ 的可行域。
3. **最小覆盖圆/球**：虽然有 $O(N)$ 随机增量法，但半平面交也是基础方案。

---

## 4. 经典练习

<details>
<summary>例题：多边形的核 (POJ 3335)</summary>

**题目描述**：判定一个简单多边形是否存在一个点，使得该点与多边形所有顶点的连线都在多边形内部。

**解答思路**：
1. 将多边形的每一条边看作一条有向直线。
2. 求解所有这些直线的半平面交。
3. 若交集不为空，则存在核。

```cpp
bool hasKernel(vector<Point>& poly) {
    vector<Line> lines;
    int n = poly.size();
    for (int i = 0; i < n; i++) {
        lines.push_back(Line(poly[i], poly[(i+1)%n] - poly[i]));
    }
    return !halfPlaneIntersection(lines).empty();
}
```
</details>

---

## 5. 模块导航

- <Target className="inline-block w-4 h-4 mr-1 text-red-500" /> [计算几何基础](index) - 了解叉积与直线表示。
- <Layers className="inline-block w-4 h-4 mr-1 text-purple-500" /> [凸包算法 (Convex Hull)](convex-hull) - 凸包与半平面交的二元性。
