---
title: KMP 算法
---

import { Zap, ShieldCheck, Code2, Target, Cpu, Info, Layers, Workflow } from 'lucide-react';
import CodeCollapse from '@site/src/components/CodeCollapse';

# KMP 算法：前缀函数与模式匹配优化

<div className="flex gap-2 mb-6">
  <span className="badge badge--primary"><Zap size={14} className="mr-1" /> 线性匹配</span>
  <span className="badge badge--success"><ShieldCheck size={14} className="mr-1" /> 势能分析证明</span>
  <span className="badge badge--info"><Cpu size={14} className="mr-1" /> $O(n+m)$ Time</span>
</div>

KMP (Knuth-Morris-Pratt) 算法是字符串处理的基石。它的核心在于通过预处理模式串的**内部对称性**，使得在匹配失败时能够利用已知信息进行“跳跃”，从而实现线性时间复杂度的字符串检索。

---

## 1. 前缀函数 (Prefix Function)

### 1.1 形式化定义

对于长度为 $n$ 的字符串 $s$，其前缀函数 $\pi[i]$ 定义为子串 $s[0 \dots i]$ 的最长真前缀的长度，且该真前缀同时也是 $s[0 \dots i]$ 的真后缀。

$$
\pi[i] = \max \{k : 0 < k \le i \text{ 且 } s[0 \dots k-1] = s[i-k+1 \dots i]\}
$$

规定 $\pi[0] = 0$。

### 1.2 递推转移的系统化证明

为了在线性时间内计算 $\pi[i]$，我们需要基于 $\pi[i-1]$ 进行推导。

**引理 1 (单调性限制)**：对于任意 $i > 0$，有 $\pi[i] \le \pi[i-1] + 1$。
- **证明**：设 $\pi[i] = k$。这意味着 $s[0 \dots k-1] = s[i-k+1 \dots i]$。若 $k > 1$，则去掉最后一个字符后有 $s[0 \dots k-2] = s[i-k+1 \dots i-1]$，这表明 $s[0 \dots k-2]$ 是 $s[0 \dots i-1]$ 的一个相等真前后缀。根据定义 $\pi[i-1] \ge k-1$，即 $k \le \pi[i-1] + 1$。

**引理 2 (转移搜索链)**：若 $s[i] \neq s[\pi[i-1]]$，则下一个可能匹配的位置是 $\pi[\pi[i-1]-1]$。
- **证明**：我们需要找到 $s[0 \dots i]$ 的一个相等真前后缀 $s[0 \dots k-1]$，其必须满足 $s[k-1] = s[i]$。由于 $s[0 \dots k-2]$ 必须是 $s[0 \dots i-1]$ 的一个相等真前后缀，且其长度 $k-1$ 必须小于 $\pi[i-1]$。根据前缀函数的定义，比 $\pi[i-1]$ 短的最长相等真前后缀正是 $\pi[\pi[i-1]-1]$。通过不断迭代 $j = \pi[j-1]$，我们可以遍历所有候选项。

---

## 2. 复杂度分析：势能分析法 (Amortized Analysis)

我们使用**势能分析法**严密证明 $O(n)$ 复杂度。

**定义**：第 $i$ 步后的势函数 $\Phi_i = \pi[i]$。
- 显然 $\Phi_i \ge 0$ 且 $\Phi_0 = 0$。
- 在计算 $\pi[i]$ 时：
  1. 初始令 $j = \pi[i-1]$。
  2. 执行 `while (j > 0 && s[i] != s[j]) j = pi[j-1]`。每次 `j = pi[j-1]` 至少使 $j$ 减少 1。设该循环执行了 $k_i$ 次。
  3. 若 $s[i] = s[j]$，则 $j$ 增加 1。
- **总代价计算**：
  - 实际代价 $c_i = 1 + k_i$（1次比较 + $k_i$ 次跳转）。
  - 势能变化 $\Delta \Phi_i = \pi[i] - \pi[i-1] \le 1 - k_i$。
  - 平摊代价 $\hat{c}_i = c_i + \Delta \Phi_i \le (1 + k_i) + (1 - k_i) = 2$。
