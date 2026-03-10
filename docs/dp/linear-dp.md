---
title: 线性 DP
---

# 线性动态规划 (Linear Dynamic Programming)

线性动态规划（Linear DP）是动态规划中最基础、应用最广的模型。其核心特征在于其状态设计与问题的**规模（通常是序列的长度）**呈线性关系，且状态转移通常只依赖于当前状态之前的有限个状态。

---

## 核心建模范式

在处理序列问题时，通常的状态定义为：
- `dp[i]`：前 $i$ 个元素的最优值（最大、最小或方案数）。
- `dp[i][j]`：第一个序列前 $i$ 个元素与第二个序列前 $j$ 个元素的最优值。

**转移核心逻辑**：
$$dp[i] = \text{combine}(\{dp[j] + \text{cost}(j, i) \mid j < i\})$$

---

## 1. 经典模型：最长上升子序列 (LIS)

### $O(N^2)$ 朴素算法
定义 $f[i]$ 为以 $a[i]$ 结尾的最长上升子序列的长度。
$$f[i] = \max_{j < i, a[j] < a[i]} \{f[j]\} + 1$$

### $O(N \log N)$ 贪心 + 二分优化
维护一个数组 $d$，其中 $d[k]$ 表示长度为 $k$ 的上升子序列的最小末尾元素。$d$ 数组是单调递增的，对于每个 $a[i]$，利用二分查找更新 $d$。

```cpp
// O(N log N) LIS 模板
int LIS(const vector<int>& a) {
    vector<int> d;
    for (int x : a) {
        auto it = lower_bound(d.begin(), d.end(), x);
        if (it == d.end()) d.push_back(x);
        else *it = x;
    }
    return d.size();
}
```

---

## 2. 经典模型：最长公共子序列 (LCS)

给定两个序列 $A, B$，求它们最长的公共子序列长度。
定义 $f[i][j]$ 为 $A[1 \dots i]$ 与 $B[1 \dots j]$ 的 LCS 长度。

**转移方程**：
$$
f[i][j] = \begin{cases} 
f[i-1][j-1] + 1 & \text{if } A[i] = B[j] \\
\max(f[i-1][j], f[i][j-1]) & \text{if } A[i] \neq B[j]
\end{cases}
$$

---

## 3. 经典模型：最大子段和 (Maximum Subarray Sum)

求一个序列中连续子段的和的最大值。
定义 $f[i]$ 为以 $a[i]$ 结尾的最大子段和。
$$f[i] = \max(f[i-1] + a[i], a[i])$$

**优化**：此模型即著名的 **Kadane's Algorithm**，空间复杂度可优化至 $O(1)$。

---

## 4. 空间优化：滚动数组技巧

在线性 DP 中，如果当前状态 `dp[i]` 仅依赖于 `dp[i-1]`，我们可以通过取模或覆盖的方式将空间复杂度从 $O(N)$ 降至 $O(1)$（或 $O(N^2)$ 降至 $O(N)$）。

```cpp
// 最大子段和空间优化示例
int maxSubArray(vector<int>& nums) {
    int curMax = 0, totalMax = nums[0];
    for (int x : nums) {
        curMax = max(x, curMax + x);
        totalMax = max(totalMax, curMax);
    }
    return totalMax;
}
```

---

## 综合练习

### 练习 1：LIS 的变体
给定一个序列，求最长上升子序列的**数量**。

<details>
<summary>点击查看解题思路</summary>

除了记录长度 `len[i]`，再记录一个 `cnt[i]`。
在转移时：
- 若 `len[j] + 1 > len[i]`：更新 `len[i] = len[j] + 1`, `cnt[i] = cnt[j]`。
- 若 `len[j] + 1 == len[i]`：`cnt[i] += cnt[j]`。

**注意**：若序列很长，可能需要使用树状数组维护。
</details>

### 练习 2：最长公共上升子序列 (LCIS)
结合 LCS 与 LIS，给定两个序列，求最长的既是 A 的子序列又是 B 的子序列，且该子序列单调递增。

<details>
<summary>点击查看解题思路</summary>

定义 $f[i][j]$ 为 $A$ 前 $i$ 个数与 $B$ 前 $j$ 个数且以 $B[j]$ 结尾的 LCIS 长度。
$O(N^2)$ 优化转移：
```cpp
for (int i = 1; i <= n; i++) {
    int maxv = 0; // 维护 B[1...j-1] 中小于 A[i] 的最大 f[i-1][k]
    for (int j = 1; j <= m; j++) {
        if (A[i] == B[j]) f[i][j] = maxv + 1;
        else f[i][j] = f[i-1][j];
        if (B[j] < A[i]) maxv = max(maxv, f[i-1][j]);
    }
}
```
</details>

### 练习 3：编辑距离 (Edit Distance)
将字符串 A 转换为 B 所需的最少操作次数（插入、删除、替换）。

<details>
<summary>点击查看解题思路</summary>

$$f[i][j] = \min \begin{cases} f[i-1][j] + 1 & \text{Delete} \\ f[i][j-1] + 1 & \text{Insert} \\ f[i-1][j-1] + (A[i] \neq B[j]) & \text{Replace} \end{cases}$$
</details>

---

## 延伸挑战
- [LeetCode 经典 DP 专题](https://leetcode.com/tag/dynamic-programming/)
- [洛谷 P1091 合唱队形](https://www.luogu.com.cn/problem/P1091)（LIS 双向应用）
