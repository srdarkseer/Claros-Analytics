# Claros Analytics

A modern, production-ready dashboard-style web application built with React, Redux Toolkit, and TypeScript. This application demonstrates enterprise-level development practices including state management, API integration, comprehensive testing, and deployment strategies.

## Live Application

**Deployed URL:** https://claros-analytics.vercel.app/home

The application is live and accessible via the above URL. All routes are functional and the application is fully responsive across desktop, tablet, and mobile devices.

## Project Overview

Claros Analytics is a comprehensive analytics dashboard that provides users with an intuitive interface for viewing and managing data from external APIs. The application features a modern design with a responsive sidebar navigation, interactive data visualizations, data tables with advanced filtering and pagination, and robust error handling mechanisms.

The project was built following industry best practices including:

- Feature branch workflow with conventional commits
- Comprehensive test coverage (unit and E2E tests)
- Type-safe development with TypeScript
- Modern state management with Redux Toolkit
- Mobile-first responsive design
- Production-ready deployment configuration

## Core Features

### Dashboard Layout

The application features a fully responsive layout system with two main layouts:

**MainLayout:**

- Responsive sidebar navigation with collapsible functionality
- Top navigation bar with user avatar and theme toggle
- Mobile-responsive design that adapts to screen sizes
- Sidebar includes navigation links for Home and Data pages
- Smooth transitions and animations for better user experience

**BlankLayout:**

- Used for authentication pages (login, etc.)
- Clean, centered design for focused user interactions

The layout system ensures consistent user experience across all pages while maintaining flexibility for different content types.

### Home Dashboard Page

The Home page features a comprehensive analytics dashboard with:

**Key Performance Indicators (KPIs):**

- Total Users metric card with trend indicators
- Total Revenue with currency formatting
- Total Orders tracking
- Conversion Rate with percentage display
- All metrics show month-over-month change percentages with visual indicators (up/down arrows)

**Data Visualizations:**

- Revenue Trend Chart: Area chart displaying revenue, users, and orders over time with dual Y-axis support for different data scales
- Weekly Performance Chart: Bar chart showing sales and visitors for the past week
- Category Distribution: Pie chart displaying revenue breakdown by product categories
- Top Products: Horizontal bar chart showing best performing products
- Top Products Table: Detailed table with sales and revenue data

All charts are built using Recharts library with:

- Distinct color schemes for better visual differentiation
- Responsive design that adapts to mobile screens
- Interactive tooltips for detailed data exploration
- Proper axis labeling and legends
- Mobile-optimized sizing and margins to prevent overflow

### Data Management Page

The Data page provides comprehensive data management capabilities:

**API Integration:**

- Fetches data from JSONPlaceholder API (users and posts endpoints)
- Configurable API base URL via environment variables with fallback
- Support for multiple data types (users, posts) with type-safe interfaces
- Automatic data fetching on component mount

**Data Table Features:**

- Responsive table design that adapts to screen sizes
- Real-time search and filtering across all table columns
- Advanced pagination with:
  - Page size selection (10, 25, 50, 100 items per page)
  - Page navigation with ellipsis for large datasets
  - Current page and total pages display
  - Previous/Next navigation buttons
- Loading states with skeleton loaders
- Empty states with helpful messages
- Error states with retry functionality

**Data Type Selection:**

- Dropdown selector to switch between Users and Posts data
- Automatic table column adaptation based on selected data type
- State persistence during navigation

### State Management with Redux Toolkit

The application uses Redux Toolkit for centralized state management with the following slices:

**Data Slice (`dataSlice.ts`):**

- Manages API data fetching state
- Handles loading, success, and error states
- Tracks retry attempts for failed requests
- Stores last fetched timestamp for caching
- Async thunks for fetching users and posts
- Automatic error handling and state updates

**Filter Slice (`filterSlice.ts`):**

- Manages search and filter state
- Debounced search functionality
- Filter state persistence
- Reset filter actions

**Pagination Slice (`paginationSlice.ts`):**

- Manages pagination state (current page, page size)
- Calculates total pages based on filtered data
- Handles page navigation logic
- Page size change handlers

**Error Slice (`errorSlice.ts`):**

- Centralized error state management
- Error message display
- Error clearing functionality
- Integration with API error handling

All slices use Redux Toolkit's modern patterns including:

- `createSlice` for reducer logic
- `createAsyncThunk` for async operations
- Type-safe actions and state
- Selectors for efficient data access

### API Service Layer

The API service layer (`src/services/api.ts`) provides:

**Features:**

- Generic API fetch function with error handling
- Retry mechanism with exponential backoff
- Type-safe API responses
- Configurable base URL from environment variables
- Support for multiple endpoints (users, posts)
- Comprehensive error messages

