import { expect, test } from '@playwright/test'

test('should render frontend :)', async ({ page }) => {
  await page.goto('/')
  await page.fill('data-test-id=title', 'quizlet')
  await page.click('data-test-id=create')
  await page.click('data-test-id=read')
})
