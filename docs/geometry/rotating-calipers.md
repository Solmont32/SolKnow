---
title: 旋转卡壳 (Rotating Calipers)
description: 凸包对踵点维护、线性时间几何特性求解与拓扑证明。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Waypoints, Zap, Activity, BookOpen, Scaling, ShieldAlert, Scale } from 'lucide-react';

# 旋转卡壳 (Rotating Calipers)

**旋转卡壳**（Rotating Calipers）是由 Michael Shamos 提出的一种在凸多边形（通常是凸包）上进行线性扫描的高效算法。它的形象比喻是：用两根平行的直线“卡”住多边形并旋转一周，从而在 $O(N)$ 时间内提取多边形的各种极性特征。

---

## 1. 核心概念与拓扑证明

### 1.1 对踵点 (Antipodal Pairs) 及其拓扑单调性

<KnowledgeCard type="theorem" title="对踵点与直径性质证明">

**定义**：在凸多边形 $H$ 中，如果点 $P, Q$ 可由两条平行切线（Supporting Lines）支撑，则 $(P, Q)$ 为对踵点对。

**证明：直径取得性**
1.  **极值性**：令 $d(P, Q) = \max_{A, B \in H} d(A, B)$。设 $L_P, L_Q$ 为过 $P, Q$ 且垂直于 $PQ$ 的直线。
2.  **支撑性**：若 $H$ 在 $L_P$ 的 $Q$ 点反侧有部分区域，则该区域内的点 $P'$ 到 $Q$ 的距离 $d(P', Q) > d(P, Q)$（由直角三角形斜边性质），矛盾。
3.  **对踵性**：故 $L_P, L_Q$ 必然是 $H$ 的平行支撑线，$(P, Q)$ 必为对踵点。

**单调性（Monotonicity）证明**：
设当前支撑线与边 $e_i = P_iP_{i+1}$ 重合，对踵点为 $Q_j$。当支撑线旋转至下一条边 $e_{i+1}$ 时，对应的最远点 $Q_{j'}$ 在多边形边界上的位置必然满足 $j' \ge j$（逆时针序）。
*直觉*：多边形的凸性保证了顶点到对边的垂直距离函数是**单峰（Unimodal）**的。

</KnowledgeCard>

---

## 2. 拓扑不变性分析 (Topology Invariance)

在特殊几何构型下，旋转卡壳需保持逻辑一致性：

<KnowledgeCard type="warning" title="退化拓扑处理">

1.  **线段凸包**：若凸包仅含两点 $P, Q$，对踵点即为 $(P, Q)$。算法应判定 `n == 2` 并直接返回 $d(P, Q)$。
2.  **平行边退化**：若旋转过程中支撑线同时与两条平行边重合，此时对踵点对包含两对端点（四个点）。
    - **一致性要求**：指针更新判定应使用 `sign(area_next - area_curr) >= 0` 以遍历所有可能的对踵点对。

</KnowledgeCard>


```cpp
DB getDiameter(const vector<Point>& h) {
    int n = h.size();
    if (n < 2) return 0;
    if (n == 2) return length(h[0] - h[1]);
    DB res = 0;
    int j = 1; // 对踵点指针
    for (int i = 0; i < n; i++) {
        // 寻找距离边 h[i]-h[i+1] 最远的点 j
        while (sign(cross(h[(i+1)%n] - h[i], h[(j+1)%n] - h[i]) -
                   cross(h[(i+1)%n] - h[i], h[j] - h[i])) > 0) {
            j = (j + 1) % n;
        }
        res = max({res, distSq(h[i], h[j]), distSq(h[(i+1)%n], h[j])});
    }
    return sqrt(res);
}
```

---

## 3. 经典练习库 (Exercises)

<details>
<summary>例题 1：最小外接矩形 (Min-Area Rectangle)</summary>

**题目描述**：给定 $n$ 个点，求覆盖所有点的面积最小的矩形。
**定理**：面积最小的外接矩形必然有一条边与凸包的某条边共线。
**思路**：维护三个指针：高度最远点 $p$、最左点 $l$、最右点 $r$。

<details>
<summary>Check Solution</summary>

```cpp
DB minBoundingBox(vector<Point>& pts) {
    vector<Point> h = getConvexHull(pts);
    int n = h.size();
    if (n < 3) return 0;
    DB minS = 1e18;
    int p = 1, l = 1, r = 1;
    for (int i = 0; i < n; i++) {
        Vector v = h[(i+1)%n] - h[i];
        DB d2 = distSq(h[i], h[(i+1)%n]);
        // 旋转卡壳更新三个极点
        while (sign(cross(v, h[(p+1)%n] - h[i]) - cross(v, h[p] - h[i])) >= 0) p = (p+1)%n;
        while (sign(dot(v, h[(r+1)%n] - h[i]) - dot(v, h[r] - h[i])) >= 0) r = (r+1)%n;
        if (i == 0) l = r;
        while (sign(dot(v, h[(l+1)%n] - h[i]) - dot(v, h[l] - h[i])) <= 0) l = (l+1)%n;
        
        DB H = cross(v, h[p] - h[i]) / sqrt(d2);
        DB W = (dot(v, h[r] - h[i]) - dot(v, h[l] - h[i])) / sqrt(d2);
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
**思路**：最短距离可能在 点-点、点-边 之间取得。使用两组卡壳平行线。

<details>
<summary>Check Solution</summary>

```cpp
DB minDistanceBetweenHulls(vector<Point>& A, vector<Point>& B) {
    int n = A.size(), m = B.size();
    int a = 0, b = 0;
    for (int i = 1; i < n; i++) if (A[i].y < A[a].y) a = i;
    for (int i = 1; i < m; i++) if (B[i].y > B[b].y) b = i;
    DB res = 1e18;
    for (int i = 0; i < n; i++) {
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
<summary>练习 2：凸多边形内的最大三角形</summary>

**题目描述**：在给定的凸多边形中，选出三个顶点，使得构成的三角形面积最大。要求 $O(N)$。
**思路**：固定底边一个点 $i$，双指针维护另外两个点 $j, k$，使三角形 $ijk$ 面积最大。

</details>

---

## 🎯 模块导航

- <Waypoints className="inline-block w-4 h-4 mr-1 text-blue-500" /> [凸包算法 (Convex Hull)](convex-hull) - 几何预处理。
- <Scaling className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 线性约束。
- <ShieldAlert className="inline-block w-4 h-4 mr-1 text-red-500" /> [计算几何基础](index) - 鲁棒性与精度。
