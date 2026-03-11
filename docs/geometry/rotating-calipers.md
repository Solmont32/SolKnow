---
title: 旋转卡壳 (Rotating Calipers)
description: 对踵点搜索、凸多边形直径与最小面积外接矩形。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Waypoints, Maximize2, Box, MoveRight } from 'lucide-react';

# 旋转卡壳 (Rotating Calipers)

**旋转卡壳（Rotating Calipers）** 是一种基于双指针（或多指针）在凸多边形上进行线性扫描的技术。其核心思想是利用多边形的**凸性**，使得对踵点、宽度等关键属性的搜索具有单调性。

---

## 1. 核心应用：凸包直径与对踵点对

凸多边形的直径定义为 $D(P) = \max_{x, y \in P} dist(x, y)$。

### 1.1 算法原理 (双指针法)
1. 枚举凸多边形的每一条边 $E_i = (P_i, P_{i+1})$。
2. 寻找距离该边最远的一个顶点 $P_k$（即以 $E_i$ 为底，面积最大的三角形顶点）。
3. 当边 $E_i$ 顺时针转动时，$P_k$ 也必然顺时针转动。
4. 直径的候选值一定是这些点边对或点点对的距离。

```cpp
double getDiameter(const vector<Point>& h) {
    int n = h.size();
    if (n == 2) return length(h[0] - h[1]);
    double res = 0;
    // k 为对踵点指针
    for (int i = 0, k = 1; i < n; i++) {
        // 利用叉积比较三角形面积，寻找最远点
        while (cross(h[(i+1)%n] - h[i], h[(k+1)%n] - h[i]) > 
               cross(h[(i+1)%n] - h[i], h[k] - h[i])) {
            k = (k + 1) % n;
        }
        res = max({res, length(h[i] - h[k]), length(h[(i+1)%n] - h[k])});
    }
    return res;
}
```

---

## 2. 进阶应用：最小面积外接矩形

### 2.1 核心定理
**最小面积外接矩形的一条边必然与凸包的一条边共线。**

### 2.2 四指针卡壳逻辑
对于每一条边 $E_i$，维护三个方向上的极值点：
- **上端点 $u$**: 距离底边最远（叉积最大）。
- **右端点 $r$**: 在底边方向投影最大（点积最大）。
- **左端点 $l$**: 在底边方向投影最小（点积最小）。

```cpp
double minAreaRect(const vector<Point>& h) {
    int n = h.size();
    if (n < 3) return 0;
    double res = 1e18;
    int u = 1, r = 1, l = 1;
    for (int i = 0; i < n; i++) {
        Vector v = h[(i + 1) % n] - h[i];
        double L2 = dot(v, v);
        // 维护上端点
        while (cross(v, h[(u+1)%n] - h[i]) >= cross(v, h[u] - h[i])) u = (u + 1) % n;
        // 维护右端点
        while (dot(v, h[(r+1)%n] - h[i]) >= dot(v, h[r] - h[i])) r = (r + 1) % n;
        // 维护左端点（初次定位）
        if (i == 0) l = r;
        while (dot(v, h[(l+1)%n] - h[i]) <= dot(v, h[l] - h[i])) l = (l + 1) % n;
        
        double H = cross(v, h[u] - h[i]) / sqrt(L2);
        double W = (dot(v, h[r] - h[i]) - dot(v, h[l] - h[i])) / sqrt(L2);
        res = min(res, H * fabs(W));
    }
    return res;
}
```

---

## 3. 经典练习与推导

<details>
<summary>例题 1：最远点对距离平方</summary>

**题目要求**：给定 $N$ 个点，求其中两点间距离的平方的最大值。

**解答提示**：
1. 构建凸包。
2. 旋转卡壳求直径。
3. 返回距离平方（避免开方导致的精度损失）。

```cpp
long long solve(vector<Point>& pts) {
    auto h = getHull(pts);
    // ... 旋转卡壳逻辑 ...
}
```
</details>

<details>
<summary>练习 1：凸多边形宽度的 $O(N)$ 求解</summary>

**提示**：凸多边形的宽度定义为两条平行切线之间的最小距离。利用旋转卡壳维护两条平行线，记录最小距离即可。
</details>

---

## 4. 模块导航

- <Waypoints className="inline-block w-4 h-4 mr-1 text-blue-500" /> [凸包算法 (Convex Hull)](convex-hull) - 旋转卡壳的基础数据结构。
- <Box className="inline-block w-4 h-4 mr-1 text-amber-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 处理双向线性约束。
- <MoveRight className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [计算几何基础](index) - 向量运算与精度原语。
