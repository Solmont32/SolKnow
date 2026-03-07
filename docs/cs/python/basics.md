# Python 基础与容器 (Basics)

Python 是一种动态强类型语言，这意味着变量不需要声明类型，但类型之间不能随意进行隐式转换。

## 基础类型
- `int`, `float`, `complex` (数值类型)。
- `str` (字符串)。
- `bool` (布尔值)。

## 核心容器 (Built-in Containers)
### 1. 列表 (List)
有序且可变的序列。
```python
fruits = ["apple", "banana"]
fruits.append("cherry")
print(fruits[0]) # apple
```

### 2. 元组 (Tuple)
有序且**不可变**的序列。
`point = (10, 20)`

### 3. 字典 (Dictionary)
无序的键值对集合（Python 3.7+ 保持插入顺序）。
`person = {"name": "Alice", "age": 25}`

### 4. 集合 (Set)
无序且不重复的元素集合。
`unique_ids = {101, 102, 103}`

## 控制流 (Control Flow)
- `if-elif-else`
- `for x in list:`
- `while condition:`

## 缩进规则
Python 使用**缩进**（通常是 4 个空格）来定义代码块，而不是大括号。这是 Python 与其他语言最显著的区别。
