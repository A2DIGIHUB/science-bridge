
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary/90 to-accent">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Transform Your Digital Experience?
            </h2>
            <p className="text-lg text-white/80">
              Join thousands of innovators who are already building the future with DXN. Start your journey today and unlock endless possibilities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 group"
              >
                Get Started 
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10"
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-white/5 backdrop-blur-sm p-8 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[#9b87f5]/20 to-[#7E69AB]/20 rounded-2xl" />
              <div className="relative space-y-6">
                <div className="h-2 w-24 bg-white/20 rounded" />
                <div className="h-2 w-32 bg-white/20 rounded" />
                <div className="h-2 w-20 bg-white/20 rounded" />
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-square bg-white/10 rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
