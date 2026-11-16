# Lot 3 : section MCP pour les gens du produit, Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer la section MCP de la home et de `/about#mcp` par un discours bénéfice (« Estime ton projet comme si tu m'en parlais ») avec des blocs de branchement par client, un bouton copier et une phrase d'amorce qui cite `discuss_project`.

**Architecture:** Les textes de branchement vivent dans un fichier de config typé (`app/_config/mcp-clients.ts`). Un composant partagé `McpConnect` (serveur) les rend, avec un seul îlot client, `CopyButton`. `HomeMcp` et `AboutMcp` le composent chacun (aucun import latéral entre features). La FAQ home et son JSON-LD sortent du même tableau `items`, donc restent identiques mot pour mot.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind v4 (layout seulement), CSS global (`app/global.css`), Biome, tests `node:test` lancés par `node --import tsx --test`.

**Spec:** `docs/superpowers/specs/2026-11-16-builder-repositioning-design.md` (section 5, lot 3). Règles projet : `CLAUDE.md`. Dépend du lot 2 (prompt `discuss_project`, tools `estimate_project` et `send_project_brief`, URL `https://axelhamilcaro.com/mcp`) : ne pas démarrer avant que le lot 2 soit mergé dans la branche.

**Skills front chargés avant d'écrire (à recharger par l'exécutant) :** `frontend-design`, `lean-ui`, `redesign-existing-ui`. Règle de résolution : le design system du repo (DA « atelier d'expédition », tokens de `app/global.css`) prime sur leurs presets ; la spec interdit toute refonte visuelle. Retenus : markup minimal, `Button` du site pour tout cliquable, style uniquement par classes du CSS global, Tailwind pour le layout, `interface` pour les props, aucun style inline, FAQ et contenus dans le HTML servi (SEO/GEO d'abord), focus visible, `prefers-reduced-motion` respecté.

## Instructions de branchement vérifiées (novembre 2026)

Chaque entrée est la source de vérité des textes de la Task 1. Vérifié le 2026-11-16 ; une vérification de plus au moment de coder est demandée (Task 1, step 1) car l'interface des clients change vite.

- **Claude** (claude.ai, Desktop, mobile ; Free limité à 1 connecteur personnalisé). Source : https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp. Parcours Pro et Max : Customize > Connectors (claude.ai/customize/connectors), « + Add », « Add custom connector », nom, URL du serveur distant (avec son chemin), « Continue », Authentication « No sign in », « Add ». Activation par conversation : bouton « + » en bas à gauche, puis « Connectors ». Team et Enterprise : seul un Owner ajoute le connecteur (Organization settings > Connectors > Add > Custom > Web), puis chaque membre clique « Connect ». Claude se connecte depuis le cloud d'Anthropic, port 443 : l'URL publique `https://axelhamilcaro.com/mcp` convient.
- **ChatGPT** (web uniquement, pas mobile). Sources : https://help.openai.com/en/articles/12584461-connecting-custom-mcp-servers-in-chatgpt et https://developers.openai.com/plugins/deploy/connect-chatgpt. Parcours actuel : chatgpt.com/plugins, bouton plus, « Add custom MCP server », nom (description facultative), sous « Connection » l'URL HTTPS publique avec son `/mcp`, configurer l'authentification, cocher « I understand and want to continue », « Create as a plugin ». Usage : taper `@` dans le message et choisir le plugin. Plans : Business et Enterprise/Edu via l'admin ou les droits RBAC ; la FAQ OpenAI dit que Pro peut connecter des serveurs en lecture seule. Je n'ai pas pu confirmer Free et Plus : la note du bloc ne les nomme pas. Le mode développeur n'est plus requis dans ce parcours (il l'est dans l'ancien : Settings > Connectors > Advanced > Developer mode > Create).
- **Cursor**. Source : https://cursor.com/docs/mcp. Fichier `~/.cursor/mcp.json` (global) ou `.cursor/mcp.json` (projet), entrée distante `{"mcpServers": {"<nom>": {"url": "<url>"}}}` sans `type` (Streamable HTTP et SSE sont déduits de l'URL). Activation, désactivation et logs depuis « Customize » dans la barre latérale.
- **Claude Code**. Source : https://code.claude.com/docs/en/mcp. `claude mcp add --transport http <nom> <url>`, portée `--scope user` pour tous les projets (défaut : local, ce projet seulement). Vérifier avec `claude mcp list` ou `/mcp`. Une entrée JSON avec `url` sans `"type": "http"` est refusée : on donne la commande, pas le JSON.

