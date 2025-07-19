import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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

const AdminApp = () => {
  const location = useLocation();
  const isLogin = location.pathname.endsWith("/login");

  if (isLogin) {
    return <Login />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-56 flex items-center justify-center bg-muted min-h-screen p-8">
        <div className="w-full max-w-4xl animate-fade-in bg-white rounded-2xl shadow-xl p-8 min-h-[60vh]">
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
        </div>
      </div>
    </div>
  );
};

export default AdminApp; 