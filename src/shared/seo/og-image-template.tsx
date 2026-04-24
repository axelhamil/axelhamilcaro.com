import { ImageResponse } from "next/og";

export type OgImageProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export const OG_SIZE = {
  width: 1200,
  height: 630,
};

export const OG_CONTENT_TYPE = "image/png";

export function renderOgImage({ eyebrow, title, subtitle }: OgImageProps) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        backgroundColor: "#0a0a0a",
        backgroundImage:
          "radial-gradient(ellipse at top left, rgba(255, 77, 0, 0.15) 0%, transparent 50%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "8px",
          backgroundColor: "#ff4d00",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "960px",
        }}
      >
        {eyebrow ? (
          <div
            style={{
              display: "flex",
              color: "#ff4d00",
              fontSize: "28px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            {eyebrow}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: "76px",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              display: "flex",
              color: "#a3a3a3",
              fontSize: "32px",
              fontWeight: 400,
              lineHeight: 1.3,
              maxWidth: "900px",
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          axelhamilcaro.com
        </div>
        <div
          style={{
            display: "flex",
            color: "#a3a3a3",
            fontSize: "22px",
          }}
        >
          Développeur Full-Stack Freelance
        </div>
      </div>
    </div>,
    {
      width: OG_SIZE.width,
      height: OG_SIZE.height,
    },
  );
}
