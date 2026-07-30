# Playwright TypeScript Framework

A production-ready test automation framework built with Playwright and TypeScript.

## 📁 Project Structure

```
playwright-framework/
├── src/
│   ├── pages/          # Page Object Models
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   └── TodoPage.ts
│   ├── fixtures/       # Custom Playwright fixtures
│   │   └── index.ts
│   ├── utils/          # Helpers & utilities
│   │   ├── apiClient.ts
│   │   ├── globalSetup.ts
│   │   └── helpers.ts
│   ├── data/           # Test data
│   │   ├── users.ts
│   │   └── testData.ts
│   └── types/          # TypeScript interfaces
│       └── index.ts
├── tests/
│   ├── e2e/            # End-to-end tests
│   │   ├── auth.setup.ts
│   │   └── todo.spec.ts
│   └── api/            # API tests
│       └── posts.api.spec.ts
├── playwright.config.ts
├── tsconfig.json
├── .env.example
└── package.json
```

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install
```

### 3. Set up environment variables

```bash
cp .env.example .env
# Edit .env with your values
```

### 4. Run tests

```bash
# Run all tests
npm test

# Run in headed mode (see the browser)
npm run test:headed

# Run with UI mode (interactive)
npm run test:ui

# Run only E2E tests
npx playwright test tests/e2e

# Run only API tests
npx playwright test tests/api

# Run a specific test file
npx playwright test tests/e2e/todo.spec.ts

# Run tests in debug mode
npm run test:debug
```

### 5. View reports

```bash
npm run report
```

## 🔧 Configuration

Edit `playwright.config.ts` to:
- Change `baseURL` for your app
- Add/remove browser projects
- Adjust timeouts, retries, workers
- Configure reporters

## 🧩 Key Features

| Feature | Description |
|---|---|
| **Page Object Model** | Reusable page classes in `src/pages/` |
| **Custom Fixtures** | Auto-injected page objects via `src/fixtures/` |
| **API Client** | Typed HTTP client in `src/utils/apiClient.ts` |
| **Auth Setup** | Session reuse via `auth.json` |
| **Multi-browser** | Chrome, Firefox, Safari, Mobile |
| **Parallel Execution** | Full test parallelism enabled |
| **HTML Reports** | Auto-generated after each run |
| **TypeScript** | Full type safety throughout |

## 📝 Adding New Pages

1. Create `src/pages/MyPage.ts` extending `BasePage`
2. Add fixture in `src/fixtures/index.ts`
3. Write tests in `tests/e2e/mypage.spec.ts`

## 🔐 Authentication

To enable saved auth state:
1. Uncomment login steps in `src/utils/globalSetup.ts`
2. Or use `tests/e2e/auth.setup.ts` with the `setup` project dependency

## 🌐 API Testing

API tests use the built-in `ApiClient` utility. Set `API_BASE_URL` in `.env`.
Demo tests run against `https://jsonplaceholder.typicode.com`.
