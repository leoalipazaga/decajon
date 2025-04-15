/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_DECAJON_API: string
  readonly PUBLIC_DECAJON_EMAIL: string
  readonly PUBLIC_MERCADO_PAGO_SCRIPT: string
  readonly PUBLIC_MERCADO_PAGO_PUBLIC_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
