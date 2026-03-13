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

KMP (Knuth-Morris-Pratt) 算法不仅是字符串检索的利器，更是深入理解字符串**周期结构**的窗口。本章将从形式化定义出发，探讨前缀函数、势能分析以及周期性引理。

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

---

## 2. 周期性边界分析 (Periodicity Theory)

### 2.1 周期 (Period) 与 Border 的对偶性

**定义 (Period)**：若对于所有 $0 \le i < |s| - p$，满足 $s[i] = s[i+p]$，则称 $p$ 为 $s$ 的一个周期。

**定理 (周期-Border 对偶)**：$p$ 是 $s$ 的一个周期 $\iff$ $s$ 有一个长度为 $|s| - p$ 的 Border。
- **直观理解**：由于前后缀相等，重叠部分的错位正好构成了周期的循环。

### 2.2 弱周期引理 (Weak Periodicity Lemma)

**引理**：若 $p$ 和 $q$ 是 $s$ 的周期，且 $p + q \le |s|$，则 $\gcd(p, q)$ 也是 $s$ 的周期。
- **推论**：若一个字符串有多个周期，在长度足够时，它们会“收敛”到更小的公约数周期。
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
- **证明简述**：当失配时，我们需要找到 $P[0 \dots j-1]$ 的最长真后缀使得接上 $c$ 后能匹配 $P$ 的前缀。根据 Border 的性质，这等价于在 $P[0 \dots j-1]$ 的所有 Border 中寻找。

---

## 4. 复杂度分析：势能分析法

**定义势函数** $\Phi = \pi[i]$（当前匹配长度）。
- **Push 操作**（匹配成功）：$\Phi \to \Phi + 1$。
- **Pop 操作**（`while` 循环跳转）：每次执行 $j = \pi[j-1]$，$\Phi$ 至少减少 1。
- **平摊分析**：总增加量为 $n$，因此总减少量（`while` 执行次数）不会超过 $n$。总时间复杂度为 $O(n)$。

---

## 5. 算法实现与例题

<CodeCollapse title="前缀函数与 KMP 自动机 (C++)" language="cpp">

```cpp
// 前缀函数
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
void build_kmp_automaton(string p, vector<vector<int>>& nxt) {
    int m = p.length();
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

### 例题：[Luogu P4391] 最小循环节

> **题目**：给定长度为 $n$ 的字符串 $S$，求其最短循环节长度（循环节不必完整）。
> **解法**：最短周期即为 $n - \pi[n-1]$。

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

---

## 🎯 练习题清单

1. **[Luogu P3375] KMP 模板**
2. **[POJ 2185] 矩阵周期**：二维 KMP 应用。
3. **[CF 1200E] Compress Words**：利用 KMP 优化字符串合并。
4. **[TopCoder 11311] SrmCards**：结合 KMP 状态机的动态规划。
