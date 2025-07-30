/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_VERSION: string;
  // add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
