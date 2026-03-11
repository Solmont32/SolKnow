---
title: KMP 算法
---

import { Zap, ShieldCheck, Code2, Search, Target, Binary, Cpu, Info } from 'lucide-react';
import CodeCollapse from '@site/src/components/CodeCollapse';

# KMP 算法：前缀函数与模式匹配优化

KMP (Knuth-Morris-Pratt) 算法是字符串处理的基石。它的核心在于通过预处理模式串的**内部对称性**，使得在匹配失败时能够利用已知信息进行“跳跃”，从而实现线性时间复杂度的字符串检索。

## 1. 前缀函数 (Prefix Function)

### 1.1 形式化定义
对于长度为 $n$ 的字符串 $s$，其前缀函数 $\pi[i]$ 定义为子串 $s[0 \dots i]$ 的最长真前缀的长度，且该真前缀同时也是 $s[0 \dots i]$ 的真后缀。

数学表达式：
$$
\pi[i] = \max \{k : 0 < k \le i \text{ 且 } s[0 \dots k-1] = s[i-k+1 \dots i]\}
$$
规定 $\pi[0] = 0$。

### 1.2 关键性质与证明

**引理 1 (单调性限制)**：对于任意 $i > 0$，有 $\pi[i] \le \pi[i-1] + 1$。
- **证明**：设 $\pi[i] = k$。这意味着 $s[0 \dots k-1] = s[i-k+1 \dots i]$。若 $k > 1$，则去掉最后一个字符后有 $s[0 \dots k-2] = s[i-k+1 \dots i-1]$，这表明 $s[0 \dots k-2]$ 是 $s[0 \dots i-1]$ 的一个相等真前后缀。根据定义 $\pi[i-1] \ge k-1$，即 $k \le \pi[i-1] + 1$。

**引理 2 (前后缀等价链)**：若 $k$ 是 $s[0 \dots i]$ 的一个相等真前后缀的长度，则比 $k$ 小的下一个最长相等真前后缀长度必为 $\pi[k-1]$。
- **推论**：通过不断迭代 $j = \pi[j-1]$，可以遍历 $s[0 \dots i]$ 的所有相等真前后缀长度。

### 1.3 周期性引理 (Periodicity Lemma)
**定理**：字符串 $s$ 具有长度为 $T$ 的周期，当且仅当 $T$ 整除 $n$ 且 $n-T = \pi[n-1]$。
- **推广**：最小周期长度为 $n - \pi[n-1]$。若 $(n - \pi[n-1])$ 能整除 $n$，则该串由 $n / (n - \pi[n-1])$ 个循环节组成；否则，最小循环元长度仍为 $n - \pi[n-1]$，但末尾不完整。

## 2. 复杂度证明：势能分析法

**定理**：前缀函数的计算时间复杂度为 $O(n)$。

**证明**：
1. 定义势函数 $\Phi_i = \pi[i]$。显然 $\Phi_i \ge 0$ 且 $\Phi_0 = 0$。
2. 考察第 $i$ 次迭代的操作：
   - `j++` 操作（最多一次）使势能增加 1：$\Delta \Phi_{inc} \le 1$。
   - `while` 循环中的 `j = pi[j-1]` 使势能减小。由于 $\pi[k-1] < k$，每次迭代至少使 $j$ 减小 1。设第 $i$ 次循环中 `while` 迭代了 $k_i$ 次，则 $\Delta \Phi_{dec, i} \le -k_i$。
3. 总复杂度为 $\sum_{i=1}^n (1 + \text{while 迭代次数}) = n + \sum k_i$。
4. 由于 $\Phi_n = \Phi_0 + \sum \Delta \Phi_{inc} + \sum \Delta \Phi_{dec} \ge 0$，得 $0 + n - \sum k_i \ge 0$，即 $\sum k_i \le n$。
5. 结论：总时间复杂度为 $O(n)$。

## 3. 算法实现

<CodeCollapse title="前缀函数线性实现 (C++)" language="cpp">

