---
title: 动态规划优化策略
---

# 动态规划优化策略 (Optimization Strategies)

在面对高复杂度 DP 方程（如 $O(N^3)$ 或 $O(N^2)$）且数据范围较大时，我们必须寻找优化手段。核心在于**消除多余计算**、**数据结构维护**或利用**数学性质**。

---

## 1. 单调队列优化 (Monotonic Queue)

适用于转移方程中只包含关于 $j$ 的线性项，且 $j$ 的取值范围随着 $i$ 单调滑动的情况。
$$f[i] = \min_{L_i \le j \le R_i} \{ g[j] \} + \text{cost}(i)$$
**典型案例**：多重背包、滑动窗口最值。

---

## 2. 斜率优化 (Convex Hull Trick)

适用于转移方程可以转化为形如 $y = kx + b$ 的直线方程，通过维护凸壳（Convex Hull）来加速寻找最优决策点。
$$f[i] = \min_{j < i} \{ -k_i \cdot x_j + y_j \} + C_i$$
**关键点**：判断 $k_i$ 与 $x_j$ 的单调性，使用单调队列或平衡树/二分维护。

---

## 3. 四边形不等式 (Quadrangle Inequality)

若转移方程 $f[i][j] = \min \{ f[i][k] + f[k+1][j] + w(i, j) \}$ 的代价函数 $w$ 满足：
$$w(a, c) + w(b, d) \le w(a, d) + w(b, c) \quad (a < b < c < d)$$
则最优断点 $s[i][j]$ 满足：
$$s[i][j-1] \le s[i][j] \le s[i+1][j]$$
**效果**：复杂度从 $O(N^3)$ 降至 $O(N^2)$。

---

## 4. WQS 二分 (Aliens Trick)

适用于“恰好选 $K$ 个”且关于 $K$ 的最优值函数呈现**凸性**的问题。
通过二分一个斜率 $C$（即给选取的每个物品附加一个代价），将“恰好选 $K$ 个”转化为“不限制选取个数，只需统计选了多少个”的简单 DP。

---

## 5. 数据结构优化

利用树状数组 (Fenwick Tree)、线段树 (Segment Tree) 或平衡树维护前缀/区间的最大值或和。
- **LIS 优化**：使用树状数组维护 $f[1 \dots a[i]-1]$ 的最大值。
- **矩阵乘法加速**：常用于处理定长路径计数等问题。

---

## 综合练习

### 练习 1：单调队列应用
给定序列 $A$，找一个长度不超过 $M$ 的连续子段，使其和最大。

<details>
<summary>点击查看解题思路</summary>

转化为前缀和 $S[i] - S[j]$。
$$f[i] = \max_{i-M \le j < i} \{ S[i] - S[j] \} = S[i] - \min_{i-M \le j < i} \{ S[j] \}$$
使用单调队列维护窗口内的 $S[j]$ 最小值。
</details>

### 练习 2：斜率优化基础 (HDU 3507)
打印一串数字，每打一段的开销是 $( \sum c_i )^2 + M$。

<details>
<summary>点击查看解题思路</summary>

$$f[i] = \min_{j < i} \{ f[j] + (S[i] - S[j])^2 + M \}$$
展开平方项并移项：
$$f[j] + S[j]^2 = 2 S[i] S[j] + f[i] - S[i]^2 - M$$
这是一个 $Y = K \cdot X + B$ 的形式，其中 $Y = f[j] + S[j]^2, X = S[j], K = 2 S[i]$。
维护一个下凸壳。
</details>

---

## 延伸挑战
- [洛谷 P3391 任务安排](https://www.luogu.com.cn/problem/P3391)（斜率优化经典）
- [洛谷 P4767 邮局](https://www.luogu.com.cn/problem/P4767)（四边形不等式）
- [洛谷 P5643 连通性限制](https://www.luogu.com.cn/problem/P5643)（Aliens Trick）
