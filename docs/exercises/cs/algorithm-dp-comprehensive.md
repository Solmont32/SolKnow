---
title: 动态规划 (DP) 专项强化练习
sidebar_label: 动态规划专项强化
---

import { Target, Zap, Trophy, BarChart3, ChevronRight, Code2, Layers, Binary, GitBranch } from 'lucide-react';

# 动态规划 (DP) 专项强化练习

> **“DP 的本质是在有向无环图 (DAG) 上寻找最优路径。”** —— 本专题涵盖从基础线性模型到高阶状压、数位、树形 DP 的全体系练习，配套全量 C++ 工业级实现。

---

## 🪜 练习阶梯与评价标准

| 等级                                                                     | 难度目标           | 核心考察点                           | 期望达成                               |
| :----------------------------------------------------------------------- | :----------------- | :----------------------------------- | :------------------------------------- |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 模型识别与状态定义 | 线性序列、简单背包                   | 能准确写出状态转移方程                 |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 状态压缩与维度转换 | 区间合并、树形归约、位运算状态       | 能够独立处理边界与初始化               |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span>  | 复杂建模与策略优化 | 数位逻辑、斜率优化、状态空间深度裁剪 | 具备解决 NOIP/ACM 中档及以上 DP 的能力 |

---

## 🎯 考点覆盖模型 (Knowledge Matrix)

| 知识模块          | 核心考点                            | 关联习题  | 典型优化策略             |
| :---------------- | :---------------------------------- | :-------- | :----------------------- |
| **背包系统**      | 0/1, 完全, 多重, 混合背包, 分组背包 | 练习 2    | 二进制拆分、单调队列优化 |
| **线性与区间 DP** | LIS, LCS, 石子合并, 括号序列        | 练习 1, 3 | 滚动数组、$O(n^2)$ 递推  |
| **树形 DP**       | 树上最值、直径、背包、换根          | 练习 4    | 递归遍历、后序处理       |
| **状压 DP**       | 位运算表示、最短 Hamilton 路径      | 练习 5    | 预处理合法状态           |
| **数位 DP**       | 逐位统计、前缀和转换、记忆化搜索    | 练习 6    | 状态记忆化、前导零处理   |
| **高阶优化**      | 单调队列、斜率、四边形不等式        | 练习 7    | 决策单调性判定           |

---

## 📂 核心习题库

### 1. 线性 DP 与背包 (Linear & Knapsack)

#### 练习 1：最长上升子序列 (LIS) - $O(n \log n)$ 优化

**题目描述**：给定一个长度为 $n$ 的序列，求最长上升子序列的长度。要求使用贪心 + 二分实现 $O(n \log n)$。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**解题思路**：
维护一个数组 `q`，其中 `q[i]` 表示长度为 `i` 的上升子序列末尾元素的最小值。
**C++ 代码实现**：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n), q;
    for (int i = 0; i < n; i++) cin >> a[i];

    for (int x : a) {
        auto it = lower_bound(q.begin(), q.end(), x);
        if (it == q.end()) q.push_back(x);
        else *it = x;
    }
    cout << q.size() << endl;
    return 0;
}
```

</details>

#### 练习 2：混合背包问题

**题目描述**：有 $n$ 种物品和一个容量为 $V$ 的背包。物品分为三类：

1. 每种仅有一个（0/1 背包）
2. 每种有无限个（完全背包）
3. 每种有有限个 $s_i$ 个（多重背包）
   求背包能装下的最大价值。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**解题思路**：

- 多重背包使用二进制拆分转化为 0/1 背包。
- 根据物品类型分别调用 0/1 背包或完全背包的转移方程。

**C++ 代码实现**：

```cpp
#include <iostream>
#include <vector>

using namespace std;

const int M = 1010;
int f[M];

int main() {
    int n, v;
    cin >> n >> v;
    for (int i = 0; i < n; i++) {
        int w, v_val, s;
        cin >> w >> v_val >> s;
        if (s == 0) { // 完全背包
            for (int j = w; j <= v; j++) f[j] = max(f[j], f[j - w] + v_val);
        } else {
            if (s == -1) s = 1; // 0/1 背包看作数量为 1
            // 多重背包二进制拆分
            for (int k = 1; k <= s; k <<= 1) {
                for (int j = v; j >= k * w; j--) f[j] = max(f[j], f[j - k * w] + k * v_val);
                s -= k;
            }
            if (s > 0) {
                for (int j = v; j >= s * w; j--) f[j] = max(f[j], f[j - s * w] + s * v_val);
            }
        }
    }
    cout << f[v] << endl;
    return 0;
}
```

</details>

---

### 2. 区间 DP 与树形 DP (Range & Tree)

#### 练习 3：石子合并 (区间 DP 经典)

**题目描述**：有 $n$ 堆石子排成一排，每次只能合并相邻的两堆，合并的代价为两堆石子重量之和。求将 $n$ 堆石子合并成一堆的最小代价。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**状态定义**：`f[i][j]` 表示合并区间 $[i, j]$ 的最小代价。
**转移方程**：`f[i][j] = min(f[i][k] + f[k+1][j] + sum(i, j))`。

**C++ 代码实现**：

```cpp
#include <iostream>

