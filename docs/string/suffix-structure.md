---
title: 后缀结构
---

import { Layers, GitBranch, Cpu, Search } from 'lucide-react';

# 后缀结构：后缀自动机与后缀数组

后缀结构是字符串算法中最深刻、最强大的部分。它能够高效处理子串查询、子串统计等复杂问题。本章重点介绍**后缀自动机 (Suffix Automaton, SAM)**。

## 1. 后缀自动机 (SAM)

### 1.1 核心概念：Endpos 集合
对于字符串 $S$ 的任意子串 $s$，我们定义 $endpos(s)$ 为 $s$ 在 $S$ 中所有出现位置的右端点集合。
- **等价类**：所有 $endpos$ 集合相同的子串被划分为一个等价类，对应 SAM 中的一个状态（节点）。
- **性质 1**：两个子串 $u, v$（$|u| \le |v|$）的 $endpos$ 集合，要么 $endpos(v) \subseteq endpos(u)$，要么它们没有交集。
- **性质 2**：一个等价类中的所有子串长度是连续的，记为 $[minlen(st), maxlen(st)]$。

### 1.2 后缀链接 (Suffix Link)
对于状态 $st$，其后缀链接 $link(st)$ 指向包含该状态中最短子串的最长真后缀的那个状态。
$link(st)$ 实际上形成了以根节点为根的一棵树，称为 **Parent Tree**。

## 2. SAM 的线性构建

### 核心实现 (C++)
```cpp
const int MAXN = 1e6 + 5;
struct State {
    int len, link;
    int next[26];
} st[MAXN * 2];
int sz, last;

void sam_init() {
    st[0].len = 0;
    st[0].link = -1;
    sz = 1;
    last = 0;
}

void sam_extend(int c) {
    int cur = sz++;
    st[cur].len = st[last].len + 1;
    int p = last;
    while (p != -1 && !st[p].next[c]) {
        st[p].next[c] = cur;
        p = st[p].link;
    }
    if (p == -1) {
        st[cur].link = 0;
    } else {
        int q = st[p].next[c];
        if (st[p].len + 1 == st[q].len) {
            st[cur].link = q;
        } else {
            int clone = sz++;
            st[clone].len = st[p].len + 1;
            st[clone].link = st[q].link;
            memcpy(st[clone].next, st[q].next, sizeof(st[q].next));
            while (p != -1 && st[p].next[c] == q) {
                st[p].next[c] = clone;
                p = st[p].link;
            }
            st[q].link = st[cur].link = clone;
        }
    }
    last = cur;
}
```

## 3. 经典例题

### 例题 1：子串出现次数
> 给定一个字符串 $S$ 和 $k$ 个询问串 $T_i$，求每个 $T_i$ 在 $S$ 中出现的次数。

<details>
<summary><Cpu size={18} className="inline-block mr-1" /> 查看 SAM + Parent Tree 方案</summary>

**思路**：
在构建 SAM 时，每个主串前缀对应的状态 `cur` 初始 count 为 1。构建完成后，按照 `len` 从大到小（或在 Parent Tree 上 DFS）将 count 累加到 `link` 节点。询问 $T_i$ 时，在 SAM 上跑匹配，若能匹配完，返回该状态的 count。

```cpp
// 累加次数
for (int i = 1; i < sz; i++) cnt[i] = 1; // 仅初始前缀节点为1，克隆节点为0
// 按长度排序后从后往前加
vector<int> nodes(sz);
iota(nodes.begin(), nodes.end(), 0);
sort(nodes.begin(), nodes.end(), [](int a, int b){ return st[a].len > st[b].len; });
for (int u : nodes) if (st[u].link != -1) cnt[st[u].link] += cnt[u];
```
</details>

### 例题 2：不同子串个数
> 求字符串 $S$ 中有多少个不同的子串。

<details>
<summary><Layers size={18} className="inline-block mr-1" /> 查看理论分析</summary>

**方案 A**：子串个数 = $\sum (maxlen(st) - minlen(st) + 1) = \sum (maxlen(st) - maxlen(link(st)))$。
**方案 B**：在 SAM 的 DAG 上跑 DP，求从根出发的不同路径数。
</details>

## 4. 后缀数组 (Suffix Array) 简述
对于较长字符集或特定问题（如 LCP 查询），后缀数组 $SA$ 也是重要工具。
- $SA[i]$：排名第 $i$ 的后缀的起始位置。
- $Rank[i]$：起始位置为 $i$ 的后缀的排名。
- $Height[i]$：$SA[i]$ 与 $SA[i-1]$ 的最长公共前缀长度。

## 5. 练习
1. [Luogu P3804] 后缀自动机模板。
2. [SPOJ] LCS - Longest Common Substring.
3. [Luogu P3809] 后缀数组模板。
