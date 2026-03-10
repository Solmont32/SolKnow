---
title: 搜索优化与启发式算法 (Search Optimization & Heuristics)
---

import { Search, Zap, Target, Thermometer, Box, ArrowRightCircle, Layers, ShieldCheck } from 'lucide-react';

# <Target className="inline-block mr-2 mb-1 text-purple-500" /> 搜索优化与启发式算法

搜索 (Search) 是解决复杂决策、组合最优化及路径规划问题的普适性框架。在计算复杂性理论的视角下，许多 NP-Hard 问题在缺乏多项式时间解法时，必须通过遍历**状态空间 (State Space)** 来寻找全局最优或可行解。本章致力于探讨如何通过严密的数学建模、状态空间压缩、以及启发式诱导，将指数级复杂度降至工程可接受的范围。

---

## 零、 <Layers className="inline-block mr-2 mb-1 text-blue-400" /> 系统化状态空间建模 (State Space Modeling)

一个完备的搜索问题可被形式化定义为五元组 $\mathcal{M} = \langle S, A, T, s_0, G \rangle$：

1.  **状态空间 $S$ (State Set)**：问题中所有可能局面的集合。
2.  **动作集 $A(s)$ (Action Set)**：在状态 $s \in S$ 下可执行的合法操作集合。
3.  **转移函数 $T: S \times A \to S$**：定义状态转移逻辑，$s' = T(s, a)$。
4.  **初始状态 $s_0 \in S$**：搜索的逻辑起点。
5.  **目标测试 $G(s) \to \{0, 1\}$**：判定 $s$ 是否为目标状态。

**建模原则**：
- **最小化 (Minimality)**：状态表示应仅包含影响决策与合法性的必要信息。例如，在位运算优化中，利用 `uint64_t` 的位掩码表示集合状态，可极大地减少空间开销并利用指令级并行。
- **正规化 (Canonicalization)**：对于对称或等效的状态，应通过排序或某种标准序（Lexicographical Order）映射到唯一的代表元，以消除搜索冗余。

---

## 一、 <ShieldCheck className="inline-block mr-2 mb-1 text-green-500" /> 搜索优化与剪枝 (Pruning Strategies)

剪枝的本质是在搜索树的遍历过程中，通过逻辑断言提前终止对无效子树的访问。

### 1. 剪枝分类与形式化定义

| 策略类别 | 数学描述 / 判定准则 | 核心目的 |
| :--- | :--- | :--- |
| **可行性剪枝 (Feasibility)** | 若 $\forall \text{ path } \tau \text{ from } s, G(\tau) = 0$，则剪枝。 | 剔除注定无法到达目标的路径。 |
| **最优性剪枝 (Optimality)** | 若 $g(s) + f_{low}(s) \ge \text{ans}_{best}$，则剪枝。 | 剔除代价已超过当前已知最优解的路径。 |
| **搜索顺序优化 (Ordering)** | $\text{sort}(\{a_i\}) \text{ s.t. } P(T(s, a_i) \in G) \text{ is maximized.}$ | 优先探索更有潜力的分支，及早更新 `ans_best`。 |
| **排除等效冗余 (Symmetry)** | 若 $s \equiv s' \text{ (under group action } \Gamma)$, 仅搜其一。 | 利用对称性（旋转、翻转、排列）压缩搜索树。 |

### 2. 例题：[小猫爬山 - 深度剪枝分析]
> 给定 $N$ 只小猫的体重 $w_i$ 和缆车承重 $W$，求最少缆车数。

<details>
<summary>C++ 高级实现（含位运算与搜索顺序策略）</summary>

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

/**
 * 优化策略：
 * 1. 搜索顺序：将猫按体重从大到小排序。重猫约束强，分支少，能更早触发最优性剪枝。
 * 2. 最优性剪枝：如果当前车数 k >= ans，说明该分支不可能产生更优解。
 */

int n, W, ans;
int w[20], cabs[20];

void dfs(int u, int k) {
    if (k >= ans) return; // 最优性剪枝
    if (u == n) {
        ans = k;
        return;
    }

    // 尝试放入已有缆车
    for (int i = 0; i < k; i++) {
        if (cabs[i] + w[u] <= W) { // 可行性剪枝
            cabs[i] += w[u];
            dfs(u + 1, k);
            cabs[i] -= w[u];
        }
    }

    // 放入新缆车
    cabs[k] = w[u];
    dfs(u + 1, k + 1);
    cabs[k] = 0;
}

