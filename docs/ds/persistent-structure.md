---
title: 可持久化数据结构 (Persistent Structures)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import BilibiliEmbed from '@site/src/components/BilibiliEmbed';
import { History, Layers, Save, GitCommit, Database } from 'lucide-react';

# 可持久化数据结构 (Persistent Structures)

<KnowledgeCard type="info" title="核心定义">
可持久化数据结构支持在修改后保留历史版本，并允许查询甚至修改任意历史版本。其核心技术在于**共用节点 (Node Sharing)**，通过仅新建发生变化的路径节点来节省空间。
</KnowledgeCard>

---

## 1. 核心原理：路径复制 (Path Copying)

当对一个数据结构进行修改时，我们不直接修改原有节点，而是：
1. **复制**受影响路径上的所有节点。
2. 在新节点上应用修改。
3. 将未受影响的子树链接回新节点。

### 1.1 复杂度分析与证明
**定理**：对于一棵高度为 $H$ 的树，单次修改操作的时间与空间复杂度均为 $O(H)$。
**证明**：
修改操作仅涉及从根到某个叶子的单一路径。在线性结构或平衡树中，$H = O(\log N)$。因此，单次操作仅需新建 $O(\log N)$ 个节点。经过 $M$ 次修改后，总节点数为 $O(N + M \log N)$，空间开销在可接受范围内。

---

## 2. 可持久化线段树 (HJT Tree / 主席树)

主要用于解决**区间第 $k$ 小**或**历史版本信息查询**。其本质是线段树的前缀和形式。

### 2.1 空间压缩策略
- **共用子树**：新版本的节点只更新变动的一侧，另一侧指针直接指向旧版本的子节点。
- **离散化**：当值域过大时，必须先进行离散化，以控制线段树的叶子节点数量。

```cpp
int update(int p, int l, int r, int x) {
    int u = ++idx;
    tr[u] = tr[p]; // 路径复制：先承接旧节点信息
    tr[u].sum++;   // 应用修改
    if (l == r) return u;
    int mid = (l + r) >> 1;
    // 递归复制变动的分支，未变动的分支通过 tr[u]=tr[p] 已完成共享
    if (x <= mid) tr[u].l = update(tr[p].l, l, mid, x);
    else tr[u].r = update(tr[p].r, mid + 1, r, x);
    return u;
}
```

---

## 3. 可持久化平衡树 (Persistent FHQ-Treap)

由于 FHQ-Treap 不依赖旋转，它是最容易实现可持久化的平衡树。

### 3.1 核心逻辑：Lazy-Copy
在 `split` 和 `merge` 操作中，只要涉及到修改子节点的指针，就必须先复制当前节点。
**注意**：若涉及区间翻转等懒标记，下传标记时也必须新建节点。

```cpp
int copy_node(int u) {
    if (!u) return 0;
    tr[++idx] = tr[u];
    return idx;
}
```

---

## 4. 教材化例题与解析

### 例题 1：静态区间第 $k$ 小
<details>
<summary>Check Solution</summary>

**题目描述**：给定序列，多次询问区间 $[L, R]$ 内第 $k$ 小的数。
**解析**：对序列的每个前缀建立一棵线段树。第 $i$ 棵线段树维护前 $i$ 个数出现次数。
询问区间 $[L, R]$ 等价于使用第 $R$ 棵树减去第 $L-1$ 棵树的结果进行树上二分。

```cpp
int query(int u, int v, int l, int r, int k) {
    if (l == r) return l;
    int mid = (l + r) >> 1;
    int cnt = tr[tr[v].l].sum - tr[tr[u].l].sum;
    if (k <= cnt) return query(tr[u].l, tr[v].l, l, mid, k);
    else return query(tr[u].r, tr[v].r, mid + 1, r, k - cnt);
}
```
</details>

### 例题 2：可持久化并查集
<details>
<summary>Check Solution</summary>

**题目描述**：支持在某个历史版本上合并、查询连通性、回到某个历史版本。
**解析**：使用可持久化数组维护 `fa` 数组和 `rank` 数组（按秩合并）。由于不能进行路径压缩（会导致大量节点新建），必须使用按秩合并确保树高为 $O(\log N)$。
</details>

---

## 5. 综合练习

1. **[基础]** 实现可持久化 Trie 树，支持查询某个前缀在历史版本中的出现次数。
2. **[进阶]** **树上第 $k$ 小**：将主席树的前缀和思想扩展到树的路径上（利用 $T_u + T_v - T_{lca} - T_{fa\_lca}$）。
3. **[挑战]** **可持久化左偏树**：实现可持久化的可合并堆。

---

## 📺 扩展学习

<div className="bilibili-embed-inner">
  <BilibiliEmbed bvid="BV1pE41197be" />
</div>
