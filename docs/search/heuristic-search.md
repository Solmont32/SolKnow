---
title: 搜索算法精要：从启发式搜索到 A* 与模拟退火
sidebar_position: 2
---

import { Search, Zap, Target, Thermometer, Box, ArrowRightCircle, Layers, ShieldCheck, Activity, Cpu, Database, Swords, Microscope, TrendingUp, Binary, Info, BookOpen, Calculator, RefreshCcw } from 'lucide-react';

# <Target className="inline-block mr-2 mb-1 text-purple-500" /> 搜索算法精要 (Search Essentials)

> **导语**：搜索 (Search) 是计算科学中处理“NP-Hard”问题的最后一道防线。从启发式引导的确定性搜索到模拟物理退火的随机化优化，搜索算法的进化本质上是对**状态空间 (State Space)** 拓扑结构与数学特性的深度解构。

---

## 零、 <Layers className="inline-block mr-2 mb-1 text-blue-400" /> 状态空间建模与拓扑分析

### 1. 形式化定义：五元组模型 $\mathcal{M}$

一个搜索问题可严格定义为 $\mathcal{M} = \langle S, A, T, s_0, G \rangle$：
- $S$：**状态集合**，节点总数 $|S|$ 决定了搜索空间的理论上限。
- $A(s)$：**可行操作集**。
- $T: S \times A \to S$：**转移算子**，定义了状态空间的连通性。
- $g(s)$：从 $s_0$ 到 $s$ 的**实际路径代价**。
- $h^*(s)$：从 $s$ 到最近目标状态 $g \in G$ 的**理想最小代价**。

### 2. 搜索树复杂度与收敛性分析

在深度为 $d$、分支因子为 $b$ 的搜索树中：
- **节点爆炸**：$|V| \approx b^d$。
- **收敛定义**：算法在有限步内找到路径（完备性）且该路径代价最小（最优性）。
- **有效分支因子 $b^*$**：衡量启发式强度的核心指标。若总节点数为 $N$，则 $1 + b^* + (b^*)^2 + \dots + (b^*)^d = N$。一个好的 $h(n)$ 应使 $b^* \to 1$。

---

## 一、 <ShieldCheck className="inline-block mr-2 mb-1 text-green-500" /> 剪枝策略：逻辑断言与状态剪减

### 1. 可行性与最优性剪枝
- **可行性剪枝**：$\exists P(s) \text{ s.t. } P(s) \implies \forall \tau, T(s, \tau) \notin G$。
- **最优性剪枝**：若 $g(s) + \text{low\_bound}(h^*(s)) \ge \text{ans}_{\text{current\_best}}$，则舍弃。

### 2. 系统化剪枝准则：[木棒拼接问题]
<details>
<summary><Search size={16} className="inline mr-1" /> 深度优先搜索剪枝证明（C++）</summary>

```cpp
/**
 * 核心剪枝点分析：
 * 1. 降序排列：长木棒约束力更强。
 * 2. 相同长度去重：避免等价分支。
 * 3. 失败回溯：若当前第一根或最后一根拼接失败，则该分支必败。
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
</details>

---

## 二、 <Target className="inline-block mr-2 mb-1 text-red-500" /> A* 算法：启发式函数与一致性证明

### 1. 估价函数 $f(n) = g(n) + h(n)$

#### A. 可接受性 (Admissibility)
$0 \le h(n) \le h^*(n)$。保证找到最优解。

#### B. 一致性 (Consistency / Monotonicity)
对于相邻节点 $n, n'$，满足：
$$h(n) \le c(n, a, n') + h(n')$$
且 $h(G) = 0$。

### 2. 一致性推导单调性证明
**定理**：若 $h(n)$ 一致，则沿路径的 $f(n)$ 单调不减。
**证明**：
$f(n') = g(n') + h(n') = g(n) + c(n, a, n') + h(n')$
由一致性：$c(n, a, n') + h(n') \ge h(n)$
$\therefore f(n') \ge g(n) + h(n) = f(n)$。证毕。

---

## 三、 <Thermometer className="inline-block mr-2 mb-1 text-orange-500" /> 模拟退火 (Simulated Annealing, SA)

当状态空间极大且不具备明显的单调性时，随机化优化是逃离局部最优的关键。

### 1. 物理模拟与 Metropolis 准则
- **玻尔兹曼分布**：状态能量 $E$ 的概率 $P(E) \propto \exp(-E/kT)$。
- **接受概率**：设当前能级为 $E_s$，新能级为 $E_{s'}$。
  - 若 $E_{s'} < E_s$，必接受。
  - 若 $E_{s'} \ge E_s$，以概率 $P = \exp(-\Delta E / T)$ 接受。

### 2. 算法流程与收敛条件
1. **初始温度** $T_0$（极大），**终止温度** $T_{end}$（极小），**降温系数** $\Delta$（如 $0.99$）。
2. 在每个温度下进行若干次随机扰动（Metropolis 步）。
3. **收敛性**：当 $T \to 0$ 且步数足够多时，SA 以概率 1 收敛到全局最优。

### 3. [平衡点问题] 模拟退火实现
<details>
<summary><RefreshCcw size={16} className="inline mr-1" /> 寻找广义费马点（C++ 实现）</summary>

```cpp
struct Node { double x, y, w; } p[N];
double ansx, ansy, answ;

