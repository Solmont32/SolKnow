---
title: 并查集 (Disjoint Set Union)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { GitMerge, Users, Zap, ShieldCheck, Sigma, Network, Database, Boxes, TrendingUp, CheckCircle2 } from 'lucide-react';

# 并查集 (DSU): 集合关系的维护艺术

<KnowledgeCard type="info" title="数学定义：等价关系">
并查集（Disjoint Set Union, DSU）是一种维护**等价关系 (Equivalence Relation)** 的高效数据结构。对于集合 $S$ 上的二元关系 $\sim$，它支持：
1. **Reflexivity (自反性)**: $a \sim a$
2. **Symmetry (对称性)**: $a \sim b \iff b \sim a$
3. **Transitivity (传递性)**: $a \sim b \land b \sim c \implies a \sim c$
并查集通过维护**连通分量 (Connected Components)** 来动态判定两个元素是否属于同一个等价类。
</KnowledgeCard>

---

## 1. 系统化抽象数据类型 (ADT) 推导

并查集维护了一个集合序列的划分 $P = \{S_1, S_2, \dots, S_k\}$。设 $U = \{1, 2, \dots, n\}$ 为全集。

### 1.1 基本操作定义

- **Find(x)**: 返回包含 $x$ 的唯一集合代表元 $\text{rep}(S_i)$。
- **Union(x, y)**: 若 $\text{rep}(S_i) \neq \text{rep}(S_j)$，则 $P \leftarrow (P \setminus \{S_i, S_j\}) \cup \{S_i \cup S_j\}$。

### 1.2 系统化单调性证明 (Monotonicity Proof)

**命题**：在使用“按秩合并”（Union by Rank/Size）时，树的高度或规模具有严格的单调性质。
- **Size 单调性**：若将树 $T_1$ 合并到 $T_2$，则新根的 $size$ 满足 $size_{new} = size_{T_1} + size_{T_2} > \max(size_{T_1}, size_{T_2})$。
- **Rank 单调性**：树的高度仅在两棵高度相等的树合并时增加 $1$。即 $rank_{new} = \max(rank_{T_1}, rank_{T_2} + [rank_{T_1} = rank_{T_2}])$。
**推论**：对于 $N$ 个节点的并查集，若仅使用按秩合并，任何节点的深度不会超过 $\lfloor \log_2 N \rfloor$。

### 1.3 数据完整性证明

**命题**：并查集森林结构始终是一组互不相交的树，且根节点是该集合的唯一代表。
**证明**：
1. **初始状态**：每个节点自成一根，满足条件。
2. **归纳步**：`Union(x, y)` 仅在 $x, y$ 的根节点 $r_x, r_y$ 不同时，将 $p[r_y] = r_x$。此操作仅合并两棵树且未引入环，故森林性质保持。

---

## 2. 复杂度分析与空间分配证明

### 2.1 空间分配证明 (Systematic Space Allocation)

**定理**：标准并查集的空间复杂度为 $\Theta(N)$。
**证明**：
并查集维护两个主要数组：父节点数组 $p[]$ 和秩数组 $rank[]$（或 $size[]$）。
1. 每个节点在全集 $U = \{1, \dots, N\}$ 中仅出现一次。
2. 每一个节点 $i \in U$ 对应且仅对应数组 $p$ 和 $rank$ 中的一个索引。
3. 因此，总空间 $S(N) = \text{sizeof}(int) \times 2N + \text{const}$，即 $O(N)$。

### 2.2 势能分析证明 (The $\alpha(n)$ Proof via Potential Method)

**定理**：同时使用路径压缩和按秩合并，单次操作的均摊代价为 $O(\alpha(N))$。

**证明框架**：
定义势能函数 $\Phi = \sum_{x} \phi(x)$，其中 $\phi(x)$ 取决于 $x.rank$ 与其父节点 $p[x].rank$ 的相对增长速度。其反函数 $\alpha(n) = \min \{k : A_k(1) \ge n\}$。
路径压缩会大幅减少势能 $\Phi$，释放的势能足以支付路径上 $O(L)$ 的实际代价。

---

## 3. 区间维护一致性分析 (Consistency Analysis)

在维护**带权并查集 (Weighted DSU)** 时，必须确保路径压缩与合并操作在逻辑上的一致性。

### 3.1 路径压缩的一致性 (Path Compression Consistency)
设 $d(x)$ 为节点 $x$ 到其父节点 $p[x]$ 的权值。在 `find(x)` 过程中：
$$d_{new}(x) = d_{old}(x) \oplus d_{old}(p[x]) \oplus \dots \oplus d_{old}(root)$$
**核心逻辑**：必须**先递归**更新父节点，利用更新后的父节点权值 $d[p[x]]$（此时 $p[x]$ 的父节点已是根）来更新当前节点。
```cpp
int find(int x) {
    if (p[x] == x) return x;
    int root = find(p[x]); // 先递归
    d[x] = d[x] ^ d[p[x]]; // 再更新权值（此处以异或为例）
    return p[x] = root;
}
```

