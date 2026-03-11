---
title: Web 安全专项强化练习
sidebar_label: Web 安全
---

import { Target, Zap, ShieldCheck, BarChart3, ChevronRight, Code2, Layers, Lock } from 'lucide-react';

# Web 安全专项强化练习 (Web Security Lab)

> **“未知攻，焉知防。”** —— 本专题涵盖 OWASP Top 10 核心风险，通过模拟实战环境，训练漏洞识别、利用与防御加固能力。

---

## 🪜 练习阶梯与评价标准

| 等级 | 难度目标 | 核心考察点 | 期望达成 |
| :--- | :--- | :--- | :--- |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 漏洞基础识别 | SQL 注入、XSS、文件上传基础绕过 | 掌握常见 Payload 的构造原理 |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 逻辑漏洞与协议 | CSRF、SSRF、JWT 伪造、越权访问 | 理解后端验证机制与协议缺陷 |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span> | 综合渗透与加固 | 反序列化漏洞、模板注入 (SSTI)、WAF 深度绕过 | 具备全栈代码审计与系统加固能力 |

---

## 📂 核心习题库

### Level A：基础巩固 (Foundations)

#### 练习 1：SQL 注入 - 盲注推导
**题目描述**：后端 SQL 语句为 `SELECT name FROM users WHERE id = '$id'`。页面不回显数据，仅返回“Success”或“Fail”。如何通过盲注获取数据库名长度？

<details>
<summary>Check Solution (Payload Analysis)</summary>

**核心逻辑**：
利用布尔盲注，通过 `length()` 和 `ascii()` 函数配合 `substr()` 逐字猜解。
**Payload 示例**：
`id=1' AND (length(database()) > 5) -- +`
- 若返回 Success，说明长度 > 5。
- 通过二分法可快速确定长度。

**防御代码 (C++ 预编译模拟)**：
```cpp
void safe_query(sqlite3* db, string user_id) {
    sqlite3_stmt* stmt;
    const char* sql = "SELECT name FROM users WHERE id = ?;";
    sqlite3_prepare_v2(db, sql, -1, &stmt, NULL);
    sqlite3_bind_text(stmt, 1, user_id.c_str(), -1, SQLITE_STATIC);
    // 执行查询，参数化自动处理转义
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

**防御建议**：
使用 `CSP (Content Security Policy)` 限制脚本来源，或对输出进行 HTML 实体编码。
</details>

---

### Level B：综合提升 (Intermediate)

#### 练习 3：SSRF (服务端请求伪造) 探测
**题目描述**：某应用提供“获取远程图片”功能，URL 参数为 `image_url`。如何通过此接口探测内网 80 端口的服务？

<details>
<summary>Check Solution</summary>

**利用方式**：
修改 `image_url` 指向内网地址。
`Payload: ?image_url=http://127.0.0.1:80/admin`
- 若返回 403/404，说明端口开放。
- 若连接超时或拒绝连接，说明端口关闭。

**进阶绕过**：
若过滤了 `127.0.0.1`，可尝试：
- 十进制地址：`http://2130706433/`
- 短链接绕过
- DNS 重绑定 (DNS Rebinding)
</details>

---

### Level C：竞赛挑战 (Advanced)

#### 练习 4：反序列化漏洞 - PHP 魔法方法
**题目描述**：在 PHP 反序列化中，`__destruct()`、`__wakeup()` 和 `__toString()` 的调用时机分别是什么？如何构造 POP 链实现 RCE？

<details>
<summary>Check Solution</summary>

**魔法方法时机**：
1. `__wakeup()`：执行 `unserialize()` 时，先于后续代码调用。
2. `__destruct()`：对象销毁（脚本结束或被显式销毁）时调用。
3. `__toString()`：对象被当作字符串使用（如 `echo $obj`）时调用。

**POP 链构造逻辑**：
寻找一个 `__destruct` 能够触发 `__toString`，而 `__toString` 又调用了其他类中包含敏感操作（如 `eval()` 或 `file_put_contents()`）的方法。

</details>

---

## 🏆 实验室规范
1. **合法性原则**：所有练习必须在授权的本地环境或隔离容器中进行。严禁对非授权目标进行测试。
2. **深度审计**：不仅要学会使用自动化工具（Sqlmap, Burp Suite），更要能通过阅读源码理解漏洞成因。
3. **闭环修复**：每发现一个漏洞，必须提交对应的代码加固方案。
