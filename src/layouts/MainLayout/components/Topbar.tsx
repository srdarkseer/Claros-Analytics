import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Menu, Home, Database, Settings, LogOut } from 'lucide-react';
import clsx from 'clsx';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active: boolean;
  navigate: (path: string) => void;
  onItemClick: () => void;
}

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  active,
  navigate,
  onItemClick,
}: SidebarItemProps) => (
  <div
    onClick={() => {
      navigate(href);
      onItemClick();
    }}
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

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getUserInitials = () => {
    return 'A';
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <>
      <header className="w-full px-4 sm:px-10 h-16 bg-sidebar text-primary-foreground flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="sm:hidden text-primary-foreground hover:bg-primary/80"
              >
                <Menu className="size-5 text-white" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] bg-sidebar border-sidebar-border">
              <div className="flex justify-center mb-6">
                <div className="w-32 h-20 flex items-center justify-center">
                  <span className="font-bold"> Claros Analytics</span>
                </div>
              </div>
              <nav className="space-y-1 mx-4">
                <SidebarItem
                  icon={Home}
                  label="Home"
                  href="/home"
                  active={location.pathname === '/home' || location.pathname === '/'}
                  navigate={navigate}
                  onItemClick={() => setIsOpen(false)}
                />

                <SidebarItem
                  icon={Database}
                  label="Data"
                  href="/data"
                  active={location.pathname.startsWith('/data')}
                  navigate={navigate}
                  onItemClick={() => setIsOpen(false)}
                />
              </nav>
            </SheetContent>
          </Sheet>

          <div className="w-32 h-20 hidden sm:flex items-center justify-center rounded">
            <span className="text-sidebar-primary-foreground font-bold text-sm">
              Claros Analytics
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="border-none hover:border-none" asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="size-8 text-white">
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">User Name</p>
                  <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>
                <Settings className="mr-2 size-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 size-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};

export default Topbar;
