---
title: 排序优化与稳定性分析 (Sorting & Stability)
sidebar_position: 7
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { ArrowDownAZ, ListOrdered, Shuffle, Layers, ShieldCheck, Zap, Scale } from 'lucide-react';

# 排序优化与稳定性分析 (Sorting & Stability)

<KnowledgeCard 
  title="排序论基础" 
  icon={ArrowDownAZ}
  color="#3b82f6"
>
  排序是将一组无序数据转换为有序全序集的过程。本章重点探讨**比较排序的理论下界**、**排序算法的稳定性**及其在工业场景下的**混合优化 (Hybrid Sort)**。
</KnowledgeCard>

---

## 一 : 比较排序的理论下界证明

对于基于比较的排序算法，寻找 $N$ 个元素的全排列需要区分 $N!$ 种可能的排列情况。

### 1. 决策树模型 (Decision Tree Model)
在基于比较的排序中，每一次比较 $(a_i < a_j)$ 都会将当前可能的排列状态空间一分为二。
- 设决策树的高度为 $h$。
- 叶子节点数必须能够覆盖所有 $N!$ 种排列。
- 则有关系：$2^h \ge N!$。

### 2. 渐进下界推导
根据斯特林公式 (Stirling's approximation)：
$$ \ln(N!) \approx N \ln N - N $$
$$ h \ge \log_2(N!) \approx N \log_2 N - N \log_2 e $$
$$ h = \Omega(N \log N) $$
**结论**：在最坏情况下，任何基于比较的排序算法至少需要 $\Omega(N \log N)$ 次比较。

---

## 二 : 核心排序算法深度分析

| 算法 | 平均时间 | 最坏时间 | 空间 | 稳定性 | 核心思想 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **快速排序** | $\Theta(N \log N)$ | $O(N^2)$ | $O(\log N)$ | 不稳定 | 基于 Pivot 的分治，缓存友好 |
| **归并排序** | $\Theta(N \log N)$ | $\Theta(N \log N)$ | $O(N)$ | **稳定** | 外部排序基石，满足严格有序性 |
| **堆排序** | $\Theta(N \log N)$ | $\Theta(N \log N)$ | $O(1)$ | 不稳定 | 利用完全二叉树的选择排序 |
| **基数排序** | $O(D(N+R))$ | $O(D(N+R))$ | $O(N+R)$ | **稳定** | 非比较排序，桶思想的位维度扩展 |

---

## 三 : 稳定性与工业级混合优化

### 1. 稳定性 (Stability) 的数学意义
若 $a_i = a_j$ 且在原序列中下标 $i < j$，排序后 $a_i$ 依然排在 $a_j$ 之前。
- **应用场景**：在处理对象数组（如 SQL 的 `ORDER BY`）时，稳定性允许我们在不破坏前序排序结果的前提下，按新关键字进行二次排序。

### 2. 工业级优化：IntroSort 与 Timsort
- **IntroSort (C++ STL)**：开始使用快速排序，当递归深度超过 $\log N$ 时切换为堆排序（保证最坏 $O(N \log N)$），小区间切换为插入排序。
- **Timsort (Python/Java)**：结合了归并排序和插入排序，专门针对现实世界中存在的“有序子段 (Runs)”进行优化。

---

## 四 : 教材化例题

### 例题 1：快速选择算法 (Quick Select)
在 $O(N)$ 期望时间内找到序列中第 $K$ 小的元素。

<details>
<summary>期望复杂度证明</summary>

**分治决策**：
与快排不同，快速选择只需进入一边递归。
$$ E[T(N)] = E[T(N/2)] + O(N) $$
根据主定理或级数求和：
$$ N + \frac{N}{2} + \frac{N}{4} + \dots + 1 = 2N = \Theta(N) $$

```cpp
#include <iostream>
using namespace std;

int q[100010];

int quick_sort(int l, int r, int k) {
    if (l >= r) return q[l];
    int i = l - 1, j = r + 1, x = q[l + r >> 1];
    while (i < j) {
        do i++; while (q[i] < x);
        do j--; while (q[j] > x);
        if (i < j) swap(q[i], q[j]);
    }
    int sl = j - l + 1;
    if (k <= sl) return quick_sort(l, j, k);
    return quick_sort(j + 1, r, k - sl);
}
```
</details>

### 例题 2：归并排序求逆序对 (Inversion Pair)
求序列中满足 $i < j$ 且 $a_i > a_j$ 的对数。

<details>
<summary>Check Solution</summary>

**逻辑推导**：
在归并过程中，若左子序列当前元素 $a_i$ 大于右子序列当前元素 $a_j$，则 $a_i$ 及其后的所有元素（至 $mid$）均与 $a_j$ 构成逆序对。
数量增加：`mid - i + 1`。

```cpp
long long merge_sort(int l, int r) {
    if (l >= r) return 0;
    int mid = l + r >> 1;
    long long res = merge_sort(l, mid) + merge_sort(mid + 1, r);
    int k = 0, i = l, j = mid + 1;
    while (i <= mid && j <= r) {
        if (q[i] <= q[j]) tmp[k++] = q[i++];
        else {
            res += mid - i + 1;
            tmp[k++] = q[j++];
        }
    }
    while (i <= mid) tmp[k++] = q[i++];
    while (j <= r) tmp[k++] = q[j++];
    for (int i = l, j = 0; i <= r; i++, j++) q[i] = tmp[j];
    return res;
}
```
</details>

---

## 五 : 综合练习库

### 练习 1：离散化映射 (Discretization)
处理坐标范围极大但点数有限的问题。

<details>
<summary>Check Solution</summary>

```cpp
vector<int> alls; // 存储所有待离散化的值
sort(alls.begin(), alls.end());
alls.erase(unique(alls.begin(), alls.end()), alls.end()); // 去重

// 二分查找映射后的值
int find(int x) {
    return lower_bound(alls.begin(), alls.end(), x) - alls.begin() + 1;
}
```
</details>

---

_编者注：排序不仅是改变数据的顺序，它是“有序性”这一强力约束的构建过程。许多复杂的几何或图论算法，都始于一次排序。_
