import React from "react";

type Props = {
  bvid?: string;
  aid?: string;
  page?: number;
  t?: number;
  highQuality?: boolean;
};

export default function BilibiliEmbed({
  bvid,
  aid,
  page = 1,
  t = 0,
  highQuality = true,
}: Props) {
  const params = new URLSearchParams();
  if (bvid) params.set("bvid", bvid);
  if (aid) params.set("aid", aid);
  params.set("page", String(page));
  if (t > 0) params.set("t", String(t));
  if (highQuality) params.set("high_quality", "1");

  const src = `https://player.bilibili.com/player.html?${params.toString()}`;

  return (
    <div style={{ margin: "16px 0" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "56.25%",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.14)",
        }}
      >
        <iframe
          src={src}
          scrolling="no"
          frameBorder={0}
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
