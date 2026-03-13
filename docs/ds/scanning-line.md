---
title: 扫描线技巧 (Scanning Line)
sidebar_position: 9
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { MoveRight, LayoutTemplate, BoxSelect, Maximize, Activity, Calculator, MousePointer2 } from 'lucide-react';

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

- **Event (事件)**: 几何对象在扫描方向上的临界坐标。
- **Slice (切片)**: 两个相邻事件点之间的区间。在该区间内，扫描方向正交的拓扑结构保持恒定。

### 1.2 离散积分算子

几何对象的测度（如面积）定义为：
$$ \text{Measure} = \int_{x_{min}}^{x_{max}} f(x) dx = \sum_{i=1}^{m-1} \text{Query}(\mathcal{T}, x_i, x_{i+1}) \cdot (x_{i+1} - x_i) $$
其中 $\mathcal{T}$ 为维护截面信息的线段树。

---

## 2. 复杂度分析与数据完整性证明

### 2.1 复杂度证明

**定理**：对于 $N$ 个矩形的面积并，扫描线算法的时间复杂度为 $O(N \log N)$。
**证明**：
1. **排序**: 事件点 $2N$，代价 $O(N \log N)$。
2. **离散化**: 纵坐标去重，代价 $O(N \log N)$。
3. **线段树操作**: $2N$ 次 `update`，每次 $O(\log N)$。
总复杂度 $O(N \log N)$，空间复杂度 $O(N)$。

### 2.2 数据完整性：标记永久化合法性

**命题**：在矩形面积并中，不带 `push_down` 的线段树维护 `cnt` 是正确的。
**证明**：
由于矩形边界总是成对出现（+1 入边，-1 出边），且任一子区间的 `cnt` 只会在其完全包含的修改中增减，因此 `cnt` 始终非负。
当 `cnt[u] > 0` 时，该区间被完全覆盖；当 `cnt[u] == 0` 时，长度由子节点决定。这一“自下而上”的逻辑避免了标记传播的开销，确保了 $O(1)$ 的 `push_up`。

---

## 3. 高维扩展：三维扫描线

对于长方体并体积计算，将 $z$ 轴作为扫描维度。
1. 将所有长方体的 $z$ 轴坐标作为事件点排序。
2. 两个相邻 $z$ 事件点之间的切片是一个“厚度”固定的二维面积并问题。
3. 复杂度：$O(N^2 \log N)$。若使用**可持久化线段树**或**分块优化**，可进一步优化特定查询。

---

## 4. 教材化例题与解析

### 例题 1：矩形面积并 (Atlantis)

<details>
<summary>Check Solution (C++ 实现)</summary>

```cpp
void pushup(int u) {
    if (tr[u].cnt) tr[u].len = ys[tr[u].r + 1] - ys[tr[u].l];
    else if (tr[u].l != tr[u].r) tr[u].len = tr[u << 1].len + tr[u << 1 | 1].len;
    else tr[u].len = 0;
}
```

</details>

### 例题 2：矩形周长并 (Picture)

<details>
<summary>Check Solution</summary>

**解析**：需要维护 `num`（独立段数）以计算横向边，以及 `len` 的变化量。

```cpp
struct Node {
    int l, r, cnt, len, num;
    bool lc, rc; 
} tr[N << 3];
void pushup(int u) {
    if (tr[u].cnt) {
        tr[u].len = ys[tr[u].r + 1] - ys[tr[u].l];
        tr[u].num = 1; tr[u].lc = tr[u].rc = 1;
    } else if (tr[u].l != tr[u].r) {
        tr[u].len = tr[u << 1].len + tr[u << 1 | 1].len;
        tr[u].num = tr[u << 1].num + tr[u << 1 | 1].num - (tr[u << 1].rc && tr[u << 1 | 1].lc);
        tr[u].lc = tr[u << 1].lc; tr[u].rc = tr[u << 1 | 1].rc;
    } else {
        tr[u].len = tr[u].num = tr[u].lc = tr[u].rc = 0;
    }
}
```

</details>

---

## 5. 综合练习与解答

1. **[窗口最大化]** $N$ 个点 $(x_i, y_i, w_i)$，求固定 $W \times H$ 矩形最大覆盖点权。
<details>
<summary>Check Solution</summary>

**核心逻辑**：将每个点扩展为 $W \times H$ 的矩形，转化为求平面上一点被矩形覆盖的最大权值。线段树维护区间最大值。

</details>

2. **[面积交 (至少覆盖 k 次)]** 维护被覆盖至少 $k$ 次的区间长度。
<details>
<summary>Check Solution</summary>

**核心逻辑**：修改 `pushup`。记录 `len[0...k]`，其中 `len[i]` 表示被覆盖至少 $i$ 次的长度。

</details>

3. **[进阶] 动态扫描线**：支持矩形动态插入与删除，实时查询总面积。
<details>
<summary>Check Solution</summary>

**核心思想**：使用**动态开点线段树**配合**标记永久化**。或者将时间作为第三维，转化为三维扫描线问题。

</details>

---

_编者注：扫描线的威力在于它模糊了“几何”与“代数”的界限。通过对事件的偏序排列，我们成功地在流式数据中复现了积分的严密性。_
