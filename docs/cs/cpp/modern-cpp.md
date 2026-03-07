# 现代 C++ 特性 (Modern C++)

C++11 是 C++ 的一次重大飞跃，引入了大量使代码更安全、更简洁的特性。

## 类型推导 (auto)
编译器自动确定变量类型：`auto x = 5;`。

## 智能指针 (Smart Pointers)
用于解决动态分配内存的资源管理问题（RAII），由 `<memory>` 提供：
- `std::unique_ptr`：独占所有权，不可复制。
- `std::shared_ptr`：共享所有权，通过引用计数管理。
- `std::weak_ptr`：解决循环引用问题。

```cpp
auto p = make_unique<int>(10); // 自动释放内存
```

## Lambda 表达式 (Lambdas)
即匿名函数，极大简化了算法的回调：
`[capture](params) -> return_type { body }`

## 右值引用与移动语义 (R-value & Move)
通过 `std::move` 和 `T&&` 避免不必要的拷贝，提高性能。

## `nullptr`
引入 `nullptr` 替换旧的 `NULL` 或 `0`，避免了整数溢出与指针类型的歧义。

## 强类型枚举 (enum class)
解决枚举名冲突问题，并增加了类型安全性。
```cpp
enum class Color { Red, Green, Blue };
```
