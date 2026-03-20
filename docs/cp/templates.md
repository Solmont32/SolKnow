# 算法竞赛代码模板

算法竞赛中，熟练掌握常用代码模板可以大大提高编码效率和正确率。

## 基础模板

### 快读快写

```cpp
// 快速IO模板
#include <bits/stdc++.h>
using namespace std;

// 关闭同步，解除绑定
ios::sync_with_stdio(false);
cin.tie(nullptr);
cout.tie(nullptr);

// 快速读入（整数）
inline int read() {
    int x = 0, f = 1;
    char ch = getchar();
    while (ch < '0' || ch > '9') {
        if (ch == '-') f = -1;
        ch = getchar();
    }
    while (ch >= '0' && ch <= '9') {
        x = x * 10 + ch - '0';
        ch = getchar();
    }
    return x * f;
}

// 快速输出
inline void write(int x) {
    if (x < 0) {
        putchar('-');
        x = -x;
    }
    if (x > 9) write(x / 10);
    putchar(x % 10 + '0');
}
```

### 常用宏定义

```cpp
// 常用宏定义
#include <bits/stdc++.h>
using namespace std;

#define ll long long
#define ull unsigned long long
#define pii pair<int, int>
#define pll pair<ll, ll>
#define vi vector<int>
#define vll vector<ll>
#define pb push_back
#define mp make_pair
#define fi first
#define se second
#define all(x) (x).begin(), (x).end()
#define sz(x) (int)(x).size()
#define rep(i, a, b) for (int i = (a); i < (b); i++)
#define per(i, a, b) for (int i = (b) - 1; i >= (a); i--)

const int INF = 0x3f3f3f3f;
const ll LLINF = 0x3f3f3f3f3f3f3f3f;
const int MOD = 1e9 + 7;
const double eps = 1e-9;

// 调试输出
#ifdef DEBUG
#define debug(x) cerr << #x << " = " << (x) << endl
#else
#define debug(x)
#endif
```

## 数据结构模板

### 并查集

```cpp
// 并查集（带路径压缩和按秩合并）
struct UnionFind {
    vector<int> fa, sz;

    UnionFind(int n) {
        fa.resize(n);
        sz.resize(n, 1);
        iota(fa.begin(), fa.end(), 0);
    }

    int find(int x) {
        if (fa[x] != x) fa[x] = find(fa[x]);
        return fa[x];
    }

    bool merge(int x, int y) {
        x = find(x), y = find(y);
        if (x == y) return false;
        if (sz[x] < sz[y]) swap(x, y);
        fa[y] = x;
        sz[x] += sz[y];
        return true;
    }

    bool same(int x, int y) {
        return find(x) == find(y);
    }

    int size(int x) {
        return sz[find(x)];
    }
};
```

### 树状数组

```cpp
// 树状数组（单点修改，区间查询）
struct BIT {
    vector<ll> tree;
    int n;

    BIT(int n = 0) { init(n); }

    void init(int n_) {
        n = n_;
        tree.assign(n + 1, 0);
    }

    void add(int i, ll val) {
        for (; i <= n; i += i & -i) tree[i] += val;
    }

    ll query(int i) {  // 前缀和 [1, i]
        ll res = 0;
        for (; i > 0; i -= i & -i) res += tree[i];
        return res;
    }

    ll query(int l, int r) {  // 区间和 [l, r]
        return query(r) - query(l - 1);
    }
};

// 树状数组（区间修改，单点查询）
struct BITRange {
    BIT bit;

    BITRange(int n = 0) : bit(n) {}

    void add(int l, int r, ll val) {  // 区间加
        bit.add(l, val);
        bit.add(r + 1, -val);
    }

    ll query(int i) {  // 单点查询
        return bit.query(i);
    }
};
```

### 线段树

