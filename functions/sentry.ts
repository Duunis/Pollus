import * as Sentry from '@sentry/browser'

type Context = Parameters<Handler>[0]

export const sentry = (handler: Handler) => (ctx: Context) => {
  Sentry.init({
    dsn: 'https://7563ac5ae46e41b1937803ef88c220e8@o366412.ingest.sentry.io/4504146965168128',
    tracesSampleRate: 1.0,
  })

  try {
    return handler(ctx)
  } catch (error) {
    ctx.waitUntil(new Promise(async resolve => {
      Sentry.captureException(error)
      await Sentry.flush(2000)
      resolve(undefined)
    }))
    return new Response(':)', { status: 200 })
  }
}
