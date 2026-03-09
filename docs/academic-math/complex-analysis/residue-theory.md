---
title: 留数理论、辐角原理与积分应用 (Residue Theory)
description: 掌握留数定理及其在计算实积分、求解方程根分布中的强大作用
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";
import { motion } from "framer-motion";
import { Calculator, Target, Zap } from "lucide-react";

# 留数理论、辐角原理与积分应用

留数定理是复分析计算的核心工具，它将复杂的路径积分转化为孤立奇点处的代数运算。

---

## 一、留数 (Residue) 的定义与计算

### 1. 定义
设 $z_0$ 是 $f(z)$ 的孤立奇点，$C$ 为包围 $z_0$ 的正向简单闭曲线，则留数定义为：
$$ \text{Res}(f, z_0) = \frac{1}{2\pi i} \oint_C f(z) \, dz $$
在 Laurent 展开中，$\text{Res}(f, z_0) = c_{-1}$。

### 2. 计算公式（$m$ 阶极点）
若 $z_0$ 是 $f(z)$ 的 $m$ 阶极点，则：
$$ \text{Res}(f, z_0) = \frac{1}{(m-1)!} \lim_{z \to z_0} \frac{d^{m-1}}{dz^{m-1}} \left[ (z - z_0)^m f(z) \right] $$

---

## 二、留数定理 (Residue Theorem)

设 $f(z)$ 在闭曲线 $C$ 围成的区域 $D$ 内除有限个孤立奇点 $z_k$ 外解析，则：
$$ \oint_C f(z) \, dz = 2\pi i \sum_{k=1}^n \text{Res}(f, z_k) $$

---

## 三、辐角原理与 Rouché 定理

### 1. 辐角原理 (Argument Principle)
设 $f(z)$ 在 $D$ 内除极点外解析，在边界 $C$ 上不为 0。则沿 $C$ 正向绕行时 $f(z)$ 的辐角增量为：
$$ \frac{1}{2\pi i} \oint_C \frac{f'(z)}{f(z)} \, dz = N - P $$
其中 $N$ 为圆内零点个数，$P$ 为圆内极点个数（按重数计）。

### 2. Rouché 定理
**定理内容**：若在 $C$ 上满足 $|f(z)| > |g(z)|$，则 $f(z)$ 与 $f(z) + g(z)$ 在 $C$ 内有相同数量的零点。
> **应用**：这是求解高次代数方程根分布最有效的工具。

---

## 四、利用留数计算实积分

1.  **三角函数定积分**: $\int_0^{2\pi} R(\cos \theta, \sin \theta) \, d\theta$，通过令 $z = e^{i\theta}$ 转化为单位圆积分。
2.  **无穷区间实积分**: $\int_{-\infty}^{\infty} f(x) \, dx$，通过上半平面大半圆路径积分实现。
3.  **含有 Jordan 引理的积分**: 如 $\int_0^\infty \frac{\sin x}{x} dx$。

---

## 🎯 经典练习

### 练习 1：辐角原理的应用
确定 $f(z) = z^4 - 3z + 1$ 在单位圆 $|z| < 1$ 内的零点个数。

<details>
<summary>点击查看解析</summary>

令 $f(z) = -3z + 1$（主导项），$g(z) = z^4$。
在 $|z|=1$ 上：
$|f(z)| = |-3z + 1| \ge 3|z| - 1 = 2$
$|g(z)| = |z|^4 = 1$
显然 $|f(z)| > |g(z)|$。
根据 Rouché 定理，$f(z) + g(z) = z^4 - 3z + 1$ 的零点个数与 $f(z) = -3z + 1$ 相同。
$f(z) = -3z + 1$ 只有一个零点 $z = 1/3$ 在圆内。
故原函数在圆内有 **1 个零点**。

</details>

### 练习 2：计算复积分
计算 $\oint_{|z|=2} \frac{z^2}{z-1} e^{1/z} \, dz$。

<details>
<summary>点击查看解析</summary>

被积函数在圆内有两个奇点：$z=1$（一阶极点）和 $z=0$（本性奇点）。
1. $\text{Res}(f, 1) = 1^2 \cdot e^{1/1} = e$。
2. $\text{Res}(f, 0)$：
   $$ \frac{z^2}{z-1} (1 + \frac{1}{z} + \frac{1}{2!z^2} + \frac{1}{3!z^3} + \dots) = -z^2 (1 + z + z^2 + \dots) (1 + \frac{1}{z} + \frac{1}{2z^2} + \dots) $$
   计算 $1/z$ 项系数（较复杂），通常可利用**无穷远点留数定理**：
   $\text{Res}(f, 0) + \text{Res}(f, 1) + \text{Res}(f, \infty) = 0$。
   经计算 $\text{Res}(f, \infty) = -(1/2 + 1) = -3/2$。
   结果：$2\pi i (e - 3/2)$。

</details>
