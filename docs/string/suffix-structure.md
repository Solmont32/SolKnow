---
title: 后缀结构
---

import { Layers, GitBranch, Cpu, Search, Share2, Box, Zap } from 'lucide-react';
import CodeCollapse from '@site/src/components/CodeCollapse';

# 后缀结构：后缀自动机与后缀数组

后缀结构是处理子串问题的核心工具，能够在 $O(N)$ 或 $O(N \log N)$ 时间内提取字符串的全局拓扑信息。本章重点讨论**后缀自动机 (SAM)** 与 **后缀数组 (SA)**。

## 1. 后缀自动机 (Suffix Automaton, SAM)

SAM 是接受字符串 $S$ 的所有后缀的**最小确定有限状态自动机 (DFA)**。

### 1.1 核心理论：Endpos 等价类
- **Endpos(s)**：子串 $s$ 在 $S$ 中出现的所有右端点位置集合。
- **等价类定理**：若两个子串 $u, v$（$|u| \le |v|$）满足 $Endpos(u) = Endpos(v)$，则 $u$ 是 $v$ 的后缀。
- **状态性质**：每个状态代表一个等价类，其中包含的子串长度为连续区间 $[minlen, maxlen]$。

### 1.2 Parent Tree (后缀链接树)
$link(u)$ 指向 $u$ 所在的等价类中，最短子串去掉第一个字符后所在的状态。
- $minlen(u) = maxlen(link(u)) + 1$。
- $link$ 指针构成一棵以 $root$ 为根的树，称为 Parent Tree。
- **意义**：Parent Tree 上的祖先代表了子孙节点对应子串的更短后缀。

<CodeCollapse title="SAM 线性构建 (Blumer 算法)" language="cpp">

```cpp
struct SAM {
    struct Node {
        int len, link, next[26];
    } st[MAXN * 2];
    int sz, last;

    SAM() {
        st[0].len = 0; st[0].link = -1;
        sz = 1; last = 0;
    }

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

## 2. 后缀数组 (Suffix Array, SA)

后缀数组是字符串所有后缀按字典序排序后的索引数组。

### 2.1 核心定义
- $SA[i]$：字典序排名第 $i$ 的后缀的起始位置。
- $Rank[i]$：起始位置为 $i$ 的后缀的排名。
- $Height[i]$：$SA[i]$ 与 $SA[i-1]$ 的最长公共前缀 (LCP) 长度。

### 2.2 LCP Lemma (LCP 引理)
对于 $i < j$：
$$ LCP(SA[i], SA[j]) = \min_{k=i+1}^j Height[k] $$
利用 ST 表维护 $Height$ 的区间最小值 (RMQ)，可实现 $O(1)$ LCP 查询。

<CodeCollapse title="SA 倍增法 + 基数排序" language="cpp">

```cpp
void build_sa() {
    int m = 127;
    for (int i = 1; i <= n; i++) cnt[rk[i] = s[i]]++;
    for (int i = 1; i <= m; i++) cnt[i] += cnt[i - 1];
    for (int i = n; i >= 1; i--) sa[cnt[rk[i]]--] = i;
    for (int k = 1; k <= n; k <<= 1) {
        int num = 0;
        for (int i = n - k + 1; i <= n; i++) y[++num] = i;
        for (int i = 1; i <= n; i++) if (sa[i] > k) y[++num] = sa[i] - k;
        for (int i = 0; i <= m; i++) cnt[i] = 0;
        for (int i = 1; i <= n; i++) cnt[rk[i]]++;
        for (int i = 1; i <= m; i++) cnt[i] += cnt[i - 1];
        for (int i = n; i >= 1; i--) sa[cnt[rk[y[i]]]--] = y[i], y[i] = 0;
        swap(rk, y);
        rk[sa[1]] = num = 1;
        for (int i = 2; i <= n; i++)
            rk[sa[i]] = (y[sa[i]] == y[sa[i - 1]] && y[sa[i] + k] == y[sa[i - 1] + k]) ? num : ++num;
        if (num == n) break;
        m = num;
    }
}
```

</CodeCollapse>

## 3. 应用对比与实战例题

### 例题 1：本质不同子串个数
> 求字符串 $S$ 中有多少个互不相同的子串。

<details>
<summary>Check Solution</summary>

**SAM 方案**：
每个状态 $u$ 代表 $maxlen(u) - minlen(u) + 1$ 个子串。
$$ Ans = \sum_{u \neq root} (maxlen(u) - maxlen(link(u))) $$

**SA 方案**：
$$ Ans = \frac{n(n+1)}{2} - \sum_{i=2}^n Height[i] $$
</details>

### 例题 2：[SPOJ LCS] 最长公共子串
> 求两个字符串 $A$ 和 $B$ 的最长公共子串。

<details>
<summary>Check Solution</summary>

**思路**：
对 $A$ 建 SAM，用 $B$ 在上面跑匹配。若当前字符有转移，长度 +1；若无转移，跳 $link$ 直到有转移。

```cpp
int p = 0, cur_len = 0, ans = 0;
for (char c : b) {
    int v = c - 'a';
    while (p && !st[p].next[v]) {
        p = st[p].link;
        cur_len = st[p].len;
    }
    if (st[p].next[v]) {
        p = st[p].next[v];
        cur_len++;
    }
    ans = max(ans, cur_len);
}
```
</details>

---

## 🎯 练习题清单
1. [Luogu P3804] SAM 模板：Endpos 统计应用。
2. [Luogu P3809] SA 模板：基础排序与 Height 计算。
3. [CF 235C] Cyclical Quest：SAM 处理循环同构匹配。
4. [BZOJ 3238] 差异：SA + 单调栈计算所有后缀 LCP 之和。
5. [Luogu P4248] 差异：SAM 方案（Parent Tree 节点权值 DP）。
