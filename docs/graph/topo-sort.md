---
title: 拓扑排序与依赖建模
---

import { ListOrdered, GitMerge, CheckCircle, AlertTriangle, Zap, ArrowRight, Activity, LayoutList } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';

# <ListOrdered className="inline-block mr-2 mb-1 text-blue-600" /> 拓扑排序 (Topological Sort)

拓扑排序是处理**偏序关系 (Partial Order)** 的核心算法。在一个有向无环图 (DAG) 中，拓扑排序能将所有节点排成一个线性序列，使得对于每一条有向边 $(u, v)$，$u$ 在序列中都出现在 $v$ 之前。

---

## 一、 <GitMerge className="inline-block mr-2 mb-1 text-blue-500" /> 数学定义与存在性

### 1. 偏序关系
给定集合 $V$ 上的二元关系 $\le$，若满足：
- **自反性**：$a \le a$。
- **反对称性**：若 $a \le b$ 且 $b \le a$，则 $a = b$。
- **传递性**：若 $a \le b$ 且 $b \le c$，则 $a \le c$。
则称 $\le$ 为 $V$ 上的偏序。拓扑排序的任务是寻找一个**全序 (Total Order)**，使其与给定的偏序兼容。

### 2. 存在性定理
> **定理**：一个有向图 $G$ 存在拓扑排序，当且仅当 $G$ 是一个**有向无环图 (DAG)**。

---

## 二、 <Activity className="inline-block mr-2 mb-1 text-green-500" /> 核心算法：Kahn 算法

Kahn 算法采用“入度减量”的贪心策略，是目前最直观且高效的实现方式。

### 1. 算法逻辑
1. 初始化所有节点的入度 $deg^-(v)$。
2. 将所有 $deg^-(v) = 0$ 的节点存入队列 $Q$。
3. 当 $Q$ 非空时：
   - 取出队头 $u$，加入拓扑序列。
   - 遍历 $u$ 的邻接点 $v$，执行 $deg^-(v) \gets deg^-(v) - 1$。
   - 若减量后 $deg^-(v) = 0$，将 $v$ 加入队列。

### 2. 正确性证明
- **无环性**：若图中有环，环上所有点的入度在任何时刻都不可能归零，因此环上的点永远不会入队。
- **合法性**：节点 $v$ 入队的前提是其所有前驱节点 $u$ 已被取出并加入序列，保证了 $(u, v)$ 的拓扑约束。

<ComplexityAnalysis time="O(V + E)" space="O(V)" />

### 3. 字典序最小拓扑序
若需输出字典序最小的拓扑序，只需将 Kahn 算法中的 `queue` 替换为 `priority_queue<int, vector<int>, greater<int>>`。

---

## 三 <LayoutList className="inline-block mr-2 mb-1 text-purple-500" /> 建模进阶：DAG 上的动态规划

拓扑序是 DAG DP 的天然计算顺序。

### 关键路径与最长路
在项目管理中，计算所有任务完成的最早时间：
$f[v] = \max_{(u, v) \in E} \{f[u] + weight(u, v)\}$
其中 $f[v]$ 表示完成任务 $v$ 的最短可能时间。必须按拓扑序计算 $f[v]$。

---

## 四 <Zap className="inline-block mr-2 mb-1 text-amber-500" /> 工业级 C++ 实现

```cpp
#include <vector>
#include <queue>

using namespace std;

/**
 * @brief 拓扑排序实现
 * @return 返回拓扑序；若存在环则返回空 vector
 */
vector<int> topological_sort(int n, const vector<vector<int>>& adj) {
    vector<int> in_degree(n + 1, 0);
    for (int u = 1; u <= n; ++u) {
        for (int v : adj[u]) in_degree[v]++;
    }

    queue<int> q;
    for (int i = 1; i <= n; ++i) {
        if (in_degree[i] == 0) q.push(i);
    }

    vector<int> topo_order;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        topo_order.push_back(u);

        for (int v : adj[u]) {
            if (--in_degree[v] == 0) {
                q.push(v);
            }
        }
    }

    if (topo_order.size() != n) return {}; // 存在环
    return topo_order;
}
```

---

## 五、 配套练习 (折叠解答)

### 练习 1：判定唯一性
如何判定一个 DAG 的拓扑序是否唯一？

<details>
<summary>点击查看解析</summary>

**判定条件**：
在 Kahn 算法的执行过程中，**任何时刻队列中最多只有一个节点**。
如果某一时刻队列中有超过一个节点，说明这些节点之间没有相互约束，它们的相对顺序可以互换，从而导致拓扑序不唯一。

</details>

### 练习 2：最长路径计算
给定一个 DAG，边权代表任务时长。求从起点到终点的最长路径。

<details>
<summary>点击查看解析</summary>

**算法流程**：
1. 求出 DAG 的拓扑序。
2. 初始化 $dist[start] = 0$，其余为 $-\infty$。
3. 按拓扑序遍历节点 $u$：
   - 遍历 $u$ 的出边 $(u, v, w)$：
   - 更新 $dist[v] = \max(dist[v], dist[u] + w)$。
**复杂度**：$O(V+E)$。

</details>

### 练习 3：反向拓扑序与字典序最大
要求一个字典序最大的拓扑序，应该如何修改算法？

<details>
<summary>点击查看解析</summary>

**方案**：
将 `priority_queue` 的比较函数改为 `less<int>`（大根堆）。每次取出当前入度为 0 的节点中编号最大的一个。
注意：如果是要求“在保证后面点尽量靠后”的情况下字典序最小（常用于某些特殊建模），可能需要建反图求反向字典序最大拓扑序再翻转。

</details>
