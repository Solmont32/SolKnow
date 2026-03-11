---
title: 数论：从整除、同余到积性函数与高阶反演
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { motion } from 'framer-motion';
import { Hash, Lock, Sigma, Infinity, Code2, Zap, Layers, Binary, Cpu, FunctionSquare, ShieldCheck, Scale, FlaskConical } from 'lucide-react';

# 数论基础与进阶 (Number Theory)

<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
className="text-gray-600 dark:text-gray-400 mb-8">

 本篇文档系统化构建了从基础整除、同余系，到莫比乌斯反演、二次剩余与高阶筛法的工业级数论知识体系。数论不仅是数学的桂冠，更是现代公钥密码学的逻辑基石。
</motion.div>

---

## 1. 核心理论体系与严密证明

### 1.1 算术基本定理 (Fundamental Theorem of Arithmetic)

任何大于 1 的正整数 $n$ 都可以唯一地分解为素数的乘积：
$n = p_1^{e_1} p_2^{e_2} \dots p_k^{e_k}$

**存在性证明**：
对 $n$ 使用强数学归纳法。若 $n$ 为素数，结论显然；若 $n$ 为合数，则 $n=ab$ ($1 < a, b < n$)，由归纳假设 $a, b$ 可分解，故 $n$ 可分解。

