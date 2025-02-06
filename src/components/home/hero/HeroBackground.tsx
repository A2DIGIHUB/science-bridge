import { motion } from 'framer-motion';
import { Atom, Brain, Microscope, Rocket } from 'lucide-react';

const HeroBackground = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.2, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-1/4 left-1/4 animate-float-slow"
      >
        <Atom className="w-16 h-16 text-[#9b87f5]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="absolute top-1/3 right-1/4 animate-float-medium"
      >
        <Brain className="w-20 h-20 text-[#7E69AB]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.25, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute bottom-1/4 left-1/3 animate-float-fast"
      >
        <Microscope className="w-14 h-14 text-[#6E59A5]" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.2, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute top-1/2 right-1/3 animate-float-medium"
      >
        <Rocket className="w-18 h-18 text-[#D6BCFA]" />
      </motion.div>
    </div>
  );
};

export default HeroBackground;