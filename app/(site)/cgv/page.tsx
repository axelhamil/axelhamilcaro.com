import {
  BookOpen,
  Building2,
  CalendarClock,
  CreditCard,
  FileSignature,
  FileText,
  Gavel,
  KeyRound,
  Lock,
  Mail,
  Repeat,
  Scale,
  Settings2,
  ShieldAlert,
  Sparkles,
  XOctagon,
} from "lucide-react";
import type { Metadata } from "next";
import { SITE_URL } from "@/app/_config/site.constants";
import { LegalContactLink } from "@/src/features/legal/components/legal-contact-link";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";

const LEGAL = {
  name: "Axel Hamilcaro",
  legalName: "HAMILCARO Axel",
  status: "Entrepreneur individuel (EI) — micro-entreprise",
  siren: "939 291 415",
  siret: "939 291 415 00015",
  rcs: "939 291 415 R.C.S. Paris (immatriculé le 20/01/2025)",
  vatStatus: "TVA non applicable, art. 293 B du CGI",
  address: "60 rue François Ier, 75008 Paris, France",
  lastUpdated: "2026-05-12",
} as const;

const PAGE_URL = `${SITE_URL}/cgv`;

export const metadata: Metadata = {
  title: "Conditions Générales de Vente — TMA et prestations B2B",
  description:
    "Conditions générales de vente (CGV) applicables aux prestations B2B d'Axel Hamilcaro (forfaits TMA PRO et PREMIUM, missions ponctuelles, accompagnement). Article L.441-1 du Code de commerce, droit français.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "CGV — Conditions Générales de Vente B2B",
    description:
      "Conditions applicables aux forfaits TMA et prestations freelance B2B d'Axel Hamilcaro.",
    url: PAGE_URL,
    type: "website",
    siteName: "Axel Hamilcaro",
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = buildBreadcrumbListSchema([
  { name: "Accueil", url: "/" },
  { name: "CGV", url: "/cgv" },
]);

interface CgvSection {
  icon: typeof FileText;
  title: string;
  body: React.ReactNode;
}

const SECTIONS: CgvSection[] = [
  {
    icon: Building2,
    title: "1. Préambule et identification",
    body: (
      <div className="text-secondary leading-relaxed space-y-3">
        <p>
          Les présentes conditions générales de vente (ci-après « CGV ») sont
          conclues entre :
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-primary">{LEGAL.legalName}</strong>,
            entrepreneur individuel exerçant en micro-entreprise, immatriculé
            sous le numéro SIRET {LEGAL.siret}, dont le siège est situé{" "}
            {LEGAL.address} (ci-après le « <strong>Prestataire</strong> »),
          </li>
          <li>
            et toute personne morale ou physique agissant à des fins
            professionnelles souscrivant à l'une des prestations proposées
            (ci-après le « <strong>Client</strong> »).
          </li>
        </ul>
        <p>
          Les prestations objet des présentes sont proposées{" "}
          <strong className="text-primary">
            exclusivement à des Clients professionnels (B2B)
          </strong>
          . Toute souscription par un consommateur au sens du Code de la
          consommation est exclue. Les CGV sont communiquées au Client
          préalablement à la conclusion du contrat, conformément à l'article
          L.441-1 du Code de commerce.
        </p>
      </div>
    ),
  },
  {
    icon: BookOpen,
    title: "2. Définitions",
    body: (
      <dl className="text-secondary leading-relaxed space-y-3">
        <div>
          <dt className="text-primary font-semibold inline">Services : </dt>
          <dd className="inline">
            ensemble des prestations de Tierce Maintenance Applicative (TMA),
            missions ponctuelles ou accompagnement freelance fournies par le
            Prestataire au Client.
          </dd>
        </div>
        <div>
          <dt className="text-primary font-semibold inline">Forfait : </dt>
          <dd className="inline">
            offre récurrente mensuelle PRO ou PREMIUM décrite sur la page{" "}
            <a href="/tma" className="text-accent hover:underline">
              /tma
            </a>{" "}
            du site, comprenant un volume d'heures incluses et un périmètre
            d'intervention.
          </dd>
        </div>
        <div>
          <dt className="text-primary font-semibold inline">Ticket : </dt>
          <dd className="inline">
            demande d'intervention transmise par le Client au Prestataire via le
            canal de communication défini lors de l'onboarding.
          </dd>
        </div>
        <div>
          <dt className="text-primary font-semibold inline">
            Heures consommées :{" "}
          </dt>
          <dd className="inline">
            temps d'intervention décompté sur le Forfait, par tranches de 30
            minutes arrondies au plus bas, avec un minimum de 30 minutes par
            Ticket.
          </dd>
        </div>
        <div>
          <dt className="text-primary font-semibold inline">
            Heures ouvrées :{" "}
          </dt>
          <dd className="inline">
            du lundi au vendredi, hors jours fériés français, de 9h à 18h (heure
            de Paris).
          </dd>
        </div>
      </dl>
    ),
  },
  {
    icon: FileText,
    title: "3. Objet et description des prestations",
    body: (
      <div className="text-secondary leading-relaxed space-y-3">
        <p>
          Les présentes CGV régissent les conditions d'exécution et de
          facturation de l'ensemble des Services proposés par le Prestataire :
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-primary">Forfaits TMA mensuels</strong> (PRO
            et PREMIUM) : maintenance applicative récurrente d'une application
            web ou mobile en production, comprenant correctifs, mises à jour,
            support technique et, pour le forfait PREMIUM, monitoring proactif
            et livrables récurrents. Détails complets sur la page{" "}
            <a href="/tma" className="text-accent hover:underline">
              /tma
            </a>
            , qui constitue un élément contractuel des présentes.
          </li>
          <li>
            <strong className="text-primary">
              Développement de projet au forfait
            </strong>{" "}
            : création d'application from scratch (MVP, SaaS, plateforme,
            application mobile), refonte complète, développement de modules
            métier conséquents. Chaque mission fait l'objet d'un devis et d'un
            contrat de prestation spécifique incluant cahier des charges,
            calendrier, jalons de livraison, conditions de recette et modalités
            de paiement échelonné.
          </li>
          <li>
            <strong className="text-primary">Régie et accompagnement</strong> :
            prestation de développement au temps passé sur un projet existant
            (renfort d'équipe, sprint dédié, lead tech à temps partagé,
            consulting technique), facturée au TJM ou au taux horaire négocié au
            devis.
          </li>
          <li>
            <strong className="text-primary">Missions ponctuelles</strong> :
            audit technique, intégration tierce, mise en place d'infrastructure,
            optimisation performance, traitées sur devis distinct.
          </li>
        </ul>
        <p>
          <strong className="text-primary">
            Articulation avec les présentes CGV :
          </strong>{" "}
          pour les missions de développement au forfait, de régie et les
          missions ponctuelles, des conditions spécifiques (calendrier précis,
          livrables, jalons, conditions de recette, cession de propriété
          intellectuelle adaptée) sont définies dans le devis ou contrat propre
          à chaque mission. Ces conditions spécifiques complètent les présentes
          CGV et prévalent sur celles-ci en cas de contradiction.
        </p>
      </div>
    ),
  },
  {
    icon: FileSignature,
    title: "4. Souscription, durée et reconduction",
    body: (
      <div className="text-secondary leading-relaxed space-y-3">
        <p>
          La souscription à un Forfait s'effectue exclusivement via le lien de
          paiement Stripe (« Stripe Payment Link ») accessible depuis la page{" "}
          <a href="/tma" className="text-accent hover:underline">
            /tma
          </a>
          . Le paiement de la première mensualité vaut acceptation pleine et
          entière des présentes CGV.
        </p>
        <p>
          Le contrat est conclu pour une durée d'un (1) mois, reconduit
          tacitement chaque mois à la date anniversaire de souscription, sans
          engagement minimum. Le Client peut résilier à tout moment dans les
          conditions prévues à l'article 11.
        </p>
        <p>
          L'exécution effective des Services débute à l'issue d'une réunion
          d'onboarding planifiée dans un délai maximum de quarante-huit (48)
          heures ouvrées suivant la souscription.
        </p>
      </div>
    ),
  },
  {
    icon: CreditCard,
    title: "5. Tarifs, facturation et paiement",
    body: (
      <div className="text-secondary leading-relaxed space-y-3">
        <p>
          Les tarifs des Forfaits sont indiqués hors taxes sur la page{" "}
          <a href="/tma" className="text-accent hover:underline">
            /tma
          </a>{" "}
          et applicables à la date de souscription. À titre informatif :
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Forfait TMA PRO : 350 € HT / mois (5h incluses)</li>
          <li>Forfait TMA PREMIUM : 800 € HT / mois (10h incluses)</li>
          <li>
            Heure supplémentaire hors-forfait : 80 € HT / h, sur accord écrit
            préalable
          </li>
          <li>
            Missions de développement au forfait, régie et missions ponctuelles
            : tarif précisé au devis, validé par le Client avant démarrage
          </li>
        </ul>
        <p>
          <strong className="text-primary">Régime de TVA :</strong>{" "}
          {LEGAL.vatStatus}. Aucune TVA n'est appliquée aux factures émises.
        </p>
        <p>
          La facturation est mensuelle, prélevée automatiquement par Stripe à
          chaque date anniversaire de souscription. La facture est transmise au
          Client par email à l'issue de chaque prélèvement et reste accessible
          depuis le Stripe Customer Portal.
        </p>
        <p>
          <strong className="text-primary">Défaut de paiement :</strong> en cas
          d'échec de prélèvement, le Prestataire adresse au Client une mise en
          demeure par email. À défaut de régularisation dans un délai de sept
          (7) jours, les Services peuvent être suspendus de plein droit (article
          11). Conformément à l'article L.441-10 du Code de commerce, tout
          retard de paiement entraîne de plein droit l'exigibilité d'une
          indemnité forfaitaire pour frais de recouvrement de quarante (40)
          euros, ainsi que d'intérêts de retard au taux légal majoré de dix (10)
          points de pourcentage.
        </p>
      </div>
    ),
  },
  {
    icon: Settings2,
    title: "6. Modalités d'exécution",
    body: (
      <div className="text-secondary leading-relaxed space-y-3">
        <p>
          <strong className="text-primary">Heures d'intervention :</strong> les
          Services sont rendus en Heures ouvrées (du lundi au vendredi, hors
          jours fériés français). Aucune astreinte de nuit, week-end ou jour
          férié n'est incluse, sauf disposition contraire négociée séparément.
        </p>
        <p>
          <strong className="text-primary">
            Délais de prise en compte :
          </strong>{" "}
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Forfait PRO : tout Ticket est pris en compte sous un (1) jour ouvré
            maximum.
          </li>
          <li>
            Forfait PREMIUM : tout Ticket est pris en compte sous une (1)
            demi-journée ouvrée maximum.
          </li>
        </ul>
        <p>
          Ces délais constituent une obligation de moyens du Prestataire et non
          une obligation de résultat. La « prise en compte » s'entend comme un
          premier retour qualifié et non comme la résolution complète du Ticket,
          dont la durée dépend de la complexité de la demande.
        </p>
        <p>
          <strong className="text-primary">
            Décompte des Heures consommées :
          </strong>{" "}
          par tranches de 30 minutes arrondies au plus bas, avec un minimum de
          30 minutes par Ticket. Le suivi des Heures consommées est tenu par le
          Prestataire et partagé avec le Client dès qu'au moins 80 % du Forfait
          mensuel est consommé.
        </p>
        <p>
          <strong className="text-primary">Heures non utilisées :</strong> les
          Heures non consommées au terme d'un mois ne sont pas reportées sur le
          mois suivant.
        </p>
        <p>
          <strong className="text-primary">Canal de communication :</strong>{" "}
          défini d'un commun accord lors de l'onboarding (email, messagerie
          professionnelle ou plateforme dédiée).
        </p>
      </div>
    ),
  },
  {
    icon: KeyRound,
    title: "7. Obligations du Client",
    body: (
      <div className="text-secondary leading-relaxed space-y-3">
        <p>Le Client s'engage à :</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            fournir au Prestataire l'ensemble des accès techniques nécessaires à
            l'exécution des Services (code source, hébergement, domaines,
            secrets, comptes admin) ;
          </li>
          <li>
            désigner un référent technique unique chargé du cadrage initial, des
            arbitrages produit et de la validation des évolutions ;
          </li>
          <li>
            transmettre toute information utile à la bonne exécution des
            Services et signaler sans délai tout incident ou évolution notable ;
          </li>
          <li>
            s'acquitter du règlement des mensualités à échéance et maintenir un
            moyen de paiement valide sur le Stripe Customer Portal ;
          </li>
          <li>
            assumer les coûts d'infrastructure, d'hébergement, de services tiers
            (Sentry, UptimeRobot, Better Stack, etc.) et de licences
            logicielles, qui restent à sa charge directement auprès des éditeurs
            concernés.
          </li>
        </ul>
      </div>
    ),
  },
  {
    icon: Sparkles,
    title: "8. Obligations du Prestataire",
    body: (
      <div className="text-secondary leading-relaxed space-y-3">
        <p>Le Prestataire s'engage à :</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            exécuter les Services avec diligence, dans le respect des règles de
            l'art du développement logiciel et des bonnes pratiques de sécurité
            ;
          </li>
          <li>
            respecter les délais de prise en compte décrits à l'article 6
            (obligation de moyens) ;
          </li>
          <li>
            communiquer de manière transparente sur les Heures consommées,
            l'état d'avancement des Tickets et les éventuels dépassements
            prévisibles ;
          </li>
          <li>
            préserver la confidentialité des informations du Client (article 12)
            ;
          </li>
          <li>
            tenir à disposition du Client une documentation minimale relative
            aux interventions effectuées.
          </li>
        </ul>
        <p>
          Le Prestataire est tenu à une{" "}
          <strong className="text-primary">obligation de moyens</strong> et non
          de résultat, sauf disposition expresse contraire. Le Prestataire ne
          saurait être tenu pour responsable des dysfonctionnements imputables
          au code antérieur à son intervention, aux services tiers utilisés par
          l'application, ou aux choix techniques imposés par le Client.
        </p>
      </div>
    ),
  },
  {
    icon: Repeat,
    title: "9. Changement de Forfait",
    body: (
      <div className="text-secondary leading-relaxed space-y-3">
        <p>
          Le Client peut demander un changement de Forfait à tout moment, par
          écrit (email).
        </p>
        <p>
          <strong className="text-primary">Upgrade (PRO → PREMIUM) :</strong>{" "}
          bascule immédiate au prorata temporis pour la période en cours. Le
          Client s'acquitte de la différence tarifaire au prorata. La mise en
          place des outils additionnels du Forfait PREMIUM (monitoring, status
          page, canal dédié) intervient au début de la période mensuelle
          complète suivante.
        </p>
        <p>
          <strong className="text-primary">Downgrade (PREMIUM → PRO) :</strong>{" "}
          la bascule prend effet au terme de la période mensuelle en cours.
          Aucun remboursement au prorata n'est dû.
        </p>
        <p>
          Tout changement de Forfait fait l'objet d'une confirmation écrite du
          Prestataire avant prise d'effet.
        </p>
      </div>
    ),
  },
  {
    icon: XOctagon,
    title: "10. Suspension des Services",
    body: (
      <div className="text-secondary leading-relaxed space-y-3">
        <p>Le Prestataire peut suspendre l'exécution des Services :</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            en cas de défaut de paiement non régularisé sept (7) jours après
            mise en demeure ;
          </li>
          <li>
            en cas de comportement manifestement abusif du Client (notamment :
            volume de demandes anormalement élevé non couvert par le Forfait et
            refus d'évoluer vers le Forfait supérieur ou de facturer en heures
            supplémentaires) ;
          </li>
          <li>
            en cas de manquement grave du Client à ses obligations (article 7).
          </li>
        </ul>
        <p>
          La suspension est notifiée par email et reste effective jusqu'à
          régularisation. Elle ne dispense pas le Client du paiement des
          mensualités dues.
        </p>
      </div>
    ),
  },
  {
    icon: CalendarClock,
    title: "11. Résiliation et réversibilité",
    body: (
      <div className="text-secondary leading-relaxed space-y-3">
        <p>
          <strong className="text-primary">
            Résiliation à l'initiative du Client :
          </strong>{" "}
          le Client peut résilier son abonnement à tout moment, sans frais et
          sans motivation, depuis le Stripe Customer Portal accessible via le
          lien présent sur ses factures. La résiliation prend effet au terme de
          la période mensuelle déjà payée.
        </p>
        <p>
          <strong className="text-primary">
            Résiliation à l'initiative du Prestataire :
          </strong>{" "}
          le Prestataire peut résilier le contrat avec un préavis de trente (30)
          jours notifié par email, sans motivation. En cas de manquement grave
          du Client (impayés persistants, comportement abusif), la résiliation
          peut intervenir sans préavis.
        </p>
        <p>
          <strong className="text-primary">Réversibilité (handover) :</strong> à
          la résiliation, le Prestataire s'engage à remettre au Client, dans un
          délai de quinze (15) jours, un dossier de passation comprenant : la
          liste des accès transférés ou révoqués, la documentation des
          interventions du dernier mois, l'état des chantiers en cours, les
          références des outils tiers provisionnés au nom du Client.
        </p>
      </div>
    ),
  },
  {
    icon: ShieldAlert,
    title: "12. Responsabilité et force majeure",
    body: (
      <div className="text-secondary leading-relaxed space-y-3">
        <p>
          <strong className="text-primary">Obligation de moyens :</strong> la
          responsabilité du Prestataire ne peut être engagée que pour les
          dommages directs et prévisibles résultant d'une faute prouvée dans
          l'exécution des Services.
        </p>
        <p>
          <strong className="text-primary">Plafond de responsabilité :</strong>{" "}
          la responsabilité cumulée du Prestataire au titre des présentes, tous
          chefs de préjudice confondus, est expressément limitée au montant
          total hors taxes effectivement payé par le Client au titre des trois
          (3) derniers mois précédant le fait générateur du dommage.
        </p>
        <p>
          <strong className="text-primary">Exclusions :</strong> sont
          expressément exclus de la responsabilité du Prestataire les dommages
          indirects, immatériels ou consécutifs, notamment la perte
          d'exploitation, la perte de chiffre d'affaires, la perte de clientèle,
          la perte de données (sauf preuve d'une faute caractérisée du
          Prestataire) ou toute atteinte à l'image du Client.
        </p>
        <p>
          <strong className="text-primary">Force majeure :</strong> aucune des
          Parties ne pourra être tenue pour responsable d'un manquement à ses
          obligations résultant d'un cas de force majeure au sens de l'article
          1218 du Code civil (panne d'infrastructure tiers d'ampleur,
          cyberattaque, événement climatique majeur, indisponibilité médicale,
          etc.). La Partie empêchée en informe l'autre dans les meilleurs
          délais.
        </p>
      </div>
    ),
  },
  {
    icon: Lock,
    title: "13. Confidentialité et données personnelles",
    body: (
      <div className="text-secondary leading-relaxed space-y-3">
        <p>
          <strong className="text-primary">Confidentialité :</strong> chaque
          Partie s'engage à conserver strictement confidentielles toutes les
          informations à caractère commercial, technique ou stratégique dont
          elle aurait connaissance dans le cadre des Services. Cet engagement de
          confidentialité produit ses effets pendant toute la durée du contrat
          et trois (3) ans après son terme.
        </p>
        <p>
          <strong className="text-primary">
            Données personnelles (RGPD) :
          </strong>{" "}
          dans le cadre des Services, le Prestataire peut être amené à traiter
          des données personnelles dont le Client est responsable de traitement.
          Le Prestataire agit en qualité de sous-traitant au sens du RGPD.
          Aucune copie de données n'est conservée sur l'infrastructure
          personnelle du Prestataire au-delà de la durée strictement nécessaire
          à l'intervention. Les accès aux données sont révoqués sans délai à la
          résiliation.
        </p>
        <p>
          Les modalités complètes de traitement des données personnelles du
          Client en tant que prospect ou cocontractant sont décrites dans la
          section dédiée des{" "}
          <a href="/mentions-legales" className="text-accent hover:underline">
            mentions légales
          </a>
          .
        </p>
      </div>
    ),
  },
  {
    icon: Scale,
    title: "14. Propriété intellectuelle",
    body: (
      <div className="text-secondary leading-relaxed space-y-3">
        <p>
          <strong className="text-primary">Code livré au Client :</strong> tout
          code source, configuration ou contenu produit spécifiquement pour le
          Client dans le cadre des Services lui est cédé, à compter de son
          intégration dans le dépôt du Client et sous réserve du paiement
          intégral des sommes dues.
        </p>
        <p>
          <strong className="text-primary">
            Savoir-faire et outils du Prestataire :
          </strong>{" "}
          les méthodes, outils internes, scripts génériques, templates et
          savoir-faire préexistants du Prestataire restent sa propriété
          exclusive et ne sont pas cédés au Client.
        </p>
        <p>
          <strong className="text-primary">Référencement :</strong> sauf mention
          contraire écrite du Client, le Prestataire se réserve le droit de
          mentionner le nom du Client et la nature non confidentielle de la
          mission dans ses références commerciales (portfolio, profils
          professionnels, propositions commerciales).
        </p>
      </div>
    ),
  },
  {
    icon: Gavel,
    title: "15. Modifications, droit applicable et juridiction",
    body: (
      <div className="text-secondary leading-relaxed space-y-3">
        <p>
          <strong className="text-primary">Modifications des CGV :</strong> le
          Prestataire se réserve le droit de modifier les présentes CGV à tout
          moment. Les modifications ne s'appliquent qu'aux nouvelles
          souscriptions postérieures à leur publication. Les Clients ayant
          souscrit avant la date de modification conservent le bénéfice des
          conditions en vigueur à la date de leur souscription pour toute la
          durée de leur abonnement actif. En cas de modification substantielle
          des CGV, les Clients existants sont informés par email au moins trente
          (30) jours avant la prise d'effet à leur égard, et peuvent résilier
          sans frais s'ils refusent d'y être soumis.
        </p>
        <p>
          <strong className="text-primary">Droit applicable :</strong> les
          présentes CGV sont régies par le droit français.
        </p>
        <p>
          <strong className="text-primary">Juridiction compétente :</strong>{" "}
          tout litige relatif à la formation, à l'exécution, à l'interprétation
          ou à la résiliation des présentes CGV fait préalablement l'objet d'une
          tentative de résolution amiable entre les Parties. À défaut d'accord
          dans un délai de trente (30) jours à compter de la première
          notification écrite, le litige sera soumis aux{" "}
          <strong className="text-primary">
            tribunaux compétents du ressort de Paris
          </strong>
          , siège du Prestataire, nonobstant pluralité de défendeurs ou appel en
          garantie. S'agissant de prestations B2B, le Prestataire n'est pas tenu
          d'adhérer à un dispositif de médiation de la consommation (article
          L.612-1 du Code de la consommation).
        </p>
      </div>
    ),
  },
];

export default function CgvPage() {
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
            {"// conditions_générales_de_vente()"}
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Conditions Générales de Vente
          </h1>
          <p className="text-secondary text-base sm:text-lg leading-relaxed">
            Conditions applicables aux prestations B2B fournies par{" "}
            {LEGAL.legalName}, en vigueur au{" "}
            <time dateTime={LEGAL.lastUpdated}>
              {new Date(LEGAL.lastUpdated).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            . Article L.441-1 du Code de commerce, droit français.
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
                  Une question sur les CGV ?
                </h2>
                <p className="text-secondary leading-relaxed mb-4">
                  Pour toute question d'interprétation, demande d'avenant ou
                  négociation de conditions particulières (engagement annuel,
                  volumes hors-norme, sous-traitance), contacte-moi directement.
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
            . {LEGAL.legalName}, {LEGAL.status}, SIRET {LEGAL.siret}.
          </p>
        </div>
      </section>
    </main>
  );
}
