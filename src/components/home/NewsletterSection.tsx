
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { motion } from "framer-motion";

const interestAreas = [
  {
    id: "quantum-computing",
    label: "Quantum Computing"
  },
  {
    id: "artificial-intelligence",
    label: "Artificial Intelligence"
  },
  {
    id: "biotechnology",
    label: "Biotechnology"
  },
  {
    id: "space-exploration",
    label: "Space Exploration"
  },
  {
    id: "climate-science",
    label: "Climate Science"
  },
  {
    id: "neuroscience",
    label: "Neuroscience"
  }
];

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    if (interests.length === 0) {
      toast.error("Please select at least one area of interest");
      return;
    }
    
    console.log("Subscribing with:", { email, interests });
    toast.success("Thank you for subscribing!");
    setEmail("");
    setInterests([]);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/5">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-2xl p-8 sm:p-12"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">Stay at the Forefront of Science</h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                Join our community of 10,000+ science enthusiasts and receive personalized updates
                in your areas of interest
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-12"
                  />
                  <Button type="submit" className="button-primary h-12 px-8">
                    Subscribe Now
                  </Button>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-semibold text-accent text-center mb-6">Select Your Areas of Interest</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {interestAreas.map((area) => (
                    <div 
                      key={area.id} 
                      className="flex items-center space-x-3 p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-colors"
                    >
                      <Checkbox
                        id={area.id}
                        checked={interests.includes(area.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setInterests([...interests, area.id]);
                          } else {
                            setInterests(interests.filter((i) => i !== area.id));
                          }
                        }}
                      />
                      <label
                        htmlFor={area.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {area.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {[
                  {
                    title: "Curated Content",
                    description: "Hand-picked articles based on your interests"
                  },
                  {
                    title: "Early Access",
                    description: "Be the first to know about breakthrough discoveries"
                  },
                  {
                    title: "Community Updates",
                    description: "Connect with fellow science enthusiasts"
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center p-6 rounded-lg bg-surface/50 hover:bg-surface/70 transition-colors"
                  >
                    <h3 className="font-semibold text-accent mb-3">{benefit.title}</h3>
                    <p className="text-sm text-accent/60">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </form>

            <p className="mt-8 text-xs text-center text-accent/40 max-w-2xl mx-auto">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
              We respect your privacy and will never share your information.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
