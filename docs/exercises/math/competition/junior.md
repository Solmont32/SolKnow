---
title: 初中数学竞赛练习
---

# 初中数学竞赛练习

按“代数-几何-数论-组合-面积法”分层练习。每题都可点击查看过程与答案。

---

## A. 代数变形

### 练习 1
分解因式：$x^4+4$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
$$x^4+4=x^4+4x^2+4-4x^2=(x^2+2)^2-(2x)^2.$$
所以
$$(x^2-2x+2)(x^2+2x+2).$$

#### 答案
$(x^2-2x+2)(x^2+2x+2)$。

</details>

### 练习 2
已知 $a+b=5,ab=6$，求 $a^2+b^2$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
$$a^2+b^2=(a+b)^2-2ab=25-12=13.$$

#### 答案
$13$。

</details>

### 练习 3
化简：$\sqrt{13-4\sqrt{10}}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
设原式 $=\sqrt{(\sqrt m-\sqrt n)^2}$，则
$$m+n=13,\ mn=40,$$
可取 $m=8,n=5$，故原式
$$=|\sqrt8-\sqrt5|=2\sqrt2-\sqrt5.$$

#### 答案
$2\sqrt2-\sqrt5$。

</details>

---

## B. 圆与几何

### 练习 4
在圆内接四边形 $ABCD$ 中，已知 $AB=3,BC=4,CD=2,DA=5,AC=6$，求 $BD$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
托勒密定理：
$$AC\cdot BD=AB\cdot CD+AD\cdot BC=3\cdot2+5\cdot4=26.$$
故
$$BD=\frac{26}{6}=\frac{13}{3}.$$

#### 答案
$\dfrac{13}{3}$。

</details>

### 练习 5
圆外点 $P$ 作切线 $PT$ 与割线 $PAB$，已知 $PT=6,PA=4$，求 $PB$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
切割线定理：
$$PT^2=PA\cdot PB.$$
代入：$36=4\cdot PB$，得 $PB=9$。

#### 答案
$9$。

</details>

### 练习 6
在半径为 5 的圆中，弦长为 8，求圆心到弦的距离。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
弦的一半为 4，作垂线得直角三角形：
$$d^2+4^2=5^2\Rightarrow d^2=9\Rightarrow d=3.$$

#### 答案
$3$。

</details>

---

## C. 数论

### 练习 7
求 $3^{100}\pmod 8$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
$3^2=9\equiv1\pmod8$，周期为 2。
$$3^{100}=(3^2)^{50}\equiv1^{50}=1\pmod8.$$

#### 答案
$1$。

</details>

### 练习 8
解方程 $15x+21y=6$ 的整数解。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
$\gcd(15,21)=3\mid6$，有解。先化简：
$$5x+7y=2.$$
一组特解：$x=6,y=-4$（因为 $5\cdot6+7\cdot(-4)=2$）。
通解：
$$x=6+7k,\ y=-4-5k,\ k\in\mathbb Z.$$

#### 答案
$x=6+7k,\ y=-4-5k,\ k\in\mathbb Z$。

</details>

### 练习 9
求最小正整数 $n$，使得 $n$ 有恰好 18 个正约数。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
18 的分解：$18,9\times2,6\times3,3\times3\times2$。
对应最小值分别比较：
- $2^{17}$ 很大；
- $2^8\cdot3=768$；
- $2^5\cdot3^2=288$；
- $2^2\cdot3^2\cdot5=180$。
最小是 180。

#### 答案
$180$。

</details>

---

## D. 组合与逻辑

### 练习 10
从 1 到 9 中任取 5 个数，证明必有两个数的差是 4 的倍数。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
按模 4 分类：
- 余 0：{4,8}
- 余 1：{1,5,9}
- 余 2：{2,6}
- 余 3：{3,7}
共有 4 类，取 5 个数，抽屉原理知有两个同余于模 4，差即为 4 的倍数。

#### 答案
命题成立。

</details>

### 练习 11
将 7 个球放入 3 个盒子（盒子可空），求分配方案数。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
设三盒球数分别为 $x_1,x_2,x_3$，则
$$x_1+x_2+x_3=7,\ x_i\ge0.$$
用隔板法：
$$\binom{7+3-1}{3-1}=\binom92=36.$$

#### 答案
$36$。

</details>

### 练习 12
棋盘染色后，删除一个黑格和一个白格，是否总能用 $1\times2$ 多米诺完全覆盖剩余格子？

<details>

<summary>点击查看解析与答案</summary>

#### 解析
每块多米诺覆盖 1 黑 1 白。删去一个黑格和一个白格后，黑白数量仍相等，这是可覆盖的必要条件，但不是充分条件。
例如在某些形状被割裂成不连通区域时仍可能不可覆盖。

