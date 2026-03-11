---
title: 旋转卡壳 (Rotating Calipers)
description: 对踵点搜索、凸多边形直径与最小面积外接矩形。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Waypoints, Maximize2, Box, MoveRight } from 'lucide-react';

# 旋转卡壳 (Rotating Calipers)

**旋转卡壳（Rotating Calipers）** 是一种基于双指针（或多指针）在凸多边形上进行线性扫描的技术。其核心思想是利用多边形的凸性，使得某些关键点（如对踵点）的移动具有单调性。

---

## 1. 核心应用：凸包直径 (Diameter)

凸多边形的直径是指多边形上任意两点间的最大距离。

### 算法原理
对于凸多边形的每一条边，距离该边最远的点一定是直径的一个端点。
1. 枚举凸包的每一条边 $E_i = (P_i, P_{i+1})$。
2. 维护一个点 $P_k$，使得 $\triangle P_i P_{i+1} P_k$ 的面积最大。
3. 随着 $i$ 的顺时针移动，为了维持面积最大，$k$ 也必然单调顺时针移动。
4. 直径即为 $\max(dist(P_i, P_k), dist(P_{i+1}, P_k))$。

```cpp
double getDiameter(vector<Point>& h) {
    int n = h.size();
    if (n == 2) return length(h[0] - h[1]);
    double res = 0;
    // 双指针维护对踵点
    for (int i = 0, k = 2; i < n; i++) {
        // 比较三角形面积 (即叉积大小)
        while (sign(cross(h[(i+1)%n] - h[i], h[(k+1)%n] - h[i]) - 
                   cross(h[(i+1)%n] - h[i], h[k] - h[i])) > 0)
            k = (k + 1) % n;
        res = max({res, length(h[i] - h[k]), length(h[(i+1)%n] - h[k])});
    }
    return res;
}
```

---

## 2. 进阶应用：最小面积外接矩形

给定点集，求一个面积最小的矩形，使其包含所有点。

### 2.1 关键结论
**最小面积外接矩形的一条边必然与凸包的一条边共线。**

### 2.2 算法流程 (三指针卡壳)
1. 建立凸包。
2. 枚举凸包的边 $E_i = (P_i, P_{i+1})$ 作为矩形底边方向。
3. 维护三个指针：
   - **顶端指针 $k$**: 距离底边最远的点（叉积最大）。
   - **右端指针 $r$**: 在底边方向投影最大的点（点积最大）。
   - **左端指针 $l$**: 在底边方向投影最小的点（点积最小）。
4. 随着 $E_i$ 的转动，三个指针均单调移动，复杂度 $O(N)$。

---

## 3. 经典练习

<details>
<summary>例题 1：最远点对 (Luogu P1452)</summary>

**题目描述**：给定 $N$ 个点，求其中两点间距离的平方的最大值。

**解答思路**：
1. 先求出凸包（Andrew 算法）。
2. 使用旋转卡壳算法寻找对踵点，更新最大距离平方。

```cpp
long long distSq(Point a, Point b) {
    return (long long)(a.x-b.x)*(a.x-b.x) + (long long)(a.y-b.y)*(a.y-b.y);
}

long long solve(vector<Point>& pts) {
    auto h = getHull(pts);
    int n = h.size();
    if (n == 2) return distSq(h[0], h[1]);
    long long res = 0;
    for (int i = 0, k = 1; i < n; i++) {
        while (cross(h[(i+1)%n] - h[i], h[(k+1)%n] - h[i]) > 
               cross(h[(i+1)%n] - h[i], h[k] - h[i]))
            k = (k + 1) % n;
        res = max({res, distSq(h[i], h[k]), distSq(h[(i+1)%n], h[k])});
    }
    return res;
}
```
</details>

<details>
<summary>例题 2：最小包围矩形面积</summary>

**题目描述**：给定 $N$ 个点，求覆盖所有点的最小矩形面积。

**解答思路**：
1. 按照“关键结论”枚举底边。
2. 利用点积和叉积计算矩形的宽 $W$ 和高 $H$。
3. $Area = W \times H$。

```cpp
// 核心逻辑：利用 tr (top), r (right), l (left) 指针计算
double L = dot(h[i+1]-h[i], h[i+1]-h[i]);
double H = cross(h[i+1]-h[i], h[tr]-h[i]) / sqrt(L);
double W = (dot(h[i+1]-h[i], h[r]-h[i]) - dot(h[i+1]-h[i], h[l]-h[i])) / sqrt(L);
res = min(res, H * W);
```
</details>

<details>
<summary>练习 1：凸多边形间的最小距离</summary>

**题目描述**：给定两个不相交的凸多边形，求它们之间的最小距离。

**提示**：两个多边形的最小距离一定发生在点-点、点-边或边-边之间。利用两个指针在两个凸包上同时旋转卡壳。

```cpp
// 复杂度 O(N + M)
```
</details>

---

## 4. 模块导航

- <Waypoints className="inline-block w-4 h-4 mr-1 text-blue-500" /> [凸包算法 (Convex Hull)](convex-hull) - 旋转卡壳的基础预处理。
- <Box className="inline-block w-4 h-4 mr-1 text-amber-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 处理约束区域。
- <MoveRight className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [计算几何基础](index) - 向量运算原语。
