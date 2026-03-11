---
title: AC 自动机
---

import { Layers, GitBranch, Cpu, Search, Workflow, Network, Zap, Info } from 'lucide-react';
import CodeCollapse from '@site/src/components/CodeCollapse';

# AC 自动机：多模式匹配与状态机建模

AC 自动机 (Aho-Corasick Automaton) 是处理多模式匹配问题的工业级标准方案。它将 $k$ 个模式串构建为一棵 Trie 树，并通过 $fail$ 指针实现高效的状态转移。

## 1. 核心构造：Fail 指针与 DFA

### 1.1 Fail 指针的数学定义
对于 Trie 中的节点 $u$，其失败指针 $fail[u]$ 指向节点 $v$，满足 $v$ 所代表的字符串是 $u$ 所代表字符串在 Trie 中存在的最长**真后缀**。

**性质证明**：
- **引理**：若 $v$ 是 $u$ 的真后缀，则 $fail[u]$ 所代表的字符串长度一定大于 $v$ 所代表的字符串长度（除非 $v = fail[u]$）。
- **构造正确性**：采用 BFS 层序遍历。对于节点 $u$ 的字符 $c$ 的子节点 $v$：
  - 若 $v$ 存在，寻找其真后缀等价于在 $fail[u]$ 的转移中寻找字符 $c$。
  - $fail[v] = \delta(fail[u], c)$。根据 BFS 顺序，$fail[u]$ 的所有转移在计算 $v$ 时已确定。

### 1.2 Trie 图 (DFA) 的状态转移
为了消除匹配过程中的重复递归，我们将 Trie 补全为**确定有限状态自动机 (DFA)**。
状态 $u$ 接收字符 $c$ 的转移函数 $\delta(u, c)$ 定义为：
$$
\delta(u, c) = 
\begin{cases} 
child(u, c) & \text{若 } child(u, c) \text{ 存在} \\
\delta(fail[u], c) & \text{若 } child(u, c) \text{ 不存在}
\end{cases}
$$
在实现中，我们直接覆盖 `trie[u][c]`，这样每次转移仅需 $O(1)$。

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
                    fail[trie[u][i]] = trie[fail[u]][i];
                    q.push(trie[u][i]);
                } else {
                    trie[u][i] = trie[fail[u]][i];
                }
            }
        }
    }
};
```

</CodeCollapse>

## 2. Fail 树结构分析

$fail$ 指针构成了一棵以根节点 (0) 为根的树，称为 **Fail 树**。

**关键结论**：
1. **后缀包含性**：若 $v$ 在 Fail 树上是 $u$ 的祖先，则 $v$ 代表的字符串是 $u$ 代表的字符串的真后缀。
2. **多模式匹配统计**：文本串匹配到状态 $p$ 时，它不仅匹配了 $p$ 代表的字符串，还匹配了 $p$ 在 Fail 树上到根路径上所有节点代表的字符串。
3. **拓扑优化**：为了避免 $O(N \cdot \text{fail\_depth})$ 的复杂度，我们可以在匹配时仅对当前节点打标记，最后通过 Fail 树的拓扑排序（或按深度倒序累加）一次性计算贡献。

<details>
<summary>Check Implementation: 拓扑优化统计</summary>

```cpp
void query(string t) {
    int p = 0;
    for (char c : t) {
        p = trie[p][c - 'a'];
        cnt[p]++;
    }
    // 预处理入度或直接按 tot 逆序遍历（BFS 序的逆序即为拓扑序）
    for (int i = tot; i >= 1; i--) {
        cnt[fail[q[i]]] += cnt[q[i]]; // q 为 BFS 访问顺序数组
    }
}
```
</details>

## 3. 进阶建模：AC 自动机 + 数位 DP

### 3.1 场景描述
> 求在区间 $[L, R]$ 中，包含（或不包含）某些特定模式串的数字个数。

**建模步骤**：
1. 将所有模式串插入 AC 自动机。
2. 标记“非法状态”：若节点 $u$ 或 $fail[u]$（及 $fail$ 链上任意节点）是模式串结尾，则 $u$ 为非法。
3. **状态定义**：$dp(pos, state, is_less, is_started)$。
   - `state`：当前在 AC 自动机中的节点索引。
4. **转移**：在数位 DP 过程中，每填一个数字 $d$，状态从 $u$ 转移到 $trie[u][d]$。

<details>
<summary>Check Solution: 数位 DP 核心伪代码</summary>

```cpp
long long dfs(int pos, int u, bool limit, bool lead) {
    if (pos == -1) return 1;
    if (!limit && !lead && f[pos][u] != -1) return f[pos][u];
    
    long long res = 0;
    int up = limit ? digits[pos] : 9;
    for (int d = 0; d <= up; d++) {
        int v = trie[u][d];
        if (is_bad[v]) continue; // 跳过包含模式串的状态
        res += dfs(pos - 1, (lead && d == 0) ? 0 : v, limit && (d == up), lead && (d == 0));
    }
    return limit || lead ? res : f[pos][u] = res;
}
```
</details>

---

## 🎯 练习题清单
1. [Luogu P3808] AC 自动机简单版。
2. [Luogu P5357] AC 自动机二次加强版：必须使用拓扑优化。
3. [POJ 2778] DNA Sequence：AC 自动机 + 矩阵快速幂。
4. [CF 585F] Digits of Number Pi：AC 自动机 + 数位 DP。
5. [BZOJ 3689] 异或之：AC 自动机与异或性质结合。
