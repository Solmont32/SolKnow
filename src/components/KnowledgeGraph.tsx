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
  RotateCcw,
} from 'lucide-react';

interface ForceGraph2DInstance {
  centerAt: (x: number, y: number, duration?: number) => void;
  zoom: (scale: number, duration?: number) => void;
  zoomToFit: (duration?: number, padding?: number) => void;
}

const GROUP_COLORS: Record<number, string> = {
  1: '#3b82f6',
  2: '#8b5cf6',
  3: '#f59e0b',
  4: '#ef4444',
  5: '#10b981',
  6: '#06b6d4',
  7: '#f43f5e',
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

const KnowledgeGraphInner = () => {
  const history = useHistory();
  const fgRef = useRef<ForceGraph2DInstance | null>(null);
  const [ForceGraph2D, setForceGraph2D] = useState<React.ComponentType<any> | null>(null);
  const [focusNode, setFocusNode] = useState<Node | null>(null);
  const [highlightNodes, setHighlightNodes] = useState<Set<string>>(new Set());
  const [highlightLinks, setHighlightLinks] = useState<Set<any>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  useEffect(() => {
    import('react-force-graph-2d').then((mod) => {
      setForceGraph2D(() => mod.default);
    });
  }, []);

  const filteredNodes = useMemo(() => {
    return graphData.nodes.filter((node) => {
      const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGroup = selectedGroup === null || node.group === selectedGroup;
      return matchesSearch && matchesGroup;
    });
  }, [searchQuery, selectedGroup]);

  const graphDataFiltered = useMemo(() => {
    const nodeIds = new Set(filteredNodes.map((n) => n.id));
    const links = graphData.links.filter(
      (l) => nodeIds.has(typeof l.source === 'string' ? l.source : l.source.id) &&
             nodeIds.has(typeof l.target === 'string' ? l.target : l.target.id)
    );
    return { nodes: filteredNodes, links };
  }, [filteredNodes]);

  const updateHighlight = (node: Node | null) => {
    setHighlightNodes(new Set());
    setHighlightLinks(new Set());

    if (node) {
      const neighbors = new Set<string>();
      const links = new Set<any>();

      graphData.links.forEach((link: Link) => {
        const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
        const targetId = typeof link.target === 'string' ? link.target : link.target.id;
        if (sourceId === node.id) {
          neighbors.add(targetId);
          links.add(link);
        } else if (targetId === node.id) {
          neighbors.add(sourceId);
          links.add(link);
        }
      });

      setHighlightNodes(new Set([node.id, ...Array.from(neighbors)]));
      setHighlightLinks(links);
    }
  };

  const handleNodeClick = useCallback(
    (node: Node & { x: number; y: number }) => {
      if (focusNode?.id === node.id) {
        if (node.path) history.push(node.path);
        return;
      }
      setFocusNode(node);
      updateHighlight(node);

      if (fgRef.current) {
        fgRef.current.centerAt(node.x, node.y, 800);
        fgRef.current.zoom(2, 800);
      }
    },
    [focusNode, history]
  );

  const jumpToNode = (node: Node) => {
    handleNodeClick(node as any);
  };

  const resetView = () => {
    setFocusNode(null);
    updateHighlight(null);
    setSelectedGroup(null);
    if (fgRef.current) {
      fgRef.current.zoomToFit(800, 50);
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

  if (!ForceGraph2D) {
    return (
      <div className="w-full h-[800px] flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-3xl">
        <span className="text-slate-400">加载知识图谱...</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[800px] bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-xl">
      {/* 2D Graph */}
      <ForceGraph2D
        ref={fgRef}
        graphData={graphDataFiltered}
        nodeLabel="name"
        nodeRelSize={6}
        linkDirectionalParticles={1}
        linkDirectionalParticleSpeed={(d: Link) => d.value * 0.005}
        linkColor={(link: any) =>
          highlightLinks.has(link) ? '#3b82f6' : 'rgba(148, 163, 184, 0.3)'
        }
        linkWidth={(link: any) => (highlightLinks.has(link) ? 3 : 1)}
        nodeCanvasObject={(
          node: Node & { x: number; y: number; color?: string },
          ctx: CanvasRenderingContext2D,
          globalScale: number,
        ) => {
          const isHighlighted = highlightNodes.has(node.id);
          const isFocused = focusNode?.id === node.id;

          const label = node.name;
          const fontSize = (isFocused ? 14 : 11) / Math.max(0.6, globalScale * 0.4);
          ctx.font = `${isFocused ? 'bold' : 'normal'} ${fontSize}px Inter, system-ui, sans-serif`;

          // Glow effect for focused node
          if (isFocused) {
            ctx.shadowColor = GROUP_COLORS[node.group];
            ctx.shadowBlur = 20;
          }

          // Node circle
          ctx.fillStyle = GROUP_COLORS[node.group];

          if (focusNode && !isHighlighted) {
            ctx.globalAlpha = 0.2;
          }

          const radius = node.type === 'domain' ? 10 : node.type === 'category' ? 7 : 5;
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
          ctx.fill();

          ctx.shadowBlur = 0;

          // Label - always show for domain/category, only show for doc when zoomed in
          if (node.type !== 'doc' || globalScale > 1.2 || isHighlighted) {
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'var(--ifm-font-color-base, #1f2937)';

            // Text shadow for readability
            ctx.shadowColor = 'rgba(255,255,255,0.8)';
            ctx.shadowBlur = 4;
            ctx.fillText(label, node.x, node.y + radius + fontSize * 0.8);
            ctx.shadowBlur = 0;
          }

          ctx.globalAlpha = 1;
        }}
        onNodeClick={handleNodeClick}
        onBackgroundClick={() => {
          setFocusNode(null);
          updateHighlight(null);
        }}
        cooldownTicks={200}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
        d3ForceLink={{ distance: 150 }}
        d3ForceCharge={-300}
        d3ForceCenter={{ x: 0, y: 0 }}
      />

      {/* Search Bar - Top Center */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-md px-4">
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-slate-600 rounded-xl shadow-lg p-2">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="搜索节点..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {searchQuery && (
            <div className="mt-2 max-h-40 overflow-y-auto border-t border-slate-200 dark:border-slate-600 pt-2">
              {filteredNodes.slice(0, 8).map((node) => (
                <button
                  key={node.id}
                  onClick={() => {
                    jumpToNode(node);
                    setSearchQuery('');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: GROUP_COLORS[node.group] }}
                  />
                  <span className="text-sm">{node.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Left Sidebar */}
      <div className="absolute top-20 left-4 bottom-4 w-64 bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-slate-600 rounded-xl shadow-lg z-20 flex flex-col">
        <div className="p-3 border-b border-slate-200 dark:border-slate-600">
          <h3 className="text-xs font-bold text-slate-500 uppercase mb-2">领域筛选</h3>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setSelectedGroup(null)}
              className={`px-2 py-1 text-xs rounded-full transition-colors ${
                selectedGroup === null
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200'
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

        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {filteredNodes.map((node) => (
              <button
                key={node.id}
                onClick={() => jumpToNode(node)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                  focusNode?.id === node.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-l-2 border-blue-500'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: GROUP_COLORS[node.group] }}
                />
                <span className="truncate">{node.name}</span>
                <ChevronRight size={14} className="ml-auto text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-2 border-t border-slate-200 dark:border-slate-600 text-xs text-slate-500 text-center">
          共 {filteredNodes.length} 个节点
        </div>
      </div>

      {/* Right Panel - Node Details */}
      <AnimatePresence>
        {focusNode && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="absolute top-20 right-4 w-64 bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-slate-600 rounded-xl shadow-lg z-20 p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${GROUP_COLORS[focusNode.group]}20` }}
              >
                {getGroupIcon(focusNode.group)}
              </div>
              <div>
                <h3 className="font-bold">{focusNode.name}</h3>
                <span className="text-xs text-slate-500">{GROUP_NAMES[focusNode.group]}</span>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              {focusNode.description || `探索 ${focusNode.name} 的知识体系`}
            </p>

            <div className="flex flex-col gap-2">
              {focusNode.path && (
                <button
                  onClick={() => history.push(focusNode.path)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                >
                  <BookOpen size={16} />
                  阅读文档
                </button>
              )}
              <button
                onClick={() => {
                  setFocusNode(null);
                  updateHighlight(null);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-sm"
              >
                <RotateCcw size={16} />
                返回
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Right Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button
          onClick={resetView}
          className="p-2.5 bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-slate-600 rounded-lg shadow hover:scale-110 transition-all"
          title="重置视图"
        >
          <Maximize2 size={20} />
        </button>
      </div>

      {/* Bottom Legend */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="px-4 py-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-slate-600 rounded-full text-xs flex items-center gap-4 shadow">
          {Object.entries(GROUP_NAMES).map(([group, name]) => (
            <div key={group} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: GROUP_COLORS[Number(group)] }}
              />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Right Hint */}
      <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-slate-200 dark:border-slate-600 rounded-full text-xs text-slate-500">
        拖拽移动 · 滚轮缩放 · 点击节点聚焦
      </div>
    </div>
  );
};

export default function KnowledgeGraph() {
  return (
    <BrowserOnly
      fallback={
        <div className="w-full h-[800px] flex items-center justify-center">
          <span>加载中...</span>
        </div>
      }
    >
      {() => <KnowledgeGraphInner />}
    </BrowserOnly>
  );
}
