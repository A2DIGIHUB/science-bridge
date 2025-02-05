import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import FeaturedArticles from '../components/home/FeaturedArticles';
import NewsletterSection from '../components/home/NewsletterSection';
import RecentPosts from '../components/home/RecentPosts';
import PopularTags from '../components/home/PopularTags';

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-surface">
      <main className="w-full">
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          <HeroSection />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <FeaturedArticles />
                  <RecentPosts />
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <PopularTags />
                  <NewsletterSection />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Index;