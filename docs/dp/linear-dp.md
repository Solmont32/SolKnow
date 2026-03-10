---
title: 线性 DP
---

# 线性动态规划 (Linear Dynamic Programming)

线性动态规划是 DP 体系中最基础的模型，其核心特征是**状态的演进与输入序列的下标（或多个序列的下标组合）呈线性增长关系**。

---

## <Microscope className="inline-block mr-2" /> 核心理论体系

### 1. 状态定义范式 (State Formalization)
在线性结构中，状态通常表征为“前缀的最优解”：
- **单序列 (Single Sequence)**：$f[i]$ 表示子序列 $A[1 \dots i]$ 满足某种约束的最优值。
- **双序列 (Dual Sequence)**：$f[i][j]$ 表示 $A[1 \dots i]$ 与 $B[1 \dots j]$ 匹配后的最优值。

### 2. 转移推导逻辑 (Derivation Logic)
线性 DP 的转移通常取决于“最后一步”的决策：
- 包含/不包含当前元素 $A[i]$。
- $A[i]$ 与前驱状态 $j < i$ 的某种关联。

---

## <Layers className="inline-block mr-2" /> 经典模型深度解析

### 1. 最长上升子序列 (LIS)
**状态定义**：$f[i]$ 表示以 $a[i]$ 结尾的 LIS 长度。
**转移方程**：
$$f[i] = \max_{0 \le j < i, a[j] < a[i]} \{f[j]\} + 1$$
**复杂度**：$O(N^2)$。

#### 🚀 进阶：$O(N \log N)$ 贪心 + 二分优化
**推导本质**：我们希望子序列增长得尽可能“慢”，以便后面能接更多的数。
**维护对象**：$g[len]$ 表示长度为 $len$ 的上升子序列末尾元素的**最小值**。
- **性质**：$g$ 数组显然是单调递增的。
- **操作**：对于每个 $a[i]$，在 $g$ 中找到第一个 $\ge a[i]$ 的位置并替换它；若都比 $a[i]$ 小，则在末尾新增。

### 2. 最长公共子序列 (LCS)
**状态定义**：$f[i][j]$ 表示 $A[1 \dots i]$ 与 $B[1 \dots j]$ 的 LCS 长度。
**转移核心逻辑**：
- 若 $A[i] = B[j]$，则 $f[i][j] = f[i-1][j-1] + 1$（贪心选择）。
- 若 $A[i] \neq B[j]$，则 $f[i][j] = \max(f[i-1][j], f[i][j-1])$。

---

## <Activity className="inline-block mr-2" /> 复杂度矩阵

| 模型 | 状态空间 | 转移开销 | 总时间复杂度 | 空间复杂度 |
| :--- | :--- | :--- | :--- | :--- |
| **朴素 LIS** | $O(N)$ | $O(N)$ | $O(N^2)$ | $O(N)$ |
| **二分 LIS** | $O(N)$ | $O(\log N)$ | $O(N \log N)$ | $O(N)$ |
| **LCS** | $O(NM)$ | $O(1)$ | $O(NM)$ | $O(NM) \to O(\min(N,M))$ |
| **编辑距离** | $O(NM)$ | $O(1)$ | $O(NM)$ | $O(NM)$ |

---

## <ShieldCheck className="inline-block mr-2" /> 综合练习与强化

### 练习 1：LIS 的方案总数 (Combination)
求长度等于最长上升子序列长度的不同子序列方案数。

<details>
<summary>Check Solution</summary>

需维护两个状态：`f[i]` (长度) 和 `cnt[i]` (以 $i$ 结尾的方案数)。
- 初始化 `f[i] = 1, cnt[i] = 1`。
- 遍历 $j < i$ 且 $a[j] < a[i]$：
  - 若 `f[j] + 1 > f[i]`：更新 `f[i] = f[j] + 1`, `cnt[i] = cnt[j]`。
  - 若 `f[j] + 1 == f[i]`：累加 `cnt[i] += cnt[j]`。
- 最终答案为所有 `f[i] == max_len` 的 `cnt[i]` 之和。

```cpp
// 核心逻辑
for (int i = 0; i < n; i++) {
    for (int j = 0; j < i; j++) {
        if (a[j] < a[i]) {
            if (f[j] + 1 > f[i]) {
                f[i] = f[j] + 1;
                cnt[i] = cnt[j];
            } else if (f[j] + 1 == f[i]) {
                cnt[i] += cnt[j];
            }
        }
    }
}
```
</details>

### 练习 2：最长公共上升子序列 (LCIS)
结合 LCS 与 LIS 的特征。

<details>
<summary>Check Solution</summary>

**状态定义**：$f[i][j]$ 表示 $A$ 前 $i$ 个数与 $B$ 前 $j$ 个数匹配，且以 $B[j]$ 结尾的 LCIS 长度。
**优化推导**：朴素 $O(N^2 M)$ 可优化至 $O(NM)$。
```cpp
for (int i = 1; i <= n; i++) {
    int max_val = 0; // 维护 B[1...j-1] 中小于 A[i] 的 f[i-1][k] 的最大值
    for (int j = 1; j <= m; j++) {
        if (a[i] == b[j]) f[i][j] = max_val + 1;
        else f[i][j] = f[i-1][j];
        if (b[j] < a[i]) max_val = max(max_val, f[i-1][j]);
    }
}
```
</details>

---

## 延伸挑战
- [洛谷 P1091 合唱队形](https://www.luogu.com.cn/problem/P1091)（双向 LIS）
- [Codeforces 1114D Flood Fill](https://codeforces.com/contest/1114/problem/D)（区间线性结合）
