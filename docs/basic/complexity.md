---
title: 复杂度分析与时空权衡 (Complexity & Trade-offs)
sidebar_position: 2
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Clock, HardDrive, Cpu, Zap } from 'lucide-react';

# 复杂度分析与时空权衡 (Complexity & Trade-offs)

复杂度分析是衡量算法优劣的**金标准**。它不仅帮助我们预判算法在特定数据规模下的表现，更是实现“空间换时间”或“时间换空间”决策的核心依据。

---

## 一、 时间复杂度 (Time Complexity)

### 1. 渐进表示法 ($O, \Omega, \Theta$)

- **$O(g(n))$**：上界。表示算法运行时间的增长速度不会超过 $g(n)$。
- **$\Omega(g(n))$**：下界。
- **$\Theta(g(n))$**：精确界。

### 2. 竞赛中常见的复杂度阶

| 阶数            | 典型算法                   | 数据规模 $N$ 估算 (1s) |
| :-------------- | :------------------------- | :--------------------- |
| $O(1)$          | 算术运算、哈希查询         | $\infty$               |
| $O(\log n)$     | 二分查找、快速幂           | $10^{18}+$             |
| $O(n)$          | 遍历、线性筛、双指针       | $10^7 \sim 10^8$       |
| $O(n \log n)$   | 快速排序、归并排序、线段树 | $10^5 \sim 10^6$       |
| $O(n \sqrt{n})$ | 分块算法、莫队算法         | $10^4 \sim 10^5$       |
| $O(n^2)$        | 冒泡排序、简单 DP          | $5000$                 |
| $O(n^3)$        | Floyd、矩阵乘法暴力        | $500$                  |
| $O(2^n)$        | 状态压缩 DP、子集枚举      | $20 \sim 25$           |
| $O(n!)$         | 全排列枚举                 | $10 \sim 12$           |

---

## 二、 空间复杂度 (Space Complexity)

在现代竞赛中，内存限制通常为 **128MB** 或 **256MB**。

### 1. 内存估算准则

- `int`: 4 Bytes
- `long long`: 8 Bytes
- `double`: 8 Bytes
- `bool`: 1 Byte (在 `vector<bool>` 中会有特殊压缩)

<KnowledgeCard type="warning" title="内存爆炸预警">
$10^7$ 个 `int` 占用约 **38.1 MB**。  
$10^8$ 个 `int` 占用约 **381.5 MB** $\to$ 超出 256MB 限制！  
在开启 `std::vector` 或 `std::map` 时，需额外考虑容器的动态开销。
</KnowledgeCard>

---

## 三、 时空权衡策略 (Space-Time Trade-off)

这是算法优化的灵魂。

### 1. 空间换时间

- **预处理**：如前缀和、逆元表、ST 表。通过消耗空间存储计算结果，将查询降至 $O(1)$ 或 $O(\log n)$。
- **记忆化**：在递归中存储子问题的解，避免重复计算。

### 2. 时间换空间

- **分块/滚动数组**：在 DP 中利用空间复用，将 $O(N^2)$ 空间降至 $O(N)$。
- **动态开点**：在权值线段树中，仅对有数据的节点开辟空间。

---

_编者注：优秀的算法工程师应具备“嗅觉”，能通过 $N$ 的范围反推算法的最高复杂度阶数。_
