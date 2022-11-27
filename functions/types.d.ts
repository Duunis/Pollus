export {}

interface Bindings {
  STORE: KVNamespace
}

declare global {
  type Handler = PagesFunction<Bindings>
}
