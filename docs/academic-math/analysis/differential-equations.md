---
title: 常微分方程初步 (Differential Equations)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 常微分方程初步 (Differential Equations)

微分方程是联系函数及其导数的方程，是描述物理规律的强大工具。

## 一、 核心知识点讲解

### 1. 一阶可分离变量方程
形如 $\frac{dy}{dx} = f(x)g(y)$。
-   **解法**：$\int \frac{1}{g(y)} dy = \int f(x) dx$。

### 2. 一阶线性微分方程
形如 $y' + P(x)y = Q(x)$。
-   **通解公式**：
    $$y = e^{-\int P(x)dx} \left[ \int Q(x) e^{\int P(x)dx} dx + C \right]$$

### 3. 二阶常系数齐次线性方程
形如 $y'' + py' + qy = 0$。
-   **解法**：写出特征方程 $r^2 + pr + q = 0$。根据判别式 $\Delta$ 的正负确定通解形式。

<KnowledgeCard type="contest" title="竞赛应用">
在动态规划（尤其是连续型 DP）或物理建模题目中，微分方程的构造是解题的核心。
</KnowledgeCard>

---

## 二、 经典例题实战

### 例题 1：可分离变量
解方程：$\frac{dy}{dx} = \frac{x}{y}$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1.  **分离变量**：$y dy = x dx$。
2.  **两端积分**：$\int y dy = \int x dx$。
3.  **得出结果**：$\frac{1}{2}y^2 = \frac{1}{2}x^2 + C_1$。
4.  **整理**：$y^2 - x^2 = C$。

#### 答案
$y^2 - x^2 = C$
</details>
