---
title: Web 安全与协议对垒 (Web Security & Protocols)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Globe, ShieldAlert, Key, Zap } from 'lucide-react';

# Web 安全与协议对垒

> **核心原则**：Web 安全的核心是 **信任边界的划分** 与 **用户输入的过滤**。任何来自用户端的数据在未经验证前都应被视为恶意。

## 1. 协议层安全 (Protocol Security)

### 1.1 HTTP 与 HTTPS
- **HTTPS** = HTTP over TLS。通过 **握手协议** 协商密钥，确保传输过程的 **机密性** 与 **完整性**。
- **HSTS**：强制浏览器使用 HTTPS 访问，防止 SSL Strip 攻击。

### 1.2 认证与鉴权 (AuthN & AuthZ)
- **Cookie/Session**：传统的服务端状态管理。需设置 `HttpOnly` (防 XSS) 和 `Secure` (仅 HTTPS) 属性。
- **JWT (JSON Web Token)**：无状态认证。重点防御 **签名伪造** 与 **重放攻击**。
- **OAuth 2.0 / OpenID Connect**：第三方授权标准，涉及 `code`, `access_token`, `refresh_token` 等核心概念。

## 2. 核心漏洞向量 (OWASP Top 10)

### 2.1 注入攻击 (Injection)
- **SQL 注入**：通过拼接 SQL 语句非法操作数据库。
- **防御**：使用 **参数化查询 (Prepared Statements)**。

### 2.2 跨站脚本 (XSS)
- **存储型**：脚本存入数据库。
- **反射型**：通过 URL 参数触发。
- **DOM 型**：由于前端 JS 处理不当导致。
- **防御**：输出编码 (Contextual Output Encoding)、设置内容安全策略 (**CSP**)。

### 2.3 跨站请求伪造 (CSRF)
- 利用用户的 Cookie 身份，在用户不知情的情况下发送恶意请求。
- **防御**：引入 **CSRF Token**、使用 `SameSite` Cookie 属性。

### 2.4 服务端请求伪造 (SSRF)
- 诱使服务器发起本不应发起的内部请求。
- **防御**：IP 白名单过滤、禁用不必要的协议（如 `file://`, `gopher://`）。

---

## 3. 深度例题与练习 (Exercises)

### 例题 1：SQL 注入场景分析
**题目**：假设有一条后端语句 `query = "SELECT * FROM users WHERE username = '" + user_input + "';"`。如果用户输入 `' OR '1'='1`，会发生什么？

<details>
<summary>点击查看解析 (Check Solution)</summary>

**解析**：
1. 后端拼接后的完整语句为：`SELECT * FROM users WHERE username = '' OR '1'='1';`
2. `'1'='1'` 永远为真。
3. 数据库将忽略前面的 `username` 条件，返回 `users` 表中的所有记录。
**防御建议**：
```cpp
// 伪代码：使用预编译语句
auto stmt = db.prepareStatement("SELECT * FROM users WHERE username = ?");
stmt.setString(1, user_input);
auto results = stmt.executeQuery();
```
</details>

### 练习 1：JWT 安全检测 (C++ 逻辑模拟)
**题目**：编写一个简单的逻辑，检查 JWT Token 的头部是否使用了 `alg: "none"`，这是一种常见的绕过签名的攻击手段。

<details>
<summary>点击查看解析 (Check Solution)</summary>

**代码模拟**：
```cpp
#include <iostream>
#include <string>
#include <algorithm>

bool is_vulnerable_jwt(const std::string& header_json) {
    // 寻找 "alg":"none" 或 "alg" : "none" (忽略空格)
    std::string stripped = header_json;
    stripped.erase(std::remove(stripped.begin(), stripped.end(), ' '), stripped.end());
    
    if (stripped.find("\"alg\":\"none\"") != std::string::npos) {
        return true; // 存在安全风险
    }
    return false;
}

int main() {
    std::string bad_header = "{\"alg\": \"none\", \"typ\": \"JWT\"}";
    if (is_vulnerable_jwt(bad_header)) {
        std::cout << "Warning: Potential 'alg: none' vulnerability detected!" << std::endl;
    }
    return 0;
}
```
</details>

### 练习 2：CSP 策略解读
**题目**：如果一个页面的 CSP 策略为 `Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted.cdn.com;`。该页面是否可以加载来自 `https://evil.ninja/malicious.js` 的脚本？是否可以加载来自本域的图片？

<details>
<summary>点击查看解析 (Check Solution)</summary>

**解析**：
1. **脚本加载**：`script-src` 明确限制了脚本只能来自 `'self'` (本域) 和 `trusted.cdn.com`。因此 `evil.ninja` 的脚本将被拦截。
2. **图片加载**：由于没有明确定义 `img-src`，策略会回退到 `default-src 'self'`。因此本域的图片可以正常加载。
</details>
