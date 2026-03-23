---
title: 常微分方程数值解法 (ODE Numerical Methods)
description: 初值问题的单步法与多步法，Euler方法、Runge-Kutta方法及稳定性分析
---

import KnowledgeCard from "@site/src/components/KnowledgeCard";
import { TrendingUp, Activity, GitCommit, Target } from 'lucide-react';

# 常微分方程数值解法

常微分方程初值问题：
$$\begin{cases} y' = f(x, y), & x \in [a, b] \\ y(a) = y_0 \end{cases}$$

本章介绍求解此类问题的数值方法，包括**单步法**（仅利用前一步信息）和**多步法**（利用前面多步信息）。

---

## 一、Euler 方法

### 1.1 显式 Euler 方法（向前 Euler）

**基本思想**：用差商代替导数
$$y'(x_n) \approx \frac{y(x_{n+1}) - y(x_n)}{h}$$

**迭代格式**：
$$y_{n+1} = y_n + h f(x_n, y_n)$$

**几何意义**：用切线近似解曲线。

**局部截断误差**：$O(h^2)$

**整体截断误差**：$O(h)$ —— **一阶方法**

### 1.2 隐式 Euler 方法（向后 Euler）

**迭代格式**：
$$y_{n+1} = y_n + h f(x_{n+1}, y_{n+1})$$

**特点**：每步需要解方程（通常是非线性的），但具有更好的稳定性。

### 1.3 梯形公式（改进 Euler）

**思想**：取显式和隐式的平均

$$y_{n+1} = y_n + \frac{h}{2}[f(x_n, y_n) + f(x_{n+1}, y_{n+1})]$$

**预估-校正格式**：
- **预估**：$\bar{y}_{n+1} = y_n + h f(x_n, y_n)$（显式 Euler）
- **校正**：$y_{n+1} = y_n + \frac{h}{2}[f(x_n, y_n) + f(x_{n+1}, \bar{y}_{n+1})]$

**精度**：二阶方法，$O(h^2)$

---

## 二、Runge-Kutta 方法

### 2.1 基本思想

通过增加每步的计算量（计算多个点的函数值），提高方法的精度。

**一般形式**：
$$y_{n+1} = y_n + h \sum_{i=1}^s b_i k_i$$
其中
$$k_i = f\left(x_n + c_i h, y_n + h \sum_{j=1}^s a_{ij} k_j\right)$$

### 2.2 经典四阶 Runge-Kutta (RK4)

<KnowledgeCard type="info" title="RK4 公式">
$$y_{n+1} = y_n + \frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)$$

其中：
- $k_1 = f(x_n, y_n)$
- $k_2 = f(x_n + \frac{h}{2}, y_n + \frac{h}{2}k_1)$
- $k_3 = f(x_n + \frac{h}{2}, y_n + \frac{h}{2}k_2)$
- $k_4 = f(x_n + h, y_n + h k_3)$
</KnowledgeCard>

**局部截断误差**：$O(h^5)$

**整体截断误差**：$O(h^4)$ —— **四阶方法**

RK4 是实际应用中最常用的 ODE 求解器之一，兼顾了精度和计算效率。

---

## 三、线性多步法

### 3.1 基本形式

利用前面多个点的信息：
$$y_{n+1} = \sum_{i=0}^k \alpha_i y_{n-i} + h \sum_{i=-1}^k \beta_i f(x_{n-i}, y_{n-i})$$

- 若 $\beta_{-1} = 0$：**显式方法**
- 若 $\beta_{-1} \neq 0$：**隐式方法**

### 3.2 Adams 方法

**Adams-Bashforth（显式）**：
- 二阶：$y_{n+1} = y_n + \frac{h}{2}(3f_n - f_{n-1})$
- 四阶：$y_{n+1} = y_n + \frac{h}{24}(55f_n - 59f_{n-1} + 37f_{n-2} - 9f_{n-3})$

**Adams-Moulton（隐式）**：
- 二阶：$y_{n+1} = y_n + \frac{h}{2}(f_{n+1} + f_n)$
- 四阶：$y_{n+1} = y_n + \frac{h}{24}(9f_{n+1} + 19f_n - 5f_{n-1} + f_{n-2})$

**预估-校正策略**：先用显式公式预估，再用隐式公式校正。

---

## 四、稳定性分析

### 4.1 绝对稳定性

应用于试验方程 $y' = \lambda y$（$\text{Re}(\lambda) < 0$）。

方法产生的迭代：$y_{n+1} = E(z) y_n$，其中 $z = \lambda h$。

**绝对稳定区域**：$S = \{z \in \mathbb{C} : |E(z)| < 1\}$

### 4.2 各方法的稳定区域

| 方法 | 稳定区域特征 |
|:-----|:-------------|
| 显式 Euler | 单位圆盘，步长受限大 |
| 隐式 Euler | 整个左半平面，A-稳定 |
| 梯形公式 | 整个左半平面，A-稳定 |
| RK4 | 有限区域，但比 Euler 大得多 |

<KnowledgeCard type="warning" title="刚性问题 (Stiff Problems)">
当方程中同时存在快变和慢变分量（如 $y' = -1000y + \sin(x)$$），显式方法需要极小的步长才能保证稳定，这种情况称为**刚性**。

**解决方案**：使用 A-稳定的隐式方法，如向后 Euler、隐式 RK 等。
</KnowledgeCard>

---

