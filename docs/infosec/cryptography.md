---
title: 现代密码学精要 (Modern Cryptography)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Lock, Key, Hash, ShieldCheck, History, Zap, ShieldAlert, Binary, Sigma } from 'lucide-react';
import { motion } from 'framer-motion';

# 现代密码学：从信息熵到语义安全

> **公理**：在一个计算能力受限的敌手面前，一个安全的加密系统必须保证其密文不泄露关于明文的任何统计学信息。

## 1. 熵与完美安全性 (Entropy & Perfect Secrecy)

### 1.1 完美安全性的香农定义

设明文空间为 $\mathcal{M}$，密文空间为 $\mathcal{C}$，密钥空间为 $\mathcal{K}$。若对于任意明文 $m \in \mathcal{M}$ 和密文 $c \in \mathcal{C}$，满足：
$$P(M=m | C=c) = P(M=m)$$
则称该加密系统具有**完美安全性 (Perfect Secrecy)**。这意味着密文完全不改变敌手对明文的先验概率分布。

### 1.2 系统化熵增证明 (Entropy Proof)

利用信息论中的**互信息 (Mutual Information)** 概念：
$$I(M; C) = H(M) - H(M|C)$$
完美安全等价于 $I(M; C) = 0$。

**证明（One-Time Pad 的完美性）**：
1. 在 OTP 中，$c = m \oplus k$，其中 $k$ 是均匀分布的随机变量。
2. 对于固定的 $m$ 和 $c$，唯一的 $k = m \oplus c$ 使得加密成立。
3. $P(C=c | M=m) = P(K=m \oplus c) = \frac{1}{|\mathcal{K}|}$。
4. 由全概率公式，$P(C=c) = \sum_{m'} P(C=c|M=m')P(M=m') = \frac{1}{|\mathcal{K}|} \sum P(M=m') = \frac{1}{|\mathcal{K}|}$。
5. 由贝叶斯定理：
   $$P(M=m|C=c) = \frac{P(C=c|M=m)P(M=m)}{P(C=c)} = \frac{(1/|\mathcal{K}|)P(M=m)}{1/|\mathcal{K}|} = P(M=m)$$
$\square$ **结论**：只要密钥随机且长度不小于明文，密文的熵便掩盖了明文的所有特征。

---

## 2. 算法形式化与计算复杂度

### 2.1 语义安全 (Semantic Security)

在现代密码学中，我们放宽要求至**计算安全性**。一个系统是语义安全的，如果任何多项式时间算法（PPT）在观察到密文后，猜测明文特定属性的优势是**忽略不计 (Negligible)** 的。

### 2.2 对称加密的 SPN 网络量化

AES 的安全性源于**扩散 (Diffusion)** 与 **混乱 (Confusion)** 的量化保证。
- **混乱**：通过 $S$-Box 最小化输入与输出之间的相关性（非线性度）。
- **扩散**：通过 `MixColumns` 确保每一个明文比特的变化至少影响 $k$ 个密文比特（雪崩效应）。

---

## 3. 非对称加密与形式化验证逻辑

### 3.1 RSA 的形式化安全边界

RSA 的安全性依赖于**强 RSA 假设**。
- **形式化逻辑**：给定 $(n, e)$ 和 $c$，求 $m$ 使得 $m^e \equiv c \pmod n$。
- **攻击向量评估**：若敌手拥有能够高效解 $\phi(n)$ 的预示机 (Oracle)，RSA 即告破。

### 3.2 形式化协议验证 (Formal Protocol Verification)

为了防止协议设计逻辑错误（如协议重放），我们引入**状态机验证**。

**交互式证明逻辑示例 (DH 协议)**：
1. **状态 A**：Alice 发送 $g^a$。
2. **状态 B**：Bob 接收 $g^a$，回复 $g^b$。
3. **不变式 (Invariant)**：密钥 $K = g^{ab}$ 仅由持有 $a$ 或 $b$ 的实体知晓。
4. **验证**：利用 **Dolev-Yao 模型**，模拟敌手在截获所有信道消息的情况下，是否能推导出 $K$。

