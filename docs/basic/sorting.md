---
title: 排序算法与离散化 (Sorting & Discretization)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 排序算法与离散化 (Sorting & Discretization)

排序是算法的基础。在竞赛中，我们通常直接使用标准库函数 `std::sort` ($O(n \log n)$)，但理解其背后的分治思想对于解决更复杂的问题（如逆序对、第 K 大数）至关重要。

---

## 一、核心排序算法

### 1. 快速排序 (Quick Sort)
**核心思想**：分治 (Divide & Conquer)。
1. 确定分界点 `x`（通常取 `q[l]`, `q[r]` 或 `q[(l+r)/2]`）。
2. **调整区间**：使得左半部分 $\le x$，右半部分 $\ge x$。
3. 递归处理左右两段。

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

### 2. 归并排序 (Merge Sort)
**核心思想**：分治。
1. 确定中点 `mid = (l + r) / 2`。
2. 递归排序左边和右边。
3. **归并**：将两个有序序列合并为一个。

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
    for (i = l, j = 0; i <= r; i++, j++) q[i] = tmp[j];
}
```

---

## 二、离散化 (Discretization)

离散化是一种处理**值域极大**但**数据个数较少**的问题的技巧。本质是将无限的（或范围极大的）连续空间映射到有限的（或范围较小的）整数空间。

<KnowledgeCard type="info" title="应用场景">
例如：坐标范围在 $[0, 10^9]$，但仅有 $10^5$ 个点有值。我们需要进行区间求和，此时无法开 $10^9$ 的数组，必须离散化。
</KnowledgeCard>

### 离散化流程
1. 收集所有需要用到的坐标。
2. 排序并去重（Unique）。
3. 通过二分查找原坐标在去重后数组中的下标。

```cpp
vector<int> alls; // 存储所有待离散化的值
sort(alls.begin(), alls.end());
alls.erase(unique(alls.begin(), alls.end()), alls.end()); // 去重

// 二分查找映射后的下标（从1开始）
int find(int x) {
    int l = 0, r = alls.size() - 1;
    while (l < r) {
        int mid = l + r >> 1;
        if (alls[mid] >= x) r = mid;
        else l = mid + 1;
    }
    return l + 1;
}
```

---

## 三、教材化例题

### 例题 1：逆序对的数量 (归并排序应用)

给定一个长度为 $n$ 的整数数列，请你计算数列中的逆序对的数量。

:::note[点击查看解析与代码]

**解析**：
在归并排序的合并过程中，若左半部分当前元素 $q[i] > q[j]$（右半部分当前元素），则 $q[i \dots mid]$ 均大于 $q[j]$。
产生的逆序对数量为 `mid - i + 1`。

**代码实现 (C++)**：
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
            res += mid - i + 1;
            tmp[k++] = q[j++];
        }
    }
    while (i <= mid) tmp[k++] = q[i++];
    while (j <= r) tmp[k++] = q[j++];
    for (i = l, j = 0; i <= r; i++, j++) q[i] = tmp[j];
    return res;
}

int main() {
    cin >> n;
    for (int i = 0; i < n; i++) cin >> q[i];
    cout << merge_sort(0, n - 1) << endl;
    return 0;
}
```
:::

### 例题 2：区间和 (离散化典型应用)

假定有一个无限长的数轴，数轴上每个坐标上的数都是 0。现在，我们首先进行 $n$ 次操作，每次操作将 $x$ 坐标上的数加上 $c$。接下来，进行 $m$ 次询问，每个询问包含两个整数 $l$ 和 $r$，你需要求出区间 $[l, r]$ 之间的所有数的和。

:::note[点击查看解析与代码]

**解析**：
坐标范围大 ($10^9$)，操作和询问数有限 ($10^5$)。
1. 将所有涉及到的坐标 $x$ 以及查询的边界 $l, r$ 存入 `alls` 数组离散化。
2. 在离散化后的数组上进行单点加。
3. 求离散化后数组的前缀和。
4. 查询时二分找到映射后的 $l, r$ 下标，利用前缀和求值。

**代码实现 (C++)**：
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

typedef pair<int, int> PII;
const int N = 300010; // n + 2m

int n, m;
int a[N], s[N];
vector<int> alls;
vector<PII> add, query;

int find(int x) {
    int l = 0, r = alls.size() - 1;
    while (l < r) {
        int mid = l + r >> 1;
        if (alls[mid] >= x) r = mid;
        else l = mid + 1;
    }
    return l + 1;
}

int main() {
    cin >> n >> m;
    for (int i = 0; i < n; i++) {
        int x, c;
        cin >> x >> c;
        add.push_back({x, c});
        alls.push_back(x);
    }
    for (int i = 0; i < m; i++) {
        int l, r;
        cin >> l >> r;
        query.push_back({l, r});
        alls.push_back(l);
        alls.push_back(r);
    }

    sort(alls.begin(), alls.end());
    alls.erase(unique(alls.begin(), alls.end()), alls.end());

    for (auto item : add) a[find(item.first)] += item.second;
    for (int i = 1; i <= alls.size(); i++) s[i] = s[i - 1] + a[i];

    for (auto item : query) {
        int l = find(item.first), r = find(item.second);
        cout << s[r] - s[l - 1] << endl;
    }
    return 0;
}
```
:::

---

## 四、练习库

- [练习 1：第 K 个数 (快速选择)](/docs/exercises/cs/algorithm-basic#练习-3)
- [练习 2：电影评分离散化](/docs/exercises/cs/algorithm-basic#练习-4)

---

_编者注：排序不仅是为了有序，更是为了分治思想的运用。离散化则是处理大值域问题的金钥匙。_
