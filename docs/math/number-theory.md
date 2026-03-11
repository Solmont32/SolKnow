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
**性质**：$n$ 的正约数个数 $d(n) = \prod (e_i + 1)$，约数和 $\sigma(n) = \prod \frac{p_i^{e_i+1}-1}{p_i-1}$。

### 1.2 欧拉函数与欧拉定理
**欧拉函数** $\phi(n)$ 表示 $[1, n]$ 中与 $n$ 互质的整数个数。
- **公式**：$\phi(n) = n \prod_{p|n} (1 - \frac{1}{p})$。
- **性质**：$\sum_{d|n} \phi(d) = n$。

---

## 2. 同余系的高阶应用

### 2.1 二次剩余 (Quadratic Residue)
若方程 $x^2 \equiv a \pmod p$ ($p$ 为奇质数) 有解，则称 $a$ 是模 $p$ 的二次剩余。
- **勒让德符号 (Legendre Symbol)**：
  $$ \left(\frac{a}{p}\right) = a^{(p-1)/2} \pmod p = \begin{cases} 1 & a \text{ 是二次剩余} \\ -1 & a \text{ 是二次非剩余} \\ 0 & a \equiv 0 \pmod p \end{cases} $$
- **Tonelli-Shanks 算法**：用于在 $O(\log^2 p)$ 时间内求解 $x^2 \equiv a \pmod p$。

### 2.2 离散对数与原根
**大步小步算法 (BSGS)**：求解 $a^x \equiv b \pmod p$。
推导：设 $x = i \lceil \sqrt{p} \rceil - j$，则 $(a^{\lceil \sqrt{p} \rceil})^i \equiv b \cdot a^j \pmod p$。

---

## 3. 积性函数与反演理论

### 3.1 莫比乌斯反演 (Mobius Inversion)
**莫比乌斯函数** $\mu(n)$：
$$ \mu(n) = \begin{cases} 1 & n=1 \\ (-1)^k & n \text{ 为 } k \text{ 个互异质数的积} \\ 0 & \text{其他情况} \end{cases} $$
**反演公式**：
$$ f(n) = \sum_{d|n} g(d) \iff g(n) = \sum_{d|n} \mu(d) f(n/d) $$
**常用恒等式**：$[gcd(i, j) = 1] = \sum_{d|gcd(i, j)} \mu(d)$。

### 3.2 杜教筛 (Du Sieve)
用于求解积性函数的前缀和 $S(n) = \sum_{i=1}^n f(i)$。
**推导**：寻找 $g$ 使得 $f*g$ 易求前缀和。
$$ g(1)S(n) = \sum_{i=1}^n (f*g)(i) - \sum_{d=2}^n g(d)S(\lfloor n/d \rfloor) $$
复杂度：$O(n^{2/3})$。

---

## 4. 综合练习与 C++ 解答

### 练习 1：[HAOI2011] Problem b (莫比乌斯反演)
求 $\sum_{i=a}^b \sum_{j=c}^d [gcd(i, j) = k]$。
**解析**：转化为求 $\sum_{i=1}^{n} \sum_{j=1}^{m} [gcd(i, j) = 1]$，即 $\sum_{d=1}^{\min(n, m)} \mu(d) \lfloor n/d \rfloor \lfloor m/d \rfloor$。

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

### 练习 2：[TIMUS1517] 离散对数进阶 (原根与 BSGS)
给定素数 $P$，求 $x^A \equiv B \pmod P$ 的最小正整数解。
**解析**：设 $g$ 为 $P$ 的原根，$x = g^y, B = g^z$。方程变为 $g^{Ay} \equiv g^z \pmod P$，即 $Ay \equiv z \pmod{P-1}$。先用 BSGS 求 $z$，再用 EXGCD 求 $y$。

<details>
<summary>Check Solution (逻辑流程)</summary>

1. 寻找 $P$ 的最小原根 $g$。
2. 使用 BSGS 求出 $g^z \equiv B \pmod P$ 的 $z$。
3. 求解线性同余方程 $Ay \equiv z \pmod{P-1}$ 得到 $y$。
4. 解为 $g^y \pmod P$。
</details>

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="mt-12 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800"
>
<FlaskConical className="text-amber-500 mb-2" />
**大师寄语**：数论不仅仅是处理数字，更是处理结构。当你能通过 Dirichlet 卷积看穿函数的相互作用时，你便掌握了调和级数背后的规律。
</motion.div>