### 3.2 合并的一致性 (Union Consistency)
若已知 $x, y$ 之间的关系 $w$（即 $x \xrightarrow{w} y$），设 $rx, ry$ 为各自根节点：
$$d(rx) = d(y) \oplus w^{-1} \oplus d(x)$$
此方程确保了合并后，新路径 $x \to rx \to ry$ 与已知关系一致。

---

## 4. 教材化例题与解析

### 例题 1：食物链 (扩展域做法)
<details>
<summary>Check Solution (Domain Expansion)</summary>

**核心逻辑**：利用扩展域维护 A, B, C 三类之间的捕食关系。
```cpp
#include <iostream>
#include <vector>
#include <numeric>

struct DSU {
    std::vector<int> p;
    DSU(int n) : p(3 * n + 1) { std::iota(p.begin(), p.end(), 0); }
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int x, int y) { p[find(x)] = find(y); }
    bool same(int x, int y) { return find(x) == find(y); }
};

int main() {
    int n, k, ans = 0;
    std::cin >> n >> k;
    DSU dsu(n);
    while (k--) {
        int t, x, y;
        std::cin >> t >> x >> y;
        if (x > n || y > n) { ans++; continue; }
        if (t == 1) {
            if (dsu.same(x, y + n) || dsu.same(x, y + 2 * n)) ans++;
            else dsu.unite(x, y), dsu.unite(x + n, y + n), dsu.unite(x + 2 * n, y + 2 * n);
        } else {
            if (dsu.same(x, y) || dsu.same(x, y + 2 * n)) ans++;
            else dsu.unite(x, y + n), dsu.unite(x + n, y + 2 * n), dsu.unite(x + 2 * n, y);
        }
    }
    std::cout << ans << std::endl;
    return 0;
}
```
</details>

### 例题 2：银河英雄传说 (带权并查集)
<details>
<summary>Check Solution</summary>

**解析**：维护 $d[x]$ 为 $x$ 到根的距离，$sz[x]$ 为连通块大小。
```cpp
int find(int x) {
    if (p[x] == x) return x;
    int root = find(p[x]);
    d[x] += d[p[x]]; // 一致性：累加到根的距离
    return p[x] = root;
}
void unite(int x, int y) {
    int rx = find(x), ry = find(y);
    if (rx != ry) {
        p[rx] = ry;
        d[rx] = sz[ry]; // rx 接在 ry 尾部，更新 rx 到底部距离
        sz[ry] += sz[rx];
    }
}
```
</details>

---

## 5. 综合练习与解答

1. **[连通块维护]** 维护每个连通块的最小、最大元素及成员总数。
<details>
<summary>Check Solution</summary>

```cpp
struct Node {
    std::vector<int> p, sz, mi, ma;
    Node(int n) : p(n+1), sz(n+1, 1), mi(n+1), ma(n+1) {
        std::iota(p.begin(), p.end(), 0);
        mi = ma = p;
    }
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int x, int y) {
        int rx = find(x), ry = find(y);
        if (rx != ry) {
            p[rx] = ry;
            sz[ry] += sz[rx];
            mi[ry] = std::min(mi[ry], mi[rx]);
            ma[ry] = std::max(ma[ry], ma[rx]);
        }
    }
};
```
</details>

2. **[判定性] 二分图的动态维护**
<details>
<summary>Check Solution</summary>

**核心逻辑**：使用带权并查集维护边权的异或和。若两个节点在同一连通分量且路径异或和不符合要求，则说明存在奇环。
```cpp
struct BipartiteDSU {
    std::vector<int> p, d;
    BipartiteDSU(int n) : p(n+1), d(n+1, 0) { std::iota(p.begin(), p.end(), 0); }
    int find(int x) {
        if (p[x] == x) return x;
        int root = find(p[x]);
        d[x] ^= d[p[x]];
        return p[x] = root;
    }
    bool add_edge(int u, int v) {
        int ru = find(u), rv = find(v);
        if (ru != rv) {
            p[ru] = rv;
            d[ru] = d[u] ^ d[v] ^ 1;
            return true;
        }
        return (d[u] ^ d[v]) == 1; // 必须不同色
    }
};
```
</details>

---

_编者注：并查集的复杂性隐藏在其极简的 API 之下。它是维护等价类关系的终极方案。_
