---
title: 平面向量 (Planar Vectors)
sidebar_label: 向量工具
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";

import { MoveUpRight, Grid3X3, Ruler, PenTool } from 'lucide-react';


# <MoveUpRight className="inline-block mr-2 mb-1" size={32} /> 平面向量 (Planar Vectors)

向量（Vector）是既有大小又有方向的量。作为高中数学中连接几何与代数的“桥梁”，向量不仅可以用于代数运算，还能通过线性组合刻画几何图形的本质属性。

## 1. 向量的线性运算

### <Grid3X3 className="inline-block mr-1 mb-1" size={24} /> 1.1 加法与数乘
1. **加法法则**：遵循三角形法则或平行四边形法则。
   - **几何性质**：$\vec{a} + \vec{b} = \vec{c}$。
2. **共线判定**：若 $\vec{a} \neq \vec{0}$，且存在实数 $\lambda$ 使得 $\vec{b} = \lambda \vec{a}$，则 $\vec{a} \parallel \vec{b}$。

### 1.2 平面向量基本定理
如果 $\vec{e_1}, \vec{e_2}$ 是同一平面内的两个 **不共线** 向量，那么对于该平面内的任意向量 $\vec{a}$，有且只有一对实数 $\lambda_1, \lambda_2$，使得：
$$\vec{a} = \lambda_1 \vec{e_1} + \lambda_2 \vec{e_2}$$

---

## 2. 数量积 (Scalar Product)

### <Ruler className="inline-block mr-1 mb-1" size={24} /> 2.1 定义与运算
设向量 $\vec{a}, \vec{b}$ 的夹角为 $\theta$，则其数量积定义为：
$$\vec{a} \cdot \vec{b} = |\vec{a}| |\vec{b}| \cos \theta$$

**坐标表示**：若 $\vec{a} = (x_1, y_1), \vec{b} = (x_2, y_2)$，则：
$$\vec{a} \cdot \vec{b} = x_1 x_2 + y_1 y_2$$

<KnowledgeCard type="warning" title="重要性质">
1. **垂直判定**：$\vec{a} \perp \vec{b} \iff \vec{a} \cdot \vec{b} = 0$。
2. **模长计算**：$|\vec{a}| = \sqrt{\vec{a} \cdot \vec{a}} = \sqrt{x^2 + y^2}$。
3. **夹角余弦**：$\cos \theta = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| |\vec{b}|}$。
</KnowledgeCard>

---

## 3. 几何证明中的“向量工具”

向量在证明几何定理（如余弦定理、中线定理）时具有极强的代数化优势。

- **余弦定理证明思路**：
  设 $\triangle ABC$ 中，$\vec{BC} = \vec{AC} - \vec{AB}$。两边平方：
  $$|\vec{BC}|^2 = (\vec{AC} - \vec{AB})^2 = |\vec{AC}|^2 + |\vec{AB}|^2 - 2\vec{AC} \cdot \vec{AB}$$
  $$a^2 = b^2 + c^2 - 2bc \cos A$$

---

## 4. 深度挑战题

### <PenTool className="inline-block mr-1 mb-1" size={24} /> 练习：三点共线性质
已知 $O$ 为 $\triangle ABC$ 外一点，且满足 $\vec{OP} = \lambda \vec{OA} + \mu \vec{OB}$，其中 $\lambda + \mu = 1$。证明：点 $P, A, B$ 三点共线。

<details>
<summary>点击查看详细解答 (Check Solution)</summary>

**证明：**
1. **利用定义**：我们需要证明 $\vec{AP}$ 与 $\vec{AB}$ 共线。
2. **转化起点**：
   $$\vec{AP} = \vec{OP} - \vec{OA}$$
   将已知条件 $\vec{OP} = \lambda \vec{OA} + \mu \vec{OB}$ 代入：
   $$\vec{AP} = (\lambda \vec{OA} + \mu \vec{OB}) - \vec{OA} = (\lambda - 1)\vec{OA} + \mu \vec{OB}$$
3. **代换关系**：由题意 $\lambda + \mu = 1$，得 $\lambda - 1 = -\mu$。
   $$\vec{AP} = -\mu \vec{OA} + \mu \vec{OB} = \mu (\vec{OB} - \vec{OA}) = \mu \vec{AB}$$
4. **结论**：既然存在实数 $\mu$ 使得 $\vec{AP} = \mu \vec{AB}$，则根据共线向量基本定理，$P, A, B$ 三点共线。
</details>

---

_本章节强调向量作为几何“代数化”工具的统一性。_