---
title: 向量 (Vectors)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 向量 (Vectors)

向量是既有大小又有方向的量，是几何与代数的桥梁。

## 线性运算
-   **加法**：三角形法则或平行四边形法则。
-   **数乘**：改变长度和方向（同向或反向）。

## 数量积 (Dot Product)
$\mathbf{a} \cdot \mathbf{b} = |\mathbf{a}||\mathbf{b}|\cos\theta$。
- **坐标表示**：$x_1x_2 + y_1y_2$。
- **垂直判定**：$\mathbf{a} \cdot \mathbf{b} = 0 \iff \mathbf{a} \perp \mathbf{b}$。

<KnowledgeCard type="info" title="几何意义">
数量积可以看作是一个向量在另一个向量方向上的投影与该向量模的乘积。
</KnowledgeCard>

## 向量在竞赛中的应用
在计算几何中，**叉积 (Cross Product)** 常用于判断点与线的相对位置及计算多边形面积。
$|\mathbf{a} \times \mathbf{b}| = |\mathbf{a}||\mathbf{b}|\sin\theta$。
