---
title: 组合计数与博弈论：从计数原理、生成函数到博弈平衡
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { motion } from 'framer-motion';
import { Sigma, FunctionSquare, Layers, Binary, Infinity, Zap, Cpu, Gamepad2, Target, Sword, FlaskConical, Scale } from 'lucide-react';

# 组合计数与博弈论 (Combinatorics & Game Theory)

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="text-gray-600 dark:text-gray-400 mb-8"
>
本篇文档系统化构建了从基础计数原理、容斥原理、生成函数，到 Pólya 计数理论与公平组合游戏（ICG）的完备知识体系。
</motion.div>

---

## 第一部分：组合计数进阶

### 1. 组合恒等式与推导
- **帕斯卡恒等式**：$\binom{n}{k} = \binom{n-1}{k} + \binom{n-1}{k-1}$。
- **范德蒙德卷积 (Vandermonde's Identity)**：$\sum_{i=0}^k \binom{n}{i} \binom{m}{k-i} = \binom{n+m}{k}$。
  - **组合证明**：从 $n$ 个红球和 $m$ 个蓝球中选 $k$ 个球，等价于分别从红球选 $i$ 个，蓝球选 $k-i$ 个。
- **二项式反演**：$f_n = \sum_{i=0}^n \binom{n}{i} g_i \iff g_n = \sum_{i=0}^n (-1)^{n-i} \binom{n}{i} f_i$。

### 2. 斯特林数 (Stirling Numbers)
- **第一类 (轮换)**：$\left[ \begin{smallmatrix} n \\ k \end{smallmatrix} \right]$。
  递推：$\left[ \begin{smallmatrix} n \\ k \end{smallmatrix} \right] = \left[ \begin{smallmatrix} n-1 \\ k-1 \end{smallmatrix} \right] + (n-1) \left[ \begin{smallmatrix} n-1 \\ k \end{smallmatrix} \right]$。
- **第二类 (子集)**：$\left\{ \begin{smallmatrix} n \\ k \end{smallmatrix} \right\}$。
  递推：$\left\{ \begin{smallmatrix} n \\ k \end{smallmatrix} \right\} = \left\{ \begin{smallmatrix} n-1 \\ k-1 \end{smallmatrix} \right\} + k \left\{ \begin{smallmatrix} n-1 \\ k \end{smallmatrix} \right\}$。
  **通项公式**：$\left\{ \begin{smallmatrix} n \\ k \end{smallmatrix} \right\} = \frac{1}{k!} \sum_{i=0}^k (-1)^{k-i} \binom{k}{i} i^n$。

### 3. 生成函数 (Generating Functions)
- **普通生成函数 (OGF)**：$A(x) = \sum a_i x^i$。适用于无序选取。
- **指数生成函数 (EGF)**：$\hat{A}(x) = \sum a_i \frac{x^i}{i!}$。适用于排列问题。
- **典型变换**：多重集排列数 $\frac{n!}{n_1! n_2! \dots n_k!}$ 对应 EGF 的项。

---

## 第二部分：博弈论模型系统

### 1. 威佐夫博弈 (Wythoff's Game)
两堆石子 $(a, b)$，每次可从一堆取任意个，或从两堆同时取相同个。
**结论**：若 $\lfloor |a-b| \frac{1+\sqrt{5}}{2} \rfloor = \min(a, b)$，则为 P-position（后手必胜）。
这是 **Beatty 定理** 的一个经典应用。

### 2. 尼姆博弈 (Nim Game) 及其变体
- **标准 Nim**：$SG = a_1 \oplus a_2 \oplus \dots \oplus a_n$。
- **阶梯 Nim**：只考虑奇数阶梯上的石子，将其异或。
- **Anti-Nim**：最后取光者输。
  - 先手必胜当且仅当：
    1. 所有堆石子数均为 1，且异或和为 0。
    2. 存在至少一堆石子数 $>1$，且异或和不为 0。

---

## 第三部分：综合练习与解答

### 例题 1：错位排列 (Derangement)
$n$ 个人持 $n$ 把钥匙，每人都不拿自己钥匙的方案数 $D_n$。
**推导**：$D_n = (n-1)(D_{n-1} + D_{n-2})$。
或者利用容斥原理：$D_n = n! \sum_{i=0}^n \frac{(-1)^i}{i!}$。

<details>
<summary>Check Solution (C++)</summary>

```cpp
long long d[MAXN];
void init(int n) {
    d[1] = 0; d[2] = 1;
    for (int i = 3; i <= n; i++)
        d[i] = (i - 1) * (d[i-1] + d[i-2]) % MOD;
}
```
</details>

### 例题 2：[AHOI2009] 中国象棋 (组合 DP)
在 $n \times m$ 棋盘放若干炮，使得没有任何炮能打到另一个。即每行每列最多放 2 个。
**解析**：设 $f[i][j][k]$ 表示前 $i$ 行，有 $j$ 列放了 1 个， $k$ 列放了 2 个。

<details>
<summary>Check Solution (递推逻辑)</summary>

```cpp
// 转移考虑第 i 行放 0, 1, 2 个炮
// 放 1 个：放在原先有 0 个的列，或有 1 个的列
f[i][j][k] = (f[i][j][k] + f[i-1][j][k]) % MOD; // 不放
if (j >= 1) f[i][j][k] = (f[i][j][k] + f[i-1][j-1][k] * (m - (j-1) - k)) % MOD; // 放 1 个在 0
if (k >= 1) f[i][j][k] = (f[i][j][k] + f[i-1][j+1][k-1] * (j + 1)) % MOD; // 放 1 个在 1
// ... 更多转移
```
</details>

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="mt-12 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800"
>
<Scale className="text-amber-500 mb-2" />
**大师寄语**：组合学让我们学会如何优雅地穷举，而博弈论则教会我们在复杂的决策树中寻找那一抹确定性的微光。
</motion.div>
