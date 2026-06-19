# E2E Testing Guide — cambodiaspeed (CSAT Academy)

## Quick Links
- **Live URL**: Replace `YOUR_NETLIFY_URL` with your deployed Netlify domain
- **Forms to Test**: `/apply`, `/contact`, `/recruitment` (if applicable)
- **Testing Timeframe**: Post-deployment ("Published" status on Netlify)

---

## 📋 Manual Testing Checklist (No Code Required)

### Test Environment Setup
- [ ] Open browser DevTools (F12 or Cmd+Option+I)
- [ ] Go to **Network** tab to monitor requests
- [ ] Go to **Console** tab to watch for JavaScript errors
- [ ] Have two browser windows open: one for desktop, one for mobile testing (or use responsive mode)

---

## Test 1: Application Form (`/apply`)

### Basic Form Loading
- [ ] Navigate to `https://YOUR_NETLIFY_URL/apply`
- [ ] Page loads without console errors
- [ ] All form fields are visible: Name, Phone, Gender, Program, Address, ID File, Submit button
- [ ] Form styling matches design (gold button, navy background, proper spacing)
- [ ] Language toggle works (switch between English and Khmer)

### Field Validation (Client-Side)
**Test 1a: Submit Empty Form**
- [ ] Click **Submit** without filling fields
- [ ] Validation error messages appear for required fields
- [ ] No network request is made (check Network tab)
- [ ] Error messages display inline with each field

**Test 1b: Invalid Name (too short)**
- [ ] Enter name: `"A"` (single character)
- [ ] Click **Submit**
- [ ] Error: "Name required" (or similar)
- [ ] No network request sent

**Test 1c: Invalid Phone (too short)**
- [ ] Fill valid name: `"John Doe"`
- [ ] Enter phone: `"123"` (only 3 chars)
- [ ] Click **Submit**
- [ ] Error: "Phone required" or "Phone too short"
- [ ] No form submission

**Test 1d: Missing Gender**
- [ ] Fill: Name, Phone, Program, Address
- [ ] Leave Gender unchecked
- [ ] Click **Submit**
- [ ] Error: "Gender required" or similar

**Test 1e: Missing Program**
- [ ] Fill: Name, Phone, Gender, Address
- [ ] Leave Program as "—" (default)
- [ ] Click **Submit**
- [ ] Error: "Select a program"

**Test 1f: Address Too Short**
- [ ] Fill other fields validly
- [ ] Enter address: `"A"` (1 char)
- [ ] Click **Submit**
- [ ] Error: "Address required"

### Successful Form Submission
**Test 1g: Valid Submission**
1. [ ] Fill form with valid data:
   - Name: `"Sokha Rin"` (2+ characters)
   - Phone: `"+855 97 123 4567"` (6+ characters)
   - Gender: Select `"Male"` or `"Female"`
   - Program: Select any program from dropdown
   - Address: `"Phnom Penh, Cambodia"` (2+ characters)
   - ID File: (optional) upload a test image or PDF

2. [ ] Click **Submit**
3. [ ] In **Network tab**, verify a request is made to the form handler
4. [ ] **Success message** displays: "Application Received" with checkmark icon
5. [ ] Success message includes thank you text
6. [ ] Form is hidden/replaced by success state
7. [ ] No console errors

### Field Interaction Tests
**Test 1h: Program Dropdown**
- [ ] Click program dropdown
- [ ] Verify all 4 programs are listed (Security Guard, Firefighting, Drone Operation, Chinese Language)
- [ ] Select different programs — dropdown updates correctly
- [ ] Selected value persists until changed

**Test 1i: Gender Radio Buttons**
- [ ] Click Male radio — it becomes selected
- [ ] Click Female radio — Male deselects, Female selects
- [ ] Only one gender can be selected at a time
- [ ] Clicking selected radio keeps it selected

**Test 1j: File Upload**
- [ ] Click ID File input
- [ ] File picker opens
- [ ] Select an image (PNG/JPG) or PDF
- [ ] File name appears in input field (browser-dependent behavior)
- [ ] Form still submits successfully with file

### Mobile Responsiveness
- [ ] Resize to mobile (375px width)
- [ ] Form fields stack vertically
- [ ] Input fields are readable and tappable
- [ ] Submit button is large enough to tap
- [ ] No horizontal scroll
- [ ] Form is centered

