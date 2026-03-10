---
title: 区间 DP
---

# 区间动态规划 (Range Dynamic Programming)

区间动态规划主要解决**可以将一段区间拆分为更小的区间并进行合并**的问题。其核心特征是状态定义与区间两端点 $[i, j]$ 直接相关。

---

## 核心建模范式

**状态定义**：
$f[i][j]$ 表示区间 $[i, j]$ 内的最优解。

**转移方程**：
通常通过枚举区间内的“断点” $k$ 来进行转移：
$$f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] + \text{cost}(i, j) \}$$

**拓扑序（计算顺序）**：
由于大区间依赖于小区间，必须按照**区间长度（Length）从小到大**进行递推。

```cpp
for (int len = 1; len <= n; len++) { // 1. 枚举区间长度
    for (int i = 1; i + len - 1 <= n; i++) { // 2. 枚举起点
        int j = i + len - 1; // 3. 确定终点
        if (len == 1) { /* 初始化 */ continue; }
        for (int k = i; k < j; k++) { // 4. 枚举断点
            f[i][j] = min(f[i][j], f[i][k] + f[k+1][j] + cost(i, j));
        }
    }
}
```

---

## 1. 经典模型：石子合并 (Stone Merging)

设有 $n$ 堆石子排成一排，每次合并相邻两堆，代价为两堆重量之和。求合并为一堆的最小总代价。
$$f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] \} + \sum_{p=i}^j w_p$$
**优化**：区间和 $\sum w_p$ 利用**前缀和**实现 $O(1)$ 查询。

---

## 2. 经典模型：矩阵链乘法

给定 $n$ 个矩阵，维度分别为 $p_0 \times p_1, p_1 \times p_2, \dots$。求计算乘积的最少标量乘法次数。
$$f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] + p_{i-1} \cdot p_k \cdot p_j \}$$

---

## 高阶优化：四边形不等式 (Quadrangle Inequality)

对于形如 $f[i][j] = \min \{ f[i][k] + f[k+1][j] + w(i, j) \}$ 的方程，若代价函数 $w(i, j)$ 满足：
1. **区间包含单调性**：若 $[i', j'] \subseteq [i, j]$，则 $w(i', j') \le w(i, j)$。
2. **四边形不等式**：对于 $a < b < c < d$，有 $w(a, c) + w(b, d) \le w(a, d) + w(b, c)$。

则 $f$ 也满足四边形不等式，且其最优断点 $s[i][j]$ 满足：
$$s[i][j-1] \le s[i][j] \le s[i+1][j]$$
利用此性质，断点循环的开销在均摊意义下从 $O(N)$ 降至 $O(1)$，总复杂度降至 **$O(N^2)$**。

---

## 综合练习与强化

### 练习 1：环形区间处理
如果序列是一个环（如环形石子合并），如何处理？

<details>
<summary>Check Solution</summary>

**“破环成链”法**：
将序列复制一份拼接在末尾，构造长度为 $2N$ 的链。在 $2N$ 链上跑 Range DP。
最终结果为所有 $f[i][i+N-1]$（其中 $1 \le i \le N$）的最值。
</details>

### 练习 2：能量项链 (NOIP 2006)
涉及珠子合并，每颗珠子有头/尾标记。

<details>
<summary>Check Solution</summary>

本质上是环形矩阵链乘法。定义 $f[i][j]$ 为合并 $[i, j]$ 区间珠子释放的最大能量。
转移：$f[i][j] = \max \{ f[i][k] + f[k+1][j] + head[i] \cdot tail[k] \cdot tail[j] \}$。
</details>

### 练习 3：括号匹配 (Min Additions)
使字符串变成合法的括号序列最少需要添加多少个括号？

<details>
<summary>Check Solution</summary>

- 若 `s[i]` 与 `s[j]` 匹配：`f[i][j] = f[i+1][j-1]`。
- 无论是否匹配：`f[i][j] = min(f[i][k] + f[k+1][j])`。
- 基准：`f[i][i] = 1`。
</details>

---

## 延伸挑战
- [洛谷 P1880 [NOI1995] 石子合并](https://www.luogu.com.cn/problem/P1880)
- [HDU 3506 Monkey Party](http://acm.hdu.edu.cn/showproblem.php?pid=3506)（四边形不等式优化练习）
