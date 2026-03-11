---
title: Manacher 算法
---

import { Zap, ShieldCheck, Repeat, Activity, Ruler, Target, Info } from 'lucide-react';

# Manacher 算法：线性回文提取

Manacher 算法（马拉车算法）是解决最长回文子串问题的经典算法。它通过巧妙的预处理与对称性映射，将原本 $O(N^2)$ 的暴力中心扩展法优化至惊人的 $O(N)$。

## 1. 预处理：消除奇偶差异

回文串分为奇回文（如 `aba`）和偶回文（如 `abba`）。为了统一处理，我们在每个字符两侧及字符串首尾插入特殊字符（如 `#`）：
- `aba` $\to$ `#a#b#a#` (长度 $2n+1$)
- `abba` $\to$ `#a#b#b#a#` (长度 $2n+1$)

**关键性质**：经过预处理后，所有回文串在变换后的串中均为**奇回文**，中心位置唯一。

## 2. 核心原理：半径对称性

### 2.1 状态定义
- $d[i]$：以预处理串位置 $i$ 为中心的最长回文半径（含 $i$ 自身）。
- $M$：当前探测到的最右边界回文串的中心。
- $R$：该回文串的最右端点，$R = M + d[M] - 1$。

### 2.2 转移分析
对于当前位置 $i$，若 $i \le R$，利用 $i$ 关于 $M$ 的对称点 $j = 2M - i$ 的已知信息：
1. **Case 1**: $d[j] < R - i + 1$。以 $i$ 为中心的回文串完全被包含在以 $M$ 为中心的大回文串内。根据对称性，$d[i] = d[j]$。
2. **Case 2**: $d[j] \ge R - i + 1$。以 $i$ 为中心的回文串至少延伸到 $R$。由于 $R$ 之外的信息未知，需从 $R$ 开始暴力扩展。

$$ d[i] = \begin{cases} \min(d[2M - i], R - i + 1) & i \le R \\ 1 & i > R \end{cases} $$

## 3. 复杂度证明：势能分析

**定理**：Manacher 算法的时间复杂度为 $O(n)$。

**证明**：
1. 算法的主要开销在于 `while` 循环中的字符比较。
2. 每次成功的字符比较都会导致 $R$ 的增加。
   - 若 $i \le R$ 且处于 Case 1，不进入 `while`。
   - 若 $i > R$ 或处于 Case 2，`while` 循环开始。每次匹配成功后，新的回文半径会超过原有的 $R$，从而更新 $R$。
3. 由于 $R$ 从 0 开始，最大为 $2n+1$，且在整个算法过程中单调递增。
4. 成功的比较次数受限于 $R$ 的最大值，而不成功的比较在每个 $i$ 处最多发生一次。
5. 总复杂度为 $O(n)$。

## 4. 算法实现

```cpp
int manacher(string s) {
    string t = "$#";
    for (char c : s) { t += c; t += '#'; }
    t += '@';
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

## 5. 进阶视角：回文自动机 (PAM)

虽然 Manacher 在提取所有回文中心信息时非常高效，但在处理**本质不同回文子串统计**、**回文嵌套关系**等复杂问题时，**回文自动机 (Palindromic Tree, PAM)** 是更强大的工具。PAM 每个节点代表一个本质不同的回文串，并通过 `fail` 指针指向其最长回文后缀。

## 6. 经典应用

### 例题 1：最长双回文子串
> 求两个不相交的回文子串，其长度之和最大。

<details>
<summary>查看前后缀分解方案</summary>

**思路**：
1. $L[i]$：以 $i$ 结尾的最长回文长度；$R[i]$：以 $i$ 开头的最长回文长度。
2. 运行 Manacher 后，用 $d[i]$ 更新 $L[i+d[i]-1]$ 和 $R[i-d[i]+1]$。
3. 线性递推补全：$L[i] = \max(L[i], L[i+2]-2)$。
4. 最终答案：$\max (L[i] + R[i+1])$。

</details>

---

## 🎯 练习题清单
1. [Luogu P3805] Manacher 模板。
2. [Codeforces 1827C] Palindrome Partition：进阶 DP + Manacher。
3. [HDU 3068] 最长回文。
4. [LeetCode 5] Longest Palindromic Substring.
