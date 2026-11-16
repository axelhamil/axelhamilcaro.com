# Repositionnement builder et MCP conversationnel

**Date** : 2026-11-16
**Statut** : brouillon, en attente de validation d'Axel
**Branche** : `feat/builder-repositioning`

## 1. Intention

Le site présente Axel comme un freelance qui a des side projects. Il veut l'inverse : un builder qui construit en public (API, briques de fondation, outils pour agents) et qui accepte quelques missions choisies. Il en a assez des projets clients subis ; la porte client reste ouverte, mais petite et filtrante.

Le public visé n'est pas technique : fondateurs, PO, gens du produit. Le serveur MCP du site devient le moyen de « discuter avec Axel sans réserver de créneau » : le prospect branche le MCP dans son propre agent (Claude, ChatGPT, Cursor), et le MCP guide cet agent pour mener la conversation comme Axel le ferait, jusqu'à une estimation honnête de son projet. Retour reçu d'une PO : la section MCP actuelle parle du protocole, pas du bénéfice ; « estimer un projet comme si je te parlais, sans te parler » est ce qui l'intéresse.

## 2. Objectifs, non-objectifs, anti-objectifs

Objectifs
- Un visiteur comprend en 5 secondes : il construit des choses intéressantes, en public ; puis, en bas de page : il prend quelques projets choisis.
- Le MCP mène une découverte de projet complète et produit une estimation fondée sur la grille d'Axel, avec hypothèses, exclusions et questions.
- Un humain non technique comprend la section MCP et sait la brancher en moins d'une minute.

Non-objectifs
- Pas de chat intégré au site (lot ultérieur éventuel ; coût LLM).
- Pas de refonte visuelle : la DA actuelle (crème, noir, jaune, brutaliste) reste.
- Pas de suppression des pages `/services`, `/tma`, `/portfolio/*`, des avis Malt ni du blog : elles gardent leur SEO, seule la home les met en retrait.

Anti-objectifs (échec même si ça marche)
- Une estimation qu'Axel ne signerait pas : chiffres génériques, fourchette trop étroite, promesse de date.
- Un MCP qui chiffre par LLM : non reproductible, change avec la formulation.
- Un récap envoyé à Axel sans accord explicite du prospect.
- Une home qui redevient une vitrine de prestataire.

## 3. Contraintes

- Conventions de `CLAUDE.md` : strates `app → features → entities → shared → backend`, texte à la 1re personne dans le visible et à la 3e dans MCP, JSON-LD et llms ; pas de tiret cadratin ; `fullstack` en un mot ; DA dans `app/global.css`.
- `IDENTITY_TITLE` (« Axel Hamilcaro, développeur fullstack et builder ») est l'identité canonique SEO/GEO (JSON-LD, llms, MCP). Elle reste ; c'est l'accroche et l'ordre de la home qui changent.
- Tous les prix à 500 € HT par jour. Hébergement toujours au nom du client. Aucun client cité de façon identifiable hors cas déjà publiés.
- Biais d'estimation connus d'Axel (ICM `preferences`) : pas de plancher d'une demi-journée par petite tâche, pas de marge empilée sur chaque ligne, recette comptée une fois, l'UI pèse environ 80 % d'une refonte d'écrans.
- Le MCP doit marcher chez des clients qui ne gèrent ni elicitation ni sampling (support inégal en 2026).

## 4. Approches considérées

Pour l'estimation :
- **A. L'agent du prospect découpe, le serveur chiffre de façon déterministe** (retenue). L'agent traduit la conversation en fonctionnalités d'un catalogue fermé ; le serveur calcule la fourchette avec la grille d'Axel. Reproductible, testable, zéro coût LLM. C'est la recommandation de la littérature 2025-2026 (un LLM qui chiffre lui-même varie selon le format de la demande, ACM 2025).
- B. Le serveur appelle un LLM qui chiffre : écartée (coût, non reproductible, le chiffre n'est plus celui d'Axel).
- C. Questionnaire à cases : écartée (rigide, ressemble aux calculateurs d'agence, n'utilise pas le MCP).

