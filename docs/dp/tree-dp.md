---
title: 树形 DP
---

import { GitMerge, Network, TreeDeciduous, ShieldCheck, Zap, Microscope, Layers } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 树形动态规划 (Tree Dynamic Programming)

树形 DP 是在树结构（通常为无向无环图）上进行的动态规划。由于树本身具有天然的递归性质（每个节点都是其子树的根），树形 DP 通常采用**自底向上**的策略，利用 DFS 序或后序遍历进行状态演进。

---

<KnowledgeCard type="info" title="树形结构的递归特性与无后效性">
    在树 $T=(V, E)$ 中，对于任意节点 $u$，其子节点 $v \in son(u)$ 引导的子树 $T_v$ 是相互独立的。
    <br/>
    这保证了在计算 $u$ 的状态时，子问题的解（即子树 $T_v$ 的最优解）已经完备，且各子树间无直接干扰。此即树形结构天然满足的**无后效性**。
</KnowledgeCard>

---

## <Microscope className="inline-block mr-2" /> 1. 形式化建模：状态设计与转移

### 1.1 树上最大独立集 (Maximum Independent Set)

**问题描述**：选出若干节点，使得选出的节点间无边相连，求节点权值之和的最大值。

**状态定义**：

- $f[u][0]$：不选节点 $u$ 时，以 $u$ 为根的子树的最大独立集权值和。
- $f[u][1]$：选取节点 $u$ 时，以 $u$ 为根的子树的最大独立集权值和。

**状态转移方程 (Transition)**：

1.  **若选 $u$**：则其子节点 $v$ 绝对不能选。
    $$f[u][1] = w_u + \sum_{v \in son(u)} f[v][0]$$
2.  **若不选 $u$**：则其子节点 $v$ 可选可不选（取较大值）。
    $$f[u][0] = \sum_{v \in son(u)} \max(f[v][0], f[v][1])$$

---

## <Layers className="inline-block mr-2" /> 2. 进阶模型：树上背包与复杂度分析

树上背包是树形 DP 中最常见的变体。

### 转移方程

$$f[u][j] = \max_{v \in son(u), k < j} \{ f[u][j-k] + f[v][k] \}$$

### 🚀 $O(NM)$ 复杂度证明

看似是 $O(N \cdot M^2)$，但若严格限制枚举上限为子树大小 $\min(M, sz[u])$，复杂度实为 **$O(N \cdot M)$**。
**证明要点**：在合并两棵子树（大小分别为 $sz_1, sz_2$）时，两重循环的次数为 $sz_1 \times sz_2$。这等价于从第一棵子树选一个点，从第二棵子树选一个点，这对点在它们的 LCA（即当前节点 $u$）处被处理一次。由于每一对节点有且仅有一个 LCA，总处理次数为节点对数 $O(N^2)$。当有容量限制 $M$ 时，复杂度被限制在 $O(NM)$。

---

## <Network className="inline-block mr-2" /> 3. 换根 DP (Rerooting)

当问题不仅与子树有关，还与“除子树外的部分”有关时，通常需要两遍 DFS。

### 建模步骤

1.  **第一遍 DFS (Bottom-up)**：以任意节点（如 1 号点）为根，计算子树内的贡献 $f[u]$。
2.  **第二遍 DFS (Top-down)**：从父节点 $u$ 向子节点 $v$ 转移，计算以 $v$ 为根时的全局解 $g[v]$。
    - **逻辑**：$g[v] = f[v] + \text{ContributionFrom}(u \setminus v)$。

---

## <ShieldCheck className="inline-block mr-2" /> 4. 综合练习与强化

### 练习 1：没有上司的舞会

给定一棵权值树，选出一组互不相邻的节点使权值和最大。

<details>
<summary>Check Solution (C++)</summary>

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

### 练习 2：树的直径 (Tree Diameter)

求树中任意两点间距离的最大值。

