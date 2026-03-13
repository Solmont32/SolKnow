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
className="text-gray-600 dark:text-gray-400 mb-8">

本篇文档系统化构建了从基础计数、容斥原理，到线性基、母函数与博弈均衡的完备体系。涵盖了代数恒等式证明与模型转换的核心逻辑。
</motion.div>

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

## 2. 生成函数与多项式计数

### 2.1 普通生成函数 (OGF) 的代数逻辑

对于序列 $\{a_i\}$，其 OGF 为 $A(x) = \sum a_i x^i$。
**卷积逻辑证明**：
若 $C(x) = A(x)B(x)$，则 $c_n = \sum_{i=0}^n a_i b_{n-i}$。
这在组合上对应于：将总和为 $n$ 的任务拆分为两个子任务，子任务 1 权重为 $i$ 的方案数为 $a_i$，子任务 2 权重为 $n-i$ 的方案数为 $b_{n-i}$。

**封闭形式推导**：
对于几何级数 $a_i = 1$，则 $A(x) = 1 + x + x^2 + \dots = \frac{1}{1-x}$。
推论：选取 $k$ 个相同物品的方案数 $\binom{n+k-1}{k-1}$ 对应 $( \frac{1}{1-x} )^k$ 的 $x^n$ 系数。

### 2.2 指数生成函数 (EGF) 与排列逻辑

对于序列 $\{a_i\}$，其 EGF 为 $F(x) = \sum a_i \frac{x^i}{i!}$。
**乘法原理证明**：
若 $H(x) = F(x)G(x)$，则 $h_n = n! \sum_{i=0}^n \frac{f_i}{i!} \frac{g_{n-i}}{(n-i)!} = \sum_{i=0}^n \binom{n}{i} f_i g_{n-i}$。
这在组合上对应于：从 $n$ 个有标号位置中选 $i$ 个放第一类元素（方案 $f_i$），剩下的放第二类元素（方案 $g_{n-i}$）。

---

## 3. 线性基与博弈论进阶

### 3.1 线性基：贪心证明与性质

**最大值贪心证明**：从高位到低位，若当前结果异或该位基底能变大，则异或。
**证明**：设当前位为 $k$。若基底 $d_k$ 存在且当前位为 0，异或后第 $k$ 位变为 1。由于 $d_k$ 更高位均为 0（标准型），此操作不会影响已确定的更高位，且产生的贡献 $2^k$ 大于后面所有位可能产生的贡献总和 $\sum_{i=0}^{k-1} 2^i = 2^k - 1$。

---

## 4. 综合练习与 C++ 解答

### 练习 1：[SDOI2016] 排列计数 (错排 + 组合)

求 $1 \sim n$ 的排列中，恰好有 $m$ 个位置满足 $a_i = i$ 的方案数。

<details>
<summary>Check Solution (思路)</summary>

1. 选出 $m$ 个不动点的方案为 $\binom{n}{m}$。
2. 剩下 $n-m$ 个点需满足全部错排。
3. 错排公式 $D_n = (n-1)(D_{n-1} + D_{n-2})$，预处理后 $O(1)$ 回答。
</details>

<details>
<summary>Check Solution (C++)</summary>

```cpp
long long D[MAXN], fact[MAXN], inv[MAXN];
void precompute() {
    D[0] = 1, D[1] = 0, D[2] = 1;
    for (int i = 3; i < MAXN; i++) D[i] = (i - 1) * (D[i - 1] + D[i - 2]) % MOD;
    // ... 预处理阶乘与逆元
}
long long solve(int n, int m) {
    if (n == m) return 1;
    if (m > n) return 0;
    return C(n, m) * D[n - m] % MOD;
}
```

</details>

### 练习 2：[SHOI2017] 期末考试 (贪心 + 组合)

给定课程成绩要求与操作代价，求最小总代价。

<details>
<summary>Check Solution (思路)</summary>

1. 代价函数关于最后期限 $T$ 是凸的。
2. 三分查找 $T$ 或枚举 $T$（利用前缀和 $O(1)$ 计算代价）。
</details>

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

</motion.div>
