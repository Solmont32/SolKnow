---
title: 字符串哈希
---

import { ShieldCheck, Zap, Hash, AlertTriangle } from 'lucide-react';

# 字符串哈希：从随机映射到 $O(1)$ 查询

字符串哈希是将不定长的字符串映射为定长整数的技术。其核心价值在于能够通过 $O(n)$ 的预处理，实现 $O(1)$ 时间内对任意子串的相等性判定。

## 1. 数学基础：多项式哈希 (Polynomial Rolling Hash)

对于字符串 $S = s_1 s_2 \dots s_n$，其哈希值定义为：
$H(S) = \left( \sum_{i=1}^n s_i \cdot B^{n-i} \right) \pmod M$
其中 $B$ 是基数 (Base)，$M$ 是模数 (Modulus)。

### 区间哈希公式
设 $h[i]$ 为前缀 $S[1 \dots i]$ 的哈希值，则子串 $S[l \dots r]$ 的哈希值为：
$H(S[l \dots r]) = (h[r] - h[l-1] \cdot B^{r-l+1}) \pmod M$

## 2. 系统化碰撞优化 (Collision Optimization)

### 2.1 生日悖论与碰撞概率
根据生日悖论，若模数为 $M$，在处理 $\sqrt{M}$ 个不同字符串时，发生碰撞的概率接近 $50\%$。
- 对于 $M = 2^{64}$ (使用 `unsigned long long` 自动溢出)，在处理 $10^9$ 个字符串时仍有一定碰撞风险。
- **Anti-Hash 数据**：某些精心构造的数据可以针对单模数哈希进行攻击。

### 2.2 双哈希策略 (Double Hashing)
为了极大降低碰撞概率，通常使用两组不同的 $(B, M)$ 计算哈希值：
$H_{double}(S) = (H_{B_1, M_1}(S), H_{B_2, M_2}(S))$
只有当两个哈希值都相等时，才判定字符串相等。此时碰撞概率降至 $1 / (M_1 M_2)$。

### 2.3 模数与基数的选择
- **基数 $B$**：应大于字符集大小，且建议选择较大的质数（如 $131, 13331, 23333$）。
- **模数 $M$**：
  - 大质数：$10^9+7, 10^9+9$。
  - 更大质数：$10^{18}+7, 10^{18}+3$ (配合 `__int128`)。
  - **避开 $2^{64}$**：在某些平台上，自然溢出哈希极易被构造数据卡掉。

## 3. C++ 高级实现 (双哈希版)

```cpp
#include <iostream>
#include <vector>

using namespace std;

typedef long long LL;

struct DoubleHash {
    const LL B1 = 131, M1 = 1e9 + 7;
    const LL B2 = 13331, M2 = 1e9 + 9;
    vector<LL> h1, h2, p1, p2;

    DoubleHash(string s) {
        int n = s.size();
        h1.resize(n + 1); h2.resize(n + 1);
        p1.resize(n + 1); p2.resize(n + 1);
        p1[0] = p2[0] = 1;
        for (int i = 1; i <= n; i++) {
            p1[i] = p1[i - 1] * B1 % M1;
            p2[i] = p2[i - 1] * B2 % M2;
            h1[i] = (h1[i - 1] * B1 + s[i - 1]) % M1;
            h2[i] = (h2[i - 1] * B2 + s[i - 1]) % M2;
        }
    }

    pair<LL, LL> get(int l, int r) {
        LL res1 = (h1[r] - h1[l - 1] * p1[r - l + 1] % M1 + M1) % M1;
        LL res2 = (h2[r] - h2[l - 1] * p2[r - l + 1] % M2 + M2) % M2;
        return {res1, res2};
    }
};
```

## 4. 经典应用

### 例题 1：最长公共子串 (LCS)
> 给定两个字符串 $A$ 和 $B$，求它们的最长公共子串长度。

<details>
<summary><Zap size={18} className="inline-block mr-1" /> 查看“二分+哈希”优化方案</summary>

**思路**：
二分答案长度 $L$。对于每个 $L$，将 $A$ 中所有长度为 $L$ 的子串哈希值存入 `set` 或 `unordered_set`，然后检查 $B$ 中是否存在相同的哈希值。

```cpp
bool check(int L, DoubleHash& ha, DoubleHash& hb, int n, int m) {
    unordered_set<LL> s; // 简便起见使用 LL 存储合并后的双哈希
    for (int i = 1; i + L - 1 <= n; i++) {
        auto val = ha.get(i, i + L - 1);
        s.insert(val.first << 32 | val.second);
    }
    for (int i = 1; i + L - 1 <= m; i++) {
        auto val = hb.get(i, i + L - 1);
        if (s.count(val.first << 32 | val.second)) return true;
    }
    return false;
}
```
</details>

## 5. 练习
1. [Luogu P3370] 字符串哈希模板。
2. [Codeforces 1200E] Compress Words - 动态维护哈希进行前缀匹配。
3. [USACO 2017 February Gold] Why Did the Cow Cross the Road II - 利用哈希判断路径一致性。
