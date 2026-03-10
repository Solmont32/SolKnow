---
title: 搜索与启发式算法专题练习
---

import { Target, Zap, ShieldCheck, BarChart3, ChevronRight, Code2 } from 'lucide-react';

# 搜索与启发式算法专题练习 (Search & Heuristics)

> **“在巨大的搜索树中，每一层剪枝都是对计算冗余的优雅反击。”**

本练习库对标《算法竞赛进阶指南》与《算法导论》搜索章节，涵盖从基础 DFS/BFS 优化到现代启发式 (A*, IDA*) 与随机化搜索 (SA) 的核心题型。

---

## 🧩 练习矩阵 (Exercise Matrix)

| 难度 | 核心考点 | 推荐题目 | 状态 |
| :--- | :--- | :--- | :--- |
| <span style={{ color: 'var(--ifm-color-success)' }}>● Level A</span> | 状态空间建模 / 基础剪枝 | [数字组合](#练习-1-数字组合---dfs-状态缩减)、[小猫爬山](#练习-2-小猫爬山---搜索顺序与最优性剪枝) | 已上线 |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● Level B</span> | 双向搜索 / IDA* 建模 | [送礼物](#练习-3-送礼物---双向搜索与折半查找)、[排书](#练习-4-排书---ida-与后继关系估价) | 已上线 |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● Level C</span> | A* 优化 / 模拟退火 | [第 K 短路](#练习-5-第-k-短路---a-与优先队列)、[均分数据](#练习-6-均分数据---模拟退火与能量函数设计) | 已上线 |

---

## 一、 基础剪枝与状态优化 (Level A)

### 练习 1：数字组合 - DFS 状态缩减
给定 $N$ 个正整数 $a_i$，从中挑选若干数使其和为 $M$，求方案数。($N \le 20, M \le 1000$)

<details>
<summary>点击查看过程与 C++ 实现</summary>

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
    return 0;
}
```
</details>

### 练习 2：小猫爬山 - 搜索顺序与最优性剪枝
$N$ 只猫，体重 $w_i$，缆车承重 $W$。求最少缆车数。

<details>
<summary>点击查看过程与 C++ 实现</summary>

**解析**：
1. **搜索顺序优化**：将猫按体重**降序排序**。重猫放置灵活度低，先处理能极大减少搜索树深层的分支数。
2. **最优性剪枝**：记录当前已找到的最少车数 `min_cabs`。若当前已开 `k` 辆车且 $k \ge min\_cabs$，则剪枝。

**C++ 实现**：
```cpp
#include <iostream>
#include <algorithm>
#include <vector>

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
        if (cabs[i] + w[u] <= W) { // 可行性
            cabs[i] += w[u];
            dfs(u + 1, k);
            cabs[i] -= w[u];
        }
    }

    cabs[k] = w[u];
    dfs(u + 1, k + 1);
    cabs[k] = 0;
}

int main() {
    cin >> n >> W;
    for (int i = 0; i < n; i++) cin >> w[i];
    sort(w, w + n, greater<int>());
    ans = n;
    dfs(0, 0);
    cout << ans << endl;
    return 0;
}
```
</details>

---

## 二、 进阶搜索模型 (Level B)

### 练习 3：送礼物 - 双向搜索与折半查找
$N \le 45$ 件礼物，每件重 $G_i$，车承重 $W$。求最多能装多少重的礼物？

<details>
<summary>点击查看过程与 C++ 实现</summary>

**数学推导**：
直接 DFS 复杂度 $O(2^{45}) \approx 3.5 \times 10^{13}$。
**折半搜索 (Meet-in-the-middle)**：将礼物分为两部分 $A$ ($22$ 件) 和 $B$ ($23$ 件)。
1. 搜索 $A$ 所有组合重量，存储并排序。
2. 搜索 $B$ 的组合重量 $X$，在 $A$ 的结果中二分查找最大的 $Y \le W - X$。
复杂度：$O(2^{N/2} \cdot \log 2^{N/2})$，约为 $6 \times 10^6 \times 22 \approx 1.3 \times 10^8$，在 1s 时限内可行。

**C++ 实现**：
```cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

typedef long long LL;
int n, m, k;
LL W, w[50];
vector<LL> weights;
LL ans = 0;

void dfs1(int u, LL sum) {
    if (u == k) {
        weights.push_back(sum);
        return;
    }
    if (sum + w[u] <= W) dfs1(u + 1, sum + w[u]);
    dfs1(u + 1, sum);
}

void dfs2(int u, LL sum) {
    if (u == n) {
        auto it = upper_bound(weights.begin(), weights.end(), W - sum);
        if (it != weights.begin()) ans = max(ans, sum + *(--it));
        return;
    }
    if (sum + w[u] <= W) dfs2(u + 1, sum + w[u]);
    dfs2(u + 1, sum);
}

