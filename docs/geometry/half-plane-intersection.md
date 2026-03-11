---
title: 半平面交 (Half-plane Intersection)
description: 线性约束下的凸多边形可行域求解，$O(N \log N)$ 算法。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Target, Layers, LayoutGrid, Zap } from 'lucide-react';

# 半平面交 (Half-plane Intersection)

**半平面交（Half-plane Intersection）** 是求解一组线性约束（即半平面）的交集的问题。其结果通常是一个凸多边形（可能为空、点、线段或无界区域）。

---

## 1. 数学模型与性质

### 1.1 有向直线表示
对于直线 $L: P + t\vec{v}$，其左侧半平面 $H$ 满足：
$$H = \{ Q \in \mathbb{R}^2 \mid \vec{v} \times (Q - P) \ge 0 \}$$

### 1.2 核心性质
1. **凸性证明**: 
   由于半平面是凸集，且凸集的交集仍为凸集，故半平面交 $S = \bigcap_{i=1}^n H_i$ 必然为凸集。
2. **界限**: 
   在实际计算中，常加入一个巨大的边界矩形将无穷区域转化为有界多边形。

---

## 2. 增量扫描算法 ($O(N \log N)$)

该算法基于极角排序与双端队列，由 S.I. 算法演变而来。

### 2.1 算法核心步骤
1. **排序与去重**: 
   按极角 $\theta \in (-\pi, \pi]$ 排序。对于极角相同的直线，只保留最左侧的一条（即最靠里的约束）。
2. **双端队列维护**: 
   依次处理排序后的直线 $L_i$：
   - 当队尾（或队头）两直线的交点在 $L_i$ 的右侧时，说明该交点不满足 $L_i$ 的约束，弹出对应直线。
3. **闭合检查**: 
   处理完所有直线后，需用队头直线检查队尾交点，反之亦然，以确保首尾衔接。

```cpp
// 判定交点是否在直线 L 的右侧
inline bool onRight(const Line& L, const Point& p) {
    return sign(cross(L.v, p - L.p)) < 0;
}

vector<Point> halfPlaneIntersection(vector<Line>& L) {
    sort(L.begin(), L.end());
    int n = L.size(), head = 0, tail = 0;
    vector<Line> q(n + 10);
    vector<Line> uniqueL;
    
    // 去重：极角相同取最左
    for (int i = 0; i < n; i++) {
        if (i > 0 && sign(L[i].ang - L[i-1].ang) == 0) continue;
        uniqueL.push_back(L[i]);
    }
    
    n = uniqueL.size();
    for (int i = 0; i < n; i++) {
        while (head < tail && onRight(uniqueL[i], getLineIntersection(q[tail-1], q[tail]))) tail--;
        while (head < tail && onRight(uniqueL[i], getLineIntersection(q[head], q[head+1]))) head++;
        q[++tail] = uniqueL[i];
    }
    // 最终检查
    while (head < tail && onRight(q[head], getLineIntersection(q[tail-1], q[tail]))) tail--;
    
    if (tail - head <= 1) return {}; 
    vector<Point> poly;
    for (int i = head; i < tail; i++) poly.push_back(getLineIntersection(q[i], q[i+1]));
    poly.push_back(getLineIntersection(q[tail], q[head]));
    return poly;
}
```

---

## 3. 经典应用：多边形的核 (Kernel)

### 3.1 形式化定义
简单多边形 $P$ 的核 $K(P)$ 是内部点的集合，使得对于任意 $k \in K(P)$，点 $k$ 与多边形内所有点的连线均在多边形内部。
$$K(P) = \{ k \in P \mid \forall p \in P, [k, p] \subseteq P \}$$

### 3.2 判定定理
$K(P)$ 等于由多边形各边所在直线定义的向内半平面的交集。若交集面积 $> 0$，则多边形存在核。

---

## 4. 练习与挑战

<details>
<summary>例题 1：多边形核的面积</summary>

**解答思路**：
1. 提取多边形所有边，构建向内的有向直线。
2. 运行半平面交算法求出交集多边形顶点。
3. 利用 Shoelace Formula 计算交集面积。

```cpp
DB solveKernelArea(vector<Point>& poly) {
    vector<Line> lines;
    int n = poly.size();
    for (int i = 0; i < n; i++) {
        lines.push_back(Line(poly[i], poly[(i+1)%n] - poly[i]));
    }
    auto kernel = halfPlaneIntersection(lines);
    return polygonArea(kernel);
}
```
</details>

<details>
<summary>例题 2：最小外接圆/矩形约束</summary>

**题目要求**：求一个半平面交，使得其包含在一个圆 $C$ 内且面积最大。

**提示**：将圆通过多边形逼近转化为多个线性约束，或利用含参量半平面交的思想。
</details>

---

## 5. 模块导航

- <Target className="inline-block w-4 h-4 mr-1 text-red-500" /> [计算几何基础](index) - 叉积与直线交点基础。
- <Layers className="inline-block w-4 h-4 mr-1 text-purple-500" /> [凸包算法 (Convex Hull)](convex-hull) - 处理离散点集的边界。
- <Zap className="inline-block w-4 h-4 mr-1 text-yellow-500" /> [旋转卡壳 (Rotating Calipers)](rotating-calipers) - 求解对踵点对。
