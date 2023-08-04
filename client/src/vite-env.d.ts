/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INPUT_FILE_TYPE: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
