# Espace Pro — Design Document

## Vue d'ensemble

Feature intégrée à axelhamilcaro.com : un espace professionnel personnel combinant un **coffre-fort documentaire** (inspiré de Paperless-ngx) et un module de **signature électronique** (PDF-first). Usage admin uniquement (single-tenant), les clients n'accèdent qu'à la page de signature publique.

## Coffre-fort documentaire

### Principe

Modèle inspiré de Paperless-ngx : friction minimale à l'upload, intelligence à la recherche.

### Upload

- L'utilisateur drop un fichier et sélectionne un client. C'est tout.
- Formats acceptés : PDF, images (JPG, PNG), Word, tout fichier courant.
- Chaque document reçoit un numéro séquentiel unique (DOC-001, DOC-002...).

### Classification automatique

- OCR sur les PDFs pour extraire le texte.
- Le type de document (facture, contrat, NDA, brief, attestation...) est **déduit automatiquement** du contenu, pas rempli manuellement.
- La classification s'améliore avec le temps (ML ou heuristiques basées sur le contenu).

### Recherche et navigation

- **Recherche full-text** comme moyen principal de retrouver un document : le contenu des PDFs est indexé et cherchable.
- **Filtres rapides** en complément : par client, par type (auto-détecté), par date, par statut.
- Pas de dossiers. Pas de tags obligatoires. Pas d'arborescence.

### Stockage

- **Stockage principal** : infrastructure contrôlée (Vercel Blob ou stockage propre).
- **Backup chiffré automatique** vers un bucket cloud (S3, R2, ou Backblaze B2) — filet de sécurité passif, pas de dépendance applicative.
- Les fichiers sont chiffrés avant envoi vers le backup cloud.

## Signature électronique

### Principe

Approche PDF-first : le document est toujours un PDF (généré ou uploadé). La signature est incrustée dans le PDF final.

### Création de document

Deux chemins :

1. **Depuis un template** : templates rédigés en markdown dans l'admin, avec des variables (`{{client_name}}`, `{{date}}`, `{{project}}`, `{{amount}}`...). Le markdown est converti en PDF lors de l'envoi.
2. **Depuis un upload** : PDF déjà prêt, uploadé directement.

### Signataires

- Multi-signataires : nombre variable (2 ou plus).
- Chaque signataire a un nom, un email, et un rôle ("Prestataire", "Client", "Associé"...).
- **Ordre de signature** optionnel : si défini, le signataire N+1 ne reçoit son lien qu'après que le N ait signé. Si pas d'ordre, tous reçoivent le lien simultanément.

### Expérience signataire

1. Le signataire reçoit un email avec un lien unique (`/sign/[token]`).
2. Il ouvre le lien, voit le PDF dans le navigateur (viewer PDF).
3. Il choisit son mode de signature :
   - **Dessin** : canvas tactile/souris pour tracer sa signature manuscrite.
   - **Texte** : tape son nom, converti en police cursive stylisée.
4. Il signe, confirmation visuelle.
5. Une fois **tous** les signataires ont signé, chacun reçoit le PDF final signé par email.

### Preuve de signature

Chaque signature conserve :
- Identité du signataire (nom, email)
- Date et heure exacte de signature
- Adresse IP
- Type de signature (dessin ou texte)
- Hash du document au moment de la signature

### Intégration avec le coffre

Le document signé atterrit automatiquement dans le coffre-fort avec le statut "signé", associé au client correspondant.

## Périmètre admin

### Nouvelle section unifiée dans `/admin`

- **Liste des documents** : tous les docs du coffre, avec recherche full-text et filtres.
- **Upload** : drag & drop + sélection client.
- **Templates** : CRUD des templates markdown pour la signature.
- **Envoi de signature** : création d'un document à signer (depuis template ou upload), ajout des signataires, envoi.
- **Suivi des signatures** : statut de chaque document en cours de signature, relance par email en un clic.

### Accès public

- `/sign/[token]` : page de signature publique, accessible sans authentification, via le token unique du signataire.

## Contraintes techniques

- Stack existante : Next.js 16, React 19, TypeScript, Drizzle ORM, PostgreSQL, Vercel Blob, Resend, Biome.
- Clean Architecture existante : controller > service > repository.
- Auth existante : better-auth avec GitHub OAuth, admin restreint par GitHub ID.
- Déploiement : Vercel.

## Ce qui est hors scope (pour l'instant)

- Accès client au coffre (les clients n'ont pas de compte).
- Signature électronique qualifiée eIDAS (certificat, horodatage qualifié).
- Multi-utilisateurs / SaaS.
- Éditeur WYSIWYG pour les templates.
- Application mobile.
