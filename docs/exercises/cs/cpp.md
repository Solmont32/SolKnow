---
title: C++ 现代工程实战练习
sidebar_label: C++ 现代特性
---

import { Target, Zap, Trophy, BarChart3, ChevronRight, Code2, Cpu, Layers } from 'lucide-react';

# C++ 现代工程实战与底层原语

> **“C++ 是赋予程序员极限掌控力的武器。”** —— 本专题聚焦现代 C++ (C++11/14/17/20) 的工程化实践、内存模型与泛型编程深度。

---

## 🪜 练习阶梯与评价标准

| 等级                                                                     | 难度目标         | 核心考察点                                | 期望达成                       |
| :----------------------------------------------------------------------- | :--------------- | :---------------------------------------- | :----------------------------- |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 现代语法熟练度   | 智能指针、Lambda、auto、STL 基础          | 编写无内存泄漏的现代代码       |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 工程化抽象与性能 | 移动语义、模板元编程、RAII 模式           | 实现高效且类型安全的库组件     |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span>  | 底层机制与并发   | 内存模型 (Memory Barrier)、原子操作、协程 | 具备构建高性能分布式系统的能力 |

---

## 🎯 考点覆盖模型 (Knowledge Matrix)

| 知识模块     | 核心考点                                       | 关联习题 | 推荐等级 |
| :----------- | :--------------------------------------------- | :------- | :------- |
| **资源管理** | `unique_ptr` 所有权转移、`shared_ptr` 循环引用 | 练习 1   | Level A  |
| **泛型编程** | 模板特化、SFINAE (Enable_if)、Concepts         | 练习 2   | Level B  |
| **移动语义** | 右值引用、完美转发 (Perfect Forwarding)        | 练习 3   | Level B  |
| **底层性能** | 零开销抽象 (Zero-overhead)、虚函数开销分析     | 练习 4   | Level C  |
| **并发原语** | `std::atomic` 与内存顺序 (memory_order)        | 练习 5   | Level C  |

---

## 📂 核心习题库

### Level A：基础巩固 (Foundations)

#### 练习 1：智能指针的精密管理

**题目描述**：实现一个简单的资源类 `Resource`（构造/析构时打印日志），演示如何使用 `std::unique_ptr` 进行所有权转移，以及如何通过 `std::weak_ptr` 解决两个 `std::shared_ptr` 产生的循环引用问题。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**解题思维链**：

1.  **所有权转移**：`unique_ptr` 禁止拷贝，必须用 `std::move`。
2.  **循环引用**：两个对象互相持有对方的 `shared_ptr` 导致计数器永不归零。`weak_ptr` 不增加引用计数，可打破环路。

**代码实现**：

```cpp
#include <iostream>
#include <memory>

struct B; // 前向声明

struct A {
    std::shared_ptr<B> ptrB;
    ~A() { std::cout << "A destroyed\n"; }
};

struct B {
    std::weak_ptr<A> ptrA; // 使用 weak_ptr 打破循环
    ~B() { std::cout << "B destroyed\n"; }
};

int main() {
    auto a = std::make_shared<A>();
    auto b = std::make_shared<B>();
    a->ptrB = b;
    b->ptrA = a;
    return 0;
}
```

</details>

---

### Level B：综合提升 (Intermediate)

#### 练习 2：完美转发 (Perfect Forwarding) 与工厂函数

**题目描述**：编写一个通用的工厂函数模板 `make_object<T>(Args&&... args)`，它能将参数原封不动地传递给 `T` 的构造函数（保持其左值/右值属性）。

<details>
<summary>Check Solution</summary>

**解题思维链**：

1.  **万能引用**：`Args&&` 配合模板可以匹配左值和右值。
2.  **std::forward**：利用引用折叠规则，将参数完美转发。

**代码实现**：

```cpp
#include <utility>
#include <memory>

template <typename T, typename... Args>
std::unique_ptr<T> make_object(Args&&... args) {
    return std::make_unique<T>(std::forward<Args>(args)...);
}
```

</details>

#### 练习 3：模板元编程 - 类型萃取

**题目描述**：实现一个模板 `is_pointer_v<T>`，在编译期判断 `T` 是否为指针类型。

<details>
<summary>Check Solution</summary>

```cpp
template <typename T>
struct my_is_pointer { static constexpr bool value = false; };

template <typename T>
struct my_is_pointer<T*> { static constexpr bool value = true; };

// 助手变量
template <typename T>
inline constexpr bool my_is_pointer_v = my_is_pointer<T>::value;
```

</details>

---

### Level C：竞赛挑战 (Advanced)

#### 练习 4：高性能内存模型实战

**题目描述**：解释 `std::memory_order_relaxed` 与 `std::memory_order_acquire/release` 的区别。在一个无锁队列中，为什么必须使用 `release` 来存储数据指针，而在读取端使用 `acquire`？

<details>
<summary>Check Solution</summary>

**底层原理**：

1.  **Relaxed**：仅保证原子性，不保证内存操作的顺序。
2.  **Acquire-Release**：建立一个 **Synchronizes-with** 关系。
    - `Release` 确保在该操作之前的写操作对所有执行 `Acquire` 该变量的线程可见。
    - 它是实现跨线程数据可见性的核心，防止 CPU 指令重排导致的数据读写错乱。

</details>

---

## 🏆 训练建议

1.  **拒绝原生指针**：除非是底层库开发或性能极致优化，否则永远优先使用智能指针。
2.  **理解 RAII**：资源获取即初始化，这是 C++ 区别于其他语言的灵魂。
3.  **关注编译期**：多用 `constexpr` 和模板，将能放进编译期的计算全部提前，以获得极致的运行期性能。
