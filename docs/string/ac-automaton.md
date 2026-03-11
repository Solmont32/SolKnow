---
title: AC 自动机
---

import { Layers, GitBranch, Cpu, Search, Workflow, Network, Zap } from 'lucide-react';
import CodeCollapse from '@site/src/components/CodeCollapse';

# AC 自动机：多模式匹配与状态机建模

AC 自动机 (Aho-Corasick Automaton) 是处理多模式匹配问题的工业级标准方案。它将 $k$ 个模式串构建为一棵 Trie 树，并引入 $fail$ 指针，在 $O(N + \sum |P_i|)$ 时间内完成所有匹配。

## 1. 核心构造：从 Trie 到 DFA

### 1.1 Fail 指针的数学定义
对于 Trie 中的节点 $u$，其失败指针 $fail[u]$ 指向节点 $v$，满足 $v$ 所代表的字符串是 $u$ 所代表字符串在 Trie 中存在的最长**真后缀**。

**构造逻辑**：
- 若 $child(u, c)$ 存在，则 $fail[child(u, c)] = \delta(fail[u], c)$。
- 根节点的子节点 $fail$ 指向根节点。

### 1.2 Trie 图优化：状态转移方程
为了消除匹配过程中的重复递归，我们将 Trie 补全为**确定有限状态自动机 (DFA)**。
状态 $u$ 接收字符 $c$ 的转移函数 $\delta(u, c)$ 定义为：
$$
\delta(u, c) = 
\begin{cases} 
child(u, c) & \text{若 } child(u, c) \text{ 存在} \\
\delta(fail[u], c) & \text{若 } child(u, c) \text{ 不存在}
\end{cases}
$$
在实现中，我们直接覆盖 `trie[u][c]`。

<CodeCollapse title="AC 自动机核心构建 (C++)" language="cpp">

```cpp
struct AC_Automaton {
    int trie[MAXN][26], fail[MAXN], tot;
    
    void insert(const string& s) {
        int p = 0;
        for (char c : s) {
            int v = c - 'a';
            if (!trie[p][v]) trie[p][v] = ++tot;
            p = trie[p][v];
        }
    }

    void build() {
        queue<int> q;
        for (int i = 0; i < 26; i++)
            if (trie[0][i]) q.push(trie[0][i]);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int i = 0; i < 26; i++) {
                if (trie[u][i]) {
                    fail[trie[u][i]] = trie[fail[u]][i]; // 核心转移
                    q.push(trie[u][i]);
                } else {
                    trie[u][i] = trie[fail[u]][i]; // DFA 化：直接指向失配后的状态
                }
            }
        }
    }
};
```

</CodeCollapse>

## 2. 拓扑优化：高效统计技巧

在统计每个模式串出现次数时，传统的做法是沿着 $fail$ 链向上跳。在最坏情况下（如 `aaaa...a`），这会导致 $O(N \cdot \max|P|)$ 的复杂度。

**优化方案**：
1. 匹配时，仅在当前节点打上标记：`ans[p]++`。
2. 将 $fail$ 指针视作一条反向边，它们构成了一棵 **Fail 树**。
3. 匹配结束后，在 Fail 树上跑拓扑排序或 DFS，将子节点的权值累加到父节点。

<details>
<summary>Check Solution: 拓扑优化实现</summary>

```cpp
void query(string t) {
    int p = 0;
    for (char c : t) {
        p = trie[p][c - 'a'];
        val[p]++; // 打标记
    }
    // 拓扑排序累加
    queue<int> q;
    for (int i = 1; i <= tot; i++) if (!in_degree[i]) q.push(i);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        int v = fail[u];
        val[v] += val[u];
        if (--in_degree[v] == 0) q.push(v);
    }
}
```
</details>

## 3. 经典建模：AC 自动机 + DP / 矩阵快速幂

### 3.1 禁止串约束计数
> 给定若干禁止出现的模式串，求长度为 $L$ 且不包含任何禁止串的字符串数量。

**状态定义**：
$dp[i][u]$ 表示长度为 $i$ 时位于状态 $u$ 的合法方案数。

**转移准则**：
- 若状态 $v$ 或其 $fail$ 链上任意节点是某个模式串的结尾，则 $v$ 是非法状态。
- $dp[i+1][\delta(u, c)] = \sum dp[i][u]$ (当 $\delta(u, c)$ 合法时)。

### 3.2 矩阵快速幂加速
当 $L$ 极大（如 $10^{18}$）时，利用 DFA 转移的固定性，构建转移矩阵 $M$。
$$ Ans = [1, 0, \dots, 0] \cdot M^L $$

---

## 🎯 练习题清单
1. [Luogu P3808] AC 自动机简单版：基础构建与匹配。
2. [Luogu P5357] AC 自动机二次加强版：必须使用拓扑优化。
3. [POJ 2778] DNA Sequence：AC 自动机 + 矩阵快速幂经典题。
4. [BZOJ 3172] 单词：Fail 树统计。
5. [CF 585F] Digits of Number Pi：AC 自动机 + 数位 DP。
