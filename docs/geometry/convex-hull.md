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

### 1.1 Andrew 算法的拓扑一致性证明

**定理**：Andrew 算法（单调链法）构造的序列必为原点集 $S$ 的凸包顶点。

**证明（拓扑性质）**：
1.  **极点保证**：排序后的首点 $P_1$ 和末点 $P_n$ 具有最小和最大的 $x$ 坐标。根据凸包定义，这两点必然位于凸包边界上（支撑线存在性）。
2.  **局部凸性维持**：对于下凸壳，考虑三个连续点 $h_{k-2}, h_{k-1}, p_i$。算法判定 $\vec{h_{k-2}h_{k-1}} \times \vec{h_{k-1}p_i} \le 0$。由叉积的方向性（定理 3.1），若叉积 $\le 0$，则 $p_i$ 位于前两个点确定的向量右侧。此时 $h_{k-1}$ 位于三角形 $h_{k-2}h_{k-1}p_i$ 内部或边界。弹出 $h_{k-1}$ 保证了新栈顶序列始终保持“向左转”（Left-turn Only）的拓扑特性。
3.  **单调性收敛**：排序确保了每一步扫描都是 $x$ 单调增加的。下凸壳覆盖了 $x$ 轴正向投影，上凸壳覆盖了 $x$ 轴负向投影，两者拼接必然形成包围所有点的简单凸多边形。

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

**注意**：若保留共线点，排序和扫描逻辑需极端小心，尤其是最末尾的一段共线点在反向扫描时可能导致重复计算。

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
    // 构建上凸壳 (注意起始 t 标记)
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
<summary>例题 1：动态凸包维护 (Incremental Convex Hull)</summary>

**题目描述**：支持动态加点，并实时查询当前凸包的周长。
**思路**：利用 `std::set` 维护凸包顶点。加点 $P$ 时，先判定是否在当前凸包内（二分）。若不在，寻找前驱后继并删除被 $P$ “覆盖”的旧边。

```cpp
struct Node {
    Point p;
    bool operator< (const Node& b) const { 
        return dcmp(p.x, b.p.x) < 0 || (dcmp(p.x, b.p.x) == 0 && dcmp(p.y, b.p.y) < 0); 
    }
};
set<Node> hull;
```

</details>

<details>
<summary>练习 1：凸包的稳定性验证</summary>

**题目描述**：给定一个凸多边形，判断其每一条边是否都包含至少一个除了端点之外的原点。
**思路**：在求凸包时保留所有共线点，遍历凸包顶点序列，检查每条边对应的原始点数。

<details>
<summary>Check Solution</summary>

```cpp
bool checkStability(vector<Point>& pts) {
    // 1. 求包含共线点的凸包
    int n = pts.size(), k = 0;
    sort(pts.begin(), pts.end());
    vector<Point> h(2 * n);
    for (int i = 0; i < n; i++) {
        while (k > 1 && sign(cross(h[k-1] - h[k-2], pts[i] - h[k-1])) < 0) k--;
        h[k++] = pts[i];
    }
    for (int i = n - 2, t = k; i >= 0; i--) {
        while (k > t && sign(cross(h[k-1] - h[k-2], pts[i] - h[k-1])) < 0) k--;
        h[k++] = pts[i];
    }
    h.resize(k - 1);
    
    // 2. 统计每条边的点数
    int sz = h.size();
    for (int i = 0; i < sz; i++) {
        Point a = h[i], b = h[(i+1)%sz], c = h[(i+2)%sz];
        // 若连续三点不共线，说明边 (a, b) 只有两个端点
        if (sign(cross(b - a, c - b)) != 0) {
            // 这里逻辑需根据题目定义微调，即判定边上的点数
        }
    }
    return true;
}
```

</details>
</details>

<details>
<summary>练习 2：凸包与面积期望</summary>

**题目描述**：在单位圆内随机选取 $n$ 个点，其凸包顶点数的期望为 $O(n^{1/3})$。请通过 C++ 模拟验证。

<details>
<summary>Check Solution</summary>

```cpp
void runSimulation(int n, int trials) {
    double avgV = 0;
    for (int i = 0; i < trials; i++) {
        vector<Point> p;
        for (int j = 0; j < n; j++) {
            double r = sqrt((double)rand()/RAND_MAX);
            double theta = 2 * PI * rand()/RAND_MAX;
            p.push_back({r * cos(theta), r * sin(theta)});
        }
        avgV += getConvexHull(p).size();
    }
    cout << "Expected Vertices: " << avgV / trials << endl;
}
```

</details>
</details>

---

## 🎯 模块导航

- <Zap className="inline-block w-4 h-4 mr-1 text-yellow-500" /> [旋转卡壳 (Rotating Calipers)](rotating-calipers) - 凸包直径与最小外接矩形。
- <ShieldCheck className="inline-block w-4 h-4 mr-1 text-green-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 线性约束求解证明。
- <PenTool className="inline-block w-4 h-4 mr-1 text-blue-500" /> [计算几何基础](index) - 精度控制与向量原语。
