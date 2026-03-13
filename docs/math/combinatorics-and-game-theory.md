---
title: 组合计数、线性基与博弈论系统
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { motion } from 'framer-motion';
import { Sigma, FunctionSquare, Layers, Binary, Infinity, Zap, Cpu, Gamepad2, Target, Sword, FlaskConical, Scale, Shapes, Box, Component } from 'lucide-react';

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

### 1.1 容斥原理 (Principle of Inclusion-Exclusion)

**形式化表述**：
设 $S$ 为有限集，$P_1, P_2, \dots, P_n$ 为性质。设 $A_i$ 为满足性质 $P_i$ 的元素集合，则：
$$ |\bigcup_{i=1}^n A_i| = \sum_{i=1}^n |A_i| - \sum_{1 \le i < j \le n} |A_i \cap A_j| + \dots + (-1)^{n-1} |A_1 \cap \dots \cap A_n| $$

**指示函数证明**：
对于集合 $\bigcup A_i$ 中的任一元素 $x$，设其恰好属于 $k$ 个集合。
则该元素在右侧被计算的次数为：
$$ \binom{k}{1} - \binom{k}{2} + \binom{k}{3} - \dots + (-1)^{k-1} \binom{k}{k} $$
由二项式定理 $(1-1)^k = \sum \binom{k}{i} (-1)^i = 0$，知 $\sum_{i=1}^k \binom{k}{i} (-1)^{i-1} = 1$。
故每个元素恰好被计算 1 次。

### 1.2 第二类 Stirling 数

$S(n, k)$ 表示将 $n$ 个有区别的球放入 $k$ 个无区别的盒子的方案数（盒子不为空）。
**通项公式 (基于容斥)**：
$$ S(n, k) = \frac{1}{k!} \sum_{i=0}^k (-1)^i \binom{k}{i} (k-i)^n $$

### 1.3 Catalan 数与折线法

$C_n = \frac{1}{n+1} \binom{2n}{n}$。
**不越过 $y=x$ 的路径证明**：利用反射原理，穿过 $y=x$ 的路径等价于从 $(0,0)$ 到 $(n-1, n+1)$ 的所有路径。

---

## 2. 生成函数与群作用

### 2.1 普通生成函数 (OGF) 与指数生成函数 (EGF)

- **OGF**：$A(x) = \sum a_i x^i$，适用于无标号计数。
- **EGF**：$F(x) = \sum a_i \frac{x^i}{i!}$，适用于有标号计数。

**指数对象构造**：
若一个结构的生成函数为 $F(x)$，则由该结构组成的无标号集合的生成函数为 $\exp(F(x))$。
此即 **$\exp$ 的组合意义**：将 $n$ 个有标号元素拆分为若干个无序的连通分量的方案数。

### 2.2 置换群与 Burnside's Lemma

**群作用 (Group Action)**：群 $G$ 作用在集合 $X$ 上。
**轨道-稳定子定理**：$|G| = |\text{Orb}(x)| \cdot |\text{Stab}(x)|$。

**Burnside 引理**：等价类（轨道）的个数 $N$ 等于每个置换下保持不变的元素个数的平均值：
$$ N = \frac{1}{|G|} \sum_{g \in G} |X^g| $$

**Polya 计数定理**：若对 $n$ 个对象用 $m$ 种颜色着色，则方案数为：
$$ N = \frac{1}{|G|} \sum_{g \in G} m^{c(g)} $$
其中 $c(g)$ 为置换 $g$ 的循环节个数。

---

## 3. 博弈论与平衡状态

### 3.1 公平组合博弈 (ICG) 与 SG 函数

**Sprague-Grundy 定理**：
1. 任何公平组合博弈都可以转化为 Nim 博弈。
2. 状态 $u$ 的 SG 值：$SG(u) = \text{mex}\{SG(v) \mid u \to v\}$。
3. 多个独立博弈组合后的总 SG 值为各子博弈 SG 值的异或和。

**证明要点**：
只需证明 $SG=0$ 为必败态，$SG>0$ 为必胜态。
- 若 $SG(u)=0$，则所有后继状态 $v$ 的 $SG(v) \neq 0$。
- 若 $SG(u)>0$，则必然存在一个后继状态 $v$ 使得 $SG(v)=0$。
这符合必胜/必败态的定义。

---

## 4. 综合练习与 C++ 解答

### 练习 1：[P4707] 重返现世 (扩展 Min-Max 容斥)

求第 $k$ 小被选中的元素的期望时间。
**定理**：$k\text{th-min}(S) = \sum_{\emptyset \neq T \subseteq S} (-1)^{|T|-k} \binom{|T|-1}{k-1} \min(T)$。

### 练习 2：[P4199] 万径人踪灭 (FFT + 容斥)

求不连续回文子序列个数。
**解析**：
1. 总回文子序列 = 连续回文子序列 + 不连续回文子序列。
2. 连续回文子序列可用 Manacher。
3. 对 'a' 和 'b' 分别做卷积，求出每个位置作为对称轴的匹配点数。

<details>
<summary>Check Solution (C++)</summary>

```cpp
// FFT 计算对称轴匹配点数
void solve() {
    for (int i = 0; i < n; i++) a[i] = (s[i] == 'a');
    fft(a, 1);
    for (int i = 0; i < len; i++) a[i] = a[i] * a[i];
    fft(a, -1);
    // ... 对 'b' 同理，结果累加到 sum[i]
}
```

</details>

### 练习 3：[P4512] 多项式除法 (NTT 模板)

求多项式 $F(x) \pmod{x^n}$。

<details>
<summary>Check Solution (C++)</summary>

```cpp
void poly_inv(int *a, int *b, int n) {
    if (n == 1) { b[0] = qpow(a[0], MOD - 2); return; }
    poly_inv(a, b, (n + 1) >> 1);
    // ... NTT 迭代更新 b
}
```

</details>

### 练习 4：[P2597] 灾难 (支配树)

给定食物网，求每个生物灭绝后会导致多少种生物灭绝。
**解析**：构建支配树，入度为 0 的点连向虚根。每个点的灭绝影响其在支配树上的子树。

### 练习 5：[P3177] 树上染色 (树形 DP)

在一棵树中选 $k$ 个点染成黑色，其余染成白色，求黑点间距离之和 + 白点间距离之和的最大值。

<details>
<summary>Check Solution (核心转移)</summary>

```cpp
// 考虑每条边对总距离的贡献
long long val = (long long)j * (k - j) * e[i].w + (long long)(sz[v] - j) * (n - k - (sz[v] - j)) * e[i].w;
f[u][i] = max(f[u][i], f[u][i-j] + f[v][j] + val);
```

</details>

<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
className="mt-12 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">

<Shapes className="text-indigo-500 mb-2" />
**大师寄语**：组合数学不仅仅是计数，更是寻找集合间的映射。博弈论则告诉我们，所有的竞争在某种高度上都是一种代数结构的对抗。
</motion.div>

