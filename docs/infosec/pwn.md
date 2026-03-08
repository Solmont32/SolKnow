---
title: 二进制安全与 PWN
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 二进制安全 (PWN)

PWN 指的是通过利用程序漏洞（如溢出）获取系统控制权的艺术。

## 常见漏洞

- **栈溢出 (Stack Overflow)**
- **堆漏洞 (Heap Exploitation)**
- **格式化字符串漏洞**

## 防御机制

- **ASLR**：地址空间布局随机化。
- **DEP/NX**：数据执行保护。
- **Stack Canary**：栈金丝雀。

<KnowledgeCard type="code" title="工具链">
熟练使用 **gdb**, **pwntools** 和 **IDA Pro** 是进行二进制研究的必备技能。
</KnowledgeCard>
