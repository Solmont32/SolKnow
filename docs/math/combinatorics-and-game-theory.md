---
title: 组合计数、线性基与博弈论系统
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { motion } from 'framer-motion';
import { Sigma, FunctionSquare, Layers, Binary, Infinity, Zap, Cpu, Gamepad2, Target, Sword, FlaskConical, Scale, Shapes } from 'lucide-react';

# 组合计数与博弈论 (Combinatorics & Game Theory)

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="text-gray-600 dark:text-gray-400 mb-8"
>
本篇文档系统化构建了从基础计数、容斥原理，到线性基、母函数与博弈均衡的完备体系。涵盖了代数恒等式证明与模型转换的核心逻辑。
</motion.div>

---

## 1. 组合计数与生成函数 (Generating Functions)

### 1.1 普通生成函数 (OGF)
对于序列 $a_0, a_1, a_2, \dots$，其 **OGF** 定义为 $A(x) = \sum_{i=0}^\infty a_i x^i$。
- **组合意义**：用于解决**无序**组合问题（如背包、硬币找零、整数拆分）。
- **典型变换**：$\frac{1}{1-x} = \sum_{i=0}^\infty x^i$（代表选取任意个相同物品）。
- **Catalan 数推导**：递推式 $C_{n+1} = \sum_{i=0}^n C_i C_{n-i}$ 对应卷积 $C(x) = 1 + x C^2(x)$。

### 1.2 指数生成函数 (EGF)
对于序列 $a_0, a_1, a_2, \dots$，其 **EGF** 定义为 $\hat{A}(x) = \sum_{i=0}^\infty a_i \frac{x^i}{i!}$。
- **组合意义**：用于解决**有序**排列问题。
- **指数性质**：$e^x = \sum_{i=0}^\infty \frac{x^i}{i!}$（代表选取任意个有序物品）。
- **错排问题 (Derangement)**：
  每个元素不能在原位，对应 EGF 为 $D(x) = \frac{e^{-x}}{1-x}$。
  展开得 $d_n = n! \sum_{i=0}^n \frac{(-1)^i}{i!}$。

### 1.3 容斥原理与二项式反演
**二项式反演证明**：
设 $f(n) = \sum_{i=0}^n \binom{n}{i} g(i)$，利用 OGF：$F(x) = \sum f(n) \frac{x^n}{n!}, G(x) = \sum g(n) \frac{x^n}{n!}$。
则 $F(x) = G(x) \cdot e^x \implies G(x) = F(x) \cdot e^{-x}$。
展开即得 $g(n) = \sum_{i=0}^n (-1)^{n-i} \binom{n}{i} f(i)$。

---

## 2. 线性基 (Linear Basis) 进阶

线性基是线性空间在异或运算下的基。

### 2.1 构造与性质
- **插入 (Insert)**：$O(\log V)$。
- **合并 (Merge)**：将一个线性基的所有元素插入另一个，复杂度 $O(\log^2 V)$。
- **查询第 $k$ 小异或和**：
  1. 对线性基进行高斯消元，使其每一位 $p_i$ 的第 $j$ 位 ($j \neq i$) 均为 0。
  2. 设消元后非零位共有 $cnt$ 个，第 $j$ 个非零位为 $d_j$。
  3. 若 $k$ 的二进制第 $j$ 位为 1，则答案异或上 $d_j$。

<details>
<summary>Check Implementation (第 k 小查询)</summary>

```cpp
void rebuild() {
    for (int i = 60; i >= 0; i--)
        for (int j = i - 1; j >= 0; j--)
            if (p[i] >> j & 1) p[i] ^= p[j];
    for (int i = 0; i <= 60; i++)
        if (p[i]) d[cnt++] = p[i];
}
long long query_kth(long long k) {
    if (has_zero) k--; // 处理子集异或和为 0 的情况
    if (k >= (1LL << cnt)) return -1;
    long long res = 0;
    for (int i = 0; i < cnt; i++)
        if (k >> i & 1) res ^= d[i];
    return res;
}
```
</details>

