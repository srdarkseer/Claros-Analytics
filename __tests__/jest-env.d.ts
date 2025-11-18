/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

// Extend ImportMeta for Jest environment to support import.meta.env
// This ensures src files can use import.meta.env during Jest tests
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL?: string;
    [key: string]: string | undefined;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
