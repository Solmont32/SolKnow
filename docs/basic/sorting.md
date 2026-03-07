# 排序算法 (Sorting)

排序算法是将一组数据按照特定顺序进行排列的算法。

## 常用排序
- **快速排序 (Quick Sort)**: 平均时间复杂度 $O(n \log n)$。
- **归并排序 (Merge Sort)**: 稳定排序，时间复杂度始终为 $O(n \log n)$。
- **堆排序 (Heap Sort)**: 利用堆这种数据结构进行排序。

## 快速排序模板
```cpp
void quick_sort(int q[], int l, int r) {
    if (l >= r) return;
    int i = l - 1, j = r + 1, x = q[l + r >> 1];
    while (i < j) {
        do i ++ ; while (q[i] < x);
        do j -- ; while (q[j] > x);
        if (i < j) swap(q[i], q[j]);
    }
    quick_sort(q, l, j), quick_sort(q, j + 1, r);
}
```
