---
title: 字典树 (Trie)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Share2, Search, Type, Binary } from 'lucide-react';

# 字典树 (Trie)

<KnowledgeCard type="info" title="核心定义">
字典树（又称前缀树）是一种用于高效存储和检索字符串数据集中的键的树形结构。其核心思想是利用**公共前缀**来减少查询时间并节省存储空间。
</KnowledgeCard>

---

## 1. 基本原理

- **节点共享**：具有相同前缀的字符串共享树中的路径。
- **标记结尾**：每个节点通常包含一个布尔值或计数器，标记该节点是否为某个单词的结束。

### 复杂度分析

- **插入/查询**：$O(L)$，其中 $L$ 是字符串长度。
- **空间**：$O(N \cdot \Sigma)$，其中 $N$ 是节点总数，$\Sigma$ 是字符集大小。

---

## 2. 01-Trie (二进制字典树)

01-Trie 是 Trie 的一种特殊形式，用于处理二进制数值。每个节点只有两个子节点：`0` 和 `1`。

### 2.1 最大异或和

通过 01-Trie，我们可以在 $O(\log V)$ 时间内找到与给定数值 $x$ 异或结果最大的数。

- **策略**：在树中贪心地寻找与 $x$ 当前位**相反**的路径。如果相反位存在，则向该方向移动并更新结果；否则向相同位移动。

---

## 3. 经典例题

### 例题 1：最大异或对

给定 $n$ 个非负整数，求其中两个数异或的最大值。

<details>
<summary>Check Solution (01-Trie Implementation)</summary>

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 100010, M = 31 * N;
int n;
int a[N], son[M][2], idx;

void insert(int x) {
    int p = 0;
    for (int i = 30; i >= 0; i--) {
        int &s = son[p][x >> i & 1];
        if (!s) s = ++idx;
        p = s;
    }
}

int query(int x) {
    int p = 0, res = 0;
    for (int i = 30; i >= 0; i--) {
        int s = x >> i & 1;
        if (son[p][!s]) {
            res += 1 << i;
            p = son[p][!s];
        } else {
            p = son[p][s];
        }
    }
    return res;
}

int main() {
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
        insert(a[i]);
    }

    int res = 0;
    for (int i = 0; i < n; i++) res = max(res, query(a[i]));

    printf("%d\n", res);
    return 0;
}
```

</details>

---

## 4. 应用场景

1. **自动补全**：利用前缀匹配快速定位候选词。
2. **IP 路由**：最长前缀匹配 (LPM) 是路由器转发逻辑的基础。
3. **数据压缩**：Huffman 编码及其变体常结合 Trie 结构实现。

---

## 5. 练习库

- **练习 1：于是他狂奔向岛** - 结合 01-Trie 与区间异或。
- **练习 2：LCP 查询** - 利用 Trie 树或后缀结构解决最长公共前缀问题。