<details>
<summary>Check Solution (DP Approach)</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

const int MAXN = 100005;
vector<pair<int, int>> G[MAXN];
int d1[MAXN], d2[MAXN], ans = 0;

void dfs(int u, int fa) {
    for (auto& edge : G[u]) {
        int v = edge.first, w = edge.second;
        if (v == fa) continue;
        dfs(v, u);
        if (d1[v] + w > d1[u]) {
            d2[u] = d1[u];
            d1[u] = d1[v] + w;
        } else if (d1[v] + w > d2[u]) {
            d2[u] = d1[v] + w;
        }
    }
    ans = max(ans, d1[u] + d2[u]);
}

int main() {
    int n; cin >> n;
    for (int i = 0; i < n - 1; i++) {
        int u, v, w; cin >> u >> v >> w;
        G[u].push_back({v, w});
        G[v].push_back({u, w});
    }
    dfs(1, 0);
    cout << ans << endl;
    return 0;
}
```

</details>

### 练习 3：选课 (Tree Knapsack)

每门课有先修课（构成森林，可加虚拟根 0 变树），求选 $M$ 门课的最大得分。

<details>
<summary>Check Solution (O(NM))</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int n, m;
int f[305][305], weight[305];
vector<int> adj[305];

void dfs(int u) {
    f[u][1] = weight[u];
    for (int v : adj[u]) {
        dfs(v);
        for (int j = m + 1; j >= 1; j--) {
            for (int k = 0; k < j; k++) {
                f[u][j] = max(f[u][j], f[u][j - k] + f[v][k]);
            }
        }
    }
}

int main() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++) {
        int p; cin >> p >> weight[i];
        adj[p].push_back(i);
    }
    dfs(0);
    cout << f[0][m + 1] << endl;
    return 0;
}
```

</details>

### 练习 4：树的中心 (换根 DP)

求树中距离其他节点最远距离最小的节点（中心点）。

<details>
<summary>Check Solution (O(N))</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

const int MAXN = 100005;
const int INF = 0x3f3f3f3f;

struct Edge { int to, weight; };
vector<Edge> G[MAXN];
int d1[MAXN], d2[MAXN], p1[MAXN], up[MAXN];

void dfs_down(int u, int fa) {
    for (auto& e : G[u]) {
        if (e.to == fa) continue;
        dfs_down(e.to, u);
        if (d1[e.to] + e.weight > d1[u]) {
            d2[u] = d1[u];
            d1[u] = d1[e.to] + e.weight;
            p1[u] = e.to;
        } else if (d1[e.to] + e.weight > d2[u]) {
            d2[u] = d1[e.to] + e.weight;
        }
    }
}

void dfs_up(int u, int fa) {
    for (auto& e : G[u]) {
        if (e.to == fa) continue;
        if (p1[u] == e.to) up[e.to] = max(up[u], d2[u]) + e.weight;
        else up[e.to] = max(up[u], d1[u]) + e.weight;
        dfs_up(e.to, u);
    }
}

int main() {
    int n; cin >> n;
    for (int i = 0; i < n - 1; i++) {
        int u, v, w; cin >> u >> v >> w;
        G[u].push_back({v, w});
        G[v].push_back({u, w});
    }
    dfs_down(1, 0);
    dfs_up(1, 0);
    int min_max_dist = INF;
    for (int i = 1; i <= n; i++) {
        min_max_dist = min(min_max_dist, max(d1[i], up[i]));
    }
    cout << min_max_dist << endl;
    return 0;
}
```

</details>

---

## 延伸挑战

- [洛谷 P2014 [CTSC1997] 选课](https://www.luogu.com.cn/problem/P2014)（树上背包练习）
- [洛谷 P3478 [STA-Station]](https://www.luogu.com.cn/problem/P3478)（换根 DP 模板）
- [POJ 1655 Balancing Act](http://poj.org/problem?id=1655)（树的重心）
