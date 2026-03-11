---
title: 半平面交 (Half-plane Intersection)
description: 极角排序、双端队列维护与线性约束求解证明。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Target, ShieldCheck, Activity, BookOpen, Layers } from 'lucide-react';

# 半平面交 (Half-plane Intersection)

在平面直角坐标系中，一条直线将平面分为两个区域，每个区域称为一个**半平面**。多个半平面的交集构成的凸区域（可能为空或无界）即为**半平面交**。它是线性规划问题的几何体现。

---

## 1. 形式化描述与凸性证明

### 1.1 算术表示
一个半平面可以表示为线性不等式：
$$ax + by + c \ge 0$$
在计算几何实现中，通常使用**有向直线**表示：直线左侧为有效半平面。

<KnowledgeCard type="theorem" title="交集的凸性">
半平面交是一个**凸集**。
**证明**：每个半平面都是凸集。根据凸集性质，任意数量凸集的交集仍然是凸集。因此，半平面交若不为空，必然是一个凸多边形或无界凸区域。
</KnowledgeCard>

---

## 2. $O(N \log N)$ 增量算法 (Sort-and-Scan)

目前主流的算法是基于极角排序的增量法，由顶点、边和双端队列共同维护。

### 2.1 算法流程

1.  **极角排序**：将所有有向直线按极角排序。对于极角相同的直线，仅保留最左侧的一条（即最强约束）。
2.  **双端队列维护**：
    -   依次加入排序后的直线。
    -   若当前直线与队列末尾两直线的交点在该直线右侧（不满足约束），则弹出队尾。
    -   同理，弹出队首。
3.  **闭合性处理**：最后用队首直线检查队尾，弹出冗余。

### 2.2 核心代码实现 (C++)

```cpp
Point getIntersect(Line a, Line b) {
    DB t = cross(b.v, a.p - b.p) / cross(a.v, b.v);
    return a.p + a.v * t;
}

// 检查直线 l 是否包含点 p (点在直线左侧或线上)
bool onLeft(Line l, Point p) {
    return sign(cross(l.v, p - l.p)) >= 0;
}

vector<Point> halfPlaneIntersection(vector<Line>& L) {
    sort(L.begin(), L.end());
    int n = L.size(), head = 0, tail = 0;
    vector<Line> q(n + 10);
    vector<Point> p(n + 10);
    
    // 1. 去除极角相同的冗余直线
    int m = 0;
    for (int i = 0; i < n; i++) {
        if (i > 0 && sign(L[i].ang - L[i-1].ang) == 0) continue;
        L[m++] = L[i];
    }
    
    // 2. 双端队列维护
    for (int i = 0; i < m; i++) {
        while (tail - head > 1 && !onLeft(L[i], p[tail - 1])) tail--;
        while (tail - head > 1 && !onLeft(L[i], p[head + 1])) head++;
        q[tail++] = L[i];
        if (tail - head > 1) p[tail - 1] = getIntersect(q[tail - 2], q[tail - 1]);
    }
    
    // 3. 闭合检查
    while (tail - head > 1 && !onLeft(q[head], p[tail - 1])) tail--;
    if (tail - head <= 2) return {}; // 交集为空或点/线
    p[head] = getIntersect(q[head], q[tail - 1]);
    
    vector<Point> res;
    for (int i = head; i < tail; i++) res.push_back(p[i]);
    return res;
}
```

---

## 3. 复杂度分析与边界 (Analysis)

<KnowledgeCard type="complexity">
- **时间复杂度**: $O(N \log N)$。排序占主导，后续双端队列维护为线性 $O(N)$。
- **空间复杂度**: $O(N)$。需存储直线数组与交点队列。
- **边界情况**:
    -   **平行直线**: 若方向相同，保留最内侧；若方向相反且不相交，交集为空。
    -   **无界区域**: 在算法竞赛中，通常通过添加一个巨大的包围盒（如 $[-10^9, 10^9]$）将无界区域转化为有界多边形。
</KnowledgeCard>

---

## 4. 经典练习与应用

<details>
<summary>例题 1：多边形核 (Polygon Kernel)</summary>

**定义**：多边形内部所有能看到多边形所有边界的点的集合。
**求解**：多边形每一条边所在直线构成的半平面交即为多边形的核。

```cpp
// 将多边形顶点转化为有向直线
vector<Line> lines;
for(int i = 0; i < n; i++) lines.push_back(Line(p[i], p[(i+1)%n]-p[i]));
vector<Point> kernel = halfPlaneIntersection(lines);
```
</details>

<details>
<summary>例题 2：线性规划最小割/覆盖</summary>

许多看似复杂的几何问题可以转化为半平面交。例如：给定一组点，求一个点到所有点的最大距离最小（最小外接圆中心）。

</details>

<KnowledgeCard type="tip" title="习题库推荐">
1.  [POJ 3335] Rotating Scoreboard - 判定多边形核是否存在。
2.  [POJ 1279] Art Gallery - 求解多边形核的面积。
3.  [HDU 4501] 小明系列问题 - 复杂约束下的半平面交。
</KnowledgeCard>

---

## 🎯 模块导航

- <Target className="inline-block w-4 h-4 mr-1 text-blue-500" /> [凸包算法 (Convex Hull)](convex-hull) - 几何基础结构。
- <Layers className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [旋转卡壳 (Rotating Calipers)](rotating-calipers) - 凸包上的线性算法。
- <Activity className="inline-block w-4 h-4 mr-1 text-amber-500" /> [计算几何基础](index) - 精度与向量原语。
