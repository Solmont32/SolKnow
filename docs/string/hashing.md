---
title: 字符串哈希
---

import { ShieldCheck, Zap, Hash, AlertTriangle, Scale, Network, Info } from 'lucide-react';
import CodeCollapse from '@site/src/components/CodeCollapse';

# 字符串哈希：高效判等与随机化算法

字符串哈希是将字符串映射为固定长度整数的技术。它通过 $O(N)$ 预处理，换取 $O(1)$ 的子串相等性判定，是处理子串匹配、去重及复杂结构对比的有力工具。

## 1. 数学模型：多项式哈希

对于字符串 $S = s_1 s_2 \dots s_n$，其哈希值 $H(S)$ 定义为：

$$
H(S) = \left( \sum_{i=1}^n s_i \cdot B^{n-i} \right) \pmod M
$$

其中 $B$（Base）为基数，$M$（Modulus）为模数。

### 1.1 区间哈希公式

$$ H(S[l \dots r]) = (h[r] - h[l-1] \cdot B^{r-l+1}) \pmod M $$

## 2. 安全性与碰撞深度分析 (Collision Analysis)

### 2.1 生日悖论与碰撞风险

在处理 $K$ 个不同的子串时，发生碰撞（$H(S_i) = H(S_j)$ 但 $S_i \neq S_j$）的概率 $P$ 满足：
$$ P \approx 1 - e^{-\frac{K(K-1)}{2M}} \approx 1 - e^{-\frac{K^2}{2M}} $$

<div className="flex gap-2 mb-4">
  <span className="badge badge--danger"><AlertTriangle size={14} className="mr-1" /> $10^9$ Mod: Unsafe</span>
  <span className="badge badge--success"><ShieldCheck size={14} className="mr-1" /> $2^{61}-1$ Mod: Secure</span>
</div>

- **概率推演**：若 $M = 10^9$，$K \approx 4 \times 10^4$ 时碰撞概率即达 $50\%$。
- **结论**：对于 $10^5$ 量级的数据，单模数 $10^9$ 极不安全。**双哈希 (Double Hash)** 或 **梅森素数 (Mersenne Prime) 哈希** 是标准防线。

### 2.2 抗攻击方案：$2^{61}-1$ 哈希

使用梅森素数 $M = 2^{61}-1$。

1. **极大模数**：$M \approx 2.3 \times 10^{18}$，碰撞概率降至极低。
2. **位运算加速**：利用 $a \cdot 2^{61} + b \equiv a + b \pmod{2^{61}-1}$ 实现快速取模。

### 2.3 自然溢出与 Thue-Morse 攻击

虽然 `unsigned long long` 自动取模极快，但存在**Thue-Morse 序列**攻击。该序列定义的字符串 $S$ 满足：$S_0 = "a", S_i = S_{i-1} + \overline{S_{i-1}}$。

- **攻击原理**：对于任意基数 $B$，该序列构造出的两个不同字符串在 $2^{k}$ 模数下具有相同的哈希值。
- **防御策略**：
  - 使用大质数取模。
  - **基数随机化**：使用 `mt19937` 生成随机基数 $B \in [|\Sigma|, M)$。

<CodeCollapse title="双哈希与 2^61-1 实现 (C++)" language="cpp">


### 例题：最长公共子串 (二分 + 哈希)

> 在 $O(N \log N)$ 时间内求两个串的最长公共子串。

<details>
<summary>Check Solution</summary>

**思路**：

1. 二分答案长度 $L$。
2. 计算 $A$ 中所有长度为 $L$ 的哈希值并存入 `hash_set`。
3. 检查 $B$ 中是否存在相同的哈希值。

</details>

---

## 🎯 练习题清单

1. [Luogu P3370] 字符串哈希模板。
2. [POJ 2774] Longest Common Substring：哈希 + 二分。
3. [Luogu P5043] 树同构：树哈希应用。
4. [CF 1200E] Compress Words：利用哈希加速合并。
