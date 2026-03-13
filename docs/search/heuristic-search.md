---
title: 搜索算法精要：从启发式搜索到 A* 与 IDA*
sidebar_position: 2
---

import { Search, Zap, Target, Thermometer, Box, ArrowRightCircle, Layers, ShieldCheck, Activity, Cpu, Database, Swords, Microscope, TrendingUp, Binary, Info, BookOpen, Calculator, RefreshCcw, CheckCircle2 } from 'lucide-react';

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
- **目标**：通过设计高效的启发式函数，使 $b^* \to 1$。
- **收敛性**：若算法能保证在有限步内找到最优解，则称其为**完备且最优**的。

---

## 一、 <ShieldCheck className="inline-block mr-2 mb-1 text-green-500" /> 剪枝策略：单调性证明与逻辑断言

剪枝的本质是根据已知信息，证明搜索树的某个子树中不包含最优解。

### 1. 剪枝策略的单调性证明
**定理（最优性剪枝的安全性）**：
设当前已找到的最优解代价为 $C_{best}$。若估价函数 $f(s) = g(s) + \hat{h}(s)$ 满足**单调递增性**（即对于任意 $s \to s'$，有 $f(s) \le f(s')$），且 $\hat{h}(s)$ 是 $h^*(s)$ 的下界，则当 $f(s) > C_{best}$ 时，剪去以 $s$ 为根的子树是安全的。

**证明**：
由于 $f$ 是单调递增的，对于 $s$ 的任意后继节点 $s''$，必有 $f(s'') \ge f(s)$。
因为 $f(s) > C_{best}$，故 $f(s'') > C_{best}$。
又因为 $\hat{h}(s'') \le h^*(s'')$，故真正的路径代价 $g(s'') + h^*(s'') \ge f(s'') > C_{best}$。
因此，子树中任何路径的代价都将超过当前最优解，剪枝不会丢失全局最优。证毕。

### 2. 经典案例：木棒拼接 (Sticks)
<details>
<summary><Search size={16} className="inline mr-1" /> 高级 DFS 剪枝实现（C++）</summary>

```cpp
/**
 * 核心剪枝策略证明：
 * 1. 降序排列：优先尝试长的木棒，减少分支因子。
 * 2. 排除冗余：若当前位置放置长度为 L 的木棒失败，则后续相同长度的木棒均无需尝试（逻辑对称性）。
 * 3. 边界判定：若第一根或最后一根拼接失败，则当前整体组合必败。
 */
bool dfs(int cnt, int cur, int last) {
    if (cnt == m) return true;
    if (cur == target) return dfs(cnt + 1, 0, n - 1);

    for (int i = last; i >= 0; i--) {
        if (vis[i] || cur + a[i] > target) continue;
        vis[i] = 1;
        if (dfs(cnt, cur + a[i], i - 1)) return true;
        vis[i] = 0;

        // 剪枝关键：
        if (cur == 0 || cur + a[i] == target) return false; 
        while (i > 0 && a[i] == a[i - 1]) i--; 
    }
    return false;
}
```
</details>

---

## 二、 <Target className="inline-block mr-2 mb-1 text-red-500" /> A* 算法：启发式函数与一致性证明

### 1. 可接受性与一致性
- **可接受性 (Admissibility)**：$0 \le h(n) \le h^*(n)$。确保 A* 不会错过更优解。
- **一致性 (Consistency)**：$h(n) \le c(n, a, n') + h(n')$。确保搜索过程的单调性，即 $f(n)$ 沿路径不减。

