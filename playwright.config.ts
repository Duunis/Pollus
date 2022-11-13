import { Config } from '@playwright/test'

const config: Config = {
  testMatch: 'e2e.test.ts',
  webServer: {
    command: 'npm run dev',
    port: 8788
  },
  use: {
    headless: true
  }
}

export default config