Pour l'accès : le prospect branche le MCP dans son agent (choix d'Axel). Chat intégré au site écarté pour ce lot.

Axel a demandé « utilise le MCP à fond » : instructions serveur, prompts, resources, tools et elicitation travaillent ensemble pour guider l'agent.

## 5. Lots

Ordre : lot 1, puis lot 2, puis lot 3. Une PR par lot.

### Lot 1 : home recentrée builder

- **Hero** (`hero-left.tsx`, `THESIS` dans `site.constants.ts`) : le H1 reste l'identité canonique. L'accroche « Je ship ce qui sert vraiment le business » est remplacée par une phrase builder, proposée : « Je construis des API et des outils sur lesquels d'autres bâtissent, et je le fais en public. » Le paragraphe garde la thèse (fournir l'outil et la donnée), retire « Je prends toujours des projets en freelance » et ramène Eskimoz à une mention discrète. Une ligne sous les CTA : « J'accepte quelques projets choisis par trimestre » avec lien vers la section du bas.
- **CTA** : primaire « Voir ce que je construis » ; secondaire « Suivre mes builds » (GitHub et LinkedIn de `SOCIAL_LINKS`) à la place de « Travailler avec moi ».
- **Stats** : des chiffres cohérents entre eux et orientés builder. « 20+ applications livrées » et « 5+ ans » contredisent « freelance depuis fin 2024 » et « 4 produits de zéro à la prod » ; remplacer par des faits vérifiables (builds publics, requêtes servies par le MCP si mesurées, années depuis 2021 explicitées).
- **Projets** (`case-studies.tsx`, `projects.ts`) : les builds d'abord (Weathertop, Afterlive, OpenUp, CleanStack, inwire, le MCP), chacun avec statut, dernière mise à jour et prochaine étape ; les missions clients réduites à 2 études de cas fortes (ScormPilot, Billetterie) présentées comme « construit pour d'autres ». Retirer la mise en avant des « 17 étoiles ».
- **Section « En ce moment »** : journal court et daté de ce qu'Axel construit (3 à 5 entrées), alimenté par un fichier de config ou les articles MDX ; c'est le signal build in public qui manque.
- **Ordre de la home** (`app/(site)/page.tsx`) : hero, builds, en ce moment, méthode (`approach.tsx`), MCP, parcours, puis en bas « Travailler avec moi » (filtrant : ce qu'il prend, ce qu'il refuse, lien `/services`), avis, FAQ. `tech-stack.tsx` fusionné ou retiré si redondant avec le ruban.
- **Section « Travailler avec moi »** (`what-i-do.tsx`) : passe de 5 offres de prestataire à une section qui filtre. Prend : API, data, briques pour agents IA, produits partis de zéro, lead tech à temps partiel. Refuse : sites vitrines, régie, maintenance de legacy sans refonte. Rappelle qu'on peut estimer son projet via le MCP.
- Metadata, JSON-LD et `llms*.txt` mis à jour si l'accroche ou la thèse y figurent.

### Lot 2 : MCP qui mène la conversation

Tout reste dans `src/backend/mcp/`, version serveur montée (1.2.0).

