---
title: 旋转卡壳 (Rotating Calipers)
description: 凸包对踵点维护、线性时间几何特性求解。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Waypoints, Zap, Activity, BookOpen, Scaling } from 'lucide-react';

# 旋转卡壳 (Rotating Calipers)

**旋转卡壳**（Rotating Calipers）是由 Michael Shamos 在 1978 年提出的一种在凸多边形（通常是凸包）上进行线性扫描的高效算法。它的形象比喻是：用两根平行的直线“卡”住多边形并旋转一周，从而在 $O(N)$ 时间内提取多边形的各种极性特征。

---

## 1. 核心概念：对踵点 (Antipodal Pairs)

<KnowledgeCard type="theorem" title="对踵点定义">
在一个凸多边形中，如果两个点 $P, Q$ 可以被两条平行的切线（Supporting Lines）支撑，则称 $(P, Q)$ 为一对**对踵点**。
**性质**：凸多边形的直径（任意两点间的最大距离）必然在一对对踵点处取得。
</KnowledgeCard>

---

## 2. 求解多边形直径 (Diameter)

### 2.1 算法推导

1.  建立一个初始对踵点对（通常是 $y$ 坐标最小和最大的两个点）。
2.  顺时针旋转平行线。每当平行线与某条边重合时，更新对踵点。
3.  **计算实现**：利用面积的单调性。固定一条边 $P_i P_{i+1}$，在凸包上寻找距离该边最远的点 $P_j$。由于凸性，$P_j$ 的距离关于 $i$ 是单调的。

### 2.2 核心代码实现 (C++)

```cpp
DB getDiameter(const vector<Point>& h) {
    int n = h.size();
    if (n == 2) return length(h[0] - h[1]);
    DB res = 0;
    int j = 2; // 最远点指针
    for (int i = 0; i < n; i++) {
        // 寻找距离边 h[i]-h[i+1] 最远的点 j
        while (sign(cross(h[i+1] - h[i], h[j] - h[i]) -
                   cross(h[i+1] - h[i], h[(j+1)%n] - h[i])) < 0) {
            j = (j + 1) % n;
        }
        res = max({res, length(h[i] - h[j]), length(h[i+1] - h[j])});
    }
    return res;
}
```

---

## 3. 高阶应用：最小外接矩形 (Min-Area Bounding Box)

<KnowledgeCard type="algorithm" title="矩形卡壳步骤">

1.  矩形的一条边必然与凸包的一条边重合。
2.  对于凸包的每一条边 $L$，维护三个极点：
    - **点 A**：距离 $L$ 最远的点（决定高度）。
    - **点 B**：在该方向投影最左的点。
    - **点 C**：在该方向投影最右的点。
3.  随着 $L$ 的旋转，A, B, C 均线性单调移动。

</KnowledgeCard>

---

## 4. 复杂度与鲁棒性 (Analysis)

<KnowledgeCard type="complexity">
- **时间复杂度**: $O(N)$。在预处理（求凸包 $O(N \log N)$）之后，旋转卡壳仅需遍历凸包顶点。每个指针在旋转过程中最多移动 $2N$ 次。
- **空间复杂度**: $O(N)$。
- **鲁棒性**: 
    -   需注意处理凸包退化为线段的情况。
    -   在计算最小矩形面积时，需使用投影点积和叉积，避免不必要的开根号以保持精度。
</KnowledgeCard>

---

## 5. 经典练习库

<details>
<summary>例题 1：最小外接矩形面积 (HDU 1787)</summary>

**题目要求**：求给定点集的最小外接矩形面积。
**思路**：凸包 + 旋转卡壳。维护上、左、右三个极点，实时计算面积 $S = \text{height} \times \text{width}$。

```cpp
// 伪代码思路
for (int i = 0; i < n; i++) {
    // 更新最远点 p
    while(dist(edge, h[p]) < dist(edge, h[p+1])) p = (p+1)%n;
    // 更新最左点 l
    while(projection(edge, h[l]) > projection(edge, h[l+1])) l = (l+1)%n;
    // 更新最右点 r
    while(projection(edge, h[r]) < projection(edge, h[r+1])) r = (r+1)%n;
    // 计算面积并更新最小结果
}
```

</details>

<details>
<summary>例题 2：凸多边形间最小距离</summary>

**题目要求**：求两个不相交凸多边形的最小距离。
**思路**：同步旋转两个多边形的切线，寻找距离最近的一对边/点。

</details>

<KnowledgeCard type="tip" title="习题库推荐">
1.  [POJ 2187] Beauty Contest - 求解凸包直径。
2.  [POJ 3608] Bridge Across Islands - 两个凸包间的最小距离。
3.  [UVA 10173] Smallest Bounding Box - 最小外接矩形。
</KnowledgeCard>

---

## 🎯 模块导航

- <Waypoints className="inline-block w-4 h-4 mr-1 text-blue-500" /> [凸包算法 (Convex Hull)](convex-hull) - 基础结构。
- <Scaling className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 对偶问题。
- <Activity className="inline-block w-4 h-4 mr-1 text-amber-500" /> [计算几何基础](index) - 向量原语。
