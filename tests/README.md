# Test Structure Documentation

## Overview

This project uses a mirror test structure where the `tests/` directory mirrors the `src/` directory structure, making it easy to find corresponding test files.

## Directory Structure

```
tests/
├── setup/
│   └── setup.ts                    # Test setup configuration
├── utils/
│   ├── i18n-utils.ts              # i18n testing utilities
│   └── test-utils.tsx             # Custom render function with providers
├── components/
│   └── ui/                        # UI component tests
├── hooks/                         # Custom hook tests
├── services/                      # API service tests
├── store/
│   └── slices/
│       └── postsSlice.test.ts     # Redux slice tests
├── types/                         # Type definition tests
├── pages/                         # Page component tests
├── i18n/                          # i18n configuration tests
├── App.test.tsx                   # Main App component tests
└── React19.test.tsx               # React 19 feature tests
```

## Naming Conventions

- **Component tests**: `ComponentName.test.tsx`
- **Hook tests**: `useHookName.test.ts`
- **Service tests**: `serviceName.test.ts`
- **Slice tests**: `sliceName.test.ts`
- **Utility tests**: `utilityName.test.ts`

## Test Utilities

- **test-utils.tsx**: Custom render function with all providers (Redux, i18n, Router)
- **i18n-utils.ts**: Testing utilities for internationalization
- **setup.ts**: Global test setup (jsdom, mocks, etc.)

## Writing Tests

When creating new tests:

1. Place them in the corresponding directory that mirrors the `src/` structure
2. Use the custom `render` function from `./utils/test-utils` for component tests
3. Import from the actual source files using relative paths (e.g., `'../../src/components/Button'`)

## Running Tests

```bash
npm test          # Run in watch mode
npm test -- --run # Run once
npm test -- --coverage # Run with coverage
```

## Configuration

Test configuration is in `vitest.config.ts`:

- Setup files: `./tests/setup/setup.ts`
- Test patterns: `tests/**/*.{test,spec}.{ts,tsx}`
- Coverage excludes the `tests/` directory
