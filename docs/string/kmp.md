---
title: KMP 算法
---

import { Zap, ShieldCheck, Code2, Search, Target, Binary } from 'lucide-react';

# KMP 算法：前缀函数与模式匹配优化

KMP (Knuth-Morris-Pratt) 算法是字符串处理的基石。它的核心在于通过预处理模式串的**内部对称性**，使得在匹配失败时能够利用已知信息进行“跳跃”，从而实现线性时间复杂度的字符串检索。

## 1. 前缀函数 (Prefix Function)

### 1.1 形式化定义
对于长度为 $n$ 的字符串 $s$，其前缀函数 $\pi[i]$ 定义为 $s[0 \dots i]$ 的**最长真前缀**的长度，且该真前缀同时也是 $s[0 \dots i]$ 的**真后缀**。

数学表达式为：
$$
\pi[i] = \max \{k : 0 < k \le i \text{ 且 } s[0 \dots k-1] = s[i-k+1 \dots i]\}
$$
规定 $\pi[0] = 0$。

### 1.2 引理与证明
**引理 1**：$\pi[i] \le \pi[i-1] + 1$。
*证明*：若 $\pi[i] = k+1$，则 $s[0 \dots k] = s[i-k \dots i]$。由此可推出 $s[0 \dots k-1] = s[i-k \dots i-1]$，即 $s[0 \dots k-1]$ 是 $s[0 \dots i-1]$ 的一个相等前后缀。根据定义 $\pi[i-1] \ge k$，故 $\pi[i] \le \pi[i-1] + 1$。

**引理 2**：若 $s[0 \dots i]$ 有一个长度为 $k$ 的相等真前后缀，且 $k > 0$，则 $k-1$ 必定是 $\pi[k-1]$ 的某个迭代值。具体地，所有相等前后缀的长度集合为 $\{k_1, k_2, \dots\}$，其中 $k_1 = \pi[i], k_2 = \pi[k_1-1], k_3 = \pi[k_2-1] \dots$。

### 1.3 递推计算原理
计算 $\pi[i]$ 时，我们已知 $\pi[0 \dots i-1]$。考虑将 $s[i]$ 添加到 $s[0 \dots i-1]$ 的末尾：
1.  **理想转移**：若 $s[i] = s[\pi[i-1]]$，则 $\pi[i] = \pi[i-1] + 1$。
2.  **回溯转移**：若 $s[i] \neq s[\pi[i-1]]$，我们需要找到一个更短的匹配后缀。根据引理 2，下一个可能的候选长度只能是 $\pi[\pi[i-1]-1]$。
3.  **终止条件**：不断回溯直到 $s[i] = s[j]$ 或 $j=0$。

### 1.4 核心代码 (C++)
```cpp
vector<int> prefix_function(string s) {
    int n = s.length();
    vector<int> pi(n);
    for (int i = 1; i < n; i++) {
        int j = pi[i - 1];
        while (j > 0 && s[i] != s[j])
            j = pi[j - 1];
        if (s[i] == s[j]) j++;
        pi[i] = j;
    }
    return pi;
}
```

## 2. 复杂度分析：势能分析法

**定理**：前缀函数的计算时间复杂度为 $O(n)$。

**证明**：
定义势函数 $\Phi_i = \pi[i]$（即当前匹配的长度）。
- 在每次 `for` 循环迭代中，$\pi[i]$ 相对于 $\pi[i-1]$ 最多增加 1（通过 `j++`），贡献 $+1$ 到总复杂度。
- `while` 循环中的 `j = pi[j-1]` 至少使 $j$ 减小 1。因为 $\pi[k] \le k$，且作为真前缀，其长度严格小于当前子串长度。
- 整个过程中 $\pi[i] \ge 0$。由于 $\pi[i]$ 的总增加量为 $n-1$，且每次 `while` 迭代都会减少 $\pi[i]$，故 `while` 的总迭代次数不会超过总增加量，即 $O(n)$。

## 3. Z 函数 (扩展 KMP)

