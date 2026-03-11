---
title: 圆锥曲线 (Conic Sections)
sidebar_label: 解析几何
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";

import { Target, Zap, Circle, LayoutGrid, Focus } from 'lucide-react';

# <Target className="inline-block mr-2 mb-1" size={32} /> 圆锥曲线 (Conic Sections)

解析几何的核心在于通过坐标法将几何问题代数化。圆锥曲线（椭圆、双曲线、抛物线）是平面解析几何中最具代表性的研究对象。

## 1. 圆锥曲线的统一定义

从二阶曲线的角度看，圆锥曲线可以统一描述为：**到定点（焦点）的距离与到定直线（准线）的距离之比为常数 $e$ 的点的轨迹。**

- 若 $0 < e < 1$，轨迹为 **椭圆**。
- 若 $e = 1$，轨迹为 **抛物线**。
- 若 $e > 1$，轨迹为 **双曲线**。

---

## 2. 核心曲线性质对比

### <Circle className="inline-block mr-1 mb-1" size={24} /> 2.1 椭圆 (Ellipse)

- **定义**：$|PF_1| + |PF_2| = 2a \quad (2a > |F_1F_2|)$
- **标准方程**：$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1 \quad (a > b > 0)$
- **关系式**：$a^2 = b^2 + c^2$
- **离心率**：$e = \frac{c}{a}$

### <Zap className="inline-block mr-1 mb-1" size={24} /> 2.2 双曲线 (Hyperbola)

- **定义**：$||PF_1| - |PF_2|| = 2a \quad (2a < |F_1F_2|)$
- **标准方程**：$\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1 \quad (a, b > 0)$
- **渐近线**：$y = \pm \frac{b}{a}x$
- **关系式**：$c^2 = a^2 + b^2$

### <LayoutGrid className="inline-block mr-1 mb-1" size={24} /> 2.3 抛物线 (Parabola)

- **定义**：点到焦点的距离等于点到准线的距离。
- **标准方程**：$y^2 = 2px \quad (p > 0)$
- **焦点**：$F(\frac{p}{2}, 0)$，**准线**：$x = -\frac{p}{2}$

---

## 3. 焦点半径与几何性质

<KnowledgeCard type="info" title="焦半径公式 (以椭圆为例)">
对于椭圆 $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ 上的点 $P(x_0, y_0)$：
- 左焦半径：$r_1 = |PF_1| = a + ex_0$
- 右焦半径：$r_2 = |PF_2| = a - ex_0$
</KnowledgeCard>

---

## 4. 深度例题：点差法与中点弦问题

### <Focus className="inline-block mr-1 mb-1" size={24} /> 例题：弦中点轨迹

已知椭圆 $C: \frac{x^2}{4} + y^2 = 1$，求斜率为 $1$ 的平行弦的中点轨迹方程。

<details>
<summary>点击查看详细解答 (Check Solution)</summary>

**解：**

1. **设点**：设弦的两个端点为 $A(x_1, y_1), B(x_2, y_2)$，中点为 $M(x, y)$。
2. **列方程组**：
   $$\begin{cases} \frac{x_1^2}{4} + y_1^2 = 1 \quad (1) \\ \frac{x_2^2}{4} + y_2^2 = 1 \quad (2) \end{cases}$$
3. **点差法**：$(1) - (2)$ 得：
   $$\frac{x_1^2 - x_2^2}{4} + (y_1^2 - y_2^2) = 0 \implies \frac{(x_1-x_2)(x_1+x_2)}{4} + (y_1-y_2)(y_1+y_2) = 0$$
4. **引入中点与斜率**：
   代入 $x_1+x_2 = 2x, y_1+y_2 = 2y$ 以及 $k = \frac{y_1-y_2}{x_1-x_2} = 1$：
   $$\frac{1 \cdot 2x}{4} + 1 \cdot 2y = 0 \implies \frac{x}{2} + 2y = 0 \implies y = -\frac{1}{4}x$$
5. **限制范围**：中点必须在椭圆内部，联立 $y = -x/4$ 与椭圆方程：
$$\frac{x^2}{4} + \frac{x^2}{16} = 1 \implies \frac{5x^2}{16} = 1 \implies x^2 = \frac{16}{5}$$
**结论**：中点轨迹方程为 $y = -\frac{1}{4}x$，其中 $x \in (-\frac{4\sqrt{5}}{5}, \frac{4\sqrt{5}}{5})$。
</details>

---

_本章节涵盖了新课标下解析几何的核心思考方式：从几何定义到代数计算的闭环。_
