# 继承与多态 (Inheritance & Polymorphism)

继承和多态通过代码复用和接口抽象极大提高了程序的灵活性。

## 继承 (Inheritance)
通过现有类（基类）创建新类（派生类）的过程。
- `public` 继承：最常用的方式，保留基类的 public 和 protected 性质。

## 多态 (Polymorphism)
同一个函数名在不同对象中表现出不同的行为。

### 1. 编译时多态（静态绑定）
- 函数重载 (Overloading)。
- 模板 (Templates)。

### 2. 运行时多态（动态绑定）
通过**虚函数 (Virtual Functions)** 和**基类指针/引用**实现。

```cpp
class Animal {
public:
    virtual void makeSound() { cout << "Animal sound" << endl; }
};

class Dog : public Animal {
public:
    void makeSound() override { cout << "Woof!" << endl; }
};
```

## 虚函数与虚析构
- `virtual` 关键字：指示编译器在运行时查找实际对象类型（通过 vptr/vtable）。
- **虚析构函数**：基类的析构函数必须声明为 `virtual`，以确保正确销毁派生类对象，防止内存泄漏。

## 抽象类与纯虚函数
- **纯虚函数**：`virtual void func() = 0;`。
- **抽象类**：包含至少一个纯虚函数的类，无法实例化，仅作为接口使用。
