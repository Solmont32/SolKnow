---
title: 最小生成树与生成树进阶
---

import { TreeDeciduous, Zap, GitBranch, ShieldCheck, Activity, Layers, Target } from 'lucide-react';

# <TreeDeciduous className="inline-block mr-2 mb-1 text-green-600" /> 最小生成树 (MST)

生成树问题是图论中**代价与连通性平衡**的经典课题。本篇涵盖了从基础 Kruskal 算法到进阶生成树结构的系统化内容。

---

## 一、 <Target className="inline-block mr-2 mb-1 text-blue-500" /> 核心性质与定理

给定连通图 $G = (V, E)$。

1. **切分定理 (Cut Property)**：对于 $V$ 的任意真子集 $S$，若边 $e = (u, v)$ 是连接 $S$ 与 $V-S$ 的所有边中权值最小的一条，则 $e$ 必然包含在 $G$ 的某棵 MST 中。
2. **回路定理 (Cycle Property)**：对于 $G$ 中的任意回路 $C$，若 $e$ 是 $C$ 中权值最大的边，则 $e$ 必然不包含在 $G$ 的任何一棵 MST 中。
3. **边权唯一性**：若图中所有边权均互不相同，则其 MST 是唯一的。

---

## 二、 <Zap className="inline-block mr-2 mb-1 text-amber-500" /> 基础算法演进

| 算法 | 核心思想 | 复杂度 | 适用场景 |
| :--- | :--- | :--- | :--- |
| **Kruskal** | 贪心加边 + 并查集 | $O(E \log E)$ | 稀疏图 (E 较小) |
| **Prim** | 贪心加点 + 优先队列 | $O(E \log V)$ | 稠密图 (E 较大) |
| **Boruvka** | 多路增量松弛 | $O(E \log V)$ | 并行计算场景 |

---

## 三 <Layers className="inline-block mr-2 mb-1 text-purple-500" /> 进阶结构：Kruskal 重构树

**定义**：在 Kruskal 算法合并两个连通块 $u, v$ 时，新建一个节点 $node$，其权值为当前边的权值 $w$，并让 $node$ 成为 $u$ 和 $v$ 所在树根的父亲。

**核心性质**：
- 它是一棵具有 $2n-1$ 个节点的二叉树。
- 原图中 $u, v$ 两点间所有路径上**最大边权的最小值**，等于重构树中 $LCA(u, v)$ 的权值。
- 重构树是一个大根堆（父节点权值 $\ge$ 子节点）。

---

## 四 <Activity className="inline-block mr-2 mb-1 text-blue-500" /> 算法扩展：严格次小生成树

**目标**：求一棵权值和仅次于 MST 且严格大于 MST 的生成树。

**步骤**：
1. 求出原图的一棵 MST。
2. 枚举所有非树边 $e = (u, v, w)$。
3. 替换边：用 $e$ 替换 MST 中 $u \to v$ 路径上的**最大权值边** $max\_w$。
4. 若 $w > max\_w$，则当前代价为 $MST\_sum - max\_w + w$。
5. 若 $w == max\_w$，则需替换路径上的**严格次大权值边**。
6. 取所有替换方案中的最小值。

---

## 五、 工业级 C++ 实现 (Kruskal + 并查集)

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

using namespace std;

struct Edge {
    int u, v, w;
    bool operator<(const Edge& other) const {
        return w < other.w;
    }
};

struct DSU {
    vector<int> parent;
    DSU(int n) {
        parent.resize(n + 1);
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
    bool unite(int i, int j) {
        int root_i = find(i);
        int root_j = find(j);
        if (root_i != root_j) {
            parent[root_i] = root_j;
            return true;
        }
        return false;
    }
};

/**
 * @brief Kruskal 算法求 MST
 * @return {MST 权值总和, 选中的边集合}
 */
pair<long long, vector<Edge>> kruskal(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end());
    DSU dsu(n);
    long long mst_sum = 0;
    vector<Edge> result;
    
    for (const auto& edge : edges) {
        if (dsu.unite(edge.u, edge.v)) {
            mst_sum += edge.w;
            result.push_back(edge);
            if (result.size() == n - 1) break;
        }
    }
    
    if (result.size() != n - 1 && n > 1) return {-1, {}}; // 图不连通
    return {mst_sum, result};
}
```

---

## 六、 配套练习 (折叠解答)

### 练习 1：瓶颈生成树
什么是瓶颈生成树？它与 MST 有什么关系？

<details>
<summary>查看解析</summary>

**分析**：
瓶颈生成树是指一棵生成树中，最大边权最小。
**结论**：
最小生成树一定是瓶颈生成树，但瓶颈生成树不一定是最小生成树。
证明：根据切分定理，MST 选中的边都是局部最小，也就保证了全局最大边的最小化。

</details>

### 练习 2：增量 MST
如果向一个已经求好 MST 的图中新加入一条边 $(u, v, w)$，如何快速维护新的 MST？

<details>
<summary>查看解析</summary>

**分析**：
1. 加入新边后，图中会形成一个且仅一个环。
2. 找到环上权值最大的边。
3. 如果新边的权值比该最大权值小，则剔除原最大权边，保留新边。
**实现**：使用倍增法或 LCT 维护路径最大值。

</details>

### 练习 3：重构树应用
给定一个地图，每条路有海拔高度。求从 $A$ 到 $B$ 且不经过海拔低于 $H$ 的路的所有路径中，最高海拔的最小值。

<details>
<summary>查看解析</summary>

**分析**：
这是经典的“路径上最小值的最大化”或“最大值的最小化”问题。
1. 建立 Kruskal 重构树（小根堆形式，或对边权取反）。
2. $LCA(A, B)$ 的权值即为所求。

</details>
