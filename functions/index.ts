import * as Sentry from '@sentry/browser'

type Context = Parameters<Handler>[0]

export const onRequestPost: Handler = async ctx => {
  Sentry.init({
    dsn: 'https://f369ba7ac502474daa212a958791e951@o366412.ingest.sentry.io/4504146888949760',
    tracesSampleRate: 1.0,
  })

  try {
    throw new Error('Not implemented')
  } catch (error) {
    Sentry.captureException(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
