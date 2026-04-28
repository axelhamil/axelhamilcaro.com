import { db } from "@/drizzle";
import { treeLinks } from "@/drizzle/schema";

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
    url: "/#portfolio",
    icon: "globe",
    description: "Mon site personnel",
    featured: false,
    order: 4,
  },
  {
    title: "Contact",
    url: "mailto:contact@axelhamilcaro.com",
    icon: "mail",
    description: "Réponse sous 1h en journée",
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
  const force = process.argv.includes("--force");
  console.log("🌱 Seeding database...");

  const existingLinks = await db.select().from(treeLinks);

  if (existingLinks.length > 0) {
    if (!force) {
      console.log(
        `ℹ️  ${existingLinks.length} liens existent déjà, skip seed (utilise --force pour reset)`,
      );
      process.exit(0);
    }
    console.log(`⚠️  --force : suppression de ${existingLinks.length} liens existants`);
    await db.delete(treeLinks);
  }

  await db.insert(treeLinks).values(defaultLinks);
  console.log(`✅ ${defaultLinks.length} liens insérés`);

  process.exit(0);
}

main().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exit(1);
});