## Global Constraints

- Conventions de `CLAUDE.md` : strates `app → features → entities → shared → backend` ; aucun import latéral entre features ; pas de barrel ; pas de commentaires ; imports `import type` ; fichiers kebab-case, composants PascalCase ; DA dans `app/global.css`, Tailwind pour le layout seulement.
- Texte visible à la 1re personne (le tutoiement du lecteur est la voix du site), JSON-LD, llms et ressources MCP à la 3e personne. `FAQPage` reprend mot pour mot la FAQ visible.
- Pas de tiret cadratin, demi-cadratin ni incise « - » dans le code, les textes, les docs.
- `fullstack` en un seul mot ; tous les prix à 500 € HT par jour ; hébergement toujours au nom du client.
- Règle absolue : Eskimoz et Weathertop ne sont jamais associés, nulle part. Cette section ne cite aucun des deux.
- Noms figés par le lot 2, à utiliser tels quels : prompt `discuss_project`, tools `estimate_project` et `send_project_brief`, URL `https://axelhamilcaro.com/mcp` (constante `MCP.url`).
- « Il n'envoie pas de lead » disparaît de tout le visible.
- Pas de refonte visuelle : crème, noir, jaune, brutaliste, radius 0, bordures 2px, ombres dures, aucun dégradé, deux thèmes (clair et sombre).
- Texte en français avec accents ; commits en Conventional Commits, un par tâche, signés, stagés fichier par fichier.
- Lancer les tests : `node --import tsx --test <fichiers>` (pas de script `test` dans `package.json`, `node:test` + `tsx`, alias `@/` résolu par le tsconfig).

## Review Focus

Entrées ou conditions que la spec implique sans qu'une tâche les exerce d'office, la plus probable d'abord. Chacune a son test ou sa preuve dans la tâche indiquée.

