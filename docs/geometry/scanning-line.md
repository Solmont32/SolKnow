---
title: 扫描线技巧 (Scanning Line)
description: 降维打击、区间覆盖维护与几何面积并求解。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import CodeCollapse from '@site/src/components/CodeCollapse';
import { MoveRight, Zap, Activity, BookOpen, Layers, ShieldAlert, Scale } from 'lucide-react';

# 扫描线技巧 (Scanning Line)

**扫描线**（Scanning Line）是计算几何中处理区域覆盖与面积统计的核心方法。它利用“降维”思想，通过一根扫描线在平面上平移，将二维问题离散化为一维区间动态更新问题。

---

## 1. 核心模型：矩形面积并 (Area Union)

### 1.1 拓扑分解与 Fubini 定理证明

<KnowledgeCard type="theorem" title="Lebesgue 测度分解证明">

**证明：测度离散化**
1. 设平面内 $n$ 个矩形并集为 $U = \bigcup R_i$。其面积 $A(U) = \iint_U 1 dA$。
2. 由 **Fubini 定理**，面积可写为积分的叠加：$A(U) = \int_{x_{min}}^{x_{max}} L(x) dx$，其中 $L(x)$ 为垂直线 $x$ 被 $U$ 覆盖的长度。
3. **关键事件点**：$L(x)$ 仅在矩形的垂直边（$x = x_{left}$ 或 $x = x_{right}$）处发生变化。
4. 在相邻两个 $x$ 坐标事件点 $[x_i, x_{i+1}]$ 之间，$L(x)$ 是常数。
5. 故 $A(U) = \sum_{i=1}^{2n-1} L_i \cdot (x_{i+1} - x_i)$。

</KnowledgeCard>

---

## 2. 离散化与线段树一致性 (Segment Tree Consistency)

在扫描线算法中，线段树维护的是 $y$ 轴方向的覆盖区间。

<KnowledgeCard type="warning" title="区间闭包与索引映射">

1. **区间表示**：线段树节点 $[l, r]$ 通常表示离散化后的第 $l$ 个 $y$ 区间到第 $r$ 个 $y$ 区间。即实际空间范围 $[Y_l, Y_{r+1}]$。
2. **Pushup 逻辑一致性**：
   - 若当前节点 `count > 0`，覆盖长度即为该节点代表的全长：`len = Y[r+1] - Y[l]`。
   - 若 `count == 0` 且是非叶子节点，`len = left.len + right.len`。
3. **一致性保护**：确保 $y$ 坐标去重后，线段树的范围映射是严格单调的。

</KnowledgeCard>

---

## 3. 教材级核心代码实现 (C++)

<CodeCollapse title="扫描线求矩形面积并 (Area Union) 完整实现" language="cpp">

```cpp
struct Edge {
    DB x, y1, y2;
    int type; // 1: 入边, -1: 出边
    bool operator< (const Edge& e) const { return x < e.x; }
};

struct Node {
    int l, r, cnt;
    DB len;
} tree[N << 3];

vector<DB> Y; // 离散化后的 Y 坐标

void pushup(int u) {
    if (tree[u].cnt) tree[u].len = Y[tree[u].r + 1] - Y[tree[u].l];
    else if (tree[u].l == tree[u].r) tree[u].len = 0;
    else tree[u].len = tree[u << 1].len + tree[u << 1 | 1].len;
}

void build(int u, int l, int r) {
    tree[u] = {l, r, 0, 0};
    if (l == r) return;
    int mid = (l + r) >> 1;
    build(u << 1, l, mid);
    build(u << 1 | 1, mid + 1, r);
}

void update(int u, int l, int r, int val) {
    if (tree[u].l >= l && tree[u].r <= r) {
        tree[u].cnt += val;
        pushup(u);
        return;
    }
    int mid = (tree[u].l + tree[u].r) >> 1;
    if (l <= mid) update(u << 1, l, r, val);
    if (r > mid) update(u << 1 | 1, l, r, val);
    pushup(u);
}
```

</CodeCollapse>

---

## 4. 经典教材级例题与练习 (Exercises)

<details>
<summary>例题 1：矩形周长并 (Perimeter Union) - 连通性分析</summary>

**题目描述**：求 $N$ 个矩形并集的轮廓总周长。
**推导**：
1. **垂直边贡献**：相邻两次扫描线覆盖长度的变化量 $|L_{new} - L_{old}|$。
2. **水平边贡献**：$2 \times \text{线段树内独立连通段数} \times (x_{i+1} - x_i)$。
线段树需额外维护 `num_seg`（覆盖段数）及 `l_cov`, `r_cov`（左右端点是否覆盖）。

<details>
<summary>Check Solution</summary>

<CodeCollapse title="线段树维护覆盖连通段数" language="cpp">

```cpp
struct Node {
    int l, r, cnt, num;
    bool lc, rc;
    DB len;
} tree[N << 3];

void pushup(int u) {
    if (tree[u].cnt) {
        tree[u].len = Y[tree[u].r + 1] - Y[tree[u].l];
        tree[u].num = 1; tree[u].lc = tree[u].rc = 1;
    } else if (tree[u].l == tree[u].r) {
        tree[u].len = tree[u].num = tree[u].lc = tree[u].rc = 0;
    } else {
        tree[u].len = tree[u<<1].len + tree[u<<1|1].len;
        tree[u].num = tree[u<<1].num + tree[u<<1|1].num - (tree[u<<1].rc && tree[u<<1|1].lc);
        tree[u].lc = tree[u<<1].lc; tree[u].rc = tree[u<<1|1].rc;
    }
}
```

</CodeCollapse>

</details>
</details>

<details>
<summary>练习 1：窗口最大权值 - 扫描线变体</summary>

**题目描述**：用 $W \times H$ 的窗口覆盖带权点，求最大权值和。
**思路**：
1. 将每个点 $(x, y)$ 扩大为矩形 $[x, x+W] \times [y, y+H]$。
2. 窗口覆盖点等价于矩形包含点。寻找平面内被矩形覆盖层数（权值和）最多的点。
3. 线段树维护区间加和区间最大值。

<details>
<summary>Check Solution</summary>

提示：将点 $P_i(x_i, y_i, w_i)$ 转化为垂直线段事件：在 $x_i$ 处区间 $[y_i, y_i+H]$ 加 $w_i$，在 $x_i+W$ 处减 $w_i$。线段树全局最大值即为答案。

</details>
</details>

<details>
<summary>练习 2：矩形面积交 (Area Intersection)</summary>

**题目描述**：求 $N$ 个矩形重叠至少 $K$ 次的区域面积。
**思路**：线段树维护覆盖次数。`pushup` 时，若 `cnt >= K`，长度为全长；若 `cnt < K`，则从子节点汇总满足条件的长度。

</details>

---

## 🎯 模块导航

- <MoveRight className="inline-block w-4 h-4 mr-1 text-blue-500" /> [计算几何基础](index) - 原语与精度控制。
- <Layers className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [凸包算法 (Convex Hull)](convex-hull) - 几何结构构建。
- <ShieldAlert className="inline-block w-4 h-4 mr-1 text-red-500" /> [数据结构：线段树](../ds/segtree) - 扫描线的基础设施。
