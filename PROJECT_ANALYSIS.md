# SolKnow (知岛) 项目结构分析报告

## 1. 项目概述

**SolKnow (知岛)** 是一个基于 **Docusaurus 3.x** 构建的现代化文档与博客站点，主要用于展示竞赛笔记（知识点）和视频讲解。项目集成了 LaTeX 数学公式渲染、本地搜索、代码高亮等功能，并支持 GitHub Actions 自动化部署。

---

## 2. 核心配置文件

- **`docusaurus.config.ts`**: 项目的主配置文件。定义了站点标题、导航栏、底部链接、插件配置（如搜索、KaTeX）、侧边栏路径以及 GitHub 仓库关联。
- **`package.json`**: 定义了项目依赖（React 19, Docusaurus 3.9.2, TypeScript 等）和运行脚本（start, build, deploy）。
- **`sidebars.ts`**: 文档侧边栏的逻辑配置，决定了知识库中内容的层级和排序。
- **`tsconfig.json`**: TypeScript 编译配置，确保代码类型安全。
- **`.gitignore`**: 指定 Git 忽略的文件（如 `node_modules`, `build`, `.docusaurus` 等）。

---

## 3. 内容目录 (Content)

- **`docs/`**: **知识库核心目录**。按技术领域分类存储 Markdown 文档：
  - `basic/`: 基础知识（复杂度、IO等）。
  - `dp/`: 动态规划（背包问题等）。
  - `ds/`: 数据结构（树状数组、线段树、STL等）。
  - `graph/`: 图论算法（BFS、Dijkstra等）。
  - `math/`: 数学算法（取模插件等）。
  - `string/`: 字符串算法（KMP等）。
- **`blog/`**: **博客目录**。包含按日期排序的 Markdown/MDX 文章，支持标签（tags.yml）和作者信息（authors.yml）。

---

## 4. 源代码与自定义 (Source)

- **`src/`**: 存放 React 组件和页面逻辑：
  - `components/`: 自定义组件。
    - `BilibiliEmbed.tsx`: 用于在文档中嵌入 B 站视频的自定义组件。
    - `HomepageFeatures/`: 首页的功能特性展示组件。
  - `css/`: 全局样式文件 (`custom.css`)。
  - `pages/`: 独立页面。
    - `index.tsx`: 站点首页。
    - `videos.tsx`: 视频列表汇总页。
    - `markdown-page.md`: 一个 Markdown 格式的独立页面。

---

## 5. 静态资源与部署 (Infrastructure)

- **`static/`**: 静态资源目录。存放 Favicon、Logo 及首页使用的插画图片（SVG/PNG）。
- **`.github/workflows/deploy.yml`**: GitHub Actions 配置文件。实现当代码推送到主分支时，自动构建并部署到 GitHub Pages。
- **`README.md`**: 项目的快速入门和说明文档。

---

## 6. 技术特性总结

1.  **数学公式**: 通过 `remark-math` 和 `rehype-katex` 插件支持高质量的 LaTeX 渲染。
2.  **本地搜索**: 集成了 `@easyops-cn/docusaurus-search-local`，支持中英文双语搜索。
3.  **视频集成**: 拥有专门的视频页面和 B 站嵌入组件，适合教学场景。
4.  **现代架构**: 使用 React 19 和 TypeScript，保证了前端性能和开发体验。
