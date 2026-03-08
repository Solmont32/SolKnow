---
title: 圆锥曲线 (Conics)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 圆锥曲线 (Conics)

## 椭圆 (Ellipse)

到两定点距离之和等于定值的点的轨迹。

- **标准方程**：$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1 \quad (a > b > 0)$。
- **离心率**：$e = \frac{c}{a} \in (0, 1)$。

## 双曲线 (Hyperbola)

到两定点距离之差的绝对值等于定值的点的轨迹。

- **标准方程**：$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$。
- **渐近线**：$y = \pm \frac{b}{a}x$。

## 抛物线 (Parabola)

到定点距离等于到定直线距离的点的轨迹。

- **标准方程**：$y^2 = 2px$。

<KnowledgeCard type="warning" title="常见陷阱">
计算圆锥曲线时，务必注意 **焦点位置**（是在 $x$ 轴还是 $y$ 轴）以及 **离心率的定义域**。
</KnowledgeCard>
