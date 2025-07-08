# Using the React TypeScript Boilerplate

This document explains different ways to create new projects using this React TypeScript boilerplate.

## 🚀 Quick Start Methods

### Method 1: GitHub Template Repository (Recommended)

1. **Push this boilerplate to GitHub:**

   ```bash
   # Create a new repository on GitHub (e.g., react-ts-boilerplate)
   git remote add origin https://github.com/yourusername/react-ts-boilerplate.git
   git branch -M main
   git push -u origin main
   ```

2. **Make it a template repository:**
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll down to "Template repository" section
   - Check the "Template repository" checkbox

3. **Create new projects:**
   - Go to your template repository on GitHub
   - Click "Use this template" button
   - Choose "Create a new repository"
   - Fill in the new repository details
   - Clone the new repository locally

### Method 2: Using the Bash Script

Use the provided `create-project.sh` script for quick local project creation:

```bash
# Make the script executable (if not already)
chmod +x create-project.sh

# Create a new project
./create-project.sh my-awesome-app

# Create a project in a specific directory
./create-project.sh my-awesome-app ~/Projects

# The script will:
# - Copy all boilerplate files
# - Update package.json with new project name
# - Initialize git repository
# - Install dependencies
# - Create a custom README
```

### Method 3: Interactive Node.js Setup

Use the advanced `template-setup.js` script for interactive project creation with customization options:

```bash
# Run the interactive setup
node template-setup.js

# Follow the prompts to configure:
# - Project name
# - Description
# - Author
# - TypeScript strict mode
# - GitHub Actions CI/CD
# - Docker configuration
# - Destination path
```

### Method 4: Manual Copy

For complete control over the process:

```bash
# Create project directory
mkdir my-new-project
cd my-new-project

# Copy boilerplate files (excluding .git and node_modules)
rsync -av --exclude='.git' --exclude='node_modules' /path/to/boilerplate/ ./

# Update package.json
# Edit package.json manually to change name, version, description, etc.

# Install dependencies
npm install

# Initialize git
git init
git add .
git commit -m "Initial commit"
```

### Method 5: degit (Fastest for Git repositories)

If your boilerplate is on GitHub, you can use `degit` for the fastest cloning:

```bash
# Install degit globally
npm install -g degit

# Create new project from GitHub template
degit yourusername/react-ts-boilerplate my-new-project

# Navigate and install
cd my-new-project
npm install
```

## 📋 What Each Method Includes

| Feature                 | GitHub Template | Bash Script | Node.js Setup | Manual Copy | degit  |
| ----------------------- | --------------- | ----------- | ------------- | ----------- | ------ |
| File copying            | ✅              | ✅          | ✅            | ✅          | ✅     |
| Package.json update     | Manual          | ✅          | ✅            | Manual      | Manual |
| Git initialization      | ✅              | ✅          | ✅            | Manual      | Manual |
| Dependency installation | Manual          | ✅          | ✅            | Manual      | Manual |
| Custom configuration    | ❌              | ❌          | ✅            | ✅          | ❌     |
| GitHub Actions setup    | Manual          | ❌          | ✅            | Manual      | Manual |
| Docker configuration    | Manual          | ❌          | ✅            | Manual      | Manual |
| Interactive prompts     | ❌              | ❌          | ✅            | ❌          | ❌     |

## 🛠 Customization After Creation

After creating a new project, you might want to:

### 1. Update Project Metadata

```bash
# Edit package.json
{
  "name": "your-project-name",
  "version": "0.1.0",
  "description": "Your project description",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/your-project.git"
  }
}
```

### 2. Configure Environment Variables

```bash
# Copy and customize environment file
cp .env.example .env
# Edit .env with your specific values
```

### 3. Update Internationalization

```bash
# Add new languages in public/locales/
# Update src/i18n/index.ts with new language codes
# Translate keys in translation.json files
```

### 4. Customize Styling

```bash
# Update global styles in src/index.css
# Modify component styles in respective .css files
# Add your design system colors and tokens
```

### 5. Configure CI/CD (if using GitHub Actions)

```bash
# Edit .github/workflows/ci.yml
# Add deployment steps
# Configure environment variables in GitHub repository settings
```

## 🔧 Advanced Configurations

### Adding New Features to the Boilerplate

To enhance the boilerplate for future projects:

1. **Add new dependencies:**

   ```bash
   npm install new-package
   # Update package.json and document in README
   ```

2. **Create new components:**

   ```bash
   # Add to src/components/
   # Include in component exports
   # Write corresponding tests
   ```

3. **Add new Redux slices:**
   ```bash
   # Create in src/store/slices/
   # Export from src/store/index.ts
   # Add types to src/types/index.ts
   ```

### Sharing Your Enhanced Boilerplate

1. **Update the boilerplate repository:**

   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin main
   ```

2. **Version your template:**

   ```bash
   git tag v1.1.0
   git push origin v1.1.0
   ```

3. **Create release notes:**
   - Document new features
   - List breaking changes
   - Provide migration guide

## 📚 Best Practices

1. **Keep the boilerplate minimal:** Only include features that are commonly needed
2. **Document everything:** Maintain clear documentation for all features
3. **Version control:** Tag releases and maintain changelog
4. **Test the template:** Regularly test project creation process
5. **Community feedback:** Accept contributions and feedback from users
6. **Update dependencies:** Regularly update to latest stable versions
7. **Security:** Keep dependencies updated for security patches

## 🐛 Troubleshooting

### Common Issues:

1. **Permission denied on scripts:**

   ```bash
   chmod +x create-project.sh template-setup.js
   ```

2. **Git not initialized:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Dependencies not installing:**

   ```bash
   # Clear npm cache
   npm cache clean --force
   # Delete node_modules and package-lock.json
   rm -rf node_modules package-lock.json
   # Reinstall
   npm install
   ```

4. **TypeScript errors:**
   ```bash
   # Run type check
   npm run type-check
   # Fix any type issues in the code
   ```

## 🚀 Happy Coding!

Your React TypeScript boilerplate is now ready to create amazing projects! Choose the method that best fits your workflow and start building your next great application.
