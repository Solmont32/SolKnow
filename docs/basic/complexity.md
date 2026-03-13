---
title: 算法复杂度分析 (Complexity Analysis)
sidebar_position: 2
---

import { Clock, HardDrive, Zap, Binary, BarChart3, Calculator, Repeat, Layers, CheckCircle2 } from 'lucide-react';
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

## 二、 递归复杂度与收敛性证明

对于分治算法，其复杂度通常遵循递推式：$T(n) = aT(n/b) + f(n)$。

### 1. 主定理 (Master Theorem) 的严格判定

设 $a \ge 1, b > 1$ 为常数，$f(n)$ 为渐近正函数：

1. **若 $f(n) = O(n^{\log_b a - \epsilon})$**，则 $T(n) = \Theta(n^{\log_b a})$。 (递归树叶子节点代价占主导)
2. **若 $f(n) = \Theta(n^{\log_b a} \log^k n)$**，则 $T(n) = \Theta(n^{\log_b a} \log^{k+1} n)$。 (各层代价均衡)
3. **若 $f(n) = \Omega(n^{\log_b a + \epsilon})$**，且满足正则性条件 $af(n/b) \le cf(n)$ ($c < 1$)，则 $T(n) = \Theta(f(n))$。 (根节点代价占主导)

### 2. 递归树模型 (Recurrence Tree) 证明

$$ T(n) = \sum_{j=0}^{\log_b n - 1} a^j f(n/b^j) + \Theta(n^{\log_b a}) $$
递归的收敛性取决于 $a$（分支因子）与 $b$（规模缩减因子）的博弈。

---

## 三、 均摊分析：势能法 (Potential Method)

当单次操作最坏情况很差，但一系列操作的总和表现良好时使用。

### 1. 势能函数定义
定义势能函数 $\Phi(D)$，将数据结构 $D$ 的状态映射为实数。
- **实际代价**：$c_i$
- **均摊代价**：$\hat{c}_i = c_i + \Phi(D_i) - \Phi(D_{1-1})$

### 2. 总代价收敛
$$ \sum_{i=1}^n c_i = \sum_{i=1}^n \hat{c}_i - (\Phi(D_n) - \Phi(D_0)) $$
若设计合适的 $\Phi$ 使得 $\Phi(D_n) \ge \Phi(D_0)$，则总实际代价被总均摊代价**上界锁定**。

---

## 四、 空间复杂度与收敛分析

### 1. 递归栈空间 (Call Stack)
递归调用的空间消耗取决于**递归深度**。
- **平衡分治**：深度 $O(\log n)$，空间收敛。
- **退化分治**：深度 $O(n)$，可能导致栈溢出。

### 2. 空间复用原则
在分治算法中，若子问题的辅助空间在回溯后释放，则总空间复杂度满足 $S(n) = S(n/b) + f_{space}(n)$。通过 Case 3 推导，归并排序的空间复杂度为 $O(n)$。

---

## 五、 综合练习

### 练习 1：主定理深度应用
求解 $T(n) = 2T(n/2) + n \log n$ 的渐近复杂度。

<details>
<summary>Check Solution</summary>

1. $a=2, b=2 \implies n^{\log_2 2} = n^1$。
2. $f(n) = n \log n = \Theta(n \log^1 n)$。
3. 符合 Case 2（扩展型），其中 $k=1$。
4. 故 $T(n) = \Theta(n \log^2 n)$。
</details>

### 练习 2：二叉搜索树 (BST) 的期望复杂度
证明在随机插入情况下，BST 的平均查找复杂度为 $O(\log n)$。

<details>
<summary>Check Solution</summary>

**证明概要**：
建立递归式 $T(n) = 1 + \frac{1}{n} \sum_{i=0}^{n-1} (T(i) + T(n-1-i))$。
通过代入法证明其解为 $T(n) = O(\log n)$。这本质上是快速排序划分过程的镜像，利用期望的线性性质实现复杂度收敛。
</details>

---

_编者注：复杂度分析不仅是数学工具，更是程序员的“第六感”。它让我们在落笔之前就能预知算法在大规模数据面前的生存能力。_
