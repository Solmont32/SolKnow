---
title: 搜索算法精要：从启发式搜索到 A* 与 IDA*
sidebar_position: 2
---

import { Search, Zap, Target, Thermometer, Box, ArrowRightCircle, Layers, ShieldCheck, Activity, Cpu, Database, Swords, Microscope, TrendingUp, Binary, Info, BookOpen, Calculator, RefreshCcw, CheckCircle2 } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';
import CodeCollapse from '@site/src/components/CodeCollapse';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';

# <Target className="inline-block mr-2 mb-1 text-purple-500" /> 搜索算法精要 (Search Essentials)

> **导语**：搜索 (Search) 是计算科学中处理“NP-Hard”问题的最后一道防线。从初等的 BFS/DFS 到启发式引导的 A*，再到处理海量状态空间的 IDA*，其核心在于通过**数学约束**压缩搜索树的宽度与深度。

---

## 零、 <Layers className="inline-block mr-2 mb-1 text-blue-400" /> 状态空间建模与复杂度

### 1. 形式化定义：五元组模型 $\mathcal{M}$
一个搜索问题可严格定义为 $\mathcal{M} = \langle S, A, T, s_0, G \rangle$：
- $S$：**状态空间**，所有可能配置的集合。
- $A(s)$：**动作空间**，在状态 $s$ 下的可行操作。
- $T: S \times A \to S$：**状态转移函数**。
- $g(s)$：从起始点 $s_0$ 到 $s$ 的**最小已知代价**。
- $h^*(s)$：从 $s$ 到目标集合 $G$ 的**真实最优代价**。

### 2. 复杂度分析与有效分支因子 $b^*$
搜索算法的性能由其扩展的节点总数 $N$ 衡量。对于深度为 $d$ 的解，定义**有效分支因子 $b^*$** 满足：
$$N = 1 + b^* + (b^*)^2 + \dots + (b^*)^d$$

<KnowledgeCard type="complexity" title="有效分支因子 b* 的意义">
在无启发式的暴力搜索中，$b^*$ 等于状态转移的平均度数。通过设计高效的启发式函数，我们的目标是使 $b^* \to 1$。即使 $b^*$ 从 3.0 降低到 1.1，在深度 $d=50$ 时，搜索空间将从 $10^{23}$ 压缩到 $10^2$ 级别，这是指数级优化的威力。
</KnowledgeCard>

---

## 一、 <ShieldCheck className="inline-block mr-2 mb-1 text-green-500" /> 剪枝策略：形式化逻辑与安全性证明

剪枝的本质是根据已知信息，证明搜索树的某个子树中不包含最优解（或任何可行解）。

### 1. 最优性剪枝 (Optimality Pruning)
**定理（最优性剪枝的安全性）**：
设当前已找到的最优解代价为 $C_{best}$。若估价函数 $f(s) = g(s) + \hat{h}(s)$ 满足**可接受性**（即 $\hat{h}(s) \le h^*(s)$），则当 $f(s) \ge C_{best}$ 时，剪去以 $s$ 为根的子树是安全的。

**证明**：
对于 $s$ 的任意后继节点 $s_{goal} \in G$，路径代价 $C = g(s) + \text{dist}(s, s_{goal})$。
根据定义，$\text{dist}(s, s_{goal}) \ge h^*(s)$。
由可接受性，$\hat{h}(s) \le h^*(s) \le \text{dist}(s, s_{goal})$。
因此，$C = g(s) + \text{dist}(s, s_{goal}) \ge g(s) + \hat{h}(s) = f(s)$。
若 $f(s) \ge C_{best}$，则通过 $s$ 到达的任何目标的代价 $C \ge C_{best}$，剪枝不会丢失更优解。证毕。

### 2. 可行性剪枝 (Feasibility Pruning)
**逻辑断言**：设 $\Phi(s)$ 为状态 $s$ 满足目标可达性的必要 condition（Necessary Condition）。
若 $\neg \Phi(s)$，则对于所有后继 $s'$，必有 $\neg \Phi(s')$。此时可安全剪枝。

<CodeCollapse title="经典案例：木棒拼接 (Sticks) 剪枝证明" language="cpp">

```cpp
/**
 * 核心剪枝策略：
 * 1. 降序排列：优先尝试长的木棒，使得 cur + a[i] 更快超过 target，增加剪枝频率。
 * 2. 冗余排除：若 a[i] 尝试失败，则跳过后续所有长度等于 a[i] 的木棒。
 * 3. 边界逻辑：
 *    - cur == 0: 若第一根木棒就无法放入任何空位，说明当前整体组合非法。
 *    - cur + a[i] == target: 若最后一根拼满当前组的木棒导致后续失败，则无需尝试更小的组合（贪心最优性）。
 */
bool dfs(int cnt, int cur, int last) {
    if (cnt == m) return true;
    if (cur == target) return dfs(cnt + 1, 0, n - 1);

    for (int i = last; i >= 0; i--) {
        if (vis[i] || cur + a[i] > target) continue;
        vis[i] = 1;
        if (dfs(cnt, cur + a[i], i - 1)) return true;
        vis[i] = 0;

        if (cur == 0 || cur + a[i] == target) return false; 
        while (i > 0 && a[i] == a[i - 1]) i--; 
    }
    return false;
}
```
</CodeCollapse>

---

## 二、 <Target className="inline-block mr-2 mb-1 text-red-500" /> A* 算法：一致性分析与单调性

### 1. 可接受性 vs. 一致性
- **可接受性 (Admissibility)**：$h(n) \le h^*(n)$。保证找到最优解。
- **一致性 (Consistency / Monotonicity)**：$h(n) \le c(n, a, n') + h(n')$。

