---
title: 算法复杂度分析 (Complexity Analysis)
sidebar_position: 2
---

import { Clock, HardDrive, Zap, Binary, BarChart3, Calculator, Repeat, Layers } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 算法复杂度分析 (Complexity Analysis)

复杂度分析是评估算法优劣的**公理化体系**。它不依赖于具体的硬件环境，而是通过数学抽象（大 $O$ 符号）刻画随着输入规模 $n$ 增长时，资源消耗（时间与空间）的**渐近增长率**。

---

## 一、 渐近表示法 (Asymptotic Notation)

### 1. 形式化定义

设 $f(n)$ 为算法的资源消耗函数：

- **$O(g(n))$ (上界)**：$\exists c > 0, n_0 > 0, \forall n \ge n_0: 0 \le f(n) \le c \cdot g(n)$。
- **$\Omega(g(n))$ (下界)**：$\exists c > 0, n_0 > 0, \forall n \ge n_0: 0 \le c \cdot g(n) \le f(n)$。
- **$\Theta(g(n))$ (等价)**：$f(n) = O(g(n)) \land f(n) = \Omega(g(n))$。

### 2. 复杂度阶梯 (The Complexity Hierarchy)

$$ O(1) < O(\log \log n) < O(\log n) < O(\sqrt{n}) < O(n) < O(n \log n) < O(n^k) < O(a^n) < O(n!) $$

---

## 二、 递归复杂度：收敛性证明

对于分治算法，其复杂度通常遵循递推式：$T(n) = aT(n/b) + f(n)$。

### 1. 主定理 (Master Theorem) 的严格判定

设 $a \ge 1, b > 1$ 为常数，$f(n)$ 为渐近正函数：

1. **若 $f(n) = O(n^{\log_b a - \epsilon})$**，则 $T(n) = \Theta(n^{\log_b a})$。（递归树叶子节点占主导）
2. **若 $f(n) = \Theta(n^{\log_b a})$**，则 $T(n) = \Theta(n^{\log_b a} \log n)$。（各层代价均衡）
3. **若 $f(n) = \Omega(n^{\log_b a + \epsilon})$**，且满足正则性条件 $af(n/b) \le cf(n)$ ($c < 1$)，则 $T(n) = \Theta(f(n))$。（根节点代价占主导）

### 2. 递归树模型 (Recurrence Tree) 证明

$$ T(n) = f(n) + a f(n/b) + a^2 f(n/b^2) + \dots + a^{\log_b n} T(1) $$
$$ T(n) = \sum_{j=0}^{\log_b n - 1} a^j f(n/b^j) + \Theta(n^{\log_b a}) $$

<details>
<summary>例题：归并排序复杂度推导</summary>

$T(n) = 2T(n/2) + O(n)$
- $a=2, b=2, f(n)=n$
- $n^{\log_b a} = n^{\log_2 2} = n^1$
- 满足 Case 2，故 $T(n) = \Theta(n \log n)$。
</details>

---

## 三、 均摊分析：势能法 (Potential Method)

当单次操作最坏情况很差，但一系列操作的总和表现良好时使用。

### 1. 势能函数定义
定义势能函数 $\Phi(D)$，将数据结构 $D$ 的状态映射为实数。
- **实际代价**：$c_i$
- **均摊代价**：$\hat{c}_i = c_i + \Phi(D_i) - \Phi(D_{i-1})$

### 2. 总代价界定
$$ \sum_{i=1}^n c_i = \sum_{i=1}^n \hat{c}_i - (\Phi(D_n) - \Phi(D_0)) $$
若 $\Phi(D_n) \ge \Phi(D_0)$，则总实际代价 $\le$ 总均摊代价。

<KnowledgeCard type="info" title="典型案例：动态数组扩容">
每次扩容（$c_i = n$）虽昂贵，但通过势能函数 $\Phi = 2 \cdot (\text{已用} - \text{半满})$，可证明均摊代价为 $O(1)$。
</KnowledgeCard>

---

## 四、 空间复杂度与收敛分析

### 1. 递归栈空间 (Call Stack)
递归调用的空间消耗取决于**递归深度**。
- **二分搜索**：深度 $O(\log n)$，空间 $O(\log n)$（非原地实现）或 $O(1)$（原地实现）。
- **快速排序**：最坏深度 $O(n)$，期望深度 $O(\log n)$。

### 2. 空间复用原则
在分治算法中，若子问题的辅助空间在回溯后释放，则总空间复杂度 $S(n) = S(n/b) + f_{space}(n)$。
- **归并排序**：$S(n) = S(n/2) + O(n) \implies O(n)$（由 Case 3 推导）。

---

## 五 : 综合练习

### 练习 1：主定理应用
求解 $T(n) = 3T(n/4) + n \log n$ 的渐近复杂度。

<details>
<summary>Check Solution</summary>

1. $a=3, b=4 \implies n^{\log_4 3} \approx n^{0.793}$。
2. $f(n) = n \log n = \Omega(n^{0.793 + \epsilon})$。
3. 检查正则性：$3 \cdot (n/4 \log n/4) = \frac{3}{4} n (\log n - \log 4) \le \frac{3}{4} n \log n$。
4. 符合 Case 3，故 $T(n) = \Theta(n \log n)$。
</details>

### 练习 2：栈操作均摊分析
一个栈支持 `PUSH`, `POP`, `MULTIPOP(k)`（弹出 $k$ 个元素）。证明 $n$ 次操作的总复杂度为 $O(n)$。

<details>
<summary>Check Solution</summary>

**势能法证明**：
1. 定义势能函数 $\Phi(S) = |S|$（栈内元素个数）。
2. `PUSH`：实际 $c=1$, $\Delta\Phi = 1$, $\hat{c} = 1 + 1 = 2$。
3. `POP`：实际 $c=1$, $\Delta\Phi = -1$, $\hat{c} = 1 - 1 = 0$。
4. `MULTIPOP(k)`：实际 $c = \min(k, |S|)$, $\Delta\Phi = -\min(k, |S|)$, $\hat{c} = c - c = 0$。
由于 $\hat{c} \le 2$ 且 $\Phi \ge 0$，总复杂度 $O(n)$。
</details>

---

_编者注：复杂度分析不是死记硬背公式，而是理解计算资源是如何在时间和空间维度上“流动”的。_
