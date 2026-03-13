---
title: KMP 算法与周期理论
---

import { Zap, ShieldCheck, Code2, Target, Cpu, Info, Layers, Workflow, Binary, Activity } from 'lucide-react';
import CodeCollapse from '@site/src/components/CodeCollapse';

# KMP 算法：前缀函数与周期性边界分析

<div className="flex gap-2 mb-6">
  <span className="badge badge--primary"><Zap size={14} className="mr-1" /> 线性匹配</span>
  <span className="badge badge--success"><ShieldCheck size={14} className="mr-1" /> 势能分析证明</span>
  <span className="badge badge--info"><Activity size={14} className="mr-1" /> 周期理论</span>
</div>

KMP (Knuth-Morris-Pratt) 算法是字符串处理的基石，它通过挖掘模式串内部的**自我覆盖性质**，实现了在线性的时间内完成单模式匹配。本章将从形式化定义出发，探讨前缀函数、势能分析以及周期性引理。

---

## 1. 前缀函数 (Prefix Function)

### 1.1 形式化定义与 Border 概念

**定义 (Border)**：字符串 $s$ 的一个真前缀 $s[0 \dots k-1]$ 如果同时也是 $s$ 的真后缀，则称其为 $s$ 的一个 **Border**。

**前缀函数 $\pi[i]$**：定义为子串 $s[0 \dots i]$ 的**最长 Border** 的长度。
$$
\pi[i] = \max \{k : 0 < k \le i \text{ 且 } s[0 \dots k-1] = s[i-k+1 \dots i]\}
$$

### 1.2 递推转移的系统化证明

**引理 1 (单调性限制)**：$\pi[i] \le \pi[i-1] + 1$。
- **证明**：若 $\pi[i] = k > 1$，则 $s[0 \dots k-1]$ 是 $s[0 \dots i]$ 的 Border。去掉末尾字符，$s[0 \dots k-2]$ 必为 $s[0 \dots i-1]$ 的 Border。由定义 $\pi[i-1] \ge k-1$，证毕。

**引理 2 (Border 的传递性)**：$s$ 的 Border 的 Border 也是 $s$ 的 Border。
- 这意味着所有 Border 的长度可以通过迭代 $\pi$ 函数获得：$\{ \pi[i], \pi[\pi[i]-1], \pi[\pi[\pi[i]-1]-1], \dots \}$。

### 1.3 失配指针收敛性证明

在计算 $\pi[i]$ 时，我们不断跳跃 $j = \pi[j-1]$ 直到 $s[i] = s[j]$ 或 $j=0$。
- **收敛性**：由于每次跳转 $j$ 都会严格减小（因为 $\pi[j-1] < j$），且 $j \ge 0$，该过程必然在有限步内终止。
- **全局线性复杂度**：利用势函数 $\Phi(i) = \pi[i]$。每次 $i \to i+1$，$\pi[i]$ 最多增加 1。而每次 $j = \pi[j-1]$ 跳转，$\pi[i]$ 至少减少 1。总增加量为 $n$，故总跳转次数上限为 $n$。

---

## 2. 周期性边界分析 (Periodicity Theory)

### 2.1 周期 (Period) 与 Border 的对偶性

**定义 (Period)**：若对于所有 $0 \le i < |s| - p$，满足 $s[i] = s[i+p]$，则称 $p$ 为 $s$ 的一个周期。

**定理 (周期-Border 对偶)**：$p$ 是 $s$ 的一个周期 $\iff$ $s$ 有一个长度为 $|s| - p$ 的 Border。

### 2.2 弱周期引理 (Weak Periodicity Lemma)

**引理**：若 $p$ 和 $q$ 是 $s$ 的周期，且 $p + q \le |s|$，则 $\gcd(p, q)$ 也是 $s$ 的周期。
- **Fine-Wilf 定理**：上述条件的极限界限是 $p+q-\gcd(p, q)$。

---

## 3. KMP 自动机：状态转移一致性

我们将 KMP 视为 DFA $\mathcal{A} = (Q, \Sigma, \delta, q_0, F)$。

### 3.1 转移函数 $\delta(j, c)$ 的一致性证明

状态 $j$ 表示当前匹配了模式串 $P$ 的前缀 $P[0 \dots j-1]$。
- **一致性要求**：在状态 $j$ 输入 $c$ 后，新状态 $j'$ 必须是文本串当前后缀与 $P$ 的前缀的最长匹配长度。
- **转移式**：
  $$
  \delta(j, c) = \begin{cases} j+1 & \text{if } c = P[j] \\ \delta(\pi[j-1], c) & \text{if } c \neq P[j] \text{ and } j > 0 \\ 1 \text{ or } 0 & \text{if } j = 0 \end{cases}
  $$
