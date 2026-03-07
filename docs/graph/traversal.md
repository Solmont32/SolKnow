# 图的遍历 (Traversal)

图的遍历包括深度优先搜索 (DFS) 和 广度优先搜索 (BFS)。

## 深度优先搜索 (DFS)

### 原理
沿着一条路径探索，直到无法继续，回溯，寻找另一条路径。

### 代码实现 (C++)
```cpp
void dfs(int u) {
    vis[u] = true;
    for (int i = head[u]; i; i = nxt[i]) {
        int v = ver[i];
        if (!vis[v]) dfs(v);
    }
}
```

## 广度优先搜索 (BFS)

### 原理
逐层向外扩张。每次从队列中取出点，将其所有未访问的邻居放入队列。

### 代码实现 (C++)
```cpp
void bfs(int s) {
    queue<int> q;
    q.push(s);
    vis[s] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int i = head[u]; i; i = nxt[i]) {
            int v = ver[i];
            if (!vis[v]) {
                vis[v] = true;
                q.push(v);
            }
        }
    }
}
```

## 应用对比
- **DFS**：路径搜索、回溯搜索、拓扑序基础、强连通分量、连通性判断。
- **BFS**：**无权图上的最短路**、分层搜索、洪水填充 (Flood Fill)。
