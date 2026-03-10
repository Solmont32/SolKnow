---
title: AC 自动机
---

import { Layers, GitBranch, Cpu, Search, Workflow, Network } from 'lucide-react';

# AC 自动机：多模式匹配与状态机建模

AC 自动机 (Aho-Corasick Automaton) 是多模式匹配问题的标准解决方案。它将 $k$ 个模式串构建为一棵 Trie 树，并引入 $fail$ 指针，在 $O(N + \sum |P_i|)$ 时间内完成所有匹配。

## 1. 核心构造：从 Trie 到 DFA

### 1.1 Fail 指针的本质
对于节点 $u$，其失败指针 $fail[u]$ 指向节点 $v$，满足 $v$ 所代表的字符串是 $u$ 所代表字符串在 Trie 中存在的最长**真后缀**。
这一设计确保了当在 $u$ 处失配时，我们可以无缝跳跃到 $v$ 继续尝试，而不必从头开始。

### 1.2 Trie 图优化 (Trie Graph)
通过在构建时预处理不存在的转移，将 Trie 转换为一个**确定有限状态自动机 (DFA)**：
- 若节点 $u$ 没有字符 $c$ 的子节点，则令 $trie[u][c] = trie[fail[u]][c]$。
- 这使得每次状态转移都是 $O(1)$ 的，消除了原版 AC 自动机中可能存在的长路径 $fail$ 跳跃。

## 2. 系统化构建过程

```cpp
void build() {
    queue<int> q;
    for (int i = 0; i < 26; i++)
        if (trie[0][i]) q.push(trie[0][i]);

    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int i = 0; i < 26; i++) {
            if (trie[u][i]) {
                fail[trie[u][i]] = trie[fail[u]][i];
                in[fail[trie[u][i]]]++; // 记录 Fail 树入度
                q.push(trie[u][i]);
            } else {
                trie[u][i] = trie[fail[u]][i];
            }
        }
    }
}
```

## 3. 高级优化：Fail 树与拓扑排序

在处理“每个模式串出现次数”的问题时，若对每个匹配点都沿 $fail$ 指针向上跳，最坏复杂度会退化为 $O(N \sqrt{\sum |P_i|})$。

### 3.1 拓扑优化方案
我们可以先在匹配过程中只标记当前节点，最后在 **Fail 树**（由 $fail[u] \to u$ 构成的树）上通过拓扑排序（或 DFS）一次性完成统计。

<details>
<summary><Network size={18} className="inline-block mr-1" /> 查看拓扑优化实现</summary>

```cpp
void query(string t) {
    int p = 0;
    for (char c : t) {
        p = trie[p][c - 'a'];
        ans[p]++; // 先打上标记
    }
}

void solve() {
    queue<int> q;
    for (int i = 1; i <= tot; i++) if (!in[i]) q.push(i);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        // res[end_id[u]] = ans[u]; // end_id[u] 记录节点对应的模式串编号
        int v = fail[u];
        ans[v] += ans[u]; // 向父节点累加
        if (--in[v] == 0) q.push(v);
    }
}
```
</details>

## 4. 经典建模：AC 自动机 + DP

AC 自动机不仅是匹配工具，更是强大的**状态空间**。

### 例题 1：文本生成问题
> 给定若干禁止出现的模式串，求长度为 $L$ 的不包含任何禁止串的字符串数量。

<details>
<summary><Workflow size={18} className="inline-block mr-1" /> 查看状态转移设计</summary>

**状态定义**：
$dp[i][j]$ 表示长度为 $i$，当前位于 AC 自动机的状态 $j$ 时的方案数。

**转移方程**：
$$
dp[i+1][trie[j][c]] = \sum dp[i][j] \quad (\text{其中 } trie[j][c] \text{ 及其 } fail \text{ 路径上不含禁止位})
$$

**代码片段**：
```cpp
for (int i = 0; i < L; i++) {
    for (int j = 0; j <= tot; j++) {
        if (is_forbidden[j]) continue;
        for (int c = 0; c < 26; c++) {
            int nxt = trie[j][c];
            if (!is_forbidden[nxt]) {
                dp[i+1][nxt] = (dp[i+1][nxt] + dp[i][j]) % MOD;
            }
        }
    }
}
```
</details>

## 5. 练习
1. [Luogu P3808] AC 自动机（简单版）
2. [Luogu P5357] AC 自动机（二次加强版）- 强制要求拓扑优化。
3. [POJ 2778] DNA Sequence - AC 自动机 + 矩阵快速幂。
4. [HDU 2222] Keywords Search - 基础应用。
