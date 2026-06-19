# Playwright E2E Test Setup & Running Guide

## Prerequisites

Ensure you have:
- Node.js 16+ installed
- npm or yarn available
- Your Netlify deployment URL (e.g., `https://cambodiaspeed.netlify.app`)

## Installation

### 1. Install Playwright

```bash
npm install --save-dev @playwright/test
```

Or if using yarn:

```bash
yarn add --dev @playwright/test
```

### 2. Install Browser Binaries

```bash
npx playwright install
```

This downloads Chrome, Firefox, and WebKit binaries (~300MB).

## Configuration

### Create `playwright.config.ts`

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.E2E_URL || "https://cambodiaspeed.netlify.app",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
```

Place this in the project root.

### Update `package.json` scripts

Add these test commands to your `package.json`:

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:headed": "playwright test --headed"
  }
}
```

## Running Tests

### Against Live Netlify Deployment

```bash
# Run all tests against production
E2E_URL=https://cambodiaspeed.netlify.app npm run test:e2e

# Or with yarn
E2E_URL=https://cambodiaspeed.netlify.app yarn test:e2e
```

Replace `https://cambodiaspeed.netlify.app` with your actual Netlify URL.

### Against Local Dev Server

```bash
# Runs dev server automatically and tests against it
npm run test:e2e
```

### Interactive Mode (Recommended for Debugging)

```bash
# Opens Playwright Inspector UI — you can step through tests
npm run test:e2e:debug
```

### Headed Mode (Watch Tests Run in Browser)

```bash
# Runs tests in visible browser windows
npm run test:e2e:headed
```

### UI Mode (Easiest for Viewing Results)

```bash
# Opens interactive test explorer with visual report
npm run test:e2e:ui
```

## Understanding Test Results

After running tests, Playwright generates:

- **HTML Report**: `playwright-report/index.html`
  - Open in browser to see detailed results
  - View traces, screenshots, and video recordings

- **Console Output**: Shows pass/fail summary

### Example Output

```
✓ CSAT Academy Form E2E Tests > Apply Form > page loads without errors (2.3s)
✓ CSAT Academy Form E2E Tests > Apply Form > displays validation errors for empty submission (1.1s)
✗ CSAT Academy Form E2E Tests > Contact Form > successfully submits form with valid data (5.2s)
  Error: Timeout waiting for "Message Sent"
```

## Test Structure

### File Organization

```
tests/
└── e2e/
    └── forms.spec.ts          # All form tests
```

### Test Sections

Each test file contains:
- **Test Suite**: `test.describe()` — groups related tests
- **Setup**: `test.beforeEach()` — runs before each test
- **Test Case**: `test()` — individual test
- **Assertions**: `expect()` — verify expected behavior

### Example Test Anatomy

```typescript
test("successfully submits form with valid data", async ({ page }) => {
  // 1. Setup: navigate to page
  await page.goto(`${BASE_URL}/apply`);

  // 2. Action: fill and submit form
  await page.locator('input[name="name"]').fill("John Doe");
  await page.locator('button[type="submit"]').click();

  // 3. Assertion: verify success
  await expect(page.locator("text=Application Received")).toBeVisible();
});
```

## Debugging Failed Tests

### 1. View Screenshots

If a test fails, Playwright saves a screenshot to `test-results/`. Check:
- What elements were visible
- What the page looked like at failure

### 2. Run Single Test

```bash
# Run only apply form tests
npx playwright test --grep "Apply Form"

# Run only one specific test
npx playwright test --grep "successfully submits form with valid data"
```

### 3. Debug Mode

```bash
npx playwright test --debug

# Step through each action
# Inspect element in DevTools
# Run console commands
```

### 4. View Trace

Each failed test records a trace (video-like playback):
1. Open HTML report: `npx playwright show-report`
2. Click failed test
3. Scroll to "Trace" section
4. Click to replay the test step-by-step

### 5. Common Issues

**Issue: Timeout waiting for element**
- Element selector is wrong → inspect with `--debug`
- Element is behind another element → add `{ force: true }`
- Network is slow → increase timeout in test

```typescript
await expect(page.locator("text=Success")).toBeVisible({ timeout: 10000 });
```

**Issue: Tests pass locally but fail in CI**
- Use headless mode (tests already do this)
- Check environment variables are set
- Ensure BASE_URL is correct for production

**Issue: Form submission doesn't work in test**
- Check console errors: `page.on('console', msg => console.log(msg))`
- Verify form fields are actually filled: add `await page.screenshot()`
- Check network requests: `page.on('response', ...)`

## Advanced: Custom Test Helpers

Create `tests/helpers.ts` for reusable test utilities:

```typescript
import { Page } from "@playwright/test";

export async function fillApplyForm(page: Page, data: {
  name: string;
  phone: string;
  gender: "male" | "female";
  program: string;
  address: string;
}) {
  await page.locator('input[name="name"]').fill(data.name);
  await page.locator('input[name="phone"]').fill(data.phone);
  await page.locator(`input[name="gender"][value="${data.gender}"]`).check();
  await page.locator('select[name="program"]').selectOption(data.program);
  await page.locator('textarea[name="address"]').fill(data.address);
}

export async function submitForm(page: Page) {
  await page.locator('button[type="submit"]').click();
}
```

Then use in tests:

```typescript
import { fillApplyForm, submitForm } from "../helpers";

test("submit with helper functions", async ({ page }) => {
  await page.goto(`${BASE_URL}/apply`);
  await fillApplyForm(page, {
    name: "John",
    phone: "0987654321",
    gender: "male",
    program: "security-guard",
    address: "Phnom Penh",
  });
  await submitForm(page);
  await expect(page.locator("text=Application Received")).toBeVisible();
});
```

## CI/CD Integration (GitHub Actions Example)

Create `.github/workflows/e2e.yml`:

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - run: npm install
      - run: npx playwright install --with-deps
      
      - name: Run E2E tests
        env:
          E2E_URL: ${{ secrets.NETLIFY_URL }}
        run: npm run test:e2e

      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

## Best Practices

✅ **Do:**
- Use semantic selectors: `'input[name="email"]'` instead of `.form > div > input`
- Wait for network idle: `await page.waitForLoadState("networkidle")`
- Test real user workflows (fill form, submit, verify)
- Use `{ timeout: 10000 }` for slow actions
- Keep tests focused (one thing per test)

❌ **Don't:**
- Use hardcoded delays: `await page.waitForTimeout(5000)` (except in rare cases)
- Over-test implementation details
- Test browser functionality (Playwright already does)
- Create interdependent tests (each should be independent)

## Resources

- [Playwright Official Docs](https://playwright.dev)
- [Assertions](https://playwright.dev/docs/test-assertions)
- [Locators](https://playwright.dev/docs/locators)
- [Debugging](https://playwright.dev/docs/debug)
- [API Reference](https://playwright.dev/docs/api/class-test)

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Tests timeout | Increase timeout: `{ timeout: 15000 }` |
| Element not found | Use `--debug` to inspect selectors |
| Form doesn't submit | Check console for validation errors |
| HTTPS errors | Ensure `E2E_URL` uses `https://` |
| Tests pass/fail randomly | Check for timing issues, use `waitForLoadState()` |

