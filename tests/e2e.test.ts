import { expect, test } from '@playwright/test'

test.describe.configure({ mode: 'parallel' })

test('should show landing page', async ({ page }) => {
  await page.goto('/')
  expect(await page.title()).toBe('Pollus')
})
