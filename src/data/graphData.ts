export interface Node {
  id: string;
  name: string;
  val: number;
  group: number;
  type: 'domain' | 'category' | 'doc';
  description?: string;
  path?: string;
}

export interface Link {
  source: string;
  target: string;
  value: number;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}

export const graphData: GraphData = {
  nodes: [
    // Domains
    {
      id: 'math',
      name: '数学体系',
      val: 10,
      group: 1,
      type: 'domain',
      path: '/docs/academic-math/algebra',
    },
    { id: 'algo', name: '算法竞赛', val: 10, group: 2, type: 'domain', path: '/docs/intro' },
    { id: 'cs', name: '计算机科学', val: 10, group: 3, type: 'domain', path: '/docs/cs' },
    { id: 'ai', name: '人工智能', val: 10, group: 4, type: 'domain', path: '/docs/ai' },

    // Math Categories
    {
      id: 'analysis',
      name: '数学分析',
      val: 7,
      group: 1,
      type: 'category',
      path: '/docs/academic-math/analysis',
    },
    {
      id: 'algebra',
      name: '高等代数',
      val: 7,
      group: 1,
      type: 'category',
      path: '/docs/academic-math/algebra',
    },
    {
      id: 'discrete',
      name: '离散数学',
      val: 7,
      group: 1,
      type: 'category',
      path: '/docs/academic-math/discrete-math',
    },
    {
      id: 'probability',
      name: '概率论',
      val: 7,
      group: 1,
      type: 'category',
      path: '/docs/academic-math/probability',
    },

    // Algo Categories
    { id: 'basic-algo', name: '基础算法', val: 7, group: 2, type: 'category', path: '/docs/basic' },
    { id: 'ds', name: '数据结构', val: 7, group: 2, type: 'category', path: '/docs/ds' },
    { id: 'graph', name: '图论', val: 7, group: 2, type: 'category', path: '/docs/graph' },
    { id: 'dp', name: '动态规划', val: 7, group: 2, type: 'category', path: '/docs/dp' },
    { id: 'string', name: '字符串', val: 7, group: 2, type: 'category', path: '/docs/string' },

    // Cross-links (Key docs)
    {
      id: 'number-theory',
      name: '数论',
      val: 5,
      group: 1,
      type: 'doc',
      path: '/docs/math/number-theory',
    },
    {
      id: 'matrix-pow',
      name: '矩阵快速幂',
      val: 5,
      group: 2,
      type: 'doc',
      path: '/docs/math/matrix-fast-pow',
    },
    {
      id: 'shortest-path',
      name: '最短路',
      val: 5,
      group: 2,
      type: 'doc',
      path: '/docs/graph/shortest-path',
    },
    { id: 'mst', name: '最小生成树', val: 5, group: 2, type: 'doc', path: '/docs/graph/mst' },
    {
      id: 'combinatorics-and-game-theory',
      name: '组合计数与博弈论',
      val: 5,
      group: 1,
      type: 'doc',
      path: '/docs/math/combinatorics-and-game-theory',
    },
    {
      id: 'graph-theory-math',
      name: '图论(数学)',
      val: 5,
      group: 1,
      type: 'doc',
      path: '/docs/academic-math/discrete-math/graph-theory',
    },
    {
      id: 'logic',
      name: '数理逻辑',
      val: 5,
      group: 1,
      type: 'doc',
      path: '/docs/academic-math/discrete-math/logic',
    },
    {
      id: 'matrix-math',
      name: '矩阵论',
      val: 5,
      group: 1,
      type: 'doc',
      path: '/docs/academic-math/algebra/matrix',
    },
    { id: 'linear-dp', name: '线性 DP', val: 5, group: 2, type: 'doc', path: '/docs/dp/linear-dp' },
  ],
  links: [
    // Domain to Categories
    { source: 'math', target: 'analysis', value: 2 },
    { source: 'math', target: 'algebra', value: 2 },
    { source: 'math', target: 'discrete', value: 2 },
    { source: 'math', target: 'probability', value: 2 },

    { source: 'algo', target: 'basic-algo', value: 2 },
    { source: 'algo', target: 'ds', value: 2 },
    { source: 'algo', target: 'graph', value: 2 },
    { source: 'algo', target: 'dp', value: 2 },
    { source: 'algo', target: 'string', value: 2 },

    // Category to Docs
    { source: 'discrete', target: 'graph-theory-math', value: 1 },
    { source: 'discrete', target: 'combinatorics-and-game-theory', value: 1 },
    { source: 'discrete', target: 'logic', value: 1 },
    { source: 'algebra', target: 'matrix-math', value: 1 },
    { source: 'graph', target: 'shortest-path', value: 1 },
    { source: 'graph', target: 'mst', value: 1 },
    { source: 'dp', target: 'linear-dp', value: 1 },
    { source: 'basic-algo', target: 'matrix-pow', value: 1 },

    // 核心交叉联结 (The "Structured Connections")
    { source: 'graph-theory-math', target: 'graph', value: 5 }, // 离散数学图论 -> 算法图论
    { source: 'matrix-math', target: 'matrix-pow', value: 5 }, // 矩阵论 -> 矩阵快速幂
    { source: 'combinatorics-and-game-theory', target: 'dp', value: 5 }, // 组合数学 -> 动态规划
    { source: 'analysis', target: 'ai', value: 4 }, // 数学分析 -> AI
    { source: 'algebra', target: 'ai', value: 4 }, // 线性代数 -> AI
    { source: 'logic', target: 'cs', value: 4 }, // 数理逻辑 -> 计算机科学
  ],
};
