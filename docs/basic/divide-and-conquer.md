---
title: 分治思想 (Divide and Conquer)
sidebar_position: 8
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { GitBranch, GitMerge, Calculator, Terminal } from 'lucide-react';

# 分治思想 (Divide and Conquer)

分治算法的本质是**化归**。它将一个规模为 $n$ 的大问题分解为若干个规模较小且**结构相同**的子问题，递归求解后再合并子问题的解。

---

## 一、 核心步骤

1.  **分解 (Divide)**：将大问题划分为若干子问题。
2.  **治理 (Conquer)**：递归求解每个子问题。当规模足够小时直接返回。
3.  **合并 (Combine)**：将子问题的解拼接为原问题的解。

### 复杂度分析：主定理 (Master Theorem)
分治算法的复杂度通常满足递推式 $T(n) = aT(n/b) + f(n)$。
- 若 $a > b^k$，$T(n) = O(n^{\log_b a})$。
- 若 $a = b^k$，$T(n) = O(n^k \log n)$。
- 若 $a < b^k$，$T(n) = O(n^k)$。

---

## 二 : 教材化例题

### 例题 1：归并排序与逆序对
统计序列中 $i < j$ 且 $a[i] > a[j]$ 的对数。

<details>
<summary>解析与推导</summary>

**分治策略**：
1. 分解：将序列分为左右两半。
2. 递归：分别求出左半部分的逆序对和右半部分的逆序对。
3. 合并：统计跨越左右边界的逆序对。
   - 在归并排序合并阶段，若 $a[i] > a[j]$，则左半部分 $[i, mid]$ 后的所有数都与 $a[j]$ 构成逆序对，总数为 $mid - i + 1$。

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

int main() {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    printf("%lld\n", merge_sort(0, n - 1));
    return 0;
}
```
</details>

---

## 三 : 综合练习库

### 练习 1：快速幂 (Binary Exponentiation)
求 $a^b \pmod p$。
<details>
<summary>Check Solution</summary>

**分治思路**：
$a^b = a^{b/2} \cdot a^{b/2}$。

```cpp
#include <iostream>
using namespace std;

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

int main() {
    int a, b, p;
    scanf("%d %d %d", &a, &b, &p);
    printf("%lld\n", qmi(a, b, p));
    return 0;
}
```
</details>

### 练习 2：快速选择 (K-th Number)
求序列中第 $k$ 小的数。
<details>
<summary>Check Solution</summary>

**分治思路**：
利用快速排序的划分性质。

```cpp
#include <iostream>
using namespace std;

const int N = 100010;
int a[N];

int quick_sort(int l, int r, int k) {
    if (l >= r) return a[l];
    int x = a[l + r >> 1], i = l - 1, j = r + 1;
    while (i < j) {
        while (a[++i] < x);
        while (a[--j] > x);
        if (i < j) swap(a[i], a[j]);
    }
    int sl = j - l + 1;
    if (k <= sl) return quick_sort(l, j, k);
    return quick_sort(j + 1, r, k - sl);
}

int main() {
    int n, k;
    scanf("%d %d", &n, &k);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    printf("%d\n", quick_sort(0, n - 1, k));
    return 0;
}
```
</details>

---

_编者注：分治是构建复杂算法的“底层框架”。从归并排序到 FFT，从树分治到 CDQ 分治，其核心始终如一：化大为小，递归合并。_
