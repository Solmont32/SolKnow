---
title: AI/LLM 架构专题：从卷积神经网络、Transformer 到强化学习与算子级工程化
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";
import CodeCollapse from "@site/src/components/CodeCollapse";

# AI/LLM 架构专题 (Deep Dive)

> **“架构决定了智能的边界，而算子决定了实现的效率。”** 本专题深入剖析现代 AI 系统中从空间建模（CNN）到序列建模（Transformer）的演进，并探讨底层工程优化的本质。

---

## 1. 卷积神经网络 (CNN) 与张量变换推导

卷积不仅仅是滑动窗口，它是局部连接与权值共享的线性映射。

### 1.1 卷积输出形状的严格推导
给定输入张量形状 $(H_{in}, W_{in})$，卷积核 $(K_h, K_w)$，步长 $S$，填充 $P$，空洞率 $D$，输出形状 $(H_{out}, W_{out})$ 满足：
$$H_{out} = \lfloor \frac{H_{in} + 2P - D(K_h - 1) - 1}{S} + 1 \rfloor$$
$$W_{out} = \lfloor \frac{W_{in} + 2P - D(K_w - 1) - 1}{S} + 1 \rfloor$$

### 1.2 算子级实现：im2col 与 Toeplitz 矩阵
在高性能计算中，卷积通常转化为 **GEMM (通用矩阵乘法)**。
- **im2col**：将输入张量的每个卷积窗口拉平为行。
- **Weight Matrix**：将卷积核拉平为列。
- **变换本质**：卷积 $\to$ 矩阵乘法。

---

## 2. Transformer 架构与注意力机制数学解析

Transformer 的核心在于**自注意力 (Self-Attention)**，它消除了 RNN 的序列依赖，实现了并行化。

### 2.1 缩放点积注意力 (Scaled Dot-Product Attention)
$$Attention(Q, K, V) = Softmax\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

**为何要除以 $\sqrt{d_k}$？**
假设 $Q$ 和 $K$ 的分量是均值为 0、方差为 1 的独立随机变量。则 $Q \cdot K$ 的均值为 0，方差为 $d_k$。
当 $d_k$ 很大时，点积结果会很大，导致 Softmax 进入梯度极小的饱和区。除以 $\sqrt{d_k}$ 可将方差缩回 1，保持梯度稳定。

### 2.2 多头注意力 (Multi-Head Attention) 的维度变换
Multi-Head 本质上是在不同的特征子空间中并行执行注意力：
1. $Q, K, V$ 分别通过 $W^Q, W^K, W^V$ 投影到 $d_{model}$ 维。
2. 拆分为 $h$ 个头，每个头维度为 $d_k = d_{model}/h$。
3. 拼接结果并再次投影。
$$MultiHead(Q, K, V) = Concat(head_1, \dots, head_h)W^O$$

---

## 3. 强化学习 (RL) 与 RLHF 原理

大模型的“对齐” (Alignment) 离不开强化学习。

### 3.1 核心原语：马尔可夫决策过程 (MDP)
RL 建模为五元组 $(S, A, P, R, \gamma)$：
- **策略 $\pi(a|s)$**：在状态 $s$ 下采取动作 $a$ 的概率。
- **价值函数 $V(s)$**：长期累积奖励的期望。

### 3.2 RLHF (基于人类反馈的强化学习)
LLM 训练的三阶段：
1. **SFT (监督微调)**：模仿人类对话。
2. **Reward Modeling (奖励建模)**：根据人类排序训练一个打分模型。
3. **PPO (近端策略优化)**：使用奖励模型通过 RL 优化策略函数，使其生成的回复得分最高。

---

## 4. 算子级工程化与底层优化

AI 算力的瓶颈通常不在计算量 (FLOPS)，而在内存带宽 (Memory Bound)。

### 4.1 内存访问模式优化
- **Kernel Fusion (算子融合)**：将连续的算子（如 ReLU + Bias）合并为一个 GPU Kernel，减少中间数据写入显存的次数。
- **FlashAttention 核心思想**：利用 SRAM 与 HBM 的带宽差异，分块 (Tiling) 计算 Attention，避免存储 $N \times N$ 的中间注意力矩阵。

---

## 5. C++ 模拟验证与练习 (Examples)

### 例题 1：张量形状变换模拟器
实现一个 C++ 类，根据卷积参数自动计算输出张量形状并处理 Stride。

<CodeCollapse title="C++ 实现：卷积形状推导" language="cpp">

```cpp
#include <iostream>
#include <cmath>

struct ConvParams {
    int H_in, W_in;
    int K_h, K_w;
    int stride;
    int padding;
    int dilation;
};

struct Shape {
    int H, W;
};

Shape calculate_output_shape(ConvParams p) {
    int H_out = floor((p.H_in + 2 * p.padding - p.dilation * (p.K_h - 1) - 1) / p.stride + 1);
    int W_out = floor((p.W_in + 2 * p.padding - p.dilation * (p.K_w - 1) - 1) / p.stride + 1);
    return {H_out, W_out};
}

int main() {
    // 模拟常见场景：224x224 输入, 3x3 卷积, stride=2, padding=1
    ConvParams p = {224, 224, 3, 3, 2, 1, 1};
    Shape out = calculate_output_shape(p);
    std::cout << "Output Shape: " << out.H << "x" << out.W << std::endl; // 112x112
    return 0;
}
```

