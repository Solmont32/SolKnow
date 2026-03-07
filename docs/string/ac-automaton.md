# AC 自动机 (Aho-Corasick Automaton)

AC 自动机是一种多模式匹配算法，常用于在一个主文本串中同时查找多个模式串。

## 原理
1. **建立 Trie 树**：将所有模式串插入到一棵 Trie 树中。
2. **建立 fail 指针**：模仿 KMP 的 $next$ 数组，为 Trie 树中的每个节点建立失败指针 $fail$，指向以该节点结尾的后缀中最长的、同时是某个模式串前缀的节点。
3. **建立拓扑结构**（可选）：通过 BFS 构建并应用 $fail$ 转移。

## C++ 核心实现
```cpp
const int MAXN = 100005;
int trie[MAXN][26], fail[MAXN], cnt[MAXN], tot;

void insert(string s) {
    int p = 0;
    for (char c : s) {
        int v = c - 'a';
        if (!trie[p][v]) trie[p][v] = ++tot;
        p = trie[p][v];
    }
    cnt[p]++;
}

void build_fail() {
    queue<int> q;
    for (int i = 0; i < 26; i++)
        if (trie[0][i]) q.push(trie[0][i]);

    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int i = 0; i < 26; i++) {
            if (trie[u][i]) {
                fail[trie[u][i]] = trie[fail[u]][i];
                q.push(trie[u][i]);
            } else {
                trie[u][i] = trie[fail[u]][i]; // 优化路径
            }
        }
    }
}
```

## 复杂度
- **时间复杂度**：预处理 $O(\sum |Pattern|)$，查询 $O(|Text|)$。
- **空间复杂度**：$O(\sum |Pattern| \times \Sigma)$，其中 $\Sigma$ 是字符集大小。
