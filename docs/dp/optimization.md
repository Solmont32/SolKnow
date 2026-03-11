---
title: 动态规划优化策略
---

import { TrendingUp, Maximize2, Zap, GitBranch, LineChart, Activity, ShieldCheck } from 'lucide-react';

# 动态规划优化策略 (DP Optimization)

在面对高复杂度 DP 方程（如 $O(N^2)$ 或 $O(N^3)$）且数据范围较大（$N \ge 10^5$）时，我们必须寻找优化手段。其核心在于 **消除冗余计算**、**利用函数单调性/凸性** 或 **引入高效数据结构**。

---

## <TrendingUp className="inline-block mr-2" /> 1. 单调队列优化 (Monotonic Queue)

**适用范式**：转移方程中 $j$ 的项与 $i$ 的项是独立的。
$$f[i] = \min_{L_i \le j \le R_i} \{ g[j] \} + \text{cost}(i)$$
其中 $L_i, R_i$ 随 $i$ 递增（滑动窗口）。
- **优化逻辑**：利用单调队列维护窗口内的最值，将 $O(N^2)$ 降低至 **$O(N)$**。

---

## <Maximize2 className="inline-block mr-2" /> 2. 斜率优化 (Convex Hull Trick)

**适用场景**：转移方程包含 $i$ 与 $j$ 的**混合乘积项**（Cross Terms）。
$$f[i] = \min_{j < i} \{ f[j] + A(i) \cdot B(j) + C(i) + D(j) \}$$

### 数学推导 (Line Interpretation)
我们将方程改写为直线方程 $y = kx + b$ 的形式，其中：
- $y$ 仅与 $j$ 相关（含 $f[j]$）。
- $x$ 仅与 $j$ 相关。
- $k$ 仅与 $i$ 相关（查询斜率）。
- $b$ 包含待求的 $f[i]$。

**目标**：在坐标平面上维护点集 $(x_j, y_j)$ 的**凸包**。对于特定的斜率 $k_i$，寻找截距 $b$ 的最值。

### 复杂度矩阵 (Optimization Matrix)
| 条件 | 维护方式 | 复杂度 |
| :--- | :--- | :--- |
| **$x_j$ 单调, $k_i$ 单调** | 单调队列维护凸包 | $O(N)$ |
| **$x_j$ 单调, $k_i$ 不单调** | 凸包上二分查找 | $O(N \log N)$ |
| **$x_j$ 不单调** | 李超线段树 / CDQ 分治 | $O(N \log N)$ |

---

## <Activity className="inline-block mr-2" /> 3. 决策单调性优化

**性质定义**：若 $p[i]$ 为 $f[i]$ 的最优决策点 $j$，且满足 $p[1] \le p[2] \le \dots \le p[n]$。

### 判定准则：四边形不等式
若代价函数 $w(j, i)$ 满足四边形不等式：
$$w(a, c) + w(b, d) \le w(a, d) + w(b, c), \quad (a < b < c < d)$$
则该 DP 通常具备决策单调性。

### 优化实现
1. **分治法 (Divide & Conquer)**：适用于层级转移 $f[k][i] = \min \{ f[k-1][j] + w(j, i) \}$。利用 $p[mid]$ 划分 $[L, R]$ 的搜索范围。
2. **二分队列/栈**：适用于 $f[i] = \min_{j < i} \{ f[j] + w(j, i) \}$。维护每个决策点覆盖的区间。

---

## <ShieldCheck className="inline-block mr-2" /> 综合练习与强化

### 练习 1：玩具装箱 (Slope Optimization Basic)
将玩具分段装箱，费用为 $(len-L)^2$。

<details>
<summary>Check Solution</summary>

**推导**：
设 $s[i]$ 为前缀和，$L'$ 为目标长度。
$f[i] = \min_{j < i} \{ f[j] + (s[i] - s[j] + i - j - 1 - L)^2 \}$
令 $X_i = s[i] + i, C = L + 1$。
$f[i] = f[j] + (X_i - X_j - C)^2$
整理得：$\underbrace{f[j] + (X_j + C)^2}_{y_j} = \underbrace{2 X_i}_{k_i} \cdot \underbrace{X_j}_{x_j} + \underbrace{f[i] - X_i^2}_{b_i}$
由于 $X_j$ 和 $k_i$ 均单调递增，使用单调队列维护下凸包即可。
</details>

### 练习 2：邮局 (Quadrangle Inequality)
在 $N$ 个村庄中建 $M$ 个邮局，最小化距离总和。

<details>
<summary>Check Solution</summary>

**状态**：$f[k][i]$ 表示前 $i$ 个村庄建 $k$ 个邮局的最优解。
**性质**：代价函数 $w(j, i)$（在 $[j, i]$ 中建一个邮局的最小距离）满足四边形不等式。
**优化**：使用分治优化或四边形不等式直接优化决策点 $s[k][i]$。
$O(N^2 M) \to O(N^2)$ 或 $O(NM \log N)$。
</details>

---

## 延伸挑战
- [洛谷 P3195 玩具装箱](https://www.luogu.com.cn/problem/P3195)
- [洛谷 P1912 诗人小 G](https://www.luogu.com.cn/problem/P1912)（二分队列维护决策单调性）
- [Codeforces 321E Ciel and Gondolas](https://codeforces.com/contest/321/problem/E)（分治优化）
- [洛谷 P4027 [NOI2007] 货币兑换](https://www.luogu.com.cn/problem/P4027)（CDQ 分治维护动态凸包）
