---
title: 练习库：计算几何
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 练习库：计算几何

本库涵盖凸包、旋转卡壳及相关交叉应用的深度练习题，旨在通过实战巩固理论知识。

---

## 1. 凸包 (Convex Hull)

### 练习 1：圈地养牛 (P2742 - Template)
给定 $n$ 个点，求包含所有点的最小凸多边形的周长。

<details>
<summary>Check Solution</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
#include <iomanip>
using namespace std;

typedef double DB;
struct Point {
    DB x, y;
    bool operator< (const Point& b) const {
        if (x != b.x) return x < b.x;
        return y < b.y;
    }
};

DB cross(Point a, Point b, Point c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

DB dist(Point a, Point b) {
    return sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
}

int main() {
    int n; cin >> n;
    vector<Point> p(n);
    for (int i = 0; i < n; i++) cin >> p[i].x >> p[i].y;
    sort(p.begin(), p.end());

    vector<Point> hull;
    // Lower
    for (int i = 0; i < n; i++) {
        while (hull.size() > 1 && cross(hull[hull.size() - 2], hull.back(), p[i]) <= 0)
            hull.pop_back();
        hull.push_back(p[i]);
    }
    // Upper
    int lower_size = hull.size();
    for (int i = n - 2; i >= 0; i--) {
        while (hull.size() > lower_size && cross(hull[hull.size() - 2], hull.back(), p[i]) <= 0)
            hull.pop_back();
        hull.push_back(p[i]);
    }
    hull.pop_back();

    DB ans = 0;
    for (int i = 0; i < hull.size(); i++)
        ans += dist(hull[i], hull[(i + 1) % hull.size()]);
    
    cout << fixed << setprecision(2) << ans << endl;
    return 0;
}
```
</details>

---

## 2. 旋转卡壳 (Rotating Calipers)

### 练习 1：Beauty Contest (P1185)
求 $n$ 个点对中的最大距离的平方（凸包直径）。

<details>
<summary>Check Solution</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

typedef long long LL;
struct Point {
    LL x, y;
    bool operator< (const Point& b) const {
        if (x != b.x) return x < b.x;
        return y < b.y;
    }
};

LL cross(Point a, Point b, Point c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

LL distSq(Point a, Point b) {
    return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
}

int main() {
    int n; cin >> n;
    vector<Point> p(n);
    for (int i = 0; i < n; i++) cin >> p[i].x >> p[i].y;
    sort(p.begin(), p.end());

    vector<Point> h;
    for (int i = 0; i < n; i++) {
        while (h.size() > 1 && cross(h[h.size() - 2], h.back(), p[i]) <= 0) h.pop_back();
        h.push_back(p[i]);
    }
    int lower_size = h.size();
    for (int i = n - 2; i >= 0; i--) {
        while (h.size() > lower_size && cross(h[h.size() - 2], h.back(), p[i]) <= 0) h.pop_back();
        h.push_back(p[i]);
    }
    h.pop_back();

    int m = h.size();
    if (m == 2) { cout << distSq(h[0], h[1]) << endl; return 0; }

    LL maxD = 0;
    for (int i = 0, k = 1; i < m; i++) {
        while (abs(cross(h[i], h[(i + 1) % m], h[(k + 1) % m])) > 
               abs(cross(h[i], h[(i + 1) % m], h[k]))) {
            k = (k + 1) % m;
        }
        maxD = max(maxD, max(distSq(h[i], h[k]), distSq(h[(i + 1) % m], h[k])));
    }
    cout << maxD << endl;
    return 0;
}
```
</details>

---

## 3. 进阶交叉应用 (Advanced)

### 练习 1：最小外接矩形 (Minimum Enclosing Rectangle)
给定一组点，求包含所有点的面积最小的矩形的面积及四个顶点。

<details>
<summary>Hint</summary>
利用旋转卡壳同时维护四个“卡子”：一个平行于当前边，两个垂直于当前边，一个平行于当前边但在对侧。
</details>

<details>
<summary>Check Solution (Core Logic)</summary>

```cpp
// 旋转卡壳核心：四个指针维护
// l: 最左点, r: 最右点, u: 最上点
for (int i = 0, r = 1, u = 1, l = 1; i < m; i++) {
    Point a = h[i], b = h[(i + 1) % m];
    DB lenAB = dist(a, b);
    // 更新上点 (距离最大)
    while (cross(a, b, h[(u + 1) % m]) > cross(a, b, h[u])) u = (u + 1) % m;
    // 更新右点 (投影最大)
    while (dot(b - a, h[(r + 1) % m] - a) > dot(b - a, h[r] - a)) r = (r + 1) % m;
    if (i == 0) l = r;
    // 更新左点 (投影最小)
    while (dot(b - a, h[(l + 1) % m] - a) < dot(b - a, h[l] - a)) l = (l + 1) % m;
    
    DB d = cross(a, b, h[u]) / lenAB; // 矩形高
    DB w = (dot(b - a, h[r] - a) - dot(b - a, h[l] - a)) / lenAB; // 矩形宽
    ans = min(ans, d * w);
}
```
</details>
