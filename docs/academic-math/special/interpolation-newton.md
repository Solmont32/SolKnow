---
title: 从两点公式到牛顿插值公式
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 从两点公式到牛顿插值公式

插值法旨在寻找经过一组给定点的多项式。

## 基础插值：两点公式

经过 $(x_0, y_0)$ 和 $(x_1, y_1)$ 的直线方程：

$$P_1(x) = y_0 + \frac{y_1 - y_0}{x_1 - x_0}(x - x_0)$$

## 牛顿插值公式 (Newton Interpolation)

牛顿插值引入了 **差商 (Divided Differences)** 的概念：

$$P_n(x) = f(x_0) + f[x_0, x_1](x - x_0) + \dots + f[x_0, \dots, x_n](x - x_0)\dots(x - x_{n-1})$$

<KnowledgeCard type="info" title="优势">
与拉格朗日插值相比，牛顿插值在增加新节点时无需重新计算所有项，只需增加一个更高阶的差商项。
</KnowledgeCard>