**Retry Mechanism:**

- Automatic retry on API failures
- Exponential backoff strategy (1s, 2s, 4s delays)
- Configurable retry attempts (default: 3)
- User-friendly error messages after retry exhaustion
- Retry button for manual retry attempts

**Configuration:**

- API base URL read from `VITE_API_BASE_URL` environment variable
- Fallback to JSONPlaceholder API if environment variable not set
- Centralized configuration in `src/config/api.ts`

### Error Handling

Comprehensive error handling throughout the application:

**API Error Handling:**

- Network error detection and user-friendly messages
- HTTP status code handling
- Retry mechanism for transient failures
- Error state management in Redux
- User-facing error messages with retry options

**UI Error States:**

- Loading skeletons during data fetching
- Empty state messages when no data available
- Error banners with actionable retry buttons
- Graceful degradation on API failures

**Error Recovery:**

- Automatic retry with exponential backoff
- Manual retry button for user-initiated retries
- Error state clearing on successful operations
- Persistent error messages until resolved

### Responsive Design

The application is fully responsive with mobile-first design principles:

**Breakpoints:**

- Mobile: Default styles (320px+)
- Tablet: `sm:` breakpoint (640px+)
- Desktop: `lg:` breakpoint (1024px+)

**Mobile Optimizations:**

- Collapsible sidebar navigation
- Touch-friendly button sizes
- Optimized chart sizing and margins
- Horizontal scroll prevention
- Responsive table layouts
- Mobile-optimized pagination controls

**Chart Responsiveness:**

- Charts adapt to container width
- Mobile-specific margin adjustments
- Font size scaling for readability
- Overflow prevention with proper constraints
- Dual Y-axis support for different data scales

## Technology Stack

### Core Technologies

**Frontend Framework:**

- React 19.0.0 - Modern React with latest features
- TypeScript 5.8.2 - Type-safe development
- Vite 6.2.3 - Fast build tool and dev server

**State Management:**

- Redux Toolkit 2.10.1 - Modern Redux with simplified API
- React-Redux 9.2.0 - React bindings for Redux

**Routing:**

- React Router DOM 7.9.6 - Client-side routing
- Nested route support with layout components

**Styling:**

- TailwindCSS 4.0.17 - Utility-first CSS framework
- shadcn/ui - Accessible component library built on Radix UI
- Lucide React - Modern icon library

**Data Visualization:**

- Recharts 3.0.2 - Composable charting library
- Custom chart configurations with distinct color schemes

### Development Tools

**Code Quality:**

- ESLint 9.30.1 - JavaScript/TypeScript linting
- Prettier 3.6.2 - Code formatting
- TypeScript ESLint - TypeScript-specific linting rules
- Husky 9.1.7 - Git hooks for pre-commit checks
- lint-staged 16.1.2 - Run linters on staged files

**Testing:**

- Jest 29.7.0 - Unit testing framework
- React Testing Library 16.3.0 - React component testing
- Cypress 14.5.4 - End-to-end testing
- ts-jest 29.4.5 - TypeScript support for Jest

**Build Tools:**

- Vite - Fast build tool with HMR
- TypeScript compiler for type checking
- Production optimizations and code splitting

## Project Structure

