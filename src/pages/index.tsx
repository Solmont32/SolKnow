import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";

export default function Home(){
  return (
    <Layout title="SolKnow（知岛）" description="知识点 + 视频讲解 的竞赛笔记与博客">
      <main style={{ padding: "28px 16px", maxWidth: 1100, margin: "0 auto" }}>
        <section style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 40, marginBottom: 8 }}>SolKnow（知岛）</h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, opacity: 0.9 }}>
            一个把「竞赛知识点」和「B站讲解视频」绑定在一起的个人知识库 + 博客。
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 14 }}>
            <Link className="button button--primary" to="/docs/intro">
              进入知识库
            </Link>
            <Link className="button button--secondary" to="/blog">
              查看博客
            </Link>
            <Link className="button button--secondary" to="/videos">
              视频聚合
            </Link>
          </div>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          <div className="card" style={{ padding: 16 }}>
            <h3>📚 知识库（Wiki）</h3>
            <p style={{ opacity: 0.9 }}>
              按数据结构 / 图论 / DP / 数学等分类组织，支持全文搜索与目录导航。
            </p>
            <Link to="/docs/ds/stl/map-set">推荐：map/set 常见坑</Link>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <h3>🎬 视频讲解</h3>
            <p style={{ opacity: 0.9 }}>
              每个知识点页可以嵌入你的 B 站视频，让“文字 + 讲解”对应起来。
            </p>
            <Link to="/videos">去视频页看看</Link>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <h3>✍️ 博客</h3>
            <p style={{ opacity: 0.9 }}>
              记录刷题复盘、比赛总结、踩坑与成长曲线。
            </p>
            <Link to="/blog">进入博客</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
