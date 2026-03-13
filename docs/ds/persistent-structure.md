---
title: 可持久化数据结构 (Persistent Structures)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { History, Save, Layers, Share2, GitBranch, Clock, Database, Milestone } from 'lucide-react';

# 可持久化数据结构: 时间与空间的博弈

<KnowledgeCard type="info" title="核心逻辑：函数式更新与路径复制">
可持久化数据结构（Persistent Data Structures）允许访问历史版本并支持分支化修改。
- **Partial Persistence**: 允许查询历史，仅允许修改最新版本。
- **Full Persistence**: 允许在任何版本上进行修改。
- **核心机制**: **写时复制 (Copy-on-Write)** 与 **结构共享 (Structural Sharing)**。
</KnowledgeCard>

---

## 1. 实现范式深度对比

### 1.1 胖节点 (Fat Node)
在每个节点内部维护一个修改日志（版本号 -> 值的映射）。
- **优点**: 物理结构不变，不产生多余节点。
- **缺点**: 查询复杂度从 $O(1)$ 降至 $O(\log V)$，且难以实现 Full Persistence。

### 1.2 路径复制 (Path Copying)
修改节点 $u$ 时，复制从根到 $u$ 的整条路径。
- **优点**: 保持了原始查询复杂度，天然支持 Full Persistence。
- **缺点**: 空间开销与树高成正比。在线段树中为 $O(\log N)$。

---

## 2. 复杂度收敛分析与多维验证

### 2.1 时空复杂度证明

**定理**：路径复制在线段树上的单次更新空间复杂度为 $O(\log N)$。
**证明**：线段树是一棵高度为 $\lceil \log_2 N \rceil$ 的平衡树。更新一个叶子节点只会影响其所有祖先。祖先节点的数量恰好等于树的高度。由于每个受影响的节点仅被复制一次，空间增量为 $O(\log N)$。

### 2.2 多维验证：二维可持久化线段树 (2D Persistent Segment Tree)

二维可持久化通常用于处理“矩形区域内的历史/权值查询”。
- **方案**: 对 $x$ 坐标建立可持久化线段树。每个版本 $v_x$ 维护了区间 $[1, x]$ 内所有点的 $y$ 坐标信息。
- **逻辑**: 查询矩形 $[x_1, x_2] \times [y_1, y_2]$ 等价于在版本 $v_{x_2}$ 和 $v_{x_1-1}$ 之间进行前缀和减法。
- **时空**: 空间 $O(N \log M)$，查询 $O(\log M)$。

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
        tr[cur] = tr[p];
        tr[cur].ch[v] = ++idx;
        tr[cur].cnt++;
        cur = tr[cur].ch[v];
        p = tr[p].ch[v];
    }
    tr[cur].cnt++;
    return q;
}
int query(int l, int r, int val) {
    int res = 0;
    for (int i = 30; i >= 0; i--) {
        int v = (val >> i) & 1;
        if (tr[tr[r].ch[v ^ 1]].cnt - tr[tr[l].ch[v ^ 1]].cnt > 0) {
            res |= (1 << i);
            l = tr[l].ch[v ^ 1]; r = tr[r].ch[v ^ 1];
        } else {
            l = tr[l].ch[v]; r = tr[r].ch[v];
        }
    }
    return res;
}
```

</details>

### 例题 2：可持久化平衡树 (Persistent Treap)

<details>
<summary>Check Solution (FHQ-Treap 实现)</summary>

**核心逻辑**：在 `split` 和 `merge` 操作中，涉及修改节点的动作前先进行 `copy_node`。

```cpp
int copy_node(int u) {
    if (!u) return 0;
    int v = ++idx;
    tr[v] = tr[u];
    return v;
}
void split(int u, int v, int &l, int &r) {
    if (!u) { l = r = 0; return; }
    u = copy_node(u); // 路径复制关键点
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

## 4. 综合练习与解答

1. **[树上主席树]** 查询路径 $(u, v)$ 的第 $k$ 小值。
<details>
<summary>Check Solution</summary>

**核心逻辑**：树上差分。对应的主席树为 $T_u + T_v - T_{lca} - T_{fa[lca]}$。

</details>

2. **[历史版本并查集]**
<details>
<summary>Check Solution</summary>

**核心策略**：用可持久化线段树维护 `fa` 数组。单次修改（即 `merge`）会产生一个新的 `fa` 数组根节点。必须使用按秩合并。

</details>

3. **[进阶] 可持久化 LCT?**
<details>
<summary>Check Solution</summary>

**解析**：由于 LCT 深度依赖 Splay 的自平衡，而 Splay 的旋转会破坏路径复制的成本效益，可持久化 LCT 的空间复杂度极高。工业界通常使用 **Top Trees** 或 **Euler Tour Tree** 的可持久化版本替代。

</details>

---

_编者注：可持久化结构的精髓在于对“历史”的尊重。它不仅是算法竞赛的利器，更是现代数据库实现快照隔离与并发控制的理论基石。_
