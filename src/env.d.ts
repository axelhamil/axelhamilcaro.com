/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  readonly CONTACT_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
