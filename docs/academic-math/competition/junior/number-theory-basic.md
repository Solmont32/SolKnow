---
title: 竞赛数论：整除、余数与同余
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 竞赛数论：整除、余数与同余

初中数竞数论的核心在于对整数结构的深刻把握。

## 1. 欧几里得算法 (GCD)
$$gcd(a, b) = gcd(b, a \pmod{b})$$

## 2. 同余基础
若 $a - b$ 能被 $m$ 整除，记作 $a \equiv b \pmod{m}$。
- 性质：可加、可减、可乘。

---

## 典型例题

### 例题 1：同余的应用
求 $2^{2026}$ 被 $3$ 除的余数。

<details>
<summary>点击查看解析与答案</summary>

#### 解析
1. **观察基础**：$2 \equiv -1 \pmod{3}$。
2. **幂次变换**：$2^{2026} \equiv (-1)^{2026} \pmod{3}$。
3. **计算**：由于 $2026$ 是偶数，$(-1)^{2026} = 1$。
4. **结论**：余数为 $1$。

#### 答案
$1$
</details>
