---
title: 旋转卡壳 (Rotating Calipers)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { MousePointer2, Move, LayoutGrid } from 'lucide-react';

# 旋转卡壳 (Rotating Calipers)

**旋转卡壳（Rotating Calipers）** 是一种高效处理凸多边形（如凸包）相关几何问题的技术。它的基本思想是：利用两根平行的直线“卡”住凸多边形并旋转，寻找特定性质的点对。

---

## 1. 核心应用：凸包直径 (Convex Hull Diameter)

凸包直径定义为凸多边形上任意两点之间的最大距离。根据性质，直径一定由凸多边形的两个顶点构成，且这两个顶点通常是一对**对踵点 (Antipodal Points)**。

### 对踵点性质
如果凸多边形上的两个顶点 $P, Q$ 之间存在两条平行的支撑直线，则称 $(P, Q)$ 为一对对踵点。

---

## 2. 算法实现

利用双指针的思想，当一根直线沿着凸包边缘旋转时，另一根平行线也会相应旋转。

### 求解步骤
1. 求出点集的**凸包**（通常使用 Andrew 算法）。
2. 若凸包顶点数 $\le 2$，直接计算距离。
3. 利用双指针扫描：
   - 固定一条边 $P_i P_{i+1}$。
   - 找到距离该边最远的点 $P_k$（利用叉积计算三角形面积来判断距离）。
   - 随着 $i$ 的增加，$k$ 也是单调不减的（在凸包上顺时针旋转）。
   - 维护 $dist(P_i, P_k)$ 和 $dist(P_{i+1}, P_k)$ 的最大值。

### 叉积判断距离
三角形 $P_i P_{i+1} P_k$ 的面积越大，点 $P_k$ 到直线 $P_i P_{i+1}$ 的距离就越远。
$$Area(P_i, P_{i+1}, P_k) = \text{cross}(P_{i+1}-P_i, P_k-P_i)$$

---

## 3. 代码实现 (C++)

```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>
using namespace std;

typedef double DB;
struct Point {
    DB x, y;
};

DB distSq(Point a, Point b) {
    return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
}

DB cross(Point a, Point b, Point c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

DB rotatingCalipers(vector<Point>& hull) {
    int n = hull.size();
    if (n == 2) return distSq(hull[0], hull[1]);
    
    DB maxDist = 0;
    for (int i = 0, k = 2; i < n; i++) {
        // 当前边为 hull[i] -> hull[i+1]
        // 找到距离这条边最远的点 hull[k]
        // 利用三角形面积判定：cross(A, B, C) 是平行四边形面积
        while (cross(hull[i], hull[(i + 1) % n], hull[(k + 1) % n]) > 
               cross(hull[i], hull[(i + 1) % n], hull[k])) {
            k = (k + 1) % n;
        }
        maxDist = max(maxDist, distSq(hull[i], hull[k]));
        maxDist = max(maxDist, distSq(hull[(i + 1) % n], hull[k]));
    }
    return maxDist;
}
```

---

## 4. 更多应用

旋转卡壳不仅可以求直径，还可以解决以下问题：
1. **最小面积外接矩形**：通过旋转三根互相垂直/平行的卡壳线。
2. **多边形间最小距离**：求两个不相交凸多边形的最短距离。
3. **最大空凸多边形**。

<KnowledgeCard type="info" title="复杂度说明">
虽然代码中嵌套了循环，但由于指针 <code>k</code> 在整个过程中最多绕凸包旋转两圈，因此总时间复杂度为 $O(n)$，其中 $n$ 为凸包顶点数。
</KnowledgeCard>

---

## 5. 综合练习

- [练习库：凸包与旋转卡壳](../exercises/cs/algorithm-geometry)
