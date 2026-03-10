---
title: 树形 DP
---

# 树形动态规划 (Tree Dynamic Programming)

树形动态规划是建立在**树结构**（具有 $N$ 个节点 $N-1$ 条边的无向连通图）上的 DP。其核心范式是通过 **DFS (深度优先搜索)**，利用子树的统计信息来推导当前节点的信息。

---

## 核心建模范式

**状态定义**：
$f[u][\dots]$ 表示以 $u$ 为根的子树的最优解或特征。

**计算拓扑序**：
计算 $u$ 的状态之前，必须先递归计算其所有子节点 $v$ 的状态（**自底向上**）。

```cpp
void dfs(int u, int p) {
    // 1. 初始化 f[u]
    for (int v : adj[u]) {
        if (v == p) continue; // 避免回跳父节点
        dfs(v, u);
        // 2. 利用 f[v] 更新 f[u]
    }
}
```

---

## 1. 经典模型：没有上司的舞会 (MIS on Tree)

给定一棵树，每个点有权值 $r_i$。选出一组点，使得任意两点不相邻。
**状态定义**：
- $f[u][0]$：不选点 $u$ 的最大价值。
- $f[u][1]$：选取点 $u$ 的最大价值。
**转移方程**：
$$
\begin{aligned}
f[u][0] &= \sum_{v \in son(u)} \max(f[v][0], f[v][1]) \\
f[u][1] &= \sum_{v \in son(u)} f[v][0] + r_u
\end{aligned}
$$

---

## 2. 经典模型：树上背包 (Tree Knapsack)

在树上选 $K$ 个节点，且选取某节点必选其父节点。
**转移方程**：
$$f[u][j] = \max_{0 \le k < j} \{ f[u][j-k] + f[v][k] \}$$
**复杂度分析**：虽然看似 $O(NK^2)$，但通过对子树大小 `sz[u]` 进行上界限制，复杂度可严格证明为 **$O(NK)$**。

---

## 3. 高阶技巧：换根 DP (Re-rooting / In-out DP)

用于解决“需要分别以每个点为根计算某种全局信息”的问题。
**标准流程**：
1. **第一次 DFS**：任选一根（如 1），计算子树内的信息（自底向上）。
2. **第二次 DFS**：从父节点 $u$ 向子节点 $v$ 转移时，利用 $u$ 已知的全局信息和 $v$ 的子树信息，推导出 $v$ 的“子树外”信息（自顶向下）。

---

## 综合练习与强化

### 练习 1：树的直径 (Diameter)
求树中距离最远的两个点之间的距离。

<details>
<summary>Check Solution</summary>

**解法一：两次 DFS/BFS**
1. 随机选 $P$，找到距离 $P$ 最远的 $Q$。
2. 找到距离 $Q$ 最远的 $R$。$QR$ 即为直径。

**解法二：树形 DP**
维护 $d1[u]$ (最长路) 和 $d2[u]$ (次长路)。
$ans = \max(ans, d1[u] + d2[u])$。
</details>

### 练习 2：树的重心 (Centroid)
找到一个点，使得删除该点后最大连通块的规模最小。

<details>
<summary>Check Solution</summary>

DFS 维护 $sz[u]$。
对点 $u$，其连通块大小为：$\{\text{all } sz[v], N - sz[u]\}$。
求这些最大值中的最小值。
</details>

### 练习 3：全源树距离之和 (换根典型)
对每个点 $u$，计算 $\sum_{v=1}^N dist(u, v)$。

<details>
<summary>Check Solution</summary>

1. $f[u]$：$u$ 到其子树内点的距离和。$f[u] = \sum (f[v] + sz[v])$。
2. $g[u]$：$u$ 到其子树外点的距离和。
   当从 $u \to v$ 时：$g[v] = g[u] + f[u] - (f[v] + sz[v]) + (N - sz[v])$。
   简化后：$g[v] = \text{GlobalAns}(u) - sz[v] + (N - sz[v])$。
</details>

---

## 延伸挑战
- [洛谷 P1352 没有上司的舞会](https://www.luogu.com.cn/problem/P1352)
- [洛谷 P3478 [POI2008] STA-Station](https://www.luogu.com.cn/problem/P3478)（换根入门）
- [Codeforces 1324F Maximum White Subtree](https://codeforces.com/contest/1324/problem/F)
