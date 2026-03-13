---
title: 旋转卡壳 (Rotating Calipers)
description: 凸包对踵点维护、线性时间几何特性求解与拓扑证明。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import CodeCollapse from '@site/src/components/CodeCollapse';
import { Waypoints, Zap, Activity, BookOpen, Scaling, ShieldAlert, Scale, Ruler } from 'lucide-react';

# 旋转卡壳 (Rotating Calipers)

**旋转卡壳**（Rotating Calipers）是由 Michael Shamos 提出的一种在凸多边形上进行线性扫描的高效算法。它的核心在于利用凸多边形的拓扑单调性，通过两根（或多根）平行支撑线的旋转，在 $O(N)$ 时间内解决直径、宽度、外接矩形等问题。

---

## 1. 对踵点拓扑单调性证明

<KnowledgeCard type="theorem" title="对踵点 (Antipodal Pairs) 的性质">

**定义**：若凸多边形 $H$ 存在两条平行支撑线分别过点 $P$ 和 $Q$，则 $(P, Q)$ 称为一对对踵点。

**证明：距离函数的单峰性 (Unimodality)**
**命题**：固定凸多边形的一条边 $e_i = V_iV_{i+1}$，顶点 $V_j$ 到直线 $V_iV_{i+1}$ 的垂直距离 $h(j)$ 是关于 $j$ 的单峰函数。
**证明**：
1. 设 $f(j) = \vec{V_iV_{i+1}} \times \vec{V_iV_j}$。由叉积定义，$|f(j)|$ 与距离 $h(j)$ 成正比。
2. 由于 $H$ 是凸多边形，其内角均 $\le \pi$。当 $j$ 在边界上移动时，向量 $\vec{V_jV_{j+1}}$ 的极角单调变化。
3. 考虑 $f(j+1) - f(j) = \vec{V_iV_{i+1}} \times \vec{V_jV_{j+1}}$。
4. 由于凸性，该差值符号在绕行一周的过程中至多改变两次（对应极大值和极小值）。
5. 故在固定底边的情况下，最远点（对踵点）随底边的逆时针旋转也呈逆时针单调移动。

</KnowledgeCard>

---

## 2. 数值鲁棒性分析 (Numerical Robustness)

旋转卡壳对“平行”和“共线”高度敏感。

<KnowledgeCard type="warning" title="平行边与退化判定">

1.  **最大面积判定**：在更新对踵点指针 $j$ 时，比较 `area(i, i+1, j)` 与 `area(i, i+1, j+1)`。
    - **逻辑一致性**：必须使用 `sign(area_next - area_curr) >= 0` 而非 `> 0`，以确保在存在平行边时，指针能遍历到所有对踵点。
2.  **距离计算**：尽量避免直接计算垂直距离（涉及除法和开方），优先使用叉积进行大小比较。

</KnowledgeCard>

<CodeCollapse title="旋转卡壳求凸包直径" language="cpp">

```cpp
DB getDiameter(const vector<Point>& h) {
    int n = h.size();
    if (n < 2) return 0;
    if (n == 2) return dist(h[0], h[1]);
    DB res = 0;
    for (int i = 0, j = 1; i < n; i++) {
        // 旋转：寻找距离边 h[i]-h[i+1] 最远的点 j
        // 利用叉积比较三角形面积大小 (底边固定，面积越大高度越大)
        while (sign(cross(h[(i+1)%n] - h[i], h[(j+1)%n] - h[i]) -
                   cross(h[(i+1)%n] - h[i], h[j] - h[i])) >= 0) {
            j = (j + 1) % n;
        }
        res = max({res, dist(h[i], h[j]), dist(h[(i+1)%n], h[j])});
    }
    return res;
}
```

</CodeCollapse>

---

## 3. 教材级经典推导与练习库 (Exercises)

<details>
<summary>例题 1：最小外接矩形 - 三指针一致性校验</summary>

