---
title: 最小生成树与网络连通优化
---

import { GitBranch, Trees, Zap, Scaling, CheckCircle } from 'lucide-react';

# <Trees className="inline-block mr-2 mb-1 text-green-600" /> 最小生成树 (Minimum Spanning Tree, MST)

最小生成树是处理“以最小总代价使所有点连通”类问题的数学模型。它广泛应用于电网铺设、光纤网络设计以及聚类分析等领域。

## 一、 <GitBranch className="inline-block mr-2 mb-1 text-green-500" /> 数学定义与切分定理

-   **生成树**：包含图 $G$ 的所有顶点，且具有 $|V|-1$ 条边的**无环连通子图**。
-   **MST 性质 (切分定理)**：对于图中任意一个切分 (Cut)，横跨该切分的边中权值最小的边，必然属于该图的一棵最小生成树。

---

## 二、 核心算法实现

### 1. Kruskal 算法 (按边合并)
Kruskal 的核心在于**排序与贪心**：优先选择权值最小的边，只要不形成环。

-   **复杂度**：$O(m \log m)$，适合稀疏图。
-   **核心结构**：**并查集 (DSU)**。

```cpp
struct Kruskal {
    struct Edge { int u, v, w; bool operator<(const Edge& o) const { return w < o.w; } };
    vector<int> fa;
    int find(int x) { return fa[x] == x ? x : fa[x] = find(fa[x]); }
    
    long long solve(int n, vector<Edge>& e) {
        sort(e.begin(), e.end());
        fa.assign(n + 1, 0); iota(fa.begin(), fa.end(), 0);
        long long ans = 0; int cnt = 0;
        for (auto& edge : e) {
            int fu = find(edge.u), fv = find(edge.v);
            if (fu != fv) {
                fa[fu] = fv;
                ans += edge.w;
                if (++cnt == n - 1) return ans;
            }
        }
        return -1; // 不连通
    }
};
```

### 2. Prim 算法 (按点扩展)
Prim 从一个点开始，不断将距离当前树最近的点拉入集合。

-   **复杂度**：堆优化后 $O(m \log n)$，适合稠密图。
-   **核心结构**：**优先队列 (Priority Queue)**。

---

## 三、 <Zap className="inline-block mr-2 mb-1 text-amber-500" /> 建模实战与变体

### 1. 最小生成森林与 $k$-聚类
若要求得到 $k$ 个连通块且边权总和最小，只需在 Kruskal 过程中，当剩余连通块数量等于 $k$ 时停止合并。此时最短的一条“待加边”权值即为聚类间的最小距离。

### 2. 次小生成树 (Second MST)
在 MST 基础上，通过枚举非树边并替换树上环中的最大边，寻找权值仅次于 MST 的生成树。

### 3. 与最短路树的区分
-   **MST**：最小化**全树总边权**。
-   **最短路树 (SPT)**：最小化**源点到各点距离**。

---

## 四、 <Scaling className="inline-block mr-2 mb-1 text-blue-500" /> 工业级应用案例

-   **光纤网络规划**：城市间光纤铺设。
-   **图像聚类**：将像素视为点，相似度倒数视为边权，通过求 MST 进行区域分割。

---

## 五、 配套练习（答案折叠）

### 练习 1（性质）
若一个连通图中所有边权都相等，其 MST 是否唯一？

<details>
<summary>点击查看过程与答案</summary>

**分析**：任何一棵生成树的总权值都相同。
**答案**：MST 不一定唯一（任何生成树都是 MST），但总权值是唯一的。

</details>

### 练习 2（计算）
点 1, 2, 3，边：(1,2,5), (2,3,3), (1,3,10)。求 MST 权值。

<details>
<summary>点击查看过程与答案</summary>

**分析**：排序得 (2,3,3), (1,2,5)。
**答案**：$3 + 5 = 8$。

</details>

### 练习 3（进阶）
如何通过 MST 判定一个图是否连通？

<details>
<summary>点击查看过程与答案</summary>

**分析**：生成树要求连接 $n$ 个点且只有 $n-1$ 条边。
**答案**：若算法结束时所选边数小于 $n-1$，说明无法连接所有点，原图不连通。

</details>
