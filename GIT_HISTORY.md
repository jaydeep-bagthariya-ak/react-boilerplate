# Git History Management

This document explains how to handle the git history when using this React TypeScript Boilerplate.

## The Problem

When you clone this repository, you get the complete git history including all the boilerplate development commits. This means your project will show commits like:

- "Initial commit: React TypeScript boilerplate with Vite, Redux Toolkit, i18n, and testing setup"
- "feat: add language switch and current language translation keys"
- "feat: Upgrade to React 19 and update related dependencies"
- etc.

This is usually not what you want for a new project.

## Solutions

### Option 1: Clean Setup Script (Recommended)

Use the `setup-project-clean.sh` script which automatically resets the git history:

```bash
git clone https://github.com/jaydeep-bagthariya-ak/react-boilerplate.git my-project
cd my-project
./setup-project-clean.sh my-project
```

This script will:

- Remove the existing `.git` directory
- Initialize a new git repository
- Create a clean initial commit with your project name

### Option 2: Interactive Setup Script

Use the `setup-project.sh` script which gives you the choice:

```bash
git clone https://github.com/jaydeep-bagthariya-ak/react-boilerplate.git my-project
cd my-project
./setup-project.sh my-project
```

This script will ask you:

```
Do you want to reset the git history and start fresh? (y/N):
```

- Choose `y` to reset the git history (recommended)
- Choose `n` to keep the boilerplate history

### Option 3: Manual Reset

If you want to manually reset the git history:

```bash
# Remove existing git history
rm -rf .git

# Initialize new repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: My Project"
```

### Option 4: Keep Boilerplate History

If you want to keep the boilerplate history for reference, you can:

1. Just use the repository as-is after cloning
2. Add your first commit on top of the existing history
3. Optionally add a tag to mark where your project starts:

```bash
git tag -a "project-start" -m "Start of my project"
```

## Best Practices

1. **For new projects**: Use Option 1 (clean setup) for a professional git history
2. **For learning**: Use Option 2 to understand what the boilerplate includes
3. **For contributing back**: Keep the original history if you plan to contribute improvements back to the boilerplate

## Checking Your Git History

To see your current git history:

```bash
git log --oneline -10
```

A clean setup should show only your project commits, while keeping the boilerplate history will show all the development commits.

## Remote Repository

After resetting the git history, you'll need to:

1. Create a new repository on GitHub/GitLab/etc.
2. Add it as your remote:

```bash
git remote add origin https://github.com/yourusername/your-project.git
git branch -M main
git push -u origin main
```

If you kept the boilerplate history, you should change the remote to point to your new repository:

```bash
git remote set-url origin https://github.com/yourusername/your-project.git
```
