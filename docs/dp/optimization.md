---
title: DP 优化策略
---

import { TrendingUp, Maximize2, Zap, GitBranch, LineChart, Activity, ShieldCheck, Microscope } from 'lucide-react';

# 动态规划优化策略 (DP Optimization)

在高阶算法竞赛中，原生的 DP 方程往往因 $O(N^2)$ 或 $O(N^3)$ 的复杂度而无法满足性能要求。优化 DP 的本质在于：**利用问题的数学性质（单调性、凸性、包含关系）减少冗余的状态转移。**

---

## <Microscope className="inline-block mr-2" /> 1. 单调队列优化 (Monotonic Queue)

**适用范式**：
$$f[i] = \min_{i-k \le j < i} \{ f[j] + \text{cost}(j) \} + \text{cost}(i)$$
当转移代价中 $j$ 与 $i$ 的项可以完全分离，且 $j$ 的取值范围是一个随 $i$ 移动的滑动窗口时。
- **优化逻辑**：使用单调队列维护窗口内 $f[j] + \text{cost}(j)$ 的最优值。
- **复杂度**：$O(N^2) \to O(N)$。

---

## <LineChart className="inline-block mr-2" /> 2. 斜率优化 (Slope Optimization / CHT)

**适用范式**：转移方程包含 $i$ 与 $j$ 的**混合项**。
$$f[i] = \min_{j < i} \{ f[j] - a[i] \cdot b[j] \} + c[i]$$
我们将该式改写为直线方程：$f[j] = a[i] \cdot b[j] + f[i] - c[i]$。
- **几何解释**：将每一个决策点看作平面上的一个点 $(b[j], f[j])$。求 $f[i]$ 相当于用一条斜率为 $a[i]$ 的直线去截这些点，使得截距 $b = f[i] - c[i]$ 最小。
- **维护方式**：
  - 若 $a[i]$ 和 $b[j]$ 均单调，使用单调队列维护凸包 ($O(N)$)。
  - 若 $b[j]$ 单调但 $a[i]$ 不单调，使用凸包上二分 ($O(N \log N)$)。
  - 若均不单调，使用 **李超线段树 (Li-Chao Tree)** 或 CDQ 分治。

---

## <Zap className="inline-block mr-2" /> 3. 四边形不等式优化 (Quadrangle Inequality)

**核心判定**：若代价函数 $w(i, j)$ 满足四边形不等式：
$$w(a, c) + w(b, d) \le w(a, d) + w(b, c) \quad (a < b < c < d)$$
且满足区间包含单调性 $w(b, c) \le w(a, d)$。

### 模型一：1D / 1D 决策单调性
$$f[i] = \min_{0 \le j < i} \{ f[j] + w(j, i) \}$$
**性质**：若 $w$ 满足四边形不等式，则最优决策点 $p[i]$ 随 $i$ 单调递增。
- **实现**：二分队列/栈维护每个决策点的贡献范围 ($O(N \log N)$)。

### 模型二：2D / 1D 区间型优化
$$f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] \} + w(i, j)$$
**定理**：最优决策点 $s[i][j]$ 满足：$s[i][j-1] \le s[i][j] \le s[i+1][j]$。
- **实现**：直接在三层循环中限制 $k$ 的范围。
- **复杂度**：$O(N^3) \to O(N^2)$。

---

## <Activity className="inline-block mr-2" /> 4. 分治优化 (Divide & Conquer)

**适用场景**：层级转移且具备决策单调性。
$$f[k][i] = \min_{0 \le j < i} \{ f[k-1][j] + w(j, i) \}$$
- **策略**：定义 `solve(L, R, pL, pR)` 表示计算当前层区间 $[L, R]$ 的 DP 值，其决策点范围在 $[pL, pR]$。
- **实现**：取 $mid = (L+R)/2$，暴力寻找其最优决策点 $p$，然后递归处理子区间。
- **复杂度**：$O(NK) \to O(NK \log N)$。

---

## <ShieldCheck className="inline-block mr-2" /> 综合练习与强化

### 练习 1：四边形不等式证明基础
证明：若 $w(i, j) = (sum[j] - sum[i])^2$，则 $w$ 满足四边形不等式。

<details>
<summary>Check Solution</summary>

**推导**：
设 $a < b < c < d$，令 $A = sum[a], B = sum[b], C = sum[c], D = sum[d]$。
目标证明：$(C-A)^2 + (D-B)^2 \le (D-A)^2 + (C-B)^2$。
展开并约简后可得：$-2AC - 2BD \le -2AD - 2BC$
即：$AD + BC \le AC + BD \Rightarrow (D-C)(B-A) \ge 0$。
由于 $D > C$ 且 $B > A$，不等式成立。
</details>

### 练习 2：诗人小 G (Binary Search on Decison)
给定 $f[i] = \min \{ f[j] + |(s[i]-s[j]) - L|^P \}$，其中 $P \ge 2$。

<details>
<summary>Check Solution</summary>

**分析**：该代价函数满足四边形不等式，具有决策单调性。
**实现**：维护一个队列，存储若干个三元组 `{j, L, R}`，表示决策点 $j$ 在当前已知的范围内是最优决策点的区间为 $[L, R]$。
每次插入新点 $i$ 时，在队尾通过二分查找确定它能“干掉”哪个旧决策点的区间。
</details>

---

## 延伸挑战
- [洛谷 P3195 玩具装箱](https://www.luogu.com.cn/problem/P3195) (斜率优化)
- [洛谷 P1912 诗人小 G](https://www.luogu.com.cn/problem/P1912) (1D/1D 决策单调性)
- [Codeforces 321E Ciel and Gondolas](https://codeforces.com/contest/321/problem/E) (分治优化)
- [洛谷 P4767 [IOI2000] 邮局](https://www.luogu.com.cn/problem/P4767) (2D/1D 四边形不等式)
