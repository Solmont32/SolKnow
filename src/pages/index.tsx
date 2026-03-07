import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroSubtitle}>
          沉浸式的 <b>算法竞赛笔记</b> 与 <b>数学知识体系</b>。<br />
          整合图文教程与 B 站视频讲解，打造属于你的结构化数字大脑。
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            开始学习 🚀
          </Link>
          <Link className="button button--secondary button--lg" to="/blog">
            阅读博客 ✍️
          </Link>
        </div>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    title: "🏆 算法竞赛知识库",
    icon: "💻",
    description: "涵盖基础算法、数据结构、图论、动态规划等核心考点，包含详细的 C++ 代码模板与原理解析。",
    link: "/docs/intro",
    linkText: "查阅算法笔记",
  },
  {
    title: "📐 系统化数学知识",
    icon: "♾️",
    description: "从 K-12 基础教育到大学数学分析、高等代数与离散数学，建立坚实的数学底座。",
    link: "/docs/academic-math/analysis/index",
    linkText: "探索数学世界",
  },
  {
    title: "🎬 视频讲解整合",
    icon: "📺",
    description: "觉得文字难以理解？每篇核心笔记均支持嵌入 B 站视频讲解，实现图文与视听的双重输入通道。",
    link: "/videos",
    linkText: "观看视频课程",
  },
  {
    title: "🧭 资源导航与工具",
    icon: "🚀",
    description: "收录全球顶尖的算法竞赛平台、在线数学可视化工具及推荐阅读书籍，让学习快人一步。",
    link: "/docs/resources/index",
    linkText: "发现优质资源",
  },
];

const Roadmaps = [
  {
    title: "初学者路线 (Getting Started)",
    items: ["C++ 语法基础", "二分与排序", "简单 DP", "基础几何"],
    color: "#3b82f6",
  },
  {
    title: "进阶选拔 (Advanced)",
    items: ["树状数组与线段树", "最短路算法", "组合数学", "矩阵加速"],
    color: "#8b5cf6",
  },
  {
    title: "竞赛巅峰 (Expert)",
    items: ["网络流", "后缀自动机", "博弈论", "多项式全家桶"],
    color: "#ec4899",
  },
];

function Features() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className={styles.sectionTitle}>核心模块</h2>
        <div className={styles.featureGrid}>
          {FeatureList.map((props, idx) => (
            <div key={idx} className={clsx("card", styles.featureCard)}>
              <span className={styles.featureIcon}>{props.icon}</span>
              <h3 className={styles.featureTitle}>{props.title}</h3>
              <p className={styles.featureDesc}>{props.description}</p>
              <Link className={styles.featureLink} to={props.link}>
                {props.linkText} &rarr;
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.roadmapSection}>
          <h2 className={styles.sectionTitle}>推荐学习路径</h2>
          <div className={styles.roadmapGrid}>
            {Roadmaps.map((road, idx) => (
              <div key={idx} className={styles.roadmapCard} style={{ borderColor: road.color }}>
                <h4 style={{ color: road.color }}>{road.title}</h4>
                <ul>
                  {road.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
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
        </div>
      </footer>
    </Layout>
  );
}
