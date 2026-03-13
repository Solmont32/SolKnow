---
title: 后缀结构
---

import { Layers, GitBranch, Cpu, Search, Share2, Box, Zap, Info } from 'lucide-react';
import CodeCollapse from '@site/src/components/CodeCollapse';

# 后缀结构：后缀自动机与后缀数组

后缀结构是字符串算法的巅峰。本章深入讨论**后缀自动机 (SAM)** 与 **后缀数组 (SA)**，它们能在 $O(N)$ 时间内提取字符串的全局子串拓扑与序信息。

## 1. 后缀自动机 (Suffix Automaton, SAM)

SAM 是接受给定字符串 $S$ 的所有后缀的最小确定有限状态自动机 (DFA)。

### 1.1 核心理论：Endpos 等价类

- **Endpos(s)**：子串 $s$ 在 $S$ 中出现的所有右端点位置集合。
- **定理 (等价类性质)**：
  1. 两个子串 $u, v$（设 $|u| \le |v|$）的 $Endpos$ 集合相等，当且仅当 $u$ 在 $S$ 中每次出现都是以 $v$ 的后缀形式出现。
  2. 对于任意两个子串 $u, v$，其 $Endpos$ 集合要么是包含关系，要么互不相交。
- **状态数证明**：SAM 的状态数不超过 $2n-1$。这是因为 $Endpos$ 的包含关系构成一棵树（Parent Tree），其叶子节点对应原串的 $n$ 个前缀，总节点数显然 $\le 2n-1$。

### 1.2 状态转移与 extend(c) 逻辑证明

**extend(c)** 是 SAM 的核心构建算法。设当前已构建 $S$ 的 SAM，新增字符 $c$：
1. 创建新状态 $cur$，$maxlen(cur) = maxlen(last) + 1$。
2. 沿 $last$ 的 $link$ 路径向上，若状态 $p$ 无字符 $c$ 的转移，则令 $next(p, c) = cur$。
3. 若到达 $root$ 仍无 $c$ 转移，则 $link(cur) = root$。
4. 若中途遇到状态 $p$ 已有 $next(p, c) = q$：
   - 若 $maxlen(q) = maxlen(p) + 1$，直接令 $link(cur) = q$。
   - 否则，必须**分裂** $q$。创建 $clone$，继承 $q$ 的所有信息但令 $maxlen(clone) = maxlen(p) + 1$。然后将 $q$ 和 $cur$ 的 $link$ 都指向 $clone$，并更新路径上的转移。

**证明 (分裂的必要性)**：若 $maxlen(q) > maxlen(p) + 1$，说明 $q$ 包含的子串中，有些是新串的后缀，有些则不是（因为它们的前驱不是 $p$）。为了维持 $Endpos$ 的一致性，必须将这两类子串剥离。

<CodeCollapse title="SAM 工业级模板 (C++)" language="cpp">

```cpp
struct SAM {
    struct Node { int len, link, next[26]; } st[MAXN * 2];
    int sz, last;
    SAM() { st[0].len = 0; st[0].link = -1; sz = 1; last = 0; }
    void extend(int c) {
        int cur = sz++, p = last;
        st[cur].len = st[last].len + 1;
        while (p != -1 && !st[p].next[c]) { st[p].next[c] = cur; p = st[p].link; }
        if (p == -1) st[cur].link = 0;
        else {
            int q = st[p].next[c];
            if (st[p].len + 1 == st[q].len) st[cur].link = q;
            else {
                int clone = sz++;
                st[clone].len = st[p].len + 1;
                st[clone].link = st[q].link;
                memcpy(st[clone].next, st[q].next, sizeof(st[q].next));
                while (p != -1 && st[p].next[c] == q) { st[p].next[c] = clone; p = st[p].link; }
                st[q].link = st[cur].link = clone;
            }
        }
        last = cur;
    }
};
```

</CodeCollapse>

## 2. 后缀数组 (Suffix Array, SA)

SA 是将字符串 $S$ 的所有后缀按字典序排序后得到的数组。

### 2.1 Height 数组与 LCP 引理

- **SA[i]**：排名为 $i$ 的后缀起始位置。
- **Rank[i]**：起始位置为 $i$ 的后缀的排名。
- **Height[i]**：$LCP(SA[i], SA[i-1])$。

**定理 (Kasai 算法引理)**：$Height[Rank[i]] \ge Height[Rank[i-1]] - 1$。

**证明**：
设起始位置为 $i-1$ 的后缀排名为 $r$，其前一名后缀起始位置为 $j$。由定义 $LCP(i-1, j) = Height[r]$。
考虑后缀 $i$ 和 $j+1$。它们分别是 $i-1$ 和 $j$ 去掉首字母得到的。
因此 $LCP(i, j+1) = LCP(i-1, j) - 1 = Height[r] - 1$。
在字典序中，后缀 $j+1$ 必然排在后缀 $i$ 之前（或就是 $i$ 的前一名）。根据 LCP 的单调性，排名在 $j+1$ 和 $i$ 之间的后缀与 $i$ 的 LCP 至少也是 $Height[r]-1$。
故 $Height[Rank[i]] \ge Height[Rank[i-1]] - 1$。

### 2.2 复杂度分析

- **倍增法构建**：$O(N \log N)$。
- **Height 计算**：利用上述引理，指针 $k$ 最多增加 $n$ 次，总复杂度 $O(N)$。

---

## 🎯 经典例题与练习

### 例题 1：[Luogu P3804] SAM 模板题

> 求字符串中出现次数大于 1 的子串中，出现次数乘以长度的最大值。

<details>
<summary>Check Solution</summary>

**思路**：
1. 构建 SAM。
2. 在 Parent Tree 上进行 Size 统计。初始每个非 clone 节点的 $size = 1$。
3. 按长度从大到小（或拓扑序逆序）累加：$size[link[u]] += size[u]$。
4. 遍历所有节点，计算 $maxlen(u) \cdot size[u]$ 的最大值。

</details>

### 例题 2：[Luogu P4070] 不同子串个数

> 动态向字符串末尾添加字符，每次添加后求当前字符串中不同子串的总数。

<details>
<summary>Check Analysis</summary>

**思路**：
1. 每次 `extend(c)` 后，新增的子串个数为 $maxlen(cur) - maxlen(link[cur])$。
2. 累加该增量即可。SAM 天生支持动态维护。

</details>

### 例题 3：[Luogu P3809] SA 模板题

> 给定字符串，输出其后缀数组 SA。

<details>
<summary>Check Solution</summary>

使用基数排序优化的倍增算法，注意 $m$（字符集大小）的动态更新。

</details>

---

## 🎯 练习题清单

1. [Luogu P3975] 弦论：SAM 求第 $k$ 小子串。
2. [POJ 1743] Musical Theme：SA + 二分判定。
3. [CF 235C] Cyclical Quest：SAM 处理循环同构匹配。
4. [BZOJ 3238] 差异：SA + 单调栈 或 SAM + Parent Tree DP。
