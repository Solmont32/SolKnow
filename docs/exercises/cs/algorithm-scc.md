---
title: 强连通分量 (SCC) 专项强化练习
sidebar_label: 强连通分量
---

import { Target, Zap, Trophy, BarChart3, ChevronRight, Code2, Layers, GitBranch } from 'lucide-react';

# 强连通分量 (SCC) 专项强化练习

> **“在复杂的有向图中，强连通分量是缩点为 DAG 的基石。”** —— 本专题涵盖 Tarjan 算法、缩点建模、2-SAT 问题及图论连通性综合应用。

---

## 🪜 练习阶梯与评价标准

| 等级 | 难度目标 | 核心考察点 | 期望达成 |
| :--- | :--- | :--- | :--- |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 算法复现与缩点 | Tarjan 模板、dfn/low 数组理解 | 能够准确手算小规模图的 SCC |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 建模转换与性质 | 缩点后的 DAG 性质、入度/出度分析 | 理解“最少加几条边成强连通”的本质 |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span> | 综合应用与 2-SAT | 2-SAT 方案构造、最大权闭合子图结合 | 具备解决省赛级连通性问题的能力 |

---

## 📂 核心习题库

### Level A：基础巩固 (Foundations)

#### 练习 1：Tarjan 算法模板 (SCC 分解)
**题目描述**：给定一个 $n$ 个点 $m$ 条边的有向图，求出所有的强连通分量，并按字典序输出。
- **考察点**：`dfn` (发现时间) 与 `low` (追溯值) 的维护。

<details>
<summary>Check Solution (C++ Implementation)</summary>

```cpp
#include <iostream>
#include <vector>
#include <stack>
#include <algorithm>

using namespace std;

const int N = 100010;
vector<int> g[N];
int dfn[N], low[N], timestamp;
int scc_id[N], scc_cnt;
bool in_stack[N];
stack<int> stk;

void tarjan(int u) {
    dfn[u] = low[u] = ++timestamp;
    stk.push(u);
    in_stack[u] = true;

    for (int v : g[u]) {
        if (!dfn[v]) {
            tarjan(v);
            low[u] = min(low[u], low[v]);
        } else if (in_stack[v]) {
            low[u] = min(low[u], dfn[v]);
        }
    }

    if (low[u] == dfn[u]) {
        scc_cnt++;
        int y;
        do {
            y = stk.top();
            stk.pop();
            in_stack[y] = false;
            scc_id[y] = scc_cnt;
        } while (y != u);
    }
}
```
</details>

---

### Level B：综合提升 (Intermediate)

#### 练习 2：最受欢迎的牛 (缩点应用)
**题目描述**：每头牛都想成为最受欢迎的牛。已知有向边 $(A, B)$ 表示 $A$ 欢迎 $B$。欢迎关系具有传递性。求被所有牛欢迎的牛的数量。
- **核心思想**：缩点后得到一个 DAG。若 DAG 中只有一个出度为 0 的节点（SCC），则该 SCC 内的所有牛都满足条件。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**解题流程**：
1. Tarjan 缩点。
2. 遍历所有边 $(u, v)$，若 `scc_id[u] != scc_id[v]`，则 `scc_out_degree[scc_id[u]]++`。
3. 统计出度为 0 的 SCC 数量。
4. 若数量为 1，答案为该 SCC 的点数；否则为 0。

```cpp
// ... Tarjan 部分省略
int out[N], sz[N];
for (int i = 1; i <= n; i++) {
    sz[scc_id[i]]++;
    for (int v : g[i]) {
        if (scc_id[i] != scc_id[v]) out[scc_id[i]]++;
    }
}

int zeros = 0, res = 0;
for (int i = 1; i <= scc_cnt; i++) {
    if (!out[i]) {
        zeros++;
        res = sz[i];
    }
}
if (zeros > 1) cout << 0 << endl;
else cout << res << endl;
```
</details>

---

### Level C：竞赛挑战 (Advanced)

#### 练习 3：2-SAT 问题模板 (P4782)
**题目描述**：有 $n$ 个布尔变量 $x_1, \dots, x_n$，以及 $m$ 个条件，每个条件形式为 $x_i = a \lor x_j = b$。求一组满足所有条件的赋值。
- **核心思想**：利用蕴含关系 $\neg (x_i = a) \implies (x_j = b)$ 建图，求 SCC 判定矛盾。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**建图规则**：
对于条件 $x_i=a \lor x_j=b$：
- 若 $x_i \neq a \implies x_j = b$
- 若 $x_j \neq b \implies x_i = a$

**判定条件**：
若 `scc_id[x_i_true] == scc_id[x_i_false]`，则无解。
**方案构造**：
若 `scc_id[x_i_true] < scc_id[x_i_false]`，则 $x_i$ 取真（注意 Tarjan 求出的 SCC 编号是逆拓扑序）。

```cpp
// n 个变量，2n 个点
// x_i = true 对应 i, x_i = false 对应 i + n
if (scc_id[i] == scc_id[i + n]) {
    puts("IMPOSSIBLE");
    return 0;
}
// 输出方案
for (int i = 1; i <= n; i++) {
    if (scc_id[i] < scc_id[i + n]) printf("1 ");
    else printf("0 ");
}
```
</details>

---

## 🏆 训练建议
1. **理解缩点的本质**：缩点将复杂的环结构简化为 DAG，从而可以使用拓扑排序或动态规划处理问题。
2. **2-SAT 的逻辑转换**：练习将“或”、“与”、“异或”等逻辑关系转化为“如果...那么...”的蕴含边。
3. **注意空间开销**：在 2-SAT 问题中，点数是变量数的 2 倍，边数也相应增加，注意数组大小。
