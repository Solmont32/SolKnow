import os

# 定义每个文件名对应的中文标题和核心公式/定义
knowledge_map = {
    "limits": ("极限 (Limits)", "数列极限与函数极限的定义：$$\lim_{n \\to \\infty} a_n = A$$"),
    "continuity": ("连续性 (Continuity)", "函数在点 $x_0$ 连续的定义：$$\lim_{x \\to x_0} f(x) = f(x_0)$$"),
    "derivatives": ("导数 (Derivatives)", "导数的定义与求导法则：$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}$$"),
    "integrals": ("积分 (Integrals)", "牛顿-莱布尼茨公式：$$\int_a^b f(x)dx = F(b)-F(a)$$"),
    "series": ("级数 (Series)", "常数项级数与幂级数：$$\sum_{n=1}^{\infty} a_n$$"),
    "determinant": ("行列式 (Determinant)", "行列式的性质与展开定理。"),
    "matrix": ("矩阵 (Matrix)", "矩阵的基本运算与特殊矩阵。"),
    "linear-equations": ("线性方程组 (Linear Equations)", "克拉默法则与高斯消元法。"),
    "polynomial": ("多项式 (Polynomial)", "多项式的除法与根的分布。"),
    "quadratic-forms": ("二次型 (Quadratic Forms)", "二次型的矩阵表示与标准化。"),
    "groups": ("群论 (Groups)", "群、子群与拉格朗日定理。"),
    "rings": ("环论 (Rings)", "环、理想与同态。"),
    "lattices": ("格 (Lattices)", "偏序集与格的代数结构。"),
    "logic": ("数理逻辑 (Logic)", "命题逻辑与谓词逻辑。"),
    "set-theory": ("集合论 (Set Theory)", "集合运算、关系与函数。"),
    "graph-theory": ("图论 (Graph Theory)", "图的连通性、欧拉路径与哈密顿回路。"),
    "combinatorics": ("组合数学 (Combinatorics)", "排列、组合与二项式定理。"),
    "events": ("事件与概率 (Events)", "贝叶斯公式与全概率公式。"),
    "discrete-rv": ("离散型随机变量 (Discrete RV)", "期望与方差的定义。"),
    "continuous-rv": ("连续型随机变量 (Continuous RV)", "概率密度函数与分布函数。"),
    "limit-theorems": ("极限定理 (Limit Theorems)", "大数定律与中心极限定理。"),
    "sampling": ("抽样分布 (Sampling)", "样本均值与样本方差。"),
    "estimation": ("参数估计 (Estimation)", "点估计与区间估计。"),
    "hypothesis-testing": ("假设检验 (Hypothesis Testing)", "第一类错误与第二类错误。"),
    "regression": ("回归分析 (Regression)", "一元线性回归模型。"),
    "arithmetic": ("算术基础 (Arithmetic)", "整数、质数与基本运算。"),
    "fractions": ("分数与小数 (Fractions)", "分数的约分、通分与运算。"),
    "geometry-basic": ("基础几何 (Geometry)", "平面图形的周长与面积。"),
    "word-problems": ("应用题 (Word Problems)", "行程问题、工程问题等经典题型。"),
    "real-numbers": ("实数 (Real Numbers)", "有理数、无理数与绝对值。"),
    "algebraic-expressions": ("代数式 (Algebraic Expressions)", "整式的加减与因式分解。"),
    "plane-geometry": ("平面几何 (Plane Geometry)", "全等三角形与相似三角形。"),
    "functions-basic": ("函数基础 (Functions)", "一次函数、二次函数与反比例函数。"),
    "sets": ("集合与逻辑 (Sets)", "集合的含义、表示及其基本运算。"),
    "elementary-functions": ("基本初等函数 (Functions)", "幂函数、指数函数与对数函数。"),
    "trigonometry": ("三角函数 (Trigonometry)", "正弦、余弦函数及其恒等变换。"),
    "vectors": ("向量 (Vectors)", "向量的加减、数乘与数量积。"),
    "conics": ("圆锥曲线 (Conics)", "椭圆、双曲线与抛物线。"),
    "stats-basic": ("概率统计初步 (Stats)", "频率分布直方图与独立性检验。"),
    "calculus-intro": ("微积分初步 (Calculus)", "导数的几何意义与极值问题。")
}

docs_root = r'docs/academic-math'

def rewrite_docs():
    count = 0
    for root, dirs, files in os.walk(docs_root):
        for file in files:
            if not file.endswith('.md') or file == 'index.md':
                continue
            
            name_key = file.replace('.md', '')
            if name_key in knowledge_map:
                title, content = knowledge_map[name_key]
                file_path = os.path.join(root, file)
                
                md_content = f"""---
title: {title}
---

# {title}

{content}

---
*本章节内容已由 SolKnow 引擎自动修复，更多详细推导请参考视频讲解。*
"""
                with open(file_path, 'w', encoding='utf-8', newline='') as f:
                    f.write(md_content)
                count += 1
                print(f"Fixed: {file_path}")
    return count

if __name__ == "__main__":
    fixed_count = rewrite_docs()
    print(f"\nSuccessfully repaired {fixed_count} documents.")
