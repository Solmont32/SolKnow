---
title: 竞赛几何：近代几何定理与证明
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 竞赛几何：近代几何定理与证明

本章按“定理工具箱 -> 典型模型 -> 题组训练”组织高中数学竞赛中的纯几何内容。重点不是记结论，而是建立可复用的证明链条：

1. 比例链：梅涅劳斯/塞瓦/斯图尔特。
2. 圆幂链：幂定理、切割线、调和分割。
3. 共线共点链：西姆松线、欧拉线、九点圆。

## 一、核心知识点讲解

### 1. 梅涅劳斯定理与塞瓦定理（正逆配套）

在 $\triangle ABC$ 中：

- 若点 $D,E,F$ 分别在 $BC,CA,AB$（可在延长线）上且三点共线，则
$$
\frac{BD}{DC}\cdot\frac{CE}{EA}\cdot\frac{AF}{FB}=1
$$
（有向线段形式）。
- 若三条线 $AD,BE,CF$ 共点，则
$$
\frac{BD}{DC}\cdot\frac{CE}{EA}\cdot\frac{AF}{FB}=1.
$$

竞赛中常见策略：
- 目标是“共线”时，构造比例后用梅涅劳斯逆定理收口。
- 目标是“共点”时，构造三边分比后用塞瓦逆定理收口。

### 2. 斯图尔特定理（长度计算主工具）

设 $D\in BC$，$BD=m,\,DC=n,\,BC=a,\,AD=d,\,AB=c,\,AC=b$，则
$$
b^2m+c^2n=a(d^2+mn).
$$

用途：
- 已知三边和分点，求 cevian 长度；
- 与中线定理/角平分线定理联用；
- 反向用于判定“某点是中点/角平分点”。

### 3. 圆幂定理与切割线模型

对定点 $P$ 与圆 $\omega$：

- 两割线：$PA\cdot PB=PC\cdot PD$；
- 切线-割线：$PT^2=PA\cdot PB$；
- 交弦：$PA\cdot PB=PC\cdot PD$（$P$ 在圆内）。

竞赛意义：把“角度-圆”问题转化为“乘积不变量”问题，经常能与比例定理拼接成一条代数链。

### 4. 欧拉线与九点圆（三心结构）

在任意非等边三角形中：外心 $O$、重心 $G$、垂心 $H$ 共线且
$$
OG:GH=1:2.
$$
九点圆圆心是 $OH$ 中点，过三边中点、三高垂足、以及顶点到垂心连线中点。

<KnowledgeCard type="contest" title="竞赛策略：先定型，再运算">
看到“共点/共线”先判断是否是塞瓦-梅涅劳斯模型；看到“圆+长度”优先尝试圆幂；看到“中点/垂足”优先尝试九点圆结构。先把题目归类，通常比盲目计算更快。
</KnowledgeCard>

---

## 二、经典例题实战

### 例题 1：塞瓦定理逆定理判共点
在 $\triangle ABC$ 中，点 $D,E,F$ 分别在边 $BC,CA,AB$ 上，满足
$$
\frac{BD}{DC}=2,\quad \frac{CE}{EA}=3,\quad \frac{AF}{FB}=\frac16.
$$
证明：$AD,BE,CF$ 三线共点。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程
1. 计算三比分积：
$$
\frac{BD}{DC}\cdot\frac{CE}{EA}\cdot\frac{AF}{FB}=2\cdot 3\cdot\frac16=1.
$$
2. 满足塞瓦定理逆定理条件。
3. 得 $AD,BE,CF$ 共点。

#### 答案
三线共点。

</details>

### 例题 2：梅涅劳斯定理判共线
在 $\triangle ABC$ 中，点 $D\in BC,\ E\in CA,\ F\in AB$，满足
$$
\frac{BD}{DC}=\frac32,\quad \frac{CE}{EA}=\frac45,\quad \frac{AF}{FB}=\frac56.
$$
判断 $D,E,F$ 是否共线。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程
1. 梅涅劳斯定理要求三比分积为 $1$。
2. 计算：
$$
\frac{BD}{DC}\cdot\frac{CE}{EA}\cdot\frac{AF}{FB}
=\frac32\cdot\frac45\cdot\frac56=1.
$$
3. 满足逆定理，因此三点共线。

#### 答案
$D,E,F$ 共线。

</details>

### 例题 3：斯图尔特定理计算线段
在 $\triangle ABC$ 中，$AB=13, AC=15, BC=14$。点 $D$ 为 $BC$ 中点，求 $AD$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程
1. 设 $BD=DC=7$，套用斯图尔特：
$$
15^2\cdot 7+13^2\cdot 7=14(AD^2+49).
$$
2. 左边：$7(225+169)=2758$。
3. 化简得：
$$
AD^2+49=197\Rightarrow AD^2=148.
$$
4. 所以
$$
AD=2\sqrt{37}.
$$

#### 答案
$AD=2\sqrt{37}$。

</details>

### 例题 4：切割线与切线长度
点 $P$ 在圆外，过 $P$ 作割线交圆于 $A,B$，其中 $PA=4, PB=9$；另作切线 $PT$。求 $PT$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程
1. 切割线-切线定理：
$$
PT^2=PA\cdot PB.
$$
2. 代入：
$$
PT^2=4\cdot9=36.
$$
3. 长度取正：$PT=6$。

#### 答案
$PT=6$。

</details>

---

## 三、章节练习（配套）

### 练习 A（基础）
在 $\triangle ABC$ 中，若 $\frac{BD}{DC}=\frac{2}{3},\ \frac{CE}{EA}=\frac{3}{5}$，且 $AD,BE,CF$ 共点，求 $\frac{AF}{FB}$。

<details>

<summary>点击查看过程与答案</summary>

由塞瓦定理
$$
\frac{AF}{FB}=\frac{1}{\frac{BD}{DC}\cdot\frac{CE}{EA}}
=\frac{1}{\frac23\cdot\frac35}=\frac52.
$$
答案：$\frac{AF}{FB}=\frac52$。

</details>

### 练习 B（提高）
在圆外点 $P$ 处作两条割线，第一条交圆于 $A,B$，$PA=3,PB=12$；第二条交圆于 $C,D$，$PC=4$，求 $PD$。

<details>

<summary>点击查看过程与答案</summary>

圆幂不变量：
$$
PA\cdot PB=PC\cdot PD.
$$
代入 $3\cdot12=4\cdot PD$，得 $PD=9$。

</details>

### 练习 C（挑战）
设 $\triangle ABC$ 中 $D\in BC$，已知 $AB=10, AC=17, BC=21, BD=9$。求 $AD$。

<details>

<summary>点击查看过程与答案</summary>

设 $DC=12$，由斯图尔特定理：
$$
17^2\cdot 9+10^2\cdot12=21(AD^2+9\cdot12).
$$
左边 $=2601+1200=3801$，右边 $=21(AD^2+108)$。
故
$$
AD^2+108=181\Rightarrow AD^2=73.
$$
答案：$AD=\sqrt{73}$。

</details>

