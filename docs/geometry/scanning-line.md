---
title: 扫描线技巧 (Scanning Line)
description: 降维打击、区间覆盖维护与几何面积并求解。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { MoveRight, Zap, Activity, BookOpen, Layers, ShieldAlert } from 'lucide-react';

# 扫描线技巧 (Scanning Line)

**扫描线**（Scanning Line）是计算几何中一种极具“降维”思想的算法模型。它的核心是将二维几何问题转化为一维的动态区间维护问题，通过一根直线在平面上扫描，仅在特定的**关键事件点**处更新状态。

---

## 1. 核心模型：矩形面积并 (Area Union)

### 1.1 矩形面积并的拓扑分解定理

**定理**：对于 $N$ 个矩形 $\{R_1, R_2, \dots, R_N\}$，其并集 $U = \bigcup R_i$ 的面积可通过对 $x, y$ 轴进行离散化分解。

<KnowledgeCard type="theorem" title="Lebesgue 测度分解证明">

**证明：Fubini 定理应用**
面积可以表示为指示函数 $I_U(x, y)$ 的二重积分：
$$A(U) = \iint_{\mathbb{R}^2} I_U(x, y) dA = \int_{-\infty}^{\infty} \left( \int_{-\infty}^{\infty} I_U(x, y) dy \right) dx$$
内部积分 $L(x) = \int_{-\infty}^{\infty} I_U(x, y) dy$ 代表 $x$ 处垂直切线的覆盖长度。
1.  **事件离散性**：$L(x)$ 仅在矩形边界 $x \in \{x_{i,1}, x_{i,2}\}$ 处发生变化。
2.  **分段常数性**：在相邻 $x$ 坐标区间 $(x_j, x_{j+1})$ 内，$L(x)$ 为常数 $L_j$。
3.  **最终求和**：$A(U) = \sum L_j \cdot (x_{j+1} - x_j)$。得证。

</KnowledgeCard>

---

## 2. 拓扑一致性与线段树维护 (Consistency)

在扫描线算法中，线段树不仅是数据结构，更是拓扑信息的载体。

<KnowledgeCard type="warning" title="覆盖状态一致性原则">

1.  **计数的非负性**：`tree[u].count` 始终非负。出边更新必须与入边严格匹配，否则破坏拓扑单调性。
2.  **区间闭包性**：线段树节点 $[l, r]$ 实际代表 $y$ 轴离散化后的区间段 $[Y_l, Y_{r+1}]$。
    - **推论**：若节点 $u$ 的 `count > 0`，其长度 $len$ 立即收敛为 $Y_{tree[u].r+1} - Y_{tree[u].l}$。
3.  **拓扑退化**：若多个矩形边界重合，扫描线应在同一 $x$ 位置批量处理所有事件后再计算面积，以维持逻辑一致性。

</KnowledgeCard>


---

## 3. 核心代码实现 (C++)

```cpp
struct Edge {
    DB x, y1, y2;
    int type; // 1 为入边(左), -1 为出边(右)
    bool operator< (const Edge& b) const { return x < b.x; }
};

// 线段树节点：维护区间覆盖长度
struct Node {
    int l, r, count; // count 为覆盖次数
    DB len;         // 维护的总长度
} tree[N << 3];

void pushup(int u) {
    if (tree[u].count > 0) tree[u].len = Y[tree[u].r + 1] - Y[tree[u].l];
    else if (tree[u].l == tree[u].r) tree[u].len = 0; // 叶子节点
    else tree[u].len = tree[2 * u].len + tree[2 * u + 1].len;
}

void update(int u, int l, int r, int val) {
    if (tree[u].l >= l && tree[u].r <= r) {
        tree[u].count += val;
        pushup(u);
        return;
    }
    int mid = (tree[u].l + tree[u].r) >> 1;
    if (l <= mid) update(2 * u, l, r, val);
    if (r > mid) update(2 * u + 1, l, r, val);
    pushup(u);
}
```

---

## 4. 经典练习库 (Exercises)

<details>
<summary>例题 1：矩形周长并 (Perimeter Union)</summary>

**题目描述**：给定 $N$ 个矩形，求其并集的轮廓总周长。
**思路**：
1.  **垂直边**：维护线段树的 `num_segments`（覆盖了多少个独立的区间段）。每次 $x$ 轴移动 $\Delta x$ 时，垂直边的贡献为 $| \text{NewLen} - \text{OldLen} |$。
2.  **水平边**：水平边的贡献为 $2 \times \text{num\_segments} \times \Delta x$。

<details>
<summary>Check Solution</summary>

```cpp
struct Node {
    int l, r, count;
    int num_segments; // 区间内独立覆盖段数
    DB len;
    bool l_covered, r_covered; // 左右端点是否被覆盖
} tree[N << 3];

void pushup(int u) {
    if (tree[u].count > 0) {
        tree[u].len = Y[tree[u].r + 1] - Y[tree[u].l];
        tree[u].num_segments = 1;
        tree[u].l_covered = tree[u].r_covered = true;
    } else {
        tree[u].len = tree[2*u].len + tree[2*u+1].len;
        tree[u].num_segments = tree[2*u].num_segments + tree[2*u+1].num_segments;
        if (tree[2*u].r_covered && tree[2*u+1].l_covered) tree[u].num_segments--;
        tree[u].l_covered = tree[2*u].l_covered;
        tree[u].r_covered = tree[2*u+1].r_covered;
    }
}
```

</details>
</details>

<details>
<summary>练习 1：窗口内的最大点数 (Window Maximum)</summary>

**题目描述**：在平面上有 $n$ 个星星，每个星星有权值 $w_i$。给定一个 $W \times H$ 的矩形窗口，求窗口能覆盖的星星权值之和的最大值（窗口边界上的点不计）。

<details>
<summary>Check Solution</summary>

**转化**：将星星 $P(x, y)$ 转化为以 $P$ 为左下角的 $W \times H$ 的矩形。寻找一个点（窗口右上角），被这些矩形覆盖的权值和最大。
**实现**：扫描线 + 线段树维护区间最大值（支持区间加法）。

```cpp
// 线段树维护最大值 max_val
void update(int u, int l, int r, int val) {
    if (tree[u].l >= l && tree[u].r <= r) {
        tree[u].max_val += val;
        tree[u].lazy += val;
        return;
    }
    pushdown(u);
    // ... 标准线段树更新 ...
    tree[u].max_val = max(tree[2*u].max_val, tree[2*u+1].max_val);
}
```

</details>
</details>

<details>
<summary>练习 2：矩形 $k$ 层覆盖面积</summary>

**题目描述**：求被至少 $k$ 个矩形覆盖的区域面积。
**思路**：修改线段树的 `pushup` 逻辑。递归维护覆盖 $\ge 1$ 次，$\ge 2$ 次，... $\ge k$ 次的长度。

</details>

---

## 🎯 模块导航

- <MoveRight className="inline-block w-4 h-4 mr-1 text-blue-500" /> [计算几何基础](index) - 原语与精度控制。
- <Layers className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [凸包算法 (Convex Hull)](convex-hull) - 几何结构构建。
- <ShieldAlert className="inline-block w-4 h-4 mr-1 text-red-500" /> [数据结构：线段树](../ds/segtree) - 扫描线的基础设施。
