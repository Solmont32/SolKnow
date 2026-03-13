---
title: AC 自动机
---

import { Layers, GitBranch, Cpu, Search, Workflow, Network, Zap, Info } from 'lucide-react';
import CodeCollapse from '@site/src/components/CodeCollapse';

# AC 自动机：多模式匹配与状态机建模

AC 自动机 (Aho-Corasick Automaton) 是处理多模式匹配问题的标准算法。它通过将 $k$ 个模式串构建为 Trie 树，并引入失配指针 ($fail$)，将多模式匹配转化为在确定有限状态自动机 (DFA) 上的状态转移。

## 1. 核心构造：Fail 指针与 DFA

### 1.1 Fail 指针的形式化定义

对于 Trie 树中的节点 $u$，其失配指针 $fail[u]$ 指向节点 $v$，满足 $v$ 所代表的字符串是 $u$ 所代表字符串在 Trie 中存在的最长**真后缀**。若不存在这样的真后缀，则 $fail[u] = root$。

### 1.2 状态转移方程 $\delta(u, c)$ 的递归证明

我们将 AC 自动机视为 DFA，其转移函数 $\delta(u, c)$ 表示在状态 $u$ 接收字符 $c$ 后跳转到的新状态。

**定理**：$\delta(u, c)$ 满足以下递归式：
- 若 $child(u, c)$ 存在，则 $\delta(u, c) = child(u, c)$。
- 若 $child(u, c)$ 不存在，则 $\delta(u, c) = \delta(fail[u], c)$（规定 $\delta(root, c) = child(root, c)$ 或 $root$）。

**证明**：
1. **基础情况**：当 $child(u, c)$ 存在时，显然而见。
2. **归纳情况**：若 $child(u, c)$ 不存在，我们需要找到 $u$ 的一个最长真后缀 $s'$，使得 $s' + c$ 也是某个模式串的前缀。根据 $fail$ 定义，$fail[u]$ 是 $u$ 的最长真后缀。如果 $fail[u]$ 也没有 $c$ 转移，则继续考察 $fail[fail[u]]$，这正是递归定义 $\delta(fail[u], c)$ 的含义。
3. **收敛性**：由于 $fail$ 指针指向的节点深度严格递减，递归必然在 $root$ 处终止，保证了 $\delta(u, c)$ 的唯一性与存在性。

### 1.3 复杂度分析 (Amortized Analysis)

- **空间复杂度**：$O(\sum |P_i| \cdot |\Sigma|)$，其中 $\sum |P_i|$ 为模式串总长度。
- **构建复杂度**：
  - Trie 插入：$O(\sum |P_i|)$。
  - Fail 构建 (BFS)：每个节点被访问一次。在处理节点 $u$ 的字符 $c$ 时，若 $child(u, c)$ 不存在，则通过 $\delta(fail[u], c)$ 赋值。由于 $\delta$ 已预处理，单次赋值为 $O(1)$。总复杂度 $O(N \cdot |\Sigma|)$。
- **匹配复杂度**：给定文本 $T$，状态转移次数为 $|T|$。由于 $\delta$ 函数已预处理为数组，单次转移为 $O(1)$。总复杂度 $O(|T|)$。

## 2. 后缀链接性质与 Fail 树

### 2.1 Fail 树的拓扑性质

由 $(u, fail[u])$ 构成的图是一棵以 $root$ 为根的树（边方向通常视为由子指向父）。

**关键性质**：
1. **后缀包含性**：若 $v$ 在 Fail 树上是 $u$ 的祖先，则 $v$ 代表的字符串是 $u$ 代表的字符串的真后缀。
2. **匹配等价类**：当文本串匹配到状态 $u$ 时，它同时也匹配了从 $u$ 到 Fail 树根路径上所有**被标记为模式串结尾**的节点。

### 2.2 拓扑优化原理

在统计模式串出现次数时，直接沿 $fail$ 链上跳会导致 $O(|T| \cdot \text{max\_depth})$ 的复杂度。
**优化方案**：在匹配时只给当前节点 $u$ 打上 `count++` 标记，最后在 Fail 树上从叶子到根进行贡献累加（即按 BFS 序的逆序遍历）。

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
        cnt[u]++; // 记录结尾
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

    void query(const string& t, vector<int>& match_cnt) {
        int u = 0;
        for (char c : t) {
            u = tr[u][c - 'a'];
            match_cnt[u]++;
        }
    }
};
```

</CodeCollapse>

---

## 🎯 经典例题与练习

### 例题 1：[Luogu P3808] 简单版

> 给定 $n$ 个模式串和一个文本串，求有多少个模式串在文本串中出现过。

<details>
<summary>Check Solution</summary>

```cpp
int solve(const string& t) {
    int u = 0, res = 0;
    for (char c : t) {
        u = tr[u][c - 'a'];
        for (int j = u; j && ~cnt[j]; j = fail[j]) {
            res += cnt[j];
            cnt[j] = -1; // 标记已统计，避免重复
        }
    }
    return res;
}
```

</details>

### 例题 2：[Luogu P5357] 二次加强版 (拓扑优化)

> 求每个模式串在文本串中出现的次数。

<details>
<summary>Check Solution</summary>

```cpp
// 匹配后进行拓扑累加
// q[] 存储的是 BFS 序
void topological_sort(int tot, int* q, int* fail, int* match_cnt) {
    for (int i = tot; i >= 1; i--) {
        int u = q[i];
        match_cnt[fail[u]] += match_cnt[u];
    }
}
```

</details>

### 例题 3：[POJ 2778] DNA Sequence

> 求长度为 $n$且不包含任何给定非法模式串的 DNA 序列个数。

<details>
<summary>Check Analysis</summary>

**思路**：
1. 构建 AC 自动机，标记所有包含非法串的状态（若 $u$ 结尾是非法串，或 $fail[u]$ 是非法状态，则 $u$ 非法）。
2. 构建转移矩阵 $M$：若 $tr[u][i] = v$ 且 $v$ 合法，则 $M[u][v]++$。
3. 答案为 $M^n$ 第一行所有合法状态之和。利用矩阵快速幂求解。

</details>

---

## 🎯 练习题清单

1. [Luogu P3796] AC 自动机加强版：输出出现次数最多的模式串。
2. [HDU 2222] Keywords Search：基础匹配。
3. [CF 163E] e-AnTikhud：AC 自动机 + 树状数组动态维护 Fail 树。
4. [BZOJ 3172] 单词：拓扑优化练习。
