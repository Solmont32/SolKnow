import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import BilibiliEmbed from "@site/src/components/BilibiliEmbed";

type Item = {
  title: string;
  docPath: string;
  bvid: string;
  page?: number;
};

const items: Item[] = [
  {
    title: "map / set 常用技巧与坑点",
    docPath: "/docs/ds/stl/map-set",
    bvid: "BV1xxxxxxxx", // 换成你的 BV 号
    page: 1,
  },
];

export default function Videos(){
  return (
    <Layout title="视频" description="SolKnow 视频讲解聚合">
      <main style={{ padding: "28px 16px", maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontSize: 34 }}>视频讲解</h1>
        <p style={{ opacity: 0.9 }}>
          按“知识点”汇总你的 B 站讲解视频；每条都链接到对应的知识库页面。
        </p>

        <div style={{ display: "grid", gap: 18, marginTop: 18 }}>
          {items.map((it) => (
            <div key={it.title} className="card" style={{ padding: 16 }}>
              <h3 style={{ marginBottom: 6 }}>
                <Link to={it.docPath}>{it.title}</Link>
              </h3>
              <BilibiliEmbed bvid={it.bvid} page={it.page ?? 1} />
              <Link className="button button--primary button--sm" to={it.docPath}>
                打开对应知识点
              </Link>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
