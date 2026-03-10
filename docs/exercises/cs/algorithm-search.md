---
title: 搜索与启发式算法专项强化练习
sidebar_label: 搜索与启发式算法
---

import { Target, Zap, ShieldCheck, BarChart3, ChevronRight, Code2, Layers, Search } from 'lucide-react';

# 搜索与启发式算法专项强化练习 (Search & Heuristics)

> **“在巨大的搜索树中，每一层剪枝都是对计算冗余的优雅反击。”** —— 本专题旨在建立从“暴力 DFS”到“智能启发式搜索”的完整方法论，通过状态空间缩减与估价函数设计，攻克 NP-Hard 问题的近似求解与小规模精确求解。

---

## 🪜 练习阶梯与评价标准

| 等级 | 难度目标 | 核心考察点 | 期望达成 |
| :--- | :--- | :--- | :--- |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 状态空间缩减 | 搜索顺序优化、可行性/最优性剪枝 | 能够识别并剪掉 90% 以上的冗余分支 |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 状态建模创新 | 双向搜索 (Meet-in-the-middle)、迭代加深 | 能够处理状态空间达 $2^{40}$ 级别的搜索 |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span> | 启发式设计 | A* 算法、IDA* 算法、估价函数 $h(n)$ 设计 | 能够设计出满足“可容性”的强约束估价函数 |

---

## 一、 基础剪枝与状态优化 (Level A)

### 练习 1：数字组合 - DFS 状态缩减
给定 $N$ 个正整数 $a_i$，从中挑选若干数使其和为 $M$，求方案数。($N \le 20, M \le 1000$)

<details>
<summary>Check Solution (C++ Implementation)</summary>

**解析**：
1. **状态定义**：`dfs(u, current_sum)` 表示考虑到第 $u$ 个数，当前和为 `current_sum`。
2. **优化策略**：
    - **可行性剪枝**：若 `current_sum > M`，立即停止。
    - **搜索顺序**：虽然此题方案数统计受顺序影响较小，但在最优化问题中，从大到小排列能更快触发剪枝。

**C++ 实现**：
```cpp
#include <iostream>
#include <algorithm>

using namespace std;

int n, m, a[25], ans;

void dfs(int u, int sum) {
    if (sum == m) {
        ans++;
        return;
    }
    if (u == n || sum > m) return;

    // 选当前数
    dfs(u + 1, sum + a[u]);
    // 不选当前数
    dfs(u + 1, sum);
}

int main() {
    cin >> n >> m;
    for (int i = 0; i < n; i++) cin >> a[i];
    dfs(0, 0);
    cout << ans << endl;
}
```
</details>

### 练习 2：小猫爬山 - 搜索顺序与最优性剪枝
$N$ 只猫，体重 $w_i$，缆车承重 $W$。求最少缆车数。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**解析**：
1. **搜索顺序优化**：将猫按体重**降序排序**。重猫放置灵活度低，先处理能极大减少搜索树深层的分支数。
2. **最优性剪枝**：记录当前已找到的最少车数 `min_cabs`。若当前已开 `k` 辆车且 $k \ge min\_cabs$，则剪枝。

**C++ 实现**：
```cpp
#include <iostream>
#include <algorithm>

using namespace std;

int n, W, ans;
int w[20], cabs[20];

void dfs(int u, int k) {
    if (k >= ans) return; // 最优性剪枝
    if (u == n) {
        ans = k;
        return;
    }
    for (int i = 0; i < k; i++) {
        if (cabs[i] + w[u] <= W) {
            cabs[i] += w[u];
            dfs(u + 1, k);
            cabs[i] -= w[u];
        }
    }
    cabs[k] = w[u];
    dfs(u + 1, k + 1);
    cabs[k] = 0;
}
```
</details>

---

## 二、 进阶搜索模型 (Level B)

### 练习 3：送礼物 - 双向搜索与折半查找
$N \le 45$ 件礼物，每件重 $G_i$，车承重 $W$。求最多能装多少重的礼物？

<details>
<summary>Check Solution (C++ Implementation)</summary>