- **证明**：若 $c \neq P[j]$，我们寻找 $P[0 \dots j-1]$ 的后缀 $S'$ 使得 $S'+c$ 是 $P$ 的前缀。根据 Border 的性质，$S'$ 必须是 $P[0 \dots j-1]$ 的一个 Border。为了使匹配最长，我们按 Border 长度从大到小（即迭代 $\pi$）检查，这恰好对应了递归转移过程。

---

## 4. 算法实现与例题

<CodeCollapse title="前缀函数与 KMP 自动机 (C++)" language="cpp">

```cpp
// 前缀函数 (Next 数组)
vector<int> prefix_function(const string& s) {
    int n = s.length();
    vector<int> pi(n);
    for (int i = 1; i < n; i++) {
        int j = pi[i - 1];
        while (j > 0 && s[i] != s[j]) j = pi[j - 1];
        if (s[i] == s[j]) j++;
        pi[i] = j;
    }
    return pi;
}

// 自动机预处理 (O(m * sigma))
// 通过 DP 优化转移过程
void build_kmp_automaton(string p, vector<vector<int>>& nxt) {
    int m = p.length();
    vector<int> pi = prefix_function(p);
    nxt.assign(m + 1, vector<int>(26));
    for (int i = 0; i < m; i++) {
        for (int c = 0; c < 26; c++) {
            if (i > 0 && c != p[i] - 'a') nxt[i][c] = nxt[pi[i-1]][c];
            else nxt[i][c] = i + (c == p[i] - 'a');
        }
    }
}
```

</CodeCollapse>

---

## 🎯 综合练习

### 练习 1：[Luogu P4391] 最小循环节

> **题目**：给定长度为 $n$ 的字符串 $S$，求其最短循环节长度（循环节不必完整，如 `abcabcab` 的最短循环节为 `abc`）。

<details>
<summary>Check Solution</summary>

根据周期-Border 对偶性，$n - \pi[n-1]$ 是 $S$ 的一个周期。由于 $\pi[n-1]$ 是最长 Border，则 $n - \pi[n-1]$ 必为最小周期。

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    int n; string s;
    cin >> n >> s;
    vector<int> pi(n);
    for (int i = 1; i < n; i++) {
        int j = pi[i-1];
        while (j > 0 && s[i] != s[j]) j = pi[j-1];
        if (s[i] == s[j]) j++;
        pi[i] = j;
    }
    cout << n - pi[n-1] << endl;
    return 0;
}
```

</details>

### 练习 2：[POJ 2406] Power Strings

> **题目**：求字符串 $S$ 的最大幂次数 $k$，使得 $S = T^k$。

<details>
<summary>Check Solution</summary>

若 $n$ 能被 $n - \pi[n-1]$ 整除，则最小正周期为 $n - \pi[n-1]$，答案为 $n / (n - \pi[n-1])$；否则答案为 1。

```cpp
#include <iostream>
#include <string>
#include <vector>

using namespace std;

int main() {
    string s;
    while (cin >> s && s != ".") {
        int n = s.length();
        vector<int> pi(n);
        for (int i = 1; i < n; i++) {
            int j = pi[i-1];
            while (j > 0 && s[i] != s[j]) j = pi[j-1];
            if (s[i] == s[j]) j++;
            pi[i] = j;
        }
        int L = n - pi[n-1];
        if (n % L == 0) cout << n / L << endl;
        else cout << 1 << endl;
    }
    return 0;
}
```

</details>

### 练习 3：[Luogu P3426] 串

> **题目**：求最短的字符串 $T$，使得 $S$ 可以由 $T$ 通过不断覆盖（重叠地放置）得到。

<details>
<summary>Check Solution</summary>

利用 DP。设 $f[i]$ 表示前缀 $S[0 \dots i]$ 的最短覆盖长度。
1. $f[i]$ 的候选值一定是 $\pi[i]$ 相关的。
2. 若存在 $j < i$ 满足 $f[j] = f[\pi[i]]$ 且 $j \ge i - \pi[i]$，说明可以通过重叠覆盖，此时 $f[i] = f[\pi[i]]$。
3. 否则 $f[i] = i+1$。

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main() {
    string s; cin >> s;
    int n = s.length();
    vector<int> pi(n), f(n), bucket(n + 1, -1);
    for (int i = 1; i < n; i++) {
        int j = pi[i-1];
        while (j > 0 && s[i] != s[j]) j = pi[j-1];
        if (s[i] == s[j]) j++;
        pi[i] = j;
    }
    f[0] = 1; bucket[1] = 0;
    for (int i = 1; i < n; i++) {
        f[i] = i + 1;
        if (bucket[f[pi[i]-1]] >= i - pi[i]) f[i] = f[pi[i]-1];
        bucket[f[i]] = i;
    }
    cout << f[n-1] << endl;
    return 0;
}
```

</details>
