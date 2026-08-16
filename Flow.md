# Flow: Adding Tests for a New Page/Module

This project follows the Page Object Model. Adding coverage for a new page always
touches files in the same order:

```
config/selectors.ts  →  pages/(modules/)PageName.ts  →  fixtures (if needed)  →  data (if needed)  →  tests/**/name.spec.ts
```

Not "pages → tests → e2e" — selectors come first, since the page object depends on them.

## Step 1 — Add selectors (`config/selectors.ts`)

Add one new top-level key for the page, holding every locator it needs. Never hardcode
a CSS/data-test string inside a page object or spec — it always goes here first.

```ts
export const selectors = {
  // ...existing entries...
  newModule: {
    someInput: '[data-testid="new-module-input"]',
    submitButton: '[data-testid="new-module-submit"]',
  },
};
```

## Step 2 — Create the Page Object

Decide where it lives:
- **`pages/`** — top-level pages that aren't a specific business module (pattern: `LoginPage.ts`, `DashboardPage.ts`).
- **`pages/modules/`** — a business/feature module reached *after* login (pattern: `CifPage.ts`, `FundTransferPage.ts`).

Extend `BasePage` and use its helpers (`click`, `fill`, `waitForVisible`, `goto`,
`screenshot`) instead of calling `page.locator(...).click()` directly — this keeps
waits/timeouts consistent everywhere.

```ts
// pages/modules/NewModulePage.ts
import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';
import { selectors } from '../../config/selectors';

export class NewModulePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async doSomething(value: string) {
    await this.fill(this.page.locator(selectors.newModule.someInput), value);
    await this.click(this.page.locator(selectors.newModule.submitButton));
  }
}
```

## Step 3 — Fixtures (`fixtures/`) — only if needed

Most new pages need nothing new here. If the page requires being logged in, the
existing `authenticatedPage` fixture (`fixtures/auth.fixture.ts`) already handles
login via `LoginPage` and hands back a ready `DashboardPage` — reuse it. Only add a
new fixture if the page needs a genuinely different setup (e.g. a different role,
a different starting state).

## Step 4 — Test data (`data/`) — only if needed

If the test needs external data (account numbers, sample records), add a JSON/CSV
file here — see `data/accounts.json` — and import it directly into the spec.

## Step 5 — Write the spec (`tests/e2e/`, `tests/smoke/`, or `tests/api/`)

- `tests/smoke/` — critical-path checks (e.g. login).
- `tests/e2e/` — full feature/module flows.
- `tests/api/` — API-level tests.

Import `test`/`expect` from `fixtures/auth.fixture.ts` (not `@playwright/test`
directly) so the authenticated session is available, then drive the page through
your new Page Object.

```ts
// tests/e2e/new-module.spec.ts
import { test, expect } from '../../fixtures/auth.fixture';
import { NewModulePage } from '../../pages/modules/NewModulePage';

test.describe('E2E: New Module', () => {
  test('does something', async ({ authenticatedPage }) => {
    const newModulePage = new NewModulePage(authenticatedPage.page);
    await newModulePage.doSomething('value');

    await expect(authenticatedPage.page.getByText('expected result')).toBeVisible();
  });
});
```

## Step 6 — Run it

```bash
npx playwright test tests/e2e/new-module.spec.ts          # all browsers
npx playwright test tests/e2e/new-module.spec.ts --project=firefox  # one browser
npx playwright test --ui                                  # interactive
```

## Reference example (existing code)

The CIF module is the clearest existing example of this full flow:
- Selectors: `config/selectors.ts` → `cif` key
- Page Object: `pages/modules/CifPage.ts`
- Fixture: reuses `authenticatedPage` from `fixtures/auth.fixture.ts`
- Spec: `tests/e2e/cif.spec.ts`

## Before assuming a selector is wrong

If a new page's locators time out, don't assume the selector string itself is
wrong first. Check in this order (see `correction.md` for the login case this was
learned from):
1. Did the page actually navigate to the right URL/route?
2. Does the selector match the real DOM (tag name, attribute name) — inspect the
   real page, don't guess a convention.
3. Are downstream assertions (URL, redirect target) written for the real app's
   behavior?
4. Are `.env` credentials/config real values, not leftover `.env.example` placeholders?
