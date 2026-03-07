import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Infinity as InfinityIcon, 
  Youtube, 
  Compass, 
  ArrowRight, 
  GraduationCap, 
  ExternalLink,
  ChevronRight,
  Monitor
} from 'lucide-react';
import styles from './index.module.css';

// 动画变量配置
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroGlow} />
      <div className="container">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeInUp} className={styles.heroTitle}>
            {siteConfig.title}
          </motion.h1>
          <motion.p variants={fadeInUp} className={styles.heroSubtitle}>
            沉浸式的 <b>算法竞赛笔记</b> 与 <b>数学知识体系</b>。<br />
            整合图文教程与 B 站视频讲解，打造属于你的结构化数字大脑。
          </motion.p>
          <motion.div variants={fadeInUp} className={styles.buttons}>
            <Link className="button button--primary button--lg" to="/docs/intro">
              开始学习 <ChevronRight size={18} />
            </Link>
            <Link className="button button--secondary button--lg" to="/blog">
              阅读博客 <ExternalLink size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    title: '算法竞赛知识库',
    Icon: Code2,
    description: '涵盖基础算法、数据结构、图论、动态规划等核心考点，包含详细的 C++ 代码模板与原理解析。',
    link: '/docs/intro',
    linkText: '查阅算法笔记',
    color: '#3b82f6',
  },
  {
    title: '系统化数学知识',
    Icon: InfinityIcon,
    description: '从 K-12 基础教育到大学数学分析、高等代数与离散数学，建立坚实的数学底座。',
    link: '/docs/academic-math/analysis/',
    linkText: '探索数学世界',
    color: '#8b5cf6',
  },
  {
    title: '计算机科学知识库',
    Icon: Monitor,
    description: '从 Linux 操作系统、计算机网络到 C/C++ 与 Python 语言特性，构建完整的底层思维体系。',
    link: '/docs/cs/',
    linkText: '深入底层原理',
    color: '#f59e0b',
  },
  {
    title: '视频讲解整合',
    Icon: Youtube,
    description: '觉得文字难以理解？每篇核心笔记均支持嵌入 B 站视频讲解，实现图文与视听的双重输入。',
    link: '/videos',
    linkText: '观看视频课程',
    color: '#ef4444',
  },
  {
    title: '资源导航与工具',
    Icon: Compass,
    description: '收录全球顶尖的算法竞赛平台、在线数学可视化工具及推荐书籍，让学习快人一步。',
    link: '/docs/resources/',
    linkText: '发现优质资源',
    color: '#10b981',
  },

];

const Roadmaps = [
  {
    title: '初学者路线 (Getting Started)',
    items: ['C++ 语法基础', '二分与排序', '简单 DP', '基础几何'],
    color: '#3b82f6',
  },
  {
    title: '进阶选拔 (Advanced)',
    items: ['树状数组与线段树', '最短路算法', '组合数学', '矩阵加速'],
    color: '#8b5cf6',
  },
  {
    title: '竞赛巅峰 (Expert)',
    items: ['网络流', '后缀自动机', '博弈论', '多项式全家桶'],
    color: '#ec4899',
  },
];

function Features() {
  return (
    <section className={styles.features}>
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.sectionTitle}
        >
          核心模块
        </motion.h2>
        
        <motion.div 
          className={styles.featureGrid}
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          {FeatureList.map((props, idx) => {
            const { Icon, title, description, link, linkText, color } = props;
            return (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={clsx('card', styles.featureCard)}
              >
                <div className={styles.featureIconWrapper} style={{ backgroundColor: `${color}15`, color }}>
                  <Icon size={32} />
                </div>
                <h3 className={styles.featureTitle}>{title}</h3>
                <p className={styles.featureDesc}>{description}</p>
                <Link className={styles.featureLink} to={link} style={{ color }}>
                  {linkText} <ArrowRight size={16} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className={styles.roadmapSection}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.sectionTitle}
          >
            推荐学习路径
          </motion.h2>
          <div className={styles.roadmapGrid}>
            {Roadmaps.map((road, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={styles.roadmapCard} 
                style={{ '--accent-color': road.color } as any}
              >
                <div className={styles.roadmapHeader}>
                  <GraduationCap size={24} style={{ color: road.color }} />
                  <h4 style={{ color: road.color }}>{road.title}</h4>
                </div>
                <ul>
                  {road.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.ReactNode {
  return (
    <Layout title={`首页`} description="知识点 + 视频讲解 的竞赛笔记与博客">
      <HomepageHeader />
      <main>
        <Features />
      </main>
      <footer className={styles.homeFooter}>
        <div className="container text--center">
          <p>
            致力于让每一个复杂的知识点都变得 <b>清晰、直观、易懂</b>。
          </p>
          <div className={styles.footerBrand}>SolKnow &copy; {new Date().getFullYear()}</div>
        </div>
      </footer>
    </Layout>
  );
}
