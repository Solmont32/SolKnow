---
title: Web 安全与协议对垒 (Web Security & Protocols)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Globe, ShieldAlert, Key, Zap, Lock, RefreshCcw } from 'lucide-react';

# Web 安全与协议对垒

> **核心原则**：Web 安全的核心是 **信任边界的划分** 与 **用户输入的过滤**。任何来自用户端的数据在未经验证前都应被视为恶意。

## 1. 深度协议分析 (Protocol Deep Dive)

### 1.1 TLS 1.3 握手协议
相比 TLS 1.2，TLS 1.3 极大地简化了握手流程（1-RTT），并移除了不安全的加密组件（如 RSA 密钥交换，全面改用 **正向加密** 的 DH）。
- **流程**：Client Hello (含 Key Share) -> Server Hello (含 Key Share, Encrypted Extensions, Certificate, Finished) -> Client Finished。
- **0-RTT**：利用 PSK (Pre-Shared Key) 实现首包加密发送数据，但需注意**重放攻击**风险。

### 1.2 OAuth 2.0 与 OIDC
- **OAuth 2.0**：授权协议（Authorization）。核心是 `access_token`。
- **OIDC (OpenID Connect)**：身份认证层（Authentication），在 OAuth 2.0 之上增加了 `id_token`。
- **常见漏洞**：`redirect_uri` 校验不严导致 Token 被窃取、`state` 参数缺失导致 CSRF 登录劫持。

---

## 2. 核心漏洞向量解析 (Vulnerabilities)

### 2.1 注入攻击：上下文混淆模型 (Context Confusion)
注入攻击的本质是**数据 (Data)** 与 **指令 (Code)** 的界限被打破。
- **形式化定义**：设解析器函数为 $P(\text{Context}, \text{Input})$。当 Input 包含 Context 下的特殊元字符（如 SQL 的 `'`, HTML 的 `<`）时，$P$ 的逻辑结构被篡改。
- **防御逻辑**：
  - **参数化查询**：强制 $P$ 将所有 Input 视为 Data。
  - **上下文相关编码 (Context-Aware Encoding)**：在数据进入 HTML/JS/CSS 上下文前，进行特定的转义处理。

### 2.2 同源策略 (SOP) 与 CORS 形式化
**同源策略 (Same-Origin Policy)** 是 Web 安全的基石。
- **三元组定义**：源 $O = (\text{Protocol}, \text{Host}, \text{Port})$。当且仅当 $O_1 = O_2$ 时，允许跨源访问资源。

**CORS (Cross-Origin Resource Sharing)** 是 SOP 的安全例外机制：
1. **简单请求**：浏览器直接发送请求，并在 Header 中带上 `Origin`。
2. **预检请求 (Preflight)**：对于非简单请求，先发送 `OPTIONS`。服务器需返回：
   - `Access-Control-Allow-Origin: <origin> | *`
   - `Access-Control-Allow-Methods: GET, POST, ...`
- **安全风险**：若 `Access-Control-Allow-Origin: *` 且 `Access-Control-Allow-Credentials: true` 同时存在，将导致 CSRF 及敏感数据泄露。

---

## 3. 现代前端安全架构

### 3.1 跨站请求伪造 (CSRF) 防御模型
CSRF 利用了浏览器自动携带 Cookie 的特性。
- **同步令牌模式 (STP)**：服务器在表单中植入随机 Token，提交时校验。
- **SameSite Cookie**：通过属性限制 Cookie 的跨站发送行为。

### 3.1 SSRF (Server-Side Request Forgery)
攻击者诱使服务器访问内网敏感服务（如 `http://169.254.169.254` 元数据服务）。
- **绕过技巧**：利用 302 跳转、DNS 重绑定 (DNS Rebinding)。

### 3.2 反序列化漏洞 (Deserialization)
- **原理**：程序将用户可控的字节流还原为对象时，触发了恶意构造的魔术方法。
- **典型**：PHP `unserialize()`, Java `ObjectInputStream`。

---

## 4. 深度例题与练习 (Exercises)

### 例题 1：SSRF DNS 重绑定攻击模拟
**题目**：如果后端只对域名进行了黑名单过滤（如禁止访问 `127.0.0.1`），攻击者如何绕过？

<details>
<summary>点击查看解析 (Check Solution)</summary>

**解析**：
1. **DNS 重绑定**：攻击者控制一个域名（如 `rebind.evil.com`），并配置 DNS 服务器。
2. **第一次解析**：返回一个合法的外部 IP，绕过黑名单校验。
3. **TTL 设置为 0**：服务器再次请求该域名时，DNS 返回 `127.0.0.1`。
4. **结果**：后端代码在校验通过后，实际请求发送到了 `127.0.0.1`。
**防御**：请求发起时锁定解析后的 IP，或使用统一的内网访问网关。
</details>

### 练习 1：IDOR 漏洞检测 (C++ 逻辑模拟)
**题目**：实现一个简单的鉴权逻辑，防止用户通过修改 `order_id` 查看他人的订单。

<details>
<summary>点击查看解析 (Check Solution)</summary>

**代码模拟**：
```cpp
#include <iostream>
#include <map>
#include <string>

struct Order {
    int user_id;
    std::string product;
};

std::map<int, Order> order_db = {
    {101, {1, "MacBook"}},
    {102, {2, "iPhone"}}
};

void get_order_details(int current_user_id, int requested_order_id) {
    if (order_db.find(requested_order_id) == order_db.end()) {
        std::cout << "Order not found." << std::endl;
        return;
    }
    
    Order order = order_db[requested_order_id];
    
    // 关键修复：除了检查订单是否存在，还必须校验归属权
    if (order.user_id != current_user_id) {
        std::cout << "Access Denied: You do not own this order!" << std::endl;
        return;
    }
    
    std::cout << "Order Details: " << order.product << std::endl;
}

int main() {
    std::cout << "User 1 tries to access User 2's order:" << std::endl;
    get_order_details(1, 102); // 应该被拒绝
    return 0;
}
```
</details>

### 练习 2：Cookie 安全属性解读
**题目**：解释 `SameSite=Lax`, `SameSite=Strict` 和 `SameSite=None` 对 CSRF 防御的影响。

<details>
<summary>点击查看解析 (Check Solution)</summary>

**解析**：
1. **Strict**：最严格。跨站请求（包括链接点击）均不发送 Cookie。
2. **Lax**：默认值。跨站 POST 不发送，但顶级导航（如 `<a>` 链接跳转）会发送。能有效防御大部分 CSRF。
3. **None**：必须配合 `Secure` 使用。跨站请求始终发送。
**结论**：现代 Web 开发应优先使用 `Lax` 或 `Strict`。
</details>

