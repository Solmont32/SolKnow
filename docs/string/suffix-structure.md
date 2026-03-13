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

后缀结构是字符串算法的巅峰。本章深入讨论**后缀自动机 (SAM)** 与 **后缀数组 (SA)**，它们能在 $O(N)$ 时间内提取字符串的全局子串拓扑与序信息。

---

## 1. 后缀自动机 (Suffix Automaton, SAM)

SAM 是接受给定字符串 $S$ 的所有后缀的最小 DFA。

### 1.1 核心理论：Endpos 等价类

对于子串 $s$，定义 $Endpos(s)$ 为 $s$ 在原串 $S$ 中所有出现位置的**结束下标**集合。

**定理 (Endpos 性质证明)**：
1. **等价类性质**：两个子串 $u, v$（设 $|u| \le |v|$）满足 $Endpos(u) = Endpos(v)$，当且仅当 $u$ 仅在 $S$ 中以 $v$ 的后缀形式出现。
2. **包含关系**：对于任意子串 $u, v$，其 $Endpos$ 集合要么不相交，要么一个是另一个的子集。
3. **Parent Tree**：通过将 $Endpos(u) \subset Endpos(v)$ 且 $v$ 是 $u$ 的最长后缀的关系建模，形成了 Parent Tree。

### 1.2 状态转移一致性

在 SAM 中，从 $root$ 出发走过路径 $s$ 到达状态 $u$：
- **状态一致性**：状态 $u$ 唯一代表了 $Endpos$ 相同的所有子串集合。
- **转移一致性**：若从 $u$ 输入字符 $c$ 有转移到 $v$，则对于 $u$ 代表的所有子串 $w$，$w+c$ 的 $Endpos$ 集合均归属于状态 $v$。

### 1.3 状态分裂 (Split) 的数学必要性

在增量构建时，若 $maxlen(q) > maxlen(p) + 1$，说明 $q$ 节点所代表的子串中，有一部分（长度较短的）不再是当前后缀的等价类。
- **分裂逻辑**：创建一个 $clone$ 节点，承接原 $q$ 的转移，但 $maxlen$ 为 $maxlen(p) + 1$。
- **正确性保证**：分裂后，原后缀的 $Endpos$ 指向 $clone$，而较长串的 $Endpos$ 保持不变（或通过新节点更新），维持了 DFA 的最小性。

---

## 2. 后缀数组 (Suffix Array, SA)

### 2.1 Height 数组与 LCP 引理

- **SA[i]**：排名为 $i$ 的后缀的起始位置。
- **Height[i]**：$LCP(SA[i], SA[i-1])$。

**定理 (LCP 引理)**：对于 $i < j$，有 $LCP(SA[i], SA[j]) = \min_{k=i+1}^j Height[k]$。
这使得子串匹配转化为区间最小值 (RMQ) 问题。

---

## 3. 工业级算法实现

<CodeCollapse title="SAM 增量构建实现 (C++)" language="cpp">

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

## 4. 经典建模应用

### 例题：[Luogu P3804] 子串统计 (SAM + Parent Tree DP)

> **题目**：求出现次数 $>1$ 的所有子串中，（出现次数 $\times$ 长度）的最大值。
> **解法**：
> 1. 构建 SAM，每个非 clone 节点的 $size = 1$。
> 2. 依 $maxlen$ 逆序遍历节点（或在 Parent Tree 上 DFS），累加 $size$：$size[st[u].link] += size[u]$。
> 3. 答案为 $\max(size[u] \times st[u].len)$。

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
int sz, last, siz[MAXN * 2];
int c[MAXN * 2], a[MAXN * 2];

void extend(int c) {
    int cur = sz++, p = last;
    st[cur].len = st[last].len + 1;
    siz[cur] = 1;
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
    
    // 计数排序辅助拓扑遍历
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

---

## 🎯 练习题清单

1. **[Luogu P3975] 弦论**：SAM 求第 $k$ 小子串。
2. **[BZOJ 3238] 差异**：利用 Height 数组或 Parent Tree 统计 LCP 之和。
3. **[CF 235C] Cyclical Quest**：SAM 处理循环同构匹配。
4. **[Luogu P4070] 不同子串个数**：增量统计。
