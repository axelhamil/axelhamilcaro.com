import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export type OgImageProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  withPhoto?: boolean;
};

export const OG_SIZE = {
  width: 1200,
  height: 630,
};

export const OG_CONTENT_TYPE = "image/png";

async function loadProfilePhoto() {
  const data = await readFile(
    join(process.cwd(), "public", "axel-hamilcaro-developpeur-fullstack.jpeg"),
  );
  return `data:image/jpeg;base64,${data.toString("base64")}`;
}

export async function renderOgImage({
  eyebrow,
  title,
  subtitle,
  withPhoto,
}: OgImageProps) {
  const photoSrc = withPhoto ? await loadProfilePhoto() : null;

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
          alignItems: "center",
          justifyContent: "space-between",
          gap: "60px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: photoSrc ? "640px" : "960px",
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
        {photoSrc ? (
          // biome-ignore lint/performance/noImgElement: ImageResponse (Satori) ne supporte pas next/image
          <img
            src={photoSrc}
            alt=""
            width={300}
            height={300}
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "8px solid #ff4d00",
              flexShrink: 0,
            }}
          />
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
          Développeur Web Fullstack · Freelance
        </div>
      </div>
    </div>,
    {
      width: OG_SIZE.width,
      height: OG_SIZE.height,
    },
  );
}
