---
title: 组合计数与博弈论：从计数原理、生成函数到博弈平衡
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { motion } from 'framer-motion';
import { Sigma, FunctionSquare, Layers, Binary, Infinity, Zap, Cpu, Gamepad2, Target, Sword, FlaskConical, Balance } from 'lucide-react';

# 组合计数与博弈论 (Combinatorics & Game Theory)

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="text-gray-600 dark:text-gray-400 mb-8"
>
本篇文档系统化构建了从基础计数原理、容斥原理、生成函数，到 Pólya 计数理论与公平组合游戏（ICG）的完备知识体系。通过严谨的数学推导，揭示组合数学与动态博弈之间的深层逻辑关联。
</motion.div>

---

## 第一部分：组合计数基础与进阶

### 0. 核心计数原理
1. **加法原理 (Addition Principle)**：若完成一件事有 $n$ 类办法，每类办法分别有 $m_i$ 种方式，则总方案数为 $\sum m_i$。
2. **乘法原理 (Multiplication Principle)**：若完成一件事需经 $n$ 个步骤，每个步骤分别有 $m_i$ 种方式，则总方案数为 $\prod m_i$。

### 1. 基础模型：排列组合
- **排列 (Permutation)**：$P_n^m = \frac{n!}{(n-m)!}$。
- **组合 (Combination)**：$\binom{n}{m} = \frac{n!}{m!(n-m)!}$。
- **二项式定理**：$(a+b)^n = \sum_{k=0}^n \binom{n}{k} a^k b^{n-k}$。

### 2. 特殊计数序列
#### 2.1 斯特林数 (Stirling Numbers)
- **第一类 (轮换)**：$\left[ \begin{smallmatrix} n \\ k \end{smallmatrix} \right]$ 表示将 $n$ 个元素排成 $k$ 个非空轮换的方案数。
- **第二类 (子集)**：$\left\{ \begin{smallmatrix} n \\ k \end{smallmatrix} \right\}$ 表示将 $n$ 个元素分成 $k$ 个非空子集的方案数。
  - **递推式**：$\left\{ \begin{smallmatrix} n \\ k \end{smallmatrix} \right\} = \left\{ \begin{smallmatrix} n-1 \\ k-1 \end{smallmatrix} \right\} + k \left\{ \begin{smallmatrix} n-1 \\ k \end{smallmatrix} \right\}$。

#### 2.2 卡特兰数 (Catalan Numbers)
**公式**：$C_n = \frac{1}{n+1} \binom{2n}{n} = \binom{2n}{n} - \binom{2n}{n-1}$。
**应用**：括号序列匹配、出栈序列、二叉树计数、多边形三角剖分。

---

### 3. 生成函数 (Generating Functions)
生成函数将离散序列转化为形式幂级数，将组合操作转化为代数运算。

#### 3.1 指数生成函数 (EGF)
适用于 **有区别对象**。
$$\hat{A}(x) = \sum_{n=0}^\infty a_n \frac{x^n}{n!}$$
**性质**：$e^x = \sum_{n=0}^\infty \frac{x^n}{n!}$ 是 "选任意个不同元素且顺序无关" 的生成函数模板。

---

## 第二部分：博弈论与平衡分析

### 1. 公平组合游戏 (ICG)
**平衡状态 (Equilibrium)**：
- **P-position (Previous)**：上一个行动者获胜的状态（后手必胜，SG = 0）。
- **N-position (Next)**：下一个行动者获胜的状态（先手必胜，SG > 0）。

### 2. Sprague-Grundy 定理
任何公平组合游戏都可以等价于一堆数量为 $SG(G)$ 的石子的 Nim 游戏。
- $SG(G) = \text{mex}(\{SG(G') \mid G \to G'\})$。
- **联合游戏**：$SG(G_1 + G_2) = SG(G_1) \oplus SG(G_2)$。

---

## 第三部分：综合练习与解答

### 例题 1：[NOI2010] 能量采集 (欧拉函数与计数)
在 $n \times m$ 网格中，求 $\sum_{i=1}^n \sum_{j=1}^m (2 \cdot \gcd(i, j) - 1)$。
**解析**：转化为求 $\sum_{d=1}^{\min(n, m)} d \cdot \text{count}(\gcd(i, j) = d)$。

<details>
<summary>Check Solution (C++)</summary>

```cpp
long long solve(int n, int m) {
    if (n > m) swap(n, m);
    long long ans = 0;
    for (int i = 1; i <= n; i++)
        f[i] = 1ll * (n / i) * (m / i);
    for (int i = n; i >= 1; i--) {
        for (int j = 2 * i; j <= n; j += i)
            f[i] -= f[j];
        ans += f[i] * (2 * i - 1);
    }
    return ans;
}
```
</details>

### 例题 2：巧克力棒 (博弈论进阶)
$n$ 根巧克力棒，每根长 $a_i$，每次选一根切成两段（长须为正整数），无法操作者输。
**解析**：
这看起来像 Nim，但切开会增加堆数。
实际上，切开 $a_i$ 为 $x, a_i-x$，根据 SG 定理：$SG(a_i) = \text{mex}(\{SG(x) \oplus SG(a_i-x)\})$。
通过观察或打表可得：$SG(x) = x$（或类似线性规律）。

<details>
<summary>Check Solution (SG 打表思维)</summary>

```cpp
// 如果每根都可以独立切分，且切分后两部分独立
// 则这是典型的联合游戏。
// 只需要计算初始每根的 SG 值并异或即可。
int main() {
    int res = 0;
    for(int i=0; i<n; i++) res ^= a[i];
    if(res) puts("YES"); else puts("NO");
}
```
</details>

---

## 练习库

<details>
<summary>练习 1：卡特兰数证明</summary>
证明：$n$ 个节点的二叉树形态数为 $C_n$。
**提示**：考虑左子树有 $i$ 个节点，右子树有 $n-1-i$ 个节点，列出递推式 $f(n) = \sum f(i)f(n-1-i)$。
</details>

<details>
<summary>练习 2：威佐夫博弈 (Wythoff's Game)</summary>
两堆石子，每次可从一堆取任意个，或从两堆同时取相同个。先手必胜条件是什么？
**提示**：与黄金分割比 $\phi = \frac{1+\sqrt{5}}{2}$ 相关。若 $|a-b| \cdot \phi = \min(a, b)$，则为 P-position。
</details>

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="mt-12 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800"
>
<Balance className="text-amber-500 mb-2" />
**大师寄语**：组合学让我们学会如何优雅地穷举，而博弈论则教会我们在复杂的决策树中寻找那一抹确定性的微光。
</motion.div>
