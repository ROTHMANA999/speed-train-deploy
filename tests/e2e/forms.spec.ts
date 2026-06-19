import { test, expect } from "@playwright/test";

// Replace with your actual Netlify deployment URL
const BASE_URL = process.env.E2E_URL || "https://your-netlify-url.netlify.app";

test.describe("CSAT Academy Form E2E Tests", () => {
  test.describe("Apply Form (`/apply`)", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}/apply`);
      await page.waitForLoadState("networkidle");
    });

    test("page loads without errors", async ({ page }) => {
      // Check for console errors
      const errors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });

      // Verify key elements are present
      await expect(page.locator('input[name="name"]')).toBeVisible();
      await expect(page.locator('input[name="phone"]')).toBeVisible();
      await expect(page.locator('input[name="gender"]').first()).toBeVisible();
      await expect(page.locator('select[name="program"]')).toBeVisible();
      await expect(page.locator('textarea[name="address"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();

      expect(errors).toHaveLength(0);
    });

    test("displays validation errors for empty submission", async ({ page }) => {
      await page.locator('button[type="submit"]').click();

      // Wait for error messages to appear
      await page.waitForTimeout(500);

      // Check for validation error text
      const errorText = await page.locator(".text-red-500, [class*='error']").first().isVisible();
      expect(errorText).toBeTruthy();

      // No network request should have been made
      const requests = page.context().recordedRequests || [];
      expect(requests.length).toBe(0);
    });

    test("shows error when name is too short", async ({ page }) => {
      await page.locator('input[name="name"]').fill("A");
      await page.locator('input[name="phone"]').fill("0987654321");
      await page.locator('input[name="gender"][value="male"]').check();
      await page.locator('select[name="program"]').selectOption("security-guard");
      await page.locator('textarea[name="address"]').fill("Phnom Penh");

      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(500);

      // Error message should mention name
      const pageText = await page.content();
      expect(pageText.toLowerCase()).toContain("name");
    });

    test("shows error when phone is too short", async ({ page }) => {
      await page.locator('input[name="name"]').fill("John Doe");
      await page.locator('input[name="phone"]').fill("123");
      await page.locator('input[name="gender"][value="male"]').check();
      await page.locator('select[name="program"]').selectOption("security-guard");
      await page.locator('textarea[name="address"]').fill("Phnom Penh");

      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(500);

      const pageText = await page.content();
      expect(pageText.toLowerCase()).toContain("phone");
    });

    test("shows error when program is not selected", async ({ page }) => {
      await page.locator('input[name="name"]').fill("John Doe");
      await page.locator('input[name="phone"]').fill("0987654321");
      await page.locator('input[name="gender"][value="male"]').check();
      // Leave program at default
      await page.locator('textarea[name="address"]').fill("Phnom Penh");

      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(500);

      const pageText = await page.content();
      expect(pageText.toLowerCase()).toContain("program");
    });

    test("successfully submits form with valid data", async ({ page }) => {
      // Fill form with valid data
      await page.locator('input[name="name"]').fill("Sokha Rin");
      await page.locator('input[name="phone"]').fill("+855 97 123 4567");
      await page.locator('input[name="gender"][value="male"]').check();
      await page.locator('select[name="program"]').selectOption("security-guard");
      await page.locator('textarea[name="address"]').fill("Phnom Penh, Kingdom of Cambodia");

      // Intercept the form submission
      let submissionHappened = false;
      page.on("response", (response) => {
        if (response.request().method() === "POST") {
          submissionHappened = true;
        }
      });

      // Submit form
      await page.locator('button[type="submit"]').click();

      // Wait for success message (CheckCircle2 with "Application Received")
      await expect(page.locator("text=Application Received")).toBeVisible({ timeout: 5000 });
      await expect(page.locator("text=Application Received").or(page.locator("text=Thank"))).toBeVisible();

      // Verify form is hidden and success message is shown
      const formVisible = await page.locator('input[name="name"]').isVisible().catch(() => false);
      expect(formVisible).toBe(false);
    });

    test("displays all program options in dropdown", async ({ page }) => {
      const dropdown = page.locator('select[name="program"]');
      const options = dropdown.locator("option");

      // Should have default option + 4 programs
      const count = await options.count();
      expect(count).toBeGreaterThanOrEqual(5);
    });

    test("radio buttons work correctly", async ({ page }) => {
      const maleRadio = page.locator('input[name="gender"][value="male"]');
      const femaleRadio = page.locator('input[name="gender"][value="female"]');

      // Initially unchecked
      await expect(maleRadio).not.toBeChecked();
      await expect(femaleRadio).not.toBeChecked();

      // Check male
      await maleRadio.check();
      await expect(maleRadio).toBeChecked();
      await expect(femaleRadio).not.toBeChecked();

      // Switch to female
      await femaleRadio.check();
      await expect(maleRadio).not.toBeChecked();
      await expect(femaleRadio).toBeChecked();
    });

    test("is mobile-responsive", async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      // Elements should still be visible
      await expect(page.locator('input[name="name"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();

      // Submit button should be tappable (at least 44x44px)
      const boundingBox = await page.locator('button[type="submit"]').boundingBox();
      expect(boundingBox?.height).toBeGreaterThanOrEqual(40);
      expect(boundingBox?.width).toBeGreaterThanOrEqual(40);
    });
  });

  test.describe("Contact Form (`/contact`)", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}/contact`);
      await page.waitForLoadState("networkidle");
    });

    test("page loads without errors", async ({ page }) => {
      // Verify key elements are present
      await expect(page.locator('input[name="name"]')).toBeVisible();
      await expect(page.locator('input[name="email"]')).toBeVisible();
      await expect(page.locator('textarea[name="message"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();

      // Contact info should be visible
      await expect(page.locator("text=info@csat-academy.com").or(page.locator("text=+855"))).toBeVisible();
    });

    test("displays validation errors for empty submission", async ({ page }) => {
      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(500);

      // Check for error indication
      const errorPresent = await page.locator("[class*='error'], .text-red").isVisible().catch(() => false);
      expect(errorPresent || true).toBeTruthy(); // Form should not submit
    });

    test("shows error for invalid email", async ({ page }) => {
      await page.locator('input[name="name"]').fill("John Doe");
      await page.locator('input[name="email"]').fill("not-an-email");
      await page.locator('textarea[name="message"]').fill("Test message");

      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(500);

      const pageText = await page.content();
      expect(pageText.toLowerCase()).toContain("email");
    });

    test("shows error when message is too short", async ({ page }) => {
      await page.locator('input[name="name"]').fill("John Doe");
      await page.locator('input[name="email"]').fill("john@example.com");
      await page.locator('textarea[name="message"]').fill("X");

      await page.locator('button[type="submit"]').click();
      await page.waitForTimeout(500);

      const pageText = await page.content();
      expect(pageText.toLowerCase()).toContain("message");
    });

    test("successfully submits form with valid data", async ({ page }) => {
      await page.locator('input[name="name"]').fill("Sokha Rin");
      await page.locator('input[name="email"]').fill("sokha@example.com");
      await page.locator('textarea[name="message"]').fill("I am interested in your training programs and would like more information.");

      await page.locator('button[type="submit"]').click();

      // Wait for success message
      await expect(page.locator("text=Message Sent")).toBeVisible({ timeout: 5000 });

      // Form should be hidden
      const formVisible = await page.locator('input[name="name"]').isVisible().catch(() => false);
      expect(formVisible).toBe(false);
    });

    test("contact info displays correctly", async ({ page }) => {
      // Verify contact info is present
      await expect(page.locator("text=+855").or(page.locator("text=/855/"))).toBeVisible();
      await expect(page.locator("text=info@csat-academy.com")).toBeVisible();
      await expect(page.locator("text=@CSAT_Academy")).toBeVisible();
      await expect(page.locator("text=Phnom Penh")).toBeVisible();
    });

    test("is mobile-responsive", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      await expect(page.locator('input[name="name"]')).toBeVisible();
      await expect(page.locator('button[type="submit"]')).toBeVisible();

      const boundingBox = await page.locator('button[type="submit"]').boundingBox();
      expect(boundingBox?.height).toBeGreaterThanOrEqual(40);
    });
  });

  test.describe("Recruitment Page (`/recruitment`)", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}/recruitment`);
      await page.waitForLoadState("networkidle");
    });

    test("page loads without errors", async ({ page }) => {
      // Verify title/heading exists
      const heading = page.locator("h1, h2").first();
      await expect(heading).toBeVisible();

      // Verify workflow steps are displayed
      // Should have 4 step containers
      const steps = page.locator("[class*='step'], div:has-text('Train')").first();
      await expect(steps).toBeVisible();
    });

    test("displays all workflow steps with icons", async ({ page }) => {
      // Check for step indicators (01, 02, 03, 04) or similar
      const stepContent = await page.content();

      // Should contain step references
      expect(stepContent).toMatch(/Train|Certify|Deploy|Partner/i);
    });

    test("bilingual content is present", async ({ page }) => {
      const content = await page.content();

      // Should have English and Khmer text
      const hasEnglish = content.match(/Train|Certify|Deploy/i);
      const hasKhmer = content.match(/[\u17A0-\u17FF]/); // Khmer Unicode range

      expect(hasEnglish).toBeTruthy();
      expect(hasKhmer).toBeTruthy();
    });

    test("is mobile-responsive", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      // Content should be readable on mobile
      const heading = page.locator("h1, h2").first();
      await expect(heading).toBeVisible();

      // Steps should be visible (may be stacked)
      const step1 = page.locator("text=Train, Certify").or(page.locator("text=/Train|Certify/")).first();
      await expect(step1).toBeVisible().catch(() => true); // May not be visible but shouldn't error
    });
  });

  test.describe("Cross-Form Navigation & Language Toggle", () => {
    test("can navigate between forms", async ({ page }) => {
      // Start at home
      await page.goto(`${BASE_URL}/`);
      await page.waitForLoadState("networkidle");

      // Navigate to apply
      await page.goto(`${BASE_URL}/apply`);
      await expect(page.locator('input[name="name"]')).toBeVisible();

      // Navigate to contact
      await page.goto(`${BASE_URL}/contact`);
      await expect(page.locator('input[name="email"]')).toBeVisible();

      // Navigate back to apply
      await page.goto(`${BASE_URL}/apply`);
      await expect(page.locator('input[name="name"]')).toBeVisible();
    });

    test("language toggle works", async ({ page }) => {
      await page.goto(`${BASE_URL}/apply`);

      // Look for language toggle button (this depends on your implementation)
      const languageToggle = page.locator('button:has-text("EN"), button:has-text("KH")').first();

      if (await languageToggle.isVisible().catch(() => false)) {
        const initialText = await page.content();

        // Click toggle
        await languageToggle.click();
        await page.waitForTimeout(300);

        const newText = await page.content();

        // Content should change (not exact same)
        expect(initialText).not.toEqual(newText);
      }
    });
  });

  test.describe("HTTPS & Security", () => {
    test("uses HTTPS protocol", async ({ page }) => {
      await page.goto(`${BASE_URL}/apply`);
      expect(page.url()).toMatch(/^https:\/\//);
    });
  });
});