---

## 3. 博弈论模型系统

### 3.1 斯普拉格-格隆迪定理 (SG Theorem)
任何公平组合游戏（ICG）都可以转化为 Nim 游戏的一个堆。
- **mex 函数**：$mex(S)$ 表示集合 $S$ 中未出现的最小非负整数。
- **SG 值**：$SG(u) = mex(\{SG(v) \mid u \to v\})$。
- **组合游戏**：$SG(G_1 + G_2) = SG(G_1) \oplus SG(G_2)$。

### 3.2 常见博弈变体
- **Anti-Nim**：取走最后一颗石子的人输。
  结论：当 (所有堆 SG 异或和不为 0 且存在一堆石子 > 1) 或 (所有堆 SG 异或和为 0 且所有堆石子均为 1) 时先手必胜。

---

## 4. 综合练习与 C++ 解答

### 练习 1：[WC2011] 最大XOR和路径
给定一个无向图，求从 1 到 $n$ 的路径上边权异或和的最大值。
**解析**：任选一条 1 到 $n$ 的路径，路径上的异或和可以通过异或上图中的任何一个环来改变。
1. 找出图中所有的基本环。
2. 将环的异或和插入线性基。
3. 贪心查询路径异或和的最大值。

<details>
<summary>Check Solution (C++)</summary>

```cpp
void dfs(int u, long long res) {
    vis[u] = 1; dist[u] = res;
    for (auto edge : adj[u]) {
        if (!vis[edge.v]) dfs(edge.v, res ^ edge.w);
        else lb.insert(res ^ edge.w ^ dist[edge.v]);
    }
}
// 主函数调用 lb.query_max(dist[n])
```
</details>

### 练习 2：[CQOI2014] 数三角形
在 $N \times M$ 的网格点中选三个点构成三角形的方案数。
**解析**：总选法 - 三点共线。
三点共线分为：水平、垂直、斜线。
斜线数量利用 $\gcd(\Delta x, \Delta y) - 1$ 计算。

<details>
<summary>Check Solution (思路)</summary>

1. 总方案：$\binom{(N+1)(M+1)}{3}$。
2. 水平共线：$(N+1) \binom{M+1}{3}$。
3. 垂直共线：$(M+1) \binom{N+1}{3}$。
4. 斜线共线：$2 \sum_{i=1}^N \sum_{j=1}^M (N-i+1)(M-j+1)(\gcd(i, j)-1)$。
</details>

### 练习 3：[Luogu P4705] 玩游戏 (生成函数进阶)
给定序列 $A, B$，求对于所有 $k \in [1, L]$，$\frac{1}{nm} \sum_{i=1}^n \sum_{j=1}^m (a_i + b_j)^k \pmod{998244353}$。
**解析**：利用二项式定理展开并转化为 $k$ 次幂和。
$(a_i + b_j)^k = \sum_{p=0}^k \binom{k}{p} a_i^p b_j^{k-p}$。
$\sum_{i, j} (a_i + b_j)^k = \sum_{p=0}^k \binom{k}{p} (\sum a_i^p) (\sum b_j^{k-p})$。
这是一个卷积形式，利用生成函数 $F(x) = \sum \frac{\sum a_i^p}{p!} x^p$ 加速计算。

<details>
<summary>Check Solution (核心思想)</summary>

1. 计算 $k$ 次幂和：利用 $S(x) = \sum \frac{1}{1 - a_i x} = \sum \frac{-a_i}{x^{-1} - a_i} = \frac{d}{dx} \ln \prod (1 - a_i x)$。
2. 利用分治 NTT 或 多项式求逆/对数 求解 $S(x)$。
3. 对 $A, B$ 分别求出幂和序列，卷积求答案。
</details>

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="mt-12 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800"
>
<Shapes className="text-indigo-500 mb-2" />
**大师寄语**：组合数学不仅仅是计数，更是寻找集合间的映射。博弈论则告诉我们，所有的竞争在某种高度上都是一种代数结构的对抗。
</motion.div>
