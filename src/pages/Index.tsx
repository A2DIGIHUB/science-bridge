import { ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const featuredArticles = [
  {
    title: "Quantum Computing Breakthrough",
    description: "Recent advances in quantum computing are paving the way for revolutionary changes in computational power...",
    tags: ["Physics", "Technology"],
    readingTime: "5 min",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  {
    title: "AI in Medical Research",
    description: "Artificial intelligence is transforming how we approach medical research and drug discovery...",
    tags: ["AI", "Medicine"],
    readingTime: "4 min",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    title: "Climate Change Impact",
    description: "New studies reveal unprecedented changes in global weather patterns and their implications...",
    tags: ["Environment", "Climate"],
    readingTime: "6 min",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary to-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-accent animate-fade-up">
              Discover the Future of Science
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-accent/60 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Explore groundbreaking research, cutting-edge discoveries, and the latest scientific developments that shape our world.
            </p>
            <div className="mt-10 flex justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <button className="button-primary">
                Start Exploring
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Featured Articles</h2>
          <p className="section-subtitle text-center mb-12">
            The latest breakthroughs in science and technology
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article, index) => (
              <Card key={index} className="article-card overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
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
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-accent/40">{article.readingTime} read</span>
                    <button className="text-primary hover:text-primary-dark font-medium text-sm">
                      Read More
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-panel rounded-2xl p-8 sm:p-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="section-title">Stay Updated</h2>
              <p className="section-subtitle">
                Get the latest scientific discoveries delivered to your inbox
              </p>
              <form className="mt-8 sm:flex justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:w-96 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="submit"
                  className="mt-3 sm:mt-0 sm:ml-3 button-primary w-full sm:w-auto"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;