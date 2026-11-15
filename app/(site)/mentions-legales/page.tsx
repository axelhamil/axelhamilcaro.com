import type { Metadata } from "next";
import { LEGAL_ENTITY } from "@/app/_config/site.constants";
import { LegalContactLink } from "@/src/features/legal/components/legal-contact-link";
import {
  LegalDocument,
  LegalHeader,
  type LegalSection,
} from "@/src/features/legal/components/legal-document";
import { formatLongDate } from "@/src/lib/utils/date.utils";
import { JsonLdScript } from "@/src/shared/seo/json-ld-script";
import { buildPageMetadata } from "@/src/shared/seo/page-metadata";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";

const LEGAL = {
  name: "Axel Hamilcaro",
  ...LEGAL_ENTITY,
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

export const metadata: Metadata = buildPageMetadata({
  title: "Mentions légales",
  description: `Mentions légales d'axelhamilcaro.com (LCEN art. 6-III + RGPD) : éditeur Axel Hamilcaro EI (SIRET ${LEGAL_ENTITY.siret}), hébergeur Vercel, données et cookies.`,
  path: "/mentions-legales",
});

const breadcrumbSchema = buildBreadcrumbListSchema([
  { name: "Accueil", url: "/" },
  { name: "Mentions légales", url: "/mentions-legales" },
]);

const SECTIONS: LegalSection[] = [
  {
    title: "Éditeur du site",
    body: (
      <dl className="legal-fiche grid sm:grid-cols-2 gap-x-8 gap-y-5">
        <div>
          <dt>Identité</dt>
          <dd>{LEGAL.legalName}</dd>
        </div>
        <div>
          <dt>Statut juridique</dt>
          <dd>{LEGAL.status}</dd>
        </div>
        <div>
          <dt>SIREN</dt>
          <dd>{LEGAL.siren}</dd>
        </div>
        <div>
          <dt>SIRET (siège)</dt>
          <dd>{LEGAL.siret}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt>Inscription au RCS</dt>
          <dd>{LEGAL.rcs}</dd>
        </div>
        <div>
          <dt>Activité</dt>
          <dd>{LEGAL.apeActivity}</dd>
        </div>
        <div>
          <dt>Régime de TVA</dt>
          <dd>{LEGAL.vatStatus}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt>Siège social</dt>
          <dd>{LEGAL.address}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt>Contact</dt>
          <dd>
            <LegalContactLink label="Ouvrir le formulaire de contact" />
          </dd>
          <dd className="legal-note">{LEGAL.phoneNote}</dd>
        </div>
      </dl>
    ),
  },
  {
    title: "Directeur de la publication",
    body: (
      <p>
        <strong>{LEGAL.publisher}</strong>, en sa qualité d'éditeur unique du
        site, assume la direction de la publication et la responsabilité
        éditoriale des contenus, conformément à l'article 6-III de la loi
        n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique
        (LCEN).
      </p>
    ),
  },
  {
    title: "Hébergement",
    body: (
      <p>
        Le site est hébergé par <strong>{LEGAL.host.name}</strong>,{" "}
        {LEGAL.host.address}. Téléphone :{" "}
        <a
          href={`tel:${LEGAL.host.phone.replace(/\s/g, "")}`}
          className="link-underline"
        >
          {LEGAL.host.phone}
        </a>
        . Site web :{" "}
        <a
          href={LEGAL.host.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline"
        >
          vercel.com
        </a>
        . Les données techniques (logs serveur, métriques d'audience
        anonymisées) sont traitées par Vercel dans le cadre de l'hébergement du
        site, dans des centres de données européens lorsque la configuration du
        projet le permet.
      </p>
    ),
  },
  {
    title: "Propriété intellectuelle",
    body: (
      <p>
        L'ensemble des contenus présents sur ce site (textes, code source,
        images, identité visuelle, logo, charte graphique, structure de pages)
        est la propriété exclusive d'
        <strong>{LEGAL.name}</strong>, sauf mention contraire explicite. Toute
        reproduction, représentation, modification, publication, transmission ou
        diffusion, totale ou partielle, sur quelque support que ce soit, sans
        autorisation écrite préalable, est strictement interdite et constitue
        une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code
        de la propriété intellectuelle.
      </p>
    ),
  },
  {
    title: "Données personnelles · RGPD",
    body: (
      <>
        <p>
          Les données personnelles soumises via le formulaire de contact (nom,
          email, message) sont collectées par <strong>{LEGAL.name}</strong>,
          responsable de traitement, dans l'unique but de répondre à ta demande.
          Elles ne sont jamais cédées, vendues ou louées à des tiers à des fins
          commerciales.
        </p>
        <dl className="legal-fiche grid sm:grid-cols-2 gap-x-8 gap-y-5">
          <div>
            <dt>Base légale</dt>
            <dd>
              Consentement (formulaire) ou intérêt légitime (relation
              pré-contractuelle)
            </dd>
          </div>
          <div>
            <dt>Durée de conservation</dt>
            <dd>
              3 ans à compter du dernier contact, ou suppression sur demande
            </dd>
          </div>
          <div>
            <dt>Sous-traitants</dt>
            <dd>
              Resend (email transactionnel), Stripe (paiement), Vercel
              (hébergement)
            </dd>
          </div>
          <div>
            <dt>Transferts hors UE</dt>
            <dd>Vercel et Stripe : SCC + DPA conformes RGPD</dd>
          </div>
        </dl>
        <p>
          Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi n°78-17 du
          6 janvier 1978 modifiée relative à l'informatique, aux fichiers et aux
          libertés, tu disposes d'un droit d'accès, de rectification,
          d'effacement, de limitation, d'opposition, de portabilité et de
          définition de directives post-mortem sur tes données. Pour exercer ces
          droits, passe par le{" "}
          <LegalContactLink label="formulaire de contact" variant="inline" />.
          Tu peux également introduire une réclamation auprès de la{" "}
          <a
            href="https://www.cnil.fr/fr/plaintes"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            CNIL
          </a>{" "}
          (3 place de Fontenoy, 75007 Paris).
        </p>
      </>
    ),
  },
  {
    title: "Cookies et mesure d'audience",
    body: (
      <>
        <p>
          Le site n'utilise <strong>aucun cookie</strong> publicitaire, tracker
          tiers, pixel ou outil de fingerprinting. Aucun consentement préalable
          n'est requis car aucun traceur soumis à l'article 82 de la loi
          Informatique et Libertés n'est déposé.
        </p>
        <p>
          La mesure d'audience est assurée par <strong>Vercel Analytics</strong>{" "}
          et <strong>Vercel Speed Insights</strong>, configurés en mode
          "privacy-first" : adresses IP anonymisées côté serveur avant tout
          stockage, pas de cookie, pas de croisement avec d'autres sites, pas de
          réutilisation par Vercel à des fins propres. Cette configuration entre
          dans les critères d'exemption de consentement définis par la
          recommandation CNIL consolidée de janvier 2026 sur les cookies et
          traceurs.
        </p>
        <p>
          Les paiements sont gérés par <strong>Stripe</strong> via Payment Links
          externes : aucune donnée bancaire ne transite par axelhamilcaro.com,
          aucun cookie Stripe n'est déposé sur le domaine.
        </p>
      </>
    ),
  },
  {
    title: "Conditions générales de vente (CGV)",
    body: (
      <p>
        Les prestations proposées sur ce site (forfaits TMA, missions
        ponctuelles, accompagnement freelance) sont vendues exclusivement à des
        professionnels (B2B). Conformément à l'article L.441-1 du Code de
        commerce, les conditions générales de vente applicables sont accessibles
        publiquement sur la page{" "}
        <a href="/cgv" className="link-underline">
          /cgv
        </a>{" "}
        et communiquées préalablement à la conclusion du contrat. Pour les
        forfaits TMA souscrits via Stripe Payment Link, l'acceptation des CGV
        est matérialisée par le règlement de la première mensualité. Les
        conditions spécifiques (durée, résiliation, SLA, périmètre) sont
        rappelées sur la page{" "}
        <a href="/tma" className="link-underline">
          /tma
        </a>{" "}
        et dans la facture émise par Stripe.
      </p>
    ),
  },
  {
    title: "Sécurité du site",
    body: (
      <p>
        Le site est servi exclusivement en HTTPS strict, avec en-têtes de
        sécurité (HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy
        strict-origin-when-cross-origin). Les sauvegardes, l'isolation des
        environnements et la haute disponibilité sont assurées par
        l'infrastructure Vercel. Si tu découvres une vulnérabilité, contacte-moi
        en privé via le{" "}
        <LegalContactLink label="formulaire de contact" variant="inline" />{" "}
        avant toute divulgation publique (responsible disclosure).
      </p>
    ),
  },
  {
    title: "Droit applicable et juridiction",
    body: (
      <p>
        Les présentes mentions légales sont régies par le droit français. En cas
        de litige relatif à l'utilisation du site ou à l'interprétation des
        présentes, et à défaut de résolution amiable préalable, les tribunaux du
        ressort du siège de l'éditeur seront seuls compétents. S'agissant de
        prestations B2B, l'éditeur n'est pas tenu d'adhérer à un dispositif de
        médiation de la consommation (article L.612-1 du Code de la
        consommation).
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <main>
      <JsonLdScript data={breadcrumbSchema} />

      <LegalHeader
        surtitre="Légal · Site axelhamilcaro.com"
        title="Mentions légales"
      >
        Toutes les informations légales relatives à l'édition, à l'hébergement,
        au traitement des données et aux conditions de vente du site
        axelhamilcaro.com. Conformément à l'article 6-III de la LCEN, au RGPD, à
        la loi Informatique et Libertés modifiée et aux recommandations CNIL
        2026.
      </LegalHeader>

      <LegalDocument sections={SECTIONS}>
        <aside
          aria-labelledby="legal-question"
          className="etiquette etiquette-carte etiquette-jaune legal-question"
        >
          <h2 id="legal-question" className="title-md">
            Une question, une demande ?
          </h2>
          <p>
            Pour toute question relative aux présentes mentions légales, à
            l'exercice de tes droits sur tes données, à la communication des
            CGV, à un signalement de contenu ou à un rapport de vulnérabilité,
            contacte-moi directement.
          </p>
          <LegalContactLink label="Me contacter" />
        </aside>

        <p className="label-mono ink-muted legal-maj">
          Dernière mise à jour : {formatLongDate(LEGAL.lastUpdated)}
        </p>
      </LegalDocument>
    </main>
  );
}
