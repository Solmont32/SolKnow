---
title: 半平面交 (Half-plane Intersection)
description: 极角排序、双端队列维护与线性约束求解证明。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Target, ShieldCheck, Activity, BookOpen, Layers, ShieldAlert, Scale } from 'lucide-react';

# 半平面交 (Half-plane Intersection)

在平面直角坐标系中，一条有向直线将平面分为两个区域，每个区域称为一个**半平面**。多个半平面的交集构成的凸区域（可能为空或无界）即为**半平面交**。它是线性规划问题的几何体现。

---

## 1. 形式化描述与拓扑性质证明

**定义**：一个半平面 $H_i$ 可以表示为 $H_i = \{ (x, y) \in \mathbb{R}^2 \mid ax + by + c \ge 0 \}$。

<KnowledgeCard type="theorem" title="半平面交的拓扑一致性">

**定理 1：凸性收敛**
半平面交 $S = \bigcap H_i$ 的凸性保证了扫描算法的收敛性。
**证明**：
设 $P, Q \in S$，由交集定义，$P, Q \in H_i$ 对所有 $i$ 成立。
由于每个 $H_i$ 是凸集（线性约束定义的空间必为凸），线段 $PQ \subseteq H_i$ 成立。
因此 $PQ \subseteq \bigcap H_i = S$，由凸集定义，$S$ 为凸集。

**定理 2：极角排序的拓扑意义**
对有向直线进行极角排序，保证了构建过程中相邻直线的交点始终沿着凸包边界逆时针推进，这是双端队列维护正确性的核心。

</KnowledgeCard>

---

## 2. 精度收敛与数值稳定性 (Numerical Stability)

在半平面交中，由于涉及大量直线交点计算，误差的累积与放大是核心风险。

### 2.1 交点误差放大效应

<KnowledgeCard type="warning" title="接近平行的直线判定">

若两条直线 $L_i, L_j$ 的夹角 $\theta \to 0$（几近平行），交点坐标 $P$ 的绝对误差 $\delta(P)$ 满足：
$$\delta(P) \approx \frac{L \cdot \epsilon_{mach}}{\sin \theta}$$
其中 $L$ 是坐标量级。当 $\sin \theta$ 极小时，交点坐标可能发生剧烈跳变。

**收敛建议**：
1. **预去重**：在极角排序后，合并夹角 $\Delta \theta < \epsilon$ 的直线，仅保留最内侧者。
2. **包围盒**：增加一个极大的矩形限制（Bounding Box），防止无界区域导致的坐标溢出。

</KnowledgeCard>

### 2.2 核心代码实现 (C++)

```cpp
struct Line {
    Point p; Vector v; DB ang;
    Line() {}
    Line(Point p, Vector v): p(p), v(v) { ang = atan2(v.y, v.x); }
    // 排序优先级：极角升序，极角相同时保留最左侧
    bool operator< (const Line& L) const {
        if (sign(ang - L.ang) != 0) return ang < L.ang;
        return sign(cross(v, L.p - p)) > 0;
    }
};

// 检查直线 L 与队列中交点 P 的关系
bool onRight(Line L, Point P) {
    return sign(cross(L.v, P - L.p)) < 0; // P 在 L 右侧则该点无效
}

vector<Point> halfPlaneIntersection(vector<Line>& L) {
    sort(L.begin(), L.end());
    int n = L.size();
    vector<Line> q(n + 5);
    vector<Point> p(n + 5);

    // 1. 去重：极角相同时保留最内侧直线
    int m = 0;
    for (int i = 0; i < n; i++) {
        if (i > 0 && sign(L[i].ang - L[i-1].ang) == 0) continue;
        L[m++] = L[i];
    }

    // 2. 双端队列扫描
    int head = 0, tail = 0;
    for (int i = 0; i < m; i++) {
        while (tail - head > 1 && onRight(L[i], p[tail - 1])) tail--;
        while (tail - head > 1 && onRight(L[i], p[head + 1])) head++;
        q[tail++] = L[i];
        if (tail - head > 1) p[tail - 1] = getLineIntersection(q[tail-2], q[tail-1]);
    }
    // 闭合处理
    while (tail - head > 1 && onRight(q[head], p[tail - 1])) tail--;

    if (tail - head < 3) return {}; // 交集为空或退化
    p[head] = getLineIntersection(q[head], q[tail-1]);

    vector<Point> res;
    for (int i = head; i < tail; i++) res.push_back(p[i]);
    return res;
}
```

---

## 3. 经典练习与应用 (Exercises)

<details>
<summary>例题 1：多边形核 (Polygon Kernel)</summary>

**题目描述**：给定一个 $n$ 边形，判断其核（Kernel）是否为空。核是内部所有点都能看到所有顶点的集合。
**证明**：多边形的核是所有边所在半平面的交。由于半平面交必为凸集，故多边形的核若不为空，则必为凸多边形。

<details>
<summary>Check Solution</summary>

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
<summary>练习 1：最大内切圆 (Largest Inscribed Circle)</summary>

**题目描述**：给定凸多边形，求其内部半径最大的圆。
**思路**：二分半径 $R$。将每条边向内平移 $R$ 距离后，检查半平面交是否非空。
**代数一致性**：平移距离 $d$ 对应的向量为 $d \cdot \frac{\text{normal}}{\text{length}}$。

<details>
<summary>Check Solution</summary>

```cpp
Line moveLeft(Line L, DB d) {
    Vector n = {-L.v.y, L.v.x}; // 左垂直向量
    n = n / length(n) * d;
    return Line(L.p + n, L.v);
}

bool check(DB R, const vector<Line>& L) {
    vector<Line> shifted;
    for (auto& line : L) shifted.push_back(moveLeft(line, R));
    return halfPlaneIntersection(shifted).size() > 0;
}
```

</details>
</details>

<details>
<summary>练习 2：凸多边形的最小包含面积三角形</summary>

**题目描述**：给定凸多边形，求一个面积最小的三角形，使其包含该多边形。
**思路**：三角形的三条边必然与凸多边形的三条支撑线重合。可以通过旋转卡壳或半平面交的变体进行求解。

</details>

---

## 🎯 模块导航

- <Target className="inline-block w-4 h-4 mr-1 text-blue-500" /> [凸包算法 (Convex Hull)](convex-hull) - 几何基础。
- <Layers className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [旋转卡壳 (Rotating Calipers)](rotating-calipers) - 求解极值问题。
- <ShieldAlert className="inline-block w-4 h-4 mr-1 text-red-500" /> [计算几何基础](index) - 精度控制策略。
