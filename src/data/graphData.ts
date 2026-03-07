export interface Node {
  id: string;
  name: string;
  val: number;
  group: number;
  type: 'domain' | 'category' | 'doc';
  description?: string;
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
    { id: 'math', name: '数学体系', val: 10, group: 1, type: 'domain' },
    { id: 'algo', name: '算法竞赛', val: 10, group: 2, type: 'domain' },
    { id: 'cs', name: '计算机科学', val: 10, group: 3, type: 'domain' },
    { id: 'ai', name: '人工智能', val: 10, group: 4, type: 'domain' },

    // Math Categories
    { id: 'analysis', name: '数学分析', val: 7, group: 1, type: 'category' },
    { id: 'algebra', name: '高等代数', val: 7, group: 1, type: 'category' },
    { id: 'discrete', name: '离散数学', val: 7, group: 1, type: 'category' },
    { id: 'probability', name: '概率论', val: 7, group: 1, type: 'category' },

    // Algo Categories
    { id: 'basic-algo', name: '基础算法', val: 7, group: 2, type: 'category' },
    { id: 'ds', name: '数据结构', val: 7, group: 2, type: 'category' },
    { id: 'graph', name: '图论', val: 7, group: 2, type: 'category' },
    { id: 'dp', name: '动态规划', val: 7, group: 2, type: 'category' },
    { id: 'string', name: '字符串', val: 7, group: 2, type: 'category' },

    // Cross-links (Key docs)
    { id: 'number-theory', name: '数论', val: 5, group: 1, type: 'doc' },
    { id: 'matrix-pow', name: '矩阵快速幂', val: 5, group: 2, type: 'doc' },
    { id: 'shortest-path', name: '最短路', val: 5, group: 2, type: 'doc' },
    { id: 'mst', name: '最小生成树', val: 5, group: 2, type: 'doc' },
    { id: 'combinatorics', name: '组合数学', val: 5, group: 1, type: 'doc' },
    { id: 'graph-theory-math', name: '图论(数学)', val: 5, group: 1, type: 'doc' },
    { id: 'logic', name: '数理逻辑', val: 5, group: 1, type: 'doc' },
    { id: 'matrix-math', name: '矩阵论', val: 5, group: 1, type: 'doc' },
    { id: 'linear-dp', name: '线性 DP', val: 5, group: 2, type: 'doc' },
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
    { source: 'discrete', target: 'combinatorics', value: 1 },
    { source: 'discrete', target: 'logic', value: 1 },
    { source: 'algebra', target: 'matrix-math', value: 1 },
    { source: 'graph', target: 'shortest-path', value: 1 },
    { source: 'graph', target: 'mst', value: 1 },
    { source: 'dp', target: 'linear-dp', value: 1 },
    { source: 'basic-algo', target: 'matrix-pow', value: 1 },

    // 核心交叉联结 (The "Structured Connections")
    { source: 'graph-theory-math', target: 'graph', value: 5 }, // 离散数学图论 -> 算法图论
    { source: 'matrix-math', target: 'matrix-pow', value: 5 }, // 矩阵论 -> 矩阵快速幂
    { source: 'combinatorics', target: 'dp', value: 5 }, // 组合数学 -> 动态规划
    { source: 'analysis', target: 'ai', value: 4 }, // 数学分析 -> AI
    { source: 'algebra', target: 'ai', value: 4 }, // 线性代数 -> AI
    { source: 'logic', target: 'cs', value: 4 }, // 数理逻辑 -> 计算机科学
  ],
};