```
claros-analytics/
├── __tests__/                    # Centralized test directory
│   ├── lib/                      # Utility function tests
│   ├── pages/                    # Page component tests
│   ├── services/                 # API service tests
│   ├── store/                    # Redux slice tests
│   │   └── slices/               # Individual slice tests
│   ├── utils/                    # Utility function tests
│   ├── jest-env.d.ts            # Jest environment types
│   └── setupTests.ts             # Test setup configuration
├── cypress/                      # E2E testing
│   ├── e2e/                      # E2E test files
│   │   ├── data-fetching.cy.ts   # Data fetching tests
│   │   ├── error-handling.cy.ts  # Error handling tests
│   │   ├── filtering.cy.ts       # Filtering functionality tests
│   │   ├── navigation.cy.ts     # Navigation flow tests
│   │   └── pagination.cy.ts      # Pagination tests
│   ├── fixtures/                 # Test data fixtures
│   └── support/                  # Cypress support files
├── src/
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components
│   │   └── count-btn.tsx         # Custom components
│   ├── config/                   # Configuration files
│   │   └── api.ts                # API configuration
│   ├── data/                     # Mock data
│   │   └── mockDashboard.ts      # Dashboard mock data
│   ├── layouts/                  # Layout components
│   │   ├── BlankLayout/          # Blank layout for auth pages
│   │   └── MainLayout/           # Main app layout
│   │       ├── components/       # Layout sub-components
│   │       │   ├── Sidebar.tsx   # Sidebar navigation
│   │       │   └── Topbar.tsx    # Top navigation bar
│   │       └── MainLayout.tsx    # Main layout component
│   ├── lib/                      # Utility libraries
│   │   └── utils.ts              # Common utilities
│   ├── pages/                    # Page components
│   │   ├── Data/                 # Data management page
│   │   │   ├── components/       # Data page components
│   │   │   │   ├── DataTable.tsx      # Main data table
│   │   │   │   ├── DataPagination.tsx # Pagination component
│   │   │   │   └── SearchFilter.tsx   # Search/filter component
│   │   │   └── Data.tsx          # Data page main component
│   │   └── Home/                 # Home dashboard page
│   │       ├── Home.tsx          # Dashboard component
│   │       └── index.ts          # Page exports
│   ├── routes/                   # Route configuration
│   │   └── index.tsx             # Route definitions
│   ├── services/                 # API services
│   │   └── api.ts                # API service functions
│   ├── store/                    # Redux store
│   │   ├── slices/               # Redux slices
│   │   │   ├── dataSlice.ts      # Data state management
│   │   │   ├── errorSlice.ts     # Error state management
│   │   │   ├── filterSlice.ts    # Filter state management
│   │   │   └── paginationSlice.ts # Pagination state
│   │   ├── hooks.ts              # Typed Redux hooks
│   │   ├── selectors.ts          # Redux selectors
│   │   └── index.ts              # Store configuration
│   ├── styles/                   # Global styles
│   │   └── globals.css           # Global CSS and Tailwind
│   ├── types/                    # TypeScript types
│   │   └── api.ts                # API type definitions
│   ├── utils/                    # Utility functions
│   │   └── retry.ts              # Retry mechanism utility
│   ├── App.tsx                   # Root component
│   └── main.tsx                  # Application entry point
├── public/                       # Public assets
├── .gitignore                    # Git ignore rules
├── cypress.config.mjs            # Cypress configuration
├── eslint.config.js              # ESLint configuration
├── jest.config.js                # Jest configuration
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── vercel.json                   # Vercel deployment config
└── vite.config.ts                # Vite configuration
```

## Testing Strategy

### Unit Testing

Unit tests are written using Jest and React Testing Library, located in the `__tests__` directory at the project root. All test files are centralized in this single directory for better organization.

**Test Coverage:**

- Redux slices: dataSlice, filterSlice, paginationSlice
- API service functions: fetchUsers, fetchPosts, error handling
- Utility functions: retry mechanism, utility helpers
- Component tests: DataTable, SearchFilter, DataPagination

**Test Configuration:**

- Jest with ts-jest for TypeScript support
- React Testing Library for component testing
- Mock API responses for isolated testing
- Timer mocks for retry mechanism testing
- Custom test setup with global mocks

**Running Unit Tests:**

