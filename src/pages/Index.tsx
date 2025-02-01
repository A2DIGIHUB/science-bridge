import { ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
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
          <p className="section-subtitle text-center">
            The latest breakthroughs in science and technology
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <article key={item} className="article-card">
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex gap-2 mb-4">
                      <span className="tag">Physics</span>
                      <span className="tag">Space</span>
                    </div>
                    <h3 className="text-xl font-semibold text-accent mb-2">
                      Discovering New Horizons in Quantum Computing
                    </h3>
                    <p className="text-accent/60">
                      Recent breakthroughs in quantum computing are paving the way for revolutionary advances in computational power...
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-accent/40">5 min read</span>
                    <button className="text-primary hover:text-primary-dark font-medium text-sm">
                      Read More
                    </button>
                  </div>
                </div>
              </article>
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