```cpp
// 线段树（区间修改，区间查询）
struct SegTree {
    struct Node {
        ll sum, lazy;
        Node() : sum(0), lazy(0) {}
    };

    vector<Node> tree;
    vector<ll> arr;
    int n;

    SegTree(int n = 0) { init(n); }

    void init(int n_) {
        n = n_;
        tree.resize(4 * n);
        arr.resize(n + 1);
    }

    void build(int node, int l, int r) {
        if (l == r) {
            tree[node].sum = arr[l];
            return;
        }
        int mid = (l + r) >> 1;
        build(node << 1, l, mid);
        build(node << 1 | 1, mid + 1, r);
        pushup(node);
    }

    void pushup(int node) {
        tree[node].sum = tree[node << 1].sum + tree[node << 1 | 1].sum;
    }

    void pushdown(int node, int l, int r) {
        if (tree[node].lazy) {
            int mid = (l + r) >> 1;
            apply(node << 1, l, mid, tree[node].lazy);
            apply(node << 1 | 1, mid + 1, r, tree[node].lazy);
            tree[node].lazy = 0;
        }
    }

    void apply(int node, int l, int r, ll val) {
        tree[node].sum += (r - l + 1) * val;
        tree[node].lazy += val;
    }

    void update(int node, int l, int r, int ql, int qr, ll val) {
        if (ql <= l && r <= qr) {
            apply(node, l, r, val);
            return;
        }
        pushdown(node, l, r);
        int mid = (l + r) >> 1;
        if (ql <= mid) update(node << 1, l, mid, ql, qr, val);
        if (qr > mid) update(node << 1 | 1, mid + 1, r, ql, qr, val);
        pushup(node);
    }

    ll query(int node, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr) return tree[node].sum;
        pushdown(node, l, r);
        int mid = (l + r) >> 1;
        ll res = 0;
        if (ql <= mid) res += query(node << 1, l, mid, ql, qr);
        if (qr > mid) res += query(node << 1 | 1, mid + 1, r, ql, qr);
        return res;
    }

    // 包装函数
    void update(int l, int r, ll val) { update(1, 1, n, l, r, val); }
    ll query(int l, int r) { return query(1, 1, n, l, r); }
};
```

### 单调栈/队列

```cpp
// 单调栈：求下一个更大/更小的元素
vector<int> nextGreater(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, -1);
    stack<int> st;

    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[st.top()] < nums[i]) {
            res[st.top()] = i;
            st.pop();
        }
        st.push(i);
    }
    return res;
}

// 单调队列：滑动窗口最值
vector<int> slidingWindowMax(vector<int>& nums, int k) {
    deque<int> dq;  // 存储下标，保持单调递减
    vector<int> res;

    for (int i = 0; i < nums.size(); i++) {
        // 移除不在窗口内的元素
        if (!dq.empty() && dq.front() <= i - k) dq.pop_front();

        // 保持单调性
        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();

        dq.push_back(i);

        // 记录结果
        if (i >= k - 1) res.push_back(nums[dq.front()]);
    }
    return res;
}
```

## 图论模板

### 最短路

```cpp
// Dijkstra（堆优化）
using pll = pair<ll, int>;

vector<ll> dijkstra(int start, vector<vector<pll>>& graph) {
    int n = graph.size();
    vector<ll> dist(n, LLINF);
    vector<bool> vis(n, false);
    priority_queue<pll, vector<pll>, greater<pll>> pq;

    dist[start] = 0;
    pq.push({0, start});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (vis[u]) continue;
        vis[u] = true;

        for (auto [w, v] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}

// SPFA（可判负环）
bool spfa(int start, vector<vector<pll>>& graph, vector<ll>& dist) {
    int n = graph.size();
    dist.assign(n, LLINF);
    vector<bool> inq(n, false);
    vector<int> cnt(n, 0);
    queue<int> q;

    dist[start] = 0;
    q.push(start);
    inq[start] = true;

    while (!q.empty()) {
        int u = q.front(); q.pop();
        inq[u] = false;

        for (auto [w, v] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                cnt[v] = cnt[u] + 1;
                if (cnt[v] >= n) return false;  // 存在负环
                if (!inq[v]) {
                    q.push(v);
                    inq[v] = true;
                }
            }
        }
    }
    return true;
}

// Floyd（多源最短路）
void floyd(vector<vector<ll>>& dist, int n) {
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
}
```

### 最小生成树

