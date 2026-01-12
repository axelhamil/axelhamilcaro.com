import { db } from "@/app/_lib/db";
import { treeLinks } from "@/app/_lib/db/schema";
import { NextResponse } from "next/server";

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
];

export async function POST() {
  try {
    const existingLinks = await db.select().from(treeLinks);

    if (existingLinks.length > 0) {
      return NextResponse.json(
        { message: "Les liens existent déjà", count: existingLinks.length },
        { status: 200 }
      );
    }

    await db.insert(treeLinks).values(defaultLinks);

    return NextResponse.json(
      { message: "Liens initialisés avec succès", count: defaultLinks.length },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur seed tree links:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'initialisation" },
      { status: 500 }
    );
  }
}
