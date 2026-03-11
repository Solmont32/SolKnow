---
title: 双指针算法 (Two Pointers)
sidebar_position: 7
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Repeat, FastForward, ArrowLeftRight, MoveRight, ZoomIn, Target } from 'lucide-react';

# 双指针算法 (Two Pointers)

双指针是一种通过维护两个指针 $i, j$ 来降低搜索空间维度的优化技术。它利用**单调性**，将 $O(n^2)$ 的暴力遍历优化至 $O(n)$。

---

## 一、 核心逻辑与单调性证明

### 1. 搜索空间压缩理论

暴力解法通常是在一个 $n \times n$ 的二维矩阵空间中寻找满足性质的点对 $(i, j)$。双指针的本质是证明：**当 $i$ 向某个方向移动时，$j$ 的最优取值只会单向移动**。

### 2. 同向双指针 (滑动窗口)

- **单调性证明**：设 $j(i)$ 是满足性质且以 $i$ 结尾的合法区间的最小左端点。若对于任意 $i' > i$，都有 $j(i') \ge j(i)$，则 $j$ 随 $i$ 单调递增。
- **复杂度**：$i$ 和 $j$ 各自最多移动 $n$ 次，总复杂度 $O(n)$。

### 3. 反向双指针 (对撞指针)

- **单调性证明**：在有序数组中查找 $A[i] + A[j] = Target$。
  - 若 $A[i] + A[j] > Target$，由于 $A[i' > i]$ 更大，故对于当前的 $j$，任何 $i' > i$ 都不可能满足等式。此时必须减小 $j$。
  - 这种逻辑排除了矩阵中某一整行或一整列的搜索空间。

---

## 二、 典型模型与性能分析

| 模型         | 指针动态               | 时间复杂度 | 关键性质                  |
| :----------- | :--------------------- | :--------- | :------------------------ |
| **滑动窗口** | $j$ 追赶 $i$           | $O(n)$     | 窗口内元素的单调/统计性质 |
| **对撞指针** | $i, j$ 汇合            | $O(n)$     | 全序集的单调性            |
| **快慢指针** | $v_{fast} = 2v_{slow}$ | $O(n)$     | 周期性/环检测             |

---

## 三、 教材化例题

### 例题 1：最长连续不重复子序列

给定序列，求最长的一个子序列，使得子序列中没有重复数字。

<details>
<summary>解析与推导</summary>

**1. 单调性证明**：
设 $j$ 是以 $i$ 结尾的最长不重复子序列的左边界。
若我们将 $i$ 向右移一位到 $i+1$，新的子序列 $[j, i+1]$ 可能会引入重复数字。为了消除重复，我们只能将 $j$ 向右移动。由于 $j$ 永远不会向左退回，满足单调性。

**2. 代码实现**：

```cpp
int main() {
    int n, res = 0;
    for (int i = 0, j = 0; i < n; i++) {
        cnt[a[i]]++;
        while (cnt[a[i]] > 1) { // 发现重复
            cnt[a[j]]--;
            j++; // 左指针右移
        }
        res = max(res, i - j + 1);
    }
}
```

</details>

### 例题 2：盛最多水的容器 (Container With Most Water)

$n$ 条垂线，选两条使得与 $x$ 轴围成的面积最大。

<details>
<summary>数学证明</summary>

**证明**：$Area = \min(h[i], h[j]) \times (j - i)$。
设 $h[i] < h[j]$。此时若固定 $i$，无论如何移动 $j$（减小 $j$），距离 $(j-i)$ 都会减小，且高度受限于 $h[i]$，面积绝不会增大。
因此，$i$ 这个端点已经“利用殆尽”，可以将其排除，即 `i++`。

```cpp
int l = 0, r = n - 1;
while (l < r) {
    res = max(res, min(height[l], height[r]) * (r - l));
    if (height[l] < height[r]) l++;
    else r--;
}
```

</details>

---

## 四、 综合练习库

### 练习 1：三数之和 (3Sum)

寻找所有满足 $a+b+c=0$ 的不重复三元组。

<details>
<summary>Check Solution</summary>

**策略**：

1. 排序。
2. 固定第一个数 $a[i]$，转化为在 $[i+1, n-1]$ 区间寻找 $b+c = -a[i]$。
3. 使用对撞指针处理 $b$ 和 $c$。

```cpp
sort(nums.begin(), nums.end());
for (int i = 0; i < n; i++) {
    if (i && nums[i] == nums[i-1]) continue; // 去重
    int l = i + 1, r = n - 1;
    while (l < r) {
        int sum = nums[i] + nums[l] + nums[r];
        if (sum == 0) {
            res.push_back({nums[i], nums[l], nums[r]});
            while (l < r && nums[l] == nums[l+1]) l++; // 去重
            while (l < r && nums[r] == nums[r-1]) r--;
            l++, r--;
        } else if (sum < 0) l++;
        else r--;
    }
}
```

</details>

### 练习 2：判断子序列

判断 $a$ 是否为 $b$ 的子序列。

<details>
<summary>Check Solution</summary>

**贪心性质**：
如果 $a[i]$ 在 $b$ 中有匹配，匹配越早对后续匹配越有利。

```cpp
int i = 0;
for (int j = 0; j < m; j++) {
    if (i < n && a[i] == b[j]) i++;
}
return i == n;
```

</details>

### 练习 3：和为 S 的连续正数序列

输出所有和为 $S$ 的连续正数序列。

<details>
<summary>Check Solution</summary>

**双指针/滑动窗口**：
维护 $[i, j]$ 的和。

- 若和 $< S$，$j++$。
- 若和 $> S$，$i++$。
- 若和 $= S$，记录并 $j++$。

```cpp
int i = 1, j = 1, sum = 0;
while (i <= s / 2) {
    if (sum < s) { sum += j; j++; }
    else if (sum > s) { sum -= i; i++; }
    else { /* record [i, j-1] */; sum -= i; i++; }
}
```

</details>

---

_编者注：双指针算法的灵魂在于“不回头”。通过分析性质，确定指针移动的单调性，是将其从暴力 $O(N^2)$ 拯救出来的唯一钥匙。_
