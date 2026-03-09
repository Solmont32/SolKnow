---
title: Git 基础 (Git Basics)
---

import { GitBranch, Terminal, ShieldCheck } from 'lucide-react';

# <GitBranch className="inline-block mr-2 mb-1" /> Git 基础

Git 是目前世界上最先进的分布式版本控制系统。无论是在算法竞赛中保存代码版本，还是在大型工程中协同开发，Git 都是必不可少的工具。

## 1. 核心概念

Git 的工作流程围绕三个主要区域展开：
1. **工作区 (Working Directory)**：你实际编辑文件的地方。
2. **暂存区 (Staging Area / Index)**：准备提交的修改。
3. **本地仓库 (Local Repository)**：保存所有版本历史的地方。

## 2. 常用基础指令 <Terminal className="inline-block ml-1" />

| 指令 | 说明 |
| :--- | :--- |
| `git init` | 在当前目录初始化一个 Git 仓库 |
| `git clone <url>` | 克隆远程仓库到本地 |
| `git add <file>` | 将修改添加到暂存区 |
| `git commit -m "msg"` | 将暂存区内容提交到本地仓库 |
| `git status` | 查看当前工作区与暂存区的状态 |
| `git log` | 查看提交历史记录 |

## 3. 最佳实践 <ShieldCheck className="inline-block ml-1" />

- **原子化提交**：每次提交只包含一个逻辑上的修改。
- **清晰的提交信息**：使用 `feat:`, `fix:`, `chore:` 等前缀描述提交意图。
- **频繁提交**：不要积累了一周的代码才提交一次。

---

_本章节由 SolKnow 工程规范系统生成。_
