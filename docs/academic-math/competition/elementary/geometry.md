---
title: 奥数几何：面积模型与比例之美
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 奥数几何：面积模型与比例之美

几何问题的核心在于“转换”：将不规则图形转化为规则图形，将长度关系转化为面积比例。

## 一、 核心知识点讲解

### 1. 等底同高模型
-   两个三角形如果 **底相等、高相等**，则它们的面积一定相等。
-   **推论**：若两个三角形高相等，则面积之比等于底之比。

### 2. 蝴蝶模型
在梯形（或任意四边形）中，对角线交点形成的四个三角形：
-   **左右对称**：$S_{\triangle AOD} = S_{\triangle BOC}$（仅限梯形）。
-   **乘积关系**：$S_1 \times S_3 = S_2 \times S_4$（任意四边形均成立）。

### 3. 燕尾模型
在一个大三角形 $ABC$ 中，从顶点出发的三条线段交于一点 $O$，形成的侧翼三角形与底边比例关系：
-   $S_{\triangle ABO} : S_{\triangle ACO} = BD : DC$。

### 4. 圆与扇形
-   **圆面积**：$S = \pi r^2$。
-   **扇形面积**：$S = \frac{n}{360} \pi r^2$。
-   **解题思想**：割补法、容斥法（红领巾模型、叶形模型）。

<KnowledgeCard type="tip" title="解题秘籍">
看到“中点”找等积变换；看到“平行线”找同高三角形；看到“对角线”找蝴蝶模型。
</KnowledgeCard>

---

## 二、 经典例题实战

### 例题 1：蝴蝶模型的综合计算
已知梯形 $ABCD$ 的上底 $AB \parallel$ 下底 $CD$。对角线交于点 $O$。若 $\triangle AOB$ 面积为 $4$ 平方厘米，$\triangle BOC$ 面积为 $8$ 平方厘米。求梯形 $ABCD$ 的总面积。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1.  **利用梯形特性**：在梯形中，对角线分出的两侧三角形面积相等。故 $S_{\triangle AOD} = S_{\triangle BOC} = 8$。
2.  **应用蝴蝶模型比例**：$S_{\triangle AOB} \times S_{\triangle COD} = S_{\triangle AOD} \times S_{\triangle BOC}$。
3.  **代入计算**：$4 \times S_{\triangle COD} = 8 \times 8$。
    -   $4 \times S_{\triangle COD} = 64$。
    -   $S_{\triangle COD} = 16$。
4.  **汇总全图面积**：$S = 4 + 8 + 8 + 16 = 36$。

#### 答案
$36$ 平方厘米。
</details>

### 例题 2：燕尾模型求底边比
在 $\triangle ABC$ 中，点 $D$ 在 $BC$ 上，$O$ 为 $\triangle ABC$ 内一点。已知 $S_{\triangle ABO} = 15$，$S_{\triangle ACO} = 10$。求 $BD : DC$ 的值。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1.  **模型识别**：这是一个典型的燕尾模型场景。
2.  **套用结论**：燕尾定理指出，顶点连线两侧的三角形面积比等于底边的分段比。
3.  **比例计算**：$BD : DC = S_{\triangle ABO} : S_{\triangle ACO}$。
4.  **化简**：$15 : 10 = 3 : 2$。

#### 答案
$3 : 2$。
</details>

### 例题 3：割补法求阴影面积
在一个边长为 $10$ 厘米的正方形内，以各边为直径向内作半圆。求中心交叠形成的“花瓣形”（四叶草）阴影部分的面积。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1.  **容斥原理视角**：四个半圆的面积之和，覆盖了整个正方形区域，且中心的“花瓣”部分被重复计算了多次。
2.  **计算四个半圆总面积**：每个半圆半径 $r = 5$。总面积 = $4 \times (\frac{1}{2} \pi \times 5^2) = 2 \pi \times 25 = 50\pi$。
3.  **计算正方形面积**：$10 \times 10 = 100$。
4.  **差异分析**：四个半圆覆盖的面积 $= \text{正方形} + \text{重复的花瓣部分}$。
5.  **结果**：花瓣面积 $= 50\pi - 100 \approx 50 \times 3.14 - 100 = 157 - 100 = 57$。

#### 答案
$50\pi - 100$（约为 $57$ 平方厘米）。
</details>
