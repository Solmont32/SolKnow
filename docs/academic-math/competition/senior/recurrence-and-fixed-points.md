---
title: 竞赛代数：递推、函数迭代与不动点
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 竞赛代数：递推、函数迭代与不动点

高中竞赛中的递推与迭代题，常把“离散数列”和“连续函数”结合：先找不变量，再判单调有界，最后锁定极限或闭式。

## 一、核心知识点讲解

### 1. 递推三件套：平移、差分、特征根
- 线性递推优先尝试特征方程法。
- 非齐次项可用平移（设 $b_n=a_n-c$）消常数项。
- 若出现 $a_{n+1}-a_n$，可先做差分看是否望远镜求和。

### 2. 迭代序列极限的标准框架
设 $x_{n+1}=f(x_n)$，常用流程：
1. 找区间 $I$，证明 $x_n\in I$（不变区间）。
2. 证明单调或压缩：$|f'(x)|\le q<1$。
3. 由有界单调或压缩映射，推出收敛。
4. 设极限 $L$，代入 $L=f(L)$ 求不动点。

### 3. 不动点稳定性与“吸引域”
- 若 $|f'(L)|<1$，$L$ 多为吸引不动点（局部稳定）。
- 若 $|f'(L)|>1$，$L$ 往往不稳定。
- 竞赛中常通过“迭代不等式”替代严格动力系统语言。

### 4. 二次迭代的常见技巧
- 对称点代换：如令 $y_n=x_n-\alpha$，把不动点移到 0。
- 分式迭代可尝试倒数变换。
- 含平方根迭代常用“构造界 + 夹逼”。

<KnowledgeCard type="tip" title="解题抓手">
先判断题目是“求通项”还是“求极限”。求通项优先结构代换；求极限优先单调有界或压缩映射。
</KnowledgeCard>

---

## 二、经典例题实战

### 例题 1：一阶线性递推通项
已知
$$
a_{n+1}=2a_n+3,\quad a_1=1.
$$
求 $a_n$。

<details>

<summary>点击查看解析与答案</summary>

设 $b_n=a_n+3$，则
$$
b_{n+1}=a_{n+1}+3=2a_n+6=2b_n.
$$
且 $b_1=4$，故
$$
b_n=4\cdot2^{n-1}=2^{n+1}.
$$
所以
$$
a_n=2^{n+1}-3.
$$

</details>

### 例题 2：二阶线性递推
已知
$$
a_{n+2}=4a_{n+1}-4a_n,\quad a_1=1,\ a_2=2.
$$
求 $a_n$。

<details>

<summary>点击查看解析与答案</summary>

特征方程
$$
r^2-4r+4=0\Rightarrow (r-2)^2=0.
$$
重根情形：
$$
a_n=(A+Bn)2^n.
$$
代入初值：
$$
2(A+B)=1,\quad 4(A+2B)=2.
$$
解得 $A=0,\ B=\frac12$，故
$$
a_n=n2^{n-1}.
$$

</details>

### 例题 3：迭代极限（单调有界）
设 $x_1>0$，
$$
x_{n+1}=\frac{x_n+2}{x_n+1}.
$$
证明 $\{x_n\}$ 收敛并求极限。

<details>

<summary>点击查看解析与答案</summary>

不动点满足
$$
L=\frac{L+2}{L+1}\Rightarrow L^2=2,\ L>0\Rightarrow L=\sqrt2.
$$
记
$$
f(x)=\frac{x+2}{x+1},\quad f'(x)=-\frac1{(x+1)^2}<0.
$$
在 $(0,+\infty)$ 上有 $f(x)>1$，且可验证序列落在 $(1,2)$ 内。
再比较 $x_{n+1}-\sqrt2=\frac{(1-\sqrt2)(x_n-\sqrt2)}{x_n+1}$，得
$$
|x_{n+1}-\sqrt2|=\frac{\sqrt2-1}{x_n+1}|x_n-\sqrt2|<(\sqrt2-1)|x_n-\sqrt2|.
$$
故为压缩，收敛到 $\sqrt2$。

</details>

### 例题 4：含根式迭代
设 $x_1=1$，
$$
x_{n+1}=\sqrt{2+x_n}.
$$
求 $\lim x_n$。

<details>

<summary>点击查看解析与答案</summary>

先证有界：若 $x_n<2$，则 $x_{n+1}=\sqrt{2+x_n}<2$，且 $x_1=1<2$，故 $x_n<2$。
再证单调：
$$
x_{n+1}\ge x_n \Longleftrightarrow 2+x_n\ge x_n^2
\Longleftrightarrow (x_n-2)(x_n+1)\le0,
$$
对 $x_n\in(0,2)$ 成立，故递增有上界，收敛。
设极限为 $L$，
$$
L=\sqrt{2+L}\Rightarrow L^2-L-2=0\Rightarrow L=2\ (\text{取正}).
$$

</details>

### 例题 5：不动点稳定判定
设
$$
x_{n+1}=x_n^2-2x_n+2=(x_n-1)^2+1,\quad x_1\in(0,2).
$$
判断其极限行为。

<details>

<summary>点击查看解析与答案</summary>

不动点方程
$$
x=x^2-2x+2\Rightarrow (x-1)(x-2)=0.
$$
故不动点为 $1,2$。令 $y_n=x_n-1$，则
$$
y_{n+1}=y_n^2.
$$
当 $x_1\in(0,2)$ 时，$|y_1|<1$，故 $y_n\to0$，即
$$
x_n\to1.
$$
所以 1 是该区间内的吸引不动点。

</details>

---

## 三、配套练习（章节内）

### 练习 1（基础）
已知 $a_{n+1}=3a_n-2,\ a_1=2$，求 $a_n$。

<details>

<summary>点击查看过程与答案</summary>

设 $b_n=a_n-1$，则 $b_{n+1}=3b_n,\ b_1=1$，
$$
b_n=3^{n-1}\Rightarrow a_n=3^{n-1}+1.
$$

</details>

### 练习 2（提高）
设 $x_1>0,\ x_{n+1}=\frac{2x_n+1}{x_n+2}$，求极限。

<details>

<summary>点击查看过程与答案</summary>

设极限为 $L$：
$$
L=\frac{2L+1}{L+2}\Rightarrow L^2=1.
$$
因 $x_n>0$，取 $L=1$。可进一步由
$$
x_{n+1}-1=\frac{x_n-1}{x_n+2}
$$
得收敛到 1。

</details>

### 练习 3（提高）
求递推
$$
a_{n+2}-5a_{n+1}+6a_n=0,\ a_1=1,\ a_2=5
$$
的通项。

<details>

<summary>点击查看过程与答案</summary>

特征方程 $(r-2)(r-3)=0$，
$$
a_n=A2^n+B3^n.
$$
由
$$
2A+3B=1,\quad4A+9B=5
$$
解得 $A=-1,\ B=1$，
$$
a_n=3^n-2^n.
$$

</details>

### 练习 4（挑战）
设 $x_1\in(0,1)$，$x_{n+1}=x_n(2-x_n)$，求 $\lim x_n$。

<details>

<summary>点击查看过程与答案</summary>

有
$$
x_{n+1}-x_n=x_n(1-x_n)>0,
$$
故递增。且 $x_n<1$ 时
$$
x_{n+1}=x_n(2-x_n)<1,
$$
故有上界 1，故收敛。设极限 $L$：
$$
L=L(2-L)\Rightarrow L=0\ \text{或}\ 1.
$$
因递增且 $x_1>0$，取 $L=1$。

</details>
