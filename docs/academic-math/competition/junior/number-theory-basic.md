---
title: 竞赛数论：整除、同余与不定方程
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 竞赛数论：整除、同余与不定方程

初中数竞数论是研究整数结构的起点，重点在于“整除链条 + 同余运算 + 构造思维”。

## 一、核心知识点讲解

### 1. 整除与质因数分解
- 任何大于 1 的整数都可唯一分解为质数幂的乘积。
- 若 $n=p_1^{a_1}p_2^{a_2}\cdots p_k^{a_k}$，则约数个数
  $$d(n)=(a_1+1)(a_2+1)\cdots(a_k+1).$$
- 常见策略：先定指数分配，再把大指数给小质数，得到最小值。

### 2. 同余基础与周期
- 同余运算可在模意义下加减乘方。
- 幂同余优先看周期，如 $2^n\pmod 7$ 周期为 3。
- 费马小定理：若 $p$ 为质数且 $(a,p)=1$，则 $a^{p-1}\equiv1\pmod p$。

### 3. 一次不定方程
- 方程 $ax+by=c$ 有整数解当且仅当 $\gcd(a,b)\mid c$。
- 用扩展欧几里得找一组特解，再写通解：
  $$x=x_0+\frac bdk,\quad y=y_0-\frac adk\ (d=\gcd(a,b)).$$

<KnowledgeCard type="warning" title="重要提醒">
大指数同余题不要硬算，先找周期或先降幂，再做模运算。
</KnowledgeCard>

---

## 二、经典例题实战

### 例题 1：约数个数反向构造
求具有 12 个约数的最小正整数。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程
1. 设 $n=p_1^{a_1}p_2^{a_2}\cdots$，需 $(a_1+1)(a_2+1)\cdots=12$。
2. 分解 12：$12,6\times2,4\times3,3\times2\times2$。
3. 为最小化，把较大指数给较小质数：
   - $12\Rightarrow 2^{11}=2048$
   - $6\times2\Rightarrow 2^5\cdot3=96$
   - $4\times3\Rightarrow 2^3\cdot3^2=72$
   - $3\times2\times2\Rightarrow 2^2\cdot3\cdot5=60$
4. 最小为 60。

#### 答案
$60$。

</details>

### 例题 2：周期法求幂同余
求 $2^{2026}\pmod 7$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程
1. 计算前几项：$2^1\equiv2,\ 2^2\equiv4,\ 2^3\equiv1\pmod7$，周期为 3。
2. $2026\equiv1\pmod3$。
3. 所以 $2^{2026}\equiv2^1\equiv2\pmod7$。

#### 答案
余数为 $2$。

</details>

### 例题 3：一次不定方程求正整数解
求方程 $35x+22y=1$ 的整数解。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程
1. 欧几里得：
   $$35=1\cdot22+13,\ 22=1\cdot13+9,\ 13=1\cdot9+4,\ 9=2\cdot4+1.$$
2. 回代：
   $$1=9-2\cdot4=3\cdot22-5\cdot13=8\cdot22-5\cdot35.$$
3. 一组特解：$x_0=-5,y_0=8$。
4. 通解：
   $$x=-5+22k,\ y=8-35k,\ k\in\mathbb Z.$$

#### 答案
所有整数解为 $x=-5+22k,\ y=8-35k$。

</details>

### 例题 4：同余方程线性化
解同余方程 $14x\equiv8\pmod{26}$。

<details>

<summary>点击查看解析与答案</summary>

#### 解析过程
1. 先求 $\gcd(14,26)=2$，且 $2\mid8$，有解。
2. 同除以 2：
   $$7x\equiv4\pmod{13}.$$
3. $7$ 在模 13 下逆元为 $2$（因 $7\cdot2=14\equiv1$）。
4. 两边乘 2：
   $$x\equiv8\pmod{13}.$$
5. 转回模 26：$x=8$ 或 $x=21$（模 26 的两个不同剩余类）。

#### 答案
$x\equiv8,21\pmod{26}$。

</details>

