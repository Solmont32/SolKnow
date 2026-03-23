---
title: 数值分析 (Numerical Analysis)
description: 致力于计算机与数学交叉领域的数值计算方法，涵盖插值、拟合、数值积分与线性方程组数值解。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 数值分析 (Numerical Analysis)

数值分析（Numerical Analysis）是研究利用计算机求解数学问题数值近似解的理论与方法。它不仅是计算数学的核心，更是现代工程模拟、信号处理、机器学习及物理仿真的基石。

本板块致力于提供严谨且具工业美感的数值算法导引，强调**理论误差估计**与**算法稳定性**的闭环。

---

## 核心章节 (Core Chapters)

<div className="analysis-toc-grid">

### 1. 多项式插值 (Polynomial Interpolation)

- **[Lagrange 插值与 Newton 插值](interpolation)**：从基函数构造到差商递推，解决“过点”问题。
- **样条插值 (Spline Interpolation)**：引入分段多项式与连续性约束，有效克服 Runge 现象。
- **误差估计**：Rolle 定理在插值余项中的精妙应用。

### 2. 函数拟合 (Function Fitting)

- **[最小二乘法 (Least Squares Method)](fitting)**：处理带噪声的数据，求解超定方程组的全局最优解。
- **正规方程组**：从几何投影视角理解误差平方和最小化。

### 3. 数值积分 (Numerical Integration)

- **[Newton-Cotes 公式](integration)**：从等距节点出发，构建代数精度驱动的求积准则。
- **Romberg 算法**：利用 Richardson 外推法实现精度的跃迁与收敛加速。

### 4. 非线性方程数值解 (Nonlinear Equations)

- **[迭代法与 Newton 法](nonlinear-equations)**：从二分法到切线法，探究非线性根搜索的高效路径。
- **收敛性分析**：不动点迭代的压缩映射原理与收敛阶判定。

### 5. 线性方程组数值解 (Linear Systems)

- **[直接法：LU 分解与 Cholesky](linear-systems)**：Gauss 消元、矩阵分解与直接求解策略。
- **[迭代法：Jacobi 与 Gauss-Seidel](linear-systems)**：大规模稀疏系统的迭代求解与收敛性分析。
- **[稳定性与条件数](linear-systems)**：数值稳定性分析与病态问题处理。

### 6. 常微分方程数值解 (ODE)

- **[单步法：Euler 与 Runge-Kutta](ode)**：从基本 Euler 到经典 RK4，精度与效率的平衡。
- **[多步法：Adams 方法](ode)**：利用历史信息提高计算效率的线性多步法。
- **[稳定性与刚性问题](ode)**：绝对稳定性分析与刚性方程的处理策略。

</div>

---

## 🛠️ 工业级工具与组件

<KnowledgeCard type="warning" title="算法稳定性 (Stability)">
在数值计算中，算法的稳定性至关重要。一个不稳定的算法会放大舍入误差，导致结果完全偏离真值。本教程在推导公式的同时，将深度分析每种方法的条件数与误差传播特性。
</KnowledgeCard>

---

## ✍️ 练习与实战 (Exercises)

每个章节均配套了深度练习，涵盖从手算推导到误差界估计的全流程：

- **[数值分析专题练习库](/docs/exercises/math/numerical-analysis)**：包含 Lagrange 余项估计、最小二乘正规方程推导及复化 Simpson 公式应用。

> **学习建议**：数值分析的学习不应止于公式背诵。建议读者在理解理论证明的基础上，尝试在 Python/MATLAB 中手动实现上述算法，观察不同阶数下的收敛性表现。
