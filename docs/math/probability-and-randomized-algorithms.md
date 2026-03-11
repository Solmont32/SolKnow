---
title: 概率、随机化算法与期望建模
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { motion } from 'framer-motion';
import { Sigma, FunctionSquare, Target, Zap, Binary, Infinity, Cpu, Code2, Hash, Layers, MoveRight, Search } from 'lucide-react';

# 概率、随机化算法与期望建模 (Probability & Expectation)

<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
className="text-gray-600 dark:text-gray-400 mb-8">

 本篇章构建了从离散概率基础到复杂状态空间期望建模的完备体系。我们将深入探讨期望的线性性、条件期望、Min-Max 容斥以及随机化算法在处理大数问题中的工业级应用。
</motion.div>

---

## 1. 期望的线性性与深度推导

### 1.1 期望的收敛性与大数定律

在算法分析中，我们常关心**平均复杂度**。

- **弱大数定律**：若 $X_1, X_2, \dots$ 是独立同分布且期望为 $\mu$ 的随机变量，则样本均值 $\bar{X}_n \xrightarrow{P} \mu$。
- **意义**：随机化算法（如快速排序）的随机性能在规模增大时极高概率趋向其理论期望。

### 1.2 赠券收集者问题 (Coupon Collector's Problem)

有 $n$ 种赠券，每秒随机获得一种。求获得全套的期望时间。
**推导**：
设 $X_i$ 为已拥有 $i-1$ 种后，获得新一种所需的时间。
$X_i$ 服从几何分布，成功概率 $p_i = \frac{n-(i-1)}{n}$。
故 $E[X_i] = \frac{1}{p_i} = \frac{n}{n-i+1}$。
总期望 $E[X] = \sum_{i=1}^n E[X_i] = n \sum_{i=1}^n \frac{1}{i} \approx n \ln n + \gamma n$。

### 1.3 图上随机游走 (Random Walk on Graphs)

对于连通无向图，$d(u)$ 为点 $u$ 的度数。从 $u$ 出发走一步到相邻点的概率为 $1/d(u)$。

- **平稳分布**：$\pi(u) = \frac{d(u)}{2|E|}$。
- **覆盖时间 (Cover Time)**：期望遍历所有点的步数为 $O(|V||E|)$。

---

## 2. 随机化算法进阶

### 2.1 Miller-Rabin 错误率分析

单次测试失败概率不超过 $1/4$。进行 $k$ 次独立测试，将错误率降至 $(1/4)^k$。
工业级标准通常取 $k=10$（错误率 $< 10^{-6}$）或 $k=40$。

### 2.2 模拟退火 (Simulated Annealing) 收敛性

基于 Metropolis 准则：若 $\Delta E < 0$ 必接受；否则以 $e^{-\Delta E / T}$ 接受。
**理论上**：若降温过程足够慢，算法能以概率 1 收敛到全局最优解。

---

## 3. 期望 DP 模型构建

### 3.1 状态转移与消元

对于 $E_u = \sum P_{uv} E_v + W_{uv}$，若图中存在环，需使用高斯消元。
对于树形结构，利用系数递推法（$E_u = A_u E_{fa} + B_u$）可将 $O(n^3)$ 优化至 $O(n)$。

---

## 4. 综合练习与解答

### 练习 1：[USACO08NOV] 混合牛奶 (期望线性性)

$N$ 个点，每个点有 $p_i$ 概率出现，出现后与其相连的边才存在。求期望连通块数。
**解析**：期望连通块数 = 点数 - 边数。$E = \sum p_i - \sum_{(u,v) \in E} p_u p_v$。

### 练习 2：[ZJOI2019] 开关 (生成函数求解期望)

$n$ 个开关，初始全关。每秒以概率 $p_i$ 翻转第 $i$ 个开关。求达到目标状态 $S$ 的期望时间。
**解析**：利用指数生成函数 (EGF)。将 $\sinh, \cosh$ 展开为 $e^{p_i x}, e^{-p_i x}$ 的形式求解。

### 练习 3：[NOI2015] 荷马史诗 (哈夫曼编码与期望)

$n$ 种字符，频率为 $w_i$，求 $k$ 进制哈夫曼编码的最佳期望长度。
**解析**：哈夫曼树本质是使得 $\sum w_i l_i$ 最小。$k$ 进制合并时，若 $(n-1) \pmod{k-1} \neq 0$，需补齐权重为 0 的虚节点。

### 练习 4：[CF 1045E] Ancient Algorithm (随机化几何)

给定点集，求最小覆盖圆。
**解析**：Welzl's 算法，随机增量法。随机打乱点后，期望复杂度为 $O(n)$。

### 练习 5：[HAOI2015] 按位或 (Min-Max 容斥)

给定 $n$ 个数位，每秒以概率 $p_i$ 选出一个集合，求所有位都被选中的期望时间。
**解析**：设 $S$ 为所有数位的集合。利用 Min-Max 容斥 $E[\max(S)] = \sum (-1)^{|T|-1} E[\min(T)]$ 求解。

### 练习 6：[SHOI2014] 概率充电器 (树形期望 DP)

$n$ 个点树形结构，每个点有电概率。利用树形 DP 两次扫描（自底向上 + 自顶向下）求解期望充电点数。

<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
className="mt-12 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800">

<Infinity className="text-purple-500 mb-2" />
**大师寄语**：在不确定性的迷雾中，期望是我们唯一的罗盘。只要步数足够多，大数定律终将让随机回归必然。
</motion.div>