1. **Presse-papiers refusé ou absent** (navigateur sans `navigator.clipboard`, page en http, permission refusée, webview in-app) : le bouton ne doit pas mentir « Copié ». Il affiche « Copie bloquée, sélectionne le texte » et le texte reste sélectionnable d'un clic. Task 2, preuve en Chrome (Task 5).
2. **390 px** : l'adresse, la commande Claude Code et le JSON Cursor ne créent aucun défilement horizontal de la page ; le bloc de code défile dans sa boîte. Task 2 (CSS), preuve Task 5.
3. **Dérive de noms avec le serveur** : si le lot 2 renomme le prompt ou un tool, la phrase d'amorce copiée par des centaines de prospects devient fausse sans que personne le voie. Test de la Task 1 : le serveur expose bien `discuss_project`, `estimate_project`, `send_project_brief`.
4. **Chaînes interdites** (« Il n'envoie pas de lead », Eskimoz, Weathertop, tirets longs) qui reviennent par un copier-coller dans un composant ou la FAQ. Test de la Task 5 sur le HTML rendu des trois composants.
5. **Promesse trop large sur ChatGPT** : le bloc ne doit pas laisser croire que tout compte ChatGPT peut brancher le serveur ni que le récap partira de partout. La note du bloc dit web seulement, selon l'offre, et renvoie à mon email si l'envoi est bloqué. Relu en revue de textes (Task 5).

---

## File Structure

- Create `app/_config/mcp-clients.ts` : textes et commandes de branchement, phrase d'amorce, noms du prompt et des tools. Une seule source pour la home, `/about` et la FAQ.
- Create `app/_config/mcp-clients.test.ts` : cohérence config / serveur / `llms.txt`.
- Create `src/shared/ui/mcp/copy-button.tsx` : îlot client, copie un texte, trois états.
- Create `src/shared/ui/mcp/mcp-connect.tsx` : adresse + phrase d'amorce + grille des 4 clients (serveur).
- Modify `app/global.css` : classes `.mcp-connexion`, `.mcp-client`, `.mcp-code`, `.mcp-copiable`, `.mcp-etapes` près de `.terminal`.
- Modify `src/features/home/components/home-mcp.tsx`, `src/features/about/components/about-mcp.tsx`, `src/features/home/components/home-faq.tsx`.
- Create `app/(site)/mcp-section-copy.test.tsx` : chaînes interdites et contenu clé sur le HTML rendu.
- Modify `CLAUDE.md` : ajouter `mcp/` (copy-button, mcp-connect) dans la liste de `src/shared/ui/`.

---

### Task 1: Config de branchement et test de cohérence avec le serveur

**Files:**
- Create: `app/_config/mcp-clients.ts`
- Test: `app/_config/mcp-clients.test.ts`

**Interfaces:**
- Consumes: `MCP` (`app/_config/site.constants.ts`) ; le serveur du lot 2 via `POST` de `app/mcp/route` (même `jsonRpcPost` que `src/backend/mcp/mcp.handler.test.ts`) ; `public/llms.txt` mis à jour par le lot 2.
- Produces:
  ```ts
  export const MCP_PROMPT = "discuss_project";
  export const MCP_TOOLS = ["estimate_project", "send_project_brief"] as const;
  export const MCP_STARTER_PROMPT: string;
  export type McpClientId = "claude" | "chatgpt" | "cursor" | "claude-code";
  export interface McpClient {
    id: McpClientId;
    name: string;
    steps: string[];
    code?: string;
    note?: string;
  }
  export const MCP_CLIENTS: McpClient[];
  ```

- [ ] **Step 1: Revérifier les 4 sources de la section « Instructions de branchement »** (une page web chacune). Si un libellé de bouton a changé, corriger les `steps` ci-dessous avant d'aller plus loin et dire le changement dans la PR.

- [ ] **Step 2: Écrire le test qui échoue** dans `app/_config/mcp-clients.test.ts`

```ts
describe("MCP connection copy", () => {
  test("every address, command and snippet uses the one public MCP URL", () => {
    for (const client of MCP_CLIENTS) {
      const text = [...client.steps, client.code ?? ""].join("\n");
      assert.ok(client.code === undefined || client.code.includes(MCP.url));
      assert.doesNotMatch(text, /localhost|http:\/\//);
    }
    assert.equal(MCP.url, "https://axelhamilcaro.com/mcp");
  });

  test("the starter prompt names the discuss_project prompt and the estimate_project tool", () => {
    assert.match(MCP_STARTER_PROMPT, /discuss_project/);
    assert.match(MCP_STARTER_PROMPT, /estimate_project/);
  });

  test("the server really exposes the prompt and tools the copy names", async () => {
    const prompts = await listNames("prompts/list", "prompts");
    const tools = await listNames("tools/list", "tools");
    assert.ok(prompts.includes(MCP_PROMPT));
    for (const tool of MCP_TOOLS) assert.ok(tools.includes(tool));
  });

  test("llms.txt tells the same thing as the visible copy", () => {
    const llms = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf8");
    for (const name of [MCP_PROMPT, ...MCP_TOOLS]) assert.match(llms, new RegExp(name));
  });

  test("no connection text mentions the two names that must stay apart", () => {
    const text = JSON.stringify([MCP_CLIENTS, MCP_STARTER_PROMPT]);
    assert.doesNotMatch(text, /eskimoz|weathertop/i);
  });
});
```

`listNames(method, key)` : helper local du test qui poste `{ jsonrpc: "2.0", id: 1, method }` sur `POST` de `app/mcp/route` avec les headers de `mcp.handler.test.ts` (importer `./../../src/backend/mcp/mcp.test-env` comme lui), lit la réponse JSON (ou le 1er événement SSE si le handler répond en `text/event-stream`) et renvoie `result[key].map((item) => item.name)`. Si le serveur exige `initialize` avant `prompts/list`, faire comme les tests du lot 2.

- [ ] **Step 3: Lancer le test, vérifier l'échec**

Run: `node --import tsx --test app/_config/mcp-clients.test.ts`
Expected: FAIL, module `./mcp-clients` introuvable.

- [ ] **Step 4: Créer `app/_config/mcp-clients.ts`** avec exactement ces textes (l'adresse vient de `MCP.url`, jamais écrite en dur) :

`MCP_STARTER_PROMPT` : « Utilise le prompt discuss_project du serveur MCP d'Axel Hamilcaro pour estimer mon projet. Si tu ne vois pas les prompts, pose-moi ses questions une par une, puis appelle estimate_project. »

Claude, `name: "Claude"`, `steps` :
1. « Ouvre Customize, puis Connectors (claude.ai/customize/connectors). »
2. « Clique sur + Add, puis sur Add custom connector. »
3. « Nomme-le Axel Hamilcaro, colle l'adresse, clique sur Continue. »
4. « Choisis No sign in, puis clique sur Add. »
5. « Dans une conversation, active-le avec le bouton +, puis Connectors. »
`note` : « Sur Team et Enterprise, c'est un Owner qui l'ajoute, puis chacun clique sur Connect. »

ChatGPT, `name: "ChatGPT"`, `steps` :
1. « Ouvre chatgpt.com/plugins sur le web, pas sur mobile. »
2. « Clique sur le bouton plus, puis sur Add custom MCP server. »
3. « Donne un nom, colle l'adresse sous Connection, authentification : aucune. »
4. « Coche I understand and want to continue, puis clique sur Create as a plugin. »
5. « Dans un message, tape @ et choisis-le. »
`note` : « Disponible selon ton offre et les règles de ton espace. Si ton offre limite les serveurs MCP à la lecture, le récap ne part pas : écris-moi à la main. »

Cursor, `name: "Cursor"`, `steps` :
1. « Ouvre ~/.cursor/mcp.json, ou .cursor/mcp.json pour un seul projet. »
2. « Ajoute ce bloc. »
3. « Active le serveur dans Customize. »
`code` : le JSON `{ "mcpServers": { "axel-hamilcaro": { "url": "<MCP.url>" } } }` indenté sur 2 espaces, généré par `JSON.stringify(..., null, 2)`.

Claude Code, `name: "Claude Code"`, `steps` :
1. « Lance cette commande dans ton terminal. »
2. « Vérifie avec claude mcp list. »
`code` : `claude mcp add --transport http --scope user axel-hamilcaro <MCP.url>`.
`note` : « Sans --scope user, le serveur ne vaut que pour le dossier courant. »

- [ ] **Step 5: Relancer** `node --import tsx --test app/_config/mcp-clients.test.ts`. Expected: PASS (5 tests). Si le test 3 ou 4 échoue, c'est que le lot 2 n'est pas dans la branche : s'arrêter et le dire.

- [ ] **Step 6: Commit**

```bash
git add app/_config/mcp-clients.ts app/_config/mcp-clients.test.ts
git commit -m "feat(mcp): add per-client connection copy and its server consistency test"
```

---

### Task 2: Bouton copier et bloc de branchement partagé

**Files:**
- Create: `src/shared/ui/mcp/copy-button.tsx`
- Create: `src/shared/ui/mcp/mcp-connect.tsx`
- Modify: `app/global.css` (près de `.terminal-*`, ~l.1266)
- Modify: `CLAUDE.md` (liste `src/shared/ui/`)

**Interfaces:**
- Consumes: `MCP`, `MCP_CLIENTS`, `MCP_STARTER_PROMPT`, `McpClient` (Task 1) ; `Button` de `@/src/shared/ui/portfolio/button` (variant `secondary`, size `sm`).
- Produces:
  ```ts
  export interface CopyButtonProps { text: string; label: string }
  export function CopyButton(props: CopyButtonProps): JSX.Element
  export function McpConnect(): JSX.Element
  ```

- [ ] **Step 1: Implémenter `CopyButton`** (`"use client"`). État local `status: "idle" | "copied" | "failed"`. Au clic : `await navigator.clipboard.writeText(text)` dans un `try`, `copied` en cas de succès, `failed` dans le `catch` (y compris `navigator.clipboard` indéfini : l'appel lève, le `catch` l'absorbe). Retour à `idle` après 2000 ms. Rendu : `Button type="button" variant="secondary" size="sm"` ; libellés `label`, « Copié », « Copie bloquée, sélectionne le texte » ; un `<span aria-live="polite" className="sr-only">` annonce le changement ; classe `cible-tactile`.

- [ ] **Step 2: Implémenter `McpConnect`** (composant serveur, sans props). Structure : `<div className="mcp-connexion">` avec 1) ligne « Adresse du serveur » : `<code className="mcp-copiable mcp-adresse">{MCP.url}</code>` + `CopyButton text={MCP.url} label="Copier l'adresse"` ; 2) ligne « Phrase d'amorce » : `<p className="mcp-copiable">{MCP_STARTER_PROMPT}</p>` + `CopyButton text={MCP_STARTER_PROMPT} label="Copier la phrase"` ; 3) `<ul className="grille-cartes">` d'un `<li className="mcp-client">` par client : `h3` (nom), `<ol className="mcp-etapes">` des `steps`, `<pre className="mcp-code">` + `CopyButton label="Copier"` si `code`, `<p>` si `note`. Titre de bloc `h3` : « Brancher en une minute ». Pas de numérotation décorative hors des `ol` (le contenu est bien une séquence).

