---
title: 数论：从整除、素数筛到同余系与积性函数求和
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { motion } from 'framer-motion';
import { Hash, Lock, Sigma, Infinity, Code2, Zap, Layers, Binary, Cpu, FunctionSquare, ShieldCheck, Scale } from 'lucide-react';

# 数论基础与进阶 (Number Theory)

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="text-gray-600 dark:text-gray-400 mb-8"
>
本篇文档系统化构建了从整除理论、素数筛法，到积性函数、数论变换（NTT）与复杂同余方程组的工业级知识体系。数论作为代数学的分支，其核心在于研究整数的结构及其性质。
</motion.div>

---

## 1. 整除理论与算术基本定理

### 1.1 整除 (Divisibility)
**定义**：对于整数 $a, b$ ($a \neq 0$)，若存在整数 $k$ 使得 $b = ak$，则称 $a$ 整除 $b$，记作 $a \mid b$。

**性质**：
1. **传递性**：若 $a \mid b$ 且 $b \mid c$，则 $a \mid c$。
2. **线性组合性**：若 $a \mid b$ 且 $a \mid c$，则对于任意整数 $u, v$，有 $a \mid (ub + vc)$。

### 1.2 最大公约数 (GCD) 与欧几里得算法
**定理 (Euclidean Algorithm)**：$\gcd(a, b) = \gcd(b, a \pmod b)$。
**证明**：
设 $a = kb + r$，其中 $r = a \pmod b$。
若 $d \mid a$ 且 $d \mid b$，则 $d \mid (a - kb)$，即 $d \mid r$。
若 $d \mid b$ 且 $d \mid r$，则 $d \mid (kb + r)$，即 $d \mid a$。
因此 $(a, b)$ 与 $(b, r)$ 的公因子集合完全相同，最大公约数亦相同。

### 1.3 算术基本定理 (Fundamental Theorem of Arithmetic)
**定理**：任一大于 1 的自然数 $n$ 都可以唯一地分解为有限个素数的乘积：
$$n = p_1^{a_1} p_2^{a_2} \dots p_k^{a_k} \quad (p_1 < p_2 < \dots < p_k)$$

---

## 2. 素数分布与筛法系统

### 2.1 素数分布
**素数定理 (PNT)**：当 $x \to \infty$ 时，不大于 $x$ 的素数个数 $\pi(x) \approx \frac{x}{\ln x}$。

### 2.2 线性筛 (Euler Sieve)
**核心原理**：每个合数仅由其 **最小质因子** 筛去一次。
线性筛不仅能找出素数，还可以在 $O(n)$ 时间内预处理出所有 **积性函数**。

<details>
<summary>C++ 线性筛全量积性函数模板 (μ, φ, d)</summary>

```cpp
const int MAXN = 1e6 + 5;
int primes[MAXN], cnt;
bool vis[MAXN];
int mu[MAXN], phi[MAXN], d[MAXN], num[MAXN];

void sieve(int n) {
    mu[1] = phi[1] = d[1] = 1;
    for (int i = 2; i <= n; i++) {
        if (!vis[i]) {
            primes[++cnt] = i;
            mu[i] = -1; phi[i] = i - 1; d[i] = 2; num[i] = 1;
        }
        for (int j = 1; j <= cnt && i * primes[j] <= n; j++) {
            vis[i * primes[j]] = true;
            if (i % primes[j] == 0) {
                mu[i * primes[j]] = 0;
                phi[i * primes[j]] = phi[i] * primes[j];
                d[i * primes[j]] = d[i] / (num[i] + 1) * (num[i] + 2);
                num[i * primes[j]] = num[i] + 1;
                break;
            }
            mu[i * primes[j]] = -mu[i];
            phi[i * primes[j]] = phi[i] * (primes[j] - 1);
            d[i * primes[j]] = d[i] * 2;
            num[i * primes[j]] = 1;
        }
    }
}
```
</details>

---

## 3. 同余系与模运算

### 3.1 欧拉函数 (Euler's Totient Function)
$\phi(n)$ 表示小于等于 $n$ 且与 $n$ 互质的正整数个数。
**公式**：$\phi(n) = n \prod_{i=1}^k (1 - \frac{1}{p_i})$。

### 3.2 欧拉定理与费马小定理
- **欧拉定理**：若 $\gcd(a, n) = 1$，则 $a^{\phi(n)} \equiv 1 \pmod n$。
- **费马小定理**：若 $p$ 为质数，则 $a^{p-1} \equiv 1 \pmod p$ (对于 $a$ 不是 $p$ 的倍数)。

### 3.3 乘法逆元 (Multiplicative Inverse)
若 $ax \equiv 1 \pmod m$，则称 $x$ 为 $a$ 在模 $m$ 意义下的逆元。
- **求法 1 (EXGCD)**：$ax + my = 1$。
- **求法 2 (费马小定理)**：$x = a^{m-2} \pmod m$ (仅限 $m$ 为质数)。

---

## 4. 积性函数与杜教筛

### 4.1 狄利克雷卷积 (Dirichlet Convolution)
$$(f * g)(n) = \sum_{d \mid n} f(d)g\left(\frac{n}{d}\right)$$
- $\mu * I = \epsilon$ (莫比乌斯反演的基础)
- $\phi * I = Id$

### 4.2 杜教筛核心
求 $S(n) = \sum_{i=1}^n f(i)$。找到 $g$ 使得 $(f*g)$ 的前缀和易求：
$$g(1)S(n) = \sum_{i=1}^n (f * g)(i) - \sum_{d=2}^n g(d) S(\lfloor \frac{n}{d} \rfloor)$$

---

## 5. 综合练习与解答 (Folded Examples)

### 例题 1：五指山 (EXGCD 求解线性同余方程)
大圣在 $n$ 个点的环上，步长为 $d$，从 $x$ 到 $y$，最少跳几次？即求解 $x + kd \equiv y \pmod n$。

<details>
<summary>Check Solution (C++)</summary>

```cpp
// 转化方程为 kd - Mn = y - x，即 aX + bY = c
long long a = d, b = n, c = (y - x % n + n) % n;
long long X, Y, g = exgcd(a, b, X, Y);
if (c % g) cout << "Impossible" << endl;
else {
    long long mod = b / g;
    cout << (X * (c / g) % mod + mod) % mod << endl;
}
```
</details>

### 例题 2：[SDOI2008] 沙拉公主的困惑 (欧拉函数性质)
求 $1 \dots N!$ 中与 $M!$ 互质的数有多少个 ($M \le N$)。
**解析**：答案为 $\frac{N!}{M!} \phi(M!) \pmod P$。

<details>
<summary>Check Solution (C++)</summary>

```cpp
// 答案 = N! * prod_{p <= M} (p-1)/p
long long solve(int n, int m, int p) {
    long long res = fact[n];
    for (int i = 1; i <= cnt && primes[i] <= m; i++) {
        res = res * (primes[i] - 1) % p * inv(primes[i], p) % p;
    }
    return res;
}
```
</details>

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800"
>
<ShieldCheck className="text-blue-500 mb-2" />
**大师寄语**：数论是纯数学的桂冠。理解了余数的对称性，你便窥见了密码学与现代计算理论的基石。
</motion.div>
