#!/bin/bash

# React TypeScript Boilerplate Project Creator
# Usage: ./create-project.sh <project-name> [destination-path]

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

# Check if project name is provided
if [ -z "$1" ]; then
    print_error "Project name is required!"
    echo "Usage: ./create-project.sh <project-name> [destination-path]"
    echo "Example: ./create-project.sh my-awesome-app"
    echo "Example: ./create-project.sh my-awesome-app ~/Projects"
    exit 1
fi

PROJECT_NAME="$1"
DESTINATION_PATH="${2:-$(pwd)}"
PROJECT_PATH="$DESTINATION_PATH/$PROJECT_NAME"
BOILERPLATE_PATH="$(dirname "$0")"

# Validate project name
if [[ ! "$PROJECT_NAME" =~ ^[a-zA-Z0-9_-]+$ ]]; then
    print_error "Project name should only contain letters, numbers, underscores, and hyphens!"
    exit 1
fi

# Check if destination directory exists
if [ ! -d "$DESTINATION_PATH" ]; then
    print_error "Destination path '$DESTINATION_PATH' does not exist!"
    exit 1
fi

# Check if project directory already exists
if [ -d "$PROJECT_PATH" ]; then
    print_error "Directory '$PROJECT_PATH' already exists!"
    exit 1
fi

print_status "Creating new React TypeScript project: $PROJECT_NAME"
print_status "Destination: $PROJECT_PATH"

# Create project directory
mkdir -p "$PROJECT_PATH"

# Copy boilerplate files (excluding .git, node_modules, and other unwanted files)
print_status "Copying boilerplate files..."
rsync -av \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='dist' \
    --exclude='build' \
    --exclude='.env' \
    --exclude='*.log' \
    --exclude='.DS_Store' \
    --exclude='create-project.sh' \
    --exclude='template-setup.js' \
    "$BOILERPLATE_PATH/" "$PROJECT_PATH/"

# Navigate to project directory
cd "$PROJECT_PATH"

# Update package.json with new project name
print_status "Updating package.json with project name..."
if command -v node >/dev/null 2>&1; then
    node -e "
        const fs = require('fs');
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        pkg.name = '$PROJECT_NAME';
        pkg.version = '0.1.0';
        delete pkg.description;
        fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
    "
else
    # Fallback to sed if Node.js is not available
    sed -i.bak 's/"name": "[^"]*"/"name": "'$PROJECT_NAME'"/' package.json
    sed -i.bak 's/"version": "[^"]*"/"version": "0.1.0"/' package.json
    rm -f package.json.bak
fi

# Update README.md
print_status "Updating README.md..."
cat > README.md << EOF
# $PROJECT_NAME

A modern React TypeScript application built with the React TypeScript Boilerplate.

## Features

- ⚡️ **Vite** - Lightning fast build tool
- ⚛️ **React 18** - Latest React with TypeScript
- 🎯 **Redux Toolkit** - Efficient state management
- 🌍 **i18next** - Internationalization support
- 🧪 **Vitest + Testing Library** - Comprehensive testing setup
- 🎨 **ESLint + Prettier** - Code quality and formatting
- 🐶 **Husky** - Git hooks for code quality
- 📱 **Responsive Design** - Mobile-first approach

## Quick Start

\`\`\`bash
# Install dependencies
npm install

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

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
EOF

# Initialize git repository
print_status "Initializing git repository..."
git init
git add .
git commit -m "Initial commit: $PROJECT_NAME based on React TypeScript boilerplate"

# Install dependencies
print_status "Installing dependencies..."
if command -v npm >/dev/null 2>&1; then
    npm install
else
    print_warning "npm not found. Please install dependencies manually with 'npm install'"
fi

print_success "Project '$PROJECT_NAME' has been created successfully!"
print_success "Location: $PROJECT_PATH"
echo ""
echo "Next steps:"
echo "  cd $PROJECT_NAME"
echo "  npm run dev"
echo ""
print_status "Happy coding! 🚀"
