---
title: 树形 DP
---

import { Microscope, Zap, Target, Activity, ShieldCheck } from 'lucide-react';

# 树形动态规划 (Tree Dynamic Programming)

树形动态规划是建立在**树结构**（具有 $N$ 个节点 $N-1$ 条边的无向连通图）上的 DP。其核心范式是通过 **DFS (深度优先搜索)**，利用子树的统计信息来推导当前节点的信息，体现了“局部子树最优推导全局最优”的思想。

---

## <Microscope className="inline-block mr-2" /> 核心建模范式

### 1. 状态定义 (State Representation)
$f[u][\dots]$ 表示以 $u$ 为根的子树在满足某些约束下的最优解。
- **自底向上 (Bottom-up)**：通过 DFS 回溯时更新父节点。
- **自顶向下 (Top-down)**：通常用于换根 DP 或下传某种全局约束。

### 2. 计算拓扑序 (Topology)
计算 $u$ 的状态之前，必须先递归计算其所有子节点 $v \in son(u)$ 的状态。

---

## <Zap className="inline-block mr-2" /> 树上背包 (Tree Knapsack) 复杂度证明

在树上进行类似背包的选择（如选 $K$ 个点且满足父子关系约束），转移方程通常为：
$$f[u][j] = \max_{0 \le k < j} \{ f[u][j-k] + f[v][k] \}$$

#### 🚀 严谨证明：为什么是 $O(NK)$？
虽然外层两层循环看似 $O(NK^2)$，但若我们限制枚举上限为 $\min(sz[u], K)$ 和 $\min(sz[v], K)$：
1. **组合数学视角**：该过程本质上是在枚举子树 $v$ 中的点对与子树 $u$ 已扫描过的点对之间的组合。
2. **点对贡献**：任意两个点只会在它们的 **LCA (最近公共祖先)** 处被合并计算一次。
3. **结论**：总复杂度严格等于点对的总数 $O(N^2)$。若有 $K$ 的限制，则为 **$O(NK)$**。

---

## <Target className="inline-block mr-2" /> 高阶技巧：换根 DP (Re-rooting)

用于解决“需要分别以每个点为根计算某种全局信息”的问题。

### 标准双检流程 (Two-Pass DFS)
1. **Pass 1 (Down-to-Up)**：任选一根（如点 1），计算每个节点子树内部的信息 $f_{in}[u]$。
2. **Pass 2 (Up-to-Down)**：从父节点 $u$ 向子节点 $v$ 转移，利用 $u$ 的全局信息推导出 $v$ 的“外部”信息 $f_{out}[v]$。
   - $v$ 的全局最优 = $\text{merge}(f_{in}[v], f_{out}[v])$。

---

## <Activity className="inline-block mr-2" /> 复杂度矩阵

| 模式 | 状态空间 | 转移开销 | 总时间复杂度 | 适用场景 |
| :--- | :--- | :--- | :--- | :--- |
| **基础树形 DP** | $O(N)$ | $O(\text{deg}(u))$ | $O(N)$ | MIS, 树的直径, 树的重心 |
| **树上背包** | $O(NK)$ | $O(K)$ (均摊) | $O(NK)$ | 依赖关系背包, 选 $K$ 个点 |
| **换根 DP** | $O(N)$ | $O(1)$ | $O(N)$ | 全源距离之和, 离心率 |

---

## <ShieldCheck className="inline-block mr-2" /> 综合练习与强化

### 练习 1：没有上司的舞会 (MIS on Tree)
选出一组点，使得任意两点不相邻。

<details>
<summary>Check Solution</summary>

- **状态**：$f[u][0]$ (不选 $u$), $f[u][1]$ (选 $u$)。
- **转移**：
  - $f[u][0] = \sum \max(f[v][0], f[v][1])$
  - $f[u][1] = \sum f[v][0] + val[u]$
</details>

### 练习 2：全源树距离之和 (Re-rooting Classic)
对每个点 $u$，计算 $\sum_{v=1}^N dist(u, v)$。

<details>
<summary>Check Solution</summary>

1. **DFS 1**：$f[u] = \sum_{v \in sub(u)} dist(u, v)$。
   $f[u] = \sum (f[v] + sz[v])$。
2. **DFS 2**：设 $g[u]$ 为 $u$ 到全局点的距离和。
   从 $u \to v$ 转移时：$g[v] = g[u] - sz[v] + (N - sz[v])$。
   *解释：向 $v$ 移动一步，离 $v$ 的子树近了 $sz[v]$，离其他点远了 $N-sz[v]$。*
</details>

### 练习 3：战略游戏 (Minimal Vertex Cover)
每条边至少有一个端点被选中，求最少选中点数。

<details>
<summary>Check Solution</summary>

- **状态**：$f[u][0/1]$。
- **转移**：
  - $f[u][0] = \sum f[v][1]$（当前点不选，子节点必须全选）
  - $f[u][1] = \sum \min(f[v][0], f[v][1]) + 1$
</details>

---

## 延伸挑战
- [洛谷 P1352 没有上司的舞会](https://www.luogu.com.cn/problem/P1352)
- [洛谷 P3478 [POI2008] STA-Station](https://www.luogu.com.cn/problem/P3478)（换根入门）
- [Codeforces 1324F Maximum White Subtree](https://codeforces.com/contest/1324/problem/F)
- [洛谷 P2014 [CTSC1997] 选课](https://www.luogu.com.cn/problem/P2014)（树上背包典型）
