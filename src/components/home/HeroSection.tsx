
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroBackground from './hero/HeroBackground';
import HeroContent from './hero/HeroContent';
import HeroCarousel from './hero/HeroCarousel';
import HeroStats from './hero/HeroStats';

const HeroSection = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <HeroContent />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HeroCarousel />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <HeroStats />
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer focus:outline-none"
        onClick={scrollToContent}
        aria-label="Scroll to content"
      >
        <ChevronDown className="w-8 h-8 text-[#D6BCFA] animate-bounce" />
      </motion.button>
    </section>
  );
};

export default HeroSection;
