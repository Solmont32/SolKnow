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

其中 $B$（Base）为基数（通常取大于字符集大小的质数，如 131 或 13331），$M$（Modulus）为模数。

### 1.1 区间哈希公式推导

预处理前缀哈希数组 $h[i]$：
- $h[0] = 0$
- $h[i] = (h[i-1] \cdot B + s[i]) \pmod M$

**定理**：子串 $S[l \dots r]$ 的哈希值为：
$$ H(S[l \dots r]) = (h[r] - h[l-1] \cdot B^{r-l+1}) \pmod M $$

**证明**：
$h[r] = \sum_{i=1}^r s_i B^{r-i}$
$h[l-1] = \sum_{i=1}^{l-1} s_i B^{l-1-i}$
则 $h[l-1] \cdot B^{r-l+1} = \sum_{i=1}^{l-1} s_i B^{r-i}$
两者相减即可消去前 $l-1$ 项，剩下第 $l$ 到第 $r$ 项。

## 2. 碰撞深度分析与防御策略

### 2.1 生日悖论与碰撞风险 (Collision Probability)

**定理**：在 $M$ 个槽位中放入 $K$ 个随机哈希值，至少发生一次碰撞的概率 $P$ 约为：
$$ P \approx 1 - e^{-\frac{K^2}{2M}} $$

- **$10^9$ 模数的局限**：当 $K = 10^5, M = 10^9$ 时，$P \approx 1 - e^{-5} \approx 99.3\%$。这意味着单模数 $10^9$ 在 $10^5$ 数据量下极易被针对或随机碰撞。
- **安全阈值**：为了保证 $P < 10^{-6}$，对于 $K = 10^5$，模数 $M$ 需达到 $10^{15}$ 以上。

### 2.2 防御方案：双哈希与 $2^{61}-1$

1. **双哈希 (Double Hash)**：同时使用两组 $(B_1, M_1)$ 和 $(B_2, M_2)$，只有当两个哈希值均相等时才判定字符串相等。等价于使用 $M = M_1 \cdot M_2$ 的大模数（如 $10^{18}$ 级别）。
2. **梅森素数哈希**：使用 $M = 2^{61}-1$。其位运算特性使得取模极快：
   $$ (a \cdot 2^{61} + b) \pmod{2^{61}-1} \equiv (a + b) \pmod{2^{61}-1} $$

### 2.3 抗攻击：基数随机化

**警告**：固定基数（如 $B=131$）易被构造数据攻击（如 Thue-Morse 序列）。
**对策**：使用时间种子或随机数生成器生成随机基数：
```cpp
mt19937 rng(time(0));
const int BASE = uniform_int_distribution<int>(200, 1000000)(rng);
```

<CodeCollapse title="安全双哈希模板 (C++)" language="cpp">

```cpp
typedef pair<long long, long long> pll;
const long long M1 = 1e9 + 7, M2 = 1e9 + 9;
const long long B1 = 131, B2 = 13331;

struct Hash {
    vector<long long> h1, h2, p1, p2;
    Hash(string s) {
        int n = s.size();
        h1.resize(n + 1); h2.resize(n + 1);
        p1.resize(n + 1); p2.resize(n + 1);
        p1[0] = p2[0] = 1;
        for (int i = 1; i <= n; i++) {
            h1[i] = (h1[i - 1] * B1 + s[i - 1]) % M1;
            h2[i] = (h2[i - 1] * B2 + s[i - 1]) % M2;
            p1[i] = (p1[i - 1] * B1) % M1;
            p2[i] = (p2[i - 1] * B2) % M2;
        }
    }
    pll get(int l, int r) { // 1-indexed [l, r]
        long long v1 = (h1[r] - h1[l - 1] * p1[r - l + 1] % M1 + M1) % M1;
        long long v2 = (h2[r] - h2[l - 1] * p2[r - l + 1] % M2 + M2) % M2;
        return {v1, v2};
    }
};
```

</CodeCollapse>

---

## 🎯 经典例题与练习

### 例题 1：[Luogu P3370] 字符串哈希模板

> 给定 $N$ 个字符串，求其中有多少个不同的串。

<details>
<summary>Check Solution</summary>

使用双哈希计算每个串的 $H(S)$，将其存入 `std::set<pll>` 或排序后去重。

</details>

### 例题 2：[POJ 2774] 最长公共子串

> 给定两个串 $A$ 和 $B$，求它们的最长公共子串长度。

<details>
<summary>Check Analysis</summary>

**思路**：
1. 二分答案长度 $L$。
2. 计算 $A$ 中所有长度为 $L$ 的子串哈希值，存入 `hash_set`。
3. 检查 $B$ 中是否存在相同的哈希值。
4. 总复杂度 $O(N \log N)$。相比于 SAM 或 SA，哈希实现更简单且常数小。

</details>

### 例题 3：[Luogu P5043] 树同构

> 判断给定的 $M$ 棵树中哪些是同构的。

<details>
<summary>Check Analysis</summary>

**进阶建模**：
使用树哈希。对于节点 $u$，其哈希值 $f(u) = 1 + \sum_{v \in son(u)} shift(f(v))$。其中 $shift(x)$ 是一个随机映射函数。常用 $shift(x) = hash(x)$，其中 $hash$ 采用类似 `x ^ (x >> 16)` 的策略。

</details>

---

## 🎯 练习题清单

1. [Luogu P3501] [POI2010] ANT-Antisymmetry：哈希 + 二分回文。
2. [HDU 4821] String：滑动窗口哈希。
3. [CF 1200E] Compress Words：利用哈希加速字符串合并。
4. [BZOJ 3097] Hash Killer I/II/III：针对各类哈希策略的构造攻击实验。
