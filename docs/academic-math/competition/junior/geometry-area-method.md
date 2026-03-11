---
title: 竞赛几何：面积法与相似构造
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";

# 竞赛几何：面积法与相似构造

初中几何竞赛中，许多线段比与角度结论都可以通过“同高面积比 + 相似三角形”快速建立。

## 一、核心知识点讲解

### 1. 同高三角形面积比

- 若三角形有同一条高，则面积比等于对应底边比。
- 常见形态：点在同一直线上，比较若干三角形面积。
- 公式：若 $\triangle ABP,\triangle ACP$ 到直线 $BC$ 的高相同，则

$$\frac{S_{ABP}}{S_{ACP}}=\frac{BP}{CP}.$$

### 2. 同底三角形面积比

- 若三角形共底，则面积比等于对应高比。
- 适用于平行线模型：平行线间距离相等时，面积常相等。

### 3. 面积法与相似三角形联动

- 先用面积比得到线段比，再用“夹角相等 + 两边成比例”判定相似。
- 相似后可反推角相等、线段比、周长比与面积比。
- 高频策略：
  1. 先找“同高/同底”面积比；
  2. 再转成线段比；
  3. 最后落到相似与长度计算。

<KnowledgeCard type="tip" title="面积法触发信号">
题目出现“中线、平行线、分点、面积比”时，优先尝试面积法；若再出现等角信息，基本可与相似三角形联用。
</KnowledgeCard>

---

## 二、经典例题实战

### 例题 1：中线分割面积

在 $\triangle ABC$ 中，$D$ 是 $BC$ 中点。已知 $S_{ABC}=24$，求 $S_{ABD}$ 与 $S_{ACD}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程

1. $D$ 是 $BC$ 中点，所以 $BD=DC$。
2. 三角形 $ABD$ 与 $ACD$ 到直线 $BC$ 的高相同。
3. 面积比等于底边比：

$$S_{ABD}:S_{ACD}=BD:DC=1:1.$$

4. 两者和为 $24$，故各为 $12$。

#### 答案

$$S_{ABD}=12,\quad S_{ACD}=12.$$

</details>

### 例题 2：已知面积比求分点比

在 $\triangle ABC$ 中，点 $D$ 在 $BC$ 上。已知

$$S_{ABD}:S_{ACD}=3:5,$$

求 $BD:DC$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程

1. 两个三角形共顶点 $A$，且底边都在 $BC$ 上，高相同。
2. 面积比等于底边比：

$$\frac{S_{ABD}}{S_{ACD}}=\frac{BD}{DC}=\frac35.$$

#### 答案

$$BD:DC=3:5.$$

</details>

### 例题 3：平行线模型中的面积关系

在 $\triangle ABC$ 中，过点 $D\in AB$ 作 $DE\parallel BC$ 交 $AC$ 于 $E$。若

$$AD:DB=2:1,\quad S_{ABC}=27,$$

求 $S_{ADE}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程

1. 由 $DE\parallel BC$，得 $\triangle ADE\sim\triangle ABC$。
2. $AD:AB=2:(2+1)=2:3$。
3. 相似三角形面积比等于相似比平方：

$$\frac{S_{ADE}}{S_{ABC}}=\left(\frac{2}{3}\right)^2=\frac49.$$

4. 所以

$$S_{ADE}=27\cdot\frac49=12.$$

#### 答案

$$S_{ADE}=12.$$

</details>

### 例题 4：面积比反推边长比

在 $\triangle ABC$ 中，点 $D$ 在边 $BC$ 上，且

$$S_{ABD}=8,\quad S_{ADC}=12,$$

已知 $BC=10$，求 $BD,DC$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程

1. $\triangle ABD$ 与 $\triangle ACD$ 同高（高为 $A$ 到 $BC$ 的距离）。
2. 故

$$BD:DC=S_{ABD}:S_{ADC}=8:12=2:3.$$

3. 设 $BD=2k,DC=3k$，则 $5k=10$，得 $k=2$。
4. 所以 $BD=4,DC=6$。

#### 答案

$$BD=4,\quad DC=6.$$

</details>

---

## 三、配套练习（点击展开答案）

### 练习 1

在 $\triangle ABC$ 中，点 $D$ 在 $BC$ 上。若 $BD:DC=4:7$，求

$$S_{ABD}:S_{ACD}.$$

<details>

<summary>点击查看过程与答案</summary>

#### 过程

同高三角形面积比等于底边比，故

$$S_{ABD}:S_{ACD}=BD:DC=4:7.$$

#### 答案

$4:7$。

</details>

### 练习 2

在 $\triangle ABC$ 中，点 $D$ 在 $BC$ 上。若

$$
S_{ABD}:S_{ACD}=5:3,
\quad BC=24,
$$

求 $BD,DC$。

<details>

<summary>点击查看过程与答案</summary>

#### 过程

由同高面积比得 $BD:DC=5:3$。
设 $BD=5k,DC=3k$，则 $8k=24$，$k=3$。
故 $BD=15,DC=9$。

#### 答案

$BD=15,\ DC=9$。

</details>

### 练习 3

在 $\triangle ABC$ 中，$D\in AB$，过 $D$ 作 $DE\parallel BC$ 交 $AC$ 于 $E$。
若 $AD:AB=3:5$，且 $S_{ABC}=50$，求 $S_{ADE}$。

<details>

<summary>点击查看过程与答案</summary>

#### 过程

$\triangle ADE\sim\triangle ABC$，面积比为相似比平方：

$$\frac{S_{ADE}}{S_{ABC}}=\left(\frac35\right)^2=\frac{9}{25}.$$

故

$$S_{ADE}=50\cdot\frac{9}{25}=18.$$

#### 答案

$18$。

</details>

### 练习 4

在 $\triangle ABC$ 中，点 $D$ 在 $BC$ 上，且

$$S_{ABD}=18,\quad S_{ACD}=27.$$

求 $BD:BC$。

<details>

<summary>点击查看过程与答案</summary>

#### 过程

同高得 $BD:DC=18:27=2:3$。
因此 $BD:BC=2:(2+3)=2:5$。

#### 答案

$2:5$。

</details>
