---
title: 线性 DP
---

# 线性动态规划 (Linear Dynamic Programming)

线性动态规划是 DP 体系中最基础的模型，其核心特征是**状态的演进与输入序列的下标（或多个序列的下标组合）呈线性增长关系**。

---

## 核心理论体系

### 1. 状态定义范式
在线性结构中，状态通常表征为“前缀的最优解”：
- **单序列**：$f[i]$ 表示前 $i$ 个元素满足某种约束的最优值。
- **双序列**：$f[i][j]$ 表示第一个序列前 $i$ 个元素与第二个序列前 $j$ 个元素匹配后的最优值。

### 2. 拓扑序要求
状态转移必须满足 $i \to i+1$，即计算 $f[i]$ 时，$f[0 \dots i-1]$ 必须已处于完成态。

---

## 经典模型深度解析

### 1. 最长上升子序列 (LIS)
**状态定义**：$f[i]$ 为以第 $i$ 个元素 $a[i]$ **结尾**的最长上升子序列的长度。
**转移方程**：
$$f[i] = \max_{0 \le j < i, a[j] < a[i]} \{f[j]\} + 1$$
**复杂度**：$O(N^2)$。通过“维护单调队列+二分查找”可优化至 $O(N \log N)$。

### 2. 最长公共子序列 (LCS)
**状态定义**：$f[i][j]$ 为序列 $A[1 \dots i]$ 与 $B[1 \dots j]$ 的 LCS 长度。
**转移方程**：
若 $A[i] = B[j]$，则两元素必定可作为公共末尾：
$$f[i][j] = f[i-1][j-1] + 1$$
若 $A[i] \neq B[j]$，则当前最优解必由舍弃其中一个元素的状态转移而来：
$$f[i][j] = \max(f[i-1][j], f[i][j-1])$$

### 3. 编辑距离 (Levenshtein Distance)
**状态定义**：$f[i][j]$ 表示将 $A[1 \dots i]$ 转换为 $B[1 \dots j]$ 的最少操作次数。
**转移核心逻辑**：
- **匹配/替换**：从 $f[i-1][j-1]$ 转移。若 $A[i]=B[j]$ 代价为 0，否则代价为 1。
- **删除**：从 $f[i-1][j]$ 转移，相当于删掉 $A[i]$。
- **插入**：从 $f[i][j-1]$ 转移，相当于在 $A$ 结尾插入 $B[j]$。
$$f[i][j] = \min \begin{cases} f[i-1][j-1] + (A[i] \neq B[j]) \\ f[i-1][j] + 1 \\ f[i][j-1] + 1 \end{cases}$$

---

## 空间优化：滚动数组 (Rolling Array)

在线性 DP 中，$f[i]$ 通常只依赖于 $f[i-1]$。利用取模运算 $i \& 1$ 或直接覆盖，可将空间复杂度从 $O(N^2)$ 降低至 $O(N)$。

```cpp
// LCS 空间优化模板
int LCS_Optimized(string s1, string s2) {
    int n = s1.size(), m = s2.size();
    vector<int> dp(m + 1, 0);
    for (int i = 1; i <= n; i++) {
        int prev = 0; // 相当于 dp[i-1][j-1]
        for (int j = 1; j <= m; j++) {
            int temp = dp[j];
            if (s1[i-1] == s2[j-1]) dp[j] = prev + 1;
            else dp[j] = max(dp[j], dp[j-1]);
            prev = temp;
        }
    }
    return dp[m];
}
```

---

## 综合练习与强化

### 练习 1：LIS 的方案总数
求长度为 LIS 的不同子序列有多少个？

<details>
<summary>Check Solution</summary>

需维护两个状态：`len[i]` (长度) 和 `cnt[i]` (方案数)。
- 若 `len[j] + 1 > len[i]`：更新 `len[i] = len[j] + 1`, `cnt[i] = cnt[j]`。
- 若 `len[j] + 1 == len[i]`：累加 `cnt[i] += cnt[j]`。

**注意**：对于大数据量，需配合树状数组进行 $O(N \log N)$ 的前缀和维护。
</details>

### 练习 2：最大子段和 (Kadane 算法)
求序列中连续子段的最大和。

<details>
<summary>Check Solution</summary>

$$f[i] = \max(a[i], f[i-1] + a[i])$$
本质是对于每一个元素，决定“自立门户”还是“加入前缀”。
```cpp
int maxSubArray(vector<int>& nums) {
    int res = nums[0], cur = 0;
    for (int x : nums) {
        cur = max(x, cur + x);
        res = max(res, cur);
    }
    return res;
}
```
</details>

---

## 延伸挑战
- [洛谷 P1091 合唱队形](https://www.luogu.com.cn/problem/P1091)（双向 LIS）
- [Codeforces 1114D Flood Fill](https://codeforces.com/contest/1114/problem/D)（区间线性结合）
