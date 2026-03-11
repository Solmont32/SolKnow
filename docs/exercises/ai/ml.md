---
title: 机器学习实战练习 (Machine Learning Exercises)
sidebar_position: 1
---

import { Target, Zap, Trophy, BarChart3, ChevronRight, Brain, Layers, Cpu } from 'lucide-react';

# 机器学习实战练习 (Machine Learning Exercises)

> **“只有推导过每一个公式，才能真正理解模型的灵魂。”** —— 本专题涵盖从线性模型到集成学习的深度理论推导与工业级 C++ 模拟实现。

---

## 🪜 练习阶梯与评价标准

| 等级                                                                     | 难度目标       | 核心考察点                            | 期望达成               |
| :----------------------------------------------------------------------- | :------------- | :------------------------------------ | :--------------------- |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 核心公式推导   | 线性回归、逻辑回归、梯度下降          | 能够独立完成闭式解推导 |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 算法机制理解   | SVM 对偶、决策树信息增益、PCA 投影    | 理解模型背后的优化目标 |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span>  | 综合应用与前沿 | 集成学习证明、期望最大化 (EM)、核技巧 | 具备论文级公式推导能力 |

---

## 🎯 考点覆盖模型 (Knowledge Matrix)

| 知识模块         | 核心考点                             | 关联习题   | 推荐等级 |
| :--------------- | :----------------------------------- | :--------- | :------- |
| **监督学习基础** | 正规方程推导、梯度下降收敛性         | 练习 1, 6  | Level A  |
| **分类模型**     | 逻辑回归梯度、决策树分裂准则         | 练习 2, 7  | Level A  |
| **核方法与 SVM** | KKT 条件、对偶问题转换、核函数定义   | 练习 3     | Level B  |
| **降维与特征**   | PCA 方差最大化证明、SVD 分解         | 练习 4     | Level B  |
| **集成学习**     | AdaBoost 权重更新、GBDT 残差学习     | 练习 5     | Level C  |
| **概率模型**     | EM 算法收敛性、高斯混合模型 (GMM)    | 练习 8     | Level C  |

---

## 📂 核心习题库

### Level A：基础巩固 (Foundations)

#### 练习 1：正规方程 (Normal Equation) 的推导与实现

**题目描述**：设模型为 $y = Xw + \epsilon$。证明损失函数 $J(w) = \frac{1}{2} \|Xw - y\|^2_2$ 的极小值点满足 $X^T X w = X^T y$。并在 C++ 中模拟实现该计算过程。

<details>
<summary>Check Solution (Math & C++ Implementation)</summary>

**数学推导**：
1. **展开**：$J(w) = \frac{1}{2} (w^T X^T X w - 2 w^T X^T y + y^T y)$。
2. **求梯度**：$\nabla_w J(w) = X^T X w - X^T y$。
3. **令梯度为 0**：$X^T X w = X^T y$。

**C++ 工业级模拟 (基于 Eigen 库思想)**：

```cpp
#include <iostream>
#include <vector>
#include <Eigen/Dense> // 假设使用 Eigen 处理矩阵运算

using namespace Eigen;
using namespace std;

/**
 * @brief 使用正规方程求解线性回归权重
 * @param X 设计矩阵 (n x d)
 * @param y 目标向量 (n x 1)
 * @return VectorXd 权重向量 w
 */
VectorXd solve_normal_equation(const MatrixXd& X, const VectorXd& y) {
    // w = (X^T * X)^-1 * X^T * y
    // 在实际工程中，通常使用 LDLT 或 QR 分解代替直接求逆以提高数值稳定性
    return (X.transpose() * X).ldlt().solve(X.transpose() * y);
}

int main() {
    MatrixXd X(4, 2);
    X << 1, 1,
         1, 2,
         2, 2,
         2, 3;
    VectorXd y(4);
    y << 6, 8, 9, 11;

    VectorXd w = solve_normal_equation(X, y);
    cout << "Learned weights: \n" << w << endl;
    return 0;
}
```

