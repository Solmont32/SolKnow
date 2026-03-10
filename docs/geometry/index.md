---
title: 计算几何基础 (Geometry Basics)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { MousePointer2, Move, LayoutGrid } from 'lucide-react';

# 计算几何基础 (Geometry Basics)

计算几何（Computational Geometry）是计算机科学的一个分支，研究解决几何问题的算法。在算法竞赛中，核心在于如何利用向量运算（特别是叉积）来处理点、线、面的位置关系。

---

## 1. 基础结构与精度控制

由于浮点数运算存在精度误差，通常需要定义一个较小的常量 `eps` 来辅助判定。

```cpp
typedef double DB;
const DB eps = 1e-9;

int sign(DB x) {
    if (fabs(x) < eps) return 0;
    return x < 0 ? -1 : 1;
}

int dcmp(DB x, DB y) {
    return sign(x - y);
}
```

### 点与向量 (Point & Vector)

在平面几何中，点和向量均可用 $(x, y)$ 表示。

```cpp
struct Point {
    DB x, y;
    Point operator+ (const Point& b) const { return {x + b.x, y + b.y}; }
    Point operator- (const Point& b) const { return {x - b.x, y - b.y}; }
    Point operator* (const DB& b) const { return {x * b, y * b}; }
    Point operator/ (const DB& b) const { return {x / b, y / b}; }
    bool operator== (const Point& b) const { return dcmp(x, b.x) == 0 && dcmp(y, b.y) == 0; }
};
typedef Point Vector;
```

---

## 2. 向量运算的核心：叉积 (Cross Product)

对于两个二维向量 $\vec{A} = (x_1, y_1)$ 和 $\vec{B} = (x_2, y_2)$，其叉积定义为：
$$\vec{A} \times \vec{B} = x_1 y_2 - x_2 y_1$$

在三维空间中，结果是一个向量；在二维平面中，结果是一个标量，其物理意义为：
1. **面积**：以 $\vec{A}, \vec{B}$ 为邻边的平行四边形的**有向面积**。
2. **方向**：
   - 若 $\vec{A} \times \vec{B} > 0$，则 $\vec{B}$ 在 $\vec{A}$ 的左侧（逆时针方向）。
   - 若 $\vec{A} \times \vec{B} < 0$，则 $\vec{B}$ 在 $\vec{A}$ 的右侧（顺时针方向）。
   - 若 $\vec{A} \times \vec{B} = 0$，则 $\vec{A}, \vec{B}$ 共线。

```cpp
DB cross(Vector a, Vector b) {
    return a.x * b.y - a.y * b.x;
}

// 计算向量 ab 和 ac 的叉积
DB area(Point a, Point b, Point c) {
    return cross(b - a, c - a);
}
```

---

## 3. 常见应用

### 判定点在直线哪一侧
利用 `sign(cross(B - A, P - A))` 的符号即可判断点 $P$ 相对于有向直线 $AB$ 的位置。

### 线段交点
利用面积比例法（利用叉积计算三角形面积比例）可以 $O(1)$ 求解直线交点。

<KnowledgeCard type="info" title="核心法则">
在计算几何中，尽可能避免使用三角函数（`sin`, `cos`, `atan2`），而应优先使用<b>向量的加减法、点积、叉积</b>。这样不仅代码简洁，而且精度更高，鲁棒性更强。
</KnowledgeCard>

---

## 4. 延伸阅读

- [凸包算法 (Convex Hull)](convex-hull)
- [旋转卡壳 (Rotating Calipers)](rotating-calipers)
