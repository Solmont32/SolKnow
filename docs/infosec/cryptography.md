---
title: 现代密码学基础 (Modern Cryptography)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Lock, Key, Hash, ShieldCheck, History, Zap, ShieldAlert } from 'lucide-react';

# 现代密码学基础

> **核心定义**：密码学是研究如何隐藏信息以及确保信息真实性的科学。现代密码学的安全性建立在数学问题的**计算复杂度**之上，遵循 **Kerckhoffs's Principle**（系统的安全性应仅依赖于密钥的秘密性，而非算法的保密性）。

## 1. 经典加密：从置换到频率分析 (Classical Ciphers)

经典密码学主要依赖于**字符置换 (Substitution)** 和 **置换 (Transposition)**。

### 1.1 凯撒密码 (Caesar Cipher)
- **原理**：将字母表平移 $k$ 位。$c \equiv m + k \pmod{26}$。
- **破解**：由于密钥空间极小（仅 25 种可能），可通过穷举攻击轻松破解。

### 1.2 维吉尼亚密码 (Vigenère Cipher)
- **原理**：多表替换密码，密钥循环使用。
- **安全性分析**：虽然增加了复杂度，但由于其**周期性**，攻击者可以通过 **Kasiski 试验** 或 **重合指数 (Index of Coincidence)** 确定密钥长度，进而利用频率分析破解。

## 2. 密码学数学基础 (Mathematical Foundations)

现代密码学离不开数论的支持：
- **同余运算**：$a \equiv b \pmod n$。
- **费马小定理**：若 $p$ 为质数，则 $a^{p-1} \equiv 1 \pmod p$。
- **大数分解问题 (IFP)**：RSA 安全性的基础。
- **离散对数问题 (DLP)**：Diffie-Hellman 与 ECC 安全性的基础。
- **欧拉函数 $\phi(n)$**：对于质数 $p, q$，$\phi(pq) = (p-1)(q-1)$。

---

## 3. 对称加密：雪崩效应与扩散 (Symmetric Encryption)

### 3.1 分组加密 (Block Cipher) - AES
- **AES (Advanced Encryption Standard)**：基于 **SPN (Substitution-Permutation Network)** 结构。
- **关键阶段**：字节代换 (SubBytes)、行移位 (ShiftRows)、列混淆 (MixColumns)、轮密钥加 (AddRoundKey)。

### 3.2 工作模式与安全性
- **ECB (Electronic Codebook)**：**不安全**。相同的明文块产生相同的密文块，暴露图像/结构信息。
- **CBC (Cipher Block Chaining)**：引入 IV，每个块与前一个密文块异或。**注意**：容易受到 Padding Oracle 攻击。
- **GCM (Galois/Counter Mode)**：提供 **AEAD**（关联数据的认证加密），目前 TLS 1.3 的主流。

---

## 4. 非对称加密与 RSA 深度分析 (Asymmetric Encryption)

### 4.1 RSA 算法流程
1. 选择两个大质数 $p, q$，$n = p \times q$。
2. $\phi(n) = (p-1)(q-1)$。
3. 选择公钥 $e$，通常为 $65537$。
4. 计算私钥 $d \equiv e^{-1} \pmod{\phi(n)}$。
5. **加密**：$c = m^e \pmod n$；**解密**：$m = c^d \pmod n$。

### 4.2 RSA 常见攻击模型
- **低加密指数攻击 ($e=3$)**：若明文 $m$ 较小，满足 $m^3 < n$，则直接对密文开立方根即可获得明文。
- **共模攻击 (Common Modulus Attack)**：若两个用户使用相同的 $n$ 但不同的 $e_1, e_2$ 加密同一明文 $m$，且 $\gcd(e_1, e_2) = 1$，则攻击者可在不知晓 $d$ 的情况下恢复 $m$。
- **Wiener's Attack**：当私钥 $d < \frac{1}{3} n^{1/4}$ 时，可以利用连分数展开在多项式时间内分解 $n$。

---

## 5. 安全协议分析：Diffie-Hellman (DH)

DH 用于在不安全信道上协商密钥。

### 5.1 交互流程
1. Alice 与 Bob 协商大质数 $g, p$。
2. Alice 生成私钥 $a$，发送 $A = g^a \pmod p$。
3. Bob 生成私钥 $b$，发送 $B = g^b \pmod p$。
4. 共享密钥 $K = B^a \pmod p = A^b \pmod p$。

