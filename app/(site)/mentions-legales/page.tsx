import {
  Building2,
  Cookie,
  Database,
  FileText,
  Gavel,
  Mail,
  ScrollText,
  Server,
  Shield,
  User,
} from "lucide-react";
import type { Metadata } from "next";
import { CONTACT, SITE_URL } from "@/app/_config/site.constants";
import { LegalContactLink } from "@/src/features/legal/components/legal-contact-link";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";

const LEGAL = {
  name: "Axel Hamilcaro",
  legalName: "HAMILCARO Axel",
  status: "Entrepreneur individuel (EI) — micro-entreprise",
  siren: "939 291 415",
  siret: "939 291 415 00015",
  rcs: "939 291 415 R.C.S. Paris (immatriculé le 20/01/2025)",
  apeActivity: "Programmation informatique",
  vatStatus: "TVA non applicable, art. 293 B du CGI",
  address: "60 rue François Ier, 75008 Paris, France",
  email: CONTACT.email,
  phoneNote:
    "Prestations B2B uniquement : joignable par email ou via le formulaire de contact, réponse sous 1 h en journée.",
  publisher: "Axel Hamilcaro",
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    phone: "+1 559 288 7060",
    url: "https://vercel.com",
  },
  lastUpdated: "2026-05-06",
} as const;

const PAGE_URL = `${SITE_URL}/mentions-legales`;

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site axelhamilcaro.com conformes à l'art. 6-III de la LCEN et au RGPD : éditeur (Axel Hamilcaro, EI, SIRET 939 291 415 00015), hébergeur Vercel Inc., traitement des données personnelles, cookies, propriété intellectuelle et CGV B2B.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Mentions légales — Axel Hamilcaro",
    description:
      "Éditeur, hébergeur, RGPD, cookies, CGV B2B et propriété intellectuelle du site axelhamilcaro.com.",
    url: PAGE_URL,
    type: "website",
    siteName: "Axel Hamilcaro",
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = buildBreadcrumbListSchema([
  { name: "Accueil", url: "/" },
  { name: "Mentions légales", url: "/mentions-legales" },
]);

interface LegalSection {
  icon: typeof FileText;
  title: string;
  body: React.ReactNode;
}

