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
3. **合成物理地址**：物理地址 = 物理块号 \* 页大小 + 偏移 = `0x2000 + 0xA2B = 0x2A2B`。
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

---

## 系统精要专题 (System Essentials)

### OS4: 虚拟地址转换 (二级分页内存开销)

**题目**：已知虚拟地址为 32 位，页面大小为 4KB。页表采用二级分页，一级页表项 (PDE) 和二级页表项 (PTE) 均为 4 字节。请计算一个进程占满 4GB 虚拟空间时，页表本身需要消耗多少内存？

<details>
<summary>查看解析</summary>

**解析步骤**：

1. **页面数量**：$4GB / 4KB = 2^{32} / 2^{12} = 2^{20}$ 个页面。
2. **二级页表**：每个 PTE 4 字节，共 $2^{20}$ 个 PTE，占用 $2^{20} \times 4 = 4MB$。
3. **一级页表**：每个二级页表覆盖 $1024$ 个页面（$2^{10}$），故需要 $2^{10}$ 个 PDE。占用 $1024 \times 4 = 4KB$。
4. **总计**：$4MB + 4KB$。
**结论**：多级分页通过稀疏存储减少了未分配空间的页表开销。
</details>

### OS5: 无锁队列中的内存序分析

**题目**：在经典的单生产者单消费者 (SPSC) 无锁队列中，生产者更新 `tail` 指针，消费者读取 `tail`。为了保证消费者能看到生产者写入数据区的内容，应该使用哪种内存序？

<details>
<summary>查看解析</summary>

**解析**：

1. **生产者**：在写入数据后，对 `tail` 执行 `store`。必须使用 `std::memory_order_release`。
2. **消费者**：在读取 `tail` 前，执行 `load`。必须使用 `std::memory_order_acquire`。
3. **原理**：`release` 保证之前的所有写操作（数据区）对后续执行 `acquire` 的线程可见。
**结论**：生产者使用 Release，消费者使用 Acquire。
</details>

### OS6: 高性能位运算 —— Popcount 模拟

**题目**：不使用内建函数，实现一个 32 位整数 `popcount` 的分治优化算法。

<details>
<summary>查看解析</summary>

**C++ 工业级实现**：

```cpp
#include <cstdint>

int popcount_swar(uint32_t i) {
     // 2bit 掩码并行加
     i = i - ((i >> 1) & 0x55555555);
     // 4bit 掩码并行加
     i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
     // 8bit 累加并使用乘法技巧
     return (((i + (i >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;
}
```

**结论**：通过 SWAR (SIMD Within A Register) 技术，在 $O(1)$ 时间内完成统计。

</details>

### OS7: IP 分片重组逻辑分析

**题目**：IP 报头中的 `Flags` 和 `Fragment Offset` 如何配合实现大包分片？若收到 `Flags=0` 且 `Offset=100` 的包，它代表什么？

<details>
<summary>查看解析</summary>

**解析**：

1. **Flags**: `MF` (More Fragments) 为 0 表示该包是最后一个分片。
2. **Offset**: 偏移量以 8 字节为单位。
3. **分析**：该数据在原包中的起始位置是第 $100 \times 8 = 800$ 字节，且此包为分片序列的终点。
**结论**：这是原 IP 数据包的最后一个分片，起始偏移量为 800 字节。
</details>
