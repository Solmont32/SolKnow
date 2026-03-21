---
slug: 2026-03-07-major-upgrade
title: SolKnow 审美与工程化重塑：全站 V2 升级总结
authors: [solmont32]
tags: [upgrade, aesthetics, engineering]
---

今天，**SolKnow（知岛）** 迎来了一场从内到外的“换血式”升级。我们不仅确立了严谨的工业级开发标准，还在视觉体验上实现了向现代科技感的跨越。

{/* truncate */}

### 核心成就：审美与交互革命

1.  **动态首页 (Hero 2.0)**：引入了 `framer-motion` 实现具备时差感（Stagger）的丝滑入场动画，并增加了 `heroGlow` 呼吸背景光。
2.  **图标矢量化**：全站告别 Emoji，升级为 `Lucide` 线性图标库。
3.  **计算机科学板块入驻**：将“计算机科学知识库”提升为首页核心模块，确立了“算法-数学-计算机”三足鼎立的内容格局。
4.  **沉浸式阅读**：优化了文档内 `blockquote`（引用块）样式，引入了专门的 `KnowledgeCard`（增强高亮卡片）。

### 工程化底座

- **代码规范**：引入 `ESLint` 与 `Prettier`，强制执行 2 空格缩进与单引号规范。
- **类型安全**：全面修复 TypeScript 类型冲突，确保 100% 通过构建。
- **闭环流程**：确立了 `gcp` (Git Commit Push) 与 `gh` (GitHub CLI) 自检的黄金工作流。

---

未来的 SolKnow 将继续秉持**“清晰、直观、易懂”**的原则，打造最硬核的竞赛笔记库。🚀
