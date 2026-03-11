---
title: 扫描线技巧 (Scanning Line)
sidebar_position: 9
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { MoveRight, LayoutTemplate, BoxSelect, Maximize, Activity, Calculator } from 'lucide-react';

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
- **Event (事件)**: 几何对象在扫描方向上的临界坐标（如矩形的左右边 $x_1, x_2$）。
- **Slice (切片)**: 两个相邻事件点之间的区间。在该区间内，扫描方向正交的拓扑结构保持恒定。

### 1.2 积分算子
设 $f(x)$ 为扫描线在坐标 $x$ 处的截面测度（如被覆盖的线段长度）。几何对象的测度（如面积）定义为：
$$ \text{Measure} = \int_{x_{min}}^{x_{max}} f(x) dx = \sum_{i=1}^{m-1} f(x_i^+) \cdot (x_{i+1} - x_i) $$
其中 $x_i, x_{i+1}$ 是相邻事件点。

---

## 2. 复杂度分析与数据完整性证明

### 2.1 复杂度证明
**定理**：对于 $N$ 个矩形的面积并，扫描线算法的时间复杂度为 $O(N \log N)$。
**证明**：
1. **排序**: 事件点数量为 $2N$，排序代价 $O(N \log N)$。
2. **离散化**: 纵坐标去重排序代价 $O(N \log N)$。
3. **线段树操作**: 共 $2N$ 次 `update` 操作，每次 $O(\log N)$。
总复杂度 $O(N \log N)$。空间复杂度主要取决于线段树和离散化数组，为 $O(N)$。

### 2.2 数据完整性：标记永久化合法性
**命题**：在矩形面积并中，不带 `push_down` 的线段树维护 `cnt` 是正确的。
**证明**：
矩形边界总是成对出现的入边 (+1) 和出边 (-1)。
由于任一子区间的 `cnt` 只会在其完全包含的修改中增减，且入边一定早于出边被处理，因此 `cnt` 始终非负。
当 `cnt[u] > 0` 时，该区间被完全覆盖；当 `cnt[u] == 0` 时，长度由子节点决定。
这一“自下而上”的逻辑完美闭环，无需下传标记，避免了不必要的常数开销。

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
// update 操作中仅修改 tr[u].cnt，随后调用 pushup
```
</details>

### 例题 2：矩形周长并 (Picture)
<details>
<summary>Check Solution</summary>

**解析**：需要维护 `num`（独立段数）以计算横向边，以及 `len` 的变化量以计算纵向边。

```cpp
struct Node {
    int l, r, cnt, len, num;
    bool lc, rc; // 左右端点是否被覆盖
} tr[N << 3];
// pushup 中：num[u] = num[ls] + num[rs] - (rc[ls] && lc[rs])
```
</details>

---

## 5. 综合练习与解答

1. **[窗口最大化]** $N$ 个点 $(x_i, y_i, w_i)$，求固定 $W \times H$ 矩形最大覆盖点权。
<details>
<summary>Check Solution</summary>

**核心逻辑**：将每个点扩展为 $W \times H$ 的矩形，问题转化为求平面上一点被矩形覆盖的最大权值。使用扫描线维护区间最大值线段树。
```cpp
// 事件点：点 x_i 对应区间 [x_i, x_i+W] 的入边和出边
// 线段树：维护 y 轴区间 [y_i, y_i+H] 的增加权值 w_i
// 答案：线段树全局最大值 tr[1].max
```
</details>

2. **[面积交 (k次覆盖)]** 维护被覆盖至少 2 次的区间长度。
<details>
<summary>Check Solution</summary>

**核心逻辑**：修改 `pushup`。
- 若 `cnt >= 2`: `len2 = ys[r+1] - ys[l]`
- 若 `cnt == 1`: `len2 = (l==r ? 0 : len1[ls] + len1[rs])`
- 若 `cnt == 0`: `len2 = (l==r ? 0 : len2[ls] + len2[rs])`
</details>

3. **[进阶] 三维扫描线**：计算长方体并体积。
<details>
<summary>Check Solution</summary>

**核心逻辑**：对 $z$ 轴进行扫描，切片变为二维矩形面积并问题。复杂度 $O(N^2 \log N)$ 或使用动态开点/持久化优化。
</details>

---

_编者注：扫描线的威力在于它模糊了“几何”与“代数”的界限。通过对事件的偏序排列，我们成功地在流式数据中复现了积分的严密性。_
