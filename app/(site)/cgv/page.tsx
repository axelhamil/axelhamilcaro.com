import type { Metadata } from "next";
import { LEGAL_ENTITY, RATES } from "@/app/_config/site.constants";
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
  lastUpdated: "2026-10-05",
} as const;

export const metadata: Metadata = buildPageMetadata({
  title: "CGV : conditions générales de vente B2B",
  description:
    "CGV des prestations B2B d'Axel Hamilcaro : forfaits de TMA PRO et PREMIUM et missions freelance, selon l'article L.441-1 du Code de commerce.",
  path: "/cgv",
});

const breadcrumbSchema = buildBreadcrumbListSchema([
  { name: "Accueil", url: "/" },
  { name: "CGV", url: "/cgv" },
]);

const SECTIONS: LegalSection[] = [
  {
    title: "1. Préambule et identification",
    body: (
      <>
        <p>
          Les présentes conditions générales de vente (ci-après « CGV ») sont
          conclues entre :
        </p>
        <ul>
          <li>
            <strong>{LEGAL.legalName}</strong>, entrepreneur individuel exerçant
            en micro-entreprise, immatriculé sous le numéro SIRET {LEGAL.siret},
            dont le siège est situé {LEGAL.address} (ci-après le «{" "}
            <strong>Prestataire</strong> »),
          </li>
          <li>
            et toute personne morale ou physique agissant à des fins
            professionnelles souscrivant à l'une des prestations proposées
            (ci-après le « <strong>Client</strong> »).
          </li>
        </ul>
        <p>
          Les prestations objet des présentes sont proposées{" "}
          <strong>exclusivement à des Clients professionnels (B2B)</strong>.
          Toute souscription par un consommateur au sens du Code de la
          consommation est exclue. Les CGV sont communiquées au Client
          préalablement à la conclusion du contrat, conformément à l'article
          L.441-1 du Code de commerce.
        </p>
      </>
    ),
  },
  {
    title: "2. Définitions",
    body: (
      <dl className="legal-definitions">
        <div>
          <dt>Services : </dt>
          <dd>
            ensemble des prestations de Tierce Maintenance Applicative (TMA),
            missions ponctuelles ou accompagnement freelance fournies par le
            Prestataire au Client.
          </dd>
        </div>
        <div>
          <dt>Forfait : </dt>
          <dd>
            offre récurrente mensuelle PRO ou PREMIUM décrite sur la page{" "}
            <a href="/tma" className="link-underline">
              /tma
            </a>{" "}
            du site, comprenant un volume d'heures incluses et un périmètre
            d'intervention.
          </dd>
        </div>
        <div>
          <dt>Ticket : </dt>
          <dd>
            demande d'intervention transmise par le Client au Prestataire via le
            canal de communication défini lors de l'onboarding.
          </dd>
        </div>
        <div>
          <dt>Heures consommées : </dt>
          <dd>
            temps d'intervention décompté sur le Forfait, par tranches de 30
            minutes arrondies au plus bas, avec un minimum de 30 minutes par
            Ticket.
          </dd>
        </div>
        <div>
          <dt>Heures ouvrées : </dt>
          <dd>
            du lundi au vendredi, hors jours fériés français, de 9h à 18h (heure
            de Paris).
          </dd>
        </div>
      </dl>
    ),
  },
  {
    title: "3. Objet et description des prestations",
    body: (
      <>
        <p>
          Les présentes CGV régissent les conditions d'exécution et de
          facturation de l'ensemble des Services proposés par le Prestataire :
        </p>
        <ul>
          <li>
            <strong>Forfaits TMA mensuels</strong> (PRO et PREMIUM) :
            maintenance applicative récurrente d'une application web ou mobile
            en production, comprenant correctifs, mises à jour, support
            technique et, pour le forfait PREMIUM, monitoring proactif et
            livrables récurrents. Détails complets sur la page{" "}
            <a href="/tma" className="link-underline">
              /tma
            </a>
            , qui constitue un élément contractuel des présentes.
          </li>
          <li>
            <strong>Développement de projet au forfait</strong> : création
            d'application from scratch (MVP, SaaS, plateforme, application
            mobile), refonte complète, développement de modules métier
            conséquents. Chaque mission fait l'objet d'un devis et d'un contrat
            de prestation spécifique incluant cahier des charges, calendrier,
            jalons de livraison, conditions de recette et modalités de paiement
            échelonné.
          </li>
          <li>
            <strong>Régie et accompagnement</strong> : prestation de
            développement au temps passé sur un projet existant (renfort
            d'équipe, sprint dédié, lead tech à temps partagé, consulting
            technique), facturée au TJM ou au taux horaire négocié au devis.
          </li>
          <li>
            <strong>Missions ponctuelles</strong> : audit technique, intégration
            tierce, mise en place d'infrastructure, optimisation performance,
            traitées sur devis distinct.
          </li>
        </ul>
        <p>
          <strong>Articulation avec les présentes CGV :</strong> pour les
          missions de développement au forfait, de régie et les missions
          ponctuelles, des conditions spécifiques (calendrier précis, livrables,
          jalons, conditions de recette, cession de propriété intellectuelle
          adaptée) sont définies dans le devis ou contrat propre à chaque
          mission. Ces conditions spécifiques complètent les présentes CGV et
          prévalent sur celles-ci en cas de contradiction.
        </p>
      </>
    ),
  },
  {
    title: "4. Souscription, durée et reconduction",
    body: (
      <>
        <p>
          La souscription à un Forfait s'effectue exclusivement via le lien de
          paiement Stripe (« Stripe Payment Link ») accessible depuis la page{" "}
          <a href="/tma" className="link-underline">
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
      </>
    ),
  },
  {
    title: "5. Tarifs, facturation et paiement",
    body: (
      <>
        <p>
          Les tarifs des Forfaits sont indiqués hors taxes sur la page{" "}
          <a href="/tma" className="link-underline">
            /tma
          </a>{" "}
          et applicables à la date de souscription. À titre informatif :
        </p>
        <ul>
          <li>{`Forfait TMA PRO : ${RATES.tma.proMonthlyEur} € HT / mois (5h incluses)`}</li>
          <li>
            {`Forfait TMA PREMIUM : ${RATES.tma.premiumMonthlyEur} € HT / mois (10h incluses)`}
          </li>
          <li>
            {`Heure supplémentaire hors-forfait : ${RATES.tma.overflowHourlyEur} € HT / h, sur accord écrit préalable`}
          </li>
          <li>
            Missions de développement au forfait, régie et missions ponctuelles
            : tarif précisé au devis, validé par le Client avant démarrage
          </li>
        </ul>
        <p>
          <strong>Régime de TVA :</strong> {LEGAL.vatStatus}. Aucune TVA n'est
          appliquée aux factures émises.
        </p>
        <p>
          La facturation est mensuelle, prélevée automatiquement par Stripe à
          chaque date anniversaire de souscription. La facture est transmise au
          Client par email à l'issue de chaque prélèvement et reste accessible
          depuis le Stripe Customer Portal.
        </p>
        <p>
          <strong>Défaut de paiement :</strong> en cas d'échec de prélèvement,
          le Prestataire adresse au Client une mise en demeure par email. À
          défaut de régularisation dans un délai de sept (7) jours, les Services
          peuvent être suspendus de plein droit (article 11). Conformément à
          l'article L.441-10 du Code de commerce, tout retard de paiement
          entraîne de plein droit l'exigibilité d'une indemnité forfaitaire pour
          frais de recouvrement de quarante (40) euros, ainsi que d'intérêts de
          retard au taux légal majoré de dix (10) points de pourcentage.
        </p>
      </>
    ),
  },
  {
    title: "6. Modalités d'exécution",
    body: (
      <>
        <p>
          <strong>Heures d'intervention :</strong> les Services sont rendus en
          Heures ouvrées (du lundi au vendredi, hors jours fériés français).
          Aucune astreinte de nuit, week-end ou jour férié n'est incluse, sauf
          disposition contraire négociée séparément.
        </p>
        <p>
          <strong>Délais de prise en compte :</strong>{" "}
        </p>
        <ul>
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
          <strong>Décompte des Heures consommées :</strong> par tranches de 30
          minutes arrondies au plus bas, avec un minimum de 30 minutes par
          Ticket. Le suivi des Heures consommées est tenu par le Prestataire et
          partagé avec le Client dès qu'au moins 80 % du Forfait mensuel est
          consommé.
        </p>
        <p>
          <strong>Heures non utilisées :</strong> les Heures non consommées au
          terme d'un mois ne sont pas reportées sur le mois suivant.
        </p>
        <p>
          <strong>Canal de communication :</strong> défini d'un commun accord
          lors de l'onboarding (email, messagerie professionnelle ou plateforme
          dédiée).
        </p>
      </>
    ),
  },
  {
    title: "7. Obligations du Client",
    body: (
      <>
        <p>Le Client s'engage à :</p>
        <ul>
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
      </>
    ),
  },
  {
    title: "8. Obligations du Prestataire",
    body: (
      <>
        <p>Le Prestataire s'engage à :</p>
        <ul>
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
          Le Prestataire est tenu à une <strong>obligation de moyens</strong> et
          non de résultat, sauf disposition expresse contraire. Le Prestataire
          ne saurait être tenu pour responsable des dysfonctionnements
          imputables au code antérieur à son intervention, aux services tiers
          utilisés par l'application, ou aux choix techniques imposés par le
          Client.
        </p>
      </>
    ),
  },
  {
    title: "9. Changement de Forfait",
    body: (
      <>
        <p>
          Le Client peut demander un changement de Forfait à tout moment, par
          écrit (email).
        </p>
        <p>
          <strong>Upgrade (PRO → PREMIUM) :</strong> bascule immédiate au
          prorata temporis pour la période en cours. Le Client s'acquitte de la
          différence tarifaire au prorata. La mise en place des outils
          additionnels du Forfait PREMIUM (monitoring, status page, canal dédié)
          intervient au début de la période mensuelle complète suivante.
        </p>
        <p>
          <strong>Downgrade (PREMIUM → PRO) :</strong> la bascule prend effet au
          terme de la période mensuelle en cours. Aucun remboursement au prorata
          n'est dû.
        </p>
        <p>
          Tout changement de Forfait fait l'objet d'une confirmation écrite du
          Prestataire avant prise d'effet.
        </p>
      </>
    ),
  },
  {
    title: "10. Suspension des Services",
    body: (
      <>
        <p>Le Prestataire peut suspendre l'exécution des Services :</p>
        <ul>
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
      </>
    ),
  },
  {
    title: "11. Résiliation et réversibilité",
    body: (
      <>
        <p>
          <strong>Résiliation à l'initiative du Client :</strong> le Client peut
          résilier son abonnement à tout moment, sans frais et sans motivation,
          depuis le Stripe Customer Portal accessible via le lien présent sur
          ses factures. La résiliation prend effet au terme de la période
          mensuelle déjà payée.
        </p>
        <p>
          <strong>Résiliation à l'initiative du Prestataire :</strong> le
          Prestataire peut résilier le contrat avec un préavis de trente (30)
          jours notifié par email, sans motivation. En cas de manquement grave
          du Client (impayés persistants, comportement abusif), la résiliation
          peut intervenir sans préavis.
        </p>
        <p>
          <strong>Réversibilité (handover) :</strong> à la résiliation, le
          Prestataire s'engage à remettre au Client, dans un délai de quinze
          (15) jours, un dossier de passation comprenant : la liste des accès
          transférés ou révoqués, la documentation des interventions du dernier
          mois, l'état des chantiers en cours, les références des outils tiers
          provisionnés au nom du Client.
        </p>
      </>
    ),
  },
  {
    title: "12. Responsabilité et force majeure",
    body: (
      <>
        <p>
          <strong>Obligation de moyens :</strong> la responsabilité du
          Prestataire ne peut être engagée que pour les dommages directs et
          prévisibles résultant d'une faute prouvée dans l'exécution des
          Services.
        </p>
        <p>
          <strong>Plafond de responsabilité :</strong> la responsabilité cumulée
          du Prestataire au titre des présentes, tous chefs de préjudice
          confondus, est expressément limitée au montant total hors taxes
          effectivement payé par le Client au titre des trois (3) derniers mois
          précédant le fait générateur du dommage.
        </p>
        <p>
          <strong>Exclusions :</strong> sont expressément exclus de la
          responsabilité du Prestataire les dommages indirects, immatériels ou
          consécutifs, notamment la perte d'exploitation, la perte de chiffre
          d'affaires, la perte de clientèle, la perte de données (sauf preuve
          d'une faute caractérisée du Prestataire) ou toute atteinte à l'image
          du Client.
        </p>
        <p>
          <strong>Force majeure :</strong> aucune des Parties ne pourra être
          tenue pour responsable d'un manquement à ses obligations résultant
          d'un cas de force majeure au sens de l'article 1218 du Code civil
          (panne d'infrastructure tiers d'ampleur, cyberattaque, événement
          climatique majeur, indisponibilité médicale, etc.). La Partie empêchée
          en informe l'autre dans les meilleurs délais.
        </p>
      </>
    ),
  },
  {
    title: "13. Confidentialité et données personnelles",
    body: (
      <>
        <p>
          <strong>Confidentialité :</strong> chaque Partie s'engage à conserver
          strictement confidentielles toutes les informations à caractère
          commercial, technique ou stratégique dont elle aurait connaissance
          dans le cadre des Services. Cet engagement de confidentialité produit
          ses effets pendant toute la durée du contrat et trois (3) ans après
          son terme.
        </p>
        <p>
          <strong>Données personnelles (RGPD) :</strong> dans le cadre des
          Services, le Prestataire peut être amené à traiter des données
          personnelles dont le Client est responsable de traitement. Le
          Prestataire agit en qualité de sous-traitant au sens du RGPD. Aucune
          copie de données n'est conservée sur l'infrastructure personnelle du
          Prestataire au-delà de la durée strictement nécessaire à
          l'intervention. Les accès aux données sont révoqués sans délai à la
          résiliation.
        </p>
        <p>
          Les modalités complètes de traitement des données personnelles du
          Client en tant que prospect ou cocontractant sont décrites dans la
          section dédiée des{" "}
          <a href="/mentions-legales" className="link-underline">
            mentions légales
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "14. Propriété intellectuelle",
    body: (
      <>
        <p>
          <strong>Code livré au Client :</strong> tout code source,
          configuration ou contenu produit spécifiquement pour le Client dans le
          cadre des Services lui est cédé, à compter de son intégration dans le
          dépôt du Client et sous réserve du paiement intégral des sommes dues.
          La cession porte sur les droits de reproduction, de représentation,
          d'adaptation, de modification et de correction, pour toute
          exploitation, y compris commerciale, sur tout support, pour le monde
          entier et pour toute la durée légale de protection des droits
          d'auteur. Son prix est compris dans celui des Services.
        </p>
        <p>
          <strong>Savoir-faire et outils du Prestataire :</strong> les méthodes,
          outils internes, scripts génériques, templates et savoir-faire
          préexistants du Prestataire restent sa propriété exclusive et ne sont
          pas cédés au Client.
        </p>
        <p>
          <strong>Référencement :</strong> sauf mention contraire écrite du
          Client, le Prestataire se réserve le droit de mentionner le nom du
          Client et la nature non confidentielle de la mission dans ses
          références commerciales (portfolio, profils professionnels,
          propositions commerciales).
        </p>
      </>
    ),
  },
  {
    title: "15. Modifications, droit applicable et juridiction",
    body: (
      <>
        <p>
          <strong>Modifications des CGV :</strong> le Prestataire se réserve le
          droit de modifier les présentes CGV à tout moment. Les modifications
          ne s'appliquent qu'aux nouvelles souscriptions postérieures à leur
          publication. Les Clients ayant souscrit avant la date de modification
          conservent le bénéfice des conditions en vigueur à la date de leur
          souscription pour toute la durée de leur abonnement actif. En cas de
          modification substantielle des CGV, les Clients existants sont
          informés par email au moins trente (30) jours avant la prise d'effet à
          leur égard, et peuvent résilier sans frais s'ils refusent d'y être
          soumis.
        </p>
        <p>
          <strong>Droit applicable :</strong> les présentes CGV sont régies par
          le droit français.
        </p>
        <p>
          <strong>Juridiction compétente :</strong> tout litige relatif à la
          formation, à l'exécution, à l'interprétation ou à la résiliation des
          présentes CGV fait préalablement l'objet d'une tentative de résolution
          amiable entre les Parties. À défaut d'accord dans un délai de trente
          (30) jours à compter de la première notification écrite, le litige
          sera soumis aux{" "}
          <strong>tribunaux compétents du ressort de Paris</strong>, siège du
          Prestataire, nonobstant pluralité de défendeurs ou appel en garantie.
          S'agissant de prestations B2B, le Prestataire n'est pas tenu d'adhérer
          à un dispositif de médiation de la consommation (article L.612-1 du
          Code de la consommation).
        </p>
      </>
    ),
  },
];

