#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function colorize(color, text) {
  return `${colors[color]}${text}${colors.reset}`;
}

function log(type, message) {
  const prefix = {
    info: colorize('blue', '[INFO]'),
    success: colorize('green', '[SUCCESS]'),
    warning: colorize('yellow', '[WARNING]'),
    error: colorize('red', '[ERROR]'),
  };
  console.log(`${prefix[type]} ${message}`);
}

class ProjectCreator {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async question(query) {
    return new Promise(resolve => {
      this.rl.question(query, resolve);
    });
  }

  validateProjectName(name) {
    const validPattern = /^[a-zA-Z0-9_-]+$/;
    return validPattern.test(name) && name.length > 0;
  }

  async getProjectDetails() {
    console.log(
      colorize('cyan', '🚀 React TypeScript Boilerplate Project Creator\n')
    );

    const projectName = await this.question('Enter project name: ');

    if (!this.validateProjectName(projectName)) {
      log(
        'error',
        'Invalid project name! Use only letters, numbers, underscores, and hyphens.'
      );
      process.exit(1);
    }

    const description = await this.question(
      'Enter project description (optional): '
    );
    const author = await this.question('Enter author name (optional): ');
    const useTypescriptStrict = await this.question(
      'Use TypeScript strict mode? (y/n) [y]: '
    );
    const includeGithubActions = await this.question(
      'Include GitHub Actions CI/CD? (y/n) [y]: '
    );
    const includeDockerfile = await this.question(
      'Include Dockerfile? (y/n) [n]: '
    );

    const destinationPath =
      (await this.question(`Enter destination path [${process.cwd()}]: `)) ||
      process.cwd();

    return {
      projectName,
      description: description || '',
      author: author || '',
      useTypescriptStrict: useTypescriptStrict.toLowerCase() !== 'n',
      includeGithubActions: includeGithubActions.toLowerCase() !== 'n',
      includeDockerfile: includeDockerfile.toLowerCase() === 'y',
      destinationPath,
    };
  }

  copyDirectory(src, dest, excludePatterns = []) {
    const stats = fs.statSync(src);

    if (stats.isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }

      const items = fs.readdirSync(src);

      for (const item of items) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);

        // Check if item should be excluded
        const shouldExclude = excludePatterns.some(pattern => {
          if (typeof pattern === 'string') {
            return item === pattern;
          }
          return pattern.test(item);
        });

        if (!shouldExclude) {
          this.copyDirectory(srcPath, destPath, excludePatterns);
        }
      }
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  updatePackageJson(projectPath, details) {
    const packageJsonPath = path.join(projectPath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    packageJson.name = details.projectName;
    packageJson.version = '0.1.0';
    packageJson.description = details.description;
    packageJson.author = details.author;

    // Remove any existing repository, bugs, homepage fields
    delete packageJson.repository;
    delete packageJson.bugs;
    delete packageJson.homepage;

    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + '\n'
    );
  }

  updateTsConfig(projectPath, useStrict) {
    if (!useStrict) return;

    const tsConfigPath = path.join(projectPath, 'tsconfig.json');
    const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));

    tsConfig.compilerOptions.strict = true;
    tsConfig.compilerOptions.noImplicitAny = true;
    tsConfig.compilerOptions.strictNullChecks = true;
    tsConfig.compilerOptions.strictFunctionTypes = true;

    fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2) + '\n');
  }

  createGithubActions(projectPath) {
    const githubDir = path.join(projectPath, '.github', 'workflows');
    fs.mkdirSync(githubDir, { recursive: true });

    const ciWorkflow = `name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run type check
      run: npm run type-check
    
    - name: Run linter
      run: npm run lint
    
    - name: Run tests
      run: npm run test:coverage
    
    - name: Build
      run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Use Node.js 20.x
      uses: actions/setup-node@v4
      with:
        node-version: 20.x
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    # Add your deployment steps here
    # - name: Deploy to production
    #   run: echo "Add your deployment commands here"
`;

    fs.writeFileSync(path.join(githubDir, 'ci.yml'), ciWorkflow);
  }

  createDockerfile(projectPath, projectName) {
    const dockerfile = `# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
`;

    const dockerignore = `node_modules
npm-debug.log
dist
build
.git
.gitignore
README.md
.env
.nyc_output
coverage
.DS_Store
`;

    fs.writeFileSync(path.join(projectPath, 'Dockerfile'), dockerfile);
    fs.writeFileSync(path.join(projectPath, '.dockerignore'), dockerignore);
  }

  createReadme(projectPath, details) {
    const readme = `# ${details.projectName}

${details.description ? `${details.description}\n\n` : ''}A modern React TypeScript application built with the React TypeScript Boilerplate.

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

${
  details.includeDockerfile
    ? `## Docker

\`\`\`bash
# Build Docker image
docker build -t ${details.projectName} .

# Run Docker container
docker run -p 80:80 ${details.projectName}
\`\`\`

`
    : ''
}${
      details.author
        ? `## Author

${details.author}

`
        : ''
    }## License

This project is licensed under the MIT License.
`;

    fs.writeFileSync(path.join(projectPath, 'README.md'), readme);
  }

  async createProject() {
    try {
      const details = await this.getProjectDetails();
      const projectPath = path.join(
        details.destinationPath,
        details.projectName
      );

      // Check if project directory already exists
      if (fs.existsSync(projectPath)) {
        log('error', `Directory '${projectPath}' already exists!`);
        process.exit(1);
      }

      log('info', `Creating project: ${details.projectName}`);
      log('info', `Location: ${projectPath}`);

      // Copy boilerplate files
      log('info', 'Copying boilerplate files...');
      const boilerplatePath = __dirname;
      const excludePatterns = [
        '.git',
        'node_modules',
        'dist',
        'build',
        '.env',
        'create-project.sh',
        'template-setup.js',
        /\.log$/,
        '.DS_Store',
      ];

      this.copyDirectory(boilerplatePath, projectPath, excludePatterns);

      // Update project files
      log('info', 'Customizing project files...');
      this.updatePackageJson(projectPath, details);
      this.updateTsConfig(projectPath, details.useTypescriptStrict);
      this.createReadme(projectPath, details);

      // Optional features
      if (details.includeGithubActions) {
        log('info', 'Adding GitHub Actions CI/CD...');
        this.createGithubActions(projectPath);
      }

      if (details.includeDockerfile) {
        log('info', 'Adding Docker configuration...');
        this.createDockerfile(projectPath, details.projectName);
      }

      // Initialize git repository
      log('info', 'Initializing git repository...');
      process.chdir(projectPath);
      execSync('git init', { stdio: 'ignore' });
      execSync('git add .', { stdio: 'ignore' });
      execSync(
        `git commit -m "Initial commit: ${details.projectName} based on React TypeScript boilerplate"`,
        { stdio: 'ignore' }
      );

      // Install dependencies
      log('info', 'Installing dependencies...');
      execSync('npm install', { stdio: 'inherit' });

      log(
        'success',
        `Project '${details.projectName}' has been created successfully!`
      );
      log('success', `Location: ${projectPath}`);

      console.log('\nNext steps:');
      console.log(`  cd ${details.projectName}`);
      console.log('  npm run dev');
      console.log('\n🚀 Happy coding!');
    } catch (error) {
      log('error', `Failed to create project: ${error.message}`);
      process.exit(1);
    } finally {
      this.rl.close();
    }
  }
}

// Run the project creator
const creator = new ProjectCreator();
creator.createProject();
