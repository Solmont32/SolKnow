---
title: 现代密码学精要 (Modern Cryptography)
description: 从数论硬核难题、对称/公钥体系到协议安全性证明与 CTF 实战建模
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Lock, Key, Hash, ShieldCheck, History, Zap, ShieldAlert, Binary, Sigma, Cpu, Network, Box, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

# 现代密码学：从数论难题到安全性约简证明

> **公理系统**：现代密码学的安全性不依赖于算法的“秘密性”，而仅依赖于密钥的秘密性（Kerckhoffs 原理），其安全性必须建立在可量化的**计算复杂性难题**之上。

---

## 1. 信息论与完美安全性 (Foundations)

### 1.1 香农熵与 OTP 证明
设明文空间为 $\mathcal{M}$，密钥空间为 $\mathcal{K}$，密文空间为 $\mathcal{C}$。**一次一密 (One-Time Pad)** 的完美安全性证明基于以下逻辑：
若 $|\mathcal{K}| = |\mathcal{M}| = |\mathcal{C}|$，密钥 $k$ 均匀随机选择且仅使用一次。对于任意明文 $m \in \mathcal{M}$ 和密文 $c \in \mathcal{C}$，有：
$$P(C=c | M=m) = P(K = c \oplus m) = \frac{1}{|\mathcal{K}|}$$
利用贝叶斯公式推导出后验概率等于先验概率：
$$P(M=m | C=c) = \frac{P(C=c | M=m) P(M=m)}{P(C=c)} = \frac{\frac{1}{|\mathcal{K}|} P(M=m)}{\frac{1}{|\mathcal{K}|}} = P(M=m)$$
**结论**：观察到密文 $c$ 后，敌手对明文分布的认知没有任何提升（互信息 $I(M;C) = 0$）。

---

## 2. 数论困难问题与形式化推导 (Hard Problems)

### 2.1 离散对数问题 (DLP) 与 DDH 假设
在循环群 $\mathbb{G}$ 中，已知 $g$ 和 $g^x$，求解 $x$ 被称为 **DLP**。
- **计算性 Diffie-Hellman (CDH)**：已知 $(g, g^a, g^b)$，求解 $g^{ab}$。
- **判定性 Diffie-Hellman (DDH)**：区分 $(g, g^a, g^b, g^{ab})$ 与 $(g, g^a, g^b, g^z)$，其中 $z \leftarrow \mathbb{Z}_q$。
- **关系**：$DDH \le CDH \le DLP$。即 DDH 是最容易被攻破的（安全性假设最强）。

### 2.2 椭圆曲线标量乘法 (ECSM)
椭圆曲线在素数域 $\mathbb{F}_p$ 上的方程为 $y^2 = x^3 + ax + b \pmod p$。
- **加法法则**：给定 $P, Q \in E(\mathbb{F}_p)$，直线 $PQ$ 与曲线的第三个交点关于 $x$ 轴的对称点即为 $P+Q$。
- **安全性边界**：对于 $n$ 位素数域，ECC 提供 $n/2$ 位的安全强度（抗 Pollard's Rho 攻击）。

---

## 3. 形式化安全性约简与证明 (Security Reductions)

### 3.1 IND-CPA 安全性证明：ElGamal 加密
**定义**：一个方案是 IND-CPA 安全的，如果任何多项式时间敌手在选择明文攻击下的优势 $Adv_{\mathcal{A}}^{IND-CPA}$ 是可忽略的。

**证明（约简到 DDH）**：
1. 假设存在敌手 $\mathcal{A}$ 以不可忽略的优势攻破 ElGamal。
2. 构建算法 $\mathcal{B}$ 解决 DDH：输入 $(g, A=g^a, B=g^b, Z)$。
3. $\mathcal{B}$ 将公钥设为 $pk=A$，发送给 $\mathcal{A}$。
4. $\mathcal{A}$ 返回 $m_0, m_1$。$\mathcal{B}$ 随机选 $b \in \{0,1\}$，计算挑战密文 $C = (B, Z \cdot m_b)$。
5. 如果 $Z=g^{ab}$，则 $C$ 是 $m_b$ 的合法加密。
6. 如果 $Z$ 是随机值，则 $C$ 与 $m_b$ 统计独立。
7. $\mathcal{B}$ 根据 $\mathcal{A}$ 的输出判断 $Z$ 是否为 $g^{ab}$。$\mathcal{A}$ 的优势直接转化为 $\mathcal{B}$ 的 DDH 优势。