</CodeCollapse>

### 例题 2：手写简单自注意力算子 (CPU 版)
使用 C++ 模拟自注意力机制的核心计算过程（不含 Softmax 细节）。

<CodeCollapse title="C++ 实现：Attention Operator" language="cpp">

```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <numeric>

typedef std::vector<std::vector<double>> Matrix;

Matrix matmul(const Matrix& A, const Matrix& B) {
    int N = A.size(), K = A[0].size(), M = B[0].size();
    Matrix C(N, std::vector<double>(M, 0.0));
    for(int i=0; i<N; ++i)
        for(int k=0; k<K; ++k)
            for(int j=0; j<M; ++j)
                C[i][j] += A[i][k] * B[k][j];
    return C;
}

void attention_simulate(const Matrix& Q, const Matrix& K, const Matrix& V) {
    int n = Q.size();
    int d_k = Q[0].size();
    
    // 1. Q * K^T
    Matrix scores(n, std::vector<double>(n, 0.0));
    for(int i=0; i<n; ++i) {
        for(int j=0; j<n; ++j) {
            double dot = 0;
            for(int k=0; k<d_k; ++k) dot += Q[i][k] * K[j][k];
            scores[i][j] = dot / sqrt(d_k); // Scaling
        }
    }
    
    // 2. 模拟输出 (省略 Softmax)
    Matrix output = matmul(scores, V);
    std::cout << "Attention Output (Top-Left): " << output[0][0] << std::endl;
}

int main() {
    Matrix Q = {{1, 0}, {0, 1}}; // 2 tokens, dim=2
    Matrix K = {{1, 0}, {0, 1}};
    Matrix V = {{1, 2}, {3, 4}};
    attention_simulate(Q, K, V);
    return 0;
}
```

</CodeCollapse>

---

## 6. 进阶练习与挑战 (Exercises)

### 练习 1：卷积的平移不变性证明
证明对于卷积算子 $\ast$，其满足 $f(x - \delta) \ast w = (f \ast w)(x - \delta)$。这一性质对图像处理有何意义？

<details>
<summary>Check Solution</summary>

**证明：**
根据连续卷积定义 $(f \ast w)(t) = \int f(\tau)w(t - \tau) d\tau$。
令 $g(t) = f(t - \delta)$。
则 $(g \ast w)(t) = \int f(\tau - \delta)w(t - \tau) d\tau$。
令 $u = \tau - \delta \implies \tau = u + \delta, d\tau = du$。
$(g \ast w)(t) = \int f(u)w(t - (u + \delta)) du = \int f(u)w((t - \delta) - u) du = (f \ast w)(t - \delta)$。

**意义：**
平移不变性意味着如果输入图像中的物体移动了，其特征响应图（Feature Map）也会发生相应的位移，但特征本身（如边缘、纹理）不会改变。这保证了 CNN 对物体位置的不敏感性。
</details>

### 练习 2：C++ 算子融合 (Kernel Fusion) 模拟
在深度学习推理中，线性层后通常跟着 ReLU。编写一个 C++ 函数，分别实现“分离执行”和“融合执行”，并比较缓存局部性的差异。

<details>
<summary>Check Solution (Fusion Concept)</summary>

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

void layer_separate(std::vector<double>& vec, double bias) {
    // Bias Stage
    for(auto& x : vec) x += bias;
    // ReLU Stage (再次遍历，浪费缓存)
    for(auto& x : vec) x = std::max(0.0, x);
}

void layer_fused(std::vector<double>& vec, double bias) {
    // 融合执行 (一次遍历，更好的 Cache Locality)
    for(auto& x : vec) {
        x = std::max(0.0, x + bias);
    }
}
```
工程上，融合能显著降低对显存/内存的带宽压力。
</details>

### 练习 3：Transformer 显存开销估算
假设输入序列长度为 $N$，模型维度为 $d_{model}$。
1. 计算 Self-Attention 矩阵（$QK^T$）的空间复杂度。
2. 当 $N$ 从 1024 增加到 8192 时，显存消耗增加多少倍？
3. 如何使用分块（Tiling）思想降低峰值显存？

<details>
<summary>Check Solution</summary>

1. **复杂度**：$O(N^2)$。注意力评分矩阵的大小是 $N \times N$。
2. **倍数**：由于是平方关系，$(8192/1024)^2 = 8^2 = 64$ 倍。
3. **优化建议**：使用 FlashAttention。它不需要一次性生成完整的 $N \times N$ 矩阵，而是通过在线 Softmax（Online Softmax）算法，在计算 $QK^T$ 的一部分时立即与 $V$ 结合，从而将中间存储复杂度降为 $O(N)$。
</details>
