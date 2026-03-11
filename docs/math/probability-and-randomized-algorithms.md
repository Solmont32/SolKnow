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
本篇章构建了从离散概率基础到复杂状态空间期望建模的完备体系。我们将深入探讨期望的线性性、条件期望、Min-Max 容斥以及随机化算法在处理大数问题中的工业级应用。
</motion.div>

---

## 1. 期望的线性性与容斥

### 1.1 核心定理
对于任意随机变量 $X_1, X_2, \dots, X_n$，有 $E[\sum X_i] = \sum E[X_i]$。
对于独立事件 $A, B$，有 $P(A \cap B) = P(A)P(B)$，$E[XY] = E[X]E[Y]$。

### 1.2 Min-Max 容斥 (Min-Max Expectation)
对于集合 $S$ 中的随机变量，设其出现时间为 $X_i$：
$$ E[\max(S)] = \sum_{\emptyset \neq T \subseteq S} (-1)^{|T|-1} E[\min(T)] $$
**意义**：将“出现最晚”的问题转化为“出现最早”的问题，常用于状态压缩 DP。

---

## 2. 随机化算法 (Randomized Algorithms)

### 2.1 Miller-Rabin 素性测试
利用费马小定理 $a^{p-1} \equiv 1 \pmod p$ 与二次探测定理进行概率性判素。
复杂度：$O(k \log^3 n)$，其中 $k$ 为测试底数个数。

### 2.2 Pollard-Rho 大整数分解
利用生日悖论在 $O(n^{1/4} \log n)$ 时间内寻找 $n$ 的一个非平凡因子。
核心：$x_{i} = (x_{i-1}^2 + c) \pmod n$，检查 $\gcd(|x_i - x_j|, n) > 1$。

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

### 练习 1：[HAOI2015] 按位或 (Min-Max 容斥)
给定 $n$ 个数位，每秒以概率 $p_i$ 选出一个集合，求所有位都被选中的期望时间。
**解析**：设 $S$ 为所有数位的集合。求 $E[\max(S)]$。
$E[\min(T)]$ 表示 $T$ 中任一位被选中的期望时间，即 $E[\min(T)] = \frac{1}{\sum_{U \cap T \neq \emptyset} p_U} = \frac{1}{1 - \sum_{U \subseteq \complement T} p_U}$。
内层求和可用 FWT (Fast Walsh-Hadamard Transform) 优化。

<details>
<summary>Check Solution (代码核心)</summary>

```cpp
// 1. FWT 求出子集和
fwt(p, 1);
// 2. Min-Max 容斥
for (int i = 1; i < (1 << n); i++) {
    double sum_p = p[((1 << n) - 1) ^ i];
    if (1.0 - sum_p < eps) continue; // 无法达到此状态
    double e_min = 1.0 / (1.0 - sum_p);
    if (cnt[i] & 1) ans += e_min;
    else ans -= e_min;
}
```
</details>

### 练习 2：[CQOI2012] 模拟退火 (Pollard-Rho 应用)
*注：此题实为分解质因数。*
给定 $N \le 10^{18}$，求其最大质因子。

<details>
<summary>Check Solution (Pollard-Rho 核心)</summary>

```cpp
long long pollard_rho(long long n) {
    long long x = rand() % (n - 2) + 2, y = x, c = rand() % (n - 1) + 1, d = 1;
    while (d == 1) {
        x = (__int128(x) * x + c) % n;
        y = (__int128(y) * y + c) % n;
        y = (__int128(y) * y + c) % n;
        d = gcd(abs(x - y), n);
        if (d == n) return pollard_rho(n); // 失败重试
    }
    return d;
}
```
</details>

### 练习 3：[SHOI2014] 概率充电器
$n$ 个点由 $n-1$ 条边连接成树，每个点 $i$ 有 $q_i$ 概率直接充电，每条边 $(u, v)$ 有 $p_{uv}$ 概率导电。求期望充电点数。
**解析**：期望线性性 $\implies E = \sum P(\text{点 } i \text{ 有电})$。
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