---

## Test 2: Contact Form (`/contact`)

### Basic Form Loading
- [ ] Navigate to `https://YOUR_NETLIFY_URL/contact`
- [ ] Page loads without errors
- [ ] Contact info section displays: Phone, Email, Telegram, Address
- [ ] Google Maps embed is visible (even if grayed out)
- [ ] Contact form on right side is visible
- [ ] All three form fields present: Name, Email, Message

### Field Validation (Client-Side)
**Test 2a: Submit Empty**
- [ ] Click **Send** without filling fields
- [ ] Validation errors appear for all required fields
- [ ] No network request made

**Test 2b: Invalid Name**
- [ ] Enter name: `"X"` (1 character)
- [ ] Click **Send**
- [ ] Error: "Name required" or similar

**Test 2c: Invalid Email**
- [ ] Enter name: `"John Doe"`
- [ ] Enter email: `"not-an-email"` (no @ symbol)
- [ ] Click **Send**
- [ ] Error: Invalid email validation message
- [ ] No form submission

**Test 2d: Message Too Short**
- [ ] Fill Name and valid Email
- [ ] Enter message: `"H"` (1 character)
- [ ] Click **Send**
- [ ] Error: "Message required" or similar

### Successful Form Submission
**Test 2e: Valid Submission**
1. [ ] Fill form:
   - Name: `"Sokha Rin"`
   - Email: `"sokha@example.com"` (valid email format)
   - Message: `"I am interested in your training programs and would like more information."`

2. [ ] Click **Send**
3. [ ] Check **Network tab** for form submission request
4. [ ] **Success message** displays: "Message Sent" with checkmark
5. [ ] Success message includes "Thank you. We will respond shortly."
6. [ ] Form is replaced by success state
7. [ ] No console errors

### Contact Info Display
- [ ] Phone number displays correctly: `"+855 (0) 12 345 678"`
- [ ] Email displays: `"info@csat-academy.com"`
- [ ] Telegram handle displays: `"@CSAT_Academy"`
- [ ] Address displays: `"Phnom Penh, Kingdom of Cambodia"`
- [ ] Each info card has correct icon (phone, envelope, send, map pin)

### Mobile Responsiveness
- [ ] On mobile, contact info stacks above form
- [ ] Form takes full width
- [ ] Map is visible but smaller
- [ ] All fields are easily readable and tappable

---

## Test 3: Recruitment Page (`/recruitment`)

### Page Loading
- [ ] Navigate to `https://YOUR_NETLIFY_URL/recruitment`
- [ ] Page loads without errors
- [ ] Title: "Recruitment & Deployment" (or similar)
- [ ] Workflow section displays 4 steps:
  1. **Train** (UserCheck icon)
  2. **Certify** (BadgeCheck icon)
  3. **Deploy** (Send icon)
  4. **Partners** (Building2 icon)
- [ ] All step descriptions are visible in both English and Khmer
- [ ] Step numbers (01, 02, 03, 04) display correctly
- [ ] Icons render without errors

### Content Verification
- [ ] Each step has:
  - [ ] Icon in gold border
  - [ ] Step number (faded gold)
  - [ ] English title
  - [ ] Khmer subtitle
  - [ ] Description text in both languages
- [ ] Layout is responsive: on mobile steps stack vertically, on desktop 2x2 or 1x4 grid
- [ ] No console errors

### Navigation
- [ ] Link back to home or other pages works
- [ ] Language toggle affects text on this page
- [ ] Browser back button works correctly

---

## 🌐 Cross-Browser Testing

Test each form on:
- [ ] **Chrome/Edge** (Chromium-based)
- [ ] **Firefox**
- [ ] **Safari** (if on Mac)
- [ ] **Mobile Safari** (iOS device or simulator)
- [ ] **Chrome Mobile** (Android device or emulator)

For each browser, run Test 1g (apply form) and Test 2e (contact form).

---

## 📱 Mobile/Responsive Testing

Use Chrome DevTools Responsive Mode (Cmd+Shift+M) to test:

- [ ] **375px (iPhone SE)**
  - Forms render correctly
  - All inputs are accessible
  - Button is tappable
  - No horizontal overflow

