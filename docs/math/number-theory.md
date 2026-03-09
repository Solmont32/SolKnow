---
title: 初等数论：同余、原根与密码学基础
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { motion } from 'framer-motion';
import { Hash, Lock, Binary, Infinity, Code2 } from 'lucide-react';

# 初等数论 (Elementary Number Theory)

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
数论是研究整数性质的数学分支。在现代计算科学中，同余理论与素数分布构成了现代公钥密码学的数学基石。
</motion.div>

---

## 1. 基础工具：GCD 与素数

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
>
在深入同余理论之前，我们首先回顾数论的两大核心工具。
</motion.div>

### 1.1 最大公约数 (GCD)
对于整数 $a, b$，$\gcd(a, b)$ 表示能同时整除 $a$ 和 $b$ 的最大正整数。

<KnowledgeCard type="tip" title="欧几里得算法">
$\gcd(a, b) = \gcd(b, a \pmod b)$。其时间复杂度为 $O(\log \min(a, b))$。
</KnowledgeCard>

```cpp
long long gcd(long long a, long long b) {
    return b ? gcd(b, a % b) : a;
}
```

### 1.2 扩展欧几里得算法 (EXGCD)
对于任意整数 $a, b$，必存在整数 $x, y$ 使得 $ax + by = \gcd(a, b)$。

```cpp
long long exgcd(long long a, long long b, long long &x, long long &y) {
    if (!b) { x = 1, y = 0; return a; }
    long long d = exgcd(b, a % b, y, x);
    y -= (a / b) * x;
    return d;
}
```

---

## 2. 同余理论 (Congruence Theory)

### 2.1 基本定义
若 $m \mid (a - b)$，则称 $a$ 与 $b$ 模 $m$ 同余，记作 $a \equiv b \pmod m$。

### 2.2 费马小定理 (Fermat's Little Theorem)
若 $p$ 为质数，且 $\gcd(a, p) = 1$，则：
$$a^{p-1} \equiv 1 \pmod p$$
由此可推导出 $a^p \equiv a \pmod p$（对所有整数 $a$ 均成立）。

### 2.3 欧拉定理 (Euler's Theorem)
若 $\gcd(a, m) = 1$，则：
$$a^{\phi(m)} \equiv 1 \pmod m$$
其中 $\phi(m)$ 是 **欧拉函数**，表示 $[1, m]$ 中与 $m$ 互质的整数个数。

<KnowledgeCard type="code" title="线性筛预处理欧拉函数">
```cpp
int phi[MAXN], primes[MAXN], cnt;
bool is_prime[MAXN];

void precompute_phi(int n) {
    phi[1] = 1;
    for (int i = 2; i <= n; i++) {
        if (!is_prime[i]) {
            primes[cnt++] = i;
            phi[i] = i - 1;
        }
        for (int j = 0; j < cnt && i * primes[j] <= n; j++) {
            is_prime[i * primes[j]] = true;
            if (i % primes[j] == 0) {
                phi[i * primes[j]] = phi[i] * primes[j];
                break;
            }
            phi[i * primes[j]] = phi[i] * (primes[j] - 1);
        }
    }
}
```
</KnowledgeCard>

---

## 3. 中国剩余定理 (CRT)

中国剩余定理用于求解一元线性同余方程组。

### 3.1 问题描述
设 $m_1, m_2, \dots, m_k$ 两两互质，求解方程组：
$$
\begin{cases}
x \equiv a_1 \pmod{m_1} \\
x \equiv a_2 \pmod{m_2} \\
\vdots \\
x \equiv a_k \pmod{m_k}
\end{cases}
$$

### 3.2 构造性证明
令 $M = \prod_{i=1}^k m_i$，$M_i = M/m_i$。由于 $m_i$ 两两互质，$\gcd(M_i, m_i) = 1$，故存在 $t_i$ 使得 $M_i t_i \equiv 1 \pmod{m_i}$。
方程组的一个解为：
$$x = \sum_{i=1}^k a_i M_i t_i$$
在模 $M$ 意义下，该解是唯一的。

---

## 4. 原根 (Primitive Roots)

### 4.1 阶 (Order)
若 $\gcd(a, m) = 1$，使 $a^k \equiv 1 \pmod m$ 成立的最小正整数 $k$ 称为 $a$ 模 $m$ 的阶，记作 $\text{ord}_m(a)$。

### 4.2 原根定义
若 $\text{ord}_m(a) = \phi(m)$，则称 $a$ 是模 $m$ 的一个 **原根**。
当且仅当 $m = 2, 4, p^k, 2p^k$（$p$ 为奇素数）时，模 $m$ 存在原根。

---

## 5. 二次剩余 (Quadratic Residue)

### 5.1 定义
若方程 $x^2 \equiv a \pmod p$ 有解，则称 $a$ 是模 $p$ 的 **二次剩余**；否则称为二次非剩余。

### 5.2 勒让德符号 (Legendre Symbol)
$$
\left(\frac{a}{p}\right) = 
\begin{cases}
1 & a \text{ 是模 } p \text{ 的二次剩余} \\
-1 & a \text{ 是模 } p \text{ 的二次非剩余} \\
0 & p \mid a
\end{cases}
$$

