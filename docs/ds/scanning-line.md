---
title: 扫描线技巧 (Scanning Line)
sidebar_position: 9
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { MoveRight, LayoutTemplate, BoxSelect, Maximize, Activity, Calculator, MousePointer2, Cuboid } from 'lucide-react';

# 扫描线技巧 (Scanning Line): 降维打击的代数实现

<KnowledgeCard type="info" title="核心思想：空间到时间的转换">
**扫描线（Scanning Line）** 是一种将 $d$ 维几何问题转化为 $d-1$ 维动态维护问题的通用范式。
- **几何变换**: 想象一条直线（或平面）在空间中扫过，并在特定的**事件点 (Events)** 停止。
- **代数本质**: 维护区间权值的动态积分 $ \int L(x) dx $。线段树作为积分器，在 $O(\log N)$ 时间内处理离散事件。
</KnowledgeCard>

---

## 1. 系统化抽象数据类型 (ADT) 推导

扫描线处理的对象是几何对象的集合 $\mathcal{S} = \{O_1, O_2, \dots, O_n\}$。

### 1.1 事件点与切片

- **Event (事件)**: 几何对象在扫描方向上的临界坐标（如矩形的左边界和右边界）。
- **Slice (切片)**: 两个相邻事件点之间的区间。在该区间内，扫描方向正交的拓扑结构（即截面长度）保持恒定。

### 1.2 离散积分算子

几何对象的测度（如面积）定义为：
$$ \text{Area} = \sum_{i=1}^{m-1} \text{Length}(\text{CoveredIntervals}, x_i, x_{i+1}) \cdot (x_{i+1} - x_i) $$
其中 $\text{Length}$ 是由维护截面信息的线段树实时提供的区间覆盖总长度。

---

## 2. 复杂度分析与数据完整性证明

### 2.1 复杂度收敛证明

**定理**：对于 $N$ 个矩形的面积并，扫描线算法的时间复杂度为 $O(N \log N)$。
**证明**：
1. **预处理**: 提取 $2N$ 条垂直边（事件点）并按 $x$ 坐标排序，$O(N \log N)$。
2. **离散化**: 提取所有不同的 $y$ 坐标并建立映射，$O(N \log N)$。
3. **主循环**: 遍历 $2N$ 条边，每次在维护 $y$ 轴的线段树上进行区间修改操作。单次操作复杂度 $O(\log N)$。
总复杂度 $W(N) = O(N \log N) + 2N \cdot O(\log N) = O(N \log N)$。

### 2.2 数据完整性：标记永久化合法性

**命题**：在矩形面积并线段树中，`cnt` 标记无需 `push_down`。
**证明**：
矩形的入边和出边总是成对出现的。由于我们查询的是**全局根节点**的覆盖长度，且任何子区间的修改都是对称的（+1 必有对应的 -1），因此 `cnt[u]` 仅反映当前区间被“完全覆盖”的次数。
- 若 `cnt[u] > 0`，覆盖长度为区间全长。
- 若 `cnt[u] == 0`，覆盖长度由子节点贡献之和决定（叶子节点为 0）。
这种**自下而上**的汇总机制保证了在不向下传递标记的情况下，根节点的统计信息始终正确。

---

## 3. 多维操作逻辑验证：N 维扫描线

### 3.1 三维体积并 (3D Volume Union)

1. **维度缩减**: 将 $z$ 轴作为扫描维度，事件点为每个长方体的 $z_{min}$ 和 $z_{max}$。
2. **截面处理**: 相邻 $z$ 坐标之间的切片是一个“厚度”恒定的二维面积并问题。
3. **实现路径**: 每次移动扫描面时，更新二维面积并的值。若矩形静态，可优化至 $O(N^2 \log N)$。

### 3.2 N 维归纳

通过递归应用扫描线，可以将 $d$ 维问题退化为 $d-1$ 维。
$$ \text{Measure}_d = \sum (x_{i+1} - x_i) \cdot \text{Measure}_{d-1}(\text{Slice}_i) $$
这种递归结构在计算超矩形并（Klee's Measure Problem）时非常有效。

---

## 4. 教材化例题与解析

### 例题 1：矩形面积并 (Atlantis) 全量实现

<details>
<summary>Check Solution (C++ Implementation)</summary>

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

const int N = 200010;
struct Edge {
    double x, y1, y2;
    int k;
    bool operator< (const Edge& t) const { return x < t.x; }
} edge[N * 2];

struct Node {
    int l, r, cnt;
    double len;
} tr[N * 8];

vector<double> ys;

int find(double y) {
    return lower_bound(ys.begin(), ys.end(), y) - ys.begin();
}

void pushup(int u) {
    if (tr[u].cnt) tr[u].len = ys[tr[u].r + 1] - ys[tr[u].l];
    else if (tr[u].l != tr[u].r) tr[u].len = tr[u << 1].len + tr[u << 1 | 1].len;
    else tr[u].len = 0;
}

void build(int u, int l, int r) {
    tr[u] = {l, r, 0, 0};
    if (l == r) return;
    int mid = l + r >> 1;
    build(u << 1, l, mid);
    build(u << 1 | 1, mid + 1, r);
}

void update(int u, int l, int r, int k) {
    if (tr[u].l >= l && tr[u].r <= r) {
        tr[u].cnt += k;
        pushup(u);
    } else {
        int mid = tr[u].l + tr[u].r >> 1;
        if (l <= mid) update(u << 1, l, r, k);
        if (r > mid) update(u << 1 | 1, l, r, k);
        pushup(u);
    }
}
```

</details>

### 例题 2：离散化优化与动态范围

<details>
<summary>Check Solution</summary>

**解析**：当坐标范围极大且包含浮点数时，**必须离散化**。线段树的叶子节点不再代表“点”，而是代表“区间” $[ys[i], ys[i+1]]$。因此 `build` 时范围为 `0` 到 `ys.size() - 2`。

</details>

---

## 5. 综合练习与解答

1. **[矩形周长并]** 统计所有矩形覆盖后的边界总长度。
<details>
<summary>Check Solution</summary>

**核心逻辑**：线段树维护 `len`（覆盖长度）、`num`（覆盖段数）、`lc/rc`（左右端点是否被覆盖）。
- 垂直边：$\sum |len_{new} - len_{old}|$。
- 水平边：$\sum 2 \cdot num \cdot (x_{i+1} - x_i)$。

</details>

2. **[覆盖 k 次的面积]** 查询至少被 $k$ 个矩形覆盖的区域面积。
<details>
<summary>Check Solution</summary>

**核心逻辑**：线段树节点维护 `len[0...k]`。
- `len[i]` 表示被覆盖至少 $i$ 次的长度。
- `pushup` 时根据 `cnt` 的值进行转移。

</details>

3. **[进阶] 三维扫描线：长方体体积并**
<details>
<summary>Check Solution</summary>

**策略**：将 $Z$ 坐标离散化，对每两个相邻 $Z$ 层执行一次二维面积并。
**优化**：如果矩形较多，可以使用**可持久化线段树**记录 $Y$ 轴信息，在 $X$ 轴移动时实现 $O(\log N)$ 更新。

</details>

---

_编者注：扫描线的威力在于它模糊了“几何”与“代数”的界限。通过对事件的偏序排列，我们成功地在流式数据中复现了积分的严密性。_
