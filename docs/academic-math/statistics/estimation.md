---
title: 参数估计 (Parameter Estimation)
---

# 参数估计 (Parameter Estimation)

## 点估计 (Point Estimation)
通过样本数据计算一个具体数值作为总体参数的估计值。
- **矩估计法**：利用样本矩（平均数等）来估计总体的特征。
- **极大似然估计 (MLE)**：寻找使当前样本观测结果出现概率最大的参数值。

## 区间估计 (Interval Estimation)
给出一个包含总体参数的取值范围，并附带一个可信度（置信水平）。

### 置信区间 (Confidence Interval)
设置信水平为 $1 - \alpha$，寻找区间 $[\hat{\theta}_L, \hat{\theta}_R]$ 使得：
$$P(\hat{\theta}_L \le \theta \le \hat{\theta}_R) = 1 - \alpha$$

## 评价准则
- **无偏性**：估计量的期望等于被估计参数。
- **有效性**：在所有无偏估计量中，方差最小的更有效。
- **一致性**：随着样本量增大，估计量越来越接近参数值。
