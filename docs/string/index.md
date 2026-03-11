---
title: 字符串算法 (String Algorithms)
---

import { Code2, Zap, Hash, Repeat, GitBranch, Layers, Search } from 'lucide-react';

# 字符串算法：从匹配到结构

字符串是计算机科学中最基本的数据类型之一。在算法竞赛与工程应用中，高效处理字符串的匹配、回文性质、子串分布以及复杂结构提取是核心能力。本章节将从最基础的模式匹配出发，逐步深入到自动机理论与后缀结构。

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
  <div className="solknow-card border border-blue-100 p-4 rounded-lg bg-blue-50/30">
    <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold">
      <Zap size={20} />
      <span>单模式匹配与优化</span>
    </div>
    <p className="text-sm text-gray-600">从 $O(nm)$ 的暴力匹配到 $O(n)$ 的 KMP 算法，深入理解前缀函数与失败状态转移。</p>
    <div className="mt-2">
      <a href="/docs/string/kmp" className="text-blue-500 hover:underline text-sm font-medium">进入 KMP 专题 →</a>
    </div>
  </div>

  <div className="solknow-card border border-purple-100 p-4 rounded-lg bg-purple-50/30">
    <div className="flex items-center gap-2 mb-2 text-purple-600 font-bold">
      <Repeat size={20} />
      <span>回文性质分析</span>
    </div>
    <p className="text-sm text-gray-600">利用回文串的对称性，Manacher 算法可以在线性时间内提取所有最长回文子串。</p>
    <div className="mt-2">
      <a href="/docs/string/manacher" className="text-purple-500 hover:underline text-sm font-medium">进入 Manacher 专题 →</a>
    </div>
  </div>

  <div className="solknow-card border border-amber-100 p-4 rounded-lg bg-amber-50/30">
    <div className="flex items-center gap-2 mb-2 text-amber-600 font-bold">
      <Hash size={20} />
      <span>哈希与随机化</span>
    </div>
    <p className="text-sm text-gray-600">字符串哈希是 $O(1)$ 判定子串相等的利器，理解碰撞优化与双哈希策略。</p>
    <div className="mt-2">
      <a href="/docs/string/hashing" className="text-amber-500 hover:underline text-sm font-medium">进入哈希专题 →</a>
    </div>
  </div>

  <div className="solknow-card border border-red-100 p-4 rounded-lg bg-red-50/30">
    <div className="flex items-center gap-2 mb-2 text-red-600 font-bold">
      <GitBranch size={20} />
      <span>多模式匹配自动机</span>
    </div>
    <p className="text-sm text-gray-600">AC 自动机将 Trie 树与 KMP 思想结合，构建出处理多模式匹配的高效状态机。</p>
    <div className="mt-2">
      <a href="/docs/string/ac-automaton" className="text-red-500 hover:underline text-sm font-medium">进入 AC 自动机专题 →</a>
    </div>
  </div>
</div>

<div className="mt-8 solknow-card border border-emerald-100 p-6 rounded-lg bg-emerald-50/10">
  <div className="flex items-center gap-2 mb-4 text-emerald-600 font-bold text-lg">
    <Layers size={24} />
    <span>后缀结构：字符串算法的巅峰</span>
  </div>
  <p className="text-gray-700 leading-relaxed mb-4">
    后缀自动机 (SAM) 与后缀数组 (SA) 是处理字符串子串性质的终极武器。它们能够在线性或线性对数时间内完成子串统计、最长公共子串、不同子串个数等复杂任务。
  </p>
  <a href="/docs/string/suffix-structure" className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
    探索后缀结构
  </a>
</div>

---

## 🎯 关联练习与实战

<div className="solknow-card border border-green-200 p-4 rounded-lg bg-green-50/10">
  <div className="flex items-center gap-2 mb-2 text-green-600 font-bold">
    <Trophy size={18} />
    <span>算法竞赛习题库：字符串算法专题</span>
  </div>
  <p className="text-sm text-gray-600">包含 KMP、Manacher、AC 自动机与后缀自动机 (SAM) 阶梯练习。</p>
  <a href="/docs/exercises/cs/algorithm-string" className="button button--outline button--success button--sm">进入练习库 →</a>
</div>

## 学习路线图

1. **基础匹配**：掌握 KMP 与前缀函数的递推。
2. **随机化利器**：学习字符串哈希，注意模数选择与抗碰撞。
3. **状态机思想**：理解 AC 自动机的 Fail 指针与 Trie 图优化。
4. **回文对称**：掌握 Manacher 算法处理回文子串。
5. **后缀结构**：深入理解 SAM 的 Endpos 等价类与 Parent Tree 结构。
