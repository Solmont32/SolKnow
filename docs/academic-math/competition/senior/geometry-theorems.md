---
title: 竞赛几何：梅涅劳斯与塞瓦定理
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 竞赛几何：梅涅劳斯与塞瓦定理

这两个定理是处理三角形比例关系的终极武器。

## 1. 梅涅劳斯定理 (Menelaus's Theorem)
若一直线截 $\triangle ABC$ 的三边 $AB, BC, CA$（或其延长线）于 $F, D, E$，则：
$$\frac{AF}{FB} \cdot \frac{BD}{DC} \cdot \frac{CE}{EA} = 1$$

## 2. 塞瓦定理 (Ceva's Theorem)
在 $\triangle ABC$ 中，点 $P$ 为内部一点，射线 $AP, BP, CP$ 分别交对边于 $D, E, F$，则：
$$\frac{AF}{FB} \cdot \frac{BD}{DC} \cdot \frac{CE}{EA} = 1$$

---

## 典型例题

### 例题 1：面积比的推导
利用塞瓦定理证明：三角形三条中线交于一点（重心）。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **中线性质**：若 $D, E, F$ 分别是 $BC, CA, AB$ 的中点，则 $\frac{BD}{DC} = 1, \frac{CE}{EA} = 1, \frac{AF}{FB} = 1$。
2. **代入塞瓦定理**：$1 \times 1 \times 1 = 1$。
3. **结论**：满足塞瓦定理逆定理，故三条中线必共点。

#### 答案
证毕。
</details>