```cpp
vector<int> prefix_function(const string& s) {
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

</CodeCollapse>

## 4. KMP 自动机 (DFA Perspective)

### 4.1 状态转移函数 $\delta$
状态 $j$ 表示当前已匹配的模式串前缀长度。当接收字符 $c$ 时：
$$
\delta(j, c) = \begin{cases} j+1 & \text{if } c = P[j] \\ \delta(\pi[j-1], c) & \text{if } c \neq P[j] \text{ and } j > 0 \\ 0 & \text{otherwise} \end{cases}
$$

<CodeCollapse title="KMP 自动机构建" language="cpp">

```cpp
void compute_automaton(string p, int trans[][26]) {
    p += '#'; // 终止符
    int n = p.length();
    vector<int> pi = prefix_function(p);
    for (int j = 0; j < n; j++) {
        for (int c = 0; c < 26; c++) {
            if (j > 0 && c != p[j] - 'a')
                trans[j][c] = trans[pi[j-1]][c];
            else
                trans[j][c] = j + (c == p[j] - 'a');
        }
    }
}
```

</CodeCollapse>

## 5. 经典应用与例题

### 例题 1：模式串出现次数
> 统计模式串 $P$ 在文本串 $T$ 中出现的总次数。

<details>
<summary>Check Solution</summary>

```cpp
int count_occurrences(string t, string p) {
    string s = p + "#" + t;
    vector<int> pi = prefix_function(s);
    int count = 0, m = p.length();
    for (int i = m + 1; i < s.length(); i++) {
        if (pi[i] == m) count++;
    }
    return count;
}
```
</details>

### 例题 2：[Codeforces 126B] Password
> 给定字符串 $S$，求最长的子串 $T$，使得 $T$ 既是 $S$ 的前缀，又是 $S$ 的后缀，且在 $S$ 的中间也出现过。

<details>
<summary>Check Solution</summary>

**思路**：
1. 候选长度 $k$ 必须满足 $k = \pi[n-1], \pi[\pi[n-1]-1] \dots$。
2. 检查 $k$ 是否在 $\pi[1 \dots n-2]$ 中出现过。记录 $max\_pi = \max_{i=1}^{n-2} \pi[i]$。
3. 最大满足 $k \le max\_pi$ 的 $k$ 即为答案。

```cpp
string solve_password(string s) {
    int n = s.length();
    vector<int> pi = prefix_function(s);
    if (pi[n-1] == 0) return "Just a legend";
    int max_pi = 0;
    for (int i = 0; i < n - 1; i++) max_pi = max(max_pi, pi[i]);
    int curr = pi[n-1];
    while (curr > 0 && curr > max_pi) curr = pi[curr - 1];
    return curr == 0 ? "Just a legend" : s.substr(0, curr);
}
```
</details>

### 进阶思考：还原前缀函数
> 给定一个数组 $\pi[0 \dots n-1]$，判断是否存在一个仅含小写字母的字符串 $S$ 满足该数组为其前缀函数。若存在，构造字典序最小的 $S$。

<details>
<summary>Check Analysis</summary>

**核心逻辑**：
1. 检查合法性：$\pi[0]=0$ 且 $\pi[i] \le \pi[i-1]+1$。
2. 构造 $S[i]$：
   - 若 $\pi[i] > 0$，则 $S[i] = S[\pi[i]-1]$。
   - 若 $\pi[i] = 0$，则 $S[i]$ 必须避开所有 $S[\delta(j, c)]$ 的转移，其中 $j = \pi[i-1]$。实际上，只需避开 $S[\pi[i-1]], S[\pi[\pi[i-1]-1]] \dots$ 这些位置的下一个字符。

```cpp
string reconstruct(vector<int> pi) {
    int n = pi.size();
    string s = "a";
    for (int i = 1; i < n; i++) {
        if (pi[i] > 0) s += s[pi[i] - 1];
        else {
            vector<bool> used(26, false);
            int j = pi[i - 1];
            while (j > 0) {
                used[s[j] - 'a'] = true;
                j = pi[j - 1];
            }
            used[s[0] - 'a'] = true;
            for (int c = 0; c < 26; c++) {
                if (!used[c]) { s += (char)('a' + c); break; }
            }
        }
    }
    return s;
}
```
</details>

---

## 🎯 练习题清单
1. [Luogu P3375] KMP 模板题。
2. [POJ 2406] Power Strings：最小循环节应用。
3. [HDU 3336] Count the string：前缀计数 DP。
4. [CF 432D] Prefixes and Suffixes：KMP 状态树计数。
