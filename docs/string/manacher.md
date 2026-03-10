---
title: Manacher 算法
---

import { Zap, ShieldCheck, Repeat, Activity, Ruler, Target } from 'lucide-react';

# Manacher 算法：线性回文提取

Manacher 算法（马拉车算法）是解决最长回文子串问题的终极利器。它通过巧妙的预处理与对称性映射，将原本 $O(N^2)$ 的暴力中心扩展法优化至惊人的 $O(N)$。

## 1. 预处理：消除奇偶差异

回文串分为奇回文（如 `aba`）和偶回文（如 `abba`）。为了统一处理，我们在每个字符两侧及字符串首尾插入特殊字符（如 `#`）：
- `aba` $\to$ `#a#b#a#` (长度 $2n+1$)
- `abba` $\to$ `#a#b#b#a#` (长度 $2n+1$)

**关键性质**：经过预处理后，所有回文串在变换后的串中均为**奇回文**。

## 2. 核心原理：半径对称性

### 2.1 定义
- $d[i]$：以预处理串位置 $i$ 为中心的最长回文半径（含 $i$ 自身）。
- $M$：当前探测到的最右边界回文串的中心。
- $R$：该回文串的最右端点，$R = M + d[M] - 1$。

### 2.2 状态转移
对于当前计算的位置 $i$，若 $i \le R$，我们可以利用 $i$ 关于 $M$ 的对称点 $i_{mirror} = 2M - i$ 的信息：
$$
d[i] \ge \min(d[2M - i], R - i + 1)
$$
在此基础上，再尝试向两侧进行朴素扩展。

## 3. 实现细节与映射

### 映射关系
- 原串中以某位置为中心的最长回文长度 = $d[i] - 1$。
- 原串总回文子串数 = $\sum \lfloor d[i] / 2 \rfloor$。

```cpp
int manacher(string s) {
    string t = "$#"; // 头部加 $ 防止越界
    for (char c : s) { t += c; t += '#'; }
    t += '@'; // 尾部加 @ 
    
    int n = t.size();
    vector<int> d(n);
    int m = 0, r = 0, ans = 0;
    
    for (int i = 1; i < n - 1; i++) {
        d[i] = i < r ? min(d[2 * m - i], r - i) : 1;
        while (t[i - d[i]] == t[i + d[i]]) d[i]++;
        if (i + d[i] > r) {
            m = i;
            r = i + d[i];
        }
        ans = max(ans, d[i] - 1);
    }
    return ans;
}
```

## 4. 经典例题

### 例题 1：最长双回文子串
> 给定字符串 $S$，求两个不相交的回文子串，其长度之和最大。

<details>
<summary><Ruler size={18} className="inline-block mr-1" /> 查看前后缀分解方案</summary>

**思路**：
1. 运行 Manacher 记录每个位置能向左/右延伸的最长回文。
2. 定义 $L[i]$ 为以 $i$ 结尾的最长回文长度，$R[i]$ 为以 $i$ 开头的最长回文长度。
3. 通过线性扫描维护 $L[i]$ 和 $R[i]$。
4. 结果为 $\max(L[i] + R[i+1])$。

```cpp
// 核心逻辑：利用 Manacher 的 d[i] 更新 L[i] 和 R[i]
for (int i = 1; i < n - 1; i++) {
    L[i + d[i] - 1] = max(L[i + d[i] - 1], d[i] - 1);
    R[i - d[i] + 1] = max(R[i - d[i] + 1], d[i] - 1);
}
// 进一步递推 L[i] = max(L[i], L[i+2]-2)...
```
</details>

### 例题 2：最长回文前缀
> 给定字符串 $S$，在其末尾添加最少的字符使其变为回文串。

<details>
<summary><Target size={18} className="inline-block mr-1" /> 查看 C++ 解答</summary>

**思路**：
该问题等价于找到 $S$ 的最长回文后缀。将 $S$ 翻转得到 $S'$，问题转化为求 $S$ 与 $S'$ 的某个特定重叠，或者直接在 Manacher 预处理串中找到一个包含末尾字符且半径最大的回文中心。

```cpp
int solve(string s) {
    int n = s.size();
    // ... 执行 Manacher ...
    for (int i = n_new - 1; i >= 0; i--) {
        if (i + d[i] == n_new) { // 触及末尾
            return n - (d[i] - 1); // 需要补全的长度
        }
    }
}
```
</details>

## 5. 练习
1. [Luogu P3805] Manacher 模板。
2. [Codeforces 1827C] Palindrome Partition - 进阶 DP + Manacher。
3. [HDU 3068] 最长回文。
4. [LeetCode 5] Longest Palindromic Substring.
