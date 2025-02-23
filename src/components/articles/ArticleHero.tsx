import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { articlesApi } from '../../services/api';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Spinner } from '../ui/spinner';

const ArticleHero = () => {
  const { data: featuredArticle, isLoading, error } = useQuery({
    queryKey: ['featuredArticle'],
    queryFn: () => articlesApi.getFeaturedArticle(),
  });

  return (
    <section className="relative bg-gradient-to-br from-accent to-accent-dark pt-[120px] pb-16">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-white"
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Explore the World of Science Through Expert Insights
          </h1>
          <p className="mt-6 text-xl text-white/80 max-w-3xl">
            Stay updated with the latest discoveries, research, and simplified explanations from experts.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12"
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-[400px] bg-white/5 backdrop-blur-sm rounded-xl">
              <Spinner className="w-8 h-8 text-white" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-[400px] bg-white/5 backdrop-blur-sm rounded-xl text-white">
              <p className="text-lg font-medium mb-2">Failed to load featured article</p>
              <button 
                onClick={() => window.location.reload()}
                className="text-sm hover:text-primary transition-colors"
              >
                Try again
              </button>
            </div>
          ) : featuredArticle && (
            <Link to={`/articles/${featuredArticle.slug}`} className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
                <div className="aspect-[21/9] relative">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <div className="flex gap-2 mb-3">
                      {featuredArticle.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/20 text-sm backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-white/80 mb-4 line-clamp-2">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="inline-flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ArticleHero;