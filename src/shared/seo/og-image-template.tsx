import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PALETTE } from "@/app/_config/site.constants";

type OgStamp = {
  top: string;
  bottom: string;
};

export type OgImageProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle?: string;
  stamp?: OgStamp;
  ribbon?: readonly string[];
  withPhoto?: boolean;
};

export const OG_SIZE = {
  width: 1200,
  height: 630,
};

export const OG_CONTENT_TYPE = "image/png";

const { noir: NOIR, papier: PAPIER, jaune: JAUNE, gris: GRIS } = PALETTE;

const DEFAULT_RIBBON = [
  "axelhamilcaro.com",
  "Développeur fullstack",
  "Builder",
  "Tours",
] as const;

const fontPath = (name: string) =>
  join(process.cwd(), "src", "shared", "seo", "fonts", name);

async function loadFonts() {
  const [interBlack, geistMono] = await Promise.all([
    readFile(fontPath("inter-black.ttf")),
    readFile(fontPath("geist-mono-bold.ttf")),
  ]);

  return [
    { name: "Inter", data: interBlack, weight: 900 as const, style: "normal" },
    { name: "Geist Mono", data: geistMono, weight: 700 as const },
  ] as const;
}

async function loadProfilePhoto() {
  const data = await readFile(
    join(process.cwd(), "public", "axel-hamilcaro-developpeur-fullstack.jpeg"),
  );
  return `data:image/jpeg;base64,${data.toString("base64")}`;
}

const SUBTITLE_MAX = 130;

const RIBBON_ROUNDS = ["a", "b", "c"] as const;

const upper = (value: string) => value.toLocaleUpperCase("fr-FR");

function clipSubtitle(value: string) {
  if (value.length <= SUBTITLE_MAX) return value;
  const cut = value.slice(0, SUBTITLE_MAX);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.]$/, "")}…`;
}

function titleSize(length: number, withPhoto: boolean) {
  const room = withPhoto ? 0.8 : 1;
  if (length <= 18) return Math.round(104 * room);
  if (length <= 32) return Math.round(88 * room);
  if (length <= 48) return Math.round(72 * room);
  return Math.round(60 * room);
}

function Ribbon({ items }: { items: readonly string[] }) {
  const line = RIBBON_ROUNDS.flatMap((round) =>
    items.map((item) => ({ key: `${round}-${item}`, label: upper(item) })),
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "22px",
        height: "64px",
        paddingLeft: "32px",
        backgroundColor: JAUNE,
        color: NOIR,
        fontFamily: "Geist Mono",
        fontSize: "24px",
        letterSpacing: "0.08em",
        whiteSpace: "nowrap",
        overflow: "hidden",
        borderTop: `4px solid ${NOIR}`,
      }}
    >
      {line.map((item) => (
        <div
          key={item.key}
          style={{ display: "flex", alignItems: "center", gap: "22px" }}
        >
          <div style={{ display: "flex" }}>{item.label}</div>
          <div
            style={{
              display: "flex",
              width: "12px",
              height: "12px",
              backgroundColor: NOIR,
            }}
          />
        </div>
      ))}
    </div>
  );
}

function Stamp({ stamp }: { stamp: OgStamp }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: `4px solid ${PAPIER}`,
        transform: "rotate(-4deg)",
        boxShadow: `8px 8px 0 ${JAUNE}`,
        fontFamily: "Geist Mono",
        letterSpacing: "0.08em",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "8px 18px",
          backgroundColor: NOIR,
          color: PAPIER,
          fontSize: "22px",
        }}
      >
        {upper(stamp.top)}
      </div>
      <div
        style={{
          display: "flex",
          padding: "8px 18px",
          backgroundColor: PAPIER,
          color: NOIR,
          fontSize: "26px",
        }}
      >
        {upper(stamp.bottom)}
      </div>
    </div>
  );
}

export async function renderOgImage({
  eyebrow,
  title,
  accent,
  subtitle,
  stamp,
  ribbon = DEFAULT_RIBBON,
  withPhoto = false,
}: OgImageProps) {
  const [fonts, photoSrc] = await Promise.all([
    loadFonts(),
    withPhoto ? loadProfilePhoto() : Promise.resolve(null),
  ]);
  const size = titleSize(
    Math.max(title.length, accent?.length ?? 0),
    Boolean(photoSrc),
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: NOIR,
        color: PAPIER,
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
          gap: "48px",
          padding: "56px 64px 40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "28px",
            flex: 1,
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontFamily: "Geist Mono",
              fontSize: "26px",
              letterSpacing: "0.08em",
              color: PAPIER,
            }}
          >
            <div
              style={{
                display: "flex",
                width: "20px",
                height: "20px",
                backgroundColor: JAUNE,
              }}
            />
            {upper(eyebrow)}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Inter",
              fontWeight: 900,
              fontSize: `${size}px`,
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {upper(title)}
            </div>
            {accent ? (
              <div style={{ display: "flex", flexWrap: "wrap", color: JAUNE }}>
                {upper(accent)}
              </div>
            ) : null}
          </div>
          {subtitle ? (
            <div
              style={{
                display: "flex",
                fontFamily: "Geist Mono",
                fontSize: "24px",
                lineHeight: 1.35,
                letterSpacing: "0.02em",
                color: GRIS,
                maxWidth: "900px",
              }}
            >
              {clipSubtitle(subtitle)}
            </div>
          ) : null}
        </div>
        {photoSrc ? (
          <div
            style={{
              display: "flex",
              position: "relative",
              flexShrink: 0,
              width: "340px",
              height: "340px",
            }}
          >
            {/* biome-ignore lint/performance/noImgElement: ImageResponse (Satori) ne supporte pas next/image */}
            <img
              src={photoSrc}
              alt=""
              width={340}
              height={340}
              style={{
                width: "340px",
                height: "340px",
                objectFit: "cover",
                border: `4px solid ${PAPIER}`,
                boxShadow: `12px 12px 0 ${JAUNE}`,
              }}
            />
            {stamp ? (
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  left: "-56px",
                  bottom: "-28px",
                }}
              >
                <Stamp stamp={stamp} />
              </div>
            ) : null}
          </div>
        ) : stamp ? (
          <div
            style={{ display: "flex", flexShrink: 0, alignSelf: "flex-start" }}
          >
            <Stamp stamp={stamp} />
          </div>
        ) : null}
      </div>
      <Ribbon items={ribbon} />
    </div>,
    {
      width: OG_SIZE.width,
      height: OG_SIZE.height,
      fonts: [...fonts],
    },
  );
}
