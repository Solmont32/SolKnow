---
title: 凸包算法 (Convex Hull)
description: Andrew's 算法、数学性质证明与共线点处理。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Waypoints, ShieldCheck, Zap } from 'lucide-react';

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
    for (int i = 0; i < n; h[k++] = p[i++])
        while (k > 1 && sign(cross(h[k-2], h[k-1], p[i])) <= 0) k--;
    // Upper hull
    for (int i = n - 2, t = k; i >= 0; h[k++] = p[i--])
        while (k > t && sign(cross(h[k-2], h[k-1], p[i])) <= 0) k--;
    h.resize(k - 1);
    return h;
}
```

---

## 3. 共线点处理 (Collinear Points)

在某些题目（如围栏构建）中，需要保留边界上的所有点：
- **修改判定条件**: 将 `cross(...) <= 0` 改为 `cross(...) < 0`。
- **注意**: 在上凸壳与下凸壳的衔接处，共线点可能会被重复处理，需要严格逻辑判定。

---

## 4. 经典练习

<details>
<summary>例题：最小围栏长度 (POJ 1113 - Wall)</summary>

**题目描述**：给定 $N$ 个点和距离 $L$，要求建立一个围栏，使得围栏与所有点的距离至少为 $L$，求最小围栏周长。

**解答思路**：
1. 该问题的本质是求点集的**凸包周长**加上一个**半径为 $L$ 的圆的周长**。
2. 凸包周长：$\sum |P_i P_{i+1}|$。
3. 圆周长：$2\pi L$。

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

---

## 5. 模块导航

- <Zap className="inline-block w-4 h-4 mr-1 text-yellow-500" /> [旋转卡壳 (Rotating Calipers)](rotating-calipers) - 在凸包基础上进行对踵点扫描。
- <ShieldCheck className="inline-block w-4 h-4 mr-1 text-green-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 凸包的对偶问题。
