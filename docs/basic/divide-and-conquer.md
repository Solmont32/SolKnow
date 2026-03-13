---
title: 分治理论与复杂度收敛 (Divide and Conquer)
sidebar_position: 8
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { GitBranch, GitMerge, Calculator, Terminal, Box, Binary, Network, Zap } from 'lucide-react';

# 分治理论与复杂度收敛 (Divide and Conquer)

分治算法的本质是**化归 (Reduction)**。它将一个规模为 $n$ 的大问题分解为若干个规模较小且**结构相同**的子问题，递归求解后再合并子问题的解。

---

## 一 : 形式化描述与三部曲

1.  **分解 (Divide)**：将原问题 $P(n)$ 划分为 $a$ 个规模为 $n/b$ 的子问题。
2.  **治理 (Conquer)**：递归求解子问题。若规模足够小则直接求解（Base Case）。
3.  **合并 (Combine)**：将子问题的解融合成原问题的解。

---

## 二 : 复杂度分析：减小系数 $a$ 的艺术

分治算法的性能提升往往源于减少递归分支数 $a$。

<KnowledgeCard type="info" title="典型案例：Karatsuba 乘法">
普通 $n$ 位大整数乘法需 4 次 $n/2$ 位乘法，$T(n) = 4T(n/2) + O(n) = O(n^2)$。
Karatsuba 利用 $(ax+b)(cx+d) = acx^2 + ((a+b)(c+d)-ac-bd)x + bd$，仅需 3 次乘法。
$T(n) = 3T(n/2) + O(n) = O(n^{\log_2 3}) \approx O(n^{1.58})$。
</KnowledgeCard>

---

## 三 : 空间复杂度收敛分析 (Space Convergence)

分治算法的空间复杂度主要由**递归栈深度**与**各层临时辅助空间**决定。

### 1. 递归栈空间 (Implicit Stack)
$$ S_{stack} = O(\text{Recursion Depth}) $$
对于平衡分治（$b=2$），深度为 $O(\log n)$。

### 2. 辅助空间复用 (Auxiliary Space)
- **不可复用**：若每层合并都需要开辟新空间且在递归返回前不释放，总空间为 $\sum a^i f_{space}(n/b^i)$。
- **可复用**：若辅助空间在递归返回后立即释放，则总空间为 $O(n)$（归并排序的典型特征）。

---

## 四 : 教材化例题

### 例题 1：最近点对问题 (平面分治)
在 $O(n \log n)$ 内寻找平面上距离最近的两点。

<details>
<summary>证明与解析</summary>

**分治决策**：
1. 按 $x$ 坐标排序，划分为左右两半。
2. 递归求出左右两半的最短距离 $d = \min(d_{left}, d_{right})$。
3. **关键合并步**：考虑跨越中线的点对。只需考虑 $x$ 坐标距离中线小于 $d$ 的点。
4. **鸽笼原理优化**：将这些点按 $y$ 坐标排序，对于每个点，在 $d \times 2d$ 的矩形区域内最多只有 6 个点。故只需检查后续 6 个点。

```cpp
#include <iostream>
#include <algorithm>
#include <cmath>
using namespace std;

struct Point {
    double x, y;
    bool operator< (const Point& W) const { return x < W.x; }
} p[100010], tmp[100010];

double dist(Point a, Point b) {
    return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

double solve(int l, int r) {
    if (l >= r) return 1e20;
    int mid = l + r >> 1;
    double mid_x = p[mid].x;
    double d = min(solve(l, mid), solve(mid + 1, r));

    int k = 0;
    for (int i = l; i <= r; i++)
        if (abs(p[i].x - mid_x) < d) tmp[k++] = p[i];

    sort(tmp, tmp + k, [](Point a, Point b) { return a.y < b.y; });

    for (int i = 0; i < k; i++)
        for (int j = i + 1; j < k && tmp[j].y - tmp[i].y < d; j++)
            d = min(d, dist(tmp[i], tmp[j]));
    return d;
}
```
</details>

---

## 五 : 综合练习库

### 练习 1：逆序对数量 (分治贡献统计)
在一个序列中，若 $i < j$ 且 $a[i] > a[j]$，则称 $(i, j)$ 为一个逆序对。

<details>
<summary>Check Solution</summary>

**思路**：在归并排序的合并阶段，若左半部分元素 $a[i] > a[j]$，则左半部分从 $i$ 到 $mid$ 的所有元素都与 $a[j]$ 构成逆序对。
```cpp
long long merge_sort(int l, int r) {
    if (l >= r) return 0;
    int mid = l + r >> 1;
    long long res = merge_sort(l, mid) + merge_sort(mid + 1, r);
    int i = l, j = mid + 1, k = 0;
    while (i <= mid && j <= r) {
        if (a[i] <= a[j]) tmp[k++] = a[i++];
        else {
            res += mid - i + 1;
            tmp[k++] = a[j++];
        }
    }
    while (i <= mid) tmp[k++] = a[i++];
    while (j <= r) tmp[k++] = a[j++];
    for (i = l, j = 0; i <= r; i++, j++) a[i] = tmp[j];
    return res;
}
```
</details>

---

_编者注：分治不仅能降低时间复杂度，更是实现并行计算的基础。每一个独立的子问题都可以被分发到不同的处理核心上并行执行。_
