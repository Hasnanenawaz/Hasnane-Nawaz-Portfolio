import { ImageResponse } from "next/og";

export const alt = "Hasnane Nawaz - Social Media Marketing Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const photoRes = await fetch("https://www.hasnanenawaz.in/hasnane.png");
  const photoBuffer = await photoRes.arrayBuffer();
  const photoBase64 = Buffer.from(photoBuffer).toString("base64");
  const photoSrc = `data:image/png;base64,${photoBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#faf5e4",
          alignItems: "center",
          padding: "50px",
          gap: "50px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            border: "4px solid #111",
            overflow: "hidden",
            flexShrink: 0,
            width: 320,
            height: 530,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoSrc}
            width={320}
            height={530}
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              display: "flex",
              backgroundColor: "#b8ff2c",
              border: "3px solid #111",
              padding: "8px 20px",
              fontSize: 20,
              fontWeight: 900,
              textTransform: "uppercase",
              marginBottom: 28,
              letterSpacing: 1,
            }}
          >
            Social Media Marketer
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: 0.9,
              color: "#111",
            }}
          >
            Hasnane
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 900,
              textTransform: "uppercase",
              lineHeight: 0.9,
              color: "#111",
              marginBottom: 28,
            }}
          >
            Nawaz
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#555",
              lineHeight: 1.6,
            }}
          >
            Community Growth · Lead Generation
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#555",
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            Meta Ads · Content Strategy
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#111",
              opacity: 0.4,
            }}
          >
            hasnanenawaz.in
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