export default function CgvPage() {
  return (
    <main>
      <JsonLdScript data={breadcrumbSchema} />

      <LegalHeader
        surtitre="Légal · Prestations B2B"
        title="Conditions Générales de Vente"
      >
        Conditions applicables aux prestations B2B fournies par{" "}
        {LEGAL.legalName}, en vigueur au{" "}
        <time dateTime={LEGAL.lastUpdated}>
          {formatLongDate(LEGAL.lastUpdated)}
        </time>
        . Article L.441-1 du Code de commerce, droit français.
      </LegalHeader>

      <LegalDocument sections={SECTIONS}>
        <aside
          aria-labelledby="legal-question"
          className="etiquette etiquette-carte etiquette-jaune legal-question"
        >
          <h2 id="legal-question" className="title-md">
            Une question sur les CGV ?
          </h2>
          <p>
            Pour toute question d'interprétation, demande d'avenant ou
            négociation de conditions particulières (engagement annuel, volumes
            hors-norme, sous-traitance), contacte-moi directement.
          </p>
          <LegalContactLink label="Me contacter" />
        </aside>

        <p className="label-mono ink-muted legal-maj">
          Dernière mise à jour : {formatLongDate(LEGAL.lastUpdated)}.{" "}
          {LEGAL.legalName}, {LEGAL.status}, SIRET {LEGAL.siret}.
        </p>
      </LegalDocument>
    </main>
  );
}
