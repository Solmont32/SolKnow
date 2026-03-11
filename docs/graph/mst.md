---
title: 最小生成树：连通骨架与最优性理论
---

import { TreeDeciduous, Zap, GitBranch, ShieldCheck, Activity, Layers, Target, Sigma, BookOpen, Clock, Workflow } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <TreeDeciduous className="inline-block mr-2 mb-1 text-green-600" /> 最小生成树 (Minimum Spanning Tree)

最小生成树问题是图论中**代价与连通性平衡**的经典课题。它不仅是网络设计（如光纤铺设、电路板布线）的基础，更是众多高级算法（如近似算法、聚类分析）的构建基石。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 核心理论体系

给定连通无向图 $G = (V, E)$，边权函数 $w: E \to \mathbb{R}$。

### 1. 切分定理 (Cut Property)

**定义**：对于 $V$ 的任意非空真子集 $S$，称 $C = (S, V \setminus S)$ 为 $G$ 的一个**切分** (Cut)。连接 $S$ 与 $V \setminus S$ 的边集称为该切分的**割集** (Cut-set)。
**定理**：若边 $e$ 是某个割集中的最小权值边，则必然存在一棵包含 $e$ 的最小生成树。
<KnowledgeCard title="切分定理证明 (交换法)" icon={<BookOpen size={20} />}>
假设 $T$ 是一棵不包含 $e=(u, v)$ 的 MST。由于 $T$ 是生成树，在 $T$ 中必有一条路径连接 $u$ 和 $v$。该路径上必有一条边 $e'$ 跨越切分 $(S, V \setminus S)$。
由假设，$w(e) \le w(e')$。构造新树 $T' = T \setminus \{e'\} \cup \{e\}$。显然 $T'$ 也是生成树，且 $w(T') \le w(T)$。
由于 $T$ 是 MST，$w(T') = w(T)$，故 $T'$ 也是一棵包含 $e$ 的 MST。
</KnowledgeCard>

### 2. 回路定理 (Cycle Property)

**定理**：对于 $G$ 中的任意回路 $C$，若 $e$ 是 $C$ 中权值最大的边，则 $e$ 必然不包含在任何一棵 MST 中（若权值不唯一，则存在一棵不含它的 MST）。

### 3. 性质推论

- **唯一性**：若图中所有边权均互不相同，则其 MST 是唯一的。
- **瓶颈性**：最小生成树一定是**瓶颈生成树**（即最大边权最小的生成树）。反之不一定成立。

---

## 二、 <Workflow className="inline-block mr-2 mb-1 text-purple-500" /> 算法矩阵与复杂度分析

<ComplexityAnalysis
data={[
{ algorithm: "Kruskal (Union-Find)", complexity: "O(E log E)", space: "O(V + E)", note: "适合稀疏图，边排序为主导" },
{ algorithm: "Prim (Binary Heap)", complexity: "O(E log V)", space: "O(V + E)", note: "适合稠密图，逻辑类似 Dijkstra" },
{ algorithm: "Prim (Fibonacci Heap)", complexity: "O(E + V log V)", space: "O(V)", note: "理论最优，实现复杂" },
{ algorithm: "Boruvka", complexity: "O(E log V)", space: "O(V + E)", note: "适合并行化计算，每轮减少一半连通块" }
]}
/>

---

## 三、 <Layers className="inline-block mr-2 mb-1 text-indigo-500" /> 进阶结构：Kruskal 重构树 (Ex-Tree)

**构造算法**：

1. 将边按权值从小到大排序。
2. 遍历边 $(u, v, w)$，若 $u, v$ 不在同一连通块：
   - 新建节点 $P$，权值 $val[P] = w$。
   - 使 $u, v$ 当前所在的树根成为 $P$ 的左右儿子。
   - 将 $P$ 设为合并后连通块的新根。

<KnowledgeCard title="重构树的核心性质" icon={<GitBranch size={20} />}>

- **点数**：包含 $2n-1$ 个节点（$n$ 个原图叶子节点，$n-1$ 个权值节点）。
- **堆性质**：若为最小生成树构造，则是一个大根堆。
- **瓶颈路映射**：原图中 $u, v$ 两点间所有路径上**最大边权的最小值**，等于重构树中 $LCA(u, v)$ 的点权。

</KnowledgeCard>

---

## 四、 工业级 C++ 实现 (Kruskal 范式)

```cpp
#include <vector>
#include <algorithm>
#include <numeric>

using namespace std;

/**
 * @brief 工业级 Kruskal 算法模板
 * 复杂度: O(E log E)
 */
struct Edge {
    int u, v;
    long long w;
    bool operator<(const Edge& other) const { return w < other.w; }
};

struct DSU {
    vector<int> fa;
    DSU(int n) : fa(n + 1) { iota(fa.begin(), fa.end(), 0); }
    int find(int x) { return fa[x] == x ? x : fa[x] = find(fa[x]); }
    bool unite(int x, int y) {
        int fx = find(x), fy = find(y);
        if (fx != fy) { fa[fx] = fy; return true; }
        return false;
    }
};

pair<long long, bool> solve_mst(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end());
    DSU dsu(n);
    long long total_w = 0;
    int edge_count = 0;

    for (const auto& e : edges) {
        if (dsu.unite(e.u, e.v)) {
            total_w += e.w;
            if (++edge_count == n - 1) break;
        }
    }
    return {total_w, edge_count == n - 1};
}
```

---

## 五、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 精选练习与解析

### 练习 1：严格次小生成树

给定无向图，求一棵总权值严格大于 MST 且权值最小的生成树。

<details>
<summary>Check Solution</summary>

**算法流程**：

1. **求 MST**：记总权值为 $W$。
2. **倍增维护**：对 MST 维护倍增表，存储路径上的**最大边权 $M1$** 和**严格次大边权 $M2$**。
3. **枚举替换**：遍历非树边 $(u, v, w)$：
   - 找到 MST 中 $u \to v$ 路径上的最大边权。
   - 若 $w > M1$，尝试替换 $M1$，增量为 $w - M1$。
   - 若 $w = M1$，尝试替换 $M2$，增量为 $w - M2$。
4. **结论**：取所有合法增量中的最小值。

</details>

### 练习 2：瓶颈生成树 (Bottleneck Spanning Tree)

如何证明一棵 MST 必然是一棵瓶颈生成树？

<details>
<summary>Check Solution</summary>

**证明**：
假设 MST $T$ 的最大边为 $e$。若存在另一棵生成树 $T'$，其最大边 $e'$ 满足 $w(e') < w(e)$。
将 $e$ 从 $T$ 中删除，得到两个连通块 $S$ 和 $V \setminus S$。在 $T'$ 中必然存在一条边 $e''$ 连接这两个块，且 $w(e'') \le w(e') < w(e)$。
将 $e''$ 加入 $T$ 替换 $e$，得到的树权值更小，与 $T$ 是 MST 矛盾。

</details>

### 练习 3：生成树计数 (Matrix Tree Theorem)

给定无向图，求其生成树的总数。

<details>
<summary>Check Solution</summary>

**解析**：

1. **构造拉普拉斯矩阵 $L$**：$L = D - A$，其中 $D$ 是度数矩阵，$A$ 是邻接矩阵。
2. **定理内容**：该图的生成树个数等于 $L$ 的任意一个 $n-1$ 阶主余子式的行列式值。
3. **计算**：利用高斯消元求行列式，复杂度 $O(n^3)$。

</details>
