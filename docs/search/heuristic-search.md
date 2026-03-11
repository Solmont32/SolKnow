---
title: 搜索算法精要 (Search Algorithms & Heuristics)
---

import { Search, Zap, Target, Thermometer, Box, ArrowRightCircle, Layers, ShieldCheck, Activity, Cpu, Database, Swords, Microscope, TrendingUp } from 'lucide-react';

# <Target className="inline-block mr-2 mb-1 text-purple-500" /> 搜索算法与启发式策略

搜索 (Search) 是解决复杂决策、组合最优化及路径规划问题的普适性框架。从算法深度来看，搜索不仅是“遍历”，更是对**状态空间 (State Space)** 的代数结构与拓扑特性的深度挖掘。本章旨在探讨如何通过严密的数学建模、剪枝证明、估价函数诱导以及时空权衡，将指数级复杂度降至工程可接受范围。

---

## 零、 <Layers className="inline-block mr-2 mb-1 text-blue-400" /> 系统化状态空间建模

### 1. 形式化定义与搜索树展开

一个完备的搜索问题可定义为五元组 $\mathcal{M} = \langle S, A, T, s_0, G \rangle$。搜索的本质是在由 $T$ 诱导的有向图 $\mathcal{G} = (S, E)$ 中寻找从 $s_0$ 到 $G$ 的路径。

- **状态空间规模**：若分支因子为 $b$，深度为 $d$，则搜索树节点总数 $|V| = \sum_{i=0}^d b^i = \frac{b^{d+1}-1}{b-1} \approx O(b^d)$。
- **复杂度控制**：搜索算法的优劣取决于其在展开过程中**过滤无效节点**的能力。

### 2. 对称性破缺与同构状态合并

若状态空间存在等价关系 $\sim$（如平移、翻转、旋转不变性），则只需搜索商空间 $S/\sim$。

- **引理**：若代价函数 $c(s, a) = c(\sigma(s), \sigma(a))$ 且 $G$ 在变换 $\sigma$ 下不变，则最优解必在代表元集合中。

---

## 一、 <ShieldCheck className="inline-block mr-2 mb-1 text-green-500" /> 搜索树剪枝：数学证明与系统化准则

剪枝并非单纯的技巧，而是基于逻辑断言 (Logic Assertion) 的搜索空间缩减。

### 1. 可行性剪枝 (Feasibility Pruning)

**定理 1**：若存在谓词 $P: S \to \{0, 1\}$，使得 $\forall s \in S, P(s) = 0 \implies (\forall \tau: s \xrightarrow{\tau} s', s' \notin G)$，则在搜索到 $s$ 且 $P(s)=0$ 时停止搜索是完备的。

- **应用逻辑**：提前计算状态的“生存界限”（如迷宫中当前点到出口的连通性或步数限制）。

### 2. 最优性剪枝 (Optimality Pruning)

**定理 2**：令 $g(s)$ 为从 $s_0$ 到 $s$ 的当前已知路径代价，$\hat{h}(s)$ 为从 $s$ 到 $G$ 的**代价下界**。若 $g(s) + \hat{h}(s) \ge \text{ans}_{best}$，则以 $s$ 为根的子树中不存在优于当前最优解的路径。