#### 答案
不一定总能覆盖。

</details>

---

## E. 综合提升

### 练习 13
设正整数 $n$ 满足 $n\equiv 2\pmod 3$ 且 $n\equiv 3\pmod 5$，求最小正整数 $n$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
按模 3 同余于 2 的数：$2,5,8,11,14,17,\dots$。
其中模 5 同余于 3 的最小数是 $8$。

#### 答案
$8$。

</details>

### 练习 14
在 $\triangle ABC$ 中，已知 $AB=AC=10,BC=12$，求外接圆半径 $R$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
先求高：底边一半为 6，
$$h=\sqrt{10^2-6^2}=8.$$
面积
$$S=\frac12\cdot12\cdot8=48.$$
由公式
$$R=\frac{abc}{4S}=\frac{10\cdot10\cdot12}{4\cdot48}=\frac{25}{4}.$$

#### 答案
$\dfrac{25}{4}$。

</details>

### 练习 15
将 10 个不同的球分给甲乙丙三人，每人至少 1 个，问分配方案数。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
总分配数：每球 3 选 1，共 $3^{10}$。
减去某人空手：$\binom31\cdot2^{10}$。
加回两人空手：$\binom32\cdot1^{10}$。
故
$$3^{10}-3\cdot2^{10}+3=55980.$$

#### 答案
$55980$。

</details>

### 练习 16
证明：任意 6 个整数中，必有两个整数之差能被 5 整除。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
按模 5 余数分成 5 类（0,1,2,3,4）。
任取 6 个整数，抽屉原理保证至少两个落在同一余数类。
两数同余模 5，则差可被 5 整除。

#### 答案
命题成立。

</details>

---

## F. 不等式与函数方程

### 练习 17
若 $x>0$，求 $x+\dfrac{9}{x}$ 的最小值。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
由 AM-GM：
$$x+\frac{9}{x}\ge 2\sqrt{x\cdot\frac{9}{x}}=6.$$
当 $x=\dfrac{9}{x}$，即 $x=3$ 时取等。

#### 答案
最小值为 $6$。

</details>

### 练习 18
解不等式：
$$\frac{x+1}{x-2}\le2,\quad x\ne2.$$

<details>

<summary>点击查看解析与答案</summary>

#### 解析
移项得
$$\frac{x+1-2(x-2)}{x-2}=\frac{5-x}{x-2}\le0.$$
临界点为 $x=2,5$，分区间判断可得
$$x\in(-\infty,2)\cup[5,+\infty).$$

#### 答案
$x\in(-\infty,2)\cup[5,+\infty)$。

</details>

### 练习 19
设 $f:\mathbb Z\to\mathbb Z$ 满足
$$f(x+y)=f(x)+f(y),\quad f(3)=12.$$
求 $f(10)$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
由可加性，$f(3)=3f(1)=12$，得 $f(1)=4$。
故
$$f(10)=10f(1)=40.$$

#### 答案
$40$。

</details>

### 练习 20
已知函数满足
$$f(x)+f(8-x)=x^2-8x+26,$$
求 $f(4)$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
令 $x=4$，得
$$2f(4)=16-32+26=10,$$
所以
$$f(4)=5.$$

#### 答案
$5$。

</details>

---

## G. 面积法与相似构造

### 练习 21
在 $\triangle ABC$ 中，点 $D$ 在 $BC$ 上，且 $BD:DC=3:2$。求
$$S_{ABD}:S_{ACD}.$$

<details>

<summary>点击查看解析与答案</summary>

#### 解析
$\triangle ABD$ 与 $\triangle ACD$ 同高，面积比等于底边比：
$$S_{ABD}:S_{ACD}=BD:DC=3:2.$$

#### 答案
$3:2$。

</details>

### 练习 22
在 $\triangle ABC$ 中，点 $D$ 在 $BC$ 上。若
$$S_{ABD}=20,\quad S_{ACD}=30,\quad BC=25,$$
求 $BD$ 与 $DC$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
同高面积比得
$$BD:DC=20:30=2:3.$$
设 $BD=2k,DC=3k$，则 $5k=25$，$k=5$。
故 $BD=10,DC=15$。

#### 答案
$BD=10,\ DC=15$。

</details>

### 练习 23
在 $\triangle ABC$ 中，$D\in AB$，过 $D$ 作 $DE\parallel BC$ 交 $AC$ 于 $E$。若
$$AD:AB=1:2,\quad S_{ABC}=40,$$
求 $S_{ADE}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
$\triangle ADE\sim\triangle ABC$，面积比为相似比平方：
$$\frac{S_{ADE}}{S_{ABC}}=\left(\frac{1}{2}\right)^2=\frac14.$$
故
$$S_{ADE}=40\cdot\frac14=10.$$

