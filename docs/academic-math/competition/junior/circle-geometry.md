---
title: 竞赛几何：四点共圆、方幂与圆中比例
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 竞赛几何：四点共圆、方幂与圆中比例

初中几何竞赛里，圆题的核心是“角度关系 + 长度关系 + 相似变换”的联动。

## 一、核心知识点讲解

### 1. 四点共圆的判定与反向构造
- 判定 1（对角互补）：若 $\angle A+\angle C=180^\circ$，则 $A,B,C,D$ 共圆。
- 判定 2（同弧等角）：若 $\angle ABC=\angle ADC$，则 $A,B,C,D$ 共圆。
- 判定 3（幂相等）：若存在点 $P$，使 $PA\cdot PB=PC\cdot PD$，则常可反推四点共圆。
- 反向思路：若题目出现“等角 + 比例”并伴随交点，优先尝试补圆。

### 2. 方幂定理三种基本形态
- 相交弦：圆内两弦交于 $P$，有 $PA\cdot PB=PC\cdot PD$。
- 割线-割线：圆外点 $P$ 的两条割线 $PAB,PCD$，有 $PA\cdot PB=PC\cdot PD$。
- 切线-割线：圆外点 $P$ 引切线 $PT$ 与割线 $PAB$，有 $PT^2=PA\cdot PB$。

### 3. 圆中相似与长度计算
- 同弧所对圆周角相等，经常导出相似三角形。
- 直径所对圆周角是直角，常用于“构造直角三角形 + 勾股”。
- 托勒密定理（圆内接四边形）：
  $$AC\cdot BD=AB\cdot CD+AD\cdot BC.$$

<KnowledgeCard type="tip" title="圆题识别清单">
一旦看到“切线、割线、交弦、内接四边形、直径”，就应优先联想方幂定理与托勒密定理。
</KnowledgeCard>

---

## 二、经典例题实战

### 例题 1：对角互补判共圆
在四边形 $ABCD$ 中，已知 $\angle ABC=68^\circ,\ \angle ADC=112^\circ$。判断四点是否共圆。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. 计算对角和：$68^\circ+112^\circ=180^\circ$。
2. 满足内接四边形对角互补判定。

#### 答案
$A,B,C,D$ 四点共圆。
</details>

### 例题 2：切割线定理求未知线段
点 $P$ 在圆外，$PT$ 为切线，$PAB$ 为割线。已知 $PT=10,\ PA=8$，求 $PB$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. 切割线定理：$PT^2=PA\cdot PB$。
2. 代入得 $100=8\cdot PB$。
3. 故 $PB=12.5$。

#### 答案
$PB=\dfrac{25}{2}$。
</details>

### 例题 3：交弦定理与比例联立
圆内两弦 $AB,CD$ 交于 $P$，已知 $PA=3,PB=8,PC=4$，求 $PD$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. 交弦定理：$PA\cdot PB=PC\cdot PD$。
2. 代入：$3\times8=4\cdot PD$。
3. 解得 $PD=6$。

#### 答案
$PD=6$。
</details>

### 例题 4：托勒密定理计算对角线
圆内接四边形 $ABCD$ 中，$AB=5,BC=6,CD=4,DA=3,AC=7$，求 $BD$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1. 用托勒密定理：
   $$AC\cdot BD=AB\cdot CD+AD\cdot BC.$$
2. 代入：
   $$7\cdot BD=5\cdot4+3\cdot6=38.$$
3. 故
   $$BD=\frac{38}{7}.$$

#### 答案
$BD=\dfrac{38}{7}$。
</details>

---

## 三、配套练习（点击展开答案）

### 练习 1
已知四边形 $ABCD$ 满足 $\angle A=95^\circ,\ \angle C=85^\circ$，判断是否共圆。

<details>
<summary>点击查看过程与答案</summary>

#### 过程
$\angle A+\angle C=180^\circ$，满足内接四边形判定。

#### 答案
共圆。
</details>

### 练习 2
圆外点 $P$ 满足 $PT=6,PA=4$，求割线另一交点到 $P$ 的距离 $PB$。

<details>
<summary>点击查看过程与答案</summary>

#### 过程
$PT^2=PA\cdot PB$，即 $36=4PB$，故 $PB=9$。

#### 答案
$9$。
</details>

### 练习 3
圆内两弦交于 $P$，若 $PA=2,PB=12,PC=3$，求 $PD$。

<details>
<summary>点击查看过程与答案</summary>

#### 过程
$PA\cdot PB=PC\cdot PD$，即 $2\times12=3\cdot PD$，故 $PD=8$。

#### 答案
$8$。
</details>

### 练习 4
圆内接四边形中 $AB=4,BC=7,CD=2,DA=5,AC=6$，求 $BD$。

<details>
<summary>点击查看过程与答案</summary>

#### 过程
托勒密：$6\cdot BD=4\cdot2+5\cdot7=43$，得
$$BD=\frac{43}{6}.$$

#### 答案
$\dfrac{43}{6}$。
</details>
