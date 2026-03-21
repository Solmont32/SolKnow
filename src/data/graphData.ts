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
  source: string | Node;
  target: string | Node;
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
      path: '/docs/academic-math',
    },
    { id: 'algo', name: '算法竞赛', val: 10, group: 2, type: 'domain', path: '/docs/cp' },
    { id: 'cs', name: '计算机科学', val: 10, group: 3, type: 'domain', path: '/docs/cs' },
    { id: 'ai', name: '人工智能', val: 10, group: 4, type: 'domain', path: '/docs/ai' },
    { id: 'finance', name: '金融学', val: 10, group: 5, type: 'domain', path: '/docs/finance' },
    { id: 'quant', name: '量化交易', val: 10, group: 6, type: 'domain', path: '/docs/quant' },
    { id: 'infosec', name: '信息安全', val: 10, group: 7, type: 'domain', path: '/docs/infosec' },

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
    { id: 'graph', name: '图论算法', val: 7, group: 2, type: 'category', path: '/docs/graph' },
    { id: 'dp', name: '动态规划', val: 7, group: 2, type: 'category', path: '/docs/dp' },
    { id: 'string', name: '字符串', val: 7, group: 2, type: 'category', path: '/docs/string' },
    { id: 'geometry', name: '计算几何', val: 7, group: 2, type: 'category', path: '/docs/geometry' },
    { id: 'search', name: '搜索算法', val: 7, group: 2, type: 'category', path: '/docs/search' },
    { id: 'math-algo', name: '数学算法', val: 7, group: 2, type: 'category', path: '/docs/math' },

    // Finance Categories
    { id: 'finance-basics', name: '金融基础', val: 7, group: 5, type: 'category', path: '/docs/finance/basics' },
    { id: 'investment', name: '投资学', val: 7, group: 5, type: 'category', path: '/docs/finance/investment' },
    { id: 'corporate-finance', name: '公司金融', val: 7, group: 5, type: 'category', path: '/docs/finance/corporate' },
    { id: 'finance-math', name: '金融数学', val: 7, group: 5, type: 'category', path: '/docs/finance/math' },
    { id: 'fixed-income', name: '固定收益', val: 7, group: 5, type: 'category', path: '/docs/finance/fixed-income' },
    { id: 'derivatives', name: '衍生品', val: 7, group: 5, type: 'category', path: '/docs/finance/derivatives' },
    { id: 'equity', name: '权益投资', val: 7, group: 5, type: 'category', path: '/docs/finance/equity' },

    // Quant Categories
    { id: 'quant-basics', name: '量化基础', val: 7, group: 6, type: 'category', path: '/docs/quant' },
    { id: 'quant-strategy', name: '量化策略', val: 7, group: 6, type: 'category', path: '/docs/quant/strategy' },
    { id: 'quant-risk', name: '风险管理', val: 7, group: 6, type: 'category', path: '/docs/quant/risk' },

    // InfoSec Categories
    { id: 'crypto', name: '密码学', val: 7, group: 7, type: 'category', path: '/docs/infosec/cryptography' },
    { id: 'security', name: '系统安全', val: 7, group: 7, type: 'category', path: '/docs/infosec' },

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
    { id: 'segment-tree', name: '线段树', val: 5, group: 2, type: 'doc', path: '/docs/ds/segment-tree' },
    { id: 'tree', name: '树形结构', val: 5, group: 2, type: 'doc', path: '/docs/ds/tree' },
    { id: 'dijkstra', name: 'Dijkstra算法', val: 5, group: 2, type: 'doc', path: '/docs/graph/shortest-path' },
    { id: 'union-find', name: '并查集', val: 5, group: 2, type: 'doc', path: '/docs/ds/union-find' },

    // Finance Docs
    { id: 'capm', name: 'CAPM模型', val: 5, group: 5, type: 'doc', path: '/docs/finance/investment' },
    { id: 'markowitz', name: '马科维茨模型', val: 5, group: 5, type: 'doc', path: '/docs/finance/investment' },
    { id: 'bs-model', name: 'Black-Scholes模型', val: 5, group: 5, type: 'doc', path: '/docs/finance/derivatives' },
    { id: 'bond-pricing', name: '债券定价', val: 5, group: 5, type: 'doc', path: '/docs/finance/fixed-income' },
    { id: 'dcf', name: 'DCF估值', val: 5, group: 5, type: 'doc', path: '/docs/finance/corporate' },
    { id: 'behavioral-finance', name: '行为金融学', val: 5, group: 5, type: 'doc', path: '/docs/finance/behavioral' },

    // Quant Docs
    { id: 'stat-arb', name: '统计套利', val: 5, group: 6, type: 'doc', path: '/docs/quant/strategy/statistical-arbitrage' },
    { id: 'factor-model', name: '因子模型', val: 5, group: 6, type: 'doc', path: '/docs/quant/strategy/factor-investing' },
    { id: 'var-model', name: 'VaR模型', val: 5, group: 6, type: 'doc', path: '/docs/quant/risk/var' },
    { id: 'portfolio-opt', name: '组合优化', val: 5, group: 6, type: 'doc', path: '/docs/quant/portfolio-optimization' },
    { id: 'backtesting', name: '回测', val: 5, group: 6, type: 'doc', path: '/docs/quant/backtesting' },

    // InfoSec Docs
    { id: 'rsa', name: 'RSA加密', val: 5, group: 7, type: 'doc', path: '/docs/infosec/cryptography' },
    { id: 'aes', name: 'AES加密', val: 5, group: 7, type: 'doc', path: '/docs/infosec/cryptography' },
    { id: 'hash', name: '哈希函数', val: 5, group: 7, type: 'doc', path: '/docs/infosec/cryptography' },

    // AI Docs
    { id: 'ml-basics', name: '机器学习基础', val: 5, group: 4, type: 'doc', path: '/docs/ai' },
    { id: 'deep-learning', name: '深度学习', val: 5, group: 4, type: 'doc', path: '/docs/ai' },
    { id: 'nlp', name: '自然语言处理', val: 5, group: 4, type: 'doc', path: '/docs/ai/nlp' },
    { id: 'cv', name: '计算机视觉', val: 5, group: 4, type: 'doc', path: '/docs/ai/cv' },

    // CS Docs
    { id: 'os', name: '操作系统', val: 5, group: 3, type: 'doc', path: '/docs/cs/os' },
    { id: 'network', name: '计算机网络', val: 5, group: 3, type: 'doc', path: '/docs/cs/network' },
    { id: 'database', name: '数据库', val: 5, group: 3, type: 'doc', path: '/docs/cs/database' },
    { id: 'compiler', name: '编译原理', val: 5, group: 3, type: 'doc', path: '/docs/cs/compiler' },
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

    // Category to Docs - Math
    { source: 'discrete', target: 'graph-theory-math', value: 1 },
    { source: 'discrete', target: 'combinatorics-and-game-theory', value: 1 },
    { source: 'discrete', target: 'logic', value: 1 },
    { source: 'algebra', target: 'matrix-math', value: 1 },
    { source: 'analysis', target: 'number-theory', value: 1 },

    // Category to Docs - Algo
    { source: 'graph', target: 'shortest-path', value: 1 },
    { source: 'graph', target: 'mst', value: 1 },
    { source: 'graph', target: 'dijkstra', value: 1 },
    { source: 'dp', target: 'linear-dp', value: 1 },
    { source: 'basic-algo', target: 'matrix-pow', value: 1 },
    { source: 'ds', target: 'segment-tree', value: 1 },
    { source: 'ds', target: 'tree', value: 1 },
    { source: 'ds', target: 'union-find', value: 1 },
    { source: 'math-algo', target: 'number-theory', value: 1 },

    // Category to Docs - Finance
    { source: 'finance-basics', target: 'capm', value: 1 },
    { source: 'investment', target: 'markowitz', value: 1 },
    { source: 'investment', target: 'capm', value: 1 },
    { source: 'derivatives', target: 'bs-model', value: 1 },
    { source: 'fixed-income', target: 'bond-pricing', value: 1 },
    { source: 'corporate-finance', target: 'dcf', value: 1 },

    // Category to Docs - Quant
    { source: 'quant-basics', target: 'portfolio-opt', value: 1 },
    { source: 'quant-basics', target: 'backtesting', value: 1 },
    { source: 'quant-strategy', target: 'stat-arb', value: 1 },
    { source: 'quant-strategy', target: 'factor-model', value: 1 },
    { source: 'quant-risk', target: 'var-model', value: 1 },

    // Category to Docs - InfoSec
    { source: 'crypto', target: 'rsa', value: 1 },
    { source: 'crypto', target: 'aes', value: 1 },
    { source: 'crypto', target: 'hash', value: 1 },

    // Category to Docs - AI
    { source: 'ai', target: 'ml-basics', value: 2 },
    { source: 'ai', target: 'deep-learning', value: 2 },
    { source: 'ai', target: 'nlp', value: 2 },
    { source: 'ai', target: 'cv', value: 2 },

    // Category to Docs - CS
    { source: 'cs', target: 'os', value: 2 },
    { source: 'cs', target: 'network', value: 2 },
    { source: 'cs', target: 'database', value: 2 },
    { source: 'cs', target: 'compiler', value: 2 },

    // 核心交叉联结 (The "Structured Connections")
    // Math <-> CS/Algo
    { source: 'graph-theory-math', target: 'graph', value: 5 },
    { source: 'matrix-math', target: 'matrix-pow', value: 5 },
    { source: 'combinatorics-and-game-theory', target: 'dp', value: 5 },
    { source: 'number-theory', target: 'math-algo', value: 5 },
    { source: 'analysis', target: 'ai', value: 4 },
    { source: 'algebra', target: 'ai', value: 4 },
    { source: 'probability', target: 'ai', value: 4 },
    { source: 'logic', target: 'cs', value: 4 },
    { source: 'logic', target: 'crypto', value: 3 },

    // Math <-> Finance/Quant
    { source: 'analysis', target: 'finance', value: 4 },
    { source: 'probability', target: 'finance', value: 5 },
    { source: 'probability', target: 'quant', value: 5 },
    { source: 'algebra', target: 'quant', value: 4 },
    { source: 'statistics', target: 'quant', value: 5 },
    { source: 'finance-math', target: 'quant', value: 5 },

    // Finance <-> Quant
    { source: 'finance', target: 'quant', value: 5 },
    { source: 'investment', target: 'quant', value: 4 },
    { source: 'derivatives', target: 'quant', value: 4 },
    { source: 'markowitz', target: 'portfolio-opt', value: 5 },
    { source: 'capm', target: 'factor-model', value: 4 },
    { source: 'bs-model', target: 'quant', value: 4 },

    // Quant <-> AI/ML
    { source: 'quant', target: 'ai', value: 4 },
    { source: 'quant', target: 'ml-basics', value: 4 },
    { source: 'quant', target: 'deep-learning', value: 3 },
    { source: 'factor-model', target: 'ml-basics', value: 3 },
    { source: 'nlp', target: 'quant', value: 2 },

    // AI <-> Math
    { source: 'deep-learning', target: 'algebra', value: 5 },
    { source: 'deep-learning', target: 'analysis', value: 4 },
    { source: 'ml-basics', target: 'probability', value: 5 },
    { source: 'ml-basics', target: 'statistics', value: 5 },

    // CS <-> InfoSec
    { source: 'cs', target: 'infosec', value: 3 },
    { source: 'network', target: 'security', value: 3 },
    { source: 'crypto', target: 'math', value: 4 },
    { source: 'hash', target: 'string', value: 3 },

    // Algo <-> CS
    { source: 'algo', target: 'cs', value: 4 },
    { source: 'algo', target: 'os', value: 2 },
    { source: 'algo', target: 'compiler', value: 2 },
    { source: 'database', target: 'ds', value: 3 },

    // Finance internal connections
    { source: 'finance-basics', target: 'investment', value: 3 },
    { source: 'investment', target: 'corporate-finance', value: 3 },
    { source: 'investment', target: 'fixed-income', value: 3 },
    { source: 'investment', target: 'derivatives', value: 3 },
    { source: 'investment', target: 'equity', value: 3 },
    { source: 'behavioral-finance', target: 'investment', value: 3 },
  ],
};
