import sentryPlugin from '@cloudflare/pages-plugin-sentry'

export const onRequest: Handler = ctx => {
  // Skip Sentry plugin for local development
  if (ctx.env.ENVIRONMENT === 'local') return ctx.next()

  return sentryPlugin({
    dsn: ctx.env.SENTRY_DSN,
    environment: ctx.env.ENVIRONMENT,
  })(ctx)
}
