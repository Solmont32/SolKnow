---
title: 区间 DP
---

# 区间动态规划 (Range Dynamic Programming)

区间动态规划主要解决**可以将一段区间拆分为更小的区间并进行合并**的问题。其核心特征是状态定义与区间两端点 $[i, j]$ 直接相关，通常采用“从小区间推导大区间”的策略。

---

## <Microscope className="inline-block mr-2" /> 核心建模范式

### 1. 状态定义 (State Representation)
$f[i][j]$ 表示闭区间 $[i, j]$ 内的最优解。
- **基准状态 (Base Case)**：$f[i][i]$，通常为 0 或初始权值。
- **最终答案**：$f[1][n]$。

### 2. 转移推导逻辑 (Transition Logic)
通过枚举区间内的“分割点” $k$ 来将问题规模缩减：
$$f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] + \text{cost}(i, j) \}$$
其中 $\text{cost}(i, j)$ 是合并两个子区间产生的代价。

---

## <Zap className="inline-block mr-2" /> 四边形不等式优化 (Quadrangle Inequality)

对于上述方程，若代价函数 $w(i, j)$ 满足以下两条数学性质，则可进行显著优化：

1. **区间包含单调性**：若 $[i', j'] \subseteq [i, j]$，则 $w(i', j') \le w(i, j)$。
2. **四边形不等式**：对于 $a < b < c < d$，有 $w(a, c) + w(b, d) \le w(a, d) + w(b, c)$（交叉小于包含）。

### 🚀 优化结论
若 $w$ 满足上述性质，则 $f$ 也满足四边形不等式，且其**最优决策点** $s[i][j]$ 满足：
$$s[i][j-1] \le s[i][j] \le s[i+1][j]$$
**复杂度提升**：利用此性质，枚举 $k$ 的范围被限定在 $[s[i][j-1], s[i+1][j]]$，总复杂度从 **$O(N^3)$ 降至 $O(N^2)$**。

---

## <Activity className="inline-block mr-2" /> 复杂度矩阵

| 模式 | 状态空间 | 转移开销 | 总时间复杂度 | 备注 |
| :--- | :--- | :--- | :--- | :--- |
| **标准区间 DP** | $O(N^2)$ | $O(N)$ | $O(N^3)$ | 常见于石子合并、括号匹配 |
| **四边形不等式优化** | $O(N^2)$ | $O(1)$ (均摊) | $O(N^2)$ | 需要代价函数满足特定性质 |
| **破环成链** | $O((2N)^2)$ | $O(N)$ | $O(N^3)$ | 解决环形结构问题 |

---

## <ShieldCheck className="inline-block mr-2" /> 综合练习与强化

### 练习 1：环形石子合并 (Circular Merging)
如果序列是一个环，如何求合并为一堆的最小代价？

<details>
<summary>Check Solution</summary>

**“破环成链”法**：
1. 将序列复制一份拼接在末尾，构造长度为 $2N$ 的线性链。
2. 在 $2N$ 链上执行标准区间 DP。
3. 最终答案为 $\min_{1 \le i \le n} \{ f[i][i+n-1] \}$。

```cpp
for (int len = 2; len <= n; len++) {
    for (int i = 1; i + len - 1 <= 2 * n; i++) {
        int j = i + len - 1;
        for (int k = i; k < j; k++)
            f[i][j] = min(f[i][j], f[i][k] + f[k+1][j] + sum(i, j));
    }
}
```
</details>

### 练习 2：能量项链 (Matrix Chain Multi. Variant)
涉及珠子合并，每颗珠子有头/尾标记。

<details>
<summary>Check Solution</summary>

本质上是环形矩阵链乘法。
**状态定义**：$f[i][j]$ 为合并 $[i, j]$ 区间珠子释放的最大能量。
**转移**：$f[i][j] = \max_{i \le k < j} \{ f[i][k] + f[k+1][j] + head[i] \cdot tail[k] \cdot tail[j] \}$。
注意：这里的 $tail[j]$ 实际上是第 $j$ 颗珠子的尾标记。
</details>

### 练习 3：括号匹配 (Min Additions)
使字符串变成合法的括号序列最少需要添加多少个括号？

<details>
<summary>Check Solution</summary>

- **状态定义**：$f[i][j]$ 为使 $s[i \dots j]$ 合法所需的最少添加数。
- **转移**：
  1. 若 $s[i]$ 与 $s[j]$ 匹配（如 `(` 与 `)`）：$f[i][j] = f[i+1][j-1]$。
  2. 无论如何：$f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] \}$。
- **基准**：$f[i][i] = 1$。
</details>

---

## 延伸挑战
- [洛谷 P1880 [NOI1995] 石子合并](https://www.luogu.com.cn/problem/P1880)
- [HDU 3506 Monkey Party](http://acm.hdu.edu.cn/showproblem.php?pid=3506)（四边形不等式优化练习）
- [Codeforces 149D Coloring Brackets](https://codeforces.com/problemset/problem/149/D)（区间 DP + 深度约束）
