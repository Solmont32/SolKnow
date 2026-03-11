---
title: 后缀结构
---

import { Layers, GitBranch, Cpu, Search, Share2, Box, Zap, Info } from 'lucide-react';
import CodeCollapse from '@site/src/components/CodeCollapse';

# 后缀结构：后缀自动机与后缀数组

后缀结构是字符串算法的巅峰。本章深入讨论**后缀自动机 (SAM)** 与 **后缀数组 (SA)**，它们能在 $O(N)$ 时间内提取字符串的全局子串拓扑。

## 1. 后缀自动机 (Suffix Automaton, SAM)

SAM 是接受字符串 $S$ 的所有后缀的最小确定有限状态自动机 (DFA)。

### 1.1 核心理论：Endpos 等价类
- **Endpos(s)**：子串 $s$ 在 $S$ 中出现的所有右端点位置集合。
- **等价类性质**：
  1. $S$ 的两个子串 $u, v$ ($|u| \le |v|$) 满足 $Endpos(u) = Endpos(v)$ 的充要条件是 $u$ 在 $S$ 中每次出现都是以 $v$ 的后缀形式出现。
  2. 若 $Endpos(u) \cap Endpos(v) \neq \emptyset$，则其中一个必是另一个的后缀，且 $Endpos$ 集合呈包含关系。
- **状态数与边数证明**：
  - **状态数**：SAM 的状态数不超过 $2n-1$（由 $Endpos$ 集合构成的树形结构决定）。
  - **边数**：SAM 的转移边数不超过 $3n-4$。

### 1.2 Parent Tree (后缀链接树)
$link(u)$ 指向 $u$ 所在的等价类中，最短子串去掉第一个字符后所在的状态。
- $link$ 指针构成一棵以 $root$ 为根的树。
- **意义**：在 Parent Tree 上，$u$ 到根的路径代表了 $u$ 所包含子串的所有后缀，且长度由 $maxlen(u)$ 递减至 0。

<CodeCollapse title="SAM 线性构建 (C++)" language="cpp">

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
                st[clone] = st[q]; st[clone].len = st[p].len + 1;
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

### 2.1 Height 数组与线性构造 (Kasai 算法)
$Height[i] = LCP(SA[i], SA[i-1])$。

**关键引理**：$Height[Rank[i]] \ge Height[Rank[i-1]] - 1$。
- **证明**：设起始位置为 $i-1$ 的后缀排名为 $r$，其前一名后缀起始位置为 $j$。则 $LCP(i-1, j) = Height[r]$。去掉首字母后，后缀 $i$ 与后缀 $j+1$ 的 LCP 至少为 $Height[r]-1$。故 $Height[Rank[i]] \ge Height[r]-1$。
- **复杂度**：利用该单调性，暴力匹配的总位移不超过 $2n$，复杂度 $O(n)$。

```cpp
void get_height() {
    for (int i = 1, k = 0; i <= n; i++) {
        if (rk[i] == 1) continue;
        if (k) k--;
        int j = sa[rk[i] - 1];
        while (i + k <= n && j + k <= n && s[i + k] == s[j + k]) k++;
        height[rk[i]] = k;
    }
}
```

## 3. SAM vs SA：选型指南

| 特性 | 后缀自动机 (SAM) | 后缀数组 (SA) |
| :--- | :--- | :--- |
| **构建复杂度** | $O(N \cdot |\Sigma|)$ 线性 | $O(N \log N)$ 或 $O(N)$ |
| **空间开销** | 较大 (约 2-3 倍 SA) | 较小 |
| **子串匹配** | 在线，自动机状态转移 | 二分或结合 Height |
| **主要应用** | 动态维护、子串计数、LCS | 字典序相关、RMQ 配合查询 |

---

## 🎯 练习题清单
1. [Luogu P3804] SAM 模板。
2. [Luogu P3809] SA 模板。
3. [CF 235C] Cyclical Quest：SAM 处理循环同构。
4. [BZOJ 3238] 差异：SA + 单调栈。
5. [Luogu P4248] 差异：SAM + Parent Tree DP。
