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
      className="space-y-8 max-w-3xl"
    >
      <div className="space-y-4">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight">
          Science Through 
          <span className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent"> Innovation</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-[#F1F0FB]/90 font-light max-w-2xl">
          Join a community of innovators and tech enthusiasts exploring the frontiers of technology, research, and development.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button 
          size="lg"
          className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white group transition-all duration-300 text-lg px-8 py-6"
        >
          Start Learning
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-2 border-[#D6BCFA] text-[#D6BCFA] hover:bg-[#D6BCFA]/10 text-lg px-8 py-6"
        >
          Watch Demo
        </Button>
      </div>

      <div className="relative max-w-2xl">
        <Input 
          type="search"
          placeholder="Search articles, topics, or ask a question..."
          className="w-full pl-12 pr-4 py-6 rounded-full bg-white/90 backdrop-blur-sm border-2 border-[#9b87f5]/10 focus:border-[#9b87f5] text-lg"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
      </div>

      <div className="flex items-center gap-4 pt-4">
        <div className="flex -space-x-4">
          {[1, 2, 3, 4].map((i) => (
            <img
              key={i}
              src={`https://i.pravatar.cc/40?img=${i}`}
              alt={`User ${i}`}
              className="w-10 h-10 rounded-full border-2 border-[#1A1F2C]"
            />
          ))}
        </div>
        <p className="text-[#D6BCFA]/90 text-sm">
          Join <span className="font-bold text-[#9b87f5]">50,000+</span> tech enthusiasts who already started their journey
        </p>
      </div>
    </motion.div>
  );
};

export default HeroContent;