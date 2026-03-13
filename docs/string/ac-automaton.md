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

AC 自动机 (Aho-Corasick Automaton) 是处理多模式匹配问题的标准工具。它通过在 Trie 树上引入失配指针 ($fail$)，将模式串集合转化为一个统一的状态机。

---

## 1. 核心构造：Fail 指针与 DFA

### 1.1 Fail 指针的形式化定义

对于 Trie 树中的节点 $u$，其失配指针 $fail[u]$ 指向节点 $v$，满足 $v$ 所代表的字符串是 $u$ 所代表字符串在 Trie 中存在的最长**真后缀**。

### 1.2 失配指针收敛性证明

**证明**：
1. **深度单调性**：对于任意节点 $u$（非根），其 $fail[u]$ 指向的节点 $v$ 的深度必然严格小于 $u$ 的深度。
2. **递归性**：在构建 $fail[tr[u][i]]$ 时，我们检查 $tr[fail[u]][i]$。由于 $fail[u]$ 深度更小，其 fail 指针已先被计算。
3. **收敛**：随着深度不断减小，递归链必然在根节点（深度为 0）终止，根节点的 $fail$ 指向自己。

### 1.3 状态转移一致性验证 (DFA 化)

我们将 AC 自动机优化为 DFA $\mathcal{M} = (Q, \Sigma, \delta, q_0, F)$。
- **转移函数 $\delta(u, c)$**：
  - 若 $child(u, c)$ 存在，则 $\delta(u, c) = child(u, c)$。
  - 若 $child(u, c)$ 不存在，则 $\delta(u, c) = \delta(fail[u], c)$。

**一致性保证**：
在状态 $u$ 输入 $c$ 后，DFA 直接跳转到的状态 $v$ 代表了“当前已匹配的所有模式串中，能够作为当前文本后缀的最长前缀”。通过在 `build` 过程中令 `tr[u][i] = tr[fail[u]][i]`，我们将 $O(\text{模式串总长})$ 的单次跳转摊还到了 $O(1)$。

---

## 2. Fail 树 (Fail Tree) 的性质与应用

将所有 $(fail[u], u)$ 视为有向边，构成了以根节点为中心的 **Fail 树**。

### 2.1 树形拓扑性质

- **后缀包含关系**：若节点 $v$ 是 $u$ 在 Fail 树上的祖先，则 $v$ 代表的字符串是 $u$ 代表字符串的后缀。
- **拓扑序校验**：在 Trie 树上按 BFS 序遍历，恰好符合 Fail 树从根到叶的拓扑序。这为后续的统计优化提供了理论依据。

### 2.2 拓扑优化 (Topological Accumulation)

在匹配文本 $T$ 时，若直接沿 $fail$ 链上跳统计，复杂度在极端情况下会退化。
**方案**：在匹配时仅在经过的节点标记 $ans[u]++$，匹配完成后按 Fail 树的**逆拓扑序**（从叶到根）进行累加：$ans[fail[u]] += ans[u]$。

---

## 3. 算法实现

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
                    fail[tr[u][i]] = tr[fail[u]][i]; 
                    q[r++] = tr[u][i];
                } else {
                    tr[u][i] = tr[fail[u]][i]; 
                }
            }
        }
    }

    void query(const string& t, int* res) {
        int u = 0;
        for (char c : t) {
            u = tr[u][c - 'a'];
            res[u]++;
        }
        for (int i = tot - 1; i >= 0; i--) { // 逆 BFS 序即逆拓扑序
            if (q[i]) res[fail[q[i]]] += res[q[i]];
        }
    }
};
```

</CodeCollapse>

---

## 🎯 综合练习

### 练习 1：[BZOJ 3172] 单词统计

> **题目**：给定 $n$ 个单词，求每个单词在所有单词（包括自身）中出现的总次数之和。

<details>
<summary>Check Solution</summary>

将所有单词存入 AC 自动机。遍历每个单词在自动机上走出的路径并计数，最后进行 Fail 树拓扑累加。

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

const int MAXN = 1000005;
int tr[MAXN][26], fail[MAXN], ans[MAXN], end_pos[MAXN];
int tot, q[MAXN];

void insert(string s, int id) {
    int u = 0;
    for (char c : s) {
        if (!tr[u][c-'a']) tr[u][c-'a'] = ++tot;
        u = tr[u][c-'a'];
        ans[u]++; 
    }
    end_pos[id] = u;
}

void build() {
    int l = 0, r = 0;
    for (int i = 0; i < 26; i++) if (tr[0][i]) q[r++] = tr[0][i];
    while (l < r) {
        int u = q[l++];
        for (int i = 0; i < 26; i++) {
            if (tr[u][i]) {
                fail[tr[u][i]] = tr[fail[u]][i];
                q[r++] = tr[u][i];
            } else tr[u][i] = tr[fail[u]][i];
        }
    }
    for (int i = r - 1; i >= 0; i--) ans[fail[q[i]]] += ans[q[i]];
}

int main() {
    int n; cin >> n;
    for (int i = 1; i <= n; i++) {
        string s; cin >> s;
        insert(s, i);
    }
    build();
    for (int i = 1; i <= n; i++) cout << ans[end_pos[i]] << endl;
    return 0;
}
```

</details>

### 练习 2：[POJ 2778] DNA Sequence

> **题目**：给定一些禁忌模式串，求长度为 $L$ 且不包含任何禁忌串的文本串个数。($L \le 2 \cdot 10^9$)

<details>
<summary>Check Analysis</summary>

**AC 自动机 + 矩阵快速幂**：
1. 构建 AC 自动机，标记所有包含禁忌串的状态（自身是结尾或 fail 指向禁忌状态）。
2. 将合法的状态转移构建为邻接矩阵 $A$。
3. 答案即为矩阵 $A^L$ 中从根节点出发到所有合法节点的路径数之和。

```cpp
// 核心：构建转移矩阵
for (int u = 0; u <= tot; u++) {
    if (bad[u]) continue;
    for (int i = 0; i < 4; i++) {
        int v = tr[u][i];
        if (!bad[v]) mat.a[u][v]++;
    }
}
```

</details>

### 练习 3：[Luogu P2444] 病毒

> **题目**：给定一组二进制模式串，判断是否存在一个无限长的文本串不包含任何模式串。

<details>
<summary>Check Solution</summary>

**找环**：在 AC 自动机的合法状态组成的图上，判断是否存在一个环。如果能从根节点出发进入一个环且环上所有点都是合法的，则存在无限长串。使用 DFS 找环即可。

```cpp
bool dfs(int u) {
    ins[u] = true;
    for (int i = 0; i < 2; i++) {
        int v = tr[u][i];
        if (bad[v]) continue;
        if (ins[v]) return true; 
        if (!vis[v]) {
            vis[v] = true;
            if (dfs(v)) return true;
        }
    }
    ins[u] = false;
    return false;
}
```

</details>
