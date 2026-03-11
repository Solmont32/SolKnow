---
title: AC 自动机
---

import { Layers, GitBranch, Cpu, Search, Workflow, Network } from 'lucide-react';

# AC 自动机：多模式匹配与状态机建模

AC 自动机 (Aho-Corasick Automaton) 是多模式匹配问题的标准解决方案。它将 $k$ 个模式串构建为一棵 Trie 树，并引入 $fail$ 指针，在 $O(N + \sum |P_i|)$ 时间内完成所有匹配。

## 1. 核心构造：从 Trie 到 DFA

### 1.1 Fail 指针的数学定义
对于节点 $u$，其失败指针 $fail[u]$ 指向节点 $v$，满足 $v$ 所代表的字符串是 $u$ 所代表字符串在 Trie 中存在的最长**真后缀**。
这一设计确保了当在 $u$ 处失配时，我们可以无缝跳跃到 $v$ 继续尝试。

### 1.2 Trie 图优化：状态转移方程
我们将 Trie 补全为**确定有限状态自动机 (DFA)**。状态 $u$ 接收字符 $c$ 的转移函数 $\delta(u, c)$ 定义为：
$$
\delta(u, c) = 
\begin{cases} 
child(u, c) & \text{若 } child(u, c) \text{ 存在} \\
\delta(fail[u], c) & \text{若 } child(u, c) \text{ 不存在}
\end{cases}
$$
在实现中，我们直接覆盖 `trie[u][c]` 以消除重复递归。

## 2. 完备实现：多模式匹配统计

### 例题 1：模式串出现次数统计 (加强版)
> 给定 $n$ 个模式串和一段文本，求每个模式串在文本中出现的次数。

<details>
<summary><Network size={18} className="inline-block mr-1" /> 查看 C++ 拓扑优化实现</summary>

**思路**：
1. 构建 Trie 树，记录每个字符串结尾对应的节点。
2. 构建 AC 自动机，并统计 Fail 树中各节点的入度。
3. 文本匹配：每经过一个节点，在对应位置打上标记 `ans[p]++`。
4. 拓扑排序：在 Fail 树上从叶子向根累加标记，最终 `ans[end_pos[i]]` 即为第 $i$ 个串的答案。

```cpp
struct AC_Automaton {
    int trie[MAXN][26], fail[MAXN], in[MAXN], tot;
    int end_pos[MAXN], ans[MAXN];

    void insert(string s, int id) {
        int p = 0;
        for (char c : s) {
            int v = c - 'a';
            if (!trie[p][v]) trie[p][v] = ++tot;
            p = trie[p][v];
        }
        end_pos[id] = p;
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
                    in[fail[trie[u][i]]]++;
                    q.push(trie[u][i]);
                } else {
                    trie[u][i] = trie[fail[u]][i];
                }
            }
        }
    }

    void query(string t) {
        int p = 0;
        for (char c : t) {
            p = trie[p][c - 'a'];
            ans[p]++;
        }
        queue<int> q;
        for (int i = 1; i <= tot; i++) if (!in[i]) q.push(i);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            int v = fail[u];
            ans[v] += ans[u];
            if (--in[v] == 0) q.push(v);
        }
    }
};
```
</details>

## 3. 高级进阶：AC 自动机 + 矩阵快速幂

### 3.1 理论：禁止串与状态计数
当我们要在 AC 自动机上计算长度为 $L$ 的字符串数量，且满足某种约束（如不包含任何模式串）时，问题转化为在 DFA 的有向图上计算长度为 $L$ 的路径数。

### 3.2 矩阵转移
定义邻接矩阵 $M$，其中 $M_{i,j} = 1$ 表示状态 $i$ 是否能通过一个字符转移到状态 $j$（且 $j$ 及其 $fail$ 链上不包含禁止点）。
- 若 $L$ 很大（如 $10^{18}$），则 $M^L$ 的第一行（代表从起始状态 0 出发）的各列之和即为答案。
- 复杂度：$O(tot^3 \log L)$，其中 $tot$ 为 AC 自动机节点数。

## 4. 经典建模：AC 自动机 + DP

### 例题 2：文本生成问题
> 给定若干禁止出现的模式串，求长度为 $L$ 的不包含任何禁止串的字符串数量。

<details>
<summary><Workflow size={18} className="inline-block mr-1" /> 查看状态转移设计</summary>

**状态定义**：
$dp[i][j]$ 表示长度为 $i$ 时位于 AC 自动机状态 $j$ 的方案数。

**转移方程**：
$$
dp[i+1][\delta(j, c)] = \sum dp[i][j] \quad (\text{其中 } \delta(j, c) \text{ 及其 } fail \text{ 路径上不含禁止位})
$$

**核心预处理**：
```cpp
// 在 build 过程中传递禁止位
if (is_forbidden[fail[trie[u][i]]]) 
    is_forbidden[trie[u][i]] = true;
```
</details>

## 5. 练习
1. [Luogu P3808] AC 自动机（简单版）
2. [Luogu P5357] AC 自动机（二次加强版）- 强制要求拓扑优化。
3. [POJ 2778] DNA Sequence - AC 自动机 + 矩阵快速幂。
4. [HDU 2222] Keywords Search - 基础应用。
