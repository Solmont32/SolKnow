---
title: 二分图匹配与覆盖理论
---

import { GitMerge, Zap, Activity, ShieldCheck, Users, Link, Target, Layout, Sigma, CheckCircle } from 'lucide-react';
import { ComplexityAnalysis } from '@site/src/components/ComplexityAnalysis';
import { KnowledgeCard } from '@site/src/components/KnowledgeCard';

# <GitMerge className="inline-block mr-2 mb-1 text-pink-500" /> 二分图理论 (Bipartite Graph Theory)

二分图匹配是组合数学与图论的交叉核心。它不仅描述了“一对一”的资源分配，还通过一系列对偶定理揭示了匹配、覆盖与独立集之间的深刻联系。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 核心定义与判定

### 1. 二分图 (Bipartite Graph)
一个图 $G=(V, E)$ 是二分图，当且仅当其顶点集可划分为两个不相交的独立集 $U$ 和 $V$。
- **判定准则**：图 $G$ 是二分图 $\iff$ 图中不存在长度为奇数的环（奇环）。
- **算法判定**：使用 BFS/DFS 进行**二染色** (2-coloring)，若染色过程中出现冲突，则非二分图。

### 2. 匹配 (Matching) 与 增广路 (Augmenting Path)
- **匹配**：一个边集 $M \subseteq E$，使得其中任意两条边都没有公共端点。
- **交替路 (Alternating Path)**：始于未匹配点，边在 $M$ 和 $E \setminus M$ 中交替出现的路径。
- **增广路**：连接两个未匹配点的交替路。
- **Berge 定理**：匹配 $M$ 是 $G$ 的最大匹配，当且仅当 $G$ 中不存在关于 $M$ 的增广路。

---

## 二、 <Activity className="inline-block mr-2 mb-1 text-pink-400" /> 核心算法

| 算法 | 机制 | 复杂度 | 适用场景 |
| :--- | :--- | :--- | :--- |
| **匈牙利算法 (Kuhn's)** | DFS 寻找增广路 | $O(VE)$ | 稀疏图、中小规模 |
| **Hopcroft-Karp** | BFS + DFS 多路增广 | $O(E\sqrt{V})$ | 大规模二分图 |
| **网络流 (Dinic)** | 转化为单位容量最大流 | $O(E\sqrt{V})$ | 通用性强 |

---

## 三、 <Layout className="inline-block mr-2 mb-1 text-purple-500" /> Kőnig 定理与四项对偶指标

在二分图中，以下指标构成了完美的对偶关系：

1. **最大匹配数 = 最小顶点覆盖数**
   - *最小顶点覆盖*：选取最少的点，使得每条边至少有一个端点被选中。
2. **最大独立集数 = 总点数 - 最大匹配数**
   - *最大独立集*：选取最多的点，使得任意两点间没有边。
3. **最小边覆盖数 = 总点数 - 最大匹配数**
   - *最小边覆盖*：选取最少的边，使得每个点都被覆盖（前提：无孤立点）。
4. **DAG 最小路径覆盖 = 总点数 - 拆点二分图最大匹配数**

---

## 四、 <Link className="inline-block mr-2 mb-1 text-amber-500" /> 工业级建模范式

### 1. 最小路径覆盖 (Minimum Path Cover)
在 DAG 中用最少的互不相交的路径覆盖所有点。
**转化**：每个点 $i$ 拆为 $i_{out}$ 和 $i_{in}$，原边 $(u, v)$ 对应 $u_{out} \to v_{in}$。
**结果**：路径数 = $n$ - 最大匹配数。

### 2. 最大独立权值集
在二分图中，点有权值，求选出一组独立点使得权值和最大。
**转化**：总权值 - 最小权值点覆盖（转化为最小割）。

---

## 五、 <Users className="inline-block mr-2 mb-1 text-indigo-500" /> 稳定婚姻问题 (Gale-Shapley Algorithm)

**问题**：$N$ 男 $N$ 女，每人对异性有偏好排名。求一种稳定匹配，使得不存在“私奔对”。
**算法**：
1. 每一轮中，所有未匹配的男子向其名单上最喜欢的女子求婚。
2. 女子在当前求婚者和原配中选择更优的一个，暂时订婚。
3. 被拒绝的男子继续向名单下一个求婚。
**性质**：该算法必然在 $O(N^2)$ 时间内结束，且对求婚方（男子）是最优的。

---

## 六、 工业级 C++ 实现 (匈牙利算法)

```cpp
#include <vector>
#include <cstring>

using namespace std;

class Hungary {
    int n, m; // 左右侧点数
    vector<vector<int>> adj;
    vector<int> match;
    vector<bool> vis;

public:
    Hungary(int _n, int _m) : n(_n), m(_m), adj(n + 1), match(m + 1, 0), vis(m + 1) {}

    void add_edge(int u, int v) { adj[u].push_back(v); }

    bool dfs(int u) {
        for (int v : adj[u]) {
            if (!vis[v]) {
                vis[v] = true;
                if (!match[v] || dfs(match[v])) {
                    match[v] = u;
                    return true;
                }
            }
        }
        return false;
    }

    int max_matching() {
        int res = 0;
        for (int i = 1; i <= n; ++i) {
            fill(vis.begin(), vis.end(), false);
            if (dfs(i)) res++;
        }
        return res;
    }
};
```

---

## 七、 配套练习 (折叠解答)

### 练习 1：完美匹配与 Hall 定理
Hall 结婚定理给出了二分图存在覆盖 $U$ 侧匹配的充要条件是什么？

<details>
<summary>点击查看解析</summary>

**Hall 定理**：
二分图 $G=(U \cup V, E)$ 存在覆盖 $U$ 的匹配 $\iff$ 对于 $U$ 的任意子集 $S \subseteq U$，其邻域 $N(S)$ 满足 $|N(S)| \ge |S|$。
**应用**：常用于存在性证明。

</details>

### 练习 2：最小路径覆盖 (可相交)
如果在 DAG 中，路径可以经过同一个点多次，如何求最小路径覆盖？

<details>
<summary>点击查看解析</summary>

**方案**：
1. 先对原图求一次 **Floyd 传递闭包**（即若 $u$ 可达 $v$，则连一条边 $u \to v$）。
2. 在新图上运行标准的最小路径覆盖（不可相交）。
3. **原理**：在新图上一条跨越中间点的边代表了原图中的一段路径，从而规避了相交问题。

</details>

### 练习 3：棋盘上的骑士
在 $n \times m$ 的棋盘上放置最多的国际象棋“马”，使得它们互不攻击。

<details>
<summary>点击查看解析</summary>

**分析**：
1. 棋盘格子黑白染色。马的攻击范围必然是从黑格到白格。
2. 建立二分图：黑格为左侧，白格为右侧，互为攻击关系的格子连边。
3. **目标**：求最大独立集 = 总格子数 - 最大匹配数。

</details>
