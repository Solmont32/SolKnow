---
title: 定积分的高级应用
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 定积分的高级应用

本章侧重于利用微元法解决几何与物理中的复杂累积问题。

## 一、 核心知识点讲解

### 1. 微元法 (Differential Element Method)
将整体量 $Q$ 划分为微小的 $dQ$，通过积分求和：$Q = \int_a^b dQ$。

### 2. 弧长积分
曲线 $y = f(x)$ 从 $a$ 到 $b$ 的弧长：
$$L = \int_a^b \sqrt{1 + [f'(x)]^2} dx$$

### 3. 变力做功
设力 $F(x)$ 沿 $x$ 轴移动物体，则做功：
$$W = \int_a^b F(x) dx$$

<KnowledgeCard type="contest" title="算法关联">
在计算几何算法中，**自适应辛普森积分 (Adaptive Simpson's Rule)** 是解决无法求原函数的定积分问题的工业级方案。
</KnowledgeCard>

---

## 二、 经典例题实战

### 例题 1：求变力做功
一个弹簧劲度系数为 $k$，将其从平衡位置拉长 $x_0$ 需要做多少功？

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1.  **力学模型**：根据胡克定律，$F(x) = kx$。
2.  **建立积分**：$W = \int_0^{x_0} kx dx$。
3.  **计算**：
    $$W = \left[ \frac{1}{2}kx^2 \right]_0^{x_0} = \frac{1}{2}kx_0^2$$

#### 答案
$\frac{1}{2}kx_0^2$
</details>
