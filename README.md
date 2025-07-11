# test-project

A modern React TypeScript application built with the React TypeScript Boilerplate.

## Features

- ⚡️ **Vite** - Lightning fast build tool
- ⚛️ **React 19** - Latest React with TypeScript
- 🎯 **Redux Toolkit** - Efficient state management
- 🌍 **i18next** - Internationalization support
- 🧪 **Vitest + Testing Library** - Comprehensive testing setup
- 🎨 **ESLint + Prettier** - Code quality and formatting
- 🐶 **Husky** - Git hooks for code quality
- 📱 **Responsive Design** - Mobile-first approach

## Quick Start

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Type check
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   └── ui/            # Basic UI components
├── hooks/             # Custom React hooks
├── store/             # Redux store and slices
├── services/          # API services
├── utils/             # Utility functions
├── types/             # TypeScript type definitions
├── i18n/              # Internationalization
└── tests/             # Test files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Development

1. Clone the repository
2. Run `./setup-project.sh` to initialize the project
3. Start development with `npm run dev`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
