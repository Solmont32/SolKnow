---
title: 搜索与启发式算法练习
---

# 搜索与启发式算法练习 (Search & Heuristics Exercises)

本页涵盖剪枝优化、双向搜索、A*、IDA* 及模拟退火的综合练习。所有题目均配有 C++ 解答。

---

## 基础与剪枝 (Pruning)

### 练习 1：数字组合 (DFS 基础)
给定 $N$ 个正整数，从中挑选若干数，使其和为 $M$，求方案数。

<details>
<summary>点击查看过程与 C++ 实现</summary>

**解析**：
1. 经典的 0/1 背包变体，但使用 DFS 实现时，通过**搜索顺序优化**（从大到小搜）可以减少状态。
2. 基础 DFS，每个数只有选或不选两种可能。

**C++ 实现**：
```cpp
#include <iostream>
using namespace std;
int n, m, a[25], ans;
void dfs(int u, int sum) {
    if (sum == m) { ans++; return; }
    if (u == n || sum > m) return;
    dfs(u + 1, sum + a[u]); // 选
    dfs(u + 1, sum);        // 不选
}
```
**答案**：DFS 回溯或动态规划。
</details>

### 练习 2：栅栏的木料 (可行性剪枝)
有 $N$ 块长木料和 $M$ 块需要的小木料，问最多能切出多少块小木料？

<details>
<summary>点击查看过程与答案</summary>

**解析**：
1. **二分答案**：二分能切出的小木料数量 $K$。
2. **DFS 验证**：
    - **搜索顺序**：小木料从小到大排序。
    - **可行性剪枝**：如果当前剩余木料总量 < 剩余需要切出的小木料总量，则剪枝。
    - **冗余剪枝**：相同长度的小木料合并处理。

**答案**：二分 + DFS + 强剪枝。
</details>

---

## 进阶搜索 (A* / IDA* / Bidirectional)

### 练习 3：送礼物 (双向搜索 / Meet-in-the-middle)
有 $N$ 件礼物，每件重 $G_i$，车承重 $W$。求最多能装多少重的礼物？($N \le 45$)

<details>
<summary>点击查看过程与 C++ 实现</summary>

**解析**：
1. $2^{45}$ 巨大，但 $2^{22.5}$ 约为 $6 \times 10^6$，可接受。
2. 将礼物按重量降序排列。
3. 前 $N/2$ 个搜出所有可能的组合重量，存入数组并排序去重。
4. 后 $N/2$ 个搜出组合重量 $X$，在数组中二分寻找最大的 $Y \le W - X$。

**答案**：折半搜索 (Meet-in-the-middle)。
</details>

### 练习 4：排书 (IDA*)
给定 $N$ 本书的排列，每次可以取出一叠连续的书插入到其他位置。最少多少次操作使书有序？($N \le 15$, 答案 $\le 4$)

<details>
<summary>点击查看过程与 C++ 实现</summary>

**解析**：
1. **状态转换**：每次操作最多改变 3 个位置的后继关系。
2. **估价函数 $h(n)$**：设当前错误的后继关系数量为 $tot$，每次操作最多修复 3 个。故 $h(n) = \lceil tot / 3 \rceil$。
3. **IDA***：设置深度限制 $0 \sim 4$。

**答案**：IDA* + 乐观估价函数。
</details>

---

## 随机化启发式 (Simulated Annealing)

### 练习 5：均分数据 (模拟退火)
将 $N$ 个数分成 $M$ 组，使各组和的方差最小。

<details>
<summary>点击查看过程与 C++ 实现</summary>

**解析**：
1. 贪心初解：每次将新数放入当前和最小的组。
2. **模拟退火**：
    - 随机选择一个数 $x$，将其从当前组移动到另一随机组 $y$。
    - 计算方差变化 $\Delta E$。
    - 按概率接受新状态。

**C++ 实现片段**：
```cpp
void sa() {
    double t = 10000;
    while (t > 1e-4) {
        int a = rand() % n + 1, b = rand() % m + 1;
        int old_grp = grp[a];
        if (old_grp == b) { t *= 0.99; continue; }
        double old_ans = calc(); // 计算当前方差
        // 尝试移动
        s[old_grp] -= w[a]; s[b] += w[a]; grp[a] = b;
        double new_ans = calc();
        double de = new_ans - old_ans;
        if (exp(-de / t) < (double)rand() / RAND_MAX) { // 不接受
            s[old_grp] += w[a]; s[b] -= w[a]; grp[a] = old_grp;
        }
        t *= 0.99;
    }
}
```

**答案**：模拟退火。
</details>

### 练习 6：吊打 XXX (多峰函数最值)
在二维平面上寻找一个点 $(x, y)$，使其到 $N$ 个已知点的最大距离最小。

<details>
<summary>点击查看过程与答案</summary>

**解析**：
1. 这是一个“最小外接圆”问题的变体，函数在平面上是单峰或多峰的。
2. 模拟退火在平面上随机游走。
3. 也可以使用三分套三分（若函数是凸的）。

**答案**：模拟退火或爬山算法。
</details>

---

_编者注：搜索算法是处理“未知”的艺术。剪枝是理性，而模拟退火则是带有运气的灵感。_
