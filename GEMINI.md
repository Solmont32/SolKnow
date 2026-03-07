# SolKnow（知岛）项目指引 (GEMINI.md)

> **最高原则**：保持极致的现代审美与工业级代码规范，致力于打造计算机与数学交叉领域的集成式零基础学习系统。

## 1. 工程规范
项目已建立严谨的 Linting 与 Formatting 规范：
- **Linting**: 使用 `ESLint` (@typescript-eslint) 确保代码安全。
- **Formatting**: 使用 `Prettier` 统一代码风格（单引号, 分号, 2空格）。
- **执行命令**: `npm run typecheck` 进行全量类型检查。

## 2. 视觉审美标准
- **图标系统**: 全面使用 `lucide-react` 线性图标，禁止在核心 UI 中直接使用 Emoji。
- **动效库**: 核心入场动效使用 `framer-motion`。
- **设计风格**: 
  - 导航栏具备 `backdrop-filter: blur(12px)` 的玻璃拟态效果。
  - 核心卡片使用 `var(--solknow-card-shadow)` 和弹性悬停反馈。
  - Hero 区域使用 `heroGlow` 动态背景光。

## 3. 核心板块颜色定义
- **算法竞赛**: 蓝色 (`#3b82f6`) - 图标: `Code2`
- **系统数学**: 紫色 (`#8b5cf6`) - 图标: `Infinity`
- **计算机科学**: 琥珀橘 (`#f59e0b`) - 图标: `Monitor`
- **视频整合**: 红色 (`#ef4444`) - 图标: `Youtube`

## 4. 自定义高效工作流 (User Profile Shortcuts)
用户本地定义了高效的 PowerShell 捷径，Gemini CLI 应当优先配合：
- **gcp "message"**: 执行 `git add .`, `git commit -m $args[0]`, `git push origin main` 的一键操作。
- **spx / upx**: 切换本地代理 (`http://127.0.0.1:7897`)。

## 5. 组件规范
- **BilibiliEmbed**: 必须包裹在 `bilibili-embed-inner` 类名中以获得悬停深度反馈，且必须开启 `loading="lazy"`。

---
*Created and maintained by Gemini CLI based on project evolution.*
