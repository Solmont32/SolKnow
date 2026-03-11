---
title: 凸包算法 (Convex Hull)
description: Andrew's 算法、数学性质证明与共线点处理。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Waypoints, ShieldCheck, Zap, PenTool } from 'lucide-react';

# 凸包算法 (Convex Hull)

给定平面上的一组点，能够包含所有这些点的最小凸多边形称为**凸包（Convex Hull）**。在算法竞赛中，凸包是解决各种复杂几何问题的预处理基础。

---

## 1. 形式化定义与极值性质

### 1.1 凸组合定义
对于平面点集 $S = \{P_1, \dots, P_n\}$，其凸包 $CH(S)$ 定义为：
$$CH(S) = \left\{ \sum_{i=1}^n \lambda_i P_i \mid \lambda_i \ge 0, \sum_{i=1}^n \lambda_i = 1 \right\}$$

### 1.2 核心性质
- **顶点性质**: $CH(S)$ 的顶点集合 $V \subseteq S$。
- **单调性**: 沿着凸包边界逆时针移动，相邻边向量的极角单调递增。
- **极点**: $x$ 或 $y$ 坐标最小/最大的点必然是凸包的顶点。

---

## 2. Andrew's Algorithm：扫描与回溯

Andrew 算法是对 Graham 扫描法的优化，通过将点集分为**上凸壳**与**下凸壳**，避免了复杂的极角排序。

### 2.1 算法流程
1. **排序**: 将点集按 $x$ 坐标升序排列（$x$ 相同时按 $y$ 升序）。
2. **构建下凸壳 (Lower Hull)**:
   - 从左到右遍历。
   - 维护一个栈。当新加入点 $P_i$ 使得栈顶三个点不满足左转关系（叉积 $\le 0$）时，弹出栈顶。
3. **构建上凸壳 (Upper Hull)**:
   - 从右到左遍历，重复上述逻辑。

### 2.2 正确性证明 (Sketch)
由于点集已按 $x$ 排序，且我们强制每一步都向左转，根据凸集的定义，任何被弹出的点必然落在新形成的边与排序首尾连线所构成的三角形内部，因此不再属于凸包顶点。

```cpp
vector<Point> getHull(vector<Point>& p) {
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
    h.resize(k - 1); // 终点与起点重合，需减 1
    return h;
}
```

---

## 3. 经典练习与进阶应用

<details>
<summary>例题 1：判定点是否在凸多边形内 (O(log N))</summary>

**算法思路**：
利用凸多边形的单调性，选取 $P_0$ 为原点，将多边形划分为 $n-2$ 个以 $P_0$ 为顶点的三角形扇区。通过**二分查找**确定待测点落在哪个扇区，再利用叉积判定。

```cpp
bool inConvex(const vector<Point>& h, Point p) {
    int n = h.size();
    if (n < 3) return onSegment(p, h[0], h[1]);
    // 检查是否在两侧边界外
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
<summary>练习 1：动态凸包 (Dynamic Convex Hull Maintenance)</summary>

**题目要求**：支持在线插入点，并实时查询当前凸包面积。

**提示**：
1. 使用 `std::set<Point>` 按坐标或极角维护顶点。
2. 插入新点时，寻找其在 `set` 中的前驱和后继。
3. 若新点已在内部，直接跳过。
4. 若在外部，则向两边不断回溯弹出不再是凸点的旧顶点。

```cpp
// 关键逻辑：利用 set 的迭代器进行局部维护
void insert(Point p) {
    auto it = s.lower_bound(p);
    if (isInside(p, it)) return;
    // 维护向左向右的删除...
}
```
</details>

---

## 4. 模块导航

- <Zap className="inline-block w-4 h-4 mr-1 text-yellow-500" /> [旋转卡壳 (Rotating Calipers)](rotating-calipers) - 在凸包上寻找对踵点对。
- <ShieldCheck className="inline-block w-4 h-4 mr-1 text-green-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 凸包问题的对偶形式。
- <PenTool className="inline-block w-4 h-4 mr-1 text-blue-500" /> [计算几何基础](index) - 向量原语与精度判定。
