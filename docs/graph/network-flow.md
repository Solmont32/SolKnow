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
3. **流量守恒 (Flow Conservation)**：除 $s, t$ 外，对于任意 $u \in V \setminus \{s, t\}$，满足 $\sum_{v \in V} f(u, v) = 0$。

<KnowledgeCard title="流量守恒一致性证明 (Consistency Proof)" icon={<ShieldCheck size={20} />}>
**命题**：在增广路算法（如 FF 或 Dinic）中，对路径 $p$ 进行增广操作后，流量守恒性依然保持。
*证明*：
1. 设增广流量为 $\Delta$。对于路径上的中间点 $v \in p$，$v$ 必有入边 $(u, v)$ 和出边 $(v, w)$。
2. 增广操作令 $f(u, v) \leftarrow f(u, v) + \Delta$，$f(v, w) \leftarrow f(v, w) + \Delta$。
3. 对于点 $v$，入流净增 $\Delta$，出流净增 $\Delta$，其净流量 $\sum_{x \in V} f(v, x)$ 保持不变（原先为 $0$，增广后仍为 $0$）。
4. 对于 $s$ 和 $t$，分别仅有出流或入流发生变化，符合流定义。
</KnowledgeCard>

### 2. 割集与流量收敛性
**引理 (Flow-Cut Duality)**：穿过任意割 $(S, T)$ 的净流量等于流的价值 $|f|$。
$$\text{Proof: } f(S, T) = \sum_{u \in S} \sum_{v \in T} f(u, v) = \sum_{u \in S} \left( \sum_{v \in V} f(u, v) - \sum_{v \in S} f(u, v) \right) = \sum_{u \in S} \sum_{v \in V} f(u, v)$$
由于斜对称性，$\sum_{u \in S} \sum_{v \in S} f(u, v) = 0$。且根据守恒性，只有 $u=s$ 时 $\sum f(s, v)$ 非零，故 $f(S, T) = |f|$。

---

## 二、 <TrendingUp className="inline-block mr-2 mb-1 text-orange-500" /> 算法收敛性分析 (Convergence Analysis)

### 1. Dinic 算法：距离单调性与收敛界限
Dinic 的高效性建立在**分层图 (Level Graph)** 的严格单调性上。

<KnowledgeCard title="Dinic 距离单调性证明" icon={<BookOpen size={20} />}>
**引理**：在 Dinic 的一轮迭代（BFS + 多路 DFS 增广）后，下一轮 BFS 得到的 $dist(s, t)$ 严格增加。
*证明要点*：
1. 在残量网络 $G_f$ 中，只有当 $(u, v)$ 满足 $dist(u) + 1 = dist(v)$ 时才可能被增广。
2. 增广后，原有层间的饱和边消失，而可能产生反向边 $(v, u)$。
3. 反向边 $(v, u)$ 满足 $dist(v) = dist(u) + 1$，即它是指向前一层的，不会缩短 $s \to t$ 的最短距离。
4. 只有当 $s \to t$ 在当前分层图中所有路径都饱和时，才需要重新 BFS 增加层数。
*结论*：由于 $dist(s, t) \le n$，算法最多进行 $n$ 轮 BFS，总复杂度 $O(V^2E)$。
</KnowledgeCard>

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
