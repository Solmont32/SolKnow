---
title: 计算几何基础 (Geometry Basics)
description: 系统化向量运算、拓扑性质判定与空间复杂度优化。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { MousePointer2, Move, LayoutGrid, Waypoints, Compass, Target } from 'lucide-react';

# 计算几何基础 (Geometry Basics)

计算几何（Computational Geometry）是研究几何问题算法设计的学科。在算法竞赛与工业建模中，核心在于将几何直观转化为严谨的**向量运算**，并妥善处理浮点数精度与边界情况。

---

## 1. 精度控制与数值鲁棒性

由于 `double` 类型的有限精度，直接使用 `==` 判定浮点数相等会导致不可预知的错误。

```cpp
typedef double DB;
const DB eps = 1e-9;
const DB PI = acos(-1.0);

int sign(DB x) {
    if (fabs(x) < eps) return 0;
    return x < 0 ? -1 : 1;
}

int dcmp(DB x, DB y) {
    return sign(x - y);
}
```

---

## 2. 向量运算体系 (Vector Operations)

向量是计算几何的基石。我们将点与向量统一使用 `Point` 结构体表示。

### 基础结构
```cpp
struct Point {
    DB x, y;
    Point operator+ (const Point& b) const { return {x + b.x, y + b.y}; }
    Point operator- (const Point& b) const { return {x - b.x, y - b.y}; }
    Point operator* (const DB& b) const { return {x * b, y * b}; }
    Point operator/ (const DB& b) const { return {x / b, y / b}; }
};
typedef Point Vector;

DB dot(Vector a, Vector b) { return a.x * b.x + a.y * b.y; }
DB cross(Vector a, Vector b) { return a.x * b.y - a.y * b.x; }
DB length(Vector a) { return sqrt(dot(a, a)); }
```

### 核心算子
1. **点积 (Dot Product)**: $\vec{A} \cdot \vec{B} = |\vec{A}||\vec{B}|\cos\theta$。常用于判断向量夹角（锐角/钝角）及投影长度。
2. **叉积 (Cross Product)**: $\vec{A} \times \vec{B} = |\vec{A}||\vec{B}|\sin\theta$。
   - **有向面积**: 平行四边形面积，三角形面积为 `cross/2`。
   - **拓扑判定**: 若 `cross > 0`，则 $B$ 在 $A$ 的左侧。
3. **向量旋转**: 逆时针旋转 $\alpha$：
   $(x\cos\alpha - y\sin\alpha, x\sin\alpha + y\cos\alpha)$。

---

## 3. 拓扑性质判定 (Topological Predicates)

### 线段交点判定
判定线段 $AB$ 与 $CD$ 是否相交。
- **快速排斥实验**: 检查两线段矩形包围盒是否有交集。
- **跨立实验**: 检查 $A, B$ 是否在直线 $CD$ 两侧，且 $C, D$ 是否在直线 $AB$ 两侧。
  $$(\vec{CA} \times \vec{CD}) \cdot (\vec{CB} \times \vec{CD}) \le 0$$

### 点在多边形内 (Point in Polygon)
1. **射线法 (Ray Casting)**: 从点 $P$ 向任意方向引射线，计算与多边形边界的交点个数。奇数在内，偶数在外。
2. **回转数法 (Winding Number)**: 计算 $P$ 点相对于多边形边界的总转角。若总转角为 $2\pi$ 则在内，为 $0$ 则在外。

---

## 4. 空间复杂度优化

在处理大规模几何数据（如 $N > 10^6$）时：
- **原地算法 (In-place)**: 如 Andrew 算法中，可以利用排序后的原数组空间进行栈操作，减少额外 $O(N)$ 分配。
- **轻量化表示**: 尽量避免在结构体中存储冗余信息（如提前存储长度、角度等），除非它是性能瓶颈。

<KnowledgeCard type="warning" title="精度陷阱">
在使用 <code>asin</code>, <code>acos</code> 或 <code>sqrt</code> 时，务必确保参数在合法定义域内。例如 <code>sqrt(max(0.0, x))</code>。
</KnowledgeCard>

---

## 5. 经典练习

<details>
<summary>例题：判定点是否在线段上</summary>

**题目描述**：给定点 $P$ 和线段 $AB$，判定 $P$ 是否在线段 $AB$ 上（含端点）。

**解答思路**：
1. 首先判定 $P$ 是否在直线 $AB$ 上：即 $\vec{AP} \times \vec{AB} = 0$。
2. 其次判定 $P$ 是否在 $A, B$ 之间：即 $\vec{PA} \cdot \vec{PB} \le 0$。

```cpp
bool onSegment(Point p, Point a, Point b) {
    return sign(cross(a - p, b - p)) == 0 && sign(dot(a - p, b - p)) <= 0;
}
```
</details>

---

## 6. 模块索引

- <Waypoints className="inline-block w-4 h-4 mr-1 text-blue-500" /> [凸包算法 (Convex Hull)](convex-hull) - $O(N \log N)$ 的边界构建。
- <Compass className="inline-block w-4 h-4 mr-1 text-purple-500" /> [旋转卡壳 (Rotating Calipers)](rotating-calipers) - 对踵点搜索与直径求解。
- <Target className="inline-block w-4 h-4 mr-1 text-amber-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 线性约束下的可行域求解。
