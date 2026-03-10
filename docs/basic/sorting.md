---
title: 排序算法与分治逻辑 (Sorting & Divide)
sidebar_position: 4
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Shuffle, GitBranch, Target, Zap } from 'lucide-react';

# 排序算法与分治逻辑 (Sorting & Divide)

排序不仅是算法的入门基石，更是深刻理解**分治 (Divide & Conquer)** 思想的最佳途径。

---

## 一、 快速排序 (Quick Sort) —— “分”重于“合”

**核心思想**：选取基准值 (Pivot)，通过 Partition 过程将区间划分为不相交的两部分。

### 1. 算法逻辑
1. **确定分界点** $x$。
2. **调整区间**：使得左区间 $\le x$，右区间 $\ge x$。
3. **递归处理**：分别对左右子区间排序。

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

**核心思想**：先递归使子序列有序，再通过线性合并得到全局有序。

### 1. 算法逻辑
1. **确定中点** $mid = \lfloor (l + r) / 2 \rfloor$。
2. **递归排序**：分别处理 $[l, mid]$ 和 $[mid + 1, r]$。
3. **归并 (Merge)**：用双指针线性合并有序子序列。

```cpp
void merge_sort(int q[], int l, int r) {
    if (l >= r) return;
    int mid = l + r >> 1;
    merge_sort(q, l, mid);
    merge_sort(q, mid + 1, r);

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

## 三、 稳定性与性能对比

| 算法 | 平均复杂度 | 最坏复杂度 | 空间复杂度 | 稳定性 |
| :--- | :--- | :--- | :--- | :--- |
| **快速排序** | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | ❌ 不稳定 |
| **归并排序** | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | ✅ 稳定 |
| **堆排序** | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | ❌ 不稳定 |

<KnowledgeCard type="tip" title="STL 选择">
在 C++ 中，`std::sort` 通常采用 Introsort（内省排序），它综合了快排、堆排和插入排序，在最坏情况下仍能保持 $O(n \log n)$。
</KnowledgeCard>

---

## 四 : 综合练习库

### 练习 1：逆序对的数量
求序列中满足 $i < j$ 且 $a[i] > a[j]$ 的对数。
<details>
<summary>Check Solution</summary>

在归并排序的合并阶段，若 $q[i] > q[j]$，则贡献为 $mid - i + 1$。
</details>

### 练习 2：第 K 个数
在 $O(n)$ 内找到第 $k$ 小的数。
<details>
<summary>Check Solution</summary>

利用快排 Partition 的结果，根据左子段长度 $sl$ 判断下一步搜索方向。
</details>

---

_编者注：排序不仅是为了有序，更是为了将杂乱的线性空间转化为有序的搜索空间。它是二分、贪心等算法的前置条件。_
