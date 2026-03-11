---
title: 图的遍历与基础搜索
---

import { Share2, Zap, Search, Waypoints, Activity, Compass } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';

# <Share2 className="inline-block mr-2 mb-1 text-blue-500" /> 图的遍历 (Traversal)

图的遍历是所有图论算法的基础。通过深度优先搜索 (DFS) 或广度优先搜索 (BFS)，我们能系统地探测图的拓扑结构，发现连通块，并寻找特定路径。

---

## 一、 <Search className="inline-block mr-2 mb-1 text-blue-400" /> 深度优先搜索 (DFS)

### 1. 原理与哲学

DFS 遵循“不撞南墙不回头”的贪心策略。它递归地访问每一个邻接点，直到到达叶子节点或已访问过的节点，然后回溯尝试其他分支。

### 2. 特性分析

<ComplexityAnalysis time="O(V + E)" space="O(V)" note="空间开销取决于递归深度" />

- **典型应用**：Tarjan 算法、拓扑排序（后序遍历）、连通分量计数、2-SAT。

---

## 二、 <Waypoints className="inline-block mr-2 mb-1 text-blue-400" /> 广度优先搜索 (BFS)

### 1. 原理与扩张

BFS 遵循“逐层波及”的策略。从起点开始，先访问距离为 1 的所有点，再访问距离为 2 的所有点。通常借助于**队列 (Queue)** 实现。

### 2. 最短路性质 (Optimal Property)

> **定理**：在无权图（或等权图）中，BFS 首次到达某个节点 $v$ 时，路径即为从起点到 $v$ 的最短路径。

### 3. 特性分析

<ComplexityAnalysis time="O(V + E)" space="O(V)" note="空间开销取决于最大层宽度" />

---

## 三、 <Activity className="inline-block mr-2 mb-1 text-green-500" /> 工业级 C++ 实现

```cpp
#include <vector>
#include <queue>

using namespace std;

// DFS 递归版本
void dfs(int u, const vector<vector<int>>& adj, vector<bool>& vis) {
    vis[u] = true;
    for (int v : adj[u]) {
        if (!vis[v]) dfs(v, adj, vis);
    }
}

// BFS 迭代版本
void bfs(int start, const vector<vector<int>>& adj, vector<bool>& vis) {
    queue<int> q;
    q.push(start);
    vis[start] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (!vis[v]) {
                vis[v] = true;
                q.push(v);
            }
        }
    }
}
```

---

## 四、 选型对比

| 特性           | DFS              | BFS              |
| :------------- | :--------------- | :--------------- |
| **辅助结构**   | 栈 (递归栈)      | 队列             |
| **空间优势**   | 路径深而窄时较优 | 路径浅而宽时较优 |
| **寻找最短路** | 不适合           | **无权图首选**   |
| **状态回溯**   | 极易实现         | 较难实现         |

---

## 配套练习 (折叠解答)

### 练习 1：连通分量计数

如何使用遍历算法求一个无向图中的连通分量个数？

<details>
<summary>点击查看解析</summary>

**方案**：

1. 维护 `count = 0`。
2. 遍历所有节点 $i \in [1, n]$：
   - 若 $i$ 未被访问过，执行 `dfs(i)` 或 `bfs(i)`，且 `count++`。
3. 最终 `count` 即为连通分量数。

</details>

### 练习 2：判定是否为二分图

如何利用 BFS 判定一个图是否为二分图？

<details>
<summary>点击查看解析</summary>

**方案：二染色法**

1. 为节点标记颜色（0, 1, 2，其中 0 代表未染色）。
2. 在 BFS 过程中，若当前点 $u$ 的颜色为 $C$，则其所有未染色的邻居 $v$ 染为 $3-C$。
3. 若遇到已染色的邻居 $v$ 且颜色与 $u$ 相同，则说明存在奇环，不是二分图。

</details>

### 练习 3：寻找环

如何使用 DFS 寻找有向图中的环？

<details>
<summary>点击查看解析</summary>

**方案：三色标记法**

1. 为节点设置三种状态：0（未访问）、1（正在访问）、2（访问完毕）。
2. 在 DFS 过程中，若访问到状态为 1 的节点，则说明存在回指祖先的边，即存在环。
3. 完成子树访问后，将节点状态由 1 改为 2。

</details>