Z 函数 $z[i]$ 表示字符串 $s$ 与其从 $i$ 开始的后缀 $s[i \dots n-1]$ 的最长公共前缀 (LCP) 的长度。

### 线性构建 (Z-Algorithm)
利用类似 Manacher 的“盒子”思想（维持当前匹配最远端 $[L, R]$）：
```cpp
vector<int> z_function(string s) {
    int n = s.length();
    vector<int> z(n);
    for (int i = 1, l = 0, r = 0; i < n; i++) {
        if (i <= r) z[i] = min(r - i + 1, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if (i + z[i] - 1 > r) l = i, r = i + z[i] - 1;
    }
    return z;
}
```

## 4. 经典应用与例题

### 例题 1：标准模式匹配
> 给定文本串 $T$ 和模式串 $P$，求 $P$ 在 $T$ 中所有出现的位置。

<details>
<summary><Search size={18} className="inline-block mr-1" /> 查看 KMP 实现</summary>

**思路**：
将 $P + \# + T$ 拼接，求其前缀函数。其中 $\#$ 是不在 $P$ 或 $T$ 中出现的特殊字符。若 $\pi[i] = |P|$，则在 $T$ 的对应位置找到了一个匹配。

```cpp
vector<int> kmp_search(string text, string pattern) {
    string combined = pattern + "#" + text;
    vector<int> pi = prefix_function(combined);
    vector<int> positions;
    int m = pattern.length();
    for (int i = m + 1; i < combined.length(); i++) {
        if (pi[i] == m) {
            positions.push_back(i - 2 * m);
        }
    }
    return positions;
}
```
</details>

### 例题 2：周期性判定
> 给定字符串 $S$，求最小正整数 $k$，使得 $S$ 是某个长度为 $k$ 的字符串重复多次构成的。

<details>
<summary><Target size={18} className="inline-block mr-1" /> 查看 C++ 解答</summary>

**理论基础**：
字符串 $S$ 具有长度为 $k$ 的周期，当且仅当 $k$ 整除 $n$ 且 $n-k$ 是 $S$ 的一个相等前后缀长度。最小周期长度为 $n - \pi[n-1]$。

```cpp
int get_min_period(string s) {
    int n = s.length();
    vector<int> pi = prefix_function(s);
    int L = n - pi[n-1];
    if (n % L == 0) return L;
    return n; // 只有自己这一个周期
}
```
</details>

### 例题 3：前缀出现次数统计
> 对于 $S$ 的每个前缀 $S[0 \dots i]$，统计它在 $S$ 中作为子串出现了多少次。

<details>
<summary><Binary size={18} className="inline-block mr-1" /> 查看树形 DP 方案</summary>

**思路**：
每个前缀 $S[0 \dots i]$ 必然在位置 $i$ 出现一次。此外，若 $S[0 \dots j]$ 是 $S[0 \dots i]$ 的后缀，则它在 $i$ 处也出现。由于 $\pi[i]$ 记录了最长公共前后缀，我们可以将 $\pi[i]$ 看作指向前一个匹配状态的指针。

```cpp
vector<int> count_prefixes(string s) {
    int n = s.length();
    vector<int> pi = prefix_function(s);
    vector<int> ans(n + 1);
    // 在每个位置 i，前缀 S[0..i] 出现一次
    for (int i = 0; i < n; i++) ans[pi[i]]++;
    // 从长到短累加，因为长前缀的后缀包含短前缀
    for (int i = n; i > 0; i--) ans[pi[i-1]] += ans[i];
    // 最后每个前缀自身在对应位置也贡献一次
    for (int i = 1; i <= n; i++) ans[i]++; 
    return ans;
}
```
</details>

## 5. 练习
1. [Luogu P3375] KMP 模板。
2. [Codeforces 126B] Password - 结合 Z 算法或 KMP 性质。
3. [POJ 2406] Power Strings - 周期性应用。
4. [HDU 3336] Count the string - 前缀计数。
