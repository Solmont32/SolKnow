---
title: 高中数学竞赛 (Senior High Math Competition)
---

import KnowledgeCard from '@site/src/components/KnowledgeCard';
import { Code2, Layers } from 'lucide-react';

# 高中数学竞赛 (Senior High Math Competition)

高中数竞是选拔顶尖数学人才的重要途径（如 CMO, IMO）。

## 四大模块

- **代数 (Algebra)**：不等式、函数方程、多项式、递推迭代、三角与复数方法。
- **平面几何 (Geometry)**：纯几何推导、塞瓦定理、梅涅劳斯定理。
- **数论 (Number Theory)**：同余、不定方程、原根与离散对数。
- **组合 (Combinatorics)**：双计数、图论、生成函数。

<KnowledgeCard type="contest" title="竞赛秘籍">
在处理不等式时，熟练掌握 **Cauchy 不等式** 和 **Jensen 不等式** 是提分的关键。
</KnowledgeCard>

---

## 计算验证：C++ 在竞赛数学中的辅助 <Code2 className="inline-block ml-1" />

在数论或组合竞赛题中，我们可以通过 C++ 暴力搜索小规模数据，从而发现隐藏的规律（如周期性、递推式）。

### 示例：寻找不定方程 $x^2 + y^2 = z^2$ 的小规模整数解

<details>
<summary>点击查看 C++ 验证代码</summary>

```cpp
#include <iostream>
#include <vector>

/**
 * @brief 寻找 50 以内的勾股数
 */
int main() {
    std::cout << "x\ty\tz" << std::endl;
    std::cout << "------------" << std::endl;
    for (int x = 1; x <= 50; ++x) {
        for (int y = x; y <= 50; ++y) {
            for (int z = y; z <= 50; ++z) {
                if (x * x + y * y == z * z) {
                    std::cout << x << "\t" << y << "\t" << z << std::endl;
                }
            }
        }
    }
    return 0;
}
```

</details>

---

## 跨领域映射 <Layers className="inline-block ml-1" />

| 竞赛模块 | 计算机科学 (CS) 对应 | 核心价值 |
| :--- | :--- | :--- |
| **组合数学** | 算法复杂度分析、容斥原理 | 解决大规模系统的状态计数问题。 |
| **数论** | RSA 算法、椭圆曲线加密 | 现代信息安全的基石（原根、离散对数）。 |
| **代数** | 优化理论、机器学习损失函数 | 利用不等式（Cauchy, Jensen）界定最优解边界。 |
| **图论** | 网络拓扑、路由协议 | 解决连接性、最短路与流量分配问题。 |

---

## 五、本轮新增学习提示（2026-03-08）

- 先做 [竞赛代数：经典不等式与函数方程](inequalities) 的基础题，再做挑战题。
- 再做 [竞赛代数：多项式与代数方程](polynomials-and-equations) 的 Vieta 与重根判别题组。
- 再做 [竞赛代数：递推、函数迭代与不动点](recurrence-and-fixed-points)，重点训练“单调有界 + 不动点代入”。
- 新增 [竞赛代数：三角与复数方法](trigonometry-and-complex)，重点训练“同角化简 + 模幅角表示”。
- 再做 [竞赛数论：原根、剩余与构造](number-theory-advanced) 的 CRT 与阶专题。
- 补上 [竞赛组合：母函数、图论与递推](combinatorics-advanced) 的双计数与抽屉原理题组。
- 每学完一章立即到 [高中数学竞赛练习库](/docs/exercises/math/competition/senior) 完成对应专题训练。