**题目描述**：求覆盖凸多边形的最小面积矩形。
**推导**：
最小矩形的一条边必然与凸多边形的一条边 $e_i$ 重合。
我们需要维护三个极值点：
1.  **最高点 $p$**：到 $e_i$ 距离最大（由叉积维护）。
2.  **最右点 $r$**：在 $e_i$ 方向上的投影最大（由点积维护）。
3.  **最左点 $l$**：在 $e_i$ 方向上的投影最小（由点积维护）。

<details>
<summary>Check Solution</summary>

<CodeCollapse title="最小面积外接矩形 (Rotating Calipers)" language="cpp">

```cpp
DB minAreaRect(vector<Point>& h) {
    int n = h.size();
    DB res = 1e18;
    int p = 1, r = 1, l = 1;
    for (int i = 0; i < n; i++) {
        Vector v = h[(i+1)%n] - h[i];
        DB len2 = dot(v, v);
        // 更新最高点 (叉积单峰)
        while (sign(cross(v, h[(p+1)%n] - h[i]) - cross(v, h[p] - h[i])) >= 0) p = (p+1)%n;
        // 更新最右点 (点积单峰)
        while (sign(dot(v, h[(r+1)%n] - h[i]) - dot(v, h[r] - h[i])) >= 0) r = (r+1)%n;
        if (i == 0) l = r;
        // 更新最左点 (点积反向单峰)
        while (sign(dot(v, h[(l+1)%n] - h[i]) - dot(v, h[l] - h[i])) <= 0) l = (l+1)%n;
        
        DB H = cross(v, h[p] - h[i]) / sqrt(len2);
        DB W = (dot(v, h[r] - h[i]) - dot(v, h[l] - h[i])) / sqrt(len2);
        res = min(res, H * W);
    }
    return res;
}
```

</CodeCollapse>

</details>
</details>

<details>
<summary>练习 1：两个凸包的最小距离</summary>

**题目描述**：求两个不相交凸包 $A, B$ 的最短距离。
**思路**：
1. 使用两组卡壳平行线。当 $A$ 的支撑线与 $B$ 的支撑线平行且反向时，距离取得局部极小。
2. 距离可能由点-点、点-边或边-边产生。

<details>
<summary>Check Solution</summary>

提示：对两个凸包分别寻找 $y$ 最小和 $y$ 最大的点作为起始指针，进行同步旋转。比较四种组合下的最小距离。

</details>
</details>

<details>
<summary>练习 2：多边形宽度 (Width of Polygon)</summary>

**题目描述**：凸多边形的宽度是其两条平行支撑线之间的最小距离。
**推导**：宽度必由一条边 $e_i$ 及其对应的对踵点 $P$ 产生。即 $W = \min_i \text{dist}(P, \text{Line}(e_i))$。

<details>
<summary>Check Solution</summary>

<CodeCollapse title="多边形宽度计算" language="cpp">

```cpp
DB getWidth(const vector<Point>& h) {
    int n = h.size();
    DB res = 1e18;
    for (int i = 0, j = 1; i < n; i++) {
        while (sign(cross(h[(i+1)%n] - h[i], h[(j+1)%n] - h[i]) -
                   cross(h[(i+1)%n] - h[i], h[j] - h[i])) >= 0) j = (j + 1) % n;
        res = min(res, cross(h[(i+1)%n] - h[i], h[j] - h[i]) / dist(h[i], h[(i+1)%n]));
    }
    return res;
}
```

</CodeCollapse>

</details>
</details>

---

## 🎯 模块导航

- <Waypoints className="inline-block w-4 h-4 mr-1 text-blue-500" /> [凸包算法 (Convex Hull)](convex-hull) - 几何预处理。
- <Scaling className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 线性约束。
- <ShieldAlert className="inline-block w-4 h-4 mr-1 text-red-500" /> [计算几何基础](index) - 鲁棒性与精度。
