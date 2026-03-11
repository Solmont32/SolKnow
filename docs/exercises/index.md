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
  Layers,
  Search,
  GitBranch,
  Terminal,
  Cpu
} from 'lucide-react';

# SolKnow 综合练习库

> **“纸上得来终觉浅，绝知此事要躬行。”** —— 系统化的阶梯式训练，助你完成从理论到实战的跨越。

本练习库对标国内外经典教材与竞赛考纲，建立从 **基础巩固** 到 **综合应用**，再到 **竞赛挑战** 的完整阶梯体系。每一项练习均配有深度折叠解析与工业级 C++ 实现。

---

## 🧩 全版块练习矩阵

<div className="row">
  <div className="col col--6">
    <KnowledgeCard type="info" title="算法竞赛练习库" className="margin-bottom--md">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Code2 size={20} color="#3b82f6" />
        <strong style={{ color: '#3b82f6' }}>Competitive Programming</strong>
      </div>
      对标 Codeforces, AtCoder 与 NOI 难度。包含系统化 C++ 代码解析。
      <div className="row" style={{ marginTop: '10px', fontSize: '0.85rem' }}>
        <div className="col col--6">
          <ul style={{ paddingLeft: '1rem', marginBottom: '0' }}>
            <li><a href="cs/algorithm-basic">基础算法与线性结构</a></li>
            <li><a href="cs/algorithm-ds">高级数据结构专题</a></li>
            <li><a href="cs/algorithm-dp-comprehensive">动态规划全体系</a></li>
          </ul>
        </div>
        <div className="col col--6">
          <ul style={{ paddingLeft: '1rem', marginBottom: '0' }}>
            <li><a href="cs/algorithm-graph-comprehensive">图论算法综合库</a></li>
            <li><a href="cs/algorithm-string">字符串算法专题</a></li>
            <li><a href="cs/algorithm-number-theory">数论与同余系</a></li>
          </ul>
        </div>
      </div>
      <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
        <a href="cs/algorithm-geometry" className="button button--outline button--info button--sm">计算几何 <ChevronRight size={14} /></a>
        <a href="cs/algorithm-search" className="button button--outline button--info button--sm">搜索算法 <ChevronRight size={14} /></a>
      </div>
    </KnowledgeCard>
  </div>
  
  <div className="col col--6">
    <KnowledgeCard type="tip" title="系统数学练习库" className="margin-bottom--md">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <InfinityIcon size={20} color="#8b5cf6" />
        <strong style={{ color: '#8b5cf6' }}>Mathematics Mastery</strong>
      </div>
      涵盖从分析学、代数学到拓扑学、泛函分析的全阶数学练习。
      <div className="row" style={{ marginTop: '10px', fontSize: '0.85rem' }}>
        <div className="col col--6">
          <ul style={{ paddingLeft: '1rem', marginBottom: '0' }}>
            <li><a href="math/analysis">数学分析 (Analysis)</a></li>
            <li><a href="math/algebra">高等代数 (Algebra)</a></li>
            <li><a href="math/abstract-algebra">抽象代数 (Abstract)</a></li>
          </ul>
        </div>
        <div className="col col--6">
          <ul style={{ paddingLeft: '1rem', marginBottom: '0' }}>
            <li><a href="math/real-analysis">实变与泛函分析</a></li>
            <li><a href="math/topology">点集拓扑专题</a></li>
            <li><a href="math/discrete-math">离散数学练习</a></li>
          </ul>
        </div>
      </div>
      <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
        <a href="math/numerical-analysis" className="button button--outline button--primary button--sm">数值分析 <ChevronRight size={14} /></a>
        <a href="math/probability" className="button button--outline button--primary button--sm">概率统计 <ChevronRight size={14} /></a>
      </div>
    </KnowledgeCard>
  </div>
</div>

<div className="row">
  <div className="col col--4">
    <KnowledgeCard type="code" title="计算机系统实战">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Cpu size={18} color="#10b981" />
        <strong style={{ color: '#10b981' }}>Computer Systems</strong>
      </div>
      操作系统内核原语、Linux 命令实操与 C++ 工程化编程。
      <br />
      <div style={{ fontSize: '0.85rem', marginTop: '5px' }}>
        <a href="cs/linux">Linux</a> | <a href="cs/cpp">C++</a> | <a href="cs/os">OS</a>
      </div>
    </KnowledgeCard>
  </div>
  <div className="col col--4">
    <KnowledgeCard type="warning" title="AI 与安全实验室">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <ShieldCheck size={18} color="#f59e0b" />
        <strong style={{ color: '#f59e0b' }}>AI & Security</strong>
      </div>
      ML/DL 算法推导与 Web/Pwn 安全攻防实战。
      <br />
      <div style={{ fontSize: '0.85rem', marginTop: '5px' }}>
        <a href="ai/ml">AI 训练</a> | <a href="infosec/web">安全攻防</a>
      </div>
    </KnowledgeCard>
  </div>
  <div className="col col--4">
    <KnowledgeCard type="success" title="K-12 竞赛挑战">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Trophy size={18} color="#ef4444" />
        <strong style={{ color: '#ef4444' }}>Olympiad Math</strong>
      </div>
      从小学奥数到高中联赛。系统化整理常见套路与解题模型。
      <br />
      <div style={{ fontSize: '0.85rem', marginTop: '5px' }}>
        <a href="math/competition/elementary">小学</a> | <a href="math/competition/junior">初中</a> | <a href="math/competition/senior">高中</a>
      </div>
    </KnowledgeCard>
  </div>
</div>

---

## 🛠️ 教材化功能特性

### 1. 阶梯式难度设计 (Ladders)
我们将所有练习分为三个等级，确保学习曲线平滑：
- <span style={{ color: 'var(--ifm-color-success)' }}>🟢 **基础巩固 (Level A)**</span>：聚焦核心概念的直接应用，对标课后基础题。
- <span style={{ color: 'var(--ifm-color-warning)' }}>🟡 **综合提升 (Level B)**</span>：跨知识点结合，训练逻辑推理与综合运用能力。
- <span style={{ color: 'var(--ifm-color-danger)' }}>🔴 **竞赛挑战 (Level C)**</span>：对标考研名校真题、数学竞赛或顶级算法竞赛难度。

### 2. 多层级折叠解析系统
默认隐藏过程，防止“一眼看到答案”。点击 **Check Solution** 展开后，不仅有严密的数学证明，还有经过规范化的 **C++ 工业级实现** 与 **复杂度边界分析**。

---

## 📊 训练建议

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
  <a className="button button--primary button--lg" href="cs/algorithm-basic">
    从基础算法开始挑战 <Layers size={20} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
  </a>
</div>
