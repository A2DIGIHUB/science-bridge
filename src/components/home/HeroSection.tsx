import { ArrowRight, Rocket, Atom, Brain, Microscope, ChevronDown, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HeroSection = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const carouselImages = [
    {
      src: "/photo-1581091226825-a6a2a5aee158",
      alt: "Scientist analyzing data",
      caption: "Advancing Research Through Data Analysis"
    },
    {
      src: "/photo-1605810230434-7631ac76ec81",
      alt: "Scientific collaboration",
      caption: "Fostering Scientific Collaboration"
    },
    {
      src: "/photo-1485827404703-89b55fcc595e",
      alt: "Innovation in robotics",
      caption: "Pushing Boundaries in Technology"
    },
    {
      src: "/photo-1581090464777-f3220bbe1b8b",
      alt: "Innovation and ideas",
      caption: "Illuminating New Discoveries"
    }
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-accent via-accent/95 to-accent/90">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.2, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-1/4 left-1/4 animate-float-slow"
        >
          <Atom className="w-16 h-16 text-surface" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.3, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute top-1/3 right-1/4 animate-float-medium"
        >
          <Brain className="w-20 h-20 text-surface" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.25, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-1/4 left-1/3 animate-float-fast"
        >
          <Microscope className="w-14 h-14 text-surface" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.2, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute top-1/2 right-1/3 animate-float-medium"
        >
          <Rocket className="w-18 h-18 text-surface" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-surface">
              Explore the World of
              <span className="bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent"> Science</span>
            </h1>
            
            <p className="mt-6 text-xl sm:text-2xl text-surface/80 max-w-3xl">
              Your gateway to scientific discovery, research, and understanding
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mt-8">
              <div className="relative">
                <Input 
                  type="search"
                  placeholder="Search articles, topics, or ask a question..."
                  className="w-full pl-12 pr-4 py-3 rounded-full bg-white/90 backdrop-blur-sm border-2 border-surface/10 focus:border-primary"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Call to Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap justify-start gap-4 mt-8"
            >
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary-dark text-white group transition-all duration-300"
              >
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-surface text-surface hover:bg-surface/10"
              >
                Join Community
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <Carousel className="w-full max-w-xl mx-auto">
              <CarouselContent>
                {carouselImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video overflow-hidden rounded-xl">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <p className="text-white text-sm font-medium">{image.caption}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </motion.div>
        </div>

        {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          >
            {[
              { value: "1000+", label: "Research Articles" },
              { value: "50K+", label: "Active Learners" },
              { value: "100+", label: "Expert Contributors" },
              { value: "24/7", label: "Community Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-4xl font-bold text-primary-light"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-surface/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer focus:outline-none"
        onClick={scrollToContent}
        aria-label="Scroll to content"
      >
        <ChevronDown className="w-8 h-8 text-surface animate-bounce" />
      </motion.button>
    </section>
  );
};

export default HeroSection;
