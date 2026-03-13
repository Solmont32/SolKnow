---
title: 半平面交 (Half-plane Intersection)
description: 极角排序、双端队列维护与线性约束求解证明。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import CodeCollapse from '@site/src/components/CodeCollapse';
import { Target, ShieldCheck, Activity, BookOpen, Layers, ShieldAlert, Scale } from 'lucide-react';

# 半平面交 (Half-plane Intersection)

在平面直角坐标系中，一条有向直线将平面分为两个区域，每个区域称为一个**半平面**。多个半平面的交集构成的凸区域（可能为空或无界）即为**半平面交**。它是线性规划问题的几何体现。

---

## 1. 形式化描述与拓扑性质证明

**定义**：一个半平面 $H_i$ 可以表示为 $H_i = \{ (x, y) \in \mathbb{R}^2 \mid ax + by + c \ge 0 \}$。在计算几何中，通常由有向直线 $\vec{PQ}$ 定义，$H_i$ 位于向量 $\vec{PQ}$ 的左侧。

<KnowledgeCard type="theorem" title="半平面交的拓扑一致性">

**定理 1：凸性收敛证明**
**命题**：半平面交 $S = \bigcap H_i$ 必为凸集。
**证明**：
1. 线性约束 $ax + by + c \ge 0$ 定义的是半平面，它是凸集。
2. 任意数量凸集的交集仍为凸集（凸性的交集封闭性）。
故 $S$ 为凸集。其拓扑结构表现为凸多边形（有界）或凸链（无界）。

**定理 2：极角扫描法的正确性**
对所有有向直线按极角排序。排序确保了相邻直线的交点沿着凸包边界逆时针旋转。双端队列（Deque）维护这一单调链，使得每次加入新直线时，只需检查队列两端的交点是否被新直线排除。

</KnowledgeCard>

---

## 2. 交点存在性一致性校验 (Intersection Consistency)

在半平面交中，由于涉及大量直线交点计算，误差的累积与放大是核心风险。

### 2.1 交点存在性判定

<KnowledgeCard type="warning" title="接近平行的直线判定">

若两条直线 $L_i, L_j$ 的夹角 $\theta \to 0$（几近平行），交点坐标 $P$ 的绝对误差 $\delta(P)$ 满足：
$$\delta(P) \approx \frac{L \cdot \epsilon_{mach}}{\sin \theta}$$
其中 $L$ 是坐标量级。当 $\sin \theta < \epsilon$ 时，交点计算会导致严重的精度崩塌。

**鲁棒性策略**：
1. **预去重**：极角排序后，若 $\text{ang}_i = \text{ang}_{i+1}$，仅保留最内侧（即最左侧）的直线。通过 `sign(cross(v, L.p - p)) > 0` 判定。
2. **平行过滤**：在 `getLineIntersection` 中，若 $|\vec{v_1} \times \vec{v_2}| < \text{eps}$，必须判定为平行且不相交。

</KnowledgeCard>

---

## 3. 教材级核心算法实现 (C++)

<CodeCollapse title="半平面交 (Incremental Algorithm) 完整实现" language="cpp">