using namespace std;

const int N = 310;
int s[N], f[N][N];

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> s[i];
        s[i] += s[i - 1];
    }

    for (int len = 2; len <= n; len++) {
        for (int i = 1; i + len - 1 <= n; i++) {
            int j = i + len - 1;
            f[i][j] = 1e9;
            for (int k = i; k < j; k++)
                f[i][j] = min(f[i][j], f[i][k] + f[k + 1][j] + s[j] - s[i - 1]);
        }
    }
    cout << f[1][n] << endl;
    return 0;
}
```

</details>

#### 练习 4：没有上司的舞会 (树形 DP)

**题目描述**：某公司有 $n$ 名职员，呈树状结构。每名职员都有一个快乐指数。如果某个职员的上司参加舞会，那么该职员就不会参加。求舞会快乐指数之和的最大值。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**状态定义**：

- `f[u][0]`：以 $u$ 为根的子树，且 $u$ 不参加的最优解。
- `f[u][1]`：以 $u$ 为根的子树，且 $u$ 参加的最优解。

**C++ 代码实现**：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

const int N = 6010;
int happy[N], f[N][2];
vector<int> g[N];
bool has_fa[N];

void dfs(int u) {
    f[u][1] = happy[u];
    for (int v : g[u]) {
        dfs(v);
        f[u][0] += max(f[v][0], f[v][1]);
        f[u][1] += f[v][0];
    }
}

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> happy[i];
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> v >> u;
        g[u].push_back(v);
        has_fa[v] = true;
    }

    int root = 1;
    while (has_fa[root]) root++;
    dfs(root);
    cout << max(f[root][0], f[root][1]) << endl;
    return 0;
}
```

</details>

---

### 3. 状压 DP 与数位 DP (State & Digit)

#### 练习 5：蒙德里安的梦想 (状压 DP)

**题目描述**：求把 $n \times m$ 的棋盘分割成若干个 $1 \times 2$ 的长方形，有多少种方案。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**解题思路**：
核心在于“横放”的长方形。只要横放确定了，剩下的空位如果能被竖放的长方形填满（即每一列连续的空位都是偶数），则方案合法。
**状态定义**：`f[i][j]` 表示第 $i$ 列，且从第 $i-1$ 列伸出来的横放长方形状态为 $j$ 的方案数。

**C++ 代码实现**：

```cpp
#include <iostream>
#include <vector>
#include <cstring>

using namespace std;

const int N = 12, M = 1 << N;
long long f[N][M];
bool st[M];

int main() {
    int n, m;
    while (cin >> n >> m && (n || m)) {
        for (int i = 0; i < 1 << n; i++) {
            int cnt = 0;
            st[i] = true;
            for (int j = 0; j < n; j++) {
                if (i >> j & 1) {
                    if (cnt & 1) st[i] = false;
                    cnt = 0;
                } else cnt++;
            }
            if (cnt & 1) st[i] = false;
        }

        memset(f, 0, sizeof f);
        f[0][0] = 1;
        for (int i = 1; i <= m; i++)
            for (int j = 0; j < 1 << n; j++)
                for (int k = 0; k < 1 << n; k++)
                    if ((j & k) == 0 && st[j | k])
                        f[i][j] += f[i - 1][k];

        cout << f[m][0] << endl;
    }
    return 0;
}
```

</details>

#### 练习 6：Windy 数 (数位 DP)

**题目描述**：不含前导零且相邻两个数字之差至少为 2 的正整数被称为 Windy 数。求在 $[A, B]$ 范围内有多少个 Windy 数。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**解题思路**：
经典的数位 DP，通常使用 `memoization` (记忆化搜索) 模板实现。

**C++ 代码实现**：

```cpp
#include <iostream>
#include <vector>
#include <cstring>
#include <cmath>

using namespace std;

int a[15], f[15][15];

int dfs(int pos, int pre, bool limit, bool lead) {
    if (pos == 0) return 1;
    if (!limit && !lead && f[pos][pre] != -1) return f[pos][pre];

    int res = 0;
    int up = limit ? a[pos] : 9;
    for (int i = 0; i <= up; i++) {
        if (!lead && abs(i - pre) < 2) continue;
        res += dfs(pos - 1, i, limit && (i == up), lead && (i == 0));
    }

    if (!limit && !lead) f[pos][pre] = res;
    return res;
}

int solve(int n) {
    int len = 0;
    while (n) a[++len] = n % 10, n /= 10;
    memset(f, -1, sizeof f);
    return dfs(len, 0, true, true);
}

int main() {
    int l, r;
    cin >> l >> r;
    cout << solve(r) - solve(l - 1) << endl;
    return 0;
}
```

</details>

---

## 🏆 建模心法

1. **状态定义是灵魂**：如果转移推不动，通常是状态少记了维度（如无后效性被破坏）。
2. **刷表法 vs 填表法**：大多数情况填表法（由已知推当前）更直观，但在状态稀疏时刷表法（由当前推未来）更高效。
3. **滚动数组优化**：在空间吃紧时，观察 $f[i]$ 是否只依赖 $f[i-1]$。
