import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Testimonials from "./pages/Testimonials";
import About from "./pages/About";
import Internship from "./pages/Internship";
import Contact from "./pages/Contact";
import ProtectedRoute from "./components/ProtectedRoute";
import Team from "./pages/Team";
import FooterLinks from "./pages/FooterLinks";
import SocialLinks from "./pages/SocialLinks";
import AdditionalServices from "./pages/AdditionalServices";
import AdminUsers from "./pages/AdminUsers";
import ContactSubmissions from "./pages/ContactSubmissions";
import QuoteSubmissions from "./pages/QuoteSubmissions";
import InternshipSubmissions from "./pages/InternshipSubmissions";
import Header from "./components/Header";
import { cn } from "./lib/utils";

const AdminAppContent = () => {
  const location = useLocation();
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isLogin = location.pathname.endsWith("/login");

  useEffect(() => {
    // Close mobile sidebar on route change
    setIsMobileOpen(false);
  }, [location.pathname]);

  if (isLogin) {
    return <Login />;
  }

  return (
    <div className="relative min-h-screen bg-background">
      <Sidebar 
        isDesktopCollapsed={isDesktopCollapsed}
        isMobileOpen={isMobileOpen}
        toggleDesktopCollapse={() => setIsDesktopCollapsed(prev => !prev)}
        toggleMobileOpen={() => setIsMobileOpen(prev => !prev)}
      />
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        isDesktopCollapsed ? "md:ml-20" : "md:ml-64"
      )}>
        <Header 
          isSidebarOpen={isMobileOpen}
          toggleSidebar={() => setIsMobileOpen(prev => !prev)}
        />
        <main className="admin-content p-6">
          <Routes>
            <Route path="services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
            <Route path="portfolio" element={<ProtectedRoute><Portfolio /></ProtectedRoute>} />
            <Route path="testimonials" element={<ProtectedRoute><Testimonials /></ProtectedRoute>} />
            <Route path="about" element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path="internship" element={<ProtectedRoute><Internship /></ProtectedRoute>} />
            <Route path="contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
            <Route path="team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
            <Route path="footer-links" element={<ProtectedRoute><FooterLinks /></ProtectedRoute>} />
            <Route path="social-links" element={<ProtectedRoute><SocialLinks /></ProtectedRoute>} />
            <Route path="additional-services" element={<ProtectedRoute><AdditionalServices /></ProtectedRoute>} />
            <Route path="admin-users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
            <Route path="contact-submissions" element={<ProtectedRoute><ContactSubmissions /></ProtectedRoute>} />
            <Route path="quote-submissions" element={<ProtectedRoute><QuoteSubmissions /></ProtectedRoute>} />
            <Route path="internship-submissions" element={<ProtectedRoute><InternshipSubmissions /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="services" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const AdminApp = () => (
  <BrowserRouter>
    <AdminAppContent />
  </BrowserRouter>
);

export default AdminApp; 