int main() {
    cin >> W >> n;
    for (int i = 0; i < n; i++) cin >> w[i];
    sort(w, w + n, greater<LL>());
    k = n / 2 + 2; // 调整切分点优化效率
    dfs1(0, 0);
    sort(weights.begin(), weights.end());
    weights.erase(unique(weights.begin(), weights.end()), weights.end());
    dfs2(k, 0);
    cout << ans << endl;
    return 0;
}
```
</details>

### 练习 4：排书 - IDA* 与后继关系估价
给定 $N \le 15$ 本书的排列，每次可将一叠连续书抽出并插入他处。求 4 步内使有序的最少步数。

<details>
<summary>点击查看过程与 C++ 实现</summary>

**估价函数 $h(n)$ 设计**：
每次操作最多改变 3 个位置的后继关系（即 $i$ 后面不是 $i+1$）。
设当前不正确的后继关系总数为 $tot$，则至少需要 $\lceil tot / 3 \rceil$ 次操作。
$$h(n) = \frac{tot + 2}{3}$$

**C++ 实现**：
```cpp
#include <iostream>
#include <cstring>

using namespace std;

int n, q[15], limit;

int f() {
    int tot = 0;
    for (int i = 0; i < n - 1; i++)
        if (q[i + 1] != q[i] + 1) tot++;
    return (tot + 2) / 3;
}

bool dfs(int depth) {
    int h = f();
    if (h == 0) return true;
    if (depth + h > limit) return false;

    int backup[15];
    memcpy(backup, q, sizeof q);

    for (int len = 1; len <= n; len++) {
        for (int i = 0; i + len - 1 < n; i++) {
            int j = i + len - 1;
            for (int k = j + 1; k < n; k++) {
                // 将 [i, j] 插入到 k 后面
                int next_q[15], cnt = 0;
                for (int x = 0; x < i; x++) next_q[cnt++] = q[x];
                for (int x = j + 1; x <= k; x++) next_q[cnt++] = q[x];
                for (int x = i; x <= j; x++) next_q[cnt++] = q[x];
                for (int x = k + 1; x < n; x++) next_q[cnt++] = q[x];
                
                memcpy(q, next_q, sizeof q);
                if (dfs(depth + 1)) return true;
                memcpy(q, backup, sizeof q);
            }
        }
    }
    return false;
}

int main() {
    int T; cin >> T;
    while (T--) {
        cin >> n;
        for (int i = 0; i < n; i++) cin >> q[i];
        limit = 0;
        while (limit < 5 && !dfs(0)) limit++;
        if (limit >= 5) cout << "5 or more" << endl;
        else cout << limit << endl;
    }
    return 0;
}
```
</details>

---

## 三、 启发式与随机化搜索 (Level C)

### 练习 5：第 K 短路 - A* 与优先队列
给定有向图，求起点 $S$ 到终点 $T$ 的第 $K$ 短路长度。

<details>
<summary>点击查看过程与 C++ 实现</summary>

**A* 建模**：
1. **估价函数 $h(n)$**：设 $h(n)$ 为节点 $n$ 到终点 $T$ 的**真实最短距离**。可以通过在反向图上跑一遍 Dijkstra 预处理得到。
2. **算法过程**：优先队列存储 $(f, g, u)$。每当一个节点第 $i$ 次出队，其对应的 $g$ 即为 $S$ 到该节点的第 $i$ 短路。
3. **当终点 $T$ 第 $K$ 次出队时，对应的 $g$ 即为答案。**

**C++ 实现**：
```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <cstring>

using namespace std;

const int N = 1005, M = 20005;
int n, m, S, T, K;
int h[N], dist[N], cnt[N];
struct Edge { int to, w, next; } e[M], re[M];
int head[N], rhead[N], tot;

void add(int u, int v, int w) {
    e[++tot] = {v, w, head[u]}; head[u] = tot;
    re[tot] = {u, w, rhead[v]}; rhead[v] = tot;
}

void spfa() { // 在反向图预处理 h(n)
    memset(dist, 0x3f, sizeof dist);
    dist[T] = 0;
    priority_queue<pair<int, int>> pq;
    pq.push({0, T});
    while (!pq.empty()) {
        int d = -pq.top().first, u = pq.top().second;
        pq.pop();
        if (d > dist[u]) continue;
        for (int i = rhead[u]; i; i = re[i].next) {
            int v = re[i].to;
            if (dist[v] > dist[u] + re[i].w) {
                dist[v] = dist[u] + re[i].w;
                pq.push({-dist[v], v});
            }
        }
    }
}

int astar() {
    if (dist[S] == 0x3f3f3f3f) return -1;
    priority_queue<pair<int, pair<int, int>>> pq;
    pq.push({-(dist[S]), {0, S}}); // {-f, {-g, u}}
    while (!pq.empty()) {
        int f = -pq.top().first, g = -pq.top().second.first, u = pq.top().second.second;
        pq.pop();
        cnt[u]++;
        if (cnt[T] == K) return g;
        if (cnt[u] > K) continue; // 剪枝
        for (int i = head[u]; i; i = e[i].next) {
            int v = e[i].to;
            pq.push({-(g + e[i].w + dist[v]), {-(g + e[i].w), v}});
        }
    }
    return -1;
}

int main() {
    cin >> n >> m;
    while (m--) {
        int u, v, w; cin >> u >> v >> w;
        add(u, v, w);
    }
    cin >> S >> T >> K;
    if (S == T) K++; // 路径至少包含一条边
    spfa();
    cout << astar() << endl;
    return 0;
}
```
</details>

---

*“在巨大的解空间中，每一个被剪去的枝条，都是智慧对混沌的胜利。”*
