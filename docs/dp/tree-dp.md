---
title: 树形 DP
---

import { GitMerge, Network, TreeDeciduous, ShieldCheck, Zap, Microscope, Layers, CheckCircle2 } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 树形动态规划 (Tree Dynamic Programming)

树形 DP 是在树结构（或可转化为树的图）上进行的动态规划。由于树具有**天然的递归性**和**子树独立性**，状态演进通常遵循从叶到根（自底向上）或从根到叶（自顶向下）的拓扑序。

---

## <Microscope className="inline-block mr-2" /> 1. 形式化建模：归纳证明与验证

### 1.1 基于拓扑序的归纳证明 (Induction Proof)

**命题**：对于树 $T$，通过 DFS 后序遍历依次求解子树状态，可得到根节点的全局最优解。

**证明要点**：
1.  **基础步 (Base Case)**：叶子节点没有子树，其状态可直接由定义得出。
2.  **归纳步 (Inductive Step)**：假设节点 $u$ 的所有子节点 $v \in son(u)$ 引导的子树 $T_v$ 均已求得最优解。由于 $T_v$ 之间仅通过 $u$ 相连且无环，各子树的最优决策互不干扰。因此，通过合并这些已知的最优子解，可以构造出以 $u$ 为根的子树的最优解。

### 1.2 无后效性 (No-after-effect) 逻辑验证

**验证准则**：节点 $u$ 的决策仅受其父节点或子节点状态的影响，而与树中非邻接节点的具体路径无关。

<div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
  <p className="font-bold flex items-center"><CheckCircle2 className="mr-2 text-blue-500" /> 验证实例：树上最大独立集</p>
  <p>在决定是否选取节点 $u$ 时，我们只需知道其所有直接子节点 $v$ 是否被选取的贡献。一旦 $f[u][0/1]$ 确定，在计算 $u$ 的父节点状态时，无需再回溯 $u$ 的子孙节点是如何被选取的。这证明了状态在拓扑序上的封闭性。</p>
</div>

---

## <Layers className="inline-block mr-2" /> 2. 状态转移方程的导出

树形 DP 的方程核心在于**子树信息的合并**。

### 2.1 独立集/覆盖类 (Independent Set)
- $f[u][0] = \sum_{v \in son(u)} \max(f[v][0], f[v][1])$ (不选 $u$)
- $f[u][1] = w_u + \sum_{v \in son(u)} f[v][0]$ (选 $u$)

### 2.2 树上背包类 (Tree Knapsack)
本质上是对每个节点 $u$ 的子树进行一次物品为子树、容量为 $M$ 的分组背包：
$$f[u][j] = \max_{v \in son(u)} \{ \max_{k \le j} (f[u][j-k] + f[v][k]) \}$$
*注意*：必须倒序遍历容量 $j$ 以确保每个子树只被选择一次。

---

## <ShieldCheck className="inline-block mr-2" /> 3. 换根 DP (Rerooting / Up-and-Down)

当问题需要求出以**每个点**为根时的某个属性（如到其他点的最大距离）时，单次 DFS 不够。

**推导范式**：
1.  **Down Phase**: 计算子树贡献 $down[u]$。
2.  **Up Phase**: 将父节点来自“上方”的贡献 $up[v]$ 传递给子节点 $v$。
    $$up[v] = \text{combine}(up[u], \text{sibling\_contribution}(u, v))$$

---

## <Network className="inline-block mr-2" /> 4. 综合练习与严谨实现

### 练习 1：没有上司的舞会 (经典状态设计)

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

const int MAXN = 6005;
int f[MAXN][2], w[MAXN];
vector<int> adj[MAXN];

/**
 * @brief Post-order DFS for Tree DP
 * f[u][1]: Select u, f[u][0]: Do not select u
 */
void dfs(int u) {
    f[u][1] = w[u];
    f[u][0] = 0;
    for (int v : adj[u]) {
        dfs(v);
        f[u][0] += max(f[v][0], f[v][1]);
        f[u][1] += f[v][0];
    }
}
```

</details>

### 练习 2：树上背包优化 (O(NM))

<details>
<summary>Check Solution (Size-constrained DP)</summary>

```cpp
/**
 * @brief Optimized Tree Knapsack
 * The complexity is O(NM) because each pair of nodes 
 * is processed exactly once at their LCA.
 */
int sz[MAXN];
void dfs(int u, int m) {
    sz[u] = 1;
    f[u][1] = w[u];
    for (int v : adj[u]) {
        dfs(v, m);
        for (int j = min(m, sz[u] + sz[v]); j >= 1; j--) {
            for (int k = 1; k <= sz[v] && k < j; k++) {
                f[u][j] = max(f[u][j], f[u][j-k] + f[v][k]);
            }
        }
        sz[u] += sz[v];
    }
}
```

</details>

---

## 延伸挑战

- [洛谷 P1352 没有上司的舞会](https://www.luogu.com.cn/problem/P1352)
- [洛谷 P2014 [CTSC1997] 选课](https://www.luogu.com.cn/problem/P2014)
- [AtCoder DP Contest V - Subtree (换根 DP 进阶)](https://atcoder.jp/contests/dp/tasks/dp_v)
