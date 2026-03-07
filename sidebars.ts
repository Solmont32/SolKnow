import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // 算法竞赛知识库
  algoSidebar: [
    'intro',
    {
      type: 'category',
      label: '基础算法',
      link: {type: 'doc', id: 'basic/index'},
      items: ['basic/io', 'basic/complexity', 'basic/binary-search', 'basic/sorting'],
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
        'ds/fenwick',
        'ds/segtree',
        'ds/dsu',
      ],
    },
    {
      type: 'category',
      label: '图论',
      link: {type: 'doc', id: 'graph/index'},
      items: ['graph/bfs', 'graph/dijkstra'],
    },
    {
      type: 'category',
      label: '动态规划',
      link: {type: 'doc', id: 'dp/index'},
      items: ['dp/knapsack'],
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
      items: [
        {
          type: 'category',
          label: '基础教育 (K-12)',
          items: [
            {
              type: 'doc',
              id: 'academic-math/elementary/index',
              label: '小学数学',
            },
            {
              type: 'doc',
              id: 'academic-math/junior-high/index',
              label: '初中数学',
            },
            {
              type: 'category',
              label: '高中数学',
              link: {type: 'doc', id: 'academic-math/senior-high/index'},
              items: ['academic-math/senior-high/sets'],
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
              items: ['academic-math/analysis/series'],
            },
            {
              type: 'category',
              label: '高等代数',
              link: {type: 'doc', id: 'academic-math/algebra/index'},
              items: ['academic-math/algebra/determinant'],
            },
            {
              type: 'category',
              label: '概率论',
              link: {type: 'doc', id: 'academic-math/probability/index'},
              items: [],
            },
            {
              type: 'category',
              label: '数理统计',
              link: {type: 'doc', id: 'academic-math/statistics/index'},
              items: [],
            },
            {
              type: 'category',
              label: '抽象代数',
              link: {type: 'doc', id: 'academic-math/abstract-algebra/index'},
              items: [],
            },
            {
              type: 'category',
              label: '离散数学',
              link: {type: 'doc', id: 'academic-math/discrete-math/index'},
              items: [],
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
