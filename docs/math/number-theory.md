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

### 1.2 最大公约数 (GCD) 与欧几里得算法
**定理 (Euclidean Algorithm)**：$\gcd(a, b) = \gcd(b, a \pmod b)$。
**证明**：
设 $a = kb + r$，其中 $r = a \pmod b$。
若 $d \mid a$ 且 $d \mid b$，则 $d \mid (a - kb)$，即 $d \mid r$。
若 $d \mid b$ 且 $d \mid r$，则 $d \mid (kb + r)$，即 $d \mid a$。
因此 $(a, b)$ 与 $(b, r)$ 的公因子集合完全相同，最大公约数亦相同。

### 1.3 扩展欧几里得算法 (EXGCD)
用于求解 $ax + by = \gcd(a, b)$ 的一组整数解 $(x, y)$。
**推导**：
当 $b=0$ 时，$\gcd(a, 0)=a$，此时 $x=1, y=0$。
当 $b>0$ 时，设 $bx' + (a \bmod b)y' = g$，
由于 $a \bmod b = a - \lfloor a/b \rfloor b$，
代入得 $bx' + (a - \lfloor a/b \rfloor b)y' = g \implies ay' + b(x' - \lfloor a/b \rfloor y') = g$。
故 $x = y', y = x' - \lfloor a/b \rfloor y'$。

---

## 2. 素数分布与筛法系统

### 2.1 线性筛 (Euler Sieve)
**核心原理**：每个合数仅由其 **最小质因子** 筛去一次。

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

## 3. 同余方程与定理

### 3.1 费马小定理与欧拉定理
- **费马小定理**：若 $p$ 为质数，$\gcd(a, p) = 1$，则 $a^{p-1} \equiv 1 \pmod p$。
- **欧拉定理**：若 $\gcd(a, m) = 1$，则 $a^{\phi(m)} \equiv 1 \pmod m$。

### 3.2 中国剩余定理 (CRT)
求解同余方程组：
$$x \equiv a_i \pmod{m_i} \quad (i=1 \dots k)$$
其中 $m_i$ 两两互质。
**构造性证明**：
令 $M = \prod m_i, M_i = M/m_i$。由于 $\gcd(M_i, m_i) = 1$，存在 $t_i$ 使得 $M_i t_i \equiv 1 \pmod{m_i}$。
解为 $x = \sum a_i M_i t_i \pmod M$。

### 3.3 卢卡斯定理 (Lucas Theorem)
用于求大组合数模小质数：
$$\binom{n}{m} \equiv \binom{\lfloor n/p \rfloor}{\lfloor m/p \rfloor} \binom{n \bmod p}{m \bmod p} \pmod p$$

### 3.4 BSGS (Baby-step Giant-step)
求解高次同余方程 $a^x \equiv b \pmod p$（$p$ 为质数）。
**原理**：令 $x = iB - j$，其中 $B = \lceil \sqrt{p} \rceil, 0 \le i, j < B$。
方程变为 $(a^B)^i \equiv b \cdot a^j \pmod p$。先枚举 $j$ 存哈希表，再枚举 $i$ 查找。

---

## 4. 积性函数与杜教筛

### 4.1 狄利克雷卷积 (Dirichlet Convolution)
$$(f * g)(n) = \sum_{d \mid n} f(d)g\left(\frac{n}{d}\right)$$
- **性质**：交换律、结合律、分配律。
- **恒等式**：$\mu * I = \epsilon, \phi * I = Id, \mu * Id = \phi$。

---

## 5. 综合练习与解答

### 例题 1：[SDOI2011] 计算器 (三合一：快速幂、EXGCD、BSGS)
给定 $y, z, p$，分别求解：
1. $y^z \pmod p$
2. $xy \equiv z \pmod p$
3. $y^x \equiv z \pmod p$

<details>
<summary>Check Solution (C++)</summary>

```cpp
long long qpow(long long a, long long b, long long p) {
    long long res = 1;
    for (; b; b >>= 1, a = a * a % p) if (b & 1) res = res * a % p;
    return res;
}

void solve_linear(long long y, long long z, long long p) {
    long long x, k, g = exgcd(y, p, x, k);
    if (z % g) puts("Orz, I cannot find x!");
    else cout << (x * (z / g) % (p / g) + (p / g)) % (p / g) << endl;
}

long long bsgs(long long a, long long b, long long p) {
    map<long long, long long> mp;
    long long m = ceil(sqrt(p)), t = b;
    for (int j = 0; j < m; j++, t = t * a % p) mp[t] = j;
    a = qpow(a, m, p); t = a;
    for (int i = 1; i <= m; i++, t = t * a % p)
        if (mp.count(t)) return i * m - mp[t];
    return -1;
}
```
</details>

### 例题 2：[CQOI2007] 余数求和 (数论分块)
计算 $\sum_{i=1}^n (k \bmod i)$。
**解析**：$k \bmod i = k - i \lfloor k/i \rfloor$。原式变为 $nk - \sum_{i=1}^n i \lfloor k/i \rfloor$。
利用 $\lfloor k/i \rfloor$ 在一定范围内保持不变的性质（数论分块），复杂度 $O(\sqrt{n})$。

<details>
<summary>Check Solution (C++)</summary>

```cpp
long long n, k, ans;
ans = n * k;
for (long long l = 1, r; l <= n; l = r + 1) {
    if (k / l) r = min(n, k / (k / l));
    else r = n;
    ans -= (k / l) * (l + r) * (r - l + 1) / 2;
}
cout << ans << endl;
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
