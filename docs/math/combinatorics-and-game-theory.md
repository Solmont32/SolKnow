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

### 2.3 多项式变换逻辑与收敛验证 (Polynomial Transformations)

**1. 离散傅里叶变换 (DFT/NTT)**：
多项式 $A(x) = \sum_{i=0}^{n-1} a_i x^i$ 的点值表示是在 $n$ 次单位根 $w_n^k = e^{j \frac{2\pi k}{n}}$ 上的取值。
**线性变换矩阵**：$Y = V A$，其中 $V_{ij} = (w_n^i)^j$。
**卷积定理**：$A(x) \cdot B(x) = \text{IDFT}(\text{DFT}(A) \cdot \text{DFT}(B))$。利用分治思想，FFT 将复杂度从 $O(n^2)$ 降低至 $O(n \log n)$。

**2. 快速数论变换 (NTT)**：
在模 $P$ 意义下，利用原根 $g$ 的性质 $g^{(P-1)/n} \pmod P$ 替代单位根。
**存在条件**：$P = c \cdot 2^k + 1$，使得 $n \mid (P-1)$。常见模数为 $998244353$。

**3. 多项式求逆与牛顿迭代 (Newton's Method)**：
求解 $G(F(x)) \equiv 0 \pmod{x^n}$。
**迭代公式**：$x_{k+1} = x_k - \frac{G(x_k)}{G'(x_k)}$。
对于求逆 $F(x)B(x) \equiv 1 \pmod{x^n}$，令 $G(B) = \frac{1}{B} - F(x)$。
$$ B_{k+1} \equiv B_k - \frac{1/B_k - F}{-1/B_k^2} \equiv B_k(2 - F B_k) \pmod{x^{2k}} $$
**收敛性**：牛顿迭代在每次迭代中使得有效项数倍增，复杂度满足 $T(n) = T(n/2) + O(n \log n) = O(n \log n)$。

### 2.4 生成函数的一致性证明与形式收敛 (Consistency & Convergence)

**形式幂级数环 $\mathbb{K}[[x]]$**：
定义两个序列 $a, b$ 的加法为逐项加，乘法为 Cauchy 卷积 $(a*b)_n = \sum_{i=0}^n a_i b_{n-i}$。
**一致性证明 (组合意义)**：
1. **加法**：$A(x) + B(x)$ 对应两个互斥集合（或带标记的对象集）的并集。
2. **乘法**：$A(x) \cdot B(x)$ 对应将总资源 $n$ 拆分为两个有序部分，分别赋予结构 $A$ 和 $B$。
3. **指数对象 $\exp(F(x))$**：
   $$ \exp(F(x)) = \sum_{k=0}^\infty \frac{F(x)^k}{k!} $$
   **证明**：$F(x)^k/k!$ 表示将 $n$ 个元素拆分为 $k$ 个有标号连通块的方案数。除以 $k!$ 则消去了连通块的顺序，从而得到无序集合。

**形式收敛性 (Formal Convergence)**：
在 $\mathbb{K}[[x]]$ 中，序列 $f_k(x)$ 收敛于 $f(x)$，当且仅当对于任意 $N$，存在 $K$ 使得对所有 $k > K$，$f_k(x) \equiv f(x) \pmod{x^N}$。
这解释了为何我们可以处理无穷和，只要项的最低次数趋于无穷即可。

<details>
<summary>Check Solution (多项式 Exp/Ln C++)</summary>

```cpp
// 多项式 Ln: B(x) = ln(A(x)) = \int A'(x)/A(x) dx
void poly_ln(int *a, int *b, int n) {
    poly_inv(a, tmp, n);
    poly_derivative(a, tmp2, n);
    poly_mul(tmp, tmp2, tmp, n);
    poly_integral(tmp, b, n);
}

// 多项式 Exp: B(x) = exp(A(x)) -> ln(B(x)) - A(x) = 0, 牛顿迭代
void poly_exp(int *a, int *b, int n) {
    if (n == 1) { b[0] = 1; return; }
    poly_exp(a, b, (n + 1) >> 1);
    poly_ln(b, tmp, n);
    for (int i = 0; i < n; i++) tmp[i] = (a[i] - tmp[i] + MOD) % MOD;
    tmp[0] = (tmp[0] + 1) % MOD;
    poly_mul(b, tmp, b, n);
}
```
</details>

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

// ... 考虑每条边对总距离的贡献
long long val = (long long)j * (k - j) * e[i].w + (long long)(sz[v] - j) * (n - k - (sz[v] - j)) * e[i].w;
f[u][i] = max(f[u][i], f[u][i-j] + f[v][j] + val);
```

</details>

### 练习 6：[P4238] 多项式乘法逆 (Polynomial Inversion)

给定 $n-1$ 次多项式 $A(x)$，求 $B(x)$ 使得 $A(x)B(x) \equiv 1 \pmod{x^n}$。

<details>
<summary>Check Solution (思路)</summary>

1. 基础情况：当 $n=1$ 时，$B_0 \equiv A_0^{-1} \pmod P$。
2. 迭代提升：假设已有 $B_{k/2} \equiv A^{-1} \pmod{x^{k/2}}$。
3. 利用牛顿迭代：$B_k \equiv B_{k/2}(2 - AB_{k/2}) \pmod{x^k}$。
4. 使用 NTT 加速多项式乘法。
</details>

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

const int MOD = 998244353;
typedef long long ll;

void ntt(vector<ll>& a, int type) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) swap(a[i], a[j]);
    }
    for (int mid = 1; mid < n; mid <<= 1) {
        ll Wn = qpow(3, (MOD - 1) / (mid << 1), MOD);
        if (type == -1) Wn = qpow(Wn, MOD - 2, MOD);
        for (int j = 0; j < n; j += (mid << 1)) {
            ll w = 1;
            for (int k = 0; k < mid; k++, w = w * Wn % MOD) {
                ll x = a[j + k], y = w * a[j + k + mid] % MOD;
                a[j + k] = (x + y) % MOD;
                a[j + k + mid] = (x - y + MOD) % MOD;
            }
        }
    }
}

void poly_inv(int n, vector<ll>& a, vector<ll>& b) {
    if (n == 1) { b[0] = qpow(a[0], MOD - 2, MOD); return; }
    poly_inv((n + 1) >> 1, a, b);
    int len = 1; while (len < (n << 1)) len <<= 1;
    vector<ll> tmp(len, 0);
    for (int i = 0; i < n; i++) tmp[i] = a[i];
    b.resize(len, 0);
    ntt(tmp, 1); ntt(b, 1);
    for (int i = 0; i < len; i++) b[i] = b[i] * (2 - tmp[i] * b[i] % MOD + MOD) % MOD;
    ntt(b, -1);
    ll inv_len = qpow(len, MOD - 2, MOD);
    for (int i = 0; i < n; i++) b[i] = b[i] * inv_len % MOD;
    for (int i = n; i < len; i++) b[i] = 0;
}
```

</details>

<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
className="mt-12 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">

...
<Shapes className="text-indigo-500 mb-2" />
**大师寄语**：组合数学不仅仅是计数，更是寻找集合间的映射。博弈论则告诉我们，所有的竞争在某种高度上都是一种代数结构的对抗。
</motion.div>

