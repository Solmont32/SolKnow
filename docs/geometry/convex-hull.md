---
title: 凸包算法 (Convex Hull)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { MousePointer2, Move, LayoutGrid } from 'lucide-react';

# 凸包算法 (Convex Hull)

给定平面上的一组点，能够包含所有这些点的最小凸多边形称为**凸包（Convex Hull）**。

---

## 1. 定义与性质

### 定义
设平面点集为 $S = \{P_1, P_2, \dots, P_n\}$，凸包 $CH(S)$ 是包含 $S$ 中所有点的最小凸集。直观上，可以将其想象为一根橡皮筋将所有点包围。

### 性质
1. 凸包上的顶点均来自原点集 $S$。
2. 凸包的边界由 $S$ 中的若干条线段组成。
3. 凸包上的内角均为 $\le 180^\circ$。

---

## 2. 算法实现：Andrew's Algorithm

Andrew 算法是 Graham 扫描法的优化版本，它将凸包分为**上凸壳 (Upper Hull)** 和**下凸壳 (Lower Hull)** 两部分分别求解。

### 算法步骤
1. **排序**：将所有点按 $x$ 坐标升序排列，若 $x$ 相同则按 $y$ 升序。
2. **求下凸壳**：
   - 维护一个栈。
   - 依次遍历排序后的点，若新点在栈顶两个点所构成的直线的**右侧**（利用叉积判定），则弹出栈顶点。
   - 直到无法弹出，将新点入栈。
3. **求上凸壳**：
   - 从最后一个点开始逆向重复上述过程。
   - 注意不要重复计算首尾顶点。

### 叉积判定的核心逻辑
对于当前栈顶两点 $S_1, S_2$ 和新加入的点 $P$，若 $\vec{S_1S_2} \times \vec{S_2P} \le 0$，则表示出现了顺时针转动或共线，需要弹出 $S_2$。

---

## 3. 代码实现 (C++)

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef double DB;
struct Point {
    DB x, y;
    bool operator< (const Point& b) const {
        if (x != b.x) return x < b.x;
        return y < b.y;
    }
};

DB cross(Point a, Point b, Point c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

vector<Point> andrew(vector<Point>& points) {
    int n = points.size();
    if (n <= 2) return points;
    sort(points.begin(), points.end());
    
    vector<Point> hull;
    // 下凸壳
    for (int i = 0; i < n; i++) {
        while (hull.size() > 1 && cross(hull[hull.size() - 2], hull.back(), points[i]) <= 0)
            hull.pop_back();
        hull.push_back(points[i]);
    }
    // 上凸壳
    int lower_size = hull.size();
    for (int i = n - 2; i >= 0; i--) {
        while (hull.size() > lower_size && cross(hull[hull.size() - 2], hull.back(), points[i]) <= 0)
            hull.pop_back();
        hull.push_back(points[i]);
    }
    hull.pop_back(); // 去重最后一个点
    return hull;
}
```

---

## 4. 复杂度分析

1. **时间复杂度**：排序 $O(n \log n)$，扫描阶段每个点最多进栈一次、出栈一次，复杂度 $O(n)$。总复杂度 $O(n \log n)$。
2. **空间复杂度**：$O(n)$。

<KnowledgeCard type="tip" title="注意事项">
在处理共线点时，叉积为 0。如果题目要求凸包边界上包含所有点（包括共线点），则应修改 <code>cross(...) <= 0</code> 为 <code>cross(...) < 0</code>。
</KnowledgeCard>

---

## 5. 进阶应用

- [旋转卡壳 (Rotating Calipers)](rotating-calipers)：利用凸包求解最远点对距离（直径）。
- [动态凸包 (Dynamic Convex Hull)](../ds/balanced-tree)：利用平衡树动态维护凸包。