```cpp
// Kruskal算法
struct Edge {
    int u, v, w;
    bool operator<(const Edge& other) const {
        return w < other.w;
    }
};

ll kruskal(vector<Edge>& edges, int n) {
    sort(edges.begin(), edges.end());
    UnionFind uf(n);

    ll mst_weight = 0;
    int cnt = 0;

    for (auto& e : edges) {
        if (uf.merge(e.u, e.v)) {
            mst_weight += e.w;
            cnt++;
            if (cnt == n - 1) break;
        }
    }

    return cnt == n - 1 ? mst_weight : -1;  // -1表示图不连通
}

// Prim算法
ll prim(vector<vector<pll>>& graph, int n) {
    vector<ll> dist(n, LLINF);
    vector<bool> vis(n, false);
    dist[0] = 0;

    ll mst_weight = 0;

    for (int i = 0; i < n; i++) {
        int u = -1;
        for (int j = 0; j < n; j++)
            if (!vis[j] && (u == -1 || dist[j] < dist[u]))
                u = j;

        if (dist[u] == LLINF) return -1;  // 图不连通

        vis[u] = true;
        mst_weight += dist[u];

        for (auto [w, v] : graph[u])
            if (!vis[v] && w < dist[v])
                dist[v] = w;
    }

    return mst_weight;
}
```

## 数学模板

### 快速幂与逆元

```cpp
// 快速幂
ll qpow(ll a, ll b, ll mod = MOD) {
    ll res = 1;
    a %= mod;
    while (b > 0) {
        if (b & 1) res = res * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return res;
}

// 费马小定理求逆元（mod为质数）
ll inv(ll a, ll mod = MOD) {
    return qpow(a, mod - 2, mod);
}

// 扩展欧几里得求逆元
ll exgcd(ll a, ll b, ll &x, ll &y) {
    if (b == 0) {
        x = 1; y = 0;
        return a;
    }
    ll d = exgcd(b, a % b, y, x);
    y -= (a / b) * x;
    return d;
}

ll inv_gcd(ll a, ll mod) {
    ll x, y;
    ll d = exgcd(a, mod, x, y);
    if (d != 1) return -1;  // 逆元不存在
    return (x % mod + mod) % mod;
}
```

### 组合数

```cpp
// 预处理阶乘和逆元，O(n)预处理，O(1)查询
struct Combination {
    vector<ll> fac, ifac;
    int n;

    Combination(int n = 0) { init(n); }

    void init(int n_) {
        n = n_;
        fac.resize(n + 1);
        ifac.resize(n + 1);
        fac[0] = 1;
        for (int i = 1; i <= n; i++) fac[i] = fac[i-1] * i % MOD;
        ifac[n] = qpow(fac[n], MOD - 2);
        for (int i = n - 1; i >= 0; i--) ifac[i] = ifac[i+1] * (i+1) % MOD;
    }

    ll C(int n, int m) {
        if (m < 0 || m > n) return 0;
        return fac[n] * ifac[m] % MOD * ifac[n-m] % MOD;
    }

    ll A(int n, int m) {
        if (m < 0 || m > n) return 0;
        return fac[n] * ifac[n-m] % MOD;
    }
};
```

## 字符串模板

### KMP算法

```cpp
// KMP字符串匹配
vector<int> getNext(const string& pattern) {
    int m = pattern.size();
    vector<int> next(m, 0);

    for (int i = 1, j = 0; i < m; i++) {
        while (j > 0 && pattern[i] != pattern[j]) j = next[j-1];
        if (pattern[i] == pattern[j]) j++;
        next[i] = j;
    }
    return next;
}

vector<int> kmp(const string& text, const string& pattern) {
    vector<int> next = getNext(pattern);
    vector<int> res;
    int n = text.size(), m = pattern.size();

    for (int i = 0, j = 0; i < n; i++) {
        while (j > 0 && text[i] != pattern[j]) j = next[j-1];
        if (text[i] == pattern[j]) j++;
        if (j == m) {
            res.push_back(i - m + 1);
            j = next[j-1];
        }
    }
    return res;
}
```

## 使用建议

1. **模板要理解**：不要死记硬背，理解原理才能灵活运用
2. **多打多练**：模板要练到闭着眼睛都能敲对
3. **根据题目调整**：模板是基础，根据具体题目做适配
4. **保持简洁**：比赛时尽量用自己最熟悉的版本
