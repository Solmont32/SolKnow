# 并查集 (Disjoint Set Union)

并查集是一种树型的数据结构，用于处理一些不相交集合的合并及查询问题。

## 核心操作
- **Find**: 确定元素属于哪一个子集（包含路径压缩优化）。
- **Union**: 将两个子集合并成一个集合。

## 模板
```cpp
int p[N]; // 存储每个点的父节点

// 初始化
for (int i = 1; i <= n; i ++ ) p[i] = i;

// 返回x的祖先节点 + 路径压缩
int find(int x) {
    if (p[x] != x) p[x] = find(p[x]);
    return p[x];
}

// 合并a和b所在的两个集合
p[find(a)] = find(b);
```
