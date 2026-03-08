---
title: 最短路算法
---

# 最短路算法 (Shortest Path)

最短路问题是图论中最核心的模型之一：在带权图中，寻找从起点到终点的最小代价路径。

## 一、问题建模

给定图 $G=(V,E)$，边权为 $w(u,v)$。

- 单源最短路：固定源点 $s$，求 $s$ 到所有点的最短距离。
- 单终点最短路：等价于反图上的单源最短路。
- 全源最短路：求任意两点间最短距离。

常见权值类型：
- 非负边：可用 Dijkstra。
- 含负边但无负环：可用 Bellman-Ford / SPFA。
- 点数较小、需全源：可用 Floyd-Warshall。

## 二、Dijkstra（非负权单源）

### 1. 核心思想

每次从“尚未确定最短路”的点里，取当前 `dist` 最小的点 $u$，将其最短距离永久确定，再用 $u$ 松弛出边。

### 2. 正确性要点

边权非负时，未确定点中最小 `dist[u]` 不可能再被更短路径改写。

### 3. 复杂度

- 邻接表 + 小根堆：$O((n+m)\log n)$。
- 稠密图（邻接矩阵朴素版）：$O(n^2)$。

### 4. 模板代码（堆优化）

```cpp
vector<long long> dijkstra(int n, int s, const vector<vector<pair<int,int>>>& g) {
    const long long INF = (1LL << 62);
    vector<long long> dist(n + 1, INF);
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<pair<long long,int>>> pq;

    dist[s] = 0;
    pq.push({0, s});

    while (!pq.empty()) {
        auto [du, u] = pq.top();
        pq.pop();
        if (du != dist[u]) continue; // 丢弃过期堆节点

        for (auto [v, w] : g[u]) {
            if (dist[v] > du + w) {
                dist[v] = du + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
```

### 5. 例题 A（基础计算）

边：$1\to2(2), 1\to3(5), 2\to3(1), 2\to4(4), 3\to4(1)$。

从 1 出发：
- `dist[2]=2`
- `dist[3]=min(5,2+1)=3`
- `dist[4]=min(2+4,3+1)=4`

答案：$d(1,4)=4$。

## 三、Bellman-Ford（可含负边）

### 1. 核心思想

最短路最多包含 $n-1$ 条边；对全部边做 $n-1$ 轮松弛即可。

### 2. 负环判定

第 $n$ 轮若仍可松弛，则存在从源点可达的负环。

### 3. 复杂度

$O(nm)$。

### 4. 例题 B（负边无负环）

边：$1\to2(4), 1\to3(5), 2\to3(-2), 3\to4(3)$。

从 1 到 4 的最短路：$1\to2\to3\to4$，距离 $4-2+3=5$。

## 四、SPFA（队列优化的 Bellman-Ford）

SPFA 将“本轮可能继续改进他人”的点放入队列，在随机数据上常较快，但最坏仍可退化到 $O(nm)$。

竞赛建议：
- 负边图且数据范围较大时，优先考虑 Bellman-Ford 的可控上界或题目特定性质。
- 若使用 SPFA，建议配合入队次数判负环（某点入队次数 $\ge n$）。

## 五、Floyd-Warshall（全源）

### 1. 状态定义

`dist[i][j]` 表示当前允许若干中间点时，$i$ 到 $j$ 的最短路。

### 2. 转移

$$
\text{dist}[i][j] = \min(\text{dist}[i][j],\ \text{dist}[i][k] + \text{dist}[k][j])
$$

### 3. 复杂度

$O(n^3)$，适合 $n\le 400$ 左右（视常数与时限）。

### 4. 例题 C（全源查询）

若图有大量“任意两点最短路”查询，而点数不大，Floyd 一次预处理后每次查询 $O(1)$ 返回。

## 六、算法选型速查

| 场景 | 推荐算法 |
| :--- | :--- |
| 单源 + 非负边 | Dijkstra |
| 单源 + 有负边 + 需判负环 | Bellman-Ford |
| 全源 + 点数小 | Floyd |
| DAG 最短路 | 拓扑序 DP |

## 七、竞赛高频坑点

1. 把 Dijkstra 用在负边图上。
2. `INF` 过小导致溢出或误判可达。
3. 堆优化 Dijkstra 忘记丢弃过期状态。
4. Floyd 未先判 `dist[i][k]`、`dist[k][j]` 是否为 `INF` 就直接相加。

## 八、综合例题（教材风格）

### 例题 D：路径重构

在 Dijkstra/Bellman-Ford 松弛时维护 `pre[v]=u`，终点回溯可得具体路径。

### 例题 E：边数限制最短路

若限制“最多经过 $K$ 条边”，可用 `dp[k][v]`（分层 Bellman-Ford）处理，避免普通最短路误解。

### 例题 F：多源最短路

可建立超级源点 $S$，向所有源点连 0 权边，再跑单源最短路。

## 九、配套练习（答案折叠）

分层题库：[`算法竞赛练习：最短路专题`](/exercises/cs/algorithm-shortest-path)

### 练习 1（基础）

为什么 Dijkstra 要求边权非负？请给出一个负边反例。

<details>

<summary>点击查看过程与答案</summary>

反例：$1\to2(2), 1\to3(5), 3\to2(-10)$。

Dijkstra 可能先确定 `dist[2]=2`，但真实最短路为 $1\to3\to2=-5$。

**答案**：存在负边时，“当前最小 dist 不再可改写”的关键性质失效。

</details>

### 练习 2（基础）

Floyd 适合什么类型的数据规模与查询模式？

<details>

<summary>点击查看过程与答案</summary>

Floyd 预处理 $O(n^3)$，查询 $O(1)$。适用于点数较小但查询量很大的场景。

**答案**：`n` 小、全源多次查询时优先 Floyd。

</details>

### 练习 3（提高）

如何在 Bellman-Ford 中检测负环？

<details>

<summary>点击查看过程与答案</summary>

执行 $n-1$ 轮松弛后，再做第 $n$ 轮：若还有边可松弛，则存在源点可达负环。

**答案**：第 $n$ 轮仍可松弛即判负环。

</details>

### 练习 4（提高）

在堆优化 Dijkstra 中，为什么要写 `if (du != dist[u]) continue;`？

<details>

<summary>点击查看过程与答案</summary>

同一节点可能多次入堆，旧键值会滞留在堆中。若不跳过过期状态，会重复扩展，增加复杂度并引入错误风险。

**答案**：用于过滤过期堆节点，保证以最新最短距离扩展。

</details>

### 练习 5（挑战）

有向图边：$1\to2(3),2\to3(4),1\to3(10),3\to4(2),2\to4(8)$，求从 1 到 4 的最短路与路径。

<details>

<summary>点击查看过程与答案</summary>

候选路径：
- $1\to3\to4 = 12$
- $1\to2\to4 = 11$
- $1\to2\to3\to4 = 3+4+2=9$

最短为 9，路径为 $1\to2\to3\to4$。

**答案**：最短距离 9，最短路径 `1-2-3-4`。

</details>

