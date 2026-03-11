---
title: 深度学习实战练习 (Deep Learning Exercises)
sidebar_position: 2
---

# 深度学习实战练习 (Deep Learning Exercises)

本练习库涵盖神经网络底层机制、卷积网络架构及优化算法。

---

## 1. 神经网络基础 (Neural Foundations)

:::info 习题 1.1：反向传播 (Backpropagation) 的数学本质
在全连接网络中，已知 $l$ 层的激活值为 $a^{(l)} = \sigma(z^{(l)})$，$z^{(l)} = W^{(l)} a^{(l-1)} + b^{(l)}$。定义误差 $\delta^{(l)} = \frac{\partial L}{\partial z^{(l)}}$。证明 $\delta^{(l)} = ((W^{(l+1)})^T \delta^{(l+1)}) \odot \sigma'(z^{(l)})$，其中 $\odot$ 是 Hadamard 积。
:::

<details>
<summary>点击查看推导过程</summary>

利用链式法则：
$$\delta^{(l)}_i = \frac{\partial L}{\partial z^{(l)}_i} = \sum_j \frac{\partial L}{\partial z^{(l+1)}_j} \frac{\partial z^{(l+1)}_j}{\partial z^{(l)}_i}$$
由于 $z^{(l+1)}_j = \sum_k W^{(l+1)}_{jk} \sigma(z^{(l)}_k) + b^{(l+1)}_j$，有：
$$\frac{\partial z^{(l+1)}_j}{\partial z^{(l)}_i} = W^{(l+1)}_{ji} \sigma'(z^{(l)}_i)$$
代入得：
$$\delta^{(l)}_i = \sum_j \delta^{(l+1)}_j W^{(l+1)}_{ji} \sigma'(z^{(l)}_i) = \left( \sum_j (W^{(l+1)})^T_{ij} \delta^{(l+1)}_j \right) \sigma'(z^{(l)}_i)$$
写成矩阵形式：
$$\delta^{(l)} = ((W^{(l+1)})^T \delta^{(l+1)}) \odot \sigma'(z^{(l)})$$
得证。
</details>

---

## 2. 卷积神经网络 (CNN)

:::info 习题 2.1：特征图尺寸计算
已知输入特征图大小为 $32 \times 32 \times 3$。使用 $3 \times 3$ 的卷积核，步长 (Stride) 为 2，填充 (Padding) 为 1，共有 64 个卷积核。请计算输出特征图的大小及该层可学习参数的数量（含偏置）。
:::

<details>
<summary>点击查看解析与答案</summary>

**1. 输出尺寸计算：**
公式：$O = \lfloor \frac{I + 2P - K}{S} \rfloor + 1$
- $I = 32$ (输入)
- $P = 1$ (填充)
- $K = 3$ (卷积核大小)
- $S = 2$ (步长)
$O = \lfloor \frac{32 + 2(1) - 3}{2} \rfloor + 1 = \lfloor \frac{31}{2} \rfloor + 1 = 15 + 1 = 16$。
所以输出特征图大小为 $16 \times 16 \times 64$。

**2. 参数量计算：**
- 每个卷积核参数：$K \times K \times C_{in} = 3 \times 3 \times 3 = 27$
- 加上偏置：$27 + 1 = 28$
- 总参数量：$28 \times 64 = 1792$。
</details>

---

## 3. 循环神经网络 (RNN)

:::info 习题 3.1：梯度消失与爆炸
在简单 RNN 中，隐状态更新公式为 $h_t = \tanh(Wh_{t-1} + Ux_t)$。解释为什么长序列会导致梯度消失问题。
:::

<details>
<summary>点击查看解析与答案</summary>

反向传播时，$\frac{\partial h_T}{\partial h_1}$ 包含连乘项 $\prod_{t=2}^T \frac{\partial h_t}{\partial h_{t-1}}$。
由于 $\frac{\partial h_t}{\partial h_{t-1}} = \text{diag}(\tanh'(z_t)) W^T$，且 $\tanh'(z)$ 的值域在 $(0, 1]$ 之间，绝大部分情况下小于 1。
- 如果 $W$ 的特征值较小，则连乘项会趋于 0，导致 **梯度消失**。
- 如果 $W$ 的特征值较大，则连乘项会趋于无穷，导致 **梯度爆炸**。
这是 LSTM 和 GRU 引入“门控机制”来缓解该问题的核心动因。
</details>

---

_本练习库对标 CS231n, CS224n 等顶级课程习题深度。_
