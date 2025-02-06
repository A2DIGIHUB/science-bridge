import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HeroContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white">
        Explore the World of
        <span className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent"> Technology</span>
      </h1>
      
      <p className="mt-6 text-xl sm:text-2xl text-[#F1F0FB]/80 max-w-3xl">
        Your gateway to technological innovation, research, and understanding
      </p>
      
      <div className="max-w-2xl mt-8">
        <div className="relative">
          <Input 
            type="search"
            placeholder="Search articles, topics, or ask a question..."
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white/90 backdrop-blur-sm border-2 border-[#9b87f5]/10 focus:border-[#9b87f5]"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-wrap justify-start gap-4 mt-8"
      >
        <Button 
          size="lg"
          className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white group transition-all duration-300"
        >
          Start Learning
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-[#D6BCFA] text-[#D6BCFA] hover:bg-[#D6BCFA]/10"
        >
          Join Community
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;