import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="px-4 py-12 border-b border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated with DXN</h2>
            <p className="text-gray-300 mb-8">
              Subscribe to our newsletter for the latest scientific discoveries, tech innovations, and groundbreaking research.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-primary hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2 text-white font-medium"
              >
                <span>Subscribe</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-4 py-16">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">DXN</h3>
            <p className="text-gray-300 mb-6">
              Bridging the gap between complex scientific discoveries and public understanding through engaging, accurate, and accessible content.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Articles
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Categories</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/articles?category=physics" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Physics
                </Link>
              </li>
              <li>
                <Link to="/articles?category=biology" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Biology
                </Link>
              </li>
              <li>
                <Link to="/articles?category=technology" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/articles?category=space" className="text-gray-300 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Space
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <a 
                href="mailto:info@dxn.org" 
                className="flex items-center text-gray-300 hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5 mr-3" />
                <span>info@dxn.org</span>
              </a>
              <a 
                href="tel:+1234567890" 
                className="flex items-center text-gray-300 hover:text-primary transition-colors"
              >
                <Phone className="h-5 w-5 mr-3" />
                <span>+1 (234) 567-890</span>
              </a>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-3 flex-shrink-0" />
                <span>123 Innovation Drive, Tech City, TC 12345</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} DXN. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-sm text-gray-400 hover:text-primary transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
