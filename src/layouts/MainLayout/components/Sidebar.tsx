import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Database } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-[200px] bg-sidebar border-r border-sidebar-border h-full p-4 hidden rounded-tl-lg sm:block">
      <nav className="space-y-1">
        <SidebarItem
          icon={Home}
          label="Home"
          href="/home"
          active={location.pathname === '/home' || location.pathname === '/'}
          navigate={navigate}
        />

        <SidebarItem
          icon={Database}
          label="Data"
          href="/data"
          active={location.pathname.startsWith('/data')}
          navigate={navigate}
        />
      </nav>
    </div>
  );
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active: boolean;
  navigate: (path: string) => void;
}

function SidebarItem({ icon: Icon, label, href, active, navigate }: SidebarItemProps) {
  return (
    <div
      onClick={() => navigate(href)}
      className={clsx(
        'flex cursor-pointer items-center space-x-3 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-2 transition-colors duration-200 rounded-lg',
        {
          'bg-sidebar-primary text-sidebar-primary-foreground': active,
        }
      )}
    >
      <Icon className="size-4" />
      <span>{label}</span>
    </div>
  );
}
