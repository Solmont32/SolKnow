---
title: AC 自动机
---

import { Layers, GitBranch, Cpu, Search, Workflow, Network, Zap, Info, ShieldCheck, Target } from 'lucide-react';
import CodeCollapse from '@site/src/components/CodeCollapse';

# AC 自动机：多模式匹配与状态机建模

<div className="flex gap-2 mb-6">
  <span className="badge badge--primary"><Workflow size={14} className="mr-1" /> 多模式匹配</span>
  <span className="badge badge--success"><ShieldCheck size={14} className="mr-1" /> DFA 建模</span>
  <span className="badge badge--info"><Cpu size={14} className="mr-1" /> $O(\sum |P_i| + |T|)$ Time</span>
</div>

AC 自动机 (Aho-Corasick Automaton) 是处理多模式匹配问题的标准算法。它通过将 $k$ 个模式串构建为 Trie 树，并引入失配指针 ($fail$)，将多模式匹配转化为在确定有限状态自动机 (DFA) 上的状态转移。

---

## 1. 核心构造：Fail 指针与 DFA

### 1.1 Fail 指针的形式化定义

对于 Trie 树中的节点 $u$，其失配指针 $fail[u]$ 指向节点 $v$，满足 $v$ 所代表的字符串是 $u$ 所代表字符串在 Trie 中存在的最长**真后缀**。若不存在这样的真后缀，则 $fail[u] = root$。

### 1.2 状态转移方程 $\delta(u, c)$ 的递归证明

我们将 AC 自动机视为 DFA，其转移函数 $\delta(u, c)$ 表示在状态 $u$ 接收字符 $c$ 后跳转到的新状态。

**定理**：$\delta(u, c)$ 满足以下递归式：
- 若 $child(u, c)$ 存在，则 $\delta(u, c) = child(u, c)$。
- 若 $child(u, c)$ 不存在，则 $\delta(u, c) = \delta(fail[u], c)$（规定 $\delta(root, c) = child(root, c)$ 或 $root$）。

**证明**：
1. **基础情况**：当 $child(u, c)$ 存在时，显而易见。
2. **归纳情况**：若 $child(u, c)$ 不存在，我们需要找到 $u$ 的一个最长真后缀 $s'$，使得 $s' + c$ 也是某个模式串的前缀。根据 $fail$ 定义，$fail[u]$ 是 $u$ 的最长真后缀。如果 $fail[u]$ 也没有 $c$ 转移，则继续考察 $fail[fail[u]]$，这正是递归定义 $\delta(fail[u], c)$ 的含义。
3. **收敛性**：由于 $fail$ 指针指向的节点深度严格递减，递归必然在 $root$ 处终止，保证了 $\delta(u, c)$ 的唯一性与存在性。

---

## 2. 算法实现与拓扑优化

### 2.1 复杂度分析

- **时间复杂度**：构建过程 $O(\sum |P_i| \cdot \Sigma)$，查询过程 $O(|T|)$。
- **空间复杂度**：$O(\sum |P_i| \cdot \Sigma)$。

### 2.2 拓扑优化 (Topological Accumulation)

在统计模式串出现次数时，直接沿 $fail$ 链上跳会导致 $O(|T| \cdot \sqrt{\sum |P_i|})$ 的最坏复杂度。
**方案**：在匹配时仅在当前节点标记 `count++`。匹配结束后，按 Fail 树的**拓扑序逆序**（即从叶子到根）进行贡献累加。

<CodeCollapse title="AC 自动机工业级模板 (C++)" language="cpp">

```cpp
struct AC_Automaton {
    int tr[MAXN][26], fail[MAXN], cnt[MAXN];
    int tot, q[MAXN];

    void insert(const string& s) {
        int u = 0;
        for (char c : s) {
            int v = c - 'a';
            if (!tr[u][v]) tr[u][v] = ++tot;
            u = tr[u][v];
        }
        cnt[u]++; 
    }

    void build() {
        int l = 0, r = 0;
        for (int i = 0; i < 26; i++)
            if (tr[0][i]) q[r++] = tr[0][i];
        while (l < r) {
            int u = q[l++];
            for (int i = 0; i < 26; i++) {
                if (tr[u][i]) {
                    fail[tr[u][i]] = tr[fail[u]][i]; // 核心：状态继承
                    q[r++] = tr[u][i];
                } else {
                    tr[u][i] = tr[fail[u]][i]; // DFA 化：直接跳转
                }
            }
        }
    }

    // 拓扑排序累加贡献
    void accumulate(int* ans) {
        for (int i = tot - 1; i >= 0; i--) {
            int u = q[i];
            ans[fail[u]] += ans[u];
        }
    }
};
```

</CodeCollapse>

---

## 3. 经典例题

### 例题 1：[POJ 2778] DNA Sequence (AC 自动机 + 矩阵快速幂)

> **题目**：求长度为 $n$ 且不包含任何给定非法模式串的 DNA 序列个数。
> **思路**：
> 1. 构建 AC 自动机，标记所有包含非法串的状态（若 $fail[u]$ 是非法状态，则 $u$ 也是非法状态）。
> 2. 将合法状态之间的转移构建为邻接矩阵 $M$。
> 3. 答案即为 $M^n$ 的第一行元素之和。

### 例题 2：[BZOJ 3172] 单词 (拓扑优化应用)

> **题目**：给定 $n$ 个单词，求每个单词在所有单词（包括自身）中出现的总次数。
> **思路**：将所有单词插入 AC 自动机，匹配所有单词并在相应节点打标，最后通过拓扑排序累加 $fail$ 树上的贡献。

---

## 🎯 练习题清单

1. **[Luogu P3808] AC 自动机简单版**：统计有多少模式串出现过。
2. **[Luogu P3796] AC 自动机加强版**：输出出现次数最多的模式串。
3. **[CF 163E] e-AnTikhud**：结合树状数组动态维护 Fail 树上的前缀和。
4. **[HDU 2222] Keywords Search**：经典入门题。
