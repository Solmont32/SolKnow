---
title: 拓扑排序与依赖建模
---

import { ListOrdered, GitMerge, CheckCircle, AlertTriangle, Zap } from 'lucide-react';

# <ListOrdered className="inline-block mr-2 mb-1 text-blue-600" /> 拓扑排序与依赖建模 (Topological Sort)

拓扑排序是解决**偏序关系** (Partial Order) 问题的核心工具。当一组任务之间存在“先修”与“后继”的依赖关系时，拓扑排序能为我们提供一个合法的执行序列。

## 一、 <GitMerge className="inline-block mr-2 mb-1 text-blue-500" /> 数学定义与先决条件

-   **有向无环图 (DAG)**：拓扑排序存在的充分必要条件。若图中存在环，则无法产生拓扑序。
-   **拓扑序 (Topological Order)**：对于 DAG $G=(V, E)$，一个线性序列 $v_1, v_2, \dots, v_n$ 是拓扑序，当且仅当对于每一条有向边 $(u, v) \in E$，$u$ 在序列中均出现在 $v$ 之前。

---

## 二、 算法实现：Kahn 算法 (入度法)

Kahn 算法本质上是一种**贪心策略**：每次执行当前没有任何未完成依赖（入度为 0）的任务。

### 1. 算法流程
1.  统计所有节点的入度 $in[v]$。
2.  将所有 $in[v] = 0$ 的节点放入队列。
3.  不断从队列中取点 $u$，将其加入拓扑序列：
    -   遍历 $u$ 的出边 $(u, v)$，执行 $in[v]--$。
    -   若 $in[v]$ 变为 0，则将 $v$ 入队。
4.  **环判定**：若最终加入序列的点数小于总点数 $n$，说明图中存在有向环。

### 2. C++ 工业级实现
```cpp
vector<int> solve_topo(int n, const vector<vector<int>>& g) {
    vector<int> in(n + 1, 0), res;
    for (int u = 1; u <= n; ++u)
        for (int v : g[u]) in[v]++;
    
    queue<int> q;
    for (int i = 1; i <= n; ++i)
        if (!in[i]) q.push(i);
    
    while (!q.empty()) {
        int u = q.front(); q.pop();
        res.push_back(u);
        for (int v : g[u])
            if (--in[v] == 0) q.push(v);
    }
    return res.size() == n ? res : vector<int>(); // 返回空集表示有环
}
```

---

## 三、 <Zap className="inline-block mr-2 mb-1 text-amber-500" /> 高级建模应用

### 1. 软件编译依赖
在构建大型项目（如 Linux 内核或现代 Web 应用）时，模块间的引用关系形成一个 DAG。拓扑序决定了并行编译的最优调度方案。

### 2. 动态规划的序基础 (DAG DP)
拓扑序是所有 DAG 上 DP 的天然计算顺序。它保证了我们在计算当前节点状态时，其所有前驱节点（依赖项）的状态已经确定。
-   **典型应用**：最长路、路径计数、最短完工时间（关键路径法）。

### 3. 字典序最小拓扑序
若题目要求在多个合法序列中选择“字典序最小”的一个，只需将 Kahn 算法中的 `queue` 替换为 `priority_queue<int, vector<int>, greater<int>>`。

---

## 四、 <AlertTriangle className="inline-block mr-2 mb-1 text-red-500" /> 竞赛高频坑点

1.  **节点编号**：注意是从 1 还是 0 开始，循环边界要匹配。
2.  **重边处理**：入度统计时需确定是否允许重边（通常 $in[v]++$ 即可）。
3.  **多源连通块**：拓扑排序天然支持处理不连通的多个 DAG 森林。

---

## 五、 配套练习（答案折叠）

### 练习 1（建模）
给定课程依赖：A $\to$ B, B $\to$ C, D $\to$ A, D $\to$ E。写出一个合法的修课顺序。

<details>
<summary>点击查看过程与答案</summary>

**依赖链**：D 是起点，指向 A 和 E；A 指向 B，B 指向 C。
**合法序列之一**：D, A, B, C, E。
**合法序列之二**：D, E, A, B, C。

</details>

### 练习 2（判定）
若有向图边为 $1 \to 2, 2 \to 3, 3 \to 1$，拓扑序是否存在？

<details>
<summary>点击查看过程与答案</summary>

**分析**：存在 $1 \to 2 \to 3 \to 1$ 的环。
**答案**：不存在。

</details>

### 练习 3（进阶）
如何使用 DFS 判定有向环？

<details>
<summary>点击查看过程与答案</summary>

**分析**：维护三种颜色状态：0（未访问）、1（正在访问/栈中）、2（已完成）。
**答案**：若在 DFS 过程中遇到颜色为 1 的点，说明存在一条回到当前路径上祖先的边，即存在环。

</details>
