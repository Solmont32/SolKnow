---
title: 凸包算法 (Convex Hull)
description: Andrew's 算法、拓扑性质证明与几何鲁棒性边界分析。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Waypoints, ShieldCheck, Zap, PenTool, Activity, BookOpen, Scale } from 'lucide-react';

# 凸包算法 (Convex Hull)

给定平面上的一组点，能够包含所有这些点的最小凸多边形称为**凸包（Convex Hull）**。在计算几何中，凸包算法是许多复杂问题的预处理基石。

---

## 1. 形式化定义与拓扑性质

<KnowledgeCard type="theorem" title="凸包的等价定义">

1.  **最小性**：包含点集 $S$ 的所有凸集的交集。
2.  **外推性**：由 $S$ 中点作为顶点的凸多边形，且所有点都在该多边形内或边界上。

</KnowledgeCard>

### 1.1 Andrew 算法（单调链法）的严格证明

**算法步骤**：
1. 将所有点按 $x$ 坐标升序排序（$x$ 相同时按 $y$ 升序）。
2. 从左到右构建下凸壳，从右到左构建上凸壳。

**证明（拓扑性质）**：
1.  **极点保证**：排序后的首点 $P_1$ 和末点 $P_n$ 具有最小和最大的 $x$ 坐标。根据凸包定义，这两点必然位于凸包边界上（支撑线存在性）。
2.  **局部凸性维持**：对于下凸壳，考虑三个连续点 $h_{k-2}, h_{k-1}, p_i$。算法判定 $\vec{h_{k-2}h_{k-1}} \times \vec{h_{k-1}p_i} \le 0$。由叉积的方向性，若叉积 $\le 0$，则 $p_i$ 位于前两个点确定的向量右侧或共线。此时 $h_{k-1}$ 位于线段 $h_{k-2}p_i$ 的左侧或上方（对于下凸壳而言是“凹陷”的）。弹出 $h_{k-1}$ 保证了新栈顶序列始终保持“向左转”（Left-turn Only）的拓扑特性。
3.  **单调性与全覆盖**：排序确保了每一步扫描都是 $x$ 单调增加的。下凸壳覆盖了 $S$ 的所有点在 $x$ 轴上的投影下方区域。由对称性，上凸壳覆盖了上方区域。两链拼接形成的简单多边形 $H$ 满足：所有 $P \in S$ 都在 $H$ 内部或边界。由于每一步都保持了局部凸性且起始/终止于极点，$H$ 必为 $S$ 的凸包。

---

## 2. 拓扑一致性验证 (Topological Consistency)

在构建凸包时，**退化情况**可能破坏拓扑结构：

<KnowledgeCard type="warning" title="重合点与垂直退化">

- **重合点**：若 $S$ 中存在多个相同坐标的点，`sort` 后它们相邻。必须在预处理中去重，或在叉积判定中严格使用 $\epsilon$。
- **垂直线**：若所有点都在一条垂直线上，凸包退化为一条线段。
- **退化拓扑判定**：
  ```cpp
  // 拓扑一致性校验：凸包点数不应小于 3 (除非所有点共线)
  if (hull.size() < 3 && pts.size() >= 3) {
      // 说明所有点共线，凸包退化为线段
  }
  ```

</KnowledgeCard>


<KnowledgeCard type="info" title="共线点处理策略">

在构建凸包时，共线点的处理决定了算法的行为：
- **严格凸包**：使用 `sign(cross(...)) <= 0` 弹出。此时凸包边上不含除顶点外的点。
- **包含边界点**：使用 `sign(cross(...)) < 0` 弹出。此时共线点会被保留。

**注意**：若保留共线点，上凸壳扫描起始位置需为 $n-2$，且最后的 `resize(k-1)` 逻辑需确保不误删共线点。

</KnowledgeCard>

---

## 3. 核心代码实现 (C++)

