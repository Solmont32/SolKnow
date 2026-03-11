---
title: 拓扑排序专项强化练习
sidebar_label: 拓扑排序
---

import { Target, Zap, Trophy, BarChart3, ChevronRight, Code2, Layers, GitBranch } from 'lucide-react';

# 拓扑排序专项强化练习

> **“拓扑排序是解决具有先后依赖关系问题的利器。”** —— 本专题涵盖 Kahn 算法、DFS 实现、字典序拓扑序及拓扑 DP 综合应用。

---

## 🪜 练习阶梯与评价标准

| 等级 | 难度目标 | 核心考察点 | 期望达成 |
| :--- | :--- | :--- | :--- |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 算法复现与判环 | Kahn 算法、入度统计、DAG 判定 | 能够 5 分钟内写出判环逻辑 |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 序性质与贪心 | 字典序最小/最大拓扑序 | 理解优先队列在拓扑序中的应用 |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span> | 拓扑 DP 与计数 | 关键路径、DAG 路径统计、属性传递 | 具备处理复杂 DAG 逻辑推导能力 |

---

## 📂 核心习题库

### Level A：基础巩固 (Foundations)

#### 练习 1：有向图拓扑序列 (Kahn 算法)
**题目描述**：给定一个 $n$ 个点 $m$ 条边的有向图，请输出任意一个合法的拓扑序列。如果图中有环，则输出 -1。
- **核心思想**：维护每个点的入度，每次将入度为 0 的点入队。

<details>
<summary>Check Solution (C++ Implementation)</summary>

```cpp
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

const int N = 100010;
vector<int> g[N];
int d[N], res[N];

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        g[a].push_back(b);
        d[b]++;
    }

    queue<int> q;
    for (int i = 1; i <= n; i++)
        if (!d[i]) q.push(i);

    int k = 0;
    while (q.size()) {
        int t = q.front();
        q.pop();
        res[k++] = t;
        for (int v : g[t]) {
            if (--d[v] == 0) q.push(v);
        }
    }

    if (k < n) cout << -1 << endl;
    else {
        for (int i = 0; i < n; i++) cout << res[i] << " ";
        cout << endl;
    }
}
```
</details>

---

### Level B：综合提升 (Intermediate)

#### 练习 2：字典序最小拓扑序 (P3387)
**题目描述**：在所有合法的拓扑序列中，输出字典序最小的那一个。
- **考察点**：将普通队列替换为优先队列 (`priority_queue`)。

<details>
<summary>Check Solution (C++ Implementation)</summary>

```cpp
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

// 使用小根堆维护当前入度为 0 且编号最小的点
priority_queue<int, vector<int>, greater<int>> pq;

void solve() {
    // ... 入度预处理同上
    while (pq.size()) {
        int u = pq.top();
        pq.pop();
        // ... 更新出边入度，若归 0 则入堆
    }
}
```
</details>

---

### Level C：竞赛挑战 (Advanced)

#### 练习 3：可达性统计 (DAG 上的属性传递)
**题目描述**：给定一个 $N \le 30000$ 的 DAG，求出每个点能到达的节点数量（含自身）。
- **核心思想**：拓扑排序 + `bitset` 状态压缩。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**解题流程**：
1. 确定拓扑序（逆序遍历）。
2. 使用 `bitset<30000> f[N]`，其中 `f[u]` 表示 $u$ 能到达的点集。
3. 转移方程：`f[u] |= f[v]` 对于所有 $u \to v$ 的边。
4. 答案即为 `f[u].count()`。

```cpp
#include <iostream>
#include <bitset>
#include <vector>

using namespace std;

const int N = 30010;
bitset<N> f[N];
vector<int> g[N];
int topo[N], d[N];

int main() {
    // ... 获取拓扑序存储在 topo 数组中
    for (int i = n; i >= 1; i--) { // 逆拓扑序
        int u = topo[i];
        f[u][u] = 1;
        for (int v : g[u]) {
            f[u] |= f[v];
        }
    }
    for (int i = 1; i <= n; i++) cout << f[i].count() << endl;
}
```
</details>

---

## 🏆 训练建议
1. **拓扑排序的副产品**：除了排序本身，拓扑序常用于 DAG 上的 DP。
2. **字典序的陷阱**：有时题目要求“让小编号的点尽量靠前”，这不等于“字典序最小”，需要逆向建图求“字典序最大拓扑序”再逆序输出。
3. **环的判定**：拓扑排序结束后，如果输出的点数少于原图中点数，则说明图中有环。
