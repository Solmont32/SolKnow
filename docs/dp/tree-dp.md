---
title: 树形 DP
---

import { GitMerge, Network, TreeDeciduous, ShieldCheck } from 'lucide-react';

# 树形动态规划 (Tree Dynamic Programming)

树形 DP 是在树结构上进行的动态规划。由于树本身具有天然的递归性质（每个子树都是原问题的缩影），此类问题通常通过 **深度优先遍历 (DFS)** 实现。

---

## <TreeDeciduous className="inline-block mr-2" /> 1. 基础范式

### 状态定义
状态通常与节点 $u$ 相关，如 $f[u][0/1]$ 表示以 $u$ 为根的子树中，节点 $u$ 选或不选时的最优解。

### 计算顺序
- **自底向上 (Bottom-up)**：最常见。在递归回溯时，利用子节点的状态更新当前节点。
- **自顶向下 (Top-down)**：较少见，通常用于传递父节点的信息（如换根 DP 的第二遍 DFS）。

---

## <GitMerge className="inline-block mr-2" /> 2. 经典模型：没有上司的舞会 (Independent Set on Tree)

**问题描述**：一棵有根树，每个节点有权值 $w_i$。选出一组节点，使得选中的节点之间没有直接父子关系，且权值和最大。

### 状态设计
- $f[u][0]$：不选节点 $u$ 时，子树 $u$ 的最大权值。
- $f[u][1]$：选择节点 $u$ 时，子树 $u$ 的最大权值。

### 转移方程
$$f[u][0] = \sum_{v \in son(u)} \max(f[v][0], f[v][1])$$
$$f[u][1] = w_u + \sum_{v \in son(u)} f[v][0]$$

### 复杂度
- 时间：$O(N)$。

---

## <Network className="inline-block mr-2" /> 3. 树上背包与复杂度优化

**场景**：在树上选择若干个节点满足某种约束（如体积、个数）。

### 转移方程
$$f[u][j] = \max_{v \in son(u), k \le j} \{ f[u][j-k] + f[v][k] \}$$

### 🚀 工业级优化：Size 优化
看似 $O(N \cdot M^2)$，但通过限制枚举范围为当前子树大小 $sz[u]$，可证明其复杂度为 **$O(N \cdot M)$** 或在 $M=N$ 时为 **$O(N^2)$**。
**原理**：任意一对节点只会在它们的最近公共祖先 (LCA) 处被合并一次。

```cpp
void dfs(int u) {
    sz[u] = 1; f[u][1] = w[u];
    for (int v : G[u]) {
        dfs(v);
        // 注意：j 必须逆序枚举，防止同一子树重复计算
        for (int j = min(m, sz[u] + sz[v]); j >= 1; j--) {
            for (int k = 0; k <= min(j, sz[v]); k++) {
                f[u][j] = max(f[u][j], f[u][j-k] + f[v][k]);
            }
        }
        sz[u] += sz[v];
    }
}
```

---

## <ShieldCheck className="inline-block mr-2" /> 综合练习与强化

### 练习 1：换根 DP (Tree Rerooting)
给定一棵树，求以哪个节点为根时，所有节点到根的距离之和最小。

<details>
<summary>Check Solution</summary>

**策略**：两遍 DFS。
1. **第一次 DFS**：求出以 $1$ 为根时，子树 $u$ 的大小 $sz[u]$ 和距离和 $d[1]$。
2. **第二次 DFS**：从父节点 $u$ 推导子节点 $v$。
   - 当根从 $u$ 移动到 $v$ 时：
     - 原 $v$ 子树的所有节点距离 $-1$。
     - 非 $v$ 子树的所有节点距离 $+1$。
   - $f[v] = f[u] - sz[v] + (N - sz[v])$。

```cpp
void dfs2(int u, int fa) {
    for (int v : G[u]) {
        if (v == fa) continue;
        f[v] = f[u] + n - 2 * sz[v];
        dfs2(v, u);
    }
}
```
</details>

### 练习 2：树的直径 (Diameter with DP)
求树中距离最远的两个点之间的距离。

<details>
<summary>Check Solution</summary>

**状态**：$d1[u]$ 为 $u$ 向下的最长路径，$d2[u]$ 为次长路径。
**转移**：
$$ans = \max(ans, d1[u] + d2[u])$$
在 DFS 过程中维护 $d1, d2$ 即可。
</details>

---

## 延伸挑战
- [洛谷 P2014 [CTSC1997] 选课](https://www.luogu.com.cn/problem/P2014)（树上背包典型）
- [洛谷 P1352 没有上司的舞会](https://www.luogu.com.cn/problem/P1352)
- [POJ 3140 Circuit Board](http://poj.org/problem?id=3140)（树形 DP + 平衡切分）
- [洛谷 P3478 [STA-Station]](https://www.luogu.com.cn/problem/P3478)（换根 DP 模板）
