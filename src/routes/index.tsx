import { useRoutes, Navigate } from 'react-router-dom';

// Layouts
import BlankLayout from '@/layouts/BlankLayout';
import MainLayout from '@/layouts/MainLayout';

// Pages - You can add your pages here
// import Login from "@/pages/Auth/Login/Login";
// import Dashboard from "@/pages/Dashboard/Dashboard";

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
          element: (
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">Home</h1>
              <p className="text-muted-foreground">Welcome to Claros Analytics Dashboard</p>
            </div>
          ),
        },
        {
          path: 'data',
          element: (
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">Data</h1>
              <p className="text-muted-foreground">
                Data table with API integration will be displayed here
              </p>
            </div>
          ),
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
