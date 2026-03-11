---
title: 搜索算法精要 (Search Algorithms & Heuristics)
---

import { Search, Zap, Target, Thermometer, Box, ArrowRightCircle, Layers, ShieldCheck, Activity, Cpu, Database, Swords, Microscope, TrendingUp, Binary } from 'lucide-react';

# <Target className="inline-block mr-2 mb-1 text-purple-500" /> 搜索算法与启发式策略

搜索 (Search) 是解决复杂决策、组合最优化及路径规划问题的普适性框架。从算法深度来看，搜索不仅是“遍历”，更是对**状态空间 (State Space)** 的代数结构与拓扑特性的深度挖掘。本章旨在探讨如何通过严密的数学建模、剪枝证明、估价函数诱导以及时空权衡，将指数级复杂度降至工程可接受范围。

---

## 零、 <Layers className="inline-block mr-2 mb-1 text-blue-400" /> 系统化状态空间建模

### 1. 形式化定义与搜索树展开

一个完备的搜索问题可定义为五元组 $\mathcal{M} = \langle S, A, T, s_0, G \rangle$：

- $S$：**状态集合** (State Set)，表示系统所有可能的形式。
- $A$：**动作集合** (Action Set)，$A(s)$ 表示在状态 $s$ 下的可行操作。
- $T: S \times A \to S$：**转移函数** (Transition Function)，定义状态演化逻辑。
- $s_0 \in S$：**初始状态**。
- $G \subseteq S$：**目标状态集**。

**复杂度量化分析**：
若分支因子为 $b$（每个节点的平均后继数），搜索深度为 $d$，则搜索树节点总数 $|V| = \sum_{i=0}^d b^i = \frac{b^{d+1}-1}{b-1}$。
- **时间复杂度**：$O(b^d)$，呈指数级增长。
- **空间复杂度**：DFS 为 $O(d)$，BFS 为 $O(b^d)$。

### 2. 状态压缩与对称性破缺

在某些问题中，$|S|$ 巨大但具有结构特征。

- **位运算压缩 (Bitmasking)**：当状态可表示为一组布尔变量时（如 $N \le 20$），使用 `int` 的位表示状态。
- **对称性剪枝**：若状态空间存在等价关系 $\sim$（如平移、翻转、旋转不变性），则只需搜索商空间 $S/\sim$。
- **引理**：若代价函数 $c(s, a) = c(\sigma(s), \sigma(a))$ 且 $G$ 在变换 $\sigma$ 下不变，则最优解必在代表元集合中。

---

## 一、 <ShieldCheck className="inline-block mr-2 mb-1 text-green-500" /> 搜索树剪枝：数学证明与系统化准则

剪枝并非单纯的技巧，而是基于逻辑断言 (Logic Assertion) 的搜索空间缩减。

### 1. 可行性剪枝 (Feasibility Pruning)

**定理 1**：若存在谓词 $P: S \to \{0, 1\}$，使得 $\forall s \in S, P(s) = 0 \implies (\forall \tau: s \xrightarrow{\tau} s', s' \notin G)$，则在搜索到 $s$ 且 $P(s)=0$ 时停止搜索是完备的。

### 2. 最优性剪枝 (Optimality Pruning)

**定理 2**：令 $g(s)$ 为从 $s_0$ 到 $s$ 的当前已知路径代价，$\hat{h}(s)$ 为从 $s$ 到 $G$ 的**代价下界**。若 $g(s) + \hat{h}(s) \ge \text{ans}_{best}$，则以 $s$ 为根的子树中不存在优于当前最优解的路径。

### 3. 精选例题：[木棒拼接 - 系统化剪枝]

<details>
<summary>Check Solution: 极限界剪枝 C++ 实现</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int n, a[70], vis[70], total, target, m;

bool dfs(int cnt, int cur, int last) {
    if (cnt == m) return true;
    if (cur == target) return dfs(cnt + 1, 0, n - 1);

    for (int i = last; i >= 0; i--) {
        if (vis[i] || cur + a[i] > target) continue;
        vis[i] = 1;
        if (dfs(cnt, cur + a[i], i - 1)) return true;
        vis[i] = 0;

        // 核心剪枝证明应用
        if (cur == 0 || cur + a[i] == target) return false;
        while (i > 0 && a[i] == a[i - 1]) i--;
    }
    return false;
}

