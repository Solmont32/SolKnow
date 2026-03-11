---
title: Web 安全专项强化练习
sidebar_label: Web 安全
---

import { Target, Zap, ShieldCheck, BarChart3, ChevronRight, Code2, Layers, Lock } from 'lucide-react';

# Web 安全专项强化练习 (Web Security Lab)

> **“未知攻，焉知防。”** —— 本专题涵盖 OWASP Top 10 核心风险，通过模拟实战环境，训练漏洞识别、利用与防御加固能力。

---

## 🪜 练习阶梯与评价标准

| 等级                                                                     | 难度目标       | 核心考察点                                  | 期望达成                       |
| :----------------------------------------------------------------------- | :------------- | :------------------------------------------ | :----------------------------- |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 漏洞基础识别   | SQL 注入、XSS、文件上传基础绕过             | 掌握常见 Payload 的构造原理    |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 逻辑漏洞与协议 | CSRF、SSRF、JWT 伪造、越权访问              | 理解后端验证机制与协议缺陷     |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span>  | 综合渗透与加固 | 反序列化漏洞、模板注入 (SSTI)、WAF 深度绕过 | 具备全栈代码审计与系统加固能力 |

---

## 🎯 考点覆盖模型 (Knowledge Matrix)

| 知识模块         | 核心考点                             | 关联习题   | 推荐等级 |
| :--------------- | :----------------------------------- | :--------- | :------- |
| **注入漏洞**     | SQL 盲注推导、二次注入、OS 命令注入  | 练习 1     | Level A  |
| **跨站脚本**     | 反射/存储型 XSS、DOM XSS、CSP 绕过   | 练习 2     | Level A  |
| **服务端请求**   | SSRF 探测内网、Gopher 协议利用       | 练习 3     | Level B  |
| **身份认证**     | JWT 签名伪造、Session 劫持           | 练习 5     | Level B  |
| **反序列化**     | PHP POP 链构造、Java 原生反序列化    | 练习 4     | Level C  |
| **文件安全**     | 任意文件读取、文件上传黑白名单绕过   | 练习 6     | Level B  |

---

## 📂 核心习题库

### Level A：基础巩固 (Foundations)

#### 练习 1：SQL 注入 - 盲注推导与防御

**题目描述**：后端 SQL 语句为 `SELECT name FROM users WHERE id = '$id'`。页面不回显数据，仅返回“Success”或“Fail”。如何通过盲注获取数据库名长度？

<details>
<summary>Check Solution (Payload & Defense)</summary>

**核心逻辑**：
利用布尔盲注，通过 `length()` 和 `ascii()` 函数配合 `substr()` 逐字猜解。
**Payload 示例**：
`id=1' AND (length(database()) > 5) -- +`

**防御代码 (C++ 参数化查询模拟)**：

```cpp
#include <iostream>
#include <string>
#include <sqlite3.h> // 模拟 SQLite

void safe_query(sqlite3* db, std::string user_id) {
    sqlite3_stmt* stmt;
    const char* sql = "SELECT name FROM users WHERE id = ?;";
    
    // 1. 预编译 SQL 模板
    if (sqlite3_prepare_v2(db, sql, -1, &stmt, NULL) == SQLITE_OK) {
        // 2. 绑定参数（由引擎处理转义，彻底杜绝注入）
        sqlite3_bind_text(stmt, 1, user_id.c_str(), -1, SQLITE_STATIC);
        
        // 3. 执行
        while (sqlite3_step(stmt) == SQLITE_ROW) {
            std::cout << "User Found: " << sqlite3_column_text(stmt, 0) << std::endl;
        }
    }
    sqlite3_finalize(stmt);
}
```

</details>

#### 练习 2：XSS - 过滤器绕过

**题目描述**：过滤器会删除所有 `<script>` 标签（不区分大小写）。写出两种能执行 `alert(1)` 的绕过方案。

<details>
<summary>Check Solution</summary>

**方案 1：事件处理器 (Event Handlers)**
利用其他标签的事件属性，如 `<img>` 或 `<body>`。
`Payload: <img src=1 onerror=alert(1)>`

**方案 2：SVG 标签**
`Payload: <svg onload=alert(1)>`

</details>

---

### Level B：综合提升 (Intermediate)

#### 练习 3：SSRF (服务端请求伪造) 探测内网

**题目描述**：某应用提供“获取远程图片”功能，URL 参数为 `image_url`。如何通过此接口探测内网 80 端口的服务？

<details>
<summary>Check Solution</summary>

**利用方式**：
修改 `image_url` 指向内网地址。
`Payload: ?image_url=http://127.0.0.1:80/admin`

**进阶绕过**：
若过滤了 `127.0.0.1`，可尝试：
- 十进制地址：`http://2130706433/`
- 短链接重定向绕过。

</details>

---

### Level C：竞赛挑战 (Advanced)

#### 练习 4：反序列化漏洞 - PHP POP 链构造

**题目描述**：如何构造 POP 链实现 RCE？简述 `__destruct()` 在其中的作用。

<details>
<summary>Check Solution</summary>

**核心逻辑**：
寻找一个 `__destruct` 能够触发 `__toString`（如 `echo $this->obj`），而 `__toString` 又调用了其他类中包含敏感操作（如 `eval()` 或 `system()`）的方法。
POP 链（Property-Oriented Programming）即利用对象属性的相互引用，在反序列化触发的自动执行路径中拼接出攻击载荷。

</details>

---

## 🏆 实验室规范

1. **合法性原则**：所有练习必须在授权的本地环境或隔离容器中进行。
2. **闭环修复**：每发现一个漏洞，必须提交对应的代码加固方案。
