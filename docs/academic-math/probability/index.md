---
title: 概率论与数理统计 (Probability & Statistics)
---

import { Code2, Layers } from 'lucide-react';

# 概率论与数理统计 (Probability & Statistics)

概率论与数理统计是研究随机现象数量规律的数学分支。本教程从公理化体系出发，涵盖随机变量、极限定理，并深入到数理统计的核心推断方法。

## 理论核心 (Theory)

- **[事件与概率公理化体系 (Events)](events)**：柯尔莫哥洛夫公理、全概率与贝叶斯。
- **[离散型随机变量 (Discrete RV)](discrete-rv)**：期望、方差及常用分布 (二项, 泊松)。
- **[连续型随机变量 (Continuous RV)](continuous-rv)**：密度函数及常用分布 (正态, 指数)。
- **[特征函数 (Characteristic Functions)](characteristic-functions)**：概率论的解析工具与傅里叶变换。
- **[大数定律与中心极限定理 (Limit Theorems)](limit-theorems)**：揭示大量随机现象背后的确定性趋势。

## 数理统计 (Statistics)

- **[抽样分布 (Sampling Distributions)](sampling-distributions)**：$\chi^2, t, F$ 三大常用分布。
- **[参数估计 (Parameter Estimation)](parameter-estimation)**：极大似然估计 (MLE) 与区间估计。
- **[假设检验 (Hypothesis Testing)](hypothesis-testing)**：显著性水平、两类错误与 P-值决策。

---

## 计算验证：C++ 蒙特卡洛模拟 <Code2 className="inline-block ml-1" />

概率论中的许多结论可以通过随机模拟（蒙特卡洛方法）来验证。以下是使用 C++ 模拟掷硬币过程并验证大数定律的示例。

<details>
<summary>点击查看 C++ 验证代码</summary>

```cpp
#include <iostream>
#include <random>
#include <vector>
#include <iomanip>

/**
 * @brief 蒙特卡洛模拟：验证大数定律 (LLN)
 */
int main() {
    std::random_device rd;
    std::mt19937 gen(rd());
    std::bernoulli_distribution d(0.5); // 公平硬币

    int head_count = 0;
    std::vector<long long> trials = {10, 100, 1000, 10000, 100000, 1000000};

    std::cout << std::fixed << std::setprecision(6);
    std::cout << "Trials\t\tHeads Ratio\tError" << std::endl;
    std::cout << "---------------------------------------------" << std::endl;

    long long current_total = 0;
    for (long long n : trials) {
        while (current_total < n) {
            if (d(gen)) head_count++;
            current_total++;
        }
        double ratio = (double)head_count / n;
        std::cout << n << "\t\t" << ratio << "\t" << std::abs(ratio - 0.5) << std::endl;
    }
    return 0;
}
```

</details>

---

## 跨领域映射 <Layers className="inline-block ml-1" />

| 领域           | 对应概念       | 说明                                                           |
| :------------- | :------------- | :------------------------------------------------------------- |
| **机器学习**   | 贝叶斯推断     | 利用先验概率与证据更新后验概率，构建生成模型。                 |
| **金融数学**   | 随机微积分     | 使用布朗运动描述资产价格的波动（Black-Scholes 模型）。         |
| **量子力学**   | 概率幅与波函数 | 粒子的状态由复概率幅描述，测量结果服从波函数模平方的概率分布。 |
| **计算机网络** | 排队论         | 研究数据包到达与处理过程的随机性，优化缓冲区大小。             |

---

## 学习建议

> 概率论是基础，统计学是应用。建议首先掌握 **中心极限定理**，它是连接概率理论与统计推断的桥梁。

---

_本课程旨在建立工业级严谨度的随机建模与统计分析能力。_