**唯一性证明 (Euclid's Lemma)**：
关键在于：若 $p|ab$ 且 $p$ 为素数，则 $p|a$ 或 $p|b$。
假设 $n$ 有两种分解 $p_1 \dots p_r = q_1 \dots q_s$。由 $p_1 | q_1 \dots q_s$ 知 $p_1$ 必等于某个 $q_j$（设为 $q_1$），消去后继续归纳。

**推论：约数函数的积性**

- 约数个数 $d(n) = \prod (e_i+1)$。
- 约数和 $\sigma(n) = \prod \frac{p_i^{e_i+1}-1}{p_i-1}$。
- **证明**：考虑 $n, m$ 互质，其质因子集合不交，约数集合 $D(nm) = \{d_1 d_2 \mid d_1|n, d_2|m\}$，映射 $(d_1, d_2) \to d_1 d_2$ 为双射，故 $d(nm) = d(n)d(m)$。

### 1.2 欧拉定理与费马小定理

**欧拉定理**：若 $\gcd(a, n) = 1$，则 $a^{\phi(n)} \equiv 1 \pmod n$。

**证明**：
设 $[1, n]$ 中与 $n$ 互质的数集为 $R = \{r_1, r_2, \dots, r_{\phi(n)}\}$。
由于 $\gcd(a, n) = 1$，集合 $aR = \{ar_1, ar_2, \dots, ar_{\phi(n)}\} \pmod n$ 也是 $n$ 的简化剩余系。
因此：$\prod ar_i \equiv \prod r_i \pmod n \implies a^{\phi(n)} (\prod r_i) \equiv \prod r_i \pmod n$。
由于 $\gcd(\prod r_i, n) = 1$，约去得 $a^{\phi(n)} \equiv 1 \pmod n$。

**费马小定理**：若 $p$ 为素数且 $p \nmid a$，则 $a^{p-1} \equiv 1 \pmod p$。

### 1.3 中国剩余定理 (CRT)

设 $m_1, m_2, \dots, m_k$ 两两互质，方程组 $x \equiv a_i \pmod{m_i}$ 在 $\pmod M$ ($M=\prod m_i$) 下有唯一解。

**构造性证明**：
令 $M_i = M/m_i$，则 $\gcd(M_i, m_i) = 1$。
存在 $t_i$ 使得 $M_i t_i \equiv 1 \pmod{m_i}$（利用扩展欧几里得算法）。
令 $x = \sum a_i M_i t_i$，则对于任意 $j$，当 $i \neq j$ 时 $M_i \equiv 0 \pmod{m_j}$；当 $i = j$ 时 $M_j t_j \equiv 1 \pmod{m_j}$。
故 $x \equiv a_j \cdot 1 = a_j \pmod{m_j}$。

---

## 2. 积性函数与 Dirichlet 卷积

### 2.1 莫比乌斯函数 $\mu(n)$

定义：

- $\mu(1) = 1$
- 若 $n = p_1 \dots p_k$（无平方因子），$\mu(n) = (-1)^k$
- 否则 $\mu(n) = 0$

**核心性质证明**：$\sum_{d|n} \mu(d) = [n=1]$。

- $n=1$ 时显然。
- $n > 1$ 时，设 $n$ 有 $k$ 个不同质因子。只有不含平方因子的约数 $d$ 贡献非零。
  选择 $i$ 个质因子组成的约数共有 $\binom{k}{i}$ 个，其 $\mu$ 值为 $(-1)^i$。
  总和为 $\sum_{i=0}^k \binom{k}{i} (-1)^i = (1-1)^k = 0$。

### 2.2 Dirichlet 卷积常用性质

1. $\mu * 1 = \epsilon$
2. $\phi * 1 = Id$ （由 $n = \sum_{d|n} \phi(d)$ 得出）
3. $\mu * Id = \phi$ （对 2 两边卷 $\mu$：$\phi * 1 * \mu = Id * \mu \implies \phi = Id * \mu$）

---

## 3. 高阶技术：杜教筛与 Lucas 定理

### 3.1 杜教筛收敛性分析

求解 $S(n) = \sum_{i=1}^n f(i)$，利用 $g(1)S(n) = \sum_{i=1}^n (f*g)(i) - \sum_{d=2}^n g(d)S(\lfloor n/d \rfloor)$。
**复杂度推导**：
设预处理到 $m$。总复杂度 $T(n) = O(m) + \int_1^{n/m} \sqrt{n/x} dx = O(m + n/\sqrt{m})$。
取 $m = n^{2/3}$ 得最优复杂度 $O(n^{2/3})$。

### 3.2 Lucas 定理 (组合数取模)

对于素数 $p$，有 $\binom{n}{m} \equiv \prod \binom{n_i}{m_i} \pmod p$，其中 $n_i, m_i$ 是 $n, m$ 的 $p$ 进制位。
**证明核心**：利用生成函数 $(1+x)^p \equiv 1+x^p \pmod p$。

---

## 4. 综合练习与 C++ 解答

### 练习 1：[HAOI2011] Problem b (莫比乌斯反演)

求 $\sum_{i=a}^b \sum_{j=c}^d [gcd(i, j) = k]$。

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int MAXN = 50005;
int mu[MAXN], sum[MAXN], primes[MAXN], cnt;
bool st[MAXN];

void precompute(int n) {
    mu[1] = 1;
    for (int i = 2; i <= n; i++) {
        if (!st[i]) {
            primes[cnt++] = i;
            mu[i] = -1;
        }
        for (int j = 0; primes[j] <= n / i; j++) {
            st[i * primes[j]] = true;
            if (i % primes[j] == 0) break;
            mu[i * primes[j]] = -mu[i];
        }
    }
    for (int i = 1; i <= n; i++) sum[i] = sum[i - 1] + mu[i];
}

long long calc(int n, int m) {
    long long res = 0;
    int limit = min(n, m);
    for (int l = 1, r; l <= limit; l = r + 1) {
        r = min({limit, n / (n / l), m / (m / l)});
        res += (long long)(sum[r] - sum[l - 1]) * (n / l) * (m / l);
    }
    return res;
}

int main() {
    precompute(50000);
    int T, a, b, c, d, k;
    scanf("%d", &T);
    while (T--) {
        scanf("%d%d%d%d%d", &a, &b, &c, &d, &k);
        printf("%lld\n", calc(b / k, d / k) - calc((a - 1) / k, d / k) - calc(b / k, (c - 1) / k) + calc((a - 1) / k, (c - 1) / k));
    }
    return 0;
}
```

</details>

### 练习 2：[Luogu P3807] Lucas 定理模板

求 $\binom{n+m}{n} \pmod p$，其中 $p$ 为素数且较小。

<details>
<summary>Check Solution (C++)</summary>

```cpp
long long qpow(long long a, long long b, int p) {
    long long res = 1;
    while (b) {
        if (b & 1) res = res * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return res;
}

long long C(long long n, long long m, int p) {
    if (m > n) return 0;
    if (m > n - m) m = n - m;
    long long a = 1, b = 1;
    for (int i = 0; i < m; i++) {
        a = a * (n - i) % p;
        b = b * (i + 1) % p;
    }
    return a * qpow(b, p - 2, p) % p;
}

long long lucas(long long n, long long m, int p) {
    if (!m) return 1;
    return C(n % p, m % p, p) * lucas(n / p, m / p, p) % p;
}
```

</details>

### 练习 3：曹冲养猪 (CRT 模板)

给定 $n$ 个同余方程 $x \equiv a_i \pmod{m_i}$，$m_i$ 两两互质，求最小正整数解。

<details>
<summary>Check Solution (C++)</summary>

```cpp
typedef __int128_t int128; // 处理潜在溢出

void exgcd(long long a, long long b, long long &x, long long &y) {
    if (!b) { x = 1, y = 0; return; }
    exgcd(b, a % b, y, x);
    y -= a / b * x;
}

long long crt() {
    long long M = 1, ans = 0;
    for (int i = 1; i <= n; i++) M *= m[i];
    for (int i = 1; i <= n; i++) {
        long long Mi = M / m[i], x, y;
        exgcd(Mi, m[i], x, y);
        ans = (ans + (int128)a[i] * Mi * (x % m[i] + m[i]) % m[i]) % M;
    }
    return (ans + M) % M;
}
```

</details>

### 练习 4：[Luogu P3327] 约数个数和

求 $\sum_{i=1}^n \sum_{j=1}^m d(ij)$。

<details>
<summary>Check Solution (思路)</summary>

1. 利用恒等式 $d(ij) = \sum_{u|i} \sum_{v|j} [gcd(u, v) = 1]$。
2. 原式 $= \sum_{u=1}^n \sum_{v=1}^m [gcd(u, v) = 1] \lfloor n/u \rfloor \lfloor m/v \rfloor$。
3. 利用反演：$\sum_{x=1}^{\min(n, m)} \mu(x) (\sum_{u=1}^{\lfloor n/x \rfloor} \lfloor n/ux \rfloor) (\sum_{v=1}^{\lfloor m/x \rfloor} \lfloor m/vx \rfloor)$。
4. 令 $F(N) = \sum_{i=1}^N \lfloor N/i \rfloor$，则结果为 $\sum_{x=1}^{\min(n, m)} \mu(x) F(\lfloor n/x \rfloor) F(\lfloor m/x \rfloor)$。
5. 预处理 $\mu$ 前缀和与 $F(N)$，数论分块求解。
</details>

### 练习 5：[SDOI2014] 数表 (动态莫比乌斯反演)

求 $\sum_{i=1}^n \sum_{j=1}^m \sigma_1(gcd(i, j))$，且满足 $\sigma_1(gcd(i, j)) \le a$。

<details>
<summary>Check Solution (核心逻辑)</summary>

```cpp
// 核心：离线处理查询，按 a 升序排序
// 树状数组 bit 维护 g(T) = \sum_{d|T, \sigma(d) \le a} \sigma(d)\mu(T/d)
for (auto q : queries) {
    while (it != sigma_list.end() && it->val <= q.a) {
        for (int j = it->d; j <= N; j += it->d)
            bit.add(j, it->val * mu[j / it->d]);
        it++;
    }
    ans[q.id] = query_block(q.n, q.m);
}
```

</details>

### 练习 6：[SDOI2015] 约数个数和 (杜教筛应用)

求 $\sum_{i=1}^n \phi(i)$ 和 $\sum_{i=1}^n \mu(i)$，$n \le 10^9$。

<details>
<summary>Check Solution (代码片段)</summary>

```cpp
map<int, long long> m_mu, m_phi;
long long get_mu(int n) {
    if (n <= MAXN) return sum_mu[n];
    if (m_mu.count(n)) return m_mu[n];
    long long res = 1;
    for (int l = 2, r; l <= n; l = r + 1) {
        r = n / (n / l);
        res -= 1LL * (r - l + 1) * get_mu(n / l);
    }
    return m_mu[n] = res;
}
```

</details>

<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
className="mt-12 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800">

<FlaskConical className="text-amber-500 mb-2" />
**大师寄语**：数论不仅仅是处理数字，更是处理结构。当你能通过 Dirichlet 卷积看穿函数的相互作用时，你便掌握了调和级数背后的规律。
</motion.div>
