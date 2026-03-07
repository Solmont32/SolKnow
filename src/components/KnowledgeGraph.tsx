import React, { useCallback, useRef, useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { graphData, Node, Link } from '../data/graphData';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const KnowledgeGraphInner = () => {
  const { isDarkTheme } = useDocusaurusContext() as any; // Docusaurus 3 handle theme differently sometimes
  // Actually, useColorMode is better
  const fgRef = useRef<any>(null);
  const [ForceGraph2D, setForceGraph2D] = useState<any>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    import('react-force-graph-2d').then((mod) => {
      setForceGraph2D(mod.default);
    });
  }, []);

  if (!ForceGraph2D) return <div style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Knowledge Map...</div>;

  return (
    <div className="knowledge-graph-container" style={{ 
      width: '100%', 
      height: '650px', 
      borderRadius: '24px', 
      overflow: 'hidden',
      border: '1px solid var(--ifm-color-emphasis-200)',
      background: 'var(--ifm-background-color)',
      boxShadow: 'var(--solknow-card-shadow)',
      position: 'relative'
    }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel="name"
        nodeAutoColorBy="group"
        nodeRelSize={6}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={d => d.value * 0.005}
        linkColor={() => 'var(--ifm-color-emphasis-300)'}
        nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
          const label = node.name;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Inter, system-ui, sans-serif`;
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.val * 0.8, 0, 2 * Math.PI, false);
          ctx.fill();

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = 'var(--ifm-font-color-base)';
          ctx.fillText(label, node.x, node.y + node.val + 5);

          node.__bckgDimensions = bckgDimensions; // to reuse in nodePointerAreaPaint
        }}
        onNodeClick={(node: any) => {
          // Future: link to doc page
          console.log('Clicked node:', node);
        }}
        cooldownTicks={100}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.3}
      />
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(8px)',
        padding: '10px 15px',
        borderRadius: '12px',
        fontSize: '0.8rem',
        border: '1px solid rgba(255,255,255,0.1)',
        pointerEvents: 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div>
          <span>数学</span>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6' }}></div>
          <span>算法</span>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></div>
          <span>计算</span>
        </div>
      </div>
    </div>
  );
};

export default function KnowledgeGraph() {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => <KnowledgeGraphInner />}
    </BrowserOnly>
  );
}
