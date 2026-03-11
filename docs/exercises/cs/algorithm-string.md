---
title: 字符串算法专项强化练习
sidebar_label: 字符串算法
---

import { Target, Zap, Trophy, BarChart3, ChevronRight, Code2, Layers } from 'lucide-react';

# 字符串算法专项强化练习

> **“字符串是信息的载体。高效的模式匹配与特征提取，是处理大规模文本数据的核心。”** —— 本专题涵盖 KMP、AC 自动机、后缀结构与字符串哈希。

---

## 🪜 练习阶梯与评价标准

| 等级                                                                     | 难度目标       | 核心考察点                         | 期望达成                           |
| :----------------------------------------------------------------------- | :------------- | :--------------------------------- | :--------------------------------- |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 模板复现与哈希 | KMP next 数组、哈希碰撞处理        | 能够 5 分钟内写出 KMP              |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 自动机与回文   | AC 自动机多模式匹配、Manacher 算法 | 理解 Fail 指针的转移本质           |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span>  | 后缀结构与综合 | 后缀数组 (SA)、后缀自动机 (SAM)    | 具备处理子串统计与最长公共子串能力 |

---

## 🎯 考点覆盖模型 (Knowledge Matrix)

| 知识模块         | 核心考点                             | 关联习题   | 典型技巧/模型            |
| :--------------- | :----------------------------------- | :--------- | :----------------------- |
| **单模式匹配**   | KMP (Next 数组)、字符串哈希          | 练习 1, 2  | 失配函数、滚动哈希       |
| **回文串分析**   | Manacher 算法、回文树 (PAM)          | 练习 2     | $O(n)$ 回文半径扩展      |
| **多模式匹配**   | AC 自动机 (Fail 指针)、Trie 树       | 练习 3     | 字典树上的 BFS 构造      |
| **后缀结构**     | 后缀数组 (SA)、LCP、后缀自动机 (SAM) | 练习 4     | 状态压缩、DA 算法        |
| **字符串变换**   | 最小表示法、Burrows-Wheeler 变换     | 练习 5     | 双指针比较               |

---

## 📂 核心习题库

### Level A：基础巩固 (Foundations)

#### 练习 1：KMP 字符串匹配

**题目描述**：给定一个模式串 $P$ 和一个文本串 $S$，请输出 $P$ 在 $S$ 中出现的所有起始下标。

- **考察点**：`next` 数组的构造与匹配流程。

<details>
<summary>Check Solution (C++ Implementation)</summary>

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

const int N = 1000010;
int ne[N];
char s[N], p[N];

int main() {
    int n, m;
    cin >> n >> p + 1 >> m >> s + 1;

    // 构造 next 数组
    for (int i = 2, j = 0; i <= n; i++) {
        while (j && p[i] != p[j + 1]) j = ne[j];
        if (p[i] == p[j + 1]) j++;
        ne[i] = j;
    }

    // 匹配
    for (int i = 1, j = 0; i <= m; i++) {
        while (j && s[i] != p[j + 1]) j = ne[j];
        if (s[i] == p[j + 1]) j++;
        if (j == n) {
            printf("%d ", i - n);
            j = ne[j];
        }
    }
    return 0;
}
```

</details>

#### 练习 2：字符串哈希 (String Hashing)

**题目描述**：给定一个长度为 $n$ 的字符串，查询 $m$ 次，每次查询两段区间 $[l_1, r_1]$ 和 $[l_2, r_2]$ 的子串是否相同。

- **核心思想**：$O(n)$ 预处理哈希前缀和，$O(1)$ 提取子串哈希值。

<details>
<summary>Check Solution (C++ Implementation)</summary>

```cpp
#include <iostream>
using namespace std;

typedef unsigned long long ULL;
const int N = 100010, P = 131; // P 取 131 或 13331 经验值
ULL h[N], p[N];

ULL get(int l, int r) {
    return h[r] - h[l - 1] * p[r - l + 1];
}

