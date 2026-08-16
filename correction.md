# Login Smoke Test — Corrections

Context: `tests/smoke/login.spec.ts` was failing on all 3 browsers (6/6 tests) against
`BASE_URL=https://www.saucedemo.com/`. Root-caused by inspecting the real page (curl +
a scripted Playwright probe) and comparing it to the values hardcoded in the framework.
5 issues found, all fixed. Re-run after fixes: **6/6 passed**.

| # | File | Field | Wrong value | Correct value | Why |
|---|------|-------|-------------|----------------|-----|
| 1 | `pages/LoginPage.ts` | `open()` navigation path | `/login` | `/` | This app has no `/login` route (404). The login form is served at the site root. |
| 2 | `config/selectors.ts` | `login.submitButton` | `button[type="submit"]` | `#login-button` | The control is `<input type="submit" id="login-button">`, not a `<button>` element — the old selector matched zero elements and timed out. |
| 3 | `config/selectors.ts` | `login.errorMessage` | `[data-testid="login-error"]` | `[data-test="error"]` | The app marks its error banner with `data-test="error"`, not `data-testid="login-error"`. |
| 4 | `tests/smoke/login.spec.ts` | post-login URL assertion | `toHaveURL(/dashboard/)` | `toHaveURL(/inventory/)` | A successful login redirects to `/inventory.html`, never a URL containing "dashboard". |
| 5 | `.env` | `TEST_USERNAME` / `TEST_PASSWORD` | `testuser` / `changeme` | `standard_user` / `secret_sauce` | Those were unedited placeholder values copied from `.env.example`. The real app only accepts a fixed set of demo users (`standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`, `error_user`, `visual_user`), all with password `secret_sauce`. |

## How each was diagnosed
- Ran the smoke test → all 6 failed with `locator('#user-name')` never becoming visible.
- Screenshot on failure was a blank white page → pointed at a navigation/routing problem, not a selector typo.
- `curl` against `BASE_URL/login` returned `404`; `curl` against `BASE_URL/` returned `200` → confirmed the route (#1).
- A small scripted Playwright probe against the real root page dumped the actual login form HTML → revealed the submit control is an `<input>`, not `<button>` (#2).
- Same probe, run against an invalid-login attempt, revealed the real error element uses `data-test="error"` (#3).
- After fixing 1–3, the "valid credentials" test still failed with the URL never changing from `/`. The captured page snapshot on failure literally rendered the app's own error banner, which lists the accepted demo usernames/password → revealed the `.env` placeholder credentials had never been swapped for real ones (#4, #5).

## Takeaway for next time
When a locator times out with "element(s) not found," check in this order before assuming the selector string is wrong:
1. Did the page actually navigate to the right URL/route? (screenshot on failure will often be blank/wrong if not)
2. Does the selector match the actual DOM (tag name, attribute name), not just a guessed convention?
3. Are downstream assertions (URL, redirect target) written for the real app's behavior?
4. Are `.env` credentials/config real values, not leftover copies of `.env.example` placeholders?
