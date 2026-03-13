---
title: 双指针技巧与单调性分析 (Two Pointers)
sidebar_position: 10
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Shuffle, MoveHorizontal, ArrowRightLeft, Target, Zap, ShieldCheck, TrendingUp } from 'lucide-react';

# 双指针技巧与单调性分析 (Two Pointers)

<KnowledgeCard 
  title="双指针核心思想" 
  icon={MoveHorizontal}
  color="#f59e0b"
>
  双指针算法是一种通过维护两个具有**单调性关系**的指针，将 $O(N^2)$ 的暴力枚举优化至 $O(N)$ 的高效技巧。
</KnowledgeCard>

---

## 一 : 算法原型与单调性证明

### 1. 核心模型
设两个指针为 $i, j$，我们遍历 $i$ 的同时维护 $j$。通常用于寻找满足某种性质的最长/最短区间。

```cpp
for (int i = 0, j = 0; i < n; i++) {
    while (j < i && !check(i, j)) j++;
    // 逻辑处理：[j, i] 为满足性质的窗口
}
```

### 2. 严密的单调性证明 (Monotonicity Proof)
证明双指针正确性的核心在于验证：**当主指针 $i$ 右移时，从属指针 $j$ 的最优决策点必然不会左移。**

- **定义**：设对于每一个 $i$，$j(i)$ 是使得某种性质 $P(j, i)$ 成立的最小（或最大）下标。
- **命题**：$\forall i_1 < i_2 \implies j(i_1) \le j(i_2)$。
- **推导**：
  1. 假设 $i$ 从 $i_1$ 移动到 $i_2$。
  2. 若 $j$ 需要减小（左移）才能满足性质 $P$，则说明在 $i_1$ 时，更小的 $j$ 已经能满足性质，这与 $j(i_1)$ 是当时的最优决策点矛盾。
- **复杂度分析**：由于 $i$ 和 $j$ 在整个过程中均只增不减，两个指针的总移动次数为 $\Theta(N)$。

---

## 二 : 典型应用场景

### 1. 归并类 (Two-Sequence)
在两个已排序序列中维护指针，如：
- **合并有序数组**。
- **寻找两个序列中的公共元素**。

### 2. 滑动窗口类 (Sliding Window)
在单序列中维护一个具有特定性质的连续区间 $[j, i]$。
- **性质：窗口内不重复**。
- **性质：窗口和 $\le S$**。

---

## 三 : 教材化例题

### 例题 1：最长不重复子序列
给定长度为 $n$ 的整数序列，求最长不包含重复数字的连续子序列长度。

<details>
<summary>Check Solution</summary>

**单调性证明**：
设区间 $[j, i]$ 满足无重复。当 $i$ 移至 $i+1$ 时，若 $a[i+1]$ 与区间内某元素重复，则只能通过右移 $j$ 来剔除重复项。$j$ 的右移是必然的且单调的。

```cpp
#include <iostream>
using namespace std;

const int N = 100010;
int a[N], cnt[N];

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i];

    int res = 0;
    for (int i = 0, j = 0; i < n; i++) {
        cnt[a[i]]++;
        while (cnt[a[i]] > 1) {
            cnt[a[j]]--;
            j++;
        }
        res = max(res, i - j + 1);
    }
    cout << res << endl;
    return 0;
}
```
</details>

### 例题 2：目标和 (两数之和)
在一个升序数组中，找到两个数 $a_i, a_j$ 使得 $a_i + a_j = M$。

<details>
<summary>收敛性证明</summary>

**双向移动证明**：
设 $i$ 从左向右，$j$ 从右向左。
- 若 $a_i + a_j > M$，由于数组升序，减小和的唯一方式是左移 $j$。
- 若 $a_i + a_j < M$，增大和的唯一方式是右移 $i$。
指针不会错过解，因为性质是严格单调的。

```cpp
#include <iostream>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    int a[N];
    for (int i = 0; i < n; i++) cin >> a[i];

    for (int i = 0, j = n - 1; i < j; i++) {
        while (i < j && a[i] + a[j] > m) j--;
        if (a[i] + a[j] == m) {
            cout << a[i] << " " << a[j] << endl;
            return 0;
        }
    }
    return 0;
}
```
</details>

---

## 四 : 综合练习库

### 练习 1：判断子序列
判断序列 $a$ 是否为序列 $b$ 的子序列。

<details>
<summary>Check Solution</summary>

**贪心证明**：对于 $a[i]$，在 $b$ 中找到的第一个匹配位置一定是局部最优的，因为它为后续 $a[i+1 \dots]$ 留下了最大的搜索空间。

```cpp
int i = 0, j = 0;
while (i < n && j < m) {
    if (a[i] == b[j]) i++;
    j++;
}
if (i == n) puts("Yes");
else puts("No");
```
</details>

---

_编者注：双指针算法的精髓在于“剪枝”。它利用单调性剪掉了 $O(N^2)$ 空间中大量的冗余状态，直达问题的最优解边界。_
