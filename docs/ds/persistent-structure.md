---
title: 可持久化数据结构 (Persistent Structures)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { History, Save, Layers, Share2, GitBranch } from 'lucide-react';

# 可持久化数据结构: 时间与空间的博弈

<KnowledgeCard type="info" title="核心逻辑：函数式更新与路径复制">
可持久化数据结构允许访问任何**历史版本**，并支持基于特定历史版本进行修改。
- **Copy-on-Write (写时复制)**: 仅复制受修改影响的节点路径。
- **共享结构 (Structural Sharing)**: 不同版本间共享未受影响的子树，确保空间复杂度由 $O(N \cdot M)$ 降低至 $O(M \log N)$。
</KnowledgeCard>

---

## 1. 可持久化线段树 (主席树)

这是可持久化数据结构的典型应用，最初由黄嘉泰（HJT）引入，用于解决区间第 $k$ 小值问题。

### 1.1 动态开点与路径复制
每次更新都在当前版本基础上新建 $\log N$ 个节点。
```cpp
int update(int p, int l, int r, int x) {
    int q = ++idx;
    tr[q] = tr[p]; // 路径复制
    tr[q].cnt++;
    if (l == r) return q;
    int mid = (l + r) >> 1;
    if (x <= mid) tr[q].l = update(tr[p].l, l, mid, x);
    else tr[q].r = update(tr[p].r, mid + 1, r, x);
    return q;
}
```

### 1.2 差分性质与区间查询
通过对序列的前缀分别建立主席树，利用**可加性**：
`Query(L, R, k) = Query(Root[R]) - Query(Root[L-1])`。
以此在 $O(\log N)$ 时间内提取任意区间的权值分布信息。

---

## 2. 可持久化并查集 (Persistent DSU)

由于并查集包含路径压缩（会导致大量节点修改），传统的 DSU 难以直接持久化。

### 2.1 按秩合并 (Union by Rank)
- **方案**: 放弃路径压缩，仅保留按秩合并。确保树高始终为 $O(\log N)$。
- **实现**: 用一棵可持久化数组（由主席树实现）来维护 `parent` 数组和 `rank` 数组。
- **复杂度**: 单词操作 $O(\log^2 N)$。

---

## 3. 教材化例题与解析

### 例题 1：静态区间第 k 小
<details>
<summary>Check Solution</summary>

**题目描述**：给定序列，多次询问区间 $[L, R]$ 内第 $k$ 小的数。
**解析**：离散化后建立主席树。在 [Root[L-1], Root[R]] 两棵树上同步向下搜索。

```cpp
int query(int u, int v, int l, int r, int k) {
    if (l == r) return l;
    int mid = (l + r) >> 1;
    int cnt = tr[tr[v].l].cnt - tr[tr[u].l].cnt;
    if (k <= cnt) return query(tr[u].l, tr[v].l, l, mid, k);
    else return query(tr[u].r, tr[v].r, mid + 1, r, k - cnt);
}
```
</details>

### 例题 2：可持久化数组
<details>
<summary>Check Solution</summary>

**题目描述**：支持在指定版本修改数组、在指定版本查询数组。
**解析**：直接使用可持久化线段树维护叶子节点。

```cpp
// 核心逻辑
// 1. 修改：复制路径，建立新根 root[v]
// 2. 查询：直接从 root[v] 出发向下搜索到叶子
```
</details>

---

## 4. 综合练习

1. **[树上主席树]** 维护树上路径的权值信息，查询路径第 $k$ 小（提示：利用树上差分）。
2. **[动态主席树]** 实现支持单点修改、区间第 $k$ 小（提示：主席树套树状数组）。
3. **[进阶]** **可持久化 Trie**：解决区间最大异或对问题。

---

_编者注：可持久化数据结构是“时间戳”的艺术。它不仅保留了数据的历史，更为我们提供了从高维时空审视问题的全新视角。_
