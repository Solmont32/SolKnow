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

给定 $N$ 个坐标轴平行的矩形，求它们的并集面积。

### 1.1 算法原理
1. **纵向离散化**: 将所有矩形的上下边界 $y_1, y_2$ 存入数组并排序去重。这些 $y$ 坐标将平面划分为若干个水平条。
2. **事件点**: 每个矩形的左右边界 $x_1, x_2$ 构成扫描线的事件点。
   - 左边界 $x_1$: 入边，覆盖次数 $+1$。
   - 右边界 $x_2$: 出边，覆盖次数 $-1$。
3. **线段树维护**:
   - 线段树的每个节点维护一个 $y$ 轴区间。
   - `cnt`: 该区间被完整覆盖的次数。
   - `len`: 该区间内被覆盖的总长度。
4. **面积计算**:
   $$\text{Area} = \sum (x_{i+1} - x_i) \times \text{root.len}$$

---

## 2. 工业级 C++ 实现

```cpp
struct Edge {
    double x, y1, y2;
    int type;
    bool operator< (const Edge& b) const { return x < b.x; }
};

struct Node {
    int l, r, cnt;
    double len;
} tr[MAXN << 3];

vector<double> ys;
int get_id(double y) {
    return lower_bound(ys.begin(), ys.end(), y) - ys.begin();
}

void pushup(int u) {
    if (tr[u].cnt > 0) tr[u].len = ys[tr[u].r + 1] - ys[tr[u].l];
    else if (tr[u].l != tr[u].r) tr[u].len = tr[u << 1].len + tr[u << 1 | 1].len;
    else tr[u].len = 0;
}

void update(int u, int l, int r, int v) {
    if (tr[u].l >= l && tr[u].r <= r) {
        tr[u].cnt += v;
        pushup(u);
    } else {
        int mid = (tr[u].l + tr[u].r) >> 1;
        if (l <= mid) update(u << 1, l, r, v);
        if (r > mid) update(u << 1 | 1, l, r, v);
        pushup(u);
    }
}
```

---

## 3. 进阶：扫描线处理圆并 (Union of Circles)

处理圆的面积并通常使用 **Green 公式** 或 **Simpson 积分**，但在特定情况下（如离散化 $x$ 后处理弧段），扫描线思想依然适用。

<KnowledgeCard type="info" title="Green 公式应用">
通过计算边界曲线的线积分 $\oint P dx + Q dy$ 可以求出封闭区域面积。对于圆并，扫描线可以帮助我们确定哪些圆弧位于整个并集的边界上。
</KnowledgeCard>

---

## 4. 经典练习

<details>
<summary>例题 1：矩形周长并 (HDU 1828 - Atlantis 变体)</summary>

**题目描述**：给定 $N$ 个矩形，求并集的周长。

**解答思路**：
1. 依然使用扫描线。
2. 线段树除了维护 `len`，还需维护：
   - `num`: 该区间内独立的线段段数。
   - `l_covered`, `r_covered`: 左右端点是否被覆盖（用于合并段数）。
3. 纵向周长：$\sum |root.len_{i} - root.len_{i-1}|$。
4. 横向周长：$\sum 2 \times root.num \times (x_{i+1} - x_i)$。

```cpp
// 线段树节点扩展
struct Node {
    int l, r, cnt, num;
    double len;
    bool lc, rc;
};
```
</details>

<details>
<summary>练习 1：窗口最大覆盖点数</summary>

**题目描述**：给定 $N$ 个点，每个点有权值 $W$。求一个固定大小 $L \times H$ 的矩形窗口，使其覆盖的点权值和最大。

**解答思路**：
1. 将每个点 $(x, y)$ 转化为一个以其为左下角的矩形 $[x, x+L] \times [y, y+H]$。
2. 问题转化为：求平面上被矩形覆盖次数最多的点。
3. 扫描线 + 线段树维护区间最大值即可。

```cpp
// 线段树维护 max_val
void update(int u, int l, int r, int v) {
    if (tr[u].l >= l && tr[u].r <= r) {
        tr[u].max_v += v;
        tr[u].lazy += v;
    } else {
        pushdown(u);
        // ... 标准区间加 ...
        pushup(u);
    }
}
```
</details>

---

## 5. 模块导航

- <LayoutTemplate className="inline-block w-4 h-4 mr-1 text-blue-500" /> [计算几何基础](index) - 坐标与精度控制。
- <BoxSelect className="inline-block w-4 h-4 mr-1 text-purple-500" /> [半平面交](half-plane-intersection) - 处理动态线性约束。
