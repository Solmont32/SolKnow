---
title: 概率、随机化算法与期望建模
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { motion } from 'framer-motion';
import { Sigma, FunctionSquare, Target, Zap, Binary, Infinity, Cpu, Code2, Hash, Layers, MoveRight, Search, Box, Component } from 'lucide-react';

# 概率、随机化算法与期望建模 (Probability & Expectation)

<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
className="text-gray-600 dark:text-gray-400 mb-8">

本篇章构建了从离散概率基础到复杂状态空间期望建模的完备体系。我们将深入探讨期望的线性性、条件期望、Min-Max 容斥以及随机化算法在处理大数问题中的工业级应用。
</motion.div>

---

## 1. 期望的线性性与指示变量

### 1.1 期望线性性的严密证明

**定理**：对于任意随机变量 $X, Y$，均有 $E[X+Y] = E[X] + E[Y]$。
**证明**：
$E[X+Y] = \sum_x \sum_y (x+y) P(x, y) = \sum_x x \sum_y P(x, y) + \sum_y y \sum_x P(x, y) = E[X] + E[Y]$。
该性质的强大之处在于其**不依赖变量间的独立性**。

### 1.2 指示随机变量 (Indicator Random Variables)

对于事件 $A$，定义指示变量 $I\{A\} = \begin{cases} 1 & A \text{ 发生} \\ 0 & A \text{ 未发生} \end{cases}$。
**性质**：$E[I\{A\}] = P(A)$。
**应用示例：随机排列中的逆序对期望**：
设 $X_{i,j}$ 为位置 $i, j$ 构成逆序对的指示变量。由于对称性，$P(X_{i,j}=1) = 1/2$。
则总逆序对数 $X = \sum_{i<j} X_{i,j}$。
$E[X] = \sum_{i<j} E[X_{i,j}] = \binom{n}{2} \cdot \frac{1}{2} = \frac{n(n-1)}{4}$。

### 1.3 全期望公式 (Law of Total Expectation)

$E[X] = E[E[X|Y]] = \sum_y E[X|Y=y] P(Y=y)$。
这在解决多阶段随机过程中极度有效。

---

## 2. 随机化算法与收敛分析

### 2.1 随机增量法 (Randomized Incremental Construction)

**分析框架**：
以**最小覆盖圆**为例。若随机打乱点集顺序，则第 $i$ 个点在前面的最小覆盖圆外的概率为 $3/i$。
由此推导，算法的期望复杂度为 $\sum O(1) \cdot \frac{3}{i} \text{ (内部递归)} = O(n)$。

### 2.2 模拟退火 (Simulated Annealing)

**接受准则**：Metropolis 准则。
**收敛性**：若降温系数 $\Delta T \approx 1$ 且初温足够高，根据马尔可夫链理论，系统将收敛到 Boltzmann 分布，即最低能量态（全局最优）的概率最大。

---

## 3. 期望 DP 与状态消元

对于带有环的状态转移 $E_u = \sum P_{uv} E_v + W_{uv}$，通常有两种处理方式：
1. **高斯消元**：处理一般图，$O(n^3)$。
2. **树形递推**：对于树结构，设 $E_u = A_u E_{fa} + B_u$，利用子节点信息递推 $A_u, B_u$，$O(n)$。

### 3.1 马尔可夫链状态转移校验 (Markov Chain Validation)

**状态转移矩阵 $P$**：
设 $P_{ij} = P(X_{t+1}=j \mid X_t=i)$，则 $P$ 为随机矩阵（行和为 1）。
**稳态分布证明 (Stationary Distribution)**：
若 $\pi P = \pi$，且 $\sum \pi_i = 1$，则称 $\pi$ 为稳态分布。
1. **存在性**：根据 Perron-Frobenius 定理，随机矩阵 $P$ 的最大特征值为 1，对应的左特征向量即为稳态。
2. **唯一性与收敛性**：若马尔可夫链满足**不可约性 (Irreducibility)** 和 **非周期性 (Aperiodicity)**，则从任意初始分布 $\pi^{(0)}$ 出发，均有 $\lim_{n \to \infty} \pi^{(0)} P^n = \pi$。

**校验方法**：
对于大规模离散系统，可使用矩阵快速幂 $P^{2^k}$ 或解线性方程组 $(I - P^T)\pi = 0$ 进行数值验证或精确解析。

---

## 4. 综合练习与 C++ 解答

### 练习 1：[P1850] 换教室 (期望 DP)

$n$ 个时段，申请第 $i$ 个时段成功的概率为 $k[i]$，求最小期望路程。

<details>
<summary>Check Solution (C++)</summary>

