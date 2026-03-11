---
title: 数学与算法竞赛专题 (Mathematics & CP)
sidebar_position: 1
---

import { motion } from 'framer-motion';
import { Sigma, Hash, Zap, Infinity, Gamepad2, Binary, Scale, Trophy } from 'lucide-react';

# 数学与算法竞赛专题

<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
className="text-gray-600 dark:text-gray-400 mb-8"

> 数学是算法竞赛的灵魂。从精妙的整除理论到复杂的组合模型，本板块致力于构建一个严谨且具有工业级实用性的数学知识体系。
> </motion.div>

---

## 🏗️ 知识体系架构

### 1. 数论基础与进阶 (Number Theory)

- **[模运算与同余系统](./modint)**：数论的基石，包括逆元、原根与同余方程。
- **[数论核心理论](./number-theory)**：从线性筛、EXGCD 到莫比乌斯反演与杜教筛。

### 2. 组合数学与博弈模型 (Combinatorics & Game Theory)

- **[组合计数与博弈](./combinatorics-and-game-theory)**：包含容斥原理、生成函数、线性基与 SG 定理。

### 3. 线性代数与计算优化 (Linear Algebra)

- **[矩阵快速幂](./matrix-fast-pow)**：通过矩阵变换加速递推与图论状态转移。

### 4. 概率、期望与随机化 (Probability & Random)

- **[概率与随机算法](./probability-and-randomized-algorithms)**：期望线性性、离散概率建模与随机化搜索策略。

---

## 🎯 关联练习与实战

<div className="solknow-card border border-green-200 p-4 rounded-lg bg-green-50/10 hover:shadow-lg transition-shadow">
  <div className="flex items-center gap-2 mb-2 text-green-600 font-bold">
    <Trophy size={18} />
    <span>算法竞赛习题库：数学专题强化</span>
  </div>
  <p className="text-sm text-gray-600 mb-4">包含全站数学知识点的对标练习，配备详细的折叠式 C++ 解析与思维逻辑。涵盖数论、组合、博弈与概率等全维度题目。</p>
  <a href="/docs/exercises/math/index" className="button button--success">进入练习库 →</a>
</div>

<motion.div
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800"

> <Scale className="text-blue-500 mb-2" />
> **大师寄语**：在数学的世界里，没有模糊的“差不多”。每一个推导都必须无懈可击，每一个结论都必须经过逻辑的洗礼。
> </motion.div>
