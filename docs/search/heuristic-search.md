---
title: 搜索算法与启发式策略 (Search Algorithms & Heuristics)
---

import { Search, Zap, Target, Thermometer, Box, ArrowRightCircle, Layers, ShieldCheck, Activity, Cpu, Database, Swords } from 'lucide-react';

# <Target className="inline-block mr-2 mb-1 text-purple-500" /> 搜索算法与启发式策略

搜索 (Search) 是解决复杂决策、组合最优化及路径规划问题的普适性框架。在计算复杂性理论视角下，许多 NP-Hard 问题在缺乏多项式时间解法时，必须遍历**状态空间 (State Space)**。本章旨在探讨如何通过严密的数学建模、状态空间压缩、估价函数诱导以及时空权衡，将指数级复杂度降至工程可接受范围。

---

## 零、 <Layers className="inline-block mr-2 mb-1 text-blue-400" /> 系统化状态空间建模与复杂度控制

### 1. 状态空间的形式化定义
一个完备的搜索问题可定义为五元组 $\mathcal{M} = \langle S, A, T, s_0, G \rangle$：
- $S$：有限或无限的**状态集**。
- $A(s)$：状态 $s$ 下的**合法动作集**。
- $T: S \times A \to S$：**状态转移函数**。
- $s_0 \in S$：**初始状态**。
- $G \subseteq S$：**目标状态集**。

**搜索树 (Search Tree)** 是从 $s_0$ 出发，通过 $T$ 展开的虚拟结构。其规模由**分支因子 $b$**（平均 $|A(s)|$）和**目标深度 $d$** 决定，总节点数 $O(b^d)$ 呈指数爆炸。

### 2. 状态压缩与位运算 (State Compression)
当状态由多个二进制特征（如集合包含关系、开关状态）组成时，利用位掩码 (Bitmask) 可实现 $O(1)$ 的状态转移与空间极小化。
- **技巧**：使用 `int` 或 `long long` 的位表示集合，配合 `__builtin_ctz` 或 `lowbit` 加速查找。

### 3. 对称性破缺 (Symmetry Breaking)
若状态空间存在群作用下的对称性，应仅保留其**等效类代表元**。
- **定理**：若状态空间在变换 $\sigma$ 下不变且代价等价，则搜索树中只需处理满足 $s \preceq \sigma(s)$ 的分支。

---

## 一、 <ShieldCheck className="inline-block mr-2 mb-1 text-green-500" /> 搜索树优化：系统化剪枝策略

剪枝的核心是在不影响正确性的前提下，利用逻辑断言提前终止对无效子树的访问。

### 1. 剪枝分类与形式化准则

| 策略类别 | 判定准则 (Predicate) | 优化逻辑 |
| :--- | :--- | :--- |
| **可行性剪枝 (Feasibility)** | $\nexists \, \tau: s \xrightarrow{\tau} G$ | 若当前状态通过任何动作序列都无法到达目标，立即回溯。 |
| **最优性剪枝 (Optimality)** | $g(s) + f_{low}(s) \ge \text{ans}_{best}$ | 若当前代价 + 理想最小余下代价已劣于已知最优，则剪枝。 |
| **搜索顺序优化 (Ordering)** | $\arg \min_{a \in A} \text{Size}(\text{Subtree}(T(s, a)))$ | 优先搜索“限制最强”的分支（如 Sudoku 中剩余选项最少的格子）。 |
| **排除冗余 (Redundancy)** | $s \in \text{Hash表}$ | 记录已访问状态，避免在图搜索中陷入死循环或重复计算。 |

### 2. 精选例题：[木棒拼接 - 极限界剪枝]
> 给定 $n$ 根小木棒，要求将其拼接成若干长度相同的长木棒，求可能的最小长度。

<details>
<summary>Check Solution: 深度剪枝 C++ 实现</summary>

**核心剪枝逻辑**：
1. **搜索顺序**：从长到短排序。
2. **相同长度去重**：若当前木棒不符合要求，跳过后续相同长度的木棒。
3. **空位首根失败**：若拼入第一根木棒就失败，则当前总长度必然非法。
4. **末尾填满失败**：若填满最后一根木棒后后续失败，则当前总长度非法。

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

        // 核心剪枝
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
                if (dfs(0, 0, n)) { cout << target << endl; break; }
            }
        }
    }
    return 0;
}
```
</details>

---

## 二 <Target className="inline-block mr-2 mb-1 text-red-500" /> 启发式搜索：A* 与 IDA*

### 1. A* 算法的最优性证明
定义 $f(n) = g(n) + h(n)$。
- **可接受性 (Admissibility)**：若 $h(n) \le h^*(n)$（实际最小代价），则 A* 一定能找到最短路。
- **一致性 (Consistency)**：若 $h(n) \le c(n, a, n') + h(n')$，则 $f(n)$ 随路径非递减。

**证明（可接受性）**：假设 A* 选出了非最优目标 $G_2$（即 $g(G_2) > g(G^*)$）。在弹出 $G_2$ 时，最优路径上必存在一节点 $n$ 在队列中。
$f(n) = g(n) + h(n) \le g(n) + h^*(n) = f^*(n) = g(G^*) < g(G_2) = f(G_2)$。
由于 $f(n) < f(G_2)$，队列应优先弹出 $n$ 而非 $G_2$，矛盾。

### 2. IDA* (Iterative Deepening A*)
IDA* 是 IDDFS 与 $f(n)$ 估价的结合，主要解决 A* 空间消耗大的问题。
- **核心逻辑**：设定 $f$-limit，若当前 $g(s) + h(s) > \text{limit}$ 则回溯，并记录最小的越界 $f$ 值作为下一轮 limit。

### 3. 精选例题：[八数码问题 - IDA* 与 逆序对性质]
<details>
<summary>Check Solution: IDA* 实现与哈希优化</summary>

**估价函数**：使用各数码到目标位置的曼哈顿距离之和。
**性质剪枝**：八数码问题的逆序对奇偶性在空格平移（左右不改变，上下改变偶数列数）下具有不变性（或确定变化规律），可提前排除 50% 的不可达状态。

```cpp
#include <iostream>
#include <cmath>

