---
title: 字符串算法专项强化练习
sidebar_label: 字符串算法
---

import { Target, Zap, Trophy, BarChart3, ChevronRight, Code2, Layers, Hash, Repeat, GitBranch } from 'lucide-react';

# 字符串算法专项强化练习 (String Algorithms)

> **“在字符的海洋中，寻找模式与结构的必然性。”** —— 本专题涵盖从基础 KMP、Manacher 到高阶 AC 自动机、后缀自动机的全体系练习，配套全量 C++ 工业级实现。

---

## 🪜 练习阶梯与评价标准

| 等级 | 难度目标 | 核心考察点 | 期望达成 |
| :--- | :--- | :--- | :--- |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 模式匹配与回文 | KMP Next 数组、Manacher 半径、双哈希 | 15分钟内手写无 bug 模板 |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 状态机建模 | AC 自动机 Fail 指针、Trie 图、周期性质 | 能够独立处理多模式匹配复杂逻辑 |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span> | 后缀结构应用 | SAM 状态合并、Parent Tree 深度应用 | 具备解决省赛/ACM 字符串压轴题能力 |

---

## 📂 核心习题库

### 1. 基础匹配与回文 (Basic Matching & Palindrome)

#### 练习 1：KMP 字符串匹配 (模板)
**题目描述**：给定模式串 $P$ 和文本串 $S$，找出 $P$ 在 $S$ 中出现的所有起始位置。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**核心逻辑**：
- `ne[i]` 表示 $P[1..i]$ 中最长的相等前后缀。
- **C++ 实现**：
```cpp
#include <iostream>
#include <vector>

using namespace std;

const int N = 1000010;
char s[N], p[N];
int ne[N];

int main() {
    int n, m;
    cin >> n >> p + 1 >> m >> s + 1;

    // 求 next 数组
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

#### 练习 2：Manacher 算法 (最长回文子串)
**题目描述**：给定一个字符串，求其最长回文子串的长度。要求复杂度 $O(n)$。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**核心逻辑**：
- 填充字符 `#` 使奇偶回文统一。
- 维护当前右界最远的回文中心 $id$ 及其半径 $mx$。
- **C++ 实现**：
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

const int N = 20000010;
char a[N], b[N];
int p[N];

int main() {
    scanf("%s", a);
    int n = 0;
    b[n++] = '$', b[n++] = '#';
    for (int i = 0; a[i]; i++) b[n++] = a[i], b[n++] = '#';
    b[n++] = '^';

    int mr = 0, mid = 0, res = 0;
    for (int i = 1; i < n; i++) {
        if (i < mr) p[i] = min(p[2 * mid - i], mr - i);
        else p[i] = 1;
        while (b[i - p[i]] == b[i + p[i]]) p[i]++;
        if (i + p[i] > mr) {
            mr = i + p[i];
            mid = i;
        }
        res = max(res, p[i] - 1);
    }
    cout << res << endl;
    return 0;
}
```
</details>

---

### 2. 状态机与多模式 (Automata & Multi-Pattern)

#### 练习 3：AC 自动机 (模板)
**题目描述**：给定 $n$ 个模式串和 1 个主串，求有多少个模式串在主串中出现。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**核心逻辑**：
- 构建 Trie。
- BFS 构建 Fail 指针。
- **C++ 实现**：
```cpp
#include <iostream>
#include <queue>
#include <cstring>

using namespace std;

const int N = 10010, S = 1000010, M = N * 55;
int tr[M][26], cnt[M], ne[M], idx;
char str[S];

void insert() {
    int p = 0;
    for (int i = 0; str[i]; i++) {
        int u = str[i] - 'a';
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
            int &p = tr[t][i];
            if (!p) p = tr[ne[t]][i];
            else {
                ne[p] = tr[ne[t]][i];
                q.push(p);
            }
        }
    }
}

int main() {
    int n;
    cin >> n;
    while (n--) {
        scanf("%s", str);
        insert();
    }
    build();
    scanf("%s", str);
    int res = 0;
    for (int i = 0, j = 0; str[i]; i++) {
        j = tr[j][str[i] - 'a'];
        int p = j;
        while (p && cnt[p] != -1) {
            res += cnt[p];
            cnt[p] = -1;
            p = ne[p];
        }
    }
    cout << res << endl;
    return 0;
}
```
</details>

---

### 3. 后缀结构进阶 (Suffix Structures)

#### 练习 4：后缀自动机 (SAM) - 不同子串个数
**题目描述**：给定一个字符串，求其不同子串的个数。要求 $O(n)$。

<details>
<summary>Check Solution (C++ Implementation)</summary>

**核心逻辑**：
- 不同子串个数等于 $\sum (len[i] - len[link[i]])$。
- **C++ 实现**：
```cpp
#include <iostream>
#include <cstring>

using namespace std;

const int N = 2000010;
struct Node {
    int len, link;
    int next[26];
} st[N];
int sz, last;

void sam_init() {
    st[0].len = 0;
    st[0].link = -1;
    sz = 1;
    last = 0;
}

void sam_extend(int c) {
    int cur = sz++;
    st[cur].len = st[last].len + 1;
    int p = last;
    while (p != -1 && !st[p].next[c]) {
        st[p].next[c] = cur;
        p = st[p].link;
    }
    if (p == -1) st[cur].link = 0;
    else {
        int q = st[p].next[c];
        if (st[p].len + 1 == st[q].len) st[cur].link = q;
        else {
            int clone = sz++;
            st[clone].len = st[p].len + 1;
            memcpy(st[clone].next, st[q].next, sizeof(st[q].next));
            st[clone].link = st[q].link;
            while (p != -1 && st[p].next[c] == q) {
                st[p].next[c] = clone;
                p = st[p].link;
            }
            st[q].link = st[cur].link = clone;
        }
    }
    last = cur;
}

int main() {
    char s[1000010];
    scanf("%s", s);
    sam_init();
    for (int i = 0; s[i]; i++) sam_extend(s[i] - 'a');

    long long res = 0;
    for (int i = 1; i < sz; i++)
        res += st[i].len - st[st[i].link].len;
    cout << res << endl;
}
```
</details>

---

## 🏆 训练心法
1. **深刻理解 Fail 指针**：Fail 指针指向的是当前状态的最长后缀，且该后缀在自动机中存在。这是所有字符串状态机（KMP, AC, SAM）的核心灵魂。
2. **字符集优化**：对于字符集较大的情况，考虑使用 `std::map` 存储 `next` 数组。
3. **空间换时间**：SAM 的节点数最多是原字符串长度的 2 倍，空间开销大但时间复杂度极优。
