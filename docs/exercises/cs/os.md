---
title: 操作系统 (OS) 专项练习
---

# 操作系统 (OS) 专项练习

本库涵盖进程调度、内存管理与同步原语的深度练习。

## 基础题目 (Basic)

### OS1: 进程状态转换
**题目**：一个运行中的进程因为等待 I/O 资源而进入什么状态？当 I/O 完成后，它又会进入什么状态？

<details>
<summary>查看解析</summary>

**解析**：
1. **阻塞状态 (Blocked/Waiting)**：进程因等待 I/O 或同步信号而暂停运行。
2. **就绪状态 (Ready)**：I/O 完成后，进程具备运行条件，进入就绪队列等待 CPU 调度。
**结论**：阻塞状态 -> 就绪状态。
</details>

## 进阶题目 (Advanced)

### OS2: 虚拟内存地址转换
**题目**：假设页大小为 4KB ($2^{12}$)，页表项如下：
- 页号 0 -> 物理块 5
- 页号 1 -> 物理块 2
- 页号 2 -> 物理块 8
计算虚拟地址 `0x1A2B` 对应的物理地址。

<details>
<summary>查看解析</summary>

**解析步骤**：
1. **拆分地址**：`0x1A2B` = `0x1` (页号) + `0xA2B` (页内偏移)。
2. **查页表**：页号 1 对应物理块 2。
3. **合成物理地址**：物理地址 = 物理块号 * 页大小 + 偏移 = `0x2000 + 0xA2B = 0x2A2B`。
**结论**：物理地址为 `0x2A2B`。

**C++ 逻辑模拟**：
```cpp
#include <iostream>
#include <map>

int main() {
    uint32_t virtual_addr = 0x1A2B;
    uint32_t page_size = 4096;
    
    std::map<uint32_t, uint32_t> page_table = {{0, 5}, {1, 2}, {2, 8}};
    
    uint32_t page_num = virtual_addr / page_size;
    uint32_t offset = virtual_addr % page_size;
    
    if (page_table.count(page_num)) {
        uint32_t physical_addr = page_table[page_num] * page_size + offset;
        printf("Physical Address: 0x%x\n", physical_addr);
    }
    return 0;
}
```
</details>

### OS3: 死锁检测
**题目**：在资源分配图中，如果存在一个环路，是否一定意味着发生了死锁？请分情况说明。

<details>
<summary>查看解析</summary>

**解析**：
1. **单实例资源**：如果每种资源类只有一个实例，环路是死锁的**充分必要条件**。
2. **多实例资源**：环路是死锁的**必要不充分条件**。可能存在环路但某些进程可以释放资源从而打破环路。
**结论**：不一定。多实例资源场景下需要通过安全性算法（如银行家算法）进一步判定。
</details>
