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

### 1.1 拓扑性质证明

<KnowledgeCard type="theorem" title="面积并的离散分解证明">

**定理**：$N$ 个矩形的并集面积可以通过其所有垂直边界 $x_i$ 将其划分为 $2N-1$ 个不相交的垂直条带（Slabs）。

**证明**：
在任意两个相邻的垂直边界 $x_j, x_{j+1}$ 之间，所有包含该条带的矩形的 $y$ 轴覆盖集合是恒定不变的。因此，在该条带内的面积可以表示为 $(x_{j+1} - x_j) \times \text{Length}(Y_{set})$，其中 $\text{Length}(Y_{set})$ 为一维区间并的长度。总面积即为所有条带面积之和。得证。

</KnowledgeCard>

---

## 2. 几何鲁棒性边界 (Robustness)

<KnowledgeCard type="warning" title="扫描线中的退化情况">

1.  **坐标重合**：当多个矩形的左右边界 $x$ 坐标相同时，必须确保线段树的更新顺序。通常建议先处理“入边”再处理“出边”，或将重合 $x$ 的事件合并处理，以避免面积计算中出现宽度为 0 的异常。
2.  **大坐标范围**：若坐标达到 $10^9$，直接建树不可行，必须进行**离散化 (Discretization)**。离散化后，$y$ 轴区间变为 $[1, M]$，其中 $M$ 为不同 $y$ 坐标的数量。
3.  **精度误差**：尽管扫描线主要处理整数坐标，但在某些题目中涉及浮点数坐标，此时线段树的区间端点判定需严格遵守 $\epsilon$ 规则。

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
