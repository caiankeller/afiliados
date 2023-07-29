/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PORT: number;
  readonly DATABASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
