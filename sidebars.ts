import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // 算法竞赛与平台
  algoSidebar: [
    'intro',
    {
      type: 'category',
      label: '平台专题',
      items: [
        { type: 'doc', id: 'cp/codeforces', label: 'Codeforces' },
        { type: 'doc', id: 'cp/atcoder', label: 'AtCoder' },
      ],
    },
    {
      type: 'category',
      label: '基础算法',
      link: {type: 'doc', id: 'basic/index'},
      items: ['basic/io', 'basic/complexity', 'basic/binary-search', 'basic/sorting', 'basic/greedy', 'basic/two-pointers'],
    },
    {
      type: 'category',
      label: '数据结构',
      link: {type: 'doc', id: 'ds/index'},
      items: [
        { type: 'category', label: 'STL', link: {type: 'doc', id: 'ds/stl/index'}, items: ['ds/stl/map-set'] },
        'ds/heap', 'ds/monotonic', 'ds/trie', 'ds/fenwick', 'ds/segtree', 'ds/dsu', 'ds/st',
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
      items: ['dp/linear-dp', 'dp/knapsack', 'dp/range-dp', 'dp/tree-dp', 'dp/state-compression-dp'],
    },
    {
      type: 'category',
      label: '字符串',
      link: {type: 'doc', id: 'string/index'},
      items: ['string/kmp', 'string/hashing', 'string/manacher', 'string/ac-automaton'],
    },
  ],

  // 数学知识库（含竞赛与专题）
  mathSidebar: [
    {
      type: 'category',
      label: '数学知识体系',
      collapsible: false,
      items: [
        {
          type: 'category',
          label: '数学专题 (Advanced Topics)',
          items: [
            'academic-math/special/factorization-eisenstein',
            'academic-math/special/vieta-newton',
            'academic-math/special/interpolation-newton',
            'academic-math/special/combinatorics-burnside',
          ],
        },
        {
          type: 'category',
          label: '数学竞赛 (Olympiad)',
          items: [
            {
              type: 'category',
              label: '小学奥数',
              link: { type: 'doc', id: 'academic-math/competition/elementary/index' },
              items: [
                'academic-math/competition/elementary/number-theory',
                'academic-math/competition/elementary/counting',
                'academic-math/competition/elementary/geometry',
                'academic-math/competition/elementary/algebra',
                'academic-math/competition/elementary/word-problems',
              ]
            },
            {
              type: 'category',
              label: '初中数学竞赛',
              link: { type: 'doc', id: 'academic-math/competition/junior/index' },
              items: [
                'academic-math/competition/junior/algebra-skills',
                'academic-math/competition/junior/circle-geometry',
                'academic-math/competition/junior/number-theory-basic',
                'academic-math/competition/junior/combinatorics',
              ]
            },
            {
              type: 'category',
              label: '高中数学竞赛',
              link: { type: 'doc', id: 'academic-math/competition/senior/index' },
              items: [
                'academic-math/competition/senior/inequalities',
                'academic-math/competition/senior/geometry-theorems',
                'academic-math/competition/senior/number-theory-advanced',
                'academic-math/competition/senior/combinatorics-advanced',
              ]
            },
          ],
        },

        {
          type: 'category',
          label: '基础教育 (K-12)',
          items: [
            { type: 'category', label: '小学数学', link: {type: 'doc', id: 'academic-math/elementary/index'}, items: ['academic-math/elementary/arithmetic', 'academic-math/elementary/geometry-basic', 'academic-math/elementary/fractions', 'academic-math/elementary/word-problems'] },
            { type: 'category', label: '初中数学', link: {type: 'doc', id: 'academic-math/junior-high/index'}, items: ['academic-math/junior-high/real-numbers', 'academic-math/junior-high/linear-equations', 'academic-math/junior-high/algebraic-expressions', 'academic-math/junior-high/plane-geometry', 'academic-math/junior-high/functions-basic'] },
            { type: 'category', label: '高中数学', link: {type: 'doc', id: 'academic-math/senior-high/index'}, items: ['academic-math/senior-high/sets', 'academic-math/senior-high/elementary-functions', 'academic-math/senior-high/trigonometry', 'academic-math/senior-high/vectors', 'academic-math/senior-high/conics', 'academic-math/senior-high/stats-basic', 'academic-math/senior-high/calculus-intro'] },
          ],
        },
        {
          type: 'category',
          label: '大学数学',
          items: [
            { type: 'category', label: '数学分析', link: {type: 'doc', id: 'academic-math/analysis/index'}, items: ['academic-math/analysis/limits', 'academic-math/analysis/series', 'academic-math/analysis/continuity', 'academic-math/analysis/derivatives', 'academic-math/analysis/integrals'] },
            { type: 'category', label: '高等代数', link: {type: 'doc', id: 'academic-math/algebra/index'}, items: ['academic-math/algebra/polynomial', 'academic-math/algebra/determinant', 'academic-math/algebra/linear-equations', 'academic-math/algebra/matrix', 'academic-math/algebra/quadratic-forms'] },
            { type: 'category', label: '离散数学', link: {type: 'doc', id: 'academic-math/discrete-math/index'}, items: ['academic-math/discrete-math/logic', 'academic-math/discrete-math/set-theory', 'academic-math/discrete-math/graph-theory', 'academic-math/discrete-math/combinatorics'] },
          ],
        },
      ],
    },
  ],

  // 人工智能
  aiSidebar: [
    {
      type: 'category',
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
      label: '计算机科学',
      link: {type: 'doc', id: 'cs/index'},
      items: [
        { type: 'category', label: 'Linux', link: {type: 'doc', id: 'cs/linux/index'}, items: ['cs/linux/basic-commands', 'cs/linux/permissions', 'cs/linux/file-system'] },
        { type: 'category', label: 'C/C++', link: {type: 'doc', id: 'cs/cpp/index'}, items: ['cs/cpp/oop-basics', 'cs/cpp/modern-cpp'] },
        { type: 'doc', id: 'cs/os/index', label: '操作系统' },
        { type: 'doc', id: 'cs/network/index', label: '计算机网络' },
      ],
    },
  ],

  resourceSidebar: [{ type: 'doc', id: 'resources/index', label: '资源导航' }],
};

export default sidebars;
