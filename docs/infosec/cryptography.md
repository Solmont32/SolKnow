---
title: 现代密码学基础 (Modern Cryptography)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Lock, Key, Hash, ShieldCheck } from 'lucide-react';

# 现代密码学基础

> **核心定义**：密码学是研究如何隐藏信息以及确保信息真实性的科学，其安全性建立在数学问题的**计算复杂度**之上。

## 1. 密码学数学基础 (Mathematical Foundations)

现代密码学离不开数论的支持：
- **同余运算**：$a \equiv b \pmod n$。
- **大数分解问题**：RSA 安全性的基础。
- **离散对数问题 (DLP)**：Diffie-Hellman 与 ECC 安全性的基础。
- **欧拉函数 $\phi(n)$**：对于质数 $p$, $\phi(p) = p-1$。

## 2. 对称加密 (Symmetric Encryption)

加密和解密使用相同的密钥。

### 2.1 分组加密 (Block Cipher)
- **AES (Advanced Encryption Standard)**：目前最广泛使用的标准，支持 128/192/256 位密钥。
- **工作模式**：
  - **ECB (Electronic Codebook)**：独立加密，不安全，会暴露明文模式。
  - **CBC (Cipher Block Chaining)**：引入 IV，链式加密。
  - **GCM (Galois/Counter Mode)**：提供 **AEAD**（关联数据的认证加密），目前 TLS 1.3 的主流。

### 2.2 流加密 (Stream Cipher)
- **ChaCha20**：现代移动端优化的高速加密算法。

## 3. 非对称加密 (Asymmetric Encryption)

使用公钥加密，私钥解密。

### 3.1 RSA 算法
1. 选择两个大质数 $p, q$。
2. $n = p \times q, \phi(n) = (p-1)(q-1)$。
3. 选择公钥 $e$ 满足 $\gcd(e, \phi(n)) = 1$。
4. 计算私钥 $d$ 满足 $ed \equiv 1 \pmod{\phi(n)}$。
5. **加密**：$c = m^e \pmod n$；**解密**：$m = c^d \pmod n$。

### 3.2 椭圆曲线密码 (ECC)
利用椭圆曲线上的点加运算代替模幂运算，可以在更短的密钥长度下提供同等安全性。

## 4. 哈希函数与数字签名 (Hash & Signatures)

- **哈希函数 (SHA-256, SHA-3)**：抗碰撞性、单向性。
- **数字签名**：私钥签名，公钥验签，确保**不可否认性**。
- **HMAC**：基于哈希的消息认证码，确保数据**完整性**。

---

## 5. 深度例题与练习 (Exercises)

### 例题 1：RSA 手算练习
**题目**：已知 $p=3, q=11, e=3$，请计算私钥 $d$，并对明文 $m=2$ 进行加密。

<details>
<summary>点击查看解析 (Check Solution)</summary>

**解析步骤**：
1. $n = p \times q = 33$。
2. $\phi(n) = (3-1)(11-1) = 2 \times 10 = 20$。
3. 寻找 $d$ 满足 $3d \equiv 1 \pmod{20}$。通过试除，发现 $3 \times 7 = 21 \equiv 1 \pmod{20}$，故 **$d=7$**。
4. **加密**：$c = m^e \pmod n = 2^3 \pmod{33} = 8$。
**结论**：密文 $c=8$。
</details>

### 练习 1：Diffie-Hellman 密钥交换实现 (C++)
**题目**：实现一个简单的 DH 交换流程，计算共享密钥。

<details>
<summary>点击查看解析 (Check Solution)</summary>

**代码实现**：
```cpp
#include <iostream>
#include <cmath>

typedef long long ll;

// 快速幂计算 (a^b % m)
ll power(ll a, ll b, ll m) {
    ll res = 1;
    a %= m;
    while (b > 0) {
        if (b % 2 == 1) res = (res * a) % m;
        a = (a * a) % m;
        b /= 2;
    }
    return res;
}

int main() {
    ll p = 23; // 公共质数
    ll g = 5;  // 公共基数
    
    ll a = 6;  // Alice 的私钥
    ll A = power(g, a, p); // Alice 的公钥
    
    ll b = 15; // Bob 的私钥
    ll B = power(g, b, p); // Bob 的公钥
    
    ll secretA = power(B, a, p);
    ll secretB = power(A, b, p);
    
    std::cout << "Shared Secret A: " << secretA << std::endl;
    std::cout << "Shared Secret B: " << secretB << std::endl;
    return 0;
}
```
</details>

### 练习 2：哈希冲突与生日攻击
**题目**：若哈希值长度为 64 位，攻击者平均需要尝试多少个随机输入才能以 50% 的概率找到一对碰撞？（请写出估算公式）

<details>
<summary>点击查看解析 (Check Solution)</summary>

**解析**：
根据 **生日悖论 (Birthday Paradox)** 理论：
对于 $n$ 位的哈希值，其输出空间大小为 $N = 2^n$。
产生碰撞所需的尝试次数 $k$ 约为：
$k \approx \sqrt{2 \ln(2) \cdot N} \approx 1.17 \cdot \sqrt{N}$
对于 64 位哈希：
$k \approx \sqrt{2^{64}} = 2^{32}$。
**结论**：平均需要 $2^{32}$ 次尝试。
</details>
