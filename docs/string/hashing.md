---
title: 字符串哈希与随机化
---

import { Hash, ShieldCheck, Zap, Info, Cpu, Target, Activity } from 'lucide-react';
import CodeCollapse from '@site/src/components/CodeCollapse';

# 字符串哈希：高效判等与碰撞分析

<div className="flex gap-2 mb-6">
  <span className="badge badge--primary"><Hash size={14} className="mr-1" /> 多项式哈希</span>
  <span className="badge badge--success"><ShieldCheck size={14} className="mr-1" /> 双哈希策略</span>
  <span className="badge badge--info"><Activity size={14} className="mr-1" /> 碰撞概率分析</span>
</div>

字符串哈希将任意长度的字符串映射为固定范围的整数，通过 $O(1)$ 的数值比较替代 $O(L)$ 的字符比较，是处理字符串判等、重复性检测的有力武器。

---

## 1. 多项式哈希 (Polynomial Rolling Hash)

### 1.1 形式化定义与一致性分析

对于字符串 $s = s_0 s_1 \dots s_{n-1}$，其多项式哈希定义为：
$$
H(s) = \left( \sum_{i=0}^{n-1} s_i \cdot B^{n-1-i} \right) \pmod M
$$

**一致性保证**：
- **可加性**：$H(S+T) = (H(S) \cdot B^{|T|} + H(T)) \pmod M$。
- **子串提取**：通过预处理前缀哈希 $h[i]$，任何子串 $s[l \dots r]$ 的哈希值均满足：
$$
Hash(s[l \dots r]) = (h[r+1] - h[l] \cdot B^{r-l+1}) \pmod M
$$
这种一致性使得哈希可以无缝对接二分查找等算法，用于求最长公共前缀等问题。

---

## 2. 碰撞概率分析 (Collision Analysis)

### 2.1 理论碰撞概率

**定理**：对于模数为 $M$ 的哈希函数，若进行 $N$ 次比对，发生至少一次碰撞的概率 $P \approx 1 - e^{-\frac{N^2}{2M}}$。

- **单哈希 ($M \approx 10^9$)**：当 $N=10^5$ 时，$P \approx 1 - e^{-5} \approx 0.993$。这意味着单哈希在 $10^5$ 规模的随机数据下极易碰撞。
- **双哈希 ($M \approx 10^{18}$)**：当 $N=10^6$ 时，$P \approx 1 - e^{-5 \cdot 10^{-7}} \approx 0$。安全性极高。

### 2.2 防御 Anti-hash：随机化基数

攻击者可以通过构造特殊的“Thue-Morse 序列”等方式使得特定 $B$ 下的哈希产生碰撞。
**防御方案**：在程序运行时，利用 `std::chrono` 或随机数引擎选择一个随机基数 $B$。
```cpp
mt19937 rng(chrono::steady_clock::now().time_since_epoch().count());
const ull base = uniform_int_distribution<ull>(131, 10007)(rng);
```

---

## 3. 算法实现

<CodeCollapse title="可靠双哈希模板 (C++)" language="cpp">

```cpp
typedef unsigned long long ull;

struct DoubleHash {
    static const ull M1 = 1e9 + 7, M2 = 1e9 + 9;
    static ull B;
    vector<ull> h1, h2, p1, p2;

    static void init_base() {
        if (B == 0) {
            mt19937 rng(time(0));
            B = uniform_int_distribution<ull>(131, 1000)(rng) | 1;
        }
    }

    DoubleHash(string s) {
        init_base();
        int n = s.length();
        h1.resize(n + 1); h2.resize(n + 1);
        p1.resize(n + 1); p2.resize(n + 1);
        p1[0] = p2[0] = 1;
        for (int i = 0; i < n; i++) {
            h1[i + 1] = (h1[i] * B + s[i]) % M1;
            h2[i + 1] = (h2[i] * B + s[i]) % M2;
            p1[i + 1] = (p1[i] * B) % M1;
            p2[i + 1] = (p2[i] * B) % M2;
        }
    }

    pair<ull, ull> get(int l, int r) {
        ull res1 = (h1[r + 1] + M1 - h1[l] * p1[r - l + 1] % M1) % M1;
        ull res2 = (h2[r + 1] + M2 - h2[l] * p2[r - l + 1] % M2) % M2;
        return {res1, res2};
    }
};
ull DoubleHash::B = 0;
```

</CodeCollapse>

---

## 🎯 综合练习

### 练习 1：[Luogu P3370] 字符串哈希模板

> **题目**：求 $N$ 个字符串中不同字符串的个数。

<details>
<summary>Check Solution</summary>

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <set>

using namespace std;

typedef unsigned long long ull;
const ull B = 131;

ull get_hash(string s) {
    ull res = 0;
    for (char c : s) res = res * B + c;
    return res;
}

int main() {
    int n; cin >> n;
    vector<ull> h;
    for (int i = 0; i < n; i++) {
        string s; cin >> s;
        h.push_back(get_hash(s));
    }
    sort(h.begin(), h.end());
    cout << unique(h.begin(), h.end()) - h.begin() << endl;
    return 0;
}
```

</details>

### 练习 2：[Luogu P3501] [POI2010] ANT-Antisymmetry

> **题目**：定义两个字符串“反对称”为：一个串取反（0变1, 1变0）并翻转后与原串相同。求给定 01 串中所有反对称子串的总数。

<details>
<summary>Check Analysis</summary>

**二分 + 哈希**：
1. 反对称子串的长度必然为偶数。
2. 对于每个中心（$i$ 和 $i+1$ 之间），其最长反对称半径具有单调性。
3. 利用哈希判断 $S[i-k \dots i]$ 取反翻转后是否等于 $S[i+1 \dots i+1+k]$。
4. 二分半径长度，求出每个中心的最大半径并累加。

</details>

### 练习 3：[CF 514C] Watto and Mechanism

> **题目**：查询一个字符串是否可以通过恰好修改一个字符，变成模式串集合中的某一个。

<details>
<summary>Check Solution</summary>

**解法**：预处理所有模式串的哈希值存入 `set`。查询时，对查询串枚举修改的每个位置和修改后的每个字符（共 $L \times 2$ 种可能），利用 $O(1)$ 哈希计算修改后的值并在 `set` 中查询。

```cpp
// 核心：修改第 i 位字符由 c1 变为 c2 后的新哈希值
ull new_hash = (old_hash - (ull)c1 * p[len - 1 - i] + (ull)c2 * p[len - 1 - i]);
```

</details>
