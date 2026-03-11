---
title: 二分图匹配与覆盖理论
---

import { GitMerge, Zap, Activity, ShieldCheck, Users, Link, Target, Layout } from 'lucide-react';

# <GitMerge className="inline-block mr-2 mb-1 text-pink-500" /> 二分图匹配 (Bipartite Matching)

二分图匹配是组合数学与图论的交叉点。它不仅描述了“一对一”的分配问题，还通过 **Kőnig 定理** 揭示了匹配、覆盖与独立集之间的深刻对偶性。

---

## 一、 <Target className="inline-block mr-2 mb-1 text-blue-500" /> 核心定义与判定

### 1. 二分图 (Bipartite Graph)
一个图 $G=(V, E)$ 是二分图，当且仅当其顶点集可划分为两个独立集 $U, V$。
- **判定准则**：不存在长度为奇数的环（奇环）。
- **算法判定**：可以使用 BFS/DFS 进行**二染色 (2-coloring)**。

### 2. 匹配 (Matching) 与 增广路 (Augmenting Path)
- **匹配**：不共用端点的边集 $M \subseteq E$。
- **增广路**：连接两个未匹配点的交替路径。
- **Berge 定理**：$M$ 是最大匹配 $\iff$ 不存在关于 $M$ 的增广路。

---

## 二 <Activity className="inline-block mr-2 mb-1 text-pink-400" /> 算法实现：从匈牙利到 Dinic

### 1. 匈牙利算法 (Kuhn's Algorithm)
基于 DFS 寻找增广路。复杂度 $O(VE)$。适合中小规模稀疏图。

```cpp
vector<int> match; // match[v] = u 表示右侧点 v 匹配左侧点 u
vector<bool> vis;

bool dfs(int u, const vector<vector<int>>& g) {
    for (int v : g[u]) {
        if (vis[v]) continue;
        vis[v] = true;
        if (match[v] == -1 || dfs(match[v], g)) {
            match[v] = u;
            return true;
        }
    }
    return false;
}
```

### 2. 网络流优化 (Hopcroft-Karp / Dinic)
二分图最大匹配可以转化为单位容量网络的最大流问题。
- **Dinic 复杂度**：$O(E\sqrt{V})$。对于大规模二分图，应优先使用 [Dinic 算法](./network-flow)。

---

## 三 <Layout className="inline-block mr-2 mb-1 text-purple-500" /> Kőnig 定理与对偶问题

在二分图中，以下四个指标具有数学上的等价或互补关系：

1. **最大匹配数 = 最小顶点覆盖数**
   - **顶点覆盖**：选取最少的点，使得每条边都至少有一个端点被选中。
2. **最大独立集数 = 总点数 - 最大匹配数**
   - **独立集**：选取最多的点，使得任意两点间没有边。
3. **最小边覆盖数 = 总点数 - 最大匹配数**
   - **边覆盖**：选取最少的边，使得每个点都被覆盖。
4. **DAG 最小路径覆盖 = 总点数 - 拆点二分图最大匹配数**

---

## 四 <Link className="inline-block mr-2 mb-1 text-amber-500" /> 经典建模案例

### 1. 任务分配问题
有 $N$ 项任务和 $M$ 个工人，每个工人只能胜任特定任务。求最多能完成多少任务。
- **模型**：工人为左侧点，任务为右侧点，胜任关系连边。求最大匹配。

### 2. 棋盘覆盖问题
在 $N \times M$ 的棋盘上放置 $1 \times 2$ 的骨牌。
- **模型**：对棋盘进行黑白染色。相邻黑白格连边。最大匹配数即为最多放置的骨牌数。

### 3. 最小点覆盖应用：矩阵“打靶”
给定矩阵，某些格点有目标。每次可以消去一行或一列的所有目标。求最少操作次数。
- **模型**：行作为左侧点，列作为右侧点，目标格 $(r, c)$ 为边 $(r, c)$。最少操作数 = 最小顶点覆盖 = 最大匹配。

---

## 五、 配套练习 (折叠解答)

### 练习 1：完美匹配判定
霍尔定理 (Hall's Theorem) 是判断二分图是否存在完美匹配的充分必要条件。请简述其内容。

<details>
<summary>查看解析</summary>

**内容**：
对于二分图 $G=(U \cup V, E)$，存在覆盖 $U$ 的匹配当且仅当对于 $U$ 的任意子集 $S \subseteq U$，其邻域 $N(S)$ 满足 $|N(S)| \ge |S|$。
**直观理解**：任何一组人去挑工作，他们能挑的工作种类总数必须不小于他们的人数。

</details>

### 练习 2：最小路径覆盖
为什么 DAG 的最小路径覆盖可以用二分图匹配解决？

<details>
<summary>查看解析</summary>

**分析**：
1. 每个顶点 $u$ 拆为 $u_{out}$ 和 $u_{in}$。
2. 原图边 $(u, v)$ 对应匹配边 $(u_{out}, v_{in})$。
3. 初始每个点都是一条路径（共 $n$ 条）。
4. 每增加一个匹配 $(u_{out}, v_{in})$，意味着将 $u$ 所在的路径和 $v$ 所在的路径合并，路径数减少 1。
5. 因此，最小路径数 = $n$ - 最大匹配数。

</details>
