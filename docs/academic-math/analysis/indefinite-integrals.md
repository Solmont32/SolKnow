---
title: 不定积分 (Indefinite Integrals)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';

# 不定积分 (Indefinite Integrals)

不定积分是导数的逆运算，是寻找原函数的过程。

## 一、 核心知识点讲解

### 1. 定义
若 $F'(x) = f(x)$，则 $F(x) + C$ 称为 $f(x)$ 的不定积分，记作：
$$\int f(x) dx = F(x) + C$$

### 2. 核心计算方法
-   **第一类换元法（凑微分）**：$\int f(\phi(x))\phi'(x)dx = \int f(u)du$。
-   **第二类换元法**：通过变量代换（如三角代换）化简。
-   **分部积分法**：$\int u dv = uv - \int v du$。

<KnowledgeCard type="tip" title="口诀">
分部积分选 $u$ 的优先顺序：**“反对幂三指”**（反三角、对数、幂函数、三角、指数）。
</KnowledgeCard>

---

## 二、 经典例题实战

### 例题 1：分部积分应用
求 $\int x e^x dx$。

<details>
<summary>点击查看解析与答案</summary>

#### 解析过程
1.  **选定 u 与 dv**：根据口诀，幂函数 $x$ 优先级高于指数函数 $e^x$。
    -   设 $u = x, dv = e^x dx$。
    -   则 $du = dx, v = e^x$。
2.  **套用公式**：
    $$\int x e^x dx = x e^x - \int e^x dx$$
3.  **最终计算**：
    $$x e^x - e^x + C$$

#### 答案
$(x - 1)e^x + C$
</details>
