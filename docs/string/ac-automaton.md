---
title: AC 自动机与多模式匹配
---

import { Layers, GitBranch, Cpu, Search, Workflow, Network, Zap, Info, ShieldCheck, Target, Activity } from 'lucide-react';
import CodeCollapse from '@site/src/components/CodeCollapse';

# AC 自动机：多模式匹配与状态机建模

<div className="flex gap-2 mb-6">
  <span className="badge badge--primary"><Workflow size={14} className="mr-1" /> 多模式匹配</span>
  <span className="badge badge--success"><ShieldCheck size={14} className="mr-1" /> DFA 建模</span>
  <span className="badge badge--info"><Activity size={14} className="mr-1" /> Fail 树理论</span>
</div>

AC 自动机 (Aho-Corasick Automaton) 是多模式匹配问题的标准解法。它通过将多个模式串构建为 Trie 树，并引入失配指针 ($fail$)，将匹配过程转化为在确定有限状态自动机 (DFA) 上的状态迁移。

---

## 1. 核心构造：Fail 指针与 DFA

### 1.1 Fail 指针的形式化定义

对于 Trie 树中的节点 $u$，其失配指针 $fail[u]$ 指向节点 $v$，满足 $v$ 所代表的字符串是 $u$ 所代表字符串在 Trie 中存在的最长**真后缀**。

### 1.2 状态转移一致性验证

我们将 AC 自动机视为 DFA $\mathcal{M} = (Q, \Sigma, \delta, q_0, F)$。
- **转移函数 $\delta(u, c)$**：
  - 若 $child(u, c)$ 存在，则 $\delta(u, c) = child(u, c)$。
  - 若 $child(u, c)$ 不存在，则 $\delta(u, c) = \delta(fail[u], c)$。

**一致性证明**：
状态 $u$ 唯一对应一个模式串的前缀。在输入 $c$ 后，我们需要转移到一个代表“当前文本后缀与模式串集合的最长公共前缀”的状态。
1. **存在性**：由于 $fail[u]$ 的深度严格小于 $u$，递归定义必然在根节点收敛。
2. **最优性**：由 $fail$ 的最长真后缀定义保证，递归搜索链遍历了所有可能的后缀匹配，且第一个遇到的满足 $child(v, c)$ 的 $v$ 必然提供最长匹配。

---

## 2. Fail 树 (Fail Tree) 的性质与应用

将所有 $(fail[u], u)$ 视为有向边，构成了以根节点为中心的 **Fail 树**。

### 2.1 树形拓扑性质

- **后缀包含关系**：若节点 $v$ 是 $u$ 在 Fail 树上的祖先，则 $v$ 代表的字符串是 $u$ 代表字符串的后缀。
- **出现次数统计**：模式串 $P_i$ 在文本中出现的次数，等于文本匹配过程中经过的所有节点中，在 Fail 树上以 $P_i$ 对应节点为祖先的节点总数。

### 2.2 拓扑优化 (Topological Accumulation)

在匹配文本 $T$ 时，若直接沿 $fail$ 链上跳统计，复杂度在极端情况下（如 `aaaaa`）会退化。
**方案**：在匹配时仅在经过的节点标记 $ans[u]++$，匹配完成后按 Fail 树的**逆拓扑序**（从叶到根）进行累加：$ans[fail[u]] += ans[u]$。

---

## 3. 工业级算法实现

<CodeCollapse title="AC 自动机：DFA 化与拓扑优化 (C++)" language="cpp">

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
                    // 核心：状态继承，tr[fail[u]][i] 此时已是 DFA 后的最终状态
                    fail[tr[u][i]] = tr[fail[u]][i]; 
                    q[r++] = tr[u][i];
                } else {
                    // DFA 化：直接将空转移指向失配后的状态
                    tr[u][i] = tr[fail[u]][i]; 
                }
            }
        }
    }

    // 拓扑累加统计
    void query(const string& t, int* res) {
        int u = 0;
        for (char c : t) {
            u = tr[u][c - 'a'];
            res[u]++;
        }
        for (int i = tot; i >= 1; i--) {
            res[fail[q[i]]] += res[q[i]];
        }
    }
};
```

</CodeCollapse>

---

## 4. 经典例题

### 例题：[BZOJ 3172] 单词统计

> **题目**：给定 $n$ 个单词，求每个单词在所有单词中出现的总次数。
> **思路**：将所有单词插入 AC 自动机，构建完成后将每个单词在自动机上走一遍，标记路径节点，最后用 Fail 树拓扑累加。

<details>
<summary>Check Analysis</summary>

```cpp
// 核心逻辑
for (int i = 1; i <= n; i++) {
    int u = 0;
    for (char c : words[i]) {
        u = tr[u][c - 'a'];
        val[u]++; // 标记路径
    }
}
// 逆拓扑序累加
for (int i = tot; i >= 1; i--) val[fail[q[i]]] += val[q[i]];
// word[i] 结尾节点 u 的 val[u] 即为答案
```

</details>

---

## 🎯 练习题清单

1. **[Luogu P3808] AC 自动机模板**
2. **[BZOJ 2434] 阿狸的打字机**：Fail 树 + DFS 序 + 树状数组。
3. **[POJ 2778] DNA Sequence**：AC 自动机 + 矩阵快速幂。
4. **[HDU 3065] 病毒侵袭持续中**：经典多模式匹配统计。
