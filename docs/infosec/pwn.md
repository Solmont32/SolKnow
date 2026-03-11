---
title: 二进制安全与逆向工程 (PWN & Reverse Engineering)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Terminal, ShieldAlert, Zap, Cpu, Search, FileCode } from 'lucide-react';

# 二进制安全与逆向工程

> **核心逻辑**：PWN 是通过对程序逻辑漏洞、内存管理缺陷的利用，劫持程序控制流（Control Flow Hijacking）或篡改关键数据。逆向工程则是分析二进制程序行为、还原逻辑的基础。

## 1. 逆向工程基础 (Reverse Engineering)

逆向工程是攻防的前置步骤，分为静态分析与动态调试。

### 1.1 静态分析 (Static Analysis)

- **工具**：IDA Pro, Ghidra, Binary Ninja。
- **目标**：还原函数逻辑、识别结构体、查找硬编码字符串。
- **汇编基础**：掌握 x86_64 寄存器（`rax`, `rdi`, `rsi` 等）与调用约定（`System V AMD64 ABI`）。

### 1.2 动态调试 (Dynamic Debugging)

- **工具**：GDB (搭配 Pwndbg/GEF 插件)。
- **操作**：断点 (`b`)、单步执行 (`si`/`ni`)、查看内存 (`x/gx addr`)、查看栈帧 (`backtrace`)。

---

## 2. 内存破坏与漏洞原理解析 (Vulnerabilities)

### 2.1 栈溢出形式化建模 (Stack Overflow Modeling)

考虑一个典型的栈帧布局。当函数调用发生时，栈指针 $RSP$ 向低地址增长：

1. **参数传递**：前 6 个参数入寄存器，其余入栈。
2. **返回地址 (RET)**：调用者下一条指令地址被压入。
3. **保存的 RBP**：调用者的基址指针。
4. **局部变量**：如 `char buf[N]`。

**脆弱性方程**：
若输入长度为 $L$，缓冲区长度为 $N$。当 $L > N$ 且缺乏边界检查时，溢出发生：
$$\text{Memory}[RBP + 8] = \text{Input}[N + \text{Padding} \dots L]$$
攻击者的目标是覆盖 $\text{Memory}[RBP + 8]$ 以劫持执行流。

### 2.2 格式化字符串 (Format String)

- **原理**：`printf(user_input)` 允许用户传入控制符（如 `%p`, `%x`, `%n`）。
- **危害**：
  - **信息泄露**：使用 `%p` 泄露栈上地址（绕过 ASLR/Canary）。
  - **任意写**：使用 `%n` 将已打印字符数写入指定地址，修改 GOT 表或返回地址。

### 2.3 堆漏洞：UAF 与 Double Free

- **Use-After-Free (UAF)**：指针被 `free` 后未置空（悬挂指针），再次使用该指针可能访问到已被分配给其他用途的内存。
- **Double Free**：释放同一块内存两次，导致堆管理器（Fastbin/Tcache）的链表形成环路，从而实现任意地址分配。

---

## 3. 控制流劫持技术 (Exploitation)

### 3.1 ROP (Return Oriented Programming)

在 **NX** 开启时，攻击者无法直接执行栈上的 Shellcode。

- **逻辑**：利用以 `ret` (指令码 `0xc3`) 结尾的指令片段 (Gadgets)。
- **链条构造**：$\text{RET} \to \text{Gadget}_1 \to \text{Gadget}_2 \to \dots \to \text{System Call}$。

### 3.2 SROP (Sigreturn Oriented Programming)

利用 `sigreturn` 系统调用在栈上恢复伪造的寄存器上下文，从而一次性控制所有寄存器。

---

## 4. 攻防模型：漏洞缓解与绕过 (Mitigations)

### 4.1 控制流完整性 (CFI) 形式化

CFI 旨在确保程序执行路径符合预定义的控制流图 (CFG)。

- **前向保护 (Forward Edge)**：确保间接跳转/调用（如虚函数表、函数指针）的目标合法。
- **后向保护 (Backward Edge)**：保护返回地址不被篡改（如 **Shadow Stack** 或 **Intel CET**）。

| 保护机制   | 形式化定义 / 绕过策略                                                                               |
| :--------- | :-------------------------------------------------------------------------------------------------- |
| **NX**     | $\text{Permissions}(\text{Stack}) \subset \{R, W\}$；绕过：ROP                                      |
| **ASLR**   | $\text{Base}_{\text{libc}} = \text{Random}()$；绕过：Memory Leak                                    |
| **Canary** | $\text{Stack}[RBP-8] = \text{Secret}$；绕过：Leak or Arbitrary Write                                |
| **CFI**    | $\forall j \in \text{Jump}, \text{Target}(j) \in \text{ValidTargets}$；绕过：非控制流数据攻击 (DOP) |

---

## 5. 深度例题与练习 (Exercises)

### 例题 1：格式化字符串任意读 (C++)

**题目**：假设程序存在 `printf(buf);` 漏洞。如何利用该漏洞读取栈上第 6 个参数的值？

<details>
<summary>点击查看解析 (Check Solution)</summary>

**解析**：
在 x86_64 下，`printf` 的前 6 个参数分别通过 `rdi`, `rsi`, `rdx`, `rcx`, `r8`, `r9` 传递。从第 7 个参数（即 `printf` 内部视角下的偏移）开始存放在栈上。
**Payload**：`%6$p`。
其中 `6` 是相对于格式化字符串起始位置的偏移。在很多 CTF 题目中，如果 `buf` 本身就在栈上，可以通过 `%n$p` 遍历查找。

</details>

### 练习 1：栈溢出绕过 Canary 逻辑模拟

**题目**：如果一个程序开启了 Canary 保护，但存在一个**数组越界读**漏洞和一个**栈溢出**漏洞。请简述攻击步骤。

<details>
<summary>点击查看解析 (Check Solution)</summary>

**攻击步骤**：

1. **泄露 Canary**：利用数组越界读漏洞，读取存放 Canary 的位置（通常在 `rbp-0x8`），获取其随机值。
2. **构造 Payload**：在栈溢出填充时，将泄露出的真实 Canary 填回正确位置，使得函数退出时的校验通过。
3. **覆盖 RIP**：在补全 Canary 后，继续覆盖 Saved RBP 和 Return Address 为 ROP 链起始地址。
</details>

### 练习 2：堆 UAF 漏洞利用 (C++ 模拟)

**题目**：阅读以下代码，分析如何通过 `uaf_ptr` 劫持控制流。

```cpp
struct Note {
    void (*print_func)(const char*);
    char content[16];
};

void safe_print(const char* s) { std::cout << s << std::endl; }
void malicious_shell(const char* s) { system("/bin/sh"); }

Note* n1 = new Note();
n1->print_func = safe_print;
delete n1; // n1 变成悬挂指针

// 此时分配一个新的对象
long long* n2 = new long long( (long long)malicious_shell );
// 如果 n2 占用了 n1 原先的 print_func 空间...
n1->print_func("Hello"); // 触发劫持
```

<details>
<summary>点击查看解析 (Check Solution)</summary>

**解析**：

1. `n1` 被释放后，其所在的内存块进入堆管理器的空闲链表。
2. 当分配 `n2` 时，堆管理器会复用刚刚释放的内存块以提高效率。
3. 如果 `n2` 的内容（即 `malicious_shell` 的地址）正好覆盖了原 `n1->print_func` 的位置。
4. 调用 `n1->print_func()` 时，程序实际上跳转到了 `malicious_shell`。
**防御**：`delete` 后立即将指针置为 `nullptr`。
</details>
