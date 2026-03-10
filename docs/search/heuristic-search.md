---
title: 搜索优化与启发式算法 (Search Optimization & Heuristics)
---

import { Search, Zap, Target, Thermometer, Box, ArrowRightCircle } from 'lucide-react';

# <Target className="inline-block mr-2 mb-1 text-purple-500" /> 搜索优化与启发式算法

搜索 (Search) 是计算机科学中最通用的求解框架之一。当面对无法通过贪心或动态规划直接求解的问题时，我们通过遍历**状态空间 (State Space)** 来寻找目标。本章将从系统的建模出发，探讨如何通过剪枝、双向、启发式及随机化手段提升搜索效率。

---

## 零、 系统化状态空间建模

任何搜索问题都可以抽象为三元组 $(S, A, T)$：
1. **状态空间 $S$ (State Set)**：问题中所有可能局面的集合。
2. **动作集 $A$ (Action Set)**：在某一状态下可以执行的所有合法操作。
3. **转移方程 $T$ (Transition)**：执行动作 $a \in A$ 后，状态从 $s$ 转移到 $s'$ 的映射。

**建模核心**：
- **完整性**：状态必须包含判断是否达到目标、判断下一步合法性所需的全部信息。
- **最小化**：尽量压缩状态表示（如位运算），减少搜索广度。

---

## 一、 剪枝优化 (Pruning Strategies)

剪枝的核心在于：**“如果不去搜索那些注定失败的分支，搜索速度将得到量级提升。”**

### 1. 常见剪枝分类

| 类别 | 描述 | 核心原理 |
| :--- | :--- | :--- |
| **可行性剪枝 (Feasibility)** | 检查当前状态是否可能达到合法解。 | 如果当前路径已违反约束，立即返回。 |
| **最优性剪枝 (Optimality)** | 比较当前代价与已知最优解。 | 如果当前代价 $g(n) \ge ans$，无需继续搜。 |
| **搜索顺序优化 (Search Order)** | 调整搜索分支的遍历顺序。 | 优先搜索分支更少（约束更强）的分支。 |
| **排除等效冗余 (Symmetry)** | 避免重复遍历逻辑上完全相同的状态。 | 通过排序或打表标记访问过的状态。 |

### 2. 例题：[小猫爬山](https://www.acwing.com/problem/content/167/)
> 给出 $N$ 只猫的体重和缆车的承重 $W$，求最少需要多少辆缆车？

<details>
<summary>C++ 实现 (含搜索顺序优化与最优性剪枝)</summary>

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

int n, w, ans;
int cat[20], cab[20];

void dfs(int u, int k) {
    // 最优性剪枝
    if (k >= ans) return;
    if (u == n) {
        ans = k;
        return;
    }

    for (int i = 0; i < k; i++) {
        // 可行性剪枝
        if (cab[i] + cat[u] <= w) {
            cab[i] += cat[u];
            dfs(u + 1, k);
            cab[i] -= cat[u]; // 回溯
        }
    }

    // 新开一辆车
    cab[k] = cat[u];
    dfs(u + 1, k + 1);
    cab[k] = 0;
}

int main() {
    cin >> n >> w;
    for (int i = 0; i < n; i++) cin >> cat[i];
    // 搜索顺序优化：从大的开始搜，能更快触发最优性剪枝
    sort(cat, cat + n, greater<int>());
    ans = n;
    dfs(0, 0);
    cout << ans << endl;
    return 0;
}
```
</details>

---

## 二、 双向搜索 (Bidirectional Search)

对于起始状态 $S$ 和目标状态 $T$，单向搜索的深度若为 $d$，分支因子为 $b$，则复杂度为 $O(b^d)$。
**双向搜索**通过 $S \to$ 与 $T \to$ 同时搜索，在中间相遇，复杂度降为 $O(b^{d/2} + b^{d/2})$。

### 核心技术：Meet-in-the-middle
常用于折半搜索。例如给出 40 个数，求子集和。可以将 40 拆分为 20+20，分别搜出所有可能的和，再合并。

---

## 三、 启发式搜索 (Heuristic Search)

### 1. A* 算法
A* 在广度优先搜索的基础上，引入估价函数：
$$f(n) = g(n) + h(n)$$
- $g(n)$：从起点到当前节点的实际代价。
- $h(n)$：从当前节点到目标的**预测代价**。

**定理 (可接受性 Admissibility)**：
若对于所有节点 $n$，都有 $h(n) \le h^*(n)$（其中 $h^*$ 为真实最短距离），则 A* 算法一定能找到最优解。

### 2. IDA* (Iterative Deepening A*)
结合了 DFS 的低空间消耗和 A* 的高效。
- 使用 $f(n) = g(n) + h(n)$ 作为剪枝条件。
- 设定当前最大搜索深度 $limit$，若 $g(n) + h(n) > limit$，则直接回溯。

---

## 四、 模拟退火 (Simulated Annealing)

模拟退火是一种通用随机化算法，源于物理退火过程，用于解决全局最优解问题（特别是 NP-Hard 问题）。

### 1. 核心流程：Metropolis 准则
在寻找最小值时，若新状态代价 $E_{new} < E_{old}$，必然接受；
若 $E_{new} > E_{old}$，则以概率 $P = \exp\left(-\frac{\Delta E}{T}\right)$ 接受。

### 2. 参数调优
- **初始温度 $T_0$**：通常设为 2000-5000。
- **终止温度 $T_{end}$**：通常设为 $10^{-8}$。
- **冷却系数 $\Delta T$**：通常设为 0.99-0.998。
- **卡时技巧**：`while ((double)clock() / CLOCKS_PER_SEC < 0.8)` 保证在时限内尽可能多跑几次。

---

## 配套练习（答案折叠）

### 练习 1：IDA* 求解 15-Puzzle (八数码进阶)
设计一个合适的估价函数 $h(n)$ 解决拼图问题。
<details>
<summary>点击查看过程与 C++ 实现</summary>

**估价函数设计**：使用**曼哈顿距离 (Manhattan Distance)** 之和。
$h(n) = \sum |x_i - target\_x_i| + |y_i - target\_y_i|$。

```cpp
#include <iostream>
#include <cmath>
using namespace std;

