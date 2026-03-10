---
title: AC 自动机
---

import { Layers, GitBranch, Cpu, Search } from 'lucide-react';

# AC 自动机：多模式匹配的高效引擎

AC 自动机 (Aho-Corasick Automaton) 是多模式匹配问题的终极解决方案。它通过将多个模式串构建为一棵 Trie 树，并引入类似 KMP 的 $fail$ 指针，实现了在 $O(n)$ 时间内完成所有模式串在主串中的匹配。

## 1. 结构与定义

### 1.1 Trie 树结构
将所有模式串 $P_1, P_2, \dots, P_k$ 插入一棵字典树中。树中的每个节点代表某个模式串的前缀。

### 1.2 Fail 指针 (失败指针)
对于节点 $u$，其失败指针 $fail[u]$ 指向节点 $v$，其中 $v$ 代表的字符串是 $u$ 代表的字符串在 Trie 树中最长的**真后缀**。

**数学性质**：
若从根到 $u$ 的路径表示字符串 $S$，则从根到 $fail[u]$ 的路径表示 $S$ 的最长真后缀，且该真后缀同时是 Trie 树中某个模式串的前缀。

## 2. 系统化 Fail 指针与 Trie 图优化

### 2.1 递推构建
利用 BFS 逐层构建 $fail$ 指针：
1. 根节点的子节点 $v$，$fail[v] = 0$。
2. 对于节点 $u$ 的字符 $c$ 对应的子节点 $v$：
   - 若 $v$ 存在，$fail[v] = trie[fail[u]][c]$。
   - 若 $v$ 不存在（**Trie 图优化/字典树压缩**），令 $trie[u][c] = trie[fail[u]][c]$。

### 2.2 Trie 图优化 (Trie Graph)
传统的 AC 自动机在匹配失败时需要回溯 $fail$ 指针，最坏情况下匹配单次字符的时间复杂度较高。
通过在构建 $fail$ 时直接将不存在的子节点指向其 $fail$ 节点的对应子节点，我们将 Trie 树转化为了一个**确定有限状态自动机 (DFA)**。这样，每次转移的时间复杂度降为 $O(1)$。

## 3. 实现细节

### 核心实现 (C++)
```cpp
const int MAXN = 5e5 + 5;
int trie[MAXN][26], fail[MAXN], cnt[MAXN], tot;

void insert(const string& s) {
    int p = 0;
    for (char c : s) {
        int v = c - 'a';
        if (!trie[p][v]) trie[p][v] = ++tot;
        p = trie[p][v];
    }
    cnt[p]++; // 记录以该节点结尾的模式串数量
}

void build() {
    queue<int> q;
    for (int i = 0; i < 26; i++)
        if (trie[0][i]) q.push(trie[0][i]);

    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int i = 0; i < 26; i++) {
            if (trie[u][i]) {
                fail[trie[u][i]] = trie[fail[u]][i];
                q.push(trie[u][i]);
            } else {
                trie[u][i] = trie[fail[u]][i]; // 核心优化：Trie 图
            }
        }
    }
}
```

## 4. 经典例题

### 例题 1：关键词统计
> 给定 $k$ 个模式串和 1 个主串，统计有多少个模式串在主串中出现过。

<details>
<summary><Cpu size={18} className="inline-block mr-1" /> 查看 C++ 解答</summary>

```cpp
int query(string t) {
    int p = 0, res = 0;
    for (char c : t) {
        p = trie[p][c - 'a'];
        for (int j = p; j && ~cnt[j]; j = fail[j]) {
            res += cnt[j];
            cnt[j] = -1; // 避免重复统计
        }
    }
    return res;
}
```
</details>

### 例题 2：Fail 树的应用
> 在 AC 自动机中，若 $v = fail[u]$，则从 $v$ 到根的路径表示的串是 $u$ 的后缀。
> 我们可以将所有的 $(fail[u], u)$ 看作一棵树的边，构建出 **Fail 树**。

<details>
<summary><Layers size={18} className="inline-block mr-1" /> 查看理论深度分析</summary>

**定理**：模式串 $P_i$ 在 $P_j$ 中出现的次数，等于在 Fail 树中以 $P_i$ 对应节点为根的子树内，包含多少个属于 $P_j$ 前缀的节点。

**应用**：结合 DFS 序和树状数组，可以处理复杂的动态匹配与查询问题。
</details>

## 5. 练习
1. [Luogu P3808] AC 自动机（简单版）
2. [Luogu P3796] AC 自动机（加强版）
3. [Luogu P5357] AC 自动机（二次加强版）- 需要用到 Fail 树拓扑优化。
