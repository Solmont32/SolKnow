---
title: 拓扑排序
---

# 拓扑排序 (Topological Sort)

拓扑排序用于处理有向图中的先后依赖关系。

若图为有向无环图（DAG），则存在一个顶点排列，使得每条边 $u \to v$ 都满足 $u$ 在 $v$ 之前。

## 一、基本定义与判定

- `DAG`：不含有向环的有向图。
- `拓扑序`：满足所有有向边方向约束的线性序列。
- 若图中存在有向环，则不存在拓扑序。

判定图是否有环的常见方式：

- Kahn 算法中，若最终出队顶点数 `< n`，说明有环。
- DFS 染色法中，若出现回边（访问到“正在递归栈中”的点），说明有环。

## 二、Kahn 算法（入度法）

### 1. 算法流程

1. 统计每个点入度 `in[v]`。
2. 把所有入度为 `0` 的点入队。
3. 每次弹出一个点 `u` 加入拓扑序，并删除其所有出边：
   - 对每条 `u -> v`，执行 `in[v]--`。
   - 若 `in[v]` 变为 `0`，则将 `v` 入队。
4. 结束后检查序列长度是否等于 `n`。

### 2. 复杂度

- 时间复杂度：$O(n + m)$
- 空间复杂度：$O(n + m)$

### 3. C++ 模板

```cpp
vector<int> topo_kahn(int n, const vector<vector<int>>& g, vector<int> indeg) {
    queue<int> q;
    for (int i = 1; i <= n; ++i) {
        if (indeg[i] == 0) q.push(i);
    }

    vector<int> order;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        order.push_back(u);
        for (int v : g[u]) {
            if (--indeg[v] == 0) q.push(v);
        }
    }

    if ((int)order.size() != n) return {}; // 有环
    return order;
}
```

## 三、DFS 拓扑排序

思想：对每个点做 DFS，回溯时把顶点压入序列，最后反转序列得到拓扑序。

染色约定：

- `0`：未访问
- `1`：访问中（在递归栈）
- `2`：已完成

若在 DFS 中遇到 `color[v] == 1`，则检测到环。

```cpp
bool dfs(int u, const vector<vector<int>>& g, vector<int>& color, vector<int>& order) {
    color[u] = 1;
    for (int v : g[u]) {
        if (color[v] == 1) return false;          // 回边，有环
        if (color[v] == 0 && !dfs(v, g, color, order)) return false;
    }
    color[u] = 2;
    order.push_back(u); // 后序入栈
    return true;
}
```

## 四、字典序最小拓扑序

在 Kahn 算法中，把普通队列换成小根堆（`priority_queue<int, vector<int>, greater<int>>`），每次优先取编号最小的入度 0 顶点，即可得到字典序最小拓扑序。

这是竞赛中常见细节题。

## 五、DAG 上的动态规划

拓扑序是 DAG DP 的基础。一般模式：

1. 先求拓扑序 `order`。
2. 按 `order` 顺序转移状态。

典型题型：

- DAG 最长路（边权可正可负，但不能有环）。
- 路径计数（从起点到终点的方案数）。
- 任务调度最早完成时间（关键路径）。

### 例题 A：DAG 最长路

给 DAG 边权，求从 `s` 到各点最长路。

设 `dp[v]` 为 `s -> v` 最长路，初始化 `dp[s]=0`，其余为负无穷。
按拓扑序遍历 `u`，对每条边 `u -> v (w)` 执行：

$$

dp[v] = \max(dp[v], dp[u] + w)


$$

复杂度仍为 $O(n+m)$。

### 例题 B：路径计数

设 `cnt[s]=1`，其余 `0`，按拓扑序转移：

$$

cnt[v] += cnt[u], \quad \forall (u \to v)


$$

若题目有模数，转移时取模即可。

### 例题 C：课程安排判定

课程依赖关系即有向边 `先修 -> 后修`。

- 若存在拓扑序：可完成全部课程。
- 若不存在拓扑序：依赖中有环，无法完成。

## 六、竞赛高频易错点

1. 多测数据没有清空 `indeg` 和邻接表。
2. 节点编号从 `0` 开始时循环边界写错。
3. 把“无向图”误用拓扑排序。
4. 判环条件写成“队列为空就有环”，这是错误的，正确条件是“最终处理点数 < n”。
5. DAG 最长路初始化错误，导致不可达点参与转移。

## 七、配套练习（答案折叠）

专题练习页：[`算法竞赛练习：拓扑排序专题`](/exercises/cs/algorithm-topo-sort)

### 练习 1（基础）

边集合：$1\to2, 1\to3, 2\to4, 3\to4$。写出任意一个合法拓扑序。

<details>

<summary>点击查看过程与答案</summary>

`1` 必须在 `2,3,4` 之前，`2,3` 必须在 `4` 之前。

合法答案之一：`1,2,3,4`。
另一个：`1,3,2,4`。

</details>

### 练习 2（提高）

为何“最终出队数量 < n”可以判定有环？简述原因。

<details>

<summary>点击查看过程与答案</summary>

若有环，则环上所有点入度至少为 1，无法被消到 0，无法全部出队。
若无环（DAG），每一步至少存在一个入度 0 点，最终可处理完全部顶点。

因此出队数量小于 `n` 当且仅当存在环。

</details>

### 练习 3（挑战）

在 Kahn 算法中将队列改为小根堆，可以保证什么性质？复杂度如何变化？

<details>

<summary>点击查看过程与答案</summary>

可以保证得到字典序最小拓扑序。
时间复杂度从 $O(n+m)$ 变为 $O((n+m)\log n)$。

</details>
