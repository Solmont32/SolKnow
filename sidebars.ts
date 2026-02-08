import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '基础',
      link: {type: 'doc', id: 'basic/index'},
      items: ['basic/io', 'basic/complexity'],
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
      label: 'DP',
      link: {type: 'doc', id: 'dp/index'},
      items: ['dp/knapsack'],
    },
    {
      type: 'category',
      label: '数学',
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
};

export default sidebars;
