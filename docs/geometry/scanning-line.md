---
title: 扫描线技巧 (Scanning Line)
description: 离散化、线段树结合扫描线解决矩形面积交、并问题。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { MoveRight, LayoutTemplate, BoxSelect } from 'lucide-react';

# 扫描线技巧 (Scanning Line)

**扫描线（Scanning Line）** 是一种将高维几何问题转化为低维动态维护问题的通用思想。其核心在于：想象一条直线在平面上匀速扫过，并在关键的“事件点”更新维护的数据结构。

---

## 1. 核心模型：矩形面积并 (Union of Rectangles)

### 1.1 离散化映射
对于 $N$ 个矩形，其 $y$ 坐标集合为 $\{y_1, y_2, \dots, y_{2n}\}$。对该集合进行排序并去重，得到 $m$ 个离散化的 $y$ 坐标。这些坐标将 $y$ 轴划分为 $m-1$ 个基础区间 $[y_i, y_{i+1}]$。

### 1.2 线段树维护
线段树的每个节点维护一个索引区间 $[L, R]$，对应 $y$ 轴的实数区间 $[y_L, y_{R+1}]$。
- `cnt`: 该区间被**完整**覆盖的次数。
- `len`: 该区间内当前被覆盖的**有效长度**。

**关键 pushup 逻辑**:
- 若 `cnt > 0`，则 `len = y_{R+1} - y_L`。
- 若 `cnt == 0`，且非叶子节点，则 `len = left_child.len + right_child.len`。
- 若 `cnt == 0` 且为叶子节点，则 `len = 0`。

```cpp
struct Edge {
    double x, y1, y2;
    int type; // +1 入边, -1 出边
    bool operator< (const Edge& b) const { return x < b.x; }
};

void pushup(int u, int l, int r) {
    if (tr[u].cnt) tr[u].len = ys[r + 1] - ys[l];
    else if (l != r) tr[u].len = tr[u << 1].len + tr[u << 1 | 1].len;
    else tr[u].len = 0;
}

void update(int u, int l, int r, int ql, int qr, int v) {
    if (ql <= l && r <= qr) {
        tr[u].cnt += v;
        pushup(u, l, r);
        return;
    }
    int mid = (l + r) >> 1;
    if (ql <= mid) update(u << 1, l, mid, ql, qr, v);
    if (qr > mid) update(u << 1 | 1, mid + 1, r, ql, qr, v);
    pushup(u, l, r);
}
```

---

## 2. 进阶应用：矩形周长并 (Perimeter Union)

相比面积并，周长并需要额外维护区间的连通性。

### 2.1 状态维护
1. `len`: 区间内被覆盖的长度（用于计算横向周长）。
2. `num`: 区间内包含的**独立线段段数**。
3. `l_cov`, `r_cov`: 区间左右端点是否被覆盖（用于合并 `num`）。

### 2.2 周长推导
- **纵向周长**: 在扫描线移动到 $x_i$ 时，增加的纵向长度为 $|len_{curr} - len_{prev}|$。
- **横向周长**: 每个时间段 $(x_{curr} - x_{prev})$ 内，贡献的横向周长为 $2 \times num \times (x_{curr} - x_{prev})$。

---

## 3. 经典练习与挑战

<details>
<summary>例题 1：矩形周长并完整实现</summary>

**解答思路**：
线段树节点需增加 `num`, `lc`, `rc`。在 `pushup` 时，若左右子树衔接处均被覆盖，则 `num = left.num + right.num - 1`，否则直接相加。

```cpp
void pushup(int u, int l, int r) {
    if (tr[u].cnt) {
        tr[u].len = ys[r + 1] - ys[l];
        tr[u].num = 1; tr[u].lc = tr[u].rc = true;
    } else if (l != r) {
        tr[u].len = tr[u << 1].len + tr[u << 1 | 1].len;
        tr[u].num = tr[u << 1].num + tr[u << 1 | 1].num - (tr[u << 1].rc && tr[u << 1 | 1].lc);
        tr[u].lc = tr[u << 1].lc; tr[u].rc = tr[u << 1 | 1].rc;
    } else {
        tr[u].len = tr[u].num = 0;
        tr[u].lc = tr[u].rc = false;
    }
}
```
</details>

<details>
<summary>练习 1：最大权值矩形覆盖</summary>

**题目要求**：平面上有 $N$ 个带权点。求一个固定大小为 $W \times H$ 的矩形，使其覆盖的点权和最大。

**提示**：将每个点 $(x, y)$ 扩张为一个矩形区域 $[x-W, x] \times [y-H, y]$。问题转化为寻找被矩形覆盖次数最多的点的最大权值。使用扫描线 + 线段树维护区间最大值即可。
</details>

---

## 4. 模块导航

- <LayoutTemplate className="inline-block w-4 h-4 mr-1 text-blue-500" /> [计算几何基础](index) - 离散化坐标处理基础。
- <BoxSelect className="inline-block w-4 h-4 mr-1 text-purple-500" /> [半平面交](half-plane-intersection) - 线性约束的可行域分析。
- <MoveRight className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [线段树进阶](../ds/segtree) - 了解扫描线背后的动态数据结构。
