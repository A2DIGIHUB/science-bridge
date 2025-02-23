import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Search, Bell, User, ChevronDown, Home, BookOpen, Info,
  Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Youtube
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search:', searchQuery);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/blog', label: 'Blog', icon: BookOpen },
    { path: '/about', label: 'About', icon: Info },
  ];

  const socialLinks = [
    { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
    { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
    { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
    { href: 'https://youtube.com', icon: Youtube, label: 'YouTube' },
  ];

  const contactInfo = [
    { icon: Phone, content: '+1 (234) 567-890', href: 'tel:+1234567890' },
    { icon: Mail, content: 'info@dxn.org', href: 'mailto:info@dxn.org' },
    { icon: MapPin, content: '123 Innovation Drive, Tech City' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-10">
            {/* Contact Info */}
            <div className="hidden md:flex items-center space-x-6 text-sm">
              {contactInfo.map(({ icon: Icon, content, href }, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon className="h-4 w-4 text-gray-400" />
                  {href ? (
                    <a href={href} className="hover:text-primary transition-colors">
                      {content}
                    </a>
                  ) : (
                    <span>{content}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">DXN</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`text-sm font-medium transition-colors flex items-center gap-2 ${
                  isActive(path)
                    ? 'text-primary'
                    : 'text-accent/80 hover:text-primary'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </form>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
                <User className="h-5 w-5 text-gray-600" />
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-accent/5 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-accent" />
            ) : (
              <Menu className="h-6 w-6 text-accent" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            {/* Mobile Contact Info */}
            <div className="mb-4 space-y-2">
              {contactInfo.map(({ icon: Icon, content, href }, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                  <Icon className="h-4 w-4" />
                  {href ? (
                    <a href={href} className="hover:text-primary transition-colors">
                      {content}
                    </a>
                  ) : (
                    <span>{content}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Social Links */}
            <div className="flex items-center space-x-4 mb-4 pb-4 border-b">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col space-y-4">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors flex items-center gap-2 ${
                    isActive(path)
                      ? 'text-primary'
                      : 'text-accent/80 hover:text-primary'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
