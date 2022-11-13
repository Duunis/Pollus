import type { PluginData } from '@cloudflare/pages-plugin-sentry'

export {}

interface Environment {
  SENTRY_DSN: string
  ENVIRONMENT: 
    | 'local'
    | 'preview'
    | 'production' 
}

interface Bindings {
  STORE: KVNamespace
}

declare global {
  type Handler = PagesFunction<Environment & Bindings, any, PluginData>
}
