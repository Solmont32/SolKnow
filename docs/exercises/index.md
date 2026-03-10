---
title: SolKnow 综合练习库
sidebar_position: 1
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { 
  BookOpen, 
  Trophy, 
  Code2, 
  Infinity as InfinityIcon, 
  Brain, 
  ShieldCheck, 
  ChevronRight,
  Target,
  BarChart3,
  Layers
} from 'lucide-react';

# SolKnow 综合练习库

> **“纸上得来终觉浅，绝知此事要躬行。”** —— 系统化的阶梯式训练，助你完成从理论到实战的跨越。

本练习库旨在对标国内外经典教科书（如《数学分析教程》、CLRS 等）的课后习题规范，建立从**基础巩固**到**综合应用**，再到**竞赛挑战**的完整阶梯体系。每一道题目都经过精心挑选，并配有深度折叠解析。

---

## 🧩 全版块练习矩阵

<div className="row">
  <div className="col col--6">
    <KnowledgeCard type="tip" title="系统数学练习库" className="margin-bottom--md">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <InfinityIcon size={20} color="#8b5cf6" />
        <strong style={{ color: '#8b5cf6' }}>Mathematics Mastery</strong>
      </div>
      涵盖数学分析、高等代数、概率论、实变/复变等大学数学核心课程。
      <ul style={{ marginTop: '10px', fontSize: '0.9rem' }}>
        <li><b>基础：</b> 定义理解与基本计算</li>
        <li><b>进阶：</b> 综合证明与高阶技巧</li>
        <li><b>竞赛：</b> 考研/数学竞赛真题解析</li>
      </ul>
      <a href="math/analysis" className="button button--outline button--primary button--sm">进入数学库 <ChevronRight size={14} /></a>
    </KnowledgeCard>
  </div>
  <div className="col col--6">
    <KnowledgeCard type="info" title="算法竞赛练习库" className="margin-bottom--md">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Code2 size={20} color="#3b82f6" />
        <strong style={{ color: '#3b82f6' }}>Competitive Programming</strong>
      </div>
      对标 Codeforces, AtCoder 与 NOI 难度。包含工业级 C++ 代码解析。
      <ul style={{ marginTop: '10px', fontSize: '0.9rem' }}>
        <li><b>基础：</b> 基础算法与线性结构专项强化</li>
        <li><b>进阶：</b> 动态规划 (DP) 专项强化</li>
        <li><b>综合：</b> 搜索、图论与几何练习</li>
      </ul>
      <a href="cs/algorithm-basic" className="button button--outline button--info button--sm">进入算法库 <ChevronRight size={14} /></a>
    </KnowledgeCard>
  </div>
</div>

<div className="row">
  <div className="col col--4">
    <KnowledgeCard type="code" title="AI 实战训练">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Brain size={18} color="#06b6d4" />
        <strong style={{ color: '#06b6d4' }}>Machine Learning</strong>
      </div>
      推导常用模型背后的数学公式，理解 PyTorch/TensorFlow 底层实现。
      <br /><a href="ai/ml" style={{ fontSize: '0.85rem' }}>开始训练 →</a>
    </KnowledgeCard>
  </div>
  <div className="col col--4">
    <KnowledgeCard type="warning" title="安全攻防练习">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <ShieldCheck size={18} color="#6366f1" />
        <strong style={{ color: '#6366f1' }}>Security Lab</strong>
      </div>
      Web 渗透、CTF 二进制、密码学解密。模拟实战场景。
      <br /><a href="infosec/web" style={{ fontSize: '0.85rem' }}>进入实验室 →</a>
    </KnowledgeCard>
  </div>
  <div className="col col--4">
    <KnowledgeCard type="success" title="K-12 竞赛练习">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Trophy size={18} color="#10b981" />
        <strong style={{ color: '#10b981' }}>Olympiad Math</strong>
      </div>
      从小学奥数到高中联赛。系统化整理常见套路与解题模型。
      <br /><a href="math/competition/elementary" style={{ fontSize: '0.85rem' }}>开启挑战 →</a>
    </KnowledgeCard>
  </div>
</div>

---

## 🛠️ 教材化功能特性

### 1. 阶梯式难度设计
我们将所有练习分为三个等级，确保学习曲线平滑：
- <span style={{ color: 'var(--ifm-color-success)' }}>● **基础巩固 (Level A)**</span>：聚焦核心概念的直接应用，对标课后基础题。
- <span style={{ color: 'var(--ifm-color-warning)' }}>● **综合提升 (Level B)**</span>：跨知识点结合，训练逻辑推理与综合运用能力。
- <span style={{ color: 'var(--ifm-color-danger)' }}>● **竞赛挑战 (Level C)**</span>：对标考研名校真题、数学竞赛或 Codeforces Div.1 难度。

### 2. 多视角解法对比
部分核心习题提供 **“代数法 vs 几何法”**、**“递归 vs 迭代”** 等多视角对比，帮助你理解算法与数学的本质联系。

### 3. 折叠代码与解析系统
默认隐藏过程，防止“一眼看到答案”。点击展开后，不仅有详细的数学证明，还有经过 Lint 规范的 C++/Python 代码实现。

---

## 📊 训练进度建议

<div style={{
  padding: '1.5rem',
  borderRadius: '16px',
  background: 'var(--ifm-color-emphasis-100)',
  border: '1px solid var(--ifm-color-emphasis-200)'
}}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
    <BarChart3 size={24} color="var(--ifm-color-primary)" />
    <h3 style={{ margin: 0 }}>高效刷题路线</h3>
  </div>
  <p>1. <b>学练结合</b>：每看完一个知识点，点击末尾的 <Target size={14} /> <b>关联练习</b> 进行即时巩固。</p>
  <p>2. <b>手写推导</b>：对于数学证明题，建议先在纸上推导，再与折叠解析中的严谨步骤进行比对。</p>
  <p>3. <b>代码重构</b>：不仅要跑通代码，更要学习解析中代码的<b>封装艺术</b>与<b>时空复杂度优化</b>。</p>
</div>

<div style={{ textAlign: 'center', marginTop: '3rem' }}>
  <a className="button button--primary button--lg" href="math/analysis">
    从数学分析开始 <Layers size={20} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
  </a>
</div>
