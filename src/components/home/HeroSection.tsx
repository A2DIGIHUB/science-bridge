import { ArrowRight, Rocket, Atom, Brain, Microscope } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary to-surface">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Floating Icons */}
        <div className="absolute top-1/4 left-1/4 animate-float-slow">
          <Atom className="w-12 h-12 text-primary/20" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float-medium">
          <Brain className="w-16 h-16 text-primary/30" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float-fast">
          <Microscope className="w-10 h-10 text-primary/25" />
        </div>
        <div className="absolute top-1/2 right-1/3 animate-float-medium">
          <Rocket className="w-14 h-14 text-primary/20" />
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center space-y-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-accent animate-fade-up">
            Unlock the Wonders of Science
          </h1>
          
          <p className="mt-6 text-xl sm:text-2xl text-accent/60 max-w-3xl mx-auto animate-fade-up" 
             style={{ animationDelay: '0.2s' }}>
            Your gateway to simplified science, research insights, and the latest discoveries
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-fade-up" 
               style={{ animationDelay: '0.4s' }}>
            <Button className="button-primary group">
              Explore Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" className="hover:bg-primary hover:text-white transition-colors">
              Try AI Assistant
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-up"
               style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">1000+</div>
              <div className="text-sm text-accent/60 mt-1">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">50K+</div>
              <div className="text-sm text-accent/60 mt-1">Readers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">100+</div>
              <div className="text-sm text-accent/60 mt-1">Contributors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-sm text-accent/60 mt-1">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;