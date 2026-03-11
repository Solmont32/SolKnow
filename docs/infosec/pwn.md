---
title: 二进制安全与漏洞利用 (PWN & Exploitation)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Terminal, ShieldAlert, Zap, Cpu } from 'lucide-react';

# 二进制安全与漏洞利用

> **核心逻辑**：PWN 是通过对程序逻辑漏洞、内存管理缺陷的利用，劫持程序控制流（Control Flow Hijacking），最终获取系统执行权限。

## 1. 内存破坏基础 (Memory Corruption)

### 1.1 栈溢出 (Stack Overflow)
最经典的漏洞类型。由于未对局部变量长度进行检查，攻击者可以覆盖函数返回地址。
- **目标**：覆盖 `rip` (x86_64) 或 `eip` (x86)。

### 1.2 堆漏洞 (Heap Exploits)
由于堆管理器（如 `ptmalloc`）的复杂性，产生的漏洞更为隐蔽。
- **Use-After-Free (UAF)**：访问已释放的内存。
- **Double Free**：释放同一块内存两次，破坏堆链表。
- **Heap Overflow**：覆盖相邻堆块的元数据。

## 2. 控制流劫持技术 (Exploitation Techniques)

### 2.1 Ret2Libc
在 **NX (No-Execute)** 保护开启时，无法直接在栈上执行代码。攻击者通过跳转到已加载的系统库函数（如 `system`）并构造参数来执行命令。

### 2.2 ROP (Return Oriented Programming)
利用程序中已有的代码片段（称为 **Gadgets**，以 `ret` 结尾）拼接成攻击逻辑。
- **寻找 Gadget**：`pop rdi; ret` 是构造 `system("/bin/sh")` 的常用起点。

### 2.3 GOT 与 PLT 劫持
- **PLT (Procedure Linkage Table)**：跳转表。
- **GOT (Global Offset Table)**：存储函数真实地址。
- **攻击**：修改 GOT 表项指向恶意地址，使得调用库函数时执行攻击代码。

---

## 3. 现代保护机制 (Mitigations)

| 缩写 | 全称 | 作用 | 绕过方式 |
| :--- | :--- | :--- | :--- |
| **NX** | No-Execute | 禁止数据段执行 | ROP, Ret2Libc |
| **ASLR** | Address Space Layout Randomization | 地址空间随机化 | 信息泄露 (Memory Leak) |
| **Canary** | Stack Smash Protector | 栈溢出金丝雀校验 | 泄露 Canary, 覆盖跳转 |
| **PIE** | Position Independent Executable | 代码段随机化 | 泄露基地址 |

---

## 4. 深度例题与练习 (Exercises)

### 例题 1：简单栈溢出偏移计算
**题目**：假设函数内部定义了 `char buf[64];`。在 x86_64 架构下，要覆盖返回地址，至少需要输入多少字节？

<details>
<summary>点击查看解析 (Check Solution)</summary>

**解析**：
1. **buf 长度**：64 字节。
2. **Saved RBP**：64 位系统下 RBP 占用 8 字节。
3. **返回地址 (RIP)**：位于 Saved RBP 之后。
**结论**：总偏移 = $64 \text{ (buf)} + 8 \text{ (rbp)} = 72$ 字节。第 73-80 字节将覆盖返回地址。
</details>

### 练习 1：ROP 链构造模拟 (C++)
**题目**：给定以下 Gadgets 地址，请构造调用 `system("/bin/sh")` 的执行序列（假设 `/bin/sh` 地址已知）。
- `pop_rdi_ret`: `0x400600`
- `system_addr`: `0x400500`
- `bin_sh_addr`: `0x600100`

<details>
<summary>点击查看解析 (Check Solution)</summary>

**Payload 构造逻辑**：
1. 覆盖返回地址为 `pop_rdi_ret` (`0x400600`)。
2. 在栈上放置 `bin_sh_addr` (`0x600100`)。执行 `pop rdi` 后，`rdi` 将指向 "/bin/sh"。
3. 在栈上放置 `system_addr` (`0x400500`)。`ret` 指令执行后跳转到 `system`。

**C++ 逻辑模拟代码**：
```cpp
#include <iostream>
#include <vector>
#include <cstdint>

int main() {
    std::vector<uint64_t> stack_payload;
    
    // 假设前面的填充已经完成
    stack_payload.push_back(0x400600); // pop rdi; ret
    stack_payload.push_back(0x600100); // Address of "/bin/sh"
    stack_payload.push_back(0x400500); // Address of system()
    
    std::cout << "Payload (Hex): ";
    for(auto addr : stack_payload) {
        printf("%lx ", addr);
    }
    std::cout << std::endl;
    return 0;
}
```
</details>

### 练习 2：GOT 表覆盖原理
**题目**：为什么在 Full RELRO (Read-Only Relocations) 开启的情况下，无法进行 GOT 表劫持？

<details>
<summary>点击查看解析 (Check Solution)</summary>

**解析**：
1. **Partial RELRO**：只有部分重定位表只读，GOT 表（尤其是 `.got.plt`）依然可写。
2. **Full RELRO**：在程序启动时，动态链接器会解析所有符号，并将整个 GOT 表标记为**只读 (Read-Only)**。
**结论**：由于 GOT 表无法被写入，攻击者无法通过覆盖表项来劫持控制流。
</details>
