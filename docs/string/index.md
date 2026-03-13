---
title: 字符串算法 (String Algorithms)
sidebar_position: 1
---

import { Zap, Repeat, Hash, GitBranch, Layers, Trophy, Binary, Activity } from 'lucide-react';

# 字符串算法：从匹配到结构

字符串是计算机科学中最基本的数据类型之一。在算法竞赛与工程应用中，高效处理字符串的匹配、回文性质、子串分布以及复杂结构提取是核心能力。本章节将从最基础的模式匹配出发，逐步深入到自动机理论、周期性边界分析与后缀结构。

## 核心知识板块

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
  <div className="solknow-card border border-blue-100 p-4 rounded-lg bg-blue-50/30">
    <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold">
      <Zap size={20} />
      <span>单模式匹配与周期理论</span>
    </div>
    <p className="text-sm text-gray-600">从 $O(nm)$ 的暴力匹配到 $O(n)$ 的 KMP 算法，深入理解前缀函数、势能分析以及 **Weak Periodicity Lemma**。</p>
    <div className="mt-2">
      <a href="/docs/string/kmp" className="text-blue-500 hover:underline text-sm font-medium">进入 KMP 专题 →</a>
    </div>
  </div>

  <div className="solknow-card border border-purple-100 p-4 rounded-lg bg-purple-50/30">
    <div className="flex items-center gap-2 mb-2 text-purple-600 font-bold">
      <Repeat size={20} />
      <span>回文性质分析</span>
    </div>
    <p className="text-sm text-gray-600">利用回文串的对称性，Manacher 算法可以在线性时间内提取所有最长回文子串，掌握回文半径与对称中心的关系。</p>
    <div className="mt-2">
      <a href="/docs/string/manacher" className="text-purple-500 hover:underline text-sm font-medium">进入 Manacher 专题 →</a>
    </div>
  </div>

  <div className="solknow-card border border-amber-100 p-4 rounded-lg bg-amber-50/30">
    <div className="flex items-center gap-2 mb-2 text-amber-600 font-bold">
      <Hash size={20} />
      <span>哈希与随机化分析</span>
    </div>
    <p className="text-sm text-gray-600">字符串哈希是 $O(1)$ 判定子串相等的利器，理解生日悖论下的碰撞概率评估与双哈希防御策略。</p>
    <div className="mt-2">
      <a href="/docs/string/hashing" className="text-amber-500 hover:underline text-sm font-medium">进入哈希专题 →</a>
    </div>
  </div>

  <div className="solknow-card border border-red-100 p-4 rounded-lg bg-red-50/30">
    <div className="flex items-center gap-2 mb-2 text-red-600 font-bold">
      <GitBranch size={20} />
      <span>多模式匹配自动机</span>
    </div>
    <p className="text-sm text-gray-600">AC 自动机将 Trie 树与 KMP 思想结合，构建出处理多模式匹配的高效 DFA，掌握 Fail 树拓扑优化。</p>
    <div className="mt-2">
      <a href="/docs/string/ac-automaton" className="text-red-500 hover:underline text-sm font-medium">进入 AC 自动机专题 →</a>
    </div>
  </div>
</div>

<div className="mt-8 solknow-card border border-emerald-100 p-6 rounded-lg bg-emerald-50/10">
  <div className="flex items-center gap-2 mb-4 text-emerald-600 font-bold text-lg">
    <Layers size={24} />
    <span>后缀结构：子串性质的终极武器</span>
  </div>
  <p className="text-gray-700 leading-relaxed mb-4">
    后缀自动机 (SAM) 与后缀数组 (SA) 是处理字符串子串性质的巅峰。它们能够在线性或线性对数时间内完成子串统计、最长公共子串、不同子串个数等复杂任务，深度掌握 **Endpos 等价类** 与 **Parent Tree** 理论。
  </p>
  <a href="/docs/string/suffix-structure" className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
    探索后缀结构
  </a>
</div>

---

## 理论深度与边界分析

本板块不仅关注算法实现，更强调其背后的数学逻辑：

- **状态转移一致性**：形式化证明自动机在输入字符后的状态唯一性与正确性。
- **复杂度势能证明**：利用势函数分析保证算法在最坏情况下的均摊线性时间。
- **周期性边界**：探讨 Fine-Wilf 定理在字符串重叠部分的应用，分析 Border 与 Period 的对偶性。

## 🎯 关联练习与实战

<div className="solknow-card border border-green-200 p-4 rounded-lg bg-green-50/10">
  <div className="flex items-center gap-2 mb-2 text-green-600 font-bold">
    <Trophy size={18} />
    <span>算法竞赛习题库：字符串算法专题</span>
  </div>
  <p className="text-sm text-gray-600">包含 KMP、Manacher、AC 自动机与后缀自动机 (SAM) 阶梯练习，所有题目均配有 C++ 详细解析。</p>
  <a href="/docs/exercises/cs/algorithm-string" className="button button--outline button--success button--sm">进入练习库 →</a>
</div>