#### 答案
$10$。

</details>

### 练习 24
在 $\triangle ABC$ 中，点 $D$ 在 $BC$ 上，且
$$S_{ABD}:S_{ABC}=2:7.$$
求 $BD:BC$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
$\triangle ABD$ 与 $\triangle ABC$ 共享从 $A$ 到 $BC$ 的高，面积比等于底边比：
$$\frac{S_{ABD}}{S_{ABC}}=\frac{BD}{BC}=\frac27.$$

#### 答案
$BD:BC=2:7$。

</details>

---

## H. 平移对称与最短路径构造

### 练习 25
点 $A(0,3),B(8,1)$，点 $P$ 在 $x$ 轴上。求 $AP+PB$ 的最小值。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
将 $A$ 关于 $x$ 轴对称到 $A'(0,-3)$，则
$$\min(AP+PB)=A'B=\sqrt{(8-0)^2+(1+3)^2}=\sqrt{64+16}=4\sqrt5.$$

#### 答案
$4\sqrt5$。

</details>

### 练习 26
矩形 $ABCD$ 中，$AB=9,BC=12$。点 $P$ 在 $BC$ 上，求 $AP+PD$ 的最小值。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
设 $A(0,0),B(9,0),C(9,12),D(0,12)$，把 $D$ 关于 $x=9$ 对称到 $D'(18,12)$。
则
$$\min(AP+PD)=AD'=\sqrt{18^2+12^2}=\sqrt{468}=6\sqrt{13}.$$

#### 答案
$6\sqrt{13}$。

</details>

### 练习 27
点 $A,B$ 在直线 $l$ 同侧，点 $P\in l$。若 $A$ 关于 $l$ 的对称点为 $A'$，写出 $PA+PB$ 最小值。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
有 $PA=PA'$，故
$$PA+PB=PA'+PB\ge A'B.$$
等号在 $P$ 为直线 $A'B$ 与 $l$ 交点时成立。

#### 答案
最小值为 $A'B$。

</details>

### 练习 28
点 $A(-3,2),B(5,6)$，点 $P$ 在直线 $y=0$ 上。求 $AP+PB$ 的最小值。

<details>

<summary>点击查看解析与答案</summary>

#### 解析
将 $A$ 关于 $y=0$ 对称到 $A'(-3,-2)$，则
$$\min(AP+PB)=A'B=\sqrt{(5+3)^2+(6+2)^2}=\sqrt{64+64}=8\sqrt2.$$

#### 答案
$8\sqrt2$。

</details>

---

## I. 不变量与染色构造

### 练习 29
有 12 个整数，每次任选两个数都加 1。问经过若干步后，所有数之和的奇偶性是否可能改变？

<details>

<summary>点击查看解析与答案</summary>

#### 解析
每次操作使总和增加 2，为偶数增量，因此总和奇偶性保持不变。

#### 答案
不可能改变，总和奇偶性不变。

</details>

### 练习 30
数轴上从 0 出发，每步可走 +7 或 -5。问能否到达点 1？

<details>

<summary>点击查看解析与答案</summary>

#### 解析
设向右走 $x$ 次，向左走 $y$ 次，则位置为
$$7x-5y.$$
需满足
$$7x-5y=1.$$
模 5 得 $2x\equiv1\pmod5$，即 $x\equiv3\pmod5$。
取最小正值 $x=3$，代入得 $21-5y=1$，故 $y=4$。
存在非负整数解，可达。

#### 答案
能到达（例如 +7,+7,+7,-5,-5,-5,-5）。

</details>

### 练习 31
8x8 棋盘删去两个同色格后，能否一定被 1x2 骨牌覆盖？

<details>

<summary>点击查看解析与答案</summary>

#### 解析
棋盘黑白染色后，删去两个同色格会造成黑白格数量不等。每个骨牌覆盖一黑一白，因此覆盖后黑白数量必须相等，矛盾。

#### 答案
不能覆盖。

</details>

### 练习 32
有 9 枚硬币全为正面。每次必须翻转恰好 2 枚。问能否得到“恰好 8 枚反面”？

<details>

<summary>点击查看解析与答案</summary>

#### 解析
记反面数为 $k$。每次翻转 2 枚，$k$ 的变化量只能是 $-2,0,+2$，所以 $k$ 的奇偶性保持不变。
初始 $k=0$ 为偶数，目标 $k=8$ 也是偶数，不被排除。
构造可行：先连续翻转 4 对互不重叠硬币，可得到 8 枚反面。

#### 答案
能得到恰好 8 枚反面。

</details>

