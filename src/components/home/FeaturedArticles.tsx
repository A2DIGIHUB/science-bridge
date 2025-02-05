import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const featuredArticles = [
  {
    title: "Quantum Computing Breakthrough",
    description: "Recent advances in quantum computing are paving the way for revolutionary changes in computational power...",
    tags: ["Physics", "Technology"],
    date: "2024-02-21",
    readingTime: "5 min",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  {
    title: "AI in Medical Research",
    description: "Artificial intelligence is transforming how we approach medical research and drug discovery...",
    tags: ["AI", "Medicine"],
    date: "2024-02-20",
    readingTime: "4 min",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  }
];

const FeaturedArticles = () => {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
      <div className="grid gap-8 md:grid-cols-2">
        {featuredArticles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="article-card h-full">
              <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex gap-2 mb-2">
                  {article.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">{tag}</span>
                  ))}
                </div>
                <CardTitle className="text-2xl hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-base">{article.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-accent/40">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {article.readingTime}
                    </span>
                  </div>
                  <button className="flex items-center gap-1 text-primary hover:text-primary-dark transition-colors">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedArticles;