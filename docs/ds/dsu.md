---
title: 并查集 (Disjoint Set Union)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { GitMerge, Users, Zap, ShieldCheck, Sigma, Network, Database, Boxes } from 'lucide-react';

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

### 1.2 数据完整性证明

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
**推论**：对于可撤销并查集，由于不使用路径压缩而改用栈记录操作，空间复杂度为 $O(N + M)$，其中 $M$ 为操作次数。

### 2.2 势能分析证明 (The $\alpha(n)$ Proof via Potential Method)

**定理**：同时使用路径压缩和按秩合并，单次操作的均摊代价为 $O(\alpha(N))$。

**证明框架**：
定义节点的秩 $x.rank$ 为其在按秩合并中作为根时的最大高度。$x.rank$ 在其非根时固定。
定义势能函数 $\Phi = \sum_{x} \phi(x)$，其中 $\phi(x)$ 取决于 $x.rank$ 与其父节点 $p[x].rank$ 的相对增长速度。

1. **Ackermann 函数定义**: $A_k(j)$ 增长极快。其反函数 $\alpha(n) = \min \{k : A_k(1) \ge n\}$。
2. **势能分配**: 
   - 对于每个节点 $x$，定义 $iter(x) = \max \{k : p[x].rank \ge A_k(x.rank)\}$。
   - 定义 $\phi(x) = (\alpha(N) - iter(x)) \times x.rank$。
3. **Find(x) 均摊分析**:
   - 路径压缩会使多个节点的 $p[x].rank$ 大幅增加。
   - 当 $p[x].rank$ 跨越 $A_k(x.rank)$ 的阈值时，$iter(x)$ 增加，$\phi(x)$ 减少。
   - 释放的势能足以支付路径上 $O(L)$ 的实际代价，仅余下根节点附近的 $O(\alpha(N))$ 项。
**结论**：总摊还代价为 $O(\alpha(N))$。

---

## 3. 结构拓扑一致性校验 (Topological Consistency)

在维护**带权并查集 (Weighted DSU)** 或动态连通性时，路径压缩必须满足向量加法的传递性。

### 3.1 路径压缩的一致性方程
设 $d(x)$ 为节点 $x$ 到其父节点 $p[x]$ 的权值。在 `find(x)` 过程中：
$$d_{new}(x) = d_{old}(x) \oplus d_{old}(p[x]) \oplus \dots \oplus d_{old}(root)$$
其中 $\oplus$ 是满足结合律的群运算（如加法、异或）。
**校验逻辑**：必须**先递归**更新父节点，再利用更新后的父节点权值更新当前节点。

### 3.2 合并的一致性方程
若已知 $x, y$ 之间的关系 $w$（即 $x \xrightarrow{w} y$），设 $rx, ry$ 为各自根节点：
$$d(rx) = d(y) \oplus w^{-1} \oplus d(x)$$
此方程确保了合并后，新路径 $x \to rx \to ry$ 与已知关系一致。

---

## 4. 教材化例题与解析

### 例题 1：食物链 (综合逻辑关系)

<details>
<summary>Check Solution (扩展域做法)</summary>

**题目描述**：有 A, B, C 三类动物，A 吃 B，B 吃 C，C 吃 A。给定描述，判断假话。
**核心逻辑**：利用扩展域（Domain Expansion）维护逻辑冲突。

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
        if (t == 1) { // x, y 是同类
            if (dsu.same(x, y + n) || dsu.same(x, y + 2 * n)) ans++;
            else dsu.unite(x, y), dsu.unite(x + n, y + n), dsu.unite(x + 2 * n, y + 2 * n);
        } else { // x 吃 y
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

**题目描述**：维护若干列战舰，支持合并两列，查询两战舰是否在同一列及其间隔。
**解析**：维护 $d[x]$ 为 $x$ 到根的距离，$sz[x]$ 为连通块大小。

```cpp
int find(int x) {
    if (p[x] == x) return x;
    int root = find(p[x]);
    d[x] += d[p[x]]; // 路径压缩时累加权值
    return p[x] = root;
}
void unite(int x, int y) {
    int rx = find(x), ry = find(y);
    if (rx != ry) {
        p[rx] = ry;
        d[rx] = sz[ry]; // rx 接在 ry 尾部
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

2. **[进阶] 可撤销并查集与二分图判定**
<details>
<summary>Check Solution</summary>

**核心逻辑**：使用带权并查集维护边权的异或和。撤销操作通过栈实现，不能使用路径压缩。

```cpp
struct UndoDSU {
    std::vector<int> p, rk, d;
    struct Op { int u, v, dr; };
    std::vector<Op> st;
    UndoDSU(int n) : p(n+1), rk(n+1, 0), d(n+1, 0) { std::iota(p.begin(), p.end(), 0); }
    
    std::pair<int, int> find(int x) {
        int dist = 0;
        while (x != p[x]) { dist ^= d[x]; x = p[x]; }
        return {x, dist};
    }
    
    bool unite(int u, int v, int w) {
        auto [ru, du] = find(u);
        auto [rv, dv] = find(v);
        if (ru == rv) return (du ^ dv ^ w) == 0;
        if (rk[ru] < rk[rv]) { std::swap(ru, rv); std::swap(du, dv); }
        st.push_back({ru, rv, rk[ru] == rk[rv]});
        p[rv] = ru;
        d[rv] = du ^ dv ^ w;
        rk[ru] += (rk[ru] == rk[rv]);
        return true;
    }
    
    void undo() {
        Op t = st.back(); st.pop_back();
        p[t.v] = t.v; d[t.v] = 0;
        rk[t.u] -= t.dr;
    }
};
```

</details>

---

_编者注：并查集的复杂性隐藏在其极简的 API 之下。它是维护等价类关系的终极方案，而其与反阿克曼函数的深刻联系，更是计算复杂性理论中最为迷人的篇章之一。_
