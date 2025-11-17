import { Outlet } from 'react-router-dom';

import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <div className="container mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