---

## 4. 深度模拟演示 (C++ Engineering)

### 4.1 完美随机数生成器 (PRNG) 与熵池模拟

<details>
<summary>点击查看 C++ 模拟：熵池注入与检测</summary>

```cpp
#include <iostream>
#include <vector>
#include <random>
#include <cmath>
#include <map>

// 计算香农熵
double calculate_entropy(const std::vector<unsigned char>& data) {
    std::map<unsigned char, int> freq;
    for (auto b : data) freq[b]++;
    double entropy = 0;
    for (auto const& [val, count] : freq) {
        double p = (double)count / data.size();
        entropy -= p * log2(p);
    }
    return entropy;
}

int main() {
    // 模拟不同来源的数据熵
    std::vector<unsigned char> low_entropy(1000, 0x41); // 全是 'A'
    
    std::random_device rd;
    std::vector<unsigned char> high_entropy;
    for(int i=0; i<1000; ++i) high_entropy.push_back(rd() % 256);

    std::cout << "Low Entropy Data (Fixed): " << calculate_entropy(low_entropy) << " bits" << std::endl;
    std::cout << "High Entropy Data (Hardware RD): " << calculate_entropy(high_entropy) << " bits" << std::endl;
    
    return 0;
}
```
</details>

### 4.2 RSA OAEP 填充逻辑模拟

为了实现语义安全，RSA 必须使用非确定性填充（如 OAEP）。

<details>
<summary>点击查看 RSA OAEP 形式化逻辑演示</summary>

```cpp
// 概念性伪代码演示 OAEP 的掩码生成 (MGF) 逻辑
#include <string>
#include <vector>

std::vector<char> mgf1(const std::vector<char>& seed, size_t mask_len) {
    // 利用 Hash 函数多次迭代生成掩码
    // 目的：将确定性明文转化为随机分布的密文块
    return {}; 
}

// 核心逻辑：
// 1. m' = (m || padding) XOR mgf(seed)
// 2. seed' = seed XOR mgf(m')
// 3. result = seed' || m'
```
</details>

---

## 5. 前沿：后量子密码学 (PQC)

随着 Shor 算法对 RSA/ECC 的威胁，**基于格的加密 (Lattice-based Cryptography)** 成为主流。其安全性建立在 **LWE (Learning With Errors)** 问题的困难性之上。

---

## 6. 综合练习 (Advanced Exercises)

### 练习 1：OTP 密钥重用攻击证明

**题目**：证明如果 OTP 的密钥 $k$ 被用于加密两个明文 $m_1, m_2$，则安全性被彻底破坏。

<details>
<summary>点击查看解析 (Check Solution)</summary>

**解析**：
1. $c_1 = m_1 \oplus k$
2. $c_2 = m_2 \oplus k$
3. 计算 $c_1 \oplus c_2 = (m_1 \oplus k) \oplus (m_2 \oplus k) = m_1 \oplus m_2$。
4. 敌手获得了两个明文的异或值。由于明文（如英文文本）具有高度统计特征，通过**词频分析**或**已知部分明文**，可以轻易恢复出 $m_1$ 和 $m_2$。
$\square$ **推论**：密钥必须是一次性的。
</details>

### 练习 2：形式化验证中的重放攻击

**题目**：在 DH 密钥交换中，如果 Bob 不验证 $A = g^a$ 的时效性，攻击者如何实施重放？

<details>
<summary>点击查看解析 (Check Solution)</summary>

**解析**：
1. 攻击者截获旧会话中的 $A$。
2. 在新会话中，攻击者假冒 Alice 向 Bob 发送旧的 $A$。
3. 如果 Bob 允许使用旧的 $A$，虽然攻击者不知道 $a$，无法解出 $K = B^a$，但攻击者可以利用这一逻辑漏洞干扰会话状态，或在某些特定实现下诱导 Bob 使用已泄露的旧密钥。
**防御**：引入 Nonce（随机数）或 Timestamps。
</details>
