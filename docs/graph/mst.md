---
title: 最小生成树：贪心理论、重构树与有向图扩展
---

import { TreeDeciduous, Zap, GitBranch, ShieldCheck, Activity, Layers, Target, Sigma, BookOpen, Clock, Workflow } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <TreeDeciduous className="inline-block mr-2 mb-1 text-green-600" /> 最小生成树 (Minimum Spanning Tree)

最小生成树问题是**拟阵 (Matroid)** 理论在图论中的直观应用。本章不仅涵盖经典的 Kruskal 与 Prim 算法，更深入探讨 Boruvka 的并行思想、Kruskal 重构树的瓶颈映射，以及有向图下的朱-刘算法。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 核心公理与收敛性

### 1. 切分定理 (Cut Property)
对于图 $G$ 的任意切分 $(S, V \setminus S)$，割集中权值最小的边 $e$ 必包含在某棵 MST 中。
- **直观理解**：为了连通 $S$ 与外部，必须至少选一条割边。选最小的一条永远是局部最优且不破坏全局连通的选择。

### 2. 回路定理 (Cycle Property)
对于图 $G$ 中的任何回路，其中权值最大的边必不属于任何一棵 MST。

---

## 二、 <Workflow className="inline-block mr-2 mb-1 text-purple-500" /> 算法选型与复杂度深度分析

### 1. Boruvka 算法：天然的并行性
**流程**：
1. 每轮为每个连通块寻找与其相连的最小权边。
2. 将这些边加入集合并合并连通块。
**复杂度分析**：
每轮连通块数量至少减少一半，因此只需 $\log V$ 轮。总复杂度 $O(E \log V)$。在密集图中，结合 Prim 思想可进一步优化。

### 2. Kruskal 重构树：瓶颈路映射
<KnowledgeCard title="瓶颈路性质" icon={<GitBranch size={20} />}>
**定义**：$u, v$ 间的瓶颈路权值定义为所有 $u \to v$ 路径中最大边权的最小值。
**结论**：该值等于 Kruskal 重构树上 $LCA(u, v)$ 的点权。
</KnowledgeCard>

---

## 三、 <Zap className="inline-block mr-2 mb-1 text-amber-500" /> 有向最小生成树：朱-刘算法 (Chu-Liu/Edmonds)

在有向图中，最小生成树被称为**最小树形图** (Minimum Cost Arborescence)。

### 1. 算法步骤
1. **最短入边**：为除根节点外的每个点选择权值最小的入边。
2. **环路判定**：若这些边构成环，则将环缩为一个点。
3. **权值更新**：对于进入环的点 $v$ 的边 $(u, v)$，新权值 $w' = w - w_{prev}$，其中 $w_{prev}$ 是 $v$ 在环内的原入边权。
4. **递归**：在缩点后的图上重复，直到无环。

---

## 四、 工业级 C++ 实现 (Boruvka 范式)

```cpp
/**
 * @brief Boruvka 算法：适合边数巨大的情况
 */
long long boruvka(int n, vector<Edge>& edges) {
    vector<int> fa(n + 1);
    iota(fa.begin(), fa.end(), 0);
    auto find = [&](auto self, int x) -> int {
        return fa[x] == x ? x : fa[x] = self(self, fa[x]);
    };

    long long mst_w = 0;
    int components = n;
    while (components > 1) {
        vector<int> min_edge(n + 1, -1);
        for (int i = 0; i < edges.size(); ++i) {
            int u = find(find, edges[i].u), v = find(find, edges[i].v);
            if (u == v) continue;
            if (min_edge[u] == -1 || edges[i].w < edges[min_edge[u]].w) min_edge[u] = i;
            if (min_edge[v] == -1 || edges[i].w < edges[min_edge[v]].w) min_edge[v] = i;
        }

        bool changed = false;
        for (int i = 1; i <= n; ++i) {
            if (min_edge[i] != -1) {
                int u = find(find, edges[min_edge[i]].u), v = find(find, edges[min_edge[i]].v);
                if (u != v) {
                    mst_w += edges[min_edge[i]].w;
                    fa[u] = v;
                    components--;
                    changed = true;
                }
            }
        }
        if (!changed) break; // 图不连通
    }
    return mst_w;
}
```

---

## 五、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 精选练习与解析

### 练习 1：动态 MST
每次增加一条边，动态维护当前图的 MST 权值。

<details>
<summary>Check Solution</summary>

**解析**：
1. **LCT 方法**：使用 Link-Cut Tree 维护 MST。当加入边 $(u, v, w)$ 时，若 $u, v$ 已连通，查询路径上最大边 $(u', v', w')$。若 $w < w'$，则替换。
2. **离线方法**：CDQ 分治 + Kruskal。

</details>

### 练习 2：最小乘积生成树
每条边有两个权值 $a_i, b_i$，求生成树使得 $(\sum a_i) \times (\sum b_i)$ 最小。

<details>
<summary>Check Solution</summary>

**解析**：
将每个生成树看作平面上的点 $(X, Y) = (\sum a_i, \sum b_i)$。
1. **转化**：求左下凸包上的点。
2. **算法**：
   - 找到 $a$ 最小的点 $A$ 和 $b$ 最小的点 $B$。
   - 递归寻找离直线 $AB$ 最远的向左下方突出的点 $C$。
   - 寻找 $C$ 即为求 $min \{(Y_B - Y_A)X + (X_A - X_B)Y\}$，这是一次普通的 MST（边权设为 $(Y_B - Y_A)a_i + (X_A - X_B)b_i$）。

</details>
