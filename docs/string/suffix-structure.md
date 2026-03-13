---
title: 后缀结构：SAM 与 SA
---

import { Layers, GitBranch, Cpu, Search, Share2, Box, Zap, Info, ShieldCheck, Target, Activity } from 'lucide-react';
import CodeCollapse from '@site/src/components/CodeCollapse';

# 后缀结构：后缀自动机与后缀数组

<div className="flex gap-2 mb-6">
  <span className="badge badge--primary"><Layers size={14} className="mr-1" /> Suffix Structure</span>
  <span className="badge badge--success"><ShieldCheck size={14} className="mr-1" /> $O(N)$ Construction</span>
  <span className="badge badge--info"><Activity size={14} className="mr-1" /> Endpos Theory</span>
</div>

后缀结构是字符串算法的巅峰。本章深入探讨**后缀自动机 (SAM)** 与 **后缀数组 (SA)**，它们能在 $O(N)$ 时间内提取字符串的全局子串拓扑与序信息。

---

## 1. 后缀自动机 (Suffix Automaton, SAM)

SAM 是接受给定字符串 $S$ 的所有子串的最小 DFA。

### 1.1 核心理论：Endpos 等价类

对于子串 $s$，定义 $Endpos(s)$ 为 $s$ 在原串 $S$ 中所有出现位置的**结束下标**集合。

**定理 (Endpos 性质证明)**：
1. **等价类性质**：两个子串 $u, v$（设 $|u| \le |v|$）属于同一状态当且仅当 $Endpos(u) = Endpos(v)$。
2. **Parent Tree**：每一个状态 $u$ 都有一个链接 $link[u]$，指向 $u$ 中最短子串的长度为 $|minlen(u)|-1$ 的最长真后缀状态。所有 $link$ 构成了以 $root$ 为根的 **Parent Tree**。

### 1.2 拓扑序校验 (Topological Verification)

SAM 的状态图（DAWG）是一个 DAG，其拓扑序具有重要意义：
- **DAWG 拓扑序**：按照 $maxlen$ 从小到大排序。在增量构建过程中，新产生的节点 $maxlen$ 总是递增的。
- **Parent Tree 拓扑序**：由于 $maxlen(link[u]) < minlen(u) \le maxlen(u)$，Parent Tree 的拓扑序（祖先到叶子）与 $maxlen$ 的单调性一致。
- **校验意义**：在统计子串出现次数时，必须按照 $maxlen$ **逆序**遍历，以保证子树信息正确汇总到祖先节点。

---

## 2. 后缀数组 (Suffix Array, SA)

### 2.1 Height 数组与 LCP 引理

- **SA[i]**：排名为 $i$ 的后缀的起始位置。
- **Height[i]**：$LCP(SA[i], SA[i-1])$。

**定理 (LCP 引理)**：对于 $i < j$，有 $LCP(SA[i], SA[j]) = \min_{k=i+1}^j Height[k]$。

---

## 3. 算法实现

<CodeCollapse title="SAM 增量构建与拓扑排序 (C++)" language="cpp">

```cpp
struct SAM {
    struct Node { int len, link, next[26]; } st[MAXN * 2];
    int sz, last;
    SAM() { st[0].len = 0; st[0].link = -1; sz = 1; last = 0; }

    void extend(int c) {
        int cur = sz++, p = last;
        st[cur].len = st[last].len + 1;
        while (p != -1 && !st[p].next[c]) {
            st[p].next[c] = cur;
            p = st[p].link;
        }
        if (p == -1) st[cur].link = 0;
        else {
            int q = st[p].next[c];
            if (st[p].len + 1 == st[q].len) st[cur].link = q;
            else {
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

    // 利用计数排序获取拓扑序
    vector<int> get_topological_order() {
        vector<int> cnt(sz), order(sz);
        for (int i = 0; i < sz; i++) cnt[st[i].len]++;
        for (int i = 1; i < sz; i++) cnt[i] += cnt[i-1];
        for (int i = 0; i < sz; i++) order[--cnt[st[i].len]] = i;
        return order;
    }
};
```

</CodeCollapse>

---

## 🎯 综合练习

### 练习 1：[Luogu P3804] 子串统计

> **题目**：求出现次数 $>1$ 的所有子串中，（出现次数 $\times$ 长度）的最大值。

<details>
<summary>Check Solution</summary>

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cstring>

using namespace std;

const int MAXN = 1000005;
struct Node { int len, link, next[26]; } st[MAXN * 2];
int sz, last, siz[MAXN * 2], c[MAXN * 2], a[MAXN * 2];

void extend(int c) {
    int cur = sz++, p = last;
    st[cur].len = st[last].len + 1;
    siz[cur] = 1; // 标记新节点
    while (p != -1 && !st[p].next[c]) {
        st[p].next[c] = cur;
        p = st[p].link;
    }
    if (p == -1) st[cur].link = 0;
    else {
        int q = st[p].next[c];
        if (st[p].len + 1 == st[q].len) st[cur].link = q;
        else {
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

int main() {
    string s; cin >> s;
    st[0].link = -1; sz = 1;
    for (char ch : s) extend(ch - 'a');
    for (int i = 0; i < sz; i++) c[st[i].len]++;
    for (int i = 1; i < sz; i++) c[i] += c[i - 1];
    for (int i = 0; i < sz; i++) a[--c[st[i].len]] = i;
    long long ans = 0;
    for (int i = sz - 1; i >= 1; i--) {
        int u = a[i];
        siz[st[u].link] += siz[u];
        if (siz[u] > 1) ans = max(ans, 1LL * siz[u] * st[u].len);
    }
    cout << ans << endl;
    return 0;
}
```

</details>

### 练习 2：[Luogu P3975] 弦论

> **题目**：求第 $k$ 小子串（分为“不同位置出现计为多次”和“计为一次”两种模式）。

<details>
<summary>Check Analysis</summary>

**SAM + DP**：
1. 构建 SAM。
2. 模式 0（计为 1 次）：每个节点的初始 `cnt` 设为 1。
3. 模式 1（计为多次）：利用 Parent Tree 汇总 $Endpos$ 集合大小作为 `cnt`。
4. 在 DAWG 上跑 DP，求出 $f[u]$（从状态 $u$ 出发能到达的子串总数）。
5. 类似 Trie 树查找第 $k$ 大，根据 $f$ 值进行贪心选择。

</details>

### 练习 3：[BZOJ 3238] 差异

> **题目**：求 $\sum_{1 \le i < j \le n} (len(T_i) + len(T_j) - 2 \cdot LCP(T_i, T_j))$，其中 $T_i$ 是第 $i$ 个后缀。

<details>
<summary>Check Solution</summary>

**解法**：前两项 $\sum (len(T_i) + len(T_j))$ 易求。关键在于求所有后缀对的 LCP 之和。
在 SAM 的 Parent Tree 上，两个后缀状态的 LCA 节点的 $maxlen$ 即为它们的 LCP。
于是问题转化为：在 Parent Tree 上统计所有叶子节点对的 LCA 权重之和。

```cpp
// 在 Parent Tree 上进行统计
for (int i = sz - 1; i >= 1; i--) {
    int u = a[i], p = st[u].link;
    ans += 1LL * st[p].len * siz[p] * siz[u];
    siz[p] += siz[u];
}
```

</details>
