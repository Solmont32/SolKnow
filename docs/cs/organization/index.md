---
title: 计算机组织与体系结构 (Computer Organization & Architecture)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Cpu, Layers } from 'lucide-react';

# 计算机组织与体系结构

计算机组织（Computer Organization）关注硬件组件如何实现体系结构规格，而计算机体系结构（Computer Architecture）关注软硬件接口。

## 核心内容索引

- [指令级并行 (ILP) 与流水线优化](../system-architecture-and-primitives#1-体系结构指令级并行-ilp-分析)
- [缓存层次结构与局部性](../system-architecture-and-primitives#4-底层优化技巧缓存与分支)
- **存储器层次结构**：从寄存器、L1/L2/L3 Cache 到主存与磁盘。
- **总线与 I/O 系统**：中断驱动、DMA 与通道。

---

<KnowledgeCard type="info" title="Amdahl 定律">
系统中某一部分的优化对整体性能的提升，受限于该部分在总执行时间中所占的比例。
$$Speedup = \frac{1}{(1-f) + f/s}$$
其中 $f$ 是可优化部分的比例，$s$ 是该部分的加速比。
</KnowledgeCard>
