import { ArrowRight } from 'lucide-react';

const ArticleHero = () => {
  return (
    <section className="relative bg-accent py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 text-white">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight animate-fade-up">
            Explore the World of Science Through Expert Insights
          </h1>
          <p className="mt-6 text-xl text-white/80 max-w-3xl animate-fade-up animation-delay-200">
            Stay updated with the latest discoveries, research, and simplified explanations from experts.
          </p>
        </div>

        <div className="mt-12 animate-fade-up animation-delay-300">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl">
            <div className="aspect-video relative">
              <img
                src="https://images.unsplash.com/photo-1532094349884-543bc11b234d"
                alt="Featured Article"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <span className="tag">Physics</span>
                <span className="tag">Quantum</span>
              </div>
              <h2 className="text-2xl font-bold text-accent mb-2">
                Quantum Computing: A New Era of Technology
              </h2>
              <p className="text-accent/60 mb-4">
                Discover how quantum computers are revolutionizing the way we process information...
              </p>
              <button className="button-primary inline-flex items-center">
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleHero;