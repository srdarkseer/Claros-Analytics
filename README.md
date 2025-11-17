# Claros Analytics

A modern dashboard-style web application built with React, Redux, and TypeScript. This project demonstrates skills in React, Redux, CSS, API integration, and Git version control.

## 🎯 Project Overview

This dashboard application provides a responsive interface for displaying and managing data from external APIs. It features a sidebar navigation, data tables with filtering and pagination, and comprehensive error handling.

## ✨ Features

### Core Requirements

- **Dashboard Layout**
  - Responsive layout using TailwindCSS
  - Sidebar navigation with multiple links (Home, Data, etc.)
  - Dynamic main content area that updates based on navigation

- **API Integration**
  - Fetches data from publicly available APIs
  - Displays data in organized tables with appropriate columns

- **Interactivity**
  - Filtering and searching capabilities for table data
  - Pagination for efficient data navigation

- **Error Handling**
  - Comprehensive error handling for API calls
  - User-friendly error messages displayed when necessary

- **Version Control**
  - Clean Git history with meaningful commit messages
  - Feature branch workflow with pull requests

### Bonus Features

- **TypeScript** - Full type safety throughout the application
- **Unit Tests** - Jest and React Testing Library for component testing
- **E2E Tests** - Cypress for end-to-end testing
- **Deployment** - Ready for deployment on Netlify or Vercel

## 🛠️ Tech Stack

- **React** - UI library for building user interfaces
- **Redux** - State management for application data
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **shadcn/ui** - Beautiful, accessible component library
- **Git** - Version control

## ⚙️ Prerequisites

Make sure you have the following installed on your development machine:

- Node.js (version 22 or above)
- npm (package manager)
- Git

## 🚀 Getting Started

Follow these steps to get started with the Claros Analytics project:

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>
   ```

2. **Navigate to the project directory:**

   ```bash
   cd claros-analytics
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser:**

   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📜 Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the production-ready code
- `npm run lint` - Runs ESLint to analyze and lint the code
- `npm run lint:fix` - Runs ESLint and Prettier to fix and format code
- `npm run format` - Runs Prettier to format all files
- `npm run format:check` - Checks if files are properly formatted
- `npm run preview` - Starts the Vite development server in preview mode
- `npm test` - Runs unit tests (when implemented)
- `npm run test:e2e` - Runs end-to-end tests (when implemented)

## 📂 Project Structure

```
claros-analytics/
  ├── node_modules/      # Project dependencies
  ├── public/            # Public assets
  ├── src/               # Application source code
  │   ├── components/    # React components
  │   │   ├── ui/        # shadcn/ui components
  │   │   └── ...        # Custom components
  │   ├── store/         # Redux store configuration
  │   │   ├── slices/    # Redux slices
  │   │   └── index.ts   # Store setup
  │   ├── services/      # API service functions
  │   ├── hooks/         # Custom React hooks
  │   ├── styles/        # CSS stylesheets
  │   ├── lib/           # Utility functions
  │   ├── types/         # TypeScript type definitions
  │   ├── App.tsx        # Application entry point
  │   └── main.tsx       # Main rendering file
  ├── tests/             # Test files
  │   ├── unit/          # Unit tests
  │   └── e2e/           # End-to-end tests
  ├── eslint.config.js   # ESLint configuration
  ├── index.html         # HTML entry point
  ├── tsconfig.json      # TypeScript configuration
  └── vite.config.ts     # Vite configuration
```

## 🎨 Features in Detail

### Dashboard Layout

The application features a responsive sidebar navigation that allows users to switch between different views. The main content area dynamically updates based on the selected navigation item.

### API Integration

The application integrates with publicly available APIs to fetch and display data. All API calls are handled through Redux actions and reducers for centralized state management.

### Data Table

The data table component includes:

- **Filtering**: Search and filter data by various criteria
- **Pagination**: Navigate through large datasets efficiently
- **Sorting**: Sort columns in ascending or descending order
- **Responsive Design**: Adapts to different screen sizes

### Error Handling

Comprehensive error handling ensures a smooth user experience:

- Network error detection and user-friendly messages
- Loading states during API calls
- Empty state handling when no data is available
- Retry mechanisms for failed requests

## 🧪 Testing

### Unit Tests

Unit tests are written using Jest and React Testing Library to ensure component functionality and reliability.

```bash
npm test
```

### End-to-End Tests

End-to-end tests using Cypress verify the complete user workflow.

```bash
npm run test:e2e
```

## 📝 Commit Conventions

This project uses [Commitlint](https://commitlint.js.org/) to enforce commit message conventions. Follow the conventional commit format:

```
<type>: <subject>
```

**Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (non-functional)
- `refactor`: Code refactoring
- `test`: Adding or fixing tests
- `chore`: Other changes (build process, dependencies, etc.)

**Examples:**

- ✅ `feat: add user authentication`
- ✅ `fix: resolve login button issue`
- ✅ `docs: update API documentation`
- ✅ `feat: implement data table with filtering`
- ✅ `fix: handle API error responses`

## 🌐 Deployment

The application is configured for easy deployment on platforms like Netlify or Vercel:

1. **Build the application:**

   ```bash
   npm run build
   ```

3. **Deploy to Vercel:**
   - Connect your GitHub repository
   - Vercel will automatically detect Vite and configure the build


## 📄 License

This project is part of a technical assessment.

## 👤 Author
Sushant R. Dangal

Built as part of a technical assessment demonstrating React, Redux, and modern web development practices.
