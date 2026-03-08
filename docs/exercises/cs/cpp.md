---
title: C++ 编程实战练习
---

# C++ 编程实战练习

---

## 练习 1：STL Map 的应用
给定一组单词，统计每个单词出现的次数，并按字典序输出。

<details>

<summary>点击查看解析与答案</summary>

#### 代码实现
```cpp
#include <iostream>
#include <map>
#include <string>

int main() {
    std::map<std::string, int> count;
    std::string word;
    while (std::cin >> word) {
        count[word]++;
    }
    for (auto const& [key, val] : count) {
        std::cout << key << ": " << val << std::endl;
    }
    return 0;
}
```

#### 解析
使用 `std::map` 会自动根据键（单词）进行排序，非常适合此题。

</details>

