---
title: KMP 算法
---

import { Zap, ShieldCheck, Code2, Search } from 'lucide-react';

# KMP 算法：前缀函数的艺术

KMP (Knuth-Morris-Pratt) 算法是字符串处理的基石，其核心思想是利用**已匹配的信息**来避免不必要的重复匹配。

## 1. 前缀函数 (Prefix Function)

### 定义
对于长度为 $n$ 的字符串 $s$，其前缀函数 $\pi[i]$ 定义为：
$s[0 \dots i]$ 的最长真前缀，且该真前缀同时也是 $s[0 \dots i]$ 的真后缀的长度。

数学表达：
$\pi[i] = \max \{k : 0 < k \le i \text{ 且 } s[0 \dots k-1] = s[i-k+1 \dots i]\}$
特别地，$\pi[0] = 0$。

### 递推性质
1. **单调性限制**：$\pi[i] \le \pi[i-1] + 1$。
2. **状态转移**：若 $s[i] = s[\pi[i-1]]$，则 $\pi[i] = \pi[i-1] + 1$。
3. **失败跳跃**：若 $s[i] \neq s[\pi[i-1]]$，我们需要寻找一个更短的匹配后缀。由于 $\pi[i-1]$ 已经是一个匹配后缀的长度，下一个候选长度必然是 $\pi[\pi[i-1]-1]$。

## 2. 算法实现

### 核心代码 (C++)
```cpp
vector<int> prefix_function(string s) {
    int n = s.length();
    vector<int> pi(n);
    for (int i = 1; i < n; i++) {
        int j = pi[i - 1];
        while (j > 0 && s[i] != s[j])
            j = pi[j - 1];
        if (s[i] == s[j])
            j++;
        pi[i] = j;
    }
    return pi;
}
```

### 复杂度证明
**定理**：前缀函数的计算时间复杂度为 $O(n)$。
**证明**：
观察变量 $j$ 的变化：
- 在每次 `for` 循环中，$j$ 最多增加 1（通过 `j++`）。
- `while` 循环中的 `j = pi[j - 1]` 必然导致 $j$ 减小（因为 $\pi[j-1] < j$）。
- 由于 $j$ 始终非负，减少的总量不可能超过增加的总量。增加的总量为 $n$，因此 `while` 循环的总执行次数也是 $O(n)$ 级别的。

## 3. 经典例题

### 例题 1：字符串匹配 (模板)
> 给定主串 $T$ 和模式串 $P$，找出 $P$ 在 $T$ 中所有出现的位置。

<details>
<summary><Zap size={18} className="inline-block mr-1" /> 查看 C++ 解答</summary>

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

vector<int> kmp_match(string t, string p) {
    string s = p + "#" + t;
    int n = s.length(), m = p.length();
    vector<int> pi(n);
    vector<int> res;
    for (int i = 1; i < n; i++) {
        int j = pi[i - 1];
        while (j > 0 && s[i] != s[j]) j = pi[j - 1];
        if (s[i] == s[j]) j++;
        pi[i] = j;
        if (i > m && pi[i] == m) {
            res.push_back(i - 2 * m);
        }
    }
    return res;
}

int main() {
    string t, p;
    cin >> t >> p;
    vector<int> positions = kmp_match(t, p);
    for (int pos : positions) cout << pos << " ";
    return 0;
}
```
</details>

### 例题 2：最短循环节
> 给定一个字符串 $s$，求其最小周期长度。

<details>
<summary><ShieldCheck size={18} className="inline-block mr-1" /> 查看理论分析与代码</summary>

**理论**：
若 $n$ 能被 $n - \pi[n-1]$ 整除，则最小周期长度为 $n - \pi[n-1]$；否则最小周期长度为 $n$（即自身）。

```cpp
int get_min_period(string s) {
    int n = s.length();
    vector<int> pi = prefix_function(s);
    int k = n - pi[n - 1];
    if (n % k == 0) return k;
    return n;
}
```
</details>

## 4. 练习
1. [POJ 3461] Oulipo - 纯匹配练习。
2. [HDU 3746] Cyclic Nacklace - 补齐循环节。
3. [Codeforces 126B] Password - 寻找既是前缀、后缀且在中间出现的子串。
