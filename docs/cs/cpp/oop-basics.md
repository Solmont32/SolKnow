# 面向对象基础 (OOP Basics)

面向对象编程（OOP）是 C++ 的核心思想。

## 类与对象 (Classes & Objects)
- **类 (Class)**：抽象的模板，定义了对象的属性和行为。
- **对象 (Object)**：类的具体实例。

## 封装 (Encapsulation)
通过访问限定符控制对成员的访问：
- `public`：任何地方都可访问。
- `private`：仅类内部成员函数可以访问（默认）。
- `protected`：类内部及其派生类可以访问。

## 构造函数与析构函数 (Constructor & Destructor)
- **构造函数**：对象创建时自动调用，用于初始化。
- **析构函数**：对象销毁前自动调用，用于释放资源。

```cpp
class Person {
private:
    string name;
public:
    // 构造函数
    Person(string n) : name(n) {}
    // 成员函数
    void sayHello() { cout << "Hello, my name is " << name << endl; }
};
```

## `this` 指针
每个非静态成员函数内部都有一个指向当前对象的隐式指针 `this`。
