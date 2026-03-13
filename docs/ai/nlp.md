---
title: 自然语言处理 (NLP)：从统计语言模型到大语言模型
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";
import CodeCollapse from "@site/src/components/CodeCollapse";
import { MessageSquare, Languages, Database, Search } from 'lucide-react';

# <Languages className="inline-block mr-2 mb-1" /> 自然语言处理 (NLP)

> **“NLP 的核心是将离散的符号转换为连续的概率空间。”** 本章节系统化梳理了从统计方法到现代大模型（LLM）的演进逻辑。

---

## 1. 词表示：从 One-hot 到分布式表示 (Word Embeddings)

### 1.1 One-hot 的局限性
- **维度灾难**：词表 $V$ 过大。
- **正交性**：任意两个词向量的点积为 0，无法刻画词与词之间的语义相似度。

### 1.2 Word2Vec：分布式语义的诞生
Word2Vec 利用“上下文决定语义”的假设（Distributional Hypothesis），将词映射到低维稠密向量空间。

- **Skip-gram 模型**：根据中心词预测上下文。
  $$L = -\sum_{t=1}^T \sum_{-m \le j \le m, j \neq 0} \log P(w_{t+j} | w_t)$$
- **负采样 (Negative Sampling)**：为了加速计算，将大规模多分类问题转化为二分类问题。

---

## 2. 预训练语言模型 (PLMs)：BERT 与掩码语言模型

BERT 引入了双向 Transformer 编码器，通过大规模预训练捕捉上下文特征。

### 2.1 核心任务：掩码语言模型 (MLM)
随机遮盖 15% 的 Token，让模型根据上下文预测遮盖位置的内容。
$$L_{MLM} = -\mathbb{E} [\sum_{i \in \text{mask}} \log P(x_i | x_{\setminus \text{mask}})]$$

### 2.2 BERT 的双向性证明
**证明**：在双向模型中，每一层的 Token $h_i^{(l)}$ 都包含其左右两侧所有 Token 的信息。这使得 BERT 在提取静态特征（如情感分析、命名实体识别）时优于单向模型。

---

## 3. 大语言模型 (LLM)：从生成式预训练到对齐

### 3.1 解码器架构 (Decoder-only)
GPT 系列采用了仅包含解码器的架构，更适合生成任务。模型根据上文预测下一个 Token：
$$P(x_1, \dots, x_n) = \prod_{i=1}^n P(x_i | x_1, \dots, x_{i-1})$$

### 3.2 涌现能力 (Emergent Abilities)
当模型参数规模超过一定阈值（如 60B）时，模型会突然展现出原本不具备的逻辑推理、零样本学习等能力。

---

## 4. C++ 模拟：简单的 N-gram 模型

手动实现一个基于频率的 2-gram 语言模型。

<CodeCollapse title="C++ 实现：Bigram 语言模型模拟" language="cpp">

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <map>

class BigramModel {
    std::map<std::pair<std::string, std::string>, int> counts;
    std::map<std::string, int> context_counts;

public:
    void train(const std::vector<std::string>& tokens) {
        for (size_t i = 0; i < tokens.size() - 1; ++i) {
            counts[{tokens[i], tokens[i+1]}]++;
            context_counts[tokens[i]]++;
        }
    }

    double get_probability(const std::string& prev, const std::string& current) {
        if (context_counts[prev] == 0) return 0.0;
        return (double)counts[{prev, current}] / context_counts[prev];
    }
};

int main() {
    std::vector<std::string> corpus = {"I", "love", "AI", "and", "I", "love", "NLP"};
    BigramModel model;
    model.train(corpus);

    std::cout << "P(love | I) = " << model.get_probability("I", "love") << std::endl; // 1.0
    std::cout << "P(NLP | love) = " << model.get_probability("love", "NLP") << std::endl; // 0.5
    return 0;
}
```

</CodeCollapse>

---

## 5. 进阶练习 (Exercises)

### 练习 1：Word2Vec 的负采样损失函数
证明：负采样的目标函数等价于最大化正样本的概率，同时最小化随机噪声样本的概率。

<details>
<summary>Check Solution</summary>

**解析：**
负采样损失定义为：
$$L = -\log \sigma(v_w^T v_c) - \sum_{i=1}^k \mathbb{E}_{w_i \sim P_n(w)} [\log \sigma(-v_{w_i}^T v_c)]$$
其中 $\sigma$ 是 Sigmoid。第一项拉近词 $w$ 与上下文 $c$ 的距离，第二项推开噪声词 $w_i$。

</details>

### 练习 2：BERT 与 GPT 的计算效率对比
在推理（Inference）阶段，为什么 GPT 比 BERT 更耗费显存？

<details>
<summary>Check Solution</summary>

**解析：**
因为 GPT 是自回归生成的，为了避免重复计算，必须维护 **KV Cache**。而 BERT 是单次并行推断（One-pass），不需要显式缓存。

</details>
