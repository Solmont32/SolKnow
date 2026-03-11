---
title: 扫描线技巧 (Scanning Line)
description: 降维打击、区间覆盖维护与几何面积并求解。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { MoveRight, Zap, Activity, BookOpen, Layers } from 'lucide-react';

# 扫描线技巧 (Scanning Line)

**扫描线**（Scanning Line）是计算几何中一种极具“降维”思想的算法模型。它的核心是将二维几何问题转化为一维的动态区间维护问题，通过一根垂直或水平的直线在平面上扫描，仅在特定的**关键事件点**处更新状态。

---

## 1. 核心模型：矩形面积并 (Area Union)

### 1.1 问题描述
给定 $N$ 个坐标轴平行的矩形，求它们的并集面积。

<KnowledgeCard type="algorithm" title="扫描线处理流程">

1.  **离散化**：收集所有矩形的上下边界 $y$ 坐标，作为扫描线的离散节点。
2.  **事件排序**：将矩形的左右边界 $x$ 坐标看作“事件”。左边界为入边（覆盖次数 $+1$），右边界为出边（覆盖次数 $-1$）。
3.  **数据结构维护**：利用**线段树**维护 $y$ 轴方向上的区间覆盖总长度。
4.  **增量累加**：面积 $S = \sum (\Delta x_i \times \text{线段树维护的总有效长度})$。

</KnowledgeCard>

---

## 2. 核心代码实现 (C++)

配合线段树维护 $y$ 轴区间覆盖：

```cpp
struct Edge {
    DB x, y1, y2;
    int type; // 1 为左边，-1 为右边
    bool operator< (const Edge& b) const { return x < b.x; }
};

// 线段树节点：维护区间覆盖长度
struct Node {
    int l, r, count; // count 为覆盖次数
    DB len;         // 维护的总长度
} tree[N << 3];

void pushup(int u) {
    if (tree[u].count > 0) tree[u].len = Y[tree[u].r + 1] - Y[tree[u].l];
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

## 3. 复杂度分析与空间边界 (Analysis)

<KnowledgeCard type="complexity">
- **时间复杂度**: $O(N \log N)$。
    -   排序 $x$ 轴边界：$O(N \log N)$。
    -   线段树操作：共 $2N$ 次更新，每次 $O(\log N)$。
- **空间复杂度**: $O(N)$。线段树和离散化数组均需线性空间。
- **数学性质**：该算法将二维积分 $S = \iint_D dA$ 离散化为 $\sum \Delta x \int f(y) dy$。
</KnowledgeCard>

---

## 4. 经典练习与进阶

<details>
<summary>例题 1：矩形周长并 (Perimeter Union)</summary>

**题目要求**：求所有矩形并集的轮廓周长。
**思路**：
1.  垂直边的贡献：线段树维护区间覆盖的**段数**。
2.  水平边的贡献：线段树维护本次更新前后 `len` 的变化量绝对值。

</details>

<details>
<summary>例题 2：窗口内的最大点数 (Atlantis)</summary>

**题目要求**：给定一组点，求一个固定大小的矩形窗口最多能覆盖多少点。
**思路**：将点转化为矩形（点 $P$ 作为窗口左下角时，窗口覆盖点 $P$），问题转化为求矩形覆盖的最大次数。

</details>

<KnowledgeCard type="tip" title="习题库推荐">
1.  [HDU 1542] Atlantis - 扫描线求矩形面积并（经典入门）。
2.  [HDU 1828] Picture - 扫描线求矩形周长并。
3.  [POJ 2482] Stars in Your Window - 扫描线 + 线段树维护最大值。
</KnowledgeCard>

---

## 🎯 模块导航

- <MoveRight className="inline-block w-4 h-4 mr-1 text-blue-500" /> [计算几何基础](index) - 原语与精度。
- <Layers className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [凸包算法 (Convex Hull)](convex-hull) - 几何形态构建。
- <Activity className="inline-block w-4 h-4 mr-1 text-amber-500" /> [数据结构：线段树](../ds/segtree) - 扫描线的基础设施。
