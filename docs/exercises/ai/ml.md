---
title: 机器学习实战练习 (Machine Learning Exercises)
sidebar_position: 1
---

import { Target, Zap, Trophy, BarChart3, ChevronRight, Brain, Layers } from 'lucide-react';

# 机器学习实战练习 (Machine Learning Exercises)

> **“只有推导过每一个公式，才能真正理解模型的灵魂。”** —— 本专题涵盖从线性模型到集成学习的深度理论推导与算法实现。

---

## 🪜 练习阶梯与评价标准

| 等级                                                                     | 难度目标       | 核心考察点                            | 期望达成               |
| :----------------------------------------------------------------------- | :------------- | :------------------------------------ | :--------------------- |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 核心公式推导   | 线性回归、逻辑回归、梯度下降          | 能够独立完成闭式解推导 |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 算法机制理解   | SVM 对偶、决策树信息增益、PCA 投影    | 理解模型背后的优化目标 |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span>  | 综合应用与前沿 | 集成学习证明、期望最大化 (EM)、核技巧 | 具备论文级公式推导能力 |

---

## 📂 核心习题库

### Level A：基础巩固 (Foundations)

#### 练习 1：正规方程 (Normal Equation) 的推导

**题目描述**：设模型为 $y = Xw + \epsilon$，其中 $X \in \mathbb{R}^{n \times d}$ 是设计矩阵，$y \in \mathbb{R}^n$ 是目标向量。请证明使得损失函数 $J(w) = \frac{1}{2} \|Xw - y\|^2_2$ 最小化的权重向量 $w^*$ 满足正规方程 $X^T X w = X^T y$。

<details>
<summary>Check Solution (Mathematical Derivation)</summary>

**推导过程**：

1. **展开损失函数**：
   $$J(w) = \frac{1}{2} (Xw - y)^T (Xw - y) = \frac{1}{2} (w^T X^T X w - 2 w^T X^T y + y^T y)$$
2. **对 $w$ 求梯度** $\nabla_w J(w)$：
   依据矩阵微积分规则：$\frac{\partial (w^T A w)}{\partial w} = (A + A^T)w$ 且 $\frac{\partial (a^T w)}{\partial w} = a$。
   $$\nabla_w J(w) = \frac{1}{2} (2 X^T X w - 2 X^T y) = X^T X w - X^T y$$
3. **极值条件**：
   令梯度等于 0：
   $$X^T X w - X^T y = 0 \implies X^T X w = X^T y$$
4. **结论**：
   如果 $X^T X$ 可逆，则 $w^* = (X^T X)^{-1} X^T y$。

**复杂度分析**：计算 $(X^T X)^{-1}$ 的复杂度约为 $O(d^3)$，因此当特征维度 $d$ 非常大时，通常改用梯度下降法。

</details>

#### 练习 2：逻辑回归的梯度推导

**题目描述**：逻辑回归预测函数为 $\hat{y} = \sigma(w^T x)$。给定交叉熵损失 $L(w) = - [y \ln \hat{y} + (1-y) \ln(1-\hat{y})]$，求其关于 $w$ 的梯度。

<details>
<summary>Check Solution</summary>

**推导过程**：
利用链式法则：$\frac{\partial L}{\partial w} = \frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial z} \cdot \frac{\partial z}{\partial w}$，其中 $z = w^T x$。

1. $\frac{\partial L}{\partial \hat{y}} = \frac{\hat{y}-y}{\hat{y}(1-\hat{y})}$
2. $\frac{\partial \hat{y}}{\partial z} = \sigma(z)(1-\sigma(z)) = \hat{y}(1-\hat{y})$
3. $\frac{\partial z}{\partial w} = x$
   相乘得：$\nabla_w L(w) = (\hat{y} - y)x$。

</details>

---

### Level B：综合提升 (Intermediate)

#### 练习 3：支持向量机 (SVM) 的对偶性

