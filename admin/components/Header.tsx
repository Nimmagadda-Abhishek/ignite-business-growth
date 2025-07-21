import React from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const pageTitle = location.pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'Dashboard';

  return (
    <header className="admin-header">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-2 -ml-2 text-foreground"
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <h1 className="text-xl font-semibold capitalize text-foreground">
          {pageTitle}
        </h1>
      </div>
    </header>
  );
};

export default Header; 