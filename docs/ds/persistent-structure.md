---
title: 可持久化数据结构 (Persistent Structures)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import BilibiliEmbed from '@site/src/components/BilibiliEmbed';
import { History, Layers, Save, GitCommit, Database } from 'lucide-react';

# 可持久化数据结构 (Persistent Structures)

<KnowledgeCard type="info" title="核心定义">
可持久化数据结构支持在修改后保留历史版本，并允许查询甚至修改任意历史版本。其核心技术在于**共用节点**，通过仅新建发生变化的路径节点来节省空间。
</KnowledgeCard>

---

## 1. 核心原理：路径复制 (Path Copying)

当对一个数据结构进行修改时，我们不直接修改原有节点，而是：
1. **复制**受影响路径上的所有节点。
2. 在新节点上应用修改。
3. 将未受影响的子树链接回新节点。

这种方法将单次修改的空间复杂度控制在 $O(\text{Tree Height})$，通常为 $O(\log N)$。

---

## 2. 可持久化线段树 (主席树)

主要用于解决**区间第 $k$ 小**或**历史版本信息查询**。

### 2.1 实现要点
- `root[i]` 存储第 $i$ 次修改后的根节点编号。
- 每次 `update` 返回新创建的节点 ID。

```cpp
int update(int p, int l, int r, int x) {
    int u = ++idx;
    tr[u] = tr[p]; // 路径复制
    tr[u].sum++;
    if (l == r) return u;
    int mid = (l + r) >> 1;
    if (x <= mid) tr[u].l = update(tr[p].l, l, mid, x);
    else tr[u].r = update(tr[p].r, mid + 1, r, x);
    return u;
}
```

---

## 3. 可持久化 FHQ-Treap

由于 FHQ-Treap 不依赖旋转，它是最容易实现可持久化的平衡树。

### 3.1 核心逻辑
在 `split` 和 `merge` 操作中，只要涉及到修改子节点的指针，就必须先复制当前节点。

```cpp
int copy_node(int u) {
    if (!u) return 0;
    tr[++idx] = tr[u];
    return idx;
}

void split(int u, int val, int &l, int &r) {
    if (!u) { l = r = 0; return; }
    u = copy_node(u); // 复制当前节点
    if (tr[u].val <= val) {
        l = u; split(tr[u].r, val, tr[u].r, r);
    } else {
        r = u; split(tr[u].l, val, l, tr[u].l);
    }
}
```

---

## 4. 经典例题

### 例题 1：可持久化数组
维护一个数组，支持：在某个历史版本上修改某个位置的值，或者查询某个历史版本上某个位置的值。

<details>
<summary>Check Solution (Persistent Segment Tree Implementation)</summary>

```cpp
#include <iostream>
using namespace std;

const int N = 1000010;
int n, m;
int a[N], root[N], idx;
struct Node {
    int l, r, v;
} tr[N * 40];

int build(int l, int r) {
    int u = ++idx;
    if (l == r) {
        tr[u].v = a[l];
        return u;
    }
    int mid = (l + r) >> 1;
    tr[u].l = build(l, mid);
    tr[u].r = build(mid + 1, r);
    return u;
}

int update(int p, int l, int r, int x, int v) {
    int u = ++idx;
    tr[u] = tr[p];
    if (l == r) {
        tr[u].v = v;
        return u;
    }
    int mid = (l + r) >> 1;
    if (x <= mid) tr[u].l = update(tr[p].l, l, mid, x, v);
    else tr[u].r = update(tr[p].r, mid + 1, r, x, v);
    return u;
}

int query(int u, int l, int r, int x) {
    if (l == r) return tr[u].v;
    int mid = (l + r) >> 1;
    if (x <= mid) return query(tr[u].l, l, mid, x);
    return query(tr[u].r, mid + 1, r, x);
}

int main() {
    scanf("%d%d", &n, &m);
    for (int i = 1; i <= n; i++) scanf("%d", &a[i]);
    root[0] = build(1, n);

    for (int i = 1; i <= m; i++) {
        int v, op, x, y;
        scanf("%d%d%d", &v, &op, &x);
        if (op == 1) {
            scanf("%d", &y);
            root[i] = update(root[v], 1, n, x, y);
        } else {
            printf("%d\n", query(root[v], 1, n, x));
            root[i] = root[v];
        }
    }
    return 0;
}
```
</details>

---

## 5. 练习库

- **练习 1：最大异或和** - 结合可持久化 Trie 与贪心。
- **练习 2：Count on a Tree** - 树上路径第 $k$ 小，结合主席树与 LCA。
