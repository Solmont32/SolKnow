---
title: 二进制安全 (PWN) 专项强化练习
sidebar_label: PWN 基础
---

import { Target, Zap, ShieldCheck, BarChart3, ChevronRight, Code2, Layers, Cpu } from 'lucide-react';

# 二进制安全 (PWN) 专项强化练习

> **“在内存的荒原上，每一比特都是博弈的筹码。”** —— 本专题涵盖缓冲区溢出、格式化字符串及堆漏洞利用，侧重 Linux 环境下的 C/C++ 内存安全分析。

---

## 🪜 练习阶梯与评价标准

| 等级                                                                     | 难度目标       | 核心考察点                                | 期望达成                        |
| :----------------------------------------------------------------------- | :------------- | :---------------------------------------- | :------------------------------ |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 内存基础破坏   | 栈溢出 (Ret2text)、Shellcode 注入         | 理解函数调用栈与返回地址覆写    |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 现代保护绕过   | ROP 链构造、Ret2libc、格式化字符串漏洞    | 掌握绕过 NX、ASLR 等保护的方法  |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span>  | 堆利用与内核   | Use-After-Free、Heap Overflow、Kernel PWN | 理解堆分配器 (glibc malloc) 机制 |

---

## 🎯 考点覆盖模型 (Knowledge Matrix)

| 知识模块         | 核心考点                             | 关联习题   | 推荐等级 |
| :--------------- | :----------------------------------- | :--------- | :------- |
| **栈溢出**       | 返回地址覆盖、JMP ESP 技巧           | 练习 1     | Level A  |
| **ROP 链**       | Gadget 寻找、系统调用号配置          | 练习 2     | Level B  |
| **格式化字符串** | 任意地址读/写、 Canary 泄露          | 练习 3     | Level B  |
| **堆安全**       | Bin 链表破坏、Tcache poisoning       | 练习 4     | Level C  |
| **安全机制**     | NX/DEP、ASLR 绕过策略                | 练习 5     | Level B  |

---

## 📂 核心习题库

### Level A：基础巩固 (Foundations)

#### 练习 1：经典的栈溢出模拟 (Buffer Overflow)

**题目描述**：给定一个 C 程序片段，输入缓冲区为 64 字节，目标是覆写返回地址以执行 `get_shell()` 函数。

<details>
<summary>Check Solution (Logic & C++ Simulation)</summary>

**漏洞代码 (Vulnerable Snippet)**：

```cpp
#include <iostream>
#include <cstring>

void get_shell() {
    std::cout << "Success! Shell Spawned." << std::endl;
}

void vulnerable_function() {
    char buffer[64];
    // 使用危险的 gets (模拟)
    std::cin >> buffer; 
}

int main() {
    vulnerable_function();
    return 0;
}
```

**利用思路**：
1. **偏移计算**：Payload = `A` * 64 + `EBP` (4/8字节) + `get_shell_address`。
2. **栈布局分析**：当 `buffer` 溢出时，数据会向上覆盖栈帧中的 `Saved EBP` 和 `Return Address`。

**防御修复**：
- 使用 `fgets()` 或 `std::string` 限制输入长度。
- 开启 `Stack Canary` (Stack Cookie) 保护。

</details>

---

### Level B：综合提升 (Intermediate)

#### 练习 2：Ret2libc 绕过 NX 保护

**题目描述**：当栈不可执行 (NX Enabled) 时，无法直接执行 Shellcode。如何利用 libc 中的 `system("/bin/sh")` 实现 RCE？

<details>
<summary>Check Solution</summary>

**利用逻辑**：
1. **泄露基址**：利用 `puts` 或 `printf` 泄露一个已知函数的 GOT 地址。
2. **计算偏移**：`libc_base = leaked_addr - offset_in_libc`。
3. **寻找 Gadget**：寻找 `pop rdi; ret` 等片段，将 `"/bin/sh"` 的地址放入 `RDI` 寄存器作为 `system` 的参数。
4. **触发调用**：返回地址覆盖为 `system_addr`。

</details>

#### 练习 3：格式化字符串任意地址写

**题目描述**：程序存在 `printf(user_input)`。如何利用 `%n` 修改变量 `count` 的值为 100？

<details>
<summary>Check Solution</summary>

**Payload 结构**：
`Payload: [count_address] + %96c + %k$n`
- 其中 `k` 是 `count_address` 在栈上的偏移位置。
- `%96c` 输出了 96 个字符，加上前面地址的 4 字节（32位下），共 100 字节。
- `%n` 将已输出的字节数 (100) 写入到第 `k` 个参数对应的地址中。

</details>

---

### Level C：竞赛挑战 (Advanced)

#### 练习 4：Use-After-Free (UAF) 基础

**题目描述**：简述 UAF 漏洞的成因，并说明如何通过劫持虚函数表 (vtable) 实现代码执行。

<details>
<summary>Check Solution</summary>

**核心原理解析**：
1. **成因**：程序释放 (free) 了堆内存，但未将指向该内存的指针置为 NULL。随后程序再次访问 (use) 该指针。
2. **劫持 vtable**：
   - 申请一个包含虚函数的 C++ 对象 A。
   - 释放对象 A。
   - 申请一个大小相同的数据块 B，并填入精心构造的伪造虚函数表地址。
   - 调用对象 A 的虚函数，此时 CPU 会跳转到 B 中指定的恶意地址。

</details>

---

## 🏆 实验室规范

1. **工具链**：掌握 `gdb-pwndbg`、`pwntools` 与 `checksec` 的协同使用。
2. **底层视角**：理解汇编指令 (`push`, `pop`, `call`, `ret`) 对栈指针 `ESP/RSP` 的真实影响。
3. **安全开发**：PWN 的终点是安全。所有漏洞利用应伴随对 `FORTIFY_SOURCE` 等现代防御机制的研究。
