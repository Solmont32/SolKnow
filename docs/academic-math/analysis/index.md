---
title: 数学分析 (Mathematical Analysis) - 华东师大第五版同步体系
description: 致力于打造计算机与数学交叉领域的集成式零基础学习系统，本章节对标华东师范大学数学科学学院编《数学分析》第五版。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 数学分析 (Mathematical Analysis)

数学分析是以实数作为研究对象，以极限作为核心工具，研究函数的一门数学分支。它是近代数学的基础，也是计算机科学（算法复杂度分析、信号处理、机器学习、图形学）的灵魂。

本知识库严格对标 **华东师范大学《数学分析》第五版** 的教学大纲，旨在为零基础学习者提供最严密、最直观、最具工业感的学习路径。

---

## 📘 上册：一元微积分与实数理论 (Volume 1)

<div className="analysis-toc-grid">

### 第一部分：极限与连续 (Chapters 1-4)

- **[第一章 实数集与函数](real-numbers-and-functions)**：确界原理、阿基米德性质、函数基本性质。
- **[第二章 数列极限](limits)**：$\epsilon-N$ 定义、单调有界原理、Cauchy 收敛准则。
- **[第三章 函数极限](function-limits)**：$\epsilon-\delta$ 定义、等价无穷小、洛必达法则。
- **[第四章 函数的连续性](continuity)**：连续性概念、闭区间连续函数性质。

### 第二部分：微分学 (Chapters 5-7)

- **[第五章 导数与微分](derivatives)**：导数定义、求导法则、高阶导数。
- **[第六章 微分中值定理及其应用](mean-value-theorems)**：Rolle 定理、Lagrange 定理、Taylor 公式。
  - **[(续) 凸函数、不等式与极值应用](convexity-and-extremum)**：Jensen 不等式、Young/Hölder 不等式证明。
- **[第七章 实数的完备性](completeness)**：七大等价定理（闭区间套、聚点、有限覆盖等）。

### 第三部分：积分学 (Chapters 8-11)

- **[第八章 不定积分](indefinite-integrals)**：换元法、分部积分法、有理函数积分。
- **[第九章 定积分](integrals)**：Riemann 积分定义、微积分基本定理 (FTC)。
- **[第十章 定积分的应用](definite-integral-applications)**：面积、体积、弧长、物理应用。
- **[第十一章 反常积分](improper-integrals)**：无穷限积分、瑕积分、敛散性判别。

</div>

---

## 📙 下册：级数与多元微积分 (Volume 2)

<div className="analysis-toc-grid">

### 第四部分：级数理论 (Chapters 12-15)

- **[第十二章 数项级数](series)**：正项级数判别法、交错级数。
- **[第十三章 函数列与函数项级数](function-sequences)**：**一致收敛性**、分析性质。
- **[第十四章 幂级数](power-series)**：收敛半径、Taylor 展开、解析性。
- **[第十五章 傅里叶级数](fourier-series)**：Fourier 展开、收敛定理、Parseval 等式。

### 第五部分：多元微积分 (Chapters 16-22)

- **[第十六章 多元函数的极限与连续](multivariable-limits)**：二元极限、连续性。
- **[第十七章 多元函数微分学](multivariable-differentiation)**：全微分、偏导数、Taylor 公式。
  - **[(续) 空间曲线与曲面的微分几何](differential-geometry)**：切向量、法向量、曲率与挠率。
- **[第十八章 隐函数定理及其应用](implicit-function-theorem)**：隐函数存在定理、Lagrange 乘数法。
- **[第十九章 含参量积分](parametric-integrals)**：含参量正常/反常积分、Beta/Gamma 函数。
- **[第二十章 重积分](multiple-integrals)**：二重/三重积分、变量替换、Jacobi 行列式。
- **[第二十一章 曲线积分](line-integrals)**：第一/二型曲线积分、Green 公式。
- **[第二十二章 曲面积分](surface-integrals)**：第一/二型曲面积分、Gauss 公式、Stokes 公式。
- **[第二十三章 矢量分析与场论初步](vector-analysis)**：Hamilton 算子、梯度、散度与旋度。

</div>

---

## 🚀 进阶与专题补充 (Supplements)

- **[实变函数学习路径](/docs/academic-math/real-analysis)**：Lebesgue 测度、Lebesgue 积分与 $L^p$ 空间的连续进阶。

为了满足更高阶的学习需求，本库额外提供了以下专题：

- **[分析学不等式全书](inequalities)**：系统化梳理 Young, Hölder, Minkowski 等核心工具。
- **[Riemann-Stieltjes 积分](riemann-stieltjes-integral)**：Lebesgue 积分的序曲。
- **[常微分方程初步](differential-equations)**：动态系统的数学描述。
- **[无穷乘积](infinite-products)**：与级数并行的无限运算。
- **[点集拓扑进阶](topology)**：从欧氏空间到抽象度量空间。

---

## ✍️ 练习与实战 (Exercises)

每个章节末尾均关联了配套练习，你也可以直接进入 **[数学分析练习库](/docs/exercises/math/analysis)** 进行针对性强化。

针对第 5-6 章，新增 **[导数与中值定理专题练习](/docs/exercises/math/analysis-derivatives-mean-value)**（多题分层 + 折叠解析）。

针对第 8-11 章，新增 **[一元积分学专题练习](/docs/exercises/math/analysis-integral-calculus)**（多题分层 + 折叠解析）。

针对第 12-15 章，新增 **[级数论与 Fourier 分析专题练习](/docs/exercises/math/analysis-series-fourier)**（多题分层 + 折叠解析）。

针对第 16-23 章，新增 **[多元微积分与矢量分析专题练习](/docs/exercises/math/analysis-multivariable-calculus)**（多题分层 + 折叠解析）。

针对第十七章续内容，新增 **[微分几何专题练习](/docs/exercises/math/analysis-differential-geometry)**（多题分层 + 折叠解析）。

针对第一至第四章，新增 **[前四章基础专题练习](/docs/exercises/math/analysis-foundations)**（10 题分层 + 折叠解析）。

针对第十三章，新增 **[函数列与函数项级数专题练习](/docs/exercises/math/analysis-function-sequences)**（10 题分层 + 折叠解析）。

> **学习建议**：分析学的严密性需要通过大量的 $\epsilon$ 练习来磨练。建议在阅读理论时，务必亲手推导一遍核心定理的证明。
