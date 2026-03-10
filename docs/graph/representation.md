---
title: 图的存储
---

import { Database, Layers, Share2, Zap } from 'lucide-react';

# <Database className="inline-block mr-2 mb-1 text-blue-500" /> 图的存储 (Graph Representation)

在图论算法中，如何高效地在计算机中表示图 $G=(V, E)$ 是后续所有算法实现的基础。

## 一、 <Layers className="inline-block mr-2 mb-1 text-blue-400" /> 邻接矩阵 (Adjacency Matrix)

### 1. 定义
使用一个二维数组 `g[N][N]`。若从 $u$ 到 $v$ 有一条边，则 `g[u][v] = w`（$w$ 为权值）；若无边，则为一个特殊标记（如 $0$ 或 $\infty$）。

### 2. 特点
- **空间复杂度**: $O(n^2)$。
- **查询边**: $O(1)$。
- **遍历邻居**: $O(n)$。
- **适用场景**: 稠密图 ($m \approx n^2$) 或点数较小 ($n \le 500$)。

## 二、 邻接表 (Adjacency List)

### 1. 定义
为每个点维护一个列表，存储从该点出发的所有边。在 C++ 中通常使用 `std::vector<Edge> adj[N]` 实现。

### 2. 特点
- **空间复杂度**: $O(n+m)$。
- **遍历邻居**: $O(\text{deg}(u))$。
- **适用场景**: 稀疏图 ($m \ll n^2$)，绝大多数竞赛题目的通用选择。

## 三、 链式前向星 (Chain Forward Star)

### 1. 核心思想
**链式前向星**是静态化的邻接表。它通过数组模拟链表，避免了 `std::vector` 的动态扩容开销，是工业级算法竞赛中的首选结构。

### 2. 数据结构定义
```cpp
int head[N];    // head[u] 存储点 u 的最后一条出边的编号
int ver[M];     // ver[i] 存储第 i 条边的终点
int nxt[M];     // nxt[i] 存储与第 i 条边同起点的“下一条边”的编号
int edge[M];    // edge[i] 存储第 i 条边的权值
int tot;        // 当前边的总编号（计数器）

// 初始化
void init() {
    memset(head, 0, sizeof(head));
    tot = 0;
}

// 加边 (Add Edge)
void add(int u, int v, int w) {
    ver[++tot] = v;    // 记录终点
    edge[tot] = w;     // 记录权值
    nxt[tot] = head[u]; // 当前边的下一条边是原先 head[u] 指向的边
    head[u] = tot;     // 更新 head[u] 为当前边
}
```

### 3. 遍历方式
```cpp
for (int i = head[u]; i; i = nxt[i]) {
    int v = ver[i];
    int w = edge[i];
    // 处理边 (u, v, w)
}
```

### 4. 关键技巧：成对变换 (Pairing)
在处理无向图或网络流时，经常需要快速找到一条边的“反向边”。
- 若初始 `tot = 1`，则第 $i$ 条边的反向边编号为 `i ^ 1`。
- 加边时成对加入：`add(u, v, w); add(v, u, 0);`。

## 四、 存储方式选型对比

| 特性 | 邻接矩阵 | 邻接表 (`vector`) | 链式前向星 |
| :--- | :--- | :--- | :--- |
| **空间** | $O(n^2)$ | $O(n+m)$ | $O(n+m)$ |
| **增删边** | $O(1)$ | $O(1)$ (均摊) | $O(1)$ |
| **查重边** | $O(1)$ | $O(\text{deg}(u))$ | $O(\text{deg}(u))$ |
| **内存连续性** | 极佳 | 较差 | 较好 |
| **反向边查找** | $O(1)$ | 需额外记录 | $O(1)$ (成对变换) |

---

## 配套练习（答案折叠）

### 练习 1（基础）
在链式前向星中，如果我们要存储一个有 10,000 个点和 50,000 条边的**无向图**，数组 `ver` 和 `nxt` 的大小至少应开到多少？

<details>
<summary>点击查看过程与答案</summary>

无向图每一条边需要存储两次（$u \to v$ 和 $v \to u$）。
$M = 50,000 \times 2 = 100,000$。

**答案**：至少 100,000。

</details>

### 练习 2（进阶）
为什么在网络流算法中，链式前向星比 `vector` 更具优势？

<details>
<summary>点击查看过程与答案</summary>

1. **成对变换**：通过 `i ^ 1` 可以在 $O(1)$ 时间内找到反向边，直接修改残量。
2. **效率**：避免了 `vector` 的 push_back 开销，且在处理大规模增广时常数更小。

**答案**：主要在于成对变换查找反向边的极高效率。

</details>
