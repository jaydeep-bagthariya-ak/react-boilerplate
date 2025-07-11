# Setup Guide

This guide explains how to use the React TypeScript Boilerplate after cloning the repository.

## Quick Setup

After cloning this repository, run the setup script to initialize your project:

```bash
# Clone the repository
git clone <repository-url> my-project-name
cd my-project-name

# Run setup script
./setup-project.sh

# Or specify a custom project name
./setup-project.sh my-awesome-app
```

## What the setup script does:

1. **Validates Environment**: Checks if Node.js and npm are installed
2. **Cleans Previous Installation**: Removes any existing node_modules and lock files
3. **Updates Project Name**: Modifies package.json with your project name
4. **Installs Dependencies**: Runs `npm install` to install all required packages
5. **Sets up Git Hooks**: Configures Husky for code quality checks
6. **Initializes Git**: Creates a git repository if one doesn't exist
7. **Updates Documentation**: Creates a customized README.md for your project
8. **Runs Quality Checks**: Performs type checking, linting, and tests
9. **Cleans Up**: Removes setup files that are no longer needed

## Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** (comes with Node.js)
- **Git** (for version control)

## After Setup

Once the setup is complete, you can start developing:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Check code quality
npm run lint

# Format code
npm run format
```

## Troubleshooting

### If npm install fails:

1. Check your internet connection
2. Clear npm cache: `npm cache clean --force`
3. Delete node_modules and try again: `rm -rf node_modules && npm install`

### If git hooks don't work:

1. Make sure Husky is installed: `npm install --save-dev husky`
2. Reinstall git hooks: `npx husky install`

### If type checking fails:

1. Check TypeScript version: `npx tsc --version`
2. Run type check manually: `npm run type-check`

## Need Help?

- Check the main README.md for detailed documentation
- Review the project structure in the src/ directory
- Look at existing components for examples
- Check the tests/ directory for testing examples

Happy coding! 🚀
