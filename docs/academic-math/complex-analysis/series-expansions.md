---
title: 级数展开与孤立奇点 (Series & Singularities)
description: 从 Taylor 展开到 Laurent 展开，对解析函数在奇点附近的性状进行分类
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";
import { motion } from "framer-motion";
import { Layers, ScanFace, Zap } from "lucide-react";

# 级数展开与孤立奇点

解析函数的局部特性可以通过幂级数精确刻画。对于包含奇点的区域，Laurent 级数是不可或缺的分析工具。

---

## 一、Taylor 展开

若 $f(z)$ 在以 $z_0$ 为圆心，$R$ 为半径的圆 $D$ 内解析，则 $f(z)$ 可展开为 Taylor 级数：
$$ f(z) = \sum_{n=0}^\infty a_n (z - z_0)^n, \quad a_n = \frac{f^{(n)}(z_0)}{n!} $$
该级数的收敛半径 $R$ 是从 $z_0$ 到 $f(z)$ 最近一个奇点的距离。

---

## 二、Laurent 展开

若 $f(z)$ 在环域 $r < |z - z_0| < R$ 内解析，则可展开为 Laurent 级数：
$$ f(z) = \sum_{n=-\infty}^\infty c_n (z - z_0)^n $$
其中：
-   **正规部分**：$\sum_{n=0}^\infty c_n (z - z_0)^n$（Taylor 型部分）。
-   **主要部分**：$\sum_{n=1}^\infty \frac{c_{-n}}{(z - z_0)^n}$（揭示奇点特性的关键）。

系数 $c_n$ 计算公式：
$$ c_n = \frac{1}{2\pi i} \oint_C \frac{f(z)}{(z - z_0)^{n+1}} \, dz $$

---

## 三、孤立奇点的分类

根据 Laurent 展开的主要部分，可将孤立奇点 $z_0$ 分为三类：

| 类型 | 主要部分特征 | 性状 $z \to z_0$ | 示例 |
| :--- | :--- | :--- | :--- |
| **可去奇点** (Removable) | 全部为 0 | 极限存在 | $\frac{\sin z}{z}$ at $z=0$ |
| **极点** (Pole) | 有限项不为 0 | $|f(z)| \to \infty$ | $\frac{1}{z^n}$ at $z=0$ |
| **本性奇点** (Essential) | 无限多项不为 0 | 极限不存在且无意义 | $e^{1/z}$ at $z=0$ |

<KnowledgeCard type="warning" title="Picard 大定理">
在本性奇点 $z_0$ 的任意小邻域内，$f(z)$ 能够无限次地取到除一个值外的所有复数值。
</KnowledgeCard>

---

## 🎯 经典练习

### 练习 1：判定奇点类型
判定 $f(z) = \frac{e^z - 1}{z^2}$ 在 $z = 0$ 处的奇点类型。

<details>
<summary>点击查看解析</summary>

展开 $e^z$:
$$ f(z) = \frac{(1 + z + \frac{z^2}{2!} + \dots) - 1}{z^2} = \frac{z + \frac{z^2}{2} + \dots}{z^2} = \frac{1}{z} + \frac{1}{2} + \frac{z}{6} + \dots $$
主要部分为 $\frac{1}{z}$（只有一项），故 $z=0$ 是 **1 阶极点**。

</details>

### 练习 2：环域展开
将 $f(z) = \frac{1}{z(z-1)}$ 在环域 $0 < |z| < 1$ 内展开。

<details>
<summary>点击查看解析</summary>

$$ f(z) = \frac{1}{z} \cdot \frac{1}{z-1} = -\frac{1}{z} \cdot \frac{1}{1-z} $$
利用几何级数 $\frac{1}{1-z} = \sum_{n=0}^\infty z^n$:
$$ f(z) = -\frac{1}{z} \sum_{n=0}^\infty z^n = -\frac{1}{z} - 1 - z - z^2 - \dots $$
收敛范围为 $0 < |z| < 1$。

</details>
