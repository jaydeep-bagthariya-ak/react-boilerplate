<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# React TypeScript Boilerplate Copilot Instructions

This is a modern React TypeScript boilerplate project. When working on this codebase, please follow these guidelines:

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Redux Toolkit** for state management
- **React i18next** for internationalization
- **Axios** for HTTP requests
- **Vitest + Testing Library** for testing
- **ESLint + Prettier** for code quality
- **Husky** for git hooks

## Code Style Guidelines

- Use functional components with hooks
- Prefer TypeScript strict mode
- Use proper type annotations
- Follow the established folder structure
- Use descriptive variable and function names
- Write tests for components and utilities

## Folder Structure

- `src/components/` - Reusable UI components
- `src/components/ui/` - Basic UI components (buttons, inputs, etc.)
- `src/hooks/` - Custom React hooks
- `src/store/` - Redux store and slices
- `src/services/` - API services and external integrations
- `src/utils/` - Utility functions
- `src/types/` - TypeScript type definitions
- `src/i18n/` - Internationalization configuration
- `src/tests/` - Test files

## Best Practices

- Use Redux Toolkit for state management
- Implement proper error handling
- Write comprehensive tests
- Use semantic HTML elements
- Implement accessibility features
- Follow responsive design principles
- Use proper TypeScript types instead of 'any'
- Implement proper loading and error states

## Testing

- Write unit tests for components
- Use Testing Library best practices
- Mock external dependencies
- Test user interactions and edge cases

## i18n

- Use translation keys for all user-facing text
- Support multiple languages (English and Spanish included)
- Use proper interpolation for dynamic content
