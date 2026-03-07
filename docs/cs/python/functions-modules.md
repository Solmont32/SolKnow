# 函数与模块化 (Functions & Modules)

Python 通过极其灵活的参数传递和强大的模块化机制，使代码复用变得简单高效。

## 函数定义
```python
def greet(name, msg="Hello"):
    return f"{msg}, {name}!"

print(greet("Alice")) # Hello, Alice!
```

## 参数传递 (Arguments)
1. **位置参数**：按顺序传递。
2. **关键字参数**：指定参数名传递。
3. **默认参数**：不提供时使用预设值。
4. **不定长参数**：`*args` (元组), `**kwargs` (字典)。

## 匿名函数 (Lambda)
常用于简短的回调或高阶函数：
`add = lambda x, y: x + y`

## 模块化 (Modules)
- `import math`：导入标准库或第三方库。
- `from os import path`：导入特定模块。

## 包管理与 pip
- `pip install <library>`：从 PyPI 安装库。
- `requirements.txt`：列出项目依赖的所有包及版本。
- **虚拟环境 (venv)**：通过 `python -m venv venv` 创建隔离的运行环境，防止全局库冲突。