- [ ] **Step 3: CSS dans `app/global.css`**, tokens existants seulement (`--fond-2`, `--encre`, `--filet`, `--filet-fort`, `--ombre`, `--offset`) : `.mcp-connexion` (colonne, écart standard), `.mcp-client` (fond `--fond-2`, bordure 2px `--filet-fort`, radius 0, ombre dure comme `.etiquette-carte`), `.mcp-code` (Geist Mono, `overflow-x: auto`, `white-space: pre`, `max-width: 100%`), `.mcp-copiable` (`user-select: all`, `overflow-wrap: anywhere`), `.mcp-etapes` (liste numérotée, retrait lisible). Aucune couleur en dur, aucune variante `dark:`, aucun dégradé. Focus visible hérité de `.btn`.

- [ ] **Step 4: Vérifier** `pnpm lint` (aucune erreur Biome) et `pnpm exec tsc --noEmit` (sortie vide). Le rendu visuel est prouvé en Task 5 ; ajouter `mcp/` avec `copy-button, mcp-connect` à la liste `shared/ui` de `CLAUDE.md`.

- [ ] **Step 5: Commit**

```bash
git add src/shared/ui/mcp/copy-button.tsx src/shared/ui/mcp/mcp-connect.tsx app/global.css CLAUDE.md
git commit -m "feat(mcp): add the copy button and the per-client connection block"
```

