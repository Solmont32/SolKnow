---
title: 算法复杂度分析 (Complexity Analysis)
sidebar_position: 2
---

import { Clock, HardDrive, Zap, Binary, BarChart3, Calculator } from 'lucide-react';
import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 算法复杂度分析 (Complexity Analysis)

复杂度分析是评估算法优劣的**公理化体系**。它不依赖于具体的硬件环境，而是通过数学抽象（大 $O$ 符号）刻画随着输入规模 $n$ 增长时，资源消耗（时间与空间）的**渐近增长率**。

---

## 一、 渐近表示法 (Asymptotic Notation)

### 1. 形式化定义

设 $f(n)$ 为算法的资源消耗函数：

- **$O(g(n))$ (上界)**：$\exists c > 0, n_0 > 0, \forall n \ge n_0: f(n) \le c \cdot g(n)$。
- **$\Omega(g(n))$ (下界)**：$\exists c > 0, n_0 > 0, \forall n \ge n_0: f(n) \ge c \cdot g(n)$。
- **$\Theta(g(n))$ (等价)**：$f(n) = O(g(n)) \land f(n) = \Omega(g(n))$。

### 2. 复杂度阶梯 (The Complexity Hierarchy)
$$ O(1) < O(\log \log n) < O(\log n) < O(\sqrt{n}) < O(n) < O(n \log n) < O(n^k) < O(a^n) < O(n!) $$

---

## 二、 递归复杂度：收敛性推导

### 1. 递归树模型 (Recurrence Tree)

对于形如 $T(n) = aT(n/b) + f(n)$ 的递归式，其总开销可视为一颗树：
- **深度**：$\log_b n$。
- **第 $i$ 层节点数**：$a^i$。
- **第 $i$ 层总开销**：$a^i \cdot f(n/b^i)$。

**收敛推导公式**：
$$ T(n) = \sum_{i=0}^{\log_b n - 1} a^i f(n/b^i) + \Theta(n^{\log_b a}) $$

### 2. 主定理 (Master Theorem) 的严格判定

设 $T(n) = aT(n/b) + O(n^d)$，其中 $a \ge 1, b > 1$：

1. **计算临界指数**：$c = \log_b a$。
2. **比较 $c$ 与 $d$**：
   - **Case 1 ($c > d$)**：递归分支开销主导。$T(n) = \Theta(n^{\log_b a})$。
   - **Case 2 ($c = d$)**：各层开销均衡。$T(n) = \Theta(n^d \log n)$。
   - **Case 3 ($c < d$)**：根节点合并开销主导。$T(n) = \Theta(n^d)$。

<KnowledgeCard type="warning" title="主定理失效场景">
当 $f(n)$ 不是多项式形式（如 $f(n) = 2^n$）或 $a$ 不是常数时，需使用**递归代入法**或**生成函数**求解。
</KnowledgeCard>

---

## 三、 空间复杂度与时间权衡 (Space-Time Tradeoff)

算法设计往往是在**时间**（CPU 周期）与**空间**（内存占用）之间寻找帕累托最优：

1. **以空间换时间**：
   - **预处理 (Preprocessing)**：如前缀和、ST 表、动态规划。
   - **记忆化 (Memoization)**：存储子问题解，避免重复计算。
2. **以时间换空间**：
   - **滚动数组**：将 $O(n)$ 空间压缩至 $O(1)$。
   - **分块 (Blocking)**：在有限内存下分批处理大数据。

---

## 四、 工业级分析范式

### 1. 均摊分析 (Amortized Analysis)
当单次操作最坏情况很差，但一系列操作的总和表现良好时使用。
- **势能法 (Potential Method)**：定义势能函数 $\Phi(D_i)$，均摊代价 $\hat{c}_i = c_i + \Phi(D_i) - \Phi(D_{i-1})$。

### 2. 概率分析 (Expectation)
针对快速排序等具有随机性的算法，计算**期望复杂度** $E[T(n)]$。

---

## 五、 典型算法复杂度速查

| 算法类型 | 时间 (最好/平均/最坏) | 空间 | 备注 |
| :--- | :--- | :--- | :--- |
| **二分查找** | $O(1) / O(\log n) / O(\log n)$ | $O(1)$ | 需有序性 |
| **快速排序** | $O(n \log n) / O(n \log n) / O(n^2)$ | $O(\log n)$ | 递归栈深度 |
| **堆排序** | $O(n \log n) / O(n \log n) / O(n \log n)$ | $O(1)$ | 不稳定 |
| **基数排序** | $O(nk) / O(nk) / O(nk)$ | $O(n+k)$ | $k$ 为位数 |

---

_编者注：理解复杂度的收敛性是算法进阶的标志。不仅要记住 $O(N \log N)$，更要理解那棵递归树是如何展开并最终收缩的。_
