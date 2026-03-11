---
title: Git 协作流 (Git Workflow)
---

import { GitMerge, Users, Zap } from 'lucide-react';

# <GitMerge className="inline-block mr-2 mb-1" /> Git 协作流

在团队开发或个人大型项目中，合理的协作工作流能极大降低版本冲突的风险。

## 1. 常见协作模式

### 1.1 Git Flow

经典的分支管理模型，区分 `master` (生产), `develop` (开发), `feature` (特性), `hotfix` (修补) 等分支。

### 1.2 GitHub Flow

更简洁的模型，适合 CI/CD 驱动的项目：

1. 从 `main` 拉取新分支。
2. 在新分支上提交代码。
3. 发起 **Pull Request (PR)**。
4. 讨论并审核代码。
5. 合并 PR 到 `main` 并部署。

## 2. 远程协作指令 <Users className="inline-block ml-1" />

- `git pull`：拉取远程更新并合并。
- `git fetch`：仅下载远程更新，不自动合并。
- `git push`：将本地提交推送到远程仓库。
- `git remote -v`：查看远程仓库地址。

## 3. 常见问题处理 <Zap className="inline-block ml-1" />

- **冲突解决**：当两个提交修改了同一行代码时，Git 会提示冲突。手动编辑冲突文件，保留正确部分，然后重新 `add` 和 `commit`。
- **Rebase vs Merge**：`merge` 保持真实的提交拓扑，`rebase` 则能创造一个线性的提交历史。

---

_本章节由 SolKnow 工程规范系统生成。_