```cpp
struct Line {
    Point p; Vector v; DB ang;
    Line() {}
    Line(Point p, Vector v): p(p), v(v) { ang = atan2(v.y, v.x); }
    // 排序规则：极角升序，极角相同时靠左侧的直线排在后面以保留
    bool operator< (const Line& L) const {
        if (sign(ang - L.ang) != 0) return ang < L.ang;
        return sign(cross(v, L.p - p)) > 0;
    }
};

// 检查直线 L 是否排除点 P (P 在 L 的右侧则被排除)
bool onRight(Line L, Point P) {
    return sign(cross(L.v, P - L.p)) < 0;
}

vector<Point> halfPlaneIntersection(vector<Line>& L) {
    sort(L.begin(), L.end());
    int n = L.size(), m = 0;
    // 1. 预处理：去重，相同极角仅保留最内侧
    vector<Line> L_clean;
    for (int i = 0; i < n; i++) {
        if (i > 0 && sign(L[i].ang - L[i-1].ang) == 0) continue;
        L_clean.push_back(L[i]);
    }

    // 2. 双端队列维护单调链
    int head = 0, tail = 0;
    int k = L_clean.size();
    vector<Line> q(k + 5);
    vector<Point> p(k + 5);
    for (int i = 0; i < k; i++) {
        while (tail - head > 1 && onRight(L_clean[i], p[tail - 1])) tail--;
        while (tail - head > 1 && onRight(L_clean[i], p[head + 1])) head++;
        q[tail++] = L_clean[i];
        if (tail - head > 1) p[tail - 1] = getLineIntersection(q[tail-2], q[tail-1]);
    }
    // 3. 闭合判定：用队首直线检查队尾交点
    while (tail - head > 1 && onRight(q[head], p[tail - 1])) tail--;
    
    if (tail - head < 3) return {}; // 交集退化
    p[head] = getLineIntersection(q[head], q[tail-1]);

    vector<Point> res;
    for (int i = head; i < tail; i++) res.push_back(p[i]);
    return res;
}
```

</CodeCollapse>

---

## 4. 经典教材级例题与应用 (Exercises)

<details>
<summary>例题 1：多边形核 (Polygon Kernel) 存在性证明</summary>

**题目描述**：判断一个多边形的核（Kernel）是否为空。
**证明**：多边形的核是内部所有点都能看到所有顶点的集合。这等价于点必须位于所有边的左侧（若逆时针）。因此，多边形的核即为其边所在半平面的交。

<details>
<summary>Check Solution</summary>

<CodeCollapse title="多边形核判定" language="cpp">

```cpp
bool hasKernel(const vector<Point>& poly) {
    int n = poly.size();
    vector<Line> lines;
    for (int i = 0; i < n; i++) 
        lines.push_back(Line(poly[i], poly[(i+1)%n] - poly[i]));
    return halfPlaneIntersection(lines).size() >= 3;
}
```

</CodeCollapse>

</details>
</details>

<details>
<summary>练习 1：最大内切圆 - 二分 + 半平面交</summary>

**题目描述**：在凸多边形内求半径最大的圆。
**思路**：
1. 若半径为 $R$，则圆心必在所有边向内平移 $R$ 后的半平面交内。
2. 二分 $R$，检查平移后的半平面交是否非空。
**一致性校验**：平移后的直线 $L'$ 定义为 $L.p + \vec{n} \cdot R$，其中 $\vec{n}$ 为单位法向量。

<details>
<summary>Check Solution</summary>

<CodeCollapse title="半平面平移封装" language="cpp">

```cpp
Line moveLeft(Line L, DB d) {
    Vector n = {-L.v.y, L.v.x}; 
    n = n / length(n) * d;
    return Line(L.p + n, L.v);
}
```

</CodeCollapse>

</details>
</details>

<details>
<summary>练习 2：线性约束可行域面积</summary>

**题目描述**：给定一组约束 $A_i x + B_i y + C_i \ge 0$，且 $x, y \in [-10^9, 10^9]$，求可行域面积。
**技巧**：先添加四个边界半平面构成初始矩形，再运行半平面交。

<details>
<summary>Check Solution</summary>

提示：将约束转化为直线形式：$ax + by + c = 0$ 对应点 $P$ 和方向向量 $V$。注意方向必须满足左侧为可行域。

</details>
</details>

---

## 🎯 模块导航

- <Target className="inline-block w-4 h-4 mr-1 text-blue-500" /> [凸包算法 (Convex Hull)](convex-hull) - 几何基础。
- <Layers className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [旋转卡壳 (Rotating Calipers)](rotating-calipers) - 求解极值问题。
- <ShieldAlert className="inline-block w-4 h-4 mr-1 text-red-500" /> [计算几何基础](index) - 精度控制策略。
