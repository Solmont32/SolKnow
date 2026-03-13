---
title: 双指针技巧与单调性分析 (Two Pointers)
sidebar_position: 10
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Shuffle, MoveHorizontal, ArrowRightLeft, Target, Zap, ShieldCheck } from 'lucide-react';

# 双指针技巧与单调性分析 (Two Pointers)

双指针算法是一种通过维护两个具有**单调性关系**的指针，将 $O(N^2)$ 的暴力枚举优化至 $O(N)$ 的高效技巧。

---

## 一 : 算法原型与单调性证明

### 1. 核心模型

设两个指针为 $i, j$，我们遍历 $i$ 的同时维护 $j$：

```cpp
for (int i = 0, j = 0; i < n; i++) {
    while (j < i && !check(i, j)) j++;
    // 处理逻辑
}
```

### 2. 单调性证明 (Decision Proof)

证明双指针正确性的关键在于：**随着 $i$ 的右移，最优的 $j$ 必然不会左移。**

- **假设**: $f(i)$ 是 $i$ 对应的最优 $j$ 位置。
- **目标**: 证明 $\forall i_1 < i_2 \implies f(i_1) \le f(i_2)$。
- **推导**: 如果 $i$ 右移导致 $j$ 必须左移才能满足条件，则说明 $O(N^2)$ 的暴力无法被此法优化。若 $j$ 单调不减，则 $j$ 的总移动步数为 $O(N)$。

---

## 二 : 常见应用场景

### 1. 两个序列的双指针 (如 归并合并)

$i$ 指向第一个序列，$j$ 指向第二个序列。根据两个指针所指元素的大小关系进行移动。

### 2. 一个序列的双指针 (如 滑动窗口)

维护区间 $[j, i]$，当 $i$ 向右扩张导致窗口不再满足性质时，收缩 $j$ 恢复性质。

---

## 三 : 教材化例题

### 例题 1：最长不重复子序列

给定一个长度为 $n$ 的整数序列，请找出最长的不包含重复数字的连续子序列，输出其长度。

<details>
<summary>证明与解析</summary>

**单调性分析**：
设区间 $[j, i]$ 满足“无重复”。
当 $i$ 向右移动一位到 $i+1$ 时，若新加入的 $a[i+1]$ 导致了重复，只能通过移动 $j$ 向右收缩窗口来消除重复。$j$ 绝对不需要向左移动（因为 $[j, i]$ 已经是 $i$ 时的最优前缀，向左移动只会增加更多重复的可能性）。

```cpp
int res = 0;
for (int i = 0, j = 0; i < n; i++) {
    cnt[a[i]]++;
    while (cnt[a[i]] > 1) cnt[a[j++]]--;
    res = max(res, i - j + 1);
}
```

</details>

---

## 四 : 综合练习库

### 练习 1：数组元素之和 (两数之和)

在一个升序数组中，找到两个数 $a_i, a_j$ 使得 $a_i + a_j = S$。

<details>
<summary>Check Solution</summary>

**策略**：$i$ 从 0 开始，$j$ 从 $n-1$ 开始。

- 若 $a_i + a_j > S$，由于数组升序，减小和的唯一方式是 $j$ 左移。
- 若 $a_i + a_j < S$，增大和的唯一方式是 $i$ 右移。

```cpp
for (int i = 0, j = n - 1; i < j; i++) {
    while (i < j && a[i] + a[j] > S) j--;
    if (a[i] + a[j] == S) return {i, j};
}
```

</details>

### 练习 2：判断子序列

判断 $a$ 序列是否是 $b$ 序列的子序列。

<details>
<summary>Check Solution</summary>

**证明**：贪心选择。对于 $a[i]$，在 $b$ 中找到的第一个匹配位置一定是最优的，因为它给后续的 $a[i+1 \dots m]$ 留下了最多的匹配空间。

```cpp
int i = 0, j = 0;
while (i < n && j < m) {
    if (a[i] == b[j]) i++;
    j++;
}
return i == n;
```

</details>

---

_编者注：双指针算法的精髓在于“剪枝”。它利用单调性剪掉了 $O(N^2)$ 空间中大量的冗余状态，直达问题的最优解边界。_