int main() {
    ios::sync_with_stdio(false);
    cin >> n >> W;
    for (int i = 0; i < n; i++) cin >> w[i];
    
    sort(w, w + n, greater<int>()); // 搜索顺序优化
    
    ans = n;
    dfs(0, 0);
    cout << ans << endl;
    return 0;
}
```
</details>

---

## 二、 <Zap className="inline-block mr-2 mb-1 text-yellow-500" /> 双向搜索与折半查找 (Bidirectional & Meet-in-the-middle)

对于分支因子为 $b$，目标深度为 $d$ 的搜索树：
- **单向搜索**：$O(b^d)$
- **双向搜索**：从起点与终点同步扩展，相遇点深度各为 $d/2$，复杂度降为 $O(2 \cdot b^{d/2})$。

**折半搜索 (Meet-in-the-middle)** 是其在组合问题中的典型应用。例如：$N=40$ 的子集和问题，单搜 $2^{40} \approx 10^{12}$ 超时，拆分为 $2^{20} + 2^{20} \approx 2 \cdot 10^6$，配合二分查找或哈希表实现 $O(2^{N/2} \cdot \log(2^{N/2}))$。

---

## 三、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 启发式搜索 (Heuristic Search: A* & IDA*)

启发式搜索利用问题的领域知识（Domain Knowledge）构建估价函数，从而诱导搜索朝向目标节点。

### 1. 估价函数设计准则

核心公式：$f(n) = g(n) + h(n)$
- $g(n)$：从 $s_0$ 到当前节点 $n$ 的实际代价。
- $h(n)$：从节点 $n$ 到目标状态的**预测代价**。

#### A. 可接受性 (Admissibility)
若对于任意节点 $n$，都有 $0 \le h(n) \le h^*(n)$（$h^*$ 为真实最小代价），则称 $h(n)$ 是可接受的。
**定理**：若 $h(n)$ 是可接受的，则 A* 算法首次扩展到目标节点时，路径必为最优。

#### B. 一致性/单调性 (Consistency)
若对于任意边 $(n, a, n')$，都有 $h(n) \le c(n, a, n') + h(n')$ 且 $h(G)=0$，则称 $h(n)$ 是一致的。一致性蕴含了可接受性，且保证了 $f(n)$ 在路径上非递减。

### 2. IDA* (Iterative Deepening A*)
IDA* 结合了深度优先搜索 (DFS) 的空间优势（$O(d)$）与 A* 的高效剪枝。

**算法逻辑**：
1. 设定初始阈值 $limit = h(s_0)$。
2. 进行 DFS，若当前 $g(n) + h(n) > limit$，则直接回溯（剪枝）。
3. 若本次搜索未找到目标，更新 $limit$ 为搜索过程中触发剪枝的最小 $f(n)$ 值，重复步骤 2。

---

## 四、 估价函数建模实战：15-Puzzle 案例

在 N-Puzzle 问题中，常用的估价函数设计如下：
1.  **错位块数**：简单但不精确。
2.  **曼哈顿距离之和 (Manhattan Distance)**：$h(n) = \sum |x_i - \text{target}_x(i)| + |y_i - \text{target}_y(i)|$。
3.  **线性冲突 (Linear Conflict)**：若两块在同一行且目标也在该行，但它们相对顺序相反，则至少需要额外 2 步绕行。$h_{LC} = h_{Manhattan} + 2 \cdot \text{Conflicts}$。

<details>
<summary>C++ 高效 IDA* 模板 (针对 15-Puzzle 优化)</summary>

```cpp
#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

int board[16], limit;
int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};

// 曼哈顿距离估价函数
int get_h() {
    int res = 0;
    for (int i = 0; i < 16; i++) {
        if (board[i] == 0) continue;
        int target_x = (board[i] - 1) / 4;
        int target_y = (board[i] - 1) % 4;
        res += abs(i / 4 - target_x) + abs(i % 4 - target_y);
    }
    return res;
}

