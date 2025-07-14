#!/bin/bash

# React TypeScript Boilerplate Project Setup (Clean Version)
# Usage: ./setup-project-clean.sh [project-name]
# This script automatically resets git history for a clean start

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Get project name from argument or prompt user
if [ -z "$1" ]; then
    echo -e "${YELLOW}Enter your project name (or press Enter to use current directory name):${NC}"
    read -r PROJECT_NAME
    if [ -z "$PROJECT_NAME" ]; then
        PROJECT_NAME=$(basename "$(pwd)")
    fi
else
    PROJECT_NAME="$1"
fi

# Validate project name
if [[ ! "$PROJECT_NAME" =~ ^[a-zA-Z0-9_-]+$ ]]; then
    print_error "Project name should only contain letters, numbers, underscores, and hyphens!"
    exit 1
fi

print_status "Setting up React TypeScript project: $PROJECT_NAME"
print_status "Location: $(pwd)"

# Check if we're in a valid project directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found! Please run this script from the root of your cloned project."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node >/dev/null 2>&1; then
    print_error "Node.js is not installed! Please install Node.js first."
    print_status "Visit: https://nodejs.org/en/download/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm >/dev/null 2>&1; then
    print_error "npm is not installed! Please install npm first."
    exit 1
fi

# Display Node.js and npm versions
print_status "Node.js version: $(node --version)"
print_status "npm version: $(npm --version)"

# Clean up any existing node_modules and lock files
if [ -d "node_modules" ]; then
    print_status "Removing existing node_modules..."
    rm -rf node_modules
fi

if [ -f "package-lock.json" ]; then
    print_status "Removing existing package-lock.json..."
    rm -f package-lock.json
fi

# Update package.json with new project name
print_status "Updating package.json with project name..."
if command -v node >/dev/null 2>&1; then
    node -e "
        const fs = require('fs');
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        pkg.name = '$PROJECT_NAME';
        pkg.version = '0.1.0';
        pkg.description = 'A modern React TypeScript application';
        fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
    "
else
    print_warning "Could not update package.json automatically. Please update it manually."
fi

# Install dependencies
print_status "Installing dependencies... This may take a few minutes."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    print_success "Dependencies installed successfully!"
else
    print_error "Failed to install dependencies. Please check your internet connection and try again."
    exit 1
fi

# Set up git hooks with Husky (if not already set up)
if [ -f "node_modules/.bin/husky" ]; then
    print_status "Setting up Husky git hooks..."
    npx husky install
fi

# Always reset git history for a clean start
print_status "Resetting git history for clean start..."
if [ -d ".git" ]; then
    rm -rf .git
fi

git init
git add .
git commit -m "Initial commit: $PROJECT_NAME setup"
print_success "Git repository initialized with clean history!"

# Update README.md with project name
print_status "Updating README.md..."
cat > README.md << EOF
# $PROJECT_NAME

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

\`\`\`bash
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
\`\`\`

## Project Structure

\`\`\`
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
\`\`\`

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm test\` - Run tests once
- \`npm run test:watch\` - Run tests in watch mode
- \`npm run test:coverage\` - Run tests with coverage
- \`npm run lint\` - Lint code
- \`npm run lint:fix\` - Fix linting issues
- \`npm run format\` - Format code with Prettier
- \`npm run type-check\` - Run TypeScript type checking

## Development

1. Clone the repository
2. Run \`./setup-project-clean.sh\` to initialize the project with clean git history
3. Start development with \`npm run dev\`

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
EOF

# Run type checking to ensure everything is working
print_status "Running type check..."
npm run type-check

if [ $? -eq 0 ]; then
    print_success "Type check passed!"
else
    print_warning "Type check found some issues. Please review and fix them."
fi

# Run linting
print_status "Running code linting..."
npm run lint

if [ $? -eq 0 ]; then
    print_success "Linting passed!"
else
    print_warning "Linting found some issues. Run 'npm run lint:fix' to auto-fix them."
fi

# Run tests to ensure everything is working
print_status "Running tests..."
npm test

if [ $? -eq 0 ]; then
    print_success "All tests passed!"
else
    print_warning "Some tests failed. Please review and fix them."
fi

# Clean up setup files
print_status "Cleaning up setup files..."
[ -f "create-project.sh" ] && rm -f create-project.sh
[ -f "template-setup.js" ] && rm -f template-setup.js

print_success "Project '$PROJECT_NAME' has been set up successfully!"
print_success "Location: $(pwd)"
echo ""
echo "🎉 Your React TypeScript project is ready with clean git history!"
echo ""
echo "Next steps:"
echo "  npm run dev          # Start development server"
echo "  npm run build        # Build for production"
echo "  npm test             # Run tests"
echo "  npm run lint         # Check code quality"
echo ""
print_status "Happy coding! 🚀"
