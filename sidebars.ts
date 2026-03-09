import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // 算法竞赛与平台
  algoSidebar: [
    'intro',
    {
      type: 'category',
      collapsible: true,
      collapsed: true,
      label: '平台专题',
      items: [
        { type: 'doc', id: 'cp/codeforces', label: 'Codeforces' },
        { type: 'doc', id: 'cp/atcoder', label: 'AtCoder' },
      ],
    },
    {
      type: 'category',
      collapsible: true,
      collapsed: true,
      label: '基础算法',
      link: {type: 'doc', id: 'basic/index'},
      items: ['basic/io', 'basic/complexity', 'basic/binary-search', 'basic/sorting', 'basic/greedy', 'basic/two-pointers'],
    },
    {
      type: 'category',
      collapsible: true,
      collapsed: true,
      label: '数据结构',
      link: {type: 'doc', id: 'ds/index'},
      items: [
        { type: 'category', collapsible: true, collapsed: true, label: 'STL', link: {type: 'doc', id: 'ds/stl/index'}, items: ['ds/stl/map-set'] },
        'ds/heap', 'ds/monotonic', 'ds/trie', 'ds/fenwick', 'ds/segtree', 'ds/dsu', 'ds/st',
      ],
    },
    {
      type: 'category',
      collapsible: true,
      collapsed: true,
      label: '图论',
      link: {type: 'doc', id: 'graph/index'},
      items: ['graph/traversal', 'graph/shortest-path', 'graph/mst', 'graph/topo-sort', 'graph/tarjan'],
    },
    {
      type: 'category',
      collapsible: true,
      collapsed: true,
      label: '动态规划',
      link: {type: 'doc', id: 'dp/index'},
      items: ['dp/linear-dp', 'dp/knapsack', 'dp/range-dp', 'dp/tree-dp', 'dp/state-compression-dp'],
    },
    {
      type: 'category',
      collapsible: true,
      collapsed: true,
      label: '字符串',
      link: {type: 'doc', id: 'string/index'},
      items: ['string/kmp', 'string/hashing', 'string/manacher', 'string/ac-automaton'],
    },
  ],

  // 数学知识库（含竞赛与专题）
  mathSidebar: [
    {
      type: 'category',
      collapsible: true,
      collapsed: true,
      label: '数学知识体系',
      items: [
        {
          type: 'category',
          collapsible: true,
          collapsed: true,
          label: '数学专题 (Advanced Topics)',
          items: [
            'academic-math/special/factorization-eisenstein',
            'academic-math/special/vieta-newton',
            'academic-math/special/combinatorics-burnside',
          ],
        },
        {
          type: 'category',
          collapsible: true,
          collapsed: true,
          label: '数学竞赛 (Olympiad)',
          items: [
            {
              type: 'category',
              collapsible: true,
              collapsed: true,
              label: '小学奥数',
              link: { type: 'doc', id: 'academic-math/competition/elementary/index' },
              items: [
                'academic-math/competition/elementary/number-theory',
                'academic-math/competition/elementary/counting',
                'academic-math/competition/elementary/logic',
                'academic-math/competition/elementary/geometry',
                'academic-math/competition/elementary/algebra',
                'academic-math/competition/elementary/word-problems',
                'academic-math/competition/elementary/number-arrangement-and-extremes',
              ]
            },
            {
              type: 'category',
              collapsible: true,
              collapsed: true,
              label: '初中数学竞赛',
              link: { type: 'doc', id: 'academic-math/competition/junior/index' },
              items: [
                'academic-math/competition/junior/algebra-skills',
                'academic-math/competition/junior/circle-geometry',
                'academic-math/competition/junior/geometry-area-method',
                'academic-math/competition/junior/transform-and-shortest-path',
                'academic-math/competition/junior/number-theory-basic',
                'academic-math/competition/junior/combinatorics',
                'academic-math/competition/junior/invariant-and-coloring',
                'academic-math/competition/junior/inequalities-and-equations',
              ]
            },
            {
              type: 'category',
              collapsible: true,
              collapsed: true,
              label: '高中数学竞赛',
              link: { type: 'doc', id: 'academic-math/competition/senior/index' },
              items: [
                'academic-math/competition/senior/inequalities',
                'academic-math/competition/senior/polynomials-and-equations',
                'academic-math/competition/senior/recurrence-and-fixed-points',
                'academic-math/competition/senior/trigonometry-and-complex',
                'academic-math/competition/senior/geometry-theorems',
                'academic-math/competition/senior/number-theory-advanced',
                'academic-math/competition/senior/combinatorics-advanced',
              ]
            },
          ],
        },

        {
          type: 'category',
          collapsible: true,
          collapsed: true,
          label: '基础教育 (K-12)',
          items: [
            { type: 'category', collapsible: true, collapsed: true, label: '小学数学', link: {type: 'doc', id: 'academic-math/elementary/index'}, items: ['academic-math/elementary/arithmetic', 'academic-math/elementary/geometry-basic', 'academic-math/elementary/fractions', 'academic-math/elementary/combinatorics', 'academic-math/elementary/word-problems'] },
            { type: 'category', collapsible: true, collapsed: true, label: '初中数学', link: {type: 'doc', id: 'academic-math/junior-high/index'}, items: ['academic-math/junior-high/real-numbers', 'academic-math/junior-high/linear-equations', 'academic-math/junior-high/algebraic-expressions', 'academic-math/junior-high/plane-geometry', 'academic-math/junior-high/functions-basic'] },
            { type: 'category', collapsible: true, collapsed: true, label: '高中数学', link: {type: 'doc', id: 'academic-math/senior-high/index'}, items: ['academic-math/senior-high/sets', 'academic-math/senior-high/elementary-functions', 'academic-math/senior-high/trigonometry', 'academic-math/senior-high/vectors', 'academic-math/senior-high/conics', 'academic-math/senior-high/stats-basic', 'academic-math/senior-high/calculus-intro'] },
          ],
        },
        {
          type: 'category',
          collapsible: true,
          collapsed: true,
          label: '大学数学 (University Math)',
          items: [
            { 
              type: 'category', 
              collapsible: true,
              collapsed: true,
              label: '数学分析 (Mathematical Analysis)', 
              link: {type: 'doc', id: 'academic-math/analysis/index'}, 
              items: [
                {
                  type: 'category',
                  label: '上册 (Volume 1)',
                  items: [
                    { type: 'doc', id: 'academic-math/analysis/real-numbers-and-functions', label: '第一章 实数集与函数' },
                    { type: 'doc', id: 'academic-math/analysis/limits', label: '第二章 数列极限' },
                    { type: 'doc', id: 'academic-math/analysis/function-limits', label: '第三章 函数极限' },
                    { type: 'doc', id: 'academic-math/analysis/continuity', label: '第四章 函数的连续性' },
                    { type: 'doc', id: 'academic-math/analysis/derivatives', label: '第五章 导数与微分' },
                    { type: 'doc', id: 'academic-math/analysis/mean-value-theorems', label: '第六章 微分中值定理及其应用' },
                    { type: 'doc', id: 'academic-math/analysis/taylor-expansion', label: '（补）泰勒展开：局部信息的极限延伸' },
                    { type: 'doc', id: 'academic-math/analysis/convexity-and-extremum', label: '（续）凸函数、不等式与极值' },
                    { type: 'doc', id: 'academic-math/analysis/completeness', label: '第七章 实数的完备性' },
                    { type: 'doc', id: 'academic-math/analysis/indefinite-integrals', label: '第八章 不定积分' },
                    { type: 'doc', id: 'academic-math/analysis/integrals', label: '第九章 定积分' },
                    { type: 'doc', id: 'academic-math/analysis/definite-integral-applications', label: '第十章 定积分的应用' },
                    { type: 'doc', id: 'academic-math/analysis/improper-integrals', label: '第十一章 反常积分' },
                  ]
                },
                {
                  type: 'category',
                  label: '下册 (Volume 2)',
                  items: [
                    { type: 'doc', id: 'academic-math/analysis/series', label: '第十二章 数项级数' },
                    { type: 'doc', id: 'academic-math/analysis/function-sequences', label: '第十三章 函数列与函数项级数' },
                    { type: 'doc', id: 'academic-math/analysis/power-series', label: '第十四章 幂级数' },
                    { type: 'doc', id: 'academic-math/analysis/fourier-series', label: '第十五章 傅里叶级数' },
                    { type: 'doc', id: 'academic-math/analysis/multivariable-limits', label: '第十六章 多元函数的极限与连续' },
                    { type: 'doc', id: 'academic-math/analysis/multivariable-differentiation', label: '第十七章 多元函数微分学' },
                    { type: 'doc', id: 'academic-math/analysis/differential-geometry', label: '微分几何：曲线与曲面的局部理论' },
                    { type: 'doc', id: 'academic-math/analysis/implicit-function-theorem', label: '第十八章 隐函数定理及其应用' },
                    { type: 'doc', id: 'academic-math/analysis/parametric-integrals', label: '第十九章 含参量积分' },
                    { type: 'doc', id: 'academic-math/analysis/multiple-integrals', label: '第二十章 重积分' },
                    { type: 'doc', id: 'academic-math/analysis/line-integrals', label: '第二十一章 曲线积分' },
                    { type: 'doc', id: 'academic-math/analysis/surface-integrals', label: '第二十二章 曲面积分' },
                    { type: 'doc', id: 'academic-math/analysis/vector-analysis', label: '第二十三章 矢量分析与场论初步' },
                  ]
                },
                {
                  type: 'category',
                  label: '专题补充与进阶 (Supplements)',
                  items: [
                    'academic-math/analysis/inequalities',
                    'academic-math/analysis/differential-equations',
                    'academic-math/analysis/riemann-stieltjes-integral',
                    'academic-math/analysis/infinite-products',
                  ]
                }
              ] 
            },
            {
              type: 'category',
              collapsible: true,
              collapsed: false,
              label: '实变函数（学习路径）',
              link: { type: 'doc', id: 'academic-math/real-analysis/index' },
              items: [
                {
                  type: 'doc',
                  id: 'academic-math/real-analysis/measure-theory',
                  label: '第 1 站：Lebesgue 测度',
                },
                {
                  type: 'doc',
                  id: 'academic-math/real-analysis/lebesgue-integral',
                  label: '第 2 站：Lebesgue 积分',
                },
                {
                  type: 'doc',
                  id: 'academic-math/real-analysis/lp-spaces',
                  label: '第 3 站：L^p 空间',
                },
              ]
            },
            {
              type: 'category',
              collapsible: true,
              collapsed: true,
              label: '复变函数 (Complex Analysis)',
              link: { type: 'doc', id: 'academic-math/complex-analysis/index' },
              items: [
                { type: 'doc', id: 'academic-math/complex-analysis/index', label: '1. 导论与解析性' },
                { type: 'doc', id: 'academic-math/complex-analysis/holomorphic-functions', label: '2. 全纯性质与积分' },
                { type: 'doc', id: 'academic-math/complex-analysis/series-expansions', label: '3. 级数展开与奇点' },
                { type: 'doc', id: 'academic-math/complex-analysis/residue-theory', label: '4. 留数理论与应用' },
                { type: 'doc', id: 'academic-math/complex-analysis/conformal-mapping', label: '5. 共形映射' },
              ]
            },
            {
              type: 'category',
              collapsible: true,
              collapsed: true,
              label: '泛函分析 (Functional Analysis)',
              link: { type: 'doc', id: 'academic-math/functional-analysis/index' },
              items: [
                'academic-math/functional-analysis/banach-spaces',
                'academic-math/functional-analysis/hilbert-spaces',
                'academic-math/functional-analysis/spectral-theory',
              ]
            },
            {
              type: 'category',
              collapsible: true,
              collapsed: true,
              label: '点集拓扑学 (Topology)',
              link: { type: 'doc', id: 'academic-math/topology/index' },
              items: [
                'academic-math/topology/metric-spaces',
                'academic-math/topology/topological-spaces',
                'academic-math/topology/continuity',
                'academic-math/topology/separation-axioms',
                'academic-math/topology/compactness',
                'academic-math/topology/connectedness',
                'academic-math/topology/homotopy',
              ]
            },
            { type: 'category', collapsible: true, collapsed: true, label: '高等代数', link: {type: 'doc', id: 'academic-math/algebra/index'}, items: ['academic-math/algebra/polynomial', 'academic-math/algebra/determinant', 'academic-math/algebra/linear-equations', 'academic-math/algebra/vector-spaces-and-linear-transformations', 'academic-math/algebra/eigenvalues-and-jordan-form', 'academic-math/algebra/inner-product-spaces', 'academic-math/algebra/cayley-hamilton-and-rational-canonical-form', 'academic-math/algebra/bilinear-forms', 'academic-math/algebra/matrix', 'academic-math/algebra/quadratic-forms'] },
            { type: 'category', collapsible: true, collapsed: true, label: '抽象代数', link: {type: 'doc', id: 'academic-math/abstract-algebra/index'}, items: ['academic-math/abstract-algebra/groups', 'academic-math/abstract-algebra/group-actions-and-sylow', 'academic-math/abstract-algebra/rings', 'academic-math/abstract-algebra/fields-and-galois', 'academic-math/abstract-algebra/lattices'] },
            { type: 'category', collapsible: true, collapsed: true, label: '离散数学', link: {type: 'doc', id: 'academic-math/discrete-math/index'}, items: ['academic-math/discrete-math/logic', 'academic-math/discrete-math/set-theory', 'academic-math/discrete-math/relations-and-functions', 'academic-math/discrete-math/relation-closures-and-warshall', 'academic-math/discrete-math/algebraic-systems', 'academic-math/discrete-math/lattice-theory', 'academic-math/discrete-math/boolean-algebra-and-logic-circuits', 'academic-math/discrete-math/graph-theory', 'academic-math/discrete-math/combinatorics', 'academic-math/discrete-math/recurrence-and-generating-functions'] },
            { 
              type: 'category', 
              collapsible: true, 
              collapsed: true, 
              label: '数值分析 (Numerical Analysis)', 
              link: {type: 'doc', id: 'academic-math/numerical-analysis/index'}, 
              items: [
                'academic-math/numerical-analysis/interpolation',
                'academic-math/numerical-analysis/fitting',
                'academic-math/numerical-analysis/integration',
                'academic-math/numerical-analysis/nonlinear-equations'
              ] 
            },
          ],
        },
      ],
    },
  ],

  // 人工智能
  aiSidebar: [
    {
      type: 'category',
      collapsible: true,
      collapsed: true,
      label: '人工智能',
      link: {type: 'doc', id: 'ai/index'},
      items: [
        { type: 'doc', id: 'ai/machine-learning', label: '机器学习' },
        { type: 'doc', id: 'ai/deep-learning', label: '深度学习' },
        { type: 'doc', id: 'ai/nlp', label: '自然语言处理' },
      ],
    },
  ],

  // 信息安全
  infosecSidebar: [
    {
      type: 'category',
      collapsible: true,
      collapsed: true,
      label: '信息安全',
      link: {type: 'doc', id: 'infosec/index'},
      items: [
        { type: 'doc', id: 'infosec/web-security', label: 'Web 安全' },
        { type: 'doc', id: 'infosec/cryptography', label: '密码学' },
        { type: 'doc', id: 'infosec/pwn', label: '二进制安全 (PWN)' },
      ],
    },
  ],


  // 计算机知识库
  csSidebar: [
    {
      type: 'category',
      collapsible: true,
      collapsed: true,
      label: '计算机科学',
      link: {type: 'doc', id: 'cs/index'},
      items: [
        { type: 'category', collapsible: true, collapsed: true, label: 'Linux', link: {type: 'doc', id: 'cs/linux/index'}, items: ['cs/linux/basic-commands', 'cs/linux/permissions', 'cs/linux/file-system'] },
        { type: 'category', collapsible: true, collapsed: true, label: 'C/C++', link: {type: 'doc', id: 'cs/cpp/index'}, items: ['cs/cpp/oop-basics', 'cs/cpp/modern-cpp'] },
        { type: 'doc', id: 'cs/os/index', label: '操作系统' },
        { type: 'doc', id: 'cs/network/index', label: '计算机网络' },
      ],
    },
  ],

  resourceSidebar: [{ type: 'doc', id: 'resources/index', label: '资源导航' }],

  // 练习库镜像结构
  mathExerciseSidebar: [
    {
      type: 'category',
      collapsible: true,
      collapsed: true,
      label: '数学练习库',
      items: [
        {
          type: 'category',
          collapsible: true,
          collapsed: true,
          label: '数学竞赛练习',
          items: [
            { type: 'doc', id: 'exercises/math/competition/elementary', label: '小学奥数练习' },
            { type: 'doc', id: 'exercises/math/competition/junior', label: '初中竞赛练习' },
            { type: 'doc', id: 'exercises/math/competition/senior', label: '高中竞赛练习' },
          ],
        },
        {
          type: 'category',
          collapsible: true,
          collapsed: false,
          label: '大学数学练习 (数学分析)',
          items: [
            { type: 'doc', id: 'exercises/math/analysis', label: '数学分析精选练习 (综合)' },
            {
              type: 'category',
              label: '上册同步专题 (Volume 1)',
              items: [
                { type: 'doc', id: 'exercises/math/analysis-foundations', label: 'Ch 1-4: 实数极限与连续' },
                { type: 'doc', id: 'exercises/math/analysis-derivatives-mean-value', label: 'Ch 5-7: 导数与中值定理' },
                { type: 'doc', id: 'exercises/math/analysis-integral-calculus', label: 'Ch 8-11: 一元积分学' },
              ]
            },
            {
              type: 'category',
              label: '下册同步专题 (Volume 2)',
              items: [
                { type: 'doc', id: 'exercises/math/analysis-series-fourier', label: 'Ch 12-15: 级数论与 Fourier 分析' },
                { type: 'doc', id: 'exercises/math/analysis-multivariable-calculus', label: 'Ch 16-23: 多元微积分与矢量分析' },
              ]
            },
            {
              type: 'category',
              label: '进阶与专项练习',
              items: [
                { type: 'doc', id: 'exercises/math/analysis-function-sequences', label: '进阶：函数列与级数性质' },
                { type: 'doc', id: 'exercises/math/analysis-differential-geometry', label: '进阶：微分几何专题' },
                { type: 'doc', id: 'exercises/math/analysis-differential-equations', label: '进阶：微分方程专题 (ODE/PDE)' },
                { type: 'doc', id: 'exercises/math/topology', label: '点集拓扑专题' },                { type: 'doc', id: 'exercises/math/real-analysis', label: '实变函数专题' },
                { type: 'doc', id: 'exercises/math/functional-analysis', label: '泛函分析专题' },
              ]
            },
          ],
        },
        {
          type: 'category',
          label: '代数与离散练习',
          items: [
            { type: 'doc', id: 'exercises/math/algebra', label: '高等代数练习' },
            { type: 'doc', id: 'exercises/math/abstract-algebra', label: '抽象代数练习' },
            { type: 'doc', id: 'exercises/math/discrete-math', label: '离散数学练习' },
            { type: 'doc', id: 'exercises/math/numerical-analysis', label: '数值分析练习' },
          ],
        },
      ],
    },
  ],

  csExerciseSidebar: [
    {
      type: 'category',
      collapsible: true,
      collapsed: true,
      label: '计算机练习库',
      items: [
        { type: 'doc', id: 'exercises/cs/algorithm-linear-dp', label: '算法竞赛：线性 DP 练习' },
        { type: 'doc', id: 'exercises/cs/algorithm-knapsack', label: '算法竞赛：背包练习' },
        { type: 'doc', id: 'exercises/cs/algorithm-shortest-path', label: '算法竞赛：最短路练习' },
        { type: 'doc', id: 'exercises/cs/algorithm-mst', label: '算法竞赛：最小生成树练习' },
        { type: 'doc', id: 'exercises/cs/algorithm-topo-sort', label: '算法竞赛：拓扑排序练习' },
        { type: 'doc', id: 'exercises/cs/algorithm-scc', label: '算法竞赛：强连通分量练习' },
        { type: 'doc', id: 'exercises/cs/linux', label: 'Linux 实操练习' },
        { type: 'doc', id: 'exercises/cs/cpp', label: 'C++ 编程练习' },
        { type: 'doc', id: 'exercises/cs/os', label: '操作系统练习' },
      ],
    },
  ],

  aiExerciseSidebar: [
    {
      type: 'category',
      collapsible: true,
      collapsed: true,
      label: 'AI 练习库',
      items: [
        { type: 'doc', id: 'exercises/ai/ml', label: '机器学习练习' },
        { type: 'doc', id: 'exercises/ai/dl', label: '深度学习练习' },
      ],
    },
  ],

  infosecExerciseSidebar: [
    {
      type: 'category',
      collapsible: true,
      collapsed: true,
      label: '安全练习库',
      items: [
        { type: 'doc', id: 'exercises/infosec/web', label: 'Web 安全练习' },
        { type: 'doc', id: 'exercises/infosec/pwn', label: '二进制安全练习' },
      ],
    },
  ],
};


export default sidebars;







