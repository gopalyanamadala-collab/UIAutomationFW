# Playwright POM + API Testing Framework (sample)

This workspace contains a scalable structure for UI and API tests using Playwright and the Page Object Model (POM).

Folders created:

- `tests/ui/` — UI tests (POM-based)
- `tests/api/` — API tests
- `pages/` — Page object classes
- `utils/` — API helpers and validators
- `fixtures/` — custom Playwright fixtures for auth/session

Quick scripts:

```bash
npm run test:ui    # run UI tests (chromium project)
npm run test:api   # run API tests
npm run test:all   # run all tests
```

Environment:

- Create `.env.dev`, `.env.staging`, or `.env.prod` and set `BASE_URL`, `AUTH_USER`, `AUTH_PASS`, etc.
- Control which env file is used with `PLAYWRIGHT_ENV=staging npx playwright test` or `export PLAYWRIGHT_ENV=staging`.

Fixtures & Auth:

- `fixtures/auth.js` provides `authToken` and `storageState` fixtures. It will try to login via `API_LOGIN` or `${BASE_URL}/api/login` using `AUTH_USER`/`AUTH_PASS`.

Notes & Best Practices:

- Keep page classes small and focused (one class per page/component).
- Keep API helpers thin wrappers around Playwright's `request` fixture.
- Use `storageState` to share authenticated sessions between API and UI tests.
- Add CI steps to install browsers: `npx playwright install --with-deps`.