```cpp
vector<Point> getConvexHull(vector<Point>& p) {
    int n = p.size(), k = 0;
    if (n <= 2) return p;
    sort(p.begin(), p.end());
    vector<Point> h(2 * n);
    // 构建下凸壳
    for (int i = 0; i < n; i++) {
        while (k > 1 && sign(cross(h[k-1] - h[k-2], p[i] - h[k-1])) <= 0) k--;
        h[k++] = p[i];
    }
    // 构建上凸壳
    for (int i = n - 2, t = k; i >= 0; i--) {
        while (k > t && sign(cross(h[k-1] - h[k-2], p[i] - h[k-1])) <= 0) k--;
        h[k++] = p[i];
    }
    h.resize(k - 1); // 首尾点重复
    return h;
}
```

---

## 4. 经典推导与练习库 (Exercises)

<details>
<summary>例题 1：动态凸包判定 (Point in Convex Polygon)</summary>

**题目描述**：给定一个凸多边形（顶点按逆时针排序），判断点 $P$ 是否在多边形内部。要求复杂度 $O(\log N)$。
**思路**：利用凸性。点 $P$ 必须在所有有向边 $P_iP_{i+1}$ 的左侧。通过二分查找找到 $P$ 可能对应的向量区间。

<details>
<summary>Check Solution</summary>

```cpp
bool isPointInConvex(const vector<Point>& h, Point p) {
    int n = h.size();
    // 基础判定：是否在最左侧两边的夹角内
    if (sign(cross(h[1] - h[0], p - h[0])) < 0) return false;
    if (sign(cross(h[n-1] - h[0], p - h[0])) > 0) return false;
    
    // 二分查找向量
    int l = 1, r = n - 2, line = -1;
    while (l <= r) {
        int mid = (l + r) >> 1;
        if (sign(cross(h[mid] - h[0], p - h[0])) >= 0) {
            line = mid; l = mid + 1;
        } else r = mid - 1;
    }
    return sign(cross(h[line+1] - h[line], p - h[line])) >= 0;
}
```

</details>
</details>

<details>
<summary>练习 1：凸包的稳定性验证</summary>

**题目描述**：给定一个凸多边形，判断其每一条边是否都包含至少一个除了端点之外的原点（即该凸包在轻微扰动下是否稳定）。
**思路**：求凸包时保留所有共线点，检查凸包相邻三点是否共线。

<details>
<summary>Check Solution</summary>

```cpp
bool isStable(vector<Point>& pts) {
    int n = pts.size();
    if (n < 6) return false; // 每条边至少 3 点，至少 3 条边
    sort(pts.begin(), pts.end());
    int k = 0; vector<Point> h(2 * n);
    // 保留共线点：使用 < 0
    for (int i = 0; i < n; i++) {
        while (k > 1 && sign(cross(h[k-1]-h[k-2], pts[i]-h[k-1])) < 0) k--;
        h[k++] = pts[i];
    }
    for (int i = n-2, t = k; i >= 0; i--) {
        while (k > t && sign(cross(h[k-1]-h[k-2], pts[i]-h[k-1])) < 0) k--;
        h[k++] = pts[i];
    }
    h.resize(k - 1);
    
    int sz = h.size();
    for (int i = 0; i < sz; i++) {
        // 如果点 i 和前后都不共线，说明边 i-1, i 和 i, i+1 都是不稳定的
        if (sign(cross(h[(i+1)%sz]-h[i], h[(i+2)%sz]-h[(i+1)%sz])) != 0 &&
            sign(cross(h[i]-h[(i-1+sz)%sz], h[(i+1)%sz]-h[i])) != 0) return false;
    }
    return true;
}
```

</details>
</details>

<details>
<summary>练习 2：凸多边形相交判定</summary>

**题目描述**：给定两个凸多边形 $A, B$，判断它们是否相交。要求复杂度 $O(N+M)$。
**思路**：利用分离轴定理（SAT）或闵可夫斯基和（Minkowski Sum）。若 $A - B$ 的闵可夫斯基和包含原点，则相交。

</details>

---

## 🎯 模块导航

- <Zap className="inline-block w-4 h-4 mr-1 text-yellow-500" /> [旋转卡壳 (Rotating Calipers)](rotating-calipers) - 凸包直径与最小外接矩形。
- <ShieldCheck className="inline-block w-4 h-4 mr-1 text-green-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 线性约束求解证明。
- <PenTool className="inline-block w-4 h-4 mr-1 text-blue-500" /> [计算几何基础](index) - 精度控制与向量原语。
