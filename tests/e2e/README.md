# E2E Testing — Quick Start

This directory contains end-to-end tests for CSAT Academy (cambodiaspeed) deployment verification.

## Files

- **`forms.spec.ts`** — Playwright test suite for Apply, Contact, and Recruitment forms
- **`../E2E_TESTING_GUIDE.md`** — Detailed manual testing checklist (no automation needed)
- **`../PLAYWRIGHT_SETUP.md`** — Installation and usage guide for Playwright

## Quick Start

### Option 1: Manual Testing (No Setup Required)

1. Open [E2E_TESTING_GUIDE.md](../E2E_TESTING_GUIDE.md)
2. Replace `YOUR_NETLIFY_URL` with your actual Netlify domain
3. Follow the checklist step-by-step using your browser

**Best for**: Quick validation, mobile testing, visual inspection

### Option 2: Automated Testing (Playwright)

```bash
# Install Playwright (first time only)
npm install --save-dev @playwright/test
npx playwright install

# Run tests against production
E2E_URL=https://cambodiaspeed.netlify.app npm run test:e2e

# Or with interactive UI
npm run test:e2e:ui
```

**Best for**: CI/CD, regression testing, rapid iteration

## What Gets Tested?

### Forms
- ✅ **Apply** (`/apply`) — Enrollment form validation & submission
- ✅ **Contact** (`/contact`) — Message form validation & submission
- ✅ **Recruitment** (`/recruitment`) — Page load & bilingual content

### Behaviors
- ✅ Client-side form validation (empty fields, invalid data)
- ✅ Server-side form submission & success messages
- ✅ Form error handling
- ✅ Mobile responsiveness
- ✅ Cross-browser support
- ✅ HTTPS enforcement

## Test Coverage

| Test | Manual | Playwright |
|------|--------|-----------|
| Form field validation | ✓ | ✓ |
| Form submission success | ✓ | ✓ |
| Error messages | ✓ | ✓ |
| Mobile layout | ✓ | ✓ |
| Cross-browser | ✓ | ✓ |
| Screenshot on failure | | ✓ |
| Performance metrics | ✓ | |
| Security headers | ✓ | |

## Running Individual Test Suites

```bash
# All form tests
npm run test:e2e

# Only Apply form
npm run test:e2e -- --grep "Apply Form"

# Only Contact form
npm run test:e2e -- --grep "Contact Form"

# Only Recruitment page
npm run test:e2e -- --grep "Recruitment"

# Only on Chrome
npm run test:e2e -- --project=chromium

# Only on Mobile
npm run test:e2e -- --project="Mobile Chrome"

# With visible browser
npm run test:e2e:headed
```

## Interpreting Results

### Manual Testing
- Check off items as you verify them
- Note any failures or unexpected behavior
- Use browser DevTools (F12) to inspect network requests and console errors

### Playwright Testing
```
✓ Test Name (2.3s) ...................... PASSED
✗ Test Name (timeout) ................... FAILED
```

View detailed report:
```bash
npx playwright show-report
```

## Common Scenarios

### I just deployed — run this:
```bash
E2E_URL=https://cambodiaspeed.netlify.app npm run test:e2e:headed
```
Watch tests run in visible browsers and verify everything works.

### I'm debugging a form:
```bash
npm run test:e2e:debug
```
Step through test actions in Playwright Inspector.

### I want a quick visual check:
1. Open [E2E_TESTING_GUIDE.md](../E2E_TESTING_GUIDE.md)
2. Test manually in your browser
3. Takes ~5-10 minutes for full coverage

### I'm in CI/CD pipeline:
```bash
E2E_URL=$NETLIFY_URL npm run test:e2e
```
Runs headless, generates report in `playwright-report/`

## Troubleshooting

**Tests fail with "timeout"?**
- Network might be slow
- Element selector might be wrong
- Try: `npm run test:e2e:debug`

**Form submission doesn't work in test?**
- Check console errors: add logs to test
- Verify form fields actually filled: take screenshot
- Check Network tab in devtools

**Local tests pass but production fails?**
- Make sure `E2E_URL` is correct Netlify URL
- Check environment variables in Netlify dashboard
- Run: `E2E_URL=https://your-url.netlify.app npm run test:e2e`

## Next Steps

1. **First time?** → Read [PLAYWRIGHT_SETUP.md](../PLAYWRIGHT_SETUP.md)
2. **Quick check?** → Follow [E2E_TESTING_GUIDE.md](../E2E_TESTING_GUIDE.md) manually
3. **Automated testing?** → Run `npm run test:e2e:ui`
4. **CI/CD integration?** → See [PLAYWRIGHT_SETUP.md](../PLAYWRIGHT_SETUP.md#cicd-integration-github-actions-example)

## Useful Commands

```bash
# View HTML test report
npx playwright show-report

# Run specific test file
npx playwright test tests/e2e/forms.spec.ts

# Run with verbose output
npm run test:e2e -- --reporter=verbose

# Update snapshots (if using visual regression)
npm run test:e2e -- --update-snapshots
```

---

**Need help?** Check [PLAYWRIGHT_SETUP.md](../PLAYWRIGHT_SETUP.md) for detailed troubleshooting and best practices.
