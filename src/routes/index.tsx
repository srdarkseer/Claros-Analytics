import { useRoutes, Navigate } from 'react-router-dom';

// Layouts
import BlankLayout from '@/layouts/BlankLayout';
import MainLayout from '@/layouts/MainLayout';

// Pages
import Data from '@/pages/Data/Data';
import Home from '@/pages/Home';

export default function ThemeRoutes() {
  const routes = [
    // Public routes
    {
      path: '/login',
      element: <BlankLayout />,
      children: [
        {
          index: true,
          element: (
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Login Page</h1>
                <p className="text-muted-foreground">Add your login component here</p>
              </div>
            </div>
          ),
        },
      ],
    },

    // Protected routes with MainLayout
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Navigate to="/home" replace />,
        },
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'data',
          element: <Data />,
        },
      ],
    },

    // Redirect all other routes to login
    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },
  ];

  return useRoutes(routes);
}
