---
title: 分治理论与复杂度收敛 (Divide and Conquer)
sidebar_position: 8
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { GitBranch, GitMerge, Calculator, Terminal, Box, Binary, Network, Zap, CheckCircle2 } from 'lucide-react';

# 分治理论与复杂度收敛 (Divide and Conquer)

分治算法的本质是**化归 (Reduction)**。它将一个规模为 $n$ 的大问题分解为若干个规模较小且**结构相同**的子问题，递归求解后再合并子问题的解。

---

## 一、 形式化描述与三部曲

1.  **分解 (Divide)**：将原问题 $P(n)$ 划分为 $a$ 个规模为 $n/b$ 的子问题。
2.  **治理 (Conquer)**：递归求解子问题。若规模足够小则直接求解（Base Case）。
3.  **合并 (Combine)**：将子问题的解融合成原问题的解。

---

## 二、 递归一致性校验 (Recursive Consistency)

为确保分治算法的正确性，必须满足以下三个准则：

### 1. 递归不变式 (Recursion Invariant)
证明子问题的解在合并前满足预期的性质。
*例如：在归并排序中，递归返回的左右两个子序列必须已经是各自有序的。*

### 2. 边界完备性 (Base Case Completeness)
确保所有可能的递归路径最终都能到达 Base Case，且 Base Case 的解是显然正确的。

### 3. 合并正确性 (Merging Logic)
证明通过子问题的解构造原问题解的过程覆盖了所有可能的情况，特别是**跨越边界**的情况。

---

## 三、 复杂度分析：主定理 (Master Theorem)

分治算法的性能通常遵循递推式：$T(n) = aT(n/b) + f(n)$。

- **Case 1**: $f(n) = O(n^{\log_b a - \epsilon}) \implies T(n) = \Theta(n^{\log_b a})$
- **Case 2**: $f(n) = \Theta(n^{\log_b a}) \implies T(n) = \Theta(n^{\log_b a} \log n)$
- **Case 3**: $f(n) = \Omega(n^{\log_b a + \epsilon}) \implies T(n) = \Theta(f(n))$

<KnowledgeCard type="info" title="优化核心：减小系数 a">
Karatsuba 乘法通过将 $a$ 从 4 减小到 3，使大整数乘法复杂度从 $O(n^2)$ 降至 $O(n^{1.58})$。
</KnowledgeCard>

---

## 四、 教材化例题

### 例题 1：最近点对问题 (平面分治)
在 $O(n \log n)$ 内寻找平面上距离最近的两点。

<details>
<summary>证明与一致性校验</summary>

**分治逻辑**：
1. **分解**：按 $x$ 坐标排序，划分为左右两半。
2. **治理**：递归求左右两侧的最短距离 $d = \min(d_{left}, d_{right})$。
3. **合并（跨界校验）**：只需考虑 $x$ 坐标距离中线小于 $d$ 的点。
4. **鸽笼原理证明**：对于选出的点，按 $y$ 排序。对于每个点，在其 $d \times 2d$ 的候选矩形内，最多只有 6 个点能满足互距 $\ge d$。因此合并复杂度为 $O(n)$。

```cpp
#include <iostream>
#include <algorithm>
#include <cmath>
#include <vector>
using namespace std;

struct Point {
    double x, y;
    bool operator< (const Point& W) const { return x < W.x; }
};

double dist(Point a, Point b) {
    return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

double solve(int l, int r, vector<Point>& p) {
    if (l >= r) return 1e20;
    int mid = l + r >> 1;
    double mid_x = p[mid].x;
    double d = min(solve(l, mid, p), solve(mid + 1, r, p));

    vector<Point> tmp;
    for (int i = l; i <= r; i++)
        if (abs(p[i].x - mid_x) < d) tmp.push_back(p[i]);

    sort(tmp.begin(), tmp.end(), [](Point a, Point b) { return a.y < b.y; });

    for (int i = 0; i < tmp.size(); i++)
        for (int j = i + 1; j < tmp.size() && tmp[j].y - tmp[i].y < d; j++)
            d = min(d, dist(tmp[i], tmp[j]));
    return d;
}
```
</details>

### 例题 2：快速幂 (幂分治)
计算 $a^b \pmod p$，要求 $O(\log b)$。

<details>
<summary>数学归纳证明</summary>

**递推式**：
$a^b = (a^{b/2})^2$ (若 $b$ 是偶数)
$a^b = a \cdot (a^{(b-1)/2})^2$ (若 $b$ 是奇数)
**一致性**：每次指数减半，符合 Case 1，总次数 $\lceil \log_2 b \rceil$。

```cpp
long long qmi(long long a, long long b, long long p) {
    long long res = 1;
    while (b) {
        if (b & 1) res = res * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return res;
}
```
</details>

---

## 五、 综合练习库

### 练习 1：逆序对数量 (分治贡献统计)
在一个序列中，若 $i < j$ 且 $a[i] > a[j]$，则称 $(i, j)$ 为一个逆序对。

<details>
<summary>Check Solution</summary>

**一致性校验**：逆序对总数 = 左半部分逆序对 + 右半部分逆序对 + 跨越左右的逆序对。
利用归并排序的合并过程，当 $a[i] > a[j]$ 时，左半部分 $[i, mid]$ 的所有元素都与 $a[j]$ 构成逆序对。

```cpp
long long merge_sort(int l, int r) {
    if (l >= r) return 0;
    int mid = l + r >> 1;
    long long res = merge_sort(l, mid) + merge_sort(mid + 1, r);
    int i = l, j = mid + 1, k = 0;
    while (i <= mid && j <= r) {
        if (a[i] <= a[j]) tmp[k++] = a[i++];
        else {
            res += mid - i + 1; // 统计跨界贡献
            tmp[k++] = a[j++];
        }
    }
    // ... 剩余元素处理与回填
    return res;
}
```
</details>

### 练习 2：二分查找的递归一致性
证明递归实现的二分查找 `binary_search(l, r, target)` 满足 $O(\log n)$ 且结果正确。

<details>
<summary>Check Solution</summary>

**递归不变式**：若 $target$ 存在，则一定在当前考察的区间 $[l, r]$ 中。
- **Base Case**: $l > r$ 且未找到，返回失败；$a[mid] == target$，返回成功。
- **一致性**: $a[mid] < target \implies target \in [mid+1, r]$；$a[mid] > target \implies target \in [l, mid-1]$。
由主定理知 $T(n) = T(n/2) + O(1) = O(\log n)$。
</details>

---

_编者注：分治的核心价值在于“分而治之，合而胜之”。合并逻辑（Combine）往往是算法中最具创造力的部分，它决定了算法能否突破平凡的复杂度。_
