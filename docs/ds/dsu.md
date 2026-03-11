---
title: 并查集 (Disjoint Set Union)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { GitMerge, Users, Zap, ShieldCheck, Sigma } from 'lucide-react';

# 并查集 (DSU): 集合关系的维护艺术

<KnowledgeCard type="info" title="数学定义：等价关系">
并查集（Disjoint Set Union, DSU）是一种维护**等价关系 (Equivalence Relation)** 的高效数据结构。对于集合 $S$ 上的二元关系 $\sim$，它支持：
1. **Reflexivity (自反性)**: $a \sim a$
2. **Symmetry (对称性)**: $a \sim b \iff b \sim a$
3. **Transitivity (传递性)**: $a \sim b \land b \sim c \implies a \sim c$
并查集通过维护**连通分量 (Connected Components)** 来动态判定两个元素是否属于同一个等价类。
</KnowledgeCard>

---

## 1. 结构高度抽象

从抽象代数角度看，并查集维护了一个集合序列的划分。设 $U$ 为全集，DSU 维护划分 $P = \{S_1, S_2, \dots, S_k\}$，满足 $\bigcup S_i = U$ 且 $S_i \cap S_j = \emptyset$。

- **Find(x)**: 返回包含 $x$ 的集合 $S_i$ 的唯一代表元素（根）。
- **Union(x, y)**: 若 $x \in S_i, y \in S_j$ 且 $i \neq j$，则将 $P$ 更新为 $(P \setminus \{S_i, S_j\}) \cup \{S_i \cup S_j\}$。

---

## 2. 时空复杂度摊还证明

并查集的效率源于两大核心优化：**路径压缩 (Path Compression)** 与 **按秩合并 (Union by Rank)**。

### 2.1 路径压缩与按秩合并
```cpp
struct DSU {
    vector<int> p, sz;
    DSU(int n) : p(n + 1), sz(n + 1, 1) {
        for (int i = 1; i <= n; i++) p[i] = i;
    }
    int find(int x) {
        if (p[x] == x) return x;
        return p[x] = find(p[x]); // 路径压缩
    }
    void unite(int x, int y) {
        int rootX = find(x), rootY = find(y);
        if (rootX != rootY) {
            if (sz[rootX] < sz[rootY]) swap(rootX, rootY);
            p[rootY] = rootX; // 按秩合并（Size 优化）
            sz[rootX] += sz[rootY];
        }
    }
};
```

### 2.2 复杂度证明 (势能分析概要)
**定理**：同时使用路径压缩和按秩合并，单次操作的均摊时间复杂度为 $O(\alpha(N))$。

**证明思路 (Tarjan, 1975)**：
引入势能函数 $\Phi$。设节点的秩（Rank）为 $r(x)$，其为以 $x$ 为根的树的最大可能高度。
定义 $\alpha(n)$ 为**反阿克曼函数 (Inverse Ackermann Function)**。
1. **仅按秩合并**：树高限制在 $O(\log N)$，复杂度 $O(\log N)$。
2. **结合路径压缩**：路径压缩会显著降低树高，但由于按秩合并维持了结构的“紧凑性”，势能的变化被分摊。通过对节点秩进行分层处理（层级由阿克曼函数定义），可以证明 $\alpha(n)$ 是摊还代价的严格上界。
$\alpha(n)$ 增长极其缓慢，对于 $n = 2^{2^{10^{19729}}}$，$\alpha(n) \leq 5$。

---

## 3. 进阶：带权与扩展域

### 3.1 带权并查集 (Weighted DSU)
每个节点 $x$ 维护到父节点的偏移量 $d[x]$。在 `find` 递归返回时，更新 $d[x] = d[x] \oplus d[p[x]]$（其中 $\oplus$ 为满足结合律的算子）。

### 3.2 扩展域并查集 (Multiple Domains)
用于维护复杂的逻辑关系（如“敌人的敌人是朋友”）。将一个元素 $x$ 拆分为多个状态节点（如 $x_{friend}, x_{enemy}$），通过合并状态点来表达约束。

---

## 4. 教材化例题与解析

