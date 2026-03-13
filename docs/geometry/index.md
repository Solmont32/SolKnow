---
title: 计算几何基础 (Geometry Basics)
description: 系统化精度控制模型、代数一致性验证与几何鲁棒性分析。
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Trophy, Waypoints, Compass, Target, Circle, MoveRight, Sigma, Activity, ShieldAlert, Cpu, Scale, Ruler } from 'lucide-react';

# 计算几何基础 (Geometry Basics)

计算几何（Computational Geometry）是算法竞赛中逻辑最为严密、容错率最低的版块之一。其核心在于通过**向量算子**将欧几里得几何直观转化为代数运算，并利用**鲁棒性策略**屏蔽浮点数截断带来的逻辑崩塌。

---

## 1. 精度控制与误差界证明 (Numerical Precision & Error Bounds)

在计算机中，实数 $\mathbb{R}$ 被离散化为浮点数集。由于有限位数的限制，几何判定的**不一致性**是导致程序崩溃的主因。

### 1.1 机器精度与 $\epsilon$ 模型 (Static Epsilon)

通过引入一个小量 $\epsilon$ ($10^{-9} \sim 10^{-11}$ )，我们将连续判定转化为区间判定。

```cpp
typedef double DB;
const DB eps = 1e-9;

// 符号函数：处理浮点数精度误差
inline int sign(DB x) {
    if (fabs(x) < eps) return 0;
    return x < 0 ? -1 : 1;
}

// 比较函数：a < b -> -1, a == b -> 0, a > b -> 1
inline int dcmp(DB x, DB y) {
    return sign(x - y);
}
```

### 1.2 误差传播定理 (Error Propagation Theorem)

<KnowledgeCard type="theorem" title="浮点运算的相对误差界">

**定理**：设实数 $x, y$ 的机器表示为 $fl(x) = x(1+\delta)$，其中 $|\delta| < \epsilon_{mach}$。
对于二元运算 $\circ \in \{+, -, \times, \div\}$，存在 $\epsilon_{\circ}$ 使得：
$$fl(x \circ y) = (x \circ y)(1 + \epsilon_{\circ})$$
**证明概要**：
由 IEEE 754 标准，舍入误差满足 $\frac{|fl(x)-x|}{|x|} \le \frac{1}{2} B^{1-p}$。对于多步运算，误差按泰勒展开线性累积。
- **加法/减法**：$fl(x \pm y) = (x \pm y) + (x\delta_x \pm y\delta_y)$。若 $x \approx y$ 且异号，则绝对误差相对于结果极大（灾难性抵消）。
- **乘法**：$fl(x \cdot y) = xy(1 + \delta_x + \delta_y + \delta_x\delta_y) \approx xy(1 + \delta_{sum})$。

**推论**：在几何算法中，尽量使用**低阶多项式**（如叉积是坐标的二阶形式）而非超越函数（如 `atan2`, `acos`），因为后者的误差项包含更高阶的泰勒展开剩余项。

</KnowledgeCard>

---

## 2. 拓扑原语一致性验证 (Topological Consistency)

几何算法的鲁棒性不仅取决于精度，更取决于**代数一致性**（Algebraic Consistency）。

### 2.1 全序关系保护 (Strict Weak Ordering)

<KnowledgeCard type="warning" title="精度陷阱：传递性失效">
在浮点运算中，$(a = b) \land (b = c) \centernot\implies (a = c)$。
若 $a-b = 0.6\epsilon$ 且 $b-c = 0.6\epsilon$，则 $a=b, b=c$，但 $a-c = 1.2\epsilon > \epsilon$，导致 $a \neq c$。
**后果**：会导致 `std::sort` 崩溃（Segment Fault）或产生逻辑环。
**准则**：在排序算子中，必须强制使用 `dcmp(a, b) < 0` 而非 `a <= b`。
</KnowledgeCard>

### 2.2 几何原语判定 (Geometric Predicates)

| 算子 | 代数表达 | 鲁棒判定 | 几何意义 |
| :--- | :--- | :--- | :--- |
| **OnLine** | $\vec{a} \times \vec{b} = 0$ | `sign(cross(a, b)) == 0` | 共线判定 |
| **LeftTurn** | $\vec{a} \times \vec{b} > 0$ | `sign(cross(a, b)) > 0` | 逆时针旋转 (CCW) |
| **InSegment** | $(\vec{p}-\vec{a}) \cdot (\vec{p}-\vec{b}) \le 0$ | `sign(dot(a-p, b-p)) <= 0` | 点在线段投影内 |

---

## 3. 核心算子性质证明 (Proofs of Operators)

### 3.1 叉积的有向面积特性

<KnowledgeCard type="theorem" title="叉积的行列式几何意义">

**定理**：对于向量 $\vec{a}=(x_1, y_1), \vec{b}=(x_2, y_2)$，$\vec{a} \times \vec{b} = x_1y_2 - x_2y_1$。
**证明**：
利用极坐标：$\vec{a} = (r_a\cos\alpha, r_a\sin\alpha), \vec{b} = (r_b\cos\beta, r_b\sin\beta)$。
$\vec{a} \times \vec{b} = r_a r_b (\cos\alpha\sin\beta - \sin\alpha\cos\beta) = r_a r_b \sin(\beta-\alpha)$。
由于 $|\vec{a}|=r_a, |\vec{b}|=r_b$，且 $\theta = \beta-\alpha$ 为 $\vec{a}$ 到 $\vec{b}$ 的转角，
故 $\vec{a} \times \vec{b} = |\vec{a}||\vec{b}|\sin\theta$。
由几何定义，平行四边形面积 $S = |\vec{a}| \cdot (|\vec{b}|\sin\theta)$。其正负号严格对应了转动方向。

