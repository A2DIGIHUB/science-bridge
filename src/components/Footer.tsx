import { Mail, Github, Linkedin, Globe, Copyright } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <footer className="w-full bg-accent text-white py-12 mt-20">
      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={{
            whileInView: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div className="space-y-4" variants={fadeInUp}>
            <h3 className="text-xl font-bold">SciComm</h3>
            <p className="text-sm text-gray-300">
              Bridging Science & Society through clear, engaging communication.
            </p>
          </motion.div>
          
          <motion.div className="space-y-4" variants={fadeInUp}>
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/articles', label: 'Articles' },
                { to: '/videos', label: 'Videos' },
                { to: '/events', label: 'Events' },
                { to: '/about', label: 'About Us' }
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link 
                    to={to} 
                    className="text-sm text-gray-300 hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div className="space-y-4" variants={fadeInUp}>
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group cursor-pointer">
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                contact@scicomm.com
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group cursor-pointer">
                <Globe className="w-4 h-4 group-hover:scale-110 transition-transform" />
                www.scicomm.com
              </li>
            </ul>
          </motion.div>
          
          <motion.div className="space-y-4" variants={fadeInUp}>
            <h4 className="font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              {[
                { href: 'https://github.com', Icon: Github },
                { href: 'https://linkedin.com', Icon: Linkedin }
              ].map(({ href, Icon }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={fadeInUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-300"
        >
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <Copyright className="w-4 h-4" />
            <span>2024 SciComm. All rights reserved.</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;