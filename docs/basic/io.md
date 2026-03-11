---
title: C++ 高速 I/O 技巧 (Fast I/O)
sidebar_position: 1.5
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Zap, Terminal, AlertTriangle } from 'lucide-react';

# C++ 高速 I/O 技巧 (Fast I/O)

在算法竞赛中，输入输出（I/O）往往是性能瓶颈。

---

## 1. 关闭同步流 (Sync Off)

默认情况下，`cin` 和 `cout` 会与 `stdio` 同步，这会大大降低速度。

```cpp
ios::sync_with_stdio(false);
cin.tie(0);
cout.tie(0);
```

**注意**：关闭同步后，不能混合使用 `cin/cout` 和 `scanf/printf`。

## 2. 避免使用 `endl`

`endl` 会强制刷新缓冲区，速度极慢。请改用 `\n`。

```cpp
cout << res << "\n";
```

## 3. 快速输入模板 (Fast Read)

对于极端数据量（$10^6$ 以上），可以使用 `getchar()` 自定义快读。

<details>
<summary>C++ 实现</summary>

```cpp
inline int read() {
    int x = 0, f = 1; char ch = getchar();
    while (ch < '0' || ch > '9') { if (ch == '-') f = -1; ch = getchar(); }
    while (ch >= '0' && ch <= '9') { x = x * 10 + ch - '0'; ch = getchar(); }
    return x * f;
}
```

</details>

---

_编者注：对于绝大多数题目，关闭同步流后的 `cin/cout` 足以应对。但在处理大数据量的浮点数或特定实时反馈题目时，需根据具体平台谨慎选择。_
