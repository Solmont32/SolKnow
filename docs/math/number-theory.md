---
title: 数论：从整除、同余到积性函数与高阶反演
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { motion } from 'framer-motion';
import { Hash, Lock, Sigma, Infinity, Code2, Zap, Layers, Binary, Cpu, FunctionSquare, ShieldCheck, Scale, FlaskConical, Box, Component } from 'lucide-react';

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

### 1.2 同余类与剩余系 (Congruence & Residue Systems)

**代数结构定义**：
- **模 $n$ 剩余类环 $\mathbb{Z}/n\mathbb{Z}$**：由 $\{0, 1, \dots, n-1\}$ 构成的加法交换群与乘法半群。
- **乘法群 $(\mathbb{Z}/n\mathbb{Z})^\times$**：由与 $n$ 互质的剩余类构成的阿贝尔群，其阶数为 $\phi(n)$。

### 1.3 欧拉定理与费马小定理

**欧拉定理**：若 $\gcd(a, n) = 1$，则 $a^{\phi(n)} \equiv 1 \pmod n$。

**证明 (群论视角)**：
由于 $\gcd(a, n) = 1$，则 $a \in (\mathbb{Z}/n\mathbb{Z})^\times$。根据拉格朗日定理，群中任何元素的阶必然整除群的阶。故 $a^{\phi(n)} \equiv e \equiv 1 \pmod n$。

**费马小定理**：若 $p$ 为素数且 $p \nmid a$，则 $a^{p-1} \equiv 1 \pmod p$。

### 1.4 原根 (Primitive Roots)

**定义**：若 $a$ 模 $n$ 的阶 $\text{ord}_n(a) = \phi(n)$，则称 $a$ 为模 $n$ 的一个原根。
**存在性定理**：模 $n$ 有原根当且仅当 $n \in \{2, 4, p^k, 2p^k\}$，其中 $p$ 为奇素数。

**判定法则**：
对于 $n$，其原根 $g$ 满足：对于 $\phi(n)$ 的所有质因子 $q$，均有 $g^{\phi(n)/q} \not\equiv 1 \pmod n$。

### 1.5 二次剩余 (Quadratic Residues)

对于 $x^2 \equiv a \pmod p$，若有解则 $a$ 是模 $p$ 的二次剩余。
**勒让德符号 (Legendre Symbol)**：
$$ \left(\frac{a}{p}\right) = \begin{cases} 1 & a \text{ 是二次剩余} \\ -1 & a \text{ 是二次非剩余} \\ 0 & p|a \end{cases} $$

