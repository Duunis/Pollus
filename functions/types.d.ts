export {}

interface Environment {
  SENTRY_DSN: string
}

interface Bindings {
  STORE: KVNamespace
}

declare global {
  type Handler = PagesFunction<Environment & Bindings>
}
