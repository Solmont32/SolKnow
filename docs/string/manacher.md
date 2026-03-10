---
title: Manacher 算法
---

import { Zap, ShieldCheck, Repeat, Activity } from 'lucide-react';

# Manacher 算法：线性回文提取

Manacher 算法（俗称“马拉车”）是求解最长回文子串的经典线性算法。它通过巧妙地利用回文的对称性，将原本 $O(n^2)$ 的暴力搜索优化至 $O(n)$。

## 1. 预处理：统一奇偶性
为了处理偶数长度的回文串（如 `aa`），我们在每个字符间插入一个特殊符号 `#`。
- `aba` $\to$ `#a#b#a#` (长度 $3 \to 7$)
- `abba` $\to$ `#a#b#b#a#` (长度 $4 \to 9$)
这样处理后，所有回文串的长度均变为奇数。

## 2. 核心原理：回文半径与对称性

### 2.1 定义
- $d[i]$：以 $i$ 为中心的最长回文半径（包括 $i$ 自身）。
- $M$：当前已探测到的回文串中，延伸至最右侧的回文串中心。
- $R$：该回文串的最右边界，$R = M + d[M] - 1$。

### 2.2 状态转移
对于当前位置 $i$，若 $i < R$：
令 $i_{mirror} = 2M - i$（即 $i$ 关于 $M$ 的对称位置）。
根据对称性，$d[i]$ 至少可以继承 $d[i_{mirror}]$ 的值，但受限于 $R-i$ 的范围。
$d[i] = \min(d[2M - i], R - i)$

接着，从 $d[i]$ 开始尝试暴力向外扩展。

## 3. C++ 核心实现

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

int manacher(string s) {
    // 1. 预处理
    string t = "#";
    for (char c : s) { t += c; t += '#'; }
    
    int n = t.size();
    vector<int> d(n);
    int m = 0, r = 0, ans = 0;
    
    for (int i = 0; i < n; i++) {
        // 2. 继承与转移
        if (i < r) d[i] = min(d[2 * m - i], r - i);
        else d[i] = 1;
        
        // 3. 暴力扩展
        while (i - d[i] >= 0 && i + d[i] < n && t[i - d[i]] == t[i + d[i]])
            d[i]++;
            
        // 4. 更新边界
        if (i + d[i] > r) {
            m = i;
            r = i + d[i];
        }
        ans = max(ans, d[i] - 1);
    }
    return ans;
}
```

## 4. 复杂度分析
**定理**：Manacher 算法的时间复杂度为 $O(n)$。
**证明**：
观察 $R$ 的变化。每次 `while` 循环成功扩展一次，$R$ 都会至少增加 1。由于 $R$ 最大只能达到 $n$，且 $R$ 永不减小，因此所有 `while` 循环的总成功执行次数为 $O(n)$。

## 5. 经典例题

### 例题 1：回文子串计数
> 计算字符串中回文子串的总个数。

<details>
<summary><Activity size={18} className="inline-block mr-1" /> 查看 C++ 解答</summary>

在 Manacher 预处理串中，以 $i$ 为中心的回文半径为 $d[i]$，则原串中对应位置的回文子串个数为 $\lfloor d[i] / 2 \rfloor$。

```cpp
long long count_palindromes(string s) {
    // ... 执行 Manacher ...
    long long total = 0;
    for (int i = 0; i < n; i++) {
        total += d[i] / 2;
    }
    return total;
}
```
</details>

## 6. 练习
1. [Luogu P3805] Manacher 模板。
2. [HDU 3068] 最长回文。
3. [Codeforces 7D] Palindrome Degree - 判定前缀回文级数。
