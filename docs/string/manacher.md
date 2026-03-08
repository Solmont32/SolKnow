# Manacher 算法 (马拉车)

Manacher 算法用于在 $O(n)$ 时间内求解字符串中的最长回文子串。

## 原理

1. **预处理**：在字符间插入特殊符号（如 `#`），将所有回文子串统一转为奇数长度。
2. **状态表示**：$d[i]$ 表示以 $i$ 为中心的最长回文半径。
3. **算法流程**：利用回文串的对称性，结合当前覆盖的最右端回文边界 $R$ 及其中心 $M$，来快速推导当前位置的回文半径。

## C++ 实现

```cpp
string pre(string s) {
    string res = "$#";
    for (char c : s) res += c, res += '#';
    res += '^';
    return res;
}

int manacher(string s) {
    string t = pre(s);
    int n = t.size(), m = 0, r = 0, ans = 0;
    vector<int> d(n);
    for (int i = 1; i < n - 1; i++) {
        d[i] = (i < r) ? min(d[2 * m - i], r - i) : 1;
        while (t[i + d[i]] == t[i - d[i]]) d[i]++;
        if (i + d[i] > r) m = i, r = i + d[i];
        ans = max(ans, d[i] - 1);
    }
    return ans;
}
```

## 优点

相比于中心扩展法的 $O(n^2)$，Manacher 算法通过利用已有的对称性信息实现了真正的线性复杂度。
