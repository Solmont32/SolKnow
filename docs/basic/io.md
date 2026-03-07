---
title: C++ 高速 I/O 技巧
---

# C++ 高速 I/O 技巧

在算法竞赛中，输入输出（I/O）往往是性能瓶颈。

## 1. 关闭同步流
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

## 3. 快速输入模板 (Fast I/O)
对于极端数据量（$10^6$ 以上），可以使用 `getchar()` 自定义快读。

```cpp
inline int read() {
    int x = 0, f = 1; char ch = getchar();
    while (ch < '0' || ch > '1') { if (ch == '-') f = -1; ch = getchar(); }
    while (ch >= '0' && ch <= '9') { x = x * 10 + ch - '0'; ch = getchar(); }
    return x * f;
}
```
