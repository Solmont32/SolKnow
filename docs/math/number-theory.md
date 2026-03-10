---
title: 数论基础与进阶：从欧几里得算法、筛法到莫比乌斯反演与杜教筛
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { motion } from 'framer-motion';
import { Hash, Lock, Sigma, Infinity, Code2, Zap, Layers, Binary, Cpu, FunctionSquare } from 'lucide-react';

# 数论基础与进阶 (Number Theory: Basic to Advanced)

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="text-gray-600 dark:text-gray-400 mb-8"
>
本篇文档系统化构建了从基础同余理论、线性筛法，到积性函数求和、数论变换（NTT）与复杂同余方程组的工业级知识体系，旨在为计算机科学与数学竞赛选手提供严谨的理论支撑与工程实现。
</motion.div>

---

## 1. 数论基石：整除与欧几里得算法

### 1.1 欧几里得算法 (GCD)
**定理**：对于任意不全为 0 的整数 $a, b$，有 $\gcd(a, b) = \gcd(b, a \pmod b)$。
**复杂度**：$O(\log(\min(a, b)))$。

### 1.2 扩展欧几里得算法 (EXGCD)
用于求解形如 $ax + by = \gcd(a, b)$ 的线性丢番图方程。

```cpp
long long exgcd(long long a, long long b, long long &x, long long &y) {
    if (b == 0) {
        x = 1; y = 0;
        return a;
    }
    long long d = exgcd(b, a % b, y, x);
    y -= (a / b) * x;
    return d;
}
```

---

## 2. 素数与筛法系统

### 2.1 线性筛 (Euler Sieve)
**核心思想**：确保每个合数仅被其 **最小质因子** 筛去。
通过线性筛，我们可以在 $O(n)$ 内预处理出所有的积性函数，如 $\mu(n), \phi(n), d(n)$。

<details>
<summary>C++ 线性筛全量积性函数模板</summary>

