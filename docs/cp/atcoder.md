---
title: AtCoder 竞技指南：数学建模与算法之美
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Trophy, Infinity, Sigma, Zap, Library, BookOpen } from 'lucide-react';

# AtCoder 竞技指南：数学建模与算法之美

> **"AtCoder is where mathematics meets competitive programming."**

AtCoder 是来自日本的高质量算法竞赛平台。其题目以**简洁的背景**、**深邃的数学本质**和**极高的美感**著称。本指南聚焦于 AtCoder 的核心建模逻辑与数学技巧。

---

## 🏗️ 核心建模体系

### 1. 计数问题 (Counting Problems)

AtCoder 的核心特色。通常涉及排列组合、动态规划与生成函数。

- **核心工具**：
  - **动态规划 (DP)**：定义状态 $dp[i][j]$ 为前 $i$ 个数达成条件 $j$ 的方案数。
  - **容斥原理 (Inclusion-Exclusion)**：当正面计数困难时，考虑 $Total - |A \cup B \cup C|...$。
  - **生成函数 (Generating Functions)**：将计数转化为多项式乘法。

<KnowledgeCard type="tip" title="解题秘籍">
在 AtCoder 中，如果看到 $N \le 2000$，通常是 $O(N^2)$ 的 DP；如果 $N \le 10^5$，则可能是 $O(N \log N)$ 的多项式优化或数学公式。
</KnowledgeCard>

### 2. 概率与期望 (Probability & Expectation)

利用期望的线性性 ($E[X+Y] = E[X] + E[Y]$) 简化复杂随机过程。

- **经典模型**：
  - **状态机 DP**：在不同状态间转移，求解到达终点的期望步数。
  - **贡献分解**：将总期望拆分为每个元素发生的概率之和。

---

## 💡 思维 Trick 集锦

### 1. 反射原理 (Reflection Principle)

处理带限制的路径计数（如：不能跨越 $y=x$ 的路径）。

- **Trick**：将非法路径通过轴对称转化为终点对称后的合法路径。

### 2. 双射法 (Bijective Proofs)

证明两个集合等势（方案数相等）。

- **应用**：将复杂的约束条件转化为更易计数的结构（如将括号序列转化为格点路径）。

### 3. DP 状态压缩与优化

AtCoder 经常考察对 DP 转移的极致优化（如：斜率优化、数据结构优化、分治 FFT）。

---

## 📦 核心模板库 (C++ Mathematical Tools)

<details>
<summary>1. 模运算自动机 (ModInt Template)</summary>

```cpp
template<int MOD>
struct Mint {
    int v;
    Mint(long long _v = 0) { v = _v % MOD; if (v < 0) v += MOD; }
    Mint& operator+=(const Mint& o) { v += o.v; if (v >= MOD) v -= MOD; return *this; }
    Mint& operator*=(const Mint& o) { v = (long long)v * o.v % MOD; return *this; }
    Mint operator+(const Mint& o) const { return Mint(*this) += o; }
    Mint operator*(const Mint& o) const { return Mint(*this) *= o; }
    // ... power and inverse functions
};
typedef Mint<998244353> mint;
```

</details>

<details>
<summary>2. 组合数预处理 (Combinations Precomputation)</summary>

```cpp
const int MAXN = 1e6 + 5;
const int MOD = 998244353;
ll fact[MAXN], invFact[MAXN];

ll qpow(ll a, ll b) {
    ll res = 1;
    while (b) {
        if (b & 1) res = res * a % MOD;
        a = a * a % MOD;
        b >>= 1;
    }
    return res;
}

void precompute() {
    fact[0] = 1;
    for (int i = 1; i < MAXN; i++) fact[i] = fact[i-1] * i % MOD;
    invFact[MAXN-1] = qpow(fact[MAXN-1], MOD - 2);
    for (int i = MAXN-2; i >= 0; i--) invFact[i] = invFact[i+1] * (i+1) % MOD;
}

ll nCr(int n, int r) {
    if (r < 0 || r > n) return 0;
    return fact[n] * invFact[r] % MOD * invFact[n-r] % MOD;
}
```

</details>

---

## 📝 典型例题建模实战

### 例题 1：期望的线性性

**题目描述**：给定 $N$ 个硬币，第 $i$ 个硬币正面朝上的概率为 $p_i$。求正面朝上的硬币数量的期望值。

<details>
<summary>Check Solution</summary>

**建模分析**：

1. **定义变量**：设 $X_i$ 为指示变量，若第 $i$ 个硬币正面朝上则 $X_i = 1$，否则 $X_i = 0$。
2. **总期望**：$E[\sum X_i] = \sum E[X_i]$。
3. **单个期望**：$E[X_i] = 1 \times P(X_i=1) + 0 \times P(X_i=0) = p_i$。
4. **结论**：Ans = $\sum p_i$。即使硬币之间不独立，此结论依然成立！

```cpp
void solve() {
    int n; cin >> n;
    double ans = 0;
    for (int i = 0; i < n; i++) {
        double p; cin >> p;
        ans += p;
    }
    printf("%.10f\n", ans);
}
```

</details>

### 例题 2：容斥原理进阶

**题目描述**：求长度为 $N$，元素在 $[1, M]$ 之间，且 $\gcd(a_1, a_2, ..., a_N) = 1$ 的序列个数。

<details>
<summary>Check Solution</summary>

**建模分析**：

1. **定义 $f(g)$**：最大公约数为 $g$ 的序列个数。
2. **定义 $F(g)$**：最大公约数为 $g$ 的倍数的序列个数。显然 $F(g) = (M/g)^N$。
3. **关系**：$F(g) = \sum_{g|d} f(d)$。
4. **莫比乌斯反演**：$f(1) = \sum_{1|d} \mu(d) F(d) = \sum_{d=1}^M \mu(d) (M/d)^N$。

```cpp
void solve() {
    int n, m; cin >> n >> m;
    ll ans = 0;
    for (int d = 1; d <= m; d++) {
        ll term = qpow(m / d, n);
        if (mu[d] == 1) ans = (ans + term) % MOD;
        else if (mu[d] == -1) ans = (ans - term + MOD) % MOD;
    }
    cout << ans << endl;
}
```

</details>

---

## 🏆 提分进阶建议

1. **ABC 刷题法**：对于初学者，刷完 ABC 的 C, D 题；对于进阶者，保证 E, F 的稳定 AC。
2. **学习数学背景**：AtCoder 题目经常有经典的数学原型（如：卡特兰数、斯特林数）。
3. **代码简洁性**：学习日本选手的代码风格，通常极其精简高效。

<div style={{ textAlign: 'center', marginTop: '2rem' }}>
  <a className="button button--primary button--lg" href="https://atcoder.jp" target="_blank">
    开启 AtCoder 之旅 <Trophy size={20} style={{ marginLeft: '8px' }} />
  </a>
</div>
