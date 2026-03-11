---
title: C++ 编程实战练习 (C++ Programming Practice)
sidebar_position: 1
---

# C++ 编程实战练习 (C++ Programming Practice)

本练习库聚焦现代 C++ (C++11/14/17/20) 的核心特性，对标工业级代码规范与性能优化。

---

## 1. 智能指针 (Smart Pointers)

:::info 习题 1.1：`std::unique_ptr` 的所有权转移
编写一个函数 `process_resource(std::unique_ptr<int> res)`，并在 `main` 函数中演示如何正确调用它。解释为什么不能直接传递 `std::unique_ptr` 的实例。
:::

<details>
<summary>点击查看代码解析</summary>

```cpp
#include <iostream>
#include <memory>

void process_resource(std::unique_ptr<int> res) {
    std::cout << "Processing: " << *res << std::endl;
}

int main() {
    auto p = std::make_unique<int>(42);
    
    // process_resource(p); // 错误：unique_ptr 的拷贝构造函数已禁用
    process_resource(std::move(p)); // 正确：显式所有权转移
    
    if (!p) {
        std::cout << "p is now null." << std::endl;
    }
    return 0;
}
```

**解析：**
`std::unique_ptr` 保证了资源的独占所有权，因此其拷贝构造函数被标记为 `delete`。必须使用 `std::move` 将所有权从调用者转移到函数内部。转移后，原指针 `p` 变为 `nullptr`。
</details>

---

## 2. 模板与泛型编程 (Templates)

:::info 习题 2.1：静态断言与类型萃取
编写一个泛型函数 `add`，要求使用 `static_assert` 确保传入的参数类型必须是算术类型（整数或浮点数）。
:::

<details>
<summary>点击查看代码解析</summary>

```cpp
#include <iostream>
#include <type_traits>

template <typename T>
T add(T a, T b) {
    static_assert(std::is_arithmetic<T>::value, "T must be an arithmetic type!");
    return a + b;
}

int main() {
    std::cout << add(1, 2) << std::endl;      // 正确
    std::cout << add(1.5, 2.5) << std::endl;  // 正确
    // add("hello", "world");                 // 编译错误：触发 static_assert
    return 0;
}
```

**解析：**
利用 `<type_traits>` 中的 `std::is_arithmetic` 可以在编译期对类型进行检查。`static_assert` 提供了友好的编译错误提示，避免了不合法的模板实例化。
</details>

---

## 3. 移动语义与性能 (Move Semantics)

:::info 习题 3.1：三法则、五法则与 `std::move`
解释为什么在实现包含动态内存分配的类时，应当实现移动构造函数和移动赋值运算符。
:::

<details>
<summary>点击查看解析</summary>

在现代 C++ 中，**移动语义**允许我们“窃取”临时对象（右值）的资源，而不是进行昂贵的深拷贝。
- **拷贝构造：** 分配新内存 $\to$ 拷贝数据。
- **移动构造：** 直接接管原对象的指针 $\to$ 将原对象指针置空。
对于包含大型 `vector` 或堆内存的类，移动语义可以将 $O(N)$ 的拷贝开销降低到 $O(1)$ 的指针交换开销，极大提升性能。
</details>

---

_本练习库持续更新，致力于打磨 C++ 底层内功。_