bool dfs(int depth, int prev_op, int h) {
    if (h == 0) return true;
    if (depth + h > limit) return false;

    int pos;
    for (pos = 0; pos < 16; pos++) if (board[pos] == 0) break;
    int x = pos / 4, y = pos % 4;

    for (int i = 0; i < 4; i++) {
        if (abs(i - prev_op) == 2) continue; // 排除等效冗余：不走回头路
        int nx = x + dx[i], ny = y + dy[i];
        if (nx < 0 || nx >= 4 || ny < 0 || ny >= 4) continue;

        int next_pos = nx * 4 + ny;
        int val = board[next_pos];
        // 增量更新估价函数 h (高效技巧)
        int target_x = (val - 1) / 4, target_y = (val - 1) % 4;
        int new_h = h - (abs(nx - target_x) + abs(ny - target_y)) 
                      + (abs(x - target_x) + abs(y - target_y));

        swap(board[pos], board[next_pos]);
        if (dfs(depth + 1, i, new_h)) return true;
        swap(board[pos], board[next_pos]);
    }
    return false;
}

int main() {
    // 省略输入与逆序对判解逻辑...
    int h = get_h();
    limit = h;
    while (!dfs(0, -10, h)) limit++;
    cout << "Minimum steps: " << limit << endl;
    return 0;
}
```
</details>

---

## 练习题库 (Exercises)

### 练习 1：IDA* 与 Bookcase 放置
> 给定若干不同尺寸的图书，需将其放入三层书架，求书架总面积（总高 $\times$ 最大宽）的最小值。

<details>
<summary>解题思路与 C++ 实现</summary>

**建模与剪枝**：
1. **状态定义**：`dfs(index, w1, w2, h1, h2, h3)` 表示当前处理到第几本书，三层当前的宽度和高度。
2. **搜索顺序**：按书的高度从大到小排序。第一本书必放第一层。
3. **估价函数**：若当前面积已超过最优解，或剩余书籍即使以最理想方式放置也无法优于当前解，则剪枝。

```cpp
// 核心逻辑框架
void dfs(int u, int w1, int w2, int w3, int h1, int h2, int h3) {
    int current_w = max({w1, w2, w3});
    int current_area = current_w * (h1 + h2 + h3);
    if (current_area >= ans) return; // 最优性剪枝

    if (u == n) {
        ans = current_area;
        return;
    }

    // 尝试放入三层，优先放入不增加总高度或高度增加最少的分支
    // ...
}
```
</details>

### 练习 2：模拟退火 (Simulated Annealing) 求解 TSP 问题
> 旅行商问题：给定 $N$ 个城市的坐标，求遍历所有城市并回到起点的最短路径。

<details>
<summary>解题过程与代码解析</summary>

**Metropolis 准则实现**：
模拟退火在处理具有大量局部最优解的问题（如 TSP）时具有极强鲁棒性。

```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>
#include <ctime>

using namespace std;

struct Point { double x, y; } p[50];
int n, path[50];
double ans = 1e18;

double total_dist() {
    double d = 0;
    for (int i = 0; i < n; i++) {
        int u = path[i], v = path[(i + 1) % n];
        d += sqrt(pow(p[u].x - p[v].x, 2) + pow(p[u].y - p[v].y, 2));
    }
    return d;
}

void sa() {
    double T = 5000, eps = 1e-9, delta = 0.995;
    while (T > eps) {
        int a = rand() % n, b = rand() % n;
        reverse(path + min(a, b), path + max(a, b) + 1); // 2-opt 变换
        double cur = total_dist();
        if (cur < ans) {
            ans = cur;
        } else if (exp((ans - cur) / T) < (double)rand() / RAND_MAX) {
            reverse(path + min(a, b), path + max(a, b) + 1); // 拒绝：回溯
        }
        T *= delta;
    }
}

int main() {
    srand(time(0));
    // 输入与初始化 path...
    for (int i = 0; i < 100; i++) sa(); // 多次迭代
    printf("%.2f\n", ans);
    return 0;
}
```
</details>

---

*“在有限的算力面前，搜索的艺术即是『有原则地放弃』。通过 $h(n)$ 洞察未来，通过剪枝约束当下，方能于万亿状态中取敌首级。”*
