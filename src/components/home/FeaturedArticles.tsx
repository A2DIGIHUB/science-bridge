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

const FeaturedArticles = () => {
  return (
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
  );
};

export default FeaturedArticles;