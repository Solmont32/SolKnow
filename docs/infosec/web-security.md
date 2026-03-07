---
title: Web 安全核心：OWASP Top 10
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# Web 安全核心：OWASP Top 10

Web 安全是安全从业者的必修课，重点在于理解“输入输出”的不可信。

## 常见漏洞解析
### 1. SQL 注入 (Injection)
由于未对用户输入进行严格过滤，攻击者可以构造恶意 SQL 语句操纵数据库。
- **修复**：使用 **预编译语句 (Prepared Statements)**。

### 2. XSS (跨站脚本)
攻击者在页面中嵌入恶意脚本，在用户浏览器执行。
- **修复**：对输出进行 HTML 编码。

### 3. CSRF (跨站请求伪造)
利用用户的登录凭证，冒充用户发起恶意请求。
- **修复**：使用 **CSRF Token** 校验。

<KnowledgeCard type="tip" title="防御思想">
**“不要相信任何来自外部的输入”** 是安全防御的核心法则。
</KnowledgeCard>
