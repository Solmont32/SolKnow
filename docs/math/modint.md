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
  className="text-gray-600 dark:text-gray-400 mb-8"
>
模运算（Modular Arithmetic）是数论的基础，也是现代密码学和计算机科学的基石。它不仅定义了整数集合上的等价关系，还通过同余类构成了环与域的代数结构。
</motion.div>

---

## 1. 基础定义与性质

### 1.1 同余 (Congruence)
**定义**：若 $m \mid (a - b)$，则称 $a$ 与 $b$ 对模 $m$ 同余，记作 $a \equiv b \pmod m$。

### 1.2 运算律
对于 $a \equiv b \pmod m$ 和 $c \equiv d \pmod m$：
1. **加法**：$a + c \equiv b + d \pmod m$
2. **减法**：$a - c \equiv b - d \pmod m$
3. **乘法**：$ac \equiv bd \pmod m$
4. **幂次**：$a^k \equiv b^k \pmod m$
5. **除法**：若 $ac \equiv bc \pmod m$ 且 $\gcd(c, m) = 1$，则 $a \equiv b \pmod m$。

---

## 2. 乘法逆元 (Multiplicative Inverse)

### 2.1 定义
若 $ax \equiv 1 \pmod m$，则称 $x$ 为 $a$ 在模 $m$ 下的乘法逆元，记作 $a^{-1}$。
**存在性**：$a$ 在模 $m$ 下存在逆元当且仅当 $\gcd(a, m) = 1$。

### 2.2 求解方法
1. **费马小定理**（$m$ 为质数）：$a^{m-2} \equiv a^{-1} \pmod m$。
2. **扩展欧几里得算法**：求解 $ax + my = 1$ 的 $x$。
3. **线性求逆元**：求 $1 \dots n$ 对模 $p$ 的所有逆元。
   推导：设 $p = ki + r$ ($r < i, k = \lfloor p/i \rfloor$)。
   $ki + r \equiv 0 \pmod p \implies r \equiv -ki \pmod p$。
   两边同乘 $i^{-1} r^{-1}$ 得 $i^{-1} \equiv -k r^{-1} \pmod p$。
   即 $inv[i] = (p - \lfloor p/i \rfloor) \cdot inv[p \pmod i] \pmod p$。

---

## 3. 高级同余定理

### 3.1 威尔逊定理 (Wilson's Theorem)
$(p-1)! \equiv -1 \pmod p$ 当且仅当 $p$ 为质数。

### 3.2 阶与原根 (Order & Primitive Roots)
**阶 (Order)**：满足 $a^x \equiv 1 \pmod m$ 的最小正整数 $x$ 称为 $a$ 模 $m$ 的阶，记作 $\text{ord}_m(a)$。
**原根 (Primitive Root)**：若 $\text{ord}_m(g) = \phi(m)$，则称 $g$ 是模 $m$ 的一个原根。
- **性质**：若 $m$ 有原根，则共有 $\phi(\phi(m))$ 个原根。
- **存在性**：$m = 2, 4, p^k, 2p^k$ 时存在原根（$p$ 为奇质数）。

---

## 4. 工业级 C++ 实现：ModInt 类

在算法竞赛中，封装一个 `ModInt` 类可以极大减少溢出和取模错误。

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
    ModInt inv() const { return pow(mod - 2); } // 仅限 mod 为质数
};
```
</details>

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  className="mt-12 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800"
>
<Binary className="text-purple-500 mb-2" />
**大师寄语**：在模的世界里，无穷被折叠进了有限。理解逆元，就是理解如何在旋转的钟表盘上寻找退回起点的路径。
</motion.div>