- **结论**：总复杂度 $\sum c_i = \sum \hat{c}_i - (\Phi_n - \Phi_0) \le 2n - \pi[n-1] = O(n)$。

---

## 3. 算法实现

<CodeCollapse title="前缀函数线性实现 (C++)" language="cpp">

```cpp
/**
 * @brief 计算前缀函数 pi 数组
 * 时间复杂度: O(n), 空间复杂度: O(n)
 */
vector<int> prefix_function(const string& s) {
    int n = s.length();
    vector<int> pi(n);
    for (int i = 1; i < n; i++) {
        int j = pi[i - 1];
        while (j > 0 && s[i] != s[j])
            j = pi[j - 1]; // 沿着失配链回溯
        if (s[i] == s[j]) j++;
        pi[i] = j;
    }
    return pi;
}
```

</CodeCollapse>

---

## 4. KMP 自动机：DFA 视角

将 KMP 视为**确定有限状态自动机 (DFA)**。状态 $j$ 表示当前匹配了模式串的前 $j$ 个字符。

### 4.1 转移函数 $\delta(j, c)$
对于状态 $j$ 和输入字符 $c$：
- 若 $c = P[j]$，则 $\delta(j, c) = j + 1$。
- 若 $c \neq P[j]$，则 $\delta(j, c) = \delta(\pi[j-1], c)$。

这种视角在处理“计数不包含某模式串的文本数”等 DP 问题时至关重要。

<CodeCollapse title="KMP 自动机构建 (优化版)" language="cpp">

```cpp
void compute_automaton(string p, vector<vector<int>>& trans) {
    int m = p.length();
    trans.assign(m + 1, vector<int>(26));
    vector<int> pi = prefix_function(p);
    for (int j = 0; j <= m; j++) {
        for (int c = 0; c < 26; c++) {
            if (j > 0 && (j == m || c != p[j] - 'a'))
                trans[j][c] = trans[pi[j-1]][c];
            else if (j < m && c == p[j] - 'a')
                trans[j][c] = j + 1;
        }
    }
}
```

</CodeCollapse>

---

## 5. 经典例题

### 例题 1：最小循环节与周期

> **题目**：给定字符串 $S$，求其最小周期长度。
> **定理**：$S$ 具有长度为 $T$ 的周期 $\iff T | n$ 且 $n-T = \pi[n-1]$。

<details>
<summary>Check Analysis</summary>

若 $n \% (n - \pi[n-1]) == 0$，则最小周期长度为 $n - \pi[n-1]$。
否则，最小周期长度为 $n$（或理解为虽然有循环趋势但末尾不完整）。

```cpp
int get_min_period(string s) {
    int n = s.length();
    vector<int> pi = prefix_function(s);
    int len = n - pi[n-1];
    if (n % len == 0) return len;
    return n;
}
```

</details>

### 例题 2：[Codeforces 126B] Password

> **核心思路**：候选长度 $k$ 必须同时满足：
> 1. $k$ 是前缀和后缀的公共长度（即 $k \in \{ \pi[n-1], \pi[\pi[n-1]-1], \dots \}$）。
> 2. $k$ 在中间出现过（即 $k \le \max_{i=1}^{n-2} \pi[i]$）。

<CodeCollapse title="C++ 实现" language="cpp">

```cpp
string solve() {
    string s; cin >> s;
    int n = s.size();
    vector<int> pi = prefix_function(s);
    int max_mid = 0;
    for (int i = 1; i < n - 1; i++) max_mid = max(max_mid, pi[i]);
    int curr = pi[n-1];
    while (curr > max_mid) curr = pi[curr - 1];
    if (curr == 0) return "Just a legend";
    return s.substr(0, curr);
}
```

</CodeCollapse>

---

## 🎯 练习题清单

1. **[Luogu P3375] KMP 模板**：基础匹配位置输出。
2. **[POJ 2406] Power Strings**：利用 $\pi$ 数组求最大重复次数。
3. **[HDU 3336] Count the string**：前缀出现次数总和，利用 $\pi$ 树 DP。
4. **[CF 432D] Prefixes and Suffixes**：统计每个既是前缀又是后缀的子串在原串中出现的次数。
