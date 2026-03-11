---
title: 二进制安全 (PWN) 专项练习
---

# 二进制安全 (PWN) 专项练习

本库包含从基础栈溢出到进阶 ROP 链构造的实战习题。

## 基础题目 (Basic)

### P1: 溢出偏移探测
**题目**：已知目标程序是一个 32 位 Linux 可执行文件。函数内定义了 `char buf[32];`。请写出覆盖 `eip` 所需的 payload 结构。

<details>
<summary>查看解析</summary>

**解析**：
1. `buf` 占用 32 字节。
2. 32 位系统下，`ebp` 占用 4 字节。
3. `eip` 位于 `ebp` 之后。
**结论**：`Payload = 'A' * 32 (buf) + 'B' * 4 (ebp) + target_addr (eip)`。总共 36 字节填充后开始覆盖返回地址。

**C++ 模拟代码**：
```cpp
#include <iostream>
#include <string>

int main() {
    std::string padding(32, 'A');
    std::string ebp_cover(4, 'B');
    uint32_t target_eip = 0x08048400; // 假设地址
    
    std::cout << "Payload: " << padding << ebp_cover;
    // 输出二进制地址
    std::cout.write(reinterpret_cast<const char*>(&target_eip), 4);
    return 0;
}
```
</details>

## 进阶题目 (Advanced)

### P2: Ret2Libc 攻击
**题目**：在开启 NX 保护的系统中，已知 `system` 函数地址为 `0xf7e4b060`，`/bin/sh` 字符串地址为 `0xf7f69b75`，`exit` 地址为 `0xf7e3daf0`。请构造 32 位系统的调用栈。

<details>
<summary>查看解析</summary>

**解析**：
32 位函数调用约定通过栈传递参数。栈结构如下：
1. `system` 的地址。
2. 返回地址（通常设为 `exit` 以确保优雅退出）。
3. `system` 的参数地址（即 `/bin/sh` 的地址）。

**Payload 结构**：
`padding (offset) + system_addr + exit_addr + bin_sh_addr`

**C++ 构造模拟**：
```cpp
#include <iostream>
#include <vector>
#include <cstdint>

int main() {
    uint32_t system_addr = 0xf7e4b060;
    uint32_t exit_addr   = 0xf7e3daf0;
    uint32_t bin_sh_addr = 0xf7f69b75;
    
    std::cout << "Stack structure: " << std::endl;
    printf("[Higher Address]\n");
    printf("|  0x%x  | <-- /bin/sh addr\n", bin_sh_addr);
    printf("|  0x%x  | <-- return addr (exit)\n", exit_addr);
    printf("|  0x%x  | <-- system addr\n", system_addr);
    printf("[Lower Address]\n");
    return 0;
}
```
</details>