**数学推导**：
直接 DFS 复杂度 $O(2^{45})$ 过大。
**折半搜索 (Meet-in-the-middle)**：将礼物分为两部分 $A$ ($22$ 件) 和 $B$ ($23$ 件)。
1. 搜索 $A$ 所有组合重量，存储并排序。
2. 搜索 $B$ 的组合重量 $X$，在 $A$ 的结果中二分查找最大的 $Y \le W - X$。
复杂度：$O(2^{N/2} \cdot \log 2^{N/2})$。

**C++ 实现**：
```cpp
// 核心逻辑：两个 DFS + upper_bound
void dfs1(int u, LL sum) {
    if (u == k) { weights.push_back(sum); return; }
    if (sum + w[u] <= W) dfs1(u + 1, sum + w[u]);
    dfs1(u + 1, sum);
}
// ... 第二次 DFS 时进行二分查找更新 ans
```
</details>

### 练习 4：排书 - IDA* 与后继关系估价
给定 $N \le 15$ 本书的排列，每次可将一叠连续书抽出并插入他处。求 4 步内使有序的最少步数。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**估价函数 $h(n)$ 设计**：
每次操作最多改变 3 个位置的后继关系。设当前不正确的后继关系总数为 $tot$，则 $h(n) = \lceil tot / 3 \rceil$。

**C++ 代码实现**：
```cpp
int f() {
    int tot = 0;
    for (int i = 0; i < n - 1; i++)
        if (q[i + 1] != q[i] + 1) tot++;
    return (tot + 2) / 3;
}
// IDA* 框架
bool dfs(int depth) {
    if (depth + f() > limit) return false;
    if (f() == 0) return true;
    // ... 尝试所有可能的区间切分与插入位置
}
```
</details>

---

## 三、 启发式与随机化搜索 (Level C)

### 练习 5：第 K 短路 - A* 与优先队列
给定有向图，求起点 $S$ 到终点 $T$ 的第 $K$ 短路长度。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**A* 建模**：
1. **估价函数 $h(n)$**：设 $h(n)$ 为节点 $n$ 到终点 $T$ 的真实最短距离（反向图 Dijkstra 预处理）。
2. **性质**：当终点 $T$ 第 $K$ 次从优先队列中取出时，路径长度 $g$ 即为答案。

**C++ 代码实现 (核心逻辑)**：
```cpp
priority_queue<pair<int, pair<int, int>>> pq;
pq.push({-(dist[S]), {0, S}}); 
while (!pq.empty()) {
    int f = -pq.top().first, g = -pq.top().second.first, u = pq.top().second.second;
    pq.pop();
    cnt[u]++;
    if (cnt[T] == K) return g;
    // ... 遍历邻边入队
}
```
</details>

### 练习 6：八数码问题 (IDA* 优化)
**题目描述**：在 $3 \times 3$ 的棋盘上，摆有八个棋子，每个棋子上标有 $1 \dots 8$ 的数字，另有一个空格。求从初始状态到目标状态的最少步数。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**估价函数**：使用 **曼哈顿距离 (Manhattan Distance)** 之和作为估价函数。
$$h(n) = \sum_{i=1}^8 (\text{dist\_x}(i) + \text{dist\_y}(i))$$
曼哈顿距离是满足可容性 (Admissible) 的，因为每次移动一个棋子，总曼哈顿距离最多改变 1。

**C++ 实现 (核心框架)**：
```cpp
int get_h() {
    int res = 0;
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++) {
            int t = g[i][j];
            if (t) res += abs(i - (t-1)/3) + abs(j - (t-1)%3);
        }
    return res;
}

bool dfs(int depth, int last_op) {
    int h = get_h();
    if (h == 0) return true;
    if (depth + h > limit) return false;
    // ... 四向移动，注意不走回头路
}
```
</details>

---

## 🏆 训练建议
1. **估价函数的“紧致性”**：估价函数 $h(n)$ 越接近真实值且不大于真实值，A*/IDA* 的效率越高。
2. **IDA* vs A***：对于空间限制严格或状态数巨大的问题（如 15-puzzle），IDA* 优于 A*。
3. **剪枝的艺术**：在写搜索代码前，先在草稿纸上罗列出：1. 搜索顺序；2. 可行性剪枝；3. 最优性剪枝；4. 排除等价冗余。
