import { Mail, Github, Linkedin, Globe, Copyright } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-accent text-white py-12 mt-20">
      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">SciComm</h3>
            <p className="text-sm text-gray-300">
              Bridging Science & Society through clear, engaging communication.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/articles" className="text-sm text-gray-300 hover:text-white transition-colors">Articles</Link></li>
              <li><Link to="/videos" className="text-sm text-gray-300 hover:text-white transition-colors">Videos</Link></li>
              <li><Link to="/events" className="text-sm text-gray-300 hover:text-white transition-colors">Events</Link></li>
              <li><Link to="/about" className="text-sm text-gray-300 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                contact@scicomm.com
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Globe className="w-4 h-4" />
                www.scicomm.com
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-gray-300 hover:text-white transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 flex items-center justify-between text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <Copyright className="w-4 h-4" />
            <span>2024 SciComm. All rights reserved.</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