### 5.3 欧拉判别准则
$$\left(\frac{a}{p}\right) \equiv a^{(p-1)/2} \pmod p$$

---

## 6. 密码学应用：RSA 原理

RSA 是基于大整数分解困难性的非对称加密算法。

### 6.1 算法流程
1. **生成密钥**：
   - 选择两个大素数 $p, q$，计算 $n = pq$。
   - 计算 $\phi(n) = (p-1)(q-1)$。
   - 选择 $e$ 使得 $1 < e < \phi(n)$ 且 $\gcd(e, \phi(n)) = 1$。
   - 计算 $d$ 使得 $ed \equiv 1 \pmod{\phi(n)}$。
   - **公钥** $(n, e)$，**私钥** $(n, d)$。
2. **加密**：$C = M^e \pmod n$。
3. **解密**：$M = C^d \pmod n$。

### 6.2 正确性证明
根据欧拉定理，若 $\gcd(M, n) = 1$，则 $M^{\phi(n)} \equiv 1 \pmod n$。
由于 $ed = k\phi(n) + 1$，则：
$$C^d \equiv (M^e)^d \equiv M^{ed} \equiv M^{k\phi(n)+1} \equiv (M^{\phi(n)})^k \cdot M \equiv 1^k \cdot M \equiv M \pmod n$$

---

## 7. 例题与练习

### 例题 1：线性同余方程组
求解方程组：
$x \equiv 2 \pmod 3$
$x \equiv 3 \pmod 5$
$x \equiv 2 \pmod 7$

<details>
<summary>查看解析</summary>

1. $M = 3 \times 5 \times 7 = 105$。
2. $M_1 = 35, M_2 = 21, M_3 = 15$。
3. 计算逆元：
   - $35 t_1 \equiv 1 \pmod 3 \implies 2t_1 \equiv 1 \pmod 3 \implies t_1 = 2$。
   - $21 t_2 \equiv 1 \pmod 5 \implies t_2 \equiv 1 \pmod 5 \implies t_2 = 1$。
   - $15 t_3 \equiv 1 \pmod 7 \implies t_3 \equiv 1 \pmod 7 \implies t_3 = 1$。
4. $x = 2 \cdot 35 \cdot 2 + 3 \cdot 21 \cdot 1 + 2 \cdot 15 \cdot 1 = 140 + 63 + 30 = 233$。
5. $233 \pmod{105} = 23$。
**结果**：$x \equiv 23 \pmod{105}$。

</details>

### 例题 2：RSA 加密模拟
令 $p=3, q=11$，选择公钥 $e=3$。求私钥 $d$ 并对明文 $M=5$ 进行加密。

<details>
<summary>查看解析</summary>

1. $n = 3 \times 11 = 33$。
2. $\phi(n) = (3-1)(11-1) = 20$。
3. 求解 $3d \equiv 1 \pmod{20}$。通过试除或 EXGCD 得到 $d=7$（因为 $3 \times 7 = 21 \equiv 1$）。
4. 加密：$C = 5^3 \pmod{33} = 125 \pmod{33} = 26$（$33 \times 3 = 99, 125-99 = 26$）。
**结果**：私钥 $d=7$，密文 $C=26$。

</details>

---

## 练习库

<details>
<summary>练习 1：费马小定理的应用</summary>
计算 $3^{2026} \pmod{17}$。

**解题思路**：
1. $17$ 是质数，$\gcd(3, 17) = 1$。
2. 根据费马小定理，$3^{16} \equiv 1 \pmod{17}$。
3. $2026 = 16 \times 126 + 10$。
4. $3^{2026} \equiv (3^{16})^{126} \cdot 3^{10} \equiv 1^{126} \cdot 3^{10} \equiv 3^{10} \pmod{17}$。
5. $3^5 = 243 \equiv 5 \pmod{17}$（$17 \times 14 = 238$）。
6. $3^{10} = (3^5)^2 \equiv 5^2 \equiv 25 \equiv 8 \pmod{17}$。
**答案**：$8$。
</details>

<details>
<summary>练习 2：二次剩余判断</summary>
判断 $10$ 是否为模 $13$ 的二次剩余。

**解题思路**：
使用欧拉判别准则：$\left(\frac{10}{13}\right) \equiv 10^{(13-1)/2} \equiv 10^6 \pmod{13}$。
1. $10^2 = 100 \equiv 9 \equiv -4 \pmod{13}$。
2. $10^6 = (10^2)^3 \equiv (-4)^3 \equiv -64 \pmod{13}$。
3. $-64 \pmod{13}$：$13 \times 5 = 65$，故 $-64 \equiv 1 \pmod{13}$。
**答案**：是二次剩余（因为结果为 $1$）。实际上 $6^2 = 36 \equiv 10 \pmod{13}$。
</details>

<details>
<summary>练习 3：阶的计算</summary>
求 $2$ 模 $7$ 的阶 $\text{ord}_7(2)$。

**解题思路**：
1. $2^1 = 2 \not\equiv 1 \pmod 7$。
2. $2^2 = 4 \not\equiv 1 \pmod 7$。
3. $2^3 = 8 \equiv 1 \pmod 7$。
**答案**：$3$。
</details>