## 五、典型例题

<details>
<summary><b>例题 1：用 Euler 和 RK4 求解</b></summary>

求解初值问题：
$$y' = y - \frac{2x}{y}, \quad y(0) = 1, \quad x \in [0, 1]$$
取 $h = 0.1$。

**解析**：

精确解为 $y(x) = \sqrt{2x + 1}$。

**显式 Euler**：
$$y_{n+1} = y_n + h(y_n - \frac{2x_n}{y_n})$$

**RK4**：
- $k_1 = y_n - \frac{2x_n}{y_n}$
- $k_2 = (y_n + \frac{h}{2}k_1) - \frac{2(x_n + h/2)}{y_n + hk_1/2}$
- ...

计算结果对比（$x=1$ 处）：
- Euler：$y_{10} \approx 1.7848$，误差 $\approx 0.048$
- RK4：$y_{10} \approx 1.7321$，误差 $\approx 0.000002$

</details>

<details>
<summary><b>例题 2：稳定性分析</b></summary>

分析方程 $y' = -50y$，$y(0) = 1$ 用显式 Euler 方法的稳定性条件。

**解析**：

显式 Euler：$y_{n+1} = y_n + h(-50y_n) = (1 - 50h)y_n$

稳定条件：$|1 - 50h| < 1$，即 $0 < h < 0.04$

若要计算到 $x = 1$，至少需要 $25$ 步。

若使用隐式 Euler：$y_{n+1} = y_n - 50h y_{n+1}$

解得：$y_{n+1} = \frac{1}{1+50h} y_n$

对所有 $h > 0$ 都稳定（A-稳定）。
</details>

---

## 六、计算验证：C++ 实现

<details>
<summary>点击查看 C++ RK4 实现</summary>

```cpp
#include <iostream>
#include <vector>
#include <math>
#include <iomanip>

using namespace std;

// 微分方程右端函数: y' = f(x, y)
double f(double x, double y) {
    return y - 2.0 * x / y;  // 例题中的方程
}

// 精确解: y = sqrt(2x + 1)
double exact(double x) {
    return sqrt(2.0 * x + 1.0);
}

// 经典四阶 Runge-Kutta
vector<pair<double, double>> rk4(double x0, double y0, double h, int n) {
    vector<pair<double, double>> result;
    double x = x0, y = y0;

    result.push_back({x, y});

    for (int i = 0; i < n; ++i) {
        double k1 = f(x, y);
        double k2 = f(x + h/2, y + h*k1/2);
        double k3 = f(x + h/2, y + h*k2/2);
        double k4 = f(x + h, y + h*k3);

        y += (h/6.0) * (k1 + 2*k2 + 2*k3 + k4);
        x += h;

        result.push_back({x, y});
    }

    return result;
}

// 显式 Euler
vector<pair<double, double>> euler(double x0, double y0, double h, int n) {
    vector<pair<double, double>> result;
    double x = x0, y = y0;

    result.push_back({x, y});

    for (int i = 0; i < n; ++i) {
        y += h * f(x, y);
        x += h;
        result.push_back({x, y});
    }

    return result;
}

int main() {
    double x0 = 0, y0 = 1, h = 0.1;
    int n = 10;  // 计算到 x = 1

    cout << fixed << setprecision(6);
    cout << "x\t\tEuler\t\tRK4\t\tExact\t\tEuler_Err\tRK4_Err" << endl;
    cout << string(80, '-') << endl;

    auto euler_sol = euler(x0, y0, h, n);
    auto rk4_sol = rk4(x0, y0, h, n);

    for (int i = 0; i <= n; ++i) {
        double x = euler_sol[i].first;
        double y_euler = euler_sol[i].second;
        double y_rk4 = rk4_sol[i].second;
        double y_exact = exact(x);

        cout << x << "\t"
             << y_euler << "\t"
             << y_rk4 << "\t"
             << y_exact << "\t"
             << abs(y_euler - y_exact) << "\t"
             << abs(y_rk4 - y_exact) << endl;
    }

    return 0;
}
```
</details>

---

## 七、方法选择指南

| 方法 | 精度 | 稳定性 | 适用场景 |
|:-----|:-----|:-------|:---------|
| **显式 Euler** | 一阶 | 差 | 简单问题、教学演示 |
| **隐式 Euler** | 一阶 | A-稳定 | 刚性问题 |
| **梯形公式** | 二阶 | A-稳定 | 需要较好精度的刚性问题 |
| **RK4** | 四阶 | 较好 | 一般非刚性问题的首选 |
| **Adams-Bashforth** | 多阶 | 一般 | 需要少计算量的光滑问题 |
| **Adams-Moulton** | 多阶 | 较好 | 与显式结合做预估-校正 |

---

<KnowledgeCard type="tip" title="实践建议">
1. **一般问题**：优先使用 RK4，它在精度和效率间取得了良好平衡。
2. **刚性问题**：使用隐式方法，如向后 Euler 或隐式 RK。
3. **高精度需求**：考虑更高阶的 RK 方法或外推法。
4. **长时间积分**：使用对称方法（如隐式中点法）以保持能量守恒。
5. **实际应用**：推荐使用成熟的 ODE 求解库，如 MATLAB 的 ode45、Python 的 scipy.integrate。
</KnowledgeCard>

---

_常微分方程数值解法是模拟动态系统的基础工具，在物理、生物、经济、工程等领域有广泛应用。_
