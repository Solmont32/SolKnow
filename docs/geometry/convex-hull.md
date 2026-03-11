---
title: 凸包算法 (Convex Hull)
description: Andrew's 算法、数学性质证明与共线点处理。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Waypoints, ShieldCheck, Zap, PenTool } from 'lucide-react';

# 凸包算法 (Convex Hull)

给定平面上的一组点，能够包含所有这些点的最小凸多边形称为**凸包（Convex Hull）**。在算法竞赛中，凸包是解决各种复杂几何问题的预处理基础。

---

## 1. 定义与核心性质

### 形式化定义
对于平面点集 $S$，其凸包 $CH(S)$ 是包含 $S$ 的所有凸集的交集。
$$CH(S) = \{ \sum_{i=1}^n \lambda_i P_i \mid P_i \in S, \lambda_i \ge 0, \sum \lambda_i = 1 \}$$

### 关键性质
1. **顶点性**: 凸包的顶点一定是 $S$ 中的点。
2. **极值性**: $x$ 或 $y$ 坐标最大/最小的点一定在凸包上。
3. **单调性**: 沿着凸包边界移动，向量的极角是单调变化的。
4. **单峰性**: 凸包上点到某直线的距离是单峰函数（用于三分或双指针）。

---

## 2. 算法实现：Andrew's Algorithm

Andrew 算法是对 Graham 扫描法的优化，通过分治（上凸壳与下凸壳）将极角排序简化为坐标排序。

### 算法流程
1. **预处理**: 对点集按 $x$ 升序排序（$x$ 相同时按 $y$ 升序）。
2. **求下凸壳**: 从左到右遍历，维护一个栈，通过叉积 `cross(S1, S2, P) <= 0` 剔除非凸点。
3. **求上凸壳**: 从右到左遍历，重复上述逻辑。

### 空间复杂度优化
在 C++ 中，可以直接利用 `vector` 作为栈，并在算法结束前通过 `resize` 缩减空间，达到 $O(N)$ 辅助空间。

```cpp
vector<Point> getHull(vector<Point>& p) {
    int n = p.size(), k = 0;
    if (n <= 2) return p;
    sort(p.begin(), p.end());
    vector<Point> h(2 * n);
    // Lower hull
    for (int i = 0; i < n; i++) {
        while (k > 1 && sign(cross(h[k-1] - h[k-2], p[i] - h[k-1])) <= 0) k--;
        h[k++] = p[i];
    }
    // Upper hull
    for (int i = n - 2, t = k; i >= 0; i--) {
        while (k > t && sign(cross(h[k-1] - h[k-2], p[i] - h[k-1])) <= 0) k--;
        h[k++] = p[i];
    }
    h.resize(k - 1);
    return h;
}
```

---

## 3. 共线点处理 (Collinear Points)

在某些题目（如围栏构建）中，需要保留边界上的所有点：
- **修改判定条件**: 将 `cross(...) <= 0` 改为 `cross(...) < 0`。
- **特别注意**: 在从上凸壳返回起点时，最后一段共线点可能需要特殊处理。

---

## 4. 经典练习

<details>
<summary>例题 1：最小围栏长度 (POJ 1113 - Wall)</summary>

**题目描述**：给定 $N$ 个点和距离 $L$，要求建立一个围栏，使得围栏与所有点的距离至少为 $L$，求最小围栏周长。

**解答思路**：
1. 该问题的本质是求点集的**凸包周长**加上一个**半径为 $L$ 的圆的周长**。
2. 每一个拐角处的圆弧加起来正好是一个完整的圆（$360^\circ$）。
3. 凸包周长：$\sum |P_i P_{i+1}|$。
4. 圆周长：$2\pi L$。

```cpp
double solve(vector<Point>& pts, double L) {
    auto hull = getHull(pts);
    double res = 2 * PI * L;
    for (int i = 0; i < (int)hull.size(); i++) {
        res += length(hull[i] - hull[(i + 1) % hull.size()]);
    }
    return res;
}
```
</details>

<details>
<summary>例题 2：判定点是否在凸多边形内 (O(log N))</summary>

**题目描述**：给定一个凸多边形和多个查询点，判定每个点是否在多边形内。

**解答思路**：
1. 选取一个内部参考点（如重心或第一个点）。
2. 对于查询点 $P$，通过**二分查找**确定其落在哪两个顶点形成的“扇区”内。
3. 检查 $P$ 是否在对应扇区的边界内（叉积判定）。

```cpp
bool inConvex(const vector<Point>& h, Point p) {
    int n = h.size();
    if (sign(cross(h[1] - h[0], p - h[0])) < 0) return false;
    if (sign(cross(h[n-1] - h[0], p - h[0])) > 0) return false;
    int l = 1, r = n - 2, pos = 1;
    while (l <= r) {
        int mid = (l + r) >> 1;
        if (sign(cross(h[mid] - h[0], p - h[0])) >= 0) pos = mid, l = mid + 1;
        else r = mid - 1;
    }
    return sign(cross(h[pos+1] - h[pos], p - h[pos])) >= 0;
}
```
</details>

<details>
<summary>练习 1：动态凸包 (Dynamic Convex Hull)</summary>

**题目描述**：支持动态加点，并查询当前凸包周长。

**提示**：使用 `std::set` 维护凸包的顶点（按极角或坐标排序）。每次插入新点时，查找其前驱和后继，判断是否需要删除旧点。

```cpp
// 核心逻辑示意
auto it = s.lower_bound(p);
if (isInside(it, p)) return; // 点在内部
updateAndRemove(it, p); // 类似 Graham 扫描的局部剔除
```
</details>

---

## 5. 模块导航

- <Zap className="inline-block w-4 h-4 mr-1 text-yellow-500" /> [旋转卡壳 (Rotating Calipers)](rotating-calipers) - 在凸包基础上进行对踵点扫描。
- <ShieldCheck className="inline-block w-4 h-4 mr-1 text-green-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 凸包的对偶问题。
- <PenTool className="inline-block w-4 h-4 mr-1 text-blue-500" /> [计算几何基础](index) - 向量原语与精度。
