# Python 进阶特性 (Advanced Features)

这些特性让 Python 的开发变得异常高效。

## 列表推导式 (List Comprehension)
简洁、高效地创建列表的方式：
```python
squares = [x**2 for x in range(10) if x % 2 == 0]
```

## 装饰器 (Decorators)
用于在不修改原函数的情况下扩展功能（如日志、耗时计算、权限检查）：
```python
def log(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}...")
        return func(*args, **kwargs)
    return wrapper

@log
def add(x, y): return x + y
```

## 上下文管理器 (with)
确保资源自动释放（如文件读写、数据库连接）：
```python
with open("test.txt", "r") as f:
    data = f.read() # 自动关闭文件
```

## 迭代器与生成器 (Generators)
- **生成器**：使用 `yield` 返回，节省内存。
- 适合处理大数据流（按需生成，不一次性加载）。

## 鸭子类型 (Duck Typing)
“如果它走起来像鸭子，叫起来也像鸭子，那它就是鸭子。”
- Python 只看对象是否具备特定的方法或属性，而不必严格检查继承关系。
