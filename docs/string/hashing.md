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

### 2.1 生日悖论 (Birthday Paradox)
对于模数 $M$，在处理 $K$ 个不同的字符串时，发生碰撞的概率 $P \approx 1 - e^{-K^2 / 2M}$。
- 若 $M = 10^9$，当 $K \approx 40000$ 时，碰撞概率即达到 $50\%$。
- **结论**：单模数 $10^9$ 级别的哈希在处理大量数据时极不安全。

### 2.2 推荐参数组合
| 方案 | 基数 $B$ | 模数 $M$ | 安全等级 |
| :--- | :--- | :--- | :--- |
| 单哈希 (自然溢出) | $131, 233$ | $2^{64}$ | 低 (易被 Anti-hash 构造卡掉) |
| 单大质数哈希 | $13331$ | $10^{18}+7$ | 中 (需配合 `__int128`) |
| **双哈希** | $131, 13331$ | $(10^9+7, 10^9+9)$ | **高** |

## 3. 高级应用

### 3.1 树哈希 (Tree Hashing)
哈希思想可以扩展到非线性结构。判断两棵无根树是否同构：
$$
H(u) = 1 + \sum_{v \in son(u)} f(H(v))
$$
其中 $f(x)$ 是一个随机映射函数（如 $f(x) = \text{shift}(x)$ 或使用特定质数映射）。

### 例题 1：最长公共子回文串
> 给定两个字符串 $A$ 和 $B$，求它们的最长公共回文子串长度。

<details>
<summary><Scale size={18} className="inline-block mr-1" /> 查看“Manacher + 哈希 + 二分”方案</summary>

**思路**：
1. 先对 $A$ 跑 Manacher 得到所有回文中心及其半径。
2. 二分答案 $L$。
3. 提取 $A$ 中所有长度为 $L$ 的回文子串哈希值放入 `unordered_set`。
4. 检查 $B$ 中是否存在长度为 $L$ 且在 $A$ 中出现过的回文子串。

```cpp
// 核心：判定长度 L 是否可行
bool check(int L) {
    unordered_set<LL> seen;
    // 遍历 A 的回文中心 i，若 d_A[i]-1 >= L
    // 获取该回文子串的哈希值并存入 seen
    // 遍历 B 同理检查
}
```
</details>

### 例题 2：树的同构判定
> 给定两棵树，判断它们是否同构。

<details>
<summary><Network size={18} className="inline-block mr-1" /> 查看树哈希 C++ 实现</summary>

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
