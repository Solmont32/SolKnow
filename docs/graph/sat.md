---
title: 2-SAT 问题
---

import { GitMerge, Zap, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';

# <GitMerge className="inline-block mr-2 mb-1 text-blue-500" /> 2-SAT 问题

2-SAT (2-Satisfiability) 是布尔方程可满足性问题（SAT）的一个特殊子集，它要求在每个约束条件仅涉及两个变量的情况下，寻找一组变量赋值使得所有约束成立。

## 一、 <Activity className="inline-block mr-2 mb-1 text-blue-400" /> 问题定义

给定 $n$ 个布尔变量 $x_1, x_2, \dots, x_n$ 以及 $m$ 个约束条件。每个约束形如：
$$(x_i \text{ is } A) \lor (x_j \text{ is } B)$$
其中 $A, B \in \{ \text{true, false} \}$。我们需要判定是否存在一组赋值使得所有约束同时满足。

---

## 二、 图论转化：蕴含关系

2-SAT 的核心在于将逻辑表达式转化为有向图中的“推导”关系。

### 1. 变量拆分

对于每个布尔变量 $x_i$，我们拆分为两个点：

- $i$：代表 $x_i$ 为真 (true)。
- $i+n$：代表 $x_i$ 为假 (false)。

### 2. 边（蕴含关系）的建立

逻辑等价式：$(P \lor Q) \iff (\neg P \implies Q) \land (\neg Q \implies P)$。
因此，对于约束 $(x_i \text{ is } A) \lor (x_j \text{ is } B)$：

- 若 $x_i$ 不满足 $A$，则 $x_j$ 必须满足 $B$。
- 若 $x_j$ 不满足 $B$，则 $x_i$ 必须满足 $A$。

**示例**：$(x_i = \text{true}) \lor (x_j = \text{false})$

- 建立边：$(x_i = \text{false}) \to (x_j = \text{false})$
- 建立边：$(x_j = \text{true}) \to (x_i = \text{true})$

---

## 三、 求解算法：SCC 缩点

### 1. 判定定理

**2-SAT 问题有解，当且仅当对于任意变量 $x_i$，其代表“真”的点与代表“假”的点不在同一个强连通分量 (SCC) 中。**

- **理由**：如果在同一个 SCC 中，说明 $x_i \implies \dots \implies \neg x_i$ 且 $\neg x_i \implies \dots \implies x_i$，产生矛盾。

### 2. 构造可行解

若有解，我们可以通过 SCC 的拓扑序（Tarjan 算法求出的 `id[u]` 越小，拓扑序越靠后）来确定赋值：

- 若 `id[i] < id[i+n]`，则 $x_i = \text{false}$。
- 若 `id[i] > id[i+n]`，则 $x_i = \text{true}$。

---

## 四、 C++ 实现模板

```cpp
struct TwoSAT {
    int n;
    vector<vector<int>> g;
    vector<int> dfn, low, id, st;
    vector<bool> in_st;
    int timer, scc_cnt;

    TwoSAT(int _n) : n(_n), g(2 * n + 1), dfn(2 * n + 1), low(2 * n + 1), id(2 * n + 1), in_st(2 * n + 1) {
        timer = scc_cnt = 0;
    }

    // 添加约束 (x == a) v (y == b)
    // a, b 为 1 代表真，0 代表假
    void add_clause(int x, int a, int y, int b) {
        // (x is !a) => (y is b)
        g[x + (a ? n : 0)].push_back(y + (b ? 0 : n));
        // (y is !b) => (x is a)
        g[y + (b ? n : 0)].push_back(x + (a ? 0 : n));
    }

    void tarjan(int u) {
        dfn[u] = low[u] = ++timer;
        st.push_back(u); in_st[u] = true;
        for (int v : g[u]) {
            if (!dfn[v]) {
                tarjan(v);
                low[u] = min(low[u], low[v]);
            } else if (in_st[v]) low[u] = min(low[u], dfn[v]);
        }
        if (low[u] == dfn[u]) {
            scc_cnt++;
            while (true) {
                int x = st.back(); st.pop_back();
                in_st[x] = false; id[x] = scc_cnt;
                if (x == u) break;
            }
        }
    }

    bool solve() {
        for (int i = 1; i <= 2 * n; i++) if (!dfn[i]) tarjan(i);
        for (int i = 1; i <= n; i++) {
            if (id[i] == id[i + n]) return false;
        }
        return true;
    }

    vector<int> get_answer() {
        vector<int> ans(n + 1);
        for (int i = 1; i <= n; i++) ans[i] = (id[i] < id[i + n]);
        return ans;
    }
};
```

---

## 五、 配套练习（答案折叠）

### 练习 1（逻辑转化）

若要求 $x_i$ 必须为真，在 2-SAT 图中应该如何连边？

<details>
<summary>点击查看过程与答案</summary>

**分析**：必须为真等价于逻辑表达式 $(x_i = \text{true}) \lor (x_i = \text{true})$。
根据转化规则，这产生边：$\neg x_i \to x_i$。
这条边意味着“如果 $x_i$ 为假，则推导出 $x_i$ 必须为真”，从而强制 $x_i$ 不能为假。

**答案**：从 $x_i = \text{false}$ 连一条边到 $x_i = \text{true}$。

</details>

### 练习 2（判定）

已知 SCC 结果：变量 $x_1$ 为真的点属于 SCC 2，为假的点属于 SCC 5。若 SCC 编号越小表示拓扑序越靠后，则 $x_1$ 应取什么值？

<details>
<summary>点击查看过程与答案</summary>

**分析**：在 Tarjan 算法中，`id` 越小，节点的拓扑序越靠后。
2-SAT 取解原则是取拓扑序较后的那个点。
因为 `id[x1_true] = 2` < `id[x1_false] = 5`，所以 `x1_true` 的拓扑序更靠后。

**答案**：$x_1 = \text{true}$。

</details>