**欧拉准则 (Euler's Criterion)**：$\left(\frac{a}{p}\right) \equiv a^{(p-1)/2} \pmod p$。

**二次互反律 (Law of Quadratic Reciprocity)**：
对于不同奇素数 $p, q$：
$$ \left(\frac{p}{q}\right) \left(\frac{q}{p}\right) = (-1)^{\frac{p-1}{2} \cdot \frac{q-1}{2}} $$

---

## 2. 积性函数与 Dirichlet 卷积

### 2.1 莫比乌斯函数 $\mu(n)$

**定义**：$\mu(n) = \begin{cases} 1 & n=1 \\ (-1)^k & n=p_1 \dots p_k \\ 0 & \text{其他} \end{cases}$

**性质证明**：$\sum_{d|n} \mu(d) = [n=1]$。
利用二项式展开：$\sum_{i=0}^k \binom{k}{i}(-1)^i = (1-1)^k = 0$。

### 2.2 Dirichlet 卷积

$(f * g)(n) = \sum_{d|n} f(d)g(n/d)$。
- **恒等元**：$\epsilon(n) = [n=1]$。
- **逆元**：若 $f(1) \neq 0$，则 $f$ 存在 Dirichlet 逆元 $f^{-1}$。
- **重要关系**：$\mu * 1 = \epsilon, \phi * 1 = Id, \mu * Id = \phi$。

---

## 3. 高阶技术：杜教筛与反演进阶

### 3.1 杜教筛 (Du's Sieve)

求解 $S(n) = \sum_{i=1}^n f(i)$，利用卷积 $h = f * g$：
$$ g(1)S(n) = \sum_{i=1}^n h(i) - \sum_{d=2}^n g(d)S(\lfloor n/d \rfloor) $$
复杂度通过预处理前 $n^{2/3}$ 项可优化至 $O(n^{2/3})$。

### 3.2 莫比乌斯反演 (Mobius Inversion)

1. **约数形式**：$g(n) = \sum_{d|n} f(d) \iff f(n) = \sum_{d|n} \mu(n/d)g(d)$。
2. **倍数形式**：$g(n) = \sum_{n|d} f(d) \iff f(n) = \sum_{n|d} \mu(d/n)g(d)$。

---

## 4. 综合练习与 C++ 解答

### 练习 1：[P3306] 随机数生成器 (BSGS 应用)

求 $x_{i+1} \equiv (ax_i + b) \pmod p$ 首次达到 $t$ 的最小 $i$。

<details>
<summary>Check Solution (思路)</summary>

1. 当 $a=0$：只需判断 $b \equiv t$。
2. 当 $a=1$：$x_n = x_1 + (n-1)b \equiv t$，线性同余方程。
3. 当 $a>1$：利用等比数列求和 $x_n = a^{n-1}x_1 + b\frac{a^{n-1}-1}{a-1} \equiv t$。
4. 整理得 $a^{n-1}(x_1 + \frac{b}{a-1}) \equiv t + \frac{b}{a-1} \pmod p$。
5. 使用 BSGS (Baby-step Giant-step) 求解离散对数。
</details>

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <cmath>
#include <map>
using namespace std;

typedef long long ll;

ll qpow(ll a, ll b, ll p) {
    ll res = 1;
    while (b) {
        if (b & 1) res = res * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return res;
}

ll bsgs(ll a, ll b, ll p) {
    if (1 % p == b % p) return 0;
    map<ll, ll> hash;
    ll m = ceil(sqrt(p));
    ll t = b % p;
    for (int j = 0; j < m; j++) {
        hash[t] = j;
        t = t * a % p;
    }
    a = qpow(a, m, p);
    t = 1;
    for (int i = 1; i <= m; i++) {
        t = t * a % p;
        if (hash.count(t)) return i * m - hash[t];
    }
    return -1;
}

void solve() {
    ll p, a, b, x, t;
    cin >> p >> a >> b >> x >> t;
    if (x == t) { cout << 1 << endl; return; }
    if (a == 0) {
        if (b == t) cout << 2 << endl;
        else cout << -1 << endl;
        return;
    }
    if (a == 1) {
        if (!b) cout << -1 << endl;
        else {
            ll val = (t - x % p + p) % p;
            ll inv = qpow(b, p - 2, p);
            cout << val * inv % p + 1 << endl;
        }
        return;
    }
    ll inv_a1 = qpow(a - 1, p - 2, p);
    ll constant = b * inv_a1 % p;
    ll target = (t + constant) % p;
    ll start = (x + constant) % p;
    if (!start) {
        if (!target) cout << 1 << endl;
        else cout << -1 << endl;
        return;
    }
    ll res = bsgs(a, target * qpow(start, p - 2, p) % p, p);
    if (res == -1) cout << -1 << endl;
    else cout << res + 1 << endl;
}
```

</details>

### 练习 2：[P4549] 裴蜀定理 (Bezout's Identity)

求 $\sum a_i x_i = S$ 的最小正整数 $S$。
**定理**：$S = \gcd(a_1, a_2, \dots, a_n)$。

### 练习 3：[P3846] BSGS 模板

求解 $a^x \equiv b \pmod p$，其中 $p$ 为质数。

### 练习 4：[P5491] 二次剩余 (Cipolla 算法)

求 $x^2 \equiv n \pmod p$ 的所有解。

<details>
<summary>Check Solution (C++)</summary>

```cpp
// Cipolla 算法核心实现
struct Complex { ll r, i; };
ll W;
Complex mul(Complex a, Complex b, ll p) {
    return { (a.r * b.r % p + a.i * b.i % p * W % p) % p, (a.r * b.i % p + a.i * b.r % p) % p };
}

ll cipolla(ll n, ll p) {
    n %= p;
    if (qpow(n, (p - 1) / 2, p) == p - 1) return -1; // 无解
    ll a;
    while (true) {
        a = rand() % p;
        W = (a * a % p - n + p) % p;
        if (qpow(W, (p - 1) / 2, p) == p - 1) break;
    }
    Complex res = { 1, 0 }, base = { a, 1 };
    ll b = (p + 1) / 2;
    while (b) {
        if (b & 1) res = mul(res, base, p);
        base = mul(base, base, p);
        b >>= 1;
    }
    return res.r;
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

