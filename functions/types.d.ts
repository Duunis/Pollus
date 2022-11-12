export {}

interface Environment {
  SENTRY_DSN: string
  ENVIRONMENT: 'local' | 'production' | 'preview'
}

interface Bindings {
  STORE: KVNamespace
}

declare global {
  type Handler = PagesFunction<Environment & Bindings>
}
