import React, { useCallback, useRef, useEffect, useState, useMemo } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { graphData, Node } from '../data/graphData';
import { useHistory } from '@docusaurus/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Maximize2,
  RotateCcw,
  BookOpen,
  Info,
  Code2,
  Infinity as InfinityIcon,
  Monitor,
  TrendingUp,
  BarChart3,
  Shield,
  Brain,
  Search,
  X,
  ChevronRight,
  Globe,
  Tag,
  FileText,
} from 'lucide-react';

interface ForceGraph3DInstance {
  cameraPosition: (pos: { x: number; y: number; z: number }, lookAt?: { x: number; y: number; z: number }, transitionMs?: number) => void;
  refresh: () => void;
}

// 7个领域的颜色配置
const GROUP_COLORS: Record<number, string> = {
  1: '#3b82f6', // 数学 - blue
  2: '#8b5cf6', // 算法 - purple
  3: '#f59e0b', // CS - amber
  4: '#ef4444', // AI - red
  5: '#10b981', // 金融 - emerald
  6: '#06b6d4', // 量化 - cyan
  7: '#f43f5e', // 安全 - rose
};

const GROUP_NAMES: Record<number, string> = {
  1: '数学',
  2: '算法',
  3: '计算机',
  4: 'AI',
  5: '金融',
  6: '量化',
  7: '安全',
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  domain: <Globe size={14} />,
  category: <Tag size={14} />,
  doc: <FileText size={14} />,
};

