---
title: 排序算法与分治逻辑 (Sorting & Divide)
sidebar_position: 4
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Shuffle, GitBranch, Target, Zap, BarChart, Binary, Scale } from 'lucide-react';

# 排序算法与分治逻辑 (Sorting & Divide)

排序算法不仅是计算机科学的入门基石，更是深刻理解**分治 (Divide & Conquer)** 思想的最佳途径。它代表了将杂乱的数据转化为有序结构的物理过程。

---

## 一、 快速排序 (Quick Sort) —— “分”重于“合”

**核心思想**：选取基准值 (Pivot)，通过 Partition 过程将区间划分为不相交的两部分，使得左区间所有元素均不大于右区间。

### 1. 算法逻辑
1. **确定分界点** $x$。
2. **调整区间 (Partition)**：使得左区间 $\le x$，右区间 $\ge x$。
3. **递归处理**：分别对左右子区间排序。

### 2. 性能分析与主定理应用
- **递推式**：$T(n) = 2T(n/2) + O(n)$ (理想情况)。
- **复杂度**：平均 $O(n \log n)$。若基准值始终选取最大/最小值，退化为 $O(n^2)$。
- **空间复杂度**：$O(\log n)$ (递归栈深度)。

```cpp
void quick_sort(int q[], int l, int r) {
    if (l >= r) return;
    int x = q[l + r >> 1], i = l - 1, j = r + 1;
    while (i < j) {
        do i++; while (q[i] < x);
        do j--; while (q[j] > x);
        if (i < j) swap(q[i], q[j]);
    }
    quick_sort(q, l, j);
    quick_sort(q, j + 1, r);
}
```

---

## 二、 归并排序 (Merge Sort) —— “合”重于“分”

**核心思想**：先递归使子序列有序，再通过线性时间复杂度合并两个有序序列。

### 1. 算法逻辑与稳定性证明
1. **分解**：取 $mid = \lfloor (l + r) / 2 \rfloor$。
2. **治理**：递归排序 $[l, mid]$ 和 $[mid + 1, r]$。
3. **合并**：使用双指针 $O(n)$ 合并。

**稳定性**：由于在 `q[i] <= q[j]` 时优先选择左侧元素，相同元素的相对位置得以保持。

### 2. 时空开销分析
- **时间**：严格 $O(n \log n)$，不受数据分布影响。
- **空间**：$O(n)$，需要额外的辅助数组。

```cpp
void merge_sort(int q[], int l, int r) {
    if (l >= r) return;
    int mid = l + r >> 1;
    merge_sort(q, l, mid); merge_sort(q, mid + 1, r);
    int k = 0, i = l, j = mid + 1;
    while (i <= mid && j <= r)
        if (q[i] <= q[j]) tmp[k++] = q[i++];
        else tmp[k++] = q[j++];
    while (i <= mid) tmp[k++] = q[i++];
    while (j <= r) tmp[k++] = q[j++];
    for (int i = l, j = 0; i <= r; i++, j++) q[i] = tmp[j];
}
```

---

## 三、 数学底层：比较类排序的下界证明

**定理**：任何基于比较的排序算法，在最坏情况下的时间复杂度至少为 $\Omega(n \log n)$。

**证明 (决策树模型)**：
1. 一个包含 $n$ 个元素的序列有 $n!$ 种可能的排列。
2. 排序的过程可以看作在决策树中从根节点到达某个叶节点的过程。
3. 决策树必须至少有 $n!$ 个叶节点才能区分所有排列。
4. 设树高为 $h$，叶节点数 $L \le 2^h$。
5. 故 $2^h \ge n! \implies h \ge \log(n!) \approx n \log n - n \log e$ (斯特林公式)。
6. 结论：最坏情况下的比较次数为 $\Omega(n \log n)$。

---

## 四、 综合练习库

### 练习 1：逆序对统计
给定序列 $A$，求满足 $i < j$ 且 $A_i > A_j$ 的对数。
<details>
<summary>Check Solution</summary>

**分治推导**：
在归并排序的合并阶段，当 `q[i] > q[j]` 时，由于左半部分有序，`q[i...mid]` 全都大于 `q[j]`。贡献值为 `mid - i + 1`。

```cpp
long long merge_sort(int l, int r) {
    if (l >= r) return 0;
    int mid = l + r >> 1;
    long long res = merge_sort(l, mid) + merge_sort(mid + 1, r);
    int k = 0, i = l, j = mid + 1;
    while (i <= mid && j <= r)
        if (q[i] <= q[j]) tmp[k++] = q[i++];
        else { tmp[k++] = q[j++]; res += mid - i + 1; }
    // ... 剩余收尾逻辑
    return res;
}
```
</details>

### 练习 2：快速选择 (Quick Select)
在 $O(n)$ 期望时间内寻找第 $k$ 小的数。
<details>
<summary>Check Solution</summary>

**复杂度证明**：
递推式：$T(n) = T(n/2) + O(n)$。
根据主定理或等比级数：$n + n/2 + n/4 + \dots \le 2n = O(n)$。

```cpp
int quick_select(int l, int r, int k) {
    if (l >= r) return q[l];
    int x = q[l + r >> 1], i = l - 1, j = r + 1;
    while (i < j) {
        do i++; while (q[i] < x);
        do j--; while (q[j] > x);
        if (i < j) swap(q[i], q[j]);
    }
    int sl = j - l + 1;
    if (k <= sl) return quick_select(l, j, k);
    return quick_select(j + 1, r, k - sl);
}
```
</details>

### 练习 3：堆排序实现
使用大根堆实现升序排序。
<details>
<summary>Check Solution</summary>

**逻辑**：
1. 构建大根堆 ($O(n)$)。
2. 交换堆顶与末尾，收缩堆范围并向下调整 ($O(n \log n)$)。

```cpp
void down(int u, int size) {
    int t = u;
    if (u * 2 <= size && h[u * 2] > h[t]) t = u * 2;
    if (u * 2 + 1 <= size && h[u * 2 + 1] > h[t]) t = u * 2 + 1;
    if (u != t) { swap(h[u], h[t]); down(t, size); }
}
```
</details>

---

_编者注：掌握排序不仅是为了调用 `std::sort`，更是为了在分治的过程中嵌入自定义的统计逻辑（如逆序对、二维偏序等）。_
