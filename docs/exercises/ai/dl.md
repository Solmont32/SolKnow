---
title: 深度学习实战练习 (Deep Learning Exercises)
sidebar_position: 2
---

import { Target, Zap, Trophy, BarChart3, ChevronRight, Brain, Layers, Cpu } from 'lucide-react';

# 深度学习实战练习 (Deep Learning Exercises)

> **“神经网络的强大源于其层层递进的非线性变换。”** —— 本专题聚焦神经网络底层机制、架构优化及大规模分布式训练原理。

---

## 🪜 练习阶梯与评价标准

| 等级                                                                     | 难度目标       | 核心考察点                       | 期望达成                  |
| :----------------------------------------------------------------------- | :------------- | :------------------------------- | :------------------------ |
| <span style={{ color: 'var(--ifm-color-success)' }}>● **Level A**</span> | 张量运算与 BP  | 反向传播、激活函数、卷积计算     | 理解梯度流动的物理本质    |
| <span style={{ color: 'var(--ifm-color-warning)' }}>● **Level B**</span> | 模型设计与正则 | BN/LN 原理、Dropout、ResNet 结构 | 具备解决梯度消失/爆炸能力 |
| <span style={{ color: 'var(--ifm-color-danger)' }}>● **Level C**</span>  | 架构创新与工程 | Transformer 缩放点积、分布式 SGD | 理解现代 LLM 底层设计逻辑 |

---

## 📂 核心习题库

### Level A：基础巩固 (Foundations)

#### 练习 1：反向传播 (Backpropagation) 的矩阵形式推导

**题目描述**：在全连接网络中，已知第 $l$ 层的激活值为 $a^{(l)} = \sigma(z^{(l)})$，$z^{(l)} = W^{(l)} a^{(l-1)} + b^{(l)}$。定义误差 $\delta^{(l)} = \frac{\partial L}{\partial z^{(l)}}$。请推导 $\delta^{(l)}$ 与 $\delta^{(l+1)}$ 的递推关系。

<details>
<summary>Check Solution (Matrix Derivation)</summary>

**推导过程**：

1. **链式法则展开**：
   $$\delta^{(l)}_i = \frac{\partial L}{\partial z^{(l)}_i} = \sum_j \frac{\partial L}{\partial z^{(l+1)}_j} \frac{\partial z^{(l+1)}_j}{\partial z^{(l)}_i}$$
2. **计算局部导数**：
   由于 $z^{(l+1)}_j = \sum_k W^{(l+1)}_{jk} a^{(l)}_k + b^{(l+1)}_j = \sum_k W^{(l+1)}_{jk} \sigma(z^{(l)}_k) + b^{(l+1)}_j$。
   则 $\frac{\partial z^{(l+1)}_j}{\partial z^{(l)}_i} = W^{(l+1)}_{ji} \sigma'(z^{(l)}_i)$。
3. **合并项**：
   $$\delta^{(l)}_i = \left( \sum_j \delta^{(l+1)}_j W^{(l+1)}_{ji} \right) \sigma'(z^{(l)}_i)$$
4. **矩阵化表示**：
   $$\delta^{(l)} = ((W^{(l+1)})^T \delta^{(l+1)}) \odot \sigma'(z^{(l)})$$
   其中 $\odot$ 表示 Hadamard 积。

</details>

#### 练习 2：卷积层参数量计算

**题目描述**：输入图像尺寸 $224 \times 224 \times 3$，使用 $7 \times 7$ 卷积核，步长 2，填充 3，输出通道数 64。求输出尺寸及该层参数量（含偏置）。

<details>
<summary>Check Solution</summary>

**计算步骤**：

1. **尺寸计算**：$O = \frac{224 + 2 \times 3 - 7}{2} + 1 = 112.5 \to 112$。输出为 $112 \times 112 \times 64$。
2. **参数量**：每个卷积核参数 = $7 \times 7 \times 3 + 1 = 148$。总参数 = $148 \times 64 = 9472$。

</details>

---

### Level B：综合提升 (Intermediate)

#### 练习 3：Batch Normalization (BN) 的作用与推理偏差

**题目描述**：为什么 BN 在训练和推理（Test time）时的行为不同？推理时如何获得均值和方差？

<details>
<summary>Check Solution</summary>

**核心机制**：

1. **训练时**：利用当前 Batch 的均值 $\mu_B$ 和方差 $\sigma_B^2$ 进行归一化，以加速收敛并缓解梯度消失。
2. **推理时**：单个样本没有 Batch 统计量。因此，推理时使用训练过程中通过 **移动平均 (Running Average)** 累计得到的全局均值和方差。
3. **目的**：确保推理结果的确定性，不依赖于推理时的 Batch Size。

</details>

#### 练习 4：ResNet 解决退化问题的数学直觉

**题目描述**：考虑残差块 $y = f(x, \{W_i\}) + x$。请从梯度流的角度解释为什么这种设计能允许训练成百上千层的网络。

<details>
<summary>Check Solution</summary>

**梯度流分析**：
在反向传播时，$\frac{\partial L}{\partial x} = \frac{\partial L}{\partial y} \cdot \frac{\partial y}{\partial x} = \frac{\partial L}{\partial y} \cdot (\frac{\partial f}{\partial x} + 1)$。
由于存在常数项 $1$，梯度可以直接跨过复杂的非线性层 $f$ 传回前一层。即使 $f$ 层的权重导致梯度消失（$\frac{\partial f}{\partial x} \to 0$），整体梯度依然保持在 $1$ 左右，确保了深层网络参数的有效更新。

</details>

---

### Level C：竞赛挑战 (Advanced)

#### 练习 5：Attention 机制中的 Scaled Dot-Product

**题目描述**：在 Transformer 的注意力计算中，$Attention(Q, K, V) = \text{softmax}(\frac{QK^T}{\sqrt{d_k}})V$。为什么需要除以 $\sqrt{d_k}$？

<details>
<summary>Check Solution</summary>

**统计学解释**：
假设 $Q$ 和 $K$ 的分量是独立且均值为 0、方差为 1 的随机变量。则点积 $q \cdot k = \sum_{i=1}^{d_k} q_i k_i$ 的均值为 0，方差为 $d_k$。
当 $d_k$ 很大时，点积的量级会变得非常大，导致经过 softmax 后梯度落入饱和区（极小），引发梯度消失。除以 $\sqrt{d_k}$ 可以将方差重新缩放到 1，使 softmax 的输入处于敏感区，确保梯度平稳。

</details>

---

## 🏆 训练建议

1. **理解归一化**：对比 BN, LN, IN, GN 的应用场景（如 NLP 为什么首选 LN）。
2. **关注感受野**：计算深层网络中一个神经元对应的输入图像区域大小。
3. **工程实战**：尝试在 PyTorch 中从零实现一个带有残差结构的 Transformer Block。
