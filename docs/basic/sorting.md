---
title: 排序优化与稳定性分析 (Sorting & Stability)
sidebar_position: 7
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { ArrowDownAZ, ListOrdered, Shuffle, Layers, ShieldCheck, Zap } from 'lucide-react';

# 排序优化与稳定性分析 (Sorting & Stability)

排序是将一组无序数据转换为有序全序集的过程。本章重点探讨**比较排序的理论下界**、**排序算法的稳定性**及其在工业场景下的**混合优化**。

---

## 一 : 比较排序的理论下界

对于基于比较的排序算法，寻找 $N$ 个元素的全排列需要区分 $N!$ 种可能。

**证明**：
决策树的叶子节点至少有 $N!$ 个。
二叉决策树的高度 $h$ 满足 $2^h \ge N!$。
根据斯特林公式 $\log(N!) \approx N \log N - N$，
$$ h \ge \log(N!) \approx \Omega(N \log N) $$
故比较排序的时间复杂度下界为 $\Omega(N \log N)$。

---

## 二 : 核心排序算法全景

| 算法         | 平均时间      | 最坏时间      | 空间        | 稳定性   | 备注                  |
| :----------- | :------------ | :------------ | :---------- | :------- | :-------------------- |
| **快速排序** | $O(N \log N)$ | $O(N^2)$      | $O(\log N)$ | 不稳定   | 缓存友好，工业级首选  |
| **归并排序** | $O(N \log N)$ | $O(N \log N)$ | $O(N)$      | **稳定** | 适合外部排序/链表排序 |
| **堆排序**   | $O(N \log N)$ | $O(N \log N)$ | $O(1)$      | 不稳定   | 严格空间限制时使用    |
| **计数排序** | $O(N+K)$      | $O(N+K)$      | $O(K)$      | **稳定** | 非比较，依赖数据范围  |

---

## 三 : 稳定性与工程优化

### 1. 稳定性定义 (Stability)

若 $a_i = a_j$ 且在原序列中 $i < j$，排序后 $a_i$ 依然排在 $a_j$ 之前，则称该算法是稳定的。
**应用场景**：多关键字排序（如先按成绩排，成绩相同按姓名排）。

### 2. 快速排序的工程优化

- **基准值选择**: 三数取中 (Median-of-three) 避免 $O(N^2)$ 陷阱。
- **混合排序**: 在子区间较小（如 $N \le 16$）时切换为**插入排序**（常数项更小）。

---

## 四 : 教材化例题

### 例题 1：第 K 个数 (快速选择算法)

在 $O(N)$ 时间内找到序列中第 $K$ 小的元素。

<details>
<summary>证明与推导</summary>

**分治决策**：
利用快速排序的 Partition 过程。

1. 选取基准值 $x$，划分区间为 $[L, mid]$ 和 $[mid+1, R]$。
2. 计算左区间元素个数 $cnt$。
3. 若 $K \le cnt$，则答案在左区间。
4. 否则，在右区间寻找第 $K-cnt$ 个数。

**期望复杂度 $O(N)$ 证明**：
$$ T(N) \le T(N/2) + O(N) \implies T(N) \approx N + N/2 + N/4 + \dots = 2N = O(N) $$

```cpp
int quick_select(int l, int r, int k) {
    if (l == r) return a[l];
    int x = a[l + r >> 1], i = l - 1, j = r + 1;
    while (i < j) {
        do i++; while (a[i] < x);
        do j--; while (a[j] > x);
        if (i < j) swap(a[i], a[j]);
    }
    int cnt = j - l + 1;
    if (k <= cnt) return quick_select(l, j, k);
    return quick_select(j + 1, r, k - cnt);
}
```

</details>

---

## 五 : 综合练习库

### 练习 1：离散化 (Discretization)

当坐标范围很大（如 $10^9$）但点数很少（如 $10^5$）时，如何将其映射到连续区间？

<details>
<summary>Check Solution</summary>

**步骤**：

1. `sort` 全量点。
2. `unique` 去重。
3. `lower_bound` 寻找映射后的位置。

```cpp
sort(alls.begin(), alls.end());
alls.erase(unique(alls.begin(), alls.end()), alls.end());

int find(int x) {
    return lower_bound(alls.begin(), alls.end(), x) - alls.begin() + 1;
}
```

</details>

### 练习 2：外部排序 (External Sort)

给定 100GB 数据，内存仅 1GB，如何排序？

<details>
<summary>Check Solution</summary>

**策略**：

1. **分块排序**: 读入 1GB，排序后存为临时文件。
2. **多路归并**: 维护一个 100 路的最小堆，每次弹出最小元素。

</details>

---

_编者注：排序不仅是改变数据的顺序，它是“有序性”这一强力约束的构建过程。许多复杂的几何或图论算法，都始于一次排序。_
