---
title: 字符串哈希
---

import { ShieldCheck, Zap, Hash, AlertTriangle, Scale, Network } from 'lucide-react';

# 字符串哈希：高效判等与随机化算法

字符串哈希是将字符串映射为固定长度整数的技术。它的核心优势在于能够以 $O(N)$ 预处理换取 $O(1)$ 的子串相等性判定，是处理子串匹配、去重及复杂结构对比的有力工具。

## 1. 数学模型：多项式哈希

对于字符串 $S = s_1 s_2 \dots s_n$，其哈希值 $H(S)$ 定义为：
$$
H(S) = \left( \sum_{i=1}^n s_i \cdot B^{n-i} \right) \pmod M
$$
其中 $B$（Base）是基数，$M$（Modulus）是模数。

### 1.1 区间哈希公式
预处理前缀哈希 $h[i]$：
$$
H(S[l \dots r]) = (h[r] - h[l-1] \cdot B^{r-l+1}) \pmod M
$$

## 2. 碰撞分析与抗攻击

### 2.1 生日悖论与碰撞概率
对于模数 $M$，在处理 $K$ 个不同的字符串时，发生碰撞（即存在 $H(S_i) = H(S_j)$ 但 $S_i \neq S_j$）的概率 $P$ 满足：
$$ P \approx 1 - e^{-K^2 / 2M} $$
- **风险阈值**：若 $M = 10^9$，$K \approx 40000$ 时碰撞概率即达 $50\%$。对于竞赛中常见的 $10^5$ 规模数据，单模数哈希极易被卡。
- **解决方案**：使用**双哈希**（使用两个互质的大模数）或**大质数哈希**（如 $2^{61}-1$）。

### 2.2 自然溢出的风险 (Anti-hash)
许多开发者倾向于使用 `unsigned long long` 的自然溢出（等价于 $M = 2^{64}$）。
**攻击原理**：存在特定的构造方法（如 Thue-Morse 序列），使得在 $2^{64}$ 模数下，极短的字符串也能产生哈希碰撞。因此，在严谨的竞赛中，应优先选择双大质数哈希。

### 2.3 双哈希标准模板 (C++)
```cpp
struct HashVal {
    int v1, v2;
    bool operator==(const HashVal& o) const { return v1 == o.v1 && v2 == o.v2; }
};

const int M1 = 1e9 + 7, M2 = 1e9 + 9, B = 131;
long long p1[MAXN], p2[MAXN];

void init_pow() {
    p1[0] = p2[0] = 1;
    for (int i = 1; i < MAXN; i++) {
        p1[i] = p1[i-1] * B % M1;
        p2[i] = p2[i-1] * B % M2;
    }
}

HashVal get_hash(int l, int r, long long h1[], long long h2[]) {
    int res1 = (h1[r] - h1[l-1] * p1[r-l+1] % M1 + M1) % M1;
    int res2 = (h2[r] - h2[l-1] * p2[r-l+1] % M2 + M2) % M2;
    return {res1, res2};
}
```

## 3. 高级应用

### 例题 1：最长公共子串 (二分 + 哈希)
> 给定两个字符串 $A$ 和 $B$，求它们的最长公共子串长度。

<details>
<summary><Zap size={18} className="inline-block mr-1" /> 查看 $O(N \log N)$ 方案</summary>

**思路**：
1. 子串长度具有单调性：若存在长度为 $L$ 的公共子串，则必存在长度为 $L-1$ 的。
2. 二分长度 $L$。
3. 提取 $A$ 中所有长度为 $L$ 的子串哈希值存入 `std::set` 或 `unordered_set`。
4. 检查 $B$ 中是否存在相同哈希值的子串。

```cpp
bool check(int len) {
    set<pair<int, int>> seen;
    for (int i = 1; i + len - 1 <= n; i++) 
        seen.insert(get_hash(i, i + len - 1));
    for (int i = 1; i + len - 1 <= m; i++)
        if (seen.count(get_hash(i, i + len - 1))) return true;
    return false;
}
```
</details>

### 例题 2：树哈希 (Tree Hashing)
> 判断两棵无根树是否同构。

<details>
<summary><Network size={18} className="inline-block mr-1" /> 查看 C++ 实现</summary>

```cpp
typedef unsigned long long ull;
ull shift(ull x) {
    x ^= x << 13;
    x ^= x >> 7;
    x ^= x << 17;
    return x;
}
ull get_hash(int u, int f) {
    ull res = 1;
    for (int v : adj[u]) {
        if (v == f) continue;
        res += shift(get_hash(v, u));
    }
    return res;
}
```
</details>

## 4. 练习
1. [Luogu P3370] 字符串哈希模板。
2. [Codeforces 514C] Watto and Mechanism - 允许一位不同的哈希匹配。
3. [Luogu P5043] 树同构模板。
4. [AtCoder ABC284F] ABCBAC - 哈希处理翻转拼接。
