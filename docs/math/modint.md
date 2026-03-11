---
title: 模运算与同余系统 (Modular Arithmetic)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { motion } from 'framer-motion';
import { Hash, Zap, ShieldCheck, Scale, Cpu, Binary } from 'lucide-react';

# 模运算与同余系统

<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
className="text-gray-600 dark:text-gray-400 mb-8">

 模运算（Modular Arithmetic）是数论的基础，也是现代密码学和计算机科学的基石。它不仅定义了整数集合上的等价关系，还通过同余类构成了环与域的代数结构。
</motion.div>

---

## 1. 基础理论

### 1.1 乘法逆元 (Multiplicative Inverse)

若 $ax \equiv 1 \pmod m$，则称 $x$ 为 $a$ 在模 $m$ 下的乘法逆元。

- **线性求逆元**：$inv[i] = (p - \lfloor p/i \rfloor) \cdot inv[p \pmod i] \pmod p$。
- **离线求任意 $n$ 个数逆元**：
  设 $s_i = \prod_{j=1}^i a_j$，先求出 $s_n$ 的逆元 $inv\_s_n$，则 $inv\_s_{i-1} = inv\_s_i \cdot a_i$，$inv\_a_i = inv\_s_i \cdot s_{i-1}$。

### 1.2 中国剩余定理 (CRT)

用于求解同余方程组 $x \equiv a_i \pmod{m_i}$，其中 $m_i$ 两两互质。
**构造解**：$x = \sum a_i M_i t_i \pmod M$，其中 $M = \prod m_i, M_i = M/m_i$，$t_i$ 为 $M_i$ 模 $m_i$ 的逆元。

### 1.3 扩展中国剩余定理 (ExCRT)

当 $m_i$ 不互质时，采用两两合并法。
对于 $x \equiv r_1 \pmod{m_1}$ 和 $x \equiv r_2 \pmod{m_2}$：
$x = m_1 k_1 + r_1 = m_2 k_2 + r_2 \implies m_1 k_1 - m_2 k_2 = r_2 - r_1$。
利用 EXGCD 求解 $k_1$，合并为 $x \equiv R \pmod{lcm(m_1, m_2)}$。

---

## 2. 组合数取模定理

### 2.1 卢卡斯定理 (Lucas Theorem)

若 $p$ 为质数，则：
$$ \binom{n}{m} \equiv \binom{\lfloor n/p \rfloor}{\lfloor m/p \rfloor} \cdot \binom{n \pmod p}{m \pmod p} \pmod p $$
**应用**：求解 $n, m$ 很大但 $p$ 较小的组合数取模。

### 2.2 扩展卢卡斯 (ExLucas)

当 $p$ 不是质数时，对 $p$ 进行质因数分解 $p = \prod p_i^{k_i}$，分别求出对 $p_i^{k_i}$ 的模，最后用 CRT 合并。

---

## 3. 工业级 C++ 实现：ModInt 类

<details>
<summary>Check Implementation (ModInt)</summary>

```cpp
template<int mod>
struct ModInt {
    int v;
    ModInt(long long _v = 0) { v = (_v % mod + mod) % mod; }
    ModInt& operator+=(const ModInt& o) { v += o.v; if (v >= mod) v -= mod; return *this; }
    ModInt& operator-=(const ModInt& o) { v -= o.v; if (v < 0) v += mod; return *this; }
    ModInt& operator*=(const ModInt& o) { v = 1LL * v * o.v % mod; return *this; }
    ModInt operator+(const ModInt& o) const { return ModInt(*this) += o; }
    ModInt operator-(const ModInt& o) const { return ModInt(*this) -= o; }
    ModInt operator*(const ModInt& o) const { return ModInt(*this) *= o; }
    ModInt pow(long long b) const {
        ModInt res = 1, a = *this;
        for (; b; b >>= 1, a *= a) if (b & 1) res *= a;
        return res;
    }
    ModInt inv() const { return pow(mod - 2); }
};
```

</details>

---

## 4. 综合练习与 C++ 解答

### 练习 1：[曹冲养猪] (CRT 基础)

求解同余方程组。

<details>
<summary>Check Solution (C++)</summary>

```cpp
long long CRT() {
    long long M = 1, ans = 0;
    for (int i = 1; i <= n; i++) M *= m[i];
    for (int i = 1; i <= n; i++) {
        long long Mi = M / m[i], x, y;
        exgcd(Mi, m[i], x, y);
        ans = (ans + a[i] * Mi * (x < 0 ? x + m[i] : x)) % M;
    }
    return (ans + M) % M;
}
```

</details>

### 练习 2：[古代猪文] (Lucas + CRT 综合)

求 $g^{\sum_{d|n} \binom{n}{d}} \pmod{999911659}$。
**解析**：指数部分对 $999911658$ 取模。该数分解为 $2 \times 3 \times 467 \times 28559$。
分别用 Lucas 求出对四个质数的模，再用 CRT 合并。

<details>
<summary>Check Solution (思路)</summary>

1. 判定 $g \pmod P = 0$ 的特殊情况。
2. 预处理四个质数的阶乘。
3. 对每个 $d|n$，计算 $\binom{n}{d} \pmod{p_i}$。
4. CRT 合并得到指数 $X$。
5. 答案为 $g^X \pmod P$。
</details>

<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
className="mt-12 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800"

> <Binary className="text-purple-500 mb-2" />
> **大师寄语**：在模的世界里，无穷被折叠进了有限。理解逆元，就是理解如何在旋转的钟表盘上寻找退回起点的路径。

</motion.div>