- **Instructions serveur** : posture d'Axel transmise à l'agent. Mener une découverte avant tout chiffre, une question à la fois, en langage non technique ; citer les projets réels d'Axel comme références ; ne jamais promettre de date ferme ni de prix ferme ; dire ce qu'Axel ne prend pas ; présenter l'estimation comme non contractuelle ; ne rien envoyer sans accord.
- **Prompt `discuss_project`** (nouveau, point d'entrée recommandé) : la trame de découverte d'Axel. Qui utilise le produit, quel problème, ce qui existe déjà, plateformes (web, mobile), fonctionnalités clés, intégrations (paiement, emails, outils tiers), données existantes, échéance, budget envisagé. Puis reformulation et découpage en lots validés par le prospect, appel de `estimate_project`, présentation, proposition d'envoi du récap. Remplace `formalize_need` ; `draft_outreach` et `compare_stack` restent si encore utiles, sinon retirés.
- **Resources** (nouvelles, avec description) : `site://method` (comment Axel travaille et découpe), `site://estimation-grid` (le catalogue et ses fourchettes, public et lisible), `site://references` (projets passés comparables avec durée réelle : Billetterie en 1 mois, etc.). Les 8 sections existantes restent et reçoivent une description.
- **Tool `estimate_project`** (nouveau, lecture seule, sans état) :
  - Entrée validée par Zod : liste de fonctionnalités prises dans un enum fermé (auth, comptes multi-tenant, paiement et abonnement, back-office, temps réel, notifications, upload et fichiers, recherche, intégration tierce, app mobile, import de données, etc.), chacune avec une taille (`simple`, `standard`, `complex`) ; plateformes ; niveau de flou du brief (nombre de questions restées ouvertes) ; existant (zéro, reprise de code).
  - Calcul déterministe : chaque entrée de grille porte une fourchette basse, probable, haute en jours ; agrégation trois points (PERT) par lot ; total élargi selon le flou du brief (au moins ×0,5 à ×2 autour de la médiane au stade brief, resserré quand les questions sont répondues) ; socle commun (setup, déploiement, recette) compté une seule fois.
  - Sortie : fourchette en jours et en euros HT (basse, probable, haute) par lot et au total ; hypothèses ; exclusions (stores, hébergement au nom du client, abonnements tiers, maintenance, TVA) ; les 3 questions qui feraient le plus bouger le chiffre ; références de projets comparables ; mention non contractuelle. Fonctionnalité hors catalogue : listée comme « à chiffrer par Axel », jamais inventée.
  - Elicitation en mode `form` (3 à 5 champs) seulement si le client déclare la capacité ; sinon l'outil répond quand même avec hypothèses et questions.
- **Tool `send_project_brief`** (nouveau, écriture) : n'est appelé qu'après accord explicite du prospect, avec son email ; enregistre le récap (besoin, lots, estimation, réponses) comme lead via le slug `mcp-inquiry` déjà réservé dans `form.service.ts` et `lead.controller.ts`, et prévient Axel par Resend. Limité en débit comme `audit_architecture_brief`. La phrase « Il n'envoie pas de lead » disparaît du site et des mentions légales sont vérifiées.
- **Outils existants** : `generate_custom_proposal` et ses délais fixes (« MVP 4 to 8 weeks ») sont retirés au profit de `estimate_project`. `audit_architecture_brief` reste, présenté comme un outil technique secondaire. `list_projects` reste.
- **Grille et calibration** : la grille vit dans un fichier de config typé. Avant publication, des tests rejouent les projets passés d'Axel (description reconstituée, durée réelle connue) et vérifient que la durée réelle tombe dans la fourchette basse-haute. Sans ce test vert, l'outil ne sort pas.
- Discovery (`.well-known`, server card, catalog, `llms*.txt`) mis à jour avec les nouveaux tools, prompts et resources.

### Lot 3 : section MCP pour les gens du produit

- **Home** (`home-mcp.tsx`) : titre et texte centrés sur le bénéfice, par exemple « Estime ton projet comme si tu m'en parlais ». Trois étapes : brancher, raconter son projet, recevoir une fourchette et décider d'envoyer le récap. Le mot MCP reste, en second plan, pour les agents et les curieux.
- **Brancher en une minute** : un bloc par client (Claude : connecteur personnalisé avec l'URL ; ChatGPT : connecteur ; Cursor et Claude Code : commande ou JSON), bouton copier l'URL, et une phrase d'amorce à copier (« Utilise le prompt discuss_project d'Axel pour estimer mon projet »).
- **Lisible par un humain et par une IA** : le texte visible dit la même chose que le manifeste et `llms.txt` ; le bloc terminal reste comme détail technique.
- `/about#mcp` et la FAQ home alignés sur ce discours.

## 6. Décidé par Axel

- Positionnement builder d'abord, freelance en retrait mais pas fermé.
- Approche « le MCP guide l'agent comme une discussion avec Axel », utilisé à fond.
- Outil d'estimation réel (pas un simple texte honnête).
- Accès via le MCP branché dans l'agent du prospect, pas de chat intégré.

## 7. Laissé au builder (proposé, à corriger par Axel)

- Les formulations exactes (hero, section MCP, travailler avec moi), à valider par Axel avant merge.
- La liste précise des fonctionnalités du catalogue et la forme du calcul, tant qu'il est déterministe et testé.
- L'envoi du récap sous accord explicite (proposé par Claude, non contesté).
- Le sort de `compare_stack`, `draft_outreach` et `tech-stack.tsx`.

### Tranché après relecture (choix de Claude, à corriger)

- Grille à gros grain : 12 à 18 fonctionnalités, chacune en 3 tailles. Une grille fine donnerait une fausse précision sur un brief flou.
- `send_project_brief` : email obligatoire, nom et société facultatifs, consentement booléen obligatoire à `true`. Rétention de 12 mois, mention ajoutée dans les mentions légales (à côté de l'empreinte visiteur MCP déjà décrite). La télémétrie existante ne journalise ni l'email ni le récap.
- Stats de la home : le nombre de requêtes MCP est lu côté serveur avec revalidation quotidienne, pas en direct. « 5+ ans de métier » sort de la home et reste sur `/about`.
- `generate_custom_proposal` est retiré sans redirection : la liste d'outils change, et les clients MCP la relisent (`listChanged`). Les tests qui le citent sont mis à jour.
- Hors périmètre (site vitrine, régie) : l'outil ne chiffre pas, il dit qu'Axel ne prend pas ce type de projet et renvoie vers `/services` ou un autre prestataire.
- Budget annoncé : il est comparé à la fourchette ; en cas d'écart, l'outil le signale et propose un découpage qui tient dans le budget (lot 1 seul, par exemple), sans baisser les chiffres.
- « En ce moment » : fichier de config typé ; section masquée tant qu'il est vide ; aucune entrée inventée.

### Réponses d'Axel au relecteur

- Durées réelles : chaque projet de référence (Billetterie, ScormPilot, HomeCafé, MentorTroc) a pris entre 1 et 3 mois. Le test de calibration vérifie donc que la description reconstituée de chacun produit une fourchette qui recoupe 20 à 65 jours ouvrés. C'est une vérification lâche, pas une preuve de précision ; l'outil le dit dans ses hypothèses, et chaque nouveau projet livré vient resserrer la grille.
- Les projets peuvent être nommés (HomeCafé, MentorTroc, sites artisans compris). Règle absolue : Eskimoz et Weathertop ne sont jamais associés, nulle part (texte, resources MCP, JSON-LD, llms, références d'estimation). Un test le vérifie sur les sorties MCP et les fichiers `llms*.txt`.
- L'outil d'estimation sort activé dès le lot 2, la vérification lâche ci-dessus faisant office de garde-fou.

## 8. Ouvert, à fournir par Axel

- Les fourchettes de jours de la grille : un premier jet est dérivé de ses projets, il les valide dans la PR du lot 2.
- Les entrées de la section « En ce moment » : Axel construit en ce moment Weathertop et Afterlive. Le builder rédige une entrée datée par projet (où il en est, prochaine étape) à partir des fiches de `projects.ts`, sans rien inventer et sans mentionner Eskimoz près de Weathertop ; Axel les valide dans la PR du lot 1. La structure accepte d'autres entrées plus tard.