int q[16], limit;
int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};

int h() {
    int res = 0;
    for (int i = 0; i < 16; i++) {
        if (!q[i]) continue;
        int target_x = (q[i] - 1) / 4;
        int target_y = (q[i] - 1) % 4;
        res += abs(i / 4 - target_x) + abs(i % 4 - target_y);
    }
    return res;
}

bool dfs(int u, int depth, int prev_op) {
    int hv = h();
    if (hv == 0) return true;
    if (depth + hv > limit) return false;

    int z;
    for (z = 0; z < 16; z++) if (!q[z]) break;

    int x = z / 4, y = z % 4;
    for (int i = 0; i < 4; i++) {
        if (abs(i - prev_op) == 2) continue; // 不走回头路
        int nx = x + dx[i], ny = y + dy[i];
        if (nx < 0 || nx >= 4 || ny < 0 || ny >= 4) continue;
        
        swap(q[z], q[nx * 4 + ny]);
        if (dfs(u + 1, depth + 1, i)) return true;
        swap(q[z], q[nx * 4 + ny]);
    }
    return false;
}

int main() {
    // 输入 q[16]...
    while (!dfs(0, 0, -10)) limit++;
    cout << limit << endl;
    return 0;
}
```
</details>

### 练习 2：模拟退火求解 费马点 (Fermat Point)
给定平面上 $n$ 个点，求一个点到所有点距离之和最小。
<details>
<summary>点击查看过程与 C++ 实现</summary>

**策略**：随机化寻找点 $(x, y)$，通过模拟退火不断逼近最优解。

```cpp
#include <iostream>
#include <cmath>
#include <ctime>
#include <iomanip>
using namespace std;

struct Point { double x, y; } p[105];
int n;
double ans = 1e18;

double dist(double x, double y) {
    double res = 0;
    for (int i = 0; i < n; i++)
        res += sqrt((x - p[i].x) * (x - p[i].x) + (y - p[i].y) * (y - p[i].y));
    return res;
}

void sa() {
    double cur_x = 0, cur_y = 0; // 初始点可设为均值
    for(int i=0; i<n; i++) cur_x += p[i].x, cur_y += p[i].y;
    cur_x /= n; cur_y /= n;

    double t = 10000;
    while (t > 1e-4) {
        double nx = cur_x + ((rand() << 1) - RAND_MAX) * t;
        double ny = cur_y + ((rand() << 1) - RAND_MAX) * t;
        double d = dist(nx, ny);
        if (d < ans) {
            ans = d;
            cur_x = nx; cur_y = ny;
        } else if (exp((ans - d) / t) > (double)rand() / RAND_MAX) {
            cur_x = nx; cur_y = ny;
        }
        t *= 0.99;
    }
}

int main() {
    srand(time(0));
    cin >> n;
    for (int i = 0; i < n; i++) cin >> p[i].x >> p[i].y;
    for (int i = 0; i < 50; i++) sa(); // 多跑几次
    cout << fixed << setprecision(0) << ans << endl;
    return 0;
}
```
</details>

---

*“在巨大的搜索树中，估价函数 $h(n)$ 是那盏指引方向的明灯，而模拟退火则是我们在黑暗迷宫中寻找出口的运气与智慧。”*
