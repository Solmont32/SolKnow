---
title: 字符串哈希
---

import { ShieldCheck, Zap, Hash, AlertTriangle, Scale, Network } from 'lucide-react';
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
预处理前缀哈希 $h[i]$：
$$
H(S[l \dots r]) = (h[r] - h[l-1] \cdot B^{r-l+1}) \pmod M
$$

<CodeCollapse title="字符串哈希核心实现" language="cpp">

```cpp
typedef unsigned long long ull;
const ull B = 131; // 常用基数：131, 13331, 133331
ull h[MAXN], p[MAXN];

void init_hash(const string& s) {
    p[0] = 1;
    for (int i = 1; i <= s.length(); i++) {
        h[i] = h[i-1] * B + s[i-1];
        p[i] = p[i-1] * B;
    }
}

ull get_hash(int l, int r) {
    return h[r] - h[l-1] * p[r-l+1];
}
```

</CodeCollapse>

## 2. 安全性与抗攻击：模数选择

### 2.1 生日悖论与碰撞风险
在处理 $K$ 个不同的子串时，发生碰撞（$H(S_i) = H(S_j)$ 但 $S_i \neq S_j$）的概率 $P \approx 1 - e^{-K^2 / 2M}$。
- 若 $M = 10^9$，$K \approx 4 \times 10^4$ 时碰撞概率即达 $50\%$。
- **推荐策略**：
  1. **双哈希**：使用两对 $(B, M)$。例如 $(131, 10^9+7)$ 与 $(13331, 10^9+9)$。
  2. **大质数哈希**：使用 $M = 2^{61}-1$ (Mersenne Prime)。

### 2.2 自然溢出的隐患
虽然 `unsigned long long` 自动取模 $2^{64}$ 极快，但存在**构造攻击**（如针对 $2^{64}$ 模数的特殊 Thue-Morse 序列），在严谨竞赛中建议手动取模大质数。

## 3. 高级应用场景

### 例题 1：最长公共子串 (二分 + 哈希)
> 在 $O(N \log N)$ 时间内求两个串的最长公共子串。

<details>
<summary>Check Solution</summary>

**思路**：
二分答案长度 $L$，将串 $A$ 所有长度为 $L$ 的哈希值插入 `unordered_set`，再遍历串 $B$ 检查。

```cpp
bool check(int L) {
    unordered_set<ull> st;
    for (int i = 1; i + L - 1 <= n; i++) st.insert(get_hash_A(i, i + L - 1));
    for (int i = 1; i + L - 1 <= m; i++) if (st.count(get_hash_B(i, i + L - 1))) return true;
    return false;
}
```
</details>

### 例题 2：[Codeforces 514C] Watto and Mechanism
> 给定 $n$ 个标准串，询问一个查询串是否能通过恰好修改一个字符变成某个标准串。

<details>
<summary>Check Solution</summary>

**思路**：
预处理所有标准串的哈希值存入 `set`。对于查询串 $S$，枚举修改位置 $i$ 和修改后的字符 $c$，利用 $O(1)$ 哈希公式快速计算新串哈希值并查询。
$$ H_{new} = H_{old} - (S[i] \cdot B^{len-i-1}) + (c \cdot B^{len-i-1}) $$

```cpp
bool solve() {
    ull current_h = get_query_hash();
    for (int i = 0; i < len; i++) {
        for (char c = 'a'; c <= 'c'; c++) {
            if (c == query_s[i]) continue;
            ull next_h = current_h - (query_s[i] * p[len-i-1]) + (c * p[len-i-1]);
            if (standards.count(next_h)) return true;
        }
    }
    return false;
}
```
</details>

---

## 🎯 练习题清单
1. [Luogu P3370] 字符串哈希模板：初步实践。
2. [POJ 2774] Longest Common Substring：哈希 + 二分。
3. [Luogu P5043] 树同构：树哈希应用。
4. [CF 1200E] Compress Words：利用哈希加速前缀后缀匹配合并。
