---
title: 定积分及其应用 (Definite Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 定积分及其应用 (Definite Integrals)

定积分不仅是一个数值，更是求和极限的艺术。

## 一、 核心知识点讲解

### 1. 牛顿-莱布尼茨公式
若 $F(x)$ 是 $f(x)$ 在 $[a, b]$ 上的原函数，则：
$$\int_a^b f(x) dx = F(b) - F(a)$$

### 2. 几何应用
-   **平面图形面积**：$S = \int_a^b |f(x) - g(x)| dx$。
-   **旋转体体积**：绕 $x$ 轴旋转所得体积 $V = \pi \int_a^b f^2(x) dx$。

### 3. 物理应用
-   **变力做功**：$W = \int_a^b F(x) dx$。

<KnowledgeCard type="tip" title="技巧">
利用 **对称性**（奇偶性）可以大幅简化定积分计算。在对称区间 $[-a, a]$ 上，奇函数积分为 $0$。
</KnowledgeCard>

---

## 二、 经典例题实战

### 例题 1：求旋转体体积
将曲线 $y = \sqrt{x}$ 与直线 $x = 4$ 及 $x$ 轴围成的图形绕 $x$ 轴旋转一周，求所得体积。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1.  **设定积分式**：$V = \pi \int_0^4 (\sqrt{x})^2 dx$。
2.  **化简**：$V = \pi \int_0^4 x dx$。
3.  **计算积分**：
    $$V = \pi \left[ \frac{1}{2}x^2 \right]_0^4 = \pi (\frac{1}{2} \cdot 16 - 0) = 8\pi$$

#### 答案
$8\pi$
</details>