```cpp
const int MAXN = 1e6 + 5;
int primes[MAXN], cnt;
bool vis[MAXN];
int mu[MAXN], phi[MAXN], d[MAXN], num[MAXN]; // num: 最小质因子的幂次

void sieve(int n) {
    mu[1] = phi[1] = d[1] = 1;
    for (int i = 2; i <= n; i++) {
        if (!vis[i]) {
            primes[++cnt] = i;
            mu[i] = -1;
            phi[i] = i - 1;
            d[i] = 2;
            num[i] = 1;
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

## 3. 同余方程组 (Systems of Congruence Equations)

### 3.1 中国剩余定理 (CRT)
求解方程组 $x \equiv a_i \pmod{m_i}$，其中 $m_i$ 两两互质。
令 $M = \prod m_i, M_i = M/m_i, t_i = M_i^{-1} \pmod{m_i}$。
则通解为 $x = \sum a_i M_i t_i \pmod M$。

### 3.2 扩展中国剩余定理 (EXCRT)
当 $m_i$ 不一定互质时，使用两两合并的方法。
考虑两个方程 $x \equiv r_1 \pmod{m_1}$ 和 $x \equiv r_2 \pmod{m_2}$，可转化为 $k_1 m_1 - k_2 m_2 = r_2 - r_1$，利用 EXGCD 求解。

---

## 4. 进阶同余理论 (Lucas & BSGS)

### 4.1 卢卡斯定理 (Lucas Theorem)
对于质数 $p$：
$$\binom{n}{m} \equiv \binom{n/p}{m/p} \cdot \binom{n \pmod p}{m \pmod p} \pmod p$$

### 4.2 BSGS 与扩展 BSGS
求解 $a^x \equiv b \pmod p$。
- **BSGS**：要求 $\gcd(a, p) = 1$，分块 $O(\sqrt{p})$。
- **ExBSGS**：通过不断除去 $d = \gcd(a, p)$ 降幂，直到互质。

---

## 5. 积性函数与数论求和

### 5.1 狄利克雷卷积 (Dirichlet Convolution)
$$(f * g)(n) = \sum_{d \mid n} f(d)g\left(\frac{n}{d}\right)$$
- **重要恒等式**：
  - $\mu * I = \epsilon$
  - $\phi * I = Id$
  - $\mu * Id = \phi$

### 5.2 杜教筛 (Du-Sieve)
对于积性函数 $f$，求 $S(n) = \sum_{i=1}^n f(i)$。
若能找到 $g$ 使得 $(f * g)$ 和 $g$ 的前缀和易求，则：
$$g(1)S(n) = \sum_{i=1}^n (f * g)(i) - \sum_{d=2}^n g(d) S(\lfloor \frac{n}{d} \rfloor)$$

---

## 6. 数论变换：快速数论变换 (NTT)

NTT 是在模数域下的快速傅里叶变换（FFT）。它利用 **原根 (Primitive Root)** 替代复数域的单位根。

### 6.1 NTT 核心属性
- **模数要求**：必须是 $P = k \cdot 2^n + 1$ 形式的质数（如 998244353）。
- **原根映射**：$\omega_n^1 \equiv g^{(P-1)/n} \pmod P$。

<details>
<summary>C++ NTT 工业级实现</summary>

```cpp
const int mod = 998244353, G = 3, Gi = 332748118;
void ntt(int *a, int n, int type) {
    for (int i = 0; i < n; i++) if (i < rev[i]) swap(a[i], a[rev[i]]);
    for (int mid = 1; mid < n; mid <<= 1) {
        int Wn = power(type == 1 ? G : Gi, (mod - 1) / (mid << 1));
        for (int j = 0; j < n; j += (mid << 1)) {
            int w = 1;
            for (int k = 0; k < mid; k++, w = 1ll * w * Wn % mod) {
                int x = a[j + k], y = 1ll * w * a[j + k + mid] % mod;
                a[j + k] = (x + y) % mod;
                a[j + k + mid] = (x - y + mod) % mod;
            }
        }
    }
    if (type == -1) {
        int inv = power(n, mod - 2);
        for (int i = 0; i < n; i++) a[i] = 1ll * a[i] * inv % mod;
    }
}
```
</details>

---

## 7. 综合练习与解答

### 例题 1：[SDOI2009] Bill 的挑战 (EXGCD 综合)
求解线性同余方程组 $x \equiv r_i \pmod{m_i}$，其中 $m_i$ 不互质。

<details>
<summary>查看 C++ 解答 (EXCRT)</summary>

```cpp
typedef __int128_t int128; // 处理溢出
long long m[MAXN], r[MAXN];
long long excrt() {
    long long M = m[1], R = r[1];
    for (int i = 2; i <= n; i++) {
        long long x, y;
        long long d = exgcd(M, m[i], x, y);
        if ((r[i] - R) % d) return -1;
        x = (int128)x * ((r[i] - R) / d) % (m[i] / d);
        if (x < 0) x += m[i] / d;
        R = R + (int128)x * M;
        M = M / d * m[i];
        R %= M;
    }
    return (R % M + M) % M;
}
```
</details>

### 例题 2：余数求和 (数论分块)
计算 $\sum_{i=1}^n (k \pmod i)$。

<details>
<summary>查看解析</summary>

$k \pmod i = k - i \cdot \lfloor \frac{k}{i} \rfloor$。
故 $\sum (k \pmod i) = n \cdot k - \sum i \cdot \lfloor \frac{k}{i} \rfloor$。
利用 **数论分块** 在 $O(\sqrt{k})$ 内计算 $\sum i \cdot \lfloor \frac{k}{i} \rfloor$。
```cpp
long long solve(int n, int k) {
    long long ans = 1ll * n * k;
    for (int l = 1, r; l <= min(n, k); l = r + 1) {
        r = min(n, k / (k / l));
        ans -= 1ll * (k / l) * (l + r) * (r - l + 1) / 2;
    }
    return ans;
}
```
</details>

### 例题 3：[Luogu P4213] 杜教筛模板
求 $\mu$ 和 $\phi$ 的前缀和，$n \le 2^{31}-1$。

<details>
<summary>查看 C++ 实现</summary>

```cpp
map<long long, long long> sum_mu, sum_phi;
long long get_mu(long long n) {
    if (n <= MAXN) return pre_mu[n];
    if (sum_mu.count(n)) return sum_mu[n];
    long long ans = 1;
    for (long long l = 2, r; l <= n; l = r + 1) {
        r = n / (n / l);
        ans -= (r - l + 1) * get_mu(n / l);
    }
    return sum_mu[n] = ans;
}

long long get_phi(long long n) {
    if (n <= MAXN) return pre_phi[n];
    if (sum_phi.count(n)) return sum_phi[n];
    long long ans = n * (n + 1) / 2;
    for (long long l = 2, r; l <= n; l = r + 1) {
        r = n / (n / l);
        ans -= (r - l + 1) * get_phi(n / l);
    }
    return sum_phi[n] = ans;
}
```
</details>

---

## 8. 练习库

<details>
<summary>练习 1：公约数的公约数</summary>
给定 $n$ 个数，求这 $n$ 个数两两最大公约数的最大值。

**提示**：统计每个因子的出现次数。
</details>

<details>
<summary>练习 2：莫比乌斯反演练习</summary>
证明：$\sum_{d \mid n} \mu(d) \frac{n}{d} = \phi(n)$。

**解答**：即证 $\mu * Id = \phi$。由于 $I * \phi = Id$，两边卷上 $\mu$ 得 $\mu * I * \phi = \mu * Id$，即 $\epsilon * \phi = \mu * Id$，结论成立。
</details>

<details>
<summary>练习 3：NTT 卷积</summary>
给定两个长度为 $n, m$ 的多项式，求其在模 998244353 意义下的卷积。
</details>

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="mt-12 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800"
>
<Infinity className="text-purple-500 mb-2" />
**大师寄语**：数论之美在于其简洁的定义与深邃的内在联系。从欧几里得的余数到莫比乌斯的转换，每一步都是人类对数之本源的探索。
</motion.div>
