---
title: 双指针算法 (Two Pointers)
sidebar_position: 6
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { FastForward, MoveHorizontal, Target } from 'lucide-react';

# 双指针算法 (Two Pointers)

双指针是一种通过维护两个变量（指针）在序列上移动，从而利用序列的**单调性**将 $O(n^2)$ 的暴力枚举优化为 $O(n)$ 的技巧。

---

## 一、 算法分类与逻辑

### 1. 数学基础：单调性与收敛性 (Monotonicity & Convergence)
双指针算法的有效性建立在**决策单调性**之上。
设 $i, j$ 是序列上的两个索引。若对于每一个 $j$，存在一个最优的或唯一的 $i(j)$ 使得某种性质满足，且 $i(j)$ 随 $j$ 的增加而**单调不减**，则称该问题具有双指针结构。

**复杂度分析**：
由于 $i$ 和 $j$ 在整个过程中最多各自遍历序列一次（即 $i$ 和 $j$ 的总移动步数 $\le 2n$），因此算法的时间复杂度为 $O(n)$。这比暴力枚举 $i, j$ 的 $O(n^2)$ 有了质的飞跃。

---

## 二 : 教材化例题

### 例题 1：最长不包含重复字符的子段
给定序列 $a$，求最长的子段长度，使得该子段内没有重复元素。

<details>
<summary>解析与推导</summary>

**逻辑推导**：
1. 枚举右端点 $j$，维护左端点 $i$。
2. 窗口 $[i, j]$ 内记录每个数出现的次数。
3. 若 $a[j]$ 出现次数 $>1$，则不断右移 $i$ 并更新计数，直到 $a[j]$ 计数为 1。
4. 由于 $i$ 和 $j$ 都只增不减，复杂度为 $O(n)$。

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 100010;
int a[N], s[N];

int main() {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);

    int res = 0;
    for (int i = 0, j = 0; j < n; j++) {
        s[a[j]]++;
        while (s[a[j]] > 1) {
            s[a[i]]--;
            i++;
        }
        res = max(res, j - i + 1);
    }
    printf("%d\n", res);
    return 0;
}
```
</details>

### 例题 2 : 数组元素的目标和
给定两个升序数组 $A, B$ 和一个数 $X$，求 $i, j$ 使得 $A[i] + B[j] = X$。

<details>
<summary>C++ 实现</summary>

```cpp
#include <iostream>
using namespace std;

const int N = 100010;
int a[N], b[N];

int main() {
    int n, m, x;
    scanf("%d %d %d", &n, &m, &x);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    for (int i = 0; i < m; i++) scanf("%d", &b[i]);

    for (int i = 0, j = m - 1; i < n; i++) {
        while (j >= 0 && a[i] + b[j] > x) j--;
        if (j >= 0 && a[i] + b[j] == x) {
            printf("%d %d\n", i, j);
            break;
        }
    }
    return 0;
}
```
</details>

---

## 三 : 综合练习库

### 练习 1：判断子序列
给定序列 $a, b$，判断 $a$ 是否是 $b$ 的子序列。
<details>
<summary>Check Solution</summary>

```cpp
#include <iostream>
using namespace std;

const int N = 100010;
int a[N], b[N];

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    for (int i = 0; i < m; i++) scanf("%d", &b[i]);

    int i = 0, j = 0;
    while (i < n && j < m) {
        if (a[i] == b[j]) i++;
        j++;
    }

    if (i == n) puts("Yes");
    else puts("No");

    return 0;
}
```
</details>

---

_编者注：双指针的灵魂在于“不回退”。只要能证明当一个指针移动时，另一个指针的最优位置也单向移动，双指针就是最优解。_
