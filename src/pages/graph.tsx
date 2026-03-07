import React from 'react';
import Layout from '@theme/Layout';
import KnowledgeGraph from '../components/KnowledgeGraph';
import { motion } from 'framer-motion';
import { Network, Zap, Cpu } from 'lucide-react';

export default function GraphPage() {
  return (
    <Layout
      title="知识图谱 | SolKnow"
      description="展现算法与数学的结构化联结"
    >
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--10 col--offset-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text--center margin-bottom--xl"
            >
              <h1 className="hero__title" style={{ fontSize: '3.5rem', fontWeight: 900 }}>
                知识图谱 <span style={{ color: 'var(--ifm-color-primary)' }}>Knowledge Map</span>
              </h1>
              <p className="hero__subtitle" style={{ fontSize: '1.25rem', opacity: 0.8 }}>
                深度挖掘算法、数学与计算机科学之间的结构化联结
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Network className="text--primary" size={24} />
                  <span>50+ 知识节点</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap style={{ color: '#8b5cf6' }} size={24} />
                  <span>动态关联演化</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Cpu style={{ color: '#f59e0b' }} size={24} />
                  <span>全栈结构视图</span>
                </div>
              </div>
            </motion.div>

            <div style={{ position: 'relative' }}>
               <div className="heroGlow" style={{ 
                position: 'absolute', 
                top: '-100px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                width: '600px', 
                height: '400px', 
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: -1
              }} />
              <KnowledgeGraph />
            </div>

            <div className="margin-top--xl text--center">
              <p style={{ maxWidth: '800px', margin: '0 auto', lineHeight: 1.8, fontSize: '1.1rem' }}>
                此图谱通过力导向图算法实时渲染，节点间连线的粗细代表了知识点之间的关联强度。
                例如，<b>图论</b>作为离散数学的分支，在<b>算法竞赛</b>中有着广泛的最短路、生成树等应用。
                <b>线性代数</b>则是<b>深度学习</b>的核心数学基础。
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
