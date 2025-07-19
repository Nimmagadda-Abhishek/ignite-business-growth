import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Briefcase, BookOpen, Info, Award, Phone, Link2, Settings, LogOut, Layers, UserCog, ListChecks, Globe2, Mail, FileText, FilePlus } from "lucide-react";
import logo from "../../assets/logo.png";

const navItems = [
  { name: "Dashboard", path: "dashboard", icon: LayoutDashboard },
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

const Sidebar = () => {
  const location = useLocation();
  return (
    <nav className="fixed left-0 top-0 h-full w-60 bg-gradient-to-b from-primary to-accent shadow-2xl flex flex-col py-8 z-40 transition-all duration-300 overflow-y-auto">
      <div className="flex flex-col items-center mb-10">
        <img src={logo} alt="Logo" className="w-14 h-14 rounded-lg shadow-lg mb-2 animate-fade-in" />
        <span className="text-2xl font-extrabold tracking-wide text-white drop-shadow-lg">Admin Panel</span>
      </div>
      <ul className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname.endsWith(item.path);
          const Icon = item.icon;
          return (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg font-semibold transition-all duration-200 relative overflow-hidden
                  ${isActive ? "bg-white/30 text-white shadow-md scale-105" : "hover:bg-white/10 hover:scale-105 text-white/80"}
                  group`}
              >
                <Icon className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                  <span className="absolute left-0 top-0 w-full h-full bg-white/20 rounded-lg animate-slide-in z-0" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar; 