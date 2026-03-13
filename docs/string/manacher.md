---
title: Manacher 算法
---

import { Zap, ShieldCheck, Repeat, Activity, Ruler, Target, Info, Cpu, Layers } from 'lucide-react';
import CodeCollapse from '@site/src/components/CodeCollapse';

# Manacher 算法：线性回文提取

<div className="flex gap-2 mb-6">
  <span className="badge badge--primary"><Zap size={14} className="mr-1" /> $O(n)$ Time</span>
  <span className="badge badge--success"><ShieldCheck size={14} className="mr-1" /> Radius Symmetry</span>
  <span className="badge badge--info"><Layers size={14} className="mr-1" /> Space $O(n)$</span>
</div>

Manacher 算法（马拉车算法）是解决最长回文子串问题的最优线性算法。它通过预处理消除字符串长度的奇偶差异，并利用已知的对称性信息跳过冗余计算。

---

## 1. 预处理：消除奇偶差异

回文串分为奇回文（如 `aba`，中心为字符）和偶回文（如 `abba`，中心为间隙）。
**统一变换**：在每个字符两侧及字符串首尾插入特殊字符（如 `#`），并在首尾添加不同的边界符（如 `$` 和 `@`）以防止越界。

- `aba` $\to$ `$#a#b#a#@`
- `abba` $\to$ `$#a#b#b#a#@`

**性质**：变换后的字符串长度始终为 $2n+3$。所有回文串在变换后的串中均表现为**奇回文**，其回文半径 $d[i]$ 与原串长度 $L$ 的关系为 $L = d[i] - 1$。

---

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
2. **Case 2: $i + d[j] \ge R$**。此时 $i$ 对称过去的部分超出了 $M$ 的已知回文范围 $R$。我们只能保证 $i$ 在 $R$ 以内的部分是对称的，即 $d[i] \ge R - i$。超出 $R$ 的部分需要继续通过**中心扩展**来确定。

### 2.3 复杂度证明：势能分析

**定理**：Manacher 算法的时间复杂度为 $O(n)$。
每次成功的匹配都会导致 $R$ 至少增加 1。由于 $R$ 是单调不减的且最大为 $2n$，故总复杂度为 $O(n)$。

---

## 3. 算法实现

<CodeCollapse title="Manacher 模板与应用 (C++)" language="cpp">

```cpp
vector<int> manacher(string s) {
    string t = "$#";
    for (char c : s) { t += c; t += '#'; }
    t += '@';
    int n = t.size();
    vector<int> d(n);
    int m = 0, r = 0;
    for (int i = 1; i < n - 1; i++) {
        if (i < r) d[i] = min(d[2 * m - i], r - i);
        else d[i] = 1;
        while (t[i - d[i]] == t[i + d[i]]) d[i]++;
        if (i + d[i] > r) {
            m = i;
            r = i + d[i];
        }
    }
    return d; // 返回各位置半径
}
```

</CodeCollapse>

---

## 🎯 综合练习

### 练习 1：[Luogu P4555] 最长双回文子串

> **题目**：输入字符串 $S$，求 $S$ 的最长双回文子串 $T$ 的长度，使得 $T$ 可以写成两个回文串拼接的形式。

<details>
<summary>Check Solution</summary>

**解法**：分别维护每个位置结尾的最长回文 $L[i]$ 和开始的最长回文 $R[i]$。
1. 通过 Manacher 算法计算出每个位置的半径 $d[i]$。
2. 更新边界：$L[i + d[i] - 1] = \max(L[i + d[i] - 1], d[i] - 1)$，$R[i - d[i] + 1] = \max(R[i - d[i] + 1], d[i] - 1)$。
3. 递推补全：$L[i] = \max(L[i], L[i+2]-2)$，$R[i] = \max(R[i], R[i-2]-2)$。
4. 遍历所有分割点，答案为 $\max(L[i] + R[i+2])$。

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

int main() {
    string s; cin >> s;
    string t = "$#";
    for (char c : s) { t += c; t += '#'; }
    t += '@';
    int n = t.size();
    vector<int> d(n), L(n, 0), R(n, 0);
    int m = 0, r = 0;
    for (int i = 1; i < n - 1; i++) {
        if (i < r) d[i] = min(d[2 * m - i], r - i);
        else d[i] = 1;
        while (t[i - d[i]] == t[i + d[i]]) d[i]++;
        if (i + d[i] > r) { m = i; r = i + d[i]; }
        L[i + d[i] - 1] = max(L[i + d[i] - 1], d[i] - 1);
        R[i - d[i] + 1] = max(R[i - d[i] + 1], d[i] - 1);
    }
    for (int i = n - 2; i >= 1; i -= 2) L[i] = max(L[i], L[i + 2] - 2);
    for (int i = 1; i <= n - 2; i += 2) R[i] = max(R[i], R[i - 2] - 2);
    int ans = 0;
    for (int i = 1; i <= n - 2; i += 2) {
        if (L[i] && R[i + 2]) ans = max(ans, L[i] + R[i + 2]);
    }
    cout << ans << endl;
    return 0;
}
```

</details>

### 练习 2：[Codeforces 7D] Palindrome Degree

> **题目**：定义回文等级：若前缀是回文且其左半部分也是回文，则等级递增。求所有前缀等级之和。

<details>
<summary>Check Analysis</summary>

**Manacher + DP**：
1. 利用 Manacher 判断每个前缀是否为回文（即 $d[i] = i$ 在变换后的串中）。
2. 设 $f[i]$ 为前缀 $S[0 \dots i-1]$ 的回文等级。
3. 若 $S[0 \dots i-1]$ 是回文，则 $f[i] = f[i/2] + 1$；否则 $f[i] = 0$。

</details>