double get_dist(double x, double y) {
    double res = 0;
    for (int i = 0; i < n; i++) {
        double dx = x - p[i].x, dy = y - p[i].y;
        res += sqrt(dx * dx + dy * dy) * p[i].w;
    }
    return res;
}

void sa() {
    double x = ansx, y = ansy, t = 2000;
    while (t > 1e-15) {
        double nx = x + (rand() * 2.0 - RAND_MAX) * t;
        double ny = y + (rand() * 2.0 - RAND_MAX) * t;
        double nw = get_dist(nx, ny);
        double delta = nw - answ;
        if (delta < 0) {
            ansx = x = nx, ansy = y = ny, answ = nw;
        } else if (exp(-delta / t) > (double)rand() / RAND_MAX) {
            x = nx, y = ny;
        }
        t *= 0.997;
    }
}
```
</details>

---

## 四 <Zap className="inline-block mr-2 mb-1 text-yellow-500" /> IDA*：限深搜索与内存优化

IDA* 通过迭代加深解决了 A* 内存开销大的问题。

### 1. 迭代加深与阈值
每次迭代以 $f(n)$ 的最小值作为下一轮限制。其有效性建立在 $h(n)$ 的一致性之上，确保了每次迭代都能实质性地推进搜索深度。

---

## 🎯 综合挑战：搜索算法的极限

### 练习 1：随机化局部最优解验证
> 模拟退火为何能逃离局部最优？请从能量面 (Energy Landscape) 角度解释 $T$ 的作用。
<details>
<summary>Check Analysis</summary>
在高温 $T$ 时，$P = \exp(-\Delta E / T)$ 接近 1，算法几乎执行随机游走，从而跨越能垒；随着 $T$ 降低，接受劣解的概率指数级下降，算法逐渐收敛。这种“随机扰动”打破了贪心策略在局部极小值处的稳态。
</details>

### 练习 2：IDA* 解决 15-数码问题
> 设计一个估价函数，并使用 IDA* 解决 15-Puzzle。
<details>
<summary>Check Solution: IDA* C++ 实现</summary>

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

bool dfs(int dep, int limit, int prev) {
    int h = get_h();
    if (dep + h > limit) return false;
    if (h == 0) return true;

    for (int i = 0; i < 4; i++) {
        if (abs(i - prev) == 2) continue; // 避免无效往返
        // ... swap and recurse ...
    }
    return false;
}
```
</details>

### 练习 3：模拟退火解决 TSP 问题
> 给定 $N$ 个城市的坐标，寻找最短闭合路径。
<details>
<summary>Check Solution: SA for TSP</summary>

```cpp
void sa() {
    double t = 3000;
    while (t > 1e-10) {
        int a = rand() % n, b = rand() % n;
        double old_dist = calc_dist();
        reverse(path + a, path + b + 1); // 2-opt 变换
        double new_dist = calc_dist();
        double delta = new_dist - old_dist;
        if (delta < 0 || exp(-delta / t) > (double)rand() / RAND_MAX) {
            // accept
        } else {
            reverse(path + a, path + b + 1); // reject
        }
        t *= 0.9995;
    }
}
```
</details>

---

_“搜索是对确定性的追逐，而模拟退火是对混沌的利用。在 $T \to 0$ 的终点，逻辑与概率合二为一。”_
