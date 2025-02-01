import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary to-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-accent animate-fade-up">
            Unlock the Wonders of Science
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-accent/60 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Your gateway to simplified science, research insights, and the latest discoveries
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Button className="button-primary">
              Explore Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline">
              Try AI Assistant
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;