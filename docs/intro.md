---
title: SolKnow 知识库导览
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import BilibiliEmbed from '@site/src/components/BilibiliEmbed';
import {
Code2,
Infinity as InfinityIcon,
Monitor,
Brain,
ShieldCheck,
Youtube,
BookOpen,
ArrowRightCircle,
Trophy,
Rocket
} from 'lucide-react';

# 欢迎来到 SolKnow（知岛）

> **“博观而约取，厚积而薄发。”** —— 致力于打造计算机与数学交叉领域的集成式零基础学习系统。

**SolKnow** 是一个深度整合了**算法竞赛笔记**、**系统化数学体系**与**计算机科学底层原理**的结构化知识库。我们致力于打破学科壁垒，通过极致的现代审美与工业级代码规范，帮助你从零构建属于自己的硬核数字大脑。

---

## 🏗️ 核心知识体系

我们通过五个核心维度，带你从零开始探索知识的海洋：

<div className="row">
  <div className="col col--6">
    <KnowledgeCard type="info" title="算法竞赛 (CP)" className="margin-bottom--md">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Code2 size={20} color="#3b82f6" />
        <strong style={{ color: '#3b82f6' }}>Algorithm & Data Structures</strong>
      </div>
      涵盖从基础 I/O 到复杂动态规划、高级图论及字符串算法。包含工业级 C++ 代码模板与原理解析。
      <br /><a href="basic/" className="margin-top--sm" style={{ display: 'inline-block' }}>开始刷题 →</a>
    </KnowledgeCard>
  </div>
  <div className="col col--6">
    <KnowledgeCard type="tip" title="系统数学 (Math)" className="margin-bottom--md">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <InfinityIcon size={20} color="#8b5cf6" />
        <strong style={{ color: '#8b5cf6' }}>Mathematical Analysis</strong>
      </div>
      从 K-12 基础到大学数学分析、高等代数、离散数学。为计算机科学提供坚实的理论支撑。
      <br /><a href="academic-math/analysis/" className="margin-top--sm" style={{ display: 'inline-block' }}>探索公理 →</a>
    </KnowledgeCard>
  </div>
</div>

<div className="row">
  <div className="col col--4">
    <KnowledgeCard type="code" title="计算机科学 (CS)">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Monitor size={18} color="#f59e0b" />
        <strong style={{ color: '#f59e0b' }}>System Internals</strong>
      </div>
      深入 Linux 内核、网络协议、OS 原理与 C/C++/Python 语言底层特性。
    </KnowledgeCard>
  </div>
  <div className="col col--4">
    <KnowledgeCard type="contest" title="人工智能 (AI)">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Brain size={18} color="#06b6d4" />
        <strong style={{ color: '#06b6d4' }}>Machine Learning</strong>
      </div>
      机器学习、深度学习、NLP 进阶。聚焦于实战项目与学术竞赛讲解。
    </KnowledgeCard>
  </div>
  <div className="col col--4">
    <KnowledgeCard type="warning" title="信息安全 (Sec)">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <ShieldCheck size={18} color="#6366f1" />
        <strong style={{ color: '#6366f1' }}>Cyber Security</strong>
      </div>
      涵盖 Web 安全、现代密码学与二进制攻防。培养严谨的安全思维。
    </KnowledgeCard>
  </div>
</div>

---

## 📺 视听结合：B 站视频整合

我们深知文字笔记在表达复杂逻辑（如：动态规划的转移过程或复杂的几何变换）时的局限性。因此，SolKnow 的核心知识点均配有 B 站视频讲解。

<div className="bilibili-embed-inner" style={{ maxWidth: '800px', margin: '2rem auto' }}>
  <BilibiliEmbed bvid="BV1u34y1i7Zp" /> 
</div>

<KnowledgeCard type="success" title="观看建议">
建议开启 **1.5x 倍速** 并配合左侧的**文档代码**进行同步练习，这是最有效的输入方式。
</KnowledgeCard>

---

## 🚀 如何高效使用本库？

1.  **左侧分类导航**：按照知识领域进行纵向深入。
2.  **练习库镜像**：我们在“练习库”板块提供了与知识库一一对应的练习题，实现“学练一体”。
3.  **全局搜索 (Ctrl + K)**：直接输入关键词（如：`线段树`、`群论`）快速跳转。
4.  **知识图谱**：点击顶部的 [知识图谱](/graph) 查看各学科间的交叉关系。

---

## 🤝 参与建设

SolKnow 是一个开源的教育项目。如果你发现了文档中的错误，或者希望分享自己的学习笔记：

- 点击每页面底部的 **“编辑此页”** 提交 PR。
- 在 GitHub 上为我们点一个 **Star** 🌟。
- 关注 B 站频道获取最新的视频动态。

<div style={{ textAlign: 'center', marginTop: '4rem' }}>
  <a className="button button--primary button--lg" href="basic/">
    立即开启首个挑战 <Rocket size={20} style={{ marginLeft: '8px' }} />
  </a>
</div>
