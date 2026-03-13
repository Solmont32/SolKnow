---
title: Manacher 算法
---

import { Zap, ShieldCheck, Repeat, Activity, Ruler, Target, Info } from 'lucide-react';
import CodeCollapse from '@site/src/components/CodeCollapse';

# Manacher 算法：线性回文提取

Manacher 算法（马拉车算法）是解决最长回文子串问题的最优线性算法。它通过预处理消除字符串长度的奇偶差异，并利用已知的对称性信息跳过冗余计算。

## 1. 预处理：消除奇偶差异

回文串分为奇回文（如 `aba`，中心为字符）和偶回文（如 `abba`，中心为间隙）。
**统一变换**：在每个字符两侧及字符串首尾插入特殊字符（如 `#`），并在首尾添加不同的边界符（如 `$` 和 `@`）以防止越界。

- `aba` $\to$ `$#a#b#a#@`
- `abba` $\to$ `$#a#b#b#a#@`

**性质**：变换后的字符串长度始终为 $2n+3$。所有回文串在变换后的串中均表现为**奇回文**，其回文半径 $d[i]$ 与原串长度 $L$ 的关系为 $L = d[i] - 1$。

## 2. 核心原理：半径对称性 (Radius Symmetry)

### 2.1 状态定义

- $d[i]$：以预处理串位置 $i$ 为中心的最长回文半径（包含 $i$ 自身）。
- $M$：当前探测到的最右边界回文串的中心 (Mirror Center)。
- $R$：该回文串的最右端点 (Right Boundary)，即 $R = M + d[M]$。

### 2.2 转移逻辑证明

对于当前位置 $i$，其相对于 $M$ 的对称点为 $j = 2M - i$。

**定理**：$d[i]$ 的初始值可由下式确定：
$$ d[i] = \min(d[j], R - i) \quad (\text{if } i < R) $$

**证明**：
1. **Case 1: $i + d[j] < R$**。由于 $j$ 以 $M$ 为对称中心，且 $j$ 的回文范围完全包含在 $M$ 的回文范围内，根据对称性，$i$ 的回文半径必然等于 $j$ 的回文半径，即 $d[i] = d[j]$。
2. **Case 2: $i + d[j] \ge R$**。此时 $i$ 对称过去的部分超出了 $M$ 的已知回文范围 $R$。我们只能保证 $i$ 在 $R$ 以内的部分是对称的，即 $d[i] \ge R - i$。超出 $R$ 的部分需要继续通过**暴力中心扩展**来确定。

### 2.3 复杂度证明：势能分析

**定理**：Manacher 算法的时间复杂度为 $O(n)$。

**证明**：
1. 算法的主要开销在于 `while` 循环中的字符匹配。
2. 每次成功的匹配都会导致 $R$ 至少增加 1。
3. $R$ 从 0 开始，最大增加到 $2n+3$，且在算法运行过程中**单调递增**。
4. 每次失败的匹配会导致 `while` 循环终止，且每个中心 $i$ 最多只发生一次失败匹配。
5. 因此，总成功的匹配次数为 $O(n)$，总失败次数也为 $O(n)$，总复杂度为 $O(n)$。

<CodeCollapse title="Manacher 工业级模板 (C++)" language="cpp">

```cpp
int manacher(string s) {
    // 预处理
    string t = "$#";
    for (char c : s) { t += c; t += '#'; }
    t += '@';

    int n = t.size();
    vector<int> d(n);
    int m = 0, r = 0, max_len = 0;

    for (int i = 1; i < n - 1; i++) {
        if (i < r) d[i] = min(d[2 * m - i], r - i);
        else d[i] = 1;

        // 中心扩展
        while (t[i - d[i]] == t[i + d[i]]) d[i]++;

        // 更新边界
        if (i + d[i] > r) {
            m = i;
            r = i + d[i];
        }
        max_len = max(max_len, d[i] - 1);
    }
    return max_len;
}
```

</CodeCollapse>

---

## 🎯 经典例题与练习

### 例题 1：[Luogu P3805] 模板题

> 给定一个字符串，求其最长回文子串的长度。

<details>
<summary>Check Solution</summary>

直接使用上述模板即可，注意预处理后的半径 $d[i]-1$ 即为原串对应回文长度。

</details>

### 例题 2：最长双回文子串

> 给定一个字符串 $S$，求两个相邻且不重叠的回文子串，使得它们的长度之和最大。

<details>
<summary>Check Analysis</summary>

**思路**：
1. 定义 $L[i]$ 为以 $i$ 结尾的最长回文长度，$R[i]$ 为以 $i$ 开头的最长回文长度。
2. 运行 Manacher 算法，得到每个中心 $i$ 的半径 $d[i]$。
3. 更新边界：
   - $L[i + d[i] - 1] = \max(L[i + d[i] - 1], d[i] - 1)$
   - $R[i - d[i] + 1] = \max(R[i - d[i] + 1], d[i] - 1)$
4. 注意 $L[i]$ 和 $R[i]$ 还需要通过线性递推补全（因为长回文包含短回文）：
   - $L[i] = \max(L[i], L[i+2] - 2)$
   - $R[i] = \max(R[i], R[i-2] - 2)$
5. 遍历分割点 $i$，答案为 $\max(L[i] + R[i+2])$（在预处理串中）。

</details>

### 例题 3：[Codeforces 1827C] Palindrome Partition

> 给定字符串，求有多少种方式将其划分为若干个偶回文串。

<details>
<summary>Check Analysis</summary>

**进阶建模**：
虽然 Manacher 可以提取所有回文中心，但此题更适合使用 **回文自动机 (PAM)** 或 **DP + Manacher** 优化。利用 Manacher 找到每个位置作为右端点的最短偶回文，然后进行 DP。

</details>

---

## 🎯 练习题清单

1. [Luogu P1659] [国家集训队] 拉拉队排练：Manacher + 快速幂。
2. [HDU 3068] 最长回文：基础练习。
3. [CF 7D] Palindrome Degree：前缀回文判定（可用哈希或 KMP 优化，Manacher 亦可）。
4. [BZOJ 2561] 字符串：Manacher 综合应用。
