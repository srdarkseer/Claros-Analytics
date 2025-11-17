import React from 'react';
import { Outlet } from 'react-router-dom';

const BlankLayout: React.FC = () => {
  return (
    <div className="h-screen relative bg-background">
      <main className="h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default BlankLayout;