</KnowledgeCard>

---

## 4. 交点一致性校验 (Intersection Consistency)

在计算直线交点时，必须处理**近乎平行**的情况。

<KnowledgeCard type="formula" title="直线交点通用公式">
设直线 $L_1: P_1 + t\vec{v_1}$，$L_2: P_2 + u\vec{v_2}$。
交点存在当且仅当 $\vec{v_1} \times \vec{v_2} \neq 0$。
$$t = \frac{(P_2 - P_1) \times \vec{v_2}}{\vec{v_1} \times \vec{v_2}}$$
**稳定性校验**：若 $|\vec{v_1} \times \vec{v_2}| < \epsilon \cdot |\vec{v_1}||\vec{v_2}|$，应判定为平行，避免除以极小值导致的结果溢出。
</KnowledgeCard>

---

## 5. 经典推导与练习库 (Exercises)

<details>
<summary>例题 1：点在线段上的充分必要条件证明</summary>

**命题**：点 $P$ 在线段 $AB$ 上当且仅当 $\vec{PA} \times \vec{PB} = 0$ 且 $\vec{PA} \cdot \vec{PB} \le 0$。
**证明**：
1. **必要性**：若 $P \in AB$，则 $A, P, B$ 共线 $\implies \vec{PA} \parallel \vec{PB} \implies \text{cross} = 0$。且 $P$ 在 $A, B$ 之间，向量方向相反 $\implies \text{dot} \le 0$。
2. **充分性**：$\text{cross}=0 \implies P$ 在直线 $AB$ 上。设 $P = A + \lambda(B-A)$，则 $\vec{PA} = -\lambda(B-A)$，$\vec{PB} = (1-\lambda)(B-A)$。
   $\vec{PA} \cdot \vec{PB} = -\lambda(1-\lambda)|B-A|^2 \le 0 \implies \lambda(1-\lambda) \ge 0 \implies 0 \le \lambda \le 1$。
   故 $P$ 在线段 $AB$ 上。

```cpp
bool onSegment(Point p, Point a, Point b) {
    return sign(cross(a - p, b - p)) == 0 && sign(dot(a - p, b - p)) <= 0;
}
```

</details>

<details>
<summary>练习 1：多边形面积的有向性合并</summary>

**题目描述**：给定简单多边形顶点 $P_1, P_2, \dots, P_n$，证明其面积 $S = \frac{1}{2} \sum_{i=1}^n (P_i \times P_{i+1})$。
**推导**：利用格林公式的离散形式。每个对原点的三角形 $OP_iP_{i+1}$ 的有向面积为 $\frac{1}{2} P_i \times P_{i+1}$。若 $O$ 在多边形外，外部面积会在环绕过程中被正负抵消。

<details>
<summary>Check Solution</summary>

```cpp
DB getArea(const vector<Point>& p) {
    DB res = 0;
    for (int i = 0; i < p.size(); i++)
        res += cross(p[i], p[(i + 1) % p.size()]);
    return fabs(res) / 2.0;
}
```

</details>
</details>

<details>
<summary>练习 2：最小圆覆盖 (Smallest Enclosing Circle)</summary>

**题目描述**：给定 $n$ 个点，求覆盖所有点的最小圆。
**思路**：随机增量法。期望复杂度 $O(n)$。

<details>
<summary>Check Solution</summary>

```cpp
Circle getSmallestCircle(vector<Point> p) {
    random_shuffle(p.begin(), p.end());
    Circle c = {p[0], 0};
    for (int i = 1; i < p.size(); i++) {
        if (dcmp(dist(c.o, p[i]), c.r) > 0) {
            c = {p[i], 0};
            for (int j = 0; j < i; j++) {
                if (dcmp(dist(c.o, p[j]), c.r) > 0) {
                    c.o = (p[i] + p[j]) / 2.0;
                    c.r = dist(p[i], p[j]) / 2.0;
                    for (int k = 0; k < j; k++) {
                        if (dcmp(dist(c.o, p[k]), c.r) > 0) {
                            c.o = getCircumcenter(p[i], p[j], p[k]);
                            c.r = dist(c.o, p[i]);
                        }
                    }
                }
            }
        }
    }
    return c;
}
```

</details>
</details>

---

## 🎯 模块导航

- <Waypoints className="inline-block w-4 h-4 mr-1 text-blue-500" /> [凸包算法 (Convex Hull)](convex-hull) - 构建最小凸闭包与拓扑证明。
- <Target className="inline-block w-4 h-4 mr-1 text-amber-500" /> [半平面交 (Half-plane Intersection)](half-plane-intersection) - 线性约束与鲁棒性优化。
- <MoveRight className="inline-block w-4 h-4 mr-1 text-emerald-500" /> [扫描线技巧 (Scanning Line)](scanning-line) - 降维打击与复杂度边界。
- <Ruler className="inline-block w-4 h-4 mr-1 text-purple-500" /> [旋转卡壳 (Rotating Calipers)](rotating-calipers) - 极值问题与对踵点维护。
