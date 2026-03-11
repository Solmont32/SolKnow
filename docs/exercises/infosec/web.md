---
title: Web 安全专项练习
---

# Web 安全专项练习

本库聚焦于 OWASP Top 10 核心风险的识别与防御实战。

## 基础题目 (Basic)

### W1: SQL 注入基础绕过
**题目**：假设有一条后端语句 `query = "SELECT * FROM items WHERE id = " + user_input + ";"`。输入什么可以获取所有 `items` 表的内容？

<details>
<summary>查看解析</summary>

**解析**：
由于 `id` 是数字型注入点，不需要闭合单引号。
**输入**：`1 OR 1=1`。
**最终 SQL**：`SELECT * FROM items WHERE id = 1 OR 1=1;`

**C++ 模拟安全代码**：
```cpp
#include <iostream>
#include <string>

// 防御示范：参数化查询 (模拟)
void safe_query(int id) {
    std::cout << "Executing: SELECT * FROM items WHERE id = " << id << std::endl;
}

int main() {
    int user_input = 1; // 强制类型转换
    safe_query(user_input);
    return 0;
}
```
</details>

## 进阶题目 (Advanced)

### W2: XSS 过滤器绕过
**题目**：若后台过滤器仅过滤了 `<script>` 标签（区分大小写），请写出两种绕过方式以执行 `alert(1)`。

<details>
<summary>查看解析</summary>

**绕过策略**：
1. **大小写混淆**：`<sCrIpT>alert(1)</sCrIpT>`。
2. **事件处理器**：使用非 script 标签的事件，如 `<img src=x onerror=alert(1)>`。

**C++ 解析逻辑模拟**：
```cpp
#include <iostream>
#include <string>
#include <algorithm>

bool contains_malicious_script(std::string input) {
    std::transform(input.begin(), input.end(), input.begin(), ::tolower);
    if (input.find("<script>") != std::string::npos) return true;
    return false;
}

int main() {
    std::string user_input = "<sCrIpT>alert(1)</sCrIpT>";
    if (contains_malicious_script(user_input)) {
        std::cout << "Dangerous input detected via case-insensitive check!" << std::endl;
    }
    return 0;
}
```
</details>

### W3: CSRF 防御机制选择
**题目**：在以下防御 CSRF 的手段中，哪一项是最不推荐的，为什么？
A. CSRF Token
B. SameSite=Strict
C. 检查 Referer 头部
D. 双写 Cookie

<details>
<summary>查看解析</summary>

**答案**：C (检查 Referer 头部)。
**理由**：
1. **浏览器隐私保护**：部分浏览器出于隐私考虑，可能不发送 Referer。
2. **头部欺骗**：在某些旧版浏览器或代理环境下，Referer 头部可能被伪造。
**结论**：Referer 检查通常仅作为辅助手段，不能作为唯一的防御核心。
</details>
