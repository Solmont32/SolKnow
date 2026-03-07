---
title: 竞赛几何：四点共圆与方幂定理
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 竞赛几何：四点共圆与方幂定理

初中几何竞赛的灵魂在于“圆”与“比例”的结合。

## 一、 核心知识点讲解

### 1. 四点共圆的判定与性质
-   **判定 1**：对角互补。
-   **判定 2**：同侧两点对定线段所张角相等。
-   **性质**：共圆四点形成的四边形满足托勒密定理：$AC \cdot BD = AB \cdot CD + AD \cdot BC$。

### 2. 方幂定理 (Power of a Point Theorem)
点 $P$ 对圆 $O$ 的方幂是一个定值，由此引出：
-   **相交弦定理**：圆内两弦交于点 $P$，则 $PA \cdot PB = PC \cdot PD$。
-   **切割线定理**：从圆外点 $P$ 引切线 $PT$ 和割线 $PAB$，则 $PT^2 = PA \cdot PB$。

### 3. 相似与面积比
-   相似三角形面积比等于相似比的平方。
-   **共角定理**：两个三角形共用一个角 $\alpha$，则面积比等于夹角边乘积之比。

<KnowledgeCard type="info" title="四点共圆的重要性">
四点共圆是连接角度（圆周角定理）与长度（相似三角形）的最佳跳板。
</KnowledgeCard>

---

## 二、 经典例题实战

### 例题 1：托勒密定理的直接应用
正三角形 $ABC$ 外接圆的弧 $BC$ 上有一点 $P$。证明：$PA = PB + PC$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1.  **识别结构**：四点 $A, B, P, C$ 在同一个圆上，构成圆内接四边形 $ABPC$。
2.  **应用托勒密定理**：对四边形 $ABPC$ 有 $AP \cdot BC = AB \cdot PC + AC \cdot PB$。
3.  **利用正三角形性质**：由于 $AB = BC = AC = s$。
4.  **代换化简**：$AP \cdot s = s \cdot PC + s \cdot PB$。
5.  **消去 s**：$AP = PC + PB$。

#### 答案
证毕。
</details>

### 例题 2：方幂定理求长度
点 $P$ 在圆外，$PT$ 是圆的切线，$T$ 为切点。割线 $PAB$ 经过圆心，已知 $PT = 4$，$PB = 8$。求该圆的半径。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1.  **切割线定理**：$PT^2 = PA \cdot PB$。
2.  **代入求 PA**：$4^2 = PA \cdot 8 \implies 16 = 8 \cdot PA \implies PA = 2$。
3.  **几何关系**：割线 $PAB$ 经过圆心，说明 $AB$ 是直径。
4.  **计算直径**：$AB = PB - PA = 8 - 2 = 6$。
5.  **计算半径**：$R = AB / 2 = 3$。

#### 答案
$3$
</details>
