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

### 1.1 形式化定义

对于字符串 $s = s_0 s_1 \dots s_{n-1}$，其多项式哈希定义为：
$$
H(s) = \left( \sum_{i=0}^{n-1} s_i \cdot B^{n-1-i} \right) \pmod M
$$
其中 $B$ 为进制基数，$M$ 为大质数模数。

### 1.2 滚动性质 (Rolling Property)

子串 $s[l \dots r]$ 的哈希值可以通过预处理前缀哈希 $h[i]$ 在 $O(1)$ 时间内求得：
$$
Hash(s[l \dots r]) = (h[r+1] - h[l] \cdot B^{r-l+1}) \pmod M
$$

---

## 2. 碰撞概率分析 (Collision Analysis)

### 2.1 生日悖论与碰撞风险

**定理**：对于模数为 $M$ 的哈希函数，若进行 $N$ 次不同的比对，发生至少一次碰撞的概率 $P$ 近似为：
$$
P \approx 1 - e^{-\frac{N^2}{2M}}
$$
- **单质数模数 ($10^9$)**：当 $N \approx 10^5$ 时，碰撞概率已显著增加，极易被精心构造的数据（Anti-hash）击破。
- **双哈希策略**：使用两个互质的大模数 $M_1, M_2$，等效模数为 $M_1 \cdot M_2 \approx 10^{18}$，极大提升了安全性。

### 2.2 防御策略：随机化

**核心策略**：基数 $B$ 与模数 $M$ 的选择应具有随机性。
- 在程序运行时使用时间戳生成随机基数：`B = 131 + rand() % 1000`。
- 随机基数使得攻击者无法预先构造 Anti-hash 数据，因为攻击者不知道你当前的基数。

---

## 3. 算法实现

<CodeCollapse title="双哈希模板 (C++)" language="cpp">

```cpp
typedef unsigned long long ull;

struct DoubleHash {
    const ull M1 = 1e9 + 7, M2 = 1e9 + 9;
    ull B;
    vector<ull> h1, h2, p1, p2;

    DoubleHash(string s) {
        int n = s.length();
        B = 131 + (ull)new char % 1331; // 简单随机化
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

    pair<ull, ull> get(int l, int r) { // [l, r] 0-indexed
        ull res1 = (h1[r + 1] + M1 - h1[l] * p1[r - l + 1] % M1) % M1;
        ull res2 = (h2[r + 1] + M2 - h2[l] * p2[r - l + 1] % M2) % M2;
        return {res1, res2};
    }
};
```

</CodeCollapse>

---

## 4. 经典应用

### 例题：[Luogu P3370] 字符串哈希模板

> **题目**：给定 $N$ 个字符串，求其中不同字符串的个数。
> **思路**：对每个字符串计算哈希值，存入 `std::set` 或排序后去重。

<details>
<summary>Check Analysis</summary>

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

typedef unsigned long long ull;
ull get_hash(string s) {
    ull res = 0, base = 131;
    for (char c : s) res = res * base + (ull)c;
    return res;
}

int main() {
    int n; cin >> n;
    vector<ull> hashes;
    for (int i = 0; i < n; i++) {
        string s; cin >> s;
        hashes.push_back(get_hash(s));
    }
    sort(hashes.begin(), hashes.end());
    cout << unique(hashes.begin(), hashes.end()) - hashes.begin() << endl;
    return 0;
}
```

</details>

---

## 🎯 练习题清单

1. **[Luogu P3370] 字符串哈希模板**
2. **[POJ 1200] Crazy Search**：不同子串个数统计。
3. **[HDU 4821] String**：哈希 + 滑动窗口。
4. **[CF 514C] Watto and Mechanism**：哈希 + 容错匹配（修改一个字符）。
