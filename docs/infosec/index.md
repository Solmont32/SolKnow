---
title: 信息安全与密码学基础 (InfoSec & Cryptography)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { ShieldCheck, Lock, Terminal, Globe } from 'lucide-react';

# 信息安全与密码学基础

本库旨在构建完整的安全思维体系，从底层的数学原理到高层的协议设计，涵盖密码学应用、逆向工程与二进制漏洞挖掘、以及现代 Web 安全实战。

<KnowledgeCard type="warning" title="法律与合规性原则">
一切安全研究必须在**合法授权**的环境下进行。本库内容仅供教育、学术研究及 CTF 竞赛交流使用。严禁将相关技术用于任何非法用途。
</KnowledgeCard>

## 核心版块 (Core Modules)

### [现代密码学 (Cryptography)](./cryptography)

从经典加密到量子抗性算法的演进。

- **经典密码学**：凯撒、维吉尼亚与频率分析。
- **对称加密**：AES 结构深度解析与 GCM 认证加密。
- **非对称加密**：RSA 数学原理及其常见攻击模型（共模、低指数等）。
- **协议安全**：Diffie-Hellman 握手与中间人攻击防御。

### [二进制安全与逆向工程 (PWN & Reverse)](./pwn)

探索内存破坏的艺术。

- **逆向基础**：x86_64 汇编、GDB 调试与静态分析工具。
- **堆栈溢出**：从返回地址覆盖到 ROP 链构造。
- **高级漏洞**：格式化字符串、UAF (Use-After-Free) 与堆溢出利用。
- **缓解机制**：ASLR, NX, Canary 与 PIE 的攻防对抗。

### [Web 安全与协议对垒 (Web Security)](./web-security)

保障万维网的信任边界。

- **协议深度解析**：HTTPS/TLS 1.3 握手、OAuth 2.0 与 OIDC 流程。
- **注入漏洞**：SQL 注入、SSRF 绕过与 XXE 实体注入。
- **客户端安全**：XSS、CSRF 与现代浏览器防御机制（CSP, SameSite）。
- **逻辑漏洞**：IDOR 越权、重放攻击与反序列化深度挖掘。

---

## 学习路线图 (Roadmap)

1. **基础阶段**：掌握 Linux 命令、C++ 底层内存模型与基础数论。
2. **进阶阶段**：参与 CTF 练习，深入理解漏洞根源而非仅仅使用工具。
3. **专家阶段**：研究复杂系统下的协议交互，构建系统性的防御体系。
