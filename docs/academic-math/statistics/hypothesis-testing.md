---
title: 假设检验 (Hypothesis Testing)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 假设检验 (Hypothesis Testing)

假设检验是统计推断的核心，通过样本数据判断对总体的某种假设是否成立。

## 基本流程

1.  **建立假设**：
    - 原假设 $H_0$（通常是希望推翻的现状）。
    - 备择假设 $H_1$。
2.  **选择显著性水平 $\alpha$**：常用 0.05 或 0.01。
3.  **计算统计量**：如 $Z$ 统计量、$t$ 统计量。
4.  **做出判断**：若 $P$-value $< \alpha$，拒绝 $H_0$。

<KnowledgeCard type="warning" title="两类错误">
- **第一类错误 (弃真)**：$H_0$ 为真却拒绝了它（概率为 $\alpha$）。
- **第二类错误 (取伪)**：$H_0$ 为假却接受了它（概率为 $\beta$）。
</KnowledgeCard>

## 常见检验

- **单正态总体均值检验**（$Z$ 检验或 $t$ 检验）。
- **双总体均值差检验**。
- **卡方检验**（用于分类变量的独立性判定）。