- [ ] **768px (Tablet)**
  - 2-column layout for Apply form renders well
  - Contact form displays beside info on larger tablets
  - All elements centered

- [ ] **1440px (Desktop)**
  - Full layout with proper spacing
  - Forms aligned correctly
  - No excess whitespace

---

## 🔍 Server-Side Verification (DevTools)

While testing forms, open **Network tab** in DevTools and verify:

### Apply Form Submission
- [ ] Request URL: Check that it hits the correct endpoint
- [ ] Request Method: Should be `POST`
- [ ] Request Headers:
  - [ ] `Content-Type` is correct (`application/x-www-form-urlencoded` or `application/json`)
- [ ] Response Status: Should be `200` (success) or `201` (created)
- [ ] Response Body: Should indicate success (not an error object)
- [ ] Response Time: Should be < 3000ms

### Contact Form Submission
- [ ] Same checks as Apply form
- [ ] Response indicates message received

### Failed Submissions (Intentional)
- [ ] If you submit with invalid server data (e.g., extremely long strings), server should return `400` or validation error
- [ ] Error message should be user-friendly
- [ ] No 500 errors (unless actual server issue)

---

## 🔐 Security Checks

- [ ] Form submissions use **HTTPS** (lock icon in browser address bar)
- [ ] No sensitive data logged to console
- [ ] No API keys or secrets visible in Network requests
- [ ] File uploads have appropriate size limits (if any)
- [ ] Form data is sanitized server-side (no XSS in submitted content)

---

## 📊 Performance Checks

Use **Lighthouse** audit (DevTools → Lighthouse):

- [ ] **Performance**: > 90
- [ ] **Accessibility**: > 90
- [ ] **Best Practices**: > 90
- [ ] **SEO**: > 90

For **Core Web Vitals**:
- [ ] **LCP** (Largest Contentful Paint): < 2.5s
- [ ] **FID** (First Input Delay) or **INP**: < 100ms
- [ ] **CLS** (Cumulative Layout Shift): < 0.1

---

## 🚨 Error Scenarios (Advanced)

### Simulate Network Failures
1. Open DevTools → **Network tab**
2. Click the throttle dropdown (usually says "No throttling")
3. Select **"Offline"**
4. Try to submit a form
5. [ ] Form should show user-friendly error
6. [ ] "Go Back" or "Try Again" button should appear
7. [ ] Turn offline back off

### Simulate Slow Network
1. DevTools → Network → Set to "Slow 3G"
2. Submit a form
3. [ ] Loading state displays (if implemented)
4. [ ] Form doesn't submit twice on slow double-click
5. [ ] Success message eventually appears after delay

### Console Error Monitoring
- [ ] Open Console tab
- [ ] Load each form page
- [ ] [ ] **No red error messages** (warnings are okay)
- [ ] Submit each form
- [ ] [ ] **No errors logged after submission**
- [ ] Refresh page after success message
- [ ] [ ] **No errors on reload**

---

## ✅ Final Smoke Test Checklist

Quick validation before declaring deployment successful:

- [ ] **All 3 form pages load** without errors
- [ ] **All forms validate** client-side correctly
- [ ] **At least one form submission succeeds** per form (apply + contact)
- [ ] **Success messages display** properly
- [ ] **No console errors** on any page
- [ ] **Mobile layout works** on 375px viewport
- [ ] **HTTPS is enforced** (no mixed content warnings)
- [ ] **Page titles change** correctly for SEO
- [ ] **Language toggle works** across all pages
- [ ] **Navigation between pages works** (no broken links)

---

## 📝 Debugging Tips

If a form doesn't submit:

1. **Check Console** for JavaScript errors
2. **Check Network tab** — is a request being sent?
   - If no request: validation or client-side error
   - If request fails: server issue
3. **Check the server endpoint**:
   - Is the API URL correct in production?
   - Are environment variables set in Netlify?
4. **Test in Incognito mode** to rule out browser extensions
5. **Clear browser cache** (Cmd+Shift+Delete) and retry
6. **Test on a different browser** to isolate issues

---

## 📧 Reporting Issues

If you find issues during testing, note:
- [ ] Exact URL where issue occurred
- [ ] Steps to reproduce
- [ ] Expected vs. actual behavior
- [ ] Browser and OS
- [ ] Screenshot or console errors
- [ ] Network request/response details (from DevTools)

