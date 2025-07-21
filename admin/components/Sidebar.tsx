import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Briefcase, BookOpen, Info, Award, Phone, Link2, LogOut, Layers, UserCog, ListChecks, Globe2, Mail, FileText, FilePlus, ChevronLeft } from "lucide-react";
import { cn } from "../lib/utils";
import logo from "../assets/logo.png";

const navItems = [
  { name: "Services", path: "services", icon: Layers },
  { name: "Portfolio", path: "portfolio", icon: Briefcase },
  { name: "Testimonials", path: "testimonials", icon: BookOpen },
  { name: "About", path: "about", icon: Info },
  { name: "Milestones", path: "internship", icon: Award },
  { name: "Contact", path: "contact", icon: Phone },
  { name: "Contact Submissions", path: "contact-submissions", icon: Mail },
  { name: "Quote Submissions", path: "quote-submissions", icon: FileText },
  { name: "Team", path: "team", icon: Users },
  { name: "Footer Links", path: "footer-links", icon: Link2 },
  { name: "Social Links", path: "social-links", icon: Globe2 },
  { name: "Additional Services", path: "additional-services", icon: ListChecks },
  { name: "Admin Users", path: "admin-users", icon: UserCog },
  { name: "Internship Submissions", path: "internship-submissions", icon: FilePlus },
  { name: "Logout", path: "login", icon: LogOut },
];


interface SidebarProps {
  isDesktopCollapsed: boolean;
  isMobileOpen: boolean;
  toggleDesktopCollapse: () => void;
  toggleMobileOpen: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isDesktopCollapsed, 
  isMobileOpen, 
  toggleDesktopCollapse, 
  toggleMobileOpen 
}) => {
  const location = useLocation();

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileOpen]);

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 md:hidden" 
          onClick={toggleMobileOpen}
          aria-hidden="true"
        ></div>
      )}

      <nav className={cn(
        "admin-sidebar fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out",
        isDesktopCollapsed ? "w-20" : "w-64",
        "transform -translate-x-full md:transform-none",
        isMobileOpen && "transform-none"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className={cn("flex items-center gap-2 overflow-hidden", isDesktopCollapsed && "w-12 justify-center")}>
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-lg shadow-lg flex-shrink-0" />
            {!isDesktopCollapsed && (
              <span className="text-xl font-bold text-sidebar-foreground whitespace-nowrap">
                Admin
              </span>
            )}
          </div>
          <button
            className="p-2 rounded-full hover:bg-sidebar-accent hidden md:block"
            onClick={toggleDesktopCollapse}
            aria-label={isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft className={cn("w-6 h-6 text-sidebar-foreground transition-transform", isDesktopCollapsed && "rotate-180")} />
          </button>
        </div>
      
        <ul className="flex-1 space-y-1 px-2 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname.endsWith(item.path);
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => {
                    if (isMobileOpen) toggleMobileOpen();
                  }}
                  className={cn(
                    "admin-sidebar-item",
                    isActive && "active",
                    isDesktopCollapsed && "justify-center px-2"
                  )}
                  title={isDesktopCollapsed ? item.name : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isDesktopCollapsed && <span className="truncate">{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar; 