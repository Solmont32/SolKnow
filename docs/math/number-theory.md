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
  className="text-gray-600 dark:text-gray-400 mb-8"
>
本篇文档系统化构建了从基础整除、同余系，到莫比乌斯反演、二次剩余与高阶筛法的工业级数论知识体系。数论不仅是数学的桂冠，更是现代公钥密码学的逻辑基石。
</motion.div>

---

## 1. 核心理论体系

### 1.1 算术基本定理 (Fundamental Theorem of Arithmetic)
任何大于 1 的正整数 $n$ 都可以唯一地分解为素数的乘积：
$$n = p_1^{e_1} p_2^{e_2} \dots p_k^{e_k}$$
**性质**：
- $n$ 的正约数个数 $d(n) = \prod_{i=1}^k (e_i + 1)$。
- 约数和 $\sigma(n) = \prod_{i=1}^k \frac{p_i^{e_i+1}-1}{p_i-1}$。
- 约数和函数与约数个数函数均为**积性函数**。

### 1.2 欧拉函数与欧拉定理
**欧拉函数** $\phi(n)$ 表示 $[1, n]$ 中与 $n$ 互质的整数个数。
- **公式**：$\phi(n) = n \prod_{p|n} (1 - \frac{1}{p})$。
- **性质**：$\sum_{d|n} \phi(d) = n$（利用 $n = \sum_{i=1}^n [gcd(i, n)=d]$ 证明）。
- **欧拉定理**：若 $\gcd(a, n) = 1$，则 $a^{\phi(n)} \equiv 1 \pmod n$。

---

## 2. 积性函数与 Dirichlet 卷积

### 2.1 积性函数定义
- **积性函数**：若对所有 $\gcd(a, b)=1$，有 $f(ab) = f(a)f(b)$。
- **完全积性函数**：对所有 $a, b$，有 $f(ab) = f(a)f(b)$。
- **常见积性函数**：单位元 $\epsilon(n)=[n=1]$，常数函数 $1(n)=1$，恒等函数 $Id(n)=n$，莫比乌斯函数 $\mu(n)$。

### 2.2 Dirichlet 卷积 (Dirichlet Convolution)
两个数论函数 $f, g$ 的卷积定义为：
$$(f * g)(n) = \sum_{d|n} f(d)g(n/d)$$
**代数性质**：交换律、结合律、分配律。单位元为 $\epsilon$。
**核心恒等式**：
1. $\mu * 1 = \epsilon$ （莫比乌斯反演的本质）
2. $\phi * 1 = Id$
3. $\mu * Id = \phi$

---

## 3. 莫比乌斯反演与杜教筛

### 3.1 莫比乌斯反演 (Mobius Inversion)
**定理**：若 $f = g * 1$，则 $g = f * \mu$。
即：$f(n) = \sum_{d|n} g(d) \iff g(n) = \sum_{d|n} \mu(d) f(n/d)$。
**证明**：$f * \mu = (g * 1) * \mu = g * (1 * \mu) = g * \epsilon = g$。

### 3.2 杜教筛 (Du Sieve)
用于求解积性函数的前缀和 $S(n) = \sum_{i=1}^n f(i)$。
若能找到 $g, h$ 使得 $f * g = h$，则：
$$ g(1)S(n) = \sum_{i=1}^n h(i) - \sum_{d=2}^n g(d)S(\lfloor n/d \rfloor) $$
**复杂度分析**：预处理前 $n^{2/3}$ 个值，总复杂度为 $O(n^{2/3})$。

---

## 4. 综合练习与 C++ 解答

### 练习 1：[HAOI2011] Problem b (莫比乌斯反演)
求 $\sum_{i=a}^b \sum_{j=c}^d [gcd(i, j) = k]$。
**解析**：转化为求 $\sum_{i=1}^{n} \sum_{j=1}^{m} [gcd(i, j) = 1]$，代入 $[gcd(i, j) = 1] = \sum_{d|gcd(i, j)} \mu(d)$ 得 $\sum_{d=1}^{\min(n, m)} \mu(d) \lfloor n/d \rfloor \lfloor m/d \rfloor$。

<details>
<summary>Check Solution (C++)</summary>

```cpp
long long get_sum(int n, int m) {
    long long res = 0;
    int limit = min(n, m);
    for (int l = 1, r; l <= limit; l = r + 1) {
        r = min({limit, n / (n / l), m / (m / l)});
        res += 1LL * (sum_mu[r] - sum_mu[l - 1]) * (n / l) * (m / l);
    }
    return res;
}
```
</details>

### 练习 2：[Luogu P3327] 约数个数和
求 $\sum_{i=1}^n \sum_{j=1}^m d(ij)$。
**解析**：利用恒等式 $d(ij) = \sum_{u|i} \sum_{v|j} [gcd(u, v) = 1]$。
原式 $= \sum_{u=1}^n \sum_{v=1}^m [gcd(u, v) = 1] \lfloor n/u \rfloor \lfloor m/v \rfloor$。
利用反演：$\sum_{x=1}^{\min(n, m)} \mu(x) (\sum_{u=1}^{\lfloor n/x \rfloor} \lfloor n/ux \rfloor) (\sum_{v=1}^{\lfloor m/x \rfloor} \lfloor m/vx \rfloor)$。
令 $F(N) = \sum_{i=1}^N \lfloor N/i \rfloor$，则结果为 $\sum_{x=1}^{\min(n, m)} \mu(x) F(\lfloor n/x \rfloor) F(\lfloor m/x \rfloor)$。

<details>
<summary>Check Solution (思路)</summary>

1. 预处理 $\mu$ 的前缀和。
2. 预处理 $F(N)$（即 $1 \dots N$ 的约数个数前缀和，可 $O(N \log N)$ 或 $O(N)$ 线性筛）。
3. 数论分块求解 $\sum \mu(x) F(\lfloor n/x \rfloor) F(\lfloor m/x \rfloor)$。
</details>

### 练习 3：[SDOI2014] 数表
求 $\sum_{i=1}^n \sum_{j=1}^m \sigma_1(gcd(i, j))$，且满足 $\sigma_1(gcd(i, j)) \le a$。
**解析**：设 $f = \sigma_1$，原式 $= \sum_{d=1}^{\min(n, m)} f(d) \sum_{i=1}^{\lfloor n/d \rfloor} \sum_{j=1}^{\lfloor m/d \rfloor} [gcd(i, j)=1] = \sum_{T=1}^{\min(n, m)} \lfloor n/T \rfloor \lfloor m/T \rfloor \sum_{d|T, f(d) \le a} f(d)\mu(T/d)$。
这是一个动态维护和查询的问题，按 $a$ 排序后用树状数组维护内层卷积项。

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

### 练习 4：[SDOI2015] 约数个数和 (杜教筛应用)
求 $\sum_{i=1}^n \phi(i)$ 和 $\sum_{i=1}^n \mu(i)$，$n \le 10^9$。
**解析**：直接套用杜教筛公式。对于 $\mu$，取 $g=1, h=\epsilon$；对于 $\phi$，取 $g=1, h=Id$。

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
  className="mt-12 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800"
>
<FlaskConical className="text-amber-500 mb-2" />
**大师寄语**：数论不仅仅是处理数字，更是处理结构。当你能通过 Dirichlet 卷积看穿函数的相互作用时，你便掌握了调和级数背后的规律。
</motion.div>
