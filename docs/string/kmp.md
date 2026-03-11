---
title: KMP 算法
---

import { Zap, ShieldCheck, Code2, Search, Target, Binary, Cpu } from 'lucide-react';
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

### 1.3 算法实现

利用引理 2，我们可以通过增量法高效计算前缀函数：

<CodeCollapse title="前缀函数线性实现 (C++)" language="cpp">

```cpp
vector<int> prefix_function(const string& s) {
    int n = s.length();
    vector<int> pi(n);
    for (int i = 1; i < n; i++) {
        int j = pi[i - 1];
        // 核心：若不匹配，则回溯到前一个可能的相等前后缀
        while (j > 0 && s[i] != s[j])
            j = pi[j - 1];
        if (s[i] == s[j]) j++;
        pi[i] = j;
    }
    return pi;
}
```

</CodeCollapse>

## 2. KMP 自动机 (DFA Perspective)

在匹配过程中，我们可以将 KMP 看作一个**确定有限状态自动机 (DFA)**。

### 2.1 状态转移函数 $\delta$
状态 $j$ 表示当前已匹配的模式串前缀长度为 $j$。当接收字符 $c$ 时，转移到新状态 $\delta(j, c)$：
$$
\delta(j, c) = \begin{cases} j+1 & \text{if } c = P[j] \\ \delta(\pi[j-1], c) & \text{if } c \neq P[j] \text{ and } j > 0 \\ 0 & \text{otherwise} \end{cases}
$$

### 2.2 自动机构建
通过预处理转移矩阵，可以在 $O(|P| \cdot |\Sigma|)$ 时间内构建自动机，使得匹配过程真正达到 $O(1)$ 每字符。

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

## 3. 复杂度证明：势能分析法

**定理**：前缀函数的计算时间复杂度为 $O(n)$。

**证明**：
1. 定义势函数 $\Phi_i = \pi[i]$（当前匹配长度）。
2. 在每次 `for` 循环迭代中：
   - 外部循环使 $\Phi$ 最多增加 1（通过 `j++`），总增加量为 $n$。
   - `while` 循环中的 `j = pi[j-1]` 使得 $\Phi$ 严格减小。由于 $\pi[k] \le k-1$（真前缀），且 $\Phi$ 始终非负。
   - 减小的总量不可能超过增加的总量，故 `while` 的总迭代次数为 $O(n)$。

## 4. 经典应用与例题

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
> 给定字符串 $S$，求最长的子串 $T$，使得 $T$既是 $S$ 的前缀，又是 $S$ 的后缀，且在 $S$ 的中间（非首尾）也出现过。

<details>
<summary>Check Solution</summary>

**思路**：
1. 计算 $S$ 的前缀函数 $\pi$。
2. 候选 $T$ 必须是 $S$ 的相等前后缀，其长度为 $k_1 = \pi[n-1], k_2 = \pi[k_1-1] \dots$。
3. 检查 $k$ 是否在 $\pi[1 \dots n-2]$ 中出现过。记录 $\pi[1 \dots n-2]$ 的最大值 $max\_pi$。
4. 从 $k = \pi[n-1]$ 开始回溯，第一个满足 $k \le max\_pi$ 的即为答案。

```cpp
string solve_password(string s) {
    int n = s.length();
    vector<int> pi = prefix_function(s);
    if (pi[n-1] == 0) return "Just a legend";
    
    int max_pi = 0;
    for (int i = 0; i < n - 1; i++) max_pi = max(max_pi, pi[i]);
    
    int curr = pi[n-1];
    while (curr > 0 && curr > max_pi) {
        curr = pi[curr - 1];
    }
    
    if (curr == 0) return "Just a legend";
    return s.substr(0, curr);
}
```
</details>

## 5. 进阶：Z 函数 (扩展 KMP)

Z 函数 $z[i]$ 表示 $s$ 与后缀 $s[i \dots n-1]$ 的最长公共前缀长度。它在处理 LCP 相关问题时比 KMP 更直接。

<CodeCollapse title="Z 函数线性实现" language="cpp">

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

</CodeCollapse>

---

## 🎯 练习题清单
1. [Luogu P3375] KMP 模板题。
2. [POJ 2406] Power Strings：最小循环节应用。
3. [HDU 3336] Count the string：前缀计数 DP。
4. [CF 432D] Prefixes and Suffixes：KMP 状态树计数。
