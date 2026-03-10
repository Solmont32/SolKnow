---
title: 计算几何专项强化练习
sidebar_label: 计算几何
---

import { Target, Zap, Trophy, BarChart3, ChevronRight, Code2, Layers, Compass } from 'lucide-react';

# 计算几何专项强化练习 (Computational Geometry)

> **“在连续的欧几里得空间中，用离散的算法捕捉几何的本质。”** —— 本专题对标《计算几何：算法与应用》深度，涵盖从基础几何原语、凸包，到旋转卡壳与半平面交的工业级实现。

---

## 🪜 练习阶梯与评价标准

| 等级 | 难度目标 | 核心考察点 | 期望达成 |
| :--- | :--- | :--- | :--- |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 几何原语与凸包 | 向量叉积、点在多边形内判定、Andrew 凸包 | 能够处理共线点、重复点等各种边界 Case |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 线性构造与交集 | 半平面交、旋转卡壳基础应用（直径） | 理解 $O(n \log n)$ 构造算法的拓扑不变性 |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span> | 综合几何建模 | 最小外接矩形、圆的并/交、多边形核 | 具备处理复杂拓扑关系与精度误差控制能力 |

---

## 一、 凸包与基础原语 (Level A)

### 练习 1：圈地养牛 (P2742 - Andrew 凸包模板)
**题目描述**：给定 $n$ 个点，求包含所有点的最小凸多边形的周长。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**数学原理**：
Andrew 算法是 Graham 扫描法的变体，按 $x$ 坐标排序后分别构造上凸壳和下凸壳。
**判别式**：利用向量叉积 $\vec{AB} \times \vec{BC} > 0$ 判定左转。

**C++ 代码实现**：
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
#include <iomanip>

using namespace std;

typedef double DB;
struct Point {
    DB x, y;
    bool operator< (const Point& b) const {
        return x < b.x || (x == b.x && y < b.y);
    }
};

DB cross(Point a, Point b, Point c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

DB dist(Point a, Point b) {
    return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

int main() {
    int n; cin >> n;
    vector<Point> p(n);
    for (int i = 0; i < n; i++) cin >> p[i].x >> p[i].y;
    sort(p.begin(), p.end());
    
    vector<Point> h;
    for (int i = 0; i < n; i++) {
        while (h.size() > 1 && cross(h[h.size()-2], h.back(), p[i]) <= 0) h.pop_back();
        h.push_back(p[i]);
    }
    int t = h.size();
    for (int i = n - 2; i >= 0; i--) {
        while (h.size() > t && cross(h[h.size()-2], h.back(), p[i]) <= 0) h.pop_back();
        h.push_back(p[i]);
    }
    h.pop_back();

    DB res = 0;
    for (int i = 0; i < h.size(); i++) res += dist(h[i], h[(i+1)%h.size()]);
    cout << fixed << setprecision(2) << res << endl;
}
```
</details>

---

## 二、 旋转卡壳与动态构造 (Level B)

### 练习 2：Beauty Contest (凸包直径)
**题目描述**：给定 $n$ 个点，求点对间的最大距离平方。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**旋转卡壳原理**：
利用凸包边的斜率单调性。对于凸包上的每一条边，其对踵点（距离最远的点）也随之在凸包上单调移动。
**复杂度**：$O(n)$。

**C++ 代码实现**：
```cpp
// 假设已求出凸壳 h
int m = h.size();
if (m == 2) return distSq(h[0], h[1]);
LL res = 0;
for (int i = 0, j = 2; i < m; i++) {
    while (cross(h[i], h[i+1], h[j]) < cross(h[i], h[i+1], h[j+1])) 
        j = (j + 1) % m;
    res = max({res, distSq(h[i], h[j]), distSq(h[i+1], h[j])});
}
```
</details>

### 练习 3：半平面交模板 (S&I 算法)
**题目描述**：给定 $n$ 个半平面（由向量表示），求它们的交集（凸多边形）的面积。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**算法流程**：
1. 按极角对向量排序。
2. 使用双端队列维护半平面，通过检查交点是否在当前半平面外来更新队列。
3. **复杂度**：$O(n \log n)$。

</details>

---

## 三、 综合几何建模 (Level C)

### 练习 4：最小外接矩形 (Minimum Enclosing Rectangle)
**题目描述**：给定一组点，求包含所有点的面积最小的矩形的面积及四个顶点。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**旋转卡壳进阶**：
需要同时维护四个方向的卡子：
1. **底边**：当前枚举的凸包边。
2. **顶边**：距离底边最远的点（对踵点）。
3. **左/右侧边**：在底边方向上投影最远/最近的点。
利用点积 (Dot Product) 维护投影长度，利用叉积维护距离。

**C++ 完整实现核心**：
```cpp
void solve() {
    // ... 构造凸包 h
    double min_area = 1e18;
    for (int i = 0, u = 1, r = 1, l = 1; i < m; i++) {
        Point a = h[i], b = h[(i + 1) % m];
        double d = dist(a, b);
        // 更新上点 (叉积)
        while (cross(a, b, h[(u+1)%m]) > cross(a, b, h[u])) u = (u + 1) % m;
        // 更新右点 (点积)
        while (dot(a, b, h[(r+1)%m]) > dot(a, b, h[r])) r = (r + 1) % m;
        if (!i) l = r;
        // 更新左点 (点积)
        while (dot(a, b, h[(l+1)%m]) < dot(a, b, h[l])) l = (l + 1) % m;
        
        double h_val = cross(a, b, h[u]) / d;
        double w_val = (dot(a, b, h[r]) - dot(a, b, h[l])) / d;
        if (h_val * w_val < min_area) {
            min_area = h_val * w_val;
            // 计算并记录四个顶点坐标...
        }
    }
}
```
</details>

---

## 🏆 训练建议
1. **精度是第一生命线**：尽量使用 `long long` 避免叉积溢出；必须使用浮点数时，使用 `eps` 控制判等。
2. **模板化思维**：计算几何代码量大且易出错，应建立一套经受过考场检验的向量运算模板类。
3. **图形化调试**：遇到复杂几何题，建议手动在纸上模拟拓扑关系，或编写可视化脚本检查计算结果。