---

### Task 3: Sections MCP de la home et de /about

**Files:**
- Modify: `src/features/home/components/home-mcp.tsx`
- Modify: `src/features/about/components/about-mcp.tsx`

**Interfaces:**
- Consumes: `McpConnect` (Task 2), `MCP` et `CONTACT`, `TerminalBlock`, `TransitionLink`, `Heading2`, `Paragraph`.
- Produces: `HomeMcp()` et `AboutMcp()`, mêmes noms d'export, mêmes `id="mcp"` et `aria-labelledby="mcp-title"` (l'ancre `/about#mcp` et le lien depuis la home restent valides).

- [ ] **Step 1: Réécrire `HomeMcp`** avec ces textes exacts :
  - Surtitre : « Discuter sans créneau ».
  - H2 : « Estime ton projet » `<br/>` `<span className="marqueur">comme si tu m'en parlais.</span>`
  - Intro forte (`<strong>`) : « Branche mon serveur dans ton assistant et raconte-lui ton projet : il te pose mes questions, une à la fois. »
  - Intro suite : « Tu repars avec une fourchette en jours et en euros HT, calculée avec ma grille de prix : la même description donne toujours le même chiffre. Ce n'est pas un devis, et rien ne m'est envoyé sans ton accord. »
  - Texte secondaire conservé : « C'est le genre de brique que j'aime fabriquer : on la branche, elle répond. »
  - Trois étapes en `<ol>` (titre court + une phrase) : « Branche » / « Ajoute l'adresse de mon serveur à Claude, ChatGPT, Cursor ou Claude Code. Compte une minute. » ; « Raconte » / « Colle la phrase d'amorce, puis réponds aux questions comme tu le ferais avec moi. » ; « Décide » / « Tu reçois la fourchette, ses hypothèses et ses questions ouvertes. Si tu veux, ton assistant m'envoie le récap. »
  - Puis `<McpConnect />`.
  - Détail technique dans un `<details>` dont le `<summary>` dit « Pour les curieux et les agents » : le `TerminalBlock` conservé avec ces lignes, `{ prefix: "POST", text: "/mcp" }`, `{ prefix: "→", text: "prompt discuss_project, tools estimate_project et send_project_brief" }` (valeurs tirées de `MCP_PROMPT` et `MCP_TOOLS`), `GET manifestPath → manifeste machine`, `GET llmsPath → catalogue texte`, et les liens Manifeste, llms.txt et « Détails techniques » vers `/about#mcp`. Le `<details>` garde son contenu dans le HTML servi.
  - Retirer « Il n'envoie pas de lead. » et « audit d'architecture déterministe » de l'intro.