const SECTIONS: LegalSection[] = [
  {
    icon: Building2,
    title: "Éditeur du site",
    body: (
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <dt className="text-xs uppercase tracking-wider text-secondary mb-1">
            Identité
          </dt>
          <dd className="text-primary font-medium">{LEGAL.legalName}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-secondary mb-1">
            Statut juridique
          </dt>
          <dd className="text-primary font-medium">{LEGAL.status}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-secondary mb-1">
            SIREN
          </dt>
          <dd
            className="text-primary font-medium"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {LEGAL.siren}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-secondary mb-1">
            SIRET (siège)
          </dt>
          <dd
            className="text-primary font-medium"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {LEGAL.siret}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs uppercase tracking-wider text-secondary mb-1">
            Inscription au RCS
          </dt>
          <dd className="text-primary font-medium">{LEGAL.rcs}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-secondary mb-1">
            Activité
          </dt>
          <dd className="text-primary font-medium">{LEGAL.apeActivity}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-secondary mb-1">
            Régime de TVA
          </dt>
          <dd className="text-primary font-medium">{LEGAL.vatStatus}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs uppercase tracking-wider text-secondary mb-1">
            Siège social
          </dt>
          <dd className="text-primary font-medium">{LEGAL.address}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs uppercase tracking-wider text-secondary mb-1">
            Contact
          </dt>
          <dd>
            <a
              href={CONTACT.mailto}
              className="text-accent font-medium hover:underline"
            >
              {LEGAL.email}
            </a>
          </dd>
          <dd className="text-secondary text-xs mt-1">{LEGAL.phoneNote}</dd>
        </div>
      </dl>
    ),
  },
  {
    icon: User,
    title: "Directeur de la publication",
    body: (
      <p className="text-secondary leading-relaxed">
        <strong className="text-primary">{LEGAL.publisher}</strong>, en sa
        qualité d'éditeur unique du site, assume la direction de la
        publication et la responsabilité éditoriale des contenus, conformément
        à l'article 6-III de la loi n°2004-575 du 21 juin 2004 pour la
        confiance dans l'économie numérique (LCEN).
      </p>
    ),
  },
  {
    icon: Server,
    title: "Hébergement",
    body: (
      <p className="text-secondary leading-relaxed">
        Le site est hébergé par{" "}
        <strong className="text-primary">{LEGAL.host.name}</strong>,{" "}
        {LEGAL.host.address}. Téléphone :{" "}
        <a
          href={`tel:${LEGAL.host.phone.replace(/\s/g, "")}`}
          className="text-accent hover:underline"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          {LEGAL.host.phone}
        </a>
        . Site web :{" "}
        <a
          href={LEGAL.host.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          vercel.com
        </a>
        . Les données techniques (logs serveur, métriques d'audience
        anonymisées) sont traitées par Vercel dans le cadre de l'hébergement
        du site, dans des centres de données européens lorsque la
        configuration du projet le permet.
      </p>
    ),
  },
  {
    icon: FileText,
    title: "Propriété intellectuelle",
    body: (
      <p className="text-secondary leading-relaxed">
        L'ensemble des contenus présents sur ce site (textes, code source,
        images, identité visuelle, logo, charte graphique, structure de pages)
        est la propriété exclusive d'
        <strong className="text-primary">{LEGAL.name}</strong>, sauf mention
        contraire explicite. Toute reproduction, représentation, modification,
        publication, transmission ou diffusion, totale ou partielle, sur quelque
        support que ce soit, sans autorisation écrite préalable, est strictement
        interdite et constitue une contrefaçon sanctionnée par les articles
        L.335-2 et suivants du Code de la propriété intellectuelle.
      </p>
    ),
  },
  {
    icon: Database,
    title: "Données personnelles · RGPD",
    body: (
      <div className="text-secondary leading-relaxed space-y-3">
        <p>
          Les données personnelles soumises via le formulaire de contact (nom,
          email, message) sont collectées par{" "}
          <strong className="text-primary">{LEGAL.name}</strong>, responsable
          de traitement, dans l'unique but de répondre à ta demande. Elles ne
          sont jamais cédées, vendues ou louées à des tiers à des fins
          commerciales.
        </p>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
          <div>
            <dt className="text-xs uppercase tracking-wider text-secondary mb-1">
              Base légale
            </dt>
            <dd className="text-primary text-sm">
              Consentement (formulaire) ou intérêt légitime (relation
              pré-contractuelle)
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-secondary mb-1">
              Durée de conservation
            </dt>
            <dd className="text-primary text-sm">
              3 ans à compter du dernier contact, ou suppression sur demande
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-secondary mb-1">
              Sous-traitants
            </dt>
            <dd className="text-primary text-sm">
              Resend (email transactionnel), Stripe (paiement), Vercel
              (hébergement)
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wider text-secondary mb-1">
              Transferts hors UE
            </dt>
            <dd className="text-primary text-sm">
              Vercel et Stripe : SCC + DPA conformes RGPD
            </dd>
          </div>
        </dl>
        <p>
          Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi n°78-17
          du 6 janvier 1978 modifiée relative à l'informatique, aux fichiers et
          aux libertés, tu disposes d'un droit d'accès, de rectification,
          d'effacement, de limitation, d'opposition, de portabilité et de
          définition de directives post-mortem sur tes données. Pour exercer
          ces droits, écris à{" "}
          <a
            href={CONTACT.mailto}
            className="text-accent font-medium hover:underline"
          >
            {LEGAL.email}
          </a>
          . Tu peux également introduire une réclamation auprès de la{" "}
          <a
            href="https://www.cnil.fr/fr/plaintes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            CNIL
          </a>{" "}
          (3 place de Fontenoy, 75007 Paris).
        </p>
      </div>
    ),
  },
  {
    icon: Cookie,
    title: "Cookies et mesure d'audience",
    body: (
      <div className="text-secondary leading-relaxed space-y-3">
        <p>
          Le site n'utilise <strong className="text-primary">aucun cookie</strong>{" "}
          publicitaire, tracker tiers, pixel ou outil de fingerprinting. Aucun
          consentement préalable n'est requis car aucun traceur soumis à
          l'article 82 de la loi Informatique et Libertés n'est déposé.
        </p>
        <p>
          La mesure d'audience est assurée par{" "}
          <strong className="text-primary">Vercel Analytics</strong> et{" "}
          <strong className="text-primary">Vercel Speed Insights</strong>,
          configurés en mode "privacy-first" : adresses IP anonymisées côté
          serveur avant tout stockage, pas de cookie, pas de croisement avec
          d'autres sites, pas de réutilisation par Vercel à des fins propres.
          Cette configuration entre dans les critères d'exemption de
          consentement définis par la recommandation CNIL consolidée de janvier
          2026 sur les cookies et traceurs.
        </p>
        <p>
          Les paiements sont gérés par{" "}
          <strong className="text-primary">Stripe</strong> via Payment Links
          externes : aucune donnée bancaire ne transite par axelhamilcaro.com,
          aucun cookie Stripe n'est déposé sur le domaine.
        </p>
      </div>
    ),
  },
  {
    icon: ScrollText,
    title: "Conditions générales de vente (CGV)",
    body: (
      <p className="text-secondary leading-relaxed">
        Les prestations proposées sur ce site (forfaits TMA, missions
        ponctuelles, accompagnement freelance) sont vendues exclusivement à
        des professionnels (B2B). Conformément à l'article L.441-1 du Code de
        commerce, les conditions générales de vente applicables sont{" "}
        <strong className="text-primary">communiquées sur simple demande</strong>{" "}
        à{" "}
        <a
          href={CONTACT.mailto}
          className="text-accent font-medium hover:underline"
        >
          {LEGAL.email}
        </a>{" "}
        avant la conclusion du contrat. Pour les forfaits TMA souscrits via
        Stripe Payment Link, les conditions spécifiques (durée, résiliation,
        SLA) sont rappelées sur la page{" "}
        <a href="/tma" className="text-accent hover:underline">
          /tma
        </a>{" "}
        et dans la facture émise par Stripe.
      </p>
    ),
  },
  {
    icon: Shield,
    title: "Sécurité du site",
    body: (
      <p className="text-secondary leading-relaxed">
        Le site est servi exclusivement en HTTPS strict, avec en-têtes de
        sécurité (HSTS, X-Content-Type-Options, X-Frame-Options,
        Referrer-Policy strict-origin-when-cross-origin). Les sauvegardes,
        l'isolation des environnements et la haute disponibilité sont assurées
        par l'infrastructure Vercel. Si tu découvres une vulnérabilité,
        contacte-moi en privé via{" "}
        <a href={CONTACT.mailto} className="text-accent hover:underline">
          {LEGAL.email}
        </a>{" "}
        avant toute divulgation publique (responsible disclosure).
      </p>
    ),
  },
  {
    icon: Gavel,
    title: "Droit applicable et juridiction",
    body: (
      <p className="text-secondary leading-relaxed">
        Les présentes mentions légales sont régies par le droit français. En
        cas de litige relatif à l'utilisation du site ou à l'interprétation
        des présentes, et à défaut de résolution amiable préalable, les
        tribunaux du ressort du siège de l'éditeur seront seuls compétents.
        S'agissant de prestations B2B, l'éditeur n'est pas tenu d'adhérer à
        un dispositif de médiation de la consommation (article L.612-1 du Code
        de la consommation).
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <main className="pb-8">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="py-16 sm:py-24 lg:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-accent font-medium tracking-wider text-sm mb-4"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            // mentions_légales()
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Mentions légales
          </h1>
          <p className="text-secondary text-base sm:text-lg leading-relaxed">
            Toutes les informations légales relatives à l'édition, à
            l'hébergement, au traitement des données et aux conditions de
            vente du site axelhamilcaro.com. Conformément à l'article 6-III
            de la LCEN, au RGPD, à la loi Informatique et Libertés modifiée
            et aux recommandations CNIL 2026.
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28 px-6">
        <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6">
          {SECTIONS.map(({ icon: Icon, title, body }) => (
            <article key={title} className="card p-6 sm:p-8 lg:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="shrink-0 p-3 rounded-xl bg-accent/10 text-accent">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h2
                  className="text-xl sm:text-2xl font-bold text-primary"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {title}
                </h2>
              </div>
              <div className="sm:pl-16">{body}</div>
            </article>
          ))}

          <aside className="card p-6 sm:p-8 lg:p-10 border-accent/30">
            <div className="flex items-start gap-4">
              <div className="shrink-0 p-3 rounded-xl bg-accent text-white">
                <Mail className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h2
                  className="text-xl sm:text-2xl font-bold text-primary mb-3"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Une question, une demande ?
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  Pour toute question relative aux présentes mentions
                  légales, à l'exercice de tes droits sur tes données, à la
                  communication des CGV, à un signalement de contenu ou à un
                  rapport de vulnérabilité, contacte-moi directement.
                </p>
                <LegalContactLink label="Me contacter" />
              </div>
            </div>
          </aside>

          <p className="text-center text-secondary/70 text-xs pt-4">
            Dernière mise à jour :{" "}
            {new Date(LEGAL.lastUpdated).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </section>
    </main>
  );
}
