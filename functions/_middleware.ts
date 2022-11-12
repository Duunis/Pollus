import sentryPlugin from '@cloudflare/pages-plugin-sentry'

export const onRequest: Handler = ctx => {
  if (ctx.env.ENVIRONMENT === 'local') return ctx.next()

  return sentryPlugin({
    dsn: ctx.env.SENTRY_DSN,
    environment: ctx.env.ENVIRONMENT,
  })(ctx)
}