int main() {
    while (cin >> n && n) {
        total = 0;
        for (int i = 0; i < n; i++) { cin >> a[i]; total += a[i]; }
        sort(a, a + n);
        for (target = a[n - 1]; target <= total; target++) {
            if (total % target == 0) {
                m = total / target;
                fill(vis, vis + n, 0);
                if (dfs(0, 0, n - 1)) { cout << target << endl; break; }
            }
        }
    }
    return 0;
}
```

</details>

---

## 二、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 启发式搜索：A* 与 IDA*

### 1. 估价函数 $h(s)$ 的性质

- **可接受性 (Admissibility)**：$0 \le h(s) \le h^*(s)$，其中 $h^*(s)$ 为真实最小代价。保证 A\* 找到最优解。
- **一致性 (Consistency / Monotonicity)**：对于任意状态 $s$ 及其后继 $s'$，满足 $h(s) \le c(s, a, s') + h(s')$。
  - **推论**：若 $h(s)$ 是一致的，则沿任何路径的 $f(s) = g(s) + h(s)$ 都是非递减的。

### 2. A\* 最优性证明

**定理 3**：若 $h(s)$ 是可接受的，则 A\* 首次弹出目标节点时必为最优。
**证明**：假设 A* 选出非最优目标 $G_{bad}$。此时路径上必有一节点 $n$ 在 OpenList 中。
$f(n) = g(n) + h(n) \le g(n) + h^*(n) = f^*(G^*) = g(G^*) < g(G_{bad})$。
根据优先队列性质，$n$ 必在 $G_{bad}$ 之前弹出，矛盾。

### 3. IDA* (Iterative Deepening A*)

IDA\* 是限深 DFS 与启发式信息的结合，空间复杂度仅为 $O(d)$。

---

## 三、 <Swords className="inline-block mr-2 mb-1 text-orange-500" /> 博弈搜索 (Adversarial Search)

在双人完备信息博弈中（如棋类），通过评估函数和搜索树寻找最优策略。

### 1. Minimax 决策准则

最大化己方利益，同时假设对手会最小化己方利益：
$$V(s) = \begin{cases} \text{Utility}(s) & \text{if IsTerminal}(s) \\ \max_{a \in A(s)} V(T(s, a)) & \text{if Player}(s) = \text{MAX} \\ \min_{a \in A(s)} V(T(s, a)) & \text{if Player}(s) = \text{MIN} \end{cases}$$

### 2. Alpha-Beta 剪枝优化

引入两个边界 $[\alpha, \beta]$：
- $\alpha$：MAX 节点已发现的当前最高下界。
- $\beta$：MIN 节点已发现的当前最低上界。
**剪枝条件**：若在某个节点发现 $\alpha \ge \beta$，则该子树不再需要搜索。

<details>
<summary>Check Solution: Alpha-Beta 剪枝通用模板</summary>

```cpp
int alphaBeta(State s, int alpha, int beta, bool isMaxPlayer) {
    if (isTerminal(s)) return evaluate(s);
    if (isMaxPlayer) {
        int v = -INF;
        for (auto next : getActions(s)) {
            v = max(v, alphaBeta(next, alpha, beta, false));
            alpha = max(alpha, v);
            if (beta <= alpha) break; // Beta 剪枝
        }
        return v;
    } else {
        int v = INF;
        for (auto next : getActions(s)) {
            v = min(v, alphaBeta(next, alpha, beta, true));
            beta = min(beta, v);
            if (beta <= alpha) break; // Alpha 剪枝
        }
        return v;
    }
}
```

</details>

---

## 四、 <Binary className="inline-block mr-2 mb-1 text-green-400" /> 状态压缩技巧 (State Compression)

在指数级搜索中，利用位运算高效表示和转移状态。

### 例题：[TSP 问题 - 状压 DFS + 记忆化]

> 给定 $n$ 个点的距离矩阵，求经过所有点各一次的最短回路。

<details>
<summary>Check Solution: C++ 状压实现</summary>

```cpp
#include <iostream>
#include <algorithm>
#include <cstring>

using namespace std;

int n, dist[20][20], memo[1 << 20][20];

int solve(int mask, int u) {
    if (mask == (1 << n) - 1) return dist[u][0]; // 返回起点
    if (memo[mask][u] != -1) return memo[mask][u];

    int res = 1e9;
    for (int v = 0; v < n; v++) {
        if (!(mask & (1 << v))) {
            res = min(res, solve(mask | (1 << v), v) + dist[u][v]);
        }
    }
    return memo[mask][u] = res;
}
```

</details>

---

## 五、 <Microscope className="inline-block mr-2 mb-1 text-cyan-500" /> 搜索效率量化分析

### 1. 有效分支因子 (Effective Branching Factor, $b^*$)

设搜索生成的节点总数为 $N$，目标深度为 $d$，有效分支因子 $b^*$ 满足：
$N + 1 = \sum_{i=0}^d (b^*)^i$
- 理想情况下，$h(s)$ 越精确，$b^*$ 越接近 $1$。
- **性能评估**：通过比较不同启发式函数在相同问题上的 $b^*$ 来量化搜索效率。

### 2. IDDFS 的时空权衡

**迭代加深深度优先搜索 (IDDFS)**：
- **空间**：$O(d)$。
- **时间**：$\sum_{i=1}^d b^i = \frac{b^{d+1}-b}{b-1} \approx O(b^d)$。虽然底层节点被重复访问，但在 $b \ge 2$ 时，最后一层的开销占主导地位，总体常数项仅比 BFS 略大。

---

## 🎯 综合练习与挑战

### 练习 1：[八数码问题 - A* 与 曼哈顿距离]
> 使用 A\* 算法求解八数码，对比曼哈顿距离与错位数估价函数的 $b^*$。

### 练习 2：[井字棋 - Minimax 与 完美决策]
> 实现一个不会输的井字棋 AI，并尝试应用 Alpha-Beta 剪枝。

---

_“搜索的本质是在庞大的解空间中，通过智慧的约束找到那道唯一的解。从盲目搜索到启发式引导，是计算从『体力活』向『脑力活』的进化。”_
