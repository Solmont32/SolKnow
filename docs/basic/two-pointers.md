---
title: 双指针算法 (Two Pointers)
sidebar_position: 7
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Repeat, FastForward, ArrowLeftRight, MoveRight } from 'lucide-react';

# 双指针算法 (Two Pointers)

双指针是一种通过维护两个指针 $i, j$ 来降低搜索空间维度的优化技术。它利用**单调性**，将 $O(n^2)$ 的暴力遍历优化至 $O(n)$。

---

## 一、 核心分类与单调性证明

### 1. 同向双指针 (滑动窗口)
两个指针向同一方向移动。常用于处理子段、子串性质。
- **单调性证明**：若当 $i$ 增加时，$j$ 只能向右移动（即 $j$ 具有关于 $i$ 的单调递增性），则可使用。
- **性质**：$j$ 不会回退，总时间复杂度为 $O(n)$。

### 2. 反向双指针 (对撞指针)
指针从两端向中间移动。常用于处理有序数组的匹配问题。
- **单调性证明**：若 $A[i] + A[j] > Target$，由于数组递增，固定 $i$ 后，所有 $k > j$ 均有 $A[i] + A[k] > Target$，故 $j$ 只能向左移动。

---

## 二、 算法性能分析 (Complexity)

| 类型 | 指针移动方向 | 时间复杂度 | 空间复杂度 | 适用场景 |
| :--- | :--- | :--- | :--- | :--- |
| **滑动窗口** | 同向 | $O(n)$ | $O(1)$ 或 $O(\text{charset})$ | 最长/最短子串 |
| **对撞指针** | 异向 | $O(n)$ | $O(1)$ | 二数之和、回文判定 |
| **快慢指针** | 同向 (速率不同) | $O(n)$ | $O(1)$ | 链表环判定、中点查找 |

---

## 三、 教材化例题

### 例题 1：最长连续不重复子序列
给定序列，求最长的一个子序列，使得子序列中没有重复数字。

<details>
<summary>解析与推导</summary>

**1. 单调性证明**：
设 $j$ 是以 $i$ 结尾的最长不重复子序列的左边界。
当 $i$ 移动到 $i+1$ 时，若 $[j, i+1]$ 出现重复，则左边界 $j'$ 必然满足 $j' \ge j$。
即 $j$ 随 $i$ 单调递增。

**2. 代码实现**：
```cpp
#include <iostream>
using namespace std;

const int N = 100010;
int a[N], S[N]; // S记录窗口内数字出现次数

int main() {
    int n, res = 0;
    scanf("%d", &n);
    for (int i = 0, j = 0; i < n; i++) {
        scanf("%d", &a[i]);
        S[a[i]]++;
        while (S[a[i]] > 1) { // 出现重复，收缩左边界
            S[a[j]]--;
            j++;
        }
        res = max(res, i - j + 1);
    }
    printf("%d\n", res);
}
```
</details>

---

## 四、 综合练习库

### 练习 1：数组元素之和 (对撞指针)
给定两个升序数组 $A, B$，寻找 $i, j$ 使得 $A[i] + B[j] = X$。
<details>
<summary>Check Solution</summary>

**证明**：
对于固定的 $i$，当 $j$ 从 $m-1$ 开始向左移动。若 $A[i] + B[j] > X$，则对于 $i' > i$，$A[i'] + B[j]$ 依然可能等于 $X$，但对于当前的 $i$，我们需要减小 $j$。由于 $i$ 增大时 $j$ 只能减小，故满足单调性。

```cpp
for (int i = 0, j = m - 1; i < n; i++) {
    while (j >= 0 && a[i] + b[j] > x) j--;
    if (j >= 0 && a[i] + b[j] == x) {
        printf("%d %d\n", i, j);
        break;
    }
}
```
</details>

### 练习 2：判断子序列
判断 $a$ 序列是否为 $b$ 序列的子序列。
<details>
<summary>Check Solution</summary>

**逻辑**：
遍历 $b$ 序列，若 $b[j] == a[i]$，则 $i$ 移动。若最后 $i == n$，则成立。

```cpp
int i = 0;
for (int j = 0; j < m; j++) {
    if (i < n && a[i] == b[j]) i++;
}
if (i == n) puts("Yes");
```
</details>

---

_编者注：双指针算法的灵魂在于“不回头”。通过分析性质，确定指针移动的单调性，是将其从暴力 $O(N^2)$ 拯救出来的唯一钥匙。_
