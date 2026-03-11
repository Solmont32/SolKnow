---
title: 树形 DP
---

import { GitMerge, Network, TreeDeciduous, ShieldCheck, Zap } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 树形动态规划 (Tree Dynamic Programming)

树形 DP 是在树结构上进行的动态规划。由于树具有天然的递归性质（每一棵子树都是原问题的缩影），此类问题通常通过 **深度优先遍历 (DFS)** 实现。

---

<KnowledgeCard type="info" title="树形结构的递归特性">
    在树 $T=(V, E)$ 中，对于任意节点 $u$，其子节点 $v \in son(u)$ 引导的子树 $T_v$ 是相互独立的。
    <br/>
    这保证了在计算 $u$ 的状态时，子问题的解（即子树 $T_v$ 的最优解）已经完备，且各子树间无直接干扰。
</KnowledgeCard>

---

## <TreeDeciduous className="inline-block mr-2" /> 1. 经典模型：没有上司的舞会

这是典型的“树上最大独立集”问题。

### 状态设计

- $f[u][0]$：不选节点 $u$ 时，子树 $u$ 的最大权值。
- $f[u][1]$：选择节点 $u$ 时，子树 $u$ 的最大权值。

### 转移方程推导

1.  **若选 $u$**：则其子节点 $v$ 绝对不能选。
    $$f[u][1] = w_u + \sum_{v \in son(u)} f[v][0]$$
2.  **若不选 $u$**：则其子节点 $v$ 可选可不选（取较大值）。
    $$f[u][0] = \sum_{v \in son(u)} \max(f[v][0], f[v][1])$$

---

## <Network className="inline-block mr-2" /> 2. 树上背包与 $O(NM)$ 复杂度证明

树上背包是树形 DP 中最常见的变体。

### 转移方程

$$f[u][j] = \max_{v \in son(u), k < j} \{ f[u][j-k] + f[v][k] \}$$

### 🚀 复杂度证明 (The LCA Argument)

看似是 $O(N \cdot M^2)$，但若严格限制枚举上限为子树大小 $\min(M, sz[u])$，复杂度实为 **$O(N \cdot M)$**。
**证明要点**：
在合并两棵子树（大小分别为 $sz_1, sz_2$）时，两重循环的次数为 $sz_1 \times sz_2$。这等价于从第一棵子树选一个点，从第二棵子树选一个点，这对点在它们的 LCA（即当前节点 $u$）处被处理一次。由于每一对节点有且仅有一个 LCA，总处理次数为节点对数 $O(N^2)$。当有容量限制 $M$ 时，复杂度被限制在 $O(NM)$。

---

## <Zap className="inline-block mr-2" /> 3. 换根 DP (Rerooting / Second Order DP)

当问题不仅与子树有关，还与“除子树外的部分”有关时，通常需要两遍 DFS。

### 建模步骤

1.  **第一遍 DFS**：以任意节点（如 1 号点）为根，计算子树内的贡献 $f[u]$。
2.  **第二遍 DFS**：从父节点 $u$ 向子节点 $v$ 转移，计算以 $v$ 为根时的全局解 $g[v]$。
    - **逻辑**：$g[v] = f[v] + \text{ContributionFrom}(u \setminus v)$。

---

## <ShieldCheck className="inline-block mr-2" /> 4. 综合练习与强化

### 练习 1：没有上司的舞会 (最大独立集)

给定一棵权值树，选出一组互不相邻的节点使权值和最大。

<details>
<summary>Check Solution (O(N))</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

const int MAXN = 6005;
int f[MAXN][2], w[MAXN], n;
vector<int> G[MAXN];
bool has_parent[MAXN];

void dfs(int u) {
    f[u][1] = w[u];
    f[u][0] = 0;
    for (int v : G[u]) {
        dfs(v);
        f[u][0] += max(f[v][0], f[v][1]);
        f[u][1] += f[v][0];
    }
}

int main() {
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> w[i];
    for (int i = 0; i < n - 1; i++) {
        int u, v; cin >> u >> v;
        G[v].push_back(u);
        has_parent[u] = true;
    }
    int root = 1;
    while (has_parent[root]) root++;
    dfs(root);
    cout << max(f[root][0], f[root][1]) << endl;
    return 0;
}
```

</details>

### 练习 2：树的中心 (换根 DP)

求树中距离其他节点最远距离最小的节点（中心点）。

<details>
<summary>Check Solution (O(N))</summary>

```cpp
// 核心逻辑：维护向下的最长路 d1、次长路 d2 和向上的最长路 up
void dfs_down(int u, int fa) {
    for (auto& edge : G[u]) {
        int v = edge.v, w = edge.w;
        if (v == fa) continue;
        dfs_down(v, u);
        if (d1[v] + w > d1[u]) {
            d2[u] = d1[u];
            d1[u] = d1[v] + w;
            p1[u] = v; // 记录最长路来源
        } else if (d1[v] + w > d2[u]) {
            d2[u] = d1[v] + w;
        }
    }
}

void dfs_up(int u, int fa) {
    for (auto& edge : G[u]) {
        int v = edge.v, w = edge.w;
        if (v == fa) continue;
        // 如果 v 是 u 向下最长路的路径上的点，up[v] 只能取 u 的次长路
        if (p1[u] == v) up[v] = max(up[u], d2[u]) + w;
        else up[v] = max(up[u], d1[u]) + w;
        dfs_up(v, u);
    }
}
```

</details>

---

## 延伸挑战

- [洛谷 P2014 [CTSC1997] 选课](https://www.luogu.com.cn/problem/P2014)（树上背包练习）
- [洛谷 P3478 [STA-Station]](https://www.luogu.com.cn/problem/P3478)（换根 DP 模板）
- [POJ 1655 Balancing Act](http://poj.org/problem?id=1655)（树的重心）
