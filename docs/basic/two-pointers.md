---
title: 双指针算法 (Two Pointers)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 双指针算法 (Two Pointers)

双指针算法是一种极其高效的优化手段。它利用**单调性**（Monotonicity），将原本需要 $O(n^2)$ 的暴力枚举优化为 $O(n)$ 的线性扫描。

---

## 一、基本原理与分类

### 1. 核心逻辑
暴力做法通常是双重循环：
```cpp
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        if (check(i, j)) res = max(res, j - i + 1);
```
双指针的精髓在于：随着 $i$ 的增加，$j$ 的移动是**单调的**（不会回退）。因此总复杂度为 $O(n + n) = O(n)$。

### 2. 常见分类
- **对撞指针**：两个指针从两端向中间移动（如二分、两数之和）。
- **快慢指针**：两个指针同向移动，但步长不同（如判断链表环）。
- **滑动窗口**：维护一段满足性质的区间。

---

## 二、教材化例题

### 例题 1：最长不包含重复数字的子序列
给定长度为 $n$ 的序列，求其中最长的、不包含重复数字的连续子序列长度。

<details>
<summary>点击查看解析与代码</summary>

**解析**：
1. 使用两个指针 $i, j$ 维护区间 $[j, i]$。
2. 每次向右移动 $i$，并用哈希表（或数组）记录元素出现频率。
3. 若 $a[i]$ 出现冲突，则不断向右移动 $j$ 并减少频率，直到冲突消失。
4. **单调性证明**：随着 $i$ 右移，$j$ 只可能右移或不动，以维持区间不重复。

**代码实现**：
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
    for (int i = 0, j = 0; i < n; i++) {
        s[a[i]]++;
        while (s[a[i]] > 1) {
            s[a[j]]--;
            j++;
        }
        res = max(res, i - j + 1);
    }
    printf("%d\n", res);
    return 0;
}
```
</details>

### 例题 2：数组元素的目标和 (对撞指针)
给定两个升序数组 $A$ 和 $B$，求满足 $A[i] + B[j] = X$ 的下标对 $(i, j)$。

<details>
<summary>点击查看解析与代码</summary>

**解析**：
由于 $A, B$ 均升序，$i$ 从 $0 \to n-1$ 增加时，为了使和接近 $X$，$j$ 必须从 $m-1 \to 0$ 减小。

**代码实现**：
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

## 三、进阶应用：单调队列与单调栈

双指针思想延伸到数据结构，即产生单调栈（求左右第一个比它大的数）和单调队列（滑动窗口最值）。

<KnowledgeCard type="info" title="滑动窗口最值 (Monotonic Queue)">
求每个长度为 $k$ 的滑动窗口内的最小值。
1. 队头超出范围 $(q[head] < i - k + 1)$ 则弹出。
2. 待入队元素 $a[i]$ 比队尾更优，则不断弹出队尾。
3. 队头即为当前窗口最值。
</KnowledgeCard>

---

## 四、练习与巩固

- **练习 1**：[判断子序列] 给定 $a, b$ 两序列，判断 $a$ 是否为 $b$ 的子序列。
- **练习 2**：[三数之和] 在升序数组中寻找 $a+b+c=0$ 的所有不重复三元组。
- **练习 3**：[盛水最多的容器] 利用对撞指针贪心地移动较短板。

---

_编者注：双指针的本质是“排除无效搜索空间”。只要你能证明 $j$ 的移动具有单调性，就能将 $O(n^2)$ 降维打击为 $O(n)$。_
