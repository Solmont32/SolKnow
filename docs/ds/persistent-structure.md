---
title: 可持久化数据结构 (Persistent Structures)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { History, Save, Layers, Share2, GitBranch, Clock, Database } from 'lucide-react';

# 可持久化数据结构: 时间与空间的博弈

<KnowledgeCard type="info" title="核心逻辑：函数式更新与路径复制">
可持久化数据结构（Persistent Data Structures）允许访问历史版本并支持分支化修改。
- **Partial Persistence**: 允许查询历史，仅允许修改最新版本。
- **Full Persistence**: 允许在任何版本上进行修改。
- **核心机制**: **写时复制 (Copy-on-Write)** 与 **结构共享 (Structural Sharing)**。
</KnowledgeCard>

---

## 1. 系统化抽象数据类型 (ADT) 推导

### 1.1 路径复制 (Path Copying) 的代数本质

对于树形结构，修改一个节点 $u$ 会影响其所有祖先的拓扑关系。
为了保证历史版本 $v$ 的不可变性，路径复制算法规定：
$\forall p \in \text{path}(root, u)$，创建 $p$ 的副本 $p'$，使得新版本的 $root'$ 能够索引到修改后的 $u'$，同时共享未被修改的侧向子树。

### 1.2 可持久化数组的退化

可持久化数组通常通过可持久化线段树实现。单次修改代价为 $O(\log N)$ 空间。
**Fat Node 方案**: 在每个节点记录 `(version, value)` 列表。查询复杂度提升至 $O(\log V)$，但空间常数显著降低。

---

## 2. 复杂度分析与数据完整性证明

### 2.1 时空复杂度证明

**定理**：对于高度为 $H$ 的树，路径复制单次修改的时间与空间复杂度均为 $O(H)$。
**证明**：每次修改仅创建从根到叶子的单一路径节点。在线段树中，$H = \log N$，故空间增长量为 $O(\log N)$。
**分摊空间优化**: 在 Full Persistence 中，若修改操作遵循特定的拓扑序，可以利用**原子化操作记录**（类似 AOF 日志）配合定期快照，实现 $O(1)$ 均摊空间开销。

### 2.2 数据完整性 (不可变性) 证明

**命题**：结构共享不会导致旧版本的意外修改。
**证明**：在函数式实现中，所有更新操作均返回新创建的节点引用。任何对节点的写操作仅作用于新分配的内存空间。由于旧版本的根节点及其路径引用链未发生任何改变，其指向的数据拓扑保持恒定（Referential Transparency）。

---

## 3. 教材化例题与解析

### 例题 1：静态区间第 k 小 (主席树)

<details>
<summary>Check Solution (C++ 实现)</summary>

```cpp
int update(int p, int l, int r, int x) {
    int q = ++idx;
    tr[q] = tr[p]; tr[q].cnt++;
    if (l == r) return q;
    int mid = l + r >> 1;
    if (x <= mid) tr[q].l = update(tr[p].l, l, mid, x);
    else tr[q].r = update(tr[p].r, mid + 1, r, x);
    return q;
}

int query(int u, int v, int l, int r, int k) {
    if (l == r) return l;
    int mid = l + r >> 1;
    int cnt = tr[tr[v].l].cnt - tr[tr[u].l].cnt;
    if (k <= cnt) return query(tr[u].l, tr[v].l, l, mid, k);
    else return query(tr[u].r, tr[v].r, mid + 1, r, k - cnt);
}
```

</details>

### 例题 2：可持久化并查集 (按秩合并)

<details>
<summary>Check Solution</summary>

**解析**：不能使用路径压缩（会破坏历史版本），必须使用**按秩合并**保证树高 $O(\log N)$。

```cpp
void merge(int &v_old, int &v_new, int a, int b) {
    int ra = find(v_old, a), rb = find(v_old, b);
    if (ra == rb) { v_new = v_old; return; }
    if (tr[ra].dep > tr[rb].dep) swap(ra, rb);
    // 将 ra 接到 rb 下，更新 v_new 的主席树
    v_new = update_fa(v_old, ra, rb);
    if (tr[ra].dep == tr[rb].dep) v_new = update_dep(v_new, rb);
}
```

</details>

---

## 4. 综合练习与解答

1. **[树上主席树]** 查询路径 $(u, v)$ 的第 $k$ 小值。
<details>
<summary>Check Solution</summary>

**核心逻辑**：树上差分。对应的主席树为 $T_u + T_v - T_{lca} - T_{fa[lca]}$。

</details>

2. **[动态主席树]** 支持单点修改与区间排名。
<details>
<summary>Check Solution</summary>

**核心逻辑**：树状数组套主席树。外层 BIT 维护位置，内层线段树维护权值。

```cpp
void add(int x, int v) {
    for (int i = x; i <= n; i += lowbit(i))
        update(roots[i], 1, M, v, 1);
}
```

</details>

3. **[进阶] 历史记录索引**：实现一个高性能的文件版本控制系统元数据存储。
<details>
<summary>Check Solution</summary>

**核心思想**：利用 Full Persistence Treap 存储文件路径树。每次 Commit 对应一次全局根节点的持久化更新。

</details>

---

_编者注：可持久化结构的精髓在于对“副作用”的严格管控。它不仅是算法竞赛的利器，更是现代数据库（如 MVCC 机制）与函数式编程的核心数学基础。_
