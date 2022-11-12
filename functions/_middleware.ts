import sentryPlugin from '@cloudflare/pages-plugin-sentry'

export const onRequest: Handler = ctx => sentryPlugin({
  dsn: ctx.env.SENTRY_DSN
})(ctx)