**题目描述**：简述为什么在处理高维特征时，SVM 往往求解对偶问题而不是原始问题？

- **提示**：从核函数 (Kernel Function) 和计算复杂度的角度回答。

<details>
<summary>Check Solution</summary>

**核心逻辑**：

1. **引入核函数**：对偶问题的目标函数仅涉及样本间的内积 $\langle x_i, x_j \rangle$。通过核技巧 $K(x_i, x_j) = \phi(x_i)^T \phi(x_j)$，我们可以在不显式计算高维映射 $\phi(x)$ 的情况下，直接在低维空间计算高维内积。
2. **计算复杂度**：原始问题的参数量由特征维度 $d$ 决定，而对偶问题的参数量由样本数 $n$ 决定。当 $d \gg n$ 时，求解对偶问题更高效。
3. **稀疏性**：对偶问题的解仅由少数支持向量决定（$\alpha_i > 0$），具有良好的泛化能力。

</details>

#### 练习 4：主成分分析 (PCA) 的优化目标

**题目描述**：PCA 旨在寻找一个投影方向 $u$（$\|u\|_2 = 1$），使得投影后的数据方差最大。请用拉格朗日乘子法证明该方向 $u$ 是协方差矩阵 $\Sigma = \frac{1}{n} X^T X$ 的最大特征值对应的特征向量。

<details>
<summary>Check Solution</summary>

**证明步骤**：

1. **投影方差**：$Var = u^T \Sigma u$。
2. **约束优化**：$\max u^T \Sigma u \quad s.t. \quad u^T u = 1$。
3. **拉格朗日函数**：$\mathcal{L}(u, \lambda) = u^T \Sigma u - \lambda (u^T u - 1)$。
4. **求导**：$\frac{\partial \mathcal{L}}{\partial u} = 2 \Sigma u - 2 \lambda u = 0 \implies \Sigma u = \lambda u$。
5. **结论**：$u$ 必须是 $\Sigma$ 的特征向量。此时 $u^T \Sigma u = u^T \lambda u = \lambda$，要使方差最大，$\lambda$ 必须是最大的特征值。

</details>

---

### Level C：竞赛挑战 (Advanced)

#### 练习 5：AdaBoost 权值更新公式推导

**题目描述**：在 AdaBoost 算法中，每一轮样本权值的更新公式为 $D_{t+1}(i) = \frac{D_t(i)}{Z_t} \exp(-\alpha_t y_i G_t(x_i))$。请证明，如果选择 $\alpha_t = \frac{1}{2} \ln \frac{1-e_t}{e_t}$，可以最小化当前轮的指数损失。

<details>
<summary>Check Solution</summary>

**证明概要**：
AdaBoost 实际上是在最小化指数损失函数 $\sum \exp(-y_i F(x_i))$。
在第 $t$ 步，我们要最小化 $E = \sum_{i=1}^n \exp(-y_i (F_{t-1}(x_i) + \alpha G(x_i)))$。
令 $w_i^{(t)} = \exp(-y_i F_{t-1}(x_i))$，则 $E = \sum_{i: y_i=G(x_i)} w_i^{(t)} e^{-\alpha} + \sum_{i: y_i \neq G(x_i)} w_i^{(t)} e^{\alpha}$。
令 $e_t = \frac{\sum_{y_i \neq G(x_i)} w_i^{(t)}}{\sum w_i^{(t)}}$，对 $\alpha$ 求导并令其为 0，即可得到 $\alpha_t = \frac{1}{2} \ln \frac{1-e_t}{e_t}$。

</details>

---

## 🏆 训练建议

1. **手写推导**：机器学习的魅力在于数学的严谨性，建议在草稿纸上独立推导一遍反向传播。
2. **关注过拟合**：在练习中思考正则化（L1/L2）如何影响权重的解。
3. **联系实践**：思考如何用 C++ 矩阵库（如 Eigen）高效实现上述公式。
