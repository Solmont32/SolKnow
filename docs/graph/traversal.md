---
title: 图的遍历
---

import { Share2, Zap, Search, Waypoints } from 'lucide-react';

# <Share2 className="inline-block mr-2 mb-1 text-blue-500" /> 图的遍历 (Traversal)

图的遍历是所有图论算法的基础，通过深度优先搜索 (DFS) 或广度优先搜索 (BFS) 系统地访问图中的所有节点。

## 一、 <Search className="inline-block mr-2 mb-1 text-blue-400" /> 深度优先搜索 (DFS)

### 1. 原理
DFS 遵循“不撞南墙不回头”的策略。从起点出发，尽可能深地搜索路径。当无法继续时，回溯到上一个节点，尝试其他分支。

### 2. 代码实现 (C++)
使用链式前向星进行遍历：
```cpp
void dfs(int u) {
    vis[u] = true;
    for (int i = head[u]; i; i = nxt[i]) {
        int v = ver[i];
        if (!vis[v]) dfs(v);
    }
}
```

### 3. 应用场景
- 强连通分量 (Tarjan)
- 拓扑排序 (基于结束时间)
- 连通块计数
- 路径搜索与回溯

## 二、 <Waypoints className="inline-block mr-2 mb-1 text-blue-400" /> 广度优先搜索 (BFS)

### 1. 原理
BFS 遵循“逐层扩张”的策略。从起点开始，先访问所有距离为 1 的点，再访问距离为 2 的点，依此类推。通常使用队列实现。

### 2. 代码实现 (C++)
```cpp
void bfs(int s) {
    queue<int> q;
    q.push(s);
    vis[s] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int i = head[u]; i; i = nxt[i]) {
            int v = ver[i];
            if (!vis[v]) {
                vis[v] = true;
                q.push(v);
            }
        }
    }
}
```

### 3. 应用场景
- **无权图的最短路**
- 洪水填充 (Flood Fill)
- 分层图构建 (如 Dinic 中的层级图)

## 三、 选型对比

| 特性 | DFS | BFS |
| :--- | :--- | :--- |
| **数据结构** | 栈 (或系统栈) | 队列 |
| **空间复杂度** | $O(h)$ ($h$ 为深度) | $O(w)$ ($w$ 为最大宽度) |
| **最短路性质** | 无 | 仅限无权图 |
| **实现难度** | 递归实现，非常简洁 | 需维护队列 |

---

## 配套练习（答案折叠）

### 练习 1（理论）
在 DFS 中，`low[u]` 的概念通常与哪个高级算法相关？
<details>
<summary>点击查看过程与答案</summary>

**答案**：Tarjan 算法。用于寻找强连通分量、割点或桥。

</details>

### 练习 2（计算）
给定一个 $3 \times 3$ 的网格图，从左上角 $(1,1)$ 出发访问右下角 $(3,3)$，BFS 找到的路径长度（边数）是多少？
<details>
<summary>点击查看过程与答案</summary>

BFS 保证在网格图（等权图）上找到最短路径。
$(1,1) \to (1,2) \to (2,2) \to (2,3) \to (3,3)$，共 4 步。

**答案**：4。

</details>
