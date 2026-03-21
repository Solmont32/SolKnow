import React, { useCallback, useRef, useEffect, useState, useMemo } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { graphData, Node, Link } from '../data/graphData';
import { useHistory } from '@docusaurus/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Maximize2,
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
  Play,
  Pause,
} from 'lucide-react';

interface ForceGraph3DInstance {
  cameraPosition: (pos: { x: number; y: number; z: number }, lookAt?: { x: number; y: number; z: number }, transitionMs?: number) => void;
  refresh: () => void;
  scene: () => any;
  camera: () => any;
  renderer: () => any;
}

// 7个领域的颜色配置
const GROUP_COLORS: Record<number, string> = {
  1: '#60a5fa', // 数学 - 亮蓝
  2: '#a78bfa', // 算法 - 亮紫
  3: '#fbbf24', // CS - 亮琥珀
  4: '#f87171', // AI - 亮红
  5: '#34d399', // 金融 - 亮翡翠
  6: '#22d3ee', // 量化 - 亮青
  7: '#fb7185', // 安全 - 亮玫瑰
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

// 计算节点的连接度
function calculateNodeDegree(nodeId: string, links: Link[]): number {
  return links.filter(l => {
    const sourceId = typeof l.source === 'string' ? l.source : l.source.id;
    const targetId = typeof l.target === 'string' ? l.target : l.target.id;
    return sourceId === nodeId || targetId === nodeId;
  }).length;
}

const KnowledgeGraph3DInner = () => {
  const history = useHistory();
  const fgRef = useRef<ForceGraph3DInstance | null>(null);
  const [ForceGraph3D, setForceGraph3D] = useState<React.ComponentType<any> | null>(null);
  const [SpriteText, setSpriteText] = useState<any>(null);
  const [focusNode, setFocusNode] = useState<Node | null>(null);
  const [hoverNode, setHoverNode] = useState<Node | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNodeList, setShowNodeList] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const rotationRef = useRef<number>(0);
  const cameraDistanceRef = useRef<number>(350);

  // 计算节点连接度
  const nodeDegrees = useMemo(() => {
    const degrees: Record<string, number> = {};
    graphData.nodes.forEach(node => {
      degrees[node.id] = calculateNodeDegree(node.id, graphData.links);
    });
    return degrees;
  }, []);

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

  // 计算包围盒中心
  const calculateBoundingBoxCenter = useCallback(() => {
    if (filteredNodes.length === 0) return { x: 0, y: 0, z: 0 };

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    filteredNodes.forEach(node => {
      minX = Math.min(minX, node.x || 0);
      maxX = Math.max(maxX, node.x || 0);
      minY = Math.min(minY, node.y || 0);
      maxY = Math.max(maxY, node.y || 0);
      minZ = Math.min(minZ, node.z || 0);
      maxZ = Math.max(maxZ, node.z || 0);
    });

    return {
      x: (minX + maxX) / 2,
      y: (minY + maxY) / 2,
      z: (minZ + maxZ) / 2,
    };
  }, [filteredNodes]);

  const handleNodeClick = useCallback(
    (node: Node) => {
      if (focusNode?.id === node.id) {
        if (node.path) history.push(node.path);
        return;
      }
      setFocusNode(node);
      setAutoRotate(false);

      if (fgRef.current) {
        const distance = 150;
        const distRatio = 1 + distance / Math.hypot(node.x || 0, node.y || 0, (node.z || 0) + distance);
        fgRef.current.cameraPosition(
          {
            x: (node.x || 0) * distRatio,
            y: (node.y || 0) * distRatio,
            z: ((node.z || 0) + distance) * distRatio,
          },
          { x: node.x || 0, y: node.y || 0, z: node.z || 0 },
          1000
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
    rotationRef.current = 0;

    // 计算包围盒中心并移动相机
    const center = calculateBoundingBoxCenter();
    const distance = 400;

    if (fgRef.current) {
      fgRef.current.cameraPosition(
        { x: center.x, y: center.y, z: center.z + distance },
        center,
        1200
      );
    }
  };

  // 初始视角校准
  useEffect(() => {
    if (fgRef.current && filteredNodes.length > 0) {
      const timer = setTimeout(() => {
        const center = calculateBoundingBoxCenter();
        const distance = 400;
        fgRef.current?.cameraPosition(
          { x: center.x, y: center.y, z: center.z + distance },
          center,
          1500
        );
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [ForceGraph3D, filteredNodes.length, calculateBoundingBoxCenter]);

  // 自动旋转效果（带阻尼）
  useEffect(() => {
    if (!autoRotate || focusNode) return;

    let lastTime = performance.now();
    let velocity = 0.002;

    const rotate = (currentTime: number) => {
      if (!fgRef.current || focusNode) return;

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // 阻尼减速
      velocity *= 0.9995;
      if (velocity < 0.0005) velocity = 0.002;

      rotationRef.current += velocity * (deltaTime / 16);
      const radius = cameraDistanceRef.current;
      const x = Math.sin(rotationRef.current) * radius;
      const z = Math.cos(rotationRef.current) * radius;

      const center = calculateBoundingBoxCenter();
      fgRef.current.cameraPosition({ x: center.x + x, y: center.y, z: center.z + z }, center, 0);

      requestAnimationFrame(rotate);
    };

    const animationId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animationId);
  }, [autoRotate, focusNode, calculateBoundingBoxCenter]);

  const getGroupIcon = (group: number) => {
    switch (group) {
      case 1: return <InfinityIcon size={18} className="text-blue-400" />;
      case 2: return <Code2 size={18} className="text-purple-400" />;
      case 3: return <Monitor size={18} className="text-amber-400" />;
      case 4: return <Brain size={18} className="text-red-400" />;
      case 5: return <TrendingUp size={18} className="text-emerald-400" />;
      case 6: return <BarChart3 size={18} className="text-cyan-400" />;
      case 7: return <Shield size={18} className="text-rose-400" />;
      default: return <Info size={18} />;
    }
  };

  // 创建带标签的3D节点
  const nodeThreeObject = useCallback((node: Node) => {
    if (!SpriteText) return null;

    const degree = nodeDegrees[node.id] || 0;
    const isCore = degree > 3 || node.type === 'domain';
    const color = GROUP_COLORS[node.group] || '#94a3b8';

    // 创建文字标签 - Billboard效果（始终面向相机）
    const sprite = new SpriteText(node.name);
    sprite.color = color;
    sprite.textHeight = isCore ? 5 : 3.5;
    sprite.fontWeight = isCore ? 'bold' : 'normal';
    sprite.padding = 0;
    sprite.borderRadius = 0;
    sprite.backgroundColor = 'rgba(0,0,0,0)'; // 去掉背景色块
    sprite.strokeColor = '#0f172a'; // 深色描边
    sprite.strokeWidth = isCore ? 0.3 : 0.2; // 描边宽度

    // 位置调整
    const nodeSize = isCore ? 8 : 4 + degree * 0.5;
    sprite.position.y = nodeSize + 4;

    // 存储节点信息用于距离过滤
    (sprite as any).userData = {
      isCore,
      nodeId: node.id,
      originalScale: isCore ? 1 : 0.8
    };

    return sprite;
  }, [SpriteText, nodeDegrees]);

  // 动态调整节点大小
  const getNodeSize = useCallback((node: Node) => {
    const degree = nodeDegrees[node.id] || 0;
    const baseSize = node.type === 'domain' ? 8 : node.type === 'category' ? 5 : 3;
    return baseSize + Math.min(degree * 0.8, 6); // 根据连接度增加大小，最大增加6
  }, [nodeDegrees]);

  // 相机距离变化时更新标签可见性
  const handleCameraMove = useCallback(() => {
    if (!fgRef.current) return;

    const camera = fgRef.current.camera();
    if (!camera) return;

    const cameraZ = camera.position.z;
    cameraDistanceRef.current = cameraZ;

    // 更新标签可见性
    const scene = fgRef.current.scene();
    if (!scene) return;

    scene.traverse((object: any) => {
      if (object.type === 'Sprite' && object.userData?.nodeId) {
        const isCore = object.userData.isCore;
        const distance = cameraZ;

        // 远距离时隐藏次要节点标签
        if (!isCore && distance > 300) {
          object.visible = false;
        } else if (!isCore && distance > 200) {
          object.visible = true;
          const scale = object.userData.originalScale * (1 - (distance - 200) / 300);
          object.scale.setScalar(Math.max(0.3, scale));
        } else {
          object.visible = true;
          object.scale.setScalar(object.userData.originalScale);
        }
      }
    });
  }, []);

  if (!ForceGraph3D || !SpriteText)
    return (
      <div
        style={{
          height: '800px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse at center, #1e293b 0%, #0f172a 100%)',
          borderRadius: '24px',
        }}
      >
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-slate-600 rounded-full"></div>
          <span className="text-slate-400 font-medium">加载3D知识图谱...</span>
        </div>
      </div>
    );

  return (
    <div
      className="knowledge-graph-container relative w-full h-[800px] rounded-3xl overflow-hidden border border-slate-700 shadow-2xl"
      style={{
        background: 'radial-gradient(ellipse at center, #1e293b 0%, #0f172a 50%, #020617 100%)',
      }}
    >
      {/* 3D 图 */}
      <ForceGraph3D
        ref={fgRef}
        graphData={graphDataFiltered}
        nodeLabel="name"
        nodeColor={(node: Node) => GROUP_COLORS[node.group] || '#94a3b8'}
        nodeRelSize={getNodeSize}
        nodeResolution={20}
        nodeOpacity={0.95}
        linkColor={() => 'rgba(148, 163, 184, 0.25)'}
        linkWidth={0.2}
        linkOpacity={0.3}
        backgroundColor="rgba(0,0,0,0)"
        showNavInfo={false}
        cameraPosition={{ x: 0, y: 0, z: 400 }}
        onNodeClick={handleNodeClick}
        onNodeHover={setHoverNode}
        onBackgroundClick={() => setFocusNode(null)}
        onEngineTick={handleCameraMove}
        cooldownTicks={400}
        d3AlphaDecay={0.008}
        d3VelocityDecay={0.08}
        d3ForceLink={{ distance: 120 }}
        d3ForceCharge={-400}
        d3ForceCenter={{ x: 0, y: 0, z: 0 }} // 中心引力
        warmupTicks={100}
        nodeThreeObject={nodeThreeObject}
        nodeThreeObjectExtend={false}
      />

      {/* 顶部搜索栏 */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-xl px-4">
        <div className="backdrop-blur-xl bg-slate-800/80 border border-slate-600/50 rounded-2xl shadow-2xl p-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="搜索知识节点..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 bg-slate-900/50 border border-slate-600/50 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-700 rounded"
              >
                <X size={14} className="text-slate-400" />
              </button>
            )}
          </div>

          {searchQuery && (
            <div className="mt-2 max-h-48 overflow-y-auto border-t border-slate-600/50 pt-2">
              {filteredNodes.slice(0, 10).map((node) => (
                <button
                  key={node.id}
                  onClick={() => {
                    jumpToNode(node);
                    setSearchQuery('');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left hover:bg-slate-700/50 transition-colors"
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: GROUP_COLORS[node.group] }}
                  />
                  <span className="text-sm text-slate-200 truncate">{node.name}</span>
                  <span className="text-xs text-slate-500 ml-auto">{GROUP_NAMES[node.group]}</span>
                </button>
              ))}
              {filteredNodes.length === 0 && (
                <div className="text-center py-4 text-slate-500 text-sm">未找到匹配的节点</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 左侧节点列表 */}
      <AnimatePresence>
        {showNodeList && (
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            className="absolute top-20 left-4 bottom-4 w-72 backdrop-blur-xl bg-slate-800/90 border border-slate-600/50 rounded-2xl shadow-2xl z-20 flex flex-col"
          >
            <div className="p-4 border-b border-slate-600/50">
              <h3 className="text-sm font-bold mb-3 text-slate-400">按领域筛选</h3>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedGroup(null)}
                  className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
                    selectedGroup === null
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  全部
                </button>
                {Object.entries(GROUP_NAMES).map(([group, name]) => (
                  <button
                    key={group}
                    onClick={() => setSelectedGroup(Number(group))}
                    className="px-2.5 py-1 text-xs rounded-full transition-colors"
                    style={{
                      backgroundColor: selectedGroup === Number(group) ? GROUP_COLORS[Number(group)] : undefined,
                      color: selectedGroup === Number(group) ? '#0f172a' : undefined,
                      background: selectedGroup !== Number(group) ? 'rgba(51, 65, 85, 0.5)' : undefined,
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {filteredNodes.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm">未找到匹配的节点</div>
              ) : (
                <div className="space-y-0.5">
                  {filteredNodes.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => jumpToNode(node)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all hover:bg-slate-700/50 ${
                        focusNode?.id === node.id ? 'bg-blue-500/20 border-l-2 border-blue-400' : ''
                      }`}
                    >
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: GROUP_COLORS[node.group] }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-200 truncate">{node.name}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          {TYPE_ICONS[node.type]}
                          {GROUP_NAMES[node.group]}
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-slate-600 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3 border-t border-slate-600/50 text-xs text-slate-500">
              共 {filteredNodes.length} 个节点
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 左侧控制按钮组 */}
      <div className="absolute top-20 left-4 z-30 flex flex-col gap-2">
        <button
          onClick={() => setShowNodeList(!showNodeList)}
          className="p-3 backdrop-blur-md bg-slate-800/80 border border-slate-600/50 rounded-xl shadow-lg hover:scale-110 transition-all text-slate-300"
          title={showNodeList ? '关闭列表' : '打开列表'}
        >
          {showNodeList ? <X size={20} /> : <Search size={20} />}
        </button>
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-3 backdrop-blur-md border rounded-xl shadow-lg hover:scale-110 transition-all ${
            autoRotate
              ? 'bg-blue-500/80 border-blue-400 text-white'
              : 'bg-slate-800/80 border-slate-600/50 text-slate-300'
          }`}
          title={autoRotate ? '停止旋转' : '自动旋转'}
        >
          {autoRotate ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>

      {/* 右侧节点详情 */}
      <AnimatePresence>
        {focusNode && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="absolute top-20 right-4 w-72 backdrop-blur-xl bg-slate-800/90 border border-slate-600/50 rounded-2xl p-5 shadow-2xl z-20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${GROUP_COLORS[focusNode.group]}20` }}
              >
                {getGroupIcon(focusNode.group)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-200">{focusNode.name}</h3>
                <span className="text-xs text-slate-400">
                  {GROUP_NAMES[focusNode.group]} · {focusNode.type === 'domain' ? '领域' : focusNode.type === 'category' ? '分类' : '文档'}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              {focusNode.description || `探索关于 ${focusNode.name} 的知识体系与深度解析文档。`}
            </p>

            <div className="flex flex-col gap-2">
              {focusNode.path && (
                <button
                  onClick={() => history.push(focusNode.path!)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all font-medium border-none cursor-pointer"
                >
                  <span>阅读详细文档</span>
                  <BookOpen size={18} />
                </button>
              )}

              <button
                onClick={() => setFocusNode(null)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl transition-all text-sm border-none cursor-pointer"
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
          className="p-3 backdrop-blur-md bg-slate-800/80 border border-slate-600/50 rounded-xl shadow-lg hover:scale-110 transition-all text-slate-300"
          title="重置视角"
        >
          <Maximize2 size={20} />
        </button>
      </div>

      {/* 底部图例 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none">
        <div className="px-4 py-2 backdrop-blur-md bg-slate-800/80 border border-slate-600/50 rounded-full text-xs font-medium flex items-center gap-4">
          {Object.entries(GROUP_NAMES).map(([group, name]) => (
            <div key={group} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: GROUP_COLORS[Number(group)] }}
              />
              <span className="text-slate-300">{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 操作提示 */}
      <div className="absolute bottom-4 right-4 px-3 py-1.5 backdrop-blur-md bg-slate-800/60 border border-slate-600/30 rounded-full text-xs text-slate-500 pointer-events-none">
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
            background: 'radial-gradient(ellipse at center, #1e293b 0%, #0f172a 100%)',
          }}
        >
          <span className="text-slate-400">加载3D图谱中...</span>
        </div>
      }
    >
      {() => <KnowledgeGraph3DInner />}
    </BrowserOnly>
  );
}
