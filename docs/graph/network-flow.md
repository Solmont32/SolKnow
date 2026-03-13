---
title: 网络流深度理论：对偶性、收敛性与建模进阶
---

import { GitMerge, Zap, Activity, ShieldCheck, Layers, Landmark, ArrowRightLeft, Maximize, Sigma, Workflow, BookOpen, Target, AlertTriangle, TrendingUp } from 'lucide-react';
import ComplexityAnalysis from '@site/src/components/ComplexityAnalysis';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# <GitMerge className="inline-block mr-2 mb-1 text-blue-500" /> 网络流理论 (Network Flow Theory)

网络流不仅是组合优化的核心，更是**线性规划 (Linear Programming)** 在图结构上的投影。本章将从形式化对偶性出发，系统性地构建流网络的性质证明、收敛性分析及其在单位网络中的复杂度界限。

---

## 一、 <Sigma className="inline-block mr-2 mb-1 text-blue-500" /> 形式化理论体系

### 1. 流网络与可行流
**定义 (Feasible Flow)**：函数 $f: V \times V \to \mathbb{R}$ 满足：
1. **容量限制**：$f(u, v) \le c(u, v)$。
2. **斜对称性**：$f(u, v) = -f(v, u)$。
3. **流量守恒**：除 $s, t$ 外，每个节点的净流量为 $0$。

### 2. 割集与流量收敛性
**引理 (Flow-Cut Duality)**：穿过任意割 $(S, T)$ 的净流量等于流的价值 $|f|$。
$$\text{Proof: } f(S, T) = \sum_{u \in S} \sum_{v \in T} f(u, v) = \sum_{u \in S} \left( \sum_{v \in V} f(u, v) - \sum_{v \in S} f(u, v) \right) = |f|$$

---

## 二、 <TrendingUp className="inline-block mr-2 mb-1 text-orange-500" /> 算法收敛性分析 (Convergence Analysis)

网络流算法的演进史本质上是**增广路选择策略**的优化史。

### 1. Ford-Fulkerson 的病态收敛
<KnowledgeCard title="实数容量下的非收敛性" icon={<AlertTriangle size={20} />}>
**定理**：若容量为无理数，Ford-Fulkerson 算法可能永远不收敛，且流量可能收敛于非最大流的值。
**结论**：在整数容量下，FF 算法在 $O(E|f|)$ 内收敛，但在实数环境下缺乏完备性保证。
</KnowledgeCard>

### 2. Edmonds-Karp 与 Dinic：多项式收敛
- **Edmonds-Karp**：每次选最短路增广，复杂度 $O(VE^2)$。其核心在于证明 $s \to v$ 的最短路距离 $d_f(s, v)$ 在增广过程中**单调不减**。
- **Dinic**：引入**分层图 (Level Graph)** 思想，一次性推送多个流。
  - **收敛性**：每轮 BFS 后，汇点 $t$ 的层数 $L(t)$ 严格单调增加，故最多 $n$ 轮 BFS 即可收敛。

---

## 三 <ShieldCheck className="inline-block mr-2 mb-1 text-indigo-500" /> 最大流最小割定理 (Max-Flow Min-Cut)

**定理 2.1**：最大流价值 $|f|$ 等于最小割容量 $c(S, T)$。
**证明要点**：
1. 任意流 $\le$ 任意割。
2. 当残量网络 $G_f$ 无增广路时，定义 $S$ 为 $s$ 可达点集，通过构造性证明 $|f| = c(S, T)$，从而建立等价性。

---

## 四、 <Workflow className="inline-block mr-2 mb-1 text-green-500" /> 建模进阶：上下界网络流

对于边 $(u, v)$ 有下界 $l_{uv}$ 和上界 $c_{uv}$：

### 1. 无源汇可行流 (Circulation)
建立新源汇 $S', T'$。
- **流量平衡**：对于点 $u$，设 $in\_sum$ 为进入 $u$ 的所有下界之和，$out\_sum$ 为离开 $u$ 的下界之和。
- **连边**：
  - 若 $in\_sum - out\_sum > 0$，连边 $(S', u)$，容量为 $in\_sum - out\_sum$。
  - 若 $in\_sum - out\_sum < 0$，连边 $(u, T')$，容量为 $out\_sum - in\_sum$。
- **结论**：若 $S' \to T'$ 满流，则存在可行流。

---

## 五、 <Target className="inline-block mr-2 mb-1 text-red-500" /> 精选练习与解析

### 练习 1：最小路径覆盖 (DAG)
给定一个 DAG，用最少的互不相交的路径覆盖所有顶点。

<details>
<summary>Check Solution</summary>

**解析**：
1. **拆点**：将每个点 $u$ 拆为 $u_{in}$ 和 $u_{out}$。
2. **建模**：
   - 对于原图中的边 $(u, v)$，连边 $(u_{out}, v_{in})$，容量 $1$。
   - $S \to u_{out}$，$u_{in} \to T$，容量均位 $1$。
3. **计算**：最小路径数 = 总顶点数 - 最大匹配数。

</details>

### 练习 2：最大权闭合子图
给定带权图，选择一些点，若选择了点 $u$，则必须选择其所有后继点。求总权值最大。

<details>
<summary>Check Solution</summary>

**解析**：
1. **建模**：
   - $S \to \text{正权点}$，容量为点权。
   - $\text{负权点} \to T$，容量为点权的绝对值。
   - 原图中的边 $(u, v)$，连边 $(u, v)$，容量 $\infty$。
2. **计算**：$\sum \text{PositiveWeights} - \text{MinCut}$。

</details>

### 练习 3：混合图欧拉回路
给定一个部分边有向、部分边无向的图，判定是否存在欧拉回路。

<details>
<summary>Check Solution</summary>

**解析**：
1. **预处理**：给无向边任意定向，并计算每个点的度数差 $D = \text{in-degree} - \text{out-degree}$。若有奇数度数点，必无解。
2. **建模**：
   - 目标是将某些无向边重定向，使所有点 $D=0$。
   - 连边 $(S, u)$（若 $D>0$）或 $(u, T)$（若 $D<0$），容量为 $|D|/2$。
   - 对于原无向边定向 $(u, v)$，连边 $(u, v)$，容量 $1$（表示可以反向）。
3. **判定**：若最大流为满流，则存在欧拉回路。

</details>

### 练习 4：网络流 24 题 - 航空路线问题
找两条从起点到终点的点不相交路径，使得路径权值和最大。

<details>
<summary>Check Solution</summary>

**解析**：
1. **拆点**：每个点 $u$ 拆为 $u_{in}, u_{out}$，连边 $(u_{in}, u_{out})$，容量 $1$（起点终点为 $2$），权值为 $1$。
2. **连边**：原边 $(u, v)$ 连边 $(u_{out}, v_{in})$，容量 $1$，权值 $0$。
3. **求解**：最大费用最大流。

</details>