```cpp
// f[i][j][0/1] 前 i 节课换 j 次，第 i 节是否换
for (int i = 2; i <= n; i++) {
    for (int j = 0; j <= m; j++) {
        f[i][j][0] = min(f[i - 1][j][0] + dist[c[i - 1]][c[i]], 
                         f[i - 1][j][1] + k[i - 1] * dist[d[i - 1]][c[i]] + (1 - k[i - 1]) * dist[c[i - 1]][c[i]]);
        if (j > 0)
            f[i][j][1] = min(f[i - 1][j - 1][0] + k[i] * dist[c[i - 1]][d[i]] + (1 - k[i]) * dist[c[i - 1]][c[i]],
                             f[i - 1][j - 1][1] + k[i - 1] * k[i] * dist[d[i - 1]][d[i]] 
                                              + k[i - 1] * (1 - k[i]) * dist[d[i - 1]][c[i]]
                                              + (1 - k[i - 1]) * k[i] * dist[c[i - 1]][d[i]]
                                              + (1 - k[i - 1]) * (1 - k[i]) * dist[c[i - 1]][c[i]]);
    }
}
```

</details>

### 练习 2：[P4316] 绿豆蛙的归宿 (DAG 期望)

给定一个 DAG，起点 1，终点 $n$，求从 1 到 $n$ 的期望路径长度。

<details>
<summary>Check Solution (C++)</summary>

```cpp
// 拓扑排序 + 倒推
for (int i = n; i >= 1; i--) {
    int u = q[i];
    for (int j = h[u]; ~j; j = ne[j]) {
        int v = e[j];
        f[u] += (f[v] + w[j]) / out_degree[u];
    }
}
```

</details>

### 练习 3：[P3803] 最小覆盖圆 (随机增量)

给定 $n$ 个点，求覆盖所有点的最小圆。

<details>
<summary>Check Solution (C++)</summary>

```cpp
random_shuffle(p + 1, p + n + 1);
Circle c = {p[1], 0};
for (int i = 2; i <= n; i++) {
    if (dist(c.o, p[i]) > c.r + eps) {
        c = {p[i], 0};
        for (int j = 1; j < i; j++) {
            if (dist(c.o, p[j]) > c.r + eps) {
                c.o = {(p[i].x + p[j].x) / 2, (p[i].y + p[j].y) / 2};
                c.r = dist(p[i], p[j]) / 2;
                for (int k = 1; k < j; k++) {
                    if (dist(c.o, p[k]) > c.r + eps)
                        c = get_circle(p[i], p[j], p[k]);
                }
            }
        }
    }
}
```

</details>

### 练习 4：[P4550] 收集邮票 (期望平方建模)

有 $n$ 种邮票，第 $i$ 次购买需支付 $i$ 元，求收集全套的期望花费。
**解析**：设 $f[i]$ 为收集 $i$ 种到 $n$ 种的期望步数，$g[i]$ 为期望花费。
$g[i] = \frac{i}{n}(g[i] + f[i] + 1) + \frac{n-i}{n}(g[i+1] + f[i+1] + 1)$。

### 练习 5：[CF 235B] Let's Play Osu! (期望线性性应用)

给定 $n$ 次点击成功的概率，$k$ 连击得分为 $k^2$，求期望得分。
**解析**：维护 $E[L]$ 和 $E[L^2]$。$E[L_i] = p_i(E[L_{i-1}] + 1)$。
$E[L_i^2] = p_i(E[(L_{i-1}+1)^2]) = p_i(E[L_{i-1}^2] + 2E[L_{i-1}] + 1)$。

### 练习 6：[P3232] 游走 (高斯消元求期望)

无向图，求边权分配使得期望总得分最小。
**解析**：先求点被经过的期望次数 $f[u] = \sum_{v \in adj(u)} \frac{f[v]}{d(v)}$。然后计算边的期望次数 $g(u, v) = \frac{f[u]}{d(u)} + \frac{f[v]}{d(v)}$。贪心分配权值。

### 练习 7：[ABC 297G] Constrained Nim 2 (马尔可夫链稳态思想)

虽然 Nim 是组合博弈，但状态转移分析可抽象为马尔可夫过程。考虑从 $i$ 转移到 $j$ 的路径，求 $SG(n)$。

<details>
<summary>Check Solution (矩阵快速幂求稳态/转移 C++)</summary>

```cpp
// 示例：计算状态转移矩阵的 n 次幂以达到稳态
struct Matrix {
    double mat[MAXN][MAXN];
    Matrix() { memset(mat, 0, sizeof mat); }
    Matrix operator * (const Matrix &b) const {
        Matrix res;
        for (int i = 0; i < n; i++)
            for (int k = 0; k < n; k++)
                for (int j = 0; j < n; j++)
                    res.mat[i][j] += mat[i][k] * b.mat[k][j];
        return res;
    }
};

Matrix qpow(Matrix a, ll b) {
    Matrix res; for (int i = 0; i < n; i++) res.mat[i][i] = 1;
    while (b) {
        if (b & 1) res = res * a;
        a = a * a;
        b >>= 1;
    }
    return res;
}
```

</details>

<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
className="mt-12 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">

<Infinity className="text-purple-500 mb-2" />
**大师寄语**：在不确定性的迷雾中，期望是我们唯一的罗盘。只要步数足够多，大数定律终将让随机回归必然。
</motion.div>

