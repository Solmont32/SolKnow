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

## 2. 核心原理：半径对称性 (Radius Symmetry)

### 2.1 状态定义

- $d[i]$：以预处理串位置 $i$ 为中心的最长回文半径（含 $i$ 自身）。
- $M$：当前探测到的最右边界回文串的中心 (Mirror Center)。
- $R$：该回文串的最右端点 (Right Boundary)，$R = M + d[M] - 1$。

### 2.2 转移分析与势能跃迁

对于当前位置 $i$，其相对于 $M$ 的对称点为 $j = 2M - i$。

1. **内含情况**：若 $i + d[j] - 1 < R$，则 $d[i] = d[j]$。这是因为 $i$ 的回文结构完全被包含在 $M$ 的范围内。
2. **跨界情况**：若 $i + d[j] - 1 \ge R$，则 $d[i]$ 至少为 $R - i + 1$。之后需通过**中心扩展法**尝试增加 $R$。

<div className="flex gap-2 mb-4">
  <span className="badge badge--success"><Ruler size={14} className="mr-1" /> $O(n)$ Time</span>
  <span className="badge badge--info"><Activity size={14} className="mr-1" /> Monotonic R</span>
</div>

## 3. 复杂度证明：势能分析

**定理**：Manacher 算法的时间复杂度为 $O(n)$。

**证明**：
1. 我们关注 $R$ 的变化。$R$ 在整个算法中初始化为 0，最大值为 $2n+1$，且**严格单调不减**。
2. 算法的开销主要来自 `while` 循环中的字符匹配。
3. 每次 `while` 循环匹配成功，意味着 $i + d[i] > R$，此时 $R$ 至少增加 1。
4. 由于 $R$ 最多增加 $2n+1$ 次，成功的匹配次数总量为 $O(n)$。
5. 每次 `while` 循环匹配失败后，循环立即终止，且对每个 $i$ 只会发生一次。
6. 结论：总时间复杂度为 $O(n)$。

## 4. 算法实现

<CodeCollapse title="Manacher 线性实现 (C++)" language="cpp">

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
