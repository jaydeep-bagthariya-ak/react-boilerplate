# React TypeScript Boilerplate

A modern, production-ready React TypeScript boilerplate with all the essential tools and best practices for building scalable web applications.

## 🚀 Features

- ⚡ **React 18** - Latest stable React with improved performance and features
- 🔷 **TypeScript** - Full type safety and better developer experience
- 📦 **Vite** - Lightning fast build tool and dev server
- 🏪 **Redux Toolkit** - Efficient state management with modern Redux
- 🌍 **i18next** - Internationalization with English and Spanish support
- 🔌 **Axios** - HTTP client with interceptors and error handling
- ✅ **Vitest** - Fast unit testing framework
- 🧪 **Testing Library** - Simple and complete testing utilities
- 💄 **Prettier** - Opinionated code formatter
- 🔍 **ESLint** - Linting with TypeScript and React rules
- 🐕 **Husky** - Git hooks for code quality
- 🎨 **Modern CSS** - Responsive design with CSS modules support

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, etc.)
│   ├── Counter.tsx     # Demo counter component
│   └── LanguageSwitcher.tsx
├── hooks/              # Custom React hooks
│   └── redux.ts        # Typed Redux hooks
├── store/              # Redux store configuration
│   ├── index.ts        # Store setup
│   └── slices/         # Redux slices
├── services/           # API services and external integrations
│   └── api.ts          # Axios configuration
├── utils/              # Utility functions
│   └── helpers.ts      # Common helper functions
├── types/              # TypeScript type definitions
│   └── index.ts        # Global types
├── i18n/               # Internationalization
│   └── index.ts        # i18n configuration
├── tests/              # Test files
│   ├── setup.ts        # Test setup and configuration
│   └── App.test.tsx    # Example tests
└── main.tsx            # Application entry point
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript compiler

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:3001
VITE_APP_NAME=React Boilerplate
VITE_APP_VERSION=1.0.0
VITE_ENABLE_MOCK_API=true
```

## 🧪 Testing

Tests are set up with Vitest and Testing Library:

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## 🌍 Internationalization

The app supports multiple languages using react-i18next. Translation files are located in `public/locales/`.

## 🏪 State Management

Redux Toolkit is configured with type-safe hooks and Redux DevTools.

## 🔌 API Integration

Axios is pre-configured with base URL, interceptors, and error handling.

## 🚀 Deployment

```bash
npm run build
```

The built application can be deployed to any static hosting service.

## 📝 License

This project is licensed under the MIT License.
