---
title: 排序算法 (Sorting Algorithms)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 排序算法 (Sorting Algorithms)

排序不仅是算法的入门基石，更是深刻理解**分治 (Divide & Conquer)** 思想的最佳途径。在竞赛中，虽然 `std::sort` ($O(n \log n)$) 能解决 99% 的问题，但掌握经典算法的内部逻辑对于变体问题的求解（如逆序对、第 K 大数、外部排序）至关重要。

---

## 一、核心排序算法：分治的两副面孔

### 1. 快速排序 (Quick Sort) —— “分”重于“合”
**核心思想**：选取一个基准值 (Pivot)，通过一趟排序将待排记录分割成独立的两部分。

1. **确定分界点** `x`（取中点、随机或首尾）。
2. **调整区间 (Partition)**：使得左区间 $\le x$，右区间 $\ge x$。
3. **递归处理**：分别对左右子区间进行快速排序。

<details>
<summary>点击查看标准 C++ 模板</summary>

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
</details>

### 2. 归并排序 (Merge Sort) —— “合”重于“分”
**核心思想**：将已有序的子序列合并，得到完全有序的序列。

1. **确定中点** `mid = (l + r) / 2`。
2. **递归排序**：分别处理 `[l, mid]` 和 `[mid + 1, r]`。
3. **归并 (Merge)**：用双指针将两个有序子序列合并。

<details>
<summary>点击查看标准 C++ 模板</summary>

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

    for (i = l, j = 0; i <= r; i++, j++) q[i] = tmp[j];
}
```
</details>

---

## 二、稳定性与复杂度对比

| 算法 | 平均复杂度 | 最坏复杂度 | 空间复杂度 | 稳定性 |
| :--- | :--- | :--- | :--- | :--- |
| **快速排序** | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | 不稳定 |
| **归并排序** | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | 稳定 |
| **堆排序** | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | 不稳定 |

---

## 三、教材化例题

### 例题 1：逆序对的数量 (归并排序应用)
给定长度为 $n$ 的数列，求逆序对 $(i, j)$ 的个数，满足 $i < j$ 且 $a[i] > a[j]$。

<details>
<summary>点击查看解析与代码</summary>

**解析**：
利用归并排序的合并步骤。在合并 `[l, mid]` 和 `[mid + 1, r]` 时，若左侧元素 $q[i] > q[j]$，由于左侧已排好序，则 $q[i \dots mid]$ 全都大于 $q[j]$。
贡献的逆序对数为：$mid - i + 1$。

**代码实现**：
```cpp
#include <iostream>
using namespace std;

typedef long long LL;
const int N = 100010;
int n, q[N], tmp[N];

LL merge_sort(int l, int r) {
    if (l >= r) return 0;
    int mid = l + r >> 1;
    LL res = merge_sort(l, mid) + merge_sort(mid + 1, r);

    int k = 0, i = l, j = mid + 1;
    while (i <= mid && j <= r) {
        if (q[i] <= q[j]) tmp[k++] = q[i++];
        else {
            res += mid - i + 1; // 核心逻辑
            tmp[k++] = q[j++];
        }
    }
    while (i <= mid) tmp[k++] = q[i++];
    while (j <= r) tmp[k++] = q[j++];
    for (i = l, j = 0; i <= r; i++, j++) q[i] = tmp[j];
    return res;
}

int main() {
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &q[i]);
    printf("%lld\n", merge_sort(0, n - 1));
    return 0;
}
```
</details>

### 例题 2：第 K 个数 (快速选择算法)
在 $O(n)$ 的时间复杂度内找到数列中排名第 $k$ 小的数。

<details>
<summary>点击查看解析与代码</summary>

**解析**：
利用快排 Partition。划分后，左半部分长度为 `sl = j - l + 1`。
- 若 $k \le sl$，则第 $k$ 小数一定在左半部分。
- 若 $k > sl$，则第 $k$ 小数一定在右半部分，且是右半部分的第 $k - sl$ 小数。

**代码实现**：
```cpp
#include <iostream>
using namespace std;

const int N = 100010;
int q[N], n, k;

int quick_select(int l, int r, int k) {
    if (l == r) return q[l];
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

int main() {
    scanf("%d %d", &n, &k);
    for (int i = 0; i < n; i++) scanf("%d", &q[i]);
    printf("%d\n", quick_select(0, n - 1, k));
    return 0;
}
```
</details>

---

## 四、练习与挑战

- **练习 1**：[基础] 给定 $n$ 个整数，输出升序排列后的结果。
- **练习 2**：[进阶] 利用堆排序实现相同功能。
- **练习 3**：[思想] 思考如何使用排序思想处理“区间合并”问题。

---

_编者注：排序不仅是为了有序，更是分治思想的第一次实战。归并排序的“合并”与快速排序的“划分”是算法世界中永恒的交响。_
