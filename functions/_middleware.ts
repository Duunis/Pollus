import sentryPlugin from '@cloudflare/pages-plugin-sentry'

export const onRequest: PagesFunction = sentryPlugin({
  dsn: 'https://f369ba7ac502474daa212a958791e951@o366412.ingest.sentry.io/4504146888949760',
})
