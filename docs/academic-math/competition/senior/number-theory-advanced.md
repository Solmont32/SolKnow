---
title: 竞赛数论：原根、剩余与构造
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 竞赛数论：原根、剩余与构造

高中数论竞赛的主线是“结构识别”：先看模数结构，再选 CRT、阶、二次剩余或构造法。

## 一、核心知识点讲解

### 1. 中国剩余定理（CRT）
若模数两两互质：
$$
x\equiv a_i\pmod{m_i}\ (i=1,\dots,k),\quad (m_i,m_j)=1,
$$
则存在唯一解模 $M=\prod m_i$。

常用构造：
$$
x\equiv\sum_{i=1}^k a_iM_iN_i\pmod M,
$$
其中 $M_i=\frac{M}{m_i}$，$N_i\equiv M_i^{-1}\pmod{m_i}$。

### 2. 阶与原根
- 阶：$\operatorname{ord}_n(a)$ 是满足 $a^k\equiv1\pmod n$ 的最小正整数 $k$。
- 重要性质：$\operatorname{ord}_n(a)\mid\varphi(n)$。
- 若 $\operatorname{ord}_n(g)=\varphi(n)$，则 $g$ 是模 $n$ 的原根。
- 有原根的模数：$2,4,p^k,2p^k$（$p$ 为奇素数）。

### 3. 二次剩余与勒让德符号
- 勒让德符号：
$$
\left(\frac ap\right)=\begin{cases}
1,&a\not\equiv0\ (\bmod p)\text{ 且 }x^2\equiv a\ (\bmod p)\text{ 可解};\\
-1,&a\not\equiv0\ (\bmod p)\text{ 且不可解};\\
0,&p\mid a.
\end{cases}
$$
- 欧拉判别：
$$
a^{\frac{p-1}2}\equiv\left(\frac ap\right)\pmod p.
$$
- 二次互反律：
$$
\left(\frac pq\right)\left(\frac qp\right)=(-1)^{\frac{p-1}2\frac{q-1}2}.
$$

### 4. 同余构造常见套路
- 先降幂（费马/欧拉）；
- 再拆模（CRT）；
- 最后回代成最小正解。

<KnowledgeCard type="tip" title="竞赛提醒">
数论题先问三个问题：模数是否可分解？指数是否可降？目标是否可转成“是否存在”的剩余判定。
</KnowledgeCard>

---

## 二、经典例题实战

### 例题 1：CRT 标准构造
求解
$$
x\equiv1\pmod4,\quad x\equiv2\pmod5,\quad x\equiv3\pmod7.
$$

<details>

<summary>点击查看解析与答案</summary>

先由前两式设 $x=1+4t$，代入第二式得 $4t\equiv1\pmod5$，故 $t\equiv4\pmod5$，即
$$
x\equiv17\pmod{20}.
$$
再与第三式联立：设 $x=17+20s$，代入 $\pmod 7$：
$$
17+20s\equiv3\Rightarrow3+6s\equiv3\Rightarrow s\equiv0\pmod7.
$$
故
$$
x\equiv17\pmod{140}.
$$

</details>

### 例题 2：阶与幂模运算
求 $2^{100}\pmod{13}$。

<details>

<summary>点击查看解析与答案</summary>

因 $\varphi(13)=12$ 且 $2^{12}\equiv1\pmod{13}$，
$$
2^{100}=2^{12\cdot8+4}\equiv(2^{12})^8\cdot2^4\equiv2^4=16\equiv3\pmod{13}.
$$

</details>

### 例题 3：原根判定（小模）
判断 2 是否为模 11 的原根。

<details>

<summary>点击查看解析与答案</summary>

$\varphi(11)=10$，检查 $2^{10/d}\not\equiv1\pmod{11}$（$d$ 为 10 的素因子 2,5）：
$$
2^5=32\equiv-1\not\equiv1,\quad 2^2=4\not\equiv1\pmod{11}.
$$
因此 $\operatorname{ord}_{11}(2)=10$，2 是模 11 的原根。

</details>

### 例题 4：二次剩余判定
判断同余方程 $x^2\equiv3\pmod{13}$ 是否有解。

<details>

<summary>点击查看解析与答案</summary>

用欧拉判别：
$$
3^{(13-1)/2}=3^6=729\equiv1\pmod{13},
$$
故 $\left(\frac{3}{13}\right)=1$，方程有解。

枚举可得一组解 $x\equiv\pm4\pmod{13}$（因 $4^2=16\equiv3$）。

</details>

### 例题 5：Wilson 定理应用
证明若 $p$ 为素数，则
$$
(p-1)!\equiv-1\pmod p.
$$

<details>

<summary>点击查看解析与答案</summary>

模 $p$ 的非零剩余类都可逆。除 $1,-1$ 外，其余元素与各自逆元两两配对，配对乘积全为 1，因此
$$
(p-1)!\equiv1\cdot(-1)\equiv-1\pmod p.
$$

</details>

---

## 三、配套练习（章节内）

### 练习 1（基础）
求解同余组
$$
x\equiv2\pmod3,\quad x\equiv3\pmod5.
$$

<details>

<summary>点击查看过程与答案</summary>

设 $x=2+3t$，代入得 $3t\equiv1\pmod5$，故 $t\equiv2\pmod5$。
最小正解 $x=8$，通解 $x\equiv8\pmod{15}$。

</details>

### 练习 2（提高）
求 $7^{222}\pmod{20}$。

<details>

<summary>点击查看过程与答案</summary>

$7^2=49\equiv9,\ 7^4\equiv81\equiv1\pmod{20}$，
$$
7^{222}=7^{4\cdot55+2}\equiv7^2\equiv9\pmod{20}.
$$

</details>

### 练习 3（提高）
判断 3 是否为模 7 的原根。

<details>

<summary>点击查看过程与答案</summary>

$\varphi(7)=6$，检查 $3^2=9\equiv2\not\equiv1$，$3^3=27\equiv6\not\equiv1\pmod7$。
故阶为 6，3 是模 7 的原根。

</details>

### 练习 4（挑战）
判断 $x^2\equiv5\pmod{11}$ 是否可解，并给出全部解。

<details>

<summary>点击查看过程与答案</summary>

计算平方剩余：$0,1,4,9,5,3$（模 11）。包含 5，故可解。
由 $4^2\equiv5\pmod{11}$，全部解为
$$
x\equiv\pm4\pmod{11}.
$$

</details>
