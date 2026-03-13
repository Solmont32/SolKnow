---
title: 凸包算法 (Convex Hull)
description: Andrew's 算法、拓扑性质证明与几何鲁棒性边界分析。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import CodeCollapse from '@site/src/components/CodeCollapse';
import { Waypoints, ShieldCheck, Zap, PenTool, Activity, BookOpen, Scale } from 'lucide-react';

# 凸包算法 (Convex Hull)

给定平面上的一组点，能够包含所有这些点的最小凸多边形称为**凸包（Convex Hull）**。在计算几何中，凸包算法是许多复杂问题的预处理基石。

---

## 1. 形式化定义与拓扑性质

<KnowledgeCard type="theorem" title="凸包的等价定义">

1.  **集合论定义**：包含点集 $S$ 的所有凸集的交集 $\text{CH}(S) = \bigcap \{ K \supseteq S \mid K \text{ is convex} \}$。
2.  **组合定义**：$S$ 中所有点的凸组合构成的集合 $\{ \sum_{i=1}^n \lambda_i P_i \mid \sum \lambda_i = 1, \lambda_i \ge 0 \}$。

</KnowledgeCard>

### 1.1 Andrew 算法（单调链法）的单调性证明

Andrew 算法通过将凸包分解为**上凸壳（Upper Hull）**和**下凸壳（Lower Hull）**进行构建。

**证明：拓扑单调性与正确性**
1.  **全序单调性**：首先按 $x$ 坐标升序（$x$ 相同时按 $y$ 升序）对点集 $S$ 排序。排序后的序列 $P_1, P_2, \dots, P_n$ 确保了 $P_1$ 和 $P_n$ 必为凸包上的顶点（极点）。
2.  **局部凸性维持**：在构建下凸壳时，维护一个栈 $H$。对于新点 $P_i$，若 $\vec{H_{k-2}H_{k-1}} \times \vec{H_{k-1}P_i} \le 0$，说明 $H_{k-1}$ 相对于 $H_{k-2}$ 和 $P_i$ 构成的链发生了“右转”或共线。
    - **代数含义**：叉积 $\le 0$ 意味着 $H_{k-1}$ 落在向量 $\vec{H_{k-2}P_i}$ 的右侧。
    - **单调性**：由于 $x_{H_{k-2}} < x_{H_{k-1}} < x_{P_i}$，弹出 $H_{k-1}$ 后连接 $H_{k-2}$ 与 $P_i$ 必然会扩大下方覆盖区域且保持下凸性。
3.  **收敛性**：扫描完成后，下凸壳从 $P_1$ 单调增加至 $P_n$（按 $x$ 轴正向），上凸壳从 $P_n$ 单调减少回 $P_1$（按 $x$ 轴负向）。两链合围形成的区域包含了 $S$ 的所有点，且由于每一步都强制“左转”（Left-turn），结果必为凸集。

---

## 2. 拓扑一致性验证 (Topological Consistency)

在构建凸包时，**退化情况**可能破坏拓扑结构：

<KnowledgeCard type="warning" title="退化拓扑判定">

- **重合点**：必须通过 `unique` 去重，否则在叉积计算中会出现零向量，导致 `sign` 判定失效。
- **垂直退化**：若所有点 $x$ 坐标相同，排序后它们将按 $y$ 坐标排列。下凸壳将包含所有点，上凸壳则会立即退回起点。
- **一致性校验逻辑**：
  ```cpp
  // 拓扑一致性：结果点数应 >= 3 (除非所有点共线)
  if (hull.size() < 3 && pts.size() >= 3) {
      // 捕获退化为线段的情况
  }
  ```

</KnowledgeCard>


<KnowledgeCard type="info" title="共线点保留策略">

- **严格凸包**：使用 `sign(cross(...)) <= 0` 弹出。此时凸包边上不含除顶点外的点。
- **非严格凸包**：使用 `sign(cross(...)) < 0` 弹出。此时共线点会被保留。
**边界注意**：在处理上凸壳时，扫描起始位置应为 $n-2$，且最后的 `resize(k-1)` 逻辑需确保不误删首尾重复点。

</KnowledgeCard>

---

## 3. 教材级核心代码实现 (C++)

<CodeCollapse title="Andrew 算法 (Monotone Chain) 完整实现" language="cpp">

```cpp
vector<Point> getConvexHull(vector<Point>& p) {
    int n = p.size(), k = 0;
    if (n <= 2) return p;
    sort(p.begin(), p.end());
    // 去重以维护拓扑鲁棒性
    n = unique(p.begin(), p.end(), [](Point a, Point b) {
        return dcmp(a.x, b.x) == 0 && dcmp(a.y, b.y) == 0;
    }) - p.begin();
    p.resize(n);

    vector<Point> h(2 * n);
    // 构建下凸壳：强制左转 (CCW)
    for (int i = 0; i < n; i++) {
        while (k > 1 && sign(cross(h[k-1] - h[k-2], p[i] - h[k-1])) <= 0) k--;
        h[k++] = p[i];
    }
    // 构建上凸壳：从右向左反向扫描
    for (int i = n - 2, t = k; i >= 0; i--) {
        while (k > t && sign(cross(h[k-1] - h[k-2], p[i] - h[k-1])) <= 0) k--;
        h[k++] = p[i];
    }
    if (n > 1) h.resize(k - 1); // 弹出最后一个重复的首点
    return h;
}
```

