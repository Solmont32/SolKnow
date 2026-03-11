---
title: 二进制安全与 Pwn 专项强化练习
sidebar_label: 二进制安全
---

import { Target, Zap, ShieldCheck, BarChart3, ChevronRight, Code2, Layers, Cpu } from 'lucide-react';

# 二进制安全与 Pwn 专项强化练习 (Pwn Lab)

> **“在指令流的裂隙中，重构程序的逻辑。”** —— 本专题涵盖缓冲区溢出、格式化字符串漏洞、堆利用与现代系统防御绕过 (DEP/ASLR/PIE)。

---

## 🪜 练习阶梯与评价标准

| 等级 | 难度目标 | 核心考察点 | 期望达成 |
| :--- | :--- | :--- | :--- |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 基础溢出利用 | 栈溢出覆盖返回地址、调用后门函数 | 能够手动计算偏移并构造 Payload |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 现代防御绕过 | ROP (返回导向编程)、Libc 泄漏、格式化字符串 | 理解系统安全机制的本质缺陷 |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span> | 堆利用进阶 | Fastbin Attack、Unsorted Bin Leak、Tcache 劫持 | 具备处理复杂内存管理漏洞能力 |

---

## 📂 核心习题库

### Level A：基础巩固 (Foundations)

#### 练习 1：经典栈溢出 (Ret2text)
**题目描述**：给定一个 32 位二进制程序，存在 `gets(buf)` 漏洞。已知 `buf` 距离返回地址的偏移为 44 字节。程序中有一个隐藏函数 `backdoor()`，地址为 `0x08048500`。请构造 Payload 劫持执行流。

<details>
<summary>Check Solution (Payload Construction)</summary>

**核心逻辑**：
通过填充 44 字节的垃圾数据，覆盖原有的返回地址为 `backdoor()` 的起始地址。
**Payload 构造 (Python 脚本)**：
```python
from pwn import *
# Payload = 'A' * 44 + p32(0x08048500)
payload = b"A" * 44 + p32(0x08048500)
p = process("./level1")
p.sendline(payload)
p.interactive()
```

**防御代码 (C++ 修复示例)**：
```cpp
void safe_input() {
    char buf[32];
    // 使用 fgets 限制输入长度，防止溢出
    if (fgets(buf, sizeof(buf), stdin)) {
        // ... 处理输入
    }
}
```
</details>

---

### Level B：综合提升 (Intermediate)

#### 练习 2：格式化字符串漏洞 (Leak Memory)
**题目描述**：程序存在 `printf(user_input)` 漏洞。目标是泄漏栈上的 Canary 值或 Libc 基址。

<details>
<summary>Check Solution</summary>

**利用原理**：
`printf` 允许使用 `%p`, `%x` 等格式化符读取栈上的内容。
- `%p`：以十六进制输出。
- `%n`：将已输出的字符数写入指定地址（可用于改写变量）。

**Payload 探测**：
输入 `%p.%p.%p.%p.%p.%p` 可以观察栈上寄存器与内存分布。
通过计算偏移，如 `%13$p`，可直接定位到指定的敏感数据。

</details>

#### 练习 3：ROP (返回导向编程) 绕过 NX
**题目描述**：在开启了 NX (不可执行栈) 的情况下，无法直接执行 Shellcode。如何利用程序中的 `pop rdi; ret` 指令片段调用 `system("/bin/sh")`？

<details>
<summary>Check Solution</summary>

**ROP 链构造 (x64)**：
1. `pop rdi; ret`：将参数 "/bin/sh" 加载到 `rdi` 寄存器。
2. `bin_sh_addr`：字符串地址。
3. `system_addr`：Libc 中 `system` 函数的地址。

**Python 构造示例**：
```python
rop_chain = p64(pop_rdi_ret) + p64(bin_sh_addr) + p64(system_addr)
```
</details>

---

### Level C：竞赛挑战 (Advanced)

#### 练习 4：堆利用之 Use-After-Free (UAF)
**题目描述**：简述 UAF 漏洞的成因，并描述如何通过释放再申请的操作劫持函数指针。

<details>
<summary>Check Solution</summary>

**成因**：
当对象被 `free` 后，程序没有将指针置为 `NULL` (Dangling Pointer)，且后续代码继续使用了该指针。

**利用流程**：
1. 申请对象 A，其结构包含一个函数指针。
2. 释放对象 A（进入 `tcache` 或 `fastbin`）。
3. 申请相同大小的对象 B，输入内容。由于堆管理器的分配机制，B 将占据 A 原有的内存块。
4. 对象 B 的内容覆盖了 A 的函数指针。
5. 原程序调用 A 的指针，实际上执行了被 B 篡改后的恶意指令。

</details>

---

## 🏆 实验室规范
1. **静态分析优先**：利用 IDA Pro/Ghidra 彻底理解程序的汇编逻辑与内存布局。
2. **动态调试配合**：使用 GDB (配合 Pwndbg 或 Gef) 观察 Payload 注入后的寄存器状态。
3. **版本匹配**：注意不同版本 GLIBC (如 2.23 vs 2.31) 中堆管理策略的差异。
