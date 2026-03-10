---
title: 区间 DP
---

# 区间动态规划 (Range Dynamic Programming)

区间动态规划（Range DP）通过合并小区间的最优解来构建大区间的最优解。它是解决**合并类问题**（如堆叠、石子合并、表达式求值等）的核心工具。

---

## 核心建模范式

**状态定义**：
$f[i][j]$ 表示区间 $[i, j]$ 内的最优解。

**状态转移**：
通过枚举中间断点 $k$，将区间拆分为 $[i, k]$ 与 $[k+1, j]$：
$$f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] + \text{cost}(i, j) \}$$

**计算顺序**：
必须按照**区间长度由短到长**的顺序进行计算。
```cpp
for (int len = 1; len <= n; len++) { // 枚举长度
    for (int i = 1; i + len - 1 <= n; i++) { // 枚举起点
        int j = i + len - 1; // 终点
        if (len == 1) { f[i][j] = 初值; continue; }
        for (int k = i; k < j; k++) { // 枚举断点
            f[i][j] = min(f[i][j], f[i][k] + f[k+1][j] + cost(i, j));
        }
    }
}
```

---

## 1. 经典模型：石子合并 (Stone Merging)

设有 $n$ 堆石子，每次只能合并相邻的两堆，代价为两堆石子的重量之和。
$$f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] \} + \sum_{x=i}^j w_x$$
**优化**：区间和 $\sum w_x$ 可通过**前缀和** $O(1)$ 计算。

---

## 2. 经典模型：矩阵链乘法 (Matrix Chain Multiplication)

给定 $n$ 个矩阵，求计算其连乘积所需的最小标量乘法次数。
$$f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] + p_{i-1} \cdot p_k \cdot p_j \}$$
其中 $p_{i-1} \times p_k$ 是左侧矩阵的维度，$p_k \times p_j$ 是右侧矩阵的维度。

---

## 3. 经典模型：最长回文子序列 (LPS)

求一个字符串中最长的回文子序列（可以不连续）。
$$
f[i][j] = \begin{cases} 
f[i+1][j-1] + 2 & \text{if } s[i] = s[j] \\
\max(f[i+1][j], f[i][j-1]) & \text{if } s[i] \neq s[j]
\end{cases}
$$

---

## 高阶优化：四边形不等式

对于形如 $f[i][j] = \min \{ f[i][k] + f[k+1][j] + w(i, j) \}$ 的方程，若 $w(i, j)$ 满足四边形不等式且具有单调性，其复杂度可从 $O(N^3)$ 降至 $O(N^2)$。
核心技巧：记 $s[i][j]$ 为 $f[i][j]$ 的最优断点 $k$，则有 $s[i][j-1] \le s[i][j] \le s[i+1][j]$。

---

## 配套练习与解答

### 练习 1：环形石子合并
如果石子围成一个环，该如何处理？

<details>
<summary>点击查看解题思路</summary>

**“破环成链”**常用技巧：
将原序列复制一份接在后面，变为长度 $2N$ 的链，在该链上跑一遍 Range DP，最后统计所有长度为 $N$ 的区间的最大/最小值。
</details>

### 练习 2：能量项链 (NOIP 2006)
给定一串能量珠，每颗珠子由头标记和尾标记组成。相邻珠子合并释放能量。

<details>
<summary>点击查看解题思路</summary>

与矩阵链乘法类似，将珠子抽象为矩阵维度。注意环形处理。
</details>

### 练习 3：括号匹配 (Parentheses Matching)
给定一个字符串，求最少添加多少个括号使其变为合法序列。

<details>
<summary>点击查看解题思路</summary>

- `s[i], s[j]` 匹配时：`f[i][j] = f[i+1][j-1]`。
- 否则通过断点 $k$ 枚举：`f[i][j] = min(f[i][k] + f[k+1][j])`。
</details>

---

## 延伸挑战
- [洛谷 P1880 石子合并](https://www.luogu.com.cn/problem/P1880)
- [UVA 10003 切割木棒](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=12&page=show_problem&problem=944)
