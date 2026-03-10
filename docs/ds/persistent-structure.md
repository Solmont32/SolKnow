---
title: 可持久化数据结构 (Persistent Structures)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import BilibiliEmbed from '@site/src/components/BilibiliEmbed';
import { History, Layers, Save } from 'lucide-react';

# 可持久化数据结构 (Persistent Structures)

<KnowledgeCard type="info" title="核心定义">
可持久化数据结构支持在修改后保留历史版本，并允许查询甚至修改任意历史版本。其核心技术在于**共用节点**，通过仅新建发生变化的路径节点来节省空间。
</KnowledgeCard>

---

## 1. 可持久化线段树 (主席树)

最早由黄嘉泰（HJT）提出，故常被称为“主席树”。其主要用于解决**静态区间第 $k$ 小**问题。

### 核心思想
每次修改一个节点时，不直接覆盖，而是新建一个节点并复制旧节点信息，同时更新受影响的路径。
- **空间复杂度**：$O(N \log N + M \log N)$。
- **查询**：通过两个版本的线段树相减，得到区间内的数值分布（前缀和思想）。

```cpp
struct Node {
    int l, r, cnt;
} tr[MAXN * 40];

int root[MAXN], idx;

void update(int &u, int p, int l, int r, int v) {
    u = ++idx;
    tr[u] = tr[p]; // 复制旧节点信息
    tr[u].cnt++;
    if (l == r) return;
    int mid = (l + r) >> 1;
    if (v <= mid) update(tr[u].l, tr[p].l, l, mid, v);
    else update(tr[u].r, tr[p].r, mid + 1, r, v);
}
```

---

## 2. 可持久化 Trie (字典树)

类似于主席树，每次插入一个字符串时，仅新建发生变化的路径节点。常用于解决**最大异或和**查询问题。

```cpp
int insert(int p, int val) {
    int root = ++idx;
    int cur = root;
    for (int i = 30; i >= 0; i--) {
        tr[cur] = tr[p];
        int v = (val >> i) & 1;
        tr[cur].s[v] = ++idx;
        cur = tr[cur].s[v];
        p = tr[p].s[v];
        tr[cur].cnt++;
    }
    return root;
}
```

---

## 3. 经典例题

### 例题 1：静态区间第 $k$ 小
给定一个长度为 $n$ 的序列，$m$ 次询问区间 $[l, r]$ 中第 $k$ 小的数。

<details>
<summary>Check Solution (Chairman Tree)</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

const int MAXN = 2e5 + 5;
struct Node {
    int l, r, sum;
} tr[MAXN * 40];

int n, m, idx;
int a[MAXN], root[MAXN];
vector<int> nums;

int build(int l, int r) {
    int u = ++idx;
    if (l == r) return u;
    int mid = (l + r) >> 1;
    tr[u].l = build(l, mid);
    tr[u].r = build(mid + 1, r);
    return u;
}

int update(int p, int l, int r, int x) {
    int u = ++idx;
    tr[u] = tr[p];
    tr[u].sum++;
    if (l == r) return u;
    int mid = (l + r) >> 1;
    if (x <= mid) tr[u].l = update(tr[p].l, l, mid, x);
    else tr[u].r = update(tr[p].r, mid + 1, r, x);
    return u;
}

int query(int p, int q, int l, int r, int k) {
    if (l == r) return l;
    int mid = (l + r) >> 1;
    int cnt = tr[tr[q].l].sum - tr[tr[p].l].sum;
    if (k <= cnt) return query(tr[p].l, tr[q].l, l, mid, k);
    else return query(tr[p].r, tr[q].r, mid + 1, r, k - cnt);
}

int main() {
    scanf("%d %d", &n, &m);
    for (int i = 1; i <= n; i++) {
        scanf("%d", &a[i]);
        nums.push_back(a[i]);
    }
    sort(nums.begin(), nums.end());
    nums.erase(unique(nums.begin(), nums.end()), nums.end());
    
    root[0] = build(0, nums.size() - 1);
    for (int i = 1; i <= n; i++) {
        int x = lower_bound(nums.begin(), nums.end(), a[i]) - nums.begin();
        root[i] = update(root[i-1], 0, nums.size() - 1, x);
    }
    
    while (m--) {
        int l, r, k;
        scanf("%d %d %d", &l, &r, &k);
        printf("%d\n", nums[query(root[l-1], root[r], 0, nums.size() - 1, k)]);
    }
    return 0;
}
```
</details>

---

## 4. 练习库

- [练习 1：最大异或和 (Persistent Trie)](/docs/exercises/cs/algorithm-ds#3-可持久化结构-persistent)

---

## 📺 扩展学习

<div className="bilibili-embed-inner">
  <BilibiliEmbed bvid="BV1pE41197be" />
</div>
