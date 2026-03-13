---
title: 可持久化数据结构 (Persistent Structures)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { History, Save, Layers, Share2, GitBranch, Clock, Database, Milestone, ShieldCheck } from 'lucide-react';

# 可持久化数据结构: 时间与空间的博弈

<KnowledgeCard type="info" title="核心逻辑：函数式更新与路径复制">
可持久化数据结构（Persistent Data Structures）允许访问历史版本并支持分支化修改。
- **Partial Persistence**: 允许查询历史，仅允许修改最新版本。
- **Full Persistence**: 允许在任何版本上进行修改。
- **核心机制**: **写时复制 (Copy-on-Write)** 与 **结构共享 (Structural Sharing)**。
</KnowledgeCard>

---

## 1. 拓扑一致性验证 (Topological Consistency)

在可持久化结构中，拓扑一致性意味着**历史版本不可变性 (Immutability)**：
- **路径复制不变性**: 修改节点 $u$ 时产生的副本 $u'$，其子节点若未发生改变，必须指向原有的物理节点。
- **逻辑独立性**: 对版本 $V_i$ 的修改绝对不能影响版本 $V_j (j < i)$ 的任何拓扑连接或数据属性。

---

## 2. 复杂度分析与空间分配证明

### 2.1 空间分配证明 (Systematic Space Allocation)

**定理**：采用路径复制的可持久化线段树，单次更新的空间复杂度为 $O(\log N)$。
**证明**：
1. 设线段树深度为 $H = \lceil \log_2 N \rceil$。
2. 任何单点更新仅影响从根到叶的一条路径，路径长度为 $H+1$。
3. 路径复制机制会为该路径上的每个节点创建一个新副本。
4. 总增量空间 $\Delta S = (H+1) \times \text{sizeof}(Node) = O(\log N)$。
**推论**：对于 $M$ 次更新，总空间复杂度为 $O(N + M \log N)$。

### 2.2 时间复杂度均摊分析

**定理**：可持久化结构的查询时间与原始结构一致，均为 $O(\log N)$。
**证明**：
由于路径复制保持了树的拓扑深度，且每个版本都拥有一棵逻辑完整的树根，查询操作在任意版本上的执行逻辑与普通线段树完全一致，不增加任何分摊开销。

---

## 3. 教材化例题与解析

### 例题 1：可持久化字典树 (Persistent Trie)

<details>
<summary>Check Solution (C++ Implementation)</summary>

**题目背景**：给定序列，查询区间 $[L, R]$ 内与 $X$ 异或最大值。

```cpp
int insert(int p, int val) {
    int q = ++idx, cur = q;
    for (int i = 30; i >= 0; i--) {
        int v = (val >> i) & 1;
        tr[cur] = tr[p]; // 结构共享
        tr[cur].ch[v] = ++idx; // 路径复制
        tr[cur].cnt++;
        cur = tr[cur].ch[v];
        p = tr[p].ch[v];
    }
    tr[cur].cnt++;
    return q;
}
```

</details>

### 例题 2：区间 K 大值 (主席树)

<details>
<summary>Check Solution</summary>

**核心逻辑**：对值域建立线段树。按序列顺序插入，第 $i$ 个版本维护前 $i$ 个数的分布。查询 $[L, R]$ 转化为版本 $V_R$ 与 $V_{L-1}$ 的差分。

```cpp
int query(int u, int v, int l, int r, int k) {
    if (l == r) return l;
    int mid = (l + r) >> 1;
    int x = tr[tr[v].ls].cnt - tr[tr[u].ls].cnt;
    if (k <= x) return query(tr[u].ls, tr[v].ls, l, mid, k);
    else return query(tr[u].rs, tr[v].rs, mid + 1, r, k - x);
}
```

</details>

---

## 4. 综合练习与解答

1. **[树上主席树]** 查询路径 $(u, v)$ 的第 $k$ 小值。
<details>
<summary>Check Solution</summary>

**核心逻辑**：树上差分。利用 $T_u + T_v - T_{lca} - T_{fa[lca]}$ 的性质在四棵线段树上同步同步跳转。

</details>

2. **[历史版本并查集]**
<details>
<summary>Check Solution</summary>

**核心策略**：用可持久化线段树维护 `fa[]` 数组。必须使用**按秩合并**。空间复杂度 $O(M \log N)$。

</details>

3. **[进阶] 可持久化平衡树 (Persistent Treap)**
<details>
<summary>Check Solution</summary>

**注意事项**：必须在 `split` 和 `merge` 时下传 `copy_node`。
```cpp
void split(int u, int v, int &l, int &r) {
    if (!u) { l = r = 0; return; }
    u = copy_node(u); // 关键！
    if (tr[u].val <= v) {
        l = u; split(tr[u].rs, v, tr[u].rs, r);
    } else {
        r = u; split(tr[u].ls, v, l, tr[u].ls);
    }
    push_up(u);
}
```

</details>

---

_编者注：可持久化结构的精髓在于对“历史”的尊重。它不仅是算法竞赛的利器，更是现代数据库实现快照隔离与并发控制的理论基石。_
