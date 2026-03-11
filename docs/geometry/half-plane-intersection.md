---
title: 半平面交 (Half-plane Intersection)
description: 线性约束下的凸多边形可行域求解，$O(N \log N)$ 算法。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Target, Layers, LayoutGrid, Zap } from 'lucide-react';

# 半平面交 (Half-plane Intersection)

**半平面交（Half-plane Intersection）** 是求解一组线性约束（即半平面）的交集的问题。其结果通常是一个凸多边形（可能为空或无界）。

---

## 1. 算法背景与数学表达

一个有向直线 $L$ 将平面分为两部分。我们约定直线的**左侧**为有效区域。
数学表达为：对于直线 $P + t\vec{v}$，其左侧点 $Q$ 满足：
$$\vec{v} \times (Q - P) \ge 0$$

### 核心性质
1. **凸性**: 半平面的交集一定是**凸集**（由凸集的交集仍为凸集证明）。
2. **状态**: 结果可能是有界多边形、无界区域、线段、点或空集。
3. **极角排序**: 算法的关键在于按向量极角排序，确保扫描的单调性。

---

## 2. 算法实现：S&I 算法 (Sutherland-Hodgman Variant)

目前主流的 $O(N \log N)$ 算法是基于**双端队列**维护有向直线的扫描算法。

### 算法步骤
1. **预处理**: 对直线按极角排序。若极角相同，仅保留最靠左的一条。
2. **初始化**: 维护一个双端队列 `deque`。
3. **扫描**:
   - 依次遍历排序后的直线 $L_i$。
   - 当队尾两直线的交点在 $L_i$ 右侧时，弹出队尾。
   - 当队头两直线的交点在 $L_i$ 右侧时，弹出队头。
   - 将 $L_i$ 入队。
4. **收尾**: 重复上述剔除逻辑，处理循环情况（队尾交点在队头直线右侧）。

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
    return sign(cross(L.v, p - L.p)) < 0; // 这里的判定应严格小于 0
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
    
    if (tail - head <= 1) return {}; // 空集或一条线
    vector<Point> poly;
    for (int i = head; i < tail; i++) poly.push_back(getIntersect(q[i], q[i+1]));
    poly.push_back(getIntersect(q[tail], q[head]));
    return poly;
}
```

---

## 3. 应用场景

1. **多边形核 (Polygon Kernel)**：判定是否存在一个区域，该区域内所有点都能看到多边形的所有点。
2. **线性规划**：求解约束 $Ax \le B$ 的可行域。
3. **三角形外接圆/内切圆变体**: 处理多个距离约束的交集。

---

## 4. 经典练习

<details>
<summary>例题 1：多边形的核 (POJ 3335)</summary>

**题目描述**：判定一个简单多边形是否存在一个点，使得该点与多边形所有顶点的连线都在多边形内部。

**解答思路**：
1. 将多边形的每一条边看作一条有向直线。
2. 注意题目给出的顶点顺序可能是顺时针或逆时针，需统一。
3. 求解所有这些直线的半平面交。
4. 若交集不为空且面积大于 0，则存在核。

```cpp
bool hasKernel(vector<Point>& poly) {
    vector<Line> lines;
    int n = poly.size();
    for (int i = 0; i < n; i++) {
        lines.push_back(Line(poly[i], poly[(i+1)%n] - poly[i]));
    }
    auto res = halfPlaneIntersection(lines);
    return !res.empty();
}
```
</details>

<details>
<summary>例题 2：最小包围三角形</summary>

**题目描述**：给定一个凸多边形，求面积最小的包含它的三角形。

**解答思路**：
1. 该问题通常使用旋转卡壳或特定贪心，但在寻找约束区域时，半平面交是核心逻辑。
2. 三个切线构成的半平面交即为候选三角形。

```cpp
// 核心逻辑通常结合旋转卡壳
```
</details>

<details>
<summary>练习 1：赛车路线 (P4022 变体)</summary>

**题目描述**：给定一组加速直线 $y = k_i x + b_i$，求最终能够显现（在最上方）的直线段。

**提示**：将直线转化为半平面 $y \ge k_i x + b_i$，求解交集。其上边界即为结果。

```cpp
// 这里的半平面是 y - kx >= b，利用单调性简化。
```
</details>

---

## 5. 模块导航

- <Target className="inline-block w-4 h-4 mr-1 text-red-500" /> [计算几何基础](index) - 了解叉积与直线表示。
- <Layers className="inline-block w-4 h-4 mr-1 text-purple-500" /> [凸包算法 (Convex Hull)](convex-hull) - 凸包与半平面交的二元性。
- <Zap className="inline-block w-4 h-4 mr-1 text-yellow-500" /> [旋转卡壳 (Rotating Calipers)](rotating-calipers) - 处理凸多边形的对踵属性。