const KnowledgeGraph3DInner = () => {
  const history = useHistory();
  const fgRef = useRef<ForceGraph3DInstance | null>(null);
  const [ForceGraph3D, setForceGraph3D] = useState<React.ComponentType<any> | null>(null);
  const [SpriteText, setSpriteText] = useState<any>(null);
  const [focusNode, setFocusNode] = useState<Node | null>(null);
  const [hoverNode, setHoverNode] = useState<Node | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNodeList, setShowNodeList] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      import('react-force-graph-3d'),
      import('three-spritetext'),
    ]).then(([forceGraphMod, spriteTextMod]) => {
      setForceGraph3D(() => forceGraphMod.default);
      setSpriteText(() => spriteTextMod.default);
    });
  }, []);

  // 过滤节点
  const filteredNodes = useMemo(() => {
    return graphData.nodes.filter((node) => {
      const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGroup = selectedGroup === null || node.group === selectedGroup;
      return matchesSearch && matchesGroup;
    });
  }, [searchQuery, selectedGroup]);

  // 为3D图准备数据
  const graphDataFiltered = useMemo(() => {
    const nodeIds = new Set(filteredNodes.map((n) => n.id));
    const links = graphData.links.filter(
      (l) => nodeIds.has(typeof l.source === 'string' ? l.source : l.source.id) &&
             nodeIds.has(typeof l.target === 'string' ? l.target : l.target.id)
    );
    return { nodes: filteredNodes, links };
  }, [filteredNodes]);

  const handleNodeClick = useCallback(
    (node: Node) => {
      if (focusNode?.id === node.id) {
        if (node.path) history.push(node.path);
        return;
      }
      setFocusNode(node);

      if (fgRef.current) {
        const distance = 180;
        const distRatio = 1 + distance / Math.hypot(node.x || 0, node.y || 0, (node.z || 0) + distance);
        fgRef.current.cameraPosition(
          {
            x: (node.x || 0) * distRatio,
            y: (node.y || 0) * distRatio,
            z: ((node.z || 0) + distance) * distRatio,
          },
          { x: node.x || 0, y: node.y || 0, z: node.z || 0 },
          1200
        );
      }
    },
    [focusNode, history]
  );

  const jumpToNode = (node: Node) => {
    handleNodeClick(node);
  };

  const resetView = () => {
    setFocusNode(null);
    setHoverNode(null);
    setSelectedGroup(null);
    if (fgRef.current) {
      fgRef.current.cameraPosition({ x: 0, y: 0, z: 350 }, { x: 0, y: 0, z: 0 }, 1200);
    }
  };

  const getGroupIcon = (group: number) => {
    switch (group) {
      case 1: return <InfinityIcon size={18} className="text-blue-500" />;
      case 2: return <Code2 size={18} className="text-purple-500" />;
      case 3: return <Monitor size={18} className="text-amber-500" />;
      case 4: return <Brain size={18} className="text-red-500" />;
      case 5: return <TrendingUp size={18} className="text-emerald-500" />;
      case 6: return <BarChart3 size={18} className="text-cyan-500" />;
      case 7: return <Shield size={18} className="text-rose-500" />;
      default: return <Info size={18} />;
    }
  };

  // 创建带标签的3D节点
  const nodeThreeObject = useCallback((node: Node) => {
    if (!SpriteText) return null;

    const color = GROUP_COLORS[node.group] || '#94a3b8';
    const isImportant = node.type === 'domain' || node.type === 'category';

    // 创建文字标签
    const sprite = new SpriteText(node.name);
    sprite.color = color;
    sprite.textHeight = isImportant ? 4 : 3;
    sprite.fontWeight = isImportant ? 'bold' : 'normal';
    sprite.padding = 2;
    sprite.borderRadius = 2;
    sprite.backgroundColor = 'rgba(0,0,0,0.6)';

    // 根据节点类型调整位置
    sprite.position.y = node.val * 0.6 + 6;

    return sprite;
  }, [SpriteText]);

  if (!ForceGraph3D || !SpriteText)
    return (
      <div
        style={{
          height: '800px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--ifm-background-color)',
          borderRadius: '24px',
        }}
      >
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full dark:bg-gray-700"></div>
          <span className="text-gray-500 font-medium">加载3D知识图谱...</span>
        </div>
      </div>
    );

  return (
    <div className="knowledge-graph-container relative w-full h-[800px] rounded-3xl overflow-hidden border border-[var(--ifm-color-emphasis-200)] shadow-[var(--solknow-card-shadow)] bg-[var(--ifm-background-color)]">
      {/* 3D 图 */}
      <ForceGraph3D
        ref={fgRef}
        graphData={graphDataFiltered}
        nodeLabel="name"
        nodeColor={(node: Node) => GROUP_COLORS[node.group] || '#94a3b8'}
        nodeRelSize={(node: Node) => node.type === 'domain' ? 6 : node.type === 'category' ? 4 : 2.5}
        nodeResolution={16}
        nodeOpacity={0.9}
        linkColor={() => 'rgba(148, 163, 184, 0.2)'}
        linkWidth={0.3}
        linkOpacity={0.4}
        backgroundColor="rgba(0,0,0,0)"
        showNavInfo={false}
        cameraPosition={{ x: 0, y: 0, z: 350 }}
        onNodeClick={handleNodeClick}
        onNodeHover={setHoverNode}
        onBackgroundClick={() => setFocusNode(null)}
        cooldownTicks={200}
        d3AlphaDecay={0.01}
        d3VelocityDecay={0.15}
        d3ForceLink={{ distance: 100 }}
        d3ForceCharge={-200}
        warmupTicks={30}
        nodeThreeObject={nodeThreeObject}
        nodeThreeObjectExtend={false}
      />

      {/* 左侧节点列表 */}
      <AnimatePresence>
        {showNodeList && (
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            className="absolute top-4 left-4 bottom-4 w-80 backdrop-blur-xl bg-white/90 dark:bg-black/80 border border-white/30 dark:border-white/10 rounded-2xl shadow-2xl z-20 flex flex-col"
          >
            {/* 搜索框 */}
            <div className="p-4 border-b border-gray-200 dark:border-white/10">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Search size={18} />
                知识节点
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索节点..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 pl-9 bg-gray-100 dark:bg-white/10 border border-transparent rounded-lg text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-white/20 rounded"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* 领域筛选 */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-white/10">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedGroup(null)}
                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                    selectedGroup === null
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20'
                  }`}
                >
                  全部
                </button>
                {Object.entries(GROUP_NAMES).map(([group, name]) => (
                  <button
                    key={group}
                    onClick={() => setSelectedGroup(Number(group))}
                    className="px-2 py-1 text-xs rounded-full transition-colors"
                    style={{
                      backgroundColor: selectedGroup === Number(group) ? GROUP_COLORS[Number(group)] : undefined,
                      color: selectedGroup === Number(group) ? 'white' : undefined,
                      background: selectedGroup !== Number(group) ? 'rgba(0,0,0,0.05)' : undefined,
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* 节点列表 */}
            <div className="flex-1 overflow-y-auto p-2">
              {filteredNodes.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm">
                  未找到匹配的节点
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredNodes.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => jumpToNode(node)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all hover:bg-gray-100 dark:hover:bg-white/10 ${
                        focusNode?.id === node.id ? 'bg-blue-50 dark:bg-blue-500/20 border-l-2 border-blue-500' : ''
                      }`}
                    >
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: GROUP_COLORS[node.group] }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{node.name}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          {TYPE_ICONS[node.type]}
                          {GROUP_NAMES[node.group]}
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-gray-300 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 统计 */}
            <div className="p-3 border-t border-gray-200 dark:border-white/10 text-xs text-gray-500">
              共 {filteredNodes.length} 个节点
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 切换节点列表按钮 */}
      <button
        onClick={() => setShowNodeList(!showNodeList)}
        className="absolute top-4 left-4 z-30 p-3 backdrop-blur-md bg-white/80 dark:bg-black/70 border border-white/30 dark:border-white/10 rounded-xl shadow-lg hover:scale-110 transition-all"
        style={{ marginLeft: showNodeList ? '320px' : '0' }}
      >
        {showNodeList ? <X size={20} /> : <Search size={20} />}
      </button>

      {/* 右侧节点详情 */}
      <AnimatePresence>
        {focusNode && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="absolute top-4 right-4 w-72 backdrop-blur-xl bg-white/90 dark:bg-black/80 border border-white/30 dark:border-white/10 rounded-2xl p-5 shadow-2xl z-20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${GROUP_COLORS[focusNode.group]}20` }}
              >
                {getGroupIcon(focusNode.group)}
              </div>
              <div>
                <h3 className="text-lg font-bold">{focusNode.name}</h3>
                <span className="text-xs text-gray-400">{GROUP_NAMES[focusNode.group]} · {focusNode.type === 'domain' ? '领域' : focusNode.type === 'category' ? '分类' : '文档'}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {focusNode.description || `探索关于 ${focusNode.name} 的知识体系与深度解析文档。`}
            </p>

            <div className="flex flex-col gap-2">
              {focusNode.path && (
                <button
                  onClick={() => history.push(focusNode.path!)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all font-medium border-none cursor-pointer"
                >
                  <span>阅读详细文档</span>
                  <BookOpen size={18} />
                </button>
              )}

              <button
                onClick={() => setFocusNode(null)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300 rounded-xl transition-all text-sm border-none cursor-pointer"
              >
                <X size={14} />
                <span>关闭</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 顶部控制栏 */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button
          onClick={resetView}
          className="p-3 backdrop-blur-md bg-white/80 dark:bg-black/70 border border-white/30 dark:border-white/10 rounded-xl shadow-lg hover:scale-110 transition-all"
          title="重置视角"
        >
          <Maximize2 size={20} />
        </button>
      </div>

      {/* 底部图例 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none">
        <div className="px-4 py-2 backdrop-blur-md bg-white/80 dark:bg-black/70 border border-white/30 dark:border-white/10 rounded-full text-xs font-medium flex items-center gap-4">
          {Object.entries(GROUP_NAMES).map(([group, name]) => (
            <div key={group} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: GROUP_COLORS[Number(group)] }}
              />
              <span className="text-gray-700 dark:text-gray-200">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 操作提示 */}
      <div className="absolute bottom-4 right-4 px-3 py-1.5 backdrop-blur-md bg-white/60 dark:bg-black/50 border border-white/20 rounded-full text-xs text-gray-500 dark:text-gray-400 pointer-events-none">
        左键旋转 · 右键平移 · 滚轮缩放 · 点击跳转
      </div>
    </div>
  );
};

export default function KnowledgeGraph() {
  return (
    <BrowserOnly
      fallback={
        <div
          style={{
            height: '800px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          加载3D图谱中...
        </div>
      }
    >
      {() => <KnowledgeGraph3DInner />}
    </BrowserOnly>
  );
}
