---
title: 排序算法与分治逻辑 (Sorting & Divide)
sidebar_position: 4
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Shuffle, GitBranch, Target, Zap, BarChart } from 'lucide-react';

# 排序算法与分治逻辑 (Sorting & Divide)

排序算法不仅是计算机科学的入门基石，更是深刻理解**分治 (Divide & Conquer)** 思想的最佳途径。它代表了将杂乱的数据转化为有序结构的物理过程。

---

## 一、 快速排序 (Quick Sort) —— “分”重于“合”

**核心思想**：选取基准值 (Pivot)，通过 Partition 过程将区间划分为不相交的两部分，使得左区间所有元素均不大于右区间。

### 1. 算法逻辑
1. **确定分界点** $x$（通常取中点、随机点或三数取中）。
2. **调整区间 (Partition)**：使得左区间 $\le x$，右区间 $\ge x$。
3. **递归处理**：分别对左右子区间排序。

### 2. 性能分析 (Complexity)
- **时间复杂度**：平均 $O(n \log n)$，最坏情况（已排序或逆序且基准值选端点）为 $O(n^2)$。
- **空间复杂度**：$O(\log n)$（递归调用栈）。
- **稳定性**：❌ 不稳定。

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

**核心思想**：利用分治策略，先递归使子序列有序，再通过线性时间复杂度合并两个有序序列。

### 1. 算法逻辑
1. **确定中点** $mid = \lfloor (l + r) / 2 \rfloor$。
2. **递归排序**：分别处理 $[l, mid]$ 和 $[mid + 1, r]$。
3. **归并 (Merge)**：使用双指针线性合并两个有序子序列到辅助数组 `tmp` 中。

### 2. 性能分析 (Complexity)
- **时间复杂度**：严格 $O(n \log n)$，不随初始数据分布改变。
- **空间复杂度**：$O(n)$（辅助数组）。
- **稳定性**：✅ 稳定。

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

## 三、 排序算法全景对比

| 算法 | 平均时间 | 最坏时间 | 空间 | 稳定性 | 备注 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **快速排序** | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | ❌ | 工业界最常用，常数项小 |
| **归并排序** | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | ✅ | 适用于大数据排序及外部排序 |
| **堆排序** | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | ❌ | 适用于 Top-K 问题 |
| **插入排序** | $O(n^2)$ | $O(n^2)$ | $O(1)$ | ✅ | 数据量小时极快 |

---

## 四、 综合练习库

### 练习 1：逆序对统计
给定序列 $A$，求满足 $i < j$ 且 $A_i > A_j$ 的对数。
<details>
<summary>Check Solution</summary>

**分治思路**：
在归并排序的合并阶段，当 $A_i > A_j$ 时，意味着左子序列中 $i$ 及其之后的所有元素都与 $A_j$ 构成逆序对。增加贡献 $mid - i + 1$。

```cpp
long long res = merge_sort(l, mid) + merge_sort(mid + 1, r);
// 合并逻辑中
if (q[i] <= q[j]) tmp[k++] = q[i++];
else { tmp[k++] = q[j++]; res += mid - i + 1; }
```
</details>

### 练习 2：第 K 个数 (Quick Select)
在 $O(n)$ 平均时间复杂度内寻找序列中第 $k$ 小的数。
<details>
<summary>Check Solution</summary>

**优化思路**：
在快速排序的 Partition 之后，判断第 $k$ 小的数所在的子区间。若左半部分长度 $\ge k$，则只递归左半部分；否则递归右半部分，查询第 $k - sl$ 小的数。

```cpp
int sl = j - l + 1;
if (k <= sl) return quick_select(l, j, k);
return quick_select(j + 1, r, k - sl);
```
</details>

---

_编者注：排序不仅是为了有序，更是为了将杂乱的线性空间转化为有序的搜索空间。它是二分、贪心等算法的前置条件。_