</CodeCollapse>

---

## 4. 经典推导与练习库 (Exercises)

<details>
<summary>例题 1：动态凸包判定 - 二分加速证明</summary>

**题目描述**：给定一个逆时针序凸多边形，判断点 $P$ 是否在内部。
**推导**：
对于凸多边形 $V_0, V_1, \dots, V_{n-1}$，取 $V_0$ 为原点。点 $P$ 在多边形内当且仅当：
1. $P$ 落在角 $\angle V_{n-1}V_0V_1$ 之间。
2. 找到 $V_i, V_{i+1}$ 使得 $P$ 落在角 $\angle V_iV_0V_{i+1}$ 内。
3. $P$ 在有向边 $\vec{V_iV_{i+1}}$ 的左侧。
由于 $\angle V_iV_0V_{i+1}$ 随 $i$ 单调递增，步骤 2 可通过二分查找在 $O(\log n)$ 完成。

<details>
<summary>Check Solution</summary>

<CodeCollapse title="O(log N) 凸包内部判定" language="cpp">

```cpp
bool isPointInConvex(const vector<Point>& h, Point p) {
    int n = h.size();
    if (n < 3) return onSegment(p, h[0], h[n-1]);
    if (sign(cross(h[1] - h[0], p - h[0])) < 0) return false;
    if (sign(cross(h[n-1] - h[0], p - h[0])) > 0) return false;
    
    int l = 1, r = n - 2, idx = 1;
    while (l <= r) {
        int mid = (l + r) >> 1;
        if (sign(cross(h[mid] - h[0], p - h[0])) >= 0) {
            idx = mid; l = mid + 1;
        } else r = mid - 1;
    }
    return sign(cross(h[idx+1] - h[idx], p - h[idx])) >= 0;
}
```

</CodeCollapse>

</details>
</details>

<details>
<summary>练习 1：闵可夫斯基和 (Minkowski Sum)</summary>

**题目描述**：计算两个凸多边形 $A, B$ 的向量和 $C = \{ a+b \mid a \in A, b \in B \}$。
**定理**：两个凸多边形的闵可夫斯基和仍为凸多边形，且其边集为 $A$ 和 $B$ 的边集按极角排序后的合并。
**应用**：判断两个凸多边形是否相交。$A \cap B \neq \emptyset \iff 0 \in A - B$。

<details>
<summary>Check Solution</summary>

<CodeCollapse title="闵可夫斯基和实现" language="cpp">

```cpp
vector<Point> MinkowskiSum(vector<Point>& A, vector<Point>& B) {
    int n = A.size(), m = B.size();
    vector<Vector> v1(n), v2(m);
    for (int i = 0; i < n; i++) v1[i] = A[(i+1)%n] - A[i];
    for (int i = 0; i < m; i++) v2[i] = B[(i+1)%m] - B[i];
    
    vector<Point> res;
    res.push_back(A[0] + B[0]);
    int i = 0, j = 0;
    while (i < n || j < m) {
        if (i < n && (j == m || sign(cross(v1[i], v2[j])) >= 0))
            res.push_back(res.back() + v1[i++]);
        else
            res.push_back(res.back() + v2[j++]);
    }
    return res;
}
```

</CodeCollapse>

</details>
</details>

<details>
<summary>练习 2：动态凸包维护 (Online Convex Hull)</summary>

**题目描述**：支持动态插入点并实时查询凸包面积。
**思路**：使用 `std::set` 按极角或坐标维护凸包顶点。插入点时，通过 `lower_bound` 找到邻居，利用叉积判断是否需要弹出受影响的旧顶点。

<details>
<summary>Check Solution</summary>

提示：维护上凸壳与下凸壳的两个 `std::set<Point>`。插入点 $P$ 时，若 $P$ 已在壳内则跳过；否则插入并向两侧通过 `while` 循环删除非凸点。

</details>
</details>

---

## 🎯 模块导航

- <Zap className="inline-block w-4 h-4 mr-1 text-yellow-500" /> [旋转卡壳 (Rotating Calipers)](rotating-calipers) - 凸包直径与最小外接矩形。
- <ShieldCheck className="inline-block w-4 h-4 mr-1 text-green-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 线性约束求解证明。
- <PenTool className="inline-block w-4 h-4 mr-1 text-blue-500" /> [计算几何基础](index) - 精度控制与向量原语。
