import React from 'react';
import { 
  FaTwitter, 
  FaLinkedin, 
  FaGithub, 
  FaFacebook,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight
} from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const links = [
    {
      title: "Product",
      items: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Integrations", href: "/integrations" },
        { name: "Roadmap", href: "/roadmap" }
      ]
    },
    {
      title: "Company",
      items: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
        { name: "Press", href: "/press" }
      ]
    },
    {
      title: "Resources",
      items: [
        { name: "Documentation", href: "/docs" },
        { name: "API Reference", href: "/api" },
        { name: "Community", href: "/community" },
        { name: "Webinars", href: "/webinars" }
      ]
    },
    {
      title: "Contact",
      items: [
        { name: "support@crmxeno.com", href: "mailto:support@crmxeno.com", icon: <FiMail className="mr-2" /> },
        { name: "+1 (800) 123-4567", href: "tel:+18001234567", icon: <FiPhone className="mr-2" /> },
        { name: "123 Business Ave, San Francisco", href: "https://maps.google.com", icon: <FiMapPin className="mr-2" /> }
      ]
    }
  ];

  const socialLinks = [
    { 
      icon: <FaTwitter />, 
      url: "https://twitter.com/crmxeno",
      name: "Twitter"
    },
    { 
      icon: <FaLinkedin />, 
      url: "https://linkedin.com/company/crmxeno",
      name: "LinkedIn"
    },
    { 
      icon: <FaGithub />, 
      url: "https://github.com/crmxeno",
      name: "GitHub"
    },
    { 
      icon: <FaFacebook />, 
      url: "https://facebook.com/crmxeno",
      name: "Facebook"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {links.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a 
                      href={item.href}
                      className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 group"
                      target={item.href.startsWith('http') ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                    >
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      <span>{item.name}</span>
                      {item.href.startsWith('http') && (
                        <FaArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform group-hover:translate-x-1" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="bg-blue-600 text-white p-2 rounded-lg mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">CRM Xeno</h4>
                  <p className="text-sm text-gray-400">Customer Relationship Management</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end space-y-4">
              <div className="flex space-x-6">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.url} 
                    className="text-gray-400 hover:text-white text-xl transition-all duration-300 transform hover:scale-110"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-400">
                  &copy; {new Date().getFullYear()} CRM Xeno. All rights reserved.
                </p>
                <div className="mt-2 flex flex-wrap justify-center md:justify-end space-x-4 text-xs text-gray-500">
                  <a href="/privacy" className="hover:text-gray-300">Privacy Policy</a>
                  <a href="/terms" className="hover:text-gray-300">Terms of Service</a>
                  <a href="/cookies" className="hover:text-gray-300">Cookie Policy</a>
                  <a href="/sitemap" className="hover:text-gray-300">Sitemap</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;