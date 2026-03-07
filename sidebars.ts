import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // 算法竞赛知识库
  algoSidebar: [
    'intro',
    {
      type: 'category',
      label: '基础算法',
      link: {type: 'doc', id: 'basic/index'},
      items: [
        'basic/io',
        'basic/complexity',
        'basic/binary-search',
        'basic/sorting',
        'basic/greedy',
        'basic/two-pointers',
      ],
    },
    {
      type: 'category',
      label: '数据结构',
      link: {type: 'doc', id: 'ds/index'},
      items: [
        {
          type: 'category',
          label: 'STL',
          link: {type: 'doc', id: 'ds/stl/index'},
          items: ['ds/stl/map-set'],
        },
        'ds/heap',
        'ds/monotonic',
        'ds/trie',
        'ds/fenwick',
        'ds/segtree',
        'ds/dsu',
        'ds/st',
      ],
    },
    {
      type: 'category',
      label: '图论',
      link: {type: 'doc', id: 'graph/index'},
      items: ['graph/traversal', 'graph/shortest-path', 'graph/mst', 'graph/topo-sort'],
    },
    {
      type: 'category',
      label: '动态规划',
      link: {type: 'doc', id: 'dp/index'},
      items: [
        'dp/linear-dp',
        'dp/knapsack',
        'dp/range-dp',
        'dp/tree-dp',
        'dp/state-compression-dp',
      ],
    },
    {
      type: 'category',
      label: '竞赛数学',
      link: {type: 'doc', id: 'math/index'},
      items: ['math/modint'],
    },
    {
      type: 'category',
      label: '字符串',
      link: {type: 'doc', id: 'string/index'},
      items: ['string/kmp'],
    },
  ],

  // 数学知识库
  mathSidebar: [
    {
      type: 'category',
      label: '数学知识库',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: '基础教育 (K-12)',
          items: [
            {
              type: 'category',
              label: '小学数学',
              link: {type: 'doc', id: 'academic-math/elementary/index'},
              items: [
                'academic-math/elementary/arithmetic',
                'academic-math/elementary/geometry-basic',
                'academic-math/elementary/fractions',
                'academic-math/elementary/word-problems',
              ],
            },
            {
              type: 'category',
              label: '初中数学',
              link: {type: 'doc', id: 'academic-math/junior-high/index'},
              items: [
                'academic-math/junior-high/real-numbers',
                'academic-math/junior-high/linear-equations',
                'academic-math/junior-high/algebraic-expressions',
                'academic-math/junior-high/plane-geometry',
                'academic-math/junior-high/functions-basic',
              ],
            },
            {
              type: 'category',
              label: '高中数学',
              link: {type: 'doc', id: 'academic-math/senior-high/index'},
              items: [
                'academic-math/senior-high/sets',
                'academic-math/senior-high/elementary-functions',
                'academic-math/senior-high/trigonometry',
                'academic-math/senior-high/vectors',
                'academic-math/senior-high/conics',
                'academic-math/senior-high/stats-basic',
                'academic-math/senior-high/calculus-intro',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: '大学数学',
          items: [
            {
              type: 'category',
              label: '数学分析',
              link: {type: 'doc', id: 'academic-math/analysis/index'},
              items: [
                'academic-math/analysis/limits',
                'academic-math/analysis/series',
                'academic-math/analysis/continuity',
                'academic-math/analysis/derivatives',
                'academic-math/analysis/integrals',
              ],
            },
            {
              type: 'category',
              label: '高等代数',
              link: {type: 'doc', id: 'academic-math/algebra/index'},
              items: [
                'academic-math/algebra/polynomial',
                'academic-math/algebra/determinant',
                'academic-math/algebra/linear-equations',
                'academic-math/algebra/matrix',
                'academic-math/algebra/quadratic-forms',
              ],
            },
            {
              type: 'category',
              label: '概率论',
              link: {type: 'doc', id: 'academic-math/probability/index'},
              items: [
                'academic-math/probability/events',
                'academic-math/probability/discrete-rv',
                'academic-math/probability/continuous-rv',
                'academic-math/probability/limit-theorems',
              ],
            },
            {
              type: 'category',
              label: '数理统计',
              link: {type: 'doc', id: 'academic-math/statistics/index'},
              items: [
                'academic-math/statistics/sampling',
                'academic-math/statistics/estimation',
                'academic-math/statistics/hypothesis-testing',
                'academic-math/statistics/regression',
              ],
            },
            {
              type: 'category',
              label: '抽象代数',
              link: {type: 'doc', id: 'academic-math/abstract-algebra/index'},
              items: [
                'academic-math/abstract-algebra/groups',
                'academic-math/abstract-algebra/rings',
                'academic-math/abstract-algebra/lattices',
              ],
            },
            {
              type: 'category',
              label: '离散数学',
              link: {type: 'doc', id: 'academic-math/discrete-math/index'},
              items: [
                'academic-math/discrete-math/logic',
                'academic-math/discrete-math/set-theory',
                'academic-math/discrete-math/graph-theory',
                'academic-math/discrete-math/combinatorics',
              ],
            },
          ],
        },
      ],
    },
  ],

  // 资源导航
  resourceSidebar: [
    {
      type: 'doc',
      id: 'resources/index',
      label: '资源导航',
    },
  ],
};

export default sidebars;
