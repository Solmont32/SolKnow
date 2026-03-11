---
title: 概率、随机化算法与期望建模
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { motion } from 'framer-motion';
import { Sigma, FunctionSquare, Target, Zap, Binary, Infinity, Cpu, Code2, Hash, Layers, MoveRight, Search } from 'lucide-react';

# 概率、随机化算法与期望建模 (Probability & Expectation)

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="text-gray-600 dark:text-gray-400 mb-8"
>
本篇章构建了从离散概率基础到复杂状态空间期望建模的完备体系。我们将深入探讨期望的线性性、条件期望以及随机化算法在处理大数问题中的工业级应用。
</motion.div>

---

## 1. 期望的线性性与指示变量

### 1.1 核心定理
对于任意随机变量 $X_1, X_2, \dots, X_n$，有：
$$E\left[\sum_{i=1}^n X_i\right] = \sum_{i=1}^n E[X_i]$$
**注意**：该性质不需要变量相互独立。

### 1.2 指示变量法 (Indicator Variables)
定义 $I_A$ 为事件 $A$ 的指示变量，若 $A$ 发生则 $I_A=1$，否则 $I_A=0$。
则 $E[I_A] = P(A)$。

---

## 2. 经典模型推导

### 2.1 赠券收集问题 (Coupon Collector's Problem)
有 $n$ 种不同的赠券，每步随机获得一种。求收集齐所有赠券的期望步数 $E$。
**推导**：
设已收集 $i$ 种，收集到第 $i+1$ 种新赠券的概率为 $p_i = \frac{n-i}{n}$。
这是一个几何分布，期望步数为 $1/p_i = \frac{n}{n-i}$。
总期望 $E = \sum_{i=0}^{n-1} \frac{n}{n-i} = n \sum_{j=1}^n \frac{1}{j} \approx n \ln n$。

### 2.2 随机游走 (Random Walk)
在一维数轴上，从 0 出发，每次 50% 向左/向右走一步，到达 $N$ 或 $-M$ 停止。
**结论**：到达 $N$ 的概率为 $\frac{M}{N+M}$，步数期望为 $NM$。

---

## 3. 期望 DP 与高斯消元

对于有环的状态转移图，期望 DP 需转化为线性方程组。
例：$E_u = 1 + \sum_{v \in Adj(u)} P(u \to v) E_v$。

<details>
<summary>C++ 高斯消元求解期望方程组模板</summary>

```cpp
void gauss(int n) {
    for (int i = 1; i <= n; i++) {
        int r = i;
        for (int j = i + 1; j <= n; j++)
            if (fabs(a[j][i]) > fabs(a[r][i])) r = j;
        swap(a[i], a[r]);
        double div = a[i][i];
        for (int j = i; j <= n + 1; j++) a[i][j] /= div;
        for (int j = 1; j <= n; j++)
            if (i != j) {
                double temp = a[j][i];
                for (int k = i; k <= n + 1; k++) a[j][k] -= a[i][k] * temp;
            }
    }
}
```
</details>

---

## 4. 综合练习与解答

### 例题 1：[HNOI2013] 游走
给定一个无向简单图，从 1 号点出发，随机游走，到 $n$ 号点停止。给每条边编号，使得期望总得分最小（得分 = 边编号 $\times$ 经过次数）。
**解析**：
1. 求每个点的期望经过次数 $E_u$（高斯消元）。
2. 每条边 $(u, v)$ 的期望经过次数 $E_e = \frac{E_u}{deg(u)} + \frac{E_v}{deg(v)}$。
3. 对 $E_e$ 贪心排序，赋小值给大的 $E_e$。

<details>
<summary>Check Solution (方程组构造)</summary>

```cpp
// 对于点 u (u < n)
a[u][u] = 1.0;
for (int v : adj[u]) {
    if (v != n) a[u][v] = -1.0 / deg[v];
}
if (u == 1) a[u][n+1] = 1.0; // 起点
```
</details>

### 例题 2：[SHOI2014] 概率充电器
$n$ 个点由 $n-1$ 条边连接成树，每个点 $i$ 有 $q_i$ 概率直接充电，每条边 $(u, v)$ 有 $p_{uv}$ 概率导电。求期望充电点数。
**解析**：期望线性性 $\implies E = \sum P(\text{点 } i \text{ 有电})$。
$P(i \text{ 有电}) = 1 - P(i \text{ 没电})$。
$i$ 没电 $\iff$ $i$ 没直接充电且所有邻居都没能给它充电。利用树形 DP 两次扫描（自底向上 + 自顶向下）。

<details>
<summary>Check Solution (核心转移)</summary>

```cpp
// f[u] 表示 u 不被其子树充电的概率
f[u] = (1 - q[u]);
for (int v : son[u]) {
    f[u] *= (f[v] + (1 - f[v]) * (1 - p[u][v]));
}
```
</details>

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="mt-12 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800"
>
<Infinity className="text-purple-500 mb-2" />
**大师寄语**：在不确定性的迷雾中，期望是我们唯一的罗盘。只要步数足够多，大数定律终将让随机回归必然。
</motion.div>