### 5.2 攻防模型：中间人攻击 (MITM)
- **威胁**：攻击者 Eve 截获 $A, B$，分别与 Alice 和 Bob 建立虚假的 DH 交换。
- **对策**：必须引入**身份认证**（如数字签名或证书），构成 **Authenticated DH (STS 协议)**。

---

## 6. 深度例题与练习 (Exercises)

### 例题 1：RSA 共模攻击验证 (C++)
**题目**：已知两个密文 $c_1, c_2$ 分别使用 $(n, e_1)$ 和 $(n, e_2)$ 加密。请实现一个函数恢复明文 $m$。

<details>
<summary>点击查看解析 (Check Solution)</summary>

**解析**：
利用扩展欧几里得算法求出 $s_1, s_2$ 使得 $s_1 e_1 + s_2 e_2 = 1$。
则 $c_1^{s_1} \cdot c_2^{s_2} \equiv (m^{e_1})^{s_1} \cdot (m^{e_2})^{s_2} \equiv m^{s_1 e_1 + s_2 e_2} \equiv m \pmod n$。

**C++ 实现**：
```cpp
#include <iostream>

typedef __int128_t int128; // 处理大数溢出

long long extended_gcd(long long a, long long b, long long &x, long long &y) {
    if (b == 0) { x = 1; y = 0; return a; }
    long long x1, y1;
    long long d = extended_gcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - y1 * (a / b);
    return d;
}

long long power(long long a, long long b, long long m) {
    int128 res = 1, base = a % m;
    bool neg = b < 0; b = neg ? -b : b;
    while (b > 0) {
        if (b % 2 == 1) res = (res * base) % m;
        base = (base * base) % m;
        b /= 2;
    }
    // 处理负指数情况（求逆元）
    if (neg) {
        long long x, y;
        extended_gcd((long long)res, m, x, y);
        return (x % m + m) % m;
    }
    return (long long)res;
}

long long common_modulus_attack(long long c1, long long c2, long long e1, long long e2, long long n) {
    long long s1, s2;
    extended_gcd(e1, e2, s1, s2);
    int128 m = (int128)power(c1, s1, n) * power(c2, s2, n) % n;
    return (long long)m;
}

int main() {
    // 示例数据
    long long n = 3233, e1 = 17, e2 = 13, m_orig = 42;
    long long c1 = power(m_orig, e1, n);
    long long c2 = power(m_orig, e2, n);
    
    std::cout << "Recovered m: " << common_modulus_attack(c1, c2, e1, e2, n) << std::endl;
    return 0;
}
```
</details>

### 练习 1：维吉尼亚密码重合指数分析
**题目**：解释为什么重合指数 (Index of Coincidence) 可以用来确定维吉尼亚密码的密钥长度。

<details>
<summary>点击查看解析 (Check Solution)</summary>

**解析**：
1. **重合指数** $IC$ 表示在一串文本中随机抽取两个字母相同的概率。
2. 英文文本的 $IC \approx 0.0667$，而随机生成的字母序列 $IC \approx 1/26 \approx 0.0385$。
3. 如果密钥长度为 $L$，我们将密文按 $L$ 分组。在每一组内，字母都是由同一个凯撒位移产生的，因此其分布符合英文特征，$IC$ 较高。
4. 若分组长度不等于 $L$，则组内字母等效于随机分布，$IC$ 较低。
**结论**：通过尝试不同的 $L$ 并计算平均 $IC$，值最大的 $L$ 即为可能的密钥长度。
</details>

### 练习 2：哈希函数抗碰撞性分析
**题目**：简述 SHA-1 碰撞攻击的原理及其对数字签名的影响。

<details>
<summary>点击查看解析 (Check Solution)</summary>

**解析**：
1. **原理**：SHA-1 存在数学上的弱点。2017 年 Google 演示了 **SHAttered 攻击**，利用差分分析在 $2^{63}$ 次尝试（远低于理想的 $2^{80}$）内找到了两份内容不同但哈希值相同的 PDF 文件。
2. **对数字签名的影响**：数字签名的安全性依赖于哈希值的唯一性。如果攻击者能构造两个不同文档 $D_1, D_2$ 使得 $H(D_1) = H(D_2)$，则受害者对 $D_1$ 的签名将被视为对 $D_2$ 同样有效，导致**伪造攻击**。
**对策**：全面迁移至 SHA-256 或 SHA-3。
</details>

