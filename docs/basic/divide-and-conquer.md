---
title: 分治思想 (Divide and Conquer)
sidebar_position: 8
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { GitBranch, GitMerge, Calculator, Terminal, Box } from 'lucide-react';

# 分治思想 (Divide and Conquer)

分治算法的本质是**化归**。它将一个规模为 $n$ 的大问题分解为若干个规模较小且**结构相同**的子问题，递归求解后再合并子问题的解。

---

## 一、 核心步骤与形式化描述

### 1. 算法三部曲
1.  **分解 (Divide)**：将原问题 $P(n)$ 划分为 $k$ 个规模为 $n/b$ 的子问题。
2.  **治理 (Conquer)**：递归求解子问题。若规模足够小则直接返回。
3.  **合并 (Combine)**：将子问题的解 $S_1, S_2, \dots, S_k$ 融合成原问题的解。

### 2. 复杂度分析：主定理 (Master Theorem)
分治算法的复杂度通常满足递推式 $T(n) = aT(n/b) + f(n)$，其中 $f(n)$ 为分解与合并的开销。
- 若 $f(n) = O(n^d)$：
  - 若 $a > b^d$，$T(n) = O(n^{\log_b a})$。（主要开销在递归，如 Karatsuba 乘法）
  - 若 $a = b^d$，$T(n) = O(n^d \log n)$。（开销均衡，如 归并排序）
  - 若 $a < b^d$，$T(n) = O(n^d)$。（主要开销在合并）

---

## 二、 算法性能分析 (Complexity)

| 算法 | 时间复杂度 | 空间复杂度 | 核心瓶颈 |
| :--- | :--- | :--- | :--- |
| **归并排序** | $O(n \log n)$ | $O(n)$ | 辅助数组开销 |
| **快速幂** | $O(\log b)$ | $O(1)$ | 乘法常数 |
| **快速选择** | 期望 $O(n)$ | $O(\log n)$ (栈) | 基准值选择 |
| **大整数乘法** | $O(n^{\log_2 3})$ | $O(n)$ | 递归深度 |

---

## 三、 教材化例题

### 例题 1：归并排序与逆序对 (分治统计思想)
统计序列中 $i < j$ 且 $a[i] > a[j]$ 的对数。

<details>
<summary>解析与推导</summary>

**分治逻辑**：
1. **分解**：将序列分为 $L, R$ 两部分。
2. **治理**：分别求出 $L$ 内的逆序对和 $R$ 内的逆序对。
3. **合并 (关键)**：统计跨越 $L$ 与 $R$ 的逆序对。
   - 在合并有序序列时，若 $L[i] > R[j]$，则由于 $L$ 已有序，$L[i \dots mid]$ 均大于 $R[j]$。
   - 跨越边界的逆序对贡献为 $mid - i + 1$。

**代码实现**：
```cpp
#include <iostream>
using namespace std;

typedef long long LL;
const int N = 100010;
int a[N], tmp[N];

LL merge_sort(int l, int r) {
    if (l >= r) return 0;
    int mid = l + r >> 1;
    LL res = merge_sort(l, mid) + merge_sort(mid + 1, r);

    int k = 0, i = l, j = mid + 1;
    while (i <= mid && j <= r) {
        if (a[i] <= a[j]) tmp[k++] = a[i++];
        else {
            tmp[k++] = a[j++];
            res += mid - i + 1;
        }
    }
    while (i <= mid) tmp[k++] = a[i++];
    while (j <= r) tmp[k++] = a[j++];

    for (int i = l, j = 0; i <= r; i++, j++) a[i] = tmp[j];
    return res;
}
```
</details>

---

## 四、 综合练习库

### 练习 1：快速幂 (分治与二进制)
求 $a^b \pmod p$。
<details>
<summary>Check Solution</summary>

**分治推导**：
$$ a^b = \begin{cases} (a^{b/2})^2 & b \text{ is even} \\ a \cdot (a^{b/2})^2 & b \text{ is odd} \end{cases} $$

```cpp
typedef long long LL;
LL qmi(int a, int b, int p) {
    LL res = 1 % p;
    while (b) {
        if (b & 1) res = res * a % p;
        a = (LL)a * a % p;
        b >>= 1;
    }
    return res;
}
```
</details>

### 练习 2：最近点对问题 (二维分治)
平面上 $N$ 个点，求距离最近的两点之间的距离。
<details>
<summary>Check Solution</summary>

**分治思路**：
1. 按 $x$ 坐标排序，划分为左右两半。
2. 递归求出左右两半的最近距离 $d = \min(d_1, d_2)$。
3. **合并边界**：考虑跨越中线的点。只需检查 $|x_i - x_{mid}| < d$ 的点，并按 $y$ 坐标排序，每个点只需检查之后常数个点（通常为 6-7 个）。

```cpp
// 核心逻辑：
double merge(int l, int r) {
    double d = min(solve(l, mid), solve(mid+1, r));
    // 收集靠近中线的点
    // 按 y 排序并更新 d
    return d;
}
```
</details>

---

_编者注：分治是构建复杂算法的“底层框架”。从归并排序到 FFT，其核心始终如一：化大为小，递归合并。_
