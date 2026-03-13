---
title: 现代密码学精要 (Modern Cryptography)
description: 从数论硬核难题、对称/公钥体系到协议安全性证明与 CTF 实战建模
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Lock, Key, Hash, ShieldCheck, History, Zap, ShieldAlert, Binary, Sigma, Cpu, Network } from 'lucide-react';
import { motion } from 'framer-motion';

# 现代密码学：从数论难题到协议安全建模

> **公理系统**：现代密码学的安全性不依赖于算法的“秘密性”，而仅依赖于密钥的秘密性（Kerckhoffs 原理），其安全性必须建立在可量化的**计算复杂性难题**之上。

---

## 1. 信息论与完美安全性 (Foundations)

### 1.1 香农熵与 OTP 证明
设明文空间为 $\mathcal{M}$，密钥空间为 $\mathcal{K}$。**一次一密 (One-Time Pad)** 的完美安全性证明基于以下逻辑：
若 $|\mathcal{K}| = |\mathcal{M}|$ 且密钥 $k$ 均匀分布，则对于任意 $c \in \mathcal{C}$：
$$P(C=c | M=m) = \frac{1}{|\mathcal{K}|}$$
由此推导出后验概率等于先验概率 $P(M=m|C=c) = P(M=m)$。

---

## 2. 数论困难问题分析 (Hard Problems)

现代非对称加密的安全性支柱是以下三大数学硬核难题：

### 2.1 大整数分解问题 (IFP)
- **定义**：给定合数 $n = p \cdot q$，在多项式时间内求解 $p$ 和 $q$。
- **复杂度**：目前最快算法为 **GNFS (通用数域筛法)**，复杂度为 $\exp\left(\left(\sqrt[3]{\frac{64}{9}} + o(1)\right) (\ln n)^{1/3} (\ln \ln n)^{2/3}\right)$。
- **应用**：RSA 密码体系。

### 2.2 离散对数问题 (DLP)
- **定义**：给定有限循环群 $G$ 及其生成元 $g$，已知 $y = g^x \pmod p$，求解 $x$。
- **亚指数特征**：在素数域 $\mathbb{F}_p^*$ 上，存在指数演算攻击；但在**椭圆曲线群 (ECDLP)** 上，目前仅知指数级算法（如 Rho 算法），这使得 ECC 在更短密钥下具备同等安全性。

### 2.3 容错学习问题 (LWE) - 后量子核心
- **定义**：给定一组近似线性方程 $b_i \approx \langle a_i, s \rangle \pmod q$，其中包含微小噪声 $e_i$。在格理论中，找到 $s$ 被证明等价于找到格中的最短向量 (SVP)，这是对抗量子搜索的关键。

---

## 3. 对称加密与一致性评估 (Symmetric Systems)

### 3.1 SPN 网络与 AES 形式化
AES 采用 **Substitution-Permutation Network (SPN)** 结构：
1. **SubBytes**：非线性层，通过 $GF(2^8)$ 上的逆元运算破坏代数特性。
2. **ShiftRows / MixColumns**：线性层，提供**扩散 (Diffusion)**，确保 1 bit 的输入变化在两轮内影响全块。
3. **AddRoundKey**：白化层，引入密钥熵。

### 3.2 分组模式与安全性 (Modes of Operation)
| 模式 | 特性 | 安全性评估 |
| :--- | :--- | :--- |
| **ECB** | 确定性映射 | **不安全**：泄露明文统计特征。 |
| **CBC** | 链接模式 | 需随机 IV，易受 **Padding Oracle** 攻击。 |
| **GCM** | AEAD (认证加密) | 提供机密性与**完整性校验 (GHASH)**，抗重放，工业标准。 |

---

## 4. 协议安全性证明 (Security Proofs)

### 4.1 安全游戏建模 (Security Games)
我们通过敌手（Adversary）与挑战者（Challenger）之间的博弈来定义安全性：

- **IND-CPA (选择明文攻击下的不可区分性)**：
  1. 敌手提交两个等长明文 $m_0, m_1$。
  2. 挑战者随机加密其中之一 $c = E_k(m_b)$。
  3. 敌手若能以显著大于 $1/2$ 的概率猜出 $b$，则系统不具备 CPA 安全。
- **IND-CCA2 (自适应选择密文攻击)**：
  允许敌手在挑战前后期解密除 $c$ 以外的任何密文。**RSA 原生是不支持 CCA2 的（同态特性）**，必须配合 OAEP 填充。

---

## 5. CTF 实战建模与攻击向量 (CTF Modeling)

