# BIBD AT V1 — Playwright Automation

Test automation suite built with [Playwright](https://playwright.dev/) and TypeScript, using the Page Object Model.

## Project Structure

```
playwright-automation/
├── .github/workflows/playwright.yml # CI pipeline (GitHub Actions)
├── tests/
│   ├── e2e/                         # End-to-end flows
│   ├── api/                         # API-level tests
│   └── smoke/                       # Critical-path smoke suite
├── pages/                           # Page Object Model
│   └── modules/
├── fixtures/                        # Custom test fixtures
├── data/                            # Test data (masked/synthetic)
├── utils/                           # Helpers (API client, DB, dates, logging)
├── config/                          # Env loader, centralized selectors
├── reports/                         # Auto-generated (gitignored)
├── .env.example                     # Sample env vars (checked in)
├── .env                             # Real env vars (gitignored)
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup

```bash
npm install
npx playwright install --with-deps
cp .env.example .env   # then fill in real values
```

## Running Tests

```bash
npm test                # run the full suite
npm run test:e2e        # tests/e2e only
npm run test:api        # tests/api only
npm run test:smoke      # tests/smoke only
npm run test:headed     # run headed (visible browser)
npm run test:debug      # run with the Playwright inspector
npm run report          # open the last HTML report
```

### Timestamped report archive

Playwright's HTML reporter always writes the live report to `reports/html/index.html`, overwriting it on every run — that file name isn't configurable. To keep a history, every `npm test`, `test:e2e`, `test:api`, `test:smoke`, and `test:headed` run also archives a dated copy via [`scripts/save-report.js`](scripts/save-report.js):

```
reports/html/index.html          # always the latest run — used by `npm run report`
reports/html/202608161038.html   # archived copy, name = YYYYMMDDHHmm at run time
```

The archived file is a plain copy sitting next to `index.html`, so it still resolves any shared `reports/html/data/` assets (screenshots, traces, videos) correctly. The whole `reports/html/` folder is gitignored, so archives stay local unless you upload them elsewhere (e.g. as a CI artifact).

## Useful Playwright Commands

Beyond the `npm run` scripts above, these raw Playwright CLI commands are handy while writing/debugging tests:

```bash
# Run a single spec file
npx playwright test tests/e2e/cif.spec.ts

# Run tests whose title matches a pattern
npx playwright test -g "fund transfer"

# Run only one browser project
npx playwright test --project=chromium

# Interactive UI mode (watch, time-travel, pick tests visually)
npx playwright test --ui

# Debug a specific test step-by-step (opens the Playwright Inspector)
npx playwright test tests/smoke/login.spec.ts --debug

# List all discovered tests without running them
npx playwright test --list

# Re-run only the tests that failed last time
npx playwright test --last-failed

# Control parallelism
npx playwright test --workers=4

# Record a new test by clicking through the app
npx playwright codegen <url>

# Open the trace viewer for a captured trace (e.g. after a CI failure)
npx playwright show-trace reports/screenshots/<trace-file>.zip

# Update visual snapshots after an intentional UI change
npx playwright test --update-snapshots
```

## Configuration

Environment variables are loaded from `.env` via [`config/env.ts`](config/env.ts) (see `.env.example` for the full list): base URLs, test credentials, and Oracle DB connection details used by [`utils/db-helper.ts`](utils/db-helper.ts).

Locators are centralized in [`config/selectors.ts`](config/selectors.ts) and consumed by the page objects in `pages/`.

## CI

GitHub Actions runs the full suite on push/PR to `main`/`master` (see [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml)) and uploads the HTML report as a build artifact. Set `BASE_URL`, `API_BASE_URL`, `TEST_USERNAME`, and `TEST_PASSWORD` as repository secrets.
