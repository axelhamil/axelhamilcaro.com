import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const PUBLIC_DIR = join(process.cwd(), "public");
const ICON_SVG_PATH = join(process.cwd(), "app", "icon.svg");

const iconSvg = readFileSync(ICON_SVG_PATH, "utf-8");

async function generateFavicon() {
  const sizes = [16, 32, 48];
  const buffers: Buffer[] = [];

  for (const size of sizes) {
    const buffer = await sharp(Buffer.from(iconSvg))
      .resize(size, size)
      .png()
      .toBuffer();
    buffers.push(buffer);
  }

  const icoBuffer = buffers[0];
  writeFileSync(join(PUBLIC_DIR, "favicon.ico"), icoBuffer);
  console.log("✅ Generated favicon.ico");
}

async function generateAppleTouchIcon() {
  const buffer = await sharp(Buffer.from(iconSvg))
    .resize(180, 180)
    .png()
    .toBuffer();

  writeFileSync(join(PUBLIC_DIR, "apple-touch-icon.png"), buffer);
  console.log("✅ Generated apple-touch-icon.png (180x180)");
}

async function generatePWAIcons() {
  const sizes = [192, 512];

  for (const size of sizes) {
    const buffer = await sharp(Buffer.from(iconSvg))
      .resize(size, size)
      .png()
      .toBuffer();

    writeFileSync(join(PUBLIC_DIR, `icon-${size}.png`), buffer);
    console.log(`✅ Generated icon-${size}.png`);
  }
}

async function generateOGImage() {
  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#1e1e2e"/>

  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#cba6f7"/>
      <stop offset="100%" stop-color="#89b4fa"/>
    </linearGradient>
  </defs>

  <g transform="translate(200, 150)">
    <rect width="200" height="200" rx="50" fill="#1e1e2e"/>
    <rect width="200" height="200" rx="50" fill="url(#gradient)" opacity="0.3"/>
    <rect x="5" y="5" width="190" height="190" rx="45" fill="none" stroke="#cba6f7" stroke-opacity="0.5" stroke-width="4"/>

    <g transform="translate(40, 40) scale(5)" stroke="#cba6f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </g>
  </g>

  <text x="450" y="280" font-family="monospace" font-size="64" font-weight="bold" fill="#cdd6f4">Axel Hamilcaro</text>
  <text x="450" y="350" font-family="monospace" font-size="36" fill="#89b4fa">Développeur Full-Stack Freelance</text>
  <text x="450" y="420" font-family="monospace" font-size="28" fill="#cba6f7">TypeScript · Next.js · React · Node.js</text>
</svg>`;

  const buffer = await sharp(Buffer.from(ogSvg))
    .png()
    .toBuffer();

  writeFileSync(join(PUBLIC_DIR, "og-image.png"), buffer);
  console.log("✅ Generated og-image.png (1200x630)");
}

async function main() {
  console.log("🚀 Generating favicon and PWA assets...\n");

  await generateFavicon();
  await generateAppleTouchIcon();
  await generatePWAIcons();
  await generateOGImage();

  console.log("\n✅ All assets generated successfully!");
}

main().catch((error) => {
  console.error("❌ Error generating assets:", error);
  process.exit(1);
});
