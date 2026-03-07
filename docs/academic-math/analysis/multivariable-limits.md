---
title: 多元函数的极限与连续 (Multivariable Limits and Continuity)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import SupportingExercises from '@site/src/components/SupportingExercises';

# 第十六章 多元函数的极限与连续

在研究一元函数时，我们是在实数轴 $\mathbb{R}$ 上进行的。多元微积分的研究对象是 $n$ 维欧几里得空间 $\mathbb{R}^n$ 中的点集与函数。本章将把极限与连续的概念推广到高维空间。

## 一、 欧几里得空间与拓扑基础

### 1. 欧几里得空间 $\mathbb{R}^n$
$n$ 维欧几里得空间是所有 $n$ 元有序实数组 $\mathbf{x} = (x_1, x_2, \dots, x_n)$ 的集合。
- **距离 (Distance)**：两点 $\mathbf{x}, \mathbf{y}$ 之间的距离定义为：
  $$d(\mathbf{x}, \mathbf{y}) = \sqrt{\sum_{i=1}^n (x_i - y_i)^2}$$
- **邻域 (Neighborhood)**：点 $\mathbf{x}_0$ 的 $\delta$ 邻域为 $U(\mathbf{x}_0, \delta) = \{ \mathbf{x} \in \mathbb{R}^n \mid d(\mathbf{x}, \mathbf{x}_0) < \delta \}$。

### 2. 点集的分类
- **内点、外点、界点**：根据点与集合的关系及其邻域的性质定义。
- **开集与闭集**：全部由内点组成的集合称为开集；补集为开集的集合称为闭集。
- **开区域 (Region)**：连通的开集。

---

## 二、 多元函数的极限 (Limits)

### 1. 重极限的定义 ($\epsilon-\delta$ 语言)
设 $f(\mathbf{x})$ 在点 $\mathbf{x}_0$ 的某去心邻域 $\mathring{U}(\mathbf{x}_0)$ 内有定义。若对于任意 $\epsilon > 0$，总存在 $\delta > 0$，使得当 $0 < d(\mathbf{x}, \mathbf{x}_0) < \delta$ 时，恒有：
$$|f(\mathbf{x}) - L| < \epsilon$$
则称 $L$ 为 $f(\mathbf{x})$ 当 $\mathbf{x} \to \mathbf{x}_0$ 时的**极限**（或称重极限），记作 $\lim_{\mathbf{x} \to \mathbf{x}_0} f(\mathbf{x}) = L$。

### 2. 重极限与累次极限
- **重极限**：指点以任意方式趋于 $\mathbf{x}_0$。
- **累次极限**：指逐个变量依次取极限，如 $\lim_{x \to x_0} (\lim_{y \to y_0} f(x, y))$。
- **关系**：重极限存在且累次极限也存在时，它们必相等。但两者互不蕴含（一个存在不代表另一个存在）。

### 3. 极限不存在的判定
若沿两条不同的路径趋于同一点时，函数值的极限不同，则该重极限不存在。
> **常用技巧**：考察 $y = kx$ 或 $y = kx^2$ 等路径。

---

## 三、 多元函数的连续性 (Continuity)

### 1. 定义
若 $\lim_{\mathbf{x} \to \mathbf{x}_0} f(\mathbf{x}) = f(\mathbf{x}_0)$，则称 $f$ 在点 $\mathbf{x}_0$ 处**连续**。

### 2. 有界闭区域上连续函数的性质
若 $f$ 在有界闭区域 $D \subset \mathbb{R}^n$ 上连续，则：
1. **有界性定理**：$f$ 在 $D$ 上有界。
2. **最值定理**：$f$ 在 $D$ 上必能取得最大值和最小值。
3. **介值定理**：若 $f(\mathbf{A}) < \mu < f(\mathbf{B})$，则在连接 $\mathbf{A}, \mathbf{B}$ 的连通集内必存在一点 $\mathbf{C}$ 使得 $f(\mathbf{C}) = \mu$。
4. **一致连续性定理**：$f$ 在 $D$ 上一致连续。

---

## 四、 深度实战解析

### 深度例题 1：重极限不存在性的证明
证明 $\lim_{(x, y) \to (0, 0)} \frac{x^2y}{x^4 + y^2}$ 不存在。

<details>
<summary>点击查看解析</summary>

1. **沿直线 $y = kx$**：
   $$\lim_{x \to 0} \frac{x^2(kx)}{x^4 + (kx)^2} = \lim_{x \to 0} \frac{kx^3}{x^4 + k^2x^2} = \lim_{x \to 0} \frac{kx}{x^2 + k^2} = 0$$
   由此似乎极限为 0。

2. **沿抛物线 $y = x^2$**：
   $$\lim_{x \to 0} \frac{x^2(x^2)}{x^4 + (x^2)^2} = \lim_{x \to 0} \frac{x^4}{2x^4} = \frac{1}{2}$$

3. **结论**：
   由于沿不同路径趋于 $(0, 0)$ 时极限值不同（0 与 1/2），故原重极限不存在。
</details>

---

<SupportingExercises 
  topic="多元函数极限与连续" 
  exercises={[
    { index: 23, title: "多元函数极限不存在性证明", slug: "练习-23多元函数极限不存在性" },
    { index: 43, title: "利用极坐标求重极限", slug: "练习-43极坐标求极限" },
    { index: 44, title: "二元函数连续性判定", slug: "练习-44函数连续性判定" }
  ]} 
/>

---
*编者注：多元极限比一元极限复杂得多，核心在于“方向的任意性”。理解这一点是进入高维分析的关键。*
