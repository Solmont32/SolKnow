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
          <Link
            className="button button--primary button--lg"
            to="/docs/intro"
          >
            开始学习 🚀
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/blog"
          >
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
    description: "从 K-12 基础教育（小学至高中）到大学数学分析、高等代数与离散数学，建立坚实的数学底座。",
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

function Features() {
  return (
    <section className={styles.features}>
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
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`首页`}
      description="知识点 + 视频讲解 的竞赛笔记与博客"
    >
      <HomepageHeader />
      <main>
        <Features />
      </main>
    </Layout>
  );
}
