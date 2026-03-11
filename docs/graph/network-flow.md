---
title: 网络流算法与工业级建模
---

import { GitMerge, Zap, Activity, ShieldCheck, Layers, Landmark, ArrowRightLeft, Maximize } from 'lucide-react';

# <GitMerge className="inline-block mr-2 mb-1 text-blue-500" /> 网络流 (Network Flow)

网络流是组合优化中的核心模型。它不仅能解决物流传输问题，还能通过**对偶性 (Duality)** 解决各种覆盖与独立集问题。

---

## 一、 <Maximize className="inline-block mr-2 mb-1 text-blue-400" /> 核心定理：最大流最小割 (Max-Flow Min-Cut)

**定理内容**：在一个有向图中，从源点 $S$ 到汇点 $T$ 的最大流量等于将 $S$ 和 $T$ 分开的最小割集的容量之和。
- **直观理解**：一个系统的最大产出受限于其最薄弱的环节（瓶颈）。
- **应用逻辑**：当你无法直接求一个集合的最小值时，尝试构建一个网络并求其最大流。

---

## 二、 <Zap className="inline-block mr-2 mb-1 text-amber-500" /> 算法体系

| 算法 | 核心机制 | 复杂度 | 备注 |
| :--- | :--- | :--- | :--- |
| **Edmonds-Karp** | BFS 寻找增广路 | $O(VE^2)$ | 基础实现 |
| **Dinic** | 分层图 + 多路增广 | $O(V^2E)$ | **工业界主流选择** |
| **ISAP** | 动态修改标号 BFS | $O(V^2E)$ | 效率略高于 Dinic |
| **HLPP** | 最高标号预流推进 | $O(V^2\sqrt{E})$ | 理论复杂度最优 |

---

## 三、 <ArrowRightLeft className="inline-block mr-2 mb-1 text-purple-500" /> 进阶模型：有上下界的网络流 (Circulation with Bounds)

**场景**：每条边 $(u, v)$ 不仅有上限 $c_{uv}$，还有下限 $l_{uv}$，要求 $l_{uv} \le f_{uv} \le c_{uv}$ 且满足流量守恒。

**转化步骤**：
1. **流量修正**：每条边实际容量改为 $c_{uv} - l_{uv}$。
2. **偏差调整**：
   - 令 $D(u) = \sum l_{in} - \sum l_{out}$。
   - 若 $D(u) > 0$，从辅助源 $S'$ 连向 $u$，容量为 $D(u)$。
   - 若 $D(u) < 0$，从 $u$ 连向辅助汇 $T'$，容量为 $-D(u)$。
3. **判可行流**：运行 $S' \to T'$ 最大流。若所有 $S'$ 发出的边均满流，则存在可行流。

---

## 四、 <Activity className="inline-block mr-2 mb-1 text-green-500" /> Dinic 算法工业级模板

```cpp
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

const long long INF = 1e18;

struct Dinic {
    struct Edge {
        int to, rev;
        long long cap;
    };
    vector<vector<Edge>> g;
    vector<int> level, iter;

    Dinic(int n) : g(n), level(n), iter(n) {}

    void add_edge(int from, int to, long long cap) {
        g[from].push_back({to, (int)g[to].size(), cap});
        g[to].push_back({from, (int)g[from].size() - 1, 0});
    }

    bool bfs(int s, int t) {
        fill(level.begin(), level.end(), -1);
        level[s] = 0;
        queue<int> q;
        q.push(s);
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (auto& e : g[u]) {
                if (e.cap > 0 && level[e.to] < 0) {
                    level[e.to] = level[u] + 1;
                    q.push(e.to);
                }
            }
        }
        return level[t] != -1;
    }

    long long dfs(int u, int t, long long f) {
        if (u == t) return f;
        for (int& i = iter[u]; i < g[u].size(); ++i) {
            Edge& e = g[u][i];
            if (e.cap > 0 && level[u] < level[e.to]) {
                long long d = dfs(e.to, t, min(f, e.cap));
                if (d > 0) {
                    e.cap -= d;
                    g[e.to][e.rev].cap += d;
                    return d;
                }
            }
        }
        return 0;
    }

    long long max_flow(int s, int t) {
        long long flow = 0;
        while (bfs(s, t)) {
            fill(iter.begin(), iter.end(), 0);
            long long f;
            while ((f = dfs(s, t, INF)) > 0) flow += f;
        }
        return flow;
    }
};
```

---

## 五、 配套练习 (折叠解答)

### 练习 1：最小割应用
给定一个网格，某些格子有障碍。求最少去掉多少个非障碍格子，使得起点与终点不连通。

<details>
<summary>查看解析</summary>

**分析**：
这是“最小点割集”问题。
1. **点转边**：将每个格子 $u$ 拆分为 $u_{in}, u_{out}$，连边 $(u_{in}, u_{out}, 1)$。如果是障碍格，容量设为 $\infty$。
2. **网格建边**：相邻格子 $u, v$ 连边 $(u_{out}, v_{in}, \infty)$。
3. **求解**：运行 $S_{out} \to T_{in}$ 的最大流，结果即为最小割。

</details>

### 练习 2：最大权闭合子图
有 $n$ 个实验，每个实验获利 $p_i$；做实验需要若干仪器，每个仪器成本 $c_j$。求最大利润。

<details>
<summary>查看解析</summary>

**分析**：
1. $S \to 实验_i$，容量为 $p_i$。
2. $仪器_j \to T$，容量为 $c_j$。
3. $实验_i \to 所需仪器_j$，容量为 $\infty$。
**结论**：最大利润 = $\sum p_i - 最小割$。

</details>

### 练习 3：二分图匹配与网络流
如何用网络流描述二分图的最大匹配？

<details>
<summary>查看解析</summary>

**分析**：
1. 建立超级源点 $S$ 和超级汇点 $T$。
2. $S \to$ 二分图左侧所有点，容量 1。
3. 二分图右侧所有点 $\to T$，容量 1。
4. 原图中的边由左向右连，容量 1。
最大流的结果即为最大匹配数。

</details>