- [ ] **Step 2: Réécrire `AboutMcp`** avec :
  - Surtitre : « Discuter avec moi ». H2 : « Parle-moi de ton projet » `<br/>` `<span className="marqueur">via ton assistant.</span>` Étiquette jaune : `{MCP.url}` (sans `POST`).
  - Paragraphe 1 : « **Mon serveur MCP public est à {MCP.url}.** Branche-le dans ton assistant et raconte ton projet : il mène la discussion comme je le ferais et te rend une fourchette calculée avec ma grille. Rien ne m'est envoyé sans ton accord explicite et ton email. »
  - Paragraphe 2 (détail technique, texte actuel conservé mot pour mot à partir de « Les agents s'y connectent en POST Streamable HTTP. » jusqu'à « Ce n'est pas une page à ouvrir dans le navigateur. »), précédé de « Détail technique : ».
  - Paragraphe 3 : « Il expose aussi mon identité, ma stack, mes études de cas et mes services, et un audit d'architecture déterministe. Pour m'écrire directement, {CONTACT.email}. »
  - Paragraphe 4 conservé (manifeste machine et catalogue texte).
  - `<McpConnect />` en pleine largeur sous la grille ; `.bloc-inverse` bascule les tokens seul, aucune classe de thème en plus.

- [ ] **Step 3: Vérifier** `pnpm lint`, `pnpm exec tsc --noEmit`, puis `grep -rniE "n.envoie pas de lead" src app` : aucune ligne.

- [ ] **Step 4: Commit**

```bash
git add src/features/home/components/home-mcp.tsx src/features/about/components/about-mcp.tsx
git commit -m "feat(home): center the MCP section on estimating a project, with per-client setup"
```

---

### Task 4: FAQ home alignée sur le discours

**Files:**
- Modify: `src/features/home/components/home-faq.tsx` (tableau `items`, la question MCP ligne ~43)

**Interfaces:**
- Consumes: `MCP` ; `buildFaqPageSchema(items)` inchangé (le JSON-LD sort du même tableau).
- Produces: `items` à 8 entrées, la question MCP remplacée et deux ajoutées juste après.

- [ ] **Step 1: Remplacer la question « À quoi sert le serveur MCP de ce site ? »** par :
  - Question : « Peut-on estimer son projet avec toi sans réserver de créneau ? »
  - Réponse : `Oui. Tu branches mon serveur MCP (${MCP.url}) dans Claude, ChatGPT, Cursor ou Claude Code, tu racontes ton projet, et ton assistant te rend une fourchette en jours et en euros HT calculée avec ma grille. Rien ne m'est envoyé sans ton accord.`

- [ ] **Step 2: Ajouter après elle** :
  - « Comment brancher ton serveur MCP dans mon assistant ? » : `Dans Claude : Customize, Connectors, Add custom connector, puis colle ${MCP.url}. Dans ChatGPT : Plugins, Add custom MCP server. Dans Cursor : ajoute l'adresse dans mcp.json. Dans Claude Code : claude mcp add --transport http --scope user axel-hamilcaro ${MCP.url}. Les étapes détaillées et la phrase à copier sont dans la section MCP de cette page.`
  - « L'estimation vaut-elle un devis ? » : « Non. C'est une fourchette non contractuelle, avec ses hypothèses et ses exclusions, pour savoir si ton projet tient dans ton budget avant d'en parler. Le chiffre ferme vient après un échange avec moi. »

- [ ] **Step 3: Vérifier** `pnpm lint`, `pnpm exec tsc --noEmit`. Le `FAQPage` suit sans autre code (même tableau).

- [ ] **Step 4: Commit**

```bash
git add src/features/home/components/home-faq.tsx
git commit -m "feat(home): align the FAQ on estimating a project through the MCP"
```

---

### Task 5: Garde-fou des textes et preuve visuelle

**Files:**
- Test: `app/(site)/mcp-section-copy.test.tsx`

**Interfaces:**
- Consumes: `HomeMcp`, `AboutMcp`, `HomeFaq`, `MCP`, `MCP_PROMPT` (rendu par `renderToStaticMarkup`, comme `src/entities/project/weathertop-markup.test.tsx`).
- Produces: rien d'autre qu'un test.

- [ ] **Step 1: Écrire le test**

```tsx
describe("MCP section copy", () => {
  for (const [name, element] of [
    ["HomeMcp", <HomeMcp />],
    ["AboutMcp", <AboutMcp />],
    ["HomeFaq", <HomeFaq />],
  ] as const) {
    test(`${name} never carries the retired lead sentence, a long dash or the two names that stay apart`, () => {
      const html = renderToStaticMarkup(element);
      assert.doesNotMatch(html, /n(&#x27;|'|’)envoie pas de lead/i);
      assert.doesNotMatch(html, /—|–/);
      assert.doesNotMatch(html, /eskimoz|weathertop/i);
    });
  }

  test("both MCP sections give the address and the discuss_project starter prompt in the served HTML", () => {
    for (const element of [<HomeMcp />, <AboutMcp />]) {
      const html = renderToStaticMarkup(element);
      assert.ok(html.includes(MCP.url));
      assert.match(html, new RegExp(MCP_PROMPT));
    }
  });
});
```

- [ ] **Step 2: Lancer** `node --import tsx --test "app/(site)/mcp-section-copy.test.tsx"`. Expected: PASS (4 tests). Si `TransitionLink` ou `Heading2` casse le rendu statique, rendre le composant dans le même style que `weathertop-markup.test.tsx` ou signaler le blocage.

- [ ] **Step 3: Checks complets sur la branche, sortie à l'appui**

Run: `node --import tsx --test $(git ls-files '*.test.ts' '*.test.tsx')` → 0 échec.
Run: `pnpm lint` → 0 erreur. Run: `pnpm exec tsc --noEmit` → sortie vide. Run: `pnpm build` → exit 0 (un échec de téléchargement d'une police Google est un incident réseau : relancer).
Run: `grep -rniE "n.envoie pas de lead|eskimoz.{0,80}weathertop|weathertop.{0,80}eskimoz" src app public docs/superpowers/plans` → aucune ligne sur `src`, `app` et `public` (les docs de plan sont exclues du critère).

- [ ] **Step 4: Preuve visuelle** (`pnpm dev`, http://localhost:3000). Claude in Chrome en priorité pour la navigation et la console ; l'émulation de viewport n'existe pas dans l'extension, donc `chrome-devtools` (`emulate`) pour 390, 768 et 1440 px (secours prévu par les règles). Pour `/#mcp` puis `/about#mcp`, à chaque largeur, en thème clair puis sombre :
  - capture écran de la section entière ; les 4 blocs lisibles, aucun texte coupé, la section « Brancher en une minute » complète ;
  - `document.documentElement.scrollWidth <= window.innerWidth` vrai (`evaluate_script`) à 390 px ;
  - console sans erreur ni warning (`list_console_messages`) ;
  - clic sur « Copier l'adresse » : le libellé passe à « Copié » puis revient en 2 s ; la même chose pour la phrase d'amorce et le bloc de code ;
  - clavier : Tab atteint chaque bouton, focus visible ;
  - le bloc `<details>` « Pour les curieux et les agents » s'ouvre et son terminal ne déborde pas ;
  - l'ancre `/about#mcp` positionne bien la section ; la FAQ home montre les 8 questions et son `<script type="application/ld+json">` contient les 8 (vérifier `mainEntity.length === 8`).
  Ouvrir les captures et les citer dans la PR. Garder l'onglet ouvert pour la relecture d'Axel.

- [ ] **Step 5: Relecture des textes par Axel** : joindre à la PR la liste des textes de la Task 1, 3 et 4 (copiée de ce plan) avec la mention « formulations proposées, à valider avant merge » (spec section 7). Rappeler le point ChatGPT : la disponibilité par offre est celle de la page d'aide OpenAI du 2026-11-16.

- [ ] **Step 6: Commit**

```bash
git add "app/(site)/mcp-section-copy.test.tsx"
git commit -m "test(mcp): guard the MCP section copy against retired and forbidden strings"
```

---

## Self-Review

- **Couverture de la spec (lot 3).** Home bénéfice et trois étapes : Task 3. Blocs par client, bouton copier l'URL, phrase d'amorce : Tasks 1 et 2. Texte visible aligné sur manifeste et `llms.txt`, terminal gardé en détail technique : Tasks 1 (test llms) et 3 (`<details>`). `/about#mcp` et FAQ : Tasks 3 et 4. Retrait de « Il n'envoie pas de lead » : Tasks 3 et 5. Aucun écart.
- **Types.** `MCP_PROMPT`, `MCP_TOOLS`, `MCP_STARTER_PROMPT`, `MCP_CLIENTS`, `McpClient` (Task 1) sont ceux importés en Tasks 2, 3 et 5 ; `CopyButtonProps` (`text`, `label`) est celui utilisé dans `McpConnect`.
- **Proportion.** Les textes à valider sont figés en entier (c'est le livrable demandé), le code reste en signatures et assertions.
- **Dépendance lot 2.** Task 1 tests 3 et 4 échouent tant que le lot 2 n'est pas mergé : voulu, c'est le garde-fou de dérive de noms.
- **Hors périmètre rappelé.** Les mentions légales (rétention 12 mois de `send_project_brief`) restent au lot 2 ; ce lot ne les touche pas.
