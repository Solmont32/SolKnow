---
title: 机器学习实战练习 (Machine Learning Exercises)
sidebar_position: 1
---

# 机器学习实战练习 (Machine Learning Exercises)

本练习库对标经典教材（如 PRML, ISL 等），涵盖从线性模型到复杂集成算法的推导与实现。

---

## 1. 线性回归 (Linear Regression)

:::info 习题 1.1：正规方程 (Normal Equation) 的推导
设模型为 $y = Xw + \epsilon$，其中 $X \in \mathbb{R}^{n \times d}$ 是设计矩阵，$y \in \mathbb{R}^n$ 是目标向量。请证明使得损失函数 $J(w) = \frac{1}{2} \|Xw - y\|^2_2$ 最小化的权重向量 $w^*$ 满足正规方程 $X^T X w = X^T y$。
:::

<details>
<summary>点击查看推导过程</summary>

我们将损失函数展开：
$$J(w) = \frac{1}{2} (Xw - y)^T (Xw - y) = \frac{1}{2} (w^T X^T X w - 2 w^T X^T y + y^T y)$$
对 $w$ 求梯度 $\nabla_w J(w)$：
$$\nabla_w J(w) = X^T X w - X^T y$$
令梯度等于 0：
$$X^T X w - X^T y = 0 \implies X^T X w = X^T y$$
如果 $X^T X$ 可逆，则 $w^* = (X^T X)^{-1} X^T y$。
</details>

:::info 习题 1.2：L2 正则化的解析解
在习题 1.1 的基础上，加入 L2 正则化项 $\frac{\lambda}{2} \|w\|^2_2$。求其解析解。
:::

<details>
<summary>点击查看解析与答案</summary>

新的损失函数为：
$$J(w) = \frac{1}{2} \|Xw - y\|^2_2 + \frac{\lambda}{2} w^T w$$
对 $w$ 求梯度：
$$\nabla_w J(w) = X^T X w - X^T y + \lambda w = (X^T X + \lambda I) w - X^T y$$
令梯度等于 0，得：
$$w^* = (X^T X + \lambda I)^{-1} X^T y$$
注：由于 $\lambda > 0$，$X^T X + \lambda I$ 总是可逆的。
</details>

---

## 2. 逻辑回归 (Logistic Regression)

:::info 习题 2.1：对数似然损失 (Log-Loss) 的梯度推导
逻辑回归的预测函数为 $\hat{y} = \sigma(z)$，其中 $\sigma(z) = \frac{1}{1+e^{-z}}$ 且 $z = w^T x$。给定单样本损失 $L(w) = - [y \ln \hat{y} + (1-y) \ln(1-\hat{y})]$，证明其关于 $w$ 的梯度为 $\nabla_w L(w) = (\hat{y} - y)x$。
:::

<details>
<summary>点击查看推导过程</summary>

利用链式法则：
$$\frac{\partial L}{\partial w} = \frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial \hat{y}}{\partial z} \cdot \frac{\partial z}{\partial w}$$
1. $\frac{\partial L}{\partial \hat{y}} = - \frac{y}{\hat{y}} + \frac{1-y}{1-\hat{y}} = \frac{\hat{y}-y}{\hat{y}(1-\hat{y})}$
2. $\sigma'(z) = \sigma(z)(1-\sigma(z)) = \hat{y}(1-\hat{y})$
3. $\frac{\partial z}{\partial w} = x$
相乘得：
$$\frac{\partial L}{\partial w} = \frac{\hat{y}-y}{\hat{y}(1-\hat{y})} \cdot \hat{y}(1-\hat{y}) \cdot x = (\hat{y} - y)x$$
得证。
</details>

---

## 3. 支持向量机 (SVM)

:::info 习题 3.1：KKT 条件的应用
在线性可分 SVM 的对偶问题中，简述 KKT 条件中“互补松弛性 (Complementary Slackness)”的物理意义。
:::

<details>
<summary>点击查看解析与答案</summary>

互补松弛条件要求 $\alpha_i (y_i (w^T x_i + b) - 1) = 0$。
- 如果 $\alpha_i > 0$，则必有 $y_i (w^T x_i + b) = 1$，说明该样本点位于间隔边界上，即它是 **支持向量 (Support Vector)**。
- 如果样本点不是支持向量（即 $y_i (w^T x_i + b) > 1$），则其对应的拉格朗日乘子 $\alpha_i$ 必须为 0。
这意味着最终的模型参数 $w = \sum \alpha_i y_i x_i$ 只由支持向量决定。
</details>

---

_本练习库持续更新，致力于覆盖机器学习核心理论与代码实现。_
