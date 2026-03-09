---
title: 强连通分量（Tarjan / SCC）
---

# 强连通分量（Tarjan / SCC）

在有向图中，若两个点 `u, v` 互相可达，则称 `u, v` 强连通。极大强连通点集称为强连通分量（SCC）。

Tarjan 算法可以在线性时间 `O(n+m)` 内求出所有 SCC，是算法竞赛图论核心模板。

## 一、定义与核心性质

- `SCC`：有向图中极大强连通子图。
- `SCC 缩点图`：将每个 SCC 缩为一个点，边按原图跨分量边保留。
- 重要结论：缩点图一定是 DAG。

该结论使得大量“有环有向图”问题转化为 DAG DP 问题。

## 二、Tarjan 算法原理

DFS 过程中维护：

- `dfn[u]`：点 `u` 的首次访问时间戳。
- `low[u]`：从 `u` 出发，经 DFS 树边与至多一条返祖边，能到达的最小 `dfn`。
- 栈 `st`：当前仍在“未确定所属 SCC”的点。
- `inSt[u]`：`u` 是否在栈中。

转移规则：

1. 首次访问 `u`：`dfn[u] = low[u] = ++timer`，并入栈。
2. 扫描边 `u -> v`：

- 若 `v` 未访问，递归后 `low[u] = min(low[u], low[v])`。
- 若 `v` 在栈中，说明存在回边，`low[u] = min(low[u], dfn[v])`。

3. 若 `dfn[u] == low[u]`，则 `u` 为一个 SCC 根；持续弹栈直到 `u`，这些点同属一个 SCC。

## 三、正确性直观解释

- `low[u]` 反映了 `u` 子树能“向上回溯”到的最早祖先。
- 若 `dfn[u] == low[u]`，说明 `u` 及其 DFS 子树中在栈内的可回溯范围到此为止，形成一个完整闭环强连通块。
- 通过“入栈时机统一、出栈时机按根切分”，每个点恰好被划入一个 SCC。

## 四、C++ 模板（竞赛可用）

```cpp
struct SCC {
    int n, timer = 0, sccCnt = 0;
    vector<vector<int>> g;
    vector<int> dfn, low, inSt, comp, st;

    SCC(int n): n(n), g(n + 1), dfn(n + 1), low(n + 1), inSt(n + 1), comp(n + 1) {}

    void addEdge(int u, int v) { g[u].push_back(v); }

    void tarjan(int u) {
        dfn[u] = low[u] = ++timer;
        st.push_back(u);
        inSt[u] = 1;

        for (int v : g[u]) {
            if (!dfn[v]) {
                tarjan(v);
                low[u] = min(low[u], low[v]);
            } else if (inSt[v]) {
                low[u] = min(low[u], dfn[v]);
            }
        }

        if (dfn[u] == low[u]) {
            ++sccCnt;
            while (true) {
                int x = st.back();
                st.pop_back();
                inSt[x] = 0;
                comp[x] = sccCnt;
                if (x == u) break;
            }
        }
    }

    int solve() {
        for (int i = 1; i <= n; ++i) {
            if (!dfn[i]) tarjan(i);
        }
        return sccCnt;
    }
};
```

## 五、例题讲解（教材化）

### 例题 1：SCC 个数统计（基础）

给定有向图，输出 SCC 数量。

思路：直接套 Tarjan，`solve()` 返回 `sccCnt` 即答案。

### 例题 2：判断整图是否强连通（基础）

思路：求 SCC 后检查是否 `sccCnt == 1`。

### 例题 3：最少加边使图强连通（提高）

步骤：

1. Tarjan 缩点得到 DAG。
2. 统计缩点图入度为 0 的点数 `A`、出度为 0 的点数 `B`。
3. 若 `sccCnt == 1`，答案为 0；否则答案为 `max(A, B)`。

### 例题 4：受欢迎的牛（POJ 2186 类型，提升）

目标：找出“能到达所有点”的 SCC 大小。

思路：

1. 缩点图后找出度为 0 的 SCC 个数。
2. 若不止一个出度 0 SCC，答案 0。
3. 否则答案为该 SCC 包含的原图点数。

### 例题 5：2-SAT 可行性判定（挑战）

在 2-SAT 蕴含图中，若变量 `x` 与 `not x` 在同一 SCC，则不可满足；否则可满足。

Tarjan 是 2-SAT 判定核心工具。

## 六、易错点清单

1. 更新返祖边时误写 `low[u] = min(low[u], low[v])`，正确是 `dfn[v]`。
2. 忘记判断 `inSt[v]`，导致跨 SCC 边错误更新 `low`。
3. 多测没有清空全局数组、栈、时间戳。
4. 缩点后边重复过多，未去重导致后续统计性能变差。
5. 递归深度过大时未考虑栈限制（可改迭代或开更大栈）。

## 七、配套练习（答案折叠）

专题练习页：[`算法竞赛练习：强连通分量专题`](/docs/exercises/cs/algorithm-scc)

### 练习 1

若有向图缩点后仍有环，原命题哪里错误？

<details>

<summary>点击查看过程与答案</summary>

命题错误在“缩点后可能有环”。正确结论是：SCC 缩点图一定是 DAG。
若缩点后有环，意味着这些 SCC 之间互相可达，应合并为同一 SCC，矛盾。

</details>

### 练习 2

为何 Tarjan 每个点只会入栈一次、出栈一次？

<details>

<summary>点击查看过程与答案</summary>

每点首次 DFS 访问时入栈；所属 SCC 被确定时弹出。`dfn` 防止重复访问，`inSt` 标记在栈状态，因此不会重复入栈或重复出栈。

</details>

### 练习 3

设缩点图入度 0 SCC 数为 4，出度 0 SCC 数为 2，且 `sccCnt > 1`，最少加几条边可使原图强连通？

<details>

<summary>点击查看过程与答案</summary>

答案为 `max(4, 2) = 4`。

</details>
