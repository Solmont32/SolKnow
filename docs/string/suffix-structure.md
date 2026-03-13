---
title: 后缀结构
---

import { Layers, GitBranch, Cpu, Search, Share2, Box, Zap, Info, ShieldCheck, Target } from 'lucide-react';
import CodeCollapse from '@site/src/components/CodeCollapse';

# 后缀结构：后缀自动机与后缀数组

<div className="flex gap-2 mb-6">
  <span className="badge badge--primary"><Layers size={14} className="mr-1" /> Suffix Structure</span>
  <span className="badge badge--success"><ShieldCheck size={14} className="mr-1" /> $O(N)$ Construction</span>
  <span className="badge badge--info"><Cpu size={14} className="mr-1" /> Endpos Theory</span>
</div>

后缀结构是字符串算法的巅峰。本章深入讨论**后缀自动机 (SAM)** 与 **后缀数组 (SA)**，它们能在 $O(N)$ 时间内提取字符串的全局子串拓扑与序信息。

---

## 1. 后缀自动机 (Suffix Automaton, SAM)

SAM 是接受给定字符串 $S$ 的所有后缀的最小确定有限状态自动机 (DFA)。其核心在于对子串出现位置集合的压缩。

### 1.1 核心理论：Endpos 等价类

对于子串 $s$，定义 $Endpos(s)$ 为 $s$ 在原串 $S$ 中所有出现位置的**结束下标**集合。

**定理 (Endpos 性质证明)**：
1. **等价类性质**：两个子串 $u, v$（设 $|u| \le |v|$）满足 $Endpos(u) = Endpos(v)$，当且仅当 $u$ 仅在 $S$ 中以 $v$ 的后缀形式出现。
2. **包含关系**：对于任意子串 $u, v$，其 $Endpos$ 集合要么不相交，要么一个是另一个的子集。
3. **Parent Tree**：每一个 $Endpos$ 等价类代表了一组长度连续的子串。通过将 $Endpos(u) \subset Endpos(v)$ 且 $v$ 是 $u$ 的最长后缀的关系建模，形成了以 $root$ 为根的 **Parent Tree**。

**状态数证明**：SAM 的状态数 $V \le 2n-1$，转移数 $E \le 3n-4$。Parent Tree 的叶子节点对应 $n$ 个前缀的前缀，每个内节点至少有两个子节点，由树的性质可得状态数上限。

### 1.2 extend(c) 算法的线性证明

SAM 的构建是增量的。每次添加字符 $c$：
1. **状态分裂 (Split)**：当遇到 $maxlen(q) > maxlen(p) + 1$ 时，说明 $q$ 节点所代表的子串中，有一部分不再是当前后缀的等价类。此时需要分裂出一个 $clone$ 节点。
2. **时空复杂度**：通过均摊分析可以证明，构建 SAM 的总跳转次数是线性的。

<CodeCollapse title="SAM 工业级模板 (C++)" language="cpp">

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
};
```

</CodeCollapse>

---

## 2. 后缀数组 (Suffix Array, SA)

SA 是所有后缀按字典序排序后的索引数组。它是 SAM 在静态空间下的有力竞争者。

### 2.1 Height 数组与 LCP 引理

- **SA[i]**：排名为 $i$ 的后缀的起始位置。
- **Height[i]**：$LCP(SA[i], SA[i-1])$。

**定理 (Height 递增引理)**：$Height[Rank[i]] \ge Height[Rank[i-1]] - 1$。
该引理保证了我们可以通过双指针在 $O(N)$ 时间内求出整个 Height 数组。

<CodeCollapse title="SA 倍增法 + 基数排序 (C++)" language="cpp">

```cpp
void build_sa(string s, int n, int m) {
    for (int i = 1; i <= n; i++) cnt[rk[i] = s[i-1]]++;
    for (int i = 1; i <= m; i++) cnt[i] += cnt[i-1];
    for (int i = n; i >= 1; i--) sa[cnt[rk[i]]--] = i;
    for (int k = 1; k <= n; k <<= 1) {
        int num = 0;
        for (int i = n - k + 1; i <= n; i++) y[++num] = i;
        for (int i = 1; i <= n; i++) if (sa[i] > k) y[++num] = sa[i] - k;
        for (int i = 0; i <= m; i++) cnt[i] = 0;
        for (int i = 1; i <= n; i++) cnt[rk[i]]++;
        for (int i = 1; i <= m; i++) cnt[i] += cnt[i-1];
        for (int i = n; i >= 1; i--) sa[cnt[rk[y[i]]]--] = y[i];
        swap(rk, y);
        rk[sa[1]] = 1; num = 1;
        for (int i = 2; i <= n; i++)
            rk[sa[i]] = (y[sa[i]] == y[sa[i-1]] && y[sa[i]+k] == y[sa[i-1]+k]) ? num : ++num;
        if (num == n) break;
        m = num;
    }
}
```

</CodeCollapse>

---

## 3. 经典建模应用

### 例题 1：[Luogu P3804] 子串统计 (SAM + Parent Tree DP)

> **核心思路**：
> 1. 构建 SAM，每个非 clone 节点的 $size = 1$（表示这是一个前缀的结束位置）。
> 2. 在 Parent Tree 上自底向上累加 $size$：$size[link[u]] += size[u]$。
> 3. 答案为 $\max(size[u] \cdot maxlen(u))$，且 $size[u] > 1$。

### 例题 2：[POJ 1743] Musical Theme (SA + 二分答案 + Height)

> **核心思路**：二分重复子串长度 $L$，将 Height 数组分块，若某块内 $\max(SA) - \min(SA) \ge L$，则存在不重叠的重复子串。

---

## 🎯 练习题清单

1. **[Luogu P3975] 弦论**：SAM 求第 $k$ 小子串（不同子串/所有子串两种模式）。
2. **[BZOJ 3238] 差异**：利用 Height 数组或 Parent Tree 统计所有子串 $LCP$ 之和。
3. **[CF 235C] Cyclical Quest**：SAM 处理循环同构匹配，需记录匹配长度。
4. **[Luogu P4070] 不同子串个数**：利用 SAM 动态增量统计。
