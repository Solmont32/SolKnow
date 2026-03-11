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

> 本篇文档系统化构建了从基础计数、容斥原理，到线性基、母函数与博弈均衡的完备体系。涵盖了代数恒等式证明与模型转换的核心逻辑。
> </motion.div>

---

## 1. 组合计数模型与严密推导

### 1.1 第二类 Stirling 数 (Stirling Numbers of the Second Kind)

$S(n, k)$ 表示将 $n$ 个有区别的球放入 $k$ 个无区别的盒子的方案数（盒子不为空）。
**递推式**：$S(n, k) = S(n-1, k-1) + k \cdot S(n-1, k)$。
**通项公式 (基于容斥)**：
$$ S(n, k) = \frac{1}{k!} \sum\_{i=0}^k (-1)^i \binom{k}{i} (k-i)^n $$
**证明**：先考虑 $k$ 个有区别的盒子。总方案为 $k^n$。设性质 $P_i$ 为第 $i$ 个盒子为空，利用容斥原理求出至少有一个盒子为空的方案数，进而求出所有盒子均不空的方案。最后除以 $k!$。

### 1.2 Catalan 数及其几何证明

$C_n = \frac{1}{n+1} \binom{2n}{n}$。
**折线法推导**：
考虑从 $(0,0)$ 到 $(n,n)$ 且不穿过直线 $y=x$ 的路径数（仅能向右或向上）。
总路径为 $\binom{2n}{n}$。
穿过 $y=x$ 的路径必然接触过 $y=x+1$。将路径在**第一次**接触 $y=x+1$ 后的部分关于 $y=x+1$ 对称。
对称后的终点变为 $(n-1, n+1)$。
不合法路径数 = $\binom{n+n}{n-1} = \binom{2n}{n-1}$。
故 $C_n = \binom{2n}{n} - \binom{2n}{n-1} = \frac{(2n)!}{n!n!} - \frac{(2n)!}{(n-1)!(n+1)!} = \frac{(2n)!}{n!(n+1)!} ( (n+1) - n ) = \frac{1}{n+1} \binom{2n}{n}$。

### 1.3 Prüfer 序列与 Cayley 公式

**Prüfer 序列**：将 $n$ 个有标号节点的树映射为长度 $n-2$ 的序列。

- **Cayley 公式**：$n$ 个点的有标号树共有 $n^{n-2}$ 种。
- **性质**：度数为 $d_i$ 的节点在 Prüfer 序列中出现 $d_i-1$ 次。

---

## 2. 生成函数与多项式计数

### 2.1 普通生成函数 (OGF) 应用

对于硬币找零问题：$A(x) = \prod_{i=1}^k \frac{1}{1-x^{v_i}}$。
$x^n$ 的系数即为找零 $n$ 元的方案数。

### 2.2 指数生成函数 (EGF) 与排列

若有 $k$ 种物品，第 $i$ 种选取 $c_i$ 个且满足约束，则排列方案的 EGF 为 $\prod (\sum_{j \in S_i} \frac{x^j}{j!})$。

---

## 3. 线性基与博弈论进阶

### 3.1 线性基性质

线性基是线性空间在异或运算下的基，支持 $O(\log V)$ 插入与 $O(\log V)$ 最大值查询。
**性质**：线性基中的元素异或出的结果集合与原数集异或出的结果集合完全相同。

### 3.2 Nim 游戏必胜策略证明

定理：Nim 游戏先手必胜当且仅当 $a_1 \oplus a_2 \oplus \dots \oplus a_n \neq 0$。
**证明**：

1. **终局**：所有 $a_i=0$，异或和为 0，先手必败。
2. **异或和不为 0 时**：设异或和为 $S \neq 0$。取 $S$ 的最高位 $k$，必存在 $a_i$ 的第 $k$ 位为 1。令 $a_i' = a_i \oplus S < a_i$。将 $a_i$ 变为 $a_i'$ 后，新的异或和为 $S \oplus a_i \oplus a_i' = 0$。
3. **异或和为 0 时**：改变任意一堆 $a_i$ 为 $a_i'$，新的异或和 $0 \oplus a_i \oplus a_i' \neq 0$。

---

## 4. 综合练习与 C++ 解答

### 练习 1：[TJOI2015] 配合 (Stirling 数 + 容斥)

将 $n$ 个有标号球放入 $m$ 个有标号盒子，每个盒子至少有 $k$ 个球。
**解析**：使用 EGF。每个盒子的生成函数为 $F(x) = \sum_{i=k}^\infty \frac{x^i}{i!}$。答案为 $n! [x^n] F(x)^m$。

### 练习 2：[HNOI2008] 越狱 (基础计数)

$m$ 种宗教，$n$ 个房间，求至少有两个相邻房间宗教相同的方案数。
**解析**：总方案 $m^n$。所有相邻都不同方案：$m(m-1)^{n-1}$。答案：$m^n - m(m-1)^{n-1}$。

<details>
<summary>Check Solution (C++)</summary>

```cpp
long long qpow(long long a, long long b) {
    long long res = 1;
    a %= 100003;
    while (b) {
        if (b & 1) res = res * a % 100003;
        a = a * a % 100003;
        b >>= 1;
    }
    return res;
}
```

</details>

### 练习 3：[BZOJ 3167] 拓扑排序计数 (树形 DP + 组合)

给定一棵树，边有方向，求拓扑序个数。
**解析**：设 $f[u][i]$ 表示以 $u$ 为根的子树，拓扑序中 $u$ 排在第 $i$ 位的方案数。转移时利用组合数合并子树序。

### 练习 4：[WC2011] 最大XOR和路径 (线性基应用)

给定一个无向图，求从 1 到 $n$ 的路径上边权异或和的最大值。
**解析**：任选一条路径，通过异或上图中的环来改变。环的异或和插入线性基，贪心查询最大值。

### 练习 5：[CQOI2014] 数三角形 (几何计数)

在 $N \times M$ 的网格点中选三个点构成三角形的方案数。
**解析**：总方案 $\binom{(N+1)(M+1)}{3}$ 减去共线情况（水平、垂直、斜线）。

### 练习 6：[Luogu P4705] 玩游戏 (生成函数进阶)

求对于所有 $k \in [1, L]$，$\frac{1}{nm} \sum_{i=1}^n \sum_{j=1}^m (a_i + b_j)^k \pmod{998244353}$。
**解析**：利用二项式定理展开并转化为 $k$ 次幂和卷积，使用多项式对数/求逆加速。

<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
className="mt-12 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800"

> <Shapes className="text-indigo-500 mb-2" />
> **大师寄语**：组合数学不仅仅是计数，更是寻找集合间的映射。博弈论则告诉我们，所有的竞争在某种高度上都是一种代数结构的对抗。
> </motion.div>
