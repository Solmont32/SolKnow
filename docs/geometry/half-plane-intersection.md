---
title: 半平面交 (Half-plane Intersection)
description: 极角排序、双端队列维护与线性约束求解证明。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Target, ShieldCheck, Activity, BookOpen, Layers, ShieldAlert } from 'lucide-react';

# 半平面交 (Half-plane Intersection)

在平面直角坐标系中，一条有向直线将平面分为两个区域，每个区域称为一个**半平面**。多个半平面的交集构成的凸区域（可能为空或无界）即为**半平面交**。它是线性规划问题的几何体现。

---

## 1. 形式化描述与拓扑性质证明

### 1.1 算术表示

一个半平面可以表示为线性不等式：
$$ax + by + c \ge 0$$
在计算几何实现中，通常使用**有向直线**表示：规定直线左侧为有效区域。

<KnowledgeCard type="theorem" title="交集的凸性与存在性证明">

**定理 1：凸性证明**
每个半平面都是凸集。根据凸集的定义，若 $A, B$ 在交集内，则它们在每个半平面内。由于每个半平面是凸的，线段 $AB$ 也在每个半平面内，因此线段 $AB$ 在交集内。得证。

**定理 2：Helly 定理 (应用)**
在平面上，如果一组有限个凸多边形中任意三个都有公共点，那么这组多边形全体必有公共点。
*推论*：判定半平面交是否为空，理论上可以转化为检查每三个半平面的交集。

</KnowledgeCard>

---

## 2. $O(N \log N)$ 增量算法 (Sort-and-Scan)

目前主流的算法是基于极角排序的增量法，利用双端队列维护当前半平面序列。

### 2.1 几何鲁棒性边界分析 (Robustness)

<KnowledgeCard type="warning" title="平行线与退化判定">

1.  **平行线处理**：若极角相同且方向一致，必须仅保留“最内侧”的直线。
2.  **极角排序冲突**：在处理极角相同的直线时，若不进行去重或择优，算法会产生除零错误或逻辑死循环。
3.  **无界转化为有界**：为简化实现，建议预先添加一个巨大的矩形框（如 $[-10^{12}, 10^{12}]$）包裹所有可能区域。

</KnowledgeCard>

### 2.2 核心代码实现 (C++)

```cpp
struct Line {
    Point p; Vector v; DB ang;
    Line() {}
    Line(Point p, Vector v): p(p), v(v) { ang = atan2(v.y, v.x); }
    // 排序优先级：极角升序
    bool operator< (const Line& L) const { return ang < L.ang; }
};

// 检查直线 L 与队列中交点 P 的关系
bool onRight(Line L, Point P) {
    return sign(cross(L.v, P - L.p)) < 0; // P 在 L 右侧则该点无效
}

vector<Point> halfPlaneIntersection(vector<Line>& L) {
    sort(L.begin(), L.end());
    int n = L.size(), head = 0, tail = 0;
    vector<Line> q(n + 5);
    vector<Point> p(n + 5);

    // 1. 去重：极角相同时保留最左侧直线
    int m = 0;
    for (int i = 0; i < n; i++) {
        if (i > 0 && sign(L[i].ang - L[i-1].ang) == 0) {
            if (onRight(L[m-1], L[i].p)) L[m-1] = L[i]; // L[i] 坐标更内侧
            continue;
        }
        L[m++] = L[i];
    }

    // 2. 双端队列扫描
    for (int i = 0; i < m; i++) {
        while (tail - head > 1 && onRight(L[i], p[tail - 1])) tail--;
        while (tail - head > 1 && onRight(L[i], p[head + 1])) head++;
        q[tail++] = L[i];
        if (tail - head > 1) p[tail - 1] = getLineIntersection(q[tail-2], q[tail-1]);
    }
    while (tail - head > 1 && onRight(q[head], p[tail - 1])) tail--;

    if (tail - head < 3) return {}; // 交集为空或点、线
    p[head] = getLineIntersection(q[head], q[tail-1]); // 计算最后一个顶点

    vector<Point> res;
    for (int i = head; i < tail; i++) res.push_back(p[i]);
    return res;
}
```

---

## 3. 经典练习与应用 (Exercises)

<details>
<summary>例题 1：多边形核 (Polygon Kernel)</summary>

**题目描述**：给定一个 $n$ 边形，判断是否存在一个点 $P$ 位于多边形内部，且 $P$ 与多边形所有顶点连线均不穿过外部（即 $P$ 能看到所有边）。

<details>
<summary>Check Solution</summary>

多边形的核即为所有边所在直线的半平面交。
*注意：顶点顺序必须统一为逆时针，确保左侧为内部。*

```cpp
bool hasKernel(const vector<Point>& poly) {
    int n = poly.size();
    vector<Line> lines;
    for (int i = 0; i < n; i++) 
        lines.push_back(Line(poly[i], poly[(i+1)%n] - poly[i]));
    return halfPlaneIntersection(lines).size() >= 3;
}
```

</details>
</details>

<details>
<summary>练习 1：最大内切圆中心 (Largest Inscribed Circle)</summary>

**题目描述**：给定一个凸多边形，求其内部最大的圆。
**思路**：将问题转化为半平面交。圆心 $(x, y)$ 到边 $ax+by+c=0$ 的距离 $\frac{|ax+by+c|}{\sqrt{a^2+b^2}} \ge R$。
通过**二分答案 $R$**，将每条边向内平移 $R$ 距离，检查平移后的半平面交是否为空。

<details>
<summary>Check Solution</summary>

```cpp
// 直线向左平移 d 距离
Line moveLeft(Line L, DB d) {
    Vector normal = {-L.v.y, L.v.x}; // 左垂直向量
    normal = normal / length(normal) * d;
    return Line(L.p + normal, L.v);
}

bool check(DB R, const vector<Line>& L) {
    vector<Line> shifted;
    for (auto& line : L) shifted.push_back(moveLeft(line, R));
    return halfPlaneIntersection(shifted).size() >= 1; // 仅需非空
}
```

</details>
</details>

<details>
<summary>练习 2：赛车竞速 (Intersection of Linear Constraints)</summary>

**题目描述**：有 $n$ 辆赛车在无限长的跑道上以恒定速度行驶，给定初始位置 $s_i$ 和速度 $v_i$。求哪些赛车在某些时刻（$t \ge 0$）能够处于领先位置（即排名第一）。
**思路**：
赛车 $i$ 的轨迹为直线 $f_i(t) = v_it + s_i$。处于领先位置意味着 $f_i(t) \ge f_j(t)$ 对所有 $j$ 成立。这相当于求解所有半平面 $f_i(t) - f_j(t) \ge 0$ 的交。在 $(t, s)$ 坐标系中，这对应于下凸壳或半平面交的上边界。

</details>

---

## 🎯 模块导航

- <Target className="inline-block w-4 h-4 mr-1 text-blue-500" /> [凸包算法 (Convex Hull)](convex-hull) - 几何基础。
- <Layers className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [旋转卡壳 (Rotating Calipers)](rotating-calipers) - 求解极值问题。
- <ShieldAlert className="inline-block w-4 h-4 mr-1 text-red-500" /> [计算几何基础](index) - 精度控制策略。
