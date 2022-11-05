import { Config } from '@playwright/test'

const config: Config = {
  webServer: {
    command: 'npm run dev',
    port: 8788
  },
  use: {
    baseURL: 'http://localhost:8788',
    headless: false
  }
}

export default config