```bash
npm test                 # Run tests once
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

### End-to-End Testing

E2E tests are written using Cypress and cover complete user workflows.

**Test Suites:**

- Navigation flow: Testing sidebar navigation and route changes
- Data fetching: Verifying API integration and data display
- Filtering: Testing search and filter functionality
- Pagination: Testing pagination controls and page navigation
- Error handling: Testing error states and retry mechanisms

**Cypress Configuration:**

- Custom commands for common operations
- Fixtures for test data
- Screenshot capture on failures
- Video recording for debugging

**Running E2E Tests:**

```bash
npm run e2e              # Run E2E tests headlessly
npm run e2e:open         # Open Cypress test runner
```

## Development Workflow

### Git Workflow

The project follows a feature branch workflow with conventional commits:

**Branch Strategy:**

- `main` - Production-ready code
- `feat/*` - Feature branches (e.g., `feat/api-integration`)
- `design/*` - Design/UI branches (e.g., `design/home`)

**Commit Convention:**
All commits follow the conventional commit format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Test additions or changes
- `refactor:` - Code refactoring
- `chore:` - Build process or dependency updates

**Example Commits:**

- `feat: implement dashboard page with metrics and charts`
- `fix: add vercel.json for spa routing`
- `feat: add filtering and pagination functionality`
- `test: add unit tests for Redux slices`

### Code Quality

**Pre-commit Hooks:**

- Husky runs lint-staged before commits
- ESLint checks for code quality issues
- Prettier formats code automatically
- TypeScript type checking

**Linting:**

```bash
npm run lint              # Check for linting errors
npm run lint:fix          # Fix linting errors automatically
```

**Formatting:**

```bash
npm run format            # Format all files
npm run format:check      # Check formatting without changes
```

## Deployment

### Vercel Deployment

The application is deployed on Vercel with the following configuration:

**Deployment URL:** https://claros-analytics.vercel.app/home

**Vercel Configuration (`vercel.json`):**
The `vercel.json` file is configured to handle Single Page Application (SPA) routing. This ensures that all routes are properly handled by React Router, preventing 404 errors when users navigate directly to routes or reload pages.

**Why vercel.json is needed:**
When deploying a React SPA, the server needs to be configured to serve `index.html` for all routes. Without this configuration, direct navigation to routes like `/home` or `/data` would result in 404 errors because the server looks for a file at that path. The `vercel.json` rewrite rule ensures all requests are served through `index.html`, allowing React Router to handle routing client-side.

**Environment Variables:**

- `VITE_API_BASE_URL` - API base URL (optional, defaults to JSONPlaceholder)

### Build Process

**Production Build:**

```bash
npm run build
```

## Getting Started

### Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:srdarkseer/Claros-Analytics.git
   cd claros-analytics
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Environment Setup

Create a `.env` file in the root directory (optional):

```env
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
```

If not provided, the application defaults to JSONPlaceholder API.

## Available Scripts

### Development

- `npm run dev` - Start development server with hot module replacement
- `npm run preview` - Preview production build locally

### Building

- `npm run build` - Build production-ready code with optimizations

### Code Quality

- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix linting errors and format code
- `npm run format` - Format all files with Prettier
- `npm run format:check` - Check if files are properly formatted

### Testing

- `npm test` - Run unit tests with Jest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report
- `npm run e2e` - Run Cypress E2E tests headlessly
- `npm run e2e:open` - Open Cypress test runner GUI

## Key Implementation Details

### Why Redux Toolkit?

Redux Toolkit was chosen for state management because:

- Simplified Redux boilerplate with `createSlice`
- Built-in support for async operations with `createAsyncThunk`
- TypeScript-first design with excellent type inference
- DevTools integration for debugging
- Industry-standard state management solution
- Better performance with optimized selectors

### Why React Router?

React Router provides:

- Client-side routing without page reloads
- Nested route support for layout components
- Programmatic navigation
- Route-based code splitting capabilities
- Browser history integration

### Why Vite?

Vite was chosen as the build tool because:

- Extremely fast development server with instant HMR
- Optimized production builds
- Native ES modules support
- Excellent TypeScript support
- Plugin ecosystem for React and TailwindCSS

### Why TailwindCSS?

TailwindCSS provides:

- Utility-first approach for rapid development
- Consistent design system
- Mobile-first responsive design
- Small production bundle size with purging
- Easy customization and theming

### Why Recharts?

Recharts was chosen for data visualization because:

- Composable and flexible chart components
- Built on D3.js for powerful visualizations
- Responsive by default
- TypeScript support
- Active community and maintenance

### Why Jest and React Testing Library?

Jest and React Testing Library provide:

- Zero-configuration testing setup
- Fast test execution
- Component testing focused on user behavior
- Excellent TypeScript support
- Rich assertion library

### Why Cypress?

Cypress provides:

- End-to-end testing in real browser environment
- Time-travel debugging
- Automatic waiting and retries
- Screenshot and video recording
- Great developer experience

## Architecture Decisions

### Centralized Test Directory

All test files are located in a single `__tests__` directory at the project root. This approach:

- Makes it easy to find all tests
- Allows for shared test utilities
- Simplifies test configuration
- Follows common testing patterns

### Feature-Based Redux Slices

Redux slices are organized by feature (data, filter, pagination, error). This:

- Keeps related state together
- Makes code more maintainable
- Allows for easier testing
- Follows Redux Toolkit best practices

### Service Layer Pattern

API calls are abstracted into a service layer. This:

- Separates concerns (UI vs data fetching)
- Makes API calls reusable
- Easier to mock for testing
- Centralized error handling

### Component Composition

Components are built using composition patterns:

- Reusable UI components from shadcn/ui
- Layout components for consistent structure
- Page components for route-specific content
- Small, focused components for better maintainability

## Performance Optimizations

### Code Splitting

- Route-based code splitting with React Router
- Lazy loading for better initial load time

### Build Optimizations

- Tree-shaking to remove unused code
- Minification for smaller bundle sizes
- Asset optimization

### Runtime Optimizations

- Memoized selectors in Redux
- Efficient re-renders with React
- Debounced search inputs
- Optimized chart rendering

## License

This project is part of a technical assessment.

## Author

Sushant R. Dangal

Built as part of a technical assessment demonstrating React, Redux, TypeScript, and modern web development practices.
