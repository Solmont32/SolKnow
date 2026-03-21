import React, { useCallback, useRef, useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { graphData, Node, Link } from '../data/graphData';
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
  Youtube,
  TrendingUp,
  BarChart3,
  Shield,
} from 'lucide-react';

interface ForceGraph2DInstance {
  centerAt: (x: number, y: number, duration?: number) => void;
  zoom: (scale: number, duration?: number) => void;
  zoomToFit: (duration?: number, padding?: number) => void;
}

const KnowledgeGraphInner = () => {
  const history = useHistory();
  const fgRef = useRef<ForceGraph2DInstance | null>(null);
  const [ForceGraph2D, setForceGraph2D] = useState<React.ComponentType<any> | null>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [focusNode, setFocusNode] = useState<Node | null>(null);
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());

  useEffect(() => {
    import('react-force-graph-2d').then((mod) => {
      setForceGraph2D(mod.default);
    });
  }, []);

  // Find neighbors for highlighting
  const updateHighlight = (node: Node | null) => {
    setHighlightNodes(new Set());
    setHighlightLinks(new Set());

    if (node) {
      const neighbors = new Set();
      const links = new Set();

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
        // Double click or click on focused node -> Navigate
        if (node.path) history.push(node.path);
        return;
      }

      // Aim at node
      setFocusNode(node);
      updateHighlight(node);

      if (fgRef.current) {
        fgRef.current.centerAt(node.x, node.y, 800);
        fgRef.current.zoom(2.5, 800);
      }
    },
    [focusNode, history],
  );

  const resetView = () => {
    setFocusNode(null);
    updateHighlight(null);
    if (fgRef.current) {
      fgRef.current.zoomToFit(800, 100);
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
        return <Youtube size={18} className="text-red-500" />;
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

  if (!ForceGraph2D)
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
          <span className="text-gray-500 font-medium">Loading SolKnow Graph...</span>
        </div>
      </div>
    );

  return (
    <div className="knowledge-graph-container relative w-full h-[750px] rounded-3xl overflow-hidden border border-[var(--ifm-color-emphasis-200)] shadow-[var(--solknow-card-shadow)] bg-[var(--ifm-background-color)]">
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel="name"
        nodeRelSize={4}
        linkDirectionalParticles={1}
        linkDirectionalParticleWidth={1}
        linkDirectionalParticleSpeed={(d: Link) => d.value * 0.002}
        linkColor={(link: Link) =>
          highlightLinks.has(link) ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-200)'
        }
        linkWidth={(link: Link) => (highlightLinks.has(link) ? 2 : 0.5)}
        nodeCanvasObject={(
          node: Node & { x: number; y: number; color?: string },
          ctx: CanvasRenderingContext2D,
          globalScale: number,
        ) => {
          const isHighlighted = highlightNodes.has(node.id);
          const isFocused = focusNode?.id === node.id;

          const label = node.name;
          const fontSize = (isFocused ? 14 : 12) / globalScale;
          ctx.font = `${isFocused ? 'bold' : 'normal'} ${fontSize}px Inter, system-ui, sans-serif`;

          // Draw shadow/glow for focused node
          if (isFocused) {
            ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
            ctx.shadowBlur = 15;
          }

          // Node Circle - 7 domain colors
          ctx.fillStyle =
            node.color ||
            (node.group === 1
              ? '#3b82f6' // 数学 - blue
              : node.group === 2
                ? '#8b5cf6' // 算法 - purple
                : node.group === 3
                  ? '#f59e0b' // 计算 - amber
                  : node.group === 4
                    ? '#ef4444' // AI - red
                    : node.group === 5
                      ? '#10b981' // 金融 - emerald
                      : node.group === 6
                        ? '#06b6d4' // 量化 - cyan
                        : '#f43f5e'); // 信息安全 - rose

          // Fade out non-highlighted nodes if something is focused
          if (focusNode && !isHighlighted) {
            ctx.globalAlpha = 0.1;
          } else if (focusNode && isHighlighted && highlightNodes.size > 2) {
            // Also fade neighbors slightly when many are highlighted
            ctx.globalAlpha = 0.7;
          }

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.val * 0.5, 0, 2 * Math.PI, false);
          ctx.fill();

          // Reset shadow
          ctx.shadowBlur = 0;

          // Label
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'var(--ifm-font-color-base)';
          ctx.fillText(label, node.x, node.y + node.val + 5);

          ctx.globalAlpha = 1.0;
        }}
        onNodeClick={handleNodeClick}
        onBackgroundClick={resetView}
        cooldownTicks={200}
        d3AlphaDecay={0.01}
        d3VelocityDecay={0.2}
        d3ForceLink={{ distance: 150 }}
      />

      {/* Side Panel */}
      <AnimatePresence>
        {focusNode && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="absolute top-6 right-6 w-72 backdrop-blur-xl bg-white/70 dark:bg-black/40 border border-white/20 dark:border-white/10 rounded-2xl p-5 shadow-2xl z-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">{getGroupIcon(focusNode.group)}</div>
              <h3 className="m-0 text-lg font-bold truncate">{focusNode.name}</h3>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
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
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 rounded-xl transition-all text-sm border-none cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>返回全景视图</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay Controls - 7 Domain Legend (Compact) */}
      <div className="absolute bottom-6 left-6 flex items-center gap-2 pointer-events-none">
        <div className="px-3 py-2 backdrop-blur-md bg-white/60 dark:bg-black/40 border border-white/20 rounded-2xl text-xs font-medium grid grid-cols-4 gap-x-4 gap-y-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
            <span className="text-gray-700 dark:text-gray-300">数学</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
            <span className="text-gray-700 dark:text-gray-300">算法</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
            <span className="text-gray-700 dark:text-gray-300">CS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <span className="text-gray-700 dark:text-gray-300">AI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            <span className="text-gray-700 dark:text-gray-300">金融</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-500"></div>
            <span className="text-gray-700 dark:text-gray-300">量化</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
            <span className="text-gray-700 dark:text-gray-300">安全</span>
          </div>
        </div>
      </div>

      <div className="absolute top-6 left-6 flex flex-col gap-2">
        <button
          onClick={resetView}
          className="p-3 backdrop-blur-md bg-white/50 dark:bg-black/30 border border-white/20 rounded-xl shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer pointer-events-auto"
          title="Reset View"
        >
          <Maximize2 size={20} className="text-gray-700 dark:text-gray-300" />
        </button>
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
          Loading...
        </div>
      }
    >
      {() => <KnowledgeGraphInner />}
    </BrowserOnly>
  );
}
