---
title: 图的存储
---

import { Database, Layers, Share2, Zap, LayoutList } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';

# <Database className="inline-block mr-2 mb-1 text-blue-500" /> 图的存储 (Graph Representation)

在图论算法中，如何高效地在计算机中表示图 $G=(V, E)$ 是后续所有算法实现的基础。存储结构的选择直接影响算法的时空复杂度及其常数表现。

---

## 一、 <Layers className="inline-block mr-2 mb-1 text-blue-400" /> 邻接矩阵 (Adjacency Matrix)

### 1. 定义
使用二维数组 `g[N][N]`。对于加权图：
- `g[u][v] = w`（若存在边 $(u, v)$，权值为 $w$）
- `g[u][v] = INF`（若不存在边）

### 2. 特性分析
<ComplexityAnalysis time="查询边 O(1), 遍历邻居 O(V)" space="O(V^2)" />

- **适用场景**：点数较小（$N \le 1000$）或稠密图。
- **优势**：查询两点间是否有边极其迅速。

---

## 二、 <LayoutList className="inline-block mr-2 mb-1 text-purple-500" /> 邻接表 (Adjacency List)

### 1. 定义
为每个点维护一个变长列表（如 `std::vector`），存储从该点出发的所有边信息。

### 2. 特性分析
<ComplexityAnalysis time="查询边 O(deg(u)), 遍历邻居 O(deg(u))" space="O(V + E)" />

- **适用场景**：绝大多数竞赛题目的通用选择，尤其是稀疏图。
- **注意**：`std::vector` 的频繁扩容可能在极端数据下产生常数开销。

---

## 三、 <Zap className="inline-block mr-2 mb-1 text-amber-500" /> 链式前向星 (Static Adjacency List)

### 1. 核心思想
**链式前向星**是邻接表的静态数组实现。它通过预分配数组模拟链表，是工业级算法竞赛中的**首选结构**。

### 2. 数据结构实现 (C++)
```cpp
int head[N], ver[M], nxt[M], edge[M], tot;

void add_edge(int u, int v, int w) {
    ver[++tot] = v;
    edge[tot] = w;
    nxt[tot] = head[u];
    head[u] = tot;
}

// 遍历邻居
for (int i = head[u]; i; i = nxt[i]) {
    int v = ver[i], w = edge[i];
    // logic
}
```

### 3. 关键技巧：成对变换 (Pairing)
在加边时令 `tot = 1`（或 0），将反向边紧随正向边加入。
- **性质**：边 `i` 的反向边编号即为 `i ^ 1`。
- **应用**：网络流中快速更新残量网络。

---

## 四、 存储方式选型对比

| 特性 | 邻接矩阵 | 邻接表 (`vector`) | 链式前向星 |
| :--- | :--- | :--- | :--- |
| **空间效率** | 低 ($V^2$) | 高 ($V+E$) | **最高** ($V+E$) |
| **遍历邻居** | 慢 ($V$) | 快 ($deg(u)$) | 快 ($deg(u)$) |
| **查询边是否存在** | **极快** ($1$) | 慢 ($deg(u)$) | 慢 ($deg(u)$) |
| **反向边定位** | 容易 | 困难 | **极易** (XOR 1) |

---

## 配套练习 (折叠解答)

### 练习 1：重边处理
在邻接矩阵中，如果存在重边（同一对点间多条边），应该如何存储？
<details>
<summary>点击查看解析</summary>

**方案**：
通常在最短路问题中，我们只需保留权值**最小**的那条边：
`g[u][v] = min(g[u][v], new_weight);`
如果是计数问题，则邻接矩阵无法直接处理，需改用邻接表。

</details>

### 练习 2：内存连续性
为什么链式前向星在某些情况下比 `vector<vector<int>>` 快？
<details>
<summary>点击查看解析</summary>

**原因**：
1. **减少内存分配**：`vector` 在扩容时会涉及内存重新分配和拷贝，而链式前向星是预分配的。
2. **缓存友好性**：静态数组在内存中是连续分布的，CPU 缓存命中率更高。

</details>