**复杂度分析**：矩阵乘法 $O(nd^2)$，矩阵求逆/分解 $O(d^3)$。当 $d > 10000$ 时不建议使用。

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

<details>
<summary>Check Solution</summary>

**核心逻辑**：

1. **引入核函数**：对偶问题的目标函数仅涉及样本间的内积 $\langle x_i, x_j \rangle$。通过核技巧 $K(x_i, x_j) = \phi(x_i)^T \phi(x_j)$，我们可以在不显式计算高维映射 $\phi(x)$ 的情况下，直接在低维空间计算高维内积。
2. **计算复杂度**：原始问题的参数量由特征维度 $d$ 决定，而对偶问题的参数量由样本数 $n$ 决定。当 $d \gg n$ 时，求解对偶问题更高效。
3. **稀疏性**：对偶问题的解仅由少数支持向量决定（$\alpha_i > 0$），具有良好的泛化能力。

</details>

#### 练习 4：主成分分析 (PCA) 的优化目标

**题目描述**：PCA 旨在寻找一个投影方向 $u$（$\|u\|_2 = 1$），使得投影后的数据方差最大。请用拉格朗日乘子法证明该方向 $u$ 是协方差矩阵 $\Sigma$ 的最大特征值对应的特征向量。

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

**题目描述**：证明在 AdaBoost 算法中，选择 $\alpha_t = \frac{1}{2} \ln \frac{1-e_t}{e_t}$ 可以最小化指数损失。

<details>
<summary>Check Solution</summary>

**证明概要**：
AdaBoost 实际上是在最小化指数损失函数 $\sum \exp(-y_i F(x_i))$。
在第 $t$ 步，我们要最小化 $E = \sum_{i=1}^n \exp(-y_i (F_{t-1}(x_i) + \alpha G(x_i)))$。
令 $w_i^{(t)} = \exp(-y_i F_{t-1}(x_i))$，则 $E = \sum_{i: y_i=G(x_i)} w_i^{(t)} e^{-\alpha} + \sum_{i: y_i \neq G(x_i)} w_i^{(t)} e^{\alpha}$。
令 $e_t = \frac{\sum_{y_i \neq G(x_i)} w_i^{(t)}}{\sum w_i^{(t)}}$，对 $\alpha$ 求导并令其为 0，即可得到 $\alpha_t = \frac{1}{2} \ln \frac{1-e_t}{e_t}$。

</details>

#### 练习 6：手写线性回归梯度下降 (C++ Implementation)

**题目描述**：实现一个不依赖外部库的简单线性回归梯度下降算法，支持 $L2$ 正则化。

<details>
<summary>Check Solution (Pure C++ Implementation)</summary>

```cpp
#include <iostream>
#include <vector>

using namespace std;

struct LinearRegression {
    double w = 0, b = 0;
    double lr = 0.01;
    double lambda = 0.1; // L2 正则化系数

    void train(const vector<double>& x, const vector<double>& y, int epochs) {
        int n = x.size();
        for (int e = 0; e < epochs; e++) {
            double dw = 0, db = 0;
            for (int i = 0; i < n; i++) {
                double pred = w * x[i] + b;
                dw += (pred - y[i]) * x[i];
                db += (pred - y[i]);
            }
            // 更新参数 (包含 L2 梯度 lambda * w)
            w -= lr * (dw / n + lambda * w);
            b -= lr * (db / n);
        }
    }
};

int main() {
    vector<double> x = {1, 2, 3, 4, 5};
    vector<double> y = {2, 4, 6, 8, 10};
    LinearRegression model;
    model.train(x, y, 1000);
    cout << "Final w: " << model.w << ", b: " << model.b << endl;
    return 0;
}
```

</details>

---

## 🏆 训练建议

1. **手写推导**：机器学习的魅力在于数学的严谨性，建议在草稿纸上独立推导一遍反向传播。
2. **关注过拟合**：在练习中思考正则化（L1/L2）如何影响权重的解。
3. **联系实践**：思考如何用 C++ 矩阵库（如 Eigen）高效实现上述公式。
