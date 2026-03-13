---
title: 树形 DP
---

import { GitMerge, Network, TreeDeciduous, ShieldCheck, Zap, Microscope, Layers, CheckCircle2, Scaling, Code2 } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 树形动态规划 (Tree Dynamic Programming)

树形 DP 是在树结构（或可转化为树的图）上进行的动态规划。由于树具有**天然的递归性**和**子树独立性**，状态演进通常遵循从叶到根（自底向上）或从根到叶（自顶向下）的拓扑序。

---

## <Microscope className="inline-block mr-2" /> 1. 数理建模：归纳证明与验证

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

### 1.3 收敛性分析 (Convergence Analysis)

**基于拓扑序的收敛性**：
树形 DP 的计算过程是树拓扑序（Topological Sort）的逆过程。
1. **状态依赖**：在树结构中，$u$ 的解依赖于其所有子节点 $v$ 的解。
2. **有序性**：通过 DFS 的后序遍历（Post-order Traversal），我们保证了当访问 $u$ 时，其所有子树已完全收敛。
3. **复杂度收敛**：
   - **基础树形 DP**：每个节点访问一次，复杂度 $O(N)$。
   - **树上背包**：通过限制子树大小合并，复杂度收敛于 $O(NM)$。

---

## <Layers className="inline-block mr-2" /> 2. 核心技术：子树合并与换根优化

### 2.1 树上背包 (Tree Knapsack) 优化证明

**命题**：在树上背包中，若每次合并子树 $v$ 到 $u$ 时，循环上限仅为当前已处理的子树大小之和，则总复杂度为 $O(NM)$。

**证明**：考虑树中任意两点 $x, y$。它们仅在它们的最近公共祖先（LCA）处被同时遍历并合并。因此，合并操作的总次数等于树中点对的总数 $O(N^2)$。当有容量限制 $M$ 时，复杂度收敛于 $O(NM)$。

### 2.2 换根 DP (Rerooting / Up-and-Down)

当问题需要求出以**每个点**为根时的某个属性时。
- **Down Phase**: 自底向上，计算子树内的贡献。
- **Up Phase**: 自顶向下，将父节点上方及兄弟子树的贡献传递给子节点。

---

## <ShieldCheck className="inline-block mr-2" /> 3. 教材化典型例题

### 例题 1：树的重心 (Centroid of a Tree)

**定义**：删除该点后，剩余连通块中最大点数最小。
**推导**：$size[u]$ 表示以 $u$ 为根的子树大小。删除 $u$ 后，剩余部分分为：$u$ 的所有子树 $v$（大小为 $size[v]$）和 $u$ 的上方部分（大小为 $n - size[u]$）。

<details>
<summary>Check Solution (C++)</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

const int MAXN = 100005;
vector<int> adj[MAXN];
int sz[MAXN], ans = 1e9, n;

void dfs(int u, int p) {
    sz[u] = 1;
    int max_part = 0;
    for (int v : adj[u]) {
        if (v == p) continue;
        dfs(v, u);
        sz[u] += sz[v];
        max_part = max(max_part, sz[v]);
    }
    max_part = max(max_part, n - sz[u]);
    ans = min(ans, max_part);
}
```

</details>

### 例题 2：树上最长路径 (Tree Diameter)

**状态定义**：$d1[u]$ 为以 $u$ 为根的子树中到叶子的最长路径，$d2[u]$ 为次长路径（不在同一子树）。
**方程**：直径 = $\max_{u} \{ d1[u] + d2[u] \}$。

<details>
<summary>Check Solution (C++)</summary>

```cpp
void dfs(int u, int p) {
    d1[u] = d2[u] = 0;
    for (int v : adj[u]) {
        if (v == p) continue;
        dfs(v, u);
        int d = d1[v] + 1;
        if (d > d1[u]) { d2[u] = d1[u]; d1[u] = d; }
        else if (d > d2[u]) d2[u] = d;
    }
    max_d = max(max_d, d1[u] + d2[u]);
}
```

</details>

---

## <Code2 className="inline-block mr-2" /> 4. 课后强化练习

### 练习 1：战略游戏 (Minimal Vertex Cover on Tree)
选最少的点覆盖所有边。

<details>
<summary>Check Analysis & Solution</summary>

**状态**：$f[u][0]$ 表示不选 $u$，$f[u][1]$ 表示选 $u$。
**转移**：
- $f[u][0] = \sum f[v][1]$ (不选 $u$ 则其所有子节点必须选)
- $f[u][1] = 1 + \sum \min(f[v][0], f[v][1])$

```cpp
void dfs(int u, int p) {
    f[u][0] = 0; f[u][1] = 1;
    for (int v : adj[u]) {
        if (v == p) continue;
        dfs(v, u);
        f[u][0] += f[v][1];
        f[u][1] += min(f[v][0], f[v][1]);
    }
}
```

</details>

### 练习 2：STA-Station (换根 DP 模板)
给定一棵树，求以哪个点为根时，所有点的深度之和最大。

<details>
<summary>Check Rerooting Logic</summary>

1. 第一次 DFS 求出以 1 为根的深度和 $f[1]$ 及各子树大小 $sz[u]$。
2. 第二次 DFS 换根：若从 $u$ 换到子节点 $v$，则 $v$ 的子树深度全部减 1，非 $v$ 子树部分深度全部加 1。
   $f[v] = f[u] - sz[v] + (n - sz[v]) = f[u] + n - 2 \cdot sz[v]$。

</details>

---

## <Scaling className="inline-block mr-2" /> 5. 复杂度与优化边界

| 技术 | 复杂度 | 核心场景 | 关键点 |
| :--- | :--- | :--- | :--- |
| **基础树形 DP** | $O(N)$ | 子树贡献独立 | 后序遍历 |
| **树上背包** | $O(NM)$ | 资源分配 | 循环上限优化 |
| **换根 DP** | $O(N)$ | 全局根属性查询 | 二次扫描 (Up-and-Down) |
| **树上基环树 DP** | $O(N)$ | 环加树结构 | 断环 + 两次 DP |

---

## 延伸挑战

- [洛谷 P1352 没有上司的舞会](https://www.luogu.com.cn/problem/P1352)
- [洛谷 P2014 [CTSC1997] 选课](https://www.luogu.com.cn/problem/P2014)
- [AtCoder DP Contest V - Subtree](https://atcoder.jp/contests/dp/tasks/dp_v)
