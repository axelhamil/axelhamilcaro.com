import { db } from "@/app/_lib/db";
import { treeLinks } from "@/app/_lib/db/schema";

const defaultLinks = [
  {
    title: "Prendre rendez-vous",
    url: "https://calendly.com/axel-hamilcaro-pro/appel-decouverte",
    icon: "calendar",
    description: "30 min pour discuter de votre projet",
    featured: true,
    order: 0,
  },
  {
    title: "GitHub",
    url: "https://github.com/axelhamil",
    icon: "github",
    description: "Mes projets open source",
    featured: false,
    order: 1,
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/axelhamilcaro/",
    icon: "linkedin",
    description: "Mon profil professionnel",
    featured: false,
    order: 2,
  },
  {
    title: "Malt",
    url: "https://www.malt.fr/profile/axelhamilcaro",
    icon: "briefcase",
    description: "Mon profil freelance",
    featured: false,
    order: 3,
  },
  {
    title: "Portfolio",
    url: "/",
    icon: "globe",
    description: "Mon site personnel",
    featured: false,
    order: 4,
  },
  {
    title: "Email",
    url: "mailto:contact@axelhamilcaro.com",
    icon: "mail",
    description: "contact@axelhamilcaro.com",
    featured: false,
    order: 5,
  },
  {
    title: "Instagram",
    url: "https://instagram.com/axelhmlcr",
    icon: "instagram",
    description: "@axelhmlcr",
    featured: false,
    order: 6,
  },
  {
    title: "TikTok",
    url: "https://tiktok.com/@axelhmlcr",
    icon: "tiktok",
    description: "@axelhmlcr",
    featured: false,
    order: 7,
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  const existingLinks = await db.select().from(treeLinks);

  if (existingLinks.length > 0) {
    console.log(`ℹ️  ${existingLinks.length} liens existent déjà, skip seed`);
    process.exit(0);
  }

  await db.insert(treeLinks).values(defaultLinks);
  console.log(`✅ ${defaultLinks.length} liens insérés`);

  process.exit(0);
}

main().catch((error) => {
  console.error("❌ Erreur seed:", error);
  process.exit(1);
});
