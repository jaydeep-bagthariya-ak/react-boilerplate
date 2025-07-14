# React TypeScript Boilerplate

A modern React TypeScript application built with Vite, Redux Toolkit, i18n, and comprehensive testing setup.

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

### Option 1: Clean Setup (Recommended)

```bash
# Clone the repository
git clone https://github.com/jaydeep-bagthariya-ak/react-boilerplate.git my-project
cd my-project

# Run clean setup (removes boilerplate git history)
./setup-project-clean.sh my-project

# Start development
npm run dev
```

### Option 2: Setup with Choice

```bash
# Clone the repository
git clone https://github.com/jaydeep-bagthariya-ak/react-boilerplate.git my-project
cd my-project

# Run setup with option to keep or reset git history
./setup-project.sh my-project

# Start development
npm run dev
```

### Manual Setup

```bash
# Clone the repository
git clone https://github.com/jaydeep-bagthariya-ak/react-boilerplate.git my-project
cd my-project

# Install dependencies
npm install

# Start development server
npm run dev
```

## Git History Note

⚠️ **Important**: When you clone this repository, you get all the boilerplate development commits.

- Use `./setup-project-clean.sh` for a clean git history (recommended for new projects)
- Use `./setup-project.sh` if you want to choose whether to keep or reset the git history
- Or manually reset: `rm -rf .git && git init && git add . && git commit -m "Initial commit"`

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
  ├── types/ # TypeScript type definitions
  ├── i18n/ # Internationalization
  └── tests/ # Test files

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
```
