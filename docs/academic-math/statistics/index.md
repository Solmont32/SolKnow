---
title: 数理统计 (Mathematical Statistics)
description: 统计推断的核心理论，涵盖抽样分布、参数估计、假设检验与回归分析
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";
import { Database, Target, GitBranch, TrendingUp, Calculator } from 'lucide-react';

# 数理统计 (Mathematical Statistics)

数理统计是研究如何有效地**收集**、**整理**和**分析**带有随机性的数据，并对所考察的问题作出**推断**的学科。它是连接概率理论与实际应用的桥梁。

---

## 知识架构

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<KnowledgeCard type="info" title={<><Database className="inline-block mr-2" /> 抽样分布</>}>
从总体到样本的过渡。掌握 $\chi^2$ 分布、$t$ 分布、$F$ 分布的构造与性质，这是统计推断的基石。
</KnowledgeCard>

<KnowledgeCard type="success" title={<><Target className="inline-block mr-2" /> 参数估计</>}>
点估计（矩估计、极大似然估计）与区间估计。评价标准：无偏性、有效性、相合性。
</KnowledgeCard>

<KnowledgeCard type="warning" title={<><GitBranch className="inline-block mr-2" /> 假设检验</>}>
显著性检验原理、正态总体参数检验、拟合优度检验。理解第一类与第二类错误。
</KnowledgeCard>

<KnowledgeCard type="tip" title={<><TrendingUp className="inline-block mr-2" /> 回归分析</>}>
一元与多元线性回归、最小二乘估计、模型诊断与预测。
</KnowledgeCard>

</div>

---

## 章节目录

### 1. [抽样分布 (Sampling Distribution)](sampling)

- **统计量与抽样分布**：样本均值、样本方差的分布
- **三大分布**：$\chi^2(n)$、$t(n)$、$F(m,n)$ 的定义与性质
- **正态总体下的抽样分布定理**

### 2. [参数估计 (Estimation)](estimation)

- **点估计方法**：
  - 矩估计法（Method of Moments）
  - 极大似然估计（Maximum Likelihood Estimation）
- **估计量的评价**：无偏性、有效性、Cramér-Rao 下界
- **区间估计**：置信区间的构造与解释

### 3. [假设检验 (Hypothesis Testing)](hypothesis-testing)

- **基本概念**：原假设 vs 备择假设、显著性水平、P 值
- **参数检验**：单样本/双样本正态总体检验
- **非参数检验**：$\chi^2$ 拟合优度检验、独立性检验

### 4. [回归分析 (Regression Analysis)](regression)

- **一元线性回归**：最小二乘估计、显著性检验
- **多元线性回归**：矩阵形式、共线性诊断
- **模型评估**：$R^2$、残差分析

---

## 计算验证：C++ 统计量计算

<details>
<summary>点击查看 C++ 实现样本统计量计算</summary>

```cpp
#include <iostream>
#include <vector>
#include <math>
#include <iomanip>

using namespace std;

struct Statistics {
    double mean;
    double variance;      // 样本方差 (n-1)
    double std_dev;
    double min, max;
};

Statistics compute_stats(const vector<double>& data) {
    int n = data.size();
    double sum = 0, sum_sq = 0;
    double min_val = data[0], max_val = data[0];

    for (double x : data) {
        sum += x;
        sum_sq += x * x;
        min_val = min(min_val, x);
        max_val = max(max_val, x);
    }

    double mean = sum / n;
    // 样本方差 (无偏估计)
    double variance = (sum_sq - n * mean * mean) / (n - 1);

    return {mean, variance, sqrt(variance), min_val, max_val};
}

int main() {
    // 示例数据
    vector<double> data = {12.5, 13.2, 11.8, 14.1, 12.9, 13.5, 12.3, 13.8};

    auto stats = compute_stats(data);

    cout << fixed << setprecision(4);
    cout << "样本统计量:" << endl;
    cout << "样本均值: " << stats.mean << endl;
    cout << "样本方差: " << stats.variance << endl;
    cout << "标准差:   " << stats.std_dev << endl;
    cout << "最小值:   " << stats.min << endl;
    cout << "最大值:   " << stats.max << endl;

    return 0;
}
```

</details>

---

## 跨领域映射

| 领域 | 统计应用 | 典型方法 |
|:-----|:---------|:---------|
| **机器学习** | 模型评估、特征选择 | 交叉验证、假设检验 |
| **金融工程** | 风险度量、收益率分析 | VaR、时间序列分析 |
| **生物统计** | 临床试验、基因分析 | 生存分析、多重检验 |
| **质量控制** | 过程监控、缺陷检测 | 控制图、抽样检验 |

---

> **学习建议**：数理统计的核心在于理解"从样本推断总体"的思想。建议在学习理论的同时，使用 Python (scipy.stats) 或 R 进行实际数据分析练习。

---

_本章节由 SolKnow 系统根据标准教材整理。_
