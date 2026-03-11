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
**定理**：对于 $V$ 的任意非空真子集 $S$，令 $C = (S, V-S)$ 为 $G$ 的一个切分。若边 $e = (u, v)$ 是连接 $S$ 与 $V-S$ 的所有边中权值最小的一条，则存在一棵包含 $e$ 的最小生成树。
*证明要点 (替换法)*：假设某棵 MST $T$ 不包含 $e$。由于 $T$ 是连通的，必然存在另一条边 $e'$ 连接 $S$ 与 $V-S$。若将 $e$ 加入 $T$ 并删除 $e'$，得到的仍是生成树且总权值更小（或相等），产生矛盾。

### 2. 回路定理 (Cycle Property)
**定理**：对于 $G$ 中的任意回路 $C$，若 $e$ 是 $C$ 中权值唯一最大的边，则 $e$ 必然不包含在任何一棵 MST 中。

### 3. 性质推论
- **唯一性**：若图中所有边权均互不相同，则其 MST 是唯一的。
- **瓶颈性**：最小生成树一定是**瓶颈生成树**（即最大边权最小的生成树）。

---

## 二、 <Workflow className="inline-block mr-2 mb-1 text-purple-500" /> 算法矩阵与复杂度分析

<ComplexityAnalysis 
  data={[
    { algorithm: "Kruskal (Union-Find)", complexity: "O(E log E)", space: "O(V + E)", note: "适合稀疏图，边排序为主导" },
    { algorithm: "Prim (Binary Heap)", complexity: "O(E log V)", space: "O(V + E)", note: "适合稠密图，逻辑类似 Dijkstra" },
    { algorithm: "Prim (Fibonacci Heap)", complexity: "O(E + V log V)", space: "O(V)", note: "理论最优，实现复杂" },
    { algorithm: "Boruvka", complexity: "O(E log V)", space: "O(V + E)", note: "适合并行化计算" }
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
- **堆性质**：若为最小生成树构造，则是一个大根堆（父节点权值 $\ge$ 子节点）。
- **瓶颈路映射**：原图中 $u, v$ 两点间所有路径上**最大边权的最小值**，等于重构树中 $LCA(u, v)$ 的点权。
</KnowledgeCard>

---

## 四、 工业级 C++ 实现 (Kruskal 范式)

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

using namespace std;

/**
 * @brief 工业级 Kruskal 算法实现
 * 复杂度: O(E log E)
 * 依赖: 并查集 (DSU)
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

### 练习 1：严格次小生成树 (Second Best MST)
给定无向图，求一棵总权值严格大于 MST 且在所有这种生成树中权值最小的树。

<details>
<summary>Check Solution</summary>

**算法流程**：
1. **预处理**：先求出一棵 MST。
2. **倍增维护**：对 MST 建立倍增表，维护路径上的**最大边权** $max1$ 与**严格次大边权** $max2$。
3. **枚举替换**：遍历所有不在 MST 中的边 $e = (u, v, w)$：
   - 在路径 $u \to v$ 上寻找最大的 $w' < w$。
   - 若 $w > max1$，替换 $max1$；若 $w == max1$，替换 $max2$。
   - 代价增量为 $w - w'$，取所有方案中增量最小的。
4. **复杂度**：$O(E \log E + E \log V)$。

</details>

### 练习 2：增量式 MST 维护
如果在一个已有的 MST 中动态加入一条边 $e = (u, v, w)$，如何快速维护新的 MST？

<details>
<summary>Check Solution</summary>

**解析**：
1. 加入新边后，图中形成唯一的环。
2. 找到该环上权值最大的边 $e_{max}$。
3. 若 $w < w(e_{max})$，则剔除 $e_{max}$，保留 $e$。
*提示：静态查询可使用倍增/LCA，动态加边/删边则需使用 **LCT (Link-Cut Tree)**，复杂度 $O(\log V)$。*

</details>

### 练习 3：重构树在离线询问中的应用
给定 $Q$ 个询问 $(v, w)$，求从节点 $v$ 出发，只经过权值 $\le w$ 的边能到达的节点总数。

<details>
<summary>Check Solution</summary>

**解析**：
1. **构建重构树**：建立 MST 的 Kruskal 重构树。
2. **定位节点**：对于询问 $(v, w)$，在重构树中从 $v$ 向上倍增跳转，找到最高的一个节点 $P$，使得 $val[P] \le w$。
3. **统计叶子**：由于重构树是大根堆，$P$ 的子树中所有叶子节点（即原图节点）都是 $v$ 的可达点。
4. **子树信息**：利用 DFS 序和 `size` 数组即可快速求出叶子总数。

</details>