### 例题 1：食物链 (综合逻辑关系)
<details>
<summary>Check Solution (扩展域做法)</summary>

**题目描述**：有 A, B, C 三类动物，A 吃 B，B 吃 C，C 吃 A。给定 $k$ 个描述，判断假话数量。
**解析**：为每个动物 $i$ 开 3 个域：$i_A, i_B, i_C$。
- 如果 $x, y$ 是同类：合并 $(x_A, y_A), (x_B, y_B), (x_C, y_C)$。
- 如果 $x$ 吃 $y$：合并 $(x_A, y_B), (x_B, y_C), (x_C, y_A)$。

```cpp
#include <iostream>
#include <numeric>
#include <vector>

using namespace std;

struct DSU {
    vector<int> p;
    DSU(int n) : p(n + 1) { iota(p.begin(), p.end(), 0); }
    int find(int x) { return p[x] == x ? x : p[x] = find(p[x]); }
    void unite(int x, int y) { p[find(x)] = find(y); }
    bool same(int x, int y) { return find(x) == find(y); }
};

int main() {
    int n, k, ans = 0;
    scanf("%d %d", &n, &k);
    DSU dsu(3 * n + 1);
    while (k--) {
        int t, x, y;
        scanf("%d %d %d", &t, &x, &y);
        if (x > n || y > n) { ans++; continue; }
        if (t == 1) {
            if (dsu.same(x, y + n) || dsu.same(x, y + 2 * n)) ans++;
            else {
                dsu.unite(x, y);
                dsu.unite(x + n, y + n);
                dsu.unite(x + 2 * n, y + 2 * n);
            }
        } else {
            if (dsu.same(x, y) || dsu.same(x, y + 2 * n)) ans++;
            else {
                dsu.unite(x, y + n);
                dsu.unite(x + n, y + 2 * n);
                dsu.unite(x + 2 * n, y);
            }
        }
    }
    printf("%d\n", ans);
    return 0;
}
```
</details>

### 例题 2：银河英雄传说 (带权路径长度)
<details>
<summary>Check Solution</summary>

**题目描述**：维护战舰队列，支持合并整排和查询同排两舰距离。
**解析**：带权并查集。$d[x]$ 表示 $x$ 到当前排头的距离，$sz[x]$ 表示当前排的总数。

```cpp
#include <iostream>
#include <cmath>
using namespace std;

const int N = 30010;
int p[N], d[N], sz[N];

int find(int x) {
    if (p[x] == x) return x;
    int root = find(p[x]);
    d[x] += d[p[x]];
    p[x] = root;
    return root;
}

int main() {
    int t; cin >> t;
    for(int i=1; i<N; i++) p[i] = i, sz[i] = 1;
    while(t--) {
        char op; int i, j; cin >> op >> i >> j;
        int pi = find(i), pj = find(j);
        if(op == 'M') {
            if(pi != pj) {
                d[pi] = sz[pj];
                sz[pj] += sz[pi];
                p[pi] = pj;
            }
        } else {
            if(pi != pj) cout << -1 << endl;
            else cout << max(0, abs(d[i] - d[j]) - 1) << endl;
        }
    }
    return 0;
}
```
</details>

### 例题 3：关押罪犯 (二分图判定)
<details>
<summary>Check Solution</summary>

**策略**：贪心思想，将冲突最大的两个人尽量分在不同监狱。使用并查集维护“敌人”域。

```cpp
// 核心逻辑：排序冲突值，对于 (u, v, w)
// 若 find(u) == find(v) 则 w 为答案（无法避免冲突）
// 否则 unite(u, v + n), unite(v, u + n)
```
</details>

---

## 5. 综合练习

1. **[维护连通块]** 使用并查集维护每个连通块的最小元素和最大元素。
2. **[动态图论]** 结合 Kruskal 算法思想，判断动态加边过程中两点何时连通。
3. **[进阶]** **可撤销并查集**：不使用路径压缩，仅用按秩合并，利用栈记录操作实现回滚。

---

_编者注：并查集的精髓在于“降维打击”。通过将复杂的关系网压缩为简单的树形代表元，它在图论、离散几何乃至编译器优化中都有着不可替代的地位。_
