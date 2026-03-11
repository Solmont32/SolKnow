---
title: 凸包算法 (Convex Hull)
description: Andrew's 算法、数学性质证明与空间复杂度边界。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Waypoints, ShieldCheck, Zap, PenTool, Activity, BookOpen } from 'lucide-react';

# 凸包算法 (Convex Hull)

给定平面上的一组点，能够包含所有这些点的最小凸多边形称为**凸包（Convex Hull）**。从直观上理解，它可以看作是用橡皮筋撑开并包围所有钉子后形成的形状。

---

## 1. 形式化定义与代数性质

<KnowledgeCard type="theorem" title="凸组合与极点性质">

1.  **凸集定义**：点集 $S$ 是凸的，当且仅当对于任意 $P, Q \in S$，线段 $PQ \subseteq S$。
2.  **凸包定义**：$CH(S) = \{ \sum_{i=1}^n \lambda_i P_i \mid \lambda_i \ge 0, \sum \lambda_i = 1 \}$。
3.  **极点性质**：凸包的顶点必然属于原始点集 $S$。且对于任意方向，在该方向上投影最大/最小的点必然是凸包的顶点。

</KnowledgeCard>

---

## 2. Andrew's Algorithm：扫描与回溯

Andrew 算法是 Graham 扫描法的变体，通过维护**单调链**的方式构建凸包，具有极佳的常数表现。

### 2.1 算法流程

<KnowledgeCard type="algorithm" title="Andrew 算法步骤">

1.  **排序**：按 $x$ 坐标为主键、$y$ 坐标为次键进行升序排列。
2.  **构造下凸壳 (Lower Hull)**：
    -   从左往右遍历排序后的点。
    -   维护一个栈，当新加入点 $P_i$ 使得栈顶三个点（$S_{top-1}, S_{top}, P_i$）不满足**左转**关系（叉积 $\le 0$）时，弹出栈顶。
3.  **构造上凸壳 (Upper Hull)**：
    -   从右往左重复上述过程。
    -   注意：上凸壳的起点是排序后的最后一个点。

</KnowledgeCard>

### 2.2 核心代码实现 (C++)

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
    h.resize(k - 1); // 起始点被重复计算
    return h;
}
```

---

## 3. 复杂度分析与边界 (Analysis)

<KnowledgeCard type="complexity">
- **时间复杂度**: $O(N \log N)$。瓶颈在于点集的排序。后续的线性扫描每个点最多入栈/出栈各两次，复杂度为 $O(N)$。
- **空间复杂度**: $O(N)$。需要额外的数组或栈存储中间顶点。
- **鲁棒性边界**:
    -   **共线点处理**: `sign(cross(...)) <= 0` 会剔除共线点。若需保留共线点，应改为 `< 0`。
    -   **重复点**: 排序后会自动相邻，`sign` 判定会正确跳过。
</KnowledgeCard>

---

## 4. 经典练习与推导

<details>
<summary>例题 1：判定点是否在凸包内 (Logarithmic Query)</summary>

**推导过程**：
凸包顶点按逆时针排序，具有极角单调性。选取 $h[0]$ 为基准点，利用二分查找确定待测点 $P$ 位于哪个三角形扇形内。

```cpp
bool isInsideConvex(const vector<Point>& h, Point p) {
    int n = h.size();
    if (n < 3) return onSegment(p, h[0], h[n-1]);
    // 边界快速检查
    if (sign(cross(h[1] - h[0], p - h[0])) < 0) return false;
    if (sign(cross(h[n-1] - h[0], p - h[0])) > 0) return false;
    
    int l = 1, r = n - 2, pos = 1;
    while (l <= r) {
        int mid = (l + r) >> 1;
        if (sign(cross(h[mid] - h[0], p - h[0])) >= 0) {
            pos = mid; l = mid + 1;
        } else r = mid - 1;
    }
    return sign(cross(h[pos+1] - h[pos], p - h[pos])) >= 0;
}
```
</details>

<details>
<summary>例题 2：凸包面积与周长</summary>

**面积计算**：利用 Shoelace Formula (叉积和)。
**周长计算**：相邻顶点距离之和。

```cpp
DB getPolygonPerimeter(const vector<Point>& h) {
    DB res = 0;
    int n = h.size();
    for (int i = 0; i < n; i++) res += length(h[i] - h[(i + 1) % n]);
    return res;
}
```
</details>

<KnowledgeCard type="tip" title="习题库推荐">
1.  [POJ 1113] Wall - 凸包周长 + 圆周应用。
2.  [POJ 2187] Beauty Contest - 凸包直径（配合旋转卡壳）。
3.  [HDU 1392] Surround the Trees - 标准凸包模板题。
</KnowledgeCard>

---

## 🎯 模块导航

- <Zap className="inline-block w-4 h-4 mr-1 text-yellow-500" /> [旋转卡壳 (Rotating Calipers)](rotating-calipers) - 求解凸包直径与最小外接矩形。
- <ShieldCheck className="inline-block w-4 h-4 mr-1 text-green-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 处理多个线性约束。
- <PenTool className="inline-block w-4 h-4 mr-1 text-blue-500" /> [计算几何基础](index) - 向量原语。
