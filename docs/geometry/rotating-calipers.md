---
title: 旋转卡壳 (Rotating Calipers)
description: 凸包对踵点维护、线性时间几何特性求解与拓扑证明。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Waypoints, Zap, Activity, BookOpen, Scaling, ShieldAlert } from 'lucide-react';

# 旋转卡壳 (Rotating Calipers)

**旋转卡壳**（Rotating Calipers）是由 Michael Shamos 提出的一种在凸多边形（通常是凸包）上进行线性扫描的高效算法。它的形象比喻是：用两根平行的直线“卡”住多边形并旋转一周，从而在 $O(N)$ 时间内提取多边形的各种极性特征。

---

## 1. 核心概念与拓扑证明

### 1.1 对踵点 (Antipodal Pairs)

<KnowledgeCard type="theorem" title="对踵点与直径性质证明">

**定义**：在一个凸多边形中，如果两个点 $P, Q$ 可以被两条平行的切线（Supporting Lines）支撑，则称 $(P, Q)$ 为一对**对踵点**。

**证明：直径必然在对踵点处取得**
设 $P, Q$ 是凸多边形 $H$ 中距离最远的两点。分别过 $P, Q$ 作垂直于线段 $PQ$ 的直线 $L_P, L_Q$。若 $H$ 在 $L_P$ 的外部仍有点，则该点到 $Q$ 的距离必然大于 $PQ$，与 $PQ$ 为最大距离矛盾。因此 $L_P, L_Q$ 必然是 $H$ 的支撑线。得证。

</KnowledgeCard>

---

## 2. 几何鲁棒性边界 (Robustness)

<KnowledgeCard type="warning" title="旋转卡壳中的退化判定">

1.  **平行边处理**：当凸包上存在两条平行的边时，旋转过程中会同时与这两条边重合。此时需确保面积判定 `sign(cross(...) - cross(...))` 能够正确处理等号情况。
2.  **点积与叉积的协同**：在求解最小外接矩形时，高度由叉积决定，宽度由点积（投影）决定。必须确保两者的 $\epsilon$ 判定一致。
3.  **单调性失效风险**：如果输入的点集不是凸的，或者凸包构建有误，旋转卡壳的单调性指针会失效。

</KnowledgeCard>

---

## 3. 核心算法实现：凸包直径 (C++)

```cpp
DB getDiameter(const vector<Point>& h) {
    int n = h.size();
    if (n < 2) return 0;
    if (n == 2) return length(h[0] - h[1]);
    DB res = 0;
    int j = 2; // 最远点指针
    for (int i = 0; i < n; i++) {
        // 寻找距离边 h[i]-h[i+1] 最远的点 j
        // 利用叉积比较三角形面积，面积大则距离远
        while (sign(cross(h[i+1] - h[i], h[j] - h[i]) -
                   cross(h[i+1] - h[i], h[(j+1)%n] - h[i])) < 0) {
            j = (j + 1) % n;
        }
        // 对踵点可能为 (h[i], h[j]) 或 (h[i+1], h[j])
        res = max({res, distSq(h[i], h[j]), distSq(h[i+1], h[j])});
    }
    return sqrt(res);
}
```

---

## 4. 经典练习库 (Exercises)

<details>
<summary>例题 1：最小外接矩形面积 (Min-Area Rectangle)</summary>

**题目描述**：给定 $n$ 个点，求覆盖所有点的面积最小的矩形。
**思路**：最小面积矩形的一条边必然与凸包的一条边重合。
维护三个指针：最远点 $p$、最左点 $l$、最右点 $r$。

<details>
<summary>Check Solution</summary>

```cpp
DB minBoundingBox(vector<Point>& pts) {
    vector<Point> h = getConvexHull(pts);
    int n = h.size();
    DB minS = 1e18;
    int p = 1, l = 1, r = 1;
    for (int i = 0; i < n; i++) {
        Vector v = h[(i+1)%n] - h[i];
        DB d = length(v);
        // 更新高度点 p (叉积最大)
        while (sign(cross(v, h[(p+1)%n] - h[i]) - cross(v, h[p] - h[i])) >= 0) p = (p+1)%n;
        // 更新右侧点 r (点积最大)
        while (sign(dot(v, h[(r+1)%n] - h[i]) - dot(v, h[r] - h[i])) >= 0) r = (r+1)%n;
        if (i == 0) l = r;
        // 更新左侧点 l (点积最小)
        while (sign(dot(v, h[(l+1)%n] - h[i]) - dot(v, h[l] - h[i])) <= 0) l = (l+1)%n;
        
        DB H = cross(v, h[p] - h[i]) / d;
        DB W = (dot(v, h[r] - h[i]) - dot(v, h[l] - h[i])) / d;
        minS = min(minS, H * W);
    }
    return minS;
}
```

</details>
</details>

<details>
<summary>练习 1：两个凸包的最小距离</summary>

**题目描述**：给定两个不相交的凸包 $A, B$，求它们之间的最短距离。
**思路**：使用两组卡壳平行线。寻找 $A$ 上的边和 $B$ 上的点，或反之，使得距离最小。

<details>
<summary>Check Solution</summary>

```cpp
DB minDistanceBetweenHulls(vector<Point>& A, vector<Point>& B) {
    int n = A.size(), m = B.size();
    // 找到 A 的 y 最小和 B 的 y 最大点
    int a = 0, b = 0;
    for (int i = 1; i < n; i++) if (A[i].y < A[a].y) a = i;
    for (int i = 1; i < m; i++) if (B[i].y > B[b].y) b = i;
    DB res = 1e18;
    for (int i = 0; i < n; i++) {
        // 旋转过程中更新 B 上的对应点
        while (sign(cross(A[(a+1)%n] - A[a], B[(b+1)%m] - A[a]) - 
                   cross(A[(a+1)%n] - A[a], B[b] - A[a])) < 0) b = (b+1)%m;
        res = min(res, distToSegment(B[b], A[a], A[(a+1)%n]));
        a = (a+1)%n;
    }
    return res;
}
```

</details>
</details>

<details>
<summary>练习 2：多边形内的最大三角形</summary>

**题目描述**：在给定的凸多边形中，选出三个顶点，使得构成的三角形面积最大。
**思路**：固定一个底边 $h[i]h[j]$，面积最大的第三点必然是旋转卡壳中的极点。复杂度 $O(n^2)$ 或优化至 $O(n)$。

</details>

---

## 🎯 模块导航

- <Waypoints className="inline-block w-4 h-4 mr-1 text-blue-500" /> [凸包算法 (Convex Hull)](convex-hull) - 几何预处理。
- <Scaling className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 线性约束。
- <ShieldAlert className="inline-block w-4 h-4 mr-1 text-red-500" /> [计算几何基础](index) - 鲁棒性与精度。
