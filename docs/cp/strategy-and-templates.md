# 算法竞赛实战策略与工程化模版

> **工程化思维**是算法竞赛从“能写出来”到“稳定过题”的跨越。本章系统化梳理竞赛中的比赛策略、代码规范、对拍验证系统与常数优化技巧，致力于打造工业级的竞赛代码范式。

## I. 比赛实战策略 (Competition Strategy)

在有限的时间（通常为 2-5 小时）内最大化得分，需要极强的心理素质与时间管理能力。

### 1.1 时间分配与节奏控制
- **读题期 (Initial 10-20 min)**: 通读所有题目，标记出“一眼题”（签到）和“模版题”。
- **攻坚期**: 遵循“先易后难”原则。若某题思路卡壳超过 30 分钟，果断跳题，避免陷入局部最优解的心理陷阱。
- **封榜期 (Last 30-60 min)**: 检查低级错误（long long, 数组大小, 空间限制），优先处理已有思路但未实现的代码，不建议在此阶段开启全新难度的题目。

### 1.2 题目筛选与思维 Trick
- **多维度建模**: 若题目看起来像图论但边数过多，考虑 DP 或数据结构。
- **逆向思维**: 若正面求解困难，考虑补集转化、二分答案或从终点反推。
- **离线处理**: 询问过多且无修改时，优先考虑莫队、扫描线或离线并查集。

---

## II. 代码重构与工程化规范 (Code Refactoring)

### 2.1 现代 C++ 风格规范
代码的可读性直接影响调试效率。建议采用以下规范：
1. **命名一致性**: 变量名采用小写下划线（`max_val`），函数名采用小写下划线或小驼峰。
2. **宏定义克制**: 仅在必要时使用宏（如 `all(x)`, `rep(i, a, b)`），避免过度封装导致编译错误难定位。
3. **Lambda 局部封装**: 使用 Lambda 函数封装重复的递归（如 DFS）或局部逻辑，减少全局变量污染。

### 2.2 调试系统设计
使用编译选项控制调试信息的输出：
```cpp
#ifdef LOCAL
    #define debug(x) cerr << #x << " = " << (x) << endl
#else
    #define debug(x) 42
#endif
```

---

## III. 自动化验证：对拍系统 (Stress Testing)

对拍是解决“逻辑正确但实现有误”或“思路偏差”的终极武器。

### 3.1 对拍原理
通过**随机数据生成器**，将**待验证代码**（MyCode）与**暴力/正确代码**（Std）的输出进行比对。

### 3.2 跨平台 Python 对拍器实现
<details>
<summary>点击查看对拍器脚本 (checker.py)</summary>

```python
import os
import sys

def run_test():
    cnt = 0
    while True:
        cnt += 1
        # 生成数据
        os.system("gen.exe > in.txt")
        # 运行两个程序
        os.system("my.exe < in.txt > out_my.txt")
        os.system("std.exe < in.txt > out_std.txt")
        
        # 比对结果
        if os.system("fc out_my.txt out_std.txt"): # Windows 用 fc, Linux 用 diff
            print(f"Error found in Test Case {cnt}!")
            break
        else:
            print(f"Test Case {cnt}: Accepted")

if __name__ == "__main__":
    run_test()
```
</details>

### 3.3 C++ 随机数据生成器模版
```cpp
#include <iostream>
#include <random>
#include <chrono>

using namespace std;

int main() {
    // 使用高质量随机数引擎
    mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
    
    int n = rng() % 100 + 1; // 生成 [1, 100] 之间的整数
    cout << n << endl;
    for(int i = 0; i < n; ++i) {
        cout << rng() % 1000 << " ";
    }
    cout << endl;
    return 0;
}
```

---

## IV. 常数优化与底层技巧 (Constant Optimization)

### 4.1 快读快写 (Fast I/O)
在数据量达到 $10^6$ 级时，`scanf` 和 `cin` (未解绑) 会成为瓶颈。
```cpp
inline int read() {
    int x = 0, f = 1; char ch = getchar();
    while (ch < '0' || ch > '9') { if (ch == '-') f = -1; ch = getchar(); }
    while (ch >= '0' && ch <= '9') { x = x * 10 + ch - '0'; ch = getchar(); }
    return x * f;
}
```

### 4.2 缓存与访存优化
- **连续内存**: 尽量使数组访问连续（空间局部性）。
- **位图加速**: 使用 `std::bitset` 将集合运算复杂度从 $O(N)$ 降至 $O(N/w)$，其中 $w=32$ 或 $64$。
- **预处理**: 将循环内不变量提取到循环外，预处理逆元、素数、组合数。

---

## V. C++ 核心工程模版 (Core Templates)

<details>
<summary>1. 万能头文件与工程基础 (Base Template)</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;

#define fastio ios::sync_with_stdio(false), cin.tie(0), cout.tie(0)
#define endl '\n'
#define all(x) (x).begin(), (x).end()
#define pb push_back

using ll = long long;
using pii = pair<int, int>;

void solve() {
    // Your code here
}

int main() {
    fastio;
    int t = 1;
    // cin >> t;
    while(t--) solve();
    return 0;
}
```
</details>

<details>
<summary>2. 矩阵乘法模版 (Matrix Struct)</summary>

```cpp
struct Matrix {
    static const int MOD = 1e9 + 7;
    int n;
    vector<vector<ll>> mat;
    Matrix(int _n) : n(_n), mat(_n, vector<ll>(_n, 0)) {}
    
    Matrix operator*(const Matrix& other) const {
        Matrix res(n);
        for(int i = 0; i < n; ++i)
            for(int k = 0; k < n; ++k)
                for(int j = 0; j < n; ++j)
                    res.mat[i][j] = (res.mat[i][j] + mat[i][k] * other.mat[k][j]) % MOD;
        return res;
    }
};
```
</details>

---

## VI. 实战练习 (Exercises)

### 练习 1：对拍实战
**题目描述**: 给定一个序列，求其最大连续子段和。
**任务**: 编写一个暴力 $O(n^2)$ 的 Std，一个 $O(n)$ 的 MyCode（含逻辑漏洞），并使用 Python 脚本找出错误。

<details>
<summary>查看解析与代码</summary>

**错误点**: 初始最大值应设为 `-1e18` 而非 `0`（考虑全负数情况）。

```cpp
// MyCode (Wrong Version)
ll solve(vector<int>& a) {
    ll res = 0, sum = 0;
    for(int x : a) {
        sum += x;
        res = max(res, sum);
        if(sum < 0) sum = 0;
    }
    return res;
}
```

**对拍发现**: 当输入为 `[-1, -2]` 时，MyCode 输出 `0`，Std 应输出 `-1`。
</details>

### 练习 2：常数优化挑战
**题目描述**: 计算 $10^8$ 次模运算的累加和，对比 `std::vector` 与静态数组在 $10^7$ 数据下的寻址耗时。

<details>
<summary>查看实验结果</summary>

- **静态数组**: 约 120ms
- **vector (含下标访问)**: 约 150ms
- **vector (迭代器)**: 约 130ms
- **技巧**: 使用 `vector::reserve` 避免重分配，开启 `-O3` 后两者差距微乎其微。
</details>
