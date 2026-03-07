---
title: 竞赛数论：费马、欧拉与同余
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 竞赛数论：费马、欧拉与同余

数论竞赛题目通常考察对整数结构和同余理论的深刻理解。

## 1. 费马小定理 (Fermat's Little Theorem)
若 $p$ 为质数，且 $gcd(a, p) = 1$，则：
$$a^{p-1} \equiv 1 \pmod{p}$$

## 2. 欧拉定理 (Euler's Theorem)
若 $gcd(a, n) = 1$，则：
$$a^{\phi(n)} \equiv 1 \pmod{n}$$
其中 $\phi(n)$ 是欧拉函数。

---

## 典型例题

### 例题 1：求余数
求 $3^{100}$ 被 $7$ 除的余数。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **应用费马小定理**：由于 $7$ 是质数，$gcd(3, 7) = 1$，则 $3^{7-1} \equiv 1 \pmod{7}$，即 $3^6 \equiv 1 \pmod{7}$。
2. **指数分解**：$100 = 6 \times 16 + 4$。
3. **同余变换**：
   $3^{100} = (3^6)^{16} \cdot 3^4 \equiv 1^{16} \cdot 3^4 \pmod{7}$
   $3^4 = 81$
4. **最后计算**：$81 = 7 \times 11 + 4$。
5. **结论**：余数为 $4$。

#### 答案
$4$
</details>
