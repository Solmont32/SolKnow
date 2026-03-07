import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { motion } from 'framer-motion';
import { PlayCircle, FileText, ChevronRight, Video, Search } from 'lucide-react';
import BilibiliEmbed from '@site/src/components/BilibiliEmbed';
import clsx from 'clsx';
import styles from './index.module.css'; // 复用首页的部分基础样式

type VideoItem = {
  title: string;
  description?: string;
  docPath: string;
  bvid: string;
  page?: number;
  category?: string;
};

// 视频数据源
const videos: VideoItem[] = [
  {
    title: 'map / set 常用技巧与坑点',
    description: '深度解析 STL 关联容器的底层逻辑与 O(logN) 操作的实战应用。',
    docPath: '/docs/ds/stl/map-set',
    bvid: 'BV1xxxxxxxx', // 建议用户填入真实 BV 号
    page: 1,
    category: '数据结构',
  },
  {
    title: '二分查找：从入门到不挂',
    description: '彻底搞定二分边界问题，涵盖左闭右开、左闭右闭等多种模版。',
    docPath: '/docs/basic/binary-search',
    bvid: 'BV1xxxxxxxx',
    category: '基础算法',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export default function Videos() {
  return (
    <Layout title="视频" description="SolKnow 视频讲解聚合">
      <div className={clsx('hero', styles.heroBanner)} style={{ padding: '6rem 0 4rem' }}>
        <div className={styles.heroGlow} />
        <div className="container">
          <motion.div initial="initial" animate="animate" variants={fadeInUp}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--ifm-color-primary)', fontWeight: 800, marginBottom: '1rem' }}>
              <Video size={20} />
              <span style={{ letterSpacing: '0.1em', fontSize: '0.9rem', textTransform: 'uppercase' }}>Video Lectures</span>
            </div>
            <h1 className={styles.heroTitle} style={{ fontSize: '3.5rem' }}>视频讲解中心</h1>
            <p className={styles.heroSubtitle} style={{ marginBottom: '2rem' }}>
              沉浸式<b>图文并茂</b>的学习体验。每一个复杂的知识点，都有对应的视听讲解。<br />
              整合 B 站优质视频资源，打造结构化的数字学习库。
            </p>
          </motion.div>
        </div>
      </div>

      <main className="container padding-vert--xl">
        <div className="row">
          {videos.map((item, idx) => (
            <motion.div 
              key={idx} 
              className="col col--6 margin-bottom--xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className={clsx('card', styles.featureCard)} style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <span className="badge badge--primary" style={{ borderRadius: '8px', padding: '6px 12px' }}>
                    {item.category}
                  </span>
                  <div style={{ color: 'var(--ifm-color-emphasis-500)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                    <PlayCircle size={14} /> 视频解析
                  </div>
                </div>
                
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--ifm-color-emphasis-700)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {item.description}
                </p>

                <BilibiliEmbed bvid={item.bvid} page={item.page ?? 1} />

                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                  <Link className="button button--primary" to={item.docPath} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', borderRadius: '12px' }}>
                    <FileText size={18} /> 查阅知识点
                  </Link>
                  <Link className="button button--secondary" to={`https://www.bilibili.com/video/${item.bvid}`} style={{ borderRadius: '12px' }}>
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {videos.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', opacity: 0.5 }}>
            <Search size={48} style={{ marginBottom: '1rem' }} />
            <p>更多视频正在录制中，敬请期待...</p>
          </div>
        )}
      </main>

      <footer className={styles.homeFooter}>
        <div className="container text--center">
          <p style={{ opacity: 0.6 }}>致力于让每一个复杂的知识点都变得 <b>清晰、直观、易懂</b>。</p>
        </div>
      </footer>
    </Layout>
  );
}
