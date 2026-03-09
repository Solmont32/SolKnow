---
title: 复变函数：解析函数与留数理论 (Complex Analysis)
description: 系统梳理复分析核心理论，从 Cauchy-Riemann 方程到留数定理的工业级导引
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";
import { motion } from "framer-motion";
import { Box, Code2, Infinity, Target, Zap } from "lucide-react";

# 复变函数：解析函数与留数理论

<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <blockquote>
    复变函数论不仅是数学分析在复数域的自然延伸，更展现了实分析中不具备的“刚性”与对称美。它是现代物理、信号处理与控制理论的数学基石。
  </blockquote>
</motion.div>

---

## 🗺️ 知识版图

本模块系统地介绍了复分析的核心架构，建议按以下路径学习：

<div className="card-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
  <KnowledgeCard type="info" title="1. 基础与导数">
    掌握复数域的拓扑性质与 <b>Cauchy-Riemann 方程</b>，理解解析性的本质。
  </KnowledgeCard>
  <KnowledgeCard type="success" title="2. 积分理论">
    深入 <b>Cauchy 积分公式</b>，领略解析函数在区域内的“全局决定性”。
  </KnowledgeCard>
  <KnowledgeCard type="warning" title="3. 级数与奇点">
    通过 <b>Laurent 展开</b> 分类孤立奇点，揭示函数在奇点附近的性状。
  </KnowledgeCard>
  <KnowledgeCard type="error" title="4. 留数与映射">
    利用 <b>留数定理</b> 解决实积分，并探索 <b>共形映射</b> 的几何变换之美。
  </KnowledgeCard>
</div>

---

## 一、复数项级数与基本定义

### 1. 复变函数
设 $D$ 是复平面 $\mathbb{C}$ 上的一个区域。若对 $D$ 内每一个复数 $z = x + iy$，都有唯一的复数 $w = u + iv$ 与之对应，则称 $w = f(z)$ 是定义在 $D$ 上的**复变函数**。
通常写作：
$$ f(z) = u(x,y) + i v(x,y) $$

### 2. 极限与连续性
复变函数的极限定义与多元实函数类似，但要求 $\Delta z \to 0$ 时无论路径如何，极限值均一致。

---

## 二、导数与解析性 (Analyticity)

若极限
$$ f'(z_0) = \lim_{\Delta z \to 0} \frac{f(z_0 + \Delta z) - f(z_0)}{\Delta z} $$
存在且唯一，则称 $f(z)$ 在 $z_0$ 点**可导**。

<KnowledgeCard type="info" title="解析 (Holomorphic) 的定义">
若 $f(z)$ 在 $z_0$ 及其某个邻域内处处可导，则称 $f(z)$ 在 $z_0$ **解析**。
</KnowledgeCard>

### 1. Cauchy-Riemann (C-R) 方程
这是判定解析性的充要条件（需满足偏导数连续）：
$$ 
\begin{cases}
\frac{\partial u}{\partial x} = \frac{\partial v}{\partial y} \\
\frac{\partial u}{\partial y} = -\frac{\partial v}{\partial x}
\end{cases}
$$

### 2. 复导数的几何意义
解析函数在 $f'(z_0) \neq 0$ 的点具有**保角性**（保持曲线间夹角不变）和**保域性**。

---

## 三、初等解析函数

-   **指数函数**: $e^z = e^x(\cos y + i \sin y)$，具有周期 $2\pi i$。
-   **对数函数**: $\text{Ln}\,z = \ln |z| + i \arg z + 2k\pi i$，是多值函数。
-   **幂函数**: $z^\alpha = e^{\alpha \text{Ln}\,z}$。

---

## 🚀 快速跳转

-   [**下一站：解析函数的全纯性质**](./holomorphic-functions)
-   [**核心：留数理论与应用**](./residue-theory)
-   [**几何：共形映射**](./conformal-mapping)

---

## 🛠️ 辅助工具

<div className="bilibili-embed-inner">
  <iframe 
    src="//player.bilibili.com/player.html?bvid=BV1X7411m7uV&page=1&high_quality=1" 
    scrolling="no" 
    border="0" 
    frameborder="no" 
    framespacing="0" 
    allowfullscreen="true"
    loading="lazy"
    style={{ width: '100%', aspectRatio: '16/9' }}
  ></iframe>
</div>
<p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)' }}>
  推荐资源：复变函数可视化导引
</p>