- **证明**：由下界定义，$\forall s' \in \text{Subtree}(s) \cap G$，其总代价 $g(s') \ge g(s) + \text{dist}(s, s') \ge g(s) + \hat{h}(s) \ge \text{ans}_{best}$，故剪枝无损最优性。

### 3. 精选例题：[木棒拼接 - 系统化剪枝]

> 给定 $n$ 根小木棒，拼接成若干长度相同的长木棒，求可能的最小长度。

<details>
<summary>Check Solution: 极限界剪枝 C++ 实现</summary>

**核心剪枝逻辑分析**：

1. **搜索顺序优化**：按长度降序排列。优先尝试长木棒可减少递归深度。
2. **重复状态剪枝**：若当前长度失败，跳过后续所有相同长度。
3. **关键边界剪枝**：
   - 若拼入的第一根木棒就失败，则当前总长度必然非法（因为这根木棒终究要被用掉）。
   - 若填满最后一根木棒后后续失败，则当前总长度非法（等价性证明：改用更短的组合填满该位置只会更劣）。

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

using namespace std;

int n, a[70], vis[70], total, target, m;

bool dfs(int cnt, int cur, int last) {
    if (cnt == m) return true;
    if (cur == target) return dfs(cnt + 1, 0, n);

    for (int i = last - 1; i >= 0; i--) {
        if (vis[i] || cur + a[i] > target) continue;
        vis[i] = 1;
        if (dfs(cnt, cur + a[i], i)) return true;
        vis[i] = 0;

        // --- 核心剪枝证明应用 ---
        // 1. 若当前拼接位置 cur 为 0 且失败，说明第一个位置无法填充，直接回溯
        if (cur == 0) return false;
        // 2. 若当前刚好凑满 target 且后续失败，说明此长度方案不可行
        if (cur + a[i] == target) return false;
        // 3. 跳过相同长度
        while (i > 0 && a[i] == a[i - 1]) i--;
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    while (cin >> n && n) {
        total = 0;
        for (int i = 0; i < n; i++) { cin >> a[i]; total += a[i]; }
        sort(a, a + n); // 从小到大排，DFS 中从后往前扫即为从大到小
        for (target = a[n - 1]; target <= total; target++) {
            if (total % target == 0) {
                m = total / target;
                fill(vis, vis + n, 0);
                if (dfs(0, 0, n)) { cout << target << endl; break; }
            }
        }
    }
    return 0;
}
```

</details>

---

## 二、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 启发式搜索：A* 与 IDA*

### 1. 估价函数 $h(s)$ 的设计原则

估价函数 $h(s)$ 是将领域知识注入搜索的关键。

- **可接受性 (Admissibility)**：$0 \le h(s) \le h^*(s)$。保证 A\* 找到最优解。
- **设计策略**：
  - **问题松弛 (Relaxation)**：移除某些约束得到更简单的子问题代价（如曼哈顿距离是忽略障碍物的棋盘距离）。
  - **子问题数据库 (Pattern Databases)**：预计算子问题的精确代价。

### 2. A\* 算法最优性证明

设 $f(s) = g(s) + h(s)$。若 $h(s)$ 是可接受的，则 A\* 首次弹出目标节点时必为最优路径。

- **证明**：假设 A* 选出非最优目标 $G_{bad}$，此时 $g(G\_{bad}) > g(G^*)$。
  由于 $G^*$ 尚未弹出，其路径上必有一节点 $n$ 在 OpenList 中。
  $f(n) = g(n) + h(n) \le g(n) + h^*(n) = f^*(G^*) = g(G^*) < g(G_{bad})$。
  根据优先队列性质，$n$ 必在 $G_{bad}$ 之前弹出，矛盾。

### 3. IDA* (Iterative Deepening A*)

结合了 DFS 的低空间消耗 ($O(d)$) 与 A\* 的启发导向。

- **逻辑**：以 $f(s)$ 为深度限制进行限深 DFS。
- **优势**：在状态空间极其庞大（如 15-Puzzle）且需要找最优解时，IDA* 远优于 A*。

---

## 三、 <Microscope className="inline-block mr-2 mb-1 text-cyan-500" /> 时空复杂度与收敛分析

### 1. A\* 的复杂度收敛

- **空间复杂度**：$O(b^d)$，需存储所有生成的节点。这是 A\* 的主要瓶颈。
- **时间复杂度**：取决于 $|h(s) - h^*(s)|$。若 $h(s) = h^*(s)$，则 A\* 直接沿最优路径前进，时间 $O(d)$。若 $h(s) = 0$，退化为 Dijkstra $O(b^d)$。

### 2. 有效分支因子 (Effective Branching Factor)

定义 $b^*$ 使得 $N = \frac{(b^*)^{d+1}-1}{b^*-1}$。良好的 $h(s)$ 能使 $b^*$ 接近 $1$。

---

## 四、 <Cpu className="inline-block mr-2 mb-1 text-yellow-500" /> 高阶实战例题

### 例题 1：[15-Puzzle (15 数码) - IDA* 极限优化]

> 在 $4 \times 4$ 网格中移动数字块使之有序。

<details>
<summary>Check Solution: IDA* 与 线性冲突优化</summary>

**核心优化：线性冲突 (Linear Conflict)**
若两数字在同一行且目标也在该行，但它们当前的左右顺序与目标相反，则它们必须多出至少 2 步交叉移动。这使 $h(s)$ 更接近 $h^*(s)$。

```cpp
#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

int board[16], limit;
int dx[] = {-1, 1, 0, 0}, dy[] = {0, 0, -1, 1};

int get_h() {
    int h = 0;
    for (int i = 0; i < 16; i++) {
        if (board[i] == 0) continue;
        int target_x = (board[i] - 1) / 4;
        int target_y = (board[i] - 1) % 4;
        h += abs(i / 4 - target_x) + abs(i % 4 - target_y);
    }
    // 此外可加入 Linear Conflict 优化...
    return h;
}

bool dfs(int g, int empty_pos, int pre) {
    int h = get_h();
    if (g + h > limit) return false;
    if (h == 0) return true;

    int r = empty_pos / 4, c = empty_pos % 4;
    for (int i = 0; i < 4; i++) {
        if ((i ^ 1) == pre) continue;
        int nx = r + dx[i], ny = c + dy[i];
        if (nx >= 0 && nx < 4 && ny >= 0 && ny < 4) {
            int next_pos = nx * 4 + ny;
            swap(board[empty_pos], board[next_pos]);
            if (dfs(g + 1, next_pos, i)) return true;
            swap(board[empty_pos], board[next_pos]);
        }
    }
    return false;
}
```

</details>

### 例题 2：[K 短路问题 - A* + 可持久化左偏树]

> 在有向图中求从 $S$ 到 $T$ 的第 $k$ 短路径长度。

<details>
<summary>Check Solution: A* 与 $h(s) = \text{dist}(s, T)$</summary>

**算法逻辑**：

1. 反向跑 Dijkstra 求出所有点到 $T$ 的最短路 $d(s)$，令 $h(s) = d(s)$。
2. 优先队列维护 $(g(s) + h(s), s)$。
3. 当节点 $T$ 第 $k$ 次被从队列弹出时，$g(T)$ 即为第 $k$ 短路。

```cpp
// 伪代码逻辑
priority_queue<Node> pq;
pq.push({0 + dist_to_T[S], S, 0});
int cnt = 0;
while(!pq.empty()) {
    Node u = pq.top(); pq.pop();
    if (u.id == T) {
        if (++cnt == K) return u.g;
    }
    for (auto& edge : adj[u.id]) {
        pq.push({u.g + edge.w + dist_to_T[edge.to], edge.to, u.g + edge.w});
    }
}
```

</details>

---

## 🎯 综合练习与挑战

### 练习 1：[迷宫搜宝 - 双向 BFS 优化]

> 给定起点与终点，中间有若干障碍，求最短步数。

<details>
<summary>Check Solution: 双向扩展逻辑</summary>
双向 BFS 可将搜索空间从 $O(b^d)$ 降至 $O(b^{d/2} + b^{d/2})$。
</details>

### 练习 2：[数独求解器 - 最少剩余值 (MRV) 启发式]

> 填满 9x9 数独。

<details>
<summary>Check Solution: 排序搜索顺序</summary>
每次选择当前可选数字最少的格子进行填充，可极大提高剪枝效率。
</details>

---

_“搜索的本质是在庞大的解空间中，通过智慧的约束找到那道唯一的解。从盲目搜索到启发式引导，是计算从『体力活』向『脑力活』的进化。”_
