---
title: 后缀结构
---

import { Layers, GitBranch, Cpu, Search, Share2, Box } from 'lucide-react';

# 后缀结构：后缀自动机与后缀数组

后缀结构是字符串算法中最深刻的部分，能够以线性或线性对数复杂度处理几乎所有涉及“子串”的问题。本章重点涵盖**后缀自动机 (SAM)** 与 **后缀数组 (SA)**。

## 1. 后缀自动机 (Suffix Automaton, SAM)

SAM 是一个能够接受字符串所有后缀的最小**确定有限状态自动机 (DFA)**。

### 1.1 核心理论：Endpos 等价类
- **Endpos(s)**：子串 $s$ 在母串 $S$ 中出现的所有右端点集合。
- **等价类**：若两个子串 $u, v$ 的 $Endpos$ 集合相同，则它们属于同一个状态。
- **性质**：在一个等价类中，所有子串的长度是连续的，记为 $[minlen(state), maxlen(state)]$。且 $minlen(state) = maxlen(link(state)) + 1$。

### 1.2 空间复杂度定理
对于长度为 $n$ 的字符串：
1. **节点数**：SAM 的状态数不超过 $2n-1$（对于 $n \ge 3$）。
2. **转移数**：SAM 的转移边数不超过 $3n-4$（对于 $n \ge 3$）。

### 1.3 Parent Tree (后缀链接树)
由 $link(state)$ 构成的树称为 Parent Tree。
- **拓扑性质**：Parent Tree 上的祖先节点所代表的 $Endpos$ 集合包含子节点的 $Endpos$ 集合。
- **LCP 关联**：两个后缀的最长公共后缀对应于它们在 Parent Tree 上的最近公共祖先 (LCA)。

### 1.4 线性构建算法
```cpp
struct Node {
    int len, link, next[26];
} st[MAXN * 2];
int sz, last;

void sam_init() {
    st[0].len = 0; st[0].link = -1;
    sz = 1; last = 0;
}

void sam_extend(int c) {
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
```

## 2. 后缀数组 (Suffix Array, SA)

后缀数组是通过对所有后缀按字典序排序得到的索引数组。

### 2.1 核心数组定义
- $SA[i]$：排名第 $i$ 的后缀的起始位置。
- $Rank[i]$：起始位置为 $i$ 的后缀的排名。
- $Height[i]$：$SA[i]$ 与 $SA[i-1]$ 的最长公共前缀 (LCP) 长度。

### 2.2 核心性质：LCP Lemma
$$LCP(SA[i], SA[j]) = \min_{k=i+1}^j Height[k] \quad (i < j)$$
这一性质允许我们利用 ST 表在 $O(1)$ 时间内查询任意两个后缀的 LCP。

### 2.3 倍增法构建 (O(N log N))
<details>
<summary><Box size={18} className="inline-block mr-1" /> 查看倍增法 + 基数排序实现</summary>

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
</details>

## 3. 经典应用与例题

### 例题 1：不同子串个数统计
> 给定字符串 $S$，求其中本质不同的子串总数。

<details>
<summary><Share2 size={18} className="inline-block mr-1" /> 查看两种结构的计算方案</summary>

**SAM 方案**：
每个状态代表的子串长度区间为 $[minlen(i), maxlen(i)]$，其个数为 $maxlen(i) - minlen(i) + 1$。
由于 $minlen(i) = maxlen(link(i)) + 1$，总数为：
$$ \sum_{i \in States, i \neq 0} (maxlen(i) - maxlen(link(i))) $$

**SA 方案**：
所有子串总数为 $n(n+1)/2$。减去重复的（即每个后缀与前一排名的 LCP）：
$$ \frac{n(n+1)}{2} - \sum_{i=2}^n Height[i] $$
</details>

### 例题 2：多个字符串的最长公共子串 (LCS)
> 给定 $K$ 个字符串，求它们的最长公共子串长度。

<details>
<summary><Search size={18} className="inline-block mr-1" /> 查看基于 SAM 的扫描实现</summary>

**思路**：
1. 对第一个字符串构建 SAM。
2. 依次用其他字符串在 SAM 上进行“匹配”。记录 SAM 的每个状态在匹配过程中达到的最大匹配长度。
3. 最后取所有字符串匹配长度在该状态下的最小值，再取所有状态的最大值。

```cpp
// 对于每个串 s_i，维护每个状态 p 匹配到的最大长度 cur_max[p]
int p = 0, l = 0;
for (char c : s) {
    int v = c - 'a';
    while (p && !st[p].next[v]) {
        p = st[p].link;
        l = st[p].len;
    }
    if (st[p].next[v]) {
        p = st[p].next[v];
        l++;
    }
    cur_max[p] = max(cur_max[p], l);
}
// 传播：子节点能匹配到 L，其父节点（后缀）也能匹配到 min(L, parent.len)
for (int i = sz - 1; i > 0; i--) 
    cur_max[st[i].link] = max(cur_max[st[i].link], min(st[st[i].link].len, cur_max[i]));
```
</details>

## 3. 后缀结构的应用对比

| 功能 | SAM 优势 | SA 优势 |
| :--- | :--- | :--- |
| **构建复杂度** | $O(N \cdot |\Sigma|)$ | $O(N \log N)$ 或 $O(N)$ |
| **不同子串数** | 直接求和 $maxlen - minlen$ | $n(n+1)/2 - \sum Height$ |
| **模式匹配** | 在 DAG 上直接跑转移，非常直观 | 需要二分 + LCP |
| **字典序第 K 小** | DAG 上 DP | 在 SA 上直接线性扫描 |

## 4. 进阶例题

### 例题 1：广义后缀自动机 (G-SAM)
> 插入 $K$ 个字符串，求所有串中出现次数 $\ge X$ 的子串种类。

<details>
<summary><Share2 size={18} className="inline-block mr-1" /> 查看 G-SAM 离线构建方案</summary>

**关键点**：在插入新串前将 `last` 重置为 `root`。统计次数时，需要记录每个状态被多少个不同的字符串访问过（位集优化或颜色标记）。

```cpp
void insert_str(string s, int id) {
    last = 0;
    for (char c : s) sam_extend(c - 'a', id);
}
```
</details>

### 例题 2：后缀数组 + ST 表
> 查询子串 $S[a \dots b]$ 与 $S[c \dots d]$ 的 LCP。

<details>
<summary><Search size={18} className="inline-block mr-1" /> 查看查询策略</summary>

**理论**：$LCP(suffix(i), suffix(j)) = \min_{k=Rank[i]+1}^{Rank[j]} Height[k]$（假设 $Rank[i] < Rank[j]$）。
使用 ST 表维护 $Height$ 的区间最小值，即可 $O(1)$ 查询。

```cpp
int query_lcp(int i, int j) {
    int l = rk[i], r = rk[j];
    if (l > r) swap(l, r);
    l++;
    int k = __lg(r - l + 1);
    return min(st[l][k], st[r - (1 << k) + 1][k]);
}
```
</details>

## 5. 练习
1. [Luogu P3804] 后缀自动机模板。
2. [Luogu P3809] 后缀数组模板。
3. [SPOJ] SUBST1 - New Distinct Substrings.
4. [Luogu P2178] 樱花树下的约会 - SA + 并查集/单调栈。
