---
title: 可持久化数据结构 (Persistent Structures)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { History, Save, Layers, Share2, GitBranch, Clock } from 'lucide-react';

# 可持久化数据结构: 时间与空间的博弈

<KnowledgeCard type="info" title="核心逻辑：函数式更新与路径复制">
可持久化数据结构（Persistent Data Structures）允许访问历史版本并支持分支化修改。
- **Partial Persistence**: 允许查询历史，仅允许修改最新版本。
- **Full Persistence**: 允许在任何版本上进行修改。
- **核心机制**: **写时复制 (Copy-on-Write)** 与 **结构共享 (Structural Sharing)**。
</KnowledgeCard>

---

## 1. 系统化抽象数据类型 (ADT) 推导

设 $D$ 为一个基础数据结构（如线段树、数组），其操作集为 $O$。可持久化版本 $\mathcal{P}(D)$ 的定义如下：
- **版本集 $V$**: 记录所有历史状态。
- **Update(v, op)**: 在版本 $v$ 的基础上执行 $op \in O$，生成新版本 $v' \in V$。
- **Query(v, q)**: 在版本 $v$ 上执行查询 $q$。

### 1.1 路径复制 (Path Copying) 的代数本质
对于树形结构，修改一个节点 $u$ 会影响其所有祖先的拓扑关系。
为了保证历史版本 $v$ 的不可变性，路径复制算法规定：
$\forall p \in \text{path}(root, u)$，创建 $p$ 的副本 $p'$，使得新版本的 $root'$ 能够索引到修改后的 $u'$，同时共享未被修改的侧向子树。

---

## 2. 复杂度分析与数据完整性证明

### 2.1 时空复杂度证明
**定理**：对于高度为 $H$ 的树，路径复制单次修改的时间与空间复杂度均为 $O(H)$。
**证明**：每次修改仅创建从根到叶子的单一路径节点。在线段树中，$H = \log N$，故空间增长量为 $O(\log N)$。对于 $M$ 次修改，总空间复杂度为 $O(N + M \log N)$。

### 2.2 数据完整性 (不可变性) 证明
**命题**：结构共享不会导致旧版本的意外修改。
**证明**：在函数式实现中，所有更新操作均返回新创建的节点引用，且任何对节点的写操作仅作用于新分配的内存空间。由于旧版本的根节点及其路径引用链未发生任何改变，其指向的数据拓扑保持恒定。

---

## 3. 教材化例题与解析

### 例题 1：静态区间第 k 小 (主席树)
<details>
<summary>Check Solution (C++ 实现)</summary>

**题目描述**：多次询问区间 $[L, R]$ 内第 $k$ 小的数。
**核心逻辑**：利用主席树维护数值权值。利用前缀和思想 $T_R - T_{L-1}$ 提取区间信息。

```cpp
int update(int p, int l, int r, int x) {
    int q = ++idx;
    tr[q] = tr[p];
    tr[q].cnt++;
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

### 例题 2：可持久化并查集
<details>
<summary>Check Solution</summary>

**解析**：由于路径压缩涉及多点修改，改用**按秩合并**维护 $O(\log N)$ 深度。使用主席树维护 `parent` 数组实现可持久化数组。

```cpp
// 查找操作：在版本 v 的主席树上查找 fa[x]
int find(int ver, int x) {
    int f = query(root[ver], 1, n, x).fa;
    if (f == x) return x;
    return find(ver, f); // 无法路径压缩
}
```
</details>

---

## 4. 综合练习与解答

1. **[树上主席树]** 查询树上路径 $(u, v)$ 的第 $k$ 小值。
<details>
<summary>Check Solution</summary>

**核心逻辑**：利用树上差分。路径信息为 $T_u + T_v - T_{lca} - T_{fa[lca]}$。
```cpp
int cnt = tr[tr[u].l].cnt + tr[tr[v].l].cnt - tr[tr[lc].l].cnt - tr[tr[flc].l].cnt;
```
</details>

2. **[区间最大异或]** 可持久化 Trie 维护前缀异或值。
<details>
<summary>Check Solution</summary>

**核心逻辑**：类似主席树，每个版本维护到当前位置的 0/1 字典树路径，通过 $T_R - T_{L-1}$ 判断路径是否存在。
```cpp
// 在 [L, R] 范围内查找 x 的最大异或对
for (int i = 23; i >= 0; i--) {
    int v = (x >> i) & 1;
    if (tr[tr[r].s[v ^ 1]].cnt - tr[tr[l].s[v ^ 1]].cnt > 0) {
        res += (1 << i);
        r = tr[r].s[v ^ 1], l = tr[l].s[v ^ 1];
    } else r = tr[r].s[v], l = tr[l].s[v];
}
```
</details>

3. **[进阶] 动态主席树**：支持带单点修改的区间第 $k$ 小。
<details>
<summary>Check Solution</summary>

**核心逻辑**：树状数组套主席树。外层树状数组维护位置 $i$ 的修改，内层主席树维护权值分布。复杂度 $O(M \log^2 N)$。
</details>

---

_编者注：可持久化结构的精髓在于对“副作用”的严格管控。它不仅是算法竞赛的利器，更是函数式编程与现代数据库（如 MVCC 机制）的核心数学基础。_
