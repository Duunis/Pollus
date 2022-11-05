export {}

interface Bindings {
  POLLUS: KVNamespace
}

declare global {
  type Handler = PagesFunction<Bindings>
}