### 3.2 数字签名的安全性：EUF-CMA
**定义**：**存在性不可伪造性 (Existential Unforgeability under Chosen Message Attack)**。
- 敌手可以获得任意消息 $m_i$ 的签名 $\sigma_i$。
- 目标：生成一个从未请求过签名的消息 $m^*$ 及其合法签名 $\sigma^*$。
- **RSA-PSS**：通过引入随机盐和哈希掩码（MGF），证明了在随机预言机模型下可以约简到 RSA 难题。

---

## 4. 深度模拟演示 (C++ Security Engineering)

### 4.1 哈希函数抗碰撞性证明模拟
<details>
<summary>点击查看 C++ 实现：生日攻击 (Birthday Attack) 的概率模拟</summary>

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <random>
#include <iomanip>

// 模拟 n 位哈希值的碰撞概率
void birthday_paradox_simulation(int hash_bits, int trials) {
    long long space_size = 1LL << hash_bits;
    int collisions = 0;
    
    for (int t = 0; t < trials; ++t) {
        std::unordered_map<long long, bool> seen;
        std::mt19937_64 rng(t);
        std::uniform_int_distribution<long long> dist(0, space_size - 1);
        
        int count = 0;
        while (true) {
            long long val = dist(rng);
            if (seen.count(val)) break;
            seen[val] = true;
            count++;
        }
        collisions += count;
    }
    
    double avg_count = (double)collisions / trials;
    std::cout << "Bits: " << hash_bits << ", Space: " << space_size << "\n";
    std::cout << "Avg attempts for collision: " << std::fixed << std::setprecision(2) << avg_count << "\n";
    std::cout << "Theoretical (sqrt(pi/2 * N)): " << std::sqrt(1.253 * space_size) << "\n";
}

int main() {
    birthday_paradox_simulation(16, 100);
    birthday_paradox_simulation(20, 100);
    return 0;
}
```
</details>

---

## 5. 综合练习 (Advanced Exercises)

### 练习 1：公钥基础设施 (PKI) 与中间人攻击 (MITM)
**题目**：虽然 RSA/ECC 在数学上是安全的，但为什么在缺乏 PKI 的情况下，敌手仍能通过替换 $pk$ 来解密通信内容？请描述其逻辑链。

<details>
<summary>点击查看解析</summary>

**解析**：
1. **身份绑定缺失**：公钥算法本身只保证“持有私钥者可解密”，而不保证“持有私钥者是 Alice”。
2. **攻击链**：
   - 敌手 $E$ 截获 Alice 发给 Bob 的公钥 $pk_A$。
   - $E$ 将自己的公钥 $pk_E$ 发送给 Bob，声称这是 Alice 的公钥。
   - Bob 用 $pk_E$ 加密消息 $m$。
   - $E$ 截获密文，用 $sk_E$ 解密获得 $m$。
3. **防御**：引入 **CA (Certificate Authority)** 对 $(Identity, pk)$ 的绑定关系进行数字签名。
</details>

### 练习 2：散列函数的长度扩展攻击 (Length Extension)
**题目**：对于基于 Merkle–Damgård 结构的哈希（如 MD5, SHA-1, SHA-256），为什么 $Hash(key \| message)$ 作为 MAC 是不安全的？

<details>
<summary>点击查看解析</summary>

**解析**：
1. **结构特性**：MD 结构中，$Hash(M)$ 的输出实际上是处理完最后一个块后的内部状态。
2. **攻击逻辑**：已知 $H = Hash(secret \| m)$，即使不知道 $secret$，敌手也可以从 $H$ 开始，继续吸收附加消息 $m_{ext}$。
3. **伪造结果**：$Hash(secret \| m \| padding \| m_{ext})$ 可以直接计算出来。
4. **防御**：使用 **HMAC**：$Hash( (K \oplus opad) \| Hash((K \oplus ipad) \| m) )$。
</details>
