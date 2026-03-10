---
title: 基础算法原语 (Basic Algorithmic Primitives)
sidebar_position: 1
---

import { Code2, Zap, Target, Layers, GitBranch, Binary, Repeat } from 'lucide-react';

# 基础算法原语 (Basic Algorithmic Primitives)

基础算法是计算机科学的“砖石”。它们不涉及复杂的数据结构维护，而是侧重于对**数据性质（如单调性、贡献独立性、分治性）**的极致挖掘。本章节旨在建立系统化的算法逻辑推导能力。

---

## 核心知识板块

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="solknow-card border border-blue-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <h3 className="flex items-center gap-2 text-blue-600">
      <Target size={20} /> 二分与三分 (Search)
    </h3>
    <p className="text-sm text-gray-600">利用单调性与凸性实现决策空间的对数级压缩。包含整数/实数二分及函数极值寻找。</p>
    <a href="./binary-search" className="text-xs font-bold text-blue-500 hover:underline">进入学习 →</a>
  </div>

  <div className="solknow-card border border-purple-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <h3 className="flex items-center gap-2 text-purple-600">
      <Zap size={20} /> 贪心与双指针 (Greedy)
    </h3>
    <p className="text-sm text-gray-600">局部最优推导全局最优。利用单调性优化暴力枚举，实现线性时间复杂度的飞跃。</p>
    <a href="./greedy" className="text-xs font-bold text-purple-500 hover:underline">进入学习 →</a>
  </div>

  <div className="solknow-card border border-amber-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <h3 className="flex items-center gap-2 text-amber-600">
      <Layers size={20} /> 前缀和与差分 (Prefix & Diff)
    </h3>
    <p className="text-sm text-gray-600">离散数学中的“积分”与“求导”。通过预处理实现区间查询与修改的 $O(1)$ 均衡。</p>
    <a href="./prefix-sum" className="text-xs font-bold text-amber-500 hover:underline">进入学习 →</a>
  </div>

  <div className="solknow-card border border-red-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <h3 className="flex items-center gap-2 text-red-600">
      <GitBranch size={20} /> 分治思想 (Divide & Conquer)
    </h3>
    <p className="text-sm text-gray-600">将大问题化归为结构相同的子问题。归并、快速排序及主定理的深度应用。</p>
    <a href="./divide-and-conquer" className="text-xs font-bold text-red-500 hover:underline">进入学习 →</a>
  </div>
</div>

---

## 教材化学习路径

1.  **逻辑基石**：理解 [复杂度分析](./complexity) 与 [I/O 优化](./io)，建立时空权衡意识。
2.  **空间换时间**：通过 [离散化](./discretization) 与 [排序](./sorting) 将杂乱的数据转化为有序结构。
3.  **算子化思考**：掌握 [前缀和与差分](./prefix-sum) 这一对线性算子，处理区间贡献。
4.  **决策优化**：学习 [二分/三分](./binary-search) 与 [双指针](./two-pointers)，在有序空间中快速定位。
5.  **全局最优推导**：通过 [贪心](./greedy) 证明局部策略的正确性。

---

## 编者按 (Editor's Note)

> “算法不仅仅是代码，它是对问题结构的深刻洞察。”  
> 
> 在本章的学习中，请务必关注**单调性判定**与**空间换时间策略**。每一个看似简单的原语，在组合应用时都能爆发巨大的威力。

<div className="mt-8 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
  <p className="text-xs text-gray-500 mb-0 italic text-center">
    本板块由 SolKnow 团队维护，更新于 2026-03-11。对标工业级算法竞赛教材规范。
  </p>
</div>