using namespace std;

int board[9], limit, next_limit;
int target[9] = {1, 2, 3, 4, 5, 6, 7, 8, 0};

int get_h() {
    int h = 0;
    for (int i = 0; i < 9; i++) {
        if (board[i] == 0) continue;
        int val = board[i] - 1;
        h += abs(i / 3 - val / 3) + abs(i % 3 - val % 3);
    }
    return h;
}

bool dfs(int g, int empty_pos, int pre) {
    int h = get_h();
    if (g + h > limit) {
        next_limit = min(next_limit, g + h);
        return false;
    }
    if (h == 0) return true;

    int dx[] = {-1, 1, 0, 0}, dy[] = {0, 0, -1, 1};
    int r = empty_pos / 3, c = empty_pos % 3;
    for (int i = 0; i < 4; i++) {
        if (i == (pre ^ 1)) continue; // 不往回走
        int nx = r + dx[i], ny = c + dy[i];
        if (nx >= 0 && nx < 3 && ny >= 0 && ny < 3) {
            int n_pos = nx * 3 + ny;
            swap(board[empty_pos], board[n_pos]);
            if (dfs(g + 1, n_pos, i)) return true;
            swap(board[empty_pos], board[n_pos]);
        }
    }
    return false;
}
```
</details>

---

## 三、 <Swords className="inline-block mr-2 mb-1 text-blue-600" /> 博弈搜索 (Adversarial Search)

在零和博弈（Zero-Sum Game）中，玩家 A 试图最大化收益，玩家 B 试图最小化 A 的收益。

### 1. Minimax 算法与 Alpha-Beta 剪枝
- **Minimax**：递归计算子节点的最优值。
- **Alpha-Beta 剪枝**：
  - $\alpha$：当前节点及祖先节点已发现的 **Max** 玩家的下界。
  - $\beta$：当前节点及祖先节点已发现的 **Min** 玩家的上界。
  - **剪枝条件**：若 $\alpha \ge \beta$，则当前子树不可能影响最终结果。

### 2. 时空增强：置换表与启发式排序
- **置换表 (Transposition Table)**：利用 Zobrist Hashing 记录已搜过的博弈状态。
- **杀手启发式 (Killer Heuristic)**：优先尝试在同层其他分支中导致剪枝的动作。

---

## 四、 <Activity className="inline-block mr-2 mb-1 text-orange-400" /> 现代启发式：模拟退火 (Simulated Annealing)

对于连续或极大规模离散优化，若搜索树不可构建，可利用物理退火原理。
- **Metropolis 准则**：若新解更优则接受；若更劣，以 $P = e^{-\Delta E / T}$ 的概率接受。
- **参数控制**：初温 $T_0$、冷却系数 $\alpha \in [0.95, 0.999]$、末温 $T_{end}$。

---

## 🎯 综合练习与实战

### 练习 1：[骑士巡逻问题 - Warnsdorff 启发式]
> 在 $N \times N$ 的棋盘上，骑士不重复地走遍所有格子的路径。

<details>
<summary>Check Solution: Warnsdorff 规则</summary>

**策略**：每次优先选择“下一步可选位置最少”的格子。这是一种典型的贪心启发式，极大地减小了分支回溯概率。

```cpp
// 核心逻辑：排序下一步动作
struct Move {
    int x, y, degree;
    bool operator<(const Move& other) const { return degree < other.degree; }
};

int get_degree(int x, int y) {
    int d = 0;
    for(int i=0; i<8; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        if(is_valid(nx, ny) && !vis[nx][ny]) d++;
    }
    return d;
}
```
</details>

### 练习 2：[井字棋对抗 - Alpha-Beta 搜索]
> 实现一个无懈可击的井字棋 AI。

<details>
<summary>Check Solution: Alpha-Beta 实现</summary>

```cpp
int minimax(int board[3][3], int depth, bool isMax, int alpha, int beta) {
    int score = evaluate(board);
    if (score == 10 || score == -10 || !isMovesLeft(board)) return score;

    if (isMax) {
        int best = -1000;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (board[i][j] == 0) {
                    board[i][j] = 1;
                    best = max(best, minimax(board, depth + 1, !isMax, alpha, beta));
                    board[i][j] = 0;
                    alpha = max(alpha, best);
                    if (beta <= alpha) break;
                }
            }
        }
        return best;
    } else {
        int best = 1000;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (board[i][j] == 0) {
                    board[i][j] = 2;
                    best = min(best, minimax(board, depth + 1, !isMax, alpha, beta));
                    board[i][j] = 0;
                    beta = min(beta, best);
                    if (beta <= alpha) break;
                }
            }
        }
        return best;
    }
}
```
</details>

---

*“搜索的本质是在庞大的解空间中，通过智慧的约束找到那道唯一的解。从盲目搜索到启发式引导，是计算从『体力活』向『脑力活』的进化。”*