int main() {
    int n, m;
    char str[N];
    scanf("%d%d%s", &n, &m, str + 1);

    p[0] = 1;
    for (int i = 1; i <= n; i++) {
        p[i] = p[i - 1] * P;
        h[i] = h[i - 1] * P + str[i];
    }

    while (m--) {
        int l1, r1, l2, r2;
        scanf("%d%d%d%d", &l1, &r1, &l2, &r2);
        if (get(l1, r1) == get(l2, r2)) puts("Yes");
        else puts("No");
    }
    return 0;
}
```

</details>

---

### Level B：综合提升 (Intermediate)

#### 练习 3：AC 自动机（多模式匹配）

**题目描述**：给定 $n$ 个单词和一篇文章，问每个单词在文章中出现了多少次。

- **关键点**：在 Trie 树上建立 Fail 指针，并利用拓扑排序优化计数。

<details>
<summary>Check Solution (C++ Implementation - Optimized)</summary>

```cpp
#include <iostream>
#include <queue>
#include <string>

using namespace std;

const int N = 200010;
int tr[N][26], cnt[N], ne[N], idx;
int q[N], deg[N];

void insert(string s) {
    int p = 0;
    for (auto c : s) {
        int u = c - 'a';
        if (!tr[p][u]) tr[p][u] = ++idx;
        p = tr[p][u];
    }
    cnt[p]++;
}

void build() {
    queue<int> q;
    for (int i = 0; i < 26; i++)
        if (tr[0][i]) q.push(tr[0][i]);

    while (q.size()) {
        int t = q.front();
        q.pop();
        for (int i = 0; i < 26; i++) {
            int p = tr[t][i];
            if (!p) tr[t][i] = tr[ne[t]][i];
            else {
                ne[p] = tr[ne[t]][i];
                deg[ne[p]]++;
                q.push(p);
            }
        }
    }
}
```

</details>

---

### Level C：竞赛挑战 (Advanced)

#### 练习 4：后缀数组 (SA) - 最长公共前缀

**题目描述**：给定一个字符串，求两个后缀 $Suffix(i)$ 和 $Suffix(j)$ 的最长公共前缀 (LCP)。

- **核心工具**：使用倍增法构造 SA 数组和 $height$ 数组。

<details>
<summary>Check Solution (C++ Implementation)</summary>

```cpp
#include <iostream>
#include <algorithm>
#include <string.h>

using namespace std;

const int N = 100010;
int n, m;
int x[N], y[N], c[N], sa[N], rk[N], height[N];
char s[N];

void get_sa() {
    for (int i = 1; i <= n; i++) c[x[i] = s[i]]++;
    for (int i = 2; i <= m; i++) c[i] += c[i - 1];
    for (int i = n; i; i--) sa[c[x[i]]--] = i;
    for (int k = 1; k <= n; k <<= 1) {
        int num = 0;
        for (int i = n - k + 1; i <= n; i++) y[++num] = i;
        for (int i = 1; i <= n; i++) if (sa[i] > k) y[++num] = sa[i] - k;
        for (int i = 1; i <= m; i++) c[i] = 0;
        for (int i = 1; i <= n; i++) c[x[i]]++;
        for (int i = 2; i <= m; i++) c[i] += c[i - 1];
        for (int i = num; i; i--) sa[c[x[y[i]]]--] = y[i], y[i] = 0;
        swap(x, y);
        x[sa[1]] = 1, num = 1;
        for (int i = 2; i <= n; i++)
            x[sa[i]] = (y[sa[i]] == y[sa[i - 1]] && y[sa[i] + k] == y[sa[i - 1] + k]) ? num : ++num;
        if (num == n) break;
        m = num;
    }
}

void get_height() {
    for (int i = 1; i <= n; i++) rk[sa[i]] = i;
    for (int i = 1, k = 0; i <= n; i++) {
        if (rk[i] == 1) continue;
        if (k) k--;
        int j = sa[rk[i] - 1];
        while (i + k <= n && j + k <= n && s[i + k] == s[j + k]) k++;
        height[rk[i]] = k;
    }
}
```

</details>

---

## 🏆 训练建议

1. **理解 Fail 的几何含义**：AC 自动机中的 Fail 指针本质上是在寻找最长的、且作为 Trie 中路径存在的、当前状态的后缀。
2. **后缀结构的统一性**：后缀数组虽然难写，但配合 ST 表处理 LCP 问题的能力极强；后缀自动机 (SAM) 则是更强大的线性结构，建议同步掌握。
3. **哈希作为保底**：在处理不涉及复杂子串关系的字符串问题时，双哈希往往能以极简的代码量过题。
