---
title: 扫描线技巧 (Scanning Line)
description: 降维打击、区间覆盖维护与几何面积并求解。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { MoveRight, Zap, Activity, BookOpen, Layers, ShieldAlert, Scale } from 'lucide-react';

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
1.  **事件离散性**：$I_U(x, y)$ 的值仅在矩形边界 $x \in \{x_{i,1}, x_{i,2}\}$ 处发生跃迁。
2.  **分段常数性**：在相邻 $x$ 坐标区间 $(x_j, x_{j+1})$ 内，$L(x)$ 为常数 $L_j$。
3.  **最终求和**：$A(U) = \sum L_j \cdot (x_{j+1} - x_j)$。得证。

</KnowledgeCard>

---

## 2. 离散化与数值稳定性 (Numerical Stability)

在扫描线算法中，坐标离散化是处理浮点数坐标的关键步骤。

<KnowledgeCard type="warning" title="离散化中的精度陷阱">

1.  **唯一化失败**：若坐标间距 $\Delta < \epsilon$，`unique` 函数可能无法正确识别重复坐标。
2.  **映射漂移**：在查找原坐标对应的索引时，必须使用 `lower_bound` 结合 $\epsilon$ 判定。
3.  **区间闭包性**：线段树节点 $[l, r]$ 实际代表 $y$ 轴离散化后的区间段 $[Y_l, Y_{r+1}]$。
    - **推论**：若节点 $u$ 的 `count > 0`，其长度 $len$ 立即收敛为 $Y_{tree[u].r+1} - Y_{tree[u].l}$。

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
    else if (tree[u].l == tree[u].r) tree[u].len = 0; 
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
**思路**：垂直边的贡献为线段树覆盖总长度的变化量 $|L_{new} - L_{old}|$；水平边的贡献为 $2 \times \text{独立连通段数} \times \Delta x$。

<details>
<summary>Check Solution</summary>

```cpp
struct Node {
    int l, r, count, num_seg;
    DB len;
    bool l_cov, r_cov;
} tree[N << 3];

void pushup(int u) {
    if (tree[u].count > 0) {
        tree[u].len = Y[tree[u].r + 1] - Y[tree[u].l];
        tree[u].num_seg = 1;
        tree[u].l_cov = tree[u].r_cov = true;
    } else {
        tree[u].len = tree[2*u].len + tree[2*u+1].len;
        tree[u].num_seg = tree[2*u].num_seg + tree[2*u+1].num_seg;
        if (tree[2*u].r_cov && tree[2*u+1].l_cov) tree[u].num_seg--;
        tree[u].l_cov = tree[2*u].l_cov;
        tree[u].r_cov = tree[2*u+1].r_cov;
    }
}
```

</details>
</details>

<details>
<summary>练习 1：窗口内的最大权值 (Window Max Points)</summary>

**题目描述**：在平面上有 $n$ 个加权点，求一个 $W \times H$ 的窗口能覆盖的最大权值和。
**思路**：将点 $(x, y)$ 转化为矩形 $[x, x+W] \times [y, y+H]$。扫描线维护区间最大值，支持区间加减。

</details>

<details>
<summary>练习 2：矩形 $K$ 层覆盖面积</summary>

**题目描述**：计算被至少 $K$ 个矩形覆盖的区域面积。
**思路**：线段树节点维护 `len[i]`，表示覆盖次数 $\ge i$ 的长度。
当 `tree[u].count >= i` 时，`len[i] = full_len`；否则由子节点合并。

<details>
<summary>Check Solution</summary>

```cpp
void pushup(int u, int K) {
    for (int i = 1; i <= K; i++) {
        if (tree[u].count >= i) tree[u].len[i] = Y[tree[u].r+1] - Y[tree[u].l];
        else if (tree[u].l == tree[u].r) tree[u].len[i] = 0;
        else tree[u].len[i] = tree[2*u].len[i - tree[u].count] + 
                             tree[2*u+1].len[i - tree[u].count];
    }
}
```

</details>
</details>

---

## 🎯 模块导航

- <MoveRight className="inline-block w-4 h-4 mr-1 text-blue-500" /> [计算几何基础](index) - 原语与精度控制。
- <Layers className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [凸包算法 (Convex Hull)](convex-hull) - 几何结构构建。
- <ShieldAlert className="inline-block w-4 h-4 mr-1 text-red-500" /> [数据结构：线段树](../ds/segtree) - 扫描线的基础设施。
