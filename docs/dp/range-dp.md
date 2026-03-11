---
title: 区间 DP
---

import { Maximize2, Layers, Binary, ShieldCheck } from 'lucide-react';

# 区间动态规划 (Range Dynamic Programming)

区间 DP 是以“区间”为研究对象的动态规划模型。其核心思想是将一个大区间的问题分解为若干个小区间的组合，通过由短到长（由内而外）地处理区间，最终得到全局最优解。

---

## <Maximize2 className="inline-block mr-2" /> 1. 状态定义与转移范式

### 状态定义
通常定义 $f[i][j]$ 为区间 $[i, j]$ 的某种最优属性值（如最小代价、最大收益、方案数等）。

### 核心转移逻辑
大区间 $[i, j]$ 的最优解往往由其子区间 $[i, k]$ 与 $[k+1, j]$ 组合而成：
$$f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] \} + w(i, j)$$
其中 $w(i, j)$ 表示将两个子区间合并为大区间的额外代价。

### 计算顺序 (The Golden Rule)
区间 DP 的枚举顺序必须保证**在计算大区间时，其包含的所有小区间已计算完毕**。
- **推荐顺序**：外层枚举区间长度 $len \in [1, n]$，内层枚举左端点 $i$，计算右端点 $j = i + len - 1$。

---

## <Layers className="inline-block mr-2" /> 2. 经典模型：石子合并 (Stone Merging)

**问题描述**：$n$ 堆石子排成一排，每次可将相邻的两堆合并，合并代价为两堆石子数之和。求将所有石子合并为一堆的最小总代价。

### 状态设计
- $f[i][j]$：合并第 $i$ 堆到第 $j$ 堆石子的最小代价。
- $sum[i]$：前缀和，用于快速计算区间 $[i, j]$ 的石子总数（即合并代价）。

### 转移方程
$$f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] \} + \sum_{p=i}^j a_p$$

### 复杂度分析
- **状态数**：$O(n^2)$。
- **单次转移**：$O(n)$（枚举 $k$）。
- **总时间复杂度**：$O(n^3)$。
- **空间复杂度**：$O(n^2)$。

---

## <Binary className="inline-block mr-2" /> 3. 进阶：环形区间 DP

若石子排成一个圈，第 $n$ 堆与第 $1$ 堆相邻，如何处理？

**通用技巧：断环成链**
将原序列复制一份接在末尾，构造长度为 $2n$ 的序列。
1. 在长度为 $2n$ 的序列上进行区间 DP。
2. 最终结果为 $\min_{1 \le i \le n} \{ f[i][i+n-1] \}$。

---

## <ShieldCheck className="inline-block mr-2" /> 综合练习与强化

### 练习 1：矩阵链乘法 (Matrix Chain Multiplication)
给定 $n$ 个矩阵，求计算它们的乘积所需的最少标量乘法次数。

<details>
<summary>Check Solution</summary>

**推导**：
设矩阵 $A_i$ 的规模为 $p_{i-1} \times p_i$。
$f[i][j] = \min_{i \le k < j} \{ f[i][k] + f[k+1][j] + p_{i-1} p_k p_j \}$
- $f[i][i] = 0$。

```cpp
for (int len = 2; len <= n; len++) {
    for (int i = 1; i <= n - len + 1; i++) {
        int j = i + len - 1;
        f[i][j] = INF;
        for (int k = i; k < j; k++) {
            f[i][j] = min(f[i][j], f[i][k] + f[k+1][j] + p[i-1]*p[k]*p[j]);
        }
    }
}
```
</details>

### 练习 2：凸多边形三角剖分 (Polygon Triangulation)
给定 $N$ 个顶点的凸多边形，将其划分为 $N-2$ 个三角形，使得三角形权值之和最小。

<details>
<summary>Check Solution</summary>

**状态**：$f[i][j]$ 表示剖分由顶点 $V_i, V_{i+1}, \dots, V_j$ 组成的多边形的最小权值。
**转移**：枚举划分点 $k \in (i, j)$，形成三角形 $\triangle V_i V_k V_j$。
$f[i][j] = \min_{i < k < j} \{ f[i][k] + f[k][j] + w(i, k, j) \}$
注意：此处的 $w(i, k, j)$ 取决于具体定义（如周长、面积、顶点乘积等）。
</details>

---

## 延伸挑战
- [洛谷 P1063 能量项链](https://www.luogu.com.cn/problem/P1063)（环形区间 DP）
- [洛谷 P1880 石子合并](https://www.luogu.com.cn/problem/P1880)（环形 + 最大最小）
- [洛谷 P3205 合唱队形](https://www.luogu.com.cn/problem/P3205)（双端插入型区间 DP）
