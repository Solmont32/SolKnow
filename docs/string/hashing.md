---
title: 字符串哈希
---

import { ShieldCheck, Zap, Hash, AlertTriangle, Scale, Network, Info } from 'lucide-react';
import CodeCollapse from '@site/src/components/CodeCollapse';

# 字符串哈希：高效判等与随机化算法

<div className="flex gap-2 mb-6">
  <span className="badge badge--primary"><Hash size={14} className="mr-1" /> $O(1)$ Substring Compare</span>
  <span className="badge badge--success"><ShieldCheck size={14} className="mr-1" /> Collision Proofing</span>
  <span className="badge badge--warning"><AlertTriangle size={14} className="mr-1" /> Birthday Paradox</span>
</div>

字符串哈希是将字符串映射为固定长度整数的技术。它通过 $O(N)$ 预处理，换取 $O(1)$ 的子串相等性判定，是处理子串匹配、去重及复杂结构对比的有力工具。

---

## 1. 数学模型：多项式哈希 (Polynomial Rolling Hash)

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

---

## 2. 碰撞风险评估 (Collision Rate Evaluation)

### 2.1 生日悖论与碰撞概率

**定理**：在 $M$ 个槽位中随机放入 $N$ 个哈希值，至少发生一次碰撞的概率 $P$ 约为：
$$ P \approx 1 - e^{-\frac{N^2}{2M}} $$

- **单模数 $10^9$ 的局限**：当 $N = 10^5, M = 10^9$ 时，$P \approx 1 - e^{-5} \approx 99.3\%$。这意味着单模数 $10^9$ 在竞赛级数据规模下极易碰撞。
- **安全阈值**：若要求碰撞概率 $P < 10^{-7}$，则对于 $N=10^6$，模数 $M$ 需满足 $M > \frac{N^2}{2 \ln(1/(1-P))} \approx 5 \times 10^{18}$。

### 2.2 防御方案

1. **双哈希 (Double Hash)**：使用两组不同的 $(B_1, M_1)$ 和 $(B_2, M_2)$。碰撞概率降为 $P_1 \cdot P_2$。
2. **$2^{61}-1$ (梅森素数)**：利用 `__int128` 和位运算实现快速大模数取模。
3. **基数随机化**：使用随机生成的基数防止针对性数据攻击。

<CodeCollapse title="安全双哈希实现 (C++)" language="cpp">

```cpp
typedef pair<long long, long long> pll;
const long long M1 = 1e9 + 7, M2 = 1e9 + 9;
const long long B1 = 131, B2 = 13331;

struct StringHash {
    vector<long long> h1, h2, p1, p2;
    StringHash(string s) {
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
    pll get(int l, int r) {
        long long res1 = (h1[r] - h1[l - 1] * p1[r - l + 1] % M1 + M1) % M1;
        long long res2 = (h2[r] - h2[l - 1] * p2[r - l + 1] % M2 + M2) % M2;
        return {res1, res2};
    }
};
```

</CodeCollapse>

---

## 3. 经典例题

### 例题 1：[POJ 2774] 最长公共子串 (SA/SAM 的哈希平替)

> **思路**：二分答案长度 $L$，利用哈希判定是否存在两个长度为 $L$ 的子串相等。
> **复杂度**：$O(N \log N)$。虽然理论不如 SAM，但哈希常数小且实现极其简单。

### 例题 2：[Luogu P5043] 树同构 (树哈希建模)

> **核心公式**：$f(u) = 1 + \sum_{v \in son(u)} \phi(f(v))$。
> 其中 $\phi(x)$ 是一个哈希映射函数（如 $x \oplus (x \gg 16)$ 或更复杂的随机映射），用于处理子树集合的无序性。

---

## 🎯 练习题清单

1. **[Luogu P3370] 字符串哈希模板**：快速判定串个数。
2. **[BZOJ 3097] Hash Killer I/II/III**：学习如何通过不同的构造方案击破各种哈希策略。
3. **[CF 1200E] Compress Words**：利用哈希进行前后缀匹配加速字符串合并。
4. **[POI2010] ANT-Antisymmetry**：哈希与二分的结合应用。