### 5.1 RSA 常见攻击向量逻辑
1. **低指数攻击 ($e=3$)**：若同一明文发给 3 个不同用户，利用中国剩余定理 (CRT) 可直接开三次方恢复明文。
2. **Wiener 攻击**：若 $d < \frac{1}{3} n^{1/4}$，可利用连分数展开在多项式时间内分解 $n$。
3. **Coppersmith 定理**：若已知明文的高位信息，可通过格规约（LLL 算法）求解剩余部分。

---

## 6. 深度模拟演示 (C++ Engineering)

### 6.1 AES S-Box 变换模拟
<details>
<summary>点击查看 C++ 模拟：S-Box 的代数构造与非线性度验证</summary>

```cpp
#include <iostream>
#include <iomanip>

// AES S-Box 生成逻辑的核心：GF(2^8) 逆元 + 仿射变换
unsigned char apply_sbox(unsigned char b) {
    // 此处简化为查表，但在建模中，b = 0 时映射为 0
    // 然后进行仿射变换：b' = b ^ (b<<1) ^ (b<<2) ^ (b<<3) ^ (b<<4) ^ 0x63
    static const unsigned char sbox[256] = { /* ... 完整 AES S-Box ... */ 0x63, 0x7c, 0x77, 0x7b }; 
    return sbox[b];
}

int main() {
    unsigned char input = 0x42;
    std::cout << "Input: 0x42 -> S-Box Output: 0x" 
              << std::hex << (int)apply_sbox(input) << std::endl;
    // 逻辑验证：验证非线性度（输入异或分布）
    return 0;
}
```
</details>

### 6.2 RSA Wiener 攻击逻辑验证 (连分数法)
<details>
<summary>点击查看 C++ 模拟：基于连分数的私钥恢复</summary>

```cpp
#include <iostream>
#include <vector>
#include <gmpxx.h> // 需要 GMP 库进行大数运算

// 模拟连分数展开：找到 e/n 的渐近分数 k/d
void wiener_attack(mpz_class e, mpz_class n) {
    std::vector<mpz_class> q; // 连分数商
    mpz_class a = e, b = n;
    while (b != 0) {
        q.push_back(a / b);
        mpz_class t = a % b; a = b; b = t;
    }
    
    // 遍历渐近分数进行私钥验证...
    std::cout << "Searching for d via continued fractions..." << std::endl;
}
```
</details>

---

## 7. 综合练习 (Textbook Exercises)

### 练习 1：ElGamal 的 CPA 安全性证明
**题目**：证明如果 DDH (判定性 Diffie-Hellman) 假设成立，则 ElGamal 加密方案是 IND-CPA 安全的。

<details>
<summary>点击查看形式化证明</summary>

**证明**：
1. 设敌手 $\mathcal{A}$ 能够区分 $c = (g^r, m_b \cdot h^r)$。
2. 我们可以构建一个算法 $\mathcal{B}$ 解决 DDH 问题：给定 $(g^a, g^b, Z)$，判断 $Z$ 是 $g^{ab}$ 还是随机数。
3. $\mathcal{B}$ 设置公钥 $h = g^a$，挑战密文 $c = (g^b, m \cdot Z)$。
4. 若 $Z = g^{ab}$，则 $c$ 是合法的 ElGamal 密文；若 $Z$ 是随机数，则密文不包含 $m$ 的任何信息。
5. 因此，区分密文的能力直接等价于解决 DDH 问题的能力。
$\square$
</details>

### 练习 2：CBC 模式的 Bit-Flipping 攻击
**题目**：在 CBC 模式中，若攻击者已知密文 $c_{i-1}$ 对应明文 $m_i$，如何通过修改 $c_{i-1}$ 将 $m_i$ 的特定字节修改为目标值 $X$？

<details>
<summary>点击查看解析与 C++ 模拟</summary>

**核心逻辑**：
在 CBC 中，$m_i = D_k(c_i) \oplus c_{i-1}$。
设我们想把 $m_i$ 改为 $m'_i$：
1. 令 $c'_{i-1} = c_{i-1} \oplus m_i \oplus m'_i$。
2. 接收方解密时：$m^{new}_i = D_k(c_i) \oplus c'_{i-1} = D_k(c_i) \oplus c_{i-1} \oplus m_i \oplus m'_i = m_i \oplus m_i \oplus m'_i = m'_i$。
**副作用**：修改 $c_{i-1}$ 会导致 $m_{i-1}$ 彻底变成乱码（解密失败），但在某些协议（如认证缺失的登录包）中，这足以绕过检查。
</details>
