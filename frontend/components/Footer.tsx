import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAll } from '../api';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface FooterLink {
  name: string;
  path: string;
  type: string;
}
interface ContactInfo {
  type: string;
  title: string;
  value: string;
}
interface SocialLink {
  name: string;
  url: string;
}

const iconMap: Record<string, any> = {
  address: MapPin,
  phone: Phone,
  email: Mail,
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

const Footer = () => {
  const [links, setLinks] = useState<FooterLink[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    getAll('footer_links').then(setLinks);
    getAll('contact_info').then(setContactInfo);
    getAll('social_links').then(setSocialLinks);
  }, []);

  const quickLinks = links.filter((link: FooterLink) => link.type === 'quick');
  const services = links.filter((link: FooterLink) => link.type === 'service');

  return (
    <footer className="bg-foreground text-white">
      <div className="container-width">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">ADW</span>
                </div>
                <span className="text-xl font-bold">Asian Digital World</span>
              </Link>
              <p className="text-gray-300 text-sm leading-relaxed">
                Empowering businesses with scalable digital solutions. Asian Digital World specializes in web development, app development, and digital marketing.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = iconMap[social.name.toLowerCase()] || Facebook;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link: FooterLink) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Services</h3>
              <ul className="space-y-2">
                {services.map((service: FooterLink) => (
                  <li key={service.name}>
                    <Link
                      to={service.path}
                      className="text-gray-300 hover:text-primary transition-colors text-sm"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact</h3>
              <div className="space-y-3">
                {contactInfo.map((info) => {
                  const Icon = iconMap[info.type.toLowerCase()] || MapPin;
                  return (
                    <div key={info.type} className="flex items-start space-x-3">
                      <Icon className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-gray-300 text-sm">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} TechSolutions. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="btn-outline border-white text-white hover:bg-white hover:text-primary inline-flex items-center text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="btn-outline border-white text-white hover:bg-white hover:text-primary inline-flex items-center text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;