<KnowledgeCard type="theorem" title="一致性与三角不等式">
一致性等价于在状态空间图中，$h(n)$ 满足三角不等式。
若 $h$ 是一致的，则 $f(n)$ 沿任何搜索路径是非递减的。
**推论**：若 $h$ 一致，则当 A* 扩展到一个节点 $n$ 时，已经找到了到达 $n$ 的最短路径，因此**无需在发现更短路径时重新打开 CLOSED 集中的节点**。
</KnowledgeCard>

### 2. 一致性推导 $f(n)$ 单调性
**证明**：
$f(n') = g(n') + h(n') = g(n) + c(n, a, n') + h(n')$
由一致性：$c(n, a, n') + h(n') \ge h(n)$
$\therefore f(n') \ge g(n) + h(n) = f(n)$。

---

## 三、 <Zap className="inline-block mr-2 mb-1 text-yellow-500" /> IDA* 与迭代加深收敛验证

IDA* (Iterative Deepening A*) 将 DFS 的空间优势与 A* 的启发式引导结合。

### 1. 迭代加深的收敛性与开销分析
**问题**：迭代加深（IDDFS）每次都会重新搜索前一层，是否太慢？
**证明（几何级数开销）**：
设分支因子为 $b$，深度为 $d$。IDDFS 扩展的节点总数为：
$$N_{ID} = \sum_{i=1}^d (d - i + 1) b^i$$
当 $b > 1$ 时，该式由最后一项 $b^d$ 主导：
$$\frac{N_{ID}}{N_{BFS}} \approx \frac{b}{b-1}$$
对于 $b=2$，总开销仅为 BFS 的 2 倍；对于 $b=10$，开销仅多出 11%。这换取了 $O(d)$ 的线性空间复杂度，极其划算。

### 2. IDA* 的最优性证明
若启发式函数 $h(n)$ 是**可接受的**，则 IDA* 第一次找到目标时，其路径代价必为最优。
**理由**：IDA* 按 $f$ 值的阈值 $L$ 从小到大进行搜索。若存在一个代价更小的最优解 $C^*$，它必定在阈值 $L=C^*$ 的迭代中被发现。

<CodeCollapse title="IDA* 解决 15-数码（C++ 核心逻辑）" language="cpp">

```cpp
int get_h() {
    int h = 0;
    for (int i = 0; i < 16; i++) {
        if (q[i] == 0) continue;
        int v = q[i] - 1;
        h += abs(i / 4 - v / 4) + abs(i % 4 - v % 4); // 曼哈顿距离
    }
    return h;
}

int solve(int dep, int limit, int prev) {
    int h = get_h();
    if (dep + h > limit) return dep + h; // 返回下一次迭代的最小阈值
    if (h == 0) return 0; // 成功标识

    int next_limit = INF;
    for (int i = 0; i < 4; i++) {
        if (abs(i - prev) == 2) continue; // 禁止往回走（对称性剪枝）
        // Swap, DFS, Unswap...
        int t = solve(dep + 1, limit, i);
        if (t == 0) return 0;
        next_limit = min(next_limit, t);
    }
    return next_limit;
}
```
</CodeCollapse>

---

## 四、 <Microscope className="inline-block mr-2 mb-1 text-blue-500" /> 高级课题：双向搜索与状态压缩

### 1. 双向 A* (Bidirectional A*)
同时从 $s_0 \to G$ 和 $G \to s_0$ 搜索。当两个前沿相遇时停止。
注意：相遇时的路径不一定是全局最优，需要特定的停止准则。

### 2. Zobrist Hashing 与状态判重
在 IDA* 中，由于不存储节点，极易出现重复状态搜索。使用 Zobrist Hashing 配合哈希表可以实现 $O(1)$ 的状态记忆化。

---

## 🎯 教材配套练习 (Exercises)

### 练习 1：一致性判别
> 若 $h(n)$ 满足可接受性，定义 $h'(n) = \max(h(n), h(p) - c(p, n))$，其中 $p$ 是 $n$ 的父节点。证明 $h'(n)$ 是一致的。
<details>
<summary>Check Solution</summary>
这是 Pathmax 方程。通过取父节点推导出的下界与当前估价的较大值，强制满足 $h(p) \le c(p, n) + h(n)$，从而修正了不满足一致性的启发式函数，使其满足单调性。
</details>

### 练习 2：IDA* 的阈值更新
> 为什么 IDA* 的下一次阈值要取所有超过当前阈值的 $f(n)$ 中的最小值？
<details>
<summary>Check Solution</summary>
这是为了保证算法的**完备性**。取最小值能确保我们不错过任何可能的最小代价解，同时将搜索空间尽可能缓慢地扩大，保持迭代加深的渐进性质。
</details>

### 练习 3：[实战挑战] 埃及分数问题
> 使用 IDA* 寻找将分数 $a/b$ 分解为 $k$ 个互不相同的单位分数之和（$1/n_1 + 1/n_2 + \dots$），要求 $n_k$ 最小。请给出该问题的启发式函数 $\hat{h}$。
<details>
<summary>Check Strategy</summary>
设当前剩余分数为 $res = a/b$，还需选 $m$ 个数。
若当前选到的最大分数为 $1/n_{last}$，则 $res$ 至少需要 $\lceil res / (1/n_{last}) \rceil$ 个数。
启发式 $\hat{h}$：若剩余 $res$，后续最大可能的单位分数为 $1/(n_{last}+1)$，若 $res / (1/(n_{last}+1)) > m$，则剪枝。
</details>

---

_“搜索的边界即是认知的边界。通过数学严谨性，我们将混沌的状态空间转化为有序的求解路径。”_
