import React, { useCallback, useRef, useEffect, useState, useMemo } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { graphData, Node, Link } from '../data/graphData';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useHistory } from '@docusaurus/router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Target, 
  Maximize2, 
  RotateCcw, 
  BookOpen,
  Info,
  Code2,
  Infinity,
  Monitor,
  Youtube
} from 'lucide-react';

const KnowledgeGraphInner = () => {
  const history = useHistory();
  const fgRef = useRef<any>(null);
  const [ForceGraph2D, setForceGraph2D] = useState<any>(null);
  const [focusNode, setFocusNode] = useState<Node | null>(null);
  const [hoverNode, setHoverNode] = useState<Node | null>(null);
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
      
      graphData.links.forEach((link: any) => {
        if (link.source.id === node.id || link.source === node.id) {
          neighbors.add(link.target.id || link.target);
          links.add(link);
        } else if (link.target.id === node.id || link.target === node.id) {
          neighbors.add(link.source.id || link.source);
          links.add(link);
        }
      });

      setHighlightNodes(new Set([node.id, ...Array.from(neighbors)]));
      setHighlightLinks(links);
    }
  };

  const handleNodeClick = useCallback((node: any) => {
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
  }, [focusNode, history]);

  const resetView = () => {
    setFocusNode(null);
    updateHighlight(null);
    if (fgRef.current) {
      fgRef.current.zoomToFit(800, 100);
    }
  };

  const getGroupIcon = (group: number) => {
    switch (group) {
      case 1: return <Infinity size={18} className="text-blue-500" />;
      case 2: return <Code2 size={18} className="text-purple-500" />;
      case 3: return <Monitor size={18} className="text-amber-500" />;
      case 4: return <Youtube size={18} className="text-red-500" />;
      default: return <Info size={18} />;
    }
  };

  if (!ForceGraph2D) return (
    <div style={{ height: '650px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ifm-background-color)', borderRadius: '24px' }}>
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full dark:bg-gray-700"></div>
        <span className="text-gray-500 font-medium">Loading SolKnow Graph...</span>
      </div>
    </div>
  );

  return (
    <div className="knowledge-graph-container relative w-full h-[650px] rounded-3xl overflow-hidden border border-[var(--ifm-color-emphasis-200)] shadow-[var(--solknow-card-shadow)] bg-[var(--ifm-background-color)]">
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel="name"
        nodeRelSize={6}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={d => d.value * 0.005}
        linkColor={(link: any) => highlightLinks.has(link) ? 'var(--ifm-color-primary)' : 'var(--ifm-color-emphasis-200)'}
        linkWidth={(link: any) => highlightLinks.has(link) ? 3 : 1}
        nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
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

          // Node Circle
          ctx.fillStyle = node.color || (
            node.group === 1 ? '#3b82f6' : 
            node.group === 2 ? '#8b5cf6' : 
            node.group === 3 ? '#f59e0b' : '#ef4444'
          );
          
          // Fade out non-highlighted nodes if something is focused
          if (focusNode && !isHighlighted) {
            ctx.globalAlpha = 0.2;
          }

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.val * 0.8, 0, 2 * Math.PI, false);
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
        onNodeHover={(node: any) => setHoverNode(node)}
        cooldownTicks={100}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
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
              <div className="p-2 bg-blue-500/10 rounded-lg">
                {getGroupIcon(focusNode.group)}
              </div>
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

      {/* Overlay Controls */}
      <div className="absolute bottom-6 left-6 flex items-center gap-2 pointer-events-none">
        <div className="px-3 py-1.5 backdrop-blur-md bg-white/50 dark:bg-black/30 border border-white/20 rounded-full text-xs font-medium flex items-center gap-4">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span>数学</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div><span>算法</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span>计算</span></div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500"></div><span>视频</span></div>
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
    <BrowserOnly fallback={<div style={{ height: '650px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      {() => <KnowledgeGraphInner />}
    </BrowserOnly>
  );
}