### 2. 一致性推导单调性证明
**证明**：
$f(n') = g(n') + h(n') = g(n) + c(n, a, n') + h(n')$
由一致性：$c(n, a, n') + h(n') \ge h(n)$
$\therefore f(n') \ge g(n) + h(n) = f(n)$。证毕。

### 3. 收敛性与搜索效率分析
**收敛速度定理**：
若 $h_1(n) > h_2(n)$ 对所有非目标节点成立，且两者均满足一致性，则使用 $h_1$ 的 A* 扩展的节点数必少于使用 $h_2$ 的 A*。
这表明**启发式函数越接近 $h^*$，搜索树收敛越快**。

---

## 三、 <Zap className="inline-block mr-2 mb-1 text-yellow-500" /> IDA*：迭代加深与一致性校验

IDA* (Iterative Deepening A*) 是内存受限环境下的首选。

### 1. 核心思想与一致性校验
IDA* 使用 DFS 模拟 A* 的过程。其正确性依赖于**阈值更新机制**。
- **一致性校验**：在实现 IDA* 时，必须确保 $h(n)$ 满足 $h(n) \le h(n') + \text{cost}(n, n')$。若不满足，搜索可能会陷入重复路径或无法在当前层找到解。

### 2. [15-Puzzle] 曼哈顿距离启发式
<details>
<summary><Calculator size={16} className="inline mr-1" /> IDA* 解决 15-数码（C++）</summary>

```cpp
int get_h() {
    int h = 0;
    for (int i = 0; i < 16; i++) {
        if (q[i] == 0) continue;
        int v = q[i] - 1;
        h += abs(i / 4 - v / 4) + abs(i % 4 - v % 4);
    }
    return h;
}

int solve(int dep, int limit, int prev) {
    int h = get_h();
    if (dep + h > limit) return dep + h; // 返回下一次限制的最小值
    if (h == 0) return 0; // 找到目标

    int next_limit = 100;
    for (int i = 0; i < 4; i++) {
        if (abs(i - prev) == 2) continue; // 不往回走
        // 执行移动并递归...
        int t = solve(dep + 1, limit, i);
        if (t == 0) return 0;
        next_limit = min(next_limit, t);
    }
    return next_limit;
}
```
</details>

---

## 四、 <Thermometer className="inline-block mr-2 mb-1 text-orange-500" /> 随机化搜索：模拟退火 (SA)

对于极度复杂的能谱面（Energy Landscape），模拟退火通过概率跳出局部最优。

### 1. Metropolis 准则
接受新解的概率 $P$ 定义为：
$$P = \begin{cases} 1 & \text{if } \Delta E < 0 \\ \exp(-\frac{\Delta E}{T}) & \text{if } \Delta E \ge 0 \end{cases}$$
其中 $T$ 是温度，随时间降温。

---

## 🎯 综合练习：从理论到实战

### 练习 1：剪枝单调性判定
> 给定一个状态空间，已知 $g(s)$ 是从起点到 $s$ 的最短路径，$\hat{h}(s)$ 是估价函数。如果 $\hat{h}(s)$ 违反了可接受性（即存在 $\hat{h}(s) > h^*(s)$），请说明为何最优性剪枝可能会导致算法失败。
<details>
<summary>Check Answer</summary>
若 $\hat{h}(s) > h^*(s)$，则 $f(s) = g(s) + \hat{h}(s)$ 可能会大于当前最优解 $C_{best}$，即使真正通过 $s$ 的路径代价 $g(s) + h^*(s) \le C_{best}$。这将导致算法错误地剪掉包含全局最优解的子树。
</details>

### 练习 2：IDA* 的一致性校验
> 在设计 IDA* 的估价函数时，如果使用了比曼哈顿距离更“激进”的启发式（例如曼哈顿距离乘以 1.5），这会产生什么后果？
<details>
<summary>Check Answer</summary>
这种启发式虽然能大幅减少节点访问数（$b^*$ 变小），但它违反了**可接受性**。后果是 IDA* 可能会在找到真正的最短路径之前，“跳过”它并返回一个代价较高的解，从而失去最优性。
</details>

### 练习 3：[实战] 骑士巡游优化
> 使用 A* 算法解决骑士巡游问题，设计一个合适的启发式函数并给出 C++ 实现。
<details>
<summary>Check Solution: Warnsdorff's Rule 启发式</summary>

```cpp
// 启发式：优先移动到后继分支最少的格子 (Warnsdorff's Rule)
struct Node {
    int x, y, degree;
    bool operator<(const Node& other) const {
        return degree > other.degree; // 小顶堆，度数小的优先
    }
};

int get_degree(int x, int y) {
    int cnt = 0;
    for (int i = 0; i < 8; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        if (is_valid(nx, ny)) cnt++;
    }
    return cnt;
}
```
</details>

---

_“搜索是在复杂性中寻找秩序。从 $f(n)$ 的单调性证明到模拟退火的概率演化，算法的深度决定了问题的边界。”_
