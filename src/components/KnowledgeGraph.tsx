import React, { useCallback, useRef, useEffect, useState } from 'react';
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

const KnowledgeGraph3DInner = () => {
  const history = useHistory();
  const fgRef = useRef<ForceGraph3DInstance | null>(null);
  const [ForceGraph3D, setForceGraph3D] = useState<React.ComponentType<any> | null>(null);
  const [focusNode, setFocusNode] = useState<Node | null>(null);
  const [hoverNode, setHoverNode] = useState<Node | null>(null);

  useEffect(() => {
    import('react-force-graph-3d').then((mod) => {
      setForceGraph3D(mod.default);
    });
  }, []);

  const handleNodeClick = useCallback(
    (node: Node) => {
      if (focusNode?.id === node.id) {
        if (node.path) history.push(node.path);
        return;
      }
      setFocusNode(node);

      // 相机聚焦到选中节点
      if (fgRef.current) {
        const distance = 200;
        const distRatio = 1 + distance / Math.hypot(node.x || 0, node.y || 0, (node.z || 0) + distance);
        fgRef.current.cameraPosition(
          {
            x: (node.x || 0) * distRatio,
            y: (node.y || 0) * distRatio,
            z: ((node.z || 0) + distance) * distRatio,
          },
          { x: node.x || 0, y: node.y || 0, z: node.z || 0 },
          1500
        );
      }
    },
    [focusNode, history]
  );

  const resetView = () => {
    setFocusNode(null);
    setHoverNode(null);
    if (fgRef.current) {
      fgRef.current.cameraPosition({ x: 0, y: 0, z: 400 }, { x: 0, y: 0, z: 0 }, 1500);
    }
  };

  const getGroupIcon = (group: number) => {
    switch (group) {
      case 1:
        return <InfinityIcon size={18} className="text-blue-500" />;
      case 2:
        return <Code2 size={18} className="text-purple-500" />;
      case 3:
        return <Monitor size={18} className="text-amber-500" />;
      case 4:
        return <Brain size={18} className="text-red-500" />;
      case 5:
        return <TrendingUp size={18} className="text-emerald-500" />;
      case 6:
        return <BarChart3 size={18} className="text-cyan-500" />;
      case 7:
        return <Shield size={18} className="text-rose-500" />;
      default:
        return <Info size={18} />;
    }
  };

  if (!ForceGraph3D)
    return (
      <div
        style={{
          height: '750px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--ifm-background-color)',
          borderRadius: '24px',
        }}
      >
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full dark:bg-gray-700"></div>
          <span className="text-gray-500 font-medium">Loading 3D Knowledge Graph...</span>
        </div>
      </div>
    );

  return (
    <div className="knowledge-graph-container relative w-full h-[750px] rounded-3xl overflow-hidden border border-[var(--ifm-color-emphasis-200)] shadow-[var(--solknow-card-shadow)] bg-[var(--ifm-background-color)]">
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        nodeLabel="name"
        nodeColor={(node: Node) => GROUP_COLORS[node.group] || '#94a3b8'}
        nodeRelSize={3}
        nodeResolution={16}
        linkColor={() => 'rgba(148, 163, 184, 0.3)'}
        linkWidth={0.5}
        linkOpacity={0.6}
        backgroundColor="rgba(0,0,0,0)"
        showNavInfo={false}
        cameraPosition={{ x: 0, y: 0, z: 400 }}
        onNodeClick={handleNodeClick}
        onNodeHover={setHoverNode}
        onBackgroundClick={resetView}
        cooldownTicks={300}
        d3AlphaDecay={0.005}
        d3VelocityDecay={0.1}
        d3ForceLink={{ distance: 80 }}
        d3ForceCharge={-150}
        warmupTicks={50}
        // 3D效果增强
        nodeThreeObject={(node: Node) => {
          // 为不同类型的节点设置不同大小
          const size = node.type === 'domain' ? 6 : node.type === 'category' ? 4 : 2.5;
          const color = GROUP_COLORS[node.group] || '#94a3b8';

          // 高亮效果
          const isHighlighted = focusNode?.id === node.id || hoverNode?.id === node.id;
          const finalSize = isHighlighted ? size * 1.5 : size;

          return null; // 使用默认球体，大小由 nodeRelSize 控制
        }}
        nodeThreeObjectExtend={true}
      />

      {/* Side Panel */}
      <AnimatePresence>
        {focusNode && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="absolute top-6 right-6 w-72 backdrop-blur-xl bg-white/80 dark:bg-black/60 border border-white/30 dark:border-white/10 rounded-2xl p-5 shadow-2xl z-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${GROUP_COLORS[focusNode.group]}20` }}
              >
                {getGroupIcon(focusNode.group)}
              </div>
              <h3 className="m-0 text-lg font-bold truncate">{focusNode.name}</h3>
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
                onClick={resetView}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300 rounded-xl transition-all text-sm border-none cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>返回全景视图</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute top-6 left-6 flex flex-col gap-2">
        <button
          onClick={resetView}
          className="p-3 backdrop-blur-md bg-white/70 dark:bg-black/50 border border-white/30 dark:border-white/10 rounded-xl shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
          title="重置视角"
        >
          <Maximize2 size={20} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Legend - 7 Domain Colors */}
      <div className="absolute bottom-6 left-6 flex items-center gap-2 pointer-events-none">
        <div className="px-4 py-3 backdrop-blur-md bg-white/70 dark:bg-black/50 border border-white/30 dark:border-white/10 rounded-2xl text-xs font-medium grid grid-cols-4 gap-x-4 gap-y-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/30"></div>
            <span className="text-gray-700 dark:text-gray-200">数学</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/30"></div>
            <span className="text-gray-700 dark:text-gray-200">算法</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/30"></div>
            <span className="text-gray-700 dark:text-gray-200">CS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/30"></div>
            <span className="text-gray-700 dark:text-gray-200">AI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30"></div>
            <span className="text-gray-700 dark:text-gray-200">金融</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/30"></div>
            <span className="text-gray-700 dark:text-gray-200">量化</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <div className="w-3 h-3 rounded-full bg-rose-500 shadow-lg shadow-rose-500/30"></div>
            <span className="text-gray-700 dark:text-gray-200">安全</span>
          </div>
        </div>
      </div>

      {/* 操作提示 */}
      <div className="absolute bottom-6 right-6 px-4 py-2 backdrop-blur-md bg-white/50 dark:bg-black/30 border border-white/20 rounded-full text-xs text-gray-500 dark:text-gray-400 pointer-events-none">
        左键旋转 · 右键平移 · 滚轮缩放 · 点击节点聚焦
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
            height: '750px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Loading 3D Graph...
        </div>
      }
    >
      {() => <KnowledgeGraph3DInner />}
    </BrowserOnly>
  );
}
