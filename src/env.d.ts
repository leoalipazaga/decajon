/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly NIUBIZ_MERCHANT_ID: string
  readonly PUBLIC_DECAJON_API: string
  readonly PUBLIC_NIUBIZ_ACCESS_TOKEN_URL: string
  readonly PUBLIC_NIUBIZ_SESSION_TOKEN_URL: string
  readonly PUBLIC_NIUBIZ_TRANSACTION